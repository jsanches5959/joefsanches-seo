import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import Head from 'next/head';

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

  // The template already renders the title as the page's H1. Every post file
  // also opens with a matching "# Title" line, so the heading was being output
  // twice — visible duplication for readers and two H1s for search engines.
  // Strip the leading H1 from the body; the rest of the content is untouched.
  const body = content.replace(/^\s*#\s+.+?\n/, '');

  const processedContent = await remark().use(html).process(body);
  const contentHtml = processedContent.toString();

  // Ensure date is JSON-serializable and safe
  let date = null;
  if (data.date) {
    const d = new Date(data.date);
    if (!isNaN(d.getTime())) {
      date = d.toISOString();
    }
  }

  // Extract H1 from content for page title
  const h1Match = content.match(/^#\s+(.+)$/m);
  const h1Title = h1Match ? h1Match[1].trim() : null;

  // Find first real paragraph (skip headings, bullets, images, empty lines)
  const firstParagraph = content
    .split('\n')
    .map(l => l.trim())
    .find(l => l.length > 60 && !l.startsWith('#') && !l.startsWith('-') && !l.startsWith('*') && !l.startsWith('!') && !l.startsWith('|') && !l.startsWith('>'));
  // Clean markdown (links, bold, italics) out of the fallback so the snippet reads as prose
  const cleanFallback = firstParagraph
    ? firstParagraph
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/[*_`]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
    : null;
  // Trim to ~155 chars on a word boundary so Google doesn't cut mid-word
  const trimmedFallback = cleanFallback && cleanFallback.length > 155
    ? cleanFallback.substring(0, 155).replace(/\s+\S*$/, '') + '…'
    : cleanFallback;
  // Posts are either real estate (the original 104) or contracting. The page
  // brands itself accordingly: someone who searched "drywall crack repair"
  // should not land on a realtor's page being sold a house.
  const contracting = data.category === 'contracting';

  // Pull the FAQ block into FAQPage structured data. The questions are already
  // written on the page for readers; declaring them makes the same content
  // eligible for "People also ask" and gives answer engines exact pairs to
  // quote rather than a guess at where an answer starts and stops.
  const faqs = [];
  const faqSection = content.split(/\n##\s+Frequently asked questions\s*\n/i)[1];
  if (faqSection) {
    // Stop at the next H2 so the closing summary is not swept in.
    const block = faqSection.split(/\n##\s+/)[0];
    const re = /\*\*(.+?)\*\*\s*\n([\s\S]*?)(?=\n\s*\n\*\*|\n\s*---|$)/g;
    let m;
    while ((m = re.exec(block)) !== null) {
      const q = m[1].trim();
      const a = m[2]
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')  // links to plain text
        .replace(/[*_`]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      if (q.endsWith('?') && a.length > 30) faqs.push({ q, a });
    }
  }

  const fallbackBlurb = contracting
    ? 'Sanches Group — construction, drywall, painting and property maintenance in Leander, Cedar Park and greater Austin.'
    : 'Joe Sanches is a licensed Realtor and military veteran serving buyers and sellers in Leander, Cedar Park, and greater Austin.';
  const description = data.description || trimmedFallback || fallbackBlurb;

  return {
    props: {
      slug: params.slug,
      title: data.title || h1Title || params.slug,
      date,
      contentHtml,
      description,
      contracting,
      faqs,
    },
  };
}

