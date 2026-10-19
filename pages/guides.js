import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Link from 'next/link';
import { topicOf } from '../lib/related';
import { breadcrumbSchema } from '../lib/breadcrumbs';

const baseUrl = 'https://joefsanches.com';

/* The site has 138 written guides and no page that listed them. There was no
   way to browse them, no single page to link to when somebody asks "where do
   I read about this", and nothing for Google to read as "this is the library
   and these are the pieces in it". Every post was reachable only by searching
   for its exact subject. */

const SECTIONS = [
  {
    key: 'contracting',
    heading: 'Home & Property Repair',
    blurb:
      'What the work involves, what it costs around Leander and Cedar Park, and how to tell a real bid from a cheap one.',
    groups: [
      ['tree', 'Trees & Land Clearing'],
      ['drywall', 'Drywall & Texture'],
      ['paint', 'Painting'],
    ],
  },
  {
    key: 'realestate',
    heading: 'Leander & Central Texas Real Estate',
    blurb:
      'Neighborhoods, property taxes, school zones and what the market is actually doing — written for people deciding where to live.',
    groups: [
      ['neighborhood', 'Neighborhoods'],
      ['tax', 'Property Taxes & MUDs'],
      ['school', 'Schools'],
      ['builder', 'New Construction & Builders'],
      ['buying', 'Buying'],
      ['selling', 'Selling'],
      ['relocating', 'Relocating & Commutes'],
      ['market', 'Market & Prices'],
    ],
  },
];

export async function getStaticProps() {
  const dir = path.join(process.cwd(), 'content/posts');
  const posts = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const slug = f.replace(/\.md$/, '');
      const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
      return {
        slug,
        title: data.title || data.seoTitle || slug,
        contracting: data.category === 'contracting',
        topic: topicOf(slug),
      };
    });

  const sections = SECTIONS.map((section) => {
    const mine = posts.filter((p) => p.contracting === (section.key === 'contracting'));
    const named = new Set(section.groups.map(([t]) => t));
    const groups = section.groups
      .map(([topic, label]) => ({
        label,
        posts: mine
          .filter((p) => p.topic === topic)
          .sort((a, b) => a.title.localeCompare(b.title))
          .map(({ slug, title }) => ({ slug, title })),
      }))
      .filter((g) => g.posts.length);

    // Anything the topic rules don't place still gets listed, rather than
    // being quietly dropped off the page it is supposed to be indexed on.
    const rest = mine
      .filter((p) => !p.topic || !named.has(p.topic))
      .sort((a, b) => a.title.localeCompare(b.title))
      .map(({ slug, title }) => ({ slug, title }));
    if (rest.length) groups.push({ label: 'More', posts: rest });

    return { heading: section.heading, blurb: section.blurb, groups };
  }).filter((s) => s.groups.length);

  const count = posts.length;
  return { props: { sections, count } };
}

const css = `
  /* Shared page chrome, defined inside the homepage's own style block rather
     than in global.css. Copied verbatim so the two stay identical — .w in
     particular is what keeps the content inside the viewport. */
  .w { max-width: 1180px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 48px); }

  .nav {
    position: sticky; top: 0; z-index: 200;
    background: rgba(250,248,243,0.92);
    backdrop-filter: blur(16px) saturate(1.2);
    border-bottom: 1px solid var(--line);
  }
  .nav-inner {
    display: flex; align-items: center; justify-content: space-between; gap: 24px;
    padding: 10px clamp(20px, 5vw, 48px); max-width: 1180px; margin: 0 auto;
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; color: var(--ink) !important; }
  .nav-logo img { height: 44px; display: block; }
  .nav-logo b { font-size: 15px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; }
  .nav-links { display: flex; gap: 26px; list-style: none; align-items: center; }
  .nav-links a {
    white-space: nowrap; font-size: 13px; font-weight: 800; color: var(--muted);
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .nav-links a:hover { color: var(--ink); }
  .nav-call {
    background: var(--gold); color: var(--ink) !important;
    padding: 10px 18px; border-radius: 6px;
    font-weight: 900; font-size: 13px; letter-spacing: 0.06em;
  }
  footer { background: var(--night); border-top: 1px solid rgba(255,255,255,.08); padding: 40px clamp(20px, 5vw, 48px) 48px; text-align: center; }
  footer img.mark { height: 64px; margin-bottom: 14px; }
  footer p { font-size: 14px; color: #b9bdaf; margin-bottom: 6px; }
  footer a { color: #e8cd77; }
  .foot-nav { display: flex; gap: 22px; justify-content: center; flex-wrap: wrap; margin: 16px 0; }
  .foot-nav a { font-size: 13px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #dfe2d6; }

  .gd-hero { padding: clamp(40px, 6vw, 76px) 0 clamp(24px, 3vw, 40px); }
  .gd-eyebrow {
    display: block; font-size: 13px; font-weight: 800; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--olive-ink); margin-bottom: 14px;
  }
  .gd-hero h1 {
    font-size: clamp(32px, 5.5vw, 54px); line-height: 1.05; letter-spacing: -0.035em;
    font-weight: 900; color: var(--ink); margin-bottom: 16px; text-wrap: balance;
  }
  .gd-hero p { font-size: clamp(17px, 1.7vw, 20px); color: var(--text); line-height: 1.7; max-width: 62ch; }

  .gd-section { padding: clamp(28px, 4vw, 48px) 0; border-top: 1px solid var(--line); }
  .gd-section > .w > h2 {
    font-size: clamp(24px, 3vw, 34px); font-weight: 900; color: var(--ink);
    letter-spacing: -0.03em; margin-bottom: 10px;
  }
  .gd-section > .w > p { font-size: 17px; color: var(--text); line-height: 1.7; max-width: 60ch; margin-bottom: 28px; }

  .gd-group { margin-bottom: 30px; }
  .gd-group h3 {
    font-size: 13px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--olive-ink); margin-bottom: 10px;
  }
  .gd-group ul {
    list-style: none; margin: 0; padding: 0;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 0 32px;
  }
  .gd-group li { border-bottom: 1px solid var(--line); }
  /* 17px and a tall row because a good share of the people reading this site
     are over sixty, and a list of 138 links is where small type hurts most. */
  .gd-group a { display: block; padding: 13px 0; font-size: 17px; line-height: 1.45; color: var(--text); }
  .gd-group a:hover, .gd-group a:focus-visible { color: var(--ink); text-decoration: underline; }

  .gd-cta { padding: clamp(40px, 6vw, 72px) 0; border-top: 1px solid var(--line); text-align: center; }
  .gd-cta h2 { font-size: clamp(24px, 3vw, 34px); font-weight: 900; color: var(--ink); letter-spacing: -0.03em; margin-bottom: 10px; }
  .gd-cta p { font-size: 17px; color: var(--text); margin-bottom: 22px; }
  .gd-cta .actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

  @media (max-width: 860px) { .nav-links li.nav-text { display: none; } }
  @media (max-width: 620px) { .nav-logo b { display: none; } }
`;

