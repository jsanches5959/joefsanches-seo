import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://joefsanches.com';
const BUILDER = 'KB Home';
const COMMUNITY = 'Bryson';

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "KB Home in Leander TX | Bryson Community | Joe Sanches",
  "description": "Browse KB Home new construction in Leander TX — Bryson community. Built-to-order, ENERGY STAR certified, $320K–$450K, 4–6 month build. Free buyer's agent.",
  "url": `${baseUrl}/kb-home-leander-tx`,
  "author": { "@type": "Person", "name": "Joe Sanches", "url": baseUrl },
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
      "name": "How does KB Home's built-to-order process work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "KB Home's built-to-order process starts with choosing a floor plan and lot from available inventory in Bryson. You then visit the KB Home Design Studio in Austin where you select cabinets, countertops, flooring, fixtures, and exterior options. Construction begins after design selections are finalized and the contract is signed. The typical build timeline is 4–6 months from design completion to closing. KB Home does not build spec homes — every home is customized to its buyer."
      }
    },
    {
      "@type": "Question",
      "name": "What communities does KB Home build in Leander TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "KB Home's primary community in Leander is Bryson, located in north Leander off Bryson Way. Bryson is one of Leander's largest and most amenity-rich master-planned communities, featuring a resort-style pool, splash pad, sports courts, and an extensive trail network. Call Joe at 512-663-8867 to confirm current phase availability within Bryson."
      }
    },
    {
      "@type": "Question",
      "name": "How energy efficient are KB homes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every KB Home in Bryson is ENERGY STAR certified, meeting strict EPA standards for energy efficiency. KB homes include features such as spray foam insulation in the attic, high-efficiency HVAC, low-E windows, and programable thermostats. While not as aggressively energy-focused as Meritage Homes, KB Home's ENERGY STAR certification translates to meaningfully lower utility bills than a non-certified new home."
      }
    },
    {
      "@type": "Question",
      "name": "What is KB Home's warranty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "KB Home offers a 1-2-10 warranty: 1 year on workmanship, 2 years on systems (plumbing, electrical, HVAC), and 10 years on structural defects. KB Home also provides an online service request portal for warranty claims, making it easier to document and track issues during the first year after closing."
      }
    },
    {
      "@type": "Question",
      "name": "Can a buyer's agent help with KB Home?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — and it costs you nothing. KB Home pays the buyer's agent commission directly. An agent like Joe Sanches accompanies you through the lot selection, attends the design studio session to help prioritize upgrades, reviews the purchase contract line by line, and attends the pre-closing walkthrough to document punch list items. The KB Home sales agent in the model represents KB Home. Joe represents you."
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

function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(107,120,84,.12)', padding: '10px 0', fontSize: '14px' }}>
      <span style={{ color: 'var(--muted)' }}>{label}</span>
      <span style={{ color: 'white', fontWeight: 600 }}>{value}</span>
    </div>
  );
}

function HomeCard({ home }) {
  return (
    <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <p style={{ margin: '0 0 4px', color: 'white', fontWeight: 700, fontSize: '20px' }}>
            ${home.price ? home.price.toLocaleString() : 'Call for price'}
          </p>
          <p style={{ margin: '0 0 6px', color: 'var(--muted)', fontSize: '13px' }}>{home.address}</p>
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--muted)' }}>
            {home.beds && <span><strong style={{ color: 'white' }}>{home.beds}</strong> bd</span>}
            {home.baths && <span><strong style={{ color: 'white' }}>{home.baths}</strong> ba</span>}
            {home.sqft && <span><strong style={{ color: 'white' }}>{home.sqft.toLocaleString()}</strong> sqft</span>}
          </div>
        </div>
        <span style={{
          background: 'rgba(107,120,84,.18)', color: 'var(--accent-light)',
          borderRadius: '6px', padding: '4px 10px', fontSize: '12px', fontWeight: 600
        }}>{home.status || 'Available'}</span>
      </div>
      {home.incentives && (
        <div style={{
          marginTop: '12px', background: 'rgba(107,120,84,.12)', borderRadius: '8px',
          padding: '10px 14px', fontSize: '13px', color: 'var(--accent-light)', lineHeight: '1.5'
        }}>
          <strong>Deal:</strong> {home.incentives}
        </div>
      )}
      {home.url && (
        <a href={home.url} target="_blank" rel="noopener noreferrer"
          className="btn accent"
          style={{ display: 'inline-block', marginTop: '14px', padding: '10px 18px', fontSize: '13px' }}>
          View Home →
        </a>
      )}
    </div>
  );
}

