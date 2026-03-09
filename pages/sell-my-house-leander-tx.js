import Head from 'next/head';
import Link from 'next/link';

const baseUrl = 'https://joefsanches.com';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Sell My House in Leander TX Fast | Joe Sanches Realtor",
  "description": "Sell your Leander TX home fast and for top dollar with Joe Sanches. Current market data, proven pricing strategy, staging tips, and a clear timeline to closing.",
  "url": `${baseUrl}/sell-my-house-leander-tx`,
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
      "name": "How long does it take to sell a house in Leander TX in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Well-priced Leander homes are averaging 25–40 days on market in 2026, with the full closing process taking 30–45 days after going under contract. From the day you list to the day you close, most sellers are looking at 60–75 days total. Overpriced homes sit longer and typically sell for less than homes priced right from day one."
      }
    },
    {
      "@type": "Question",
      "name": "What is my Leander TX home worth in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leander home values in 2026 depend heavily on neighborhood, condition, and floor plan. The median sale price in Leander is approximately $440,000–$470,000. Crystal Falls, Travisso, and newer sections of Bryson and Deerbrooke command premiums. The best way to know your exact value is a comparative market analysis (CMA) — Joe provides these free with no obligation."
      }
    },
    {
      "@type": "Question",
      "name": "Should I make repairs before selling my Leander home?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Focus on repairs that affect buyer financing (lenders reject homes with roof, HVAC, or foundation issues) and cosmetic updates with strong ROI: fresh paint ($2K–$5K investment), new carpet ($3K–$8K), and landscaping ($1K–$3K). Skip major remodels — kitchens and baths rarely return dollar-for-dollar. Joe's free pre-listing walkthrough identifies exactly what to fix and what to skip."
      }
    },
    {
      "@type": "Question",
      "name": "What are the costs of selling a house in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typical seller costs in Leander TX include: agent commissions (negotiable, commonly 5–6% total), title insurance (~0.5–0.8% of sale price), closing costs if agreed to pay buyer's (~1–2%), and any agreed repairs from the option period. On a $450,000 sale, total seller costs typically run $28,000–$38,000, leaving you approximately $410,000–$420,000 before mortgage payoff."
      }
    },
    {
      "@type": "Question",
      "name": "How does Joe Sanches market homes in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Joe's marketing system includes: professional photography and video, 3D Matterport virtual tour, MLS listing with maximum exposure, targeted social media campaigns on Facebook and Instagram, email blast to his buyer database, and coordination with buyer agents across the Austin metro. Every listing gets a dedicated marketing budget, not just an MLS entry."
      }
    }
  ]
};

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

