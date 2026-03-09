import Head from 'next/head';
import Link from 'next/link';

const baseUrl = 'https://joefsanches.com';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Moving to Leander TX 2026 | Complete Relocation Guide | Joe Sanches",
  "description": "Everything you need to know about moving to Leander TX: neighborhoods, schools, cost of living, commute times, and what makes this Austin suburb special.",
  "url": `${baseUrl}/moving-to-leander-tx`,
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
      "name": "How far is Leander TX from Austin?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leander is approximately 25–30 miles northwest of downtown Austin. By car via the 183A toll road, the drive to downtown Austin takes 35–45 minutes in normal traffic and 45–60 minutes during peak rush hour. Capital Metro's Red Line MetroRail connects downtown Leander station to downtown Austin in approximately 50 minutes without traffic stress. The drive to Apple's campus at north Mopac/Parmer is typically 25–30 minutes, and to the Domain area (where many tech employers are located) is 20–28 minutes."
      }
    },
    {
      "@type": "Question",
      "name": "What is the cost of living in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leander's cost of living is slightly above the national average but significantly below Austin proper. The biggest difference is housing: median home prices in Leander (~$445,000) are approximately 30% below comparable Austin neighborhoods. Groceries, utilities, and everyday goods run similar to Austin — both are served by the same supply chains and HEB stores. Property taxes in Leander run 2.2–2.6% of assessed value annually, which is higher than many states but offset by Texas having no state income tax. The overall picture for a Texas transplant is positive; for someone relocating from California or New York, Leander represents substantial savings."
      }
    },
    {
      "@type": "Question",
      "name": "Is Leander TX a good place to live?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — Leander consistently ranks among the best places to live in Texas and the Austin metro. The city offers top-rated schools through Leander ISD, low crime rates, strong community infrastructure in its master-planned neighborhoods, easy access to Austin's job market via 183A and the MetroRail, and the natural beauty of the Texas Hill Country nearby. The trade-offs are a longer commute to central Austin compared to living in Austin proper, higher property taxes than states like Tennessee or Florida, and a suburban character that may not suit everyone. For families, young professionals, and veterans seeking space and quality of life near Austin's economy, Leander is a compelling choice."
      }
    },
    {
      "@type": "Question",
      "name": "What are the best neighborhoods in Leander TX for families?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crystal Falls, Larkspur, and Bryson are consistently the top choices for families relocating to Leander. Crystal Falls offers established prestige with golf course access and excellent school zoning. Larkspur provides newer construction with an excellent elementary school (Pleasant Hill), miles of trails, and a strong community feel. Bryson's resort-style amenities — including a lazy river pool and splash pad — make it popular with families with young children. Travisso is excellent for families with larger budgets seeking luxury homes and panoramic Hill Country views."
      }
    },
    {
      "@type": "Question",
      "name": "What are Leander TX property taxes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leander TX property taxes range from approximately 2.18% to 2.57% of assessed value per year, depending on the neighborhood and whether a Municipal Utility District (MUD) is present. For a $445,000 home, that means $9,700–$11,450 per year, or $808–$954 per month escrowed. Older neighborhoods like Block House Creek have no MUD district and sit near 2.18–2.22%. Newer master-planned communities like Bryson (~2.57%) and Northline (~2.52%) carry higher rates due to active MUD bonds that financed infrastructure. Texas has no state income tax, which partially offsets these rates for higher-income earners."
      }
    }
  ]
};

