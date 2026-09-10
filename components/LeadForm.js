import { useState } from 'react';

const SERVICES = [
  'Construction / Remodeling',
  'Unit Turns / Multi-Family',
  'Facilities / Janitorial / Pressure Washing',
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
export default function LeadForm({ heading, blurb, compact = false }) {
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
          Your message is in. Joe reads every one personally and typically responds
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
            <select name="service" defaultValue={SERVICES[0]}>
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
            placeholder="Property address, scope of work, timeline, or anything else that helps."
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
  .lf { width: 100%; }
  .lf-title {
    font-size: 20px; font-weight: 900; color: var(--white, #fff);
    margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.5px;
  }
  .lf-blurb {
    font-size: 14px; color: var(--muted, rgba(180,190,160,.65));
    line-height: 1.65; margin: 0 0 22px;
  }
  .lf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  label { display: block; }
  label span {
    display: block; font-size: 10px; font-weight: 900; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--gold, #C8A84B); margin-bottom: 6px;
  }
  label span em { font-style: normal; opacity: .7; }
  .lf-full { display: block; margin-bottom: 16px; }
  input, select, textarea {
    width: 100%; padding: 12px 14px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(200,168,75,0.25);
    border-radius: 4px; color: var(--white, #fff);
    font-size: 15px; font-family: inherit;
    transition: border-color .15s ease, box-shadow .15s ease;
  }
  input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.28); }
  input:focus, select:focus, textarea:focus {
    outline: none; border-color: var(--gold, #C8A84B);
    box-shadow: 0 0 0 3px rgba(200,168,75,0.12);
  }
  select option { background: #111410; color: #fff; }
  textarea { resize: vertical; min-height: 90px; }
  button {
    width: 100%; padding: 15px 24px;
    background: var(--gold, #C8A84B); color: #0A0C08;
    border: none; border-radius: 4px; cursor: pointer;
    font-weight: 900; font-size: 14px; letter-spacing: 1px;
    text-transform: uppercase; font-family: inherit;
    transition: filter .15s ease, transform .15s ease;
  }
  button:hover:not(:disabled) { filter: brightness(1.1); transform: translateY(-1px); }
  button:disabled { opacity: .6; cursor: default; }
  .lf-fine {
    font-size: 11px; color: var(--muted, rgba(180,190,160,.65));
    text-align: center; margin: 12px 0 0;
  }
  .lf-error {
    font-size: 13px; color: #E8A0A0; margin: 0 0 12px;
    padding: 10px 12px; border-radius: 4px;
    background: rgba(200,80,80,0.08); border: 1px solid rgba(200,80,80,0.25);
  }
  .lf-note {
    font-size: 13px; color: var(--muted, rgba(180,190,160,.65));
    margin: 0 0 16px; padding: 12px 14px; border-radius: 4px;
    background: rgba(200,168,75,0.06); border: 1px solid rgba(200,168,75,0.25);
  }
  .lf-note a, .lf-done a { color: var(--gold, #C8A84B); text-decoration: underline; }
  .lf-fallback {
    border: 1px solid rgba(200,168,75,.35);
    background: rgba(200,168,75,.06);
    border-radius: 6px; padding: 20px; margin-bottom: 20px;
  }
  .lf-fallback h4 {
    margin: 0 0 8px; font-size: 15px; font-weight: 800;
    color: var(--gold, #C8A84B); text-transform: uppercase; letter-spacing: 1px;
  }
  .lf-fallback > p {
    margin: 0 0 16px; font-size: 14px; line-height: 1.65;
    color: var(--muted, rgba(180,190,160,.75));
  }
  .lf-fb-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
  .lf-fb-btn {
    flex: 1 1 auto; min-width: 130px; text-align: center;
    padding: 11px 16px; border-radius: 4px; cursor: pointer;
    border: 1px solid rgba(200,168,75,.4); background: transparent;
    color: var(--gold, #C8A84B); font-size: 13px; font-weight: 800;
    letter-spacing: .6px; text-transform: uppercase; font-family: inherit;
    text-decoration: none;
  }
  .lf-fb-btn.primary { background: var(--gold, #C8A84B); color: #0A0C08; border-color: transparent; }
  .lf-fb-btn:hover { filter: brightness(1.12); }
  .lf-fb-pre {
    margin: 0 0 12px; padding: 12px 14px; max-height: 170px; overflow: auto;
    background: rgba(0,0,0,.35); border: 1px solid rgba(255,255,255,.08);
    border-radius: 4px; font-size: 12.5px; line-height: 1.6; white-space: pre-wrap;
    color: var(--muted, rgba(180,190,160,.8)); font-family: ui-monospace, Menlo, monospace;
  }
  .lf-fb-fine { margin: 0; font-size: 12px; color: var(--muted, rgba(180,190,160,.65)); }
  .lf-fb-fine a { color: var(--gold, #C8A84B); text-decoration: underline; }
  .lf-hp {
    position: absolute; left: -9999px; width: 1px; height: 1px;
    overflow: hidden;
  }
  .lf-done {
    padding: 32px 28px; border-radius: 6px;
    background: rgba(107,120,84,0.08);
    border: 1px solid rgba(200,168,75,0.3);
  }
  .lf-done h3 {
    margin: 0 0 10px; font-size: 20px; font-weight: 900;
    color: var(--gold, #C8A84B); text-transform: uppercase; letter-spacing: .5px;
  }
  .lf-done p {
    margin: 0; font-size: 14px; line-height: 1.7;
    color: var(--muted, rgba(180,190,160,.65));
  }
  @media (max-width: 640px) {
    .lf-row { grid-template-columns: 1fr; }
  }
`;
