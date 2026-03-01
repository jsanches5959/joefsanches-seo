import Head from 'next/head';
import Link from 'next/link';

export default function LeanderHomes() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://joefsanches.com';
  const pageUrl = `${baseUrl}/homes-for-sale-in-leander-tx`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Joe Sanches Realtor - Leander Homes Expert",
    "description": "Expert real estate services for buying and selling homes in Leander, TX.",
    "url": pageUrl,
    "telephone": "+1-512-663-8867",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Leander",
      "addressRegion": "TX",
      "postalCode": "78641",
      "addressCountry": "US"
    }
  };

  return (
    <>
      <Head>
        <title>Homes for Sale in Leander, TX | Joe Sanches Realtor</title>
        <meta name="description" content="Searching for homes for sale in Leander, TX? Get expert local insights, market stats, and professional guidance from Joe Sanches, your Leander real estate expert." />
        <link rel="canonical" href={pageUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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

        <main className="main-content" style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: '42px', marginBottom: '24px', color: 'white' }}>Homes for Sale in Leander, TX: Your 2026 Guide</h1>
          
          <section style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)' }}>
              Leander, Texas continues to be one of the fastest-growing cities in the United States, and for good reason. With top-rated schools, beautiful Hill Country views, and a high quality of life, it's no wonder so many families and professionals are looking for <strong>homes for sale in Leander, TX</strong>.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', color: 'white', marginBottom: '16px' }}>Leander Real Estate Market Overview</h2>
            <p style={{ lineHeight: '1.8', marginBottom: '20px' }}>
              The Leander market is dynamic and competitive. As of early 2026, we are seeing a steady demand for both new construction and established neighborhoods. Whether you're looking for a modern farmhouse in <strong>Crystal Falls</strong> or a family-friendly home in <strong>Larkspur</strong>, there are options for various budgets.
            </p>
            <div style={{ background: 'rgba(107,120,84,0.1)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '20px', color: 'var(--accent-light)', marginBottom: '12px' }}>Quick Market Stats:</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '8px' }}>✅ <strong>Median Home Price:</strong> $485,000 - $550,000</li>
                <li style={{ marginBottom: '8px' }}>✅ <strong>Average Days on Market:</strong> 35-45 days</li>
                <li style={{ marginBottom: '8px' }}>✅ <strong>Top School District:</strong> Leander ISD</li>
              </ul>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', color: 'white', marginBottom: '16px' }}>Top Neighborhoods in Leander</h2>
            <p style={{ lineHeight: '1.8', marginBottom: '20px' }}>
              Choosing the right neighborhood is just as important as choosing the right house. Here are some of the most sought-after areas in Leander:
            </p>
            <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
              <li><strong>Crystal Falls:</strong> Known for its golf course, hill country views, and diverse range of home styles.</li>
              <li><strong>Travisso:</strong> A premier master-planned community with incredible amenities and luxury homes.</li>
              <li><strong>Larkspur:</strong> Perfect for families looking for new construction with great community pools and trails.</li>
              <li><strong>Bar W Ranch:</strong> One of the newest developments offering modern floor plans and easy access to Highway 29.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px', padding: '40px', background: 'rgba(107,120,84,0.05)', borderRadius: '16px', border: '1px solid var(--accent)' }}>
            <h2 style={{ fontSize: '32px', color: 'white', marginBottom: '16px' }}>Ready to Find Your Leander Home?</h2>
            <p style={{ fontSize: '18px', marginBottom: '24px' }}>
              Don't navigate the Leander market alone. As a local expert and military veteran, I bring discipline, strategy, and deep market knowledge to your home search.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="tel:5126638867" className="btn accent" style={{ padding: '16px 32px', fontSize: '18px' }}>Call Joe: (512) 663-8867</a>
              <a href="mailto:hello@joefsanches.com?subject=Leander%20Home%20Search" className="btn" style={{ padding: '16px 32px', fontSize: '18px' }}>Email for a Custom List</a>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', color: 'white', marginBottom: '16px' }}>Why Buy in Leander, TX?</h2>
            <p style={{ lineHeight: '1.8' }}>
              Leander offers the perfect balance of suburban peace and urban accessibility. With the MetroRail connecting you to downtown Austin and the upcoming Northline development bringing new retail and dining, the investment potential in Leander real estate remains strong.
            </p>
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
          strong { color: white; }
        `}</style>
      </div>
    </>
  );
}
