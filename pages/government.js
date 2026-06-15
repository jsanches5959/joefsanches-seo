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
  .w { max-width: 1100px; margin: 0 auto; padding: 0 40px; }

  /* NAV */
  .nav {
    position: sticky; top: 0; z-index: 200;
    background: rgba(8,8,8,0.97);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--gb);
  }
  .nav-inner {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 40px; max-width: 1100px; margin: 0 auto;
  }
  .nav-logo { display: flex; align-items: center; gap: 12px; }
  .nav-logo img { height: 36px; filter: drop-shadow(0 0 8px rgba(107,120,84,0.5)); }
  .nav-logo span { font-size: 13px; font-weight: 700; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; }
  .nav-links { display: flex; gap: 24px; list-style: none; align-items: center; }
  .nav-links a { font-size: 13px; font-weight: 500; color: var(--muted); letter-spacing: 0.3px; text-transform: uppercase; }
  .nav-links a:hover { color: var(--gold); }
  .nav-call {
    background: var(--gold); color: var(--black) !important;
    padding: 9px 20px; border-radius: 4px;
    font-weight: 900; font-size: 13px; letter-spacing: 0.5px; text-transform: uppercase;
  }

  /* HERO */
  .hero {
    background: var(--black);
    border-bottom: 2px solid var(--gb);
    padding: 80px 40px 72px;
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(700px 400px at 0% 50%, rgba(200,168,75,0.05), transparent 60%);
    pointer-events: none;
  }
  .hero-inner { position: relative; z-index: 1; max-width: 820px; }
  .hero-eyebrow {
    font-size: 10px; font-weight: 900; letter-spacing: 3px;
    text-transform: uppercase; color: var(--gold);
    margin-bottom: 20px; display: flex; align-items: center; gap: 12px;
  }
  .hero-eyebrow::after { content: ''; flex: 0 0 40px; height: 1px; background: var(--gold); opacity: 0.4; }
  .hero h1 {
    font-size: 56px; font-weight: 900; color: var(--white);
    letter-spacing: -2px; line-height: 1.05; margin-bottom: 24px;
    text-transform: uppercase;
  }
  .hero p { font-size: 17px; color: var(--muted); max-width: 620px; line-height: 1.75; margin-bottom: 40px; }
  .hero-badges {
    display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 40px;
  }
  .badge {
    border: 1px solid var(--gb); background: var(--gp);
    color: var(--gold); font-size: 11px; font-weight: 900;
    padding: 7px 16px; border-radius: 2px; letter-spacing: 1.5px; text-transform: uppercase;
  }
  .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }
  .btn-gold {
    background: var(--gold); color: var(--black);
    padding: 14px 28px; border-radius: 4px;
    font-weight: 900; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;
    display: inline-block;
  }
  .btn-gold:hover { background: var(--gold2); color: var(--black); }
  .btn-outline {
    border: 1px solid var(--gb); color: var(--gold);
    padding: 14px 28px; border-radius: 4px;
    font-weight: 700; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;
    display: inline-block;
  }
  .btn-outline:hover { background: var(--gp); }

  /* CERT STRIP */
  .cert-strip {
    background: #050504; border-bottom: 1px solid var(--gb);
    padding: 24px 40px;
    display: flex; align-items: center; gap: 0; flex-wrap: wrap;
    max-width: 100%;
  }
  .cert-strip-inner {
    max-width: 1100px; margin: 0 auto; width: 100%;
    display: flex; align-items: center; gap: 0; flex-wrap: wrap;
  }
  .cert-chip {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 24px; border-right: 1px solid var(--gb);
  }
  .cert-chip:last-child { border-right: none; }
  .cert-chip-label { font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); display: block; line-height: 1; }
  .cert-chip-sub { font-size: 11px; color: var(--muted); margin-top: 3px; display: block; }

  /* SECTION */
  .sec { padding: 80px 0; border-bottom: 1px solid var(--div); }
  .sec.dark { background: #050504; }
  .sec-label { font-size: 10px; font-weight: 900; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; display: block; }
  .sec-title { font-size: 38px; font-weight: 900; color: var(--white); letter-spacing: -1px; line-height: 1.1; margin-bottom: 14px; text-transform: uppercase; }
  .sec-lead { font-size: 16px; color: var(--muted); max-width: 640px; line-height: 1.75; margin-bottom: 48px; }

  /* CREDS GRID */
  .creds-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
  .cred-box {
    background: var(--card); border: 1px solid var(--gb);
    padding: 32px 28px;
  }
  .cred-box-label { font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; display: block; }
  .cred-item { display: flex; align-items: flex-start; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--div); }
  .cred-item:last-child { border-bottom: none; padding-bottom: 0; }
  .cred-ico { font-size: 18px; flex-shrink: 0; padding-top: 2px; }
  .cred-name { font-size: 14px; font-weight: 700; color: var(--white); margin-bottom: 3px; }
  .cred-detail { font-size: 12px; color: var(--muted); line-height: 1.5; }
  .cred-valid { font-size: 11px; color: var(--gold); font-weight: 700; margin-top: 4px; display: block; letter-spacing: 0.5px; }

  /* NAICS */
  .naics-table { width: 100%; border-collapse: collapse; }
  .naics-table tr { border-bottom: 1px solid var(--div); }
  .naics-table tr:last-child { border-bottom: none; }
  .naics-table td { padding: 14px 0; vertical-align: top; }
  .naics-code { color: var(--gold); font-weight: 900; font-size: 13px; padding-right: 24px; white-space: nowrap; width: 80px; }
  .naics-name { font-size: 14px; color: var(--text); }
  .naics-tag {
    display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; color: var(--olive2); border: 1px solid var(--ob);
    padding: 3px 8px; border-radius: 2px; margin-left: 10px; vertical-align: middle;
  }

  /* CAP STATEMENT */
  .cap-box {
    background: var(--gp); border: 1px solid var(--gb);
    padding: 40px 44px;
    display: grid; grid-template-columns: 1fr auto; gap: 40px; align-items: center;
  }
  .cap-box h3 { font-size: 20px; font-weight: 900; color: var(--white); text-transform: uppercase; letter-spacing: -0.5px; margin-bottom: 8px; }
  .cap-box p { font-size: 14px; color: var(--muted); line-height: 1.7; }

  /* SCOPE */
  .scope-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
  .scope-box {
    background: var(--card); border: 1px solid var(--div);
    padding: 28px 24px;
  }
  .scope-num { font-size: 10px; font-weight: 900; color: var(--gold); letter-spacing: 2px; text-transform: uppercase; display: block; margin-bottom: 12px; opacity: 0.7; }
  .scope-box h3 { font-size: 16px; font-weight: 800; color: var(--white); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
  .scope-box p { font-size: 13px; color: var(--muted); line-height: 1.65; }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
  .contact-box { background: var(--card); border: 1px solid var(--div); padding: 36px 32px; }
  .contact-box.highlight { border-color: var(--gb); }
  .contact-box h3 { font-size: 18px; font-weight: 900; color: var(--white); text-transform: uppercase; letter-spacing: -0.3px; margin-bottom: 8px; }
  .contact-box > p { font-size: 13px; color: var(--muted); margin-bottom: 24px; line-height: 1.6; }
  .c-row { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 16px; }
  .c-ico { width: 36px; height: 36px; flex-shrink: 0; border: 1px solid var(--gb); border-radius: 2px; display: flex; align-items: center; justify-content: center; font-size: 14px; background: var(--gp); }
  .c-lbl { font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); display: block; margin-bottom: 2px; }
  .c-val { font-size: 14px; color: var(--text); }
  .c-val a { color: var(--white); font-weight: 700; }
  .inq-btn {
    display: inline-block; background: var(--gold); color: var(--black);
    padding: 12px 24px; border-radius: 2px; font-size: 12px; font-weight: 900;
    letter-spacing: 1px; text-transform: uppercase; margin-top: 8px;
  }
  .inq-btn:hover { background: var(--gold2); }

  /* FOOTER */
  footer {
    background: #030303; border-top: 1px solid var(--gb);
    padding: 32px 40px; text-align: center;
  }
  footer img { height: 44px; margin: 0 auto 12px; display: block; filter: drop-shadow(0 0 10px rgba(107,120,84,0.4)); }
  footer p { font-size: 12px; color: var(--muted); line-height: 1.7; }
  .hub-logo-footer { height: 40px; width: auto; margin: 10px auto 0; display: block; opacity: 0.85; }

  /* RESPONSIVE */
  @media (max-width: 860px) {
    .nav-links { display: none; }
    .hero { padding: 52px 20px 48px; }
    .hero h1 { font-size: 38px; }
    .w { padding: 0 20px; }
    .sec { padding: 52px 0; }
    .creds-grid { grid-template-columns: 1fr; }
    .scope-grid { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; }
    .cap-box { grid-template-columns: 1fr; }
    .cert-chip { border-right: none; padding: 10px 16px; }
    footer { padding: 24px 20px; }
  }