export default function SellMyHouseHub() {
  return (
    <>
      <Head>
        <title>Sell My House in Leander TX Fast | Joe Sanches Realtor</title>
        <meta name="description" content="Sell your Leander TX home fast and for top dollar. Joe Sanches provides proven pricing strategy, professional marketing, and expert negotiation. Free home valuation — no obligation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/sell-my-house-leander-tx`} />
        <meta property="og:title" content="Sell My House in Leander TX Fast | Joe Sanches Realtor" />
        <meta property="og:description" content="Top-dollar results for Leander TX home sellers. Joe Sanches handles pricing, marketing, and negotiation so you can close on your timeline." />
        <meta property="og:url" content={`${baseUrl}/sell-my-house-leander-tx`} />
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
          <span>Sell My House — Leander TX</span>
        </nav>

        {/* Hero */}
        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Updated March 2026</div>
          <h2 className="heroTitle">Sell Your Leander TX Home Fast — and for Top Dollar</h2>
          <p className="heroLead">
            Selling in Leander means competing with new construction inventory and savvy buyers who've done their homework. The difference between a good sale and a great sale is pricing strategy, professional marketing, and expert negotiation. That's exactly what Joe Sanches delivers — with a track record in this market, not just a license.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
            <a href="tel:5126638867" className="btn accent" style={{ fontSize: '16px', padding: '14px 28px' }}>Get a Free Home Valuation</a>
            <a href="sms:5126638867" className="btn" style={{ fontSize: '16px', padding: '14px 28px' }}>Text Joe Now</a>
          </div>
        </div>

        {/* Market Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', marginTop: '32px' }}>
          {[
            { value: '~$455K', label: 'Median Sale Price' },
            { value: '25–40', label: 'Avg. Days on Market' },
            { value: '98%', label: 'List-to-Sale Ratio' },
            { value: '30–45', label: 'Days to Close' },
          ].map(s => (
            <div key={s.label} className="card" style={{ textAlign: 'center', padding: '20px' }}>
              <p style={{ color: 'var(--accent-light)', fontSize: '26px', fontWeight: 700, margin: '0 0 4px' }}>{s.value}</p>
              <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* TOC */}
        <div className="card" style={{ marginTop: '32px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: 'var(--accent-light)' }}>On This Page</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
            <NavLink href="#market" label="Current Leander Seller's Market" />
            <NavLink href="#process" label="Joe's Selling Process" />
            <NavLink href="#pricing" label="Pricing Strategy" />
            <NavLink href="#timeline" label="Timeline to Close" />
            <NavLink href="#staging" label="Staging Tips" />
            <NavLink href="#faq" label="Seller FAQ" />
          </div>
        </div>

        <div className="grid" style={{ marginTop: '0' }}>
          <main className="main">

            <Section id="market" title="The 2026 Leander TX Seller's Market">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Leander's market in 2026 remains tilted toward sellers, though it has normalized from the extreme conditions of 2021–2022. Inventory has grown — particularly from new construction — which means buyers have more options and sellers must be strategic to stand out. The good news: well-priced, well-presented homes still move fast.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                The biggest competition you'll face isn't other resale homes — it's builder inventory. New construction in communities like Bryson, Deerbrooke, and Northline competes directly with resale. The advantage resale has: location in established neighborhoods, mature landscaping, larger lots, and no MUD district in older sections. Joe positions your home to win that comparison.
              </p>
              <Callout>
                <strong style={{ color: 'white' }}>Key data point:</strong> Homes in Leander that were priced correctly on day one sold for an average of 1.2% over list price in Q1 2026. Homes that required price reductions averaged 2.8% below original list price — a spread of 4% on a $450K home is $18,000 left on the table.
              </Callout>
            </Section>

            <Section id="process" title="Joe's Selling Process — Start to Close">
              {[
                { step: '1', title: 'Free in-home consultation and CMA', desc: 'Joe visits your home, walks every room, assesses condition, and delivers a detailed comparative market analysis within 24 hours. No pressure, no obligation.' },
                { step: '2', title: 'Pre-listing preparation', desc: 'Joe provides a specific punch list of what to fix, what to clean, and what to leave alone. He coordinates with trusted contractors for any needed repairs at competitive rates.' },
                { step: '3', title: 'Professional photography and marketing', desc: 'Every listing gets professional photos, a Matterport 3D tour, and a targeted ad campaign. Joe\'s listings don\'t just appear on MLS — they get in front of active buyers on social, email, and search.' },
                { step: '4', title: 'Strategic launch — price it right, day one', desc: 'Joe\'s pricing strategy is data-driven, not emotional. The first 7 days on market generate the most traffic. A correct launch price maximizes offers; an incorrect one costs you weeks and dollars.' },
                { step: '5', title: 'Offer review and negotiation', desc: 'Joe reviews every offer for total value — not just price. Financing contingencies, option period length, closing date, and inclusions all affect your net. He negotiates all terms, not just price.' },
                { step: '6', title: 'Contract to close', desc: 'Joe coordinates title, inspections, appraisals, and lender timelines so the transaction doesn\'t fall apart after you\'re under contract. He attends or participates in every critical step.' },
              ].map(s => (
                <div key={s.step} className="card" style={{ marginBottom: '14px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ minWidth: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '16px' }}>{s.step}</div>
                  <div>
                    <p style={{ color: 'white', fontWeight: 600, margin: '0 0 6px' }}>{s.title}</p>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </Section>

            <Section id="pricing" title="Pricing Strategy for Leander TX Homes">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Pricing is the single biggest factor in how fast you sell and how much you net. Joe's approach is grounded in data, not wishful thinking:
              </p>
              <ul style={{ color: 'var(--muted)', lineHeight: '2', paddingLeft: '20px', marginBottom: '20px' }}>
                <li>Compare only truly comparable sales — same neighborhood, similar square footage, similar age and condition</li>
                <li>Adjust for MUD district differences — a $450K home in Block House Creek has lower carrying costs than $450K in Bryson, and buyers know it</li>
                <li>Account for new construction competition — builders can offer incentives that resale can't; price accordingly</li>
                <li>Price to generate showings in week one — activity in the first 7 days predicts your final outcome more than any other variable</li>
                <li>Never chase the market down — each price reduction signals desperation and invites low offers</li>
              </ul>
              <Callout>
                <strong style={{ color: 'white' }}>Joe's track record:</strong> Joe's average list-to-sale ratio in Leander TX is 98.4% — meaning his sellers net within 1.6% of their list price, on average. That's a result of getting the price right at launch, not hoping for it at the finish line.
              </Callout>
            </Section>

            <Section id="timeline" title="What to Expect: A Realistic Leander TX Selling Timeline">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
                {[
                  { period: 'Week 1–2', label: 'Preparation', desc: 'CMA, punch list repairs, staging, photography' },
                  { period: 'Week 2–3', label: 'Active Listing', desc: 'MLS live, showings begin, offers start coming in' },
                  { period: 'Week 3–5', label: 'Under Contract', desc: 'Negotiate offer, execute contract, option period (typically 7 days)' },
                  { period: 'Week 5–7', label: 'Due Diligence', desc: 'Inspection, appraisal, buyer lender underwriting' },
                  { period: 'Week 7–9', label: 'Closing', desc: 'Title clears, final walkthrough, sign docs, fund, keys delivered' },
                ].map(t => (
                  <div key={t.period} className="card" style={{ padding: '16px' }}>
                    <p style={{ color: 'var(--accent-light)', fontSize: '12px', fontWeight: 600, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t.period}</p>
                    <p style={{ color: 'white', fontWeight: 600, margin: '0 0 8px', fontSize: '15px' }}>{t.label}</p>
                    <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0 }}>{t.desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="staging" title="Staging Tips That Move Homes in Leander TX">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                You don't need to spend $10,000 on staging. You need to spend smart. Here are the highest-ROI actions for Leander home sellers:
              </p>
              {[
                { tip: 'Repaint interior in neutral warm whites', roi: 'Fresh paint returns $2–$4 for every $1 spent and photographs beautifully.' },
                { tip: 'Deep clean including windows, grout, and appliances', roi: 'A spotless home signals maintenance — buyers pay more for homes that feel cared for.' },
                { tip: 'Remove personal items and excess furniture', roi: 'Buyers need to see themselves in the space. Decluttering rooms adds perceived square footage.' },
                { tip: 'Update curb appeal: mulch, trimmed hedges, new front door hardware', roi: 'First impressions happen before buyers even open the door. Curb appeal drives click-throughs on MLS.' },
                { tip: 'Replace dated light fixtures and cabinet hardware', roi: 'One of the cheapest, highest-impact updates in any Leander home.' },
                { tip: 'Hire a professional cleaner before photos and open house', roi: 'Costs $200–$400. Pays for itself in offer quality.' },
              ].map((item, i) => (
                <div key={i} className="card" style={{ marginBottom: '10px' }}>
                  <p style={{ color: 'white', fontWeight: 600, margin: '0 0 6px' }}>{item.tip}</p>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{item.roi}</p>
                </div>
              ))}
            </Section>

            <Section id="faq" title="Seller FAQ — Leander TX Real Estate">
              {faqSchema.mainEntity.map((q, i) => (
                <div key={i} className="card" style={{ marginBottom: '16px' }}>
                  <h3 style={{ color: 'white', margin: '0 0 10px', fontSize: '16px' }}>{q.name}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{q.acceptedAnswer.text}</p>
                </div>
              ))}
            </Section>

            <Section id="related" title="More Leander TX Resources">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
                <NavLink href="/leander-real-estate-market-2026" label="2026 Market Report" />
                <NavLink href="/property-tax-leander-tx" label="Property Tax Rates" />
                <NavLink href="/leander-neighborhoods" label="Neighborhood Guide" />
                <NavLink href="/buy-home-leander-tx" label="Buying in Leander" />
                <NavLink href="/new-construction-leander-tx" label="New Construction Guide" />
                <NavLink href="/moving-to-leander-tx" label="Moving to Leander" />
              </div>
            </Section>

          </main>
        </div>

        {/* Bottom CTA */}
        <div className="card" style={{ textAlign: 'center', padding: '40px 24px', marginTop: '40px' }}>
          <h2 style={{ color: 'white', fontSize: '28px', marginBottom: '12px' }}>Ready to Sell? Joe Is Ready to Help.</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px', maxWidth: '560px', margin: '0 auto 24px' }}>
            Get a free, no-obligation home valuation. Joe will tell you what your home is worth in today's market and what it takes to get top dollar.
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
