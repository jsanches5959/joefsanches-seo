/**
 * "Request a pro" dispatch intake receiver.
 *
 * A pro request is a lead, so it is handled the way this site already handles
 * server-side lead signals: a single structured line to stdout, which on
 * Vercel appears in the project's runtime logs. Lines are prefixed with
 * [PRO-REQUEST] so they can be filtered out of the log stream, the same
 * convention /api/track uses for [LEAD-ATTR].
 *
 * If SMTP is configured in the environment (SMTP_HOST, SMTP_USER, SMTP_PASS,
 * optional SMTP_PORT and PRO_REQUEST_TO), the request is also emailed to the
 * Sanches Group inbox so it lands next to the other site leads. Without SMTP
 * configured the log line is the record — nothing is silently dropped, and no
 * credentials are ever hardcoded here.
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

function clean(value, max = 300) {
  if (typeof value !== 'string') return '';
  // Strip newlines so a crafted payload cannot forge extra log lines.
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, max);
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

  const record = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    address: clean(body.address, 200),
    trade: clean(body.trade, 40),
    description: clean(body.description, 1000),
    timing: clean(body.timing, 80),
    page: clean(body.page, 120),
    at: new Date().toISOString(),
  };

  // Name, a way to text back, the trade and what the job is are the minimum a
  // dispatcher can act on. Anything less is bounced back to the form.
  if (!record.name || !record.phone || !record.description) {
    return res.status(400).json({ ok: false, error: 'missing_fields' });
  }
  if (!TRADES.has(record.trade)) record.trade = 'Something Else';

  console.log(`[PRO-REQUEST] ${JSON.stringify(record)}`);

  // Optional email delivery — only when the deployment carries SMTP settings.
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    try {
      const transport = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT || 587) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });
      const to = process.env.PRO_REQUEST_TO || 'hello@joefsanches.com';
      await transport.sendMail({
        from: SMTP_USER,
        to,
        subject: `Pro request — ${record.trade} — ${record.name}`,
        text: [
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
        ].join('\n'),
      });
    } catch (err) {
      // The log line above is already the durable record; a mail failure must
      // not turn a received lead into a visitor-facing error.
      console.log(`[PRO-REQUEST-EMAIL-FAILED] ${String(err && err.message || err).slice(0, 200)}`);
    }
  }

  return res.status(200).json({ ok: true });
}
