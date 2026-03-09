import Head from 'next/head';
import Link from 'next/link';

const baseUrl = 'https://joefsanches.com';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Leander ISD Schools Guide 2026 | Ratings, Zones & More | Joe Sanches",
  "description": "Complete 2026 guide to Leander ISD schools — elementary, middle, and high schools. Ratings, zoning tips, and what every home buyer needs to know before choosing a neighborhood.",
  "url": `${baseUrl}/leander-isd-schools`,
  "author": { "@type": "Person", "name": "Joe Sanches", "url": baseUrl },
  "publisher": {
    "@type": "Organization",
    "name": "Joe Sanches Realtor",
    "logo": { "@type": "ImageObject", "url": `${baseUrl}/logo.png` }
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Joe Sanches Realtor",
  "telephone": "512-663-8867",
  "email": "hello@joefsanches.com",
  "url": baseUrl,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Leander",
    "addressRegion": "TX",
    "addressCountry": "US"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Leander ISD a good school district?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — Leander ISD is consistently one of the top-rated large school districts in Texas. It holds a 'B' overall rating from the Texas Education Agency and multiple campuses earn 'A' ratings. The district serves over 45,000 students and is known for strong academics, athletics, and fine arts programs. GreatSchools ratings for LISD campuses range from 6 to 9 out of 10."
      }
    },
    {
      "@type": "Question",
      "name": "How do I find which Leander ISD school my address is zoned to?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use the official Leander ISD school finder at leanderisd.org. Enter your address and it will return your assigned elementary, middle, and high school. Note: zoning for new construction communities can change as the district adds capacity, so always verify at closing — not just during your home search."
      }
    },
    {
      "@type": "Question",
      "name": "What are the high schools in Leander ISD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leander ISD has four high schools: Leander High School, Vista Ridge High School, Glenn High School, and Rouse High School. Each has distinct programs — Vista Ridge is known for its STEM magnet program, Glenn for athletics and fine arts, Rouse for its International Baccalaureate program, and Leander HS for its longstanding academic tradition."
      }
    },
    {
      "@type": "Question",
      "name": "Does Leander ISD offer dual enrollment or AP classes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — all four LISD high schools offer extensive AP (Advanced Placement) coursework. Vista Ridge and Rouse also offer International Baccalaureate (IB) programs. Dual enrollment partnerships with Austin Community College allow students to earn college credit while still in high school."
      }
    },
    {
      "@type": "Question",
      "name": "Can I choose which Leander ISD school my child attends?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leander ISD allows intra-district transfers subject to available capacity. Magnet and specialty programs (like the STEM program at Vista Ridge or IB at Rouse) have their own application processes and are open to students district-wide. Outside of specialty programs, your assigned school is based on your home address."
      }
    }
  ]
};

const elementaries = [
  { name: 'Akin Elementary', area: 'Crystal Falls / Horizon Lake', rating: '8/10', notes: 'Strong test scores, active PTA, well-resourced campus.' },
  { name: 'Bagdad Elementary', area: 'Northline / Central Leander', rating: '7/10', notes: 'Near MetroRail corridor; diverse student body.' },
  { name: 'Camacho Elementary', area: 'Caballo Ranch / South Leander', rating: '7/10', notes: 'Well-established campus with strong community ties.' },
  { name: 'Cypress Elementary', area: 'Travisso / Cedar Park northwest', rating: '8/10', notes: 'High parent satisfaction; growing enrollment from Travisso.' },
  { name: 'Danielson Elementary', area: 'Bryson / Northline', rating: '7/10', notes: 'Newer campus serving the fast-growing northeast Leander area.' },
  { name: 'Gillespie Elementary', area: 'Deerbrooke / south Leander', rating: '7/10', notes: 'Serves new Deerbrooke community; enrollment growing rapidly.' },
  { name: 'Pleasant Hill Elementary', area: 'Larkspur / central Leander', rating: '8/10', notes: 'Highly rated campus; popular feeder into strong middle schools.' },
  { name: 'Winkley Elementary', area: 'Horizon Lake / Cedar Park north', rating: '7/10', notes: 'Reliable scores; serves lake-area communities.' },
  { name: 'Block House Creek Elem', area: 'Block House Creek', rating: '7/10', notes: 'One of LISD\'s more established campuses with a loyal community.' },
];

