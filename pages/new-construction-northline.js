import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://joefsanches.com';
const COMMUNITY = 'Northline';

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "New Construction Homes in Northline Leander TX — Taylor Morrison 2026",
  "description": "Browse Taylor Morrison new homes in Northline, Leander TX. Walkable village design, near Domain & Apple campus, $380K–$560K. Live inventory and builder deals.",
  "url": `${baseUrl}/new-construction-northline`,
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
      "name": "What is the Northline community in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Northline is a walkable master-planned community in Leander TX built around a village-style commercial core with retail, restaurants, and services. Taylor Morrison is the primary builder. Homes range from $380,000 to $560,000 and the community is designed for reduced car dependency, with trails connecting to parks and the Leander Metro Rail station."
      }
    },
    {
      "@type": "Question",
      "name": "Is Northline Leander close to the Apple campus and Domain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Northline is located near the Leander MetroRail station, which provides rail access toward the Domain and downtown Austin. By car via 183A, the Domain is approximately 20–25 minutes and the Apple campus on 620 is about 18–22 minutes. It's one of the best-located new construction communities for tech workers."
      }
    },
    {
      "@type": "Question",
      "name": "Which schools serve Northline Leander?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Northline is zoned to Leander ISD. Elementary school is typically Tarvin Elementary or North Elementary. Middle school is Running Brushy or Stiles Middle. High school is Rouse High or Cedar Park High, both within LISD."
      }
    },
    {
      "@type": "Question",
      "name": "Does Northline have a MUD tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Northline carries a MUD district that adds approximately 0.25%–0.35% to the base combined rate, putting the effective tax rate around 2.45%–2.52%. Confirm the specific parcel's rate at wcad.org before making an offer."
      }
    },
    {
      "@type": "Question",
      "name": "What is Taylor Morrison's Invitation to Dream program?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Invitation to Dream is Taylor Morrison's home buying and personalization process. It allows buyers to tour model homes, select structural options (room additions, extended covered patios, etc.), and work with a design studio consultant to choose finishes. The process is designed to feel collaborative rather than sales-driven."
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

export default function NorthlinePage({ communityData, liveHomes }) {
  return (
    <>
      <Head>
        <title>New Construction Northline Leander TX — Taylor Morrison 2026 | Joe Sanches</title>
        <meta name="description" content="Taylor Morrison new homes in Northline, Leander TX. Walkable village, near MetroRail, Domain & Apple. $380K–$560K. Live builder inventory and incentives." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/new-construction-northline`} />
        <meta property="og:title" content="New Construction Northline Leander TX — Taylor Morrison 2026" />
        <meta property="og:description" content="Taylor Morrison new homes in walkable Northline, Leander TX. Near MetroRail, Domain & Apple campus. $380K–$560K. Live inventory updated daily." />
        <meta property="og:url" content={`${baseUrl}/new-construction-northline`} />
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
          <span>Northline</span>
        </nav>

        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Updated March 2026</div>
          <h2 className="heroTitle">New Construction Homes in Northline — Leander TX</h2>
          <p className="heroLead">
            Northline reimagines suburban living with a walkable village design: retail, restaurants, and parks woven into the neighborhood fabric. Taylor Morrison homes from $380K. Adjacent to Leander's MetroRail station — skip the highway commute. Near the Domain, Apple campus, and major north Austin tech corridors.
          </p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">Leander, TX</span>
            <span className="pill">Taylor Morrison</span>
            <span className="pill">$380K–$560K</span>
            <span className="pill">Near MetroRail</span>
          </div>
        </div>

        <div className="two-col" style={{ marginTop: '48px' }}>
          <main className="main">

            <Section id="overview" title="Northline — Community Overview">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Northline is among Leander's most innovative planned communities — designed from the ground up as a walkable urban village. The commercial core brings groceries, restaurants, and services within walking distance of homes, reducing car trips and building a stronger sense of neighborhood identity. Taylor Morrison's Invitation to Dream program makes the buying process feel transparent and personalized.
              </p>
              <div style={{ display: 'grid', gap: '0' }}>
                <InfoRow label="Location" value="East Leander, near Leander MetroRail" />
                <InfoRow label="Builder" value="Taylor Morrison" />
                <InfoRow label="Price Range" value="$380,000 – $560,000" />
                <InfoRow label="Sq Ft Range" value="1,850 – 3,600 sqft" />
                <InfoRow label="School District" value="Leander ISD (LISD)" />
                <InfoRow label="Elementary" value="Tarvin Elementary / North Elementary" />
                <InfoRow label="Middle School" value="Running Brushy / Stiles Middle" />
                <InfoRow label="High School" value="Rouse High / Cedar Park High" />
                <InfoRow label="HOA Est." value="~$750–$1,000/year" />
                <InfoRow label="Property Tax Rate" value="~2.45%–2.52% (includes MUD)" />
                <InfoRow label="MetroRail Access" value="~5 min walk/drive to Leander Station" />
                <InfoRow label="Commute to Domain" value="~20–25 min (car) or ~35 min (rail)" />
                <InfoRow label="Commute to Apple Campus (620)" value="~18–22 min" />
              </div>
            </Section>

            <Section id="live-deals" title="Live Deals — Northline Homes">
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
                Inventory updated daily from Joe's builder feed.
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

            <Section id="why" title="Why Buy in Northline?">
              <div style={{ display: 'grid', gap: '12px' }}>
                {[
                  ['Walkable Village Design', 'Northline is planned around a commercial village core — groceries, restaurants, coffee shops, and services are walkable from most homesites. No car needed for daily errands.'],
                  ['MetroRail Station Access', 'The Leander MetroRail station is minutes away, providing a congestion-free commute option toward the Domain, UT, and downtown Austin.'],
                  ['Tech Corridor Location', "Apple's 3M campus on 620, the Domain, and north Austin's tech cluster are all 18–25 minutes away — making Northline a top pick for tech workers."],
                  ['Taylor Morrison Quality', "Taylor Morrison is consistently rated one of the top national builders for customer satisfaction. The Invitation to Dream buying process provides more personalization than most production builders."],
                  ['Parks and Trails', 'Northline integrates parks, pocket greens, and a connected trail system throughout the community. Multiple dog parks and playgrounds are planned.'],
                  ['LISD Schools', 'Northline feeds Leander ISD — one of the top-rated school districts in Texas by academic performance and facilities.'],
                ].map(([title, desc]) => (
                  <div key={title} className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                    <h3 style={{ color: 'var(--accent-light)', margin: '0 0 8px', fontSize: '15px' }}>{title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="taxes" title="Property Taxes & HOA — Northline">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Northline carries a MUD district with an effective combined tax rate of approximately 2.45%–2.52%. On a $450,000 home after homestead exemption, annual taxes run roughly $7,800–$8,500. Confirm the exact rate for your specific parcel at <a href="https://wcad.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-light)' }}>wcad.org</a>.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8' }}>
                HOA dues are approximately $750–$1,000/year, covering trail maintenance, parks, common areas, and the amenity center. The commercial village core also contributes to HOA-maintained common spaces.
              </p>
            </Section>

            <Section id="faq" title="Frequently Asked Questions — Northline">
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
                  ['/new-construction-bryson', 'Bryson by KB Home — Leander TX'],
                  ['/new-construction-larkspur', 'Larkspur by David Weekley — Leander TX'],
                  ['/new-construction-deerbrooke', 'Deerbrooke by Meritage Homes — Leander TX'],
                  ['/new-construction-travisso', 'Travisso by Toll Brothers — Cedar Park TX'],
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

          <aside className="side" style={{ paddingTop: '56px' }}>
            <div style={{ position: 'sticky', top: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--accent-light)', margin: '0 0 10px', fontSize: '15px' }}>Tour Northline Free</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>
                  Joe accompanies buyers to the Taylor Morrison sales office at no cost. Taylor Morrison pays the buyer's agent commission.
                </p>
                <a href="tel:5126638867" className="btn accent" style={{ display: 'block', textAlign: 'center', padding: '12px' }}>Call 512-663-8867</a>
                <a href="mailto:hello@joefsanches.com?subject=Northline Tour Request" className="btn" style={{ display: 'block', textAlign: 'center', padding: '12px', marginTop: '8px' }}>Email Joe</a>
              </div>
              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '15px' }}>Quick Facts</h3>
                {[
                  ['Builder', 'Taylor Morrison'],
                  ['Price Range', '$380K–$560K'],
                  ['Sq Ft', '1,850–3,600'],
                  ['Tax Rate', '~2.45%–2.52%'],
                  ['HOA', '~$750–$1,000/yr'],
                  ['Schools', 'LISD'],
                  ['To Domain', '~20–25 min'],
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
          <h2 style={{ color: 'white', margin: '0 0 12px', fontSize: '26px' }}>Ready to Tour Northline?</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '60ch', margin: '0 auto 28px', lineHeight: '1.7' }}>
            I'll walk you through Northline, explain the Taylor Morrison Invitation to Dream process, and make sure you're getting the best deal possible — free to you, paid by the builder.
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
          <p style={{ marginTop: '8px', fontSize: '12px', opacity: 0.6 }}>Prices and availability subject to change. Tax rates are estimates — confirm at wcad.org.</p>
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
