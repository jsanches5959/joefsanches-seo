import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://joefsanches.com';
const BUILDER = 'Taylor Morrison';

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Taylor Morrison Homes in Leander TX | Northline & Larkspur | Joe Sanches",
  "description": "Browse Taylor Morrison new construction in Leander TX — Northline and Larkspur communities. Invitation to Dream personalization, 1-2-10 warranty, $380K–$580K.",
  "url": `${baseUrl}/taylor-morrison-leander-tx`,
  "author": { "@type": "Person", "name": "Joe Sanches", "url": baseUrl },
  "publisher": {
    "@type": "Organization",
    "name": "Joe Sanches Realtor",
    "logo": { "@type": "ImageObject", "url": `${baseUrl}/logo.png` }
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What communities does Taylor Morrison build in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Taylor Morrison builds in two Leander communities: Northline and Larkspur. Northline is a larger master-planned community in south Leander near the MetroRail station. Larkspur is a boutique community in northwest Leander featuring David Weekley and Taylor Morrison phases. Call Joe at 512-663-8867 to confirm current phase availability and pricing in each community."
      }
    },
    {
      "@type": "Question",
      "name": "What is Taylor Morrison's Invitation to Dream program?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Invitation to Dream is Taylor Morrison's personalization program, giving buyers the ability to customize their home beyond standard selections. Through the Taylor Morrison design center in Austin, buyers select cabinets, countertops, flooring, fixtures, and structural options like room additions or covered patios. The program is designed to make personalization straightforward without overwhelming buyers with too many choices."
      }
    },
    {
      "@type": "Question",
      "name": "Does Taylor Morrison offer financing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Taylor Morrison has an in-house mortgage division called Taylor Morrison Home Funding (TMHF). They often bundle rate incentives or closing cost credits with use of their preferred lender. However, you are not required to use TMHF, and shopping independently can sometimes yield a better overall rate. Joe can help you compare TMHF incentives against outside lenders to determine which option saves you more total money."
      }
    },
    {
      "@type": "Question",
      "name": "What warranty does Taylor Morrison offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Taylor Morrison provides a 1-2-10 warranty: 1 year on workmanship and materials, 2 years on systems (HVAC, plumbing, electrical), and 10 years on structural defects. Taylor Morrison also offers an online customer care portal for tracking warranty requests, which makes it easier to document and follow up on post-closing issues."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use Taylor Morrison's lender or get my own?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This depends entirely on the current incentive package. Taylor Morrison Home Funding sometimes offers meaningful closing cost credits or rate buy-downs that are only available if you use their lender. Other times, an outside lender delivers a lower rate that outweighs the incentive. Joe will help you compare the total cost of both options — not just the rate, but closing costs, points, and any builder incentives — before you make a decision."
      }
    }
  ]
};

function Section({ id, title, children }) {
  return (
    <section id={id} style={{ marginTop: '56px' }}>
      <h2 style={{
        fontSize: '26px', fontWeight: 700, color: 'white',
        borderBottom: '1px solid rgba(107,120,84,.3)',
        paddingBottom: '12px', marginBottom: '24px'
      }}>{title}</h2>
      {children}
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(107,120,84,.12)', padding: '10px 0', fontSize: '14px' }}>
      <span style={{ color: 'var(--muted)' }}>{label}</span>
      <span style={{ color: 'white', fontWeight: 600 }}>{value}</span>
    </div>
  );
}

