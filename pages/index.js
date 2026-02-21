import Link from 'next/link';
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
  return (
    <div className="container">
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
          <div className="card" style={{ background: 'rgba(107,120,84,0.05)', borderColor: 'rgba(107,120,84,0.2)', textAlign: 'center' }}>
            <img 
              src="/joe.png" 
              alt="Joe Sanches" 
              style={{ 
                borderRadius: '12px', 
                width: '100%', 
                marginBottom: '16px',
                border: '2px solid rgba(107,120,84,0.3)'
              }} 
            />
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
      </footer>

      <style jsx>{`
        @media (max-width: 860px) {
          .hero > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
