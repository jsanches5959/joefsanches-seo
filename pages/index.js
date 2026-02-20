import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), 'content/posts');
  const files = fs.readdirSync(postsDir);
  const posts = files
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const { data } = matter(raw);
      return {
        title: data.title || slug,
        slug: data.slug || slug,
        date: data.date || null,
      };
    })
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  return {
    props: { posts },
  };
}

export default function Home({ posts }) {
  return (
    <main style={{ maxWidth: 800, margin: '40px auto', padding: '0 20px' }}>
      <h1>Joe F. Sanches Real Estate</h1>
      <p>Daily AI-updated local SEO articles.</p>
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/posts/${p.slug}`}>{p.title}</Link>
            {p.date ? ` — ${new Date(p.date).toLocaleDateString()}` : ''}
          </li>
        ))}
      </ul>
    </main>
  );
}
