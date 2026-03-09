/**
 * analyze-gsc.mjs
 * Google Search Console CSV Analyzer
 * Identifies high-impression / low-click "gap" keywords and adds them
 * to the front of keyword-queue.json as high-priority targets.
 *
 * Usage: node /tmp/joefsanches-seo/scripts/analyze-gsc.mjs
 *
 * Expects GSC CSV exports in ~/Downloads/gsc-data/
 * GSC export columns: Query, Clicks, Impressions, CTR, Position
 */

import fs from 'fs';
import path from 'path';
import os from 'os';

// ── Paths ───────────────────────────────────────────────────────────────────
const HOME = os.homedir();
const GSC_DIR = path.join(HOME, 'Downloads', 'gsc-data');
const SEO_DIR = '/tmp/joefsanches-seo';
const QUEUE_FILE = path.join(SEO_DIR, 'keyword-queue.json');
const USED_FILE = path.join(SEO_DIR, 'keyword-used.json');

// ── Gap Keyword Criteria ─────────────────────────────────────────────────────
const MIN_IMPRESSIONS = 50;   // proven search demand
const MAX_CLICKS = 3;         // underperforming CTR
const MIN_POSITION = 5;       // not already in top 3
const MAX_POSITION = 20;      // at least showing up somewhere

// ── Helpers ──────────────────────────────────────────────────────────────────

function log(msg) {
  process.stdout.write(msg + '\n');
}

function findMostRecentCsv(dir) {
  if (!fs.existsSync(dir)) {
    log(`[GSC] Directory not found: ${dir}`);
    return null;
  }

  const files = fs.readdirSync(dir)
    .filter(f => f.toLowerCase().endsWith('.csv'))
    .map(f => {
      const fullPath = path.join(dir, f);
      const stat = fs.statSync(fullPath);
      return { name: f, path: fullPath, mtime: stat.mtimeMs };
    })
    .sort((a, b) => b.mtime - a.mtime); // newest first

  if (files.length === 0) {
    log('[GSC] No CSV files found in ' + dir);
    return null;
  }

  log(`[GSC] Found ${files.length} CSV file(s). Using most recent: ${files[0].name}`);
  return files[0].path;
}

function parseCsv(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);

  if (lines.length < 2) {
    log('[GSC] CSV appears empty or has no data rows.');
    return [];
  }

  // Detect header row — GSC exports use: Query,Clicks,Impressions,CTR,Position
  const headerLine = lines[0];
  const headers = headerLine.split(',').map(h => h.trim().toLowerCase().replace(/['"]/g, ''));

  const qIdx = headers.indexOf('query');
  const clkIdx = headers.indexOf('clicks');
  const impIdx = headers.indexOf('impressions');
  const posIdx = headers.indexOf('position');

  if (qIdx === -1 || clkIdx === -1 || impIdx === -1 || posIdx === -1) {
    log(`[GSC] Unexpected CSV header: "${headerLine}". Expected: Query, Clicks, Impressions, CTR, Position`);
    return [];
  }

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    try {
      const cols = splitCsvRow(lines[i]);
      if (cols.length < Math.max(qIdx, clkIdx, impIdx, posIdx) + 1) {
        // malformed row, skip
        continue;
      }

      const query = cols[qIdx].replace(/^["']|["']$/g, '').trim();
      const clicks = parseFloat(cols[clkIdx]) || 0;
      const impressions = parseFloat(cols[impIdx]) || 0;
      const position = parseFloat(cols[posIdx]) || 0;

      if (!query) continue;

      rows.push({ query, clicks, impressions, position });
    } catch (e) {
      // skip malformed rows silently
    }
  }

  return rows;
}

/**
 * Minimal CSV row splitter that handles quoted fields.
 * GSC exports can include commas inside quoted query fields.
 */
function splitCsvRow(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function loadJson(filePath, fallback = []) {
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    log(`[GSC] Warning: could not parse ${filePath}, treating as empty.`);
    return fallback;
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

function main() {
  log(`[GSC] Starting Google Search Console gap analysis — ${new Date().toISOString()}`);

  // 1. Find most recent CSV
  const csvPath = findMostRecentCsv(GSC_DIR);
  if (!csvPath) {
    log('[GSC] No CSV to process. Export data from GSC → Performance → Export → CSV, save to ~/Downloads/gsc-data/');
    process.exit(0);
  }

  // 2. Parse CSV
  const rows = parseCsv(csvPath);
  log(`[GSC] Parsed ${rows.length} keyword rows from CSV.`);

  if (rows.length === 0) {
    log('[GSC] No rows parsed. Check CSV format.');
    process.exit(0);
  }

  // 3. Identify gap keywords
  const gaps = rows.filter(r =>
    r.impressions > MIN_IMPRESSIONS &&
    r.clicks < MAX_CLICKS &&
    r.position >= MIN_POSITION &&
    r.position <= MAX_POSITION
  );

  log(`[GSC] Gap keyword candidates (impressions>${MIN_IMPRESSIONS}, clicks<${MAX_CLICKS}, pos ${MIN_POSITION}–${MAX_POSITION}): ${gaps.length}`);

  // 4. Load existing lists
  const usedKeywords = loadJson(USED_FILE, []);
  const queueKeywords = loadJson(QUEUE_FILE, []);

  const usedSet = new Set(usedKeywords.map(k => (k.primary || '').toLowerCase().trim()));
  const queueSet = new Set(queueKeywords.map(k => (k.primary || '').toLowerCase().trim()));

  // 5. Filter out already-known keywords
  let alreadyExisted = 0;
  const newKeywords = [];

  for (const gap of gaps) {
    const normalized = gap.query.toLowerCase().trim();
    if (usedSet.has(normalized) || queueSet.has(normalized)) {
      alreadyExisted++;
      continue;
    }
    newKeywords.push({
      primary: gap.query,
      source: 'gsc-analysis',
      impressions: Math.round(gap.impressions),
      position: Math.round(gap.position * 10) / 10
    });
  }

  // 6. Prepend new keywords to queue (high priority — proven search demand)
  if (newKeywords.length > 0) {
    const updatedQueue = [...newKeywords, ...queueKeywords];
    fs.writeFileSync(QUEUE_FILE, JSON.stringify(updatedQueue, null, 2), 'utf8');
    log(`[GSC] Wrote ${updatedQueue.length} total keywords to queue (${newKeywords.length} new prepended).`);
  } else {
    log('[GSC] No new keywords to add to queue.');
  }

  // 7. Summary
  log(`[GSC] Summary: Found ${gaps.length} gap keywords, added ${newKeywords.length} new to queue (${alreadyExisted} already existed)`);
  log(`[GSC] Done.`);
}

main();
