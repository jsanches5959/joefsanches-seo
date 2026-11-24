import Head from 'next/head';
import Link from 'next/link';
import { breadcrumbSchema } from '../lib/breadcrumbs';

const baseUrl = 'https://joefsanches.com';

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Homes for Rent in Leander, Cedar Park & Austin TX — Real Listings, Real Prices",
  "description": "14 real rental homes in Leander, Cedar Park, Liberty Hill and Austin, pulled from live listings today — plus how to spot a rental scam and the questions to ask before you send anyone a deposit.",
  "url": `${baseUrl}/rentals`,
  "author": { "@type": "Person", "name": "Joe Sanches", "url": baseUrl },
  "publisher": {
    "@type": "Organization",
    "name": "Joe Sanches Realtor",
    "logo": { "@type": "ImageObject", "url": `${baseUrl}/logo.png` }
  }
};

const pStyle = { color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' };

const listings = [
  {
    url: 'https://www.facebook.com/marketplace/item/29938227172436097',
    title: '3-bed house with a huge fenced yard — 2105 Cypress Ln, Cedar Park',
    detail: '$2,150/mo · 3 bed / 2 bath, 1,120 sq ft · Covered front porch and back deck, wood-look tile floors throughout, granite counters, stainless gas range, fridge included. Deposit $2,150.',
    price: '$2,150/mo',
  },
  {
    url: 'https://www.facebook.com/marketplace/item/2227017887843244',
    title: 'Tiny home with a huge private yard — 2505 Cypress Ln, Cedar Park',
    detail: '$1,685/mo · 1 bed / 1 bath, 500 sq ft · Big fenced yard all yours, carport parking, mini-split A/C, cats and dogs welcome. Deposit $2,000, 1-year lease.',
    price: '$1,685/mo',
  },
  {
    url: 'https://www.facebook.com/marketplace/item/1945984626110111',
    title: '3-bed house on a tree-shaded lot — 2705 Cypress Ln, Cedar Park',
    detail: '$2,300/mo · 3 bed / 2 bath, 1,478 sq ft · Long covered porch, garden tub + separate walk-in shower, partially fenced yard.',
    price: '$2,300/mo',
  },
  {
    url: 'https://www.facebook.com/marketplace/item/1556969525285806',
    title: 'Brand-new home, never lived in — 904 Wooten St, Cedar Park',
    detail: '$3,000/mo · 3 bed / 2 bath, about 2,600 sq ft · Center of Cedar Park near the library, private fenced yard.',
    price: '$3,000/mo',
  },
  {
    url: 'https://www.facebook.com/marketplace/item/2306343313109713',
    title: '3-bed house — Leander',
    detail: '$2,000/mo · 3 bed / 3 bath · Private owner. Message me for the full details and showing times.',
    price: '$2,000/mo',
  },
  {
    url: 'https://www.facebook.com/marketplace/item/3575959229378964',
    title: '3-bed house — Liberty Hill',
    detail: '$2,300/mo · 3 bed / 2 bath · See the listing for photos and details.',
    price: '$2,300/mo',
  },
  {
    url: 'https://www.facebook.com/marketplace/item/695989579876698',
    title: '3-bed house — Cedar Park',
    detail: '$2,285/mo · 3 bed / 2 bath · See the listing for photos and details.',
    price: '$2,285/mo',
  },
  {
    url: 'https://www.facebook.com/marketplace/item/868869791408749',
    title: '3-bed house — Cedar Park',
    detail: '$2,300/mo · 3 bed / 2 bath · See the listing for photos and details.',
    price: '$2,300/mo',
  },
  {
    url: 'https://www.facebook.com/marketplace/item/374346608467370',
    title: '4-bed house — Leander',
    detail: '$2,500/mo · 4 bed / 2 bath · See the listing for photos and details.',
    price: '$2,500/mo',
  },
  {
    url: 'https://www.facebook.com/marketplace/item/3145295769107392',
    title: '3-bed house — Leander',
    detail: '$2,399/mo · 3 bed / 2 bath · See the listing for photos and details.',
    price: '$2,399/mo',
  },
  {
    url: 'https://www.facebook.com/marketplace/item/1245154390210741',
    title: '4-bed house — Leander',
    detail: '$2,500/mo · 4 bed / 3 bath · See the listing for photos and details.',
    price: '$2,500/mo',
  },
  {
    url: 'https://www.facebook.com/marketplace/item/1461403561423050',
    title: '3-bed house — Cedar Park',
    detail: '$2,650/mo · 3 bed / 2 bath · See the listing for photos and details.',
    price: '$2,650/mo',
  },
  {
    url: 'https://www.facebook.com/marketplace/item/1534439824183338',
    title: '1-bed house — Cedar Park',
    detail: '$1,300/mo · 1 bed / 1 bath · The budget-friendly way into Cedar Park. See the listing for details.',
    price: '$1,300/mo',
  },
  {
    url: 'https://www.facebook.com/marketplace/item/575889388909128',
    title: '1-bed house — Cedar Park',
    detail: '$1,300/mo · 1 bed / 1 bath · See the listing for photos and details.',
    price: '$1,300/mo',
  },
];

export default function RentalsPage() {
  return (
    <>
      <Head>
        <title>Homes for Rent in Leander, Cedar Park &amp; Austin TX — Real Listings, Real Prices</title>
        <meta name="description" content="14 real rental homes in Leander, Cedar Park, Liberty Hill and Austin, pulled from live listings today — plus how to spot a rental scam and the questions to ask before you send anyone a deposit." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/rentals`} />
        <meta property="og:image" content="https://joefsanches.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Homes for Rent in Leander, Cedar Park &amp; Austin TX — Real Listings, Real Prices" />
        <meta name="twitter:description" content="14 real rental homes in Leander, Cedar Park, Liberty Hill and Austin, pulled from live listings today — plus how to spot a rental scam." />
        <meta name="twitter:image" content="https://joefsanches.com/og-image.jpg" />
        <meta property="og:title" content="Homes for Rent in Leander, Cedar Park &amp; Austin TX — Real Listings, Real Prices" />
        <meta property="og:description" content="14 real rental homes in Leander, Cedar Park, Liberty Hill and Austin, pulled from live listings today — plus how to spot a rental scam and the questions to ask before you send anyone a deposit." />
        <meta property="og:url" content={`${baseUrl}/rentals`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema([{ name: 'Rentals' }])),
          }}
        />
      </Head>

      <div className="container" style={{ paddingBottom: '120px' }}>
        <div className="floating-contact-bar">
          <a href="tel:5126638867" className="call-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call Joe
          </a>
          <a href="sms:5126638867" className="text-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Text Joe
          </a>
        </div>

        <header className="topbar">
          <div className="brand">
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src="/logo.png" alt="Joe Sanches" className="logo" width="64" height="64" />
              <div>
                <span className="brand-name">Joe Sanches</span>
                <p className="sub">Real Estate · A Sanches Group Company</p>
              </div>
            </Link>
          </div>
          <div className="actions">
            <a href="tel:5126638867" className="btn">Call / Text</a>
            <a href="mailto:hello@joefsanches.com" className="btn accent">Email Me</a>
          </div>
        </header>

        <main style={{ maxWidth: '820px', margin: '20px auto 0' }}>
          <h1 style={{ fontSize: '2rem', lineHeight: '1.2', margin: '.4em 0', color: 'var(--ink)' }}>
            Homes for Rent in Leander, Cedar Park &amp; Austin — real listings, no ghost houses
          </h1>

          <p style={pStyle}>
            Half the &quot;rentals&quot; you see online are bait: a house that was never for rent, a price copied from two years ago, or a scammer who wants your deposit wired before you&apos;ve seen the front door. Every home below is a live listing of mine right now — real price, real link, and a real local person who answers the phone. If one rents, it comes off this page.
          </p>

          <p>
            <a href="tel:+15126638867" className="btn accent" style={{ display: 'inline-block', padding: '14px 22px', fontSize: '15px', marginRight: '10px' }}>
              Call / text Joe: 512-663-8867
            </a>
            <a href="#tell-joe" className="btn" style={{ display: 'inline-block', padding: '14px 22px', fontSize: '15px' }}>
              Tell me what you&apos;re looking for
            </a>
          </p>

          <h2 style={{ fontSize: '1.35rem', margin: '1.6em 0 .4em', color: 'var(--ink)' }}>1. Rental homes available right now</h2>

          {listings.map((l) => (
            <div key={l.url} className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
              <p style={{ margin: '0 0 8px' }}>
                <a href={l.url} style={{ color: 'var(--accent-light)', fontWeight: 700 }}>{l.title}</a>
              </p>
              <p style={{ color: 'var(--muted)', margin: 0, lineHeight: '1.7' }}>
                <strong style={{ color: 'var(--ink)' }}>{l.price}</strong>
                {l.detail.slice(l.price.length)}
              </p>
            </div>
          ))}

          <p style={{ color: 'var(--muted)', fontSize: '.92rem', lineHeight: '1.6' }}>
            Pulled from my live Facebook Marketplace listings on Nov 24, 2026. Rentals move fast — if a link is gone, the home rented. Apartments instead? My apartment locating is free to you (the complex pays): <a href="https://joefsanches.com/apartments" style={{ color: 'var(--accent-light)' }}>joefsanches.com/apartments</a>.
          </p>

          <h2 style={{ fontSize: '1.35rem', margin: '1.6em 0 .4em', color: 'var(--ink)' }}>2. How not to get scammed on a rental (read this even if you never call me)</h2>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>Never wire a deposit for a home you haven&apos;t stood inside.</strong> Real landlords show homes. Scammers make excuses and push for money first — that&apos;s the tell, every time.
          </p>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>Check the price against the street.</strong> A 3-bed in Cedar Park listed at $900 isn&apos;t a deal, it&apos;s a copy of somebody else&apos;s listing with a scammer&apos;s phone number pasted in. Real Cedar Park 3-beds run about $2,285-$2,650 right now — you can see them above.
          </p>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>Ask who owns it and who manages it, out loud.</strong> A real answer takes ten seconds. Vague answers about &quot;the owner being out of the country&quot; end the conversation.
          </p>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>Pro tip:</strong> drive by at night before you apply. The listing photos are from the best Tuesday in that house&apos;s life — the street at 9 PM tells you the truth about parking, noise, and lighting.
          </p>

          <h2 id="tell-joe" style={{ fontSize: '1.35rem', margin: '1.6em 0 .4em', color: 'var(--ink)' }}>3. Don&apos;t see your fit? Tell me what you&apos;re hunting</h2>
          <p style={pStyle}>
            New rentals hit my desk before they hit the big sites. Fill this out and I&apos;ll text you back myself — no spam, no pressure, no list you&apos;re stuck on.
          </p>

          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdAdNs9-bzi0YIIGRqJDr7HVAi36Qi8gO1WNBC1XfOd_C9OvQ/viewform?embedded=true" width="640" height="2524" frameBorder="0" marginHeight="0" marginWidth="0" style={{ maxWidth: '100%', border: 0 }}>Loading…</iframe>

          <h2 style={{ fontSize: '1.35rem', margin: '1.6em 0 .4em', color: 'var(--ink)' }}>4. Talk to a human</h2>
          <p style={pStyle}>
            Call or text me at <a href="tel:+15126638867" style={{ color: 'var(--accent-light)' }}><strong>512-663-8867</strong></a>. I&apos;m Joe Sanches, I live in Leander, and I&apos;d rather tell you a home isn&apos;t right for you than rent you the wrong one.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '.92rem', lineHeight: '1.6' }}>
            Joe Sanches · Leander, TX · Listings shown are my own live Facebook Marketplace posts; availability and prices confirmed at the link.
          </p>
        </main>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Joe Sanches LLC · Sanches Group · Leander, Texas</p>
          <p style={{ marginTop: '6px' }}><a href="/" style={{ textDecoration: 'underline' }}>Construction · Facilities · Government Contracting — Sanches Group</a></p>
          <p style={{ marginTop: '8px' }}>Phone: 512-663-8867 • Email: hello@joefsanches.com</p>
          <p style={{ marginTop: '8px', fontSize: '12px', opacity: 0.6 }}>
            Prices and availability subject to change. Verify current inventory with the builder.
          </p>
        </footer>
      </div>
    </>
  );
}
