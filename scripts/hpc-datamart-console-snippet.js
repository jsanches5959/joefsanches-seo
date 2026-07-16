/* ===========================================================================
 * HPC Texas datamart — browser-console scraper
 * ---------------------------------------------------------------------------
 * Run this on the RESULTS LIST page of the datamart, e.g.
 *   https://vo.licensing.hpc.texas.gov/datamart/list.do?anchor=...&pageNumber=1
 * Open DevTools (F12) -> Console, paste the whole thing, press Enter.
 * It paginates through every page using YOUR logged-in session and downloads
 * a CSV + prints the rows. Nothing leaves your browser.
 * =========================================================================== */
(async () => {
  const origin = location.origin;
  const path = location.pathname; // /datamart/list.do
  const anchor = new URLSearchParams(location.search).get('anchor');
  if (!anchor) {
    console.error('No `anchor` in the URL. Make sure you are on a list.do results page.');
    return;
  }

  const DELAY_MS = 500;       // politeness delay between pages
  const MAX_PAGES = 2000;     // safety cap
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function parseTable(doc) {
    const tables = Array.from(doc.querySelectorAll('table'));
    let best = null, bestScore = -1;
    for (const t of tables) {
      const rows = t.querySelectorAll('tr');
      const cols = rows[0] ? rows[0].querySelectorAll('td,th').length : 0;
      if (cols >= 2 && rows.length >= 2) {
        const hasLinks = t.querySelector('a[href*="do?"]') ? 1000 : 0;
        const score = rows.length + hasLinks;
        if (score > bestScore) { bestScore = score; best = t; }
      }
    }
    if (!best) return { headers: [], rows: [] };
    const trs = Array.from(best.querySelectorAll('tr'));
    let hi = trs.findIndex((r) => r.querySelector('th'));
    if (hi < 0) hi = 0;
    const headers = Array.from(trs[hi].querySelectorAll('th,td'))
      .map((c, i) => (c.textContent || '').replace(/\s+/g, ' ').trim() || `col_${i + 1}`);
    const rows = [];
    for (let i = hi + 1; i < trs.length; i++) {
      const cells = Array.from(trs[i].querySelectorAll('td'));
      if (!cells.length) continue;
      const o = {};
      let nonEmpty = false;
      cells.forEach((c, idx) => {
        const key = headers[idx] || `col_${idx + 1}`;
        const txt = (c.textContent || '').replace(/\s+/g, ' ').trim();
        if (txt) nonEmpty = true;
        o[key] = txt;
      });
      const a = trs[i].querySelector('a[href]');
      if (a) { try { o._detailUrl = new URL(a.getAttribute('href'), doc.baseURI).href; } catch {} }
      if (nonEmpty) rows.push(o);
    }
    return { headers, rows };
  }

  const all = [];
  const seen = new Set();
  let headers = [];
  let prevFirst = null;

  for (let p = 1; p <= MAX_PAGES; p++) {
    const url = `${origin}${path}?anchor=${encodeURIComponent(anchor)}&pageNumber=${p}`;
    const res = await fetch(url, { credentials: 'same-origin' });
    if (!res.ok) { console.warn(`Page ${p}: HTTP ${res.status} — stopping.`); break; }
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const { headers: h, rows } = parseTable(doc);
    if (h.length && !headers.length) headers = h;
    if (!rows.length) { console.log(`Page ${p}: 0 rows — done.`); break; }
    const first = JSON.stringify(rows[0]);
    if (first === prevFirst) { console.log(`Page ${p}: repeat of previous page — done.`); break; }
    prevFirst = first;
    let added = 0;
    for (const r of rows) {
      const fp = JSON.stringify(r);
      if (seen.has(fp)) continue;
      seen.add(fp); all.push(r); added++;
    }
    console.log(`Page ${p}: ${rows.length} rows (${added} new). Total: ${all.length}`);
    await sleep(DELAY_MS);
  }

  // Build column list + CSV
  const cols = [];
  const push = (c) => { if (c && !cols.includes(c)) cols.push(c); };
  headers.forEach(push);
  all.forEach((r) => Object.keys(r).forEach(push));
  if (cols.includes('_detailUrl')) { cols.splice(cols.indexOf('_detailUrl'), 1); cols.push('_detailUrl'); }
  const esc = (v) => {
    const s = v == null ? '' : String(v);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [cols.map(esc).join(',')]
    .concat(all.map((r) => cols.map((c) => esc(r[c])).join(',')))
    .join('\n');

  // Download
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `hpc-texas-licensing-${Date.now()}.csv`;
  document.body.appendChild(a); a.click(); a.remove();

  console.log(`DONE. ${all.length} records. CSV downloaded. Also available as window.__hpcData`);
  window.__hpcData = all;
  console.table(all.slice(0, 20));
})();