export default function Post({ slug, title, date, contentHtml, description, contracting, faqs = [] }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://joefsanches.com';
  const postUrl = `${baseUrl}/posts/${slug}`;
  const publishedDate = date ? new Date(date).toISOString() : new Date().toISOString();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: `${baseUrl}/logo.png`,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      '@type': 'Person',
      name: 'Joe Sanches',
      url: baseUrl,
    },
    publisher: {
      '@type': contracting ? 'GeneralContractor' : 'Organization',
      name: contracting ? 'Sanches Group' : 'Joe Sanches Realtor',
      telephone: '+1-512-663-8867',
      areaServed: 'Leander, Cedar Park, Georgetown, Round Rock, Austin TX',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
  };

  return (
    <>
      <Head>
        <title>{title} | {contracting ? 'Sanches Group' : 'Joe Sanches Realtor'}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={postUrl} />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={`${baseUrl}/logo.png`} />
        <meta property="og:site_name" content={contracting ? 'Sanches Group' : 'Joe Sanches Realtor'} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${baseUrl}/logo.png`} />
        
        {/* Article Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        {faqs.length > 0 ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              }),
            }}
          />
        ) : null}
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
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src="/logo.png" alt="Joe Sanches Logo" className="logo" />
              <div>
                {/* The masthead is site identity, not the page's heading — the
                    article title is the H1. Styled by .brand so it looks the
                    same as before. */}
                <span className="brand-name">{contracting ? 'Sanches Group' : 'Joe Sanches'}</span>
                <p className="sub">
                  {contracting
                    ? 'Construction · Repairs · Maintenance'
                    : 'Real Estate · A Sanches Group Company'}
                </p>
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
                <h2 style={{ fontSize: '26px', marginBottom: '16px', color: 'white' }}>
                  {contracting ? 'Need this fixed?' : 'Want help in Leander / Austin?'}
                </h2>
                <p style={{ color: 'var(--muted)', marginBottom: '28px', fontSize: '16px', lineHeight: '1.6' }}>
                  {contracting
                    ? 'Sanches Group handles drywall, texture, painting and the rest of the punch list across Leander, Cedar Park, Georgetown and greater Austin. Free estimates — send a photo and we will tell you straight whether it is a patch or a bigger job.'
                    : "Whether you're buying, selling, or just have questions about the local market, I'm here to help."}
                </p>
                <div className="actions">
                  <a href="tel:5126638867" className="btn accent" style={{ padding: '12px 20px', fontSize: '15px' }}>Call or Text (512) 663-8867</a>
                  <a href="mailto:hello@joefsanches.com" className="btn" style={{ padding: '12px 20px', fontSize: '15px' }}>Email Joe</a>
                </div>
              </section>
            </article>
          </main>

          <aside className="side">
            {contracting ? (
              <>
                <div className="card" style={{ background: 'rgba(200,168,75,0.06)', borderColor: 'rgba(200,168,75,0.3)', textAlign: 'center', marginBottom: '20px' }}>
                  <h3 className="cardTitle" style={{ color: 'var(--gold)', letterSpacing: '1px' }}>FREE ESTIMATE</h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '10px', marginBottom: '16px', lineHeight: '1.6' }}>
                    Send a photo of the damage. We&apos;ll tell you what it is and what it costs — no charge, no pressure.
                  </p>
                  <a href="sms:5126638867" className="btn accent" style={{ justifyContent: 'center', fontSize: '14px', display: 'block', textAlign: 'center', padding: '12px 20px' }}>
                    Text a Photo
                  </a>
                </div>
                <div className="card" style={{ background: 'rgba(107,120,84,0.05)', borderColor: 'rgba(107,120,84,0.2)', marginBottom: '20px' }}>
                  <h3 className="cardTitle" style={{ color: 'var(--accent-light)', marginBottom: '14px' }}>SERVICES</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', lineHeight: '2' }}>
                    <li><a href="/services/drywall-repair-leander-tx">Drywall Repair &amp; Texture →</a></li>
                    <li><a href="/services/interior-exterior-painting-leander-tx">Interior &amp; Exterior Painting →</a></li>
                    <li><a href="/services/home-remodeling-leander-tx">Remodeling &amp; Construction →</a></li>
                    <li><a href="/services/handyman-services-leander-tx">Handyman &amp; Repairs →</a></li>
                  </ul>
                </div>
                <div className="card" style={{ background: 'rgba(107,120,84,0.05)', borderColor: 'rgba(107,120,84,0.2)', textAlign: 'center', position: 'sticky', top: '20px' }}>
                  <h3 className="cardTitle" style={{ color: 'var(--accent-light)' }}>Sanches Group</h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '8px' }}>Leander · Cedar Park · Austin</p>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '12px', lineHeight: '1.6' }}>
                    Construction, drywall, paint and property maintenance across Central Texas. Licensed &amp; insured. Veteran-owned.
                  </p>
                  <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a href="tel:5126638867" className="btn accent" style={{ fontSize: '13px', justifyContent: 'center' }}>Call / Text</a>
                    <a href="/#contact" className="btn" style={{ fontSize: '13px', justifyContent: 'center' }}>Request an Estimate</a>
                  </div>
                </div>
              </>
            ) : (
              <>
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
            <div className="card" style={{ background: 'rgba(200,168,75,0.05)', borderColor: 'rgba(200,168,75,0.3)', textAlign: 'center', marginBottom: '20px' }}>
              <h3 className="cardTitle" style={{ color: 'var(--gold)', letterSpacing: '1px' }}>SANCHES GROUP</h3>
              <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '10px', lineHeight: '1.6' }}>
                Construction · unit turns · facilities maintenance · government contracting. Service-Disabled Veteran-Owned.
              </p>
              <a href="/" className="btn" style={{ marginTop: '14px', fontSize: '13px', justifyContent: 'center' }}>Visit the Contracting Site →</a>
            </div>
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
              <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '8px' }}>Realtor · Sanches Group</p>
              <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '12px', lineHeight: '1.6' }}>
                Helping Leander homeowners buy and sell with confidence. Military veteran with strategic pricing expertise.
              </p>
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href="tel:5126638867" className="btn accent" style={{ fontSize: '13px', justifyContent: 'center' }}>Call / Text</a>
                <a href="mailto:hello@joefsanches.com" className="btn" style={{ fontSize: '13px', justifyContent: 'center' }}>Email</a>
              </div>
            </div>
              </>
            )}
          </aside>
        </div>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Joe Sanches LLC · Sanches Group · Leander, Texas</p>
          <p style={{ marginTop: '6px' }}><a href="/" style={{ textDecoration: 'underline' }}>Construction · Facilities · Government Contracting — Sanches Group</a></p>
          <p style={{ marginTop: '8px' }}>Phone: 512-663-8867 • Email: hello@joefsanches.com</p>
          <div style={{ marginTop: '16px' }}>
            <a href="https://g.page/r/CS5gIVIj8I-AEBE/review" target="_blank" rel="noopener noreferrer" className="btn" style={{ fontSize: '12px', opacity: 0.8 }}>
              ⭐ Review Joe on Google
            </a>
          </div>
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
          .container { padding-bottom: 100px; }
          @media (max-width: 860px) {
            .side { position: relative !important; top: auto !important; }
          }
        `}</style>
      </div>
    </>
  );
}
// Build trigger: Sun Feb 22 22:05:31 EST 2026
