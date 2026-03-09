/**
 * scrape-newhomebuddy.mjs
 * Playwright scraper for NewHomeBuddy listings at https://a.nhb.app/u/joe
 * Writes results to /tmp/joefsanches-seo/content/new-construction-deals.json
 * Then auto-commits and pushes the updated file.
 */

import { chromium } from 'playwright';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const OUTPUT_PATH = '/tmp/joefsanches-seo/content/new-construction-deals.json';
const TARGET_URL = 'https://a.nhb.app/u/joe';
const CHROME_PROFILE = path.join(os.homedir(), 'Library/Application Support/Google/Chrome');
const REPO_DIR = '/tmp/joefsanches-seo';

// ── helpers ──────────────────────────────────────────────────────────────────

function log(...args) {
  console.log(`[scraper ${new Date().toISOString()}]`, ...args);
}

function readExisting() {
  try {
    if (fs.existsSync(OUTPUT_PATH)) {
      return JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8'));
    }
  } catch (e) {
    log('Could not read existing JSON:', e.message);
  }
  return null;
}

function extractUuid(url) {
  const match = url && url.match(/[?&]id=([^&]+)/);
  return match ? match[1] : null;
}

function parsePrice(text) {
  if (!text) return null;
  const clean = text.replace(/[^0-9.]/g, '');
  const n = parseFloat(clean);
  if (!n) return null;
  // values like "350" mean 350k
  return n < 10000 ? Math.round(n * 1000) : Math.round(n);
}

function parseNumber(text) {
  if (!text) return null;
  const match = text.match(/[\d,]+/);
  return match ? parseInt(match[0].replace(/,/g, ''), 10) : null;
}

// ── selectors (with fallbacks) ────────────────────────────────────────────────

const COMMUNITY_SELECTORS = [
  '.community-card',
  '.home-card[data-type="community"]',
  '[class*="community"]',
  '.listing-card',
  '[data-community]',
];

const HOME_SELECTORS = [
  '.home-card',
  '.listing-card',
  '[class*="home-card"]',
  '[data-type="home"]',
  '.property-card',
];

const INCENTIVE_SELECTORS = [
  '[class*="incentive"]',
  '[class*="special"]',
  '[class*="deal"]',
  '[class*="promo"]',
  '[class*="offer"]',
  '[class*="promotion"]',
  '[data-incentive]',
];

// ── main scraper ──────────────────────────────────────────────────────────────