export default function KBHomeLeander({ liveHomes }) {
  return (
    <>
      <Head>
        <title>KB Home in Leander TX | Bryson Community | Joe Sanches</title>
        <meta name="description" content="KB Home new construction in Bryson, Leander TX. Built-to-order process, KB Design Studio, ENERGY STAR certified. Prices $320K–$450K. Free buyer's agent representation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/kb-home-leander-tx`} />
        <meta property="og:title" content="KB Home in Leander TX | Bryson Community | Joe Sanches" />
        <meta property="og:description" content="New KB Home construction in Bryson, Leander TX. Built-to-order, ENERGY STAR, $320K–$450K. Free buyer's agent." />
        <meta property="og:url" content={`${baseUrl}/kb-home-leander-tx`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
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
        <nav style={{ marginTop: '20px', fontSize: '13px', color: 'var(--muted)', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'var(--accent-light)' }}>Home</Link>
          <span>›</span>
          <Link href="/new-construction-leander-tx" style={{ color: 'var(--accent-light)' }}>New Construction Leander TX</Link>
          <span>›</span>
          <span>KB Home</span>
        </nav>

        {/* Hero */}
        <div className="hero" style={{ marginTop: '20px' }}>
          <div className="pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Updated March 2026</div>
          <h2 className="heroTitle">KB Home in Leander TX — Bryson Community 2026</h2>
          <p className="heroLead">
            KB Home's built-to-order approach gives Leander buyers genuine control: choose your floor plan, pick your lot, and customize finishes at the KB Design Studio. Every home is ENERGY STAR certified. Bryson is Leander's most affordable new construction entry point at $320K–$450K. Working with Joe as your buyer's agent costs you nothing — KB Home pays the commission.
          </p>
          <div className="heroMeta" style={{ marginTop: '20px' }}>
            <span className="pill">Leander, TX</span>
            <span className="pill">KB Home</span>
            <span className="pill">$320K–$450K</span>
            <span className="pill">Built-to-Order</span>
          </div>
        </div>

        <div className="two-col" style={{ marginTop: '48px' }}>
          <main className="main">

            {/* Builder Overview */}
            <Section id="overview" title="KB Home in Leander TX — Builder Overview">
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
                KB Home is one of America's largest homebuilders and the only national builder that consistently uses a built-to-order model — every home starts with the buyer's selections, not with a spec home someone else chose. In Leander, KB Home operates primarily in Bryson, offering multiple floor plans across several active phases.
              </p>
              <div style={{ display: 'grid', gap: '0' }}>
                <InfoRow label="Builder" value="KB Home" />
                <InfoRow label="Community in Leander" value="Bryson" />
                <InfoRow label="Price Range" value="$320,000 – $450,000" />
                <InfoRow label="Build Model" value="Built-to-Order (not spec)" />
                <InfoRow label="Design Center" value="KB Home Design Studio, Austin" />
                <InfoRow label="Energy Certification" value="ENERGY STAR certified" />
                <InfoRow label="Warranty" value="1-2-10 (workmanship / systems / structural)" />
                <InfoRow label="Build Timeline" value="4–6 months from design completion" />
                <InfoRow label="School District" value="Leander ISD (LISD)" />
              </div>
            </Section>

            {/* Live Deals */}
            <Section id="live-deals" title="Live KB Home Deals — Bryson Leander TX">
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
                Inventory updated daily from Joe's builder feed. These are KB Home homes currently available in Bryson with active incentives.
              </p>
              {liveHomes.length > 0 ? (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {liveHomes.map(h => <HomeCard key={h.id} home={h} />)}
                </div>
              ) : (
                <div className="card" style={{ textAlign: 'center', color: 'var(--muted)' }}>
                  <p>Check back soon — deals updated daily. Or call Joe for current KB Home availability: <a href="tel:5126638867" style={{ color: 'var(--accent-light)' }}>512-663-8867</a></p>
                </div>
              )}
            </Section>

            {/* KB Home Process */}
            <Section id="process" title="The KB Home Built-to-Order Process — Step by Step">
              <div style={{ display: 'grid', gap: '12px' }}>
                {[
                  ['Step 1: Choose Your Floor Plan & Lot', 'Browse available floor plans and lots in Bryson\'s active phases. Joe helps you evaluate lot premiums, orientation (south-facing backyard, corner lot, greenbelt backing), and which phases offer the best current incentives.'],
                  ['Step 2: Visit the KB Design Studio', 'The KB Design Studio in Austin is where you select all interior and exterior finishes — cabinets, countertops, flooring, tile, fixtures, appliances, and more. Joe helps you prioritize which upgrades add the most resale value vs. which are cosmetic preferences.'],
                  ['Step 3: Contract & Finance', 'KB Home has an in-house mortgage division (KBHS) but you are not required to use it. Shopping your rate independently often yields significant savings — Joe can connect you with preferred lenders to compare.'],
                  ['Step 4: Pre-Drywall Walkthrough', 'Before walls close, you tour the framing with the construction manager. Joe attends this walkthrough with you, reviewing framing accuracy, rough plumbing and electrical placement, and insulation.'],
                  ['Step 5: Final Walkthrough & Closing', 'Before closing, you walk the completed home with the construction manager. Joe documents any outstanding items as a punch list to be completed before or after closing per your agreement.'],
                ].map(([title, desc]) => (
                  <div key={title} className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                    <h3 style={{ color: 'var(--accent-light)', margin: '0 0 8px', fontSize: '15px' }}>{title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* FAQ */}
            <Section id="faq" title="Frequently Asked Questions — KB Home Leander TX">
              {faqSchema.mainEntity.map(({ name, acceptedAnswer }) => (
                <div key={name} className="card" style={{ marginBottom: '12px' }}>
                  <h3 style={{ color: 'white', margin: '0 0 8px', fontSize: '16px' }}>{name}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{acceptedAnswer.text}</p>
                </div>
              ))}
            </Section>

            {/* Internal Links */}
            <Section id="related" title="Explore Bryson & Other Builders in Leander TX">
              <div style={{ display: 'grid', gap: '10px' }}>
                {[
                  ['/new-construction-bryson', 'Bryson Community Deep Dive — KB Home Leander TX'],
                  ['/new-construction-leander-tx', 'All New Construction Communities in Leander TX'],
                  ['/new-construction-crystal-falls', 'Crystal Falls by Lennar — Leander TX'],
                  ['/new-construction-northline', 'Northline by Taylor Morrison — Leander TX'],
                  ['/new-construction-larkspur', 'Larkspur by David Weekley — Leander TX'],
                  ['/new-construction-deerbrooke', 'Deerbrooke by Meritage Homes — Leander TX'],
                  ['/lennar-homes-leander-tx', 'Lennar Homes in Leander TX'],
                ].map(([href, label]) => (
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
                <h3 style={{ color: 'var(--accent-light)', margin: '0 0 10px', fontSize: '15px' }}>Tour KB Home Bryson Free</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>
                  Joe walks you through the KB Home process, attends the design studio, and reviews the contract — at no cost. KB Home pays the buyer's agent commission.
                </p>
                <a href="tel:5126638867" className="btn accent" style={{ display: 'block', textAlign: 'center', padding: '12px' }}>
                  Call 512-663-8867
                </a>
                <a href="mailto:hello@joefsanches.com?subject=KB Home Bryson Tour Request" className="btn" style={{ display: 'block', textAlign: 'center', padding: '12px', marginTop: '8px' }}>
                  Email Joe
                </a>
              </div>

              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '15px' }}>KB Home Quick Facts</h3>
                {[
                  ['Price Range', '$320K–$450K'],
                  ['Build Model', 'Built-to-Order'],
                  ['Certification', 'ENERGY STAR'],
                  ['Timeline', '4–6 months'],
                  ['Warranty', '1-2-10'],
                  ['Community', 'Bryson'],
                  ['Agent Cost', 'Free'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(107,120,84,.1)', padding: '8px 0', fontSize: '13px' }}>
                    <span style={{ color: 'var(--muted)' }}>{k}</span>
                    <span style={{ color: 'white', fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="card" style={{ background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)' }}>
                <h3 style={{ color: 'white', margin: '0 0 12px', fontSize: '15px' }}>Other Builders in Leander</h3>
                {[
                  ['/lennar-homes-leander-tx', 'Lennar — Crystal Falls'],
                  ['/taylor-morrison-leander-tx', 'Taylor Morrison — Northline'],
                  ['/david-weekley-leander-cedar-park', 'David Weekley — Larkspur'],
                  ['/meritage-homes-leander-tx', 'Meritage — Deerbrooke'],
                ].map(([href, label]) => (
                  <Link key={href} href={href} style={{ display: 'block', color: 'var(--accent-light)', fontSize: '13px', padding: '7px 0', borderBottom: '1px solid rgba(107,120,84,.1)', textDecoration: 'none' }}>
                    → {label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Footer CTA */}
        <div className="card" style={{ marginTop: '56px', textAlign: 'center', background: 'rgba(107,120,84,.05)', borderColor: 'rgba(107,120,84,.2)', padding: '48px 32px' }}>
          <h2 style={{ color: 'white', margin: '0 0 12px', fontSize: '26px' }}>Ready to Build with KB Home in Bryson?</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '60ch', margin: '0 auto 28px', lineHeight: '1.7' }}>
            I'll guide you through every step of the KB built-to-order process — lot selection, design studio, contract review, and walkthroughs. It costs you nothing. KB Home pays my commission.
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
            Prices, incentives, and availability subject to change. Verify current inventory directly with the builder or call Joe. Tax rates are estimates — confirm at wcad.org.
          </p>
        </footer>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const filePath = path.join(process.cwd(), 'content', 'new-construction-deals.json');
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    const liveHomes = (data.homes || []).filter(h =>
      (h.builder && h.builder.toLowerCase().includes('kb')) ||
      (h.community && h.community === COMMUNITY)
    );
    return { props: { liveHomes } };
  } catch (e) {
    return { props: { liveHomes: [] } };
  }
}
