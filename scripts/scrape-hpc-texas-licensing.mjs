/**
 * scrape-hpc-texas-licensing.mjs
 * ---------------------------------------------------------------------------
 * Scrapes a Texas licensing "datamart" search-result list (the Versa
 * Regulation system behind https://vo.licensing.hpc.texas.gov/datamart/...)
 * across ALL result pages and writes the rows to CSV + JSON.
 *
 * WHY THIS IS A LOCAL SCRIPT (and not run in CI / the agent sandbox):
 *   - vo.licensing.hpc.texas.gov is blocked by the agent egress policy, so it
 *     cannot be reached from the automation environment.
 *   - The result list is SESSION-BOUND: the `anchor=...` token in the URL only
 *     resolves inside the browser session that performed the search. A cold
 *     fetch of the list URL returns an error. So the reliable flow is:
 *        you perform the search in a real browser  ->  the script paginates.
 *
 * USAGE
 *   1. Install Playwright once (if you haven't):
 *        npm i -D playwright && npx playwright install chromium
 *   2. Run:
 *        node scripts/scrape-hpc-texas-licensing.mjs
 *   3. A Chromium window opens on the datamart. Perform your search and get to
 *      the RESULTS LIST (page 1). Then return to the terminal and press ENTER.
 *   4. The script walks every page, extracts each row, and writes:
 *        ./data/hpc-texas-licensing.json
 *        ./data/hpc-texas-licensing.csv
 *
 * OPTIONS (environment variables)
 *   START_URL   Page to open first. Default: the datamart main menu.
 *   OUT_DIR     Output directory. Default: ./data
 *   OUT_NAME    Base filename (no extension). Default: hpc-texas-licensing
 *   MAX_PAGES   Safety cap on pages. Default: 2000
 *   DELAY_MS    Politeness delay between page loads. Default: 800
 *   HEADLESS    "1" to run headless (only works if the list URL is reachable
 *               without a manual search — usually leave unset). Default: off
 *   SELECTOR    Optional CSS selector for the results <table> if auto-detect
 *               picks the wrong one.
 * ---------------------------------------------------------------------------
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

// ── config ───────────────────────────────────────────────────────────────────
const START_URL =
  process.env.START_URL ||
  'https://vo.licensing.hpc.texas.gov/datamart/mainMenu.do';
const OUT_DIR = process.env.OUT_DIR || path.resolve('data');
const OUT_NAME = process.env.OUT_NAME || 'hpc-texas-licensing';
const MAX_PAGES = parseInt(process.env.MAX_PAGES || '2000', 10);
const DELAY_MS = parseInt(process.env.DELAY_MS || '800', 10);
const HEADLESS = process.env.HEADLESS === '1';
const TABLE_SELECTOR = process.env.SELECTOR || null;

// ── helpers ───────────────────────────────────────────────────────────────────
function log(...args) {
  console.log(`[hpc-scraper ${new Date().toISOString()}]`, ...args);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    })
  );
}

function csvEscape(value) {
  const s = value == null ? '' : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function toCsv(rows, columns) {
  const header = columns.map(csvEscape).join(',');
  const body = rows
    .map((row) => columns.map((c) => csvEscape(row[c])).join(','))
    .join('\n');
  return `${header}\n${body}\n`;
}

/**
 * Extract the results table from the current page.
 * Runs in the browser context. Returns { headers, rows } where each row is an
 * object keyed by header text (plus `_detailUrl` if the row links somewhere).
 */
