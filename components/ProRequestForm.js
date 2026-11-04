import { useState } from 'react';

/**
 * "Request this pro" dispatch intake form for /pros.
 *
 * Deliberately a plain native form rather than the Jobber embed: dispatch
 * needs a trade and a preferred timing up front so the request can be routed
 * to the right partner without a follow-up round of questions. Submissions
 * POST to /api/pro-request, which records them alongside the site's other
 * lead signals (and emails them to the Sanches Group inbox when SMTP is
 * configured on the deployment).
 *
 * Photos are not collected here — the Jobber estimate form further down the
 * /pros page is the photo path, and it is named as such so nobody uploads
 * pictures into a form that cannot take them.
 */

export const PRO_TRADES = [
  'Garage Doors',
  'Electrical',
  'Plumbing',
  'HVAC',
  'Painting',
  'Drywall',
  'Cleaning',
  'Something Else',
];

const TIMING_OPTIONS = [
  'As soon as possible',
  'This week',
  'Next week',
  'Flexible — planning ahead',
];

export default function ProRequestForm({ trade, onTradeChange }) {
  const [fields, setFields] = useState({
    name: '',
    phone: '',
    address: '',
    description: '',
    timing: TIMING_OPTIONS[0],
  });
  const [state, setState] = useState('idle'); // idle | sending | sent | error

  const set = (key) => (e) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    try {
      const res = await fetch('/api/pro-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fields,
          trade,
          page: typeof window !== 'undefined' ? window.location.pathname : '/pros',
        }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setState('sent');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className="prf-sent" aria-live="polite">
        <p className="prf-sent-title">Got it — we&apos;re assigning your pro and will text you shortly.</p>
        <p className="prf-sent-body">
          Your request went to Sanches Group dispatch. We match it to the right
          partner for the trade, confirm they can take it, and text you back at
          the number you gave us. If it&apos;s urgent, call us at{' '}
          <a href="tel:5126638867">512-663-8867</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="prf" onSubmit={submit}>
      <div className="prf-grid">
        <label className="prf-field">
          <span>Your name *</span>
          <input
            type="text"
            required
            autoComplete="name"
            value={fields.name}
            onChange={set('name')}
            placeholder="First and last name"
          />
        </label>
        <label className="prf-field">
          <span>Mobile phone — we&apos;ll text you *</span>
          <input
            type="tel"
            required
            autoComplete="tel"
            value={fields.phone}
            onChange={set('phone')}
            placeholder="512-555-1234"
          />
        </label>
        <label className="prf-field">
          <span>Trade needed *</span>
          <select value={trade} onChange={(e) => onTradeChange(e.target.value)}>
            {PRO_TRADES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="prf-field">
          <span>Preferred timing</span>
          <select value={fields.timing} onChange={set('timing')}>
            {TIMING_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="prf-field prf-wide">
          <span>City / job address</span>
          <input
            type="text"
            autoComplete="street-address"
            value={fields.address}
            onChange={set('address')}
            placeholder="Street address or just the city — Leander, Cedar Park, …"
          />
        </label>
        <label className="prf-field prf-wide">
          <span>What&apos;s the job? *</span>
          <textarea
            required
            rows={4}
            value={fields.description}
            onChange={set('description')}
            placeholder="A few plain sentences is plenty — what it is, how big, anything broken or leaking."
          />
        </label>
      </div>

      {state === 'error' ? (
        <p className="prf-error" aria-live="polite">
          That didn&apos;t send — a connection problem on our end. Call or text{' '}
          <a href="tel:5126638867">512-663-8867</a> and we&apos;ll take it from
          there, or try the form once more.
        </p>
      ) : null}

      <button type="submit" className="prf-submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Request This Pro'}
      </button>
      <p className="prf-note">
        No spam, no selling your number. Your request goes to Sanches Group
        dispatch — not to a call center, and not to the contractor directly.
      </p>
    </form>
  );
}