const neighborhoods = [
  {
    name: 'Crystal Falls',
    bestFor: 'Established families',
    priceRange: '$420K–$750K',
    profile: 'Leander\'s most recognized community. Golf course access, Hill Country views, mature landscaping in original phases. Mix of resale and newer-phase new construction. Top school zoning including Akin Elementary and Vista Ridge HS.',
    highlight: 'Golf, prestige, Hill Country views'
  },
  {
    name: 'Northline',
    bestFor: 'Young professionals',
    priceRange: '$320K–$480K',
    profile: 'Urban-walkable design with alley-loaded homes and mixed-use commercial along the main boulevard. Adjacent to the Capital Metro Red Line station — you can literally walk to the train. Best Leander neighborhood for Austin commuters who prefer not to drive.',
    highlight: 'MetroRail access, walkability, modern design'
  },
  {
    name: 'Travisso',
    bestFor: 'Luxury buyers',
    priceRange: '$580K–$1.1M+',
    profile: 'Leander\'s premier luxury community. Panoramic Hill Country views, resort clubhouse with pools, and high-end finishes standard. Quieter, more private feel than other master-planned communities. Larger lots than Bryson or Northline.',
    highlight: 'Luxury, views, resort amenities'
  },
  {
    name: 'Bryson',
    bestFor: 'Value seekers & families',
    priceRange: '$330K–$550K',
    profile: 'Strong amenity package including a lazy river pool, fitness center, and multiple pocket parks. Primarily new construction, mostly Pulte and Perry Homes product. Higher MUD tax rate but strong community events calendar.',
    highlight: 'Amenities, new construction, community feel'
  },
  {
    name: 'Larkspur',
    bestFor: 'Growing families',
    priceRange: '$380K–$560K',
    profile: 'Newer master-planned community with exceptional trail connectivity. Pleasant Hill Elementary is within the community. Strong sense of neighborhood with active HOA events. Good mix of price points from entry-level to move-up.',
    highlight: 'Trails, schools, family community'
  },
  {
    name: 'Block House Creek',
    bestFor: 'Budget-conscious buyers',
    priceRange: '$300K–$480K',
    profile: 'One of Leander\'s oldest and most affordable neighborhoods. No MUD district means lower annual taxes. Mature trees, established streets, and a more organic feel than master-planned communities. Good for buyers who want value without the HOA restrictions.',
    highlight: 'No MUD, lower taxes, established'
  },
];

const commuteData = [
  { destination: 'Downtown Austin (6th & Congress)', time: '35–45 min', route: '183A South to I-35 or Mopac', peakTime: '50–65 min', metrorail: '~50 min' },
  { destination: 'Domain / Apple Campus (N. Mopac)', time: '25–30 min', route: '183A South to Parmer Lane', peakTime: '35–45 min', metrorail: '~35 min' },
  { destination: 'Round Rock / Samsung', time: '30–35 min', route: '183A to TX-45 E or US-183', peakTime: '40–50 min', metrorail: 'N/A' },
  { destination: 'Cedar Park', time: '10–15 min', route: '183A or FM 1431 / Whitestone', peakTime: '15–20 min', metrorail: 'N/A' },
  { destination: 'Georgetown', time: '25–35 min', route: '183A to I-35 N', peakTime: '35–45 min', metrorail: 'N/A' },
  { destination: 'Kyle / Buda', time: '50–60 min', route: 'Various, all south-bound', peakTime: '65–80 min', metrorail: 'N/A' },
];

const schoolHighlights = [
  { name: 'Vista Ridge High School', grades: '9–12', notes: 'Consistently top-rated in Texas. Serves Crystal Falls and portions of Larkspur and Caballo Ranch.' },
  { name: 'Rouse High School', grades: '9–12', notes: 'Strong athletics and academics. Serves Northline, Bryson, Caballo Ranch, Bar W Ranch.' },
  { name: 'Glenn High School', grades: '9–12', notes: 'Serves Larkspur and Bryson (portions). Growing enrollment as community matures.' },
  { name: 'Leander High School', grades: '9–12', notes: 'Original Leander high school. Serves Block House Creek and older central Leander areas.' },
  { name: 'Cedar Park High School', grades: '9–12', notes: 'Serves Travisso and Horizon Lake areas of Leander. Strong academics and fine arts.' },
  { name: 'Akin Elementary', grades: 'PK–5', notes: 'Highly-rated elementary within Crystal Falls community. Sought after by families.' },
  { name: 'Pleasant Hill Elementary', grades: 'PK–5', notes: 'Located within Larkspur community. One of the highest-rated elementaries in LISD.' },
];

