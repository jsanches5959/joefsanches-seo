import Head from 'next/head';
import Link from 'next/link';
import path from 'path';
import fs from 'fs';

const baseUrl = 'https://joefsanches.com';

// ─── Shared sub-components ──────────────────────────────────────────────────

function Section({ id, title, children }) {
  return (
    <section id={id} style={{ marginBottom: '48px' }}>
      <h2 style={{
        fontSize: '22px',
        color: 'white',
        margin: '0 0 20px',
        paddingBottom: '12px',
        borderBottom: '1px solid rgba(107,120,84,.2)',
        letterSpacing: '-0.01em'
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function QuickFactRow({ label, value }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: '10px 0',
      borderBottom: '1px solid rgba(107,120,84,.12)',
      gap: '16px'
    }}>
      <span style={{ color: 'var(--muted)', fontSize: '14px', flexShrink: 0 }}>{label}</span>
      <span style={{ color: 'white', fontSize: '14px', fontWeight: 600, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

function AmenityItem({ text }) {
  return (
    <li style={{
      color: 'var(--muted)',
      padding: '6px 0',
      fontSize: '15px',
      lineHeight: '1.5',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px'
    }}>
      <span style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }}>✓</span>
      {text}
    </li>
  );
}

function FaqBlock({ q, a, index }) {
  return (
    <div className="card" style={{ marginBottom: '12px' }}>
      <h3 style={{
        color: 'white',
        margin: '0 0 10px',
        fontSize: '16px',
        lineHeight: '1.4',
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-start'
      }}>
        <span style={{
          color: 'var(--accent)',
          fontWeight: 700,
          fontSize: '14px',
          background: 'rgba(107,120,84,.15)',
          borderRadius: '4px',
          padding: '2px 8px',
          flexShrink: 0,
          marginTop: '1px'
        }}>Q</span>
        {q}
      </h3>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <span style={{
          color: 'var(--accent-light)',
          fontWeight: 700,
          fontSize: '14px',
          background: 'rgba(154,170,127,.1)',
          borderRadius: '4px',
          padding: '2px 8px',
          flexShrink: 0
        }}>A</span>
        <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.75', margin: 0 }}>{a}</p>
      </div>
    </div>
  );
}

function InternalLink({ href, label }) {
  return (
    <Link href={href} className="card" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 18px',
      textDecoration: 'none'
    }}>
      <span style={{ color: 'var(--accent)', fontSize: '18px', flexShrink: 0 }}>→</span>
      <span style={{ color: 'var(--accent-light)', fontSize: '14px' }}>{label}</span>
    </Link>
  );
}

// ─── Page component ──────────────────────────────────────────────────────────

export default function NeighborhoodPage({ neighborhood }) {
  if (!neighborhood) return <div style={{ color: 'white', padding: '40px' }}>Neighborhood not found.</div>;

  const {
    slug, name, city, state, type, overview, taxRate, mudDistrict, hoa,
    schoolDistrict, elementarySchool, middleSchool, highSchool,
    commuteAustin, commuteDomain, medianPrice, priceRange,
    yearBuilt, amenities, builders, nearbyParks, lifestyle, faqs
  } = neighborhood;

  const title = `${name} ${city} TX | Homes, Schools & Community Guide | Joe Sanches`;
  const metaDesc = `${name} in ${city}, TX — complete neighborhood guide covering home prices, schools, property taxes, commute times, and amenities. Updated 2026. Joe Sanches, 512-663-8867.`;
  const canonicalUrl = `${baseUrl}/neighborhoods/${slug}`;
  const overviewSnippet = overview.slice(0, 150).trim() + '…';

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": metaDesc,
    "url": canonicalUrl,
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
    "mainEntity": faqs.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a }
    }))
  };

  const isLeander = city === 'Leander';
  const internalLinks = [
    ...(isLeander
      ? [{ href: '/new-construction-leander-tx', label: 'New Construction Homes in Leander TX — Current Inventory' }]
      : []),
    { href: '/neighborhoods', label: 'All Leander & Cedar Park Neighborhoods — Compare Side by Side' },
    { href: '/property-tax-leander-tx', label: 'Property Tax Guide: Leander TX & Cedar Park 2026' },
    { href: '/homes-for-sale-in-leander-tx', label: 'Homes for Sale in Leander TX — Current Listings' },
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Joe Sanches Realtor" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div className="container" style={{ paddingBottom: '120px' }}>

        {/* Floating contact bar */}
        <div className="floating-contact-bar">
          <a href="tel:5126638867" className="call-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call Joe
          </a>
          <a href="sms:5126638867" className="text-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
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
        <nav style={{ marginTop: '20px', fontSize: '13px', color: 'var(--muted)', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'var(--accent-light)' }}>Home</Link>
          <span>›</span>
          <Link href="/neighborhoods" style={{ color: 'var(--accent-light)' }}>Neighborhoods</Link>
          <span>›</span>
          <span>{name}, {city}</span>
        </nav>

        {/* Hero */}
        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px', textTransform: 'capitalize' }}>
            {type}
          </div>
          <h2 className="heroTitle">
            {name} {city} TX — Neighborhood Guide
          </h2>
          <p className="heroLead">{overviewSnippet}</p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">{city}, TX</span>
            <span className="pill">{schoolDistrict}</span>
            <span className="pill">{taxRate} Tax Rate</span>
            {mudDistrict && <span className="pill">MUD District</span>}
            <span className="pill">{priceRange}</span>
          </div>
        </div>

        {/* Main content + sidebar grid */}
        <div className="grid" style={{ marginTop: '0' }}>
          <main className="main">

            {/* Quick Facts */}
            <Section id="quick-facts" title="Quick Facts">
              <div className="card">
                <QuickFactRow label="Property Tax Rate (est. 2026)" value={taxRate} />
                <QuickFactRow label="MUD District" value={mudDistrict ? 'Yes — adds to base rate' : 'No MUD — lower tax burden'} />
                <QuickFactRow label="HOA Fee" value={hoa} />
                <QuickFactRow label="School District" value={schoolDistrict} />
                <QuickFactRow label="Median Home Price" value={medianPrice} />
                <QuickFactRow label="Price Range" value={priceRange} />
                <QuickFactRow label="Commute to Austin" value={commuteAustin} />
                <QuickFactRow label="Commute to the Domain" value={commuteDomain} />
                <QuickFactRow label="Year(s) Built" value={yearBuilt} />
              </div>
            </Section>

            {/* Overview */}
            <Section id="overview" title={`About ${name}`}>
              <p style={{ color: 'var(--muted)', lineHeight: '1.85', fontSize: '15px', margin: 0 }}>
                {overview}
              </p>
              <div style={{
                background: 'rgba(107,120,84,.08)',
                border: '1px solid rgba(107,120,84,.3)',
                borderLeft: '4px solid var(--accent)',
                borderRadius: '10px',
                padding: '16px 20px',
                marginTop: '24px',
                color: 'var(--muted)',
                fontSize: '14px',
                lineHeight: '1.75'
              }}>
                <strong style={{ color: 'white' }}>Lifestyle: </strong>{lifestyle}
              </div>
            </Section>

            {/* Schools */}
            <Section id="schools" title={`Schools Serving ${name}`}>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '16px', fontSize: '15px' }}>
                {name} is zoned to <strong style={{ color: 'white' }}>{schoolDistrict}</strong>. The following campuses serve this community:
              </p>
              <div className="card">
                {[
                  { level: 'Elementary', school: elementarySchool },
                  { level: 'Middle', school: middleSchool },
                  { level: 'High School', school: highSchool },
                ].map(({ level, school }) => (
                  <div key={level} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(107,120,84,.12)',
                    gap: '16px'
                  }}>
                    <span style={{
                      color: 'var(--accent-light)',
                      fontSize: '13px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      flexShrink: 0
                    }}>{level}</span>
                    <span style={{ color: 'white', fontSize: '15px', textAlign: 'right' }}>{school}</span>
                  </div>
                ))}
                <div style={{ padding: '12px 0 0', fontSize: '13px', color: 'var(--muted)' }}>
                  School zoning may change. Always verify current assignments at the district's official website before purchasing.
                </div>
              </div>
            </Section>

            {/* Amenities */}
            <Section id="amenities" title={`${name} Amenities`}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {amenities.map((item, i) => (
                  <AmenityItem key={i} text={item} />
                ))}
              </ul>
              {nearbyParks && nearbyParks.length > 0 && (
                <>
                  <h3 style={{ color: 'white', fontSize: '17px', margin: '28px 0 12px' }}>Nearby Parks</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {nearbyParks.map((park, i) => (
                      <AmenityItem key={i} text={park} />
                    ))}
                  </ul>
                </>
              )}
            </Section>

            {/* Price Range & Builders */}
            <Section id="pricing" title="Home Prices &amp; Builders">
              <div className="card">
                <QuickFactRow label="Price Range" value={priceRange} />
                <QuickFactRow label="Median Price" value={medianPrice} />
                <QuickFactRow label="Year(s) Built" value={yearBuilt} />
                <QuickFactRow label="Active Builders" value={builders.join(', ')} />
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.75', marginTop: '16px' }}>
                Prices reflect the current {city} market as of 2026 and fluctuate with interest rates, inventory, and builder incentives. Contact Joe for the current new construction price sheet or to pull resale comparables for any specific address.
              </p>
            </Section>

            {/* Commute */}
            <Section id="commute" title={`Commute Times from ${name}`}>
              <div className="card">
                <QuickFactRow label="To Downtown Austin" value={commuteAustin} />
                <QuickFactRow label="To the Domain / Apple Campus" value={commuteDomain} />
                <QuickFactRow label="Nearest Toll Road" value={city === 'Georgetown' ? 'I-35 / SH-130' : '183A Toll Road'} />
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.75', marginTop: '16px' }}>
                Commute times are estimates based on typical non-peak conditions. Peak morning commute (7:30–9:00 AM) can add 10–20 minutes. 183A toll charges apply; budget approximately $5–$8/day for a round-trip commute depending on entry/exit points.
              </p>
            </Section>

            {/* Property Tax */}
            <Section id="taxes" title={`Property Tax in ${name}`}>
              <div className="card">
                <QuickFactRow label="Combined Tax Rate (est. 2026)" value={taxRate} />
                <QuickFactRow label="MUD District" value={mudDistrict ? 'Yes — included in rate above' : 'No — this rate reflects no MUD overhead'} />
                <QuickFactRow label="School District" value={schoolDistrict} />
                <div style={{ padding: '14px 0 0' }}>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.75', margin: 0 }}>
                    {mudDistrict
                      ? `${name}'s MUD district finances the community's water, wastewater, and infrastructure. As bond debt matures over the next 10–20 years, the MUD portion of the tax rate will decrease. On a $${medianPrice.replace('$', '').replace(',000', 'K')} home after the $100,000 homestead exemption, expect approximately $${Math.round((parseFloat(taxRate) / 100) * (parseInt(medianPrice.replace(/[$,]/g, '')) - 100000) / 1000)}K–${Math.round((parseFloat(taxRate) / 100) * (parseInt(medianPrice.replace(/[$,]/g, '')) - 100000) / 1000) + 1}K per year in property taxes.`
                      : `${name} does not carry a MUD district, resulting in one of the more favorable tax rates in the ${city} market. On a $${medianPrice.replace('$', '').replace(',000', 'K')} home after the $100,000 homestead exemption, expect approximately $${Math.round((parseFloat(taxRate) / 100) * (parseInt(medianPrice.replace(/[$,]/g, '')) - 100000) / 1000)}K–${Math.round((parseFloat(taxRate) / 100) * (parseInt(medianPrice.replace(/[$,]/g, '')) - 100000) / 1000) + 1}K per year in property taxes.`
                    }
                  </p>
                </div>
              </div>
              <div style={{ marginTop: '16px' }}>
                <InternalLink href="/property-tax-leander-tx" label="Full Property Tax Guide: Every MUD District, Every Neighborhood Rate →" />
              </div>
            </Section>

            {/* FAQ */}
            <Section id="faq" title={`${name} — Frequently Asked Questions`}>
              {faqs.map((faq, i) => (
                <FaqBlock key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </Section>

            {/* Internal Links */}
            <Section id="related" title="Related Resources">
              <div style={{ display: 'grid', gap: '10px' }}>
                {internalLinks.map(({ href, label }) => (
                  <InternalLink key={href} href={href} label={label} />
                ))}
              </div>
            </Section>

          </main>

          {/* Sidebar */}
          <aside className="side" style={{ paddingTop: '56px' }}>
            <div style={{ position: 'sticky', top: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Contact card */}
              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--accent-light)', margin: '0 0 10px', fontSize: '15px' }}>
                  Explore Homes in {name}
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>
                  I specialize in {city} and can show you every active listing — resale and new construction — with full tax and school breakdowns.
                </p>
                <a href="tel:5126638867" className="btn accent" style={{ display: 'block', textAlign: 'center', padding: '12px', justifyContent: 'center' }}>
                  Call 512-663-8867
                </a>
                <a href={`mailto:hello@joefsanches.com?subject=Inquiry about ${name}`} className="btn" style={{ display: 'block', textAlign: 'center', padding: '12px', marginTop: '8px', justifyContent: 'center' }}>
                  Email Joe
                </a>
              </div>

              {/* Quick snapshot card */}
              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                <h3 style={{ color: 'white', margin: '0 0 14px', fontSize: '15px' }}>{name} At a Glance</h3>
                {[
                  ['City', `${city}, TX`],
                  ['Tax Rate', taxRate],
                  ['HOA', hoa],
                  ['Schools', schoolDistrict],
                  ['Price Range', priceRange],
                  ['MUD', mudDistrict ? 'Yes' : 'No'],
                ].map(([label, value]) => (
                  <div key={label} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(107,120,84,.1)',
                    padding: '8px 0',
                    fontSize: '13px',
                    gap: '8px'
                  }}>
                    <span style={{ color: 'var(--muted)', flexShrink: 0 }}>{label}</span>
                    <span style={{ color: 'white', fontWeight: 600, textAlign: 'right' }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Builders card */}
              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '15px' }}>Builders</h3>
                {builders.map((b) => (
                  <div key={b} style={{
                    borderBottom: '1px solid rgba(107,120,84,.1)',
                    padding: '8px 0',
                    fontSize: '13px',
                    color: 'var(--muted)'
                  }}>{b}</div>
                ))}
              </div>

            </div>
          </aside>
        </div>

        {/* Bottom CTA */}
        <div className="card" style={{
          marginTop: '56px',
          textAlign: 'center',
          background: 'rgba(107,120,84,.05)',
          borderColor: 'rgba(107,120,84,.2)',
          padding: '48px 32px'
        }}>
          <h2 style={{ color: 'white', margin: '0 0 12px', fontSize: '26px' }}>
            Ready to explore {name}? Call Joe: 512-663-8867
          </h2>
          <p style={{ color: 'var(--muted)', maxWidth: '60ch', margin: '0 auto 28px', lineHeight: '1.7' }}>
            I know every phase, every builder, and every street in {name}. I'll show you the homes that fit your budget and goals — no pressure, straight answers.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:5126638867" className="btn accent" style={{ padding: '14px 24px', fontSize: '15px' }}>
              Call / Text 512-663-8867
            </a>
            <a href="mailto:hello@joefsanches.com" className="btn" style={{ padding: '14px 24px', fontSize: '15px' }}>
              Email Joe
            </a>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '20px' }}>
            Joe Sanches — Licensed Realtor, Leander TX • Military Veteran • No pressure, straight answers
          </p>
        </div>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Joe Sanches Realtor • Leander, Texas</p>
          <p style={{ marginTop: '8px' }}>Phone: 512-663-8867 • Email: hello@joefsanches.com</p>
          <p style={{ marginTop: '8px', fontSize: '12px', opacity: 0.6 }}>
            Tax rates are estimates based on 2025–2026 published data. Verify at wcad.org before making financial decisions.
          </p>
        </footer>
      </div>
    </>
  );
}

// ─── Static generation ────────────────────────────────────────────────────────

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'content', 'neighborhoods.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const neighborhoods = JSON.parse(raw);

  const paths = neighborhoods.map((n) => ({
    params: { slug: n.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'content', 'neighborhoods.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const neighborhoods = JSON.parse(raw);

  const neighborhood = neighborhoods.find((n) => n.slug === params.slug) || null;

  if (!neighborhood) {
    return { notFound: true };
  }

  return {
    props: { neighborhood },
    revalidate: 3600,
  };
}

export const revalidate = 3600;
