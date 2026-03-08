import Head from 'next/head';
import Link from 'next/link';

const baseUrl = 'https://joefsanches.com';

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Leander TX Property Tax Rate 2026 — Complete Guide",
  "description": "The most comprehensive property tax resource for Leander TX and Cedar Park. Covers every MUD district, neighborhood tax rates, Williamson County exemptions, and city comparisons.",
  "url": `${baseUrl}/property-tax-leander-tx`,
  "author": {
    "@type": "Person",
    "name": "Joe Sanches",
    "url": baseUrl
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
      "name": "What is the property tax rate in Leander TX in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The combined property tax rate in Leander TX ranges from approximately 2.18% to 2.55% in 2026, depending on the subdivision and MUD district. Standard areas without a MUD run around 2.18%–2.30%, while MUD districts add 0.10%–0.40% on top."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Leander homestead exemption for 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Texas homeowners qualify for a $100,000 homestead exemption off their school district appraised value. This saves approximately $1,800–$2,500/year on a $400,000–$500,000 home."
      }
    },
    {
      "@type": "Question",
      "name": "Which Leander neighborhoods have the lowest property taxes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Older Leander neighborhoods without MUD districts (like Block House Creek and parts of Crystal Falls) carry the lowest combined rates, typically 2.18%–2.28%. Newer MUD-burdened communities like Bryson and Northline run 2.40%–2.55%."
      }
    },
    {
      "@type": "Question",
      "name": "Is Leander or Cedar Park cheaper for property taxes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cedar Park typically runs 2.10%–2.22%, which is slightly lower than Leander's 2.18%–2.55% range. On a $450,000 home, Cedar Park is often $400–$1,500/year cheaper depending on MUD status in Leander."
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

function TaxTable({ rows, headers }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
      <table style={{
        width: '100%', borderCollapse: 'collapse',
        fontSize: '14px', color: '#E0E5D8'
      }}>
        <thead>
          <tr>
            {headers.map(h => (
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
              {row.map((cell, j) => (
                <td key={j} style={{
                  padding: '10px 14px',
                  fontWeight: j === 0 ? 600 : 400,
                  color: j === 0 ? 'white' : '#E0E5D8'
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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

export default function PropertyTaxHub() {
  return (
    <>
      <Head>
        <title>Leander TX Property Tax Rate 2026 — Complete Hub | Joe Sanches Realtor</title>
        <meta name="description" content="The most comprehensive property tax guide for Leander TX and Cedar Park. Every MUD district, neighborhood tax rate, 2026 Williamson County exemptions, and city-by-city comparisons." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/property-tax-leander-tx`} />
        <meta property="og:title" content="Leander TX Property Tax Rate 2026 — Complete Guide" />
        <meta property="og:description" content="Every MUD district, neighborhood tax rate, and 2026 exemption in Leander TX and Cedar Park. The most detailed property tax resource in the Austin metro." />
        <meta property="og:url" content={`${baseUrl}/property-tax-leander-tx`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
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
          <span>Property Tax Guide — Leander TX</span>
        </nav>

        {/* Hero */}
        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Updated March 2026</div>
          <h2 className="heroTitle">Leander TX Property Tax Rate 2026: The Complete Guide</h2>
          <p className="heroLead">
            Every MUD district. Every neighborhood rate. Every exemption. Every city comparison. 
            This is the most comprehensive property tax resource for Leander, Cedar Park, and Williamson County — built for buyers, sellers, and homeowners who want straight answers.
          </p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">Leander TX</span>
            <span className="pill">Cedar Park</span>
            <span className="pill">Williamson County</span>
            <span className="pill">2026 Rates</span>
            <span className="pill">MUD Districts</span>
            <span className="pill">All Exemptions</span>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="card" style={{ marginTop: '32px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: 'var(--accent-light)' }}>On This Page</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
            <NavLink href="#base-rates" label="2026 Base Tax Rates" />
            <NavLink href="#mud-districts" label="MUD District Breakdown" />
            <NavLink href="#neighborhoods" label="Neighborhood-by-Neighborhood Rates" />
            <NavLink href="#exemptions" label="All 2026 Williamson County Exemptions" />
            <NavLink href="#calculator" label="Estimate Your Tax Bill" />
            <NavLink href="#city-comparisons" label="Leander vs Other Cities" />
            <NavLink href="#protest" label="How to Protest Your Appraisal" />
            <NavLink href="#faq" label="Frequently Asked Questions" />
            <NavLink href="#related" label="Related Resources" />
          </div>
        </div>

        <div className="grid" style={{ marginTop: '0' }}>
          <main className="main">

            {/* Section 1: Base Rates */}
            <Section id="base-rates" title="2026 Property Tax Rates in Leander TX">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Leander's combined property tax rate is made up of several overlapping jurisdictions: city, county, school district, and any applicable special districts. Here's how the base rate breaks down.
              </p>
              <TaxTable
                headers={['Taxing Jurisdiction', '2025–2026 Rate', 'Notes']}
                rows={[
                  ['Leander ISD', '1.0392%', 'Largest single component; covers both Leander and Cedar Park'],
                  ['City of Leander', '0.4138%', 'Municipal services, roads, police, parks'],
                  ['Williamson County', '0.3144%', 'County services, courts, sheriff'],
                  ['Williamson County ESD #2', '0.0622%', 'Emergency services district'],
                  ['Road District', '~0.02%', 'Where applicable'],
                  ['Base Total (no MUD)', '~2.18%–2.30%', 'Standard Leander rate without MUD'],
                ]}
              />
              <Callout>
                <strong style={{ color: 'white' }}>Important:</strong> These are estimated 2025–2026 rates based on published WCAD and City of Leander data. Individual rates are set each September and may vary slightly. Always verify at <strong style={{ color: 'var(--accent-light)' }}>wcad.org</strong> for your specific parcel.
              </Callout>
            </Section>

            {/* Section 2: MUD Districts */}
            <Section id="mud-districts" title="MUD Districts in Leander TX: What They Are and What They Cost">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Municipal Utility Districts (MUDs) are special taxing entities created to fund infrastructure — water, sewer, drainage — in newly developed areas. Builders use MUDs to finance infrastructure bonds that homeowners then repay through their property taxes. They are the single biggest source of tax variation between Leander neighborhoods.
              </p>
              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>How MUD Taxes Work</h3>
              <ul style={{ color: 'var(--muted)', lineHeight: '2', paddingLeft: '20px', marginBottom: '24px' }}>
                <li>MUD taxes are levied in addition to city, county, and school district taxes</li>
                <li>Rates range from <strong style={{ color: 'white' }}>0.10% to 0.40%</strong> depending on the MUD's outstanding bond debt</li>
                <li>As bonds are paid off (typically 15–30 years), the MUD rate declines and eventually disappears</li>
                <li>Newer communities have higher MUD rates; established communities have lower or no MUD rates</li>
                <li>MUD boundaries don't always match neighborhood boundaries — verify by address</li>
              </ul>
              <TaxTable
                headers={['MUD District', 'Approx. Rate', 'Primary Neighborhoods Served', 'Est. Bond Payoff']}
                rows={[
                  ['Williamson County MUD #22', '~0.35%', 'Bryson (northern sections)', '2038–2042'],
                  ['Williamson County MUD #19', '~0.30%', 'Northline, east sections', '2036–2040'],
                  ['Williamson County MUD #25', '~0.28%', 'Deerbrooke', '2037–2041'],
                  ['Williamson County MUD #18', '~0.25%', 'Larkspur (newer phases)', '2035–2039'],
                  ['Williamson County MUD #15', '~0.20%', 'Crystal Falls (later phases)', '2030–2034'],
                  ['Williamson County MUD #12', '~0.15%', 'Travisso', '2032–2036'],
                  ['Williamson County MUD #8', '~0.12%', 'Horizon Lake area', '2028–2032'],
                  ['No MUD', '—', 'Block House Creek, older Leander, Caballo Ranch (parts)', 'N/A'],
                ]}
              />
              <Callout>
                <strong style={{ color: 'white' }}>Buyer tip:</strong> Always ask "Is this home in a MUD district?" before writing an offer. On a $450,000 home, a 0.35% MUD adds <strong style={{ color: 'white' }}>$1,575/year ($131/month)</strong> to your tax bill — money that could go toward your mortgage principal instead.
              </Callout>
            </Section>

            {/* Section 3: Neighborhoods */}
            <Section id="neighborhoods" title="Neighborhood Property Tax Rate Breakdown">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '24px' }}>
                Here's how the combined tax rate looks for each major Leander and Cedar Park neighborhood, accounting for base rate plus any applicable MUD or special district taxes.
              </p>

              {/* Travisso */}
              <div className="card" style={{ marginBottom: '20px' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '18px' }}>Travisso</h3>
                <TaxTable
                  headers={['Component', 'Rate']}
                  rows={[
                    ['Base (city + county + LISD)', '~2.22%'],
                    ['MUD #12', '~0.12%'],
                    ['Combined Estimated Rate', '~2.34%'],
                    ['Annual Tax on $500K Home (after homestead)', '~$9,360'],
                    ['Monthly', '~$780'],
                  ]}
                />
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                  Travisso is a luxury master-planned community with a relatively modest MUD compared to newer developments. The Hill Country setting commands a price premium, but the tax rate is manageable for its tier. Homes here typically start at $600K+. <Link href="/posts/pros-and-cons-of-living-in-crystal-falls-leander" style={{ color: 'var(--accent-light)' }}>Related: Crystal Falls guide →</Link>
                </p>
              </div>

              {/* Crystal Falls */}
              <div className="card" style={{ marginBottom: '20px' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '18px' }}>Crystal Falls</h3>
                <TaxTable
                  headers={['Component', 'Rate']}
                  rows={[
                    ['Base (city + county + LISD)', '~2.22%'],
                    ['MUD #15 (later phases only)', '~0.08%–0.20%'],
                    ['Combined Estimated Rate', '~2.22%–2.42%'],
                    ['Annual Tax on $450K Home (after homestead)', '~$7,770–$8,470'],
                    ['Monthly', '~$647–$706'],
                  ]}
                />
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                  Crystal Falls is a large community — tax rates vary significantly depending on which phase you're in. Original sections built before 2005 often have no MUD. Sections built after 2015 may carry MUD #15. Always verify the specific address. Golf course access and strong resale history make this one of Leander's most desirable communities.
                </p>
              </div>

              {/* Bryson */}
              <div className="card" style={{ marginBottom: '20px' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '18px' }}>Bryson</h3>
                <TaxTable
                  headers={['Component', 'Rate']}
                  rows={[
                    ['Base (city + county + LISD)', '~2.22%'],
                    ['MUD #22', '~0.35%'],
                    ['Combined Estimated Rate', '~2.57%'],
                    ['Annual Tax on $450K Home (after homestead)', '~$8,995'],
                    ['Monthly', '~$750'],
                  ]}
                />
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                  Bryson carries one of Leander's higher MUD rates due to its newer infrastructure. The community amenities are excellent (resort pool, fitness center, dog park), but buyers should factor the full tax burden before comparing to older neighborhoods. MUD bonds projected to mature in the late 2030s.
                </p>
              </div>

              {/* Larkspur */}
              <div className="card" style={{ marginBottom: '20px' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '18px' }}>Larkspur</h3>
                <TaxTable
                  headers={['Component', 'Rate']}
                  rows={[
                    ['Base (city + county + LISD)', '~2.22%'],
                    ['MUD #18 (newer phases)', '~0.20%–0.28%'],
                    ['Combined Estimated Rate', '~2.42%–2.50%'],
                    ['Annual Tax on $420K Home (after homestead)', '~$7,644–$7,896'],
                    ['Monthly', '~$637–$658'],
                  ]}
                />
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                  Larkspur offers a good balance of newer construction and mid-range MUD rates. Popular with families given its proximity to Leander ISD schools and 183A access.
                </p>
              </div>

              {/* Northline */}
              <div className="card" style={{ marginBottom: '20px' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '18px' }}>Northline</h3>
                <TaxTable
                  headers={['Component', 'Rate']}
                  rows={[
                    ['Base (city + county + LISD)', '~2.22%'],
                    ['MUD #19', '~0.30%'],
                    ['Combined Estimated Rate', '~2.52%'],
                    ['Annual Tax on $450K Home (after homestead)', '~$8,820'],
                    ['Monthly', '~$735'],
                  ]}
                />
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                  Northline is Leander's urban-style mixed-use development near the MetroRail station. Higher MUD rate offset by walkability, retail access, and train connectivity to downtown Austin. Popular with younger buyers and commuters.
                </p>
              </div>

              {/* Deerbrooke */}
              <div className="card" style={{ marginBottom: '20px' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '18px' }}>Deerbrooke</h3>
                <TaxTable
                  headers={['Component', 'Rate']}
                  rows={[
                    ['Base (city + county + LISD)', '~2.22%'],
                    ['MUD #25', '~0.28%'],
                    ['Combined Estimated Rate', '~2.50%'],
                    ['Annual Tax on $430K Home (after homestead)', '~$8,255'],
                    ['Monthly', '~$688'],
                  ]}
                />
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                  Deerbrooke is one of Leander's newer master-planned communities. Still building out, which means MUD rates are near their peak. Buyers who purchase now will benefit as bonds are paid down over the next 15+ years.
                </p>
              </div>

              {/* Caballo Ranch */}
              <div className="card" style={{ marginBottom: '20px' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '18px' }}>Caballo Ranch</h3>
                <TaxTable
                  headers={['Component', 'Rate']}
                  rows={[
                    ['Base (city + county + LISD)', '~2.22%'],
                    ['MUD (where applicable)', '~0.10%–0.18%'],
                    ['Combined Estimated Rate', '~2.22%–2.40%'],
                    ['Annual Tax on $400K Home (after homestead)', '~$6,660–$7,200'],
                    ['Monthly', '~$555–$600'],
                  ]}
                />
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                  Caballo Ranch is a Cedar Park/Leander border community with relatively modest tax exposure. Some sections fall within Cedar Park's jurisdiction rather than Leander's — which can affect the city component of the rate. Verify the exact address.
                </p>
              </div>

              {/* Block House Creek */}
              <div className="card" style={{ marginBottom: '20px' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '18px' }}>Block House Creek (Cedar Park)</h3>
                <TaxTable
                  headers={['Component', 'Rate']}
                  rows={[
                    ['Leander ISD', '~1.04%'],
                    ['City of Cedar Park', '~0.3788%'],
                    ['Williamson County', '~0.3144%'],
                    ['No MUD', '—'],
                    ['Combined Estimated Rate', '~2.10%–2.18%'],
                    ['Annual Tax on $420K Home (after homestead)', '~$6,614–$6,866'],
                    ['Monthly', '~$551–$572'],
                  ]}
                />
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                  Block House Creek is one of the best property tax values in the greater Leander area. Established infrastructure means no MUD, Cedar Park's slightly lower city rate, and still within Leander ISD. Popular with families who want top schools at a lower tax cost.
                </p>
              </div>
            </Section>

            {/* Section 4: Exemptions */}
            <Section id="exemptions" title="2026 Williamson County Property Tax Exemptions">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '24px' }}>
                Texas offers several property tax exemptions that can substantially reduce your annual bill. Here's every exemption available to Williamson County homeowners in 2026, with specific savings estimates.
              </p>

              <div className="card" style={{ marginBottom: '16px' }}>
                <h3 style={{ color: 'white', margin: '0 0 8px', fontSize: '18px' }}>General Homestead Exemption</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px' }}>
                  The most important exemption. Removes <strong style={{ color: 'white' }}>$100,000</strong> from your school district (Leander ISD) taxable value. This is the 2023 legislative increase from the previous $40,000.
                </p>
                <TaxTable
                  headers={['Home Value', 'Taxable After Exemption', 'Est. Annual Savings']}
                  rows={[
                    ['$350,000', '$250,000', '~$1,039/yr'],
                    ['$400,000', '$300,000', '~$1,039/yr'],
                    ['$500,000', '$400,000', '~$1,039/yr'],
                    ['$600,000', '$500,000', '~$1,039/yr'],
                  ]}
                />
                <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0 }}>
                  <strong style={{ color: 'white' }}>How to apply:</strong> File Form 50-114 with WCAD between Jan 1 – April 30. File once; it renews automatically. Must own and occupy as primary residence as of January 1.
                </p>
              </div>

              <div className="card" style={{ marginBottom: '16px' }}>
                <h3 style={{ color: 'white', margin: '0 0 8px', fontSize: '18px' }}>Over-65 Exemption + Tax Ceiling</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px' }}>
                  Homeowners 65+ receive an additional <strong style={{ color: 'white' }}>$10,000</strong> exemption on school district taxes. More importantly, your school district tax bill is <strong style={{ color: 'white' }}>frozen</strong> — it cannot increase as long as you own and live in the home, even if values rise.
                </p>
                <ul style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '2', paddingLeft: '20px', margin: '0 0 12px' }}>
                  <li>Additional $10,000 off school district taxable value</li>
                  <li>School district tax permanently frozen at year of filing</li>
                  <li>Surviving spouse (55+) can continue the freeze</li>
                  <li>Applies automatically when you turn 65 mid-year for that full tax year</li>
                </ul>
              </div>

              <div className="card" style={{ marginBottom: '16px' }}>
                <h3 style={{ color: 'white', margin: '0 0 8px', fontSize: '18px' }}>Disabled Person Exemption</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                  Same $10,000 additional exemption and tax ceiling as the over-65 exemption, available to homeowners with a qualifying disability under the Social Security Act. Cannot be combined with the over-65 exemption — claim whichever benefits you more.
                </p>
              </div>

              <div className="card" style={{ marginBottom: '16px' }}>
                <h3 style={{ color: 'white', margin: '0 0 8px', fontSize: '18px' }}>100% Disabled Veteran Exemption</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px' }}>
                  Veterans rated 100% disabled by the VA receive a <strong style={{ color: 'white' }}>complete property tax exemption</strong> — $0 property tax on their primary residence. This applies across all taxing units including city, county, and school district.
                </p>
                <TaxTable
                  headers={['VA Disability Rating', 'Exemption Amount']}
                  rows={[
                    ['100% (or Unemployable)', 'Full exemption — $0 property tax'],
                    ['70–99%', '$12,000 off appraised value'],
                    ['50–69%', '$10,000 off appraised value'],
                    ['30–49%', '$7,500 off appraised value'],
                    ['10–29%', '$5,000 off appraised value'],
                  ]}
                />
                <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0 }}>
                  Surviving spouses of 100% disabled veterans may qualify to maintain the exemption. Contact WCAD for documentation requirements.
                </p>
              </div>

              <div className="card" style={{ marginBottom: '16px' }}>
                <h3 style={{ color: 'white', margin: '0 0 8px', fontSize: '18px' }}>Agricultural (1-d-1 Open Space) Valuation</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                  Qualifying agricultural land is taxed on <strong style={{ color: 'white' }}>productivity value</strong> rather than market value — typically reducing the taxable value by 70–90%. Applies to acreage actively used for farming, ranching, wildlife management, or timber. Relevant for larger rural properties on the Leander/Liberty Hill fringe.
                </p>
              </div>

              <Callout>
                <strong style={{ color: 'white' }}>File with WCAD:</strong> Williamson Central Appraisal District — 625 FM 1460, Georgetown TX 78626 — wcad.org — Deadline: April 30 annually for the current tax year.
              </Callout>
            </Section>

            {/* Section 5: Calculator */}
            <Section id="calculator" title="Estimate Your 2026 Property Tax Bill">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                Use this quick formula to estimate your annual property tax in Leander or Cedar Park.
              </p>
              <div className="card" style={{ marginBottom: '20px' }}>
                <h3 style={{ color: 'white', margin: '0 0 16px', fontSize: '17px' }}>The Formula</h3>
                <div style={{ background: 'rgba(107,120,84,.1)', borderRadius: '8px', padding: '16px', fontFamily: 'monospace', fontSize: '15px', color: 'white', marginBottom: '16px' }}>
                  (Appraised Value − $100,000 homestead) × Combined Rate = Annual Tax
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>The $100,000 deduction applies only to the school district (LISD) portion. For a quick estimate, subtract it from your full appraised value before multiplying.</p>
              </div>
              <TaxTable
                headers={['Home Value', 'After Homestead', 'No MUD (2.22%)', 'With MUD 0.20%', 'With MUD 0.35%']}
                rows={[
                  ['$350,000', '$250,000', '$5,550/yr', '$6,050/yr', '$6,425/yr'],
                  ['$400,000', '$300,000', '$6,660/yr', '$7,260/yr', '$7,710/yr'],
                  ['$450,000', '$350,000', '$7,770/yr', '$8,470/yr', '$8,995/yr'],
                  ['$500,000', '$400,000', '$8,880/yr', '$9,680/yr', '$10,280/yr'],
                  ['$600,000', '$500,000', '$11,100/yr', '$12,100/yr', '$12,850/yr'],
                  ['$700,000', '$600,000', '$13,320/yr', '$14,520/yr', '$15,420/yr'],
                ]}
              />
              <Callout>
                These are estimates. Your actual bill depends on your specific taxing jurisdictions. Pull your exact rate at <strong style={{ color: 'var(--accent-light)' }}>wcad.org</strong> → Property Search → enter your address → view tax rate breakdown.
              </Callout>
            </Section>

            {/* Section 6: City Comparisons */}
            <Section id="city-comparisons" title="Leander Property Tax vs Other Austin-Area Cities">

              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>Leander vs Cedar Park</h3>
              <TaxTable
                headers={['', 'Leander (no MUD)', 'Leander (MUD 0.30%)', 'Cedar Park (no MUD)']}
                rows={[
                  ['Combined Rate', '~2.22%', '~2.52%', '~2.12%'],
                  ['On $450K (after homestead)', '$7,770/yr', '$8,820/yr', '$7,420/yr'],
                  ['Monthly Difference', '—', '+$87.50 vs base', '−$29/mo vs Leander base'],
                  ['School District', 'Leander ISD', 'Leander ISD', 'Leander ISD'],
                  ['City Rate', '0.4138%', '0.4138%', '0.3788%'],
                ]}
              />
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.8', marginBottom: '32px' }}>
                Cedar Park runs slightly cheaper than base Leander and significantly cheaper than MUD-burdened Leander neighborhoods. Both share Leander ISD. Cedar Park has more established infrastructure with fewer active MUD districts. <Link href="/posts/cedar-park-vs-leander-property-tax-real-numbers-2026" style={{ color: 'var(--accent-light)' }}>Full Cedar Park vs Leander comparison →</Link>
              </p>

              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>Leander vs Round Rock</h3>
              <TaxTable
                headers={['', 'Leander (no MUD)', 'Round Rock']}
                rows={[
                  ['Combined Rate', '~2.22%', '~1.90%–2.05%'],
                  ['School District', 'Leander ISD', 'Round Rock ISD or Pflugerville ISD'],
                  ['On $450K (after homestead)', '$7,770/yr', '$6,650–$7,175/yr'],
                  ['Annual Savings vs Leander', '—', '$595–$1,120/yr cheaper'],
                ]}
              />
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.8', marginBottom: '32px' }}>
                Round Rock runs notably cheaper than Leander — often $600–$1,100/year on a comparable home. The trade-off: Round Rock ISD is solid but generally doesn't rank as high as Leander ISD, and the commute patterns favor different parts of Austin.
              </p>

              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>Leander vs Pflugerville</h3>
              <TaxTable
                headers={['', 'Leander (no MUD)', 'Pflugerville']}
                rows={[
                  ['Combined Rate', '~2.22%', '~2.10%–2.30%'],
                  ['School District', 'Leander ISD', 'Pflugerville ISD'],
                  ['On $450K (after homestead)', '$7,770/yr', '$7,350–$8,050/yr'],
                  ['Location', 'NW Austin', 'NE Austin'],
                ]}
              />
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.8', marginBottom: '32px' }}>
                Pflugerville's tax rate is comparable to base Leander. The bigger distinction is location — they serve opposite sides of the metro. Pflugerville is better for I-35 and east Austin commuters; Leander is better for 183A and north Austin commuters. <Link href="/posts/leander-vs-pflugerville-real-estate-2026" style={{ color: 'var(--accent-light)' }}>Full Leander vs Pflugerville comparison →</Link>
              </p>

              <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '16px' }}>Leander vs Hutto</h3>
              <TaxTable
                headers={['', 'Leander (no MUD)', 'Hutto']}
                rows={[
                  ['Combined Rate', '~2.22%', '~2.40%–2.65%'],
                  ['School District', 'Leander ISD', 'Hutto ISD'],
                  ['On $450K (after homestead)', '$7,770/yr', '$8,400–$9,275/yr'],
                  ['Annual Cost vs Leander', '—', '$630–$1,505/yr more'],
                ]}
              />
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.8', marginBottom: '16px' }}>
                Hutto tends to run higher than Leander, driven by aggressive new development infrastructure and MUD districts throughout the city. Hutto ISD is growing but smaller than Leander ISD. For buyers attracted to Hutto's lower home prices, the higher tax rate often offsets much of the savings.
              </p>

              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                <h3 style={{ color: 'var(--accent-light)', margin: '0 0 12px', fontSize: '16px' }}>Summary: Austin-Area Tax Rate Ranking (Low to High)</h3>
                <TaxTable
                  headers={['City', 'Approx. Combined Rate', 'Relative Cost']}
                  rows={[
                    ['Round Rock', '~1.90%–2.05%', '✓ Lowest'],
                    ['Cedar Park', '~2.10%–2.22%', '✓ Low'],
                    ['Leander (no MUD)', '~2.18%–2.30%', '— Mid'],
                    ['Pflugerville', '~2.10%–2.30%', '— Mid'],
                    ['Leander (with MUD)', '~2.40%–2.57%', '↑ Higher'],
                    ['Hutto', '~2.40%–2.65%', '↑ Higher'],
                  ]}
                />
              </div>
            </Section>

            {/* Section 7: Protest */}
            <Section id="protest" title="How to Protest Your Williamson County Property Tax Appraisal">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                If WCAD's appraisal of your home is higher than market value, you have the right to protest — and winning is more common than most homeowners realize.
              </p>
              <h3 style={{ fontSize: '19px', color: 'white', marginBottom: '12px' }}>Step-by-Step Process</h3>
              <ol style={{ color: 'var(--muted)', lineHeight: '2.2', paddingLeft: '24px', marginBottom: '24px' }}>
                <li><strong style={{ color: 'white' }}>Receive your Notice of Appraised Value</strong> — WCAD mails these in April. You have until <strong style={{ color: 'white' }}>May 15</strong> (or 30 days after notice, whichever is later) to file a protest.</li>
                <li><strong style={{ color: 'white' }}>File your protest online</strong> at wcad.org or submit Form 50-132 by mail. State your grounds: "Value is over market value" and/or "Unequal appraisal."</li>
                <li><strong style={{ color: 'white' }}>Gather comparable sales</strong> — Find 3–5 homes that sold in the last 12 months near yours with similar square footage, age, and condition but lower assessed values. MLS data, Zillow, or HAR.com work.</li>
                <li><strong style={{ color: 'white' }}>Attend the informal hearing</strong> — A WCAD appraiser will review your evidence and often settle before a formal ARB hearing. Come prepared with printed comps.</li>
                <li><strong style={{ color: 'white' }}>Request a formal ARB hearing</strong> if the informal offer is unsatisfactory. The Appraisal Review Board is independent of WCAD.</li>
                <li><strong style={{ color: 'white' }}>Consider binding arbitration or district court</strong> for high-value homes where the potential savings justify the cost.</li>
              </ol>
              <Callout>
                <strong style={{ color: 'white' }}>Evidence that wins protests:</strong> Recent sales of comparable homes at lower values, photos of deferred maintenance or condition issues, repair estimates, an independent appraisal, or proof that similar homes in your neighborhood are assessed lower (unequal appraisal argument).
              </Callout>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8' }}>
                <Link href="/posts/how-to-protest-your-2026-property-taxes-in-williamson-county-a-step-by-step-guide" style={{ color: 'var(--accent-light)' }}>
                  Full protest guide with scripts and templates →
                </Link>
              </p>
            </Section>

            {/* Section 8: FAQ */}
            <Section id="faq" title="Frequently Asked Questions">
              {[
                {
                  q: 'What is the property tax rate in Leander TX in 2026?',
                  a: 'The combined rate ranges from approximately 2.18% to 2.57% depending on the neighborhood and MUD district. Base rate without a MUD is around 2.18%–2.30%. Add 0.10%–0.40% for MUD-burdened communities like Bryson, Northline, and Deerbrooke.'
                },
                {
                  q: 'How do I find out if my home is in a MUD district?',
                  a: 'Go to wcad.org, search your property address, and view the tax rate breakdown by jurisdiction. Any "MUD" or "Utility District" line item confirms you\'re in a MUD. You can also call WCAD at (512) 930-3787.'
                },
                {
                  q: 'When is the homestead exemption deadline in Texas?',
                  a: 'April 30 of the tax year you\'re applying for. If you bought your home in 2024 and haven\'t filed, you can still file for 2025. The exemption applies from the year you file forward.'
                },
                {
                  q: 'Does the homestead exemption apply to Cedar Park homes?',
                  a: 'Yes. Cedar Park is in Williamson County and within Leander ISD. The $100,000 homestead exemption applies to all qualifying Texas homeowners regardless of city.'
                },
                {
                  q: 'Can I protest my property taxes every year?',
                  a: 'Yes. You can protest annually. If your home\'s appraised value increases, file a protest before May 15. You don\'t need a professional service to do it — many homeowners win with basic comp research.'
                },
                {
                  q: 'Do property taxes change when I buy a home?',
                  a: 'The new owner must re-file for the homestead exemption after purchase. WCAD may also update the appraised value based on the sale price in the year following purchase. Budget for a potential first-year increase if the home was previously owner-occupied with a frozen value.'
                },
              ].map(({ q, a }, i) => (
                <div key={i} className="card" style={{ marginBottom: '12px' }}>
                  <h3 style={{ color: 'white', margin: '0 0 8px', fontSize: '16px' }}>{q}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{a}</p>
                </div>
              ))}
            </Section>

            {/* Section 9: Related Resources */}
            <Section id="related" title="Related Property Tax Resources">
              <div style={{ display: 'grid', gap: '12px' }}>
                {[
                  { href: '/posts/cedar-park-vs-leander-property-tax-real-numbers-2026', label: 'Cedar Park vs Leander: What a $450K Home Actually Costs You' },
                  { href: '/posts/leander-tx-property-tax-rate-2026', label: 'Leander TX Property Tax Rate 2026 — Deep Dive' },
                  { href: '/posts/williamson-county-property-tax-exemptions-2026', label: 'All Williamson County Exemptions for 2026' },
                  { href: '/posts/how-to-protest-your-2026-property-taxes-in-williamson-county-a-step-by-step-guide', label: 'Step-by-Step: How to Protest Your Williamson County Taxes' },
                  { href: '/posts/homestead-exemption-leander-tx-2026', label: 'Homestead Exemption in Leander TX 2026' },
                  { href: '/posts/leander-property-tax-trends-2023-vs-2026-what-homeowners-need-to-know', label: 'Leander Property Tax Trends: 2023 vs 2026' },
                  { href: '/posts/top-5-leander-neighborhoods-with-the-lowest-property-tax-rates-in-2026', label: 'Top 5 Leander Neighborhoods With the Lowest Property Tax Rates' },
                  { href: '/posts/how-mud-taxes-affect-your-total-leander-property-tax-bill', label: 'How MUD Taxes Affect Your Total Leander Tax Bill' },
                  { href: '/posts/williamson-county-vs-travis-county-which-side-of-leander-saves-you-more-in-taxes', label: 'Williamson County vs Travis County: Which Side Saves More?' },
                  { href: '/posts/leander-property-tax-calculator-estimate-your-2026-payments', label: 'Leander Property Tax Calculator — Estimate Your Payments' },
                ].map(({ href, label }) => (
                  <Link key={href} href={href} className="card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px' }}>
                    <span style={{ color: 'var(--accent)', fontSize: '18px' }}>→</span>
                    <span style={{ color: 'var(--accent-light)', fontSize: '14px' }}>{label}</span>
                  </Link>
                ))}
              </div>
            </Section>

          </main>

          {/* Sidebar */}
          <aside className="side" style={{ paddingTop: '56px' }}>
            <div style={{ position: 'sticky', top: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--accent-light)', margin: '0 0 10px', fontSize: '15px' }}>Get Your Exact Tax Rate</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>
                  Before you make an offer, I'll pull the complete tax breakdown for any home — including MUD status, exemption eligibility, and 5-year trend.
                </p>
                <a href="tel:5126638867" className="btn accent" style={{ display: 'block', textAlign: 'center', padding: '12px', justifyContent: 'center' }}>
                  Call 512-663-8867
                </a>
                <a href="mailto:hello@joefsanches.com?subject=Property Tax Question" className="btn" style={{ display: 'block', textAlign: 'center', padding: '12px', marginTop: '8px', justifyContent: 'center' }}>
                  Email Joe
                </a>
              </div>

              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '15px' }}>Quick Rates Reference</h3>
                {[
                  ['Travisso', '~2.34%'],
                  ['Crystal Falls', '~2.22%–2.42%'],
                  ['Bryson', '~2.57%'],
                  ['Larkspur', '~2.42%–2.50%'],
                  ['Northline', '~2.52%'],
                  ['Deerbrooke', '~2.50%'],
                  ['Caballo Ranch', '~2.22%–2.40%'],
                  ['Block House Creek', '~2.10%–2.18%'],
                ].map(([n, r]) => (
                  <div key={n} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(107,120,84,.1)', padding: '8px 0', fontSize: '13px' }}>
                    <span style={{ color: 'var(--muted)' }}>{n}</span>
                    <span style={{ color: 'white', fontWeight: 600 }}>{r}</span>
                  </div>
                ))}
              </div>

              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '15px' }}>Key Deadlines 2026</h3>
                {[
                  ['Jan 1', 'Ownership date for exemptions'],
                  ['Apr 30', 'Exemption filing deadline'],
                  ['May 15', 'Protest filing deadline'],
                  ['Jul–Aug', 'ARB hearings'],
                  ['Oct 1', 'Tax bills mailed'],
                  ['Jan 31', 'Taxes due (no penalty)'],
                ].map(([d, l]) => (
                  <div key={d} style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(107,120,84,.1)', padding: '8px 0', fontSize: '13px' }}>
                    <span style={{ color: 'var(--accent-light)', fontWeight: 700, minWidth: '52px' }}>{d}</span>
                    <span style={{ color: 'var(--muted)' }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Footer CTA */}
        <div className="card" style={{ marginTop: '56px', textAlign: 'center', background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)', padding: '48px 32px' }}>
          <h2 style={{ color: 'white', margin: '0 0 12px', fontSize: '26px' }}>Questions About Your Specific Property?</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '60ch', margin: '0 auto 28px', lineHeight: '1.7' }}>
            I pull exact tax breakdowns for every home I show — MUD status, exemption eligibility, protest history. Get the real number before you commit.
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
          <p style={{ marginTop: '8px', fontSize: '12px', opacity: 0.6 }}>
            Tax rates are estimates based on 2025–2026 published WCAD and jurisdiction data. Verify at wcad.org before making financial decisions.
          </p>
        </footer>
      </div>
    </>
  );
}
