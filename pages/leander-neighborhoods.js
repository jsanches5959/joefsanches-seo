import Head from 'next/head';
import Link from 'next/link';

const baseUrl = 'https://joefsanches.com';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Leander TX Neighborhoods Guide 2026 | Joe Sanches Realtor",
  "description": "Complete guide to every Leander TX neighborhood in 2026. Compare Crystal Falls, Bryson, Travisso, Larkspur, Northline, Deerbrooke, and more by price, schools, and lifestyle.",
  "url": `${baseUrl}/leander-neighborhoods`,
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
      "name": "What is the best neighborhood in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on your priorities. Crystal Falls is tops for established prestige and golf course access. Travisso wins for luxury Hill Country living. Bryson and Northline offer the best new construction value. Block House Creek is best for low property taxes with no MUD district. For commuters, Northline's proximity to the MetroRail station is unmatched."
      }
    },
    {
      "@type": "Question",
      "name": "Which Leander neighborhood has the lowest property taxes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Block House Creek and older sections of Caballo Ranch have no MUD district, meaning combined rates stay near 2.18%–2.22%. Crystal Falls original sections are similar. Newer communities like Bryson (~2.57%) and Northline (~2.52%) carry higher rates due to active MUD bonds."
      }
    },
    {
      "@type": "Question",
      "name": "Is Leander TX a safe place to live?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — Leander consistently ranks among the safest cities in Texas. The city's violent crime rate is well below both the Texas and national averages. The strong HOA structures in master-planned communities like Crystal Falls, Travisso, and Bryson also help maintain neighborhood standards."
      }
    },
    {
      "@type": "Question",
      "name": "What are the best neighborhoods in Leander for families with kids?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Larkspur, Crystal Falls, and Bryson are consistently top picks for families. All three are zoned to highly-rated Leander ISD elementary and middle schools, have trail systems and parks within walking distance, and offer a mix of price points. Travisso is also excellent for families with higher budgets."
      }
    },
    {
      "@type": "Question",
      "name": "How is Leander TX different from Cedar Park TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cedar Park is more established, more commercial, and generally has a lower cost of living for comparable homes. Leander has more new construction, larger lots, and more master-planned communities. Leander is growing faster and offers more inventory for buyers seeking new builds. Both are served by Leander ISD."
      }
    }
  ]
};

