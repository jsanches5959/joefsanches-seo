import Head from 'next/head';
import Link from 'next/link';

export default function LeanderHomes() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://joefsanches.com';
  const pageUrl = `${baseUrl}/homes-for-sale-in-leander-tx`;

  const realEstateAgentSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Joe Sanches - Leander & Austin TX Realtor",
    "description": "Joe Sanches is a top-rated Realtor in Leander, TX, specializing in new construction homes, first-time buyers, and strategic home sales in the greater Austin area.",
    "url": pageUrl,
    "telephone": "+1-512-663-8867",
    "email": "hello@joefsanches.com",
    "image": "https://joefsanches.com/joe.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Leander",
      "addressRegion": "TX",
      "postalCode": "78641",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.573489",
      "longitude": "-97.864239"
    },
    "priceRange": "$300000-$1,500,000",
    "areaServed": ["Leander", "Austin", "Cedar Park", "Liberty Hill", "Georgetown"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is Leander, TX a good place to buy a home in 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Leander remains one of the fastest-growing cities in the US with top-rated schools (Leander ISD), high safety ratings, and significant investment potential due to developments like Northline and the MetroRail extension."
        }
      },
      {
        "@type": "Question",
        "name": "What are the best neighborhoods in Leander for families?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Top family-friendly neighborhoods include Crystal Falls for its amenities, Travisso for luxury and views, and Larkspur or Bar W Ranch for modern new construction homes."
        }
      },
      {
        "@type": "Question",
        "name": "Should I work with a Realtor when buying new construction in Leander?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Builders have their own representatives, but a buyer's agent like Joe Sanches works exclusively for you to negotiate better incentives, lot premiums, and oversee the construction quality at no cost to the buyer."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Homes for Sale in Leander, TX | New Construction & Local Expert Joe Sanches</title>
        <meta name="description" content="Searching for homes for sale in Leander, TX? Get expert local insights on new construction, market stats, and professional guidance from Joe Sanches, your Leander real estate expert." />
        <meta name="keywords" content="homes for sale in leander tx, leander tx real estate, new construction leander tx, crystal falls homes, travisso homes, realtor leander tx" />
        <link rel="canonical" href={pageUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div className="container">
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

        <main className="main-content" style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '24px', color: 'white', lineHeight: '1.1' }}>
            Homes for Sale in Leander, TX: <span style={{ color: 'var(--accent-light)' }}>The 2026 Buyer's Guide</span>
          </h1>
          
          <section style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '20px', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)' }}>
              Leander, Texas continues to be one of the fastest-growing cities in the United States. With top-rated <strong>Leander ISD schools</strong>, beautiful Hill Country views, and a high quality of life, it's the premier destination for families and professionals moving to the Austin area.
            </p>
          </section>

          <section style={{ marginBottom: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <div style={{ background: 'rgba(107,120,84,0.1)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <h2 style={{ fontSize: '24px', color: 'white', marginBottom: '16px' }}>Leander Market Stats (2026)</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '12px' }}>📊 <strong>Median Price:</strong> $495,000 - $565,000</li>
                <li style={{ marginBottom: '12px' }}>⏱️ <strong>Avg Days on Market:</strong> 38 Days</li>
                <li style={{ marginBottom: '12px' }}>🏗️ <strong>New Construction:</strong> 45% of Inventory</li>
                <li style={{ marginBottom: '12px' }}>🏫 <strong>Top District:</strong> Leander ISD</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <h2 style={{ fontSize: '24px', color: 'white', marginBottom: '16px' }}>Why Work With Joe?</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--muted)' }}>
                As a local Leander resident and military veteran, I don't just show houses—I provide a strategic advantage. From <strong>builder negotiations</strong> to <strong>market analysis</strong>, I ensure you never overpay.
              </p>
              <a href="tel:5126638867" className="btn accent" style={{ marginTop: '15px', width: '100%', textAlign: 'center' }}>Get Expert Advice</a>
            </div>
          </section>

          <section style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '32px', color: 'white', marginBottom: '20px' }}>The New Construction Advantage in Leander</h2>
            <p style={{ lineHeight: '1.8', marginBottom: '20px' }}>
              Much of the best real estate in Leander is currently <strong>new construction</strong>. Communities like <strong>Travisso</strong>, <strong>Bryson</strong>, and <strong>Larkspur</strong> are being built by top-tier builders including Toll Brothers, Taylor Morrison, and Drees Custom Homes.
            </p>
            <blockquote style={{ borderLeft: '4px solid var(--accent)', padding: '20px', background: 'rgba(107,120,84,0.05)', margin: '20px 0', fontStyle: 'italic' }}>
              "Working with a Realtor on a new build is your secret weapon. I help you navigate builder incentives, lot premiums, and construction quality checks that most buyers miss."
            </blockquote>
          </section>

          <section style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '32px', color: 'white', marginBottom: '20px' }}>Top Neighborhoods to Watch</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="card">
                <h3 style={{ color: 'var(--accent-light)' }}>Crystal Falls</h3>
                <p style={{ fontSize: '14px' }}>The crown jewel of Leander. Golf course living, hill country views, and established luxury.</p>
              </div>
              <div className="card">
                <h3 style={{ color: 'var(--accent-light)' }}>Travisso</h3>
                <p style={{ fontSize: '14px' }}>Mediterranean-style resort living with incredible amenities and high-end custom builds.</p>
              </div>
              <div className="card">
                <h3 style={{ color: 'var(--accent-light)' }}>Larkspur</h3>
                <p style={{ fontSize: '14px' }}>Perfect for families seeking modern floor plans and community-focused living.</p>
              </div>
              <div className="card">
                <h3 style={{ color: 'var(--accent-light)' }}>Bar W Ranch</h3>
                <p style={{ fontSize: '14px' }}>Newest development with easy access to Highway 29 and future retail hubs.</p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '60px', padding: '50px', background: 'linear-gradient(135deg, rgba(107,120,84,0.2) 0%, rgba(107,120,84,0.05) 100%)', borderRadius: '24px', border: '1px solid var(--accent)', textAlign: 'center' }}>
            <h2 style={{ fontSize: '36px', color: 'white', marginBottom: '16px' }}>Ready to Find Your Leander Home?</h2>
            <p style={{ fontSize: '20px', marginBottom: '32px', color: 'rgba(255,255,255,0.8)' }}>
              Get a custom list of homes, including <strong>off-market new construction</strong> and upcoming price drops.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:5126638867" className="btn accent" style={{ padding: '20px 40px', fontSize: '20px' }}>Call Joe: (512) 663-8867</a>
              <a href="mailto:hello@joefsanches.com?subject=Leander%20Home%20Search" className="btn" style={{ padding: '20px 40px', fontSize: '20px' }}>Email for Custom List</a>
            </div>
          </section>

          <section style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '32px', color: 'white', marginBottom: '24px' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h4 style={{ color: 'white', marginBottom: '8px' }}>Is Leander, TX a good place to buy a home in 2026?</h4>
                <p style={{ fontSize: '15px' }}>Yes. With the Northline development and MetroRail extension, Leander is transitioning from a bedroom community to a self-sustaining urban hub, making it a strong long-term investment.</p>
              </div>
              <div>
                <h4 style={{ color: 'white', marginBottom: '8px' }}>What are the best schools in Leander?</h4>
                <p style={{ fontSize: '15px' }}>Leander ISD is consistently top-rated. Schools like Rouse High School and various new elementary schools in Larkspur and Bryson are highly sought after by parents.</p>
              </div>
            </div>
          </section>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '40px', marginTop: '60px' }}>
            <Link href="/" style={{ color: 'var(--accent-light)', textDecoration: 'underline' }}>← Back to Home & Latest Market Insights</Link>
          </div>
        </main>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Joe Sanches Realtor • Leander, Texas</p>
          <p style={{ marginTop: '8px' }}>Phone: 512-663-8867 • Email: hello@joefsanches.com</p>
        </footer>

        <style jsx>{`
          .container { min-height: 100vh; }
          .main-content h2 { margin-top: 40px; }
          .main-content p { color: var(--muted); }
          .card { background: rgba(255,255,255,0.02); padding: 20px; borderRadius: 12px; border: 1px solid var(--border); }
          strong { color: white; }
        `}</style>
      </div>
    </>
  );
}