function HomeCard({ home }) {
  return (
    <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <p style={{ margin: '0 0 4px', color: 'white', fontWeight: 700, fontSize: '20px' }}>
            ${home.price ? home.price.toLocaleString() : 'Call for price'}
          </p>
          <p style={{ margin: '0 0 6px', color: 'var(--muted)', fontSize: '13px' }}>{home.address}</p>
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--muted)' }}>
            {home.beds && <span><strong style={{ color: 'white' }}>{home.beds}</strong> bd</span>}
            {home.baths && <span><strong style={{ color: 'white' }}>{home.baths}</strong> ba</span>}
            {home.sqft && <span><strong style={{ color: 'white' }}>{home.sqft.toLocaleString()}</strong> sqft</span>}
          </div>
          {home.community && <p style={{ margin: '6px 0 0', color: 'var(--accent-light)', fontSize: '12px' }}>{home.community}</p>}
        </div>
        <span style={{
          background: 'rgba(107,120,84,.18)', color: 'var(--accent-light)',
          borderRadius: '6px', padding: '4px 10px', fontSize: '12px', fontWeight: 600
        }}>{home.status || 'Available'}</span>
      </div>
      {home.incentives && (
        <div style={{
          marginTop: '12px', background: 'rgba(107,120,84,.12)', borderRadius: '8px',
          padding: '10px 14px', fontSize: '13px', color: 'var(--accent-light)', lineHeight: '1.5'
        }}>
          <strong>Deal:</strong> {home.incentives}
        </div>
      )}
      {home.url && (
        <a href={home.url} target="_blank" rel="noopener noreferrer"
          className="btn accent"
          style={{ display: 'inline-block', marginTop: '14px', padding: '10px 18px', fontSize: '13px' }}>
          View Home →
        </a>
      )}
    </div>
  );
}

