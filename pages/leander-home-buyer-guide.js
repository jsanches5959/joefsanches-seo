import Head from 'next/head';
import Link from 'next/link';

const baseUrl = 'https://joefsanches.com';

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Leander TX Home Buyer's Guide 2026 | Free Download | Joe Sanches",
  "description": "The complete guide to buying a home in Leander TX in 2026. Steps, costs, neighborhoods, VA loans, new construction vs resale — from a local Leander Realtor.",
  "url": `${baseUrl}/leander-home-buyer-guide`,
  "author": {
    "@type": "Person",
    "name": "Joe Sanches",
    "url": baseUrl,
    "telephone": "+1-512-663-8867",
    "email": "hello@joefsanches.com"
  },
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
      "name": "How much do I need to buy a home in Leander TX in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For a conventional loan on a $400,000 home in Leander TX, plan for: 5–20% down payment ($20,000–$80,000), closing costs of 2–3% ($8,000–$12,000), and 2–3 months of mortgage payments in reserves. Total upfront cash needed typically ranges from $30,000–$95,000 depending on down payment. VA loan buyers (veterans and active military) can buy with $0 down — contact Joe to learn more about VA loan options in Leander."
      }
    },
    {
      "@type": "Question",
      "name": "Is Leander TX a good place to buy a home in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Leander TX is one of the strongest long-term real estate markets in the Austin metro. Key factors: Leander ISD is a top-rated school district, the 183A toll road provides a direct commute to Austin's tech corridor, the city is growing rapidly with continued infrastructure investment, home prices offer significant value vs. Austin proper (often $100,000–$200,000 less for comparable square footage), and quality of life is high with parks, recreation, and a walkable downtown area developing. New residents and families continue to relocate from higher-cost metros specifically because of Leander's value proposition."
      }
    },
    {
      "@type": "Question",
      "name": "What are the property taxes in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leander TX property taxes range from approximately 2.18% to 2.55% of assessed value, depending on the neighborhood and whether it is in a Municipal Utility District (MUD). On a $450,000 home: no-MUD areas run about $9,810/year ($818/month); MUD areas can be $10,800–$11,475/year ($900–$956/month). All Texas homeowners who occupy their home as a primary residence qualify for a $100,000 homestead exemption off the school district tax, which saves approximately $1,800–$2,500/year. See Joe's full property tax guide at /property-tax-leander-tx for neighborhood-by-neighborhood rates."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to buy a home in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The full timeline from starting your search to closing is typically 60–120 days in Leander, depending on market conditions and loan type. The breakdown: 1–3 weeks to get pre-approved, 2–8 weeks of active home search (depending on inventory and your criteria), 30–45 days to close once under contract (conventional or FHA), or 30–60 days for VA loans. New construction contracts often have 3–12 month build timelines before closing."
      }
    },
    {
      "@type": "Question",
      "name": "Should I buy new construction or resale in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both have strong cases in Leander. New construction gives you a warranty, modern floor plans, energy efficiency, and builder incentives (rate buydowns, closing cost credits) — but typically carries a higher price and often includes a MUD district. Resale homes are often in established neighborhoods with no MUD, mature trees, larger lots, and more established community feel — but require more inspection diligence and may need updates. Joe has experience representing buyers in both situations and can help you compare total cost of ownership, not just list price."
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

function StepCard({ number, title, desc }) {
  return (
    <div className="card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      <div style={{
        width: '44px', height: '44px', borderRadius: '50%',
        background: 'var(--accent)', color: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: '17px', flexShrink: 0
      }}>{number}</div>
      <div>
        <h4 style={{ color: 'white', margin: '0 0 6px', fontSize: '16px', fontWeight: 600 }}>{title}</h4>
        <p style={{ color: 'var(--muted)', margin: 0, lineHeight: '1.7', fontSize: '14px' }}>{desc}</p>
      </div>
    </div>
  );
}

