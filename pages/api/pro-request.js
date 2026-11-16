/**
 * Lead intake receiver for the site's native forms.
 *
 * Three lead types arrive here, distinguished by the body's `type` field:
 *   - (absent) / "pro"  — the "Request a pro" dispatch form on /pros.
 *   - "home-value"      — the free CMA form on /whats-my-home-worth.
 *   - "referral"        — the real-estate referral intake on /realtor.
 *
 * A lead is handled the way this site already handles server-side lead
 * signals: a single structured line to stdout, which on Vercel appears in
 * the project's runtime logs. Pro requests are prefixed [PRO-REQUEST] and
 * the real-estate leads [LEAD], so each stream can be filtered out of the
 * logs, the same convention /api/track uses for [LEAD-ATTR].
 *
 * If SMTP is configured in the environment (SMTP_HOST, SMTP_USER, SMTP_PASS,
 * optional SMTP_PORT, PRO_REQUEST_TO and LEAD_TO), the lead is also emailed
 * to the Sanches Group inbox (hello@joefsanches.com by default) so it lands
 * next to the other site leads. Without SMTP configured the log line is the
 * record — nothing is silently dropped, and no credentials are ever
 * hardcoded here.
 */

import nodemailer from 'nodemailer';

const TRADES = new Set([
  'Garage Doors',
  'Electrical',
  'Plumbing',
  'HVAC',
  'Painting',
  'Drywall',
  'Cleaning',
  'Something Else',
]);

const REFERRAL_INTENTS = new Set(['Buying', 'Selling', 'Both', 'Not sure yet']);

function clean(value, max = 300) {
  if (typeof value !== 'string') return '';
  // Strip newlines so a crafted payload cannot forge extra log lines.
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, max);
}

// Email delivery — only when the deployment carries SMTP settings. A mail
// failure must not turn a received lead into a visitor-facing error: the log
// line written before this runs is already the durable record.
async function deliverEmail({ to, subject, lines, failPrefix }) {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return;
  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transport.sendMail({
      from: SMTP_USER,
      to,
      subject,
      text: lines.join('\n'),
    });
  } catch (err) {
    console.log(`${failPrefix} ${String(err && err.message || err).slice(0, 200)}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  if (!body || typeof body !== 'object') body = {};

  const type = clean(body.type, 20);
  const page = clean(body.page, 120);
  const at = new Date().toISOString();

  // --- Real-estate leads: home valuation requests and referral intake. ---
  if (type === 'home-value' || type === 'referral') {
    const record =
      type === 'home-value'
        ? {
            type,
            name: clean(body.name, 120),
            email: clean(body.email, 120),
            phone: clean(body.phone, 40),
            address: clean(body.address, 200),
            page,
            at,
          }
        : {
            type,
            name: clean(body.name, 120),
            phone: clean(body.phone, 40),
            email: clean(body.email, 120),
            intent: clean(body.intent, 40),
            location: clean(body.location, 160),
            timeline: clean(body.timeline, 80),
            notes: clean(body.notes, 1000),
            page,
            at,
          };

    // A home-value lead needs the home and a way to send the CMA back; a
    // referral lead needs to know who is moving, where, and how to reach
    // them. Anything less is bounced back to the form.
    if (!record.name) {
      return res.status(400).json({ ok: false, error: 'missing_fields' });
    }
    if (type === 'home-value') {
      if (!record.address || (!record.email && !record.phone)) {
        return res.status(400).json({ ok: false, error: 'missing_fields' });
      }
    } else {
      if (!REFERRAL_INTENTS.has(record.intent)) record.intent = 'Not sure yet';
      if (!record.location || (!record.phone && !record.email)) {
        return res.status(400).json({ ok: false, error: 'missing_fields' });
      }
    }

    console.log(`[LEAD] ${JSON.stringify(record)}`);

    const to =
      process.env.LEAD_TO || process.env.PRO_REQUEST_TO || 'hello@joefsanches.com';
    if (type === 'home-value') {
      await deliverEmail({
        to,
        subject: `Home value lead — ${record.name} — ${record.address}`,
        failPrefix: '[LEAD-EMAIL-FAILED]',
        lines: [
          'New home valuation (free CMA) request from joefsanches.com',
          '',
          `Name: ${record.name}`,
          `Property address: ${record.address}`,
          `Email: ${record.email || '(not given)'}`,
          `Phone: ${record.phone || '(not given)'}`,
          '',
          `Submitted from: ${record.page || '/whats-my-home-worth'} at ${record.at}`,
        ],
      });
    } else {
      await deliverEmail({
        to,
        subject: `Referral lead — ${record.name} — ${record.intent} — ${record.location}`,
        failPrefix: '[LEAD-EMAIL-FAILED]',
        lines: [
          'New real-estate referral intake from joefsanches.com',
          '',
          `Name: ${record.name}`,
          `Phone: ${record.phone || '(not given)'}`,
          `Email: ${record.email || '(not given)'}`,
          `Buying / selling: ${record.intent}`,
          `Where: ${record.location}`,
          `Timeline: ${record.timeline || '(not given)'}`,
          '',
          'Notes:',
          record.notes || '(none)',
          '',
          `Submitted from: ${record.page || '/realtor'} at ${record.at}`,
        ],
      });
    }

    return res.status(200).json({ ok: true });
  }

  // --- Pro dispatch requests (the original /pros form; unchanged). ---
  const record = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    address: clean(body.address, 200),
    trade: clean(body.trade, 40),
    description: clean(body.description, 1000),
    timing: clean(body.timing, 80),
    page,
    at,
  };

  // Name, a way to text back, the trade and what the job is are the minimum a
  // dispatcher can act on. Anything less is bounced back to the form.
  if (!record.name || !record.phone || !record.description) {
    return res.status(400).json({ ok: false, error: 'missing_fields' });
  }
  if (!TRADES.has(record.trade)) record.trade = 'Something Else';

  console.log(`[PRO-REQUEST] ${JSON.stringify(record)}`);

  await deliverEmail({
    to: process.env.PRO_REQUEST_TO || 'hello@joefsanches.com',
    subject: `Pro request — ${record.trade} — ${record.name}`,
    failPrefix: '[PRO-REQUEST-EMAIL-FAILED]',
    lines: [
      `Name: ${record.name}`,
      `Phone: ${record.phone}`,
      `City / address: ${record.address || '(not given)'}`,
      `Trade: ${record.trade}`,
      `Preferred timing: ${record.timing || '(not given)'}`,
      '',
      'Job description:',
      record.description,
      '',
      `Submitted from: ${record.page || '/pros'} at ${record.at}`,
    ],
  });

  return res.status(200).json({ ok: true });
}
