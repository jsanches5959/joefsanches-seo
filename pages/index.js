import Head from 'next/head';
import LeadForm from '../components/LeadForm';
import ToolIcon from '../components/ToolIcon';

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black:  #070706;
    --ink:    #0d0e0b;
    --bone:   #f4f2ec;
    --text:   #adb1a3;
    --muted:  #6c7162;
    --gold:   #c8a84b;
    --gold2:  #e8cd77;
    --line:   rgba(244,242,236,0.08);
    --gline:  rgba(200,168,75,0.22);
    --gfill:  rgba(200,168,75,0.07);
  }

  html { scroll-behavior: smooth; }
  section[id], div[id] { scroll-margin-top: 88px; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background: var(--black);
    color: var(--text);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  a { color: var(--gold); text-decoration: none; }
  a:hover { color: var(--gold2); }

  .w { max-width: 1180px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 48px); }

  /* ── TYPE SCALE ──
     One eyebrow / title / lead rhythm reused by every section, so the page
     reads as one document rather than a stack of unrelated blocks. */
  .eyebrow {
    display: block;
    font-size: 10px; font-weight: 900;
    letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 22px;
  }
  .title {
    font-size: clamp(34px, 5.4vw, 62px);
    line-height: 1.02;
    letter-spacing: -0.035em;
    font-weight: 900;
    color: var(--bone);
    margin-bottom: 22px;
  }
  .lead {
    font-size: clamp(15px, 1.5vw, 18px);
    color: var(--text);
    max-width: 62ch;
    line-height: 1.75;
  }

  .sec { padding: clamp(72px, 11vw, 148px) 0; border-top: 1px solid var(--line); }
  .sec.ink { background: var(--ink); }

  /* ── NAV ── */
  .nav {
    position: sticky; top: 0; z-index: 200;
    background: rgba(7,7,6,0.86);
    backdrop-filter: blur(18px) saturate(1.2);
    border-bottom: 1px solid var(--line);
  }
  .nav-inner {
    display: flex; align-items: center; justify-content: space-between;
    gap: 24px;
    padding: 13px clamp(20px, 5vw, 48px);
    max-width: 1180px; margin: 0 auto;
  }
  /* The mark is a dark olive monogram; on this near-black ground it needs
     lifting or it reads as an empty square. */
  .nav-logo img {
    height: 34px; display: block;
    filter: brightness(1.8) saturate(1.25);
  }
  .nav-links { display: flex; gap: 30px; list-style: none; align-items: center; }
  .nav-links a {
    font-size: 11px; font-weight: 700; color: var(--muted);
    letter-spacing: 0.16em; text-transform: uppercase;
    transition: color .2s ease;
  }
  .nav-links a:hover { color: var(--bone); }
  .nav-call {
    background: var(--gold); color: var(--black) !important;
    padding: 10px 20px; border-radius: 2px;
    font-weight: 900; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
    transition: background .2s ease;
  }
  .nav-call:hover { background: var(--gold2) !important; }

  /* ── HERO ──
     Four things and nothing else: mark, statement, one line of plain
     English, two ways to act. Everything that used to crowd this space
     (six credential tiles, an audience list, a second service list) now
     lives further down the page where it has room. */
  .hero {
    position: relative; isolation: isolate; overflow: hidden;
    min-height: min(88vh, 820px);
    display: flex; align-items: center;
    padding: clamp(72px, 12vw, 128px) clamp(20px, 5vw, 48px) clamp(56px, 9vw, 104px);
    text-align: center;
  }
  .hero-inner { max-width: 940px; margin: 0 auto; width: 100%; }
  /* Austin skyline, low and dim — a horizon, not a picture. */
  .hero-skyline {
    position: absolute; left: 0; right: 0; bottom: 0; height: 320px;
    background: url('/austin-skyline.svg') bottom center / 100% auto no-repeat;
    opacity: .24; z-index: -3; pointer-events: none;
  }
  .hero-skyline::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to bottom, var(--black) 0%, rgba(7,7,6,.6) 34%, rgba(7,7,6,0) 70%);
  }
  .hero::before {
    content: ''; position: absolute; inset: 0; z-index: -2; pointer-events: none;
    background:
      radial-gradient(900px 420px at 50% -8%, rgba(200,168,75,0.05) 0%, transparent 62%),
      radial-gradient(700px 400px at 50% 104%, rgba(107,120,84,0.06) 0%, transparent 68%);
  }
  /* Optional job photo: set --hero-photo: url('/hero.jpg') on .hero */
  .hero::after {
    content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none;
    background-image: var(--hero-photo, none);
    background-size: cover; background-position: center;
    opacity: .16; filter: grayscale(1) contrast(1.2) brightness(.7);
  }
  .hero-logo {
    width: 96px; height: 96px; object-fit: contain;
    margin: 0 auto 30px; display: block;
    filter: brightness(1.8) saturate(1.25) drop-shadow(0 0 22px rgba(200,168,75,.32));
  }
  .hero-eyebrow {
    display: block; font-size: 10px; font-weight: 900;
    letter-spacing: 0.34em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 26px;
  }
  /* The statement. Three words, three lines, as large as the viewport allows. */
  .hero h1 {
    font-size: clamp(42px, 9.4vw, 112px);
    line-height: 0.92;
    letter-spacing: -0.045em;
    font-weight: 900;
    margin-bottom: 30px;
    color: var(--bone);
  }
  @supports (-webkit-background-clip: text) or (background-clip: text) {
    .hero h1 {
      background: linear-gradient(176deg, #ffffff 2%, #f3f0e6 34%, #cfc9b6 72%, #a8a290 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
    }
  }
  .hero h1 span { display: block; }
  .hero-sub {
    font-size: clamp(15px, 1.7vw, 19px);
    color: var(--text); line-height: 1.72;
    max-width: 640px; margin: 0 auto 40px;
  }
  .hero-sub strong { color: var(--bone); font-weight: 700; }
  .hero-ctas { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 44px; }
  .btn-gold, .btn-outline {
    display: inline-block; padding: 15px 30px; border-radius: 2px;
    font-size: 12px; font-weight: 900; letter-spacing: 0.13em; text-transform: uppercase;
    transition: background .2s ease, border-color .2s ease, color .2s ease;
  }
  .btn-gold { background: var(--gold); color: var(--black) !important; }
  .btn-gold:hover { background: var(--gold2); }
  .btn-outline { border: 1px solid var(--gline); color: var(--bone) !important; }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold) !important; }
  .hero-trust {
    display: flex; gap: 0; justify-content: center; align-items: center;
    flex-wrap: wrap; row-gap: 10px;
  }
  .hero-trust span {
    font-size: 10px; font-weight: 800; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--muted); padding: 0 18px;
    border-right: 1px solid var(--line);
  }
  .hero-trust span:last-child { border-right: none; }

  /* ── CAPABILITIES ──
     The page's centre of gravity: everything the company will take on, in
     one glance, so a visitor with a mixed punch list can see their whole
     job covered without reading a paragraph. */
  .cap-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 1px; background: var(--line);
    border: 1px solid var(--line); margin-top: 52px;
  }
  .cap {
    background: var(--black); padding: 30px 24px 28px;
    display: flex; flex-direction: column; gap: 15px;
    transition: background .25s ease;
  }
  .cap:hover { background: var(--ink); }
  .cap-icon { color: var(--gold); opacity: .72; transition: opacity .25s ease, transform .25s ease; }
  .cap:hover .cap-icon { opacity: 1; transform: translateY(-2px); }
  .cap-name {
    font-size: 15px; font-weight: 800; color: var(--bone);
    line-height: 1.3; letter-spacing: -0.01em;
  }
  .cap-note {
    font-size: 9.5px; font-weight: 800; letter-spacing: 0.17em;
    text-transform: uppercase; color: var(--muted); margin-top: -7px;
  }
  .cap-foot {
    margin-top: 26px; font-size: 13px; color: var(--muted);
    line-height: 1.7; max-width: 74ch;
  }

  /* Deep links to the full service pages. */
  .svc-links-label {
    margin-top: 60px; margin-bottom: 16px;
    font-size: 10px; font-weight: 900; letter-spacing: 0.28em;
    text-transform: uppercase; color: var(--gold);
  }
  .svc-links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .svc-link {
    display: flex; align-items: center; gap: 14px; padding: 18px 20px;
    border: 1px solid var(--line); border-radius: 3px;
    transition: border-color .2s ease, transform .2s ease, background .2s ease;
  }
  .svc-link:hover { border-color: var(--gline); background: var(--ink); transform: translateY(-2px); }
  .svc-icon { color: var(--gold); opacity: .75; flex-shrink: 0; transition: opacity .2s ease; }
  .svc-link:hover .svc-icon { opacity: 1; }
  .svc-link-text { display: block; min-width: 0; }
  .svc-link strong { display: block; color: var(--bone); font-size: 14px; font-weight: 800; margin-bottom: 3px; }
  .svc-link-text span { font-size: 10px; color: var(--muted); letter-spacing: 0.16em; text-transform: uppercase; }

  /* ── WHO WE WORK FOR ── */
  .who { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--line); margin-top: 48px; border: 1px solid var(--line); }
  .who-item { background: var(--black); padding: 30px 24px; }
  .who-item strong { display: block; color: var(--bone); font-size: 15px; font-weight: 800; margin-bottom: 8px; }
  .who-item p { font-size: 13px; color: var(--muted); line-height: 1.7; }

  /* ── CREDENTIAL BAND ── */
  .specs { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); margin-top: 48px; }
  .spec { background: var(--black); padding: 26px 16px; text-align: center; }
  .spec-val { display: block; font-size: 14px; font-weight: 900; color: var(--gold); letter-spacing: 0.06em; text-transform: uppercase; line-height: 1.2; }
  .spec-label { display: block; font-size: 9.5px; color: var(--muted); margin-top: 8px; letter-spacing: 0.13em; text-transform: uppercase; }
  .band-links { margin-top: 26px; display: flex; gap: 26px; flex-wrap: wrap; }
  .band-links a { font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; border-bottom: 1px solid var(--gline); padding-bottom: 3px; }

  /* ── ABOUT ── */
  .about-grid { display: grid; grid-template-columns: 280px 1fr; gap: clamp(30px, 5vw, 64px); align-items: start; }
  .about-img { width: 100%; border-radius: 3px; display: block; filter: grayscale(.25) contrast(1.05); }
  .about-role { display: block; font-size: 11px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold); margin-bottom: 22px; }
  .about-bio { font-size: 15px; color: var(--text); line-height: 1.8; margin-bottom: 16px; max-width: 60ch; }
  .creds { display: flex; flex-wrap: wrap; gap: 8px; margin: 26px 0; }
  .cred { font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); border: 1px solid var(--line); padding: 7px 12px; border-radius: 2px; }

  /* ── AREAS ── */
  .areas { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 44px; }
  .area { font-size: 12px; font-weight: 700; letter-spacing: 0.06em; color: var(--text); border: 1px solid var(--line); padding: 10px 16px; border-radius: 2px; }

  /* ── CONTACT ── */
  .lead-form-wrap { margin-top: 48px; background: var(--ink); border: 1px solid var(--line); border-radius: 4px; padding: clamp(24px, 4vw, 40px); }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(24px, 4vw, 56px); margin-top: 52px; }
  .c-item { padding: 18px 0; border-bottom: 1px solid var(--line); }
  .c-label { display: block; font-size: 9.5px; font-weight: 900; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
  .c-val { font-size: 17px; font-weight: 700; color: var(--bone); }
  .c-val a { color: var(--bone); }
  .c-val a:hover { color: var(--gold); }
  .inq { border: 1px solid var(--line); border-radius: 3px; padding: 24px; margin-bottom: 12px; }
  .inq.gold { border-color: var(--gline); background: var(--gfill); }
  .inq h4 { font-size: 14px; font-weight: 900; color: var(--bone); margin-bottom: 8px; letter-spacing: -0.01em; }
  .inq p { font-size: 13px; color: var(--muted); line-height: 1.7; margin-bottom: 14px; }
  .inq-btn { font-size: 11px; font-weight: 900; letter-spacing: 0.13em; text-transform: uppercase; }

  /* ── COMPLIANCE + FOOTER ── */
  .compliance { background: #050504; border-top: 1px solid var(--line); padding: 52px clamp(20px, 5vw, 48px); }
  .compliance-inner { max-width: 1180px; margin: 0 auto; }
  .compliance-eyebrow { display: block; font-size: 9.5px; font-weight: 900; letter-spacing: 0.28em; text-transform: uppercase; color: #4a4f42; margin-bottom: 26px; }
  .compliance-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px 48px; }
  .compliance-block-label { display: block; font-size: 9.5px; font-weight: 900; letter-spacing: 0.16em; text-transform: uppercase; color: #4a4f42; margin-bottom: 7px; }
  .compliance-block p { font-size: 12px; color: #3c4136; line-height: 1.8; }

  footer { background: #050504; border-top: 1px solid var(--line); padding: 48px clamp(20px, 5vw, 48px); text-align: center; }
  footer img.mark { height: 42px; margin-bottom: 20px; opacity: .8; }
  footer p { font-size: 12px; color: var(--muted); margin-bottom: 5px; }
  .foot-nav { display: flex; gap: 22px; justify-content: center; flex-wrap: wrap; margin: 20px 0 16px; }
  .foot-nav a { font-size: 10px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); }
  .foot-nav a:hover { color: var(--gold); }
  .hub-logo-footer { height: 56px; margin-top: 18px; opacity: .75; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1040px) {
    .cap-grid { grid-template-columns: repeat(3, 1fr); }
    .specs { grid-template-columns: repeat(3, 1fr); }
    .who { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 860px) {
    .nav-links li:not(:last-child) { display: none; }
    .svc-links { grid-template-columns: 1fr 1fr; }
    .about-grid { grid-template-columns: 1fr; }
    .about-img { max-width: 220px; }
    .contact-grid { grid-template-columns: 1fr; }
    .compliance-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 620px) {
    .cap-grid { grid-template-columns: repeat(2, 1fr); }
    .svc-links { grid-template-columns: 1fr; }
    .who { grid-template-columns: 1fr; }
    .specs { grid-template-columns: repeat(2, 1fr); }
    .hero-trust span { padding: 0 11px; font-size: 9px; letter-spacing: 0.14em; }
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    * { animation: none !important; transition: none !important; }
  }
`;

const CAPABILITIES = [
  { icon: 'hardhat',  name: 'Remodeling & Build-Outs' },
  { icon: 'trowel',   name: 'Drywall & Texture' },
  { icon: 'roller',   name: 'Interior & Exterior Painting' },
  { icon: 'planks',   name: 'Flooring' },
  { icon: 'deck',     name: 'Patios & Decks' },
  { icon: 'toolbox',  name: 'Handyman & Repairs' },
  { icon: 'sprayer',  name: 'Pressure Washing' },
  { icon: 'squeegee', name: 'Janitorial & Facilities' },
  { icon: 'roof',     name: 'Roofing',    partner: true },
  { icon: 'bolt',     name: 'Electrical', partner: true },
  { icon: 'pipe',     name: 'Plumbing',   partner: true },
  { icon: 'hvac',     name: 'Heating & Air', partner: true },
];

const SERVICE_PAGES = [
  { slug: 'home-remodeling-leander-tx',            icon: 'hardhat',  name: 'Remodeling & General Construction', city: 'Leander, TX' },
  { slug: 'drywall-repair-leander-tx',             icon: 'trowel',   name: 'Drywall Repair & Installation',     city: 'Leander, TX' },
  { slug: 'interior-exterior-painting-leander-tx', icon: 'roller',   name: 'Interior & Exterior Painting',      city: 'Leander, TX' },
  { slug: 'handyman-services-leander-tx',          icon: 'toolbox',  name: 'Handyman & Home Repairs',           city: 'Leander, TX' },
  { slug: 'pressure-washing-leander-tx',           icon: 'sprayer',  name: 'Pressure Washing',                  city: 'Leander, TX' },
  { slug: 'facilities-maintenance-austin-tx',      icon: 'squeegee', name: 'Facilities Maintenance & Janitorial', city: 'Austin, TX' },
];

const AREAS = ['Leander','Cedar Park','Austin','Round Rock','Georgetown','Pflugerville','Liberty Hill','Hutto','Kyle','Buda','San Marcos','Temple','Statewide (Gov)'];

/**
 * Structured data. The homepage previously carried none, so search engines
 * and answer engines had to infer the trade, the service area and the
 * credentials from prose. Declaring them makes the contractor listing
 * eligible for rich results and gives AI assistants something exact to cite.
 */
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': 'https://joefsanches.com/#sanchesgroup',
  name: 'Sanches Group',
  alternateName: 'Joe Sanches LLC',
  url: 'https://joefsanches.com',
  telephone: '+1-512-663-8867',
  email: 'hello@joefsanches.com',
  image: 'https://joefsanches.com/logo.png',
  logo: 'https://joefsanches.com/logo.png',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Leander',
    addressRegion: 'TX',
    postalCode: '78641',
    addressCountry: 'US',
  },
  areaServed: AREAS.filter((a) => a !== 'Statewide (Gov)').map((name) => ({ '@type': 'City', name: `${name}, TX` })),
  knowsAbout: CAPABILITIES.map((c) => c.name),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Construction, repair and maintenance services',
    itemListElement: CAPABILITIES.map((c) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: c.name },
    })),
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Sanches Group | Construction, Repairs &amp; Maintenance — Leander, TX</title>
        <meta name="description" content="Sanches Group — general contractor in Leander, Texas. Remodeling, drywall, painting, flooring, patios and decks, handyman repairs, pressure washing and facilities maintenance. Roofing, electrical, plumbing and HVAC coordinated through licensed partners. Free estimates. Veteran-owned." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://joefsanches.com" />
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </Head>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <a className="nav-logo" href="#top">
            <img src="/logo.png" alt="Sanches Group" />
          </a>
          <ul className="nav-links">
            <li><a href="#work">What We Do</a></li>
            <li><a href="#clients">Who We Serve</a></li>
            <li><a href="#government">Government</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="tel:5126638867" className="nav-call">512-663-8867</a></li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="top">
        <span className="hero-skyline" aria-hidden="true" />
        <div className="hero-inner">
          <img src="/logo.png" alt="Sanches Group" className="hero-logo" />
          <span className="hero-eyebrow">Leander · Austin · Central Texas</span>
          <h1>
            <span>Construction.</span>
            <span>Repairs.</span>
            <span>Maintenance.</span>
          </h1>
          <p className="hero-sub">
            <strong>One contractor for the whole property.</strong> A patch in the drywall
            or a full remodel — it goes on one list, one schedule, one invoice. Owner on
            every job.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="btn-gold">Get a Free Estimate</a>
            <a href="tel:5126638867" className="btn-outline">512-663-8867</a>
          </div>
          <div className="hero-trust">
            <span>Licensed &amp; Insured</span>
            <span>Veteran-Owned</span>
            <span>Free Estimates</span>
            <span>Owner on Every Job</span>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="sec" id="work">
        <div className="w">
          <span className="eyebrow">What We Do</span>
          <h2 className="title">We do it all.</h2>
          <p className="lead">
            Whatever the property needs, it goes on one list. Our own crews self-perform the
            construction and finish trades. Roofing, electrical, plumbing and heating and air
            run through licensed partners under our management — you still deal with one
            person, and that person is the owner.
          </p>

          <div className="cap-grid">
            {CAPABILITIES.map((c) => (
              <div className="cap" key={c.name}>
                <ToolIcon name={c.icon} size={30} className="cap-icon" />
                <span className="cap-name">{c.name}</span>
                {c.partner ? <span className="cap-note">Licensed partner</span> : null}
              </div>
            ))}
          </div>

          <p className="cap-foot">
            Trades marked <em>licensed partner</em> are performed by appropriately licensed
            contractors working under Sanches Group&apos;s management. We hold no trade
            qualifier licence for those categories and never claim to — we manage the scope,
            the schedule and the standard, and stand behind the result.
          </p>

          <p className="svc-links-label">Service details &amp; free estimates</p>
          <div className="svc-links">
            {SERVICE_PAGES.map((s) => (
              <a className="svc-link" href={`/services/${s.slug}`} key={s.slug}>
                <ToolIcon name={s.icon} size={30} className="svc-icon" />
                <span className="svc-link-text">
                  <strong>{s.name}</strong>
                  <span>{s.city}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="sec ink" id="clients">
        <div className="w">
          <span className="eyebrow">Who We Serve</span>
          <h2 className="title">Homes, buildings,<br />and the people who run them.</h2>
          <p className="lead">
            The same crew and the same standard, whether it is a single room or a hundred units.
          </p>
          <div className="who">
            <div className="who-item">
              <strong>Homeowners</strong>
              <p>Remodels, repairs, paint, flooring, decks and everything on the punch list you have been putting off.</p>
            </div>
            <div className="who-item">
              <strong>Property Managers</strong>
              <p>Unit turns, make-readies and recurring maintenance. We are your vendor — we never compete for your owners.</p>
            </div>
            <div className="who-item">
              <strong>Commercial Owners</strong>
              <p>Build-outs, facilities maintenance, janitorial, pressure washing and scheduled upkeep for offices and retail.</p>
            </div>
            <div className="who-item">
              <strong>Government Agencies</strong>
              <p>Texas HUB certified, SDVOSB, SAM.gov active. Solicitations, spot purchases and HUB subcontracting plans.</p>
            </div>
          </div>
        </div>
      </section>

      {/* GOVERNMENT / CREDENTIALS */}
      <section className="sec" id="government">
        <div className="w">
          <span className="eyebrow">Certifications</span>
          <h2 className="title">Certified. Registered.<br />Ready to perform.</h2>
          <p className="lead">
            All certifications current and independently verifiable. Federal, state and
            municipal work across Central Texas, with spot purchases under $25,000 available
            on direct award — no formal solicitation required.
          </p>
          <div className="specs">
            <div className="spec"><span className="spec-val">TX HUB</span><span className="spec-label">VetHUB Certified</span></div>
            <div className="spec"><span className="spec-val">SDVOSB</span><span className="spec-label">Service-Disabled Vet</span></div>
            <div className="spec"><span className="spec-val">SAM.gov</span><span className="spec-label">Active Federal Reg.</span></div>
            <div className="spec"><span className="spec-val">21829543</span><span className="spec-label">Texas B2G VID</span></div>
            <div className="spec"><span className="spec-val">Gen. Contractor</span><span className="spec-label">Construction &amp; Remodeling</span></div>
            <div className="spec"><span className="spec-val">Insured</span><span className="spec-label">Full Commercial</span></div>
          </div>
          <div className="band-links">
            <a href="/credentials">What these mean &amp; how to verify →</a>
            <a href="/government">NAICS &amp; NIGP codes →</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="sec ink" id="about">
        <div className="w">
          <div className="about-grid">
            <div>
              <img src="/joe.png" alt="Joe Sanches — Founder, Sanches Group" className="about-img" />
            </div>
            <div>
              <span className="eyebrow">Founder &amp; Principal</span>
              <h2 className="title">Joe Sanches</h2>
              <span className="about-role">Founder · Joe Sanches LLC / Sanches Group · Service-Disabled U.S. Veteran</span>
              <p className="about-bio">
                Joe built Sanches Group on the standards he carried in uniform: show up, do the
                work, stand behind it. Based in Leander, Texas, he holds the certifications and
                the operational experience to run construction, maintenance and government work
                under one roof — with one point of contact.
              </p>
              <p className="about-bio">
                Every contract goes through Joe. When you deal with Sanches Group, you deal with
                the owner directly.
              </p>
              <div className="creds">
                <span className="cred">Service-Disabled U.S. Veteran</span>
                <span className="cred">SDVOSB Certified</span>
                <span className="cred">Texas HUB · VetHUB</span>
                <span className="cred">B2G VID: 21829543</span>
                <span className="cred">SAM.gov Registered</span>
                <span className="cred">General Contractor</span>
                <span className="cred">Fully Insured</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="tel:5126638867" className="btn-gold">Call 512-663-8867</a>
                <a href="mailto:hello@joefsanches.com" className="btn-outline">hello@joefsanches.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE AREA */}
      <section className="sec">
        <div className="w">
          <span className="eyebrow">Service Area</span>
          <h2 className="title">Central Texas.</h2>
          <p className="lead">
            Based in Leander, Williamson County. Construction and maintenance across the Austin
            metro; government and large-scope commercial work statewide.
          </p>
          <div className="areas">
            {AREAS.map((a) => <span key={a} className="area">{a}</span>)}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="sec ink" id="contact">
        <div className="w">
          <span className="eyebrow">Contact</span>
          <h2 className="title">Talk to Joe directly.</h2>
          <p className="lead">
            No answering service. No bid coordinator. Tell him what the property needs and he
            will get back to you — usually the same day.
          </p>
          <div className="lead-form-wrap">
            <LeadForm
              heading="Request a free estimate"
              blurb="Tell Joe what you need — a photo helps. Prefer to talk? Call or text 512-663-8867."
            />
          </div>
          <div className="contact-grid">
            <div>
              <div className="c-item">
                <span className="c-label">Phone / Text</span>
                <div className="c-val"><a href="tel:5126638867">512-663-8867</a></div>
              </div>
              <div className="c-item">
                <span className="c-label">Email</span>
                <div className="c-val"><a href="mailto:hello@joefsanches.com">hello@joefsanches.com</a></div>
              </div>
              <div className="c-item">
                <span className="c-label">Based In</span>
                <div className="c-val">Leander, Texas</div>
              </div>
              <div className="c-item">
                <span className="c-label">B2G Vendor ID · Federal EIN</span>
                <div className="c-val">21829543 · 39-4911899</div>
              </div>
            </div>
            <div>
              <div className="inq gold">
                <h4>Government &amp; Municipal</h4>
                <p>Solicitations, capability statements, teaming, HUB subcontracting plans or spot purchase quotes.</p>
                <a href="mailto:hello@joefsanches.com?subject=Government%20Contracting%20Inquiry%20%E2%80%94%20Sanches%20Group&body=Agency%2FOrganization%3A%0AContract%20type%3A%0ANAICS%2FNIGP%20Code(s)%3A%0AScope%3A%0A" className="inq-btn">Send Inquiry →</a>
              </div>
              <div className="inq">
                <h4>Multi-Family &amp; Commercial</h4>
                <p>Maintenance contracts, unit turns, capital improvements and vendor partnerships.</p>
                <a href="mailto:hello@joefsanches.com?subject=Maintenance%20Partnership%20%E2%80%94%20Sanches%20Group&body=Property%20type%3A%0AUnit%20count%20or%20scope%3A%0ANeeds%3A%0A" className="inq-btn">Discuss a Contract →</a>
              </div>
              <div className="inq">
                <h4>Homeowners</h4>
                <p>Remodels, repairs, paint, flooring, decks and everything in between.</p>
                <a href="tel:5126638867" className="inq-btn">Call 512-663-8867 →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <div className="compliance">
        <div className="compliance-inner">
          <span className="compliance-eyebrow">Disclosures &amp; Compliance</span>
          <div className="compliance-grid">
            <div className="compliance-block">
              <span className="compliance-block-label">Licensed Trade Work</span>
              <p>Roofing, electrical, plumbing and HVAC work is performed by appropriately licensed contractors engaged and managed by Sanches Group. Sanches Group does not hold, and does not represent itself as holding, TDLR trade qualifier licences in those categories. Texas does not require a statewide general contractor licence; general construction, remodelling and finish trades are self-performed.</p>
            </div>
            <div className="compliance-block">
              <span className="compliance-block-label">Spot Purchase Availability</span>
              <p>Immediately available for state and municipal spot purchases under $25,000 — janitorial (NIGP 910-39), pressure washing (NIGP 968-94), painting (NIGP 910-54), flooring (NIGP 910-25), window washing (NIGP 910-81) and grounds maintenance (NIGP 98852). No formal solicitation required. Direct award eligible. B2G VID: 21829543.</p>
            </div>
            <div className="compliance-block">
              <span className="compliance-block-label">Property Management Non-Solicitation</span>
              <p>Sanches Group works as an outside vendor for property management clients. We will never solicit their portfolio owners, pursue management contracts, or compete with their business in any form.</p>
            </div>
            <div className="compliance-block">
              <span className="compliance-block-label">Entity Information</span>
              <p>Joe Sanches LLC · DBA Sanches Group · Leander, Texas · EIN: 39-4911899 · B2G VID: 21829543 · Formed October 13, 2025 · State of Texas. 100% service-disabled veteran-owned.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <img src="/logo.png" alt="Sanches Group" className="mark" />
        <div className="foot-nav">
          <a href="#work">What We Do</a>
          <a href="/credentials">Credentials</a>
          <a href="/government">Government</a>
          <a href="#contact">Contact</a>
          <a href="/realtor">Real Estate</a>
        </div>
        <p>© {new Date().getFullYear()} Joe Sanches LLC · Sanches Group · Leander, Texas</p>
        <p>512-663-8867 · <a href="mailto:hello@joefsanches.com">hello@joefsanches.com</a></p>
        <p>Service-Disabled Veteran-Owned · Texas HUB Certified · SDVOSB · SAM.gov Active · Licensed &amp; Insured</p>
        <img
          src="https://comptroller.texas.gov/purchasing/images/vethub-certified-logo-2025.svg"
          alt="Texas Veteran-Owned Business Certified"
          className="hub-logo-footer"
        />
      </footer>
    </>
  );
}
