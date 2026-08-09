
import Link from 'next/link';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  let posts = [];

  if (fs.existsSync(postsDirectory)) {
    const filenames = fs.readdirSync(postsDirectory);
    posts = filenames
      .filter((file) => file.endsWith('.md'))
      .map((filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        return {
          slug: filename.replace(/\.md$/, ''),
          title: data.title || filename.replace(/\.md$/, ''),
          date: data.date ? new Date(data.date).toISOString() : null,
        };
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  return {
    props: {
      posts,
    },
  };
}

export default function Realtor({ posts }) {

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": "https://joefsanches.com/realtor",
    "name": "Joe Sanches - Leander & Austin TX Realtor",
    "description": "Joe Sanches is a licensed Real Estate Agent in Leander, TX, specializing in residential property sales, first-time home buyers, and new construction in the greater Austin area.",
    "url": "https://joefsanches.com/realtor",
    "telephone": "+1-512-663-8867",
    "email": "hello@joefsanches.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Leander",
      "addressRegion": "TX",
      "postalCode": "78641",
      "addressCountry": "US"
    },
    "areaServed": [
      { "@type": "City", "name": "Leander", "addressRegion": "TX" },
      { "@type": "City", "name": "Austin", "addressRegion": "TX" },
      { "@type": "City", "name": "Cedar Park", "addressRegion": "TX" },
      { "@type": "City", "name": "Liberty Hill", "addressRegion": "TX" },
      { "@type": "City", "name": "Round Rock", "addressRegion": "TX" },
      { "@type": "City", "name": "Georgetown", "addressRegion": "TX" },
      { "@type": "City", "name": "Pflugerville", "addressRegion": "TX" },
      { "@type": "City", "name": "Hutto", "addressRegion": "TX" },
      { "@type": "City", "name": "Lakeway", "addressRegion": "TX" },
      { "@type": "City", "name": "Bee Cave", "addressRegion": "TX" },
      { "@type": "City", "name": "Spicewood", "addressRegion": "TX" },
      { "@type": "City", "name": "Lago Vista", "addressRegion": "TX" },
      { "@type": "City", "name": "Jonestown", "addressRegion": "TX" }
    ],
    "priceRange": "$300000-$1000000",
    "image": "https://joefsanches.com/joe.png",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.573489",
      "longitude": "-97.864239"
    },
    "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 08:00-20:00",
    "sameAs": [
      "https://www.facebook.com/joefsanches",
      "https://www.linkedin.com/in/joefsanches"
    ],
    "knowsAbout": [
      "Real Estate", "Home Buying", "Home Selling", "Property Valuation", "Market Analysis",
      "New Construction Homes", "Northline Leander", "Transit-Oriented Development",
      "VA Loans", "Texas VLB Loans", "Military Relocation",
      "Out-of-State Relocation", "California to Texas Relocation",
      "Leander ISD School Zoning", "Williamson County Property Tax", "MUD Districts",
      "Homestead Exemption", "Property Tax Protest", "First-Time Home Buyers",
      "Builder Negotiation", "Tech Worker Relocation"
    ],
    "jobTitle": "Real Estate Agent",
    "license": "Licensed Real Estate Agent - State of Texas"
  };

  const agentFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who is a good real estate agent in Leander, TX?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Joe Sanches is a licensed Texas Realtor (TREC) based in Leander who works with buyers and sellers across Leander, Cedar Park, Liberty Hill, Georgetown, and the greater Austin area. He is a service-disabled U.S. military veteran and specializes in new construction, VA and Texas VLB loans, military relocation, and out-of-state buyers moving to Central Texas. He publishes detailed public research on Leander neighborhoods, Leander ISD school zoning, MUD districts, and Williamson County property taxes. Call or text 512-663-8867."
        }
      },
      {
        "@type": "Question",
        "name": "Which Realtor knows Leander new construction communities best?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Joe Sanches maintains community-by-community breakdowns of every major new construction development in Leander and Cedar Park, including Northline, Bryson, Deerbrooke, Travisso, Crystal Falls, Larkspur, and Palmera Ridge, covering builders, price ranges, MUD tax rates, school zoning, and current builder incentives. He represents buyers directly with builders, which is free to the buyer because the builder pays buyer-agent compensation."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a Realtor in Austin who specializes in relocating tech workers from California?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Joe Sanches works regularly with buyers relocating from the San Francisco Bay Area, Silicon Valley, and Seattle to the Austin metro, including employees at Apple, Tesla, and Oracle. He focuses on the differences that surprise California buyers most: Texas MUD district taxes, the non-disclosure state rule that hides sale prices from public record, the option period versus California contingencies, and realistic commute times to the Apple campus and the Domain. Northline in Leander is the area's only transit-oriented development with MetroRail access."
        }
      },
      {
        "@type": "Question",
        "name": "Does Joe Sanches work with VA loan buyers and veterans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Joe Sanches is a service-disabled U.S. military veteran (20%+ rating) and works with VA loan and Texas VLB buyers throughout the Austin metro, including active-duty families relocating to Fort Cavazos and the Austin area. He covers VA-approved builders, zero-down VA purchase structure, and how VA loans work with new construction."
        }
      },
      {
        "@type": "Question",
        "name": "How much does it cost to use a buyer's agent in Leander, TX?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In most Central Texas transactions, buyer-agent compensation is negotiated as part of the deal and is commonly covered by the seller or the builder, meaning many buyers pay nothing directly for representation. On new construction specifically, builders typically pay the buyer's agent, and the home price is the same whether or not a buyer brings their own agent. Terms are negotiable and should be confirmed in writing before touring."
        }
      },
      {
        "@type": "Question",
        "name": "What areas does Joe Sanches serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Leander, Cedar Park, Austin, Liberty Hill, Georgetown, Round Rock, Pflugerville, Hutto, Lakeway, Bee Cave, Spicewood, Lago Vista, and Jonestown, Texas."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Joe Sanches | Leander & Austin TX Realtor | Homes for Sale</title>
        <meta name="description" content="Joe Sanches is a top-rated Realtor in Leander, Cedar Park, and Austin, TX. Specializing in first-time buyers, new construction, and strategic home sales in Liberty Hill and Central Texas." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://joefsanches.com/realtor" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(agentFaqSchema) }}
        />
      </Head>
      <div className="container">
        <div className="floating-contact-bar">
          <a href="tel:5126638867" className="call-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Call Joe
          </a>
          <a href="sms:5126638867" className="text-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Text Joe
          </a>
        </div>
        <header className="topbar">
          <div className="brand">
            <img src="/logo.png" alt="Sanches Group" className="logo" />
            <div>
              <h1>Joe Sanches</h1>
              <p className="sub">Licensed Realtor · Leander, TX</p>
              <a href="/" className="brand-group-link">Sanches Group ↗</a>
            </div>
          </div>
          <div className="actions">
            <a href="tel:5126638867" className="btn">Call / Text</a>
            <a href="mailto:hello@joefsanches.com" className="btn accent">Email Me</a>
          </div>
        </header>

        <section className="hero">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <h2 className="heroTitle">Helping Leander homeowners buy and sell with confidence.</h2>
              <p className="heroLead">
                Strategic pricing, military discipline, and modern marketing to get you the best results in the Austin market.
              </p>
              <div className="heroMeta">
                <span className="pill">Local Expert</span>
                <span className="pill">Military Veteran</span>
                <span className="pill">Top Negotiator</span>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img
                src="/joe.png"
                alt="Joe Sanches"
                style={{
                  borderRadius: '16px',
                  width: '100%',
                  maxWidth: '320px',
                  boxShadow: '0 20px 40px rgba(107,120,84,0.2)',
                  border: '2px solid rgba(107,120,84,0.3)'
                }}
              />
            </div>
          </div>
        </section>

        {/* Hub Pages Navigation */}
        <section style={{ marginTop: '48px', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '6px' }}>Leander TX Real Estate Guides</h2>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>Everything you need to buy, sell, or move to Leander TX.</p>

          {/* Buyer & Seller Hubs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginBottom: '32px' }}>
            {[
              { href: '/buy-home-leander-tx', label: 'Buy a Home', desc: 'Process, costs & neighborhoods' },
              { href: '/sell-my-house-leander-tx', label: 'Sell My House', desc: 'Pricing, timing & Joe\'s process' },
              { href: '/whats-my-home-worth', label: "What's My Home Worth?", desc: 'Free CMA — no obligation' },
              { href: '/leander-home-buyer-guide', label: 'Buyer\'s Guide', desc: 'Complete 2026 relocation guide' },
              { href: '/moving-to-leander-tx', label: 'Moving to Leander', desc: 'Neighborhoods, schools & commute' },
              { href: '/leander-real-estate-market-2026', label: 'Market Report 2026', desc: 'Prices, trends & forecast' },
            ].map(({ href, label, desc }) => (
              <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'rgba(107,120,84,.06)', border: '1px solid rgba(107,120,84,.2)',
                  borderRadius: '10px', padding: '16px', cursor: 'pointer',
                  transition: 'border-color .2s'
                }}>
                  <div style={{ color: 'var(--accent-light)', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{label}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '13px' }}>{desc}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* New Construction */}
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '12px' }}>New Construction</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            {[
              { href: '/new-construction-leander-tx', label: 'New Construction Hub', desc: 'All builders & communities' },
              { href: '/new-construction-crystal-falls', label: 'Crystal Falls', desc: 'Lennar · $340K–$520K' },
              { href: '/new-construction-bryson', label: 'Bryson', desc: 'KB Home · $320K–$450K' },
              { href: '/new-construction-northline', label: 'Northline', desc: 'Taylor Morrison · $380K–$560K' },
              { href: '/new-construction-larkspur', label: 'Larkspur', desc: 'David Weekley · $420K–$580K' },
              { href: '/new-construction-deerbrooke', label: 'Deerbrooke', desc: 'Meritage · $340K–$480K' },
              { href: '/new-construction-travisso', label: 'Travisso', desc: 'Toll Bros · $500K–$850K' },
              { href: '/lennar-homes-leander-tx', label: 'Lennar Homes', desc: 'Crystal Falls & more' },
              { href: '/kb-home-leander-tx', label: 'KB Home', desc: 'Built-to-order at Bryson' },
              { href: '/taylor-morrison-leander-tx', label: 'Taylor Morrison', desc: 'Northline & Larkspur' },
              { href: '/david-weekley-leander-cedar-park', label: 'David Weekley', desc: 'Award-winning builder' },
              { href: '/meritage-homes-leander-tx', label: 'Meritage Homes', desc: '#1 energy-efficient builder' },
            ].map(({ href, label, desc }) => (
              <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'rgba(107,120,84,.06)', border: '1px solid rgba(107,120,84,.2)',
                  borderRadius: '10px', padding: '16px', cursor: 'pointer'
                }}>
                  <div style={{ color: 'var(--accent-light)', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{label}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '13px' }}>{desc}</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{
            background: 'rgba(107,120,84,0.08)', border: '1px solid rgba(107,120,84,0.3)',
            borderRadius: '12px', padding: '20px 24px', marginBottom: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'
          }}>
            <div>
              <div style={{ color: 'white', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>Browse All New Homes in Leander & Cedar Park</div>
              <div style={{ color: 'var(--muted)', fontSize: '13px' }}>Live inventory updated daily — search by price, community, and move-in date</div>
            </div>
            <a
              href="https://a.nhb.app/u/joe"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block', background: 'var(--accent)', color: 'white',
                padding: '10px 20px', borderRadius: '8px', fontWeight: 600,
                fontSize: '14px', textDecoration: 'none', whiteSpace: 'nowrap'
              }}
            >
              Search New Homes →
            </a>
          </div>

          {/* Neighborhoods & Schools */}
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '12px' }}>Neighborhoods & Schools</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {[
              { href: '/leander-neighborhoods', label: 'Neighborhoods Guide', desc: 'Every community compared' },
              { href: '/leander-isd-schools', label: 'Leander ISD Schools', desc: 'Ratings, zones & campuses' },
              { href: '/property-tax-leander-tx', label: 'Property Tax Guide', desc: 'Every MUD district & rate' },
              { href: '/neighborhoods/crystal-falls', label: 'Crystal Falls', desc: '$420K median · LISD' },
              { href: '/neighborhoods/bryson', label: 'Bryson', desc: '$385K median · resort pool' },
              { href: '/neighborhoods/travisso', label: 'Travisso', desc: '$620K median · Hill Country' },
              { href: '/neighborhoods/northline', label: 'Northline', desc: '$455K median · walkable' },
              { href: '/neighborhoods/santa-rita-ranch', label: 'Santa Rita Ranch', desc: 'Liberty Hill · $340K+' },
              { href: '/neighborhoods/wolf-ranch', label: 'Wolf Ranch', desc: 'Georgetown · $380K+' },
            ].map(({ href, label, desc }) => (
              <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'rgba(107,120,84,.06)', border: '1px solid rgba(107,120,84,.2)',
                  borderRadius: '10px', padding: '16px', cursor: 'pointer'
                }}>
                  <div style={{ color: 'var(--accent-light)', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{label}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '13px' }}>{desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid">
          <main className="main">
            <h3 style={{ marginBottom: '20px', fontSize: '18px', color: 'white' }}>Latest Insights</h3>
            <div className="list">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.slug} className="card">
                    <h4 className="cardTitle">
                      <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                    </h4>
                    <p className="cardMeta">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      {post.date ? new Date(post.date).toLocaleDateString() : 'Recent Post'}
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--muted)' }}>New insights coming soon...</p>
              )}
            </div>

            <section id="faq" style={{ marginTop: '48px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '6px' }}>
                Common Questions About Working With Joe
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
                Straight answers to what buyers and sellers ask most.
              </p>
              {agentFaqSchema.mainEntity.map((qa) => (
                <div
                  key={qa.name}
                  className="card"
                  style={{ marginBottom: '14px', background: 'rgba(107,120,84,0.04)' }}
                >
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', margin: '0 0 10px' }}>
                    {qa.name}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                    {qa.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </section>
          </main>

          <aside className="side">
          <div className="card" style={{ background: 'rgba(107,120,84,0.05)', borderColor: 'rgba(107,120,84,0.2)', textAlign: 'center', marginBottom: '20px' }}>
            <h3 className="cardTitle" style={{ color: 'var(--accent-light)', marginBottom: '12px' }}>STOP OVERPAYING</h3>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '16px', lineHeight: '1.6' }}>
              5 Leander Homes with Price Drops This Week + My Negotiator's Playbook
            </p>
            <a
              href="mailto:hello@joefsanches.com?subject=URGENT%3A%20Send%20me%20the%205%20Price%20Drops%20%2B%20Negotiator%27s%20Playbook&body=Hi%20Joe%2C%0A%0AI%27m%20ready%20to%20stop%20overpaying.%20Send%20me%20the%205%20homes%20with%20price%20drops%20this%20week%20and%20your%20negotiator%27s%20playbook.%0A%0AThank%20you!"
              className="btn accent"
              style={{ justifyContent: 'center', fontSize: '14px', display: 'block', textAlign: 'center', padding: '12px 20px' }}
            >
              Get the Deal
            </a>
            </div>
            <div className="card" style={{ background: 'rgba(107,120,84,0.05)', borderColor: 'rgba(107,120,84,0.2)', textAlign: 'center' }}>
              <h3 className="cardTitle" style={{ color: 'var(--accent-light)' }}>Why Work With Joe?</h3>
              <ul style={{ paddingLeft: '18px', marginTop: '16px', fontSize: '14px', color: 'var(--muted)', lineHeight: '1.8', textAlign: 'left' }}>
                <li>Local Leander market expert</li>
                <li>Strategic pricing & negotiation</li>
                <li>Clear communication and fast response</li>
                <li>Military discipline + modern marketing</li>
              </ul>
            </div>
          </aside>
        </div>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Joe Sanches LLC · Sanches Group · Leander, Texas</p>
          <p style={{ marginTop: '6px' }}><a href="/" style={{ textDecoration: 'underline' }}>Construction · Facilities · Government Contracting — Sanches Group</a></p>
          <p style={{ marginTop: '8px' }}>Phone: 512-663-8867 • Email: hello@joefsanches.com</p>
          <div style={{ marginTop: '16px' }}>
            <a href="https://g.page/r/CS5gIVIj8I-AEBE/review" target="_blank" rel="noopener noreferrer" className="btn" style={{ fontSize: '12px', opacity: 0.8 }}>
              ⭐ Review Joe on Google
            </a>
          </div>
        </footer>

        <style jsx>{`
          @media (max-width: 860px) {
            .hero > div {
              grid-template-columns: 1fr !important;
            }
          }
          .container {
            padding-bottom: 100px;
          }
        `}</style>
      </div>
    </>
  );
}