const middles = [
  { name: 'Leander Middle School', feeds: 'Crystal Falls, Block House Creek', rating: '8/10', programs: 'GT, pre-AP, fine arts' },
  { name: 'Running Brushy Middle', feeds: 'Deerbrooke, Caballo Ranch', rating: '7/10', programs: 'STEM focus, athletics' },
  { name: 'Cedar Park Middle', feeds: 'Travisso, Horizon Lake', rating: '8/10', programs: 'IB Middle Years Programme preparation' },
  { name: 'Danielson Middle', feeds: 'Bryson, Northline, Bar W Ranch', rating: '7/10', programs: 'GT, athletics, band' },
];

const highs = [
  { name: 'Leander High School', estd: '1974', enrollment: '~2,800', rating: '7/10', programs: 'AP, dual enrollment, strong band and athletics', address: '3301 S Bagdad Rd, Leander TX 78641' },
  { name: 'Vista Ridge High School', estd: '2000', enrollment: '~3,200', rating: '8/10', programs: 'STEM magnet, AP, National Merit Scholars', address: '4050 Parkway, Cedar Park TX 78613' },
  { name: 'Glenn High School', estd: '2011', enrollment: '~2,600', rating: '8/10', programs: 'AP, fine arts academy, CTE programs', address: '1320 N Bell Blvd, Cedar Park TX 78613' },
  { name: 'Rouse High School', estd: '2006', enrollment: '~2,400', rating: '8/10', programs: 'IB Diploma Programme, AP, dual enrollment', address: '1222 N CR 258, Cedar Park TX 78613' },
];

function Section({ id, title, children }) {
  return (
    <section id={id} style={{ marginBottom: '48px' }}>
      <h2 style={{ fontSize: '26px', color: 'white', borderBottom: '2px solid var(--accent)', paddingBottom: '10px', marginBottom: '20px' }}>{title}</h2>
      {children}
    </section>
  );
}

function Callout({ children }) {
  return (
    <div style={{
      background: 'rgba(107,120,84,.08)',
      border: '1px solid rgba(107,120,84,.3)',
      borderLeft: '4px solid var(--accent)',
      borderRadius: '10px', padding: '16px 20px',
      marginBottom: '24px', color: 'var(--muted)',
      fontSize: '14px', lineHeight: '1.7'
    }}>{children}</div>
  );
}

function NavLink({ href, label }) {
  return (
    <a href={href} style={{
      color: 'var(--accent-light)', textDecoration: 'none',
      fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px'
    }}>
      <span style={{ color: 'var(--accent)' }}>→</span> {label}
    </a>
  );
}

