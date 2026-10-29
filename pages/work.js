import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Link from 'next/link';
import JobberForm from '../components/JobberForm';
import { breadcrumbSchema } from '../lib/breadcrumbs';

const baseUrl = 'https://joefsanches.com';

export async function getStaticProps() {
  const file = path.join(process.cwd(), 'content/work.json');
  const projects = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { projects } };
}

/* Alternating photo/text rows. One project per row so each photo is large
   enough to actually show the work — a grid of thumbnails would make a
   chandelier and a meter stack look like the same job. */
const css = `
  /* Shared page chrome. The homepage defines these inside its own inline
     style block rather than in global.css, so a new page gets none of them
     and the layout collapses — .w in particular, which is what keeps the
     content inside the viewport. Copied verbatim so the two stay identical. */
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
  .lead-form-wrap {
    margin: 28px auto 0; max-width: 820px; background: var(--card);
    border: 1px solid var(--line); border-top: 4px solid var(--gold);
    border-radius: 10px; padding: clamp(22px, 4vw, 40px);
    box-shadow: 0 18px 50px rgba(22,24,15,.07); text-align: left;
  }
  footer { background: var(--night); border-top: 1px solid rgba(255,255,255,.08); padding: 40px clamp(20px, 5vw, 48px) 48px; text-align: center; }
  footer img.mark { height: 64px; margin-bottom: 14px; }
  footer p { font-size: 14px; color: #b9bdaf; margin-bottom: 6px; }
  footer a { color: #e8cd77; }
  .foot-nav { display: flex; gap: 22px; justify-content: center; flex-wrap: wrap; margin: 16px 0; }
  .foot-nav a { font-size: 13px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #dfe2d6; }

  .wk-hero { padding: clamp(44px, 7vw, 84px) 0 clamp(28px, 4vw, 48px); text-align: center; }
  .wk-eyebrow {
    display: block; font-size: 13px; font-weight: 800; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--olive-ink); margin-bottom: 14px;
  }
  .wk-hero h1 {
    font-size: clamp(32px, 6vw, 58px); line-height: 1.04; letter-spacing: -0.035em;
    font-weight: 900; color: var(--ink); margin-bottom: 16px; text-wrap: balance;
  }
  .wk-hero p {
    font-size: clamp(17px, 1.7vw, 20px); color: var(--text); line-height: 1.75;
    max-width: 62ch; margin: 0 auto;
  }

  .wk-list { display: grid; gap: clamp(48px, 7vw, 92px); padding-bottom: clamp(56px, 8vw, 104px); }
  .wk-item {
    display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(24px, 4vw, 56px); align-items: center;
  }
  .wk-item:nth-child(even) .wk-shot { order: 2; }
  .wk-shot {
    margin: 0; border-radius: 12px; overflow: hidden;
    border: 1px solid var(--line); background: var(--card);
    box-shadow: 0 18px 44px rgba(22,24,15,.12);
  }
  .wk-shot img { display: block; width: 100%; height: auto; }
  .wk-body { min-width: 0; }
  .wk-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
  .wk-tag {
    font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase;
    padding: 6px 11px; border-radius: 999px; border: 1px solid var(--line);
    background: var(--card); color: var(--text);
  }
  .wk-tag.trade { background: rgba(200,168,75,.16); border-color: var(--gold-border); color: var(--gold-ink); }
  .wk-body h2 {
    font-size: clamp(23px, 2.9vw, 34px); line-height: 1.12; letter-spacing: -0.025em;
    font-weight: 900; color: var(--ink); margin-bottom: 12px; text-wrap: balance;
  }
  .wk-body p { font-size: 17px; color: var(--text); line-height: 1.8; max-width: 56ch; }
  .wk-note {
    margin-top: 14px; font-size: 14px; color: var(--muted); line-height: 1.6;
    padding-left: 13px; border-left: 2px solid var(--line-2);
  }

  /* Said once, plainly, rather than repeated under every caption. */
  .wk-how {
    background: var(--paper-2); border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    padding: clamp(32px, 5vw, 56px) 0;
  }
  .wk-how-inner { max-width: 760px; }
  .wk-how h2 {
    font-size: clamp(20px, 2.4vw, 27px); font-weight: 900; color: var(--ink);
    letter-spacing: -0.02em; margin-bottom: 12px;
  }
  .wk-how p { font-size: 16px; color: var(--text); line-height: 1.8; max-width: 64ch; }
  .wk-how p + p { margin-top: 12px; }

  .wk-cta { padding: clamp(48px, 7vw, 88px) 0; text-align: center; }
  .wk-cta h2 {
    font-size: clamp(26px, 3.4vw, 38px); font-weight: 900; color: var(--ink);
    letter-spacing: -0.03em; margin-bottom: 10px;
  }
  .wk-cta > .w > p { font-size: 17px; color: var(--text); margin-bottom: 4px; }

  @media (max-width: 860px) {
    .nav-links li.nav-text { display: none; }
  }
  @media (max-width: 820px) {
    .wk-item { grid-template-columns: minmax(0, 1fr); gap: 20px; }
    .wk-item:nth-child(even) .wk-shot { order: 0; }
    .wk-body p { max-width: none; }
  }
  @media (max-width: 620px) {
    .nav-logo b { display: none; }
  }
`;

