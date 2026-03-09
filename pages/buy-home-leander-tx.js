import Head from 'next/head';
import Link from 'next/link';

const baseUrl = 'https://joefsanches.com';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Buy a Home in Leander TX | Expert Buyer's Agent | Joe Sanches",
  "description": "Work with Joe Sanches, Leander TX buyer's agent and military veteran. New construction, resale, VA loans. Free consultation: 512-663-8867.",
  "url": `${baseUrl}/buy-home-leander-tx`,
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
      "name": "What is the median home price in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As of early 2026, the median home price in Leander TX is approximately $445,000. Prices range widely by neighborhood — from around $320K for entry-level new construction in communities like Northline and Bryson, up to $1.1M+ for luxury estates in Travisso. Leander remains significantly more affordable than comparable Austin neighborhoods with similar school ratings."
      }
    },
    {
      "@type": "Question",
      "name": "How much do I need for a down payment in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Down payment requirements vary by loan type. Conventional loans require as little as 3% down for first-time buyers, though 10–20% avoids private mortgage insurance (PMI). FHA loans require 3.5% down. VA loans require zero down payment for eligible veterans and active-duty military. On a $445,000 home, 3% down is $13,350 and 20% down is $89,000. You'll also need funds for closing costs, typically 2–3% of the purchase price."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use a VA loan in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — VA loans work in Leander TX just like anywhere else in the country. As a veteran himself, Joe Sanches has deep familiarity with the VA loan process in the Leander market. VA loans offer no down payment, no private mortgage insurance, competitive interest rates, and the ability to ask sellers to cover closing costs. The only property requirement is that it meet VA minimum property standards, which most standard homes in Leander do."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to buy a home in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "From first consultation to closing, the typical Leander home purchase takes 30–60 days for resale homes. New construction timelines vary significantly: a quick move-in spec home can close in 30–45 days, while building a home from a base lot can take 6–12 months depending on the builder. Getting pre-approved before you start looking compresses the timeline considerably and strengthens your offers."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a buyer's agent for new construction in Leander?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — and it costs you nothing. The builder pays the buyer's agent commission. The builder's on-site sales agent represents the builder's interests, not yours. An independent buyer's agent like Joe Sanches can negotiate upgrades, lot premiums, rate buydowns, and contract terms that the builder's agent has no incentive to offer. Joe has worked with every major builder active in Leander, including Pulte, Meritage, Taylor Morrison, David Weekley, and Perry Homes."
      }
    }
  ]
};

const steps = [
  { num: 1, title: 'Get Pre-Approved', desc: 'Before touring homes, secure a pre-approval letter from a lender. This defines your budget, strengthens your offer, and reveals any credit issues early. VA buyers should use a VA-experienced lender.' },
  { num: 2, title: 'Define Your Priorities', desc: 'Budget, school zone, commute tolerance, new vs. resale, must-have features. Narrowing these upfront saves weeks of wasted showings.' },
  { num: 3, title: 'Hire a Buyer\'s Agent', desc: 'Joe works exclusively for your interests — not the seller\'s and not the builder\'s. His commission is paid by the seller. There is no cost to you for buyer representation.' },
  { num: 4, title: 'Tour Homes', desc: 'Joe schedules private showings and accompanies you to builder model homes. He knows which communities have hidden costs and which negotiation points matter most.' },
  { num: 5, title: 'Make an Offer', desc: 'Joe prepares a competitive offer using current market data. For resale homes, this includes price, earnest money, inspection period, and contingencies. For new construction, it includes incentive negotiations.' },
  { num: 6, title: 'Negotiate & Execute Contract', desc: 'Once the seller counters or accepts, Joe guides you through any negotiation rounds. When signed, you\'re officially "under contract."' },
  { num: 7, title: 'Option Period & Inspections', desc: 'Standard Texas contracts include an option period (typically 5–10 days) during which you can back out for any reason. Joe coordinates your home inspector, foundation inspector, and any specialists needed.' },
  { num: 8, title: 'Appraisal & Loan Processing', desc: 'Your lender orders an appraisal to confirm the purchase price aligns with market value. Simultaneously, underwriting processes your loan file. VA and FHA appraisals have additional requirements.' },
  { num: 9, title: 'Final Walk-Through', desc: 'The day before or morning of closing, you walk the property to confirm it\'s in the agreed condition and any repairs were completed.' },
  { num: 10, title: 'Close & Get Your Keys', desc: 'You sign closing documents at a title company, funds are wired, and ownership transfers. In Texas, this usually takes 1–2 hours. You leave with keys in hand.' },
];

