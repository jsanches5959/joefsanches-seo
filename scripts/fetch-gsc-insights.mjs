/**
 * fetch-gsc-insights.mjs
 * Pulls top queries from Google Search Console Search Analytics API
 * and saves them to gsc-insights.json for Claude to analyze.
 *
 * SETUP (one-time):
 * 1. Go to Google Cloud Console → Enable "Google Search Console API"
 * 2. IAM & Admin → Service Accounts → use same account as indexing
 *    OR create new: joefsanches-gsc
 * 3. Download JSON key → save as ~/Downloads/google-indexing-sa.json
 * 4. In Google Search Console → Settings → Users and permissions
 *    → Add the service account email as Owner
 *
 * Run: node scripts/fetch-gsc-insights.mjs
 */

import fs from 'fs';
import path from 'path';
import os from 'os';

const SA_KEY_PATH = path.join(os.homedir(), 'Downloads', 'google-indexing-sa.json');
const SITE_URL = 'sc-domain:joefsanches.com';
const OUTPUT_PATH = path.join(process.cwd(), 'gsc-insights.json');

async function main() {
  if (!fs.existsSync(SA_KEY_PATH)) {
    console.error(`Service account key not found at ${SA_KEY_PATH}`);
    console.error('See SETUP instructions at the top of this file.');
    process.exit(1);
  }

  const serviceAccountKey = JSON.parse(fs.readFileSync(SA_KEY_PATH, 'utf8'));
  console.log(`Using service account: ${serviceAccountKey.client_email}`);

  let google;
  try {
    const mod = await import('googleapis');
    google = mod.google;
  } catch {
    console.error('Run: npm install googleapis');
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccountKey,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const authClient = await auth.getClient();
  const webmasters = google.webmasters({ version: 'v3', auth: authClient });

  // Date range: last 90 days
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 90);
  const fmt = d => d.toISOString().split('T')[0];

  console.log(`Fetching queries from ${fmt(startDate)} to ${fmt(endDate)}...`);

  const res = await webmasters.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: ['query'],
      rowLimit: 500,
      orderBy: [{ fieldName: 'impressions', sortOrder: 'DESCENDING' }],
    },
  });

  const rows = res.data.rows || [];
  console.log(`Retrieved ${rows.length} queries.`);

  // Identify gap keywords: high impressions, low clicks, position > 5
  const gaps = rows
    .filter(r => r.impressions >= 20 && r.clicks <= 5 && r.position > 5)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 50);

  // Top performers
  const topClicks = rows
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 20);

  const insights = {
    generated_at: new Date().toISOString(),
    total_queries: rows.length,
    top_by_clicks: topClicks.map(r => ({
      query: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: (r.ctr * 100).toFixed(1) + '%',
      position: r.position.toFixed(1),
    })),
    gap_keywords: gaps.map(r => ({
      query: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: (r.ctr * 100).toFixed(1) + '%',
      position: r.position.toFixed(1),
    })),
    all_queries: rows.map(r => ({
      query: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      position: r.position.toFixed(1),
    })),
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(insights, null, 2));
  console.log(`\n✅ Saved to ${OUTPUT_PATH}`);
  console.log(`   Top clicks: ${topClicks[0]?.keys[0]} (${topClicks[0]?.clicks} clicks)`);
  console.log(`   Top gap: ${gaps[0]?.keys[0]} (${gaps[0]?.impressions} impressions, position ${gaps[0]?.position?.toFixed(1)})`);
  console.log(`\nShare gsc-insights.json with Claude to generate targeted posts.`);
}

main().catch(e => { console.error(e.message); process.exit(1); });
