import Head from 'next/head';
import Link from 'next/link';
import { breadcrumbSchema } from '../lib/breadcrumbs';

const baseUrl = 'https://joefsanches.com';

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "New Construction Homes in Leander, Cedar Park & Austin TX — Real Prices, No Sales Pitch",
  "description": "Search 6,415 live Austin-area new construction homes with real prices. Why December is the month builders negotiate, which communities to watch, and when a new build is NOT the right move.",
  "url": `${baseUrl}/new-construction`,
  "author": { "@type": "Person", "name": "Joe Sanches", "url": baseUrl },
  "publisher": {
    "@type": "Organization",
    "name": "Joe Sanches Realtor",
    "logo": { "@type": "ImageObject", "url": `${baseUrl}/logo.png` }
  }
};

const pStyle = { color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' };

export default function NewConstructionPage() {
  return (
    <>
      <Head>
        <title>New Construction Homes in Leander, Cedar Park &amp; Austin TX — Real Prices, No Sales Pitch</title>
        <meta name="description" content="Search 6,415 live Austin-area new construction homes with real prices. Why December is the month builders negotiate, which communities to watch, and when a new build is NOT the right move." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/new-construction`} />
        <meta property="og:image" content="https://joefsanches.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="New Construction Homes in Leander, Cedar Park & Austin TX — Real Prices, No Sales Pitch" />
        <meta name="twitter:description" content="Search 6,415 live Austin-area new construction homes with real prices. Why December is the month builders negotiate, and when a new build is NOT the right move." />
        <meta name="twitter:image" content="https://joefsanches.com/og-image.jpg" />
        <meta property="og:title" content="New Construction Homes in Leander, Cedar Park & Austin TX — Real Prices, No Sales Pitch" />
        <meta property="og:description" content="Search 6,415 live Austin-area new construction homes with real prices. Why December is the month builders negotiate, and when a new build is NOT the right move." />
        <meta property="og:url" content={`${baseUrl}/new-construction`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema([{ name: 'New Construction' }])),
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
            New Construction Homes in Leander, Cedar Park &amp; Austin — the real story, not the sales pitch
          </h1>

          <p style={pStyle}>
            The builder&apos;s sales office will tell you new construction is simple: pick a lot, pick a plan, sign. Here&apos;s what they leave out — the price on the board is the <em>starting</em> price, the incentives change every month, and the friendly rep across the desk works for the builder, not for you. Below is the live search I give my own clients, the real numbers on it today, and the honest version of when a new build is the right move — and when it isn&apos;t.
          </p>

          <p>
            <a href="https://a.nhb.app/u/joe" className="btn accent" style={{ display: 'inline-block', padding: '14px 22px', fontSize: '15px', marginRight: '10px' }}>
              See all 6,415 live new homes
            </a>
            <a href="tel:+15126638867" className="btn" style={{ display: 'inline-block', padding: '14px 22px', fontSize: '15px' }}>
              Call / text Joe: 512-663-8867
            </a>
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '.92rem', lineHeight: '1.6' }}>
            That search updates itself as prices move and homes sell. Tap the heart on any home and it comes straight to me — I&apos;ll tell you what that builder is really offering on it before you ever talk to their sales office.
          </p>

          <h2 style={{ fontSize: '1.35rem', margin: '1.6em 0 .4em', color: 'var(--ink)' }}>1. Three real new homes under $380K, live today</h2>
          <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
            <p style={{ margin: '0 0 8px', color: 'var(--ink)' }}>San Marcos — 119 Horseherb Way — <strong>$339,990</strong></p>
            <p style={{ margin: '0 0 8px', color: 'var(--ink)' }}>Manor — 13600 Tollington St — <strong>$354,990</strong></p>
            <p style={{ margin: '0 0 8px', color: 'var(--ink)' }}>Pflugerville — 17401 Rappen Dr — <strong>$379,990</strong></p>
            <p style={{ color: 'var(--muted)', fontSize: '.92rem', margin: 0 }}>Pulled from the live search on Nov 23, 2026. Prices move — the search above always shows today&apos;s number.</p>
          </div>

          <h2 style={{ fontSize: '1.35rem', margin: '1.6em 0 .4em', color: 'var(--ink)' }}>2. Why December is the month builders negotiate</h2>
          <p style={pStyle}>
            Builders close their books on December 31. A finished home still sitting in inventory in late December is a problem they solve with money: price cuts, mortgage-rate buydowns, and closing-cost help. The same home in March costs more. If you&apos;re even half-serious about a new build, this is the window — and the deals are on <em>finished, move-in-ready</em> homes, not on lots that break ground next spring.
          </p>

          <h2 style={{ fontSize: '1.35rem', margin: '1.6em 0 .4em', color: 'var(--ink)' }}>3. The honest warnings nobody at the sales office gives you</h2>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>Don&apos;t walk in unrepresented and expect the same deal.</strong> The builder pays my fee — it costs you nothing — but only if I&apos;m registered with you on your first visit or before you sign anything. Go in alone first and you&apos;ve handed your leverage away.
          </p>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>New construction is NOT always the right move.</strong> If you need to be in a home in under 30 days and there&apos;s no finished inventory in your area, a resale home wins. If the lot premium and upgrades push a build $40K+ over comparable resales on the same street, the resale wins. I&apos;ll tell you that straight, even when it costs me the deal.
          </p>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>Pro tip:</strong> never negotiate on price alone. Builders would often rather give you a rate buydown and closing costs than cut the sticker — and a 1% rate buydown is worth more per month than $10K off the price on most loans. Ask for the money where it compounds.
          </p>

          <h2 style={{ fontSize: '1.35rem', margin: '1.6em 0 .4em', color: 'var(--ink)' }}>4. Rather just tell me what you&apos;re hunting?</h2>
          <p style={pStyle}>
            Skip the searching. Fill this out and I&apos;ll text you back myself — no spam, no pressure, no list you&apos;re stuck on.
          </p>

          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdAdNs9-bzi0YIIGRqJDr7HVAi36Qi8gO1WNBC1XfOd_C9OvQ/viewform?embedded=true" width="640" height="2524" frameBorder="0" marginHeight="0" marginWidth="0" style={{ maxWidth: '100%', border: 0 }}>Loading…</iframe>

          <h2 style={{ fontSize: '1.35rem', margin: '1.6em 0 .4em', color: 'var(--ink)' }}>5. Talk to a human</h2>
          <p style={pStyle}>
            Call or text me at <a href="tel:+15126638867" style={{ color: 'var(--accent-light)' }}><strong>512-663-8867</strong></a>. I&apos;m Joe Sanches, I live in Leander, and new construction is the lane I know best — which streets flood the group chats, which builders finish on time, and which ones don&apos;t.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '.92rem' }}>
            — Joe Sanches · <Link href="/realtor" style={{ color: 'var(--accent-light)' }}>joefsanches.com/realtor</Link>
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
