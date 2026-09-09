import Head from 'next/head';
import Link from 'next/link';

const baseUrl = 'https://joefsanches.com';

const CREDENTIALS = [
  {
    id: 'hub',
    tag: 'Texas HUB · VetHUB',
    name: 'Texas HUB Certification (VetHUB)',
    issuer: 'Texas Comptroller of Public Accounts',
    status: 'Active · June 9, 2026 – June 9, 2030',
    what: 'HUB stands for Historically Underutilized Business. It is a Texas state certification for businesses that are at least 51% owned, operated, and controlled by an economically disadvantaged person who lives in Texas — a category that includes service-disabled veterans. VetHUB is the veteran track of that program.',
    process: [
      'Submit an application to the Texas Comptroller with proof of ownership — formation documents, ownership percentages, and the operating agreement.',
      'Prove residency in Texas and that the qualifying owner actually runs the business day to day, not just on paper.',
      'For the veteran track, provide VA documentation of service-connected disability status.',
      'The Comptroller reviews the filing and may request additional records before certifying.',
      'Certification runs four years, then has to be renewed with current documentation.',
    ],
    verify: 'Anyone can look up a HUB-certified business in the Texas Comptroller’s public HUB directory — the certification is a matter of public record, not a claim a contractor makes about themselves.',
    why: 'Texas state agencies and universities carry HUB spending goals, so certified vendors are actively sought for state work. For a private customer, the practical value is different: the state verified who owns and runs this company before certifying it.',
  },
  {
    id: 'sdvosb',
    tag: 'SDVOSB',
    name: 'Service-Disabled Veteran-Owned Small Business',
    issuer: 'U.S. Small Business Administration',
    status: 'Verified · 20%+ service-connected disability rating',
    what: 'A federal designation for a small business at least 51% owned and controlled by a veteran with a service-connected disability rated by the Department of Veterans Affairs.',
    process: [
      'The VA must first establish a service-connected disability rating for the owner.',
      'The business applies for federal verification, which reviews ownership percentages, control of daily operations, and governing documents.',
      'Reviewers confirm the veteran owner is the highest-paid officer and genuinely controls the company — this is where pass-through arrangements get rejected.',
      'Verified status is recorded federally and is subject to re-verification and audit.',
    ],
    verify: 'Verified status is federally recorded and searchable, and the underlying disability rating comes from the VA rather than from the business.',
    why: 'Federal agencies have set-aside authority for SDVOSB contractors under 38 U.S.C. § 8127. It is one of the harder small-business designations to obtain because the disability rating itself cannot be self-declared.',
  },
  {
    id: 'sam',
    tag: 'SAM.gov',
    name: 'Active Federal Registration',
    issuer: 'U.S. General Services Administration',
    status: 'Active registration',
    what: 'SAM.gov is the System for Award Management — the federal government’s official vendor registry. A business cannot be awarded a federal contract, or be paid by the federal government, without an active registration.',
    process: [
      'Register the legal entity with its EIN and banking details for federal payment.',
      'Obtain a Unique Entity ID (UEI), which replaced the old DUNS number.',
      'Complete federal representations and certifications — a long set of legal attestations about the business.',
      'Renew annually. A lapsed registration makes a vendor ineligible for award until it is corrected.',
    ],
    verify: 'SAM.gov registration is public. Any agency or prime contractor can look up an entity and see whether its registration is active or expired.',
    why: '"Active" is the operative word. Plenty of businesses register once and let it lapse. Active status means the registration is current and the business is eligible for federal award today.',
  },
  {
    id: 'vid',
    tag: 'B2G VID 21829543',
    name: 'Texas B2G Vendor ID',
    issuer: 'Texas SmartBuy / CMBL',
    status: 'VID 21829543',
    what: 'The Vendor Identification Number is how the State of Texas identifies a business in its purchasing systems. It is tied to the company’s federal EIN and is used on the Centralized Master Bidders List (CMBL) and in Texas SmartBuy.',
    process: [
      'Register the business with the state purchasing system under its legal name and EIN.',
      'Select the commodity codes (NIGP codes) matching the services the business actually performs.',
      'Appear on the CMBL, which is the list agencies use when they need to solicit bids.',
    ],
    verify: 'A state purchaser can enter the VID and pull up the registered entity, its commodity codes, and its certification status directly.',
    why: 'This is the number a state purchaser needs in order to issue a purchase order. Without it, an agency that wants to hire the business has no way to process the transaction.',
  },
  {
    id: 'insurance',
    tag: 'Insured',
    name: 'Commercial General Liability & Workers’ Compensation',
    issuer: 'Commercial carrier',
    status: 'Active — $1M+ per occurrence',
    what: 'General liability coverage protects the property owner if something is damaged during the work. Workers’ compensation covers injuries to workers on the job.',
    process: [
      'Carriers underwrite based on the trades performed, payroll, and claims history.',
      'Coverage is documented on a certificate of insurance (COI) issued by the carrier, not by the contractor.',
      'A property owner or manager can be named as certificate holder and receive the COI directly from the carrier.',
    ],
    verify: 'Ask for a certificate of insurance. A legitimate COI comes from the insurance agent or carrier — not as a file the contractor hands you.',
    why: 'This is the credential that matters most to a homeowner. If an uninsured contractor damages your house or a worker is hurt on your property, the exposure can land on your homeowner’s policy.',
  },
];

