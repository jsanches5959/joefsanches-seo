import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import JobberForm from '../components/JobberForm';
import ProRequestForm from '../components/ProRequestForm';
import ToolIcon from '../components/ToolIcon';
import { breadcrumbSchema } from '../lib/breadcrumbs';

const baseUrl = 'https://joefsanches.com';
const url = `${baseUrl}/pros`;

const TITLE = 'Meet the Pros — Vetted Local Trades | Sanches Group';
const DESCRIPTION =
  'One call gets you a vetted local pro — garage doors, electrical, plumbing, HVAC, painting, drywall and cleaning across Leander, Cedar Park and greater Austin. Sanches Group assigns the right partner and owns the result.';

/**
 * The bench. Only one partner is named, on purpose: José is the contractor
 * who has agreed to be listed, and he is listed by first name and trade only.
 * Nobody's personal phone number or email appears on this page — every
 * request routes through Sanches Group dispatch, which is the whole model:
 * the customer gets one name to hold accountable, and the bench stays the
 * company's bench instead of becoming a public phone book.
 */
const PROS = [
  {
    trade: 'Garage Doors',
    icon: 'toolbox',
    who: 'José — garage doors',
    blurb:
      'Repairs and installs. Broken springs, doors off the track, openers that quit, and full door replacements.',
    jobs: ['Spring & cable repair', 'Opener install & repair', 'New door installation'],
  },
  {
    trade: 'Electrical',
    icon: 'bolt',
    who: 'Licensed electrical partners',
    blurb:
      'Electrical work is handled by our licensed partners — the license and the workmanship are theirs, the scheduling and the accountability are ours.',
    jobs: ['Outlets, switches & lighting', 'Ceiling fans & fixtures', 'Troubleshooting & repairs'],
  },
  {
    trade: 'Plumbing',
    icon: 'pipe',
    who: 'Licensed plumbing partners',
    blurb:
      'Plumbing work is handled by our licensed partners. Leaks, heaters, fixtures and the small jobs other companies will not roll a truck for.',
    jobs: ['Leak repair', 'Water heaters', 'Fixtures & toilets'],
  },
  {
    trade: 'HVAC',
    icon: 'hvac',
    who: 'Licensed HVAC partners',
    blurb:
      'Heating and cooling work is handled by our licensed partners — repair first, honest answers on replacement, one call to make it happen.',
    jobs: ['AC repair', 'System replacement', 'Seasonal maintenance'],
  },
  {
    trade: 'Painting',
    icon: 'roller',
    who: 'Our painting crews',
    blurb:
      'Interior and exterior painting crews we run every week — single rooms, full houses, cabinets and make-readies.',
    jobs: ['Interior painting', 'Exterior painting', 'Cabinet painting'],
  },
  {
    trade: 'Drywall',
    icon: 'trowel',
    who: 'Our drywall crews',
    blurb:
      'Patch, repair and finish work — water damage, doorknob holes, and texture matched so the repair disappears.',
    jobs: ['Drywall repair', 'Texture matching', 'Water-damage repair'],
  },
  {
    trade: 'Cleaning',
    icon: 'squeegee',
    who: 'Our cleaning crews',
    blurb:
      'Move-in and move-out cleans, make-readies and deep cleans, done by the cleaning crews we already run across Austin.',
    jobs: ['Move-out cleans', 'Make-readies', 'Deep cleans'],
  },
];

const FAQS = [
  [
    'Who actually shows up to do the work?',
    'A vetted local pro from the Sanches Group bench — tradespeople we already send to jobs every week. For licensed trades (electrical, plumbing, HVAC), the work is performed by our licensed partners. Sanches Group assigns the pro, schedules the job, and stays your one point of contact until it is done.',
  ],
  [
    'Do I pay the contractor or Sanches Group?',
    'Sanches Group. You get one quote, one invoice and one name that owns the result. We handle paying the pro — you never have to negotiate price, chase paperwork, or wonder who to call if something needs a second look.',
  ],
  [
    'Why not just give me the contractor\u2019s number?',
    'Because then you would have a phone number instead of a guarantee. Routing through Sanches Group means somebody verifies the pro can take the job, confirms the appointment with you by text, and follows up after. If a pro is booked out, we find you another one — that is the whole point of the bench.',
  ],
  [
    'What areas do the pros cover?',
    'Leander, Cedar Park, Georgetown, Liberty Hill, Round Rock, Pflugerville and the greater Austin area. Some partners travel further for the right job — ask, and we will give you a straight answer.',
  ],
];

