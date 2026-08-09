/**
 * Lead form receiver.
 *
 * Delivery is pluggable via environment variables, checked in order:
 *   SMTP_USER + SMTP_PASS   (Gmail / Google Workspace app password by default)
 *   RESEND_API_KEY (+ optional LEAD_TO_EMAIL, LEAD_FROM_EMAIL)
 *   WEB3FORMS_KEY
 *
 * If none is configured the route responds with delivered:false and the
 * client falls back to opening a prefilled email, so a submission is never
 * silently dropped.
 *
 * Every submission is also written to stdout (Vercel runtime logs) as a
 * backstop, regardless of delivery outcome.
 */

const TO_EMAIL = process.env.LEAD_TO_EMAIL || 'hello@joefsanches.com';

/** Trim, cap length, and strip CR/LF — the latter prevents both log-line
 *  forgery and email header injection via fields used in the subject. */
function clean(value, max) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, max);
}

/** Message body may keep newlines, but is still length-capped. */
function cleanMultiline(value, max) {
  if (typeof value !== 'string') return '';
  return value.replace(/\r/g, '').trim().slice(0, max);
}

function buildEmail(lead) {
  const src = lead.source ? ` [via ${lead.source}]` : '';
  const subject = `New lead — ${lead.service || 'General'} — ${lead.name}${src}`;

  const lines = [
    `Name:     ${lead.name}`,
    `Phone:    ${lead.phone || '—'}`,
    `Email:    ${lead.email || '—'}`,
    `Service:  ${lead.service || '—'}`,
    '',
    'Message:',
    lead.message || '(none)',
    '',
    '--------------------------------',
    `Found you via: ${lead.source || 'Unknown'}${lead.channel ? ` (${lead.channel})` : ''}`,
    `First page:    ${lead.landing || '—'}`,
    lead.campaign ? `Campaign:      ${lead.campaign}` : null,
    `Submitted:     ${lead.at}`,
  ].filter((l) => l !== null);

  return { subject, text: lines.join('\n') };
}

async function deliverViaSmtp(lead) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return false;

  // Imported lazily so the route still builds and runs when SMTP is unused.
  const nodemailer = (await import('nodemailer')).default;

  const port = Number(process.env.SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const { subject, text } = buildEmail(lead);
  await transport.sendMail({
    // Gmail requires From to be the authenticated account (or a verified alias).
    from: `"Sanches Group Website" <${process.env.LEAD_FROM_EMAIL || user}>`,
    to: TO_EMAIL,
    subject,
    text,
    ...(lead.email ? { replyTo: lead.email } : {}),
  });
  return true;
}

async function deliverViaResend(lead) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  const { subject, text } = buildEmail(lead);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || 'onboarding@resend.dev',
      to: [TO_EMAIL],
      subject,
      text,
      ...(lead.email ? { reply_to: lead.email } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error(`[LEAD] Resend delivery failed ${res.status}: ${detail.slice(0, 300)}`);
    return false;
  }
  return true;
}

async function deliverViaWeb3Forms(lead) {
  const key = process.env.WEB3FORMS_KEY;
  if (!key) return false;

  const { subject } = buildEmail(lead);
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: key,
      subject,
      from_name: 'joefsanches.com',
      name: lead.name,
      phone: lead.phone,
      email: lead.email || TO_EMAIL,
      service: lead.service,
      message: lead.message,
      found_via: `${lead.source || 'Unknown'} (${lead.channel || 'Unknown'})`,
      first_page: lead.landing,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error(`[LEAD] Web3Forms delivery failed ${res.status}: ${detail.slice(0, 300)}`);
    return false;
  }
  return true;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid request' });
  }

  // Honeypot — bots fill it, people never see it.
  if (clean(body.company, 100)) {
    return res.status(200).json({ delivered: true });
  }

  const attr = body.attribution && typeof body.attribution === 'object' ? body.attribution : {};

  const lead = {
    name: clean(body.name, 100),
    phone: clean(body.phone, 40),
    email: clean(body.email, 160),
    service: clean(body.service, 80),
    message: cleanMultiline(body.message, 4000),
    source: clean(attr.source, 60),
    channel: clean(attr.channel, 40),
    landing: clean(attr.landing, 160),
    campaign: clean(attr.campaign, 60),
    at: new Date().toISOString(),
  };

  if (!lead.name || (!lead.phone && !lead.email)) {
    return res
      .status(400)
      .json({ error: 'Name plus a phone number or email is required' });
  }

  // Backstop record, written whether or not delivery succeeds.
  console.log(
    `[LEAD] ${JSON.stringify({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      service: lead.service,
      message: lead.message.replace(/\n+/g, ' ').slice(0, 500),
      source: lead.source,
      channel: lead.channel,
      landing: lead.landing,
      at: lead.at,
    })}`
  );

  // Try each configured channel in turn. Each is isolated so that a failure
  // in one (expired app password, provider outage) still falls through to the
  // next rather than aborting the chain.
  let delivered = false;
  for (const [label, deliver] of [
    ['SMTP', deliverViaSmtp],
    ['Resend', deliverViaResend],
    ['Web3Forms', deliverViaWeb3Forms],
  ]) {
    try {
      if (await deliver(lead)) {
        delivered = true;
        console.log(`[LEAD] Delivered via ${label}`);
        break;
      }
    } catch (err) {
      console.error(`[LEAD] ${label} threw: ${String(err).slice(0, 300)}`);
    }
  }

  if (!delivered) {
    console.warn(
      '[LEAD] No delivery channel configured or delivery failed — client will fall back to mailto.'
    );
  }

  return res.status(200).json({ delivered });
}
