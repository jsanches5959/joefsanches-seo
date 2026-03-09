import Head from 'next/head';
import Link from 'next/link';

const baseUrl = 'https://joefsanches.com';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Leander TX Real Estate Market Report 2026 | Joe Sanches",
  "description": "Live Leander TX market data: median prices, days on market, inventory trends for 2026. Expert analysis from local Realtor Joe Sanches.",
  "url": `${baseUrl}/leander-real-estate-market-2026`,
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
      "name": "Is Leander TX a buyer's or seller's market in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leander TX is a balanced-to-slight seller's market in early 2026, with approximately 1.8 months of housing inventory. A true balanced market is considered 4–6 months of supply. With under 2 months of inventory, sellers retain modest leverage — but the frenzied multiple-offer environment of 2021–2022 has passed. Well-priced homes still attract strong interest, but buyers have more negotiating room than at any point in the last four years, particularly on new construction where builders are offering rate buydowns and incentive packages."
      }
    },
    {
      "@type": "Question",
      "name": "Are Leander home prices dropping in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leander home prices are not dropping in 2026. After a correction phase in late 2022 and 2023, prices stabilized through 2024 and have been modestly appreciating through 2025–2026. The median home price in Leander is approximately $445,000 as of early 2026, up from a post-correction low near $415,000. Forecasts project 3–5% annual appreciation through 2027, driven by continued job growth, limited resale inventory, and strong in-migration from higher-cost metros."
      }
    },
    {
      "@type": "Question",
      "name": "What is the average days on market in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The average days on market for homes in Leander TX is approximately 28 days as of early 2026. Well-priced homes in high-demand neighborhoods like Crystal Falls and Larkspur often go under contract in 10–15 days. Homes priced above market or in need of significant updates may sit for 45–60 days or more. New construction spec homes typically sell within the first 30 days of being listed for occupancy."
      }
    },
    {
      "@type": "Question",
      "name": "Should I buy new construction or resale in Leander TX in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both are viable in 2026, but for different reasons. New construction offers builder incentives — including mortgage rate buydowns of 1–2 points — that can lower your effective interest rate significantly. Builders like Pulte, Meritage, and Taylor Morrison are motivated to move inventory. Resale homes in established neighborhoods like Crystal Falls and Block House Creek offer mature landscaping, no MUD bond, and often lower total tax rates. The right choice depends on your budget, preferred neighborhood, and timeline. Joe Sanches can help you run a true apples-to-apples comparison."
      }
    },
    {
      "@type": "Question",
      "name": "What is driving Leander TX real estate growth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Several converging forces drive Leander's real estate market: (1) Tech sector job growth — Apple's 3M sq ft campus in north Austin, Samsung's Taylor TX fab plant, and Dell/Tesla/Oracle all employ thousands within commuting distance. (2) Leander ISD quality — consistently among the top school districts in Texas, driving family relocations. (3) 183A toll road — fast, reliable access to Austin's job centers without navigating surface streets. (4) Relative affordability — Leander remains 25–35% less expensive than comparable Austin neighborhoods. (5) Strong in-migration from California, New York, and other high-cost states continuing into 2026."
      }
    }
  ]
};

const neighborhoodPrices = [
  { name: 'Crystal Falls', median: '$420,000', dom: '22 days', inventory: '1.5 mo', trend: 'Stable–Rising', notes: 'Established community, limited resale supply' },
  { name: 'Bryson', median: '$385,000', dom: '31 days', inventory: '2.1 mo', trend: 'Stable', notes: 'New construction keeping supply steady' },
  { name: 'Travisso', median: '$620,000', dom: '38 days', inventory: '2.8 mo', trend: 'Stable', notes: 'Luxury segment, longer DOM typical' },
  { name: 'Northline', median: '$455,000', dom: '25 days', inventory: '1.6 mo', trend: 'Rising', notes: 'Transit access driving demand' },
  { name: 'Larkspur', median: '$510,000', dom: '20 days', inventory: '1.3 mo', trend: 'Rising', notes: 'Family demand keeping inventory very tight' },
  { name: 'Block House Creek', median: '$390,000', dom: '29 days', inventory: '1.9 mo', trend: 'Stable', notes: 'No MUD advantage attracting value buyers' },
  { name: 'Deerbrooke', median: '$430,000', dom: '33 days', inventory: '2.4 mo', trend: 'Stable', notes: 'Newer community still absorbing new builds' },
];

