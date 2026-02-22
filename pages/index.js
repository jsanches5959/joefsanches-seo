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

export default function Home({ posts }) {

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://joefsanches.com",
    "name": "Joe Sanches - Real Estate Agent",
    "description": "Licensed Real Estate Agent in Leander, TX specializing in buying and selling homes with strategic pricing and modern marketing.",
    "url": "https://joefsanches.com",
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
      {
        "@type": "City",
        "name": "Leander",
        "addressRegion": "TX"
      },
      {
        "@type": "City",
        "name": "Austin",
        "addressRegion": "TX"
      },
      {
        "@type": "City",
        "name": "Cedar Park",
        "addressRegion": "TX"
      }
    ],
    "priceRange": "$300000-$1000000",
    "image": "https://joefsanches.com/joe.png",
    "sameAs": [
      "https://www.facebook.com/joefsanches",
      "https://www.linkedin.com/in/joefsanches"
    ],
    "knowsAbout": [
      "Real Estate",
      "Home Buying",
      "Home Selling",
      "Property Valuation",
      "Market Analysis"
    ],
    "jobTitle": "Real Estate Agent",
    "license": "Licensed Real Estate Agent - State of Texas"
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
            <img src="/logo.png" alt="Joe Sanches Logo" className="logo" />
            <div>
              <h1>Joe Sanches</h1>
              <p className="sub">Real Estate Expert • Leander, TX</p>
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
          <p>© {new Date().getFullYear()} Joe Sanches Realtor • Leander, Texas</p>
          <p style={{ marginTop: '8px' }}>Phone: 512-663-8867 • Email: hello@joefsanches.com</p>
          <div style={{ marginTop: '16px' }}>
            <a href="https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID_HERE" target="_blank" rel="noopener noreferrer" className="btn" style={{ fontSize: '12px', opacity: 0.8 }}>
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
