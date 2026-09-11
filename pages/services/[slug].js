import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Link from 'next/link';
import LeadForm from '../../components/LeadForm';
import ToolIcon from '../../components/ToolIcon';

const baseUrl = 'https://joefsanches.com';

function loadServices() {
  const file = path.join(process.cwd(), 'content/services.json');
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export async function getStaticPaths() {
  return {
    paths: loadServices().map((s) => ({ params: { slug: s.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const all = loadServices();
  const service = all.find((s) => s.slug === params.slug);
  const others = all.filter((s) => s.slug !== params.slug);
  return { props: { service, others } };
}

export default function Service({ service, others }) {
  const url = `${baseUrl}/services/${service.slug}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url,
    serviceType: service.name,
    provider: {
      '@type': 'GeneralContractor',
      name: 'Sanches Group',
      alternateName: 'Joe Sanches LLC',
      telephone: '+1-512-663-8867',
      email: 'hello@joefsanches.com',
      url: baseUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Leander',
        addressRegion: 'TX',
        postalCode: '78641',
        addressCountry: 'US',
      },
    },
    areaServed: [
      'Leander, TX', 'Cedar Park, TX', 'Georgetown, TX', 'Liberty Hill, TX',
      'Round Rock, TX', 'Pflugerville, TX', 'Austin, TX',
    ].map((name) => ({ '@type': 'City', name })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <Head>
        <title>{`${service.title} | Sanches Group`}</title>
        <meta name="description" content={service.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={service.title} />
        <meta property="og:description" content={service.description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${baseUrl}/logo.png`} />
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <div className="svc">
        <nav className="svc-nav">
          <Link href="/" className="svc-brand">
            <img src="/logo.png" alt="Sanches Group" />
            <span>Sanches Group</span>
          </Link>
          <a href="tel:5126638867" className="svc-call">512-663-8867</a>
        </nav>

        <header className="svc-hero">
          <p className="svc-crumb">
            <Link href="/">Home</Link> <span>/</span> <Link href="/#services">Services</Link>{' '}
            <span>/</span> {service.shortName}
          </p>
          <ToolIcon name={service.icon} size={52} className="svc-hero-icon" />
          <h1>{service.h1}</h1>
          <p className="svc-intro">{service.intro}</p>
          <div className="svc-trust">
            <span>Licensed &amp; Insured</span><i />
            <span>Free Estimates</span><i />
            <span>One Point of Contact</span><i />
            <span>Veteran-Owned</span>
          </div>
          <div className="svc-ctas">
            <a href="#quote" className="svc-btn">Get a Free Estimate</a>
            <a href="tel:5126638867" className="svc-btn ghost">Call 512-663-8867</a>
          </div>
        </header>

        <main className="svc-body">
          <section>
            <h2>What we handle</h2>
            <ul className="svc-list">
              {service.included.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2>How it works</h2>
            <ol className="svc-steps">
              {service.process.map(([title, desc], i) => (
                <li key={title}>
                  <span className="svc-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2>Questions we get asked</h2>
            {service.faq.map(([q, a]) => (
              <div className="svc-faq" key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </section>

          <section id="quote">
            <h2>Get a free estimate</h2>
            <div className="svc-form">
              <LeadForm
                blurb={`Tell us about your ${service.shortName.toLowerCase()} job — a photo helps. We read every one and usually reply the same day.`}
                compact
              />
            </div>
          </section>

          <section>
            <h2>Other services</h2>
            <div className="svc-others">
              {others.map((o) => (
                <Link key={o.slug} href={`/services/${o.slug}`} className="svc-other">
                  <ToolIcon name={o.icon} size={28} className="svc-other-icon" />
                  <span className="svc-other-text">
                    <strong>{o.name}</strong>
                    <span>{o.city}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <footer className="svc-foot">
          <p>Sanches Group · Joe Sanches LLC · Leander, Texas</p>
          <p>512-663-8867 · hello@joefsanches.com</p>
          <p className="svc-fine">
            Serving Leander, Cedar Park, Georgetown, Liberty Hill, Round Rock, Pflugerville
            and the greater Austin area. Licensed trade work (plumbing, electrical, HVAC) is
            referred to or subcontracted through appropriately licensed professionals.
          </p>
          <p><Link href="/government">Government &amp; institutional contracting →</Link></p>
        </footer>
      </div>

      <style jsx global>{`
        :root {
          --sg-black:#080808; --sg-card:#0f110d; --sg-gold:#c8a84b; --sg-gold2:#e4c76b;
          --sg-white:#fff; --sg-text:#d4d8cc; --sg-muted:#8f9486;
          --sg-gb:rgba(200,168,75,.28); --sg-div:rgba(255,255,255,.07);
        }
        body { margin:0; background:var(--sg-black); color:var(--sg-text);
          font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',sans-serif;
          line-height:1.65; }
        .svc a { color:var(--sg-gold); text-decoration:none; }
        .svc-nav { position:sticky; top:0; z-index:50; display:flex; align-items:center;
          justify-content:space-between; padding:14px 24px; background:rgba(8,8,8,.97);
          backdrop-filter:blur(16px); border-bottom:1px solid var(--sg-gb); }
        .svc-brand { display:flex; align-items:center; gap:12px; color:var(--sg-white)!important;
          font-weight:900; letter-spacing:1px; text-transform:uppercase; font-size:14px; }
        .svc-brand img { height:36px; filter:drop-shadow(0 0 8px rgba(107,120,84,.5)); }
        .svc-call { background:var(--sg-gold); color:var(--sg-black)!important; padding:9px 18px;
          border-radius:4px; font-weight:900; font-size:13px; }
        .svc-hero { max-width:820px; margin:0 auto; padding:56px 24px 40px; }
        .svc-crumb { font-size:13px; color:var(--sg-muted); margin:0 0 18px;
          text-transform:uppercase; letter-spacing:1.5px; }
        .svc-crumb span { opacity:.5; margin:0 6px; }
        .svc-hero-icon { color:var(--sg-gold); display:block; margin-bottom:18px; opacity:.85; }
        .svc-hero h1 { font-size:46px; line-height:1.08; font-weight:900; color:var(--sg-white);
          letter-spacing:-1.2px; margin:0 0 20px; }
        .svc-intro { font-size:18px; line-height:1.7; margin:0 0 28px; }
        .svc-trust { display:flex; flex-wrap:wrap; align-items:center; gap:14px; margin-bottom:30px; }
        .svc-trust span { font-size:12px; font-weight:800; letter-spacing:2px;
          text-transform:uppercase; color:var(--sg-gold); }
        .svc-trust i { width:4px; height:4px; background:var(--sg-gold); opacity:.5;
          transform:rotate(45deg); }
        .svc-ctas { display:flex; gap:12px; flex-wrap:wrap; }
        .svc-btn { background:var(--sg-gold); color:var(--sg-black)!important; padding:15px 30px;
          border-radius:4px; font-weight:900; font-size:14px; letter-spacing:1px;
          text-transform:uppercase; display:inline-block; }
        .svc-btn.ghost { background:transparent; color:var(--sg-gold)!important;
          border:1px solid var(--sg-gb); }
        .svc-body { max-width:820px; margin:0 auto; padding:0 24px 60px; }
        .svc-body section { padding:40px 0; border-top:1px solid var(--sg-div); }
        .svc-body h2 { font-size:28px; font-weight:900; color:var(--sg-white);
          letter-spacing:-.5px; margin:0 0 22px; }
        .svc-list { list-style:none; padding:0; margin:0; display:grid; gap:12px; }
        .svc-list li { padding-left:26px; position:relative; font-size:16px; }
        .svc-list li::before { content:''; position:absolute; left:0; top:9px; width:7px; height:7px;
          background:var(--sg-gold); transform:rotate(45deg); }
        .svc-steps { list-style:none; padding:0; margin:0; display:grid; gap:22px; }
        .svc-steps li { display:flex; gap:18px; align-items:flex-start; }
        .svc-num { font-size:13px; font-weight:900; color:var(--sg-gold); letter-spacing:1px;
          padding-top:3px; flex:0 0 auto; }
        .svc-steps strong { display:block; color:var(--sg-white); font-size:16px; margin-bottom:5px; }
        .svc-steps p { margin:0; color:var(--sg-muted); font-size:15px; }
        .svc-faq { margin-bottom:24px; }
        .svc-faq h3 { font-size:17px; font-weight:700; color:var(--sg-white); margin:0 0 8px; }
        .svc-faq p { margin:0; color:var(--sg-muted); font-size:15px; line-height:1.75; }
        .svc-form { background:var(--sg-card); border:1px solid var(--sg-gb); padding:28px; border-radius:6px; }
        .svc-others { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; }
        .svc-other { display:flex; align-items:center; gap:13px; padding:18px; border:1px solid var(--sg-div); border-radius:5px;
          transition:border-color .2s ease, transform .2s ease; }
        .svc-other:hover { border-color:var(--sg-gb); transform:translateY(-2px); }
        .svc-other-icon { color:var(--sg-gold); opacity:.75; flex-shrink:0; transition:opacity .2s ease; }
        .svc-other:hover .svc-other-icon { opacity:1; }
        .svc-other-text { display:block; min-width:0; }
        .svc-other strong { display:block; color:var(--sg-white); font-size:15px; margin-bottom:4px; }
        .svc-other-text span { font-size:13px; color:var(--sg-muted); text-transform:uppercase; letter-spacing:1px; }
        .svc-foot { border-top:1px solid var(--sg-gb); padding:32px 24px; text-align:center;
          font-size:13px; color:var(--sg-muted); }
        .svc-foot p { margin:0 0 8px; }
        .svc-fine { font-size:12px; max-width:640px; margin:14px auto!important; line-height:1.7; opacity:.8; }
        @media (max-width:640px) {
          .svc-hero h1 { font-size:32px; }
          .svc-intro { font-size:16px; }
          .svc-btn { width:100%; text-align:center; }
        }
      `}</style>
    </>
  );
}
