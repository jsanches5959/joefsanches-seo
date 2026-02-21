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
          <Link href="/">
            <h1>Joe Sanches</h1>
          </Link>
          <p className="sub">Real Estate Expert • Leander, TX</p>
        </div>
        <div className="actions">
          <a href="tel:5126638867" className="btn">Call / Text</a>
          <a href="mailto:hello@joefsanches.com" className="btn accent">Email Me</a>
        </div>
      </header>

      <main className="hero" style={{ marginTop: '40px', padding: '40px' }}>
        <Link href="/" style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px', display: 'inline-block' }}>
          ← Back to Home
        </Link>
        <h1 className="heroTitle" style={{ fontSize: '42px', marginBottom: '16px' }}>{title}</h1>
        {date ? (
          <p className="pill" style={{ display: 'inline-block', marginBottom: '24px' }}>
            Published on {new Date(date).toLocaleDateString()}
          </p>
        ) : null}
        
        <article 
          className="contentHtml" 
          style={{ 
            marginTop: '32px', 
            lineHeight: '1.8', 
            fontSize: '17px', 
            color: 'rgba(255,255,255,0.9)' 
          }}
          dangerouslySetInnerHTML={{ __html: contentHtml }} 
        />

        <section style={{ marginTop: '60px', padding: '32px', borderRadius: '16px', border: '1px solid rgba(124,58,237,0.3)', background: 'rgba(124,58,237,0.05)' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Want help in Leander / Austin?</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>
            Whether you're buying, selling, or just have questions about the local market, I'm here to help.
          </p>
          <div className="actions">
            <a href="tel:5126638867" className="btn accent">Call or Text (512) 663-8867</a>
            <a href="mailto:hello@joefsanches.com" className="btn">Email Joe</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Joe Sanches Realtor • Leander, Texas</p>
        <p style={{ marginTop: '4px' }}>Phone: 512-663-8867 • Email: hello@joefsanches.com</p>
      </footer>

      <style jsx global>{`
        .contentHtml h2 { font-size: 28px; margin-top: 40px; margin-bottom: 16px; color: white; }
        .contentHtml h3 { font-size: 22px; margin-top: 32px; margin-bottom: 12px; color: white; }
        .contentHtml p { margin-bottom: 20px; }
        .contentHtml ul, .contentHtml ol { margin-bottom: 20px; padding-left: 20px; }
        .contentHtml li { margin-bottom: 8px; }
        .contentHtml strong { color: white; }
      `}</style>
    </div>
  );
}
