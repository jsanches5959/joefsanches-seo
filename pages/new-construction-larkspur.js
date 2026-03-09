import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://joefsanches.com';
const COMMUNITY = 'Larkspur';

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "New Construction Homes in Larkspur Leander TX | Joe Sanches",
  "description": "Browse new David Weekley homes in Larkspur, Leander TX. Boutique community, resort pool, LISD schools, $420K–$580K. See live builder deals and current inventory.",
  "url": `${baseUrl}/new-construction-larkspur`,
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
      "name": "What builders are in Larkspur Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Larkspur in Leander TX is built exclusively by David Weekley Homes. David Weekley is a Houston-based national builder known for award-winning customer service and a strong 10-year structural warranty. The boutique scale of Larkspur means David Weekley maintains tighter quality control than in larger master-planned developments."
      }
    },
    {
      "@type": "Question",
      "name": "What are Larkspur Leander TX home prices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "David Weekley homes in Larkspur are priced from approximately $420,000 to $580,000. Pricing depends on floor plan, lot selection, and personalization studio upgrades. Entry-level 3-bedroom plans start in the low $420s; larger 4–5 bedroom plans on premium lots reach $560K–$580K."
      }
    },
    {
      "@type": "Question",
      "name": "What schools serve Larkspur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Larkspur is zoned to Leander ISD (LISD). Elementary students typically attend Larkspur Elementary, which serves the community directly. Middle school is generally Danielson Middle School and high school is Glenn High School. LISD is consistently ranked among Texas's top school districts."
      }
    },
    {
      "@type": "Question",
      "name": "Does Larkspur have a MUD district?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Larkspur is in a Municipal Utility District (MUD), which adds to the base tax rate. Total effective property tax rate in Larkspur runs approximately 2.35%, combining the Leander base rate with the MUD assessment. Always confirm the exact rate for a specific parcel at wcad.org before making an offer."
      }
    },
    {
      "@type": "Question",
      "name": "What is the HOA fee in Larkspur Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The HOA in Larkspur runs approximately $80/month (about $960/year). HOA dues cover the resort-style pool, walking trails, common area landscaping, and community maintenance. Given the amenity level, this is a competitive rate compared to other master-planned communities in the area."
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

export default function LarkspurPage({ communityData, liveHomes }) {
  return (
    <>
      <Head>
        <title>New Construction Homes in Larkspur Leander TX | Joe Sanches</title>
        <meta name="description" content="New David Weekley homes in Larkspur, Leander TX. Boutique community, resort pool, walking trails, LISD schools. Prices $420K–$580K. Live inventory updated daily." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/new-construction-larkspur`} />
        <meta property="og:title" content="New Construction Homes in Larkspur Leander TX | Joe Sanches" />
        <meta property="og:description" content="Browse David Weekley new homes in Larkspur, Leander TX. Resort pool, top LISD schools, $420K–$580K. Live builder deals updated daily." />
        <meta property="og:url" content={`${baseUrl}/new-construction-larkspur`} />
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
          <span>Larkspur</span>
        </nav>

        {/* Hero */}
        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Updated March 2026</div>
          <h2 className="heroTitle">New Construction Homes in Larkspur — Leander TX</h2>
          <p className="heroLead">
            Larkspur is a boutique master-planned community in Leander built exclusively by David Weekley Homes. With approximately 200 homes, resort-style pool, and walking trails, Larkspur offers an intimate neighborhood feel without sacrificing amenities. Zoned to Leander ISD — including the on-site Larkspur Elementary. Prices from the low $420s.
          </p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">Leander, TX</span>
            <span className="pill">David Weekley Homes</span>
            <span className="pill">$420K–$580K</span>
            <span className="pill">LISD Schools</span>
          </div>
        </div>

        <div className="two-col" style={{ marginTop: '48px' }}>
          <main className="main">

            {/* Community Overview */}
            <Section id="overview" title="Larkspur — Community Overview">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Larkspur is one of Leander's most sought-after boutique communities — small enough to feel like a true neighborhood, large enough to support resort-level amenities. David Weekley's award-winning craftsmanship and personalization studio give buyers meaningful control over finishes and layout. The community's MUD district funded the infrastructure that makes Larkspur feel polished and move-in ready from day one.
              </p>
              <div style={{ display: 'grid', gap: '0' }}>
                <InfoRow label="Location" value="Leander, TX (near 183A & Hero Way)" />
                <InfoRow label="Builder" value="David Weekley Homes" />
                <InfoRow label="Community Size" value="~200 homes (boutique)" />
                <InfoRow label="Price Range" value="$420,000 – $580,000" />
                <InfoRow label="School District" value="Leander ISD (LISD)" />
                <InfoRow label="Elementary" value="Larkspur Elementary (LISD)" />
                <InfoRow label="Middle School" value="Danielson Middle School" />
                <InfoRow label="High School" value="Glenn High School" />
                <InfoRow label="HOA" value="~$80/month (~$960/year)" />
                <InfoRow label="Property Tax Rate" value="~2.35% (includes MUD)" />
                <InfoRow label="MUD District" value="Yes" />
                <InfoRow label="Commute to Domain" value="~25 min via 183A" />
              </div>
            </Section>

            {/* Live Deals */}
            <Section id="live-deals" title="Live Deals — Larkspur Homes">
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
                Inventory updated daily from Joe's builder feed. These are homes currently available or move-in ready with active incentives.
              </p>
              {liveHomes.length > 0 ? (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {liveHomes.map(h => <HomeCard key={h.id} home={h} />)}
                </div>
              ) : (
                <div className="card" style={{ textAlign: 'center', color: 'var(--muted)' }}>
                  <p>Check back soon — deals updated daily. Or call Joe for the latest availability: <a href="tel:5126638867" style={{ color: 'var(--accent-light)' }}>512-663-8867</a></p>
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

            {/* Why Larkspur */}
            <Section id="why" title="Why Buy in Larkspur?">
              <div style={{ display: 'grid', gap: '12px' }}>
                {[
                  ['Boutique Scale', 'At ~200 homes, Larkspur is dramatically smaller than most Leander master-planned communities. You know your neighbors. Streets stay quiet. It still has every amenity of a larger development.'],
                  ['David Weekley Quality', "David Weekley has won J.D. Power awards for customer satisfaction and is consistently rated among Texas's top homebuilders. Their build quality and after-sale service stand out."],
                  ['Resort Pool & Trails', 'The community amenity center features a resort-style pool and connected walking trails — all covered by the HOA.'],
                  ['Larkspur Elementary On-Site', 'Elementary-age children walk to Larkspur Elementary, which sits within the community. No busing required for the youngest kids.'],
                  ['183A Commute', 'Quick access to 183A Toll puts the Domain around 25 minutes away, making Larkspur viable even for Austin-based workers who need to be in-office regularly.'],
                  ['10-Year Structural Warranty', "David Weekley's 10-year structural warranty is one of the longest in the builder industry, providing meaningful protection on your largest investment."],
                ].map(([title, desc]) => (
                  <div key={title} className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                    <h3 style={{ color: 'var(--accent-light)', margin: '0 0 8px', fontSize: '15px' }}>{title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Tax & HOA */}
            <Section id="taxes" title="Property Taxes & HOA — Larkspur">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Larkspur's total effective property tax rate is approximately 2.35%, which includes the Leander base rate plus the MUD district assessment. On a $500,000 home after the Texas homestead exemption ($100,000 off appraised value), annual taxes run roughly $9,400–$10,000. Confirm the specific parcel rate at <a href="https://wcad.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-light)' }}>wcad.org</a>.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                HOA dues are approximately $80/month ($960/year), covering resort pool maintenance, walking trails, common area landscaping, and community management. This is a fair rate given the amenity set.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8' }}>
                File the Texas homestead exemption with Williamson County Appraisal District by April 30 of the year following your closing. Joe can walk you through the process.
              </p>
            </Section>

            {/* FAQ */}
            <Section id="faq" title="Frequently Asked Questions — Larkspur">
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
                  ['/new-construction-crystal-falls', 'Crystal Falls by Lennar — Leander TX'],
                  ['/new-construction-bryson', 'Bryson by KB Home — Leander TX'],
                  ['/new-construction-northline', 'Northline by Taylor Morrison — Leander TX'],
                  ['/new-construction-deerbrooke', 'Deerbrooke by Meritage Homes — Leander TX'],
                  ['/new-construction-travisso', 'Travisso by Toll Brothers — Cedar Park TX'],
                  ['/david-weekley-leander-cedar-park', 'All David Weekley Communities in Leander & Cedar Park'],
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
                <h3 style={{ color: 'var(--accent-light)', margin: '0 0 10px', fontSize: '15px' }}>Tour Larkspur Free</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>
                  Joe accompanies you to the David Weekley sales office, reviews the purchase contract, and helps negotiate upgrades and incentives — at no cost to you. David Weekley pays the buyer's agent commission.
                </p>
                <a href="tel:5126638867" className="btn accent" style={{ display: 'block', textAlign: 'center', padding: '12px' }}>
                  Call 512-663-8867
                </a>
                <a href="mailto:hello@joefsanches.com?subject=Larkspur Tour Request" className="btn" style={{ display: 'block', textAlign: 'center', padding: '12px', marginTop: '8px' }}>
                  Email Joe
                </a>
              </div>

              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '15px' }}>Quick Facts</h3>
                {[
                  ['Builder', 'David Weekley Homes'],
                  ['Price Range', '$420K–$580K'],
                  ['Community Size', '~200 homes'],
                  ['Tax Rate', '~2.35%'],
                  ['HOA', '~$80/mo'],
                  ['Schools', 'LISD'],
                  ['To Domain', '~25 min'],
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
                  ['/new-construction-crystal-falls', 'Crystal Falls — Lennar'],
                  ['/new-construction-bryson', 'Bryson — KB Home'],
                  ['/new-construction-northline', 'Northline — Taylor Morrison'],
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
          <h2 style={{ color: 'white', margin: '0 0 12px', fontSize: '26px' }}>Ready to Tour Larkspur?</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '60ch', margin: '0 auto 28px', lineHeight: '1.7' }}>
            I'll walk you through the David Weekley process, help you select the right plan and lot, review every contract detail, and negotiate incentives — all free to you. David Weekley pays my commission.
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
