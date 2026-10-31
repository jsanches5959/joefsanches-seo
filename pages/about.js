import Head from 'next/head';
import Link from 'next/link';
import JobberForm from '../components/JobberForm';
import { breadcrumbSchema } from '../lib/breadcrumbs';

const baseUrl = 'https://joefsanches.com';

export default function About() {
  const url = `${baseUrl}/about`;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url,
    mainEntity: {
      '@type': 'Person',
      name: 'Joe Sanches',
      jobTitle: 'Owner, Sanches Group',
      description:
        'Joe Sanches grew up around the framing trade, served as a Marine and worked five years in aviation maintenance, then spent a decade in consumer packaged goods before founding Sanches Group, a general contracting company in Leander, Texas.',
      worksFor: { '@id': `${baseUrl}/#sanchesgroup` },
    },
  };

  return (
    <>
      <Head>
        <title>About Joe Sanches — Sanches Group | Leander &amp; Cedar Park, TX</title>
        <meta
          name="description"
          content="Joe Sanches grew up around the trades, worked aviation maintenance, and spent a decade in consumer packaged goods. Now he runs Sanches Group the same way: vetted crews, licensed partners, one name accountable."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="About Joe Sanches — Sanches Group" />
        <meta property="og:description" content="The operator behind Sanches Group: trades upbringing, aviation maintenance, a decade moving product, one name accountable for your job." />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Joe Sanches — Sanches Group" />
        <meta name="twitter:image" content={`${baseUrl}/og-image.jpg`} />
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema([{ name: 'About' }])),
          }}
        />
      </Head>

      <div className="ab">
        <nav className="ab-nav">
          <Link href="/" className="ab-brand">
            <img src="/logo.png" alt="Sanches Group" width="44" height="44" />
            <span>Sanches Group</span>
          </Link>
          <a href="tel:5126638867" className="ab-call">512-663-8867</a>
        </nav>

        <header className="ab-hero">
          <p className="ab-crumb"><Link href="/">Home</Link> <span>/</span> About</p>
          <h1>The name on the company is the person on the job</h1>
          <p className="ab-intro">
            Sanches Group is run by Joe Sanches. Not a sales team, not a call center —
            one operator who has spent his life in work where the details are the job,
            and who answers for the result when you hire the company.
          </p>
        </header>

        <main className="ab-body">
          <div className="ab-photo">
            <img src="/joe.jpg" alt="Joe Sanches, who runs Sanches Group" width="760" height="872" loading="lazy" />
          </div>

          <section className="ab-sec">
            <h2>It starts with framing</h2>
            <p>
              My father and his brothers framed houses. I was on job sites before I was
              old enough to work on them, carrying, sweeping, watching how a crew that
              knows what it is doing actually moves. The name on this company is the
              name that was on those crews. It is not something invented in a branding
              exercise, and it is not a name I can hide behind — it is my family&apos;s.
            </p>
          </section>

          <section className="ab-sec">
            <h2>Aviation taught me the paperwork is the work</h2>
            <p>
              I served in the Marine Corps, and I spent five years in aviation
              maintenance. In that world there is no such thing as close enough. Every
              task has a procedure, every step gets documented, and a skipped step is
              not a shortcut — it is how people get hurt. You sign your name to the
              work, and the signature means the work was done the way the book says.
            </p>
            <p>
              That is still how I run a job. Written scope before anyone picks up a
              tool. What was done, by whom, on what day, written down. If something is
              wrong, it gets found by a checklist, not by the customer.
            </p>
          </section>

          <section className="ab-sec">
            <h2>A decade moving product taught me logistics</h2>
            <p>
              After aviation I spent ten years in consumer packaged goods, moving
              product for big brands. That work is lead times, landed cost, warehouse
              math, and finding out the hard way which products quietly fail in year
              three. It looks nothing like construction until you are standing in a
              half-finished kitchen: the gap between a three-day job and a three-week
              one is almost never the labor. It is whether the material was ordered,
              the lead times were checked, and the trades were sequenced so nobody is
              waiting on anybody.
            </p>
            <p>
              Homeowners usually blame the crew when a job drags. Most of the time it
              was lost on logistics before the crew ever arrived. That part — the
              unglamorous part — is the part I am actually good at.
            </p>
          </section>

          <section className="ab-sec">
            <h2>Sanches Group is those three things, combined</h2>
            <p>
              The trades are in my family. Aviation maintenance taught me procedure
              and documentation. Consumer goods taught me scheduling, cost, and
              accountability at scale. Sanches Group is where the three meet: our own
              crews for construction and finish work, a bench of local trades we have
              worked with for years, and licensed partners for the licensed work.
            </p>
            <p>
              Sanches Group manages your project start to finish. Licensed trades are
              handled by our licensed partners — one call, one name owns the result.
              That name is mine, and I still answer the phone.
            </p>
          </section>

          <section className="ab-cta">
            <h2>Put him to work</h2>
            <p>
              Tell us what the property needs. Free written estimate, usually the
              same day.
            </p>
            <div className="ab-form">
              <JobberForm />
            </div>
            <p className="ab-or">
              Rather talk first? <a href="tel:5126638867">Call 512-663-8867</a> — Joe
              answers.
            </p>
          </section>
        </main>

        <footer className="ab-foot">
          <p>Sanches Group · Joe Sanches LLC · Leander, Texas</p>
          <p>512-663-8867 · hello@joefsanches.com</p>
          <p><Link href="/credentials">What our credentials actually mean →</Link></p>
        </footer>
      </div>

      <style jsx global>{`
        :root {
          --a-black:#faf8f3; --a-card:#ffffff; --a-gold:#c8a84b; --a-white:#16180f;
          --a-text:#363a2f; --a-muted:#5f6455; --a-gb:rgba(200,168,75,.5);
          --a-div:rgba(22,24,15,.10); --a-gold-ink:#7d6318;
        }
        body { margin:0; background:var(--a-black); color:var(--a-text);
          font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',sans-serif;
          line-height:1.7; }
        .ab a { color:var(--a-gold-ink); text-decoration:none; }
        .ab-nav { position:sticky; top:0; z-index:50; display:flex; align-items:center;
          justify-content:space-between; padding:14px 24px; background:rgba(250,248,243,.95);
          backdrop-filter:blur(16px); border-bottom:1px solid var(--a-gb); }
        .ab-brand { display:flex; align-items:center; gap:12px; color:var(--a-white)!important;
          font-weight:900; letter-spacing:1px; text-transform:uppercase; font-size:14px; }
        .ab-brand img { height:42px; }
        .ab-call { background:var(--a-gold); color:var(--a-white)!important; padding:9px 18px;
          border-radius:4px; font-weight:900; font-size:13px; }
        .ab-hero { max-width:780px; margin:0 auto; padding:56px 24px 10px; }
        .ab-crumb { font-size:12px; color:var(--a-muted); margin:0 0 18px;
          text-transform:uppercase; letter-spacing:1.5px; }
        .ab-crumb span { opacity:.5; margin:0 6px; }
        .ab-hero h1 { font-size:44px; line-height:1.1; font-weight:900; color:var(--a-white);
          letter-spacing:-1.2px; margin:0 0 20px; }
        .ab-intro { font-size:17px; margin:0; }
        .ab-body { max-width:780px; margin:0 auto; padding:0 24px 60px; }
        .ab-photo { margin:26px 0 6px; }
        .ab-photo img { width:100%; max-width:420px; height:auto; border-radius:6px;
          border:1px solid var(--a-gb); display:block; }
        .ab-sec { padding:28px 0 2px; border-top:1px solid var(--a-div); margin-top:28px; }
        .ab-sec h2 { font-size:26px; font-weight:900; color:var(--a-white);
          letter-spacing:-.5px; margin:0 0 14px; line-height:1.2; }
        .ab-sec p { margin:0 0 14px; font-size:16px; }
        .ab-cta { padding:40px 0 0; border-top:1px solid var(--a-div); margin-top:34px; }
        .ab-cta h2 { font-size:24px; font-weight:900; color:var(--a-white); margin:0 0 6px; }
        .ab-cta p { color:var(--a-muted); margin:0 0 22px; }
        .ab-form { background:var(--a-card); border:1px solid var(--a-gb);
          border-radius:6px; padding:24px; }
        .ab-or { margin-top:20px !important; font-size:15px; }
        .ab-or a { font-weight:700; }
        .ab-foot { background:#14160f; border-top:3px solid var(--a-gold); padding:32px 24px; text-align:center;
          font-size:14px; color:#c9cdbf; }
        .ab-foot a { color:#e8cd77 !important; }
        .ab-foot p { margin:0 0 8px; }
        @media (max-width:640px){
          .ab-hero h1 { font-size:31px; }
          .ab-sec h2 { font-size:22px; }
          .ab-form { padding:16px; }
        }
      `}</style>
    </>
  );
}
