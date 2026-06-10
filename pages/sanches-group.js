import Head from 'next/head';

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:       #0b1730;
    --navy-mid:   #13223f;
    --navy-card:  #192b50;
    --gold:       #c8a84b;
    --gold-light: #e4c76b;
    --gold-pale:  rgba(200,168,75,0.1);
    --gold-border:rgba(200,168,75,0.28);
    --white:      #ffffff;
    --text:       #cdd5e8;
    --muted:      #7e8fad;
    --divider:    rgba(255,255,255,0.07);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
    background: var(--navy);
    color: var(--text);
    line-height: 1.65;
  }

  a { color: var(--gold); text-decoration: none; }
  a:hover { color: var(--gold-light); }

  .wrap { max-width: 1140px; margin: 0 auto; padding: 0 40px; }

  /* NAV */
  .sg-nav {
    position: sticky; top: 0; z-index: 200;
    background: rgba(11,23,48,0.96);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--gold-border);
  }
  .sg-nav-inner {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 40px; max-width: 1140px; margin: 0 auto;
  }
  .sg-nav-logo img { height: 36px; display: block; }
  .sg-nav-links { display: flex; gap: 24px; list-style: none; align-items: center; }
  .sg-nav-links a { font-size: 13px; font-weight: 500; color: var(--text); letter-spacing: 0.2px; }
  .sg-nav-links a:hover { color: var(--gold); }
  .sg-nav-phone {
    background: var(--gold); color: var(--navy) !important;
    padding: 8px 18px; border-radius: 6px;
    font-weight: 800; font-size: 13px; letter-spacing: 0.3px;
  }
  .sg-nav-phone:hover { background: var(--gold-light) !important; color: var(--navy) !important; }

  /* HERO */
  .sg-hero {
    background: linear-gradient(135deg, #06101f 0%, #0b1730 60%, #0f1e40 100%);
    border-bottom: 1px solid var(--gold-border);
    position: relative; overflow: hidden;
  }
  .sg-hero::after {
    content: '';
    position: absolute; top: 0; right: 0;
    width: 50%; height: 100%;
    background: radial-gradient(ellipse at 80% 40%, rgba(200,168,75,0.07) 0%, transparent 65%);
    pointer-events: none;
  }
  .sg-hero-inner {
    display: grid; grid-template-columns: 1fr 300px;
    gap: 64px; align-items: center;
    padding: 88px 40px 80px; max-width: 1140px; margin: 0 auto;
    position: relative; z-index: 1;
  }
  .sg-hero-kicker {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
    color: var(--gold); border: 1px solid var(--gold-border);
    background: var(--gold-pale); padding: 5px 14px; border-radius: 3px;
    margin-bottom: 22px;
  }
  .sg-hero h1 {
    font-size: 52px; font-weight: 900; color: var(--white);
    line-height: 1.08; letter-spacing: -1.5px; margin-bottom: 22px;
  }
  .sg-hero h1 .accent { color: var(--gold); }
  .sg-hero-desc {
    font-size: 18px; color: var(--muted); line-height: 1.75;
    max-width: 560px; margin-bottom: 36px;
  }
  .sg-hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 52px; }
  .sg-hero-photo img {
    width: 100%; border-radius: 12px; object-fit: cover;
    aspect-ratio: 4/5; border: 2px solid var(--gold-border);
    box-shadow: 0 24px 64px rgba(0,0,0,0.6);
  }
  .sg-hero-creds {
    display: flex; gap: 0; flex-wrap: wrap;
    border: 1px solid var(--gold-border); border-radius: 8px;
    overflow: hidden; max-width: 560px;
  }
  .sg-cred-item {
    flex: 1; min-width: 120px;
    padding: 14px 18px;
    border-right: 1px solid var(--gold-border);
  }
  .sg-cred-item:last-child { border-right: none; }
  .sg-cred-val { font-size: 16px; font-weight: 800; color: var(--gold); display: block; line-height: 1; }
  .sg-cred-label { font-size: 11px; color: var(--muted); margin-top: 4px; display: block; font-weight: 500; }

  /* BTN */
  .btn-gold {
    background: var(--gold); color: var(--navy);
    padding: 14px 28px; border-radius: 6px;
    font-weight: 800; font-size: 15px; display: inline-block; letter-spacing: 0.2px;
  }
  .btn-gold:hover { background: var(--gold-light); color: var(--navy); }
  .btn-ghost {
    border: 1px solid rgba(200,168,75,0.4); color: var(--gold);
    padding: 14px 28px; border-radius: 6px;
    font-weight: 600; font-size: 15px; display: inline-block;
  }
  .btn-ghost:hover { background: var(--gold-pale); color: var(--gold-light); }

  /* SECTION */
  .sg-section { padding: 84px 0; border-bottom: 1px solid var(--divider); }
  .sg-section.dark { background: #080f1e; }
  .sg-kicker {
    font-size: 11px; font-weight: 800; letter-spacing: 2.5px;
    text-transform: uppercase; color: var(--gold); margin-bottom: 10px;
  }
  .sg-title {
    font-size: 34px; font-weight: 800; color: var(--white);
    letter-spacing: -0.5px; margin-bottom: 14px;
  }
  .sg-lead {
    font-size: 17px; color: var(--muted); max-width: 660px;
    line-height: 1.75; margin-bottom: 52px;
  }

  /* SERVICE LANES */
  .sg-lanes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .sg-lane {
    background: var(--navy-card); border: 1px solid var(--divider);
    border-radius: 12px; padding: 30px 26px; transition: border-color 0.2s;
  }
  .sg-lane:hover { border-color: var(--gold-border); }
  .sg-lane-icon { font-size: 30px; margin-bottom: 16px; display: block; }
  .sg-lane h3 { font-size: 18px; font-weight: 700; color: var(--white); margin-bottom: 10px; }
  .sg-lane p { font-size: 14px; color: var(--muted); line-height: 1.65; margin-bottom: 14px; }
  .sg-tag {
    display: inline-block; font-size: 11px; font-weight: 700;
    letter-spacing: 1px; text-transform: uppercase;
    color: var(--gold); border: 1px solid var(--gold-border);
    padding: 3px 10px; border-radius: 3px;
  }

  /* GOV */
  .sg-gov-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-bottom: 28px; }
  .sg-gov-box {
    background: var(--navy-card); border: 1px solid var(--gold-border);
    border-radius: 12px; padding: 30px 28px;
  }
  .sg-gov-box h4 {
    font-size: 13px; font-weight: 800; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--gold); margin-bottom: 18px;
  }
  .sg-cert-row {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 12px 0; border-bottom: 1px solid var(--divider);
  }
  .sg-cert-row:last-child { border-bottom: none; padding-bottom: 0; }
  .sg-cert-ico { font-size: 22px; flex-shrink: 0; margin-top: 1px; }
  .sg-cert-name { font-size: 14px; font-weight: 700; color: var(--white); }
  .sg-cert-sub { font-size: 12px; color: var(--muted); margin-top: 3px; line-height: 1.5; }
  .sg-naics-row {
    padding: 10px 0; border-bottom: 1px solid var(--divider);
    display: flex; gap: 12px; align-items: flex-start;
  }
  .sg-naics-row:last-child { border-bottom: none; padding-bottom: 0; }
  .sg-naics-code { color: var(--gold); font-weight: 700; font-size: 12px; flex-shrink: 0; padding-top: 2px; }
  .sg-naics-name { font-size: 13px; color: var(--text); line-height: 1.4; }
  .sg-cap-bar {
    background: var(--gold-pale); border: 1px solid var(--gold-border);
    border-radius: 10px; padding: 22px 28px;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 14px;
  }
  .sg-cap-bar p { font-size: 15px; color: var(--text); max-width: 680px; line-height: 1.6; }

  /* MULTI-FAMILY */
  .sg-mf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
  .sg-mf-box {
    background: var(--navy-card); border: 1px solid var(--divider);
    border-radius: 12px; padding: 30px 28px;
  }
  .sg-mf-box h3 { font-size: 18px; font-weight: 700; color: var(--white); margin-bottom: 10px; }
  .sg-mf-box p { font-size: 14px; color: var(--muted); line-height: 1.65; margin-bottom: 16px; }
  .sg-check { list-style: none; display: flex; flex-direction: column; gap: 9px; }
  .sg-check li {
    font-size: 14px; color: var(--text);
    display: flex; align-items: flex-start; gap: 10px; line-height: 1.5;
  }
  .sg-check li::before { content: '✓'; color: var(--gold); font-weight: 800; flex-shrink: 0; }
  .sg-promise {
    background: var(--navy-mid); border: 1px solid var(--gold-border);
    border-radius: 12px; padding: 28px; margin-top: 20px; grid-column: 1 / -1;
  }
  .sg-promise h3 { font-size: 16px; font-weight: 700; color: var(--gold); margin-bottom: 10px; }
  .sg-promise p { font-size: 14px; color: var(--muted); line-height: 1.7; }

  /* RE DIVISION */
  .sg-re-box {
    background: var(--navy-card); border: 1px solid var(--divider);
    border-radius: 14px; padding: 40px 44px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 44px; align-items: start;
  }
  .sg-re-box h3 { font-size: 22px; font-weight: 800; color: var(--white); margin-bottom: 10px; }
  .sg-re-box p { font-size: 15px; color: var(--muted); line-height: 1.75; margin-bottom: 16px; }
  .sg-re-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
  .sg-re-tag {
    background: var(--gold-pale); border: 1px solid var(--gold-border);
    color: var(--gold); font-size: 12px; font-weight: 600;
    padding: 5px 13px; border-radius: 20px;
  }
  .sg-re-note {
    background: rgba(200,168,75,0.06); border-left: 3px solid var(--gold);
    padding: 14px 18px; border-radius: 0 8px 8px 0;
    font-size: 13px; color: var(--muted); line-height: 1.65;
  }

  /* ABOUT */
  .sg-about-grid { display: grid; grid-template-columns: 320px 1fr; gap: 60px; align-items: start; }
  .sg-about-grid img { width: 100%; border-radius: 12px; border: 2px solid var(--gold-border); box-shadow: 0 10px 40px rgba(0,0,0,0.4); }
  .sg-about h2 { font-size: 28px; font-weight: 800; color: var(--white); margin-bottom: 6px; }
  .sg-about-role { font-size: 13px; color: var(--gold); font-weight: 600; letter-spacing: 0.5px; margin-bottom: 18px; }
  .sg-about-bio { font-size: 16px; color: var(--muted); line-height: 1.8; margin-bottom: 14px; }
  .sg-chips { display: flex; flex-wrap: wrap; gap: 10px; margin: 20px 0 28px; }
  .sg-chip {
    background: var(--navy-card); border: 1px solid var(--gold-border);
    color: var(--text); font-size: 12px; font-weight: 600;
    padding: 6px 14px; border-radius: 4px;
    display: flex; align-items: center; gap: 6px;
  }
  .sg-chip::before { content: '✦'; color: var(--gold); font-size: 9px; }

  /* AREAS */
  .sg-areas { display: flex; flex-wrap: wrap; gap: 10px; }
  .sg-area {
    background: var(--navy-card); border: 1px solid var(--divider);
    color: var(--text); font-size: 14px; font-weight: 600;
    padding: 10px 20px; border-radius: 6px;
  }

  /* CONTACT */
  .sg-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
  .sg-contact-main h3 { font-size: 22px; font-weight: 800; color: var(--white); margin-bottom: 8px; }
  .sg-contact-main p { font-size: 15px; color: var(--muted); line-height: 1.7; margin-bottom: 28px; }
  .sg-c-items { display: flex; flex-direction: column; gap: 16px; }
  .sg-c-item { display: flex; align-items: flex-start; gap: 14px; }
  .sg-c-icon {
    width: 42px; height: 42px; flex-shrink: 0;
    background: var(--gold-pale); border: 1px solid var(--gold-border);
    border-radius: 8px; display: flex; align-items: center;
    justify-content: center; font-size: 18px;
  }
  .sg-c-label { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); margin-bottom: 3px; }
  .sg-c-val { font-size: 15px; color: var(--text); }
  .sg-c-val a { color: var(--white); font-weight: 600; }
  .sg-inq-cards { display: flex; flex-direction: column; gap: 14px; }
  .sg-inq {
    background: var(--navy-card); border: 1px solid var(--divider);
    border-radius: 10px; padding: 20px 22px;
  }
  .sg-inq:first-child { border-color: var(--gold-border); }
  .sg-inq h4 { font-size: 14px; font-weight: 700; color: var(--white); margin-bottom: 6px; }
  .sg-inq p { font-size: 13px; color: var(--muted); margin-bottom: 14px; line-height: 1.5; }
  .sg-inq-btn {
    display: inline-block; background: var(--gold); color: var(--navy);
    padding: 8px 18px; border-radius: 6px; font-size: 13px; font-weight: 800;
  }
  .sg-inq-btn:hover { background: var(--gold-light); }
  .sg-inq-outline {
    display: inline-block; border: 1px solid var(--gold-border); color: var(--gold);
    padding: 8px 18px; border-radius: 6px; font-size: 13px; font-weight: 600;
  }
  .sg-inq-outline:hover { background: var(--gold-pale); }

  /* FOOTER */
  .sg-footer {
    background: #04090f; border-top: 1px solid var(--gold-border);
    padding: 32px 40px; text-align: center;
  }
  .sg-footer img { height: 28px; margin-bottom: 12px; opacity: 0.6; display: block; margin-left: auto; margin-right: auto; }
  .sg-footer p { font-size: 13px; color: var(--muted); line-height: 1.7; }
  .sg-footer .disc { font-size: 11px; color: #3a4a68; margin-top: 10px; line-height: 1.6; }

  /* RESPONSIVE */
  @media (max-width: 920px) {
    .sg-nav-links { display: none; }
    .sg-hero-inner { grid-template-columns: 1fr; padding: 52px 20px 60px; gap: 48px; }
    .sg-hero h1 { font-size: 36px; }
    .sg-hero-photo { max-width: 240px; margin: 0 auto; order: -1; }
    .wrap { padding: 0 20px; }
    .sg-section { padding: 56px 0; }
    .sg-lanes { grid-template-columns: 1fr; }
    .sg-gov-grid { grid-template-columns: 1fr; }
    .sg-mf-grid { grid-template-columns: 1fr; }
    .sg-promise { grid-column: auto; }
    .sg-re-box { grid-template-columns: 1fr; padding: 28px 24px; }
    .sg-about-grid { grid-template-columns: 1fr; }
    .sg-about-grid img { max-width: 240px; }
    .sg-contact-grid { grid-template-columns: 1fr; }
    .sg-hero-creds { flex-direction: column; }
    .sg-cred-item { border-right: none; border-bottom: 1px solid var(--gold-border); }
    .sg-cred-item:last-child { border-bottom: none; }
    .sg-footer { padding: 24px 20px; }
  }
`;

export default function SanchesGroup() {
  const year = new Date().getFullYear();

  return (
    <>
      <Head>
        <title>Sanches Group | Licensed Maintenance, Construction &amp; Government Contracting | Austin, TX</title>
        <meta name="description" content="Sanches Group is a veteran-owned, licensed maintenance and government contracting company serving federal agencies, multi-family property owners, and residential clients across Central Texas." />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </Head>

      {/* NAV */}
      <nav className="sg-nav">
        <div className="sg-nav-inner">
          <a className="sg-nav-logo" href="#top"><img src="/logo.png" alt="Sanches Group" /></a>
          <ul className="sg-nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#government">Government</a></li>
            <li><a href="#multifamily">Multi-Family</a></li>
            <li><a href="#real-estate">Real Estate</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="tel:5126638867" className="sg-nav-phone">512-663-8867</a></li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section className="sg-hero" id="top">
        <div className="sg-hero-inner">
          <div>
            <div className="sg-hero-kicker">Veteran-Owned · Licensed · SAM.gov Registered</div>
            <h1>Licensed.<br />Veteran-Owned.<br /><span className="accent">Built to Deliver.</span></h1>
            <p className="sg-hero-desc">Sanches Group is a full-service maintenance, construction, and government contracting company based in Leander, Texas — serving federal agencies, multi-family property owners, and residential clients across Central Texas.</p>
            <div className="sg-hero-ctas">
              <a href="#government" className="btn-gold">Government Contracting</a>
              <a href="#contact" className="btn-ghost">Request a Quote</a>
            </div>
            <div className="sg-hero-creds">
              <div className="sg-cred-item">
                <span className="sg-cred-val">VOSB</span>
                <span className="sg-cred-label">Veteran-Owned SB</span>
              </div>
              <div className="sg-cred-item">
                <span className="sg-cred-val">SAM.gov</span>
                <span className="sg-cred-label">Active Registration</span>
              </div>
              <div className="sg-cred-item">
                <span className="sg-cred-val">Licensed</span>
                <span className="sg-cred-label">Plumbing · Electrical · GC</span>
              </div>
              <div className="sg-cred-item">
                <span className="sg-cred-val">Insured</span>
                <span className="sg-cred-label">Full Commercial Coverage</span>
              </div>
            </div>
          </div>
          <div className="sg-hero-photo">
            <img src="/joe.png" alt="Joe Sanches — Founder, Sanches Group" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="sg-section" id="services">
        <div className="wrap">
          <p className="sg-kicker">What We Do</p>
          <h2 className="sg-title">Every service. One company.</h2>
          <p className="sg-lead">From emergency plumbing at 6am to a federal facilities contract — Sanches Group has the licenses, the team, and the track record to handle it. We don&apos;t subcontract accountability.</p>
          <div className="sg-lanes">
            <div className="sg-lane">
              <span className="sg-lane-icon">🔧</span>
              <h3>Plumbing</h3>
              <p>Licensed plumbing for residential, commercial, and government properties — repairs, installations, water heaters, re-pipes, and unit-turn work. Emergency response available.</p>
              <span className="sg-tag">Licensed · TX</span>
            </div>
            <div className="sg-lane">
              <span className="sg-lane-icon">⚡</span>
              <h3>Electrical</h3>
              <p>Code-compliant electrical work — panel upgrades, rewiring, outlet and fixture installation, EV charger prep, and commercial service for multi-family and government facilities.</p>
              <span className="sg-tag">Licensed · TX</span>
            </div>
            <div className="sg-lane">
              <span className="sg-lane-icon">🏗️</span>
              <h3>Construction &amp; Renovation</h3>
              <p>General contracting for residential remodels, commercial build-outs, unit turns, and new construction coordination. We manage the schedule, the subs, and the quality.</p>
              <span className="sg-tag">General Contractor</span>
            </div>
            <div className="sg-lane">
              <span className="sg-lane-icon">🏛️</span>
              <h3>Government Contracting</h3>
              <p>Federal, state, and municipal maintenance and construction contracts. SAM.gov registered, VOSB-certified, with active NAICS codes across trades and construction.</p>
              <span className="sg-tag">SAM.gov · VOSB</span>
            </div>
            <div className="sg-lane">
              <span className="sg-lane-icon">🏢</span>
              <h3>Multi-Family Maintenance</h3>
              <p>Ongoing maintenance contracts, unit turns, and capital improvement projects for apartment complexes, HOAs, and commercial property owners across the Austin metro.</p>
              <span className="sg-tag">Commercial</span>
            </div>
            <div className="sg-lane">
              <span className="sg-lane-icon">🏠</span>
              <h3>Real Estate — Buy &amp; Sell</h3>
              <p>Licensed Realtor division for individual buyers and sellers in Leander, Cedar Park, and greater Austin. Fully separate from our maintenance and contracting operations.</p>
              <span className="sg-tag">TREC Licensed</span>
            </div>
          </div>
        </div>
      </section>

      {/* GOVERNMENT */}
      <section className="sg-section dark" id="government">
        <div className="wrap">
          <p className="sg-kicker">Government Contracting</p>
          <h2 className="sg-title">Ready to bid. Ready to perform.</h2>
          <p className="sg-lead">Sanches Group is an active government contractor with verified veteran-owned status and full SAM.gov registration. We pursue federal, state, and municipal contracts for facilities maintenance, construction, and trades work across Central Texas.</p>
          <div className="sg-gov-grid">
            <div className="sg-gov-box">
              <h4>Certifications &amp; Registrations</h4>
              <div className="sg-cert-row">
                <span className="sg-cert-ico">🎖️</span>
                <div>
                  <div className="sg-cert-name">VOSB — Veteran-Owned Small Business</div>
                  <div className="sg-cert-sub">Verified through the U.S. Department of Veterans Affairs. Eligible for set-aside contracts reserved for veteran-owned businesses.</div>
                </div>
              </div>
              <div className="sg-cert-row">
                <span className="sg-cert-ico">🏛️</span>
                <div>
                  <div className="sg-cert-name">SAM.gov — Active Registration</div>
                  <div className="sg-cert-sub">System for Award Management active registration. Eligible to receive federal contract awards and grants.</div>
                </div>
              </div>
              <div className="sg-cert-row">
                <span className="sg-cert-ico">🪪</span>
                <div>
                  <div className="sg-cert-name">Texas-Licensed Trades &amp; GC</div>
                  <div className="sg-cert-sub">Licensed plumbing, electrical, and general contracting in Texas. Full commercial general liability and workers&apos; compensation insurance.</div>
                </div>
              </div>
              <div className="sg-cert-row">
                <span className="sg-cert-ico">🇺🇸</span>
                <div>
                  <div className="sg-cert-name">Veteran Founder</div>
                  <div className="sg-cert-sub">Joe Sanches is a U.S. military veteran. The company is 100% veteran-owned and operated.</div>
                </div>
              </div>
            </div>
            <div className="sg-gov-box">
              <h4>Primary NAICS Codes</h4>
              <div className="sg-naics-row"><span className="sg-naics-code">238110</span><span className="sg-naics-name">Plumbing, Heating &amp; Air-Conditioning Contractors</span></div>
              <div className="sg-naics-row"><span className="sg-naics-code">238210</span><span className="sg-naics-name">Electrical Contractors &amp; Other Wiring Installation</span></div>
              <div className="sg-naics-row"><span className="sg-naics-code">236220</span><span className="sg-naics-name">Commercial &amp; Institutional Building Construction</span></div>
              <div className="sg-naics-row"><span className="sg-naics-code">236118</span><span className="sg-naics-name">Residential Remodelers</span></div>
              <div className="sg-naics-row"><span className="sg-naics-code">561720</span><span className="sg-naics-name">Janitorial Services &amp; Facilities Maintenance</span></div>
              <div className="sg-naics-row"><span className="sg-naics-code">238990</span><span className="sg-naics-name">All Other Specialty Trade Contractors</span></div>
            </div>
          </div>
          <div className="sg-cap-bar">
            <p><strong style={{ color: 'var(--white)' }}>Contracting Officers &amp; Procurement Teams:</strong> Request a capability statement, past performance summary, or teaming discussion directly from Joe Sanches.</p>
            <a href="mailto:hello@joefsanches.com?subject=Capability%20Statement%20Request%20%E2%80%94%20Sanches%20Group&body=Hi%20Joe%2C%0A%0AAgency%2FOrganization%3A%0ANAICS%20Code(s)%20of%20interest%3A%0ASolicitation%20%2F%20Contract%20type%3A%0A" className="btn-gold">Request Capability Statement</a>
          </div>
        </div>
      </section>

      {/* MULTI-FAMILY */}
      <section className="sg-section" id="multifamily">
        <div className="wrap">
          <p className="sg-kicker">Multi-Family &amp; Commercial Properties</p>
          <h2 className="sg-title">Your maintenance partner. Not your competition.</h2>
          <p className="sg-lead">Sanches Group works as an outside vendor for property management companies, apartment complexes, and commercial property owners. We handle the work. You keep the client relationship.</p>
          <div className="sg-mf-grid">
            <div className="sg-mf-box">
              <h3>For Property Managers</h3>
              <p>One vendor for all your trades needs. We handle work orders fast, invoice clearly, and never talk to your owners about anything outside the scope of work.</p>
              <ul className="sg-check">
                <li>Licensed plumbing, electrical, and general contracting</li>
                <li>Fast unit-turn and vacancy prep between tenants</li>
                <li>Scheduled preventive maintenance programs</li>
                <li>Emergency response — nights and weekends</li>
                <li>Clear itemized invoicing, no surprises</li>
                <li>Fully insured — we carry the liability</li>
              </ul>
            </div>
            <div className="sg-mf-box">
              <h3>For Property Owners</h3>
              <p>Own a portfolio and need a reliable maintenance contractor? We offer ongoing maintenance contracts for 5-unit to 100+ unit properties.</p>
              <ul className="sg-check">
                <li>Capital improvement and renovation projects</li>
                <li>Common area maintenance and repairs</li>
                <li>Roof, HVAC, plumbing, and electrical coordination</li>
                <li>Single point of contact for all trades</li>
                <li>Detailed scope-of-work and project documentation</li>
                <li>Competitive pricing for contract clients</li>
              </ul>
            </div>
            <div className="sg-promise">
              <h3>Our commitment to property managers</h3>
              <p>Sanches Group has a real estate division — but it handles individual buyer and seller transactions only. We do not solicit your property owners, pursue portfolio management contracts, or operate in any way that competes with your business. You bring us in to do the work. That&apos;s the whole relationship.</p>
            </div>
          </div>
        </div>
      </section>

      {/* REAL ESTATE */}
      <section className="sg-section dark" id="real-estate">
        <div className="wrap">
          <p className="sg-kicker">Real Estate Division</p>
          <h2 className="sg-title">Buying or selling in Austin? That&apos;s a separate call.</h2>
          <p className="sg-lead">Sanches Group&apos;s real estate division represents individual buyers and sellers in Leander, Cedar Park, and the greater Austin area — completely separate from our maintenance and contracting operations.</p>
          <div className="sg-re-box">
            <div>
              <h3>Buyer &amp; Seller Representation</h3>
              <p>Joe Sanches is a licensed Realtor (TREC) with deep knowledge of the Leander and Cedar Park market — every neighborhood, every builder, every school zone. If you&apos;re buying or selling, this is the person to call.</p>
              <p>Military veteran representing military buyers: VA loan expertise, new construction navigation, and negotiation backed by the same discipline that comes from service.</p>
              <div className="sg-re-tags">
                <span className="sg-re-tag">First-Time Buyers</span>
                <span className="sg-re-tag">VA Loans</span>
                <span className="sg-re-tag">New Construction</span>
                <span className="sg-re-tag">Resale</span>
                <span className="sg-re-tag">Seller Representation</span>
                <span className="sg-re-tag">Military Relocation</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="https://joefsanches.com" className="btn-gold" target="_blank" rel="noopener noreferrer">Visit Realtor Site →</a>
                <a href="https://a.nhb.app/u/joe" className="btn-ghost" target="_blank" rel="noopener noreferrer">Browse New Construction</a>
              </div>
            </div>
            <div>
              <div className="sg-re-note">
                <strong style={{ color: 'var(--white)', display: 'block', marginBottom: '6px' }}>Note for property managers and contractors:</strong>
                The real estate division represents individuals buying or selling their own homes. It does not engage with rental portfolios, property management operations, or commercial investment acquisitions. These operations are structurally separated within Sanches Group.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="sg-section" id="about">
        <div className="wrap">
          <div className="sg-about-grid">
            <div>
              <img src="/joe.png" alt="Joe Sanches — Founder, Sanches Group" />
            </div>
            <div className="sg-about">
              <p className="sg-kicker">Founder</p>
              <h2>Joe Sanches</h2>
              <p className="sg-about-role">Founder &amp; Principal — Sanches Group | Licensed Realtor (TREC) | U.S. Veteran</p>
              <p className="sg-about-bio">Joe Sanches is a U.S. military veteran who built Sanches Group on the same standards he carried in uniform: show up, do the work, stand behind it. Based in Leander, Texas, Joe has spent years assembling the licenses, the team, and the operational experience to handle maintenance, construction, and contracting work that other single-trade companies can&apos;t do under one roof.</p>
              <p className="sg-about-bio">He works every contract personally. When you deal with Sanches Group, you deal with Joe.</p>
              <div className="sg-chips">
                <span className="sg-chip">U.S. Military Veteran</span>
                <span className="sg-chip">VOSB Certified</span>
                <span className="sg-chip">SAM.gov Registered</span>
                <span className="sg-chip">TREC Licensed Realtor</span>
                <span className="sg-chip">Licensed Trades — TX</span>
                <span className="sg-chip">General Contractor</span>
                <span className="sg-chip">Fully Insured</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="tel:5126638867" className="btn-gold">Call 512-663-8867</a>
                <a href="mailto:hello@joefsanches.com" className="btn-ghost">hello@joefsanches.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="sg-section">
        <div className="wrap">
          <p className="sg-kicker">Service Area</p>
          <h2 className="sg-title">Central Texas &amp; Greater Austin</h2>
          <p className="sg-lead">Maintenance, construction, government contracting, and real estate services across the Austin metro — primary base in Leander and Williamson County.</p>
          <div className="sg-areas">
            {['Leander','Cedar Park','Austin','Round Rock','Georgetown','Pflugerville','Liberty Hill','Hutto','Kyle','Buda'].map(a => (
              <span key={a} className="sg-area">{a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="sg-section dark" id="contact">
        <div className="wrap">
          <p className="sg-kicker">Contact</p>
          <h2 className="sg-title">Let&apos;s talk about the work.</h2>
          <p className="sg-lead">Whether it&apos;s a government contract, a maintenance agreement, a construction project, or buying or selling a home — reach Joe directly. No answering service.</p>
          <div className="sg-contact-grid">
            <div className="sg-contact-main">
              <h3>Joe Sanches</h3>
              <p>Founder, Sanches Group — Leander, Texas</p>
              <div className="sg-c-items">
                <div className="sg-c-item">
                  <span className="sg-c-icon">📞</span>
                  <div>
                    <div className="sg-c-label">Phone / Text</div>
                    <div className="sg-c-val"><a href="tel:5126638867">512-663-8867</a></div>
                  </div>
                </div>
                <div className="sg-c-item">
                  <span className="sg-c-icon">✉️</span>
                  <div>
                    <div className="sg-c-label">Email</div>
                    <div className="sg-c-val"><a href="mailto:hello@joefsanches.com">hello@joefsanches.com</a></div>
                  </div>
                </div>
                <div className="sg-c-item">
                  <span className="sg-c-icon">📍</span>
                  <div>
                    <div className="sg-c-label">Based In</div>
                    <div className="sg-c-val">Leander, TX — serving Greater Austin</div>
                  </div>
                </div>
                <div className="sg-c-item">
                  <span className="sg-c-icon">🌐</span>
                  <div>
                    <div className="sg-c-label">Real Estate Site</div>
                    <div className="sg-c-val"><a href="https://joefsanches.com">joefsanches.com</a></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sg-inq-cards">
              <div className="sg-inq">
                <h4>Government &amp; Municipal Contracts</h4>
                <p>Solicitations, capability statement requests, teaming, or procurement inquiries.</p>
                <a href="mailto:hello@joefsanches.com?subject=Government%20Contracting%20Inquiry%20%E2%80%94%20Sanches%20Group&body=Hi%20Joe%2C%0A%0AAgency%2FOrganization%3A%0AContract%20type%3A%0ASolicitation%20or%20scope%3A%0A" className="sg-inq-btn">Send Contracting Inquiry →</a>
              </div>
              <div className="sg-inq">
                <h4>Multi-Family &amp; Property Maintenance</h4>
                <p>Maintenance contracts, unit turns, capital improvements, and vendor partnerships.</p>
                <a href="mailto:hello@joefsanches.com?subject=Maintenance%20%2F%20Property%20Management%20Inquiry&body=Hi%20Joe%2C%0A%0AProperty%20type%3A%0AUnit%20count%20(approx)%3A%0ANeeds%3A%0A" className="sg-inq-btn">Discuss a Contract →</a>
              </div>
              <div className="sg-inq">
                <h4>Residential Trades &amp; Real Estate</h4>
                <p>Plumbing, electrical, renovation work, or buying/selling a home in Austin.</p>
                <a href="tel:5126638867" className="sg-inq-outline">Call 512-663-8867 →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="sg-footer">
        <img src="/logo.png" alt="Sanches Group" />
        <p>© {year} Sanches Group · Leander, Texas · <a href="tel:5126638867">512-663-8867</a> · <a href="mailto:hello@joefsanches.com">hello@joefsanches.com</a></p>
        <p style={{ marginTop: '6px' }}>Veteran-Owned · Licensed &amp; Insured · SAM.gov Registered · VOSB Certified</p>
        <p className="disc">Real estate services provided by Joe Sanches, Licensed Realtor (TREC). Real estate activity is individual buyer/seller transaction representation only, structurally separate from Sanches Group&apos;s maintenance, construction, and property management support services.</p>
      </footer>
    </>
  );
}
