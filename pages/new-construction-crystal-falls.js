import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://joefsanches.com';
const COMMUNITY = 'Crystal Falls';

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "New Construction Homes in Crystal Falls Leander TX — Lennar 2026",
  "description": "Browse new Lennar homes for sale in Crystal Falls, Leander TX. Golf course community, LISD schools, $370K–$520K. See live builder deals and current inventory.",
  "url": `${baseUrl}/new-construction-crystal-falls`,
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
      "name": "What are the current home prices in Crystal Falls Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lennar homes in Crystal Falls currently start around $370,000 and go up to approximately $520,000 depending on plan size, lot, and included upgrades. Smaller 3-bed plans start in the mid-$370s; larger 5-bed plans with premium golf-course-adjacent lots reach $510K–$520K."
      }
    },
    {
      "@type": "Question",
      "name": "Does Crystal Falls back up to a golf course?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Crystal Falls is situated adjacent to the Crystal Falls Golf Club, a 3,500-acre recreational corridor in Leander. Many homesites have green space or golf course views, though course-front lots carry a premium."
      }
    },
    {
      "@type": "Question",
      "name": "Which school district serves Crystal Falls in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crystal Falls is zoned to Leander ISD (LISD), consistently ranked among the top school districts in Texas. Elementary school is typically William J. Winkley Elementary, middle school Leander Middle, and high school Leander High or Vista Ridge High depending on address."
      }
    },
    {
      "@type": "Question",
      "name": "Does Crystal Falls have a MUD tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Older sections of Crystal Falls may not have a MUD; newer Lennar sections typically carry a MUD rate adding 0.15%–0.30% to the base combined rate of approximately 2.22%. Total effective rate for MUD sections runs roughly 2.35%–2.42%. Always verify at wcad.org before making an offer."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a buyer's agent to buy a new construction Lennar home in Crystal Falls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You are not required to use one, but it is strongly recommended — and it costs you nothing. Lennar pays the buyer's agent commission. An independent agent like Joe Sanches represents only your interests, reviews the purchase contract, helps negotiate flex cash and options, and accompanies you through the entire build process."
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

export default function CrystalFallsPage({ communityData, liveHomes }) {
  return (
    <>
      <Head>
        <title>New Construction Crystal Falls Leander TX — Lennar Homes 2026 | Joe Sanches</title>
        <meta name="description" content="New Lennar homes for sale in Crystal Falls, Leander TX. Golf course community, top LISD schools. Prices $370K–$520K. See live builder incentives and available inventory." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/new-construction-crystal-falls`} />
        <meta property="og:title" content="New Construction Crystal Falls Leander TX — Lennar 2026" />
        <meta property="og:description" content="Browse Lennar new homes in Crystal Falls, Leander TX. Golf course views, LISD schools, $370K–$520K. Live inventory updated daily." />
        <meta property="og:url" content={`${baseUrl}/new-construction-crystal-falls`} />
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
          <span>Crystal Falls</span>
        </nav>

        {/* Hero */}
        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Updated March 2026</div>
          <h2 className="heroTitle">New Construction Homes in Crystal Falls — Leander TX</h2>
          <p className="heroLead">
            Crystal Falls is one of Leander's most established master-planned communities, built around a 3,500-acre nature corridor and the Crystal Falls Golf Club. Lennar and CalAtlantic homes range from the high $300s to the low $500s. LISD schools. Low-pressure buyer representation — free to you, paid by the builder.
          </p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">Leander, TX</span>
            <span className="pill">Lennar Homes</span>
            <span className="pill">$370K–$520K</span>
            <span className="pill">LISD Schools</span>
          </div>
        </div>

        <div className="two-col" style={{ marginTop: '48px' }}>
          <main className="main">

            {/* Community Overview */}
            <Section id="overview" title="Crystal Falls — Community Overview">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Crystal Falls sits in northwest Leander, anchored by the 18-hole Crystal Falls Golf Club and miles of hike-and-bike trails. The community blends established resale homes with Lennar's current new construction phases. Buyers get the feel of a mature neighborhood with the warranty and energy package of a brand-new home.
              </p>
              <div style={{ display: 'grid', gap: '0' }}>
                <InfoRow label="Location" value="NW Leander, off Crystal Falls Pkwy" />
                <InfoRow label="Builder" value="Lennar (formerly CalAtlantic)" />
                <InfoRow label="Price Range" value="$370,000 – $520,000" />
                <InfoRow label="Sq Ft Range" value="1,900 – 3,400 sqft" />
                <InfoRow label="School District" value="Leander ISD (LISD)" />
                <InfoRow label="Elementary" value="Winkley Elementary (LISD)" />
                <InfoRow label="Middle School" value="Leander Middle School" />
                <InfoRow label="High School" value="Leander High / Vista Ridge High" />
                <InfoRow label="HOA Est." value="~$600–$800/year" />
                <InfoRow label="Property Tax Rate" value="~2.22%–2.42% (MUD sections)" />
                <InfoRow label="Commute to Domain" value="~22 min via 183A" />
                <InfoRow label="Commute to Downtown Austin" value="~35–45 min via 183A/Mopac" />
              </div>
            </Section>

            {/* Live Deals */}
            <Section id="live-deals" title="Live Deals — Crystal Falls Homes">
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
                Inventory updated daily from Joe's builder feed. These are homes currently available or move-in ready with active incentives.
              </p>
              {liveHomes.length > 0 ? (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {liveHomes.map(h => <HomeCard key={h.id} home={h} />)}
                </div>
              ) : (
                <div className="card" style={{ textAlign: 'center', color: 'var(--muted)' }}>
                  <p>No live inventory at this moment — call Joe for the latest availability: <a href="tel:5126638867" style={{ color: 'var(--accent-light)' }}>512-663-8867</a></p>
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

            {/* Why Crystal Falls */}
            <Section id="why" title="Why Buy in Crystal Falls?">
              <div style={{ display: 'grid', gap: '12px' }}>
                {[
                  ['Golf Course Access', 'The 18-hole Crystal Falls Golf Club is walkable from most homesites. Green fees, cart rentals, and memberships available to residents.'],
                  ['Mature Tree Canopy', 'Unlike newer communities on raw land, Crystal Falls has established oaks and cedars lining streets and backing many lots.'],
                  ['Trail System', 'Over 5 miles of interconnected hike-and-bike trails weave through the 3,500-acre nature corridor — no car required for a morning run.'],
                  ['Top LISD Schools', 'Winkley Elementary, Leander Middle, and Leander High are all well-rated campuses within the consistently top-ranked Leander ISD.'],
                  ['183A Access', 'Crystal Falls Pkwy connects directly to 183A Toll, putting the Domain 22 minutes away and downtown Austin 35–40 minutes away even during peak hours.'],
                  ['Lennar Warranty', "Lennar's 1-2-10 warranty covers workmanship (1 yr), systems (2 yr), and structural defects (10 yr) — one of the stronger builder warranty packages in the market."],
                ].map(([title, desc]) => (
                  <div key={title} className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                    <h3 style={{ color: 'var(--accent-light)', margin: '0 0 8px', fontSize: '15px' }}>{title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Tax & HOA */}
            <Section id="taxes" title="Property Taxes & HOA — Crystal Falls">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                The established sections of Crystal Falls (pre-2018 Lennar phases) carry a base Leander combined rate of approximately 2.22% with no MUD. Newer Lennar phases built after 2018 may include a MUD district, pushing total effective rates to roughly 2.35%–2.42%. Always confirm at <a href="https://wcad.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-light)' }}>wcad.org</a> for the specific parcel.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                HOA dues run approximately $600–$800/year and cover trail maintenance, common area landscaping, and the community amenity center with pool. Golf club access is separate.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8' }}>
                Texas homestead exemption ($100,000 off school district appraised value) saves roughly $1,800–$2,300/year on a $400K–$500K home. File with Williamson County Appraisal District by April 30 of the year following your purchase.
              </p>
            </Section>

            {/* FAQ */}
            <Section id="faq" title="Frequently Asked Questions — Crystal Falls">
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
                  ['/new-construction-leander-tx', 'All New Construction Communities in Leander TX — 2026 Hub'],
                  ['/new-construction-bryson', 'Bryson by KB Home — Leander TX'],
                  ['/new-construction-northline', 'Northline by Taylor Morrison — Leander TX'],
                  ['/new-construction-larkspur', 'Larkspur by David Weekley — Leander TX'],
                  ['/new-construction-deerbrooke', 'Deerbrooke by Meritage Homes — Leander TX'],
                  ['/new-construction-travisso', 'Travisso by Toll Brothers — Cedar Park TX'],
                  ['/lennar-homes-leander-tx', 'All Lennar Communities in Leander TX'],
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
                <h3 style={{ color: 'var(--accent-light)', margin: '0 0 10px', fontSize: '15px' }}>Tour Crystal Falls Free</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>
                  Joe will accompany you to the builder's sales office, review the purchase contract, and help negotiate incentives — at no cost to you. Lennar pays the agent commission.
                </p>
                <a href="tel:5126638867" className="btn accent" style={{ display: 'block', textAlign: 'center', padding: '12px', justifyContent: 'center' }}>
                  Call 512-663-8867
                </a>
                <a href="mailto:hello@joefsanches.com?subject=Crystal Falls Tour Request" className="btn" style={{ display: 'block', textAlign: 'center', padding: '12px', marginTop: '8px' }}>
                  Email Joe
                </a>
              </div>

              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '15px' }}>Quick Facts</h3>
                {[
                  ['Builder', 'Lennar'],
                  ['Price Range', '$370K–$520K'],
                  ['Sq Ft', '1,900–3,400'],
                  ['Tax Rate', '~2.22%–2.42%'],
                  ['HOA', '~$600–$800/yr'],
                  ['Schools', 'LISD'],
                  ['Commute to Domain', '~22 min'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(107,120,84,.1)', padding: '8px 0', fontSize: '13px' }}>
                    <span style={{ color: 'var(--muted)' }}>{k}</span>
                    <span style={{ color: 'white', fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '15px' }}>Other Communities</h3>
                {[
                  ['/new-construction-bryson', 'Bryson — KB Home'],
                  ['/new-construction-northline', 'Northline — Taylor Morrison'],
                  ['/new-construction-larkspur', 'Larkspur — David Weekley'],
                  ['/new-construction-deerbrooke', 'Deerbrooke — Meritage'],
                  ['/new-construction-travisso', 'Travisso — Toll Brothers'],
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
          <h2 style={{ color: 'white', margin: '0 0 12px', fontSize: '26px' }}>Ready to Tour Crystal Falls?</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '60ch', margin: '0 auto 28px', lineHeight: '1.7' }}>
            I accompany buyers to the Lennar sales office, review every contract line, and help you maximize incentives. It's free to you — Lennar pays my commission.
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
    const communityData = data.communities.find(c => c.community === COMMUNITY) || null;
    const liveHomes = (data.homes || []).filter(h => h.community === COMMUNITY);
    return { props: { communityData, liveHomes } };
  } catch (e) {
    return { props: { communityData: null, liveHomes: [] } };
  }
}