export default function Pros() {
  const [trade, setTrade] = useState('Garage Doors');

  function requestPro(next) {
    setTrade(next);
    if (typeof document !== 'undefined') {
      const el = document.getElementById('request');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={`${baseUrl}/og-image.jpg`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Meet the Pros' },
              ])
            ),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div className="svc">
        <nav className="svc-nav">
          <Link href="/" className="svc-brand">
            <img src="/logo.png" alt="Sanches Group" width="44" height="44" />
            <span>Sanches Group</span>
          </Link>
          <a href="tel:5126638867" className="svc-call">512-663-8867</a>
        </nav>

        <header className="svc-hero">
          <p className="svc-crumb">
            <Link href="/">Home</Link> <span>/</span> Meet the Pros
          </p>
          <h1>Meet the pros. One call, one name owns the result.</h1>
          <p className="svc-intro">
            These are the tradespeople Sanches Group sends to jobs every week —
            the garage door guy, the electricians, the plumbers, the painters.
            You don&apos;t have to find them, vet them, or chase them. Tell us
            the job and we assign the right pro, schedule it, and stay on it
            until it&apos;s done. Sanches Group manages your project start to
            finish. Licensed trades are handled by our licensed partners — one
            call, one name owns the result.
          </p>
          <div className="svc-trust">
            <span>Vetted Local Pros</span><i />
            <span>Free Estimates</span><i />
            <span>One Point of Contact</span><i />
            <span>Written Quotes</span>
          </div>
          <div className="svc-ctas">
            <a href="#request" className="svc-btn">Request a Pro</a>
            <a href="tel:5126638867" className="svc-btn ghost">Call 512-663-8867</a>
          </div>
        </header>

        <main className="svc-body">
          <section>
            <h2>How dispatch works</h2>
            <ol className="svc-steps">
              <li>
                <span className="svc-num">01</span>
                <div>
                  <strong>Tell us the job</strong>
                  <p>
                    Use the request form below — trade, a few sentences about the
                    job, and the number to text you at. It takes about a minute.
                  </p>
                </div>
              </li>
              <li>
                <span className="svc-num">02</span>
                <div>
                  <strong>We assign your pro</strong>
                  <p>
                    Dispatch matches your job to the right partner on the bench
                    and confirms they can take it. Then we text you who is
                    coming and when.
                  </p>
                </div>
              </li>
              <li>
                <span className="svc-num">03</span>
                <div>
                  <strong>One name owns the result</strong>
                  <p>
                    The pro does the work; Sanches Group handles the quote, the
                    scheduling and the bill. If anything needs a second look,
                    you call one number — ours.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          <section>
            <h2>The bench</h2>
            <div className="pros-grid">
              {PROS.map((pro) => (
                <article className="pro-card" key={pro.trade}>
                  <ToolIcon name={pro.icon} size={34} className="pro-card-icon" />
                  <h3>{pro.trade}</h3>
                  <p className="pro-who">{pro.who}</p>
                  <p className="pro-blurb">{pro.blurb}</p>
                  <ul className="svc-list pro-jobs">
                    {pro.jobs.map((job) => <li key={job}>{job}</li>)}
                  </ul>
                  <button
                    type="button"
                    className="pro-btn"
                    onClick={() => requestPro(pro.trade)}
                  >
                    Request this pro
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section id="request">
            <h2>Request a pro</h2>
            <div className="svc-form">
              <p className="svc-form-blurb">
                Tell us what you need and which trade. We read every request,
                match it to a pro, and text you back at the number you give us.
              </p>
              <ProRequestForm trade={trade} onTradeChange={setTrade} />
            </div>
          </section>

          <section>
            <h2>Questions we get asked</h2>
            {FAQS.map(([q, a]) => (
              <div className="svc-faq" key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </section>

          <section id="quote">
            <h2>Want a full written estimate instead?</h2>
            <div className="svc-form">
              <p className="svc-form-blurb">
                Bigger job, or you&apos;ve got photos to show us? Use the full
                estimate form — a photo helps us price it right the first time.
              </p>
              <JobberForm />
            </div>
          </section>

          <section>
            <h2>Everything else we do</h2>
            <p className="svc-guide-lead">
              The bench is one way in. Sanches Group also runs full services —
              remodels, flooring, grounds, make-readies and more — under the
              same one-name accountability.
            </p>
            <div className="svc-ctas">
              <Link href="/#services" className="svc-btn">See All Services</Link>
              <Link href="/work" className="svc-btn ghost">See Recent Work</Link>
            </div>
          </section>
        </main>

        <footer className="svc-foot">
          <p><strong style={{ color: '#fff' }}>Sanches Group does the whole property.</strong></p>
          <p>Sanches Group · Joe Sanches LLC · Leander, Texas</p>
          <p>512-663-8867 · hello@joefsanches.com</p>
          <p className="svc-fine">
            Serving Leander, Cedar Park, Georgetown, Liberty Hill, Round Rock, Pflugerville
            and the greater Austin area. Licensed trades are handled by our licensed
            partners — one call, one name owns the result.
          </p>
          <p><Link href="/government">Government &amp; institutional contracting →</Link></p>
        </footer>
      </div>

      <style jsx global>{`
        :root {
          --sg-black:#faf8f3; --sg-card:#ffffff; --sg-gold:#c8a84b; --sg-gold2:#d6b75a;
          --sg-white:#16180f; --sg-text:#363a2f; --sg-muted:#5f6455;
          --sg-gb:rgba(200,168,75,.5); --sg-div:rgba(22,24,15,.10);
          --sg-gold-ink:#7d6318; --sg-olive:#6b7854; --sg-olive-ink:#4f5a3c;
        }
        body { margin:0; background:var(--sg-black) !important; color:var(--sg-text);
          font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',sans-serif;
          line-height:1.65; }
        .svc a { color:var(--sg-gold-ink); text-decoration:none; }
        .svc-nav { position:sticky; top:0; z-index:50; display:flex; align-items:center;
          justify-content:space-between; padding:14px 24px; background:rgba(250,248,243,.94);
          backdrop-filter:blur(16px); border-bottom:1px solid var(--sg-gb); }
        .svc-brand { display:flex; align-items:center; gap:12px; color:var(--sg-white)!important;
          font-weight:900; letter-spacing:1px; text-transform:uppercase; font-size:14px; }
        .svc-brand img { height:42px; }
        .svc-call { background:var(--sg-gold); color:var(--sg-white)!important; padding:10px 18px;
          border-radius:6px; font-weight:900; font-size:14px; }
        .svc-hero { max-width:820px; margin:0 auto; padding:56px 24px 40px; }
        .svc-crumb { font-size:13px; color:var(--sg-muted); margin:0 0 18px;
          text-transform:uppercase; letter-spacing:1.5px; }
        .svc-crumb span { opacity:.5; margin:0 6px; }
        .svc-hero h1 { font-size:46px; line-height:1.08; font-weight:900; color:var(--sg-white);
          letter-spacing:-1.2px; margin:0 0 20px; }
        .svc-intro { font-size:18px; line-height:1.7; margin:0 0 28px; }
        .svc-trust { display:flex; flex-wrap:wrap; align-items:center; gap:14px; margin-bottom:30px; }
        .svc-trust span { font-size:12px; font-weight:800; letter-spacing:1.6px;
          text-transform:uppercase; color:var(--sg-olive-ink); }
        .svc-trust i { width:4px; height:4px; background:var(--sg-gold); opacity:.5;
          transform:rotate(45deg); }
        .svc-ctas { display:flex; gap:12px; flex-wrap:wrap; }
        .svc-btn { background:var(--sg-gold); color:var(--sg-white)!important; padding:15px 30px;
          border-radius:6px; font-weight:900; font-size:14px; letter-spacing:1px;
          text-transform:uppercase; display:inline-block; }
        .svc-btn.ghost { background:#fff; color:var(--sg-white)!important;
          border:1.5px solid var(--sg-white); }
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
        .svc-num { font-size:13px; font-weight:900; color:var(--sg-gold-ink); letter-spacing:1px;
          padding-top:3px; flex:0 0 auto; }
        .svc-steps strong { display:block; color:var(--sg-white); font-size:16px; margin-bottom:5px; }
        .svc-steps p { margin:0; color:var(--sg-text); font-size:15px; }
        .svc-faq { margin-bottom:24px; }
        .svc-faq h3 { font-size:17px; font-weight:700; color:var(--sg-white); margin:0 0 8px; }
        .svc-faq p { margin:0; color:var(--sg-text); font-size:15px; line-height:1.75; }
        .svc-form { background:var(--sg-card); border:1px solid var(--sg-div); border-top:4px solid var(--sg-gold); padding:28px; border-radius:10px; box-shadow:0 16px 44px rgba(22,24,15,.07); }
        .svc-form-blurb { font-size:16px; color:var(--sg-text); line-height:1.7; margin:0 0 18px; }
        .svc-guide-lead { font-size:15px; color:var(--sg-muted); line-height:1.75; margin:0 0 18px; max-width:64ch; }
        /* Pros grid + cards */
        .pros-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:14px; }
        .pro-card { background:var(--sg-card); border:1px solid var(--sg-div); border-radius:10px;
          padding:24px; display:flex; flex-direction:column; }
        .pro-card-icon { color:var(--sg-olive); margin-bottom:14px; }
        .pro-card h3 { font-size:20px; font-weight:900; color:var(--sg-white); margin:0 0 4px;
          letter-spacing:-.3px; }
        .pro-who { font-size:12px; font-weight:800; letter-spacing:1.4px; text-transform:uppercase;
          color:var(--sg-gold-ink); margin:0 0 12px; }
        .pro-blurb { font-size:15px; line-height:1.7; margin:0 0 16px; }
        .pro-jobs { gap:8px; margin-bottom:20px; }
        .pro-jobs li { font-size:14px; }
        .pro-btn { margin-top:auto; background:var(--sg-gold); color:var(--sg-white); border:none;
          padding:13px 20px; border-radius:6px; font-weight:900; font-size:13px; letter-spacing:1px;
          text-transform:uppercase; cursor:pointer; font-family:inherit; }
        .pro-btn:hover { background:var(--sg-gold2); }
        /* Dispatch form */
        .prf-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .prf-field { display:flex; flex-direction:column; gap:6px; }
        .prf-wide { grid-column:1 / -1; }
        .prf-field span { font-size:13px; font-weight:700; color:var(--sg-white);
          letter-spacing:.3px; }
        .prf-field input, .prf-field select, .prf-field textarea {
          font-family:inherit; font-size:15px; color:var(--sg-text); background:#fff;
          border:1px solid var(--sg-div); border-radius:6px; padding:12px 14px; width:100%;
          box-sizing:border-box; }
        .prf-field input:focus, .prf-field select:focus, .prf-field textarea:focus {
          outline:2px solid var(--sg-gb); border-color:var(--sg-gold); }
        .prf-field textarea { resize:vertical; }
        .prf-submit { margin-top:20px; background:var(--sg-gold); color:var(--sg-white); border:none;
          padding:15px 30px; border-radius:6px; font-weight:900; font-size:14px; letter-spacing:1px;
          text-transform:uppercase; cursor:pointer; font-family:inherit; }
        .prf-submit:hover { background:var(--sg-gold2); }
        .prf-submit:disabled { opacity:.6; cursor:wait; }
        .prf-note { font-size:13px; color:var(--sg-muted); margin:14px 0 0; line-height:1.6; }
        .prf-error { font-size:15px; color:#8a2b1d; background:rgba(138,43,29,.06);
          border:1px solid rgba(138,43,29,.25); border-radius:6px; padding:12px 14px; margin:18px 0 0; }
        .prf-error a { color:#8a2b1d; font-weight:700; }
        .prf-sent { border:1px solid var(--sg-gb); border-left:4px solid var(--sg-gold);
          border-radius:8px; padding:20px 22px; background:rgba(200,168,75,.06); }
        .prf-sent-title { font-size:19px; font-weight:900; color:var(--sg-white); margin:0 0 8px; }
        .prf-sent-body { font-size:15px; line-height:1.7; margin:0; }
        .svc-foot { background:#14160f; border-top:3px solid var(--sg-gold); padding:36px 24px; text-align:center;
          font-size:14px; color:#c9cdbf; }
        .svc-foot a { color:#e8cd77; }
        .svc-foot p { margin:0 0 8px; }
        .svc-fine { font-size:13px; max-width:640px; margin:14px auto!important; line-height:1.7; }
        @media (max-width:640px) {
          .svc-hero h1 { font-size:32px; }
          .svc-intro { font-size:16px; }
          .svc-btn { width:100%; text-align:center; }
          .prf-grid { grid-template-columns:1fr; }
          .prf-submit { width:100%; }
          .pro-btn { width:100%; }
        }
      `}</style>
    </>
  );
}
