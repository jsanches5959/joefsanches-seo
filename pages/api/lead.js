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
  // The sending account defaults to the site's own mailbox, so enabling SMTP
  // only requires configuring the app password itself.
  const user = (process.env.SMTP_USER || TO_EMAIL).trim();
  // Google displays app passwords in four spaced groups ("abcd efgh ijkl mnop").
  // Strip whitespace so a pasted-as-shown value still authenticates.
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
  if (!pass) return false;

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


/**
 * FormSubmit — a free forwarding service that needs no account and no API
 * key. Submissions POST to formsubmit.co/<destination address>, and the
 * service forwards them by email.
 *
 * This is the fallback that works with zero configuration, so the form still
 * delivers when no credential is present. The destination address is already
 * published across the site, so putting it in the endpoint reveals nothing
 * new. It runs last, after any properly configured channel.
 *
 * FormSubmit requires a one-time activation: the first submission triggers a
 * confirmation email to the destination, and delivery begins once the link in
 * it is clicked.
 */
async function deliverViaFormSubmit(lead) {
  if (process.env.DISABLE_FORMSUBMIT === '1') return false;

  const { subject } = buildEmail(lead);
  const res = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(TO_EMAIL)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: subject,
        _template: 'table',
        _captcha: 'false',
        Name: lead.name,
        Phone: lead.phone || '—',
        Email: lead.email || '—',
        Service: lead.service || '—',
        Message: lead.message || '(none)',
        'Found via': `${lead.source || 'Unknown'}${lead.channel ? ` (${lead.channel})` : ''}`,
        'First page': lead.landing || '—',
        Submitted: lead.at,
      }),
    }
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error(`[LEAD] FormSubmit failed ${res.status}: ${detail.slice(0, 300)}`);
    return false;
  }
  const body = await res.json().catch(() => ({}));
  if (body && body.success === 'false') {
    console.error(`[LEAD] FormSubmit rejected: ${JSON.stringify(body).slice(0, 300)}`);
    return false;
  }
  return true;
}


/**
 * Google Forms — the primary destination.
 *
 * Submissions POST to the form's public formResponse endpoint, which needs no
 * credential. Google records the response in the linked spreadsheet and, when
 * response notifications are enabled on the form, emails the owner.
 *
 * Field ids come from the form's own pre-filled link. The service selection is
 * a multiple-choice question, and an unrecognised choice can be dropped, so the
 * selection is also written into the free-text details field. That way the
 * service is never lost even if the choice does not match an option exactly.
 *
 * Set DISABLE_GOOGLE_FORM=1 to turn this off.
 */
const GOOGLE_FORM_ID = '1FAIpQLSeW7v97edpgF1UOf_R_vN0KNlDDNsZwqcDzGJNJU_0CbZmrNg';
const GOOGLE_FORM_FIELDS = {
  name: 'entry.895299563',
  phone: 'entry.858160361',
  email: 'entry.722361172',
  service: 'entry.1168278347',
  details: 'entry.1435707068',
};

async function deliverViaGoogleForm(lead) {
  if (process.env.DISABLE_GOOGLE_FORM === '1') return false;

  // Everything worth keeping goes into the free-text field as well, so no
  // detail depends on the multiple-choice value being accepted.
  const details = [
    lead.message || '(no message)',
    '',
    `Service: ${lead.service || '—'}`,
    `Found via: ${lead.source || 'Unknown'}${lead.channel ? ` (${lead.channel})` : ''}`,
    `First page: ${lead.landing || '—'}`,
    lead.campaign ? `Campaign: ${lead.campaign}` : null,
    `Submitted: ${lead.at}`,
  ]
    .filter((l) => l !== null)
    .join('\n');

  const form = new URLSearchParams();
  form.set(GOOGLE_FORM_FIELDS.name, lead.name);
  form.set(GOOGLE_FORM_FIELDS.phone, lead.phone || '—');
  form.set(GOOGLE_FORM_FIELDS.email, lead.email || '—');
  if (lead.service) form.set(GOOGLE_FORM_FIELDS.service, lead.service);
  form.set(GOOGLE_FORM_FIELDS.details, details);

  const res = await fetch(
    `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
      redirect: 'follow',
    }
  );

  // Google answers a successful submission with 200, and historically also
  // with a redirect to its confirmation page. Both mean accepted.
  if (res.status === 200 || (res.status >= 300 && res.status < 400)) return true;

  console.error(`[LEAD] Google Form returned ${res.status}`);
  return false;
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
    ['GoogleForm', deliverViaGoogleForm],
    ['SMTP', deliverViaSmtp],
    ['Resend', deliverViaResend],
    ['Web3Forms', deliverViaWeb3Forms],
    ['FormSubmit', deliverViaFormSubmit],
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
