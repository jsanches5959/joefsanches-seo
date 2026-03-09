import Head from 'next/head';
import Link from 'next/link';

const baseUrl = 'https://joefsanches.com';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "New Construction Homes Leander TX 2026 | Joe Sanches Realtor",
  "description": "Complete guide to new construction homes in Leander TX. Top builders, communities, incentives, and the buying process explained by local expert Joe Sanches.",
  "url": `${baseUrl}/new-construction-leander-tx`,
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
  },
  "areaServed": "Leander, TX"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are new construction homes in Leander TX a good investment in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — Leander continues to be one of the fastest-growing cities in the US. New construction in communities like Bryson, Deerbrooke, and Northline offers modern energy-efficient builds with builder warranties. Values have appreciated 15–30% over 5-year windows in established communities like Crystal Falls and Larkspur."
      }
    },
    {
      "@type": "Question",
      "name": "Which builders are building new homes in Leander TX right now?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Active builders in Leander as of 2026 include Lennar, KB Home, Taylor Morrison, David Weekley Homes, Meritage Homes, Perry Homes, Pulte Homes, and Century Communities. Each operates in different communities with varying price points from the low $300s to $700K+."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a real estate agent for new construction in Leander?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — and it costs you nothing. Builders pay buyer agent commissions, so having representation is free to you. An agent negotiates upgrades, reviews contracts (which heavily favor builders), flags MUD tax implications, and helps you understand what comps support the price. Never walk into a model home without your agent registered first."
      }
    },
    {
      "@type": "Question",
      "name": "What incentives do builders offer on new construction in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Builder incentives in 2026 include interest rate buydowns (2-1 buydowns are common), closing cost assistance of $5,000–$20,000, free upgrades (appliance packages, flooring, countertops), and reduced lot premiums on inventory homes. Incentives are strongest on move-in-ready spec homes and at month/quarter end."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to build a new construction home in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "From contract signing, a production new build in Leander typically takes 4–8 months depending on the builder and supply chain. Semi-custom and custom homes run 9–14 months. Move-in-ready inventory homes (spec homes) can close in as little as 30–45 days."
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

export default function NewConstructionHub({ deals }) {
  return (
    <>
      <Head>
        <title>New Construction Homes Leander TX 2026 | Joe Sanches Realtor</title>
        <meta name="description" content="Complete guide to buying new construction in Leander TX. Top builders (Lennar, KB Home, Taylor Morrison), communities, current incentives, and the full buying process from a local expert." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/new-construction-leander-tx`} />
        <meta property="og:title" content="New Construction Homes Leander TX 2026 | Joe Sanches Realtor" />
        <meta property="og:description" content="Find new construction homes in Leander TX. Builders, communities, incentives, and expert guidance from Joe Sanches — your local Leander realtor." />
        <meta property="og:url" content={`${baseUrl}/new-construction-leander-tx`} />
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
          <span>New Construction — Leander TX</span>
        </nav>

        {/* Hero */}
        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Updated March 2026</div>
          <h2 className="heroTitle">New Construction Homes in Leander TX: The Complete 2026 Guide</h2>
          <p className="heroLead">
            Leander is one of Texas's hottest new construction markets — and for good reason. Top builders are actively developing in communities from Bryson to Deerbrooke to Northline. This guide covers every builder, every community, current incentives, and the exact steps to get your new home under contract.
          </p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">Lennar</span>
            <span className="pill">KB Home</span>
            <span className="pill">Taylor Morrison</span>
            <span className="pill">David Weekley</span>
            <span className="pill">Meritage</span>
            <span className="pill">2026 Incentives</span>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="card" style={{ marginTop: '32px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: 'var(--accent-light)' }}>On This Page</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
            <NavLink href="#why-new-construction" label="Why Buy New Construction" />
            <NavLink href="#builders" label="Top Builders in Leander" />
            <NavLink href="#communities" label="Communities Overview" />
            <NavLink href="#incentives" label="Current Incentives & Deals" />
            <NavLink href="#process" label="Buying Process Guide" />
            <NavLink href="#faq" label="Frequently Asked Questions" />
          </div>
        </div>

        <div className="grid" style={{ marginTop: '0' }}>
          <main className="main">

            <Section id="why-new-construction" title="Why Buy New Construction in Leander TX">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                New construction in Leander delivers something the resale market rarely can: a home built to your spec, with a builder warranty, modern energy efficiency, and the latest floor plans designed for how families actually live today. Here's why buyers keep choosing new builds in 2026:
              </p>
              <ul style={{ color: 'var(--muted)', lineHeight: '2', paddingLeft: '20px', marginBottom: '20px' }}>
                <li><strong style={{ color: 'white' }}>Builder warranties</strong> — structural coverage for 10 years, systems for 2 years, workmanship for 1 year</li>
                <li><strong style={{ color: 'white' }}>Energy efficiency</strong> — foam insulation, spray-foam attics, tankless water heaters, and ENERGY STAR appliances reduce monthly utility bills by 20–35% vs. older homes</li>
                <li><strong style={{ color: 'white' }}>No bidding wars</strong> — list price is list price; competition is with the builder, not other buyers</li>
                <li><strong style={{ color: 'white' }}>Customization</strong> — choose countertops, cabinetry, flooring, and layout options (on dirt builds)</li>
                <li><strong style={{ color: 'white' }}>Rate buydowns</strong> — builders have preferred lenders who offer below-market rates unavailable on resale</li>
                <li><strong style={{ color: 'white' }}>Modern open plans</strong> — great rooms, primary suites downstairs, 3-car garages, and dedicated home offices built in</li>
              </ul>
              <Callout>
                <strong style={{ color: 'white' }}>Important:</strong> New construction in Leander almost always includes MUD district taxes. On a $450K home with a 0.30% MUD, that's an extra $1,350/year. Joe will pull the exact tax rate for any home you're considering before you write an offer.
              </Callout>
            </Section>

            <Section id="builders" title="Top Builders Active in Leander TX (2026)">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '24px' }}>
                Each builder brings a different price point, build quality, and incentive structure. Here's a breakdown of who's building what in Leander right now.
              </p>

              {[
                {
                  name: 'Lennar',
                  range: '$320K–$580K',
                  communities: 'Bryson, Deerbrooke, Northline',
                  notes: 'Volume builder known for "Everything\'s Included" packages — granite, stainless, smart home tech all standard. Fastest closing timelines. Preferred lender offers competitive buydowns.'
                },
                {
                  name: 'KB Home',
                  range: '$300K–$500K',
                  communities: 'Larkspur, Bryson phases',
                  notes: 'Highly customizable — buyers choose from a wide design studio palette. Good entry-level options. Build times run 5–7 months on dirt starts.'
                },
                {
                  name: 'Taylor Morrison',
                  range: '$430K–$750K',
                  communities: 'Crystal Falls, Travisso, Deerbrooke',
                  notes: 'Mid-to-upper tier builder with strong design finish levels. Known for quality tile work, 8-foot doors standard at higher series. Solid warranty reputation.'
                },
                {
                  name: 'David Weekley Homes',
                  range: '$480K–$850K',
                  communities: 'Travisso, Crystal Falls custom sections',
                  notes: 'Premium semi-custom builder. Strongest customer satisfaction scores in the Austin market. Primary suite downstairs is a signature feature across floor plans.'
                },
                {
                  name: 'Meritage Homes',
                  range: '$350K–$600K',
                  communities: 'Larkspur, Northline, Bar W Ranch',
                  notes: 'Energy efficiency leader — spray-foam insulation, fresh air systems, and EPA WaterSense fixtures standard. Meritage LivingSmart program lowers utility costs significantly.'
                },
                {
                  name: 'Perry Homes',
                  range: '$380K–$650K',
                  communities: 'Bryson, Deerbrooke',
                  notes: 'Texas-based builder with straightforward pricing and reliable build times. Known for large square footage at competitive price per foot.'
                }
              ].map(b => (
                <div key={b.name} className="card" style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                    <h3 style={{ color: 'white', margin: 0, fontSize: '18px' }}>{b.name}</h3>
                    <span className="pill">{b.range}</span>
                  </div>
                  <p style={{ color: 'var(--accent-light)', fontSize: '13px', margin: '0 0 8px' }}>Active in: {b.communities}</p>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{b.notes}</p>
                </div>
              ))}

              <Callout>
                <strong style={{ color: 'white' }}>Pro tip:</strong> Register your agent before visiting any model home — even just to browse. If you walk in unrepresented, the builder's sales agent represents the builder, not you. Joe can accompany you or register you in advance so you don't lose your representation rights.
              </Callout>
            </Section>

            <Section id="communities" title="New Construction Communities in Leander TX">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '24px' }}>
                Leander has more active master-planned communities than any other city in the Austin metro. Here's a quick overview of the major options and what makes each one distinct.
              </p>

              {[
                { name: 'Crystal Falls', price: '$420K–$750K', status: 'Established + active new phases', note: 'Golf course community off Crystal Falls Pkwy. Some of Leander\'s most desirable lots with Hill Country views. Taylor Morrison and David Weekley are active in newer phases.' },
                { name: 'Bryson', price: '$330K–$550K', status: 'Active — building out', note: 'Off 183A and San Gabriel Pkwy. Resort-style pool, dog park, and fitness center. Lennar, KB Home, and Perry are all building. Higher MUD (~0.35%) but strong amenity package.' },
                { name: 'Northline', price: '$320K–$480K', status: 'Urban-style mixed-use', note: 'Near Leander MetroRail station on 183A. Walkable retail, restaurants, and trail system. Lennar leads construction. Best for commuters to downtown Austin.' },
                { name: 'Larkspur', price: '$380K–$560K', status: 'Active building', note: 'Off Hero Way and Larkspur Blvd. Great proximity to Leander ISD campuses. KB Home and Meritage are the primary builders here.' },
                { name: 'Deerbrooke', price: '$350K–$600K', status: 'Newer — still building out', note: 'One of Leander\'s newest master-planned communities. Resort pool, greenbelt trails, and future commercial planned. Lennar, Perry, and Taylor Morrison all active.' },
                { name: 'Travisso', price: '$580K–$1.1M', status: 'Luxury — active final phases', note: 'High-end Hill Country community off 1431. Panoramic views, resort amenities, and luxury builders. David Weekley and Taylor Morrison are primary builders.' },
              ].map(c => (
                <div key={c.name} className="card" style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                    <h3 style={{ color: 'white', margin: 0, fontSize: '18px' }}>{c.name}</h3>
                    <span className="pill">{c.price}</span>
                  </div>
                  <p style={{ color: 'var(--accent-light)', fontSize: '13px', margin: '0 0 8px' }}>{c.status}</p>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{c.note}</p>
                </div>
              ))}
            </Section>

            <Section id="incentives" title="Builder Incentives & Deals in Leander TX (2026)">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Builder incentives in 2026 are the strongest they've been in several years. As inventory of spec homes has grown, builders are motivated to move product. Here's what you can realistically negotiate:
              </p>
              <ul style={{ color: 'var(--muted)', lineHeight: '2', paddingLeft: '20px', marginBottom: '20px' }}>
                <li><strong style={{ color: 'white' }}>Interest rate buydowns</strong> — 2-1 temporary buydowns (e.g., 4.5% year 1, 5.5% year 2, 6.5% year 3+) or permanent rate reductions via preferred lender</li>
                <li><strong style={{ color: 'white' }}>Closing cost contributions</strong> — $5,000–$20,000 toward title, lender fees, and prepaids, especially on inventory homes</li>
                <li><strong style={{ color: 'white' }}>Free upgrade packages</strong> — appliance packages ($4K–$8K value), upgraded flooring, extended tile in wet areas, quartz countertops</li>
                <li><strong style={{ color: 'white' }}>Reduced lot premiums</strong> — cul-de-sac or greenbelt lots that carried $15K–$40K premiums may now be reduced or waived</li>
                <li><strong style={{ color: 'white' }}>Price reductions on spec homes</strong> — completed inventory homes sitting 90+ days may be discounted $15K–$40K</li>
              </ul>
              {deals && deals.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '16px' }}>Current Featured Deals</h3>
                  {deals.map((deal, i) => (
                    <div key={i} className="card" style={{ marginBottom: '12px' }}>
                      <p style={{ color: 'white', fontWeight: 600, margin: '0 0 4px' }}>{deal.community} — {deal.builder}</p>
                      <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>{deal.description}</p>
                    </div>
                  ))}
                </div>
              )}
              <Callout>
                <strong style={{ color: 'white' }}>Month-end strategy:</strong> Builder sales teams have monthly and quarterly quotas. The last 5 business days of any month — especially March, June, September, and December — are when incentive offers peak. Contact Joe before month end for the best leverage.
              </Callout>
            </Section>

            <Section id="process" title="New Construction Buying Process in Leander TX">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Buying new construction is a different process than buying resale. Here's exactly how it works in Leander:
              </p>
              {[
                { step: '1', title: 'Get pre-approved', desc: 'Before visiting model homes, get a pre-approval from your lender. Builders require it before you can write a contract. Note: using the builder\'s preferred lender is often required to receive incentives.' },
                { step: '2', title: 'Register your agent', desc: 'Have Joe register as your agent before your first model home visit — in person or by email. Once you visit unregistered, you lose your representation at that builder\'s communities.' },
                { step: '3', title: 'Choose lot and plan', desc: 'Select your floor plan, lot, and elevation. On a dirt start, you\'ll also visit the design center to select finishes. Bring Joe — design center selections significantly affect resale value.' },
                { step: '4', title: 'Sign the builder contract', desc: 'Builder contracts heavily favor the builder. Joe reviews every page, flags one-sided clauses, and negotiates addenda before you sign. Expect a $5K–$15K earnest money deposit.' },
                { step: '5', title: 'Inspections during build', desc: 'Schedule a third-party inspector at pre-drywall and before closing. Builders\' inspectors work for the builder. Your inspector works for you.' },
                { step: '6', title: 'Final walkthrough & close', desc: 'The builder\'s rep will walk you through the completed home and create a punch list of items to fix before or after closing. Joe attends every final walkthrough.' },
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

            {/* FAQ */}
            <Section id="faq" title="New Construction FAQ — Leander TX">
              {faqSchema.mainEntity.map((q, i) => (
                <div key={i} className="card" style={{ marginBottom: '16px' }}>
                  <h3 style={{ color: 'white', margin: '0 0 10px', fontSize: '16px' }}>{q.name}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{q.acceptedAnswer.text}</p>
                </div>
              ))}
            </Section>

            {/* Internal Links */}
            <Section id="related" title="Explore More Leander Resources">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
                <NavLink href="/leander-neighborhoods" label="Leander Neighborhood Guide" />
                <NavLink href="/leander-isd-schools" label="Leander ISD Schools Guide" />
                <NavLink href="/property-tax-leander-tx" label="Property Tax Rates by Community" />
                <NavLink href="/leander-real-estate-market-2026" label="2026 Market Report" />
                <NavLink href="/buy-home-leander-tx" label="Buyer's Agent Guide" />
                <NavLink href="/moving-to-leander-tx" label="Moving to Leander Guide" />
              </div>
            </Section>

          </main>
        </div>

        {/* Bottom CTA */}
        <div className="card" style={{ textAlign: 'center', padding: '40px 24px', marginTop: '40px' }}>
          <h2 style={{ color: 'white', fontSize: '28px', marginBottom: '12px' }}>Ready to Find Your New Construction Home?</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '24px', maxWidth: '560px', margin: '0 auto 24px' }}>
            Joe Sanches is a local Leander expert with direct relationships at every major builder community. He'll get you the best deal — at no cost to you.
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
  let deals = [];
  try {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(process.cwd(), 'content', 'new-construction-deals.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    deals = JSON.parse(raw);
  } catch (e) {
    deals = [];
  }
  return {
    props: { deals },
    revalidate: 3600,
  };
}