function extractTable(selectorOverride) {
  const abs = (href) => {
    if (!href) return '';
    try {
      return new URL(href, document.baseURI).href;
    } catch {
      return href;
    }
  };

  // Pick the results table: explicit selector, else the table with the most
  // data rows that has at least 2 columns and isn't a pure layout table.
  let table = null;
  if (selectorOverride) {
    table = document.querySelector(selectorOverride);
  }
  if (!table) {
    const candidates = Array.from(document.querySelectorAll('table'));
    let best = null;
    let bestScore = -1;
    for (const t of candidates) {
      const rows = t.querySelectorAll('tr');
      const firstCols = rows[0] ? rows[0].querySelectorAll('td, th').length : 0;
      // score = number of rows, but require >=2 columns and >=2 rows
      if (firstCols >= 2 && rows.length >= 2) {
        // prefer tables that contain links to detail pages
        const hasLinks = t.querySelector('a[href*="detail" i], a[href*="License" i], a[href*="do?"]')
          ? 1000
          : 0;
        const score = rows.length + hasLinks;
        if (score > bestScore) {
          bestScore = score;
          best = t;
        }
      }
    }
    table = best;
  }
  if (!table) return { headers: [], rows: [] };

  const allRows = Array.from(table.querySelectorAll('tr'));
  if (!allRows.length) return { headers: [], rows: [] };

  // Determine header row: prefer a row made of <th>, else the first row.
  let headerRowIndex = allRows.findIndex((r) => r.querySelector('th'));
  if (headerRowIndex < 0) headerRowIndex = 0;
  const headerCells = Array.from(
    allRows[headerRowIndex].querySelectorAll('th, td')
  ).map((c) => (c.innerText || c.textContent || '').trim());

  const headers = headerCells.map((h, i) => h || `col_${i + 1}`);

  const rows = [];
  for (let i = headerRowIndex + 1; i < allRows.length; i++) {
    const cells = Array.from(allRows[i].querySelectorAll('td'));
    if (!cells.length) continue;
    const rowObj = {};
    let nonEmpty = false;
    cells.forEach((cell, idx) => {
      const key = headers[idx] || `col_${idx + 1}`;
      const text = (cell.innerText || cell.textContent || '').replace(/\s+/g, ' ').trim();
      if (text) nonEmpty = true;
      rowObj[key] = text;
    });
    const link = allRows[i].querySelector('a[href]');
    if (link) rowObj._detailUrl = abs(link.getAttribute('href'));
    if (nonEmpty) rows.push(rowObj);
  }

  return { headers, rows };
}

/**
 * Find pagination info on the current page: the base list path + anchor, the
 * current page number, and the set of page numbers linked in the footer.
 */
