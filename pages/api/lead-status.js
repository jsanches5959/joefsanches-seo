/**
 * Delivery status check for the lead form.
 *
 * Reports WHICH delivery channel is configured — never the credential
 * itself. Only presence and length are exposed, so a misconfigured value
 * can be diagnosed without the secret leaving the server.
 *
 * Visit /api/lead-status in a browser to see whether form submissions
 * will be emailed or will fall back to opening the visitor's mail app.
 */
export default function handler(req, res) {
  const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
  const smtpUser = process.env.SMTP_USER || process.env.LEAD_TO_EMAIL || 'hello@joefsanches.com';

  const channels = {
    smtp: Boolean(smtpPass),
    resend: Boolean(process.env.RESEND_API_KEY),
    web3forms: Boolean(process.env.WEB3FORMS_KEY),
  };

  const active =
    (channels.smtp && 'smtp') ||
    (channels.resend && 'resend') ||
    (channels.web3forms && 'web3forms') ||
    null;

  // Google app passwords are 16 characters once spaces are stripped.
  // A different length is the most common reason SMTP auth fails.
  let passwordShape = null;
  if (channels.smtp) {
    passwordShape =
      smtpPass.length === 16
        ? 'looks like a Google app password (16 chars)'
        : `unexpected length: ${smtpPass.length} chars (Google app passwords are 16)`;
  }

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    delivery: active,
    willEmail: Boolean(active),
    behaviour: active
      ? 'Form submissions are emailed directly.'
      : 'No delivery channel configured — the form falls back to opening the visitor’s mail app.',
    channels,
    sendingAccount: smtpUser,
    passwordShape,
    checkedAt: new Date().toISOString(),
  });
}