export default function Guides({ sections, count }) {
  const title = 'Guides: Home Repair & Leander Real Estate';
  const description =
    'Plain-language guides to home and property repair around Leander and Cedar Park, and to buying, selling and property taxes in Central Texas.';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Guides — Sanches Group',
    description,
    url: `${baseUrl}/guides`,
    hasPart: sections.flatMap((s) =>
      s.groups.flatMap((g) =>
        g.posts.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: `${baseUrl}/posts/${p.slug}`,
        }))
      )
    ),
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/guides`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${baseUrl}/guides`} />
        <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema([{ name: 'Guides' }])),
          }}
        />
      </Head>

      <nav className="nav">
        <div className="nav-inner">
          <Link className="nav-logo" href="/">
            <img src="/logo.png" alt="Sanches Group" width="44" height="44" />
            <b>Sanches Group</b>
          </Link>
          <ul className="nav-links">
            <li className="nav-text"><Link href="/#services">Services</Link></li>
            <li className="nav-text"><Link href="/work">Recent Work</Link></li>
            <li className="nav-text"><a href="tel:5126638867">512-663-8867</a></li>
            <li><a href="/#contact" className="nav-call">Free Estimate</a></li>
          </ul>
        </div>
      </nav>

      <header className="gd-hero">
        <div className="w">
          <span className="gd-eyebrow">Guides</span>
          <h1>Everything we&rsquo;ve written down.</h1>
          <p>
            {count} guides, written from the jobs themselves and from working this market:
            what the work involves, what it costs around Leander and Cedar Park, and the
            things worth knowing before you buy or sell a house here.
          </p>
        </div>
      </header>

      <main>
        {sections.map((s) => (
          <section className="gd-section" key={s.heading}>
            <div className="w">
              <h2>{s.heading}</h2>
              <p>{s.blurb}</p>
              {s.groups.map((g) => (
                <div className="gd-group" key={g.label}>
                  <h3>{g.label}</h3>
                  <ul>
                    {g.posts.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/posts/${p.slug}`}>{p.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="gd-cta">
          <div className="w">
            <h2>Rather just ask someone?</h2>
            <p>Send a photo and a sentence. You&rsquo;ll get a written price, usually the same day.</p>
            <div className="actions">
              <a href="tel:5126638867" className="btn accent" style={{ padding: '14px 26px', fontSize: '16px' }}>
                Call or text 512-663-8867
              </a>
              <Link href="/work" className="btn" style={{ padding: '14px 26px', fontSize: '16px' }}>
                See recent work →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <img src="/logo.png" alt="Sanches Group" className="mark" width="64" height="64" />
        <div className="foot-nav">
          <Link href="/guides">Guides</Link>
          <Link href="/work">Recent Work</Link>
          <Link href="/#services">Services</Link>
          <Link href="/credentials">Credentials</Link>
          <Link href="/government">Government</Link>
        </div>
        <p>© {new Date().getFullYear()} Joe Sanches LLC · Sanches Group · Leander, Texas</p>
        <p>512-663-8867 · <a href="mailto:hello@joefsanches.com">hello@joefsanches.com</a></p>
        <p>Service-Disabled Veteran-Owned · Texas HUB Certified · SDVOSB · SAM.gov Active · Licensed &amp; Insured</p>
      </footer>
    </>
  );
}
