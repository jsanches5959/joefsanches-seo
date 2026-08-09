/**
 * Attribution beacon receiver.
 *
 * Writes a single structured line to stdout per event. On Vercel these appear
 * in the project's runtime logs, which are included with the plan — no
 * analytics service, no database, no third-party account.
 *
 * Lines are prefixed with [LEAD-ATTR] so they can be filtered out of the log
 * stream. Nothing personally identifying is recorded: no IP, no user agent,
 * no cookie, no identifier of any kind.
 */

const ALLOWED_EVENTS = new Set([
  'visit',
  'call_click',
  'text_click',
  'email_click',
]);

function clean(value, max = 200) {
  if (typeof value !== 'string') return '';
  // Strip newlines so a crafted payload cannot forge extra log lines.
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, max);
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }
    if (!body || typeof body !== 'object') body = {};

    const event = clean(body.event, 20);
    if (!ALLOWED_EVENTS.has(event)) {
      // Unknown event names are ignored rather than logged, so the beacon
      // endpoint cannot be used to write arbitrary content into the logs.
      return res.status(204).end();
    }

    const record = {
      event,
      source: clean(body.source, 60) || 'Unknown',
      channel: clean(body.channel, 40) || 'Unknown',
      landing: clean(body.landing, 120),
      page: clean(body.page, 120),
      referrer: clean(body.referrer, 200),
      campaign: clean(body.campaign, 60),
      at: new Date().toISOString(),
    };

    console.log(`[LEAD-ATTR] ${JSON.stringify(record)}`);
  } catch {
    // Never surface an error to the visitor for a tracking call.
  }

  // 204 keeps the response empty and cheap; sendBeacon ignores the body.
  return res.status(204).end();
}