function extractPagination() {
  const links = Array.from(document.querySelectorAll('a[href*="pageNumber" i]'));
  const pages = new Set();
  let anchor = null;
  let listPath = null;
  for (const a of links) {
    const href = a.getAttribute('href') || '';
    const m = href.match(/pageNumber=(\d+)/i);
    if (m) pages.add(parseInt(m[1], 10));
    const am = href.match(/anchor=([^&"']+)/i);
    if (am && !anchor) anchor = am[1];
    if (!listPath) {
      try {
        const u = new URL(href, document.baseURI);
        listPath = u.origin + u.pathname;
      } catch {
        /* ignore */
      }
    }
  }
  // current page from the URL if present
  const curMatch = location.href.match(/pageNumber=(\d+)/i);
  const current = curMatch ? parseInt(curMatch[1], 10) : 1;
  // if no anchor in links, try current URL
  if (!anchor) {
    const am = location.href.match(/anchor=([^&"']+)/i);
    if (am) anchor = am[1];
  }
  const hasNext = links.some((a) => {
    const t = (a.innerText || a.textContent || '').toLowerCase();
    const img = a.querySelector('img');
    const alt = img ? (img.getAttribute('alt') || '').toLowerCase() : '';
    const m = (a.getAttribute('href') || '').match(/pageNumber=(\d+)/i);
    const target = m ? parseInt(m[1], 10) : -1;
    return t.includes('next') || alt.includes('next') || target > current;
  });
  return {
    anchor,
    listPath: listPath || location.origin + location.pathname,
    current,
    maxLinked: pages.size ? Math.max(...pages) : current,
    hasNext,
  };
}

// ── main ──────────────────────────────────────────────────────────────────────
async function main() {
  log('Launching Chromium…', HEADLESS ? '(headless)' : '(headful)');
  const browser = await chromium.launch({
    headless: HEADLESS,
    args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'],
  });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  });
  const page = await context.newPage();

  try {
    log('Opening', START_URL);
    await page.goto(START_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

    if (!HEADLESS) {
      console.log('\n──────────────────────────────────────────────────────────');
      console.log(' In the Chromium window: run your search and navigate to the');
      console.log(' RESULTS LIST (page 1 of the results table).');
      console.log(' Then come back here and press ENTER to start scraping.');
      console.log('──────────────────────────────────────────────────────────\n');
      await prompt('Press ENTER when the results list is on screen… ');
    }

    // Read pagination context from the current (page 1) results view.
    let pager = await page.evaluate(extractPagination);
    log('Pagination context:', JSON.stringify(pager));

    if (!pager.anchor && !/list\.do/i.test(page.url())) {
      log(
        'WARNING: no anchor / list.do detected on the current page. Make sure ' +
          'you are on the results LIST before pressing ENTER.'
      );
    }

    const all = [];
    const seenFingerprints = new Set();
    let headers = [];
    let prevFirstCell = null;

    const baseListUrl = pager.listPath && pager.anchor
      ? `${pager.listPath}?anchor=${pager.anchor}`
      : null;

    let pageNum = pager.current || 1;
    for (let visited = 0; visited < MAX_PAGES; visited++) {
      // Navigate to the target page (skip nav for the very first page we're on).
      if (visited > 0) {
        if (!baseListUrl) {
          log('No base list URL available for pagination — stopping.');
          break;
        }
        const url = `${baseListUrl}&pageNumber=${pageNum}`;
        log(`Navigating to page ${pageNum}: ${url}`);
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await sleep(DELAY_MS);
      }

      const { headers: h, rows } = await page.evaluate(extractTable, TABLE_SELECTOR);
      if (h.length && !headers.length) headers = h;

      if (!rows.length) {
        log(`Page ${pageNum}: 0 rows — assuming end of results.`);
        break;
      }

      // Detect a repeated page (some datamarts clamp pageNumber to the last page).
      const firstCell = JSON.stringify(rows[0]);
      if (firstCell === prevFirstCell) {
        log(`Page ${pageNum}: same first row as previous page — stopping.`);
        break;
      }
      prevFirstCell = firstCell;

      let added = 0;
      for (const r of rows) {
        const fp = JSON.stringify(r);
        if (seenFingerprints.has(fp)) continue;
        seenFingerprints.add(fp);
        all.push(r);
        added++;
      }
      log(`Page ${pageNum}: ${rows.length} rows (${added} new). Total: ${all.length}`);

      // Decide whether to continue.
      pager = await page.evaluate(extractPagination);
      if (!pager.hasNext && pageNum >= pager.maxLinked) {
        log('No further pages linked — done.');
        break;
      }
      pageNum += 1;
    }

    // Build a stable column list (headers first, then any extras seen in data).
    const columns = [];
    const pushCol = (c) => {
      if (c && !columns.includes(c)) columns.push(c);
    };
    headers.forEach(pushCol);
    all.forEach((r) => Object.keys(r).forEach(pushCol));
    // put _detailUrl last
    if (columns.includes('_detailUrl')) {
      columns.splice(columns.indexOf('_detailUrl'), 1);
      columns.push('_detailUrl');
    }

    fs.mkdirSync(OUT_DIR, { recursive: true });
    const jsonPath = path.join(OUT_DIR, `${OUT_NAME}.json`);
    const csvPath = path.join(OUT_DIR, `${OUT_NAME}.csv`);

    fs.writeFileSync(
      jsonPath,
      JSON.stringify(
        {
          source: START_URL,
          scraped_at: new Date().toISOString(),
          record_count: all.length,
          columns,
          records: all,
        },
        null,
        2
      ),
      'utf8'
    );
    fs.writeFileSync(csvPath, toCsv(all, columns), 'utf8');

    log(`Wrote ${all.length} records:`);
    log(`  ${jsonPath}`);
    log(`  ${csvPath}`);
    if (!all.length) {
      log(
        'No records captured. If the results table was on screen, try setting ' +
          'SELECTOR to the table CSS selector, or check that you pressed ENTER ' +
          'on the results LIST page.'
      );
    }
  } catch (err) {
    log('ERROR:', err.message);
    log(err.stack);
    process.exitCode = 1;
  } finally {
    await browser.close();
    log('Browser closed. Done.');
  }
}

main();