async function scrape() {
  log('Starting NewHomeBuddy scrape...');
  log('Target URL:', TARGET_URL);

  // Create a temp copy of the Chrome profile to avoid lock conflicts
  const tmpProfile = path.join(os.tmpdir(), `nhb-profile-${Date.now()}`);
  log('Creating temp Chrome profile copy at', tmpProfile);

  try {
    execSync(`cp -r "${CHROME_PROFILE}" "${tmpProfile}"`, { stdio: 'pipe' });
    log('Profile copy complete.');
  } catch (e) {
    log('Warning: Could not copy full Chrome profile, using empty profile:', e.message);
    fs.mkdirSync(tmpProfile, { recursive: true });
  }

  let browser;
  try {
    log('Launching Chromium with persistent context...');
    browser = await chromium.launchPersistentContext(tmpProfile, {
      headless: true,
      channel: 'chrome',
      args: [
        '--no-sandbox',
        '--disable-blink-features=AutomationControlled',
        '--disable-dev-shm-usage',
      ],
      ignoreDefaultArgs: ['--enable-automation'],
    });

    const page = browser.pages().length > 0 ? browser.pages()[0] : await browser.newPage();

    log('Navigating to', TARGET_URL);
    try {
      await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch (navErr) {
      log('Navigation error:', navErr.message);
      throw new Error('AUTH_OR_LOAD_FAILED');
    }

    // Wait for content: try known selectors, fall back to networkidle
    log('Waiting for listings to load...');
    let loaded = false;
    for (const sel of [...HOME_SELECTORS, ...COMMUNITY_SELECTORS]) {
      try {
        await page.waitForSelector(sel, { timeout: 8000 });
        log('Found selector:', sel);
        loaded = true;
        break;
      } catch (_) { /* try next */ }
    }

    if (!loaded) {
      log('No known selectors found — waiting for network idle (10s)...');
      try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch (_) {
        log('Network idle timed out — proceeding with whatever is on page.');
      }
    }

    // Give JS a moment to render dynamic content
    await page.waitForTimeout(2000);

    const pageTitle = await page.title();
    log('Page title:', pageTitle);

    // Check if we hit a login wall
    const bodyText = await page.evaluate(() => document.body ? document.body.innerText.slice(0, 500) : '');
    log('Body preview:', bodyText.slice(0, 200));
    if (
      bodyText.toLowerCase().includes('log in') ||
      bodyText.toLowerCase().includes('sign in') ||
      bodyText.toLowerCase().includes('unauthorized')
    ) {
      log('WARNING: Page appears to require authentication. Keeping existing data.');
      throw new Error('AUTH_REQUIRED');
    }

    // ── Extract communities ──────────────────────────────────────────────────
    log('Extracting community data...');
    const communities = await page.evaluate((selectors, incentiveSelectors) => {
      const results = [];

      let cards = [];
      for (const sel of selectors) {
        const found = document.querySelectorAll(sel);
        if (found.length > 0) { cards = Array.from(found); break; }
      }

      cards.forEach(card => {
        const getText = (s) => {
          const el = card.querySelector(s);
          return el ? el.innerText.trim() : '';
        };
        const getAttr = (s, attr) => {
          const el = card.querySelector(s);
          return el ? (el.getAttribute(attr) || '').trim() : '';
        };

        // community name
        const community =
          getText('[class*="community-name"]') ||
          getText('[class*="name"]') ||
          getText('h2') ||
          getText('h3') ||
          getAttr('[data-community]', 'data-community') || '';

        // builder
        const builder =
          getText('[class*="builder"]') ||
          getText('[class*="brand"]') ||
          getAttr('[data-builder]', 'data-builder') || '';

        // city
        const city =
          getText('[class*="city"]') ||
          getText('[class*="location"]') ||
          getText('[class*="address"]') || '';

        // price
        const priceText = getText('[class*="price"]') || getText('[class*="cost"]') || '';

        // sqft
        const sqftText = getText('[class*="sqft"]') || getText('[class*="size"]') || getText('[class*="area"]') || '';

        // beds/baths
        const bedsText = getText('[class*="bed"]') || getText('[class*="room"]') || '';
        const bathsText = getText('[class*="bath"]') || '';

        // available count
        const countText = getText('[class*="count"]') || getText('[class*="available"]') || getText('[class*="homes"]') || '';

        // incentives
        let incentives = '';
        for (const iSel of incentiveSelectors) {
          const iEl = card.querySelector(iSel);
          if (iEl) { incentives = iEl.innerText.trim(); break; }
        }
        // also search for incentive keywords in card text
        if (!incentives) {
          const allText = card.innerText || '';
          const lines = allText.split('\n').map(l => l.trim()).filter(Boolean);
          for (const line of lines) {
            const lower = line.toLowerCase();
            if (
              lower.includes('incentive') || lower.includes('flex cash') ||
              lower.includes('buydown') || lower.includes('closing cost') ||
              lower.includes('special') || lower.includes('promo') ||
              lower.includes('deal') || lower.includes('offer')
            ) {
              incentives = line;
              break;
            }
          }
        }

        // URL
        const linkEl = card.querySelector('a[href*="/u/joe"]') || card.querySelector('a');
        const href = linkEl ? linkEl.getAttribute('href') : '';
        const url = href
          ? (href.startsWith('http') ? href : `https://a.nhb.app${href}`)
          : '';

        if (community || builder) {
          results.push({ community, builder, city, priceText, sqftText, bedsText, bathsText, countText, incentives, url });
        }
      });

      return results;
    }, COMMUNITY_SELECTORS, INCENTIVE_SELECTORS);

    log(`Found ${communities.length} community card(s).`);

    // ── Extract individual homes ─────────────────────────────────────────────
    log('Extracting individual home data...');
    const homes = await page.evaluate((selectors, incentiveSelectors) => {
      const results = [];

      let cards = [];
      for (const sel of selectors) {
        const found = document.querySelectorAll(sel);
        if (found.length > 0) { cards = Array.from(found); break; }
      }

      cards.forEach(card => {
        const getText = (s) => {
          const el = card.querySelector(s);
          return el ? el.innerText.trim() : '';
        };

        const address = getText('[class*="address"]') || getText('[class*="street"]') || '';
        const community = getText('[class*="community"]') || getText('[class*="neighborhood"]') || '';
        const builder = getText('[class*="builder"]') || getText('[class*="brand"]') || '';
        const city = getText('[class*="city"]') || getText('[class*="location"]') || '';
        const priceText = getText('[class*="price"]') || '';
        const bedsText = getText('[class*="bed"]') || '';
        const bathsText = getText('[class*="bath"]') || '';
        const sqftText = getText('[class*="sqft"]') || getText('[class*="size"]') || '';
        const status = getText('[class*="status"]') || getText('[class*="avail"]') || 'Available';

        let incentives = '';
        for (const iSel of incentiveSelectors) {
          const iEl = card.querySelector(iSel);
          if (iEl) { incentives = iEl.innerText.trim(); break; }
        }

        // Link + UUID
        const linkEl = card.querySelector('a[href*="model=home"]') ||
          card.querySelector('a[href*="id="]') ||
          card.querySelector('a');
        const href = linkEl ? linkEl.getAttribute('href') : '';
        const url = href
          ? (href.startsWith('http') ? href : `https://a.nhb.app${href}`)
          : '';

        // UUID from data attr or href
        const id =
          card.getAttribute('data-id') ||
          card.getAttribute('data-home-id') ||
          card.getAttribute('data-uuid') ||
          (url.match(/[?&]id=([^&]+)/) || [])[1] ||
          '';

        if (id || address || priceText) {
          results.push({ id, address, community, builder, city, priceText, bedsText, bathsText, sqftText, status, incentives, url });
        }
      });

      return results;
    }, HOME_SELECTORS, INCENTIVE_SELECTORS);

    log(`Found ${homes.length} home card(s).`);

    // ── Normalise data ───────────────────────────────────────────────────────
    const normCommunities = communities.map(c => {
      const prices = (c.priceText || '').match(/\$[\d,k]+/gi) || [];
      const sqfts = (c.sqftText || '').match(/[\d,]+/g) || [];
      return {
        community: c.community,
        builder: c.builder,
        city: c.city,
        price_min: parsePrice(prices[0]),
        price_max: parsePrice(prices[1] || prices[0]),
        sqft_min: sqfts[0] ? parseInt(sqfts[0].replace(/,/g, ''), 10) : null,
        sqft_max: sqfts[1] ? parseInt(sqfts[1].replace(/,/g, ''), 10) : null,
        beds_range: c.bedsText || null,
        baths_range: c.bathsText || null,
        available_count: parseNumber(c.countText),
        incentives: c.incentives || null,
        url: c.url,
      };
    });

    const normHomes = homes.map(h => ({
      id: h.id || extractUuid(h.url) || `nhb-${Math.random().toString(36).slice(2, 10)}`,
      builder: h.builder,
      community: h.community,
      city: h.city,
      address: h.address,
      price: parsePrice(h.priceText),
      beds: parseNumber(h.bedsText),
      baths: parseNumber(h.bathsText),
      sqft: parseNumber(h.sqftText),
      incentives: h.incentives || null,
      url: h.url,
      status: h.status || 'Available',
    }));

    const output = {
      scraped_at: new Date().toISOString(),
      communities: normCommunities,
      homes: normHomes,
    };

    log('Writing output to', OUTPUT_PATH);
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf8');
    log('File written successfully.');

    // ── Git commit & push ────────────────────────────────────────────────────
    log('Committing and pushing...');
    try {
      execSync(
        'git add content/new-construction-deals.json && git commit -m "chore: update new construction deals" && git push origin main',
        { cwd: REPO_DIR, stdio: 'pipe' }
      );
      log('Git push successful.');
    } catch (gitErr) {
      const stderr = gitErr.stderr ? gitErr.stderr.toString() : gitErr.message;
      if (stderr.includes('nothing to commit')) {
        log('No changes to commit.');
      } else {
        log('Git error (non-fatal):', stderr);
      }
    }

  } catch (err) {
    if (err.message === 'AUTH_REQUIRED' || err.message === 'AUTH_OR_LOAD_FAILED') {
      log('Scraper aborted:', err.message, '— existing JSON preserved.');
    } else {
      log('Unexpected scraper error:', err.message);
      log(err.stack);
    }
    process.exitCode = 1;
  } finally {
    if (browser) {
      await browser.close();
      log('Browser closed.');
    }
    // Clean up temp profile
    try { fs.rmSync(tmpProfile, { recursive: true, force: true }); } catch (_) {}
    log('Done.');
  }
}

scrape();
