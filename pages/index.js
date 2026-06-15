import Head from 'next/head';

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black:  #080808;
    --card:   #0f110d;
    --olive:  #6b7854;
    --olive2: #8a9a6b;
    --gold:   #c8a84b;
    --gold2:  #e4c76b;
    --gp:     rgba(200,168,75,0.1);
    --gb:     rgba(200,168,75,0.28);
    --ob:     rgba(107,120,84,0.2);
    --white:  #ffffff;
    --text:   #d4d8cc;
    --muted:  #7a8070;
    --div:    rgba(255,255,255,0.06);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
    background: var(--black);
    color: var(--text);
    line-height: 1.65;
  }

  a { color: var(--gold); text-decoration: none; }
  a:hover { color: var(--gold2); }

  .w { max-width: 1160px; margin: 0 auto; padding: 0 40px; }

  /* ── NAV ── */
  .nav {
    position: sticky; top: 0; z-index: 200;
    background: rgba(8,8,8,0.97);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--gb);
  }
  .nav-inner {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 40px; max-width: 1160px; margin: 0 auto;
  }
  .nav-logo img {
    height: 40px;
    filter: drop-shadow(0 0 8px rgba(107,120,84,0.5));
  }
  .nav-links { display: flex; gap: 28px; list-style: none; align-items: center; }
  .nav-links a { font-size: 13px; font-weight: 500; color: var(--muted); letter-spacing: 0.3px; text-transform: uppercase; }
  .nav-links a:hover { color: var(--gold); }
  .nav-call {
    background: var(--gold); color: var(--black) !important;
    padding: 9px 20px; border-radius: 4px;
    font-weight: 900; font-size: 13px; letter-spacing: 0.5px; text-transform: uppercase;
  }
  .nav-call:hover { background: var(--gold2) !important; }

  /* ── HERO ── */
  .hero {
    background: var(--black);
    border-bottom: 1px solid var(--gb);
    padding: 100px 40px 88px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(600px 400px at 50% 100%, rgba(107,120,84,0.06) 0%, transparent 70%),
      radial-gradient(800px 300px at 50% -10%, rgba(200,168,75,0.04) 0%, transparent 60%);
    pointer-events: none;
  }
  .hero-inner { position: relative; z-index: 1; max-width: 900px; margin: 0 auto; }

  .hero-logo {
    width: 180px; height: 180px;
    object-fit: contain;
    margin: 0 auto 32px;
    display: block;
    filter: drop-shadow(0 0 40px rgba(107,120,84,0.55)) drop-shadow(0 0 80px rgba(107,120,84,0.2));
  }

  .hero-eyebrow {
    font-size: 11px; font-weight: 800; letter-spacing: 3px;
    text-transform: uppercase; color: var(--gold);
    margin-bottom: 18px; display: block;
  }

  .hero h1 {
    font-size: 72px; font-weight: 900; color: var(--white);
    letter-spacing: -2px; line-height: 1; margin-bottom: 20px;
    text-transform: uppercase;
  }

  .hero-what {
    font-size: 16px; color: var(--text); letter-spacing: 0.5px;
    margin-bottom: 14px; display: block; line-height: 1.6;
  }

  .hero-who {
    font-size: 13px; color: var(--muted); letter-spacing: 2px;
    text-transform: uppercase; font-weight: 600;
    margin-bottom: 44px; display: block;
  }
  .hero-who span { color: var(--gold); }

  .hero-ctas { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 56px; }

  .btn-gold {
    background: var(--gold); color: var(--black);
    padding: 15px 32px; border-radius: 4px;
    font-weight: 900; font-size: 14px;
    letter-spacing: 1px; text-transform: uppercase;
    display: inline-block;
  }
  .btn-gold:hover { background: var(--gold2); color: var(--black); }

  .btn-outline {
    border: 1px solid var(--gb); color: var(--gold);
    padding: 15px 32px; border-radius: 4px;
    font-weight: 700; font-size: 14px;
    letter-spacing: 1px; text-transform: uppercase;
    display: inline-block;
  }
  .btn-outline:hover { background: var(--gp); }

  .hero-specs {
    display: inline-flex; border: 1px solid var(--gb); border-radius: 4px; overflow: hidden;
    flex-wrap: wrap;
  }
  .spec {
    padding: 16px 26px; border-right: 1px solid var(--gb);
    text-align: center;
  }
  .spec:last-child { border-right: none; }
  .spec-val { font-size: 12px; font-weight: 900; color: var(--gold); display: block; letter-spacing: 1px; text-transform: uppercase; line-height: 1; }
  .spec-label { font-size: 10px; color: var(--muted); margin-top: 5px; display: block; letter-spacing: 0.8px; text-transform: uppercase; }

  /* ── AUDIENCE STRIP ── */
  .audience-strip {
    background: #050504;
    border-bottom: 1px solid var(--gb);
    padding: 0;
  }
  .audience-inner {
    max-width: 1160px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4, 1fr);
  }
  .audience-card {
    padding: 28px 32px; border-right: 1px solid var(--gb);
    cursor: default;
  }
  .audience-card:last-child { border-right: none; }
  .audience-card-label {
    font-size: 10px; font-weight: 900; letter-spacing: 2px;
    text-transform: uppercase; color: var(--gold); display: block; margin-bottom: 8px;
  }
  .audience-card-title {
    font-size: 14px; font-weight: 900; color: var(--white); display: block;
    margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.3px;
  }
  .audience-card p {
    font-size: 12px; color: var(--muted); line-height: 1.6; margin-bottom: 10px;
  }
  .audience-card a {
    font-size: 11px; font-weight: 900; color: var(--gold); letter-spacing: 1px;
    text-transform: uppercase;
  }

  /* ── SECTION ── */
  .sec { padding: 88px 0; border-bottom: 1px solid var(--div); }
  .sec.dark { background: #050504; }

  .sec-eyebrow {
    font-size: 10px; font-weight: 900; letter-spacing: 3px;
    text-transform: uppercase; color: var(--gold); margin-bottom: 12px;
  }
  .sec-title {
    font-size: 40px; font-weight: 900; color: var(--white);
    letter-spacing: -1px; margin-bottom: 16px; line-height: 1.1;
    text-transform: uppercase;
  }
  .sec-lead {
    font-size: 17px; color: var(--muted); max-width: 640px;
    line-height: 1.75; margin-bottom: 52px;
  }

  /* ── SERVICES ── */
  .lanes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
  .lane {
    background: var(--card); border: 1px solid var(--div);
    padding: 32px 28px;
    transition: border-color 0.2s, background 0.2s;
  }
  .lane:hover { border-color: var(--ob); background: #141810; }
  .lane-num {
    font-size: 10px; font-weight: 900; letter-spacing: 2px;
    text-transform: uppercase; color: var(--gold); margin-bottom: 16px;
    display: block; opacity: 0.6;
  }
  .lane h3 { font-size: 18px; font-weight: 800; color: var(--white); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
  .lane p { font-size: 14px; color: var(--muted); line-height: 1.65; margin-bottom: 16px; }
  .lane-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .lane-tag {
    font-size: 10px; font-weight: 900; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--olive2);
    border: 1px solid var(--ob); padding: 4px 10px; border-radius: 2px;
    display: inline-block;
  }

  /* ── GOVERNMENT ── */
  .gov-top { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-bottom: 2px; }
  .gov-box {
    background: var(--card); border: 1px solid var(--gb);
    padding: 32px 30px;
  }
  .gov-box h4 {
    font-size: 10px; font-weight: 900; letter-spacing: 2.5px;
    text-transform: uppercase; color: var(--gold); margin-bottom: 20px;
  }
  .cert-row {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 14px 0; border-bottom: 1px solid var(--div);
  }
  .cert-row:last-child { border-bottom: none; padding-bottom: 0; }
  .cert-ico { font-size: 20px; flex-shrink: 0; }
  .cert-name { font-size: 14px; font-weight: 700; color: var(--white); }
  .cert-sub { font-size: 12px; color: var(--muted); margin-top: 3px; line-height: 1.5; }
  .cert-valid { font-size: 11px; color: var(--gold); font-weight: 700; display: block; margin-top: 4px; letter-spacing: 0.3px; }

  .gov-codes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-bottom: 2px; }
  .gov-codes-box {
    background: var(--card); border: 1px solid var(--div);
    padding: 28px 30px;
  }
  .gov-codes-box h4 {
    font-size: 10px; font-weight: 900; letter-spacing: 2.5px;
    text-transform: uppercase; color: var(--gold); margin-bottom: 16px;
  }
  .code-row {
    display: flex; gap: 14px; align-items: flex-start;
    padding: 9px 0; border-bottom: 1px solid var(--div);
  }
  .code-row:last-child { border-bottom: none; padding-bottom: 0; }
  .code-num { color: var(--gold); font-weight: 900; font-size: 12px; letter-spacing: 0.5px; flex-shrink: 0; padding-top: 2px; min-width: 60px; }
  .code-name { font-size: 13px; color: var(--text); line-height: 1.4; }
  .code-tag {
    display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; color: var(--olive2); border: 1px solid var(--ob);
    padding: 2px 6px; border-radius: 2px; margin-left: 6px; vertical-align: middle;
    white-space: nowrap;
  }

  .gov-spot {
    background: var(--gp); border: 1px solid var(--gb);
    padding: 20px 28px; margin-bottom: 2px;
    display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
  }
  .gov-spot-label {
    font-size: 11px; font-weight: 900; letter-spacing: 2px;
    text-transform: uppercase; color: var(--gold); white-space: nowrap;
  }
  .gov-spot p { font-size: 14px; color: var(--text); line-height: 1.5; flex: 1; }

  .cap-bar {
    background: var(--gp); border: 1px solid var(--gb);
    padding: 24px 32px;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 16px;
  }
  .cap-bar p { font-size: 15px; color: var(--text); max-width: 680px; line-height: 1.6; }

  /* ── MULTI-FAMILY ── */
  .mf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
  .mf-box {
    background: var(--card); border: 1px solid var(--div);
    padding: 32px 28px;
  }
  .mf-box h3 { font-size: 16px; font-weight: 900; color: var(--white); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
  .mf-box p { font-size: 14px; color: var(--muted); line-height: 1.65; margin-bottom: 16px; }
  .check { list-style: none; display: flex; flex-direction: column; gap: 9px; }
  .check li {
    font-size: 14px; color: var(--text);
    display: flex; align-items: flex-start; gap: 10px; line-height: 1.5;
  }
  .check li::before { content: '—'; color: var(--gold); font-weight: 900; flex-shrink: 0; }
  .promise {
    background: #0a0c09; border: 1px solid var(--gb);
    padding: 28px 32px; grid-column: 1 / -1;
    margin-top: 2px;
  }
  .promise h3 { font-size: 12px; font-weight: 900; color: var(--gold); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; }
  .promise p { font-size: 14px; color: var(--muted); line-height: 1.75; }

  /* ── RE ── */
  .re-box {
    background: var(--card); border: 1px solid var(--div);
    padding: 44px 48px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
  }
  .re-box h3 { font-size: 22px; font-weight: 900; color: var(--white); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
  .re-box p { font-size: 15px; color: var(--muted); line-height: 1.75; margin-bottom: 16px; }
  .re-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
  .re-tag {
    background: rgba(107,120,84,0.1); border: 1px solid var(--ob);
    color: var(--olive2); font-size: 11px; font-weight: 700;
    padding: 5px 12px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.5px;
  }
  .re-note {
    border-left: 3px solid var(--gold);
    padding: 16px 20px;
    background: var(--gp);
    font-size: 13px; color: var(--muted); line-height: 1.7;
  }

  /* ── ABOUT ── */
  .about-grid { display: grid; grid-template-columns: 300px 1fr; gap: 64px; align-items: start; }
  .about-img {
    width: 100%; border-radius: 0;
    border: 1px solid var(--gb);
    filter: grayscale(20%);
    box-shadow: 0 20px 60px rgba(0,0,0,0.7);
  }
  .about h2 { font-size: 36px; font-weight: 900; color: var(--white); text-transform: uppercase; letter-spacing: -0.5px; margin-bottom: 4px; }
  .about-role { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; display: block; }
  .about-bio { font-size: 16px; color: var(--muted); line-height: 1.8; margin-bottom: 14px; }
  .creds { display: flex; flex-wrap: wrap; gap: 8px; margin: 20px 0 28px; }
  .cred {
    border: 1px solid var(--ob); color: var(--olive2);
    font-size: 11px; font-weight: 700; padding: 6px 14px; border-radius: 2px;
    text-transform: uppercase; letter-spacing: 0.5px;
  }

  /* ── AREAS ── */
  .areas { display: flex; flex-wrap: wrap; gap: 2px; }
  .area {
    background: var(--card); border: 1px solid var(--div);
    color: var(--muted); font-size: 13px; font-weight: 700;
    padding: 12px 20px; text-transform: uppercase; letter-spacing: 1px;
  }

  /* ── CONTACT ── */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
  .contact-main {
    background: var(--card); border: 1px solid var(--gb);
    padding: 40px 36px;
  }
  .contact-main h3 { font-size: 24px; font-weight: 900; color: var(--white); text-transform: uppercase; letter-spacing: -0.5px; margin-bottom: 8px; }
  .contact-main > p { font-size: 14px; color: var(--muted); margin-bottom: 28px; }
  .c-items { display: flex; flex-direction: column; gap: 18px; }
  .c-item { display: flex; align-items: flex-start; gap: 16px; }
  .c-icon {
    width: 40px; height: 40px; flex-shrink: 0;
    border: 1px solid var(--gb); border-radius: 2px;
    display: flex; align-items: center; justify-content: center; font-size: 16px;
    background: var(--gp);
  }
  .c-label { font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 3px; display: block; }
  .c-val { font-size: 15px; color: var(--text); }
  .c-val a { color: var(--white); font-weight: 700; }
  .c-sub { font-size: 11px; color: var(--muted); margin-top: 2px; display: block; }

  .inq-cards { display: flex; flex-direction: column; gap: 2px; }
  .inq {
    background: var(--card); border: 1px solid var(--div);
    padding: 24px 28px; flex: 1;
  }
  .inq.gold { border-color: var(--gb); }
  .inq h4 { font-size: 13px; font-weight: 900; color: var(--white); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
  .inq p { font-size: 13px; color: var(--muted); margin-bottom: 16px; line-height: 1.5; }
  .inq-btn {
    display: inline-block; background: var(--gold); color: var(--black);
    padding: 9px 20px; border-radius: 2px; font-size: 12px; font-weight: 900;
    letter-spacing: 1px; text-transform: uppercase;
  }
  .inq-btn:hover { background: var(--gold2); }
  .inq-ghost {
    display: inline-block; border: 1px solid var(--gb); color: var(--gold);
    padding: 9px 20px; border-radius: 2px; font-size: 12px; font-weight: 700;
    letter-spacing: 1px; text-transform: uppercase;
  }
  .inq-ghost:hover { background: var(--gp); }

  /* ── FOOTER ── */
  footer {
    background: #030303; border-top: 1px solid var(--gb);
    padding: 40px; text-align: center;
  }
  footer img {
    height: 52px; margin: 0 auto 16px; display: block;
    filter: drop-shadow(0 0 12px rgba(107,120,84,0.4));
  }
  footer p { font-size: 13px; color: var(--muted); line-height: 1.7; }
  footer .disc { font-size: 11px; color: #2a3020; margin-top: 12px; line-height: 1.6; }
  .hub-logo-footer { height: 44px; width: auto; margin: 12px auto 0; display: block; opacity: 0.85; }

  /* ── COMPLIANCE ── */
  .compliance {
    background: #020202; border-top: 1px solid rgba(255,255,255,0.04);
    padding: 36px 40px;
  }
  .compliance-inner { max-width: 1160px; margin: 0 auto; }
  .compliance-eyebrow {
    font-size: 9px; font-weight: 900; letter-spacing: 2.5px; text-transform: uppercase;
    color: #3a4030; margin-bottom: 20px; display: block;
  }
  .compliance-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
  .compliance-block { }
  .compliance-block-label {
    font-size: 9px; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase;
    color: #3a4030; margin-bottom: 6px; display: block;
  }
  .compliance-block p {
    font-size: 12px; color: #2e3428; line-height: 1.75;
  }
  @media (max-width: 700px) {
    .compliance { padding: 24px 20px; }
    .compliance-grid { grid-template-columns: 1fr; gap: 20px; }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 940px) {
    .nav-links { display: none; }
    .hero { padding: 60px 20px 56px; }
    .hero h1 { font-size: 44px; }
    .hero-logo { width: 130px; height: 130px; }
    .w { padding: 0 20px; }
    .sec { padding: 56px 0; }
    .lanes { grid-template-columns: 1fr; gap: 2px; }
    .audience-inner { grid-template-columns: 1fr 1fr; }
    .gov-top { grid-template-columns: 1fr; }
    .gov-codes-grid { grid-template-columns: 1fr; }
    .mf-grid { grid-template-columns: 1fr; }
    .promise { grid-column: auto; }
    .re-box { grid-template-columns: 1fr; padding: 28px 24px; }
    .about-grid { grid-template-columns: 1fr; }
    .about-img { max-width: 240px; }
    .contact-grid { grid-template-columns: 1fr; }
    .areas { gap: 2px; }
    footer { padding: 28px 20px; }
  }
  @media (max-width: 600px) {
    .audience-inner { grid-template-columns: 1fr; }
    .audience-card { border-right: none; border-bottom: 1px solid var(--gb); }
    .audience-card:last-child { border-bottom: none; }
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Sanches Group | General Contractor · Government Certified · Leander, Texas</title>
        <meta name="description" content="Sanches Group — service-disabled veteran-owned general contractor in Leander, TX. General construction, unit turns, remodeling, facilities maintenance, janitorial, painting, and pressure washing. Texas HUB certified, SDVOSB, SAM.gov active." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://joefsanches.com" />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </Head>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <a className="nav-logo" href="#top">
            <img src="/logo.png" alt="Sanches Group" />
          </a>
          <ul className="nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#government">Gov Contracting</a></li>
            <li><a href="#multifamily">Multi-Family</a></li>
            <li><a href="#real-estate">Real Estate</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="tel:5126638867" className="nav-call">512-663-8867</a></li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-inner">
          <img src="/logo.png" alt="Sanches Group" className="hero-logo" />
          <span className="hero-eyebrow">Service-Disabled Veteran-Owned · Leander, Texas</span>
          <h1>Sanches Group</h1>
          <span className="hero-what">
            General construction · unit turns · remodeling · facilities maintenance · janitorial · painting · pressure washing · government contracting
          </span>
          <span className="hero-who">
            Serving <span>government agencies</span> · <span>property managers</span> · <span>commercial owners</span> · <span>homeowners</span>
          </span>
          <div className="hero-ctas">
            <a href="#government" className="btn-gold">Government Contracting</a>
            <a href="#contact" className="btn-outline">Request a Quote</a>
          </div>
          <div className="hero-specs">
            <div className="spec">
              <span className="spec-val">TX HUB</span>
              <span className="spec-label">VetHUB Certified</span>
            </div>
            <div className="spec">
              <span className="spec-val">SDVOSB</span>
              <span className="spec-label">Service-Disabled Vet</span>
            </div>
            <div className="spec">
              <span className="spec-val">SAM.gov</span>
              <span className="spec-label">Active Federal Reg.</span>
            </div>
            <div className="spec">
              <span className="spec-val">B2G VID</span>
              <span className="spec-label">21829543</span>
            </div>
            <div className="spec">
              <span className="spec-val">Gen. Contractor</span>
              <span className="spec-label">No TX License Req.</span>
            </div>
            <div className="spec">
              <span className="spec-val">Insured</span>
              <span className="spec-label">Full Commercial</span>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE STRIP */}
      <div className="audience-strip">
        <div className="audience-inner">
          <div className="audience-card">
            <span className="audience-card-label">For Government</span>
            <span className="audience-card-title">Agencies &amp; Procurement</span>
            <p>Texas HUB, SDVOSB, SAM.gov. General construction, facilities maintenance, and non-licensed spot purchase services. Direct award eligible.</p>
            <a href="#government">See certifications &amp; codes →</a>
          </div>
          <div className="audience-card">
            <span className="audience-card-label">For Property Managers</span>
            <span className="audience-card-title">Multi-Family &amp; Commercial</span>
            <p>Vendor relationship only — we do the work, never compete with your business. Unit turns, remodeling, painting, janitorial, capital improvements.</p>
            <a href="#multifamily">How we work →</a>
          </div>
          <div className="audience-card">
            <span className="audience-card-label">For Homeowners</span>
            <span className="audience-card-title">Construction &amp; Renovation</span>
            <p>General construction, remodeling, painting, flooring, and property maintenance for homeowners and residential investors across Central Texas.</p>
            <a href="tel:5126638867">512-663-8867 →</a>
          </div>
          <div className="audience-card">
            <span className="audience-card-label">Buying or Selling?</span>
            <span className="audience-card-title">Real Estate Division</span>
            <p>Joe is a licensed Realtor (TREC) representing buyers and sellers in Leander, Cedar Park, and the Austin suburbs. Separate from contracting.</p>
            <a href="/realtor">Realtor site →</a>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section className="sec" id="services">
        <div className="w">
          <p className="sec-eyebrow">What We Do</p>
          <h2 className="sec-title">One company.<br/>Get it done right.</h2>
          <p className="sec-lead">Sanches Group delivers general construction, property maintenance, and facilities services for government agencies, property managers, and homeowners across Central Texas. Owner on every job. No mystery crews.</p>
          <div className="lanes">
            <div className="lane">
              <span className="lane-num">01</span>
              <h3>General Construction</h3>
              <p>Remodels, build-outs, room additions, interior renovations, and new construction for residential and commercial properties. Texas does not require a statewide GC license — we manage scope, subs, and delivery.</p>
              <div className="lane-tags">
                <span className="lane-tag">Residential</span>
                <span className="lane-tag">Commercial</span>
                <span className="lane-tag">NAICS 236220</span>
              </div>
            </div>
            <div className="lane">
              <span className="lane-num">02</span>
              <h3>Unit Turns &amp; Rehab</h3>
              <p>Fast, high-quality unit turn work for multi-family properties, government housing, and rental portfolios. Drywall, paint, flooring, fixtures, cleaning — complete turnaround under one crew.</p>
              <div className="lane-tags">
                <span className="lane-tag">Multi-Family</span>
                <span className="lane-tag">NAICS 236118</span>
              </div>
            </div>
            <div className="lane">
              <span className="lane-num">03</span>
              <h3>Painting &amp; Drywall</h3>
              <p>Interior and exterior painting, drywall repair and installation, texture matching, and wall covering for residential, commercial, and government facilities. Fast scheduling and itemized invoicing.</p>
              <div className="lane-tags">
                <span className="lane-tag">Residential</span>
                <span className="lane-tag">Gov Eligible</span>
                <span className="lane-tag">NIGP 910-54</span>
              </div>
            </div>
            <div className="lane">
              <span className="lane-num">04</span>
              <h3>Flooring &amp; Pressure Washing</h3>
              <p>Flooring installation, repair, and maintenance (LVP, tile, carpet). Commercial pressure washing for building exteriors, parking lots, driveways, and walkways. Available for spot purchases.</p>
              <div className="lane-tags">
                <span className="lane-tag">NIGP 910-25</span>
                <span className="lane-tag">NIGP 968-94</span>
              </div>
            </div>
            <div className="lane">
              <span className="lane-num">05</span>
              <h3>Janitorial &amp; Facilities</h3>
              <p>Janitorial and custodial services, window washing, grounds maintenance, and ongoing facilities maintenance contracts for commercial, government, and institutional clients. No formal solicitation required under $25K.</p>
              <div className="lane-tags">
                <span className="lane-tag">Gov Eligible</span>
                <span className="lane-tag">Spot Purchases</span>
                <span className="lane-tag">NIGP 910-39</span>
              </div>
            </div>
            <div className="lane">
              <span className="lane-num">06</span>
              <h3>Government Contracting</h3>
              <p>Federal, state, and municipal contracts for construction, maintenance, and facilities work. Texas HUB certified, SDVOSB, SAM.gov active. Available for solicitations, spot purchases under $25K, and HUB subcontracting plans.</p>
              <div className="lane-tags">
                <span className="lane-tag">TX HUB</span>
                <span className="lane-tag">SDVOSB</span>
                <span className="lane-tag">SAM.gov</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOVERNMENT */}
      <section className="sec dark" id="government">
        <div className="w">
          <p className="sec-eyebrow">Government Contracting</p>
          <h2 className="sec-title">Certified. Registered.<br/>Ready to perform.</h2>
          <p className="sec-lead">All certifications current. SAM.gov active. Fully insured. Pursuing federal, state, and municipal contracts for general construction, facilities maintenance, and non-licensed spot purchase services across Central Texas.</p>

          {/* Certs + NAICS */}
          <div className="gov-top">
            <div className="gov-box">
              <h4>Certifications &amp; Registrations</h4>
              <div className="cert-row">
                <span className="cert-ico">⭐</span>
                <div>
                  <div className="cert-name">Texas HUB — VetHUB Certified</div>
                  <div className="cert-sub">Historically Underutilized Business — issued by Texas Comptroller of Public Accounts.</div>
                  <span className="cert-valid">Effective 6/9/2026 · Valid through 6/9/2030 · B2G VID: 21829543</span>
                </div>
              </div>
              <div className="cert-row">
                <span className="cert-ico">🎖️</span>
                <div>
                  <div className="cert-name">SDVOSB — Service-Disabled Veteran-Owned Small Business</div>
                  <div className="cert-sub">VA-verified. Joe Sanches carries a service-connected disability rating of 20% or greater. Eligible for SDVOSB set-aside contracts under 38 U.S.C. § 8127 — the highest federal small business preference tier.</div>
                </div>
              </div>
              <div className="cert-row">
                <span className="cert-ico">🏛️</span>
                <div>
                  <div className="cert-name">SAM.gov — Active Federal Registration</div>
                  <div className="cert-sub">System for Award Management. Active and in good standing. Eligible to receive federal contract awards.</div>
                </div>
              </div>
              <div className="cert-row">
                <span className="cert-ico">🪪</span>
                <div>
                  <div className="cert-name">Fully Insured — Texas</div>
                  <div className="cert-sub">Commercial general liability ($1M+ per occurrence) and workers&apos; compensation. Certificate of insurance available on request.</div>
                </div>
              </div>
              <div className="cert-row">
                <span className="cert-ico">🇺🇸</span>
                <div>
                  <div className="cert-name">Service-Disabled Veteran — Owned &amp; Operated</div>
                  <div className="cert-sub">Joe Sanches is a U.S. service-disabled veteran with a service-connected disability rating of 20% or greater. 100% owned and operated by the veteran — unconditionally.</div>
                </div>
              </div>
              <div style={{ paddingTop: '20px', marginTop: '4px' }}>
                <img
                  src="https://comptroller.texas.gov/purchasing/images/vethub-certified-logo-2025.svg"
                  alt="Texas Veteran-Owned Business Certified"
                  style={{ height: '56px', width: 'auto', display: 'block' }}
                />
              </div>
            </div>
            <div className="gov-box">
              <h4>NAICS Codes (Federal)</h4>
              <div className="code-row"><span className="code-num">238110</span><span className="code-name">Plumbing, Heating &amp; Air-Conditioning Contractors</span></div>
              <div className="code-row"><span className="code-num">238210</span><span className="code-name">Electrical Contractors &amp; Other Wiring Installation</span></div>
              <div className="code-row"><span className="code-num">236220</span><span className="code-name">Commercial &amp; Institutional Building Construction</span></div>
              <div className="code-row"><span className="code-num">236118</span><span className="code-name">Residential Remodelers</span></div>
              <div className="code-row"><span className="code-num">561720</span><span className="code-name">Janitorial Services &amp; Facilities Maintenance</span></div>
              <div className="code-row"><span className="code-num">238990</span><span className="code-name">All Other Specialty Trade Contractors</span></div>
            </div>
          </div>

          {/* NIGP Codes */}
          <div className="gov-codes-grid">
            <div className="gov-codes-box">
              <h4>NIGP Codes — Texas CMBL (Active)</h4>
              <div className="code-row"><span className="code-num">91000</span><span className="code-name">Building Maintenance, Installation &amp; Repair <span className="code-tag">Active</span></span></div>
              <div className="code-row"><span className="code-num">91082</span><span className="code-name">Wiring &amp; Electrical Maintenance and Repair <span className="code-tag">Active</span></span></div>
              <div className="code-row"><span className="code-num">91141</span><span className="code-name">C.I.P., Landscaping <span className="code-tag">Active</span></span></div>
              <div className="code-row"><span className="code-num">91450</span><span className="code-name">HVAC (Heating, Ventilating, and Air Conditioning) <span className="code-tag">Active</span></span></div>
              <div className="code-row"><span className="code-num">98852</span><span className="code-name">General Grounds Maintenance <span className="code-tag">Active</span></span></div>
            </div>
            <div className="gov-codes-box">
              <h4>NIGP Codes — Texas CMBL (Spot Purchase Eligible)</h4>
              <div className="code-row"><span className="code-num">910-39</span><span className="code-name">Janitorial / Custodial Services</span></div>
              <div className="code-row"><span className="code-num">968-94</span><span className="code-name">Pressure Washing Services</span></div>
              <div className="code-row"><span className="code-num">910-54</span><span className="code-name">Painting and Wall Covering</span></div>
              <div className="code-row"><span className="code-num">910-25</span><span className="code-name">Flooring Maintenance and Repair</span></div>
              <div className="code-row"><span className="code-num">910-81</span><span className="code-name">Window Washing Services</span></div>
            </div>
          </div>

          {/* Spot purchase callout */}
          <div className="gov-spot">
            <span className="gov-spot-label">Spot Purchases</span>
            <p>Available immediately for non-licensed services under $25,000 — janitorial, pressure washing, painting, flooring, window washing, and grounds maintenance. No formal solicitation required. Contact for a same-day quote.</p>
            <a href="mailto:hello@joefsanches.com?subject=Spot%20Purchase%20Quote%20Request%20%E2%80%94%20Sanches%20Group&body=Agency%2FOrganization%3A%0ANIGP%20Code%2FService%3A%0ALocation%3A%0AScope%3A%0A" className="btn-gold" style={{ whiteSpace: 'nowrap', fontSize: '13px', padding: '10px 22px' }}>Request Quote →</a>
          </div>

          <div className="cap-bar">
            <p><strong style={{ color: 'var(--white)' }}>Contracting Officers &amp; Procurement Teams —</strong> Full capability statement, past performance, bonding capacity, and all certifications on our dedicated government page.</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a href="/government" className="btn-gold">Government Contracting Page →</a>
              <a href="mailto:hello@joefsanches.com?subject=Capability%20Statement%20Request%20%E2%80%94%20Sanches%20Group&body=Agency%2FOrganization%3A%0ANAICS%20Code(s)%3A%0AContract%20type%3A%0A" className="btn-outline">Request Capability Statement</a>
            </div>
          </div>
        </div>
      </section>

      {/* MULTI-FAMILY */}
      <section className="sec" id="multifamily">
        <div className="w">
          <p className="sec-eyebrow">Multi-Family &amp; Commercial</p>
          <h2 className="sec-title">Your vendor.<br/>Not your competition.</h2>
          <p className="sec-lead">Sanches Group works as an outside contractor for property management companies, apartment complexes, and commercial owners. We do the work. You keep the client relationship. We never talk to your owners about anything outside the scope of work.</p>
          <div className="mf-grid">
            <div className="mf-box">
              <h3>For Property Managers</h3>
              <p>One call covers your maintenance and renovation needs. Fast turnaround, itemized invoicing, photo documentation — no surprises.</p>
              <ul className="check">
                <li>Unit turns — drywall, paint, flooring, clean</li>
                <li>Interior and exterior painting</li>
                <li>Flooring installation and repair</li>
                <li>General construction and remodeling</li>
                <li>Janitorial and custodial services</li>
                <li>Pressure washing</li>
                <li>Fully insured — we carry the liability</li>
              </ul>
            </div>
            <div className="mf-box">
              <h3>For Property Owners</h3>
              <p>Ongoing maintenance contracts for 5-unit to 100+ unit portfolios. One point of contact for every trade. No rotating crews, no surprises on the invoice.</p>
              <ul className="check">
                <li>Capital improvement and renovation</li>
                <li>Common area maintenance and upkeep</li>
                <li>Drywall, paint, and finish work</li>
                <li>Scope-of-work and project documentation</li>
                <li>Competitive contract pricing</li>
                <li>Central Texas — all major markets</li>
                <li>HUB-certified where state reporting required</li>
              </ul>
            </div>
            <div className="promise">
              <h3>On record: we are your vendor, not your competitor</h3>
              <p>Sanches Group has a real estate division. It handles individual buyer and seller transactions only. We do not solicit your property owners, pursue management contracts, or compete with your business in any form. You bring us in to do the work — that&apos;s the whole relationship.</p>
            </div>
          </div>
        </div>
      </section>

      {/* REAL ESTATE */}
      <section className="sec dark" id="real-estate">
        <div className="w">
          <p className="sec-eyebrow">Real Estate Division</p>
          <h2 className="sec-title">Buying or selling<br/>in Austin?</h2>
          <p className="sec-lead">Joe Sanches is a licensed Realtor (TREC) representing individual buyers and sellers in Leander, Cedar Park, and the greater Austin area. This division is structurally separate from all contracting operations.</p>
          <div className="re-box">
            <div>
              <h3>Buyer &amp; Seller Representation</h3>
              <p>Every neighborhood, every builder, every school zone in Leander and Cedar Park. VA loan expertise. New construction navigation from contract to close. Military relocation specialists.</p>
              <div className="re-tags">
                <span className="re-tag">First-Time Buyers</span>
                <span className="re-tag">VA &amp; VLB Loans</span>
                <span className="re-tag">New Construction</span>
                <span className="re-tag">Resale</span>
                <span className="re-tag">Seller Representation</span>
                <span className="re-tag">Military Relocation</span>
                <span className="re-tag">Out-of-State Buyers</span>
              </div>
              <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
                <a href="/realtor" className="btn-gold">Realtor Site →</a>
                <a href="https://a.nhb.app/u/joe" className="btn-outline" target="_blank" rel="noopener noreferrer">Browse New Construction</a>
              </div>
            </div>
            <div>
              <div className="re-note">
                <strong style={{ color:'var(--white)', display:'block', marginBottom:'8px' }}>Note for property managers &amp; contractors</strong>
                The real estate division handles individual purchase and sale transactions only. It does not engage with rental portfolios, management operations, or commercial acquisition on behalf of third parties. Structurally separated within Sanches Group. Our contracting clients&apos; portfolios are never solicited.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="sec" id="about">
        <div className="w">
          <div className="about-grid">
            <div>
              <img src="/joe.png" alt="Joe Sanches — Founder, Sanches Group" className="about-img" />
            </div>
            <div className="about">
              <p className="sec-eyebrow">Founder &amp; Principal</p>
              <h2>Joe Sanches</h2>
              <span className="about-role">Founder · Joe Sanches LLC / Sanches Group · Service-Disabled U.S. Veteran (20%+) · Licensed Realtor (TREC)</span>
              <p className="about-bio">Joe Sanches built Sanches Group on the same standards he carried in uniform: show up, do the work, stand behind it. Based in Leander, Texas, he holds the licenses, certifications, and operational experience to deliver maintenance, construction, and government contracting work across all sectors — under one roof, with one point of contact: the owner.</p>
              <p className="about-bio">Every contract goes through Joe. When you deal with Sanches Group, you deal with the owner directly.</p>
              <div className="creds">
                <span className="cred">Service-Disabled U.S. Veteran (20%+)</span>
                <span className="cred">SDVOSB Certified</span>
                <span className="cred">Texas HUB · VetHUB</span>
                <span className="cred">B2G VID: 21829543</span>
                <span className="cred">SAM.gov Registered</span>
                <span className="cred">TREC Licensed Realtor</span>
                <span className="cred">General Contractor</span>
                <span className="cred">Fully Insured</span>
              </div>
              <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
                <a href="tel:5126638867" className="btn-gold">Call 512-663-8867</a>
                <a href="mailto:hello@joefsanches.com" className="btn-outline">hello@joefsanches.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="sec dark">
        <div className="w">
          <p className="sec-eyebrow">Service Area</p>
          <h2 className="sec-title">Central Texas.</h2>
          <p className="sec-lead">Maintenance, construction, government contracting, and real estate across the Austin metro. Primary base: Leander, Williamson County. Government and large-scope commercial work statewide.</p>
          <div className="areas">
            {['Leander','Cedar Park','Austin','Round Rock','Georgetown','Pflugerville','Liberty Hill','Hutto','Kyle','Buda','San Marcos','Temple','Statewide (Gov)'].map(a => (
              <span key={a} className="area">{a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="sec" id="contact">
        <div className="w">
          <p className="sec-eyebrow">Contact</p>
          <h2 className="sec-title">Talk to Joe directly.</h2>
          <p className="sec-lead">No answering service. No bid coordinator. Government contract, maintenance agreement, construction project, or buying a home — reach Joe directly at the number below.</p>
          <div className="contact-grid">
            <div className="contact-main">
              <h3>Joe Sanches</h3>
              <p>Founder &amp; Principal · Sanches Group · Leander, Texas</p>
              <div className="c-items">
                <div className="c-item">
                  <span className="c-icon">📞</span>
                  <div>
                    <span className="c-label">Phone / Text</span>
                    <div className="c-val"><a href="tel:5126638867">512-663-8867</a></div>
                    <span className="c-sub">Call or text — direct line to Joe</span>
                  </div>
                </div>
                <div className="c-item">
                  <span className="c-icon">✉️</span>
                  <div>
                    <span className="c-label">Email</span>
                    <div className="c-val"><a href="mailto:hello@joefsanches.com">hello@joefsanches.com</a></div>
                  </div>
                </div>
                <div className="c-item">
                  <span className="c-icon">🆔</span>
                  <div>
                    <span className="c-label">B2G Vendor ID (CMBL / Texas HUB)</span>
                    <div className="c-val">21829543</div>
                  </div>
                </div>
                <div className="c-item">
                  <span className="c-icon">📋</span>
                  <div>
                    <span className="c-label">Federal EIN</span>
                    <div className="c-val">39-4911899</div>
                  </div>
                </div>
                <div className="c-item">
                  <span className="c-icon">🌐</span>
                  <div>
                    <span className="c-label">Real Estate Site</span>
                    <div className="c-val"><a href="/realtor">joefsanches.com/realtor</a></div>
                  </div>
                </div>
                <div className="c-item">
                  <span className="c-icon">📍</span>
                  <div>
                    <span className="c-label">Address</span>
                    <div className="c-val">809 Heartleaf Dr, Leander, TX 78641</div>
                    <span className="c-sub">Williamson County · Central Texas</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="inq-cards">
              <div className="inq gold">
                <h4>Government &amp; Municipal Inquiry</h4>
                <p>Solicitations, capability statements, teaming, HUB subcontracting plans, or spot purchase quotes. B2G VID: 21829543.</p>
                <a href="mailto:hello@joefsanches.com?subject=Government%20Contracting%20Inquiry%20%E2%80%94%20Sanches%20Group&body=Agency%2FOrganization%3A%0AContract%20type%3A%0ANAICS%2FNIGP%20Code(s)%3A%0AScope%3A%0A" className="inq-btn">Send Inquiry →</a>
              </div>
              <div className="inq">
                <h4>Multi-Family &amp; Commercial</h4>
                <p>Maintenance contracts, unit turns, capital improvements, or vendor partnerships for property managers and commercial owners.</p>
                <a href="mailto:hello@joefsanches.com?subject=Maintenance%20Partnership%20%E2%80%94%20Sanches%20Group&body=Property%20type%3A%0AUnit%20count%20or%20scope%3A%0ANeeds%3A%0A" className="inq-btn">Discuss a Contract →</a>
              </div>
              <div className="inq">
                <h4>Residential &amp; Home Buyers</h4>
                <p>Renovation, remodeling, unit turns, or buying and selling a home in Austin.</p>
                <a href="tel:5126638867" className="inq-ghost">Call 512-663-8867 →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE DISCLOSURES */}
      <div className="compliance">
        <div className="compliance-inner">
          <span className="compliance-eyebrow">Disclosures &amp; Compliance</span>
          <div className="compliance-grid">
            <div className="compliance-block">
              <span className="compliance-block-label">Scope Limitation Notice</span>
              <p>Sanches Group does not currently advertise or perform licensed plumbing, electrical, or HVAC services directly. Work requiring licensed trade qualifiers is referred to or subcontracted through licensed professionals. Texas does not require a statewide general contractor license — general construction and remodeling services are provided directly.</p>
            </div>
            <div className="compliance-block">
              <span className="compliance-block-label">Spot Purchase Availability</span>
              <p>Immediately available for state and municipal spot purchases under $25,000 — janitorial (NIGP 910-39), pressure washing (NIGP 968-94), painting (NIGP 910-54), flooring (NIGP 910-25), window washing (NIGP 910-81), and grounds maintenance (NIGP 98852). No formal solicitation required. Direct award eligible. B2G VID: 21829543.</p>
            </div>
            <div className="compliance-block">
              <span className="compliance-block-label">Property Management Non-Solicitation</span>
              <p>Sanches Group&apos;s real estate division handles individual buyer/seller transactions only. We maintain a strict vendor-only policy with property management clients and will never solicit their portfolio owners, pursue management contracts, or compete with their business in any form.</p>
            </div>
            <div className="compliance-block">
              <span className="compliance-block-label">Entity Information</span>
              <p>Joe Sanches LLC · DBA Sanches Group · 809 Heartleaf Dr, Leander, TX 78641 · EIN: 39-4911899 · B2G VID: 21829543 · Formed October 13, 2025 · State of Texas. 100% service-disabled veteran-owned (service-connected disability rating 20%+).</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <img src="/logo.png" alt="Sanches Group" />
        <p>© {new Date().getFullYear()} Joe Sanches LLC · Sanches Group · 809 Heartleaf Dr, Leander, TX 78641</p>
        <p>512-663-8867 · <a href="mailto:hello@joefsanches.com">hello@joefsanches.com</a> · EIN: 39-4911899</p>
        <p style={{ marginTop:'6px' }}>Service-Disabled Veteran-Owned · Texas HUB Certified (VetHUB) · SDVOSB · SAM.gov Active · Licensed &amp; Insured</p>
        <img
          src="https://comptroller.texas.gov/purchasing/images/vethub-certified-logo-2025.svg"
          alt="Texas Veteran-Owned Business Certified"
          className="hub-logo-footer"
        />
        <p className="disc">Real estate services by Joe Sanches, Licensed Realtor (TREC). Real estate activity is individual buyer/seller representation only — structurally separate from Sanches Group maintenance and contracting operations. Sanches Group does not solicit property management clients&apos; portfolio owners or compete for property management contracts.</p>
      </footer>
    </>
  );
}
