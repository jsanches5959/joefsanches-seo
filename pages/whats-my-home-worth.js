import Head from 'next/head';
import Link from 'next/link';

const baseUrl = 'https://joefsanches.com';

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "What's My Home Worth in Leander TX? | Free CMA | Joe Sanches",
  "description": "Get a free, no-obligation home valuation from Joe Sanches, Leander TX Realtor. Know what your home is worth in today's market. Call or text 512-663-8867.",
  "url": `${baseUrl}/whats-my-home-worth`,
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
  },
  "mainEntity": {
    "@type": "Service",
    "name": "Free Home Valuation — Comparative Market Analysis",
    "provider": {
      "@type": "RealEstateAgent",
      "name": "Joe Sanches",
      "telephone": "+1-512-663-8867"
    },
    "areaServed": {
      "@type": "City",
      "name": "Leander",
      "addressRegion": "TX"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free, no-obligation Comparative Market Analysis for Leander TX homeowners"
    }
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How accurate is a free home valuation in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Comparative Market Analysis (CMA) from a local Realtor is significantly more accurate than online automated estimates (AVMs) like Zillow Zestimates. A CMA uses actual sold data from your neighborhood, accounts for condition, upgrades, lot size, and MUD status, and is prepared by someone who has physically been inside comparable homes. AVMs can be off by 5–15% in rapidly changing markets like Leander. A professional CMA from Joe Sanches is free and typically within 2–4% of final sale price."
      }
    },
    {
      "@type": "Question",
      "name": "What factors affect my home's value in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The main factors affecting home value in Leander TX are: (1) Location and neighborhood — Crystal Falls, Travisso, and Bryson command premiums; (2) School zoning — Leander ISD campuses vary in rating; (3) MUD status — no MUD adds value vs. homes with 0.30%+ MUD rates; (4) Condition and upgrades — kitchens, baths, and flooring move the needle most; (5) Lot size and backing — no-back-neighbor or greenbelt lots add 3–8%; (6) Square footage and floor plan; (7) Age and builder — newer construction with warranties vs. resale; (8) Current market inventory and days on market trends."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a home valuation take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "After you submit your request, Joe will contact you within one business day. A brief 10-minute phone call or walkthrough helps him understand your home's condition and any upgrades. He then researches comparable sales — homes sold in the past 90 days within 0.5 miles that are similar in size and age. The completed CMA report is typically delivered within 24–48 hours, presented as a PDF showing the comparable sales, price adjustments, and a recommended listing range."
      }
    },
    {
      "@type": "Question",
      "name": "Is the Leander TX housing market good for sellers in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 2026 Leander market is a balanced-to-seller market for well-priced homes. Inventory is higher than the 2021–2022 frenzy but buyer demand remains strong due to continued population growth from Austin and the tech corridor along 183A. Homes that are priced accurately and show well are selling in 20–40 days. Overpriced homes are sitting. A precise CMA is more important than ever — leaving $10,000–$30,000 on the table with a low price, or sitting 90 days with an inflated price, are both costly mistakes a good Realtor helps you avoid."
      }
    },
    {
      "@type": "Question",
      "name": "Do I have to list with Joe to get a free CMA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. There is zero obligation. Joe provides free CMAs because he believes in earning your business by demonstrating his market knowledge, not by pressuring you. Many homeowners use his CMA simply to track their equity, plan a future move, or evaluate a refinance. If you do decide to sell, Joe hopes you'll think of him — but the valuation is completely free either way."
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

function CheckList({ items }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
      {items.map((item, i) => (
        <li key={i} style={{
          display: 'flex', gap: '12px', alignItems: 'flex-start',
          padding: '10px 0', borderBottom: '1px solid rgba(107,120,84,.12)',
          color: 'var(--muted)', lineHeight: '1.6'
        }}>
          <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
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

function FaqItem({ q, a }) {
  return (
    <div style={{
      borderBottom: '1px solid rgba(107,120,84,.2)',
      paddingBottom: '24px', marginBottom: '24px'
    }}>
      <h3 style={{ fontSize: '18px', color: 'white', marginBottom: '12px', fontWeight: 600 }}>{q}</h3>
      <p style={{ color: 'var(--muted)', lineHeight: '1.8', margin: 0 }}>{a}</p>
    </div>
  );
}

export default function WhatsMyHomeWorth() {
  return (
    <>
      <Head>
        <title>What's My Home Worth in Leander TX? | Free CMA | Joe Sanches</title>
        <meta name="description" content="Get a free, no-obligation home valuation from Joe Sanches, Leander TX Realtor. Know what your home is worth in today's market. Call or text 512-663-8867." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/whats-my-home-worth`} />
        <meta property="og:title" content="What's My Home Worth in Leander TX? | Free CMA | Joe Sanches" />
        <meta property="og:description" content="Get a free, no-obligation Comparative Market Analysis from a local Leander TX Realtor. Know your home's real value — no Zillow guesses." />
        <meta property="og:url" content={`${baseUrl}/whats-my-home-worth`} />
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
          <span>What's My Home Worth?</span>
        </nav>

        {/* Hero */}
        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Free — No Obligation</div>
          <h2 className="heroTitle">What's My Home Worth in Leander TX?</h2>
          <p className="heroLead">
            Get a free, accurate Comparative Market Analysis from a local Realtor who knows every neighborhood, MUD district, and school zone in Leander. No automated estimates. Real sold data. A number you can actually use.
          </p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">Leander TX</span>
            <span className="pill">Crystal Falls</span>
            <span className="pill">Travisso</span>
            <span className="pill">Bryson</span>
            <span className="pill">Northline</span>
            <span className="pill">All Neighborhoods</span>
          </div>
          <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="#valuation-form"
              style={{
                background: 'var(--accent)', color: 'white', padding: '14px 28px',
                borderRadius: '8px', textDecoration: 'none', fontWeight: 700,
                fontSize: '16px', display: 'inline-block'
              }}
            >
              Get My Free Valuation
            </a>
            <a
              href="tel:5126638867"
              style={{
                border: '1px solid rgba(107,120,84,.5)', color: 'var(--accent-light)',
                padding: '14px 28px', borderRadius: '8px', textDecoration: 'none',
                fontWeight: 600, fontSize: '16px', display: 'inline-block'
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
            <NavLink href="#why-now" label="Why Get a Valuation Now (2026)" />
            <NavLink href="#value-factors" label="What Affects Your Home's Value" />
            <NavLink href="#cma-process" label="Joe's CMA Process" />
            <NavLink href="#valuation-form" label="Request Your Free CMA" />
            <NavLink href="#faq" label="Frequently Asked Questions" />
          </div>
        </div>

        <div className="grid" style={{ marginTop: '0' }}>
          <main className="main">

            {/* Section 1: Why Now */}
            <Section id="why-now" title="Why Get a Home Valuation in 2026?">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                The Leander market has shifted significantly since the 2021–2022 frenzy. Knowing your home's true value in today's conditions — not what your neighbor got two years ago — is the most important first step whether you're planning to sell, refinance, or simply track your equity.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                {[
                  { stat: 'Balanced Market', desc: 'Inventory has risen. Correctly-priced homes still move fast; overpriced homes sit.' },
                  { stat: '20–40 Days', desc: 'Average days on market for well-priced Leander homes in early 2026.' },
                  { stat: '3–7% Variance', desc: 'Difference between Zillow Zestimate and actual sold price on many Leander homes.' },
                  { stat: 'Free CMA', desc: "Joe's analysis uses real closed sales — not algorithms — to find your true market value." },
                ].map(({ stat, desc }) => (
                  <div key={stat} className="card" style={{ padding: '20px' }}>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--accent-light)', marginBottom: '8px' }}>{stat}</div>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
              <Callout>
                <strong style={{ color: 'white' }}>2026 context:</strong> The Federal Reserve's rate trajectory and continued Austin-area job growth are sustaining buyer demand in Leander even as affordability tightens. The window for sellers is real — but pricing accuracy matters more than ever. A local CMA is your most reliable tool.
              </Callout>
            </Section>

            {/* Section 2: Value Factors */}
            <Section id="value-factors" title="What Affects Your Home's Value in Leander TX?">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                No two homes are valued the same way, even on the same street. Here are the primary factors Joe analyzes when preparing your CMA:
              </p>

              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>Location and Neighborhood</h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Within Leander, neighborhood matters enormously. Travisso commands a premium for its Hill Country views and resort-style amenities. Crystal Falls appeals to families with its golf course and walkability. Newer master-planned communities like Bryson and Northline attract buyers wanting modern construction. The same square footage can differ by $50,000–$100,000 depending on which community it sits in.
              </p>

              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>Condition and Upgrades</h3>
              <CheckList items={[
                'Updated kitchen (countertops, cabinets, appliances) — typically adds 3–7% to value',
                'Primary bath renovation — buyers pay a premium for spa-style primary suites',
                'Flooring — hardwood or quality LVP throughout vs. carpet significantly affects perception',
                'Fresh interior/exterior paint — highest ROI improvement before listing',
                'Roof age — buyers discount heavily for roofs over 10 years old in hail-prone Central Texas',
                'HVAC age — systems over 10 years invite inspection concerns and negotiation',
                'Outdoor living — covered patios, pergolas, and pools add measurable value in Leander',
              ]} />

              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>MUD District Status</h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                MUD districts are a significant consideration for buyers in Leander. Homes without a MUD (or with a very low MUD rate) are worth more all else equal — because buyers are calculating their total monthly housing cost. A home that costs $400/year less in MUD taxes over 30 years represents significant savings. Joe accounts for MUD status in every CMA.
              </p>
              <Callout>
                <strong style={{ color: 'white' }}>MUD example:</strong> Two identical $450,000 homes — one in a MUD at 0.35% ($1,575/yr extra) vs. one without. The no-MUD home is worth approximately $12,000–$18,000 more to a cost-conscious buyer, even at the same list price.
              </Callout>

              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>School Zoning</h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                All of Leander falls within Leander ISD, one of the top-rated districts in the Austin metro. However, specific elementary and middle school feeder patterns matter — families often pay a premium to be zoned to certain campuses. Joe knows the school zoning boundaries and how they affect buyer demand in each neighborhood.
              </p>

              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>Lot and Setting</h3>
              <CheckList items={[
                'Greenbelt or creek backing — typically adds 3–8% over interior lots',
                'Cul-de-sac location — reduced traffic, popular with families, slight premium',
                'No back neighbor (park, HOA common area) — highly desirable in dense new construction',
                'Corner lot — can be a plus or minus depending on size and traffic',
                'Hill Country views — significant premium in communities like Travisso',
                'Lot size — larger lots increasingly rare in newer Leander; adds meaningful value',
              ]} />
            </Section>

            {/* Section 3: CMA Process */}
            <Section id="cma-process" title="Joe's CMA Process — How It Works">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                A Comparative Market Analysis is not an appraisal — it's a real estate professional's informed opinion of market value based on actual recent sales. Here's exactly what Joe does:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                {[
                  { step: '1', title: 'You Request It', desc: 'Submit the form below or call/text Joe directly. No forms, no spam — just a conversation.' },
                  { step: '2', title: 'Quick Consultation', desc: 'A 10-minute call or brief walkthrough to understand your home\'s condition, upgrades, and any unique features that a photo can\'t capture.' },
                  { step: '3', title: 'Comparable Sales Research', desc: 'Joe pulls the last 90 days of closed sales within 0.5 miles — same subdivision, similar square footage, similar age. He adjusts for differences in bedrooms, baths, garage, and upgrades.' },
                  { step: '4', title: 'Active Listing Review', desc: 'Active listings are your competition. Joe reviews what buyers are currently seeing on the market to ensure your price is competitive without leaving money on the table.' },
                  { step: '5', title: 'CMA Report Delivered', desc: 'A clear PDF report showing comparable sold homes, price adjustments, and a recommended listing range. Delivered within 24–48 hours. Free. No obligation.' },
                  { step: '6', title: 'No Pressure Strategy Session', desc: 'If you decide you want to sell, Joe can walk through a full game plan — timing, pricing strategy, prep recommendations, and marketing. If not, no worries.' },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: 'var(--accent)', color: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '16px', flexShrink: 0
                    }}>{step}</div>
                    <div>
                      <h4 style={{ color: 'white', margin: '0 0 6px', fontSize: '16px', fontWeight: 600 }}>{title}</h4>
                      <p style={{ color: 'var(--muted)', margin: 0, lineHeight: '1.6', fontSize: '14px' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Callout>
                <strong style={{ color: 'white' }}>About Joe:</strong> Joe Sanches is a licensed Texas Realtor serving Leander, Cedar Park, Liberty Hill, and the greater Austin area. He is a veteran and specializes in helping homeowners understand their equity position and maximize their proceeds when they're ready to sell. He lives in the Leander market, knows the neighborhoods, and provides straight answers.
              </Callout>
            </Section>

            {/* Section 4: Form */}
            <Section id="valuation-form" title="Request My Free Home Valuation">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '24px' }}>
                Fill in the fields below and click the button — it will open a pre-filled email to Joe with your info. He typically responds within a few hours during business days.
              </p>

              <div className="card" style={{ maxWidth: '560px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', color: 'var(--accent-light)', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="First and last name"
                      style={{
                        width: '100%', background: 'rgba(255,255,255,.06)',
                        border: '1px solid rgba(107,120,84,.35)', borderRadius: '8px',
                        padding: '12px 14px', color: 'white', fontSize: '15px',
                        outline: 'none', boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'var(--accent-light)', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Property Address
                    </label>
                    <input
                      type="text"
                      placeholder="Street address, Leander TX"
                      style={{
                        width: '100%', background: 'rgba(255,255,255,.06)',
                        border: '1px solid rgba(107,120,84,.35)', borderRadius: '8px',
                        padding: '12px 14px', color: 'white', fontSize: '15px',
                        outline: 'none', boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'var(--accent-light)', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Your Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      style={{
                        width: '100%', background: 'rgba(255,255,255,.06)',
                        border: '1px solid rgba(107,120,84,.35)', borderRadius: '8px',
                        padding: '12px 14px', color: 'white', fontSize: '15px',
                        outline: 'none', boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <p style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '16px', lineHeight: '1.6' }}>
                  Clicking the button below will open your email app with your request pre-addressed to Joe. Copy your info from the fields above into the email before sending.
                </p>

                <a
                  href="mailto:hello@joefsanches.com?subject=Home%20Valuation%20Request&body=Name%3A%0AAddress%3A%0AEmail%3A%0APhone%3A%0ABest%20time%20to%20call%3A"
                  style={{
                    display: 'block', width: '100%', textAlign: 'center',
                    background: 'var(--accent)', color: 'white', padding: '16px',
                    borderRadius: '8px', textDecoration: 'none', fontWeight: 700,
                    fontSize: '17px', boxSizing: 'border-box'
                  }}
                >
                  Request My Free CMA
                </a>

                <p style={{ color: 'var(--muted)', fontSize: '13px', textAlign: 'center', marginTop: '16px', marginBottom: 0 }}>
                  Or call/text Joe directly:{' '}
                  <a href="tel:5126638867" style={{ color: 'var(--accent-light)', fontWeight: 600 }}>512-663-8867</a>
                </p>
              </div>
            </Section>

            {/* Section 5: FAQ */}
            <Section id="faq" title="Frequently Asked Questions">
              <FaqItem
                q="How accurate is a free home valuation in Leander TX?"
                a="A Comparative Market Analysis (CMA) from a local Realtor is significantly more accurate than online automated estimates like Zillow Zestimates. A CMA uses actual sold data from your neighborhood, accounts for condition, upgrades, lot size, and MUD status, and is prepared by someone who knows the local market. AVMs can be off by 5–15% in rapidly changing markets like Leander. Joe's CMA is free and typically within 2–4% of final sale price."
              />
              <FaqItem
                q="What factors affect my home's value in Leander TX?"
                a="The main factors are: location and neighborhood (Crystal Falls, Travisso, and Bryson command premiums), school zoning within Leander ISD, MUD status (no MUD adds value), condition and upgrades (kitchens, baths, and flooring move the needle most), lot size and backing (greenbelt or no-back-neighbor adds 3–8%), square footage and floor plan, and current market inventory."
              />
              <FaqItem
                q="How long does a home valuation take?"
                a="After you submit your request, Joe will contact you within one business day. A brief 10-minute call or walkthrough helps him understand your home's condition and upgrades. He then researches comparable sales — homes sold in the past 90 days within 0.5 miles that are similar in size and age. The completed CMA report is typically delivered within 24–48 hours as a PDF."
              />
              <FaqItem
                q="Is the Leander TX housing market good for sellers in 2026?"
                a="The 2026 Leander market is a balanced-to-seller market for well-priced homes. Inventory is higher than the 2021–2022 frenzy but buyer demand remains strong due to continued population growth from Austin and the tech corridor along 183A. Homes that are priced accurately and show well are selling in 20–40 days. A precise CMA is more important than ever."
              />
              <FaqItem
                q="Do I have to list with Joe to get a free CMA?"
                a="No. There is zero obligation. Joe provides free CMAs because he believes in earning your business by demonstrating his market knowledge, not by pressuring you. Many homeowners use his CMA to track their equity, plan a future move, or evaluate a refinance. If you decide to sell, Joe hopes you'll think of him — but the valuation is completely free either way."
              />
            </Section>

          </main>

          {/* Sidebar */}
          <aside className="sidebar">
            <div className="card sticky-top">
              <h3 style={{ color: 'var(--accent-light)', margin: '0 0 16px', fontSize: '16px' }}>Get Your Free Home Value</h3>
              <a
                href="mailto:hello@joefsanches.com?subject=Home%20Valuation%20Request&body=Name%3A%0AAddress%3A%0AEmail%3A%0APhone%3A%0ABest%20time%20to%20call%3A"
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
                <p style={{ margin: '0 0 8px' }}>Free • No obligation • Response within 1 business day</p>
                <p style={{ margin: 0 }}>Joe Sanches — Licensed TX Realtor, Leander area specialist</p>
              </div>
            </div>

            <div className="card" style={{ marginTop: '16px' }}>
              <h3 style={{ color: 'var(--accent-light)', margin: '0 0 14px', fontSize: '15px' }}>Related Resources</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link href="/property-tax-leander-tx" style={{ color: 'var(--accent-light)', fontSize: '14px', textDecoration: 'none' }}>→ Leander Property Tax Guide 2026</Link>
                <Link href="/homes-for-sale-in-leander-tx" style={{ color: 'var(--accent-light)', fontSize: '14px', textDecoration: 'none' }}>→ Homes for Sale in Leander TX</Link>
                <Link href="/leander-home-buyer-guide" style={{ color: 'var(--accent-light)', fontSize: '14px', textDecoration: 'none' }}>→ Leander Home Buyer's Guide</Link>
                <Link href="/neighborhoods" style={{ color: 'var(--accent-light)', fontSize: '14px', textDecoration: 'none' }}>→ Leander Neighborhood Guides</Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom CTA */}
        <div className="card" style={{ marginTop: '60px', textAlign: 'center', padding: '48px 32px' }}>
          <h2 style={{ color: 'white', fontSize: '28px', marginBottom: '12px' }}>
            Ready to Know Your Home's Value?
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: '28px', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto 28px' }}>
            Get a free, accurate CMA from a local Leander TX Realtor who knows your neighborhood. No Zillow guesses. Real data. Zero pressure.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="mailto:hello@joefsanches.com?subject=Home%20Valuation%20Request&body=Name%3A%0AAddress%3A%0AEmail%3A%0APhone%3A%0ABest%20time%20to%20call%3A"
              style={{
                background: 'var(--accent)', color: 'white', padding: '15px 32px',
                borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '16px'
              }}
            >
              Request My Free CMA
            </a>
            <a
              href="tel:5126638867"
              style={{
                border: '1px solid rgba(107,120,84,.5)', color: 'var(--accent-light)',
                padding: '15px 32px', borderRadius: '8px', textDecoration: 'none',
                fontWeight: 600, fontSize: '16px'
              }}
            >
              Call 512-663-8867
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
