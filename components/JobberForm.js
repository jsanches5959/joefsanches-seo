import { useEffect, useRef, useState } from 'react';

/**
 * Jobber work request form.
 *
 * Jobber publishes this as a raw snippet — a target div, a stylesheet link and
 * a script tag carrying clienthub_id and form_url as attributes. It cannot be
 * pasted into JSX as-is: React strips unknown attributes from a rendered
 * <script>, and the embed script reads those two attributes off its own tag to
 * know which form to draw. So the tag is built and appended by hand.
 *
 * The ids below are the public client hub identifiers Jobber intends to be
 * embedded on a public site. They are not credentials.
 *
 * The component tracks three states, because an empty bordered box is the
 * worst thing this section can show: a visitor whose ad blocker eats the
 * third-party script, or who is on a slow connection, would otherwise see what
 * looks like a broken page and leave.
 */
const CLIENTHUB_ID = '23874513-a98a-4b00-9357-64bff929f54d-5121936';
const FORM_URL =
  'https://clienthub.getjobber.com/client_hubs/23874513-a98a-4b00-9357-64bff929f54d/public/work_request/embedded_work_request_form?form_id=5121936';
const CSS_URL =
  'https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css';
const JS_URL =
  'https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js';

// How long to wait before deciding the embed is not coming.
const GIVE_UP_AFTER_MS = 9000;

export default function JobberForm() {
  const injected = useRef(false);
  const mountRef = useRef(null);
  const [state, setState] = useState('loading'); // loading | ready | failed

  useEffect(() => {
    // React 18 StrictMode runs effects twice in development; without this the
    // form would be drawn into the container twice.
    if (injected.current) return;
    injected.current = true;

    let settled = false;
    const settle = (next) => {
      if (settled) return;
      settled = true;
      setState(next);
    };

    // Jobber replaces the container's contents when it loads. Watching for that
    // is more reliable than the script's load event, which fires before the
    // form is actually drawn.
    const observer = new MutationObserver(() => {
      if (mountRef.current && mountRef.current.childElementCount > 0) {
        settle('ready');
        observer.disconnect();
      }
    });
    if (mountRef.current) {
      observer.observe(mountRef.current, { childList: true, subtree: true });
    }

    if (!document.querySelector(`link[href="${CSS_URL}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.media = 'screen';
      link.href = CSS_URL;
      document.head.appendChild(link);
    }

    if (!document.querySelector(`script[src="${JS_URL}"]`)) {
      const script = document.createElement('script');
      script.src = JS_URL;
      script.async = true;
      script.setAttribute('clienthub_id', CLIENTHUB_ID);
      script.setAttribute('form_url', FORM_URL);
      script.onerror = () => settle('failed');
      document.body.appendChild(script);
    }

    const timer = setTimeout(() => settle('failed'), GIVE_UP_AFTER_MS);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="jobber-wrap">
      <div id={CLIENTHUB_ID} ref={mountRef} />

      {state === 'loading' ? (
        <div className="jf-state" aria-live="polite">
          <span className="jf-spinner" aria-hidden="true" />
          <span>Loading the estimate form…</span>
        </div>
      ) : null}

      {state === 'failed' ? (
        <div className="jf-state jf-failed" aria-live="polite">
          <p className="jf-failed-title">The estimate form didn&apos;t load.</p>
          <p className="jf-failed-body">
            An ad blocker or a slow connection can stop it. Reach us directly instead — it
            gets to the same place.
          </p>
          <div className="jf-failed-actions">
            <a href="tel:5126638867" className="jf-btn primary">Call 512-663-8867</a>
            <a href="sms:5126638867" className="jf-btn">Text a Photo</a>
            <a href="mailto:hello@joefsanches.com" className="jf-btn">Email Us</a>
          </div>
        </div>
      ) : null}

      <noscript>
        <p className="jf-failed-body">
          This form needs JavaScript. Call or text{' '}
          <a href="tel:5126638867">512-663-8867</a> or email{' '}
          <a href="mailto:hello@joefsanches.com">hello@joefsanches.com</a>.
        </p>
      </noscript>
    </div>
  );
}