const neighborhoods = [
  { name: 'Crystal Falls', price: '$420K–$750K', tax: '~2.22%–2.42%', schools: 'Akin Elem, Leander MS, Vista Ridge HS', vibe: 'Established, golf course, Hill Country', mud: 'Partial (newer phases only)' },
  { name: 'Bryson', price: '$330K–$550K', tax: '~2.57%', schools: 'Danielson Elem, Leander MS, Glenn HS', vibe: 'Resort amenities, newer builds', mud: 'Yes — MUD #22 (~0.35%)' },
  { name: 'Travisso', price: '$580K–$1.1M', tax: '~2.34%', schools: 'Cypress Elem, Cedar Park MS, Cedar Park HS', vibe: 'Luxury, panoramic Hill Country views', mud: 'Yes — MUD #12 (~0.12%)' },
  { name: 'Larkspur', price: '$380K–$560K', tax: '~2.42%–2.50%', schools: 'Pleasant Hill Elem, Leander MS, Glenn HS', vibe: 'Family-friendly, trails, newer builds', mud: 'Yes — MUD #18 (~0.20%–0.28%)' },
  { name: 'Northline', price: '$320K–$480K', tax: '~2.52%', schools: 'Bagdad Elem, Danielson MS, Rouse HS', vibe: 'Urban-walkable, MetroRail access', mud: 'Yes — MUD #19 (~0.30%)' },
  { name: 'Deerbrooke', price: '$350K–$600K', tax: '~2.50%', schools: 'Gillespie Elem, Running Brushy MS, Rouse HS', vibe: 'Newest community, greenbelt trails', mud: 'Yes — MUD #25 (~0.28%)' },
  { name: 'Block House Creek', price: '$300K–$480K', tax: '~2.18%–2.22%', schools: 'Block House Creek Elem, Running Brushy MS, Leander HS', vibe: 'Established, mature trees, no MUD', mud: 'No MUD' },
  { name: 'Horizon Lake', price: '$320K–$500K', tax: '~2.28%–2.38%', schools: 'Winkley Elem, Cedar Park MS, Cedar Park HS', vibe: 'Lake access, relaxed, spacious lots', mud: 'Minimal' },
  { name: 'Caballo Ranch', price: '$340K–$520K', tax: '~2.22%–2.35%', schools: 'Camacho Elem, Leander MS, Rouse HS', vibe: 'Quiet, established, low overhead', mud: 'Partial' },
  { name: 'Bar W Ranch', price: '$400K–$650K', tax: '~2.40%–2.50%', schools: 'Bagdad Elem, Danielson MS, Rouse HS', vibe: 'Newer, Hill Country setting, Meritage', mud: 'Yes — newer MUD' },
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

export default function LeaderNeighborhoodsHub() {
  return (
    <>
      <Head>
        <title>Leander TX Neighborhoods Guide 2026 | Joe Sanches Realtor</title>
        <meta name="description" content="Compare every Leander TX neighborhood in 2026 — Crystal Falls, Bryson, Travisso, Larkspur, Northline, Deerbrooke, Block House Creek, and more. Prices, schools, taxes, and lifestyle from local expert Joe Sanches." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/leander-neighborhoods`} />
        <meta property="og:title" content="Leander TX Neighborhoods Guide 2026 | Joe Sanches Realtor" />
        <meta property="og:description" content="Every Leander TX neighborhood compared side-by-side. Prices, taxes, schools, and local expert insights from Joe Sanches." />
        <meta property="og:url" content={`${baseUrl}/leander-neighborhoods`} />
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
          <span>Leander TX Neighborhoods</span>
        </nav>

        {/* Hero */}
        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Updated March 2026</div>
          <h2 className="heroTitle">Leander TX Neighborhoods: The Complete 2026 Comparison Guide</h2>
          <p className="heroLead">
            Leander has grown from a small railroad town into one of Texas's fastest-expanding cities — and that means dozens of distinct neighborhoods, each with a different price point, personality, and property tax profile. This guide compares all of them so you can find your fit before you ever set foot in a model home or open house.
          </p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">Crystal Falls</span>
            <span className="pill">Bryson</span>
            <span className="pill">Travisso</span>
            <span className="pill">Northline</span>
            <span className="pill">Deerbrooke</span>
            <span className="pill">Larkspur</span>
          </div>
        </div>

        {/* TOC */}
        <div className="card" style={{ marginTop: '32px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: 'var(--accent-light)' }}>On This Page</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
            <NavLink href="#overview" label="Leander's Growth Story" />
            <NavLink href="#comparison" label="Neighborhood Comparison Table" />
            <NavLink href="#deep-dives" label="Neighborhood Deep Dives" />
            <NavLink href="#how-to-choose" label="How to Choose Your Neighborhood" />
            <NavLink href="#nearby" label="Cedar Park & Liberty Hill" />
            <NavLink href="#faq" label="Frequently Asked Questions" />
          </div>
        </div>

        <div className="grid" style={{ marginTop: '0' }}>
          <main className="main">

            <Section id="overview" title="Leander TX: One of America's Fastest-Growing Cities">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Leander's population has grown from roughly 26,000 in 2010 to over 80,000 today — a tripling in fifteen years. The city sits at the northwestern edge of the Austin metro along the 183A toll road corridor, with Capital Metro's Red Line MetroRail connecting downtown Leander to downtown Austin in about 45 minutes.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                This growth has produced an extraordinary variety of neighborhoods: luxury Hill Country estates in Travisso, resort-style master-planned communities in Bryson, walkable urban-style blocks in Northline, and mature tree-lined streets in Block House Creek. The common thread across all of them: Leander ISD schools, Hill Country proximity, and strong long-term appreciation.
              </p>
              <Callout>
                <strong style={{ color: 'white' }}>Key fact:</strong> Leander was ranked one of the top 10 fastest-growing cities in the United States for multiple consecutive years. That growth trajectory directly supports property values — and makes neighborhood selection a long-term investment decision, not just a lifestyle one.
              </Callout>
            </Section>

            <Section id="comparison" title="Leander TX Neighborhood Comparison Table">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Here's a side-by-side look at Leander's major neighborhoods across price range, estimated tax rate, school assignment, and key characteristics. Use this as a starting filter before diving deeper.
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: 'rgba(107,120,84,.2)' }}>
                      {['Neighborhood', 'Price Range', 'Est. Tax Rate', 'HS Feeder', 'MUD?'].map(h => (
                        <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--accent-light)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {neighborhoods.map((n, i) => (
                      <tr key={n.name} style={{ background: i % 2 === 0 ? 'rgba(107,120,84,.04)' : 'transparent', borderBottom: '1px solid rgba(107,120,84,.12)' }}>
                        <td style={{ padding: '10px 12px', color: 'white', fontWeight: 600 }}>{n.name}</td>
                        <td style={{ padding: '10px 12px', color: '#E0E5D8' }}>{n.price}</td>
                        <td style={{ padding: '10px 12px', color: '#E0E5D8' }}>{n.tax}</td>
                        <td style={{ padding: '10px 12px', color: '#E0E5D8' }}>{n.schools.split(',').pop().trim()}</td>
                        <td style={{ padding: '10px 12px', color: n.mud === 'No MUD' ? 'var(--accent-light)' : '#E0E5D8' }}>{n.mud === 'No MUD' ? 'No MUD' : 'Yes'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="deep-dives" title="Neighborhood Deep Dives">
              {neighborhoods.map(n => (
                <div key={n.name} className="card" style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                    <h3 style={{ color: 'white', margin: 0, fontSize: '18px' }}>{n.name}</h3>
                    <span className="pill">{n.price}</span>
                  </div>
                  <p style={{ color: 'var(--accent-light)', fontSize: '13px', margin: '0 0 6px' }}>{n.vibe}</p>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
                    <span>Tax rate: <strong style={{ color: 'white' }}>{n.tax}</strong></span>
                    <span>MUD: <strong style={{ color: 'white' }}>{n.mud}</strong></span>
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0 }}>Schools: {n.schools}</p>
                </div>
              ))}
            </Section>

            <Section id="how-to-choose" title="How to Choose the Right Leander Neighborhood">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                With 10+ major communities to choose from, the choice can feel overwhelming. Joe walks every buyer through these four filters:
              </p>
              {[
                { q: 'Budget — total cost, not just purchase price', a: 'A $450K home in Bryson costs ~$750/month in property taxes alone. The same $450K in Block House Creek costs ~$650/month. That $100/month difference is $1,200/year. Run the full number.' },
                { q: 'School assignment', a: 'Not every community feeds the school you want. Confirm your specific lot\'s school zoning at the Leander ISD website before you close — especially in transitional communities still being built out.' },
                { q: 'Commute patterns', a: 'If you commute to Austin, Northline\'s MetroRail access may save you hours per week. If you work in Cedar Park or Round Rock, proximity to 183A, 29, or 1431 matters more than neighborhood brand.' },
                { q: 'New vs. resale preference', a: 'Bryson, Deerbrooke, and Northline are primarily new construction. Block House Creek, Caballo Ranch, and Crystal Falls (early phases) offer mature resale inventory. Your preference shapes which communities are even relevant.' },
              ].map((item, i) => (
                <div key={i} className="card" style={{ marginBottom: '14px' }}>
                  <p style={{ color: 'white', fontWeight: 600, margin: '0 0 8px' }}>{item.q}</p>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </Section>

            <Section id="nearby" title="Cedar Park and Liberty Hill: Leander's Neighbors">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Buyers priced out of or uninterested in Leander's master-planned scene often look at adjacent cities. Both are also served by Leander ISD, so school quality stays consistent.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                <div className="card">
                  <h3 style={{ color: 'white', margin: '0 0 10px', fontSize: '17px' }}>Cedar Park</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>More established than Leander, with more retail, restaurants, and services along 183, 1431, and Whitestone Blvd. Home prices range from $280K–$650K depending on neighborhood. Brushy Creek area is a Cedar Park standout. Also served by Leander ISD.</p>
                </div>
                <div className="card">
                  <h3 style={{ color: 'white', margin: '0 0 10px', fontSize: '17px' }}>Liberty Hill</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>West of Leander on TX-29. Smaller town feel with larger lots and acreage options. Santa Rita Ranch is a major master-planned community here. Liberty Hill ISD (separate from Leander ISD). More affordable per square foot but longer commutes to Austin.</p>
                </div>
              </div>
            </Section>

            <Section id="faq" title="Leander Neighborhoods FAQ">
              {faqSchema.mainEntity.map((q, i) => (
                <div key={i} className="card" style={{ marginBottom: '16px' }}>
                  <h3 style={{ color: 'white', margin: '0 0 10px', fontSize: '16px' }}>{q.name}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{q.acceptedAnswer.text}</p>
                </div>
              ))}
            </Section>

            <Section id="related" title="Explore More Leander Resources">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
                <NavLink href="/new-construction-leander-tx" label="New Construction Guide" />
                <NavLink href="/leander-isd-schools" label="Leander ISD Schools Guide" />
                <NavLink href="/property-tax-leander-tx" label="Property Tax Rates by Neighborhood" />
                <NavLink href="/leander-real-estate-market-2026" label="2026 Market Report" />
                <NavLink href="/buy-home-leander-tx" label="Buyer's Guide" />
                <NavLink href="/moving-to-leander-tx" label="Moving to Leander Guide" />
              </div>
            </Section>

          </main>
        </div>

        {/* Bottom CTA */}
        <div className="card" style={{ textAlign: 'center', padding: '40px 24px', marginTop: '40px' }}>
          <h2 style={{ color: 'white', fontSize: '28px', marginBottom: '12px' }}>Not Sure Which Neighborhood is Right for You?</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px', maxWidth: '560px', margin: '0 auto 24px' }}>
            Joe has lived and worked in Leander for years. A 20-minute call will narrow your search to 2–3 neighborhoods that match your priorities — at no cost.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:5126638867" className="btn accent" style={{ fontSize: '16px', padding: '14px 28px' }}>Call Joe — 512-663-8867</a>
            <a href="sms:5126638867" className="btn" style={{ fontSize: '16px', padding: '14px 28px' }}>Text Joe</a>
          </div>
        </div>
      </div>
    </>
  );
}
