import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://joefsanches.com';
const COMMUNITY = 'Bryson';

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "New Construction Homes in Bryson Leander TX — KB Home 2026",
  "description": "Browse new KB Home and Centex homes in Bryson, Leander TX. Resort-style amenities, LISD schools, $320K–$450K. See live builder deals and inventory.",
  "url": `${baseUrl}/new-construction-bryson`,
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
      "name": "What are home prices in Bryson Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "KB Home prices in Bryson start around $320,000 for a 3-bedroom plan and go up to approximately $450,000 for larger 5-bedroom homes with upgrades. KB Home is built-to-order, so price varies based on plan selection and options chosen at the design studio."
      }
    },
    {
      "@type": "Question",
      "name": "What amenities does Bryson Leander offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bryson features resort-style amenities including a large community pool, splash pad, clubhouse, sports courts, pocket parks, and extensive trail connections. The community is designed around outdoor living with green belts and walking paths throughout."
      }
    },
    {
      "@type": "Question",
      "name": "Is Bryson Leander in Leander ISD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Bryson is zoned to Leander ISD. Elementary-age children typically attend North Elementary or Jim Plain Elementary depending on the specific address. Middle school is Knox Wiley or Running Brushy, and high school is Rouse High or Cedar Park High."
      }
    },
    {
      "@type": "Question",
      "name": "Does Bryson have a MUD tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Bryson is one of the Leander communities with a Municipal Utility District. The MUD adds approximately 0.30%–0.40% to the base combined tax rate, putting total effective rates around 2.50%–2.57%. This is one of the higher MUD rates in Leander — factor it into your affordability calculation."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use a buyer's agent with KB Home at Bryson?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — and it costs you nothing. KB Home pays the buyer's agent commission. An agent like Joe Sanches reviews the purchase contract, attends pre-closing walkthroughs, and helps you navigate the KB Home built-to-order process from lot selection through closing."
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

export default function BrysonPage({ communityData, liveHomes }) {
  return (
    <>
      <Head>
        <title>New Construction Bryson Leander TX — KB Home 2026 | Joe Sanches</title>
        <meta name="description" content="New KB Home and Centex homes in Bryson, Leander TX. Resort-style pool, splash pad, top LISD schools. Prices $320K–$450K. Live inventory and incentives." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/new-construction-bryson`} />
        <meta property="og:title" content="New Construction Bryson Leander TX — KB Home 2026" />
        <meta property="og:description" content="Browse KB Home new homes in Bryson, Leander TX. Resort amenities, LISD schools, $320K–$450K. Live builder deals updated daily." />
        <meta property="og:url" content={`${baseUrl}/new-construction-bryson`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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

        <nav style={{ marginTop: '20px', fontSize: '13px', color: 'var(--muted)', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'var(--accent-light)' }}>Home</Link>
          <span>›</span>
          <Link href="/new-construction-leander-tx" style={{ color: 'var(--accent-light)' }}>New Construction Leander TX</Link>
          <span>›</span>
          <span>Bryson</span>
        </nav>

        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Updated March 2026</div>
          <h2 className="heroTitle">New Construction Homes in Bryson — Leander TX</h2>
          <p className="heroLead">
            Bryson is Leander's premier resort-style master-planned community, featuring a signature pool, splash pad, sports courts, and miles of trails. KB Home and Centex offer built-to-order homes from the $320s. LISD schools. Lowest entry prices of any new construction community in Leander.
          </p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">Leander, TX</span>
            <span className="pill">KB Home</span>
            <span className="pill">$320K–$450K</span>
            <span className="pill">Resort Amenities</span>
          </div>
        </div>

        <div className="two-col" style={{ marginTop: '48px' }}>
          <main className="main">

            <Section id="overview" title="Bryson — Community Overview">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Bryson opened in 2017 and has grown into one of Leander's most active new construction communities. KB Home's built-to-order model lets buyers select floor plans, lots, and finishes from scratch — you're not buying someone else's choices. Centex (a Pulte brand) also has phases in Bryson. The amenity center rivals resort hotels, making it a top choice for families.
              </p>
              <div style={{ display: 'grid', gap: '0' }}>
                <InfoRow label="Location" value="North Leander, off Bryson Way" />
                <InfoRow label="Builder" value="KB Home / Centex" />
                <InfoRow label="Price Range" value="$320,000 – $450,000" />
                <InfoRow label="Sq Ft Range" value="1,600 – 2,900 sqft" />
                <InfoRow label="School District" value="Leander ISD (LISD)" />
                <InfoRow label="Elementary" value="North Elementary / Jim Plain Elementary" />
                <InfoRow label="Middle School" value="Knox Wiley / Running Brushy" />
                <InfoRow label="High School" value="Rouse High / Cedar Park High" />
                <InfoRow label="HOA Est." value="~$700–$900/year" />
                <InfoRow label="Property Tax Rate" value="~2.50%–2.57% (includes MUD)" />
                <InfoRow label="Commute to Domain" value="~25 min via 183A" />
                <InfoRow label="Commute to Downtown Austin" value="~38–48 min" />
              </div>
            </Section>

            <Section id="live-deals" title="Live Deals — Bryson Homes">
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
                Inventory updated daily from Joe's builder feed. These homes are currently available with active incentives.
              </p>
              {liveHomes.length > 0 ? (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {liveHomes.map(h => <HomeCard key={h.id} home={h} />)}
                </div>
              ) : (
                <div className="card" style={{ textAlign: 'center', color: 'var(--muted)' }}>
                  <p>No live inventory right now — call Joe for the latest: <a href="tel:5126638867" style={{ color: 'var(--accent-light)' }}>512-663-8867</a></p>
                </div>
              )}
              {communityData?.incentives && (
                <div style={{
                  marginTop: '20px', background: 'rgba(107,120,84,.08)',
                  border: '1px solid rgba(107,120,84,.3)', borderLeft: '4px solid var(--accent)',
                  borderRadius: '10px', padding: '16px 20px', color: 'var(--muted)', fontSize: '14px'
                }}>
                  <strong style={{ color: 'white' }}>Community Incentives:</strong> {communityData.incentives}
                </div>
              )}
            </Section>

            <Section id="why" title="Why Buy in Bryson?">
              <div style={{ display: 'grid', gap: '12px' }}>
                {[
                  ['Built-to-Order Model', 'KB Home does not build spec homes you walk into and accept as-is. You select your plan, lot, and finishes — the home is built to your specifications.'],
                  ['Lowest Entry Price in Leander', 'At $320K+, Bryson offers the most affordable new construction entry point in Leander, making it accessible to first-time buyers and investors.'],
                  ['Resort Amenity Center', 'The Bryson amenity center features a resort-style pool, splash pad, covered pavilion, playgrounds, and sports courts — all HOA-covered.'],
                  ['ENERGY STAR Certified', 'Every KB Home at Bryson is ENERGY STAR certified. Lower utility bills and a more comfortable home year-round, especially in Texas summers.'],
                  ['Trail & Green Belt Network', 'Over 4 miles of hike-and-bike trails connect the community. Many lots back to green belts for added privacy.'],
                  ['183A Commute', 'Bryson's north Leander location gives quick access to the 183A Toll, keeping the Domain under 25 minutes and downtown Austin under 40 minutes.'],
                ].map(([title, desc]) => (
                  <div key={title} className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                    <h3 style={{ color: 'var(--accent-light)', margin: '0 0 8px', fontSize: '15px' }}>{title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="taxes" title="Property Taxes & HOA — Bryson">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Bryson carries one of the higher MUD rates in Leander — approximately 2.50%–2.57% combined. On a $380,000 home after homestead exemption, that's roughly $6,200–$7,000/year. The MUD rate is used to repay infrastructure bonds for roads, utilities, and drainage built when the community was developed.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                HOA dues run approximately $700–$900/year, which covers the resort-style amenity center, trail maintenance, and common area landscaping. This is higher than communities without resort amenities but is widely considered worthwhile by residents.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8' }}>
                File the Texas homestead exemption ($100,000 off school appraised value) with WCAD by April 30 after purchase. Verify the specific MUD at <a href="https://wcad.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-light)' }}>wcad.org</a>.
              </p>
            </Section>

            <Section id="faq" title="Frequently Asked Questions — Bryson">
              {faqSchema.mainEntity.map(({ name, acceptedAnswer }) => (
                <div key={name} className="card" style={{ marginBottom: '12px' }}>
                  <h3 style={{ color: 'white', margin: '0 0 8px', fontSize: '16px' }}>{name}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{acceptedAnswer.text}</p>
                </div>
              ))}
            </Section>

            <Section id="related" title="Explore More New Construction in Leander TX">
              <div style={{ display: 'grid', gap: '10px' }}>
                {[
                  ['/new-construction-leander-tx', 'All New Construction Communities in Leander TX — 2026 Hub'],
                  ['/new-construction-crystal-falls', 'Crystal Falls by Lennar — Leander TX'],
                  ['/new-construction-northline', 'Northline by Taylor Morrison — Leander TX'],
                  ['/new-construction-larkspur', 'Larkspur by David Weekley — Leander TX'],
                  ['/new-construction-deerbrooke', 'Deerbrooke by Meritage Homes — Leander TX'],
                  ['/new-construction-travisso', 'Travisso by Toll Brothers — Cedar Park TX'],
                  ['/kb-home-leander-tx', 'All KB Home Communities in Leander TX'],
                ].map(([href, label]) => (
                  <Link key={href} href={href} className="card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px' }}>
                    <span style={{ color: 'var(--accent)', fontSize: '18px' }}>→</span>
                    <span style={{ color: 'var(--accent-light)', fontSize: '14px' }}>{label}</span>
                  </Link>
                ))}
              </div>
            </Section>

          </main>

          <aside className="side" style={{ paddingTop: '56px' }}>
            <div style={{ position: 'sticky', top: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--accent-light)', margin: '0 0 10px', fontSize: '15px' }}>Tour Bryson Free</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>
                  Joe walks through Bryson with buyers at no cost. KB Home pays the buyer's agent. You get expert guidance through the built-to-order process.
                </p>
                <a href="tel:5126638867" className="btn accent" style={{ display: 'block', textAlign: 'center', padding: '12px' }}>
                  Call 512-663-8867
                </a>
                <a href="mailto:hello@joefsanches.com?subject=Bryson Tour Request" className="btn" style={{ display: 'block', textAlign: 'center', padding: '12px', marginTop: '8px' }}>
                  Email Joe
                </a>
              </div>
              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '15px' }}>Quick Facts</h3>
                {[
                  ['Builder', 'KB Home / Centex'],
                  ['Price Range', '$320K–$450K'],
                  ['Sq Ft', '1,600–2,900'],
                  ['Tax Rate', '~2.50%–2.57%'],
                  ['HOA', '~$700–$900/yr'],
                  ['Schools', 'LISD'],
                  ['To Domain', '~25 min'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(107,120,84,.1)', padding: '8px 0', fontSize: '13px' }}>
                    <span style={{ color: 'var(--muted)' }}>{k}</span>
                    <span style={{ color: 'white', fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="card" style={{ marginTop: '56px', textAlign: 'center', background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)', padding: '48px 32px' }}>
          <h2 style={{ color: 'white', margin: '0 0 12px', fontSize: '26px' }}>Ready to Tour Bryson?</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '60ch', margin: '0 auto 28px', lineHeight: '1.7' }}>
            I'll walk you through the KB Home process, help you pick the right lot and plan, and review every document — free of charge. KB Home pays my commission.
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
            Prices and availability subject to change. Verify current inventory with the builder. Tax rates are estimates — confirm at wcad.org.
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
    const communityData = data.communities.find(c => c.community === COMMUNITY) || null;
    const liveHomes = (data.homes || []).filter(h => h.community === COMMUNITY);
    return { props: { communityData, liveHomes } };
  } catch (e) {
    return { props: { communityData: null, liveHomes: [] } };
  }
}