const comparisonRows = [
  { factor: 'Price range', newConst: '$340K–$700K+', resale: '$280K–$800K+' },
  { factor: 'Condition', newConst: 'Brand new, builder warranty', resale: 'Varies; inspect carefully' },
  { factor: 'Negotiation', newConst: 'Upgrades, lot premiums, rate buydowns', resale: 'Price, repairs, closing costs' },
  { factor: 'Timeline', newConst: '30 days (spec) to 12 months (build)', resale: '30–45 days typical' },
  { factor: 'Location', newConst: 'Newer, outer areas of Leander', resale: 'Established neighborhoods, more mature trees' },
  { factor: 'HOA/MUD', newConst: 'Almost always has both', resale: 'Varies; older areas often no MUD' },
  { factor: 'Customization', newConst: 'Choose finishes, options', resale: 'What you see is what you get' },
  { factor: 'Competition', newConst: 'Less bidding war pressure', resale: 'Can be competitive on good homes' },
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

export default function BuyHomeLeanderTx() {
  return (
    <>
      <Head>
        <title>Buy a Home in Leander TX | Expert Buyer's Agent | Joe Sanches</title>
        <meta name="description" content="Work with Joe Sanches, Leander TX buyer's agent and military veteran. New construction, resale, VA loans. Free consultation: 512-663-8867." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/buy-home-leander-tx`} />
        <meta property="og:title" content="Buy a Home in Leander TX | Expert Buyer's Agent | Joe Sanches" />
        <meta property="og:description" content="Work with Joe Sanches, Leander TX buyer's agent and military veteran. New construction, resale, VA loans. Free consultation: 512-663-8867." />
        <meta property="og:url" content={`${baseUrl}/buy-home-leander-tx`} />
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
          <span>Buy a Home in Leander TX</span>
        </nav>

        {/* Hero */}
        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Updated March 2026</div>
          <h2 className="heroTitle">Buy a Home in Leander TX</h2>
          <p className="heroLead">
            Leander is one of the best places in Texas to buy a home right now — strong school district, a fraction of Austin's prices, and a pipeline of new construction that gives buyers real choices. Joe Sanches is a local Leander Realtor and military veteran who specializes in helping buyers navigate new construction, resale, and VA loans in this market.
          </p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">VA Loan Expert</span>
            <span className="pill">New Construction</span>
            <span className="pill">Leander ISD</span>
            <span className="pill">No Buyer Fee</span>
          </div>
        </div>

        {/* TOC */}
        <div className="card" style={{ marginTop: '32px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: 'var(--accent-light)' }}>On This Page</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
            <NavLink href="#why-leander" label="Why Buy in Leander" />
            <NavLink href="#buying-process" label="10-Step Buying Process" />
            <NavLink href="#costs" label="Understanding Costs" />
            <NavLink href="#new-vs-resale" label="New Construction vs Resale" />
            <NavLink href="#va-loan" label="VA Loan Advantage" />
            <NavLink href="#neighborhoods" label="Neighborhood Overview" />
            <NavLink href="#faq" label="Frequently Asked Questions" />
          </div>
        </div>

        <div className="grid" style={{ marginTop: '0' }}>
          <main className="main">

            <Section id="why-leander" title="Why Buy a Home in Leander TX?">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Leander has added more than 50,000 residents since 2010, driven by job growth in the Austin tech corridor, the expansion of Apple's campus in north Austin, and employers like Samsung, Tesla, and Dell maintaining a major presence in the metro. That demand has been absorbed not by price spikes but by a steady supply of new construction — which is unusually good news for buyers.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                {[
                  { label: 'Home prices vs. Austin', value: '~30% less for comparable homes' },
                  { label: 'School district', value: 'Leander ISD — consistently top-rated in Texas' },
                  { label: 'Population growth', value: 'Top 10 fastest-growing US cities' },
                  { label: 'Commute to Austin', value: '35–45 min via 183A or MetroRail' },
                  { label: 'New construction options', value: 'Pulte, Meritage, Taylor Morrison, David Weekley, Perry' },
                  { label: 'Appreciation outlook', value: '3–5% annual growth projected through 2027' },
                ].map((stat, i) => (
                  <div key={i} className="card" style={{ padding: '16px' }}>
                    <p style={{ color: 'var(--accent-light)', fontSize: '12px', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</p>
                    <p style={{ color: 'white', fontWeight: 600, margin: 0, fontSize: '15px' }}>{stat.value}</p>
                  </div>
                ))}
              </div>
              <Callout>
                <strong style={{ color: 'white' }}>Value vs. Austin:</strong> A home that would cost $650,000 in North Austin or the Mueller area can often be found for $440,000–$470,000 in Leander with a larger lot, newer construction, and equivalent or better school ratings. The trade-off is commute time — typically 35–45 minutes by car or 45–50 minutes on the MetroRail Red Line.
              </Callout>
            </Section>

            <Section id="buying-process" title="The 10-Step Home Buying Process in Leander TX">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Whether you're a first-time buyer or relocating from out of state, here's exactly what buying a home in Leander looks like from start to keys-in-hand.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {steps.map(step => (
                  <div key={step.num} className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{
                      minWidth: '36px', height: '36px', borderRadius: '50%',
                      background: 'var(--accent)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '14px', flexShrink: 0
                    }}>{step.num}</div>
                    <div>
                      <p style={{ color: 'white', fontWeight: 600, margin: '0 0 6px', fontSize: '15px' }}>{step.title}</p>
                      <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="costs" title="Understanding the Real Costs of Buying in Leander TX">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                The purchase price is just the beginning. Here's a full breakdown of what you'll actually pay when buying a home in Leander.
              </p>

              <h3 style={{ color: 'var(--accent-light)', fontSize: '18px', marginBottom: '12px' }}>Down Payment</h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Down payment options range from 0% (VA loan) to 20%+ (conventional to avoid PMI). On a $445,000 home: 3% = $13,350 | 5% = $22,250 | 10% = $44,500 | 20% = $89,000. FHA requires 3.5% minimum. Most first-time buyers put 5–10% down on conventional loans.
              </p>

              <h3 style={{ color: 'var(--accent-light)', fontSize: '18px', marginBottom: '12px' }}>Closing Costs</h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Expect 2–3% of the purchase price in closing costs, covering lender fees, title insurance, survey, and prepaid escrow items. On a $445,000 home, that's $8,900–$13,350. In some markets, sellers contribute toward closing costs — Joe negotiates this routinely. VA buyers can also ask the seller to pay all closing costs.
              </p>

              <h3 style={{ color: 'var(--accent-light)', fontSize: '18px', marginBottom: '12px' }}>Property Taxes</h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Leander TX property tax rates range from approximately 2.18% to 2.57% depending on the neighborhood and whether a Municipal Utility District (MUD) bond applies. On a $445,000 home: at 2.2% = $9,790/year ($816/month) | at 2.5% = $11,125/year ($927/month). Texas has no state income tax, so property taxes are the primary government revenue source — this is why they run higher than most states.
              </p>

              <h3 style={{ color: 'var(--accent-light)', fontSize: '18px', marginBottom: '12px' }}>HOA &amp; MUD Districts</h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Most master-planned communities in Leander carry HOA fees of $50–$150/month covering amenity maintenance, landscaping in common areas, and community standards enforcement. Many newer communities also sit within a Municipal Utility District (MUD), which adds 0.12%–0.35% to the base property tax rate. MUDs finance the infrastructure (water, sewer, roads) for new development and the bonds are retired over time — but you'll pay them for years after buying. Always confirm whether a property is in a MUD before closing.
              </p>

              <Callout>
                <strong style={{ color: 'white' }}>True monthly cost example:</strong> A $445,000 home in Bryson (MUD, ~2.57% tax, $100/mo HOA) with 10% down at 6.8% interest: PITI = ~$3,450/month + $100 HOA = ~$3,550/month total. The same purchase price in Block House Creek (no MUD, ~2.2% tax, no HOA): ~$3,270/month — a $280/month difference from tax and HOA alone.
              </Callout>
            </Section>

            <Section id="new-vs-resale" title="New Construction vs. Resale Homes in Leander TX">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Leander offers some of the strongest new construction inventory in the Austin metro. Here's how new builds stack up against resale homes across key decision factors.
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: 'rgba(107,120,84,.2)' }}>
                      {['Factor', 'New Construction', 'Resale Home'].map(h => (
                        <th key={h} style={{ padding: '12px 14px', textAlign: 'left', color: 'var(--accent-light)', fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => (
                      <tr key={row.factor} style={{ background: i % 2 === 0 ? 'rgba(107,120,84,.04)' : 'transparent', borderBottom: '1px solid rgba(107,120,84,.12)' }}>
                        <td style={{ padding: '12px 14px', color: 'var(--accent-light)', fontWeight: 600 }}>{row.factor}</td>
                        <td style={{ padding: '12px 14px', color: '#E0E5D8' }}>{row.newConst}</td>
                        <td style={{ padding: '12px 14px', color: '#E0E5D8' }}>{row.resale}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginTop: '16px', fontSize: '14px' }}>
                Joe represents buyers in both scenarios. For new construction, he attends builder meetings, reviews contracts for buyer-unfavorable clauses, and negotiates incentives the builder's agent has no reason to offer you on their own.
              </p>
            </Section>

            <Section id="va-loan" title="The VA Loan Advantage for Leander TX Buyers">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Joe Sanches is a military veteran. He understands the VA loan process not just professionally but personally — and he brings that knowledge directly to bear for veteran clients buying in Leander.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                {[
                  { title: 'Zero Down Payment', desc: 'Eligible veterans can purchase with no down payment, preserving cash for reserves, moving costs, or renovations.' },
                  { title: 'No Private Mortgage Insurance', desc: 'Conventional loans require PMI when you put less than 20% down. VA loans never require PMI, saving $150–$300/month on a typical Leander purchase.' },
                  { title: 'Competitive Interest Rates', desc: 'VA loans typically carry rates 0.25–0.50% lower than conventional equivalents, saving tens of thousands over the life of the loan.' },
                  { title: 'Seller-Paid Closing Costs', desc: 'VA rules allow sellers to pay all of the buyer\'s closing costs. Joe negotiates this as a standard part of VA purchase offers.' },
                  { title: 'Reusable Benefit', desc: 'If you\'ve used your VA benefit before, it may be fully or partially restored. Joe connects you with VA-experienced lenders who can advise on entitlement.' },
                  { title: 'New Construction Compatible', desc: 'VA loans work for new construction in Leander — including spec homes from Pulte, Meritage, and Taylor Morrison. Some builders prefer conventional, but Joe knows which are VA-friendly.' },
                ].map((item, i) => (
                  <div key={i} className="card">
                    <p style={{ color: 'white', fontWeight: 600, margin: '0 0 8px', fontSize: '15px' }}>{item.title}</p>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
              <Callout>
                <strong style={{ color: 'white' }}>Veteran to veteran:</strong> Joe served in the U.S. military before becoming a Realtor. He has helped multiple veterans use their VA benefit to buy homes in Leander with little to no money out of pocket. If you're a veteran or active-duty service member, call Joe first — he'll make sure you're using every benefit available to you.
              </Callout>
            </Section>

            <Section id="neighborhoods" title="Leander Neighborhood Overview for Buyers">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Leander has more than a dozen distinct communities. Here's a quick buyer's orientation to the most popular ones:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                {[
                  { name: 'Crystal Falls', range: '$420K–$750K', summary: 'Established master-planned community with golf course, Hill Country views, and a mix of resale and newer-phase homes. No MUD in original sections.' },
                  { name: 'Bryson', range: '$330K–$550K', summary: 'Resort-style amenities with a lazy river pool and fitness center. Primarily new construction. Higher MUD rate (~2.57% total) but strong community feel.' },
                  { name: 'Travisso', range: '$580K–$1.1M+', summary: 'Leander\'s premier luxury community. Panoramic Hill Country views, high-end finishes standard, resort clubhouse. For buyers with larger budgets.' },
                  { name: 'Northline', range: '$320K–$480K', summary: 'Walkable urban-style community adjacent to the MetroRail station. Best for Austin commuters who prefer transit. Smaller lots, modern architecture.' },
                  { name: 'Larkspur', range: '$380K–$560K', summary: 'Family-focused community with excellent trail access, top-rated elementary school, and a strong sense of community. Primarily newer builds.' },
                  { name: 'Block House Creek', range: '$300K–$480K', summary: 'One of Leander\'s most established neighborhoods. No MUD, mature trees, lower tax rates. Best for buyers who want value and a non-cookie-cutter feel.' },
                ].map((n, i) => (
                  <div key={i} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                      <h3 style={{ color: 'white', margin: 0, fontSize: '17px' }}>{n.name}</h3>
                      <span className="pill" style={{ fontSize: '12px' }}>{n.range}</span>
                    </div>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{n.summary}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <NavLink href="/leander-neighborhoods" label="Full Neighborhood Comparison Guide" />
                <NavLink href="/new-construction-leander-tx" label="New Construction Communities" />
              </div>
            </Section>

            <Section id="faq" title="Frequently Asked Questions — Buying a Home in Leander TX">
              {faqSchema.mainEntity.map((q, i) => (
                <div key={i} className="card" style={{ marginBottom: '16px' }}>
                  <h3 style={{ color: 'white', margin: '0 0 10px', fontSize: '16px' }}>{q.name}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{q.acceptedAnswer.text}</p>
                </div>
              ))}
            </Section>

            <Section id="related" title="More Resources for Leander Home Buyers">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
                <NavLink href="/leander-neighborhoods" label="Neighborhood Guide" />
                <NavLink href="/new-construction-leander-tx" label="New Construction Guide" />
                <NavLink href="/leander-isd-schools" label="Leander ISD Schools" />
                <NavLink href="/property-tax-leander-tx" label="Property Tax Guide" />
                <NavLink href="/leander-real-estate-market-2026" label="2026 Market Report" />
                <NavLink href="/moving-to-leander-tx" label="Relocation Guide" />
              </div>
            </Section>

          </main>
        </div>

        {/* Bottom CTA */}
        <div className="card" style={{ textAlign: 'center', padding: '40px 24px', marginTop: '40px' }}>
          <h2 style={{ color: 'white', fontSize: '28px', marginBottom: '12px' }}>Start Your Home Search — Call Joe: 512-663-8867</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px', maxWidth: '560px', margin: '0 auto 24px' }}>
            Joe is a local Leander expert and military veteran who works exclusively for buyers — not builders, not sellers. Your consultation is free and there is no obligation.
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
