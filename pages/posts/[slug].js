import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

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

  return {
    props: {
      slug: params.slug,
      title: data.title || params.slug,
     date: data.date ? new Date(data.date).toISOString() : null
      contentHtml,
    },
  };
}

export default function Post({ title, date, contentHtml }) {
  return (
    <main style={{ padding: '16px', maxWidth: 780, margin: '0 auto' }}>
      <a href="/">← Back</a>
      <h1>{title}</h1>
      {date ? <p style={{ color: '#555' }}>{new Date(date).toLocaleDateString()}</p> : null}
      <article dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <section style={{ marginTop: 40, padding: 16, border: '1px solid #eee' }}>
        <h2>Want help in Leander / Austin?</h2>
        <p>
          Call or text <strong>(512) XXX-XXXX</strong> or email <strong>hello@joefsanches.com</strong>.
        </p>
      </section>
    </main>
  );
}