export default function Work({ projects }) {
  const title = 'Recent Work | Sanches Group — Leander & Central Texas';
  // Kept under the ~155 characters Google renders, so the last clause is read
  // rather than replaced with an ellipsis.
  const description =
    'Photos from recent Sanches Group jobs around Central Texas — lighting, custom built-ins, and apartment meter and service work. Not staged, not stock.';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Recent Work — Sanches Group',
    description,
    url: `${baseUrl}/work`,
    about: {
      '@id': `${baseUrl}/#sanchesgroup`,
      '@type': 'GeneralContractor',
      name: 'Sanches Group',
      telephone: '+1-512-663-8867',
    },
    hasPart: projects.map((p) => ({
      '@type': 'ImageObject',
      contentUrl: `${baseUrl}${p.image}`,
      name: p.title,
      description: p.story,
      caption: p.alt,
    })),
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${baseUrl}/work`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${baseUrl}${projects[0].image}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${baseUrl}${projects[0].image}`} />
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {/* Google draws the trail in place of the URL in a search result. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema([{ name: 'Recent Work' }])),
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
            <li className="nav-text"><a href="tel:5126638867">512-663-8867</a></li>
            <li><a href="#quote" className="nav-call">Free Estimate</a></li>
          </ul>
        </div>
      </nav>

      <header className="wk-hero">
        <div className="w">
          <span className="wk-eyebrow">Recent Work</span>
          <h1>Some of what we&rsquo;ve been building.</h1>
          <p>
            A few jobs from around Central Texas. Not staged, not stock &mdash; these are
            photographs from the sites themselves, including one taken before the job was done.
          </p>
        </div>
      </header>

      <main>
        <div className="w">
          <div className="wk-list">
            {projects.map((p) => (
              <article className="wk-item" key={p.slug}>
                <figure className="wk-shot">
                  <img src={p.image} alt={p.alt} width="1200" height="1600" loading="lazy" />
                </figure>
                <div className="wk-body">
                  <div className="wk-tags">
                    <span className="wk-tag trade">{p.trade}</span>
                    <span className="wk-tag">{p.city}</span>
                  </div>
                  <h2>{p.title}</h2>
                  <p>{p.story}</p>
                  {p.partner ? (
                    <p className="wk-note">
                      Electrical work on this project was performed by our licensed
                      electrical partners, managed by Sanches Group.
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>

        <section className="wk-how">
          <div className="w">
            <div className="wk-how-inner">
              <h2>How we work on jobs like these</h2>
              <p>
                Sanches Group runs the project. We scope it, schedule it, bring in the right
                people, and stay accountable for the result &mdash; one point of contact from the
                first walkthrough to the last punch list item.
              </p>
              <p>
                Our own crews self-perform construction and finish work: remodeling, carpentry,
                drywall, paint, flooring. Licensed trades &mdash; electrical, plumbing, HVAC and
                roofing &mdash; are performed by appropriately licensed contractors we engage and
                manage. Sanches Group does not hold, and does not claim to hold, trade
                qualifier licenses in those categories. We manage the scope, the schedule and
                the standard, and we stand behind the finished job.
              </p>
            </div>
          </div>
        </section>

        <section className="wk-cta" id="quote">
          <div className="w">
            <h2>Got something like this?</h2>
            <p>Send a photo and we&rsquo;ll tell you what it takes. Free estimate, usually the same day.</p>
            <div className="lead-form-wrap">
              <JobberForm />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <img src="/logo.png" alt="Sanches Group" className="mark" width="64" height="64" />
        <div className="foot-nav">
          <Link href="/work">Recent Work</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/#services">Services</Link>
          <Link href="/credentials">Credentials</Link>
          <Link href="/government">Government</Link>
          <a href="#quote">Free Estimate</a>
        </div>
        <p>© {new Date().getFullYear()} Joe Sanches LLC · Sanches Group · Leander, Texas</p>
        <p>512-663-8867 · <a href="mailto:hello@joefsanches.com">hello@joefsanches.com</a></p>
        <p>Service-Disabled Veteran-Owned · Texas HUB Certified · SDVOSB · SAM.gov Active · Licensed &amp; Insured</p>
      </footer>
    </>
  );
}
