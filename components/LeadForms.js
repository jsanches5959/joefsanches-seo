import { useState } from 'react';

/**
 * Native lead forms for the real-estate pages.
 *
 * HomeValueForm powers the free-CMA section of /whats-my-home-worth and
 * ReferralForm the referral intake on /realtor. Both POST to
 * /api/pro-request — the same endpoint the /pros dispatch form uses — with
 * a `type` field so the API records and emails them as what they are: a
 * home-value lead or a referral lead, delivered to hello@joefsanches.com.
 *
 * Styling is inline, matching the real-estate pages these forms live on
 * (the /pros form uses the site's prf-* classes instead).
 */

const labelStyle = {
  display: 'block',
  color: 'var(--accent-light)',
  fontSize: '13px',
  fontWeight: 600,
  marginBottom: '6px',
};

const inputStyle = {
  width: '100%',
  background: 'var(--card)',
  border: '1px solid rgba(107,120,84,.35)',
  borderRadius: '8px',
  padding: '12px 14px',
  color: 'var(--ink)',
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box',
};

const submitStyle = {
  display: 'block',
  width: '100%',
  textAlign: 'center',
  background: 'var(--accent)',
  color: '#fff',
  padding: '16px',
  borderRadius: '8px',
  border: 'none',
  fontWeight: 700,
  fontSize: '17px',
  boxSizing: 'border-box',
  cursor: 'pointer',
};

const noteStyle = {
  color: 'var(--muted)',
  fontSize: '12px',
  margin: '14px 0 0',
  lineHeight: '1.6',
};

const errorStyle = {
  color: '#d97b6a',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

const sentTitleStyle = { color: 'var(--ink)', fontSize: '17px', fontWeight: 700, margin: '0 0 8px' };
const sentBodyStyle = { color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 };

function Field({ label, children }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function useLeadSubmit(type) {
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  async function submit(fields) {
    if (state === 'sending') return false;
    setState('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/pro-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fields,
          type,
          page: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setState('sent');
      return true;
    } catch {
      setState('error');
      setErrorMsg(
        'That didn\u2019t send \u2014 a connection problem on our end. Call or text 512-663-8867 and Joe will take it from there, or try the form once more.'
      );
      return false;
    }
  }

  function failValidation(msg) {
    setState('error');
    setErrorMsg(msg);
  }

  return { state, errorMsg, submit, failValidation };
}

export function HomeValueForm() {
  const [fields, setFields] = useState({ name: '', address: '', email: '', phone: '' });
  const { state, errorMsg, submit, failValidation } = useLeadSubmit('home-value');

  const set = (key) => (e) => setFields((prev) => ({ ...prev, [key]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    if (!fields.email.trim() && !fields.phone.trim()) {
      failValidation('Add an email or a phone number so Joe can send your valuation back to you.');
      return;
    }
    await submit(fields);
  }

  if (state === 'sent') {
    return (
      <div aria-live="polite">
        <p style={sentTitleStyle}>Got it — your valuation is in motion.</p>
        <p style={sentBodyStyle}>
          Joe will research comparable sales for your home and reach out within one
          business day. If it&apos;s urgent, call or text{' '}
          <a href="tel:5126638867" style={{ color: 'var(--accent-light)', fontWeight: 600 }}>
            512-663-8867
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
        <Field label="Your Name *">
          <input
            type="text"
            required
            autoComplete="name"
            placeholder="First and last name"
            value={fields.name}
            onChange={set('name')}
            style={inputStyle}
          />
        </Field>
        <Field label="Property Address *">
          <input
            type="text"
            required
            autoComplete="street-address"
            placeholder="Street address, Leander TX"
            value={fields.address}
            onChange={set('address')}
            style={inputStyle}
          />
        </Field>
        <Field label="Your Email">
          <input
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={fields.email}
            onChange={set('email')}
            style={inputStyle}
          />
        </Field>
        <Field label="Your Phone">
          <input
            type="tel"
            autoComplete="tel"
            placeholder="512-555-1234"
            value={fields.phone}
            onChange={set('phone')}
            style={inputStyle}
          />
        </Field>
      </div>

      {state === 'error' ? (
        <p style={errorStyle} aria-live="polite">
          {errorMsg}
        </p>
      ) : null}

      <button type="submit" style={submitStyle} disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending\u2026' : 'Request My Free CMA'}
      </button>
      <p style={noteStyle}>
        Email or phone — at least one, so Joe can reach you. No spam, no obligation,
        and your info is never sold.
      </p>
    </form>
  );
}

const REFERRAL_INTENTS = ['Buying', 'Selling', 'Both', 'Not sure yet'];
const REFERRAL_TIMELINES = [
  'As soon as possible',
  '1\u20133 months',
  '3\u20136 months',
  'Just researching',
];

export function ReferralForm() {
  const [fields, setFields] = useState({
    name: '',
    phone: '',
    email: '',
    intent: REFERRAL_INTENTS[0],
    location: '',
    timeline: REFERRAL_TIMELINES[0],
    notes: '',
  });
  const { state, submit } = useLeadSubmit('referral');

  const set = (key) => (e) => setFields((prev) => ({ ...prev, [key]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    await submit(fields);
  }

  if (state === 'sent') {
    return (
      <div aria-live="polite">
        <p style={sentTitleStyle}>Thanks — Joe has it.</p>
        <p style={sentBodyStyle}>
          He&apos;ll reach out personally, usually the same day, to talk through
          your move and next steps. Prefer to talk now? Call or text{' '}
          <a href="tel:5126638867" style={{ color: 'var(--accent-light)', fontWeight: 600 }}>
            512-663-8867
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
        <Field label="Your Name *">
          <input
            type="text"
            required
            autoComplete="name"
            placeholder="First and last name"
            value={fields.name}
            onChange={set('name')}
            style={inputStyle}
          />
        </Field>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <Field label="Phone *">
            <input
              type="tel"
              required
              autoComplete="tel"
              placeholder="512-555-1234"
              value={fields.phone}
              onChange={set('phone')}
              style={inputStyle}
            />
          </Field>
          <Field label="Email *">
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="your@email.com"
              value={fields.email}
              onChange={set('email')}
              style={inputStyle}
            />
          </Field>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <Field label="Are you buying, selling, or both? *">
            <select value={fields.intent} onChange={set('intent')} style={inputStyle}>
              {REFERRAL_INTENTS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Timeline">
            <select value={fields.timeline} onChange={set('timeline')} style={inputStyle}>
              {REFERRAL_TIMELINES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Where? (city & state) *">
          <input
            type="text"
            required
            placeholder="Leander, TX \u2014 or wherever you\u2019re headed"
            value={fields.location}
            onChange={set('location')}
            style={inputStyle}
          />
        </Field>
        <Field label="Anything Joe should know?">
          <textarea
            rows={4}
            placeholder="The short version is plenty \u2014 where you are in the process, what matters most, any deadlines."
            value={fields.notes}
            onChange={set('notes')}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </Field>
      </div>

      {state === 'error' ? (
        <p style={errorStyle} aria-live="polite">
          That didn&apos;t send — a connection problem on our end. Call or text{' '}
          <a href="tel:5126638867" style={{ color: 'var(--accent-light)', fontWeight: 600 }}>
            512-663-8867
          </a>{' '}
          and Joe will take it from there, or try the form once more.
        </p>
      ) : null}

      <button type="submit" style={submitStyle} disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending\u2026' : 'Send It to Joe'}
      </button>
      <p style={noteStyle}>
        Your info goes to Joe personally — never sold, never shared with anyone
        but the agent you agree to work with.
      </p>
    </form>
  );
}