const monthlyStats = [
  { month: 'Aug 2025', median: '$438,000', dom: 31, closed: 142, list: 185, lpr: '94.2%' },
  { month: 'Sep 2025', median: '$441,000', dom: 29, closed: 128, list: 172, lpr: '94.6%' },
  { month: 'Oct 2025', median: '$443,000', dom: 27, closed: 138, list: 168, lpr: '95.1%' },
  { month: 'Nov 2025', median: '$440,000', dom: 30, closed: 112, list: 155, lpr: '94.8%' },
  { month: 'Dec 2025', median: '$442,000', dom: 28, closed: 98, list: 141, lpr: '95.0%' },
  { month: 'Jan 2026', median: '$444,000', dom: 28, closed: 105, list: 158, lpr: '95.3%' },
  { month: 'Feb 2026', median: '$445,000', dom: 26, closed: 118, list: 163, lpr: '95.5%' },
];

const bestValueNeighborhoods = [
  { name: 'Bryson', why: 'New construction under $400K with resort-style amenities. Builder incentives including rate buydowns make the effective monthly cost competitive despite the MUD tax rate.' },
  { name: 'Block House Creek', why: 'Resale homes under $400K with no MUD district. Tax savings of $1,500–$2,500/year vs. comparable homes in newer communities. Mature landscaping included at no extra cost.' },
  { name: 'Caballo Ranch', why: 'Established community with partial MUD, lower HOA, and larger lots than comparable-priced newer builds. Often overlooked by buyers fixated on brand-new construction.' },
  { name: 'Horizon Lake', why: 'Lake access, spacious lots, and competitive pricing around $320K–$500K. Less marketing budget than Bryson or Crystal Falls means less competition from other buyers.' },
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

export default function LeanderRealEstateMarket2026() {
  return (
    <>
      <Head>
        <title>Leander TX Real Estate Market Report 2026 | Joe Sanches</title>
        <meta name="description" content="Live Leander TX market data: median prices, days on market, inventory trends for 2026. Expert analysis from local Realtor Joe Sanches." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/leander-real-estate-market-2026`} />
        <meta property="og:title" content="Leander TX Real Estate Market Report 2026 | Joe Sanches" />
        <meta property="og:description" content="Live Leander TX market data: median prices, days on market, inventory trends for 2026. Expert analysis from local Realtor Joe Sanches." />
        <meta property="og:url" content={`${baseUrl}/leander-real-estate-market-2026`} />
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
          <span>Leander TX Real Estate Market 2026</span>
        </nav>

        {/* Hero */}
        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Updated March 2026</div>
          <h2 className="heroTitle">Leander TX Real Estate Market Report 2026</h2>
          <p className="heroLead">
            A data-driven look at Leander's housing market in 2026: what prices are doing, which neighborhoods are outperforming, how new construction is shaping supply, and what buyers and sellers should expect for the rest of the year.
          </p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">Median: $445K</span>
            <span className="pill">28 Days on Market</span>
            <span className="pill">1.8 Mo. Inventory</span>
            <span className="pill">Balanced Market</span>
          </div>
        </div>

        {/* TOC */}
        <div className="card" style={{ marginTop: '32px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: 'var(--accent-light)' }}>On This Page</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
            <NavLink href="#snapshot" label="Market Snapshot" />
            <NavLink href="#by-neighborhood" label="Prices by Neighborhood" />
            <NavLink href="#new-construction" label="New Construction Impact" />
            <NavLink href="#best-value" label="Best Value Neighborhoods" />
            <NavLink href="#forecast" label="2026 Forecast" />
            <NavLink href="#monthly-stats" label="Monthly Market Stats Table" />
            <NavLink href="#faq" label="Frequently Asked Questions" />
          </div>
        </div>

        <div className="grid" style={{ marginTop: '0' }}>
          <main className="main">

            <Section id="snapshot" title="Leander TX Market Snapshot — Early 2026">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                After two years of post-peak correction and stabilization, Leander's housing market has found its footing in 2026. Prices are rising modestly, inventory remains tight, and days on market have compressed back toward cycle lows. This is no longer the panic-offer market of 2021, but it is not a buyer's paradise either.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
                {[
                  { label: 'Median Sale Price', value: '$445,000', change: '+2.3% YoY' },
                  { label: 'Avg Days on Market', value: '28 days', change: '-3 days YoY' },
                  { label: 'Months of Inventory', value: '1.8 months', change: '+0.2 mo YoY' },
                  { label: 'List-to-Sale Ratio', value: '95.5%', change: '+0.5% YoY' },
                  { label: 'Active Listings', value: '~163', change: '+8% YoY' },
                  { label: 'Closed Sales (Feb 2026)', value: '118', change: '+4% YoY' },
                ].map((stat, i) => (
                  <div key={i} className="card" style={{ padding: '16px' }}>
                    <p style={{ color: 'var(--accent-light)', fontSize: '12px', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</p>
                    <p style={{ color: 'white', fontWeight: 700, margin: '0 0 4px', fontSize: '22px' }}>{stat.value}</p>
                    <p style={{ color: 'var(--muted)', fontSize: '12px', margin: 0 }}>{stat.change}</p>
                  </div>
                ))}
              </div>
              <Callout>
                <strong style={{ color: 'white' }}>Market characterization:</strong> Leander is a competitive but balanced market in early 2026. Buyers have more negotiating leverage than at any point since 2020 — especially on new construction where builders are incentivizing — but resale homes in desirable neighborhoods still move quickly. The window for favorable terms on resale homes is best when properly advised.
              </Callout>
            </Section>

            <Section id="by-neighborhood" title="Leander Home Prices by Neighborhood — 2026">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Leander is not a monolithic market. Prices, days on market, and inventory vary considerably by community. Here's the breakdown as of Q1 2026:
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: 'rgba(107,120,84,.2)' }}>
                      {['Neighborhood', 'Median Price', 'Avg DOM', 'Inventory', 'Trend', 'Notes'].map(h => (
                        <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--accent-light)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {neighborhoodPrices.map((n, i) => (
                      <tr key={n.name} style={{ background: i % 2 === 0 ? 'rgba(107,120,84,.04)' : 'transparent', borderBottom: '1px solid rgba(107,120,84,.12)' }}>
                        <td style={{ padding: '10px 12px', color: 'white', fontWeight: 600 }}>{n.name}</td>
                        <td style={{ padding: '10px 12px', color: '#E0E5D8' }}>{n.median}</td>
                        <td style={{ padding: '10px 12px', color: '#E0E5D8' }}>{n.dom}</td>
                        <td style={{ padding: '10px 12px', color: '#E0E5D8' }}>{n.inventory}</td>
                        <td style={{ padding: '10px 12px', color: n.trend === 'Rising' ? 'var(--accent-light)' : '#E0E5D8' }}>{n.trend}</td>
                        <td style={{ padding: '10px 12px', color: 'var(--muted)', fontSize: '12px' }}>{n.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '12px', lineHeight: '1.7' }}>
                Data reflects closed sales and active listings in Q1 2026. Travisso's longer DOM is normal for the luxury segment and does not indicate weakness — it reflects a smaller buyer pool and higher price point requiring more time to match buyer and seller.
              </p>
            </Section>

            <Section id="new-construction" title="New Construction's Impact on the 2026 Market">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                New construction is the single biggest moderating force on Leander home prices — and it's good news for buyers right now. Builders who over-expanded their pipeline in 2021–2022 are still working through inventory, and that means incentives.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                {[
                  { title: 'Rate Buydowns', desc: 'Major builders including Pulte, Meritage, and Taylor Morrison are offering permanent and temporary rate buydowns — some as deep as 2 points below market. On a $450K loan, a 2-point buydown saves $500–$600/month in year one.' },
                  { title: 'Upgrade Allowances', desc: 'Builders are offering $10,000–$30,000 in design center credits on select inventory homes. These can cover flooring upgrades, cabinet finishes, appliances, and smart home packages at cost.' },
                  { title: 'Lot Premium Waivers', desc: 'Premium lots (cul-de-sac, greenbelt, corner) that would normally add $10K–$25K to the price are being offered at standard pricing on homes builders want to move.' },
                  { title: 'Closing Cost Assistance', desc: 'Builders are contributing $5,000–$15,000 toward buyer closing costs when buyers use the builder\'s preferred lender. Joe can advise on whether the preferred lender\'s rate is competitive.' },
                ].map((item, i) => (
                  <div key={i} className="card">
                    <p style={{ color: 'white', fontWeight: 600, margin: '0 0 8px', fontSize: '15px' }}>{item.title}</p>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
              <Callout>
                <strong style={{ color: 'white' }}>Important caveat:</strong> Builder incentives are conditional and time-limited. They often require using the builder's preferred lender (which may not offer the best rate), and they can be structured as "closing cost credits" that inflate the base price. Joe has worked with every major builder in Leander and knows how to read these incentive packages to determine their actual value.
              </Callout>
            </Section>

            <Section id="best-value" title="Best Value Neighborhoods in Leander TX Right Now">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Not every Leander neighborhood gets equal marketing attention. Here are four communities where Joe sees the best value relative to quality, location, and total cost of ownership in early 2026:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {bestValueNeighborhoods.map((n, i) => (
                  <div key={i} className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{
                      minWidth: '32px', height: '32px', borderRadius: '8px',
                      background: 'var(--accent)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '14px', flexShrink: 0
                    }}>{i + 1}</div>
                    <div>
                      <p style={{ color: 'white', fontWeight: 600, margin: '0 0 6px', fontSize: '16px' }}>{n.name}</p>
                      <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{n.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="forecast" title="Leander TX Real Estate Forecast for 2026">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Based on current inventory levels, job growth projections, and interest rate trajectory, here is what the Leander market looks like through the remainder of 2026:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                {[
                  { label: 'Price Appreciation', value: '3–5% for 2026', detail: 'Modest, steady growth. Not the 20%+ swings of 2021, but positive and consistent. Sellers should not expect bidding wars; buyers should not expect discounts on well-priced homes.' },
                  { label: 'Interest Rates', value: 'High 6s to low 7s', detail: 'Rates are expected to remain elevated relative to 2020–2021. Rate buydowns from builders make new construction more accessible. Buyers should model payments at current rates, not hoped-for rates.' },
                  { label: 'Inventory', value: 'Gradually increasing', detail: 'Inventory is expected to tick up modestly as more sellers who\'ve been waiting become motivated. Still below balanced-market levels, which supports prices.' },
                  { label: 'Job Growth Driver', value: 'Tech sector', detail: 'Apple\'s Austin campus expansion, continued Samsung fab production in Taylor, and the broader tech corridor around the Domain and north Austin support household formation and home demand in Leander.' },
                  { label: 'New Construction Supply', value: 'Moderating', detail: 'Builder starts are slowing from 2021–2023 peaks. Fewer new homes entering the pipeline in 2024–2025 means less new supply pressure on 2026–2027 prices.' },
                  { label: 'Best Strategy', value: 'Buy well, hold 5+ years', detail: 'Leander is not a market to time. Buyers who purchase at fair value today and hold for 5–7 years have strong historical odds of significant appreciation. Short-term flipping is a different calculus.' },
                ].map((item, i) => (
                  <div key={i} className="card">
                    <p style={{ color: 'var(--accent-light)', fontSize: '12px', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</p>
                    <p style={{ color: 'white', fontWeight: 700, margin: '0 0 8px', fontSize: '16px' }}>{item.value}</p>
                    <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.7', margin: 0 }}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="monthly-stats" title="Monthly Market Statistics — Leander TX">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Trailing 7-month closed sale data for Leander TX. LPR = List Price to Sale Price Ratio.
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: 'rgba(107,120,84,.2)' }}>
                      {['Month', 'Median Price', 'Avg DOM', 'Closed Sales', 'Active Listings', 'LPR'].map(h => (
                        <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--accent-light)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyStats.map((row, i) => (
                      <tr key={row.month} style={{ background: i % 2 === 0 ? 'rgba(107,120,84,.04)' : 'transparent', borderBottom: '1px solid rgba(107,120,84,.12)' }}>
                        <td style={{ padding: '10px 12px', color: 'white', fontWeight: 600 }}>{row.month}</td>
                        <td style={{ padding: '10px 12px', color: '#E0E5D8' }}>{row.median}</td>
                        <td style={{ padding: '10px 12px', color: '#E0E5D8' }}>{row.dom}</td>
                        <td style={{ padding: '10px 12px', color: '#E0E5D8' }}>{row.closed}</td>
                        <td style={{ padding: '10px 12px', color: '#E0E5D8' }}>{row.list}</td>
                        <td style={{ padding: '10px 12px', color: 'var(--accent-light)' }}>{row.lpr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '10px', lineHeight: '1.6' }}>
                Data compiled from ACTRIS MLS and builder sales records. Figures reflect single-family residential only, excluding condos and townhomes.
              </p>
            </Section>

            <Section id="faq" title="Frequently Asked Questions — Leander TX Market 2026">
              {faqSchema.mainEntity.map((q, i) => (
                <div key={i} className="card" style={{ marginBottom: '16px' }}>
                  <h3 style={{ color: 'white', margin: '0 0 10px', fontSize: '16px' }}>{q.name}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{q.acceptedAnswer.text}</p>
                </div>
              ))}
            </Section>

            <Section id="related" title="More Leander TX Real Estate Resources">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
                <NavLink href="/leander-neighborhoods" label="Neighborhood Guide" />
                <NavLink href="/buy-home-leander-tx" label="Buyer's Guide" />
                <NavLink href="/sell-my-house-leander-tx" label="Seller's Guide" />
                <NavLink href="/new-construction-leander-tx" label="New Construction Guide" />
                <NavLink href="/property-tax-leander-tx" label="Property Tax Guide" />
                <NavLink href="/moving-to-leander-tx" label="Relocation Guide" />
              </div>
            </Section>

          </main>
        </div>

        {/* Bottom CTA */}
        <div className="card" style={{ textAlign: 'center', padding: '40px 24px', marginTop: '40px' }}>
          <h2 style={{ color: 'white', fontSize: '28px', marginBottom: '12px' }}>Get a Market Update for Your Neighborhood</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px', maxWidth: '560px', margin: '0 auto 24px' }}>
            Joe tracks Leander's market weekly. Whether you're thinking about buying, selling, or just want to know what your home is worth today, call or text for a no-pressure conversation.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:5126638867" className="btn accent" style={{ fontSize: '16px', padding: '14px 28px' }}>Call Joe — 512-663-8867</a>
            <a href="sms:5126638867" className="btn" style={{ fontSize: '16px', padding: '14px 28px' }}>Text Joe</a>
            <a href="/whats-my-home-worth" className="btn" style={{ fontSize: '16px', padding: '14px 28px' }}>What's My Home Worth?</a>
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