export default function Credentials() {
  const url = `${baseUrl}/credentials`;
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CREDENTIALS.map((c) => ({
      '@type': 'Question',
      name: `What is ${c.name}?`,
      acceptedAnswer: { '@type': 'Answer', text: `${c.what} ${c.why}` },
    })),
  };

  return (
    <>
      <Head>
        <title>Our Credentials Explained — Sanches Group | Leander, TX</title>
        <meta
          name="description"
          content="What Texas HUB (VetHUB), SDVOSB, SAM.gov registration, the Texas B2G Vendor ID, and commercial insurance actually mean — how each is verified and why it matters to you."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Our Credentials Explained — Sanches Group" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${baseUrl}/logo.png`} />
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <div className="cr">
        <nav className="cr-nav">
          <Link href="/" className="cr-brand">
            <img src="/logo.png" alt="Sanches Group" />
            <span>Sanches Group</span>
          </Link>
          <a href="tel:5126638867" className="cr-call">512-663-8867</a>
        </nav>

        <header className="cr-hero">
          <p className="cr-crumb"><Link href="/">Home</Link> <span>/</span> Credentials</p>
          <h1>What our credentials actually mean</h1>
          <p className="cr-intro">
            Contractors list a lot of acronyms. Most customers have no way to tell which ones
            were earned and which ones were typed onto a website. Here is what each of ours is,
            who issues it, what we had to prove to get it, and how you can check it yourself
            without taking our word for anything.
          </p>
        </header>

        <main className="cr-body">
          {CREDENTIALS.map((c) => (
            <section key={c.id} id={c.id} className="cr-card">
              <span className="cr-tag">{c.tag}</span>
              <h2>{c.name}</h2>
              <dl className="cr-meta">
                <div><dt>Issued by</dt><dd>{c.issuer}</dd></div>
                <div><dt>Status</dt><dd>{c.status}</dd></div>
              </dl>
              <h3>What it is</h3>
              <p>{c.what}</p>
              <h3>What it takes to get it</h3>
              <ol className="cr-steps">
                {c.process.map((step) => <li key={step}>{step}</li>)}
              </ol>
              <h3>How you can verify it</h3>
              <p>{c.verify}</p>
              <h3>Why it matters</h3>
              <p>{c.why}</p>
            </section>
          ))}

          <section className="cr-card cr-note">
            <h2>One thing we do not claim</h2>
            <p>
              Texas does not require a statewide general contractor license for general
              construction and remodeling, and we do not advertise or perform licensed
              plumbing, electrical, or HVAC work directly. Work that requires a licensed
              trade is referred to or subcontracted through appropriately licensed
              professionals. We would rather tell you that plainly than let a list of
              credentials imply something broader.
            </p>
          </section>

          <section className="cr-cta">
            <h2>Questions about any of it?</h2>
            <p>Ask directly. Joe answers the phone.</p>
            <div className="cr-ctas">
              <a href="tel:5126638867" className="cr-btn">Call 512-663-8867</a>
              <Link href="/#contact" className="cr-btn ghost">Request a Free Estimate</Link>
            </div>
          </section>
        </main>

        <footer className="cr-foot">
          <p>Sanches Group · Joe Sanches LLC · 809 Heartleaf Dr, Leander, TX 78641</p>
          <p>EIN 39-4911899 · B2G VID 21829543</p>
          <p><Link href="/government">Government &amp; institutional contracting →</Link></p>
        </footer>
      </div>

      <style jsx global>{`
        :root {
          --c-black:#080808; --c-card:#0f110d; --c-gold:#c8a84b; --c-white:#fff;
          --c-text:#d4d8cc; --c-muted:#7a8070; --c-gb:rgba(200,168,75,.28);
          --c-div:rgba(255,255,255,.07);
        }
        body { margin:0; background:var(--c-black); color:var(--c-text);
          font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',sans-serif;
          line-height:1.7; }
        .cr a { color:var(--c-gold); text-decoration:none; }
        .cr-nav { position:sticky; top:0; z-index:50; display:flex; align-items:center;
          justify-content:space-between; padding:14px 24px; background:rgba(8,8,8,.97);
          backdrop-filter:blur(16px); border-bottom:1px solid var(--c-gb); }
        .cr-brand { display:flex; align-items:center; gap:12px; color:var(--c-white)!important;
          font-weight:900; letter-spacing:1px; text-transform:uppercase; font-size:14px; }
        .cr-brand img { height:36px; filter:drop-shadow(0 0 8px rgba(107,120,84,.5)); }
        .cr-call { background:var(--c-gold); color:var(--c-black)!important; padding:9px 18px;
          border-radius:4px; font-weight:900; font-size:13px; }
        .cr-hero { max-width:780px; margin:0 auto; padding:56px 24px 30px; }
        .cr-crumb { font-size:12px; color:var(--c-muted); margin:0 0 18px;
          text-transform:uppercase; letter-spacing:1.5px; }
        .cr-crumb span { opacity:.5; margin:0 6px; }
        .cr-hero h1 { font-size:44px; line-height:1.1; font-weight:900; color:var(--c-white);
          letter-spacing:-1.2px; margin:0 0 20px; }
        .cr-intro { font-size:17px; margin:0; }
        .cr-body { max-width:780px; margin:0 auto; padding:0 24px 60px; }
        .cr-card { padding:34px 0; border-top:1px solid var(--c-div); }
        .cr-tag { display:inline-block; font-size:10px; font-weight:900; letter-spacing:2px;
          text-transform:uppercase; color:var(--c-gold); border:1px solid var(--c-gb);
          padding:5px 12px; border-radius:2px; margin-bottom:14px; }
        .cr-card h2 { font-size:27px; font-weight:900; color:var(--c-white);
          letter-spacing:-.5px; margin:0 0 16px; line-height:1.2; }
        .cr-card h3 { font-size:11px; font-weight:900; letter-spacing:2px; text-transform:uppercase;
          color:var(--c-gold); margin:26px 0 8px; }
        .cr-card p { margin:0; font-size:16px; }
        .cr-meta { display:flex; flex-wrap:wrap; gap:28px; margin:0 0 4px;
          padding:14px 0; border-top:1px solid var(--c-div); border-bottom:1px solid var(--c-div); }
        .cr-meta dt { font-size:10px; font-weight:900; letter-spacing:1.5px;
          text-transform:uppercase; color:var(--c-muted); margin-bottom:3px; }
        .cr-meta dd { margin:0; font-size:14px; color:var(--c-white); font-weight:600; }
        .cr-steps { margin:0; padding-left:20px; }
        .cr-steps li { margin-bottom:9px; font-size:15px; }
        .cr-note { background:rgba(200,168,75,.05); border:1px solid var(--c-gb);
          border-radius:6px; padding:28px; margin-top:34px; }
        .cr-note h2 { font-size:20px; }
        .cr-cta { text-align:center; padding:46px 0 0; border-top:1px solid var(--c-div); margin-top:34px; }
        .cr-cta h2 { font-size:24px; font-weight:900; color:var(--c-white); margin:0 0 6px; }
        .cr-cta p { color:var(--c-muted); margin:0 0 22px; }
        .cr-ctas { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
        .cr-btn { background:var(--c-gold); color:var(--c-black)!important; padding:14px 28px;
          border-radius:4px; font-weight:900; font-size:14px; letter-spacing:1px;
          text-transform:uppercase; }
        .cr-btn.ghost { background:transparent; color:var(--c-gold)!important;
          border:1px solid var(--c-gb); }
        .cr-foot { border-top:1px solid var(--c-gb); padding:30px 24px; text-align:center;
          font-size:13px; color:var(--c-muted); }
        .cr-foot p { margin:0 0 8px; }
        @media (max-width:640px){
          .cr-hero h1 { font-size:31px; }
          .cr-card h2 { font-size:22px; }
          .cr-btn { width:100%; text-align:center; }
        }
      `}</style>
    </>
  );
}
