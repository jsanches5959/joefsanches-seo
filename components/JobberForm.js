import { useEffect, useRef } from 'react';

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
 */
const CLIENTHUB_ID = '23874513-a98a-4b00-9357-64bff929f54d-5121936';
const FORM_URL =
  'https://clienthub.getjobber.com/client_hubs/23874513-a98a-4b00-9357-64bff929f54d/public/work_request/embedded_work_request_form?form_id=5121936';
const CSS_URL =
  'https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css';
const JS_URL =
  'https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js';

export default function JobberForm() {
  const injected = useRef(false);

  useEffect(() => {
    // React 18 StrictMode runs effects twice in development; without this the
    // form would be drawn into the container twice.
    if (injected.current) return;
    injected.current = true;

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
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="jobber-wrap">
      {/* Jobber replaces the contents of this element once its script loads. */}
      <div id={CLIENTHUB_ID} />
      <noscript>
        <p className="jobber-fallback">
          This request form needs JavaScript. Call or text{' '}
          <a href="tel:5126638867">512-663-8867</a> or email{' '}
          <a href="mailto:hello@joefsanches.com">hello@joefsanches.com</a>.
        </p>
      </noscript>
    </div>
  );
}
