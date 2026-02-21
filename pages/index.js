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
          <h1>Joe Sanches</h1>
          <p className="sub">Real Estate Expert • Leander, TX</p>
        </div>
        <div className="actions">
          <a href="tel:5126638867" className="btn">Call / Text</a>
          <a href="mailto:hello@joefsanches.com" className="btn accent">Email Me</a>
        </div>
      </header>

      <section className="hero">
        <h2 className="heroTitle">Helping Leander homeowners buy and sell with confidence.</h2>
        <p className="heroLead">
          Strategic pricing, military discipline, and modern marketing to get you the best results in the Austin market.
        </p>
        <div className="heroMeta">
          <span className="pill">Local Expert</span>
          <span className="pill">Military Veteran</span>
          <span className="pill">Top Negotiator</span>
        </div>
      </section>

      <div className="grid">
        <main className="main">
          <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Latest Insights</h3>
          <div className="list">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.slug} className="card">
                  <h4 className="cardTitle">
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <p className="cardMeta">
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
          <div className="card" style={{ background: 'rgba(124,58,237,0.05)', borderColor: 'rgba(124,58,237,0.2)' }}>
            <h3 className="cardTitle">Why Work With Joe?</h3>
            <ul style={{ paddingLeft: '18px', marginTop: '12px', fontSize: '14px', color: 'var(--muted)', lineHeight: '1.6' }}>
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
        <p style={{ marginTop: '4px' }}>Phone: 512-663-8867 • Email: hello@joefsanches.com</p>
      </footer>
    </div>
  );
}
