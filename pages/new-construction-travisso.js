import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://joefsanches.com';
const COMMUNITY = 'Travisso';

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "New Construction Homes in Travisso Cedar Park TX | Joe Sanches",
  "description": "Browse new Toll Brothers and Taylor Morrison luxury homes in Travisso, Cedar Park TX. Hill Country views, resort amenities, LISD schools, $500K–$850K. Live inventory.",
  "url": `${baseUrl}/new-construction-travisso`,
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
      "name": "What builders build in Travisso Cedar Park?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Travisso features two luxury builders: Toll Brothers and Taylor Morrison. Toll Brothers is a publicly traded national builder known for high-end finishes and luxury communities. Taylor Morrison brings their 'Invitation to Dream' personalization program to Travisso, allowing buyers to customize plans extensively. Both builders operate simultaneously within different sections of the community."
      }
    },
    {
      "@type": "Question",
      "name": "What are Travisso home prices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Homes in Travisso are priced from approximately $500,000 to $850,000. Toll Brothers luxury plans with Hill Country view lots typically land in the $650K–$850K range. Taylor Morrison's plans start in the low $500s and reach $700K+ with upgrades. Pricing reflects the luxury positioning, Hill Country views, and premium amenity package."
      }
    },
    {
      "@type": "Question",
      "name": "Is Travisso in Leander or Cedar Park ISD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Travisso is zoned to Leander ISD (LISD), despite being located in Cedar Park. Elementary students attend Cypress Ranch Elementary. Middle school is Cedar Park Middle School and high school is Cedar Park High School — all highly rated LISD campuses. LISD is consistently ranked among Texas's top school districts."
      }
    },
    {
      "@type": "Question",
      "name": "What amenities does Travisso have?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Travisso's amenity center is among the most impressive in the Austin-area market. It features a resort-style pool, fitness center, tennis courts, sand volleyball, event lawn, and miles of Hill Country trails. The community is planned around Leandro Lake and the natural topography, creating dramatic views and green corridors throughout."
      }
    },
    {
      "@type": "Question",
      "name": "What is the HOA fee in Travisso?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Travisso's HOA runs approximately $130/month (~$1,560/year). Given the resort amenity center, trail system, lake access, and the premium maintenance required across the community's topography, this is a reasonable rate for the luxury amenity set. Always confirm the current HOA amount with the builder or HOA management before closing."
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

export default function TravissoPage({ communityData, liveHomes }) {
  return (
    <>
      <Head>
        <title>New Construction Homes in Travisso Cedar Park TX | Joe Sanches</title>
        <meta name="description" content="New Toll Brothers and Taylor Morrison luxury homes in Travisso, Cedar Park TX. Hill Country views, resort amenity center, LISD schools. Prices $500K–$850K." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/new-construction-travisso`} />
        <meta property="og:title" content="New Construction Homes in Travisso Cedar Park TX | Joe Sanches" />
        <meta property="og:description" content="Browse Toll Brothers and Taylor Morrison luxury new homes in Travisso, Cedar Park TX. Hill Country views, resort amenities, LISD schools, $500K–$850K." />
        <meta property="og:url" content={`${baseUrl}/new-construction-travisso`} />
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
          <span>Travisso</span>
        </nav>

        {/* Hero */}
        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Updated March 2026</div>
          <h2 className="heroTitle">New Construction Homes in Travisso — Cedar Park TX</h2>
          <p className="heroLead">
            Travisso is the Austin area's premier luxury master-planned community, set in the Texas Hill Country near Cedar Park. Toll Brothers and Taylor Morrison build homes from the $500s to $850K+, with dramatic Hill Country views, a resort amenity center, and Leandro Lake. Zoned to top-rated LISD schools — Cypress Ranch Elementary, Cedar Park Middle, Cedar Park High.
          </p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">Cedar Park, TX</span>
            <span className="pill">Toll Brothers</span>
            <span className="pill">Taylor Morrison</span>
            <span className="pill">$500K–$850K</span>
          </div>
        </div>

        <div className="two-col" style={{ marginTop: '48px' }}>
          <main className="main">

            {/* Community Overview */}
            <Section id="overview" title="Travisso — Community Overview">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Travisso occupies a spectacular Hill Country ridgeline near the intersection of Leander and Cedar Park, delivering some of the most dramatic views available in the Austin metro at the new construction price point. The master-planned development was designed around the natural terrain, with winding streets, preserved green corridors, and Leandro Lake at its center. Two luxury builders — Toll Brothers and Taylor Morrison — offer distinct design aesthetics within the community.
              </p>
              <div style={{ display: 'grid', gap: '0' }}>
                <InfoRow label="Location" value="Cedar Park, TX (near Leander)" />
                <InfoRow label="Builders" value="Toll Brothers + Taylor Morrison" />
                <InfoRow label="Price Range" value="$500,000 – $850,000+" />
                <InfoRow label="Setting" value="Hill Country views, Leandro Lake" />
                <InfoRow label="School District" value="Leander ISD (LISD)" />
                <InfoRow label="Elementary" value="Cypress Ranch Elementary" />
                <InfoRow label="Middle School" value="Cedar Park Middle School" />
                <InfoRow label="High School" value="Cedar Park High School" />
                <InfoRow label="HOA" value="~$130/month (~$1,560/year)" />
                <InfoRow label="Property Tax Rate" value="~2.30%" />
                <InfoRow label="Commute to Austin" value="~40 min" />
              </div>
            </Section>

            {/* Live Deals */}
            <Section id="live-deals" title="Live Deals — Travisso Homes">
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
                Inventory updated daily from Joe's builder feed. These are homes currently available or move-in ready with active incentives.
              </p>
              {liveHomes.length > 0 ? (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {liveHomes.map(h => <HomeCard key={h.id} home={h} />)}
                </div>
              ) : (
                <div className="card" style={{ textAlign: 'center', color: 'var(--muted)' }}>
                  <p>Check back soon — deals updated daily. Or call Joe for current availability: <a href="tel:5126638867" style={{ color: 'var(--accent-light)' }}>512-663-8867</a></p>
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

            {/* Why Travisso */}
            <Section id="why" title="Why Buy in Travisso?">
              <div style={{ display: 'grid', gap: '12px' }}>
                {[
                  ['Hill Country Views', 'Travisso sits on one of the highest ridgelines in the Cedar Park area. Many homesites have sweeping Hill Country views — a rarity at new construction price points in the Austin metro.'],
                  ['Leandro Lake', 'The community is designed around Leandro Lake, a scenic water feature that anchors the trail system and provides a natural gathering point for residents year-round.'],
                  ['Luxury Amenity Center', 'Travisso\'s amenity complex includes a resort-style pool, fitness center, tennis and sand volleyball courts, event pavilion, and access to miles of Hill Country trails.'],
                  ['Two Luxury Builders', 'Toll Brothers and Taylor Morrison offer different plan styles and design aesthetics — giving Travisso buyers genuine choice between two premium builders without leaving the community.'],
                  ['Top LISD Schools', 'Cypress Ranch Elementary, Cedar Park Middle, and Cedar Park High are all highly rated campuses within Leander ISD, consistently one of Texas\'s top-performing school districts.'],
                  ['Independent Agent Advantage', 'Both Toll Brothers and Taylor Morrison have dedicated sales agents who represent the builder. Joe represents you — reviewing contracts, attending walkthroughs, and negotiating on your behalf, at no cost to you.'],
                ].map(([title, desc]) => (
                  <div key={title} className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                    <h3 style={{ color: 'var(--accent-light)', margin: '0 0 8px', fontSize: '15px' }}>{title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Tax & HOA */}
            <Section id="taxes" title="Property Taxes & HOA — Travisso">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Travisso's combined property tax rate is approximately 2.30%, which is relatively favorable for a Cedar Park/Leander new construction community. On a $650,000 home after homestead exemption, annual taxes run roughly $12,650–$13,500. Confirm the specific parcel rate at <a href="https://wcad.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-light)' }}>wcad.org</a>.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                HOA dues run approximately $130/month ($1,560/year). The higher HOA reflects the premium amenity center, lake maintenance, Hill Country trail system, and community-wide landscaping across varied terrain. This is consistent with luxury master-planned communities in the Austin market.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8' }}>
                File the Texas homestead exemption with Williamson County Appraisal District by April 30 after purchase. On a $650K home this saves approximately $2,300–$2,800/year.
              </p>
            </Section>

            {/* FAQ */}
            <Section id="faq" title="Frequently Asked Questions — Travisso">
              {faqSchema.mainEntity.map(({ name, acceptedAnswer }) => (
                <div key={name} className="card" style={{ marginBottom: '12px' }}>
                  <h3 style={{ color: 'white', margin: '0 0 8px', fontSize: '16px' }}>{name}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{acceptedAnswer.text}</p>
                </div>
              ))}
            </Section>

            {/* Internal Links */}
            <Section id="related" title="Explore More New Construction Near Austin TX">
              <div style={{ display: 'grid', gap: '10px' }}>
                {[
                  ['/new-construction-leander-tx', 'All New Construction Communities in Leander TX — 2026 Hub'],
                  ['/new-construction-crystal-falls', 'Crystal Falls by Lennar — Leander TX'],
                  ['/new-construction-bryson', 'Bryson by KB Home — Leander TX'],
                  ['/new-construction-northline', 'Northline by Taylor Morrison — Leander TX'],
                  ['/new-construction-larkspur', 'Larkspur by David Weekley — Leander TX'],
                  ['/new-construction-deerbrooke', 'Deerbrooke by Meritage Homes — Leander TX'],
                  ['/taylor-morrison-leander-tx', 'All Taylor Morrison Communities in Leander TX'],
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
                <h3 style={{ color: 'var(--accent-light)', margin: '0 0 10px', fontSize: '15px' }}>Tour Travisso Free</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>
                  Joe accompanies you to both the Toll Brothers and Taylor Morrison sales offices, reviews contracts, and negotiates incentives — at no cost. Both builders pay the buyer's agent commission.
                </p>
                <a href="tel:5126638867" className="btn accent" style={{ display: 'block', textAlign: 'center', padding: '12px' }}>
                  Call 512-663-8867
                </a>
                <a href="mailto:hello@joefsanches.com?subject=Travisso Tour Request" className="btn" style={{ display: 'block', textAlign: 'center', padding: '12px', marginTop: '8px' }}>
                  Email Joe
                </a>
              </div>

              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '15px' }}>Quick Facts</h3>
                {[
                  ['Builders', 'Toll Brothers / Taylor Morrison'],
                  ['Price Range', '$500K–$850K+'],
                  ['Tax Rate', '~2.30%'],
                  ['HOA', '~$130/mo'],
                  ['Schools', 'LISD'],
                  ['To Austin', '~40 min'],
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
                  ['/new-construction-larkspur', 'Larkspur — David Weekley'],
                  ['/new-construction-deerbrooke', 'Deerbrooke — Meritage'],
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
          <h2 style={{ color: 'white', margin: '0 0 12px', fontSize: '26px' }}>Ready to Tour Travisso?</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '60ch', margin: '0 auto 28px', lineHeight: '1.7' }}>
            I'll walk you through both the Toll Brothers and Taylor Morrison model homes, compare plan options, review every contract detail, and help you negotiate incentives — all free to you. Both builders pay my commission.
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
