import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export async function getStaticPaths() {
  const filenames = fs.readdirSync(postsDirectory);
  const paths = filenames
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({ params: { slug: file.replace(/\.md$/, '') } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const fullPath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  // Ensure date is JSON-serializable and safe
  let date = null;
  if (data.date) {
    const d = new Date(data.date);
    if (!isNaN(d.getTime())) {
      date = d.toISOString();
    }
  }

  return {
    props: {
      slug: params.slug,
      title: data.title || params.slug,
      date,
      contentHtml,
    },
  };
}

export default function Post({ title, date, contentHtml }) {
  return (
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

      <div className="grid" style={{ marginTop: '40px' }}>
        <main className="main">
          <article className="hero" style={{ padding: '40px' }}>
            <Link href="/" style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Back to Home
            </Link>
            <h1 className="heroTitle" style={{ fontSize: '42px', marginBottom: '20px' }}>{title}</h1>
            {date ? (
              <p className="pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '32px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Published on {new Date(date).toLocaleDateString()}
              </p>
            ) : null}
            
            <div 
              className="contentHtml" 
              style={{ 
                marginTop: '32px', 
                lineHeight: '1.8', 
                fontSize: '17px', 
                color: 'rgba(255,255,255,0.9)' 
              }}
              dangerouslySetInnerHTML={{ __html: contentHtml }} 
            />

            <section style={{ marginTop: '60px', padding: '40px', borderRadius: '16px', border: '1px solid var(--border)', background: 'rgba(107,120,84,0.05)' }}>
              <h2 style={{ fontSize: '26px', marginBottom: '16px', color: 'white' }}>Want help in Leander / Austin?</h2>
              <p style={{ color: 'var(--muted)', marginBottom: '28px', fontSize: '16px', lineHeight: '1.6' }}>
                Whether you're buying, selling, or just have questions about the local market, I'm here to help.
              </p>
              <div className="actions">
                <a href="tel:5126638867" className="btn accent" style={{ padding: '12px 20px', fontSize: '15px' }}>Call or Text (512) 663-8867</a>
                <a href="mailto:hello@joefsanches.com" className="btn" style={{ padding: '12px 20px', fontSize: '15px' }}>Email Joe</a>
              </div>
            </section>
          </article>
        </main>

        <aside className="side">
          <div className="card" style={{ background: 'rgba(107,120,84,0.05)', borderColor: 'rgba(107,120,84,0.2)', textAlign: 'center', position: 'sticky', top: '20px' }}>
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
            <h3 className="cardTitle" style={{ color: 'var(--accent-light)' }}>Joe Sanches</h3>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '8px' }}>Real Estate Expert</p>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '12px', lineHeight: '1.6' }}>
              Helping Leander homeowners buy and sell with confidence. Military veteran with strategic pricing expertise.
            </p>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="tel:5126638867" className="btn accent" style={{ fontSize: '13px', justifyContent: 'center' }}>Call / Text</a>
              <a href="mailto:hello@joefsanches.com" className="btn" style={{ fontSize: '13px', justifyContent: 'center' }}>Email</a>
            </div>
          </div>
        </aside>
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Joe Sanches Realtor • Leander, Texas</p>
        <p style={{ marginTop: '8px' }}>Phone: 512-663-8867 • Email: hello@joefsanches.com</p>
      </footer>

      <style jsx global>{`
        .contentHtml h2 { font-size: 28px; margin-top: 48px; margin-bottom: 20px; color: white; border-bottom: 1px solid var(--border); padding-bottom: 12px; }
        .contentHtml h3 { font-size: 22px; margin-top: 36px; margin-bottom: 16px; color: white; }
        .contentHtml p { margin-bottom: 24px; }
        .contentHtml ul, .contentHtml ol { margin-bottom: 24px; padding-left: 24px; }
        .contentHtml li { margin-bottom: 12px; }
        .contentHtml strong { color: white; }
        .contentHtml a { color: var(--accent-light); text-decoration: underline; }
        .contentHtml blockquote { border-left: 4px solid var(--accent); padding-left: 20px; margin: 32px 0; font-style: italic; color: var(--muted); }
        @media (max-width: 860px) {
          .side { position: relative !important; top: auto !important; }
        }
      `}</style>
    </div>
  );
}
