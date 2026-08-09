import { useEffect } from 'react';
import { classifySource, shortLabel } from '../lib/attribution';

const STORAGE_KEY = 'jfs_attr_v1';

/**
 * Self-hosted, cookie-free lead attribution.
 *
 * 1. Records first-touch source (referrer + UTM) in localStorage on the first
 *    visit, so it survives browsing and return visits within the same browser.
 * 2. Tags outgoing mailto: links with that source, so an email lead arrives in
 *    the inbox already labelled "via ChatGPT" / "via Google".
 * 3. Fires a beacon to /api/track on call, text, and email intent. Phone taps
 *    cannot carry data themselves, so the beacon is what makes a phone lead
 *    attributable. Beacons land in Vercel runtime logs.
 *
 * No third-party service, no cookies, no personal data.
 */
export default function Attribution() {
  useEffect(() => {
    let attr = null;

    // ---- 1. Capture / read first-touch attribution -------------------
    try {
      const existing = window.localStorage.getItem(STORAGE_KEY);
      if (existing) {
        attr = JSON.parse(existing);
      } else {
        const params = new URLSearchParams(window.location.search);
        const { source, channel } = classifySource(
          document.referrer,
          params.get('utm_source')
        );
        attr = {
          source,
          channel,
          landing: window.location.pathname,
          referrer: document.referrer ? document.referrer.slice(0, 200) : '',
          campaign: params.get('utm_campaign') || '',
          firstSeen: new Date().toISOString(),
        };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attr));

        // Log the arrival once, so first-touch sources are visible in logs
        // even for visitors who never make contact.
        send('visit', attr);
      }
    } catch {
      // localStorage can be unavailable (private mode, storage disabled).
      // Attribution is a nice-to-have; never let it break the page.
      attr = null;
    }

    function send(event, data) {
      try {
        const payload = JSON.stringify({
          event,
          source: data?.source || 'Unknown',
          channel: data?.channel || 'Unknown',
          landing: data?.landing || '',
          referrer: data?.referrer || '',
          campaign: data?.campaign || '',
          page: window.location.pathname,
        });
        if (navigator.sendBeacon) {
          navigator.sendBeacon(
            '/api/track',
            new Blob([payload], { type: 'application/json' })
          );
        } else {
          fetch('/api/track', {
            method: 'POST',
            body: payload,
            headers: { 'Content-Type': 'application/json' },
            keepalive: true,
          }).catch(() => {});
        }
      } catch {
        /* never block the user's action */
      }
    }

    // ---- 2 & 3. Delegated handler for contact intent -----------------
    function onClick(e) {
      try {
        const a = e.target && e.target.closest && e.target.closest('a[href]');
        if (!a) return;
        const href = a.getAttribute('href') || '';

        if (href.startsWith('tel:')) {
          send('call_click', attr);
          return;
        }
        if (href.startsWith('sms:')) {
          send('text_click', attr);
          return;
        }
        if (href.startsWith('mailto:')) {
          send('email_click', attr);
          if (!attr) return;

          // Tag the subject so the lead is labelled in the inbox list view.
          // Rewriting href synchronously during the click lets the browser
          // pick up the new value for the default action.
          const tag = `[via ${shortLabel(attr)}]`;
          if (href.includes(tag)) return; // already tagged

          const [addr, query = ''] = href.slice(7).split('?');
          const params = new URLSearchParams(query);
          const subject = params.get('subject') || 'Website inquiry';
          params.set('subject', `${subject} ${tag}`);

          const body = params.get('body');
          const trail =
            `\n\n---\nFound you via: ${attr.source} (${attr.channel})` +
            `\nFirst page: ${attr.landing}` +
            (attr.campaign ? `\nCampaign: ${attr.campaign}` : '');
          params.set('body', body ? body + trail : trail.trimStart());

          // RFC 6068 mailto URIs use percent-encoding; "+" is not defined as a
          // space there, and some mail clients render it literally. URLSearchParams
          // emits "+", so convert those back to %20.
          const qs = params.toString().replace(/\+/g, '%20');
          a.setAttribute('href', `mailto:${addr}?${qs}`);
        }
      } catch {
        /* swallow — a tracking failure must never block a call or email */
      }
    }

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