`;

export default function Government() {
  return (
    <>
      <Head>
        <title>Government Contracting | Sanches Group | Texas HUB · VOSB · SAM.gov</title>
        <meta name="description" content="Sanches Group is a Texas HUB-certified (VetHUB), SDVOSB-verified, SAM.gov-registered service-disabled veteran-owned contractor. Licensed trades, janitorial, and facilities services for government and institutional clients in Central Texas." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://joefsanches.com/government" />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </Head>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <a className="nav-logo" href="/">
            <img src="/logo.png" alt="Sanches Group" />
            <span>Sanches Group</span>
          </a>
          <ul className="nav-links">
            <li><a href="/#services">Services</a></li>
            <li><a href="#certifications">Certifications</a></li>
            <li><a href="#naics">NAICS</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="tel:5126638867" className="nav-call">512-663-8867</a></li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <span className="hero-eyebrow">Government Contracting</span>
          <h1>Certified.<br/>Registered.<br/>Ready to Perform.</h1>
          <p>Sanches Group is a Texas HUB-certified, SDVOSB-verified, SAM.gov-registered contractor pursuing federal, state, and municipal contracts for maintenance, construction, licensed trades, and facilities services across Central Texas. Service-disabled veteran-owned and operated.</p>
          <div className="hero-badges">
            <span className="badge">Texas HUB · VetHUB Certified</span>
            <span className="badge">SDVOSB — Service-Disabled Veteran</span>
            <span className="badge">SAM.gov Active</span>
            <span className="badge">Licensed Plumbing · Electrical · GC</span>
            <span className="badge">Full Commercial Insurance</span>
            <span className="badge">Spot Purchases · Janitorial · Trades</span>
          </div>
          <div className="hero-ctas">
            <a href="mailto:hello@joefsanches.com?subject=Capability%20Statement%20Request%20%E2%80%94%20Sanches%20Group&body=Agency%2FOrganization%3A%0ANAICS%20Code(s)%3A%0AContract%20type%3A%0A" className="btn-gold">Request Capability Statement</a>
            <a href="#contact" className="btn-outline">Contact Contracting Officer Line</a>
          </div>
        </div>
      </section>

      {/* CERT STRIP */}
      <div className="cert-strip">
        <div className="cert-strip-inner">
          <div className="cert-chip">
            <div>
              <span className="cert-chip-label">Texas HUB</span>
              <span className="cert-chip-sub">Certified through 6/9/2030</span>
            </div>
          </div>
          <div className="cert-chip">
            <div>
              <span className="cert-chip-label">SDVOSB</span>
              <span className="cert-chip-sub">Service-Disabled Veteran-Owned</span>
            </div>
          </div>
          <div className="cert-chip">
            <div>
              <span className="cert-chip-label">SAM.gov</span>
              <span className="cert-chip-sub">Active Federal Registration</span>
            </div>
          </div>
          <div className="cert-chip">
            <div>
              <span className="cert-chip-label">B2G VID</span>
              <span className="cert-chip-sub">21829543</span>
            </div>
          </div>
          <div className="cert-chip">
            <div>
              <span className="cert-chip-label">Entity</span>
              <span className="cert-chip-sub">Joe Sanches LLC</span>
            </div>
          </div>
          <div className="cert-chip">
            <div>
              <span className="cert-chip-label">Federal EIN</span>
              <span className="cert-chip-sub">39-4911899</span>
            </div>
          </div>
        </div>
      </div>

      {/* CERTIFICATIONS */}
      <section className="sec" id="certifications">
        <div className="w">
          <span className="sec-label">Certifications &amp; Registrations</span>
          <h2 className="sec-title">Every box checked.</h2>
          <p className="sec-lead">All certifications are current, verified, and available for agency confirmation through their respective systems.</p>
          <div className="creds-grid">
            <div className="cred-box">
              <span className="cred-box-label">State Certifications</span>
              <div className="cred-item">
                <span className="cred-ico">⭐</span>
                <div>
                  <div className="cred-name">Texas HUB — Historically Underutilized Business</div>
                  <div className="cred-detail">Certified by the Texas Comptroller of Public Accounts. Eligible for HUB subcontracting plans and state set-aside opportunities.</div>
                  <span className="cred-valid">Effective: 6/9/2026 · Valid through: 6/9/2030 · B2G VID: 21829543</span>
                </div>
              </div>
              <div className="cred-item">
                <span className="cred-ico">🪪</span>
                <div>
                  <div className="cred-name">Texas-Licensed Trades</div>
                  <div className="cred-detail">Licensed plumbing, electrical, and general contracting in Texas. Full commercial general liability and workers' compensation coverage.</div>
                </div>
              </div>
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--div)' }}>
                <img
                  src="https://comptroller.texas.gov/purchasing/images/vethub-certified-logo-2025.svg"
                  alt="Texas Veteran HUB Certified"
                  style={{ height: '56px', width: 'auto' }}
                />
              </div>
            </div>
            <div className="cred-box">
              <span className="cred-box-label">Federal Certifications</span>
              <div className="cred-item">
                <span className="cred-ico">🎖️</span>
                <div>
                  <div className="cred-name">SDVOSB — Service-Disabled Veteran-Owned Small Business</div>
                  <div className="cred-detail">Verified through the U.S. Department of Veterans Affairs. Joe Sanches carries a service-connected disability rating of 20% or greater. Eligible for SDVOSB set-aside contracts under 38 U.S.C. § 8127 — the highest federal small business preference tier.</div>
                </div>
              </div>
              <div className="cred-item">
                <span className="cred-ico">🏛️</span>
                <div>
                  <div className="cred-name">SAM.gov — Active Registration</div>
                  <div className="cred-detail">System for Award Management — active federal contractor registration. Eligible to receive federal contract awards. Registration current and in good standing.</div>
                </div>
              </div>
              <div className="cred-item">
                <span className="cred-ico">🇺🇸</span>
                <div>
                  <div className="cred-name">Service-Disabled Veteran — Owned &amp; Operated</div>
                  <div className="cred-detail">Joe Sanches, founder and principal, is a U.S. service-disabled veteran with a service-connected disability rating of 20% or greater. 100% service-disabled veteran-owned and operated — unconditionally. Federal EIN: 39-4911899.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NAICS */}
      <section className="sec dark" id="naics">
        <div className="w">
          <span className="sec-label">NAICS Codes (Federal)</span>
          <h2 className="sec-title">Federal commodity codes.</h2>
          <p className="sec-lead">Sanches Group holds active federal registrations across six NAICS codes covering all major trades, construction, and facilities work.</p>
          <div style={{ background: 'var(--card)', border: '1px solid var(--div)', padding: '0 32px', marginBottom: '48px' }}>
            <table className="naics-table">
              <tbody>
                <tr>
                  <td className="naics-code">238110</td>
                  <td className="naics-name">Plumbing, Heating &amp; Air-Conditioning Contractors <span className="naics-tag">Primary</span></td>
                </tr>
                <tr>
                  <td className="naics-code">238210</td>
                  <td className="naics-name">Electrical Contractors &amp; Other Wiring Installation <span className="naics-tag">Primary</span></td>
                </tr>
                <tr>
                  <td className="naics-code">236220</td>
                  <td className="naics-name">Commercial &amp; Institutional Building Construction</td>
                </tr>
                <tr>
                  <td className="naics-code">236118</td>
                  <td className="naics-name">Residential Remodelers</td>
                </tr>
                <tr>
                  <td className="naics-code">561720</td>
                  <td className="naics-name">Janitorial Services &amp; Facilities Maintenance</td>
                </tr>
                <tr>
                  <td className="naics-code">238990</td>
                  <td className="naics-name">All Other Specialty Trade Contractors</td>
                </tr>
              </tbody>
            </table>
          </div>

          <span className="sec-label" style={{ marginTop: '0' }}>NIGP Codes (State of Texas / CMBL)</span>
          <h2 className="sec-title" style={{ marginBottom: '14px' }}>Texas state commodity codes.</h2>
          <p className="sec-lead">NIGP codes registered on the Texas Comptroller's CMBL (Centralized Master Bidders List) — the state procurement system used by all Texas agencies.</p>
          <div style={{ background: 'var(--card)', border: '1px solid var(--div)', padding: '0 32px' }}>
            <table className="naics-table">
              <tbody>
                <tr>
                  <td className="naics-code">91000</td>
                  <td className="naics-name">Building Maintenance, Installation and Repair Services <span className="naics-tag">Active</span></td>
                </tr>
                <tr>
                  <td className="naics-code">91082</td>
                  <td className="naics-name">Wiring and Other Electrical Maintenance and Repair <span className="naics-tag">Active</span></td>
                </tr>
                <tr>
                  <td className="naics-code">91141</td>
                  <td className="naics-name">C.I.P., Landscaping <span className="naics-tag">Active</span></td>
                </tr>
                <tr>
                  <td className="naics-code">91450</td>
                  <td className="naics-name">HVAC (Heating, Ventilating, and Air Conditioning) <span className="naics-tag">Active</span></td>
                </tr>
                <tr>
                  <td className="naics-code">98852</td>
                  <td className="naics-name">General Grounds Maintenance (Not Tree Trimming) <span className="naics-tag">Active</span></td>
                </tr>
                <tr>
                  <td className="naics-code">910-39</td>
                  <td className="naics-name">Janitorial / Custodial Services</td>
                </tr>
                <tr>
                  <td className="naics-code">968-94</td>
                  <td className="naics-name">Pressure Washing Services</td>
                </tr>
                <tr>
                  <td className="naics-code">910-54</td>
                  <td className="naics-name">Painting and Wall Covering</td>
                </tr>
                <tr>
                  <td className="naics-code">910-25</td>
                  <td className="naics-name">Flooring Maintenance and Repair</td>
                </tr>
                <tr>
                  <td className="naics-code">910-81</td>
                  <td className="naics-name">Window Washing Services</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SCOPE */}
      <section className="sec" id="scope">
        <div className="w">
          <span className="sec-label">Scope of Work</span>
          <h2 className="sec-title">What we deliver.</h2>
          <p className="sec-lead">Sanches Group handles both licensed trades and non-licensed facilities services for government and institutional clients — from emergency repairs and spot purchases under $25K to multi-site maintenance contracts.</p>
          <p style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px', opacity: '0.8' }}>Licensed Trade Services</p>
          <div className="scope-grid" style={{ marginBottom: '2px' }}>
            {[
              { n:'01', title:'Plumbing', body:'Licensed plumbing for government facilities, military housing, municipal buildings, and institutional properties. Repairs, installations, water heaters, re-pipes, and emergency response.' },
              { n:'02', title:'Electrical', body:'Code-compliant electrical work for government and commercial facilities — panel upgrades, rewiring, lighting, EV charger infrastructure, and commercial service installations.' },
              { n:'03', title:'HVAC', body:'HVAC replacement, repair, and preventive maintenance for government and institutional facilities. Unit replacements, system diagnostics, and emergency service calls.' },
              { n:'04', title:'General Construction', body:'General contracting for government build-outs, office remodels, institutional renovations, and new construction. Full project management, subcontractor coordination, and quality control.' },
              { n:'05', title:'Unit Turns & Rehab', body:'Fast, high-quality unit turn work for government housing, VA facilities, and multi-unit residential properties. Standardized scopes, fast scheduling, itemized documentation.' },
              { n:'06', title:'Capital Improvements', body:'Capital improvement planning and execution for institutional clients. Full scope management from assessment through completion, with documentation suitable for agency reporting.' },
            ].map(({ n, title, body }) => (
              <div key={n} className="scope-box">
                <span className="scope-num">{n}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', margin: '32px 0 12px', opacity: '0.8' }}>Non-Licensed Facilities Services — Available for Spot Purchases</p>
          <div className="scope-grid">
            {[
              { n:'07', title:'Janitorial & Custodial', body:'Janitorial and custodial services for government offices, facilities, and institutional properties. One-time deep cleans, recurring contracts, and post-construction clean-up. NIGP 910-39.' },
              { n:'08', title:'Pressure Washing', body:'Professional pressure washing for building exteriors, parking lots, walkways, and government facilities. Scheduled maintenance programs and single-event service. NIGP 968-94.' },
              { n:'09', title:'Painting & Wall Covering', body:'Interior and exterior painting for government and institutional facilities. Surface prep, color-matching, and finishes suitable for occupied commercial and institutional environments. NIGP 910-54.' },
              { n:'10', title:'Flooring', body:'Flooring maintenance, repair, and replacement for government facilities. Tile, LVP, carpet, and specialty flooring. Fast turnaround on spot repairs and unit rehabs. NIGP 910-25.' },
              { n:'11', title:'Window Washing', body:'Commercial window washing for government buildings, institutional facilities, and multi-story properties. Scheduled maintenance programs and on-demand service. NIGP 910-81.' },
              { n:'12', title:'Grounds Maintenance', body:'General grounds maintenance for government properties and facilities — mowing, edging, debris removal, and property upkeep. Available for recurring contracts and spot purchases. NIGP 98852.' },
            ].map(({ n, title, body }) => (
              <div key={n} className="scope-box">
                <span className="scope-num">{n}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAP STATEMENT */}
      <section className="sec dark">
        <div className="w">
          <div className="cap-box">
            <div>
              <h3>Capability Statement</h3>
              <p>Contracting officers and procurement teams: request a full capability statement including past performance, key personnel, certifications, bonding capacity, and references. Response within one business day.</p>
            </div>
            <div>
              <a href="mailto:hello@joefsanches.com?subject=Capability%20Statement%20Request%20%E2%80%94%20Sanches%20Group&body=Agency%2FOrganization%3A%0ANAICS%20Code(s)%20of%20interest%3A%0AContract%20type%20(federal%2Fstate%2Fmunicipal)%3A%0AEstimated%20scope%3A%0A" className="btn-gold">Request Capability Statement</a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="sec" id="contact">
        <div className="w">
          <span className="sec-label">Contact</span>
          <h2 className="sec-title">Talk to Joe directly.</h2>
          <p className="sec-lead">No receptionist, no bid coordinator, no runaround. Joe Sanches handles government contracting inquiries personally.</p>
          <div className="contact-grid">
            <div className="contact-box highlight">
              <h3>Joe Sanches</h3>
              <p>Founder &amp; Principal · Joe Sanches LLC / Sanches Group · Leander, Texas</p>
              <div className="c-row">
                <span className="c-ico">📞</span>
                <div>
                  <span className="c-lbl">Phone / Text</span>
                  <div className="c-val"><a href="tel:5126638867">512-663-8867</a></div>
                </div>
              </div>
              <div className="c-row">
                <span className="c-ico">✉️</span>
                <div>
                  <span className="c-lbl">Email</span>
                  <div className="c-val"><a href="mailto:hello@joefsanches.com">hello@joefsanches.com</a></div>
                </div>
              </div>
              <div className="c-row">
                <span className="c-ico">📍</span>
                <div>
                  <span className="c-lbl">Address</span>
                  <div className="c-val">809 Heartleaf Dr, Leander, TX 78641</div>
                  <div style={{ fontSize:'11px', color:'var(--muted)', marginTop:'2px' }}>Williamson County · Central Texas</div>
                </div>
              </div>
              <div className="c-row">
                <span className="c-ico">🆔</span>
                <div>
                  <span className="c-lbl">B2G Vendor ID (Texas HUB / CMBL)</span>
                  <div className="c-val">21829543</div>
                </div>
              </div>
              <div className="c-row">
                <span className="c-ico">📋</span>
                <div>
                  <span className="c-lbl">Federal EIN</span>
                  <div className="c-val">39-4911899</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div className="contact-box">
                <h3>Government &amp; Municipal Inquiry</h3>
                <p>Solicitations, teaming opportunities, capability statement requests, or procurement discussions.</p>
                <a href="mailto:hello@joefsanches.com?subject=Government%20Contract%20Inquiry%20%E2%80%94%20Sanches%20Group&body=Agency%2FOrganization%3A%0AContract%20type%3A%0ANAICS%20Code(s)%3A%0AEstimated%20scope%20and%20timeline%3A%0A" className="inq-btn">Send Inquiry →</a>
              </div>
              <div className="contact-box">
                <h3>HUB Subcontracting</h3>
                <p>Prime contractors seeking a certified HUB sub for state contracts — reach out directly with your subcontracting plan requirements.</p>
                <a href="mailto:hello@joefsanches.com?subject=HUB%20Subcontracting%20Opportunity%20%E2%80%94%20Sanches%20Group&body=Prime%20contractor%3A%0AProject%2FContract%3A%0ANAICS%20Code(s)%3A%0AEstimated%20sub%20scope%3A%0A" className="inq-btn">HUB Sub Inquiry →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE DISCLOSURES */}
      <div style={{ background: '#020202', borderTop: '1px solid rgba(255,255,255,0.04)', padding: '36px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontSize: '9px', fontWeight: '900', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#3a4030', marginBottom: '20px' }}>Texas Licensed Contractor Regulatory Disclosures</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
            <div>
              <p style={{ fontSize: '9px', fontWeight: '900', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#3a4030', marginBottom: '6px' }}>Plumbing — 22 Tex. Admin. Code § 367.10</p>
              <p style={{ fontSize: '12px', color: '#2e3428', lineHeight: '1.75' }}>Responsible Master Plumber (RMP): <strong style={{ color: '#3a4030' }}>[RMP FULL NAME]</strong>, License No. <strong style={{ color: '#3a4030' }}>[M-XXXXXX]</strong>. Regulated by the Texas State Board of Plumbing Examiners (TSBPE) · tsbpe.texas.gov · P.O. Box 4200, Austin, TX 78765 · 512-936-5200. All plumbing work performed under valid RMP oversight in compliance with the Texas Plumbing License Law.</p>
            </div>
            <div>
              <p style={{ fontSize: '9px', fontWeight: '900', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#3a4030', marginBottom: '6px' }}>HVAC / ACR — 16 Tex. Admin. Code § 75.71</p>
              <p style={{ fontSize: '12px', color: '#2e3428', lineHeight: '1.75' }}>HVAC and air conditioning/refrigeration services regulated by the Texas Department of Licensing and Regulation (TDLR) · www.tdlr.texas.gov · P.O. Box 12157, Austin, TX 78711. Complaints: 1-800-803-9202 or 512-463-6599. Class A/B ACR Contractor License: <strong style={{ color: '#3a4030' }}>[ACR LICENSE NO.]</strong>. Work performed in compliance with applicable TDLR requirements.</p>
            </div>
            <div>
              <p style={{ fontSize: '9px', fontWeight: '900', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#3a4030', marginBottom: '6px' }}>Vehicle Compliance</p>
              <p style={{ fontSize: '12px', color: '#2e3428', lineHeight: '1.75' }}>All Sanches Group service vehicles display the company name and applicable license numbers in 2-inch contrasting letters on both sides, in full compliance with Texas plumbing and HVAC contractor advertising requirements.</p>
            </div>
            <div>
              <p style={{ fontSize: '9px', fontWeight: '900', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#3a4030', marginBottom: '6px' }}>Property Management Non-Solicitation Policy</p>
              <p style={{ fontSize: '12px', color: '#2e3428', lineHeight: '1.75' }}>Sanches Group&apos;s real estate division handles individual buyer/seller transactions only. We maintain a strict vendor-only relationship with property management clients. We will never solicit your portfolio owners, pursue management contracts, or compete with your business in any form.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <img src="/logo.png" alt="Sanches Group" />
        <p>© {new Date().getFullYear()} Joe Sanches LLC · Sanches Group · 809 Heartleaf Dr, Leander, TX 78641</p>
        <p>512-663-8867 · hello@joefsanches.com · EIN: 39-4911899</p>
        <p style={{ marginTop: '6px' }}>Service-Disabled Veteran-Owned (20%+) · Texas HUB · VetHUB Certified · SDVOSB · SAM.gov · Licensed &amp; Insured</p>
        <img
          src="https://comptroller.texas.gov/purchasing/images/vethub-certified-logo-2025.svg"
          alt="Texas Veteran HUB Certified"
          className="hub-logo-footer"
        />
        <p style={{ marginTop: '10px', fontSize: '11px', color: '#2a3020' }}>
          Texas HUB Certification effective 6/9/2026 · Valid through 6/9/2030 · B2G VID: 21829543 · EIN: 39-4911899 · Issued by Texas Comptroller of Public Accounts
        </p>
      </footer>
    </>
  );
}
