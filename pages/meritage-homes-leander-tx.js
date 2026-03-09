import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://joefsanches.com';
const BUILDER = 'Meritage';
const COMMUNITY = 'Deerbrooke';

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Meritage Homes in Leander TX | Deerbrooke | Energy Efficient | Joe Sanches",
  "description": "Browse Meritage Homes new construction in Deerbrooke, Leander TX. #1 energy-efficient builder, spray foam, tankless water heater, 16 SEER HVAC, HERS < 60, $340K–$480K.",
  "url": `${baseUrl}/meritage-homes-leander-tx`,
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
      "name": "Are Meritage homes really energy efficient?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Meritage Homes has been recognized as the #1 energy-efficient builder in America by third-party organizations including the EPA and ENERGY STAR program. Unlike builders who offer energy efficiency as a paid upgrade tier, Meritage makes it standard across all homes. Every Meritage home in Deerbrooke includes spray foam insulation, tankless water heater, 16 SEER HVAC, low-E windows, and ENERGY STAR certified appliances — all at no additional cost."
      }
    },
    {
      "@type": "Question",
      "name": "What is a HERS score?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HERS stands for Home Energy Rating System. A score of 100 represents a standard reference home built to 2006 code. A score of 0 would be a net-zero energy home. Lower is better. A typical resale home scores 130+. A standard new construction home built to current code scores around 100. Meritage homes in Deerbrooke achieve a HERS score below 60, meaning they use 40% or more less energy than a standard new home — a meaningful and measurable difference that shows up in your utility bill every month."
      }
    },
    {
      "@type": "Question",
      "name": "What communities does Meritage build in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Meritage Homes' primary community in Leander is Deerbrooke, located near SH-29 in north Leander. Deerbrooke features multiple active phases with various floor plan sizes. Call Joe at 512-663-8867 to confirm which lots and plans are currently available, as phases open and sell out regularly."
      }
    },
    {
      "@type": "Question",
      "name": "What warranty does Meritage offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Meritage Homes provides a 1-2-10 warranty: 1 year on workmanship, 2 years on systems (HVAC, plumbing, electrical), and 10 years on structural defects. Meritage also provides a first-year energy performance guarantee — if your home does not perform to the projected energy efficiency rating, Meritage will investigate and correct the issue. This energy warranty is unique among major builders."
      }
    },
    {
      "@type": "Question",
      "name": "How much do I save on utilities with a Meritage home?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Meritage estimates homeowners save $1,000–$2,000 per year on utilities compared to a conventionally built new home of similar size. In Texas, where summer cooling costs are extreme, the impact of spray foam insulation and high-efficiency HVAC is especially significant. On a monthly basis, buyers often report utility bills 30–40% lower than neighbors in conventional homes. Over the life of a 30-year mortgage, the savings compound significantly."
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

export default function MeritageLeander({ liveHomes }) {
  return (
    <>
      <Head>
        <title>Meritage Homes in Leander TX | Deerbrooke | Energy Efficient | Joe Sanches</title>
        <meta name="description" content="Meritage Homes in Deerbrooke, Leander TX. #1 energy-efficient builder — spray foam, tankless water heater, 16 SEER HVAC, HERS &lt; 60. Save $1K–$2K/year on utilities. $340K–$480K." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/meritage-homes-leander-tx`} />
        <meta property="og:title" content="Meritage Homes Leander TX | Deerbrooke Energy Efficient | Joe Sanches" />
        <meta property="og:description" content="New Meritage homes in Deerbrooke, Leander TX. #1 energy-efficient builder, spray foam standard, save $1K–$2K/year, $340K–$480K." />
        <meta property="og:url" content={`${baseUrl}/meritage-homes-leander-tx`} />
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
          <span>Meritage Homes</span>
        </nav>

        {/* Hero */}
        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Updated March 2026</div>
          <h2 className="heroTitle">Meritage Homes in Leander TX — Deerbrooke Energy-Efficient Community</h2>
          <p className="heroLead">
            Meritage Homes is the #1 energy-efficient builder in America — and their Deerbrooke community in Leander proves it. Spray foam insulation, tankless water heaters, 16 SEER HVAC, and a HERS score below 60 are standard in every home. Save $1,000–$2,000/year on utilities. Zoned to Leander ISD. Prices from the low $340s. Working with Joe costs you nothing — Meritage pays the commission.
          </p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">Leander, TX</span>
            <span className="pill">Meritage Homes</span>
            <span className="pill">$340K–$480K</span>
            <span className="pill">HERS &lt; 60</span>
          </div>
        </div>

        <div className="two-col" style={{ marginTop: '48px' }}>
          <main className="main">

            {/* Builder Overview */}
            <Section id="overview" title="Meritage Homes — Builder Overview">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Meritage Homes was the first major builder in the United States to make every home ENERGY STAR certified — not as an option, not as a premium tier, but as the baseline for every home they build. In Leander, Meritage's Deerbrooke community delivers that standard at an attainable price point, making high-performance homebuilding accessible to first-time buyers and move-up buyers alike.
              </p>
              <div style={{ display: 'grid', gap: '0' }}>
                <InfoRow label="Builder" value="Meritage Homes" />
                <InfoRow label="Energy Ranking" value="#1 energy-efficient builder in America" />
                <InfoRow label="Community in Leander" value="Deerbrooke" />
                <InfoRow label="Price Range" value="$340,000 – $480,000" />
                <InfoRow label="HERS Rating" value="&lt; 60 (standard on all homes)" />
                <InfoRow label="Insulation" value="Spray foam (standard)" />
                <InfoRow label="Water Heater" value="Tankless (standard)" />
                <InfoRow label="HVAC" value="16 SEER (standard)" />
                <InfoRow label="Utility Savings" value="$1,000–$2,000/year vs. conventional" />
                <InfoRow label="Warranty" value="1-2-10 + energy performance guarantee" />
                <InfoRow label="School District" value="Leander ISD (LISD)" />
              </div>
            </Section>

            {/* Live Deals */}
            <Section id="live-deals" title="Live Meritage Deals — Deerbrooke Leander TX">
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
                Inventory updated daily from Joe's builder feed. These are Meritage homes currently available in Deerbrooke with active incentives.
              </p>
              {liveHomes.length > 0 ? (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {liveHomes.map(h => <HomeCard key={h.id} home={h} />)}
                </div>
              ) : (
                <div className="card" style={{ textAlign: 'center', color: 'var(--muted)' }}>
                  <p>Check back soon — deals updated daily. Or call Joe for current Meritage availability: <a href="tel:5126638867" style={{ color: 'var(--accent-light)' }}>512-663-8867</a></p>
                </div>
              )}
            </Section>

            {/* Energy Features */}
            <Section id="energy" title="Meritage Energy Features — What's Standard in Every Home">
              <div style={{ display: 'grid', gap: '12px' }}>
                {[
                  ['Spray Foam Insulation', 'Applied throughout the attic and exterior walls, spray foam creates an air-tight building envelope that significantly outperforms traditional fiberglass batt insulation. This is Meritage\'s single most impactful energy feature and is standard — not an upgrade.'],
                  ['Tankless Water Heater', 'Tankless (on-demand) water heaters heat water only when needed, eliminating standby heat loss from a traditional tank. They last longer, take up less space, and are significantly more efficient — especially during Texas winters when demand spikes.'],
                  ['16 SEER HVAC', 'Meritage installs 16 SEER (Seasonal Energy Efficiency Ratio) air conditioning systems as standard. The minimum code-required SEER in Texas is 14. A 16 SEER unit uses approximately 12–15% less electricity for the same cooling output.'],
                  ['HERS Score Below 60', 'Every Meritage home achieves a HERS score below 60. This is independently verified — a certified HERS rater audits each home\'s energy performance using a standardized protocol. You receive documentation of your home\'s score at closing.'],
                  ['Low-E Windows', 'Low-emissivity windows have a microscopic coating that reflects infrared heat while allowing visible light through. In Texas summers, this meaningfully reduces solar heat gain — one of the largest drivers of cooling costs in single-family homes.'],
                  ['ENERGY STAR Certification', 'Every Meritage home meets or exceeds ENERGY STAR requirements, meaning it has been independently tested by a third-party rater. ENERGY STAR homes use at least 10% less energy than code-built homes, with most Meritage homes significantly exceeding that threshold.'],
                ].map(([title, desc]) => (
                  <div key={title} className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                    <h3 style={{ color: 'var(--accent-light)', margin: '0 0 8px', fontSize: '15px' }}>{title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* FAQ */}
            <Section id="faq" title="Frequently Asked Questions — Meritage Homes Leander TX">
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
                  ['/new-construction-deerbrooke', 'Deerbrooke Community Deep Dive — Meritage Leander TX'],
                  ['/new-construction-leander-tx', 'All New Construction Communities in Leander TX'],
                  ['/new-construction-crystal-falls', 'Crystal Falls by Lennar — Leander TX'],
                  ['/new-construction-bryson', 'Bryson by KB Home — Leander TX'],
                  ['/new-construction-northline', 'Northline by Taylor Morrison — Leander TX'],
                  ['/new-construction-larkspur', 'Larkspur by David Weekley — Leander TX'],
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
                <h3 style={{ color: 'var(--accent-light)', margin: '0 0 10px', fontSize: '15px' }}>Tour Meritage Deerbrooke Free</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>
                  Joe accompanies you to the Meritage sales office, explains the energy features in plain terms, and reviews the purchase contract — at no cost. Meritage pays the buyer's agent commission.
                </p>
                <a href="tel:5126638867" className="btn accent" style={{ display: 'block', textAlign: 'center', padding: '12px' }}>
                  Call 512-663-8867
                </a>
                <a href="mailto:hello@joefsanches.com?subject=Meritage Deerbrooke Tour Request" className="btn" style={{ display: 'block', textAlign: 'center', padding: '12px', marginTop: '8px' }}>
                  Email Joe
                </a>
              </div>

              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '15px' }}>Meritage Quick Facts</h3>
                {[
                  ['Price Range', '$340K–$480K'],
                  ['Community', 'Deerbrooke, Leander TX'],
                  ['HERS Score', '< 60'],
                  ['Insulation', 'Spray foam (standard)'],
                  ['Water Heater', 'Tankless (standard)'],
                  ['Utility Savings', '$1K–$2K/year'],
                  ['Warranty', '1-2-10 + energy'],
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
                  ['/david-weekley-leander-cedar-park', 'David Weekley — Larkspur'],
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
          <h2 style={{ color: 'white', margin: '0 0 12px', fontSize: '26px' }}>Ready to Tour Meritage Deerbrooke?</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '60ch', margin: '0 auto 28px', lineHeight: '1.7' }}>
            I'll walk you through the energy features, explain the HERS score, review the contract, and help you negotiate incentives — all free to you. Meritage pays my commission.
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
      (h.builder && h.builder.toLowerCase().includes('meritage')) ||
      (h.community && h.community === COMMUNITY)
    );
    return { props: { liveHomes } };
  } catch (e) {
    return { props: { liveHomes: [] } };
  }
}
