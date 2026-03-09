/**
 * request-indexing.mjs
 * Google Indexing API — Submit sitemap URLs for immediate crawl.
 *
 * ─── SETUP (one-time) ────────────────────────────────────────────────────────
 *  1. Go to Google Cloud Console → https://console.cloud.google.com/
 *  2. Create a project (or use existing) → Enable "Web Search Indexing API"
 *  3. IAM & Admin → Service Accounts → Create Service Account
 *     - Name: joefsanches-indexing  (any name)
 *     - Role: Owner (or create custom role with indexing.entries.publish)
 *  4. Keys tab → Add Key → JSON → Download → save as:
 *       ~/Downloads/google-indexing-sa.json
 *  5. Google Search Console → Settings → Users and permissions → Add user
 *     - Email: the service account email (e.g. xxx@project.iam.gserviceaccount.com)
 *     - Permission: Owner
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Install dependency first:
 *   cd /tmp/joefsanches-seo && npm install googleapis
 *
 * Usage:
 *   node /tmp/joefsanches-seo/scripts/request-indexing.mjs
 *
 * Rate limit: Google allows 200 URL submissions per day per service account.
 * This script enforces that cap automatically.
 */

import fs from 'fs';
import path from 'path';
import os from 'os';

// ── Config ────────────────────────────────────────────────────────────────────
const HOME = os.homedir();
const SA_KEY_PATH = path.join(HOME, 'Downloads', 'google-indexing-sa.json');
const SITEMAP_PATHS = [
  '/tmp/joefsanches-seo/public/sitemap.xml',
  '/tmp/joefsanches-seo/sitemap.xml',
];
const DAILY_LIMIT = 200;

// ── Helpers ───────────────────────────────────────────────────────────────────

function log(msg) {
  const ts = new Date().toISOString();
  process.stdout.write(`[${ts}] ${msg}\n`);
}

function loadServiceAccount() {
  if (!fs.existsSync(SA_KEY_PATH)) {
    log(`ERROR: Service account JSON not found at ${SA_KEY_PATH}`);
    log('Follow the SETUP instructions at the top of this file.');
    process.exit(1);
  }
  try {
    return JSON.parse(fs.readFileSync(SA_KEY_PATH, 'utf8'));
  } catch (e) {
    log(`ERROR: Could not parse service account JSON: ${e.message}`);
    process.exit(1);
  }
}

function findSitemap() {
  for (const p of SITEMAP_PATHS) {
    if (fs.existsSync(p)) {
      log(`Found sitemap at: ${p}`);
      return p;
    }
  }
  log('ERROR: sitemap.xml not found. Checked:');
  SITEMAP_PATHS.forEach(p => log('  ' + p));
  log('Run `node generate-sitemap.mjs` first to generate the sitemap.');
  process.exit(1);
}

function extractUrlsFromSitemap(sitemapPath) {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const matches = [...xml.matchAll(/<loc>\s*(https?:\/\/[^\s<]+)\s*<\/loc>/g)];
  const urls = matches.map(m => m[1].trim());
  log(`Extracted ${urls.length} URLs from sitemap.`);
  return urls;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  log('=== Google Indexing API Submission ===');

  // 1. Load service account key
  const serviceAccountKey = loadServiceAccount();
  log(`Service account: ${serviceAccountKey.client_email}`);

  // 2. Dynamically import googleapis (must be installed first)
  let google;
  try {
    const mod = await import('googleapis');
    google = mod.google;
  } catch (e) {
    log('ERROR: googleapis not installed.');
    log('Run: cd /tmp/joefsanches-seo && npm install googleapis');
    process.exit(1);
  }

  // 3. Authenticate
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccountKey,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });
  const authClient = await auth.getClient();
  log('Authenticated with Google APIs.');

  // 4. Find and parse sitemap
  const sitemapPath = findSitemap();
  const urls = extractUrlsFromSitemap(sitemapPath);

  if (urls.length === 0) {
    log('No URLs found in sitemap. Nothing to submit.');
    process.exit(0);
  }

  // 5. Enforce daily rate limit
  const urlsToSubmit = urls.slice(0, DAILY_LIMIT);
  if (urls.length > DAILY_LIMIT) {
    log(`WARNING: ${urls.length} URLs found but daily limit is ${DAILY_LIMIT}. Submitting first ${DAILY_LIMIT}.`);
  }

  // 6. Submit each URL to Indexing API
  const indexing = google.indexing({ version: 'v3', auth: authClient });

  let submitted = 0;
  let failed = 0;
  const errors = [];

  log(`Submitting ${urlsToSubmit.length} URLs...`);

  for (let i = 0; i < urlsToSubmit.length; i++) {
    const url = urlsToSubmit[i];
    try {
      await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      submitted++;
      log(`[${i + 1}/${urlsToSubmit.length}] OK: ${url}`);
    } catch (e) {
      failed++;
      const msg = e.message || String(e);
      errors.push({ url, error: msg });
      log(`[${i + 1}/${urlsToSubmit.length}] FAIL: ${url} — ${msg}`);
    }

    // Brief pause between requests to avoid rate limit bursts
    if (i < urlsToSubmit.length - 1) {
      await sleep(300);
    }
  }

  // 7. Results summary
  log('');
  log('=== Indexing Submission Summary ===');
  log(`Total URLs in sitemap : ${urls.length}`);
  log(`Submitted this run    : ${urlsToSubmit.length}`);
  log(`Successful            : ${submitted}`);
  log(`Failed                : ${failed}`);

  if (errors.length > 0) {
    log('');
    log('Failed URLs:');
    errors.forEach(e => log(`  ${e.url} — ${e.error}`));
  }

  log('Done.');
}

main().catch(e => {
  process.stderr.write(`Unhandled error: ${e.message}\n`);
  process.exit(1);
});
