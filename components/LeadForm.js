import { useState } from 'react';

const SERVICES = [
  'Tree Removal / Trimming',
  'Landscaping / Grounds Maintenance',
  'Remodeling / General Construction',
  'Drywall / Painting',
  'Flooring',
  'Patios / Decks',
  'Handyman / Repairs',
  'Roofing',
  'Electrical / Plumbing / HVAC',
  'Pressure Washing',
  'Janitorial / Facilities Maintenance',
  'Unit Turns / Multi-Family',
  'Government Contracting',
  'Buying or Selling a Home',
  'Something else',
];

const STORAGE_KEY = 'jfs_attr_v1';

/**
 * Lead capture form.
 *
 * Posts to /api/lead. If the server has no delivery channel configured it
 * reports delivered:false, and the form falls back to opening a prefilled
 * email rather than showing a success message for a lead that went nowhere.
 */
// The pick most visitors arrive for. A page can preselect its own trade
// instead, so a tree lead is not filed under remodeling by default.
const DEFAULT_SERVICE = 'Remodeling / General Construction';

export default function LeadForm({ heading, blurb, compact = false, defaultService, placeholder }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto | error
  const [error, setError] = useState('');
  // Held so the fallback panel can show what they typed and offer other routes.
  const [pending, setPending] = useState(null);
  const [copied, setCopied] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: real people leave this hidden field empty.
    if (fd.get('company')) {
      setStatus('sent');
      return;
    }

    const payload = {
      name: (fd.get('name') || '').toString().trim(),
      phone: (fd.get('phone') || '').toString().trim(),
      email: (fd.get('email') || '').toString().trim(),
      service: (fd.get('service') || '').toString(),
      message: (fd.get('message') || '').toString().trim(),
    };

    if (!payload.name || (!payload.phone && !payload.email)) {
      setError('Please add your name and either a phone number or an email.');
      setStatus('error');
      return;
    }

    // Attach how they found the site, captured on first visit.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const a = JSON.parse(raw);
        payload.attribution = {
          source: a.source,
          channel: a.channel,
          landing: a.landing,
          campaign: a.campaign,
        };
      }
    } catch {
      /* attribution is optional */
    }

    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.delivered) {
        setStatus('sent');
        form.reset();
        return;
      }

      // No delivery channel configured (or delivery failed). Show every way
      // to reach Joe rather than silently firing a mailto: a visitor with no
      // mail client configured would otherwise hit a dead end with their
      // message lost. Their input is deliberately not cleared.
      setPending(payload);
      setStatus('mailto');
    } catch {
      setPending(payload);
      setStatus('mailto');
    }
  }

  function buildMailto(p) {
    try {
      const src = p.attribution?.source ? ` [via ${p.attribution.source}]` : '';
      const subject = `Website inquiry — ${p.service || 'General'}${src}`;
      const body = [
        `Name: ${p.name}`,
        p.phone ? `Phone: ${p.phone}` : null,
        p.email ? `Email: ${p.email}` : null,
        `Interested in: ${p.service || 'Not specified'}`,
        '',
        p.message || '(no message)',
        p.attribution
          ? `\n---\nFound you via: ${p.attribution.source} (${p.attribution.channel})`
          : '',
      ]
        .filter((l) => l !== null)
        .join('\n');

      return {
        href:
          `mailto:hello@joefsanches.com?subject=${encodeURIComponent(subject)}` +
          `&body=${encodeURIComponent(body)}`,
        plain: body,
      };
    } catch {
      return { href: 'mailto:hello@joefsanches.com', plain: '' };
    }
  }

  async function copyDetails() {
    const { plain } = buildMailto(pending) || {};
    try {
      await navigator.clipboard.writeText(plain || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  if (status === 'sent') {
    return (
      <div className="lf-done">
        <h3>Got it — thank you.</h3>
        <p>
          Your message is in. We read every one and typically respond
          the same day. If it&apos;s urgent, call or text{' '}
          <a href="tel:5126638867">512-663-8867</a>.
        </p>
        <style jsx>{styles}</style>
      </div>
    );
  }

  return (
    <div className={`lf${compact ? ' lf-compact' : ''}`}>
      {heading ? <h3 className="lf-title">{heading}</h3> : null}
      {blurb ? <p className="lf-blurb">{blurb}</p> : null}

      {status === 'mailto' && pending && (
        <div className="lf-fallback">
          <h4>Almost there — pick how to send it</h4>
          <p>
            We couldn&apos;t send this automatically from the website. Your message is
            ready below — use whichever is easiest. Fastest is usually a text.
          </p>
          <div className="lf-fb-actions">
            <a href="tel:5126638867" className="lf-fb-btn primary">Call 512-663-8867</a>
            <a
              href={`sms:5126638867?&body=${encodeURIComponent(
                `${pending.name} — ${pending.service || 'inquiry'}. ${pending.message || ''}`.slice(0, 300)
              )}`}
              className="lf-fb-btn"
            >
              Text Joe
            </a>
            <a href={(buildMailto(pending) || {}).href} className="lf-fb-btn">Open Email</a>
            <button type="button" className="lf-fb-btn" onClick={copyDetails}>
              {copied ? 'Copied ✓' : 'Copy Details'}
            </button>
          </div>
          <pre className="lf-fb-pre">{(buildMailto(pending) || {}).plain}</pre>
          <p className="lf-fb-fine">
            Or email <a href="mailto:hello@joefsanches.com">hello@joefsanches.com</a> directly.
          </p>
        </div>
      )}

      <form onSubmit={onSubmit} noValidate>
        {/* Honeypot — hidden from people, tempting to bots */}
        <div className="lf-hp" aria-hidden="true">
          <label htmlFor="lf-company">Company</label>
          <input id="lf-company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="lf-row">
          <label>
            <span>Name <em>*</em></span>
            <input name="name" required autoComplete="name" placeholder="Your name" />
          </label>
          <label>
            <span>Phone</span>
            <input name="phone" type="tel" autoComplete="tel" placeholder="512-555-0100" />
          </label>
        </div>

        <div className="lf-row">
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" placeholder="you@example.com" />
          </label>
          <label>
            <span>I need help with</span>
            <select
              name="service"
              defaultValue={SERVICES.includes(defaultService) ? defaultService : DEFAULT_SERVICE}
            >
              {SERVICES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="lf-full">
          <span>Details</span>
          <textarea
            name="message"
            rows={compact ? 3 : 4}
            placeholder={placeholder || 'Property address, scope of work, timeline, or anything else that helps.'}
          />
        </label>

        {status === 'error' && <p className="lf-error">{error}</p>}

        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send to Joe'}
        </button>
        <p className="lf-fine">
          Goes straight to Joe. No call center, no mailing list.
        </p>
      </form>
      <style jsx>{styles}</style>
    </div>
  );
}

const styles = `
  /* Light by default to match the site. Every colour is a token with a
     fallback, so a page can retint the form without forking it. */
  .lf { width: 100%; }
  .lf-title {
    font-size: 20px; font-weight: 900; color: var(--ink, #16180f);
    margin: 0 0 8px; letter-spacing: -0.01em;
  }
  .lf-blurb {
    font-size: 16px; color: var(--text, #3d4135);
    line-height: 1.7; margin: 0 0 22px;
  }
  .lf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  label { display: block; }
  label span {
    display: block; font-size: 12px; font-weight: 900; letter-spacing: 1px;
    text-transform: uppercase; color: var(--olive-ink, #4f5a3c); margin-bottom: 7px;
  }
  label span em { font-style: normal; opacity: .7; }
  .lf-full { display: block; margin-bottom: 16px; }
  input, select, textarea {
    width: 100%; padding: 12px 14px;
    background: #fff;
    border: 1px solid rgba(22,24,15,0.18);
    border-radius: 6px; color: var(--ink, #16180f);
    font-size: 16px; font-family: inherit;
    transition: border-color .15s ease, box-shadow .15s ease;
  }
  input::placeholder, textarea::placeholder { color: #80857a; }
  input:focus, select:focus, textarea:focus {
    outline: none; border-color: var(--gold, #C8A84B);
    box-shadow: 0 0 0 3px rgba(200,168,75,0.22);
  }
  textarea { resize: vertical; min-height: 90px; }
  button {
    width: 100%; padding: 16px 24px;
    background: var(--gold, #C8A84B); color: #16180f;
    border: none; border-radius: 6px; cursor: pointer;
    font-weight: 900; font-size: 15px; letter-spacing: .8px;
    text-transform: uppercase; font-family: inherit;
    transition: filter .15s ease, transform .15s ease;
  }
  button:hover:not(:disabled) { filter: brightness(1.06); transform: translateY(-1px); }
  button:disabled { opacity: .6; cursor: default; }
  .lf-fine {
    font-size: 12px; color: var(--muted, #5f6455);
    text-align: center; margin: 12px 0 0;
  }
  .lf-error {
    font-size: 14px; color: #8f2424; margin: 0 0 12px;
    padding: 10px 12px; border-radius: 6px;
    background: #fbeaea; border: 1px solid #efc4c4;
  }
  .lf-note {
    font-size: 14px; color: var(--text, #3d4135);
    margin: 0 0 16px; padding: 12px 14px; border-radius: 6px;
    background: #fbf6e6; border: 1px solid rgba(200,168,75,0.45);
  }
  .lf-note a, .lf-done a { color: var(--gold-ink, #7d6318); text-decoration: underline; }
  .lf-fallback {
    border: 1px solid rgba(200,168,75,.5);
    background: #fbf6e6;
    border-radius: 8px; padding: 20px; margin-bottom: 20px;
  }
  .lf-fallback h4 {
    margin: 0 0 8px; font-size: 15px; font-weight: 800;
    color: var(--ink, #16180f); text-transform: uppercase; letter-spacing: 1px;
  }
  .lf-fallback > p {
    margin: 0 0 16px; font-size: 15px; line-height: 1.65;
    color: var(--text, #3d4135);
  }
  .lf-fb-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
  .lf-fb-btn {
    flex: 1 1 auto; min-width: 130px; text-align: center;
    padding: 11px 16px; border-radius: 6px; cursor: pointer;
    border: 1px solid rgba(22,24,15,.2); background: #fff;
    color: var(--ink, #16180f); font-size: 13px; font-weight: 800;
    letter-spacing: .6px; text-transform: uppercase; font-family: inherit;
    text-decoration: none; width: auto;
  }
  .lf-fb-btn.primary { background: var(--gold, #C8A84B); color: #16180f; border-color: transparent; }
  .lf-fb-btn:hover { filter: brightness(1.04); }
  .lf-fb-pre {
    margin: 0 0 12px; padding: 12px 14px; max-height: 170px; overflow: auto;
    background: #fff; border: 1px solid rgba(22,24,15,.12);
    border-radius: 6px; font-size: 13px; line-height: 1.6; white-space: pre-wrap;
    color: var(--text, #3d4135); font-family: ui-monospace, Menlo, monospace;
  }
  .lf-fb-fine { margin: 0; font-size: 13px; color: var(--muted, #5f6455); }
  .lf-fb-fine a { color: var(--gold-ink, #7d6318); text-decoration: underline; }
  .lf-hp {
    position: absolute; left: -9999px; width: 1px; height: 1px;
    overflow: hidden;
  }
  .lf-done {
    padding: 32px 28px; border-radius: 8px;
    background: #f1f4ea;
    border: 1px solid rgba(107,120,84,0.35);
  }
  .lf-done h3 {
    margin: 0 0 10px; font-size: 20px; font-weight: 900;
    color: var(--ink, #16180f); letter-spacing: -.01em;
  }
  .lf-done p {
    margin: 0; font-size: 15px; line-height: 1.7;
    color: var(--text, #3d4135);
  }
  @media (max-width: 640px) {
    .lf-row { grid-template-columns: 1fr; }
  }
`;
