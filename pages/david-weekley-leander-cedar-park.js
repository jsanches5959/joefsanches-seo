import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://joefsanches.com';
const BUILDER = 'David Weekley';

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "David Weekley Homes in Leander & Cedar Park TX | Joe Sanches",
  "description": "Browse David Weekley new construction in Leander and Cedar Park TX — Larkspur community. Award-winning customer service, 10-year structural warranty, $420K–$600K.",
  "url": `${baseUrl}/david-weekley-leander-cedar-park`,
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
      "name": "Is David Weekley a good builder?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "David Weekley Homes has earned a strong reputation for customer satisfaction, earning J.D. Power recognition and consistently high third-party reviews from homeowners. As a Houston-founded, Texas-based builder, David Weekley has decades of experience building in Texas's climate and regulatory environment. Their build quality, customer service during construction, and post-closing warranty responsiveness are frequently cited as differentiators over larger national builders."
      }
    },
    {
      "@type": "Question",
      "name": "What communities does David Weekley build in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "David Weekley Homes builds in Larkspur, a boutique master-planned community in northwest Leander. Larkspur features approximately 200 homes total, with David Weekley as the primary builder. The community includes a resort-style pool, walking trails, and Larkspur Elementary within the neighborhood. Call Joe at 512-663-8867 for current phase and lot availability."
      }
    },
    {
      "@type": "Question",
      "name": "What is David Weekley's warranty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "David Weekley offers a 10-year structural warranty — one of the longest in the new construction industry. They also cover workmanship and systems defects for the first two years, and provide a dedicated customer care team for warranty claims. David Weekley's warranty is consistently cited as more comprehensive and better-serviced than the industry standard 1-2-10 programs at other builders."
      }
    },
    {
      "@type": "Question",
      "name": "How long does David Weekley take to build?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "David Weekley's typical build timeline in the Austin area ranges from 5–8 months from contract execution to closing. They do not offer the same quick-move-in inventory as high-volume builders like Lennar. If you need to close in under 90 days, David Weekley is generally not the right fit. For buyers willing to wait for a fully personalized build, the timeline is competitive with other semi-custom builders in the area."
      }
    },
    {
      "@type": "Question",
      "name": "What is the David Weekley personalization studio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "David Weekley operates a design studio in Austin where buyers work with design consultants to select all interior finishes: cabinetry, countertops, flooring, tile, fixtures, lighting, and exterior colors. The studio experience is more curated than some competitors — consultants help buyers understand which choices work together rather than just presenting an overwhelming catalog. Joe attends the design studio session with buyers to help prioritize upgrades by resale value."
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

export default function DavidWeekleyLeander({ liveHomes }) {
  return (
    <>
      <Head>
        <title>David Weekley Homes in Leander & Cedar Park TX | Joe Sanches</title>
        <meta name="description" content="David Weekley new homes in Leander and Cedar Park TX — Larkspur community. J.D. Power award-winning service, 10-year structural warranty. $420K–$600K. Free buyer's agent." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/david-weekley-leander-cedar-park`} />
        <meta property="og:title" content="David Weekley Homes in Leander & Cedar Park TX | Joe Sanches" />
        <meta property="og:description" content="New David Weekley homes in Leander TX — Larkspur community. Award-winning builder, 10-year warranty, $420K–$600K." />
        <meta property="og:url" content={`${baseUrl}/david-weekley-leander-cedar-park`} />
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
          <span>David Weekley Homes</span>
        </nav>

        {/* Hero */}
        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Updated March 2026</div>
          <h2 className="heroTitle">David Weekley Homes in Leander & Cedar Park TX — 2026</h2>
          <p className="heroLead">
            David Weekley Homes is a Texas-based builder with J.D. Power recognition for customer satisfaction and a 10-year structural warranty that leads the industry. In Leander, David Weekley builds in Larkspur — a boutique community with resort pool, walking trails, and Larkspur Elementary on-site. Prices from the low $420s. Working with Joe as your buyer's agent costs you nothing.
          </p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">Leander, TX</span>
            <span className="pill">David Weekley Homes</span>
            <span className="pill">$420K–$600K</span>
            <span className="pill">10-Year Warranty</span>
          </div>
        </div>

        <div className="two-col" style={{ marginTop: '48px' }}>
          <main className="main">

            {/* Builder Overview */}
            <Section id="overview" title="David Weekley Homes — Builder Overview">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Founded in Houston in 1976, David Weekley Homes is one of the largest private homebuilders in the United States and one of the few major builders that remains Texas-based and family-owned. That matters in Texas because David Weekley understands local soils, climate, codes, and buyer preferences better than out-of-state corporate builders. Their Austin-area design studio and construction teams have decades of experience in the Hill Country and Williamson County markets.
              </p>
              <div style={{ display: 'grid', gap: '0' }}>
                <InfoRow label="Builder" value="David Weekley Homes" />
                <InfoRow label="Headquarters" value="Houston, TX (Texas-based)" />
                <InfoRow label="Communities in Leander" value="Larkspur" />
                <InfoRow label="Price Range" value="$420,000 – $600,000" />
                <InfoRow label="Warranty" value="10-year structural (industry-leading)" />
                <InfoRow label="Customer Service" value="J.D. Power recognition" />
                <InfoRow label="Design Center" value="Austin, TX" />
                <InfoRow label="Build Timeline" value="5–8 months" />
                <InfoRow label="School District" value="Leander ISD (LISD)" />
              </div>
            </Section>

            {/* Live Deals */}
            <Section id="live-deals" title="Live David Weekley Deals — Leander & Cedar Park TX">
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
                Inventory updated daily from Joe's builder feed. These are David Weekley homes currently available with active incentives.
              </p>
              {liveHomes.length > 0 ? (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {liveHomes.map(h => <HomeCard key={h.id} home={h} />)}
                </div>
              ) : (
                <div className="card" style={{ textAlign: 'center', color: 'var(--muted)' }}>
                  <p>Check back soon — deals updated daily. Or call Joe for current David Weekley availability: <a href="tel:5126638867" style={{ color: 'var(--accent-light)' }}>512-663-8867</a></p>
                </div>
              )}
            </Section>

            {/* Why David Weekley */}
            <Section id="why" title="Why David Weekley Stands Out">
              <div style={{ display: 'grid', gap: '12px' }}>
                {[
                  ['J.D. Power Award-Winning Service', 'David Weekley has received J.D. Power recognition for customer satisfaction among homebuilders — a meaningful, independently verified signal of build quality and post-closing support.'],
                  ['10-Year Structural Warranty', 'Most builders offer a 10-year structural warranty on paper but vary significantly in how claims are handled. David Weekley\'s warranty process and responsiveness consistently earn high marks from homeowners.'],
                  ['Texas-Based & Locally Experienced', 'Unlike national builders headquartered in Delaware or Arizona, David Weekley is Houston-based and has been building in Texas for nearly 50 years. Their teams understand Texas soils, HOA environments, and local permitting.'],
                  ['Personalization Studio in Austin', 'David Weekley\'s Austin design studio is well-regarded for its curated selection process. Consultants guide buyers through choices rather than overwhelming them with unlimited options.'],
                  ['Boutique Community Focus', 'In Leander, David Weekley builds in Larkspur — a ~200-home boutique community. Smaller communities mean more attention to build quality and community cohesion than in 2,000-home master-planned developments.'],
                  ['Independent Agent Advantage', 'David Weekley pays buyer\'s agent commissions. Joe accompanies you to the sales office, design studio, and all walkthroughs — representing your interests throughout the process at no cost to you.'],
                ].map(([title, desc]) => (
                  <div key={title} className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                    <h3 style={{ color: 'var(--accent-light)', margin: '0 0 8px', fontSize: '15px' }}>{title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* FAQ */}
            <Section id="faq" title="Frequently Asked Questions — David Weekley Leander TX">
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
                  ['/new-construction-larkspur', 'Larkspur Community Deep Dive — David Weekley Leander TX'],
                  ['/new-construction-leander-tx', 'All New Construction Communities in Leander TX'],
                  ['/new-construction-crystal-falls', 'Crystal Falls by Lennar — Leander TX'],
                  ['/new-construction-bryson', 'Bryson by KB Home — Leander TX'],
                  ['/new-construction-northline', 'Northline by Taylor Morrison — Leander TX'],
                  ['/new-construction-deerbrooke', 'Deerbrooke by Meritage Homes — Leander TX'],
                  ['/new-construction-travisso', 'Travisso by Toll Brothers — Cedar Park TX'],
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
                <h3 style={{ color: 'var(--accent-light)', margin: '0 0 10px', fontSize: '15px' }}>Tour David Weekley Free</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>
                  Joe accompanies you to the David Weekley sales office and design studio, reviews the purchase contract, and attends all walkthroughs — at no cost. David Weekley pays the buyer's agent commission.
                </p>
                <a href="tel:5126638867" className="btn accent" style={{ display: 'block', textAlign: 'center', padding: '12px' }}>
                  Call 512-663-8867
                </a>
                <a href="mailto:hello@joefsanches.com?subject=David Weekley Tour Request" className="btn" style={{ display: 'block', textAlign: 'center', padding: '12px', marginTop: '8px' }}>
                  Email Joe
                </a>
              </div>

              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '15px' }}>David Weekley Quick Facts</h3>
                {[
                  ['Price Range', '$420K–$600K'],
                  ['Community', 'Larkspur, Leander TX'],
                  ['Warranty', '10-year structural'],
                  ['Founded', 'Houston, TX (1976)'],
                  ['Build Timeline', '5–8 months'],
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
                  ['/taylor-morrison-leander-tx', 'Taylor Morrison — Northline'],
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
          <h2 style={{ color: 'white', margin: '0 0 12px', fontSize: '26px' }}>Ready to Build with David Weekley in Leander?</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '60ch', margin: '0 auto 28px', lineHeight: '1.7' }}>
            I'll guide you through the full David Weekley process — from lot selection and design studio to contract review and final walkthrough. It costs you nothing. David Weekley pays my commission.
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
      h.builder && h.builder.toLowerCase().includes('weekley')
    );
    return { props: { liveHomes } };
  } catch (e) {
    return { props: { liveHomes: [] } };
  }
}
