import Head from 'next/head';
import Link from 'next/link';
import { breadcrumbSchema } from '../lib/breadcrumbs';

const baseUrl = 'https://joefsanches.com';

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Free Apartment Locating in Leander, Cedar Park & Austin TX — The Complex Pays, Not You",
  "description": "A licensed local locator searches Austin-area apartments for you for free — the complex pays the fee when you lease. The one thing you must write on the guest card and application for it to work.",
  "url": `${baseUrl}/apartments`,
  "author": { "@type": "Person", "name": "Joe Sanches", "url": baseUrl },
  "publisher": {
    "@type": "Organization",
    "name": "Joe Sanches Realtor",
    "logo": { "@type": "ImageObject", "url": `${baseUrl}/logo.png` }
  }
};

const pStyle = { color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' };

export default function ApartmentsPage() {
  return (
    <>
      <Head>
        <title>Free Apartment Locating in Leander, Cedar Park &amp; Austin TX — The Complex Pays, Not You</title>
        <meta name="description" content="A licensed local locator searches Austin-area apartments for you for free — the complex pays the fee when you lease. The one thing you must write on the guest card and application for it to work." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/apartments`} />
        <meta property="og:image" content="https://joefsanches.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Apartment Locating in Leander, Cedar Park &amp; Austin TX — The Complex Pays, Not You" />
        <meta name="twitter:description" content="A licensed local locator searches Austin-area apartments for you for free — the complex pays the fee when you lease." />
        <meta name="twitter:image" content="https://joefsanches.com/og-image.jpg" />
        <meta property="og:title" content="Free Apartment Locating in Leander, Cedar Park &amp; Austin TX — The Complex Pays, Not You" />
        <meta property="og:description" content="A licensed local locator searches Austin-area apartments for you for free — the complex pays the fee when you lease. The one thing you must write on the guest card and application for it to work." />
        <meta property="og:url" content={`${baseUrl}/apartments`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema([{ name: 'Apartments' }])),
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
            Free Apartment Locating in Leander, Cedar Park &amp; Austin — the complex pays, not you
          </h1>

          <p style={pStyle}>
            Here&apos;s the part most renters never hear: you can have a licensed local locator do your apartment search for you — the calls, the availability checks, the &quot;is that special actually real&quot; checks — and it costs you exactly $0. The apartment complex pays the locator&apos;s fee when you lease, because they&apos;d rather pay for a renter who shows up ready than spend it on ads. The only catch is one line of paperwork, and it&apos;s in section 2 below. Miss it and the whole thing falls apart.
          </p>

          <p>
            <a href="tel:+15126638867" className="btn accent" style={{ display: 'inline-block', padding: '14px 22px', fontSize: '15px', marginRight: '10px' }}>
              Call / text Joe: 512-663-8867
            </a>
            <a href="#tell-joe" className="btn" style={{ display: 'inline-block', padding: '14px 22px', fontSize: '15px' }}>
              Tell Joe what you&apos;re looking for
            </a>
          </p>

          <h2 style={{ fontSize: '1.35rem', margin: '1.6em 0 .4em', color: 'var(--ink)' }}>1. How this works, step by step</h2>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>Step 1:</strong> You tell me your budget, beds, move date, and area — Leander, Cedar Park, Round Rock, Georgetown, or anywhere around Austin. The form at the bottom takes about a minute.
          </p>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>Step 2:</strong> I search what&apos;s actually available that fits — including the move-in specials complexes run but don&apos;t advertise well — and send you a short list worth touring, not 40 links to sort through yourself.
          </p>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>Step 3:</strong> You tour your favorites. At each one, you write <strong style={{ color: 'var(--ink)' }}>&quot;Joe Sanches, eXp Realty&quot;</strong> as your referral source on the guest card — see section 2, this step is the whole ballgame.
          </p>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>Step 4:</strong> You apply and lease the one you want, with that same referral line on the application. The complex pays my fee after you move in. Your rent is the same as if you&apos;d walked in alone — complexes do not charge you more for using a locator; the fee comes out of their marketing budget, not your lease.
          </p>

          <h2 style={{ fontSize: '1.35rem', margin: '1.6em 0 .4em', color: 'var(--ink)' }}>2. The one thing that decides whether this costs you nothing</h2>
          <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
            <p style={{ margin: '0 0 8px', color: 'var(--ink)' }}>
              Write <strong>&quot;Joe Sanches, eXp Realty&quot;</strong> in the referral / &quot;how did you hear about us&quot; line on <strong>both</strong> the guest card when you tour <strong>and</strong> the application when you apply.
            </p>
            <p style={{ color: 'var(--muted)', margin: 0, lineHeight: '1.7' }}>
              That&apos;s it. If my name isn&apos;t on those two documents, the complex has no record I sent you, I don&apos;t get paid, and — more importantly for you — I can&apos;t go to bat for you with that leasing office if anything in the process goes sideways. It takes five seconds and it has to happen on the <em>first</em> visit, not after you&apos;ve already toured.
            </p>
          </div>

          <h2 style={{ fontSize: '1.35rem', margin: '1.6em 0 .4em', color: 'var(--ink)' }}>3. Honest warnings before you apartment-hunt around Austin</h2>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>The advertised price is rarely the real price.</strong> &quot;From $1,199&quot; usually means one floor plan, top floor, facing the parking lot, available in six weeks. The unit you actually want is often $100–$200 more. Part of my job is getting the real number for the real unit before you drive across town.
          </p>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>Specials expire and units move daily.</strong> A &quot;6 weeks free&quot; deal you saw on a listing site last week may be gone, and the one available unit in your budget can lease the same day it&apos;s posted. That&apos;s why the search has to be fresh the week you&apos;re ready to move, not a screenshot from last month.
          </p>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>When a locator is NOT the right move:</strong> if you&apos;ve already toured a complex and filled out their guest card without a referral, I can&apos;t be added after the fact — go ahead and lease direct. And if you&apos;re only looking at small private landlords or duplexes, those don&apos;t pay locator fees at all — use the same form below and pick &quot;Rental home&quot; instead, and I&apos;ll point you at what&apos;s actually out there.
          </p>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>Pro tip:</strong> tour on a weekday if you can. Leasing offices are slammed on Saturdays, and the weekday staff are the ones who&apos;ll tell you which buildings have the noise complaints and which floor plans sit empty for a reason.
          </p>

          <h2 id="tell-joe" style={{ fontSize: '1.35rem', margin: '1.6em 0 .4em', color: 'var(--ink)' }}>4. Tell me what you&apos;re looking for</h2>
          <p style={pStyle}>
            Fill this out and I&apos;ll text you back myself — no spam, no pressure, no list you&apos;re stuck on. Budget, beds, move date, and area is all I need to start.
          </p>

          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdAdNs9-bzi0YIIGRqJDr7HVAi36Qi8gO1WNBC1XfOd_C9OvQ/viewform?embedded=true" width="640" height="2524" frameBorder="0" marginHeight="0" marginWidth="0" style={{ maxWidth: '100%', border: 0 }}>Loading…</iframe>

          <h2 style={{ fontSize: '1.35rem', margin: '1.6em 0 .4em', color: 'var(--ink)' }}>5. Talk to a human</h2>
          <p style={pStyle}>
            Call or text me at <a href="tel:+15126638867" style={{ color: 'var(--accent-light)' }}><strong>512-663-8867</strong></a>. I&apos;m Joe Sanches, I live in Leander, and I know these complexes the way locals do — which ones sit near the good schools, which ones back up to the toll road noise, and which ones are worth every penny.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '.92rem', lineHeight: '1.6' }}>
            Joe Sanches, licensed Texas Realtor, eXp Realty LLC. Apartment locating is licensed brokerage activity in Texas; the renter pays no fee for this service — the apartment community pays a referral commission to the brokerage after a lease is signed with the locator listed as the referral source.
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