export default function TaylorMorrisonLeander({ liveHomes }) {
  return (
    <>
      <Head>
        <title>Taylor Morrison Homes in Leander TX | Northline & Larkspur | Joe Sanches</title>
        <meta name="description" content="Taylor Morrison new homes in Leander TX — Northline and Larkspur communities. Invitation to Dream personalization, in-house financing, 1-2-10 warranty. $380K–$580K." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/taylor-morrison-leander-tx`} />
        <meta property="og:title" content="Taylor Morrison Homes Leander TX | Northline & Larkspur | Joe Sanches" />
        <meta property="og:description" content="New Taylor Morrison homes in Northline and Larkspur, Leander TX. Personalization program, in-house mortgage, $380K–$580K." />
        <meta property="og:url" content={`${baseUrl}/taylor-morrison-leander-tx`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <div className="container" style={{ paddingBottom: '120px' }}>
        {/* Floating contact bar */}
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

        {/* Header */}
        <header className="topbar">
          <div className="brand">
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src="/logo.png" alt="Joe Sanches Logo" className="logo" />
              <div>
                <h1>Joe Sanches</h1>
                <p className="sub">Real Estate Expert • Leander, TX</p>
              </div>
            </Link>
          </div>
          <div className="actions">
            <a href="tel:5126638867" className="btn">Call / Text</a>
            <a href="mailto:hello@joefsanches.com" className="btn accent">Email Me</a>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav style={{ marginTop: '20px', fontSize: '13px', color: 'var(--muted)', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'var(--accent-light)' }}>Home</Link>
          <span>›</span>
          <Link href="/new-construction-leander-tx" style={{ color: 'var(--accent-light)' }}>New Construction Leander TX</Link>
          <span>›</span>
          <span>Taylor Morrison</span>
        </nav>

        {/* Hero */}
        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Updated March 2026</div>
          <h2 className="heroTitle">Taylor Morrison Homes in Leander TX — Northline & Larkspur 2026</h2>
          <p className="heroLead">
            Taylor Morrison builds in two of Leander's most desirable communities: Northline and Larkspur. Their "Invitation to Dream" personalization program lets buyers customize layouts and finishes extensively. Taylor Morrison Home Funding offers in-house financing with bundled incentives. Backed by a 1-2-10 warranty and LISD schools. Working with Joe costs you nothing — Taylor Morrison pays the commission.
          </p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">Leander, TX</span>
            <span className="pill">Taylor Morrison</span>
            <span className="pill">$380K–$580K</span>
            <span className="pill">Northline &amp; Larkspur</span>
          </div>
        </div>

        <div className="two-col" style={{ marginTop: '48px' }}>
          <main className="main">

            {/* Builder Overview */}
            <Section id="overview" title="Taylor Morrison in Leander TX — Builder Overview">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Taylor Morrison is a publicly traded national builder headquartered in Arizona that operates extensively across the Austin metro. In Leander, Taylor Morrison builds in Northline — a large mixed-use master-planned community near the MetroRail station — and in portions of Larkspur, a boutique community in northwest Leander. Both communities are zoned to Leander ISD.
              </p>
              <div style={{ display: 'grid', gap: '0' }}>
                <InfoRow label="Builder" value="Taylor Morrison" />
                <InfoRow label="Communities in Leander" value="Northline, Larkspur" />
                <InfoRow label="Price Range" value="$380,000 – $580,000" />
                <InfoRow label="Personalization" value="Invitation to Dream program" />
                <InfoRow label="In-House Mortgage" value="Taylor Morrison Home Funding (TMHF)" />
                <InfoRow label="Warranty" value="1-2-10 (workmanship / systems / structural)" />
                <InfoRow label="School District" value="Leander ISD (LISD)" />
              </div>
            </Section>

            {/* Live Deals */}
            <Section id="live-deals" title="Live Taylor Morrison Deals — Leander TX">
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
                Inventory updated daily from Joe's builder feed. These are Taylor Morrison homes currently available in Leander with active incentives.
              </p>
              {liveHomes.length > 0 ? (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {liveHomes.map(h => <HomeCard key={h.id} home={h} />)}
                </div>
              ) : (
                <div className="card" style={{ textAlign: 'center', color: 'var(--muted)' }}>
                  <p>Check back soon — deals updated daily. Or call Joe for current Taylor Morrison availability: <a href="tel:5126638867" style={{ color: 'var(--accent-light)' }}>512-663-8867</a></p>
                </div>
              )}
            </Section>

            {/* Communities */}
            <Section id="communities" title="Taylor Morrison Communities in Leander TX">
              <div style={{ display: 'grid', gap: '12px' }}>
                {[
                  ['Northline — South Leander', 'Northline is Leander\'s most connected new construction community, located adjacent to the Leander MetroRail station and featuring a mixed-use town center, resort pool, and extensive trail network. Taylor Morrison builds a range of plans from the $380s in Northline, with easy commute access via rail, 183A, and US-183.'],
                  ['Larkspur — Northwest Leander', 'Larkspur is a boutique community (~200 total homes) where Taylor Morrison builds alongside David Weekley Homes. The community features a resort pool, walking trails, and Larkspur Elementary within the neighborhood. Taylor Morrison\'s Larkspur plans typically land in the $440K–$580K range.'],
                ].map(([title, desc]) => (
                  <div key={title} className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                    <h3 style={{ color: 'var(--accent-light)', margin: '0 0 8px', fontSize: '15px' }}>{title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* FAQ */}
            <Section id="faq" title="Frequently Asked Questions — Taylor Morrison Leander TX">
              {faqSchema.mainEntity.map(({ name, acceptedAnswer }) => (
                <div key={name} className="card" style={{ marginBottom: '12px' }}>
                  <h3 style={{ color: 'white', margin: '0 0 8px', fontSize: '16px' }}>{name}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{acceptedAnswer.text}</p>
                </div>
              ))}
            </Section>

            {/* Internal Links */}
            <Section id="related" title="Explore More New Construction in Leander TX">
              <div style={{ display: 'grid', gap: '10px' }}>
                {[
                  ['/new-construction-northline', 'Northline Community Deep Dive — Taylor Morrison Leander TX'],
                  ['/new-construction-larkspur', 'Larkspur Community Deep Dive — Leander TX'],
                  ['/new-construction-leander-tx', 'All New Construction Communities in Leander TX'],
                  ['/lennar-homes-leander-tx', 'Lennar Homes — Crystal Falls Leander TX'],
                  ['/kb-home-leander-tx', 'KB Home — Bryson Leander TX'],
                  ['/david-weekley-leander-cedar-park', 'David Weekley — Larkspur Leander TX'],
                  ['/meritage-homes-leander-tx', 'Meritage — Deerbrooke Leander TX'],
                ].map(([href, label]) => (
                  <Link key={href} href={href} className="card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px' }}>
                    <span style={{ color: 'var(--accent)', fontSize: '18px' }}>→</span>
                    <span style={{ color: 'var(--accent-light)', fontSize: '14px' }}>{label}</span>
                  </Link>
                ))}
              </div>
            </Section>

          </main>

          {/* Sidebar */}
          <aside className="side" style={{ paddingTop: '56px' }}>
            <div style={{ position: 'sticky', top: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--accent-light)', margin: '0 0 10px', fontSize: '15px' }}>Tour Taylor Morrison Free</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>
                  Joe accompanies you to both Northline and Larkspur, reviews purchase contracts, and helps you evaluate the TMHF incentive vs. outside lenders — at no cost. Taylor Morrison pays the buyer's agent commission.
                </p>
                <a href="tel:5126638867" className="btn accent" style={{ display: 'block', textAlign: 'center', padding: '12px' }}>
                  Call 512-663-8867
                </a>
                <a href="mailto:hello@joefsanches.com?subject=Taylor Morrison Tour Request" className="btn" style={{ display: 'block', textAlign: 'center', padding: '12px', marginTop: '8px' }}>
                  Email Joe
                </a>
              </div>

              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '15px' }}>Taylor Morrison Quick Facts</h3>
                {[
                  ['Price Range', '$380K–$580K'],
                  ['Communities', 'Northline, Larkspur'],
                  ['Personalization', 'Invitation to Dream'],
                  ['Mortgage', 'TMHF (optional)'],
                  ['Warranty', '1-2-10'],
                  ['Schools', 'LISD'],
                  ['Agent Cost', 'Free'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(107,120,84,.1)', padding: '8px 0', fontSize: '13px' }}>
                    <span style={{ color: 'var(--muted)' }}>{k}</span>
                    <span style={{ color: 'white', fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '15px' }}>Other Builders in Leander</h3>
                {[
                  ['/lennar-homes-leander-tx', 'Lennar — Crystal Falls'],
                  ['/kb-home-leander-tx', 'KB Home — Bryson'],
                  ['/david-weekley-leander-cedar-park', 'David Weekley — Larkspur'],
                  ['/meritage-homes-leander-tx', 'Meritage — Deerbrooke'],
                ].map(([href, label]) => (
                  <Link key={href} href={href} style={{ display: 'block', color: 'var(--accent-light)', fontSize: '13px', padding: '7px 0', borderBottom: '1px solid rgba(107,120,84,.1)', textDecoration: 'none' }}>
                    → {label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Footer CTA */}
        <div className="card" style={{ marginTop: '56px', textAlign: 'center', background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)', padding: '48px 32px' }}>
          <h2 style={{ color: 'white', margin: '0 0 12px', fontSize: '26px' }}>Ready to Tour Taylor Morrison in Leander?</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '60ch', margin: '0 auto 28px', lineHeight: '1.7' }}>
            I'll take you through Northline and Larkspur, compare TMHF vs. outside lenders, and review every contract detail — all free to you. Taylor Morrison pays my commission.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:5126638867" className="btn accent" style={{ padding: '14px 24px', fontSize: '15px' }}>Call / Text 512-663-8867</a>
            <a href="mailto:hello@joefsanches.com" className="btn" style={{ padding: '14px 24px', fontSize: '15px' }}>Email Joe</a>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '20px' }}>Joe Sanches — Licensed Realtor, Leander TX • Military Veteran • No pressure, straight answers</p>
        </div>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Joe Sanches Realtor • Leander, Texas</p>
          <p style={{ marginTop: '8px' }}>Phone: 512-663-8867 • Email: hello@joefsanches.com</p>
          <p style={{ marginTop: '8px', fontSize: '12px', opacity: 0.6 }}>
            Prices, incentives, and availability subject to change. Verify current inventory directly with the builder or call Joe. Tax rates are estimates — confirm at wcad.org.
          </p>
        </footer>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const filePath = path.join(process.cwd(), 'content', 'new-construction-deals.json');
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    const liveHomes = (data.homes || []).filter(h =>
      (h.builder && h.builder.toLowerCase().includes('taylor morrison')) ||
      (h.community && ['Northline', 'Larkspur'].includes(h.community) && h.builder && h.builder.toLowerCase().includes('taylor'))
    );
    return { props: { liveHomes } };
  } catch (e) {
    return { props: { liveHomes: [] } };
  }
}