export default function LeaderISDSchoolsHub() {
  return (
    <>
      <Head>
        <title>Leander ISD Schools Guide 2026 | Ratings, Zones & More | Joe Sanches</title>
        <meta name="description" content="Complete guide to Leander ISD schools in 2026. Every elementary, middle school, and high school with ratings, zoning info, and programs. Essential reading before buying a home in Leander TX." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/leander-isd-schools`} />
        <meta property="og:title" content="Leander ISD Schools Guide 2026 | Ratings, Zones & More | Joe Sanches" />
        <meta property="og:description" content="Every Leander ISD school — ratings, zoning, programs, and expert tips for home buyers choosing a neighborhood based on schools." />
        <meta property="og:url" content={`${baseUrl}/leander-isd-schools`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
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
        <nav style={{ marginTop: '20px', fontSize: '13px', color: 'var(--muted)', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'var(--accent-light)' }}>Home</Link>
          <span>›</span>
          <span>Leander ISD Schools Guide</span>
        </nav>

        {/* Hero */}
        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Updated March 2026</div>
          <h2 className="heroTitle">Leander ISD Schools: The Complete 2026 Guide for Home Buyers</h2>
          <p className="heroLead">
            Leander ISD is one of the most important factors driving real estate demand in the Leander and Cedar Park area — and for good reason. With four high schools, a growing roster of elementary campuses, and consistently strong state ratings, LISD is a major asset for any homeowner in the district. Here's everything you need to know before you buy.
          </p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">Leander HS</span>
            <span className="pill">Vista Ridge HS</span>
            <span className="pill">Glenn HS</span>
            <span className="pill">Rouse HS</span>
            <span className="pill">TEA Ratings</span>
          </div>
        </div>

        {/* TOC */}
        <div className="card" style={{ marginTop: '32px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: 'var(--accent-light)' }}>On This Page</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
            <NavLink href="#district" label="District Overview" />
            <NavLink href="#elementary" label="Elementary Schools" />
            <NavLink href="#middle" label="Middle Schools" />
            <NavLink href="#high" label="High Schools" />
            <NavLink href="#ratings" label="GreatSchools Ratings Context" />
            <NavLink href="#zoning" label="School Zoning Tips" />
            <NavLink href="#faq" label="Frequently Asked Questions" />
          </div>
        </div>

        <div className="grid" style={{ marginTop: '0' }}>
          <main className="main">

            <Section id="district" title="Leander ISD District Overview">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Leander Independent School District serves over 45,000 students across Leander, Cedar Park, and portions of northwest Austin and Liberty Hill. The district operates 4 high schools, 6 middle schools, and over 25 elementary campuses. It has been one of the fastest-growing school districts in Texas for more than a decade, adding new campuses regularly to keep pace with population growth.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                {[
                  { label: 'Students', value: '45,000+' },
                  { label: 'Campuses', value: '40+' },
                  { label: 'High Schools', value: '4' },
                  { label: 'TEA Rating', value: '"B" District' },
                ].map(s => (
                  <div key={s.label} className="card" style={{ textAlign: 'center', padding: '20px' }}>
                    <p style={{ color: 'var(--accent-light)', fontSize: '24px', fontWeight: 700, margin: '0 0 4px' }}>{s.value}</p>
                    <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0 }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <Callout>
                <strong style={{ color: 'white' }}>For buyers:</strong> LISD is a genuine draw that sustains property values. Homes zoned to top-rated campuses — particularly the Vista Ridge and Glenn high school feeders — command measurable price premiums over comparable homes in other zones.
              </Callout>
            </Section>

            <Section id="elementary" title="Leander ISD Elementary Schools">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                LISD has over 25 elementary campuses. Here are the most relevant ones for buyers in Leander's major neighborhoods, with approximate GreatSchools-style ratings (scale of 1–10):
              </p>
              {elementaries.map(e => (
                <div key={e.name} className="card" style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: 'white', fontWeight: 600, margin: '0 0 4px', fontSize: '15px' }}>{e.name}</p>
                    <p style={{ color: 'var(--accent-light)', fontSize: '12px', margin: '0 0 6px' }}>{e.area}</p>
                    <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0 }}>{e.notes}</p>
                  </div>
                  <span className="pill" style={{ whiteSpace: 'nowrap' }}>{e.rating}</span>
                </div>
              ))}
            </Section>

            <Section id="middle" title="Leander ISD Middle Schools">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                LISD operates six middle schools. Here are the four most relevant to Leander buyers, along with their key programs:
              </p>
              {middles.map(m => (
                <div key={m.name} className="card" style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                    <p style={{ color: 'white', fontWeight: 600, margin: 0, fontSize: '15px' }}>{m.name}</p>
                    <span className="pill">{m.rating}</span>
                  </div>
                  <p style={{ color: 'var(--accent-light)', fontSize: '13px', margin: '0 0 4px' }}>Serves: {m.feeds}</p>
                  <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0 }}>Programs: {m.programs}</p>
                </div>
              ))}
            </Section>

            <Section id="high" title="Leander ISD High Schools">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                All four LISD high schools are competitive, well-resourced, and produce strong college acceptance rates. Each has a distinct identity:
              </p>
              {highs.map(h => (
                <div key={h.name} className="card" style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                    <h3 style={{ color: 'white', margin: 0, fontSize: '18px' }}>{h.name}</h3>
                    <span className="pill">{h.rating}</span>
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: '13px', margin: '0 0 4px' }}>Est. {h.estd} · Enrollment ~{h.enrollment} · {h.address}</p>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>Programs: {h.programs}</p>
                </div>
              ))}
            </Section>

            <Section id="ratings" title="Understanding GreatSchools Ratings in Context">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                GreatSchools ratings are useful but imperfect. They weight state test scores heavily, which can disadvantage schools serving more socioeconomically diverse populations — even when those schools deliver excellent teaching and growth for their students. Joe recommends buyers look at:
              </p>
              <ul style={{ color: 'var(--muted)', lineHeight: '2', paddingLeft: '20px', marginBottom: '20px' }}>
                <li>TEA (Texas Education Agency) accountability ratings — more nuanced than GreatSchools</li>
                <li>Student growth metrics — a school that moves students forward matters as much as raw test scores</li>
                <li>Program offerings — AP, IB, dual enrollment, CTE, fine arts, and athletics</li>
                <li>Campus culture and parent involvement — talk to local parents, not just websites</li>
              </ul>
              <Callout>
                <strong style={{ color: 'white' }}>Local insight:</strong> Every LISD high school sends graduates to UT Austin, Texas A&M, and other top universities every year. The district's worst-rated high school by GreatSchools still outperforms the majority of high schools in Texas by most objective measures.
              </Callout>
            </Section>

            <Section id="zoning" title="School Zoning Tips for Leander TX Home Buyers">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                School zoning in a rapidly growing district like LISD is a moving target. Here's what experienced buyers know:
              </p>
              {[
                'Verify zoning at leanderisd.org using your exact address — not the neighborhood name or builder\'s marketing materials.',
                'Zoning can change as new campuses open. A home bought in 2023 zoned to Akin Elementary may rezone to a newer campus by 2025.',
                'For new construction on a lot not yet assigned an address, ask the builder which school zone they expect the lot to fall in — but treat it as an estimate, not a guarantee.',
                'Intra-district transfers are possible but not guaranteed. Apply early; popular campuses fill quickly.',
                'Homes near attendance boundary lines are higher risk for rezoning. Ask Joe to check boundary proximity before you make an offer.',
              ].map((tip, i) => (
                <div key={i} className="card" style={{ marginBottom: '10px', display: 'flex', gap: '12px' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700, minWidth: '20px' }}>{i + 1}.</span>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{tip}</p>
                </div>
              ))}
            </Section>

            <Section id="faq" title="Leander ISD Schools FAQ">
              {faqSchema.mainEntity.map((q, i) => (
                <div key={i} className="card" style={{ marginBottom: '16px' }}>
                  <h3 style={{ color: 'white', margin: '0 0 10px', fontSize: '16px' }}>{q.name}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{q.acceptedAnswer.text}</p>
                </div>
              ))}
            </Section>

            <Section id="related" title="Explore More Leander Resources">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
                <NavLink href="/leander-neighborhoods" label="Leander Neighborhood Guide" />
                <NavLink href="/new-construction-leander-tx" label="New Construction Guide" />
                <NavLink href="/buy-home-leander-tx" label="Buyer's Guide" />
                <NavLink href="/property-tax-leander-tx" label="Property Tax by Neighborhood" />
                <NavLink href="/moving-to-leander-tx" label="Moving to Leander" />
                <NavLink href="/leander-real-estate-market-2026" label="2026 Market Report" />
              </div>
            </Section>

          </main>
        </div>

        {/* Bottom CTA */}
        <div className="card" style={{ textAlign: 'center', padding: '40px 24px', marginTop: '40px' }}>
          <h2 style={{ color: 'white', fontSize: '28px', marginBottom: '12px' }}>Want to Buy in a Specific LISD School Zone?</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px', maxWidth: '560px', margin: '0 auto 24px' }}>
            Joe knows every attendance boundary, every rezoning risk, and which communities feed your target campus. Let's find your home in the right zone.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:5126638867" className="btn accent" style={{ fontSize: '16px', padding: '14px 28px' }}>Call Joe — 512-663-8867</a>
            <a href="sms:5126638867" className="btn" style={{ fontSize: '16px', padding: '14px 28px' }}>Text Joe</a>
            <a href="mailto:hello@joefsanches.com" className="btn" style={{ fontSize: '16px', padding: '14px 28px' }}>Email Joe</a>
          </div>
        </div>
      </div>
    </>
  );
}