function CompareTable({ rows }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', color: '#E0E5D8' }}>
        <thead>
          <tr>
            {['Factor', 'New Construction', 'Resale'].map(h => (
              <th key={h} style={{
                textAlign: 'left', padding: '10px 14px',
                borderBottom: '1px solid rgba(107,120,84,.4)',
                color: 'var(--accent-light)', fontWeight: 600,
                background: 'rgba(107,120,84,.08)'
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(107,120,84,.12)' }}>
              <td style={{ padding: '10px 14px', fontWeight: 600, color: 'white' }}>{row[0]}</td>
              <td style={{ padding: '10px 14px', color: '#E0E5D8' }}>{row[1]}</td>
              <td style={{ padding: '10px 14px', color: '#E0E5D8' }}>{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FaqItem({ q, a }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(107,120,84,.2)', paddingBottom: '24px', marginBottom: '24px' }}>
      <h3 style={{ fontSize: '18px', color: 'white', marginBottom: '12px', fontWeight: 600 }}>{q}</h3>
      <p style={{ color: 'var(--muted)', lineHeight: '1.8', margin: 0 }}>{a}</p>
    </div>
  );
}

export default function LeanderHomeBuyerGuide() {
  return (
    <>
      <Head>
        <title>Leander TX Home Buyer's Guide 2026 | Free Download | Joe Sanches</title>
        <meta name="description" content="The complete guide to buying a home in Leander TX in 2026. Steps, costs, neighborhoods, VA loans, new construction vs resale — from a local Leander Realtor. Free." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/leander-home-buyer-guide`} />
        <meta property="og:title" content="Leander TX Home Buyer's Guide 2026 | Joe Sanches Realtor" />
        <meta property="og:description" content="Everything you need to know about buying a home in Leander TX — step-by-step process, costs, neighborhoods, VA loans, and new construction tips from a local expert." />
        <meta property="og:url" content={`${baseUrl}/leander-home-buyer-guide`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
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
        <nav style={{ marginTop: '20px', fontSize: '13px', color: 'var(--muted)', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'var(--accent-light)' }}>Home</Link>
          <span>›</span>
          <span>Leander TX Home Buyer's Guide 2026</span>
        </nav>

        {/* Hero */}
        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Updated 2026 — Free Guide</div>
          <h2 className="heroTitle">The Complete Leander TX Home Buyer's Guide</h2>
          <p className="heroLead">
            Everything you need to buy a home in Leander TX in 2026 — from getting pre-approved to closing day. The 10-step buying process, true cost breakdown, neighborhood comparisons, new construction vs resale, VA loan info, and local insights you won't find on Zillow.
          </p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">Leander ISD</span>
            <span className="pill">VA Loans</span>
            <span className="pill">New Construction</span>
            <span className="pill">MUD Explained</span>
            <span className="pill">2026 Market</span>
          </div>
          <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="#guide-request"
              style={{
                background: 'var(--accent)', color: 'white', padding: '14px 28px',
                borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '16px'
              }}
            >
              Get the Full Guide
            </a>
            <a
              href="tel:5126638867"
              style={{
                border: '1px solid rgba(107,120,84,.5)', color: 'var(--accent-light)',
                padding: '14px 28px', borderRadius: '8px', textDecoration: 'none',
                fontWeight: 600, fontSize: '16px'
              }}
            >
              Call 512-663-8867
            </a>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="card" style={{ marginTop: '32px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: 'var(--accent-light)' }}>On This Page</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '10px' }}>
            <NavLink href="#why-leander" label="Why Leander TX?" />
            <NavLink href="#buying-process" label="The 10-Step Buying Process" />
            <NavLink href="#costs" label="Understanding All the Costs" />
            <NavLink href="#new-vs-resale" label="New Construction vs Resale" />
            <NavLink href="#neighborhoods" label="Leander Neighborhoods Overview" />
            <NavLink href="#va-loans" label="VA Loan Information" />
            <NavLink href="#guide-request" label="Get the Full Guide" />
            <NavLink href="#faq" label="Frequently Asked Questions" />
          </div>
        </div>

        <div className="grid" style={{ marginTop: '0' }}>
          <main className="main">

            {/* Section 1: Why Leander */}
            <Section id="why-leander" title="Why Buy in Leander TX?">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Leander TX is one of the fastest-growing cities in America — and for good reason. Located 30 miles north of downtown Austin along the 183A toll road, Leander offers the lifestyle and school quality of suburban Austin at a price point that still makes financial sense.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                {[
                  { label: 'Schools', value: 'Leander ISD', desc: 'Consistently rated among the top school districts in the Austin metro. Multiple exemplary campuses.' },
                  { label: 'Growth', value: 'Top 10 US City', desc: 'Leander has been one of the fastest-growing cities in America for over a decade. Infrastructure keeps pace.' },
                  { label: 'Commute', value: '30–45 min to Austin', desc: '183A toll road provides a direct, predictable commute to the tech corridor, the Domain, and downtown.' },
                  { label: 'Value', value: '$100K–$200K Less', desc: 'Comparable square footage and school quality costs significantly less than South or West Austin.' },
                ].map(({ label, value, desc }) => (
                  <div key={label} className="card">
                    <div style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{label}</div>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-light)', marginBottom: '8px' }}>{value}</div>
                    <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>Leander vs Austin — The Value Case</h3>
              <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', color: '#E0E5D8' }}>
                  <thead>
                    <tr>
                      {['', 'Leander TX', 'Austin (South/West)'].map(h => (
                        <th key={h} style={{
                          textAlign: 'left', padding: '10px 14px',
                          borderBottom: '1px solid rgba(107,120,84,.4)',
                          color: 'var(--accent-light)', fontWeight: 600,
                          background: 'rgba(107,120,84,.08)'
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Median Home Price (2026)', '$420,000–$480,000', '$550,000–$750,000+'],
                      ['School District Rating', 'Leander ISD — Excellent', 'AISD — Varies by campus'],
                      ['Avg. Commute to Domain', '25–35 min (183A)', '15–25 min (city traffic)'],
                      ['New Construction Options', 'Abundant', 'Very limited, premium-priced'],
                      ['Lot Sizes', 'Larger (6,000–12,000 sq ft typical)', 'Smaller, often 4,000–6,000 sq ft'],
                      ['HOA Amenities', 'Most communities have pools, parks', 'Varies widely'],
                      ['Property Tax Rate', '2.18%–2.55%', '1.9%–2.3% (no MUDs typical)'],
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(107,120,84,.12)' }}>
                        <td style={{ padding: '10px 14px', fontWeight: 600, color: 'white' }}>{row[0]}</td>
                        <td style={{ padding: '10px 14px' }}>{row[1]}</td>
                        <td style={{ padding: '10px 14px' }}>{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>Leander Lifestyle</h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Leander is not just a bedroom community. The city has invested heavily in parks, trails, the Leander Recreation Center, and a growing downtown district. The Cap Metro rail line connects Leander to downtown Austin without touching a highway. Old Town Leander is developing a walkable restaurant and retail scene. Residents have access to Lake Travis, Balcones Canyonlands National Wildlife Refuge, and the Hill Country — all within 20–30 minutes.
              </p>
            </Section>

            {/* Section 2: Buying Process */}
            <Section id="buying-process" title="The 10-Step Home Buying Process in Leander TX">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '24px' }}>
                Buying a home involves more steps than most first-time buyers expect. Here's every stage, in order, with what to expect at each one.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <StepCard
                  number="1"
                  title="Define Your Goals and Timeline"
                  desc="When do you need to be in a home? Are you flexible? Do you need to be in a specific school zone? Do you prioritize commute, yard size, HOA amenities, or price? Answering these before searching saves weeks of wasted time."
                />
                <StepCard
                  number="2"
                  title="Check and Improve Your Credit"
                  desc="Pull your credit reports (AnnualCreditReport.com). For conventional loans, a 620+ score qualifies but 740+ gets the best rates. For VA loans, most lenders want 620+. Pay down revolving balances and dispute any errors at least 60–90 days before applying."
                />
                <StepCard
                  number="3"
                  title="Get Pre-Approved (Not Just Pre-Qualified)"
                  desc="Pre-qualification is informal. Pre-approval requires document verification — W-2s, pay stubs, bank statements, tax returns. In Leander's market, sellers will not consider offers without a lender pre-approval letter. Use a local lender when possible — they know Texas closings and can close on time."
                />
                <StepCard
                  number="4"
                  title="Choose Your Realtor"
                  desc="Your buyer's agent represents your interests, negotiates on your behalf, and is paid by the seller in most transactions — meaning you get professional representation at no direct cost. Choose someone who specializes in Leander and knows the difference between a MUD and a PID, which neighborhoods are appreciating, and how to win in a competitive offer situation."
                />
                <StepCard
                  number="5"
                  title="Start Your Home Search"
                  desc="Set up MLS alerts for your criteria. Tour homes with your agent — never go to new construction models alone, as the builder's sales agent represents the builder, not you. Plan to tour 10–20 homes before finding the right one. In Leander's 2026 market, desirable homes at market price still move in 1–3 weeks."
                />
                <StepCard
                  number="6"
                  title="Make an Offer"
                  desc="Your agent prepares a Texas TREC contract. Key terms: purchase price, option period (typically 5–10 days in Leander), option fee ($100–$500, negotiable), earnest money (1–2% of price), closing date (30–45 days for conventional, 30–60 for VA), and any seller concessions. In 2026, seller concessions toward closing costs or rate buydowns are often negotiable on days-on-market properties."
                />
                <StepCard
                  number="7"
                  title="Option Period and Inspections"
                  desc="The Texas option period is your right to terminate for any reason, for a small fee. Use it. Hire a licensed inspector ($400–$600). Consider a separate foundation inspection ($200–$400) in Central Texas — expansive clay soil is real. For new construction, hire a third-party inspector even with a builder warranty."
                />
                <StepCard
                  number="8"
                  title="Negotiate Repairs or Credits"
                  desc="After inspection, you can request repairs, a price reduction, or cash credits at closing. Your agent presents the findings and negotiates. Sellers don't have to fix everything — but significant structural, mechanical, or safety issues create leverage."
                />
                <StepCard
                  number="9"
                  title="Final Loan Approval and Closing Disclosure"
                  desc="Your lender submits the loan for final underwriting. Do not change jobs, open new credit accounts, or make large purchases during this period. Three business days before closing, you receive the Closing Disclosure — review every number carefully and compare to your Loan Estimate."
                />
                <StepCard
                  number="10"
                  title="Closing Day"
                  desc="You'll sign approximately 50–100 pages of documents. Bring a government ID and certified funds (cashier's check or wire transfer) for your closing costs and down payment. After recording, you get keys. In Texas, closing typically happens the same day as recording."
                />
              </div>
            </Section>

            {/* Section 3: Costs */}
            <Section id="costs" title="Understanding All the Costs of Buying in Leander TX">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                The purchase price is only the beginning. Here's a complete breakdown of what buying a home in Leander actually costs.
              </p>

              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>Upfront Costs</h3>
              <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', color: '#E0E5D8' }}>
                  <thead>
                    <tr>
                      {['Cost Item', 'Typical Amount', 'Notes'].map(h => (
                        <th key={h} style={{
                          textAlign: 'left', padding: '10px 14px',
                          borderBottom: '1px solid rgba(107,120,84,.4)',
                          color: 'var(--accent-light)', fontWeight: 600,
                          background: 'rgba(107,120,84,.08)'
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Down Payment (5%)', '$20,000–$24,000', 'On a $400K–$480K home; 20% avoids PMI'],
                      ['Down Payment (20%)', '$80,000–$96,000', 'Eliminates monthly PMI (~$100–$200/mo)'],
                      ['VA Loan Down Payment', '$0', 'Eligible veterans and active military only'],
                      ['Closing Costs', '$8,000–$14,400', '2–3% of purchase price; includes lender fees, title, escrow'],
                      ['Option Fee', '$100–$500', 'Paid to seller; applies to purchase price at closing'],
                      ['Earnest Money', '$4,000–$9,600', '1–2% of price; held in escrow, applied at closing'],
                      ['Home Inspection', '$400–$600', 'General inspection; budget extra for specialty inspections'],
                      ['Foundation Inspection', '$200–$400', 'Highly recommended in Central Texas clay soil'],
                      ['Moving Costs', '$1,500–$5,000', 'Depends on distance and volume'],
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(107,120,84,.12)' }}>
                        <td style={{ padding: '10px 14px', fontWeight: 600, color: 'white' }}>{row[0]}</td>
                        <td style={{ padding: '10px 14px' }}>{row[1]}</td>
                        <td style={{ padding: '10px 14px', color: '#c0c8b8' }}>{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>Monthly Costs (Example: $450,000 Home, 6.5% Rate, 5% Down)</h3>
              <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', color: '#E0E5D8' }}>
                  <thead>
                    <tr>
                      {['Cost Component', 'Monthly Estimate'].map(h => (
                        <th key={h} style={{
                          textAlign: 'left', padding: '10px 14px',
                          borderBottom: '1px solid rgba(107,120,84,.4)',
                          color: 'var(--accent-light)', fontWeight: 600,
                          background: 'rgba(107,120,84,.08)'
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Principal + Interest', '~$2,715'],
                      ['Property Tax (2.25% no MUD)', '~$844'],
                      ['Property Tax (2.45% with MUD)', '~$919'],
                      ['Homeowners Insurance', '~$150–$250'],
                      ['PMI (if < 20% down)', '~$120–$190'],
                      ['HOA (if applicable)', '~$50–$150'],
                      ['Total (no MUD, no PMI at 20% down)', '~$3,710–$3,810/mo'],
                      ['Total (MUD + PMI, 5% down)', '~$3,950–$4,175/mo'],
                    ].map((row, i) => (
                      <tr key={i} style={{
                        borderBottom: '1px solid rgba(107,120,84,.12)',
                        background: i >= 6 ? 'rgba(107,120,84,.06)' : 'transparent'
                      }}>
                        <td style={{ padding: '10px 14px', fontWeight: i >= 6 ? 700 : 400, color: i >= 6 ? 'white' : '#E0E5D8' }}>{row[0]}</td>
                        <td style={{ padding: '10px 14px', fontWeight: i >= 6 ? 700 : 400, color: i >= 6 ? 'var(--accent-light)' : '#E0E5D8' }}>{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Callout>
                <strong style={{ color: 'white' }}>MUD tip:</strong> Always ask whether a home is in a MUD district before falling in love with it. A 0.30% MUD on a $450K home adds $112.50/month — or $1,350/year — to your carrying cost. Over 30 years that's $40,500 in additional taxes. Joe always checks MUD status for every property before you tour.
              </Callout>

              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>Texas Property Tax Note</h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Texas has no state income tax, which is part of its appeal — but property taxes are above the national average. All Texas homeowners who occupy their home as a primary residence qualify for a <strong style={{ color: 'white' }}>$100,000 homestead exemption</strong> off the school district appraised value. File within the year you buy. This typically saves $1,800–$2,500/year. See Joe's <Link href="/property-tax-leander-tx" style={{ color: 'var(--accent-light)' }}>full property tax guide</Link> for the complete picture.
              </p>
            </Section>

            {/* Section 4: New Construction vs Resale */}
            <Section id="new-vs-resale" title="New Construction vs Resale in Leander TX">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Leander has abundant new construction from major builders including Lennar, D.R. Horton, Coventry, Highland, and Ashton Woods. Resale inventory is also healthy. Here's how they compare:
              </p>
              <CompareTable rows={[
                ['Price', 'Often $10K–$30K premium for new', 'Can be $10K–$30K under new comparable'],
                ['Condition', 'New — warranty included', 'Varies; inspection essential'],
                ['Builder Incentives', 'Rate buydowns, closing cost credits', 'Seller concessions negotiable'],
                ['MUD District', 'Almost always in MUD', 'Older areas often MUD-free'],
                ['Lot Size', 'Smaller (4,500–7,000 sq ft typical)', 'Often larger, mature trees'],
                ['Community Feel', 'Development phase, neighbors ongoing', 'Established neighbors, mature landscaping'],
                ['Energy Efficiency', 'Modern insulation, windows, HVAC', 'Varies — may need updates'],
                ['Floor Plan', 'Modern open layouts', 'May have dated layout in older homes'],
                ['Customization', 'Limited options during build', 'You renovate to your taste'],
                ['Timeline to Close', '30–45 days (spec homes) or 3–12 months (build)', '30–45 days conventional'],
                ['Realtor Representation', 'Critical — builder agent works for builder', 'Standard buyer representation'],
              ]} />
              <Callout>
                <strong style={{ color: 'white' }}>New construction warning:</strong> Never go to a builder model without your Realtor. Builder sales agents are trained negotiators working exclusively for the builder. Having Joe as your buyer's representative costs you nothing (builder pays the commission) and gives you an advocate who can negotiate upgrades, lot premiums, closing cost credits, and protect you through the inspection and closing process.
              </Callout>
            </Section>

            {/* Section 5: Neighborhoods */}
            <Section id="neighborhoods" title="Leander TX Neighborhoods Overview">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Leander is not one neighborhood — it's a collection of distinct communities with different price points, amenities, MUD status, and character. Here's a quick orientation:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  {
                    name: 'Crystal Falls',
                    range: '$420K–$650K',
                    desc: 'One of Leander\'s most established communities. Golf course, resort-style pools, multiple amenity centers, and miles of trails. Mix of older resale and newer construction. Some MUD, some not — verify by address.',
                    tags: ['Families', 'Golf Course', 'Established'],
                  },
                  {
                    name: 'Travisso',
                    range: '$600K–$1.2M+',
                    desc: 'Luxury master-planned community on the western edge of Leander with Hill Country views, resort amenities, and higher-end builders. Coveted address with a price to match. MUD #12 applies.',
                    tags: ['Luxury', 'Hill Country Views', 'Resort Amenities'],
                  },
                  {
                    name: 'Bryson',
                    range: '$380K–$520K',
                    desc: 'Modern master-planned community with strong amenities and new construction from multiple builders. Active social calendar. Higher MUD rate — check before buying. Popular with young families.',
                    tags: ['New Construction', 'Active Community', 'Check MUD Rate'],
                  },
                  {
                    name: 'Northline',
                    range: '$340K–$460K',
                    desc: 'Leander\'s urban-style development near Old Town. Walkable to the future downtown district, near the MetroRail station. Mix of townhomes and single-family. MUD applies in most sections.',
                    tags: ['Walkable', 'Near MetroRail', 'Modern Townhomes'],
                  },
                  {
                    name: 'Larkspur',
                    range: '$370K–$500K',
                    desc: 'Large master-planned community with resort pool, trails, and multiple builder options. Strong community events. MUD #18 applies to newer phases.',
                    tags: ['Resort Pool', 'Multiple Builders', 'Community Events'],
                  },
                  {
                    name: 'Block House Creek',
                    range: '$300K–$420K',
                    desc: 'One of Leander\'s oldest and most affordable established neighborhoods. Larger lots, mature trees, and — crucially — no MUD district in most sections. Great value for buyers who don\'t need brand-new.',
                    tags: ['No MUD', 'Mature Trees', 'Great Value'],
                  },
                ].map(({ name, range, desc, tags }) => (
                  <div key={name} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                      <h3 style={{ color: 'white', margin: 0, fontSize: '18px', fontWeight: 600 }}>{name}</h3>
                      <span style={{
                        background: 'rgba(107,120,84,.15)', border: '1px solid rgba(107,120,84,.3)',
                        color: 'var(--accent-light)', padding: '4px 12px', borderRadius: '20px',
                        fontSize: '13px', fontWeight: 600, flexShrink: 0
                      }}>{range}</span>
                    </div>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', marginBottom: '12px' }}>{desc}</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {tags.map(tag => (
                        <span key={tag} className="pill" style={{ fontSize: '12px' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '20px' }}>
                View full neighborhood guides at{' '}
                <Link href="/neighborhoods" style={{ color: 'var(--accent-light)' }}>joefsanches.com/neighborhoods</Link>
              </p>
            </Section>

            {/* Section 6: VA Loans */}
            <Section id="va-loans" title="VA Loan Information — $0 Down in Leander TX">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Joe Sanches is a veteran. He specializes in helping veterans and active-duty military use their VA loan benefit to buy homes in Leander — often with $0 down, no PMI, and competitive rates.
              </p>
              <Callout>
                <strong style={{ color: 'white' }}>Joe's personal note:</strong> As a veteran myself, I know the VA loan process inside and out. I've helped veterans purchase homes in Leander, Cedar Park, and Liberty Hill using their VA benefit. If you've served, this benefit is one of the most powerful financial tools available — and most people don't fully understand how to use it. Let me walk you through it. Call or text: 512-663-8867.
              </Callout>

              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>VA Loan Benefits</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px', marginBottom: '24px' }}>
                {[
                  { title: '$0 Down Payment', desc: 'No down payment required for eligible veterans, active-duty, and surviving spouses.' },
                  { title: 'No PMI', desc: 'Private Mortgage Insurance is not required — saving $100–$200/month vs. conventional with < 20% down.' },
                  { title: 'Competitive Rates', desc: 'VA loans often carry lower interest rates than conventional loans due to the government guarantee.' },
                  { title: 'Flexible Credit', desc: 'VA loans are more forgiving on credit scores than conventional — most lenders work with 580–620+.' },
                  { title: 'Seller Concessions', desc: 'Sellers can pay up to 4% of the sales price toward your closing costs — negotiable.' },
                  { title: 'No Prepayment Penalty', desc: 'Pay off your loan early with no penalty.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="card" style={{ padding: '18px' }}>
                    <h4 style={{ color: 'var(--accent-light)', margin: '0 0 8px', fontSize: '15px', fontWeight: 600 }}>{title}</h4>
                    <p style={{ color: 'var(--muted)', margin: 0, fontSize: '13px', lineHeight: '1.6' }}>{desc}</p>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>VA Loan Eligibility (General Guidelines)</h3>
              <div style={{ color: 'var(--muted)', lineHeight: '2', paddingLeft: '20px', marginBottom: '24px' }}>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>90 days active duty during wartime</li>
                  <li>181 days active duty during peacetime</li>
                  <li>6 or more years in the National Guard or Reserves</li>
                  <li>Surviving spouse of a veteran who died in service or from a service-connected disability</li>
                </ul>
              </div>

              <p style={{ color: 'var(--muted)', lineHeight: '1.8' }}>
                Obtain your Certificate of Eligibility (COE) at <strong style={{ color: 'white' }}>va.gov</strong> or let your lender pull it for you. Joe works with VA-experienced lenders in Texas who know how to close VA loans on time and navigate the VA appraisal process specific to Central Texas properties.
              </p>
            </Section>

            {/* Section 7: Guide Request / Email Capture */}
            <Section id="guide-request" title='Get the Full Leander Home Buyer&apos;s Guide'>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '24px' }}>
                Joe will send you the complete PDF guide plus a personalized overview of current available inventory that matches your criteria. No spam — just useful, local information.
              </p>

              <div className="card" style={{ maxWidth: '560px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: 'white', margin: '0 0 12px', fontSize: '16px' }}>What's included:</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                      'Full PDF buyer\'s guide with checklists',
                      'Current inventory snapshot for your price range',
                      'Neighborhood MUD rate reference sheet',
                      'Inspection checklist for Texas homes',
                      'VA loan quick-reference if applicable',
                    ].map(item => (
                      <li key={item} style={{
                        display: 'flex', gap: '10px', padding: '8px 0',
                        borderBottom: '1px solid rgba(107,120,84,.12)',
                        color: 'var(--muted)', fontSize: '14px'
                      }}>
                        <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '16px', lineHeight: '1.6' }}>
                  Click the button to send Joe an email with your details. He'll reply with the guide and set up a quick call to answer your questions — no obligation.
                </p>

                <a
                  href="mailto:hello@joefsanches.com?subject=Leander%20Home%20Buyer%20Guide%20Request&body=Name%3A%0AEmail%3A%0APhone%3A%0ATimeframe%3A%0APrice%20range%3A"
                  style={{
                    display: 'block', width: '100%', textAlign: 'center',
                    background: 'var(--accent)', color: 'white', padding: '16px',
                    borderRadius: '8px', textDecoration: 'none', fontWeight: 700,
                    fontSize: '17px', boxSizing: 'border-box'
                  }}
                >
                  Send Me the Guide
                </a>

                <p style={{ color: 'var(--muted)', fontSize: '13px', textAlign: 'center', marginTop: '16px', marginBottom: 0 }}>
                  Or call/text Joe:{' '}
                  <a href="tel:5126638867" style={{ color: 'var(--accent-light)', fontWeight: 600 }}>512-663-8867</a>
                </p>
              </div>
            </Section>

            {/* Section 8: FAQ */}
            <Section id="faq" title="Frequently Asked Questions — Buying in Leander TX">
              <FaqItem
                q="How much do I need to buy a home in Leander TX in 2026?"
                a="For a conventional loan on a $400,000 home, plan for: 5–20% down ($20,000–$80,000), closing costs of 2–3% ($8,000–$12,000), and 2–3 months reserves. Total upfront cash: $30,000–$95,000 depending on your down payment. VA loan buyers can buy with $0 down — contact Joe to learn more."
              />
              <FaqItem
                q="Is Leander TX a good place to buy a home in 2026?"
                a="Yes. Leander is one of the strongest long-term real estate markets in the Austin metro. Leander ISD is top-rated, the 183A provides a direct Austin commute, and home prices offer significant value vs. Austin proper — often $100,000–$200,000 less for comparable square footage and school quality. The city's growth and infrastructure investment show no signs of slowing."
              />
              <FaqItem
                q="What are the property taxes in Leander TX?"
                a="Property taxes range from 2.18% to 2.55% depending on neighborhood and MUD district. On a $450,000 home, that's $9,810–$11,475/year ($818–$956/month). Texas homeowners get a $100,000 homestead exemption off school district tax, saving $1,800–$2,500/year. See Joe's full property tax guide at /property-tax-leander-tx."
              />
              <FaqItem
                q="How long does it take to buy a home in Leander TX?"
                a="Total timeline: 60–120 days. Get pre-approved (1–3 weeks), search and tour (2–8 weeks), make an offer and close (30–45 days conventional, 30–60 days VA). New construction build timelines run 3–12 months from contract to close if not buying a spec (move-in ready) home."
              />
              <FaqItem
                q="Should I buy new construction or resale in Leander TX?"
                a="Both have merit. New construction offers warranties, modern layouts, energy efficiency, and builder incentives — but often carries a MUD and a price premium. Resale homes are frequently in older, MUD-free neighborhoods with larger lots and mature trees — but need more inspection diligence. Joe can help you compare total cost of ownership for specific homes so you make an informed choice."
              />
            </Section>

          </main>

          {/* Sidebar */}
          <aside className="sidebar">
            <div className="card sticky-top">
              <h3 style={{ color: 'var(--accent-light)', margin: '0 0 16px', fontSize: '16px' }}>Get the Buyer's Guide</h3>
              <a
                href="mailto:hello@joefsanches.com?subject=Leander%20Home%20Buyer%20Guide%20Request&body=Name%3A%0AEmail%3A%0APhone%3A%0ATimeframe%3A%0APrice%20range%3A"
                style={{
                  display: 'block', textAlign: 'center', background: 'var(--accent)',
                  color: 'white', padding: '13px', borderRadius: '8px',
                  textDecoration: 'none', fontWeight: 700, fontSize: '15px', marginBottom: '12px'
                }}
              >
                Email Joe
              </a>
              <a
                href="tel:5126638867"
                style={{
                  display: 'block', textAlign: 'center',
                  border: '1px solid rgba(107,120,84,.4)', color: 'var(--accent-light)',
                  padding: '13px', borderRadius: '8px', textDecoration: 'none',
                  fontWeight: 600, fontSize: '15px', marginBottom: '20px'
                }}
              >
                Call 512-663-8867
              </a>
              <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.7' }}>
                <p style={{ margin: '0 0 8px' }}>Free guide • No spam • Response within 1 business day</p>
                <p style={{ margin: 0 }}>Joe Sanches — Veteran, Licensed TX Realtor, Leander specialist</p>
              </div>
            </div>

            <div className="card" style={{ marginTop: '16px' }}>
              <h3 style={{ color: 'var(--accent-light)', margin: '0 0 14px', fontSize: '15px' }}>Also Useful</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link href="/property-tax-leander-tx" style={{ color: 'var(--accent-light)', fontSize: '14px', textDecoration: 'none' }}>→ Leander Property Tax Guide 2026</Link>
                <Link href="/homes-for-sale-in-leander-tx" style={{ color: 'var(--accent-light)', fontSize: '14px', textDecoration: 'none' }}>→ Homes for Sale in Leander TX</Link>
                <Link href="/whats-my-home-worth" style={{ color: 'var(--accent-light)', fontSize: '14px', textDecoration: 'none' }}>→ What's My Home Worth?</Link>
                <Link href="/neighborhoods" style={{ color: 'var(--accent-light)', fontSize: '14px', textDecoration: 'none' }}>→ Neighborhood Guides</Link>
              </div>
            </div>

            <div className="card" style={{ marginTop: '16px', background: 'rgba(107,120,84,.06)' }}>
              <h3 style={{ color: 'white', margin: '0 0 10px', fontSize: '15px' }}>VA Loan Buyers</h3>
              <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '14px' }}>
                Joe is a veteran. He knows the VA loan process and works with VA-experienced lenders in Leander TX.
              </p>
              <a
                href="mailto:hello@joefsanches.com?subject=VA%20Loan%20Home%20Purchase%20Inquiry&body=Name%3A%0APhone%3A%0AService%20Branch%3A%0ATimeframe%3A"
                style={{
                  display: 'block', textAlign: 'center',
                  border: '1px solid rgba(107,120,84,.5)', color: 'var(--accent-light)',
                  padding: '10px', borderRadius: '8px', textDecoration: 'none',
                  fontWeight: 600, fontSize: '13px'
                }}
              >
                Ask About VA Loans
              </a>
            </div>
          </aside>
        </div>

        {/* Bottom CTA */}
        <div className="card" style={{ marginTop: '60px', textAlign: 'center', padding: '48px 32px' }}>
          <h2 style={{ color: 'white', fontSize: '28px', marginBottom: '12px' }}>
            Ready to Buy in Leander TX?
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: '28px', lineHeight: '1.7', maxWidth: '580px', margin: '0 auto 28px' }}>
            Get the full buyer's guide plus a personalized look at current inventory. Joe works with first-time buyers, move-up buyers, and veterans — and there's no pressure, ever.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="mailto:hello@joefsanches.com?subject=Leander%20Home%20Buyer%20Guide%20Request&body=Name%3A%0AEmail%3A%0APhone%3A%0ATimeframe%3A%0APrice%20range%3A"
              style={{
                background: 'var(--accent)', color: 'white', padding: '15px 32px',
                borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '16px'
              }}
            >
              Send Me the Guide
            </a>
            <a
              href="tel:5126638867"
              style={{
                border: '1px solid rgba(107,120,84,.5)', color: 'var(--accent-light)',
                padding: '15px 32px', borderRadius: '8px', textDecoration: 'none',
                fontWeight: 600, fontSize: '16px'
              }}
            >
              Call Joe: 512-663-8867
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