const relocationChecklist = [
  { item: 'Research neighborhoods and narrow to 2–3 options', detail: 'Use this guide to match your lifestyle, budget, and commute needs to the right community.' },
  { item: 'Get pre-approved for a mortgage', detail: 'Contact a lender before your first home tour. Pre-approval takes 1–3 days and strengthens every offer you make.' },
  { item: 'Verify school zoning for specific addresses', detail: 'School zoning is lot-specific in Leander. Use the Leander ISD website to confirm your exact school assignments before going under contract.' },
  { item: 'Visit in person if at all possible', detail: 'Leander neighborhoods feel different at different times of day. Drive the commute at rush hour. Walk the trails. Eat at a local restaurant.' },
  { item: 'Request MUD and HOA disclosure documents', detail: 'Texas law requires sellers and builders to disclose MUD district status. Review the MUD bond balance and HOA financials before closing.' },
  { item: 'Contact your employer\'s HR about Texas withholding', detail: 'Texas has no state income tax. If relocating from a state with income tax, update withholding immediately to capture the savings.' },
  { item: 'Budget for first-year property tax escrow', detail: 'Your lender will set an escrow cushion based on estimated property taxes. Have 3–6 months of tax payments accessible at closing.' },
  { item: 'Schedule a consultation with Joe', detail: 'A 20-minute call with Joe Sanches before your first visit will help you prioritize neighborhoods, identify builder vs. resale tradeoffs, and understand current market conditions — at no cost.' },
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

export default function MovingToLeanderTx() {
  return (
    <>
      <Head>
        <title>Moving to Leander TX 2026 | Complete Relocation Guide | Joe Sanches</title>
        <meta name="description" content="Everything you need to know about moving to Leander TX: neighborhoods, schools, cost of living, commute times, and what makes this Austin suburb special." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/moving-to-leander-tx`} />
        <meta property="og:title" content="Moving to Leander TX 2026 | Complete Relocation Guide | Joe Sanches" />
        <meta property="og:description" content="Everything you need to know about moving to Leander TX: neighborhoods, schools, cost of living, commute times, and what makes this Austin suburb special." />
        <meta property="og:url" content={`${baseUrl}/moving-to-leander-tx`} />
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
          <span>Moving to Leander TX</span>
        </nav>

        {/* Hero */}
        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Updated March 2026</div>
          <h2 className="heroTitle">Moving to Leander TX — The Complete Relocation Guide</h2>
          <p className="heroLead">
            Leander is one of the most sought-after relocation destinations in Texas — and for good reason. Top-ranked schools, accessible Austin commutes, a fraction of Austin's home prices, and the natural beauty of the Texas Hill Country nearby. This guide covers everything a newcomer needs to know before making the move.
          </p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">25 mi from Austin</span>
            <span className="pill">Top Schools</span>
            <span className="pill">30% Less Than Austin</span>
            <span className="pill">Hill Country Access</span>
          </div>
        </div>

        {/* TOC */}
        <div className="card" style={{ marginTop: '32px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: 'var(--accent-light)' }}>On This Page</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
            <NavLink href="#why-leander" label="Why People Are Moving to Leander" />
            <NavLink href="#cost-of-living" label="Cost of Living vs. Austin" />
            <NavLink href="#neighborhoods" label="Best Neighborhoods for Relocators" />
            <NavLink href="#schools" label="Leander ISD Schools Overview" />
            <NavLink href="#commute" label="Commute Guide" />
            <NavLink href="#things-to-do" label="Things to Do" />
            <NavLink href="#checklist" label="Relocation Checklist" />
            <NavLink href="#home-search" label="Where to Start Your Search" />
            <NavLink href="#faq" label="FAQ" />
          </div>
        </div>

        <div className="grid" style={{ marginTop: '0' }}>
          <main className="main">

            <Section id="why-leander" title="Why People Are Moving to Leander TX">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Leander has been one of the fastest-growing cities in America for over a decade. That growth isn't random — it's the result of a specific combination of factors that make Leander uniquely attractive for families and professionals relocating to the Austin metro.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                {[
                  { title: 'Austin Access Without Austin Prices', desc: 'Leander puts you within 35–40 minutes of Austin\'s job centers at 30% less home price. The 183A toll road makes the commute fast and predictable. Many Leander residents work in north Austin and the Domain area, shortening the commute even further.' },
                  { title: 'Leander ISD — A True Differentiator', desc: 'Leander Independent School District is consistently rated A/exemplary by the Texas Education Agency. When companies like Apple recruit talent to Austin, Leander ISD is one of the reasons families choose Leander over closer-in Austin neighborhoods.' },
                  { title: 'New Construction Quality and Choice', desc: 'If you\'re coming from a region with limited new construction, Leander will feel like an abundance of options. Multiple builders are active across multiple communities at any time, with products ranging from $330K townhome-style homes to $1M+ custom Hill Country estates.' },
                  { title: 'Safety and Community Infrastructure', desc: 'Leander\'s violent crime rate is well below Texas and national averages. Master-planned communities come with HOA structure, maintained common areas, and active social calendars. The community feel here is real — it\'s not just marketing copy.' },
                  { title: 'The Hill Country Is Right There', desc: 'Lake Travis is 20 minutes away. Enchanted Rock, Hamilton Pool, and Pedernales Falls State Park are within 45–75 minutes. Marble Falls and Fredericksburg are easy day trips. If you like outdoor life, Leander\'s position at the edge of the Hill Country is genuinely special.' },
                  { title: 'No State Income Tax', desc: 'Texas has no state income tax. For a household earning $150,000 coming from California or New York, that\'s a $10,000–$18,000 increase in take-home pay. Even accounting for higher property taxes, the net is typically strongly positive.' },
                ].map((item, i) => (
                  <div key={i} className="card">
                    <p style={{ color: 'white', fontWeight: 600, margin: '0 0 8px', fontSize: '15px' }}>{item.title}</p>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="cost-of-living" title="Cost of Living: Leander TX vs. Austin TX">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                How does Leander compare to Austin proper? Here's an honest side-by-side on the categories that matter most to relocators:
              </p>
              <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: 'rgba(107,120,84,.2)' }}>
                      {['Category', 'Austin (Typical)', 'Leander (Typical)', 'Difference'].map(h => (
                        <th key={h} style={{ padding: '12px 14px', textAlign: 'left', color: 'var(--accent-light)', fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { cat: 'Median home price', austin: '$580,000', leander: '$445,000', diff: '~23% less', positive: true },
                      { cat: 'Price per sq ft', austin: '$280–$360', leander: '$195–$260', diff: '~28% less', positive: true },
                      { cat: 'Property tax rate', austin: '1.8–2.2%', leander: '2.18–2.57%', diff: 'Slightly higher', positive: false },
                      { cat: 'Groceries (HEB)', austin: 'Standard', leander: 'Standard', diff: 'Same', positive: true },
                      { cat: 'Utilities (avg/mo)', austin: '$180–$240', leander: '$170–$230', diff: 'About the same', positive: true },
                      { cat: 'Restaurants / dining', austin: 'More options', leander: 'Growing selection', diff: 'Austin has more', positive: false },
                      { cat: 'Commute cost', austin: 'Shorter, less toll', leander: '183A tolls (~$80–120/mo)', diff: 'Slightly more', positive: false },
                      { cat: 'State income tax', austin: 'None (TX)', leander: 'None (TX)', diff: 'Same', positive: true },
                      { cat: 'HOA fees', austin: 'Varies ($0–200)', leander: 'Common ($50–150)', diff: 'About the same', positive: true },
                    ].map((row, i) => (
                      <tr key={row.cat} style={{ background: i % 2 === 0 ? 'rgba(107,120,84,.04)' : 'transparent', borderBottom: '1px solid rgba(107,120,84,.12)' }}>
                        <td style={{ padding: '12px 14px', color: 'white', fontWeight: 600 }}>{row.cat}</td>
                        <td style={{ padding: '12px 14px', color: '#E0E5D8' }}>{row.austin}</td>
                        <td style={{ padding: '12px 14px', color: '#E0E5D8' }}>{row.leander}</td>
                        <td style={{ padding: '12px 14px', color: row.positive ? 'var(--accent-light)' : 'var(--muted)' }}>{row.diff}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Callout>
                <strong style={{ color: 'white' }}>Bottom line:</strong> For housing, Leander is substantially more affordable than Austin. For everything else, costs are broadly similar. The net for most relocating families is a significant improvement in home size and quality per dollar spent — at the cost of a 35–40 minute commute versus a 15–20 minute one from central Austin neighborhoods.
              </Callout>
            </Section>

            <Section id="neighborhoods" title="Best Leander Neighborhoods for Relocators">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Different types of buyers tend to gravitate toward different communities. Here's a quick profile of each community type and who it suits best:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                {neighborhoods.map((n, i) => (
                  <div key={i} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                      <h3 style={{ color: 'white', margin: 0, fontSize: '18px' }}>{n.name}</h3>
                      <span className="pill" style={{ fontSize: '11px' }}>{n.priceRange}</span>
                    </div>
                    <p style={{ color: 'var(--accent-light)', fontSize: '12px', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Best for: {n.bestFor}</p>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: '0 0 8px' }}>{n.profile}</p>
                    <p style={{ color: 'white', fontSize: '13px', fontWeight: 600, margin: 0 }}>{n.highlight}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <NavLink href="/leander-neighborhoods" label="Full Neighborhood Comparison Guide" />
              </div>
            </Section>

            <Section id="schools" title="Leander ISD Schools Overview">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Leander Independent School District (LISD) serves approximately 43,000 students across Leander, Cedar Park, and portions of Liberty Hill. It operates multiple A-rated campuses and is consistently ranked among the top 10% of Texas school districts by the TEA.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                {schoolHighlights.map((school, i) => (
                  <div key={i} className="card" style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
                      <p style={{ color: 'white', fontWeight: 600, margin: 0, fontSize: '15px' }}>{school.name}</p>
                      <span className="pill" style={{ fontSize: '11px' }}>{school.grades}</span>
                    </div>
                    <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.7', margin: 0 }}>{school.notes}</p>
                  </div>
                ))}
              </div>
              <Callout>
                <strong style={{ color: 'white' }}>Important:</strong> School zoning is assigned to specific addresses, not general neighborhoods. A community like Crystal Falls spans multiple elementary school zones. Always verify your specific lot's school assignment at the Leander ISD website before signing a contract. Joe Sanches checks school zoning for every buyer client as a standard part of the process.
              </Callout>
              <NavLink href="/leander-isd-schools" label="Detailed Leander ISD Schools Guide" />
            </Section>

            <Section id="commute" title="Commute Guide: Getting Around from Leander TX">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Leander's position along the 183A toll road and the Capital Metro Red Line makes it one of the better-connected suburban cities in the Austin metro. Here's what commute times look like to major employment centers:
              </p>
              <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: 'rgba(107,120,84,.2)' }}>
                      {['Destination', 'Normal Drive', 'Peak Rush', 'MetroRail', 'Route'].map(h => (
                        <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--accent-light)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {commuteData.map((row, i) => (
                      <tr key={row.destination} style={{ background: i % 2 === 0 ? 'rgba(107,120,84,.04)' : 'transparent', borderBottom: '1px solid rgba(107,120,84,.12)' }}>
                        <td style={{ padding: '10px 12px', color: 'white', fontWeight: 600 }}>{row.destination}</td>
                        <td style={{ padding: '10px 12px', color: '#E0E5D8' }}>{row.time}</td>
                        <td style={{ padding: '10px 12px', color: '#E0E5D8' }}>{row.peakTime}</td>
                        <td style={{ padding: '10px 12px', color: row.metrorail !== 'N/A' ? 'var(--accent-light)' : 'var(--muted)' }}>{row.metrorail}</td>
                        <td style={{ padding: '10px 12px', color: 'var(--muted)', fontSize: '12px' }}>{row.route}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Callout>
                <strong style={{ color: 'white' }}>183A Toll Costs:</strong> The 183A toll road is the primary arterial for Leander commuters. Round-trip tolls run approximately $3–$5/day depending on entry/exit points, or roughly $75–$110/month for a typical commuter. This is a real cost to budget for. TxTag transponders get the lowest rates.
              </Callout>
            </Section>

            <Section id="things-to-do" title="Things to Do in and Around Leander TX">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Leander is a growing city, not a sleepy suburb. Here's what you'll have easy access to:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                {[
                  { title: 'Lake Travis — 20 minutes', desc: 'One of the crown jewels of the Austin area. Boating, kayaking, paddleboarding, cliff jumping at Hippie Hollow, waterfront dining. Leander\'s location makes it one of the closest major cities to the lake.' },
                  { title: 'HEB Plus & Retail', desc: 'Leander has multiple HEB grocery stores including an HEB Plus on Crystal Falls Pkwy. Target, Costco (Cedar Park), and substantial retail along 183A serve everyday needs without driving into Austin.' },
                  { title: 'Old Town Leander', desc: 'The city\'s original commercial core is undergoing a revitalization. Local restaurants, bars, and small businesses give Leander a downtown anchor that\'s growing in character and quality.' },
                  { title: 'Crystal Falls Golf Course', desc: 'A public 18-hole course within the Crystal Falls community. Competitive greens fees and beautiful Hill Country views. One of the best public golf options in the Austin metro.' },
                  { title: 'Leander City Parks & Trails', desc: 'Extensive trail networks throughout master-planned communities connect to city parks. Williamson Creek Greenbelt, Veterans Memorial Park, and community trail systems give residents miles of walking and biking routes.' },
                  { title: 'Restaurants & Dining', desc: 'Leander\'s dining scene has matured significantly. Local favorites include options in Old Town Leander and along the 183A corridor. Cedar Park\'s extensive restaurant row is 10–15 minutes away.' },
                  { title: 'Enchanted Rock & Hill Country', desc: 'The Texas Hill Country begins essentially at Leander\'s western edge. Enchanted Rock State Natural Area (pink granite dome) is ~75 minutes west. Marble Falls and Fredericksburg are easy day trips.' },
                  { title: 'Austin Entertainment', desc: 'Live music on 6th Street, the Domain\'s restaurants and shopping, ACL Fest, SXSW — all of Austin\'s cultural amenities are 35–45 minutes away. Leander residents participate in Austin life on their own terms.' },
                ].map((item, i) => (
                  <div key={i} className="card">
                    <p style={{ color: 'white', fontWeight: 600, margin: '0 0 8px', fontSize: '15px' }}>{item.title}</p>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="checklist" title="Leander Relocation Checklist">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Use this checklist to organize your move to Leander. Items are roughly in the order they should be addressed.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {relocationChecklist.map((item, i) => (
                  <div key={i} className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{
                      minWidth: '28px', height: '28px', borderRadius: '6px',
                      border: '2px solid var(--accent)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: 'var(--accent)', fontWeight: 700, fontSize: '13px', flexShrink: 0
                    }}>{i + 1}</div>
                    <div>
                      <p style={{ color: 'white', fontWeight: 600, margin: '0 0 5px', fontSize: '15px' }}>{item.item}</p>
                      <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.7', margin: 0 }}>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="home-search" title="Where to Start Your Leander Home Search">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                If you're relocating from out of state or from another Texas city, the Leander market can feel overwhelming at first. Multiple builders, a dozen major communities, MUD districts, school zone nuances — there's a lot to absorb. Here's how Joe recommends approaching it:
              </p>
              {[
                { step: 'Start with a phone call', desc: 'A 20-minute call with Joe Sanches before you book your first flight will orient you faster than hours of online research. He\'ll ask you the right questions and give you a short list of neighborhoods to focus on.' },
                { step: 'Plan a 2-day visit', desc: 'Most serious relocators fly in for a 2-day trip. Day one: community and neighborhood driving tours plus a builder model home visit. Day two: private showings of resale homes that match your criteria. Joe structures these visits to be efficient and informative.' },
                { step: 'Understand the full cost picture before you fall in love with a house', desc: 'Know your MUD status, HOA fees, school zone assignment, and true property tax estimate before you get emotionally invested in a specific home. Joe surfaces all of this upfront.' },
                { step: 'Be ready to move', desc: 'Leander\'s best homes — both new construction specs and resale — move within 10–25 days. If you find the right home during your visit trip, being pre-approved lets you make a same-day decision.' },
              ].map((item, i) => (
                <div key={i} className="card" style={{ marginBottom: '12px' }}>
                  <p style={{ color: 'white', fontWeight: 600, margin: '0 0 8px', fontSize: '15px' }}>{item.step}</p>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </Section>

            <Section id="faq" title="Frequently Asked Questions — Moving to Leander TX">
              {faqSchema.mainEntity.map((q, i) => (
                <div key={i} className="card" style={{ marginBottom: '16px' }}>
                  <h3 style={{ color: 'white', margin: '0 0 10px', fontSize: '16px' }}>{q.name}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{q.acceptedAnswer.text}</p>
                </div>
              ))}
            </Section>

            <Section id="related" title="More Leander TX Resources">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
                <NavLink href="/leander-neighborhoods" label="Neighborhood Guide" />
                <NavLink href="/buy-home-leander-tx" label="Buyer's Guide" />
                <NavLink href="/leander-isd-schools" label="Leander ISD Schools Guide" />
                <NavLink href="/property-tax-leander-tx" label="Property Tax Guide" />
                <NavLink href="/leander-real-estate-market-2026" label="2026 Market Report" />
                <NavLink href="/new-construction-leander-tx" label="New Construction Guide" />
              </div>
            </Section>

          </main>
        </div>

        {/* Bottom CTA */}
        <div className="card" style={{ textAlign: 'center', padding: '40px 24px', marginTop: '40px' }}>
          <h2 style={{ color: 'white', fontSize: '28px', marginBottom: '12px' }}>Planning a Move to Leander? Joe Knows Every Neighborhood.</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px', maxWidth: '560px', margin: '0 auto 24px' }}>
            Joe Sanches is a Leander-based Realtor and military veteran who has helped dozens of families and professionals relocate to Leander TX from across the country. Your relocation consultation is free.
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

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 3600,
  };
}
