import Head from 'next/head';
import { useEffect, useState } from 'react';
import JobberForm from '../components/JobberForm';
import ToolIcon from '../components/ToolIcon';

/**
 * The brand in one line: "Joe does ___."
 *
 * The company is Joe Sanches LLC, and the name is the point — it is one
 * accountable name across very different kinds of work. The line keeps a
 * homeowner who searched "tree removal" and one who searched "drywall repair"
 * both sure they are in the right place, without the page having to pick one.
 *
 * Page order follows how a visitor decides: what you do (hero), how to ask
 * (form), why trust you (the name), the work by division, who it is for,
 * proof (certifications), the person, and then — last, and kept separate —
 * the real estate side. A landscape company or facility manager reads a
 * property services contractor top to bottom; a homeowner who is also
 * selling finds Joe's licence at the end, framed as one more thing the same
 * name looks after.
 */

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }
  section[id], div[id] { scroll-margin-top: 84px; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background: var(--paper);
    color: var(--text);
    font-size: 16px;
    line-height: 1.75;
    -webkit-font-smoothing: antialiased;
  }
  body::before { display: none; }

  a { color: var(--gold-ink); text-decoration: none; }
  a:hover { color: var(--ink); }

  .w { max-width: 1180px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 48px); }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

  /* ── TYPE SCALE ── */
  .eyebrow {
    display: block;
    font-size: 12px; font-weight: 900;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--olive-ink); margin-bottom: 18px;
  }
  .title {
    font-size: clamp(32px, 5vw, 56px);
    line-height: 1.04;
    letter-spacing: -0.035em;
    font-weight: 900;
    color: var(--ink);
    margin-bottom: 20px;
  }
  .title em { font-style: normal; color: var(--gold-ink); }
  .lead {
    font-size: clamp(17px, 1.5vw, 19px);
    color: var(--text);
    max-width: 62ch;
    line-height: 1.8;
  }
  .lead + .lead { margin-top: 14px; }

  .sec { padding: clamp(64px, 9vw, 120px) 0; border-top: 1px solid var(--line); }
  .sec.alt { background: var(--paper-2); }

  /* ── NAV ── */
  .nav {
    position: sticky; top: 0; z-index: 200;
    background: rgba(250,248,243,0.92);
    backdrop-filter: blur(16px) saturate(1.2);
    border-bottom: 1px solid var(--line);
  }
  .nav-inner {
    display: flex; align-items: center; justify-content: space-between;
    gap: 24px;
    padding: 10px clamp(20px, 5vw, 48px);
    max-width: 1180px; margin: 0 auto;
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; color: var(--ink) !important; }
  .nav-logo img { height: 44px; display: block; }
  .nav-logo b { font-size: 15px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; }
  .nav-links { display: flex; gap: 26px; list-style: none; align-items: center; }
  .nav-links a {
    font-size: 13px; font-weight: 800; color: var(--muted);
    letter-spacing: 0.08em; text-transform: uppercase;
    transition: color .2s ease;
  }
  .nav-links a:hover { color: var(--ink); }
  .nav-call {
    background: var(--gold); color: var(--ink) !important;
    padding: 10px 18px; border-radius: 6px;
    font-weight: 900; font-size: 13px; letter-spacing: 0.06em;
  }
  .nav-call:hover { background: var(--gold-2) !important; }

  /* ── HERO ──
     Light ground, the skyline kept as a faint horizon. The headline is the
     brand line; the rotating word is decoration over a static sentence that
     screen readers and search engines get in full. */
  .home-hero {
    position: relative; isolation: isolate; overflow: hidden;
    padding: clamp(44px, 6vw, 84px) clamp(20px, 5vw, 48px) clamp(36px, 5vw, 64px);
    text-align: center;
    background:
      radial-gradient(900px 420px at 50% -10%, rgba(200,168,75,0.16) 0%, transparent 64%),
      radial-gradient(800px 420px at 50% 110%, rgba(107,120,84,0.14) 0%, transparent 70%),
      var(--paper);
  }
  .hero-inner { max-width: 960px; margin: 0 auto; width: 100%; }
  .hero-skyline {
    position: absolute; left: 0; right: 0; bottom: 0; height: 300px;
    background: url('/austin-skyline.svg') bottom center / 100% auto no-repeat;
    opacity: .08; z-index: -1; pointer-events: none;
  }
  .hero-eyebrow {
    display: inline-block; font-size: 12px; font-weight: 900;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--olive-ink); margin-bottom: 18px;
    padding: 7px 14px; border: 1px solid rgba(107,120,84,.35); border-radius: 999px;
    background: rgba(255,255,255,.6);
  }
  .home-hero h1 {
    font-size: clamp(40px, 9vw, 112px);
    line-height: 0.98;
    letter-spacing: -0.045em;
    font-weight: 900;
    color: var(--ink);
    margin-bottom: 22px;
  }
  .home-hero h1 .joe { display: block; }
  /* A fixed-height slot, so the page below never jumps as the word changes.
     The closing phrase is longer than the rest and is set smaller to fit. */
  .home-hero h1 .slot { display: flex; align-items: center; justify-content: center; height: 1.04em; }
  .home-hero h1 .word {
    display: inline-block; color: var(--gold-ink); white-space: nowrap;
    animation: wordIn .45s ease both;
  }
  .home-hero h1 .word.long { font-size: .6em; }
  @keyframes wordIn {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: none; }
  }
  .hero-sub {
    font-size: clamp(17px, 1.7vw, 20px);
    color: var(--text); line-height: 1.75;
    max-width: 660px; margin: 0 auto 28px;
  }
  .hero-sub strong { color: var(--ink); font-weight: 800; }
  .hero-ctas { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 26px; }
  .btn-gold, .btn-outline {
    display: inline-block; padding: 16px 28px; border-radius: 6px;
    font-size: 14px; font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase;
    transition: background .2s ease, border-color .2s ease, color .2s ease, transform .2s ease;
  }
  .btn-gold { background: var(--gold); color: var(--ink) !important; box-shadow: 0 6px 18px rgba(200,168,75,.28); }
  .btn-gold:hover { background: var(--gold-2); transform: translateY(-1px); }
  .btn-outline { border: 1.5px solid var(--ink); color: var(--ink) !important; background: rgba(255,255,255,.7); }
  .btn-outline:hover { background: var(--ink); color: var(--paper) !important; }
  .hero-trust {
    display: flex; justify-content: center; align-items: center;
    flex-wrap: wrap; row-gap: 10px;
  }
  .hero-trust span {
    font-size: 12px; font-weight: 800; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--muted); padding: 0 16px;
    border-right: 1px solid var(--line-2);
  }
  .hero-trust span:last-child { border-right: none; }

  /* ── ESTIMATE ── */
  .estimate { background: var(--paper-2); border-top: 1px solid var(--line); padding-top: clamp(34px, 4vw, 54px); }
  .estimate-head { text-align: center; max-width: 680px; margin: 0 auto; }
  .estimate-title {
    font-size: clamp(26px, 3.4vw, 38px); line-height: 1.1;
    letter-spacing: -0.03em; font-weight: 900; color: var(--ink);
    margin-bottom: 10px;
  }
  .estimate-sub { font-size: 17px; color: var(--text); line-height: 1.7; }
  .lead-form-wrap {
    margin: 28px auto 0; max-width: 820px; background: var(--card);
    border: 1px solid var(--line); border-top: 4px solid var(--gold);
    border-radius: 10px; padding: clamp(22px, 4vw, 40px);
    box-shadow: 0 18px 50px rgba(22,24,15,.07);
  }
  /* ── THE NAME ── */
  .name-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(32px, 6vw, 80px); align-items: center; }
  .does-list { list-style: none; border-top: 1px solid var(--line); }
  .does-list li {
    display: flex; align-items: center; gap: 16px;
    padding: 16px 0; border-bottom: 1px solid var(--line);
    font-size: clamp(20px, 2.4vw, 28px); font-weight: 900; letter-spacing: -0.02em; color: var(--ink);
  }
  .does-list li p { margin: 0; line-height: 1.2; }
  .does-list li span { color: var(--muted); font-weight: 700; }
  .does-list li b { color: var(--gold-ink); font-weight: 900; }
  .does-list .di { color: var(--olive); flex-shrink: 0; }

  /* ── DIVISIONS ── */
  .div-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 48px; }
  .div-card {
    background: var(--card); border: 1px solid var(--line); border-radius: 12px;
    padding: 30px 26px 26px; display: flex; flex-direction: column;
    box-shadow: 0 10px 30px rgba(22,24,15,.05);
    transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
  }
  .div-card:hover { transform: translateY(-3px); box-shadow: 0 18px 44px rgba(22,24,15,.09); border-color: rgba(200,168,75,.5); }
  .div-card.feature { border-top: 4px solid var(--olive); }
  .div-icon { color: var(--olive); margin-bottom: 16px; }
  .div-tag { font-size: 12px; font-weight: 900; letter-spacing: .14em; text-transform: uppercase; color: var(--olive-ink); margin-bottom: 6px; }
  .div-card h3 { font-size: 26px; font-weight: 900; color: var(--ink); letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 10px; }
  .div-card > p { font-size: 16px; color: var(--text); line-height: 1.7; margin-bottom: 18px; }
  .div-card ul { list-style: none; margin-bottom: 22px; flex: 1; }
  .div-card li { font-size: 15px; color: var(--text); padding: 7px 0 7px 20px; position: relative; border-bottom: 1px dashed var(--line); }
  .div-card li::before { content: ''; position: absolute; left: 2px; top: 16px; width: 7px; height: 7px; background: var(--gold); transform: rotate(45deg); }
  .div-card li em { font-style: normal; font-size: 12px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); margin-left: 6px; }
  .div-link { font-size: 14px; font-weight: 900; letter-spacing: .06em; text-transform: uppercase; color: var(--ink) !important; border-bottom: 2px solid var(--gold); padding-bottom: 3px; align-self: flex-start; }
  .div-link:hover { color: var(--gold-ink) !important; }
  .cap-foot { margin-top: 26px; font-size: 14px; color: var(--muted); line-height: 1.75; max-width: 80ch; }

  .svc-links-label {
    margin-top: 56px; margin-bottom: 14px;
    font-size: 12px; font-weight: 900; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--olive-ink);
  }
  .svc-links { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
  .svc-link {
    display: flex; align-items: center; gap: 12px; padding: 16px 16px;
    background: var(--card); border: 1px solid var(--line); border-radius: 8px;
    transition: border-color .2s ease, transform .2s ease;
  }
  .svc-link:hover { border-color: rgba(200,168,75,.6); transform: translateY(-2px); }
  .svc-icon { color: var(--olive); flex-shrink: 0; }
  .svc-link-text { display: block; min-width: 0; }
  .svc-link strong { display: block; color: var(--ink); font-size: 15px; font-weight: 800; line-height: 1.3; margin-bottom: 2px; }
  .svc-link-text span { font-size: 12px; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; }

  /* ── WHO WE SERVE ── */
  .who { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 44px; }
  .who-item { background: var(--card); border: 1px solid var(--line); border-radius: 10px; padding: 26px 24px; }
  .who-item strong { display: block; color: var(--ink); font-size: 17px; font-weight: 900; margin-bottom: 8px; }
  .who-item p { font-size: 15px; color: var(--text); line-height: 1.7; }
  .who-item.b2b { border-color: rgba(107,120,84,.45); background: #f4f6ee; }

  /* ── CREDENTIAL BAND ── */
  .specs { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-top: 44px; }
  .spec { background: var(--card); border: 1px solid var(--line); border-radius: 8px; padding: 22px 12px; text-align: center; }
  .spec-val { display: block; font-size: 16px; font-weight: 900; color: var(--ink); letter-spacing: 0.03em; text-transform: uppercase; line-height: 1.25; }
  .spec-label { display: block; font-size: 12px; color: var(--muted); margin-top: 7px; letter-spacing: 0.06em; text-transform: uppercase; }
  .band-links { margin-top: 24px; display: flex; gap: 24px; flex-wrap: wrap; }
  .band-links a { font-size: 14px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: var(--ink); border-bottom: 2px solid var(--gold); padding-bottom: 3px; }

  /* ── ABOUT ── */
  .about-grid { display: grid; grid-template-columns: 300px 1fr; gap: clamp(30px, 5vw, 64px); align-items: start; }
  .about-img { width: 100%; border-radius: 10px; display: block; box-shadow: 0 16px 40px rgba(22,24,15,.14); }
  .about-role { display: block; font-size: 13px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: var(--olive-ink); margin-bottom: 20px; }
  .about-bio { font-size: 17px; color: var(--text); line-height: 1.85; margin-bottom: 16px; max-width: 62ch; }
  .creds { display: flex; flex-wrap: wrap; gap: 8px; margin: 24px 0; }
  .cred { font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text); background: var(--card); border: 1px solid var(--line); padding: 8px 12px; border-radius: 6px; }

  /* ── REAL ESTATE DIVISION ──
     Deliberately quieter than the trades: one card, its own name, its own
     link. It reads as a separate arm of the company, not as the company. */
  .re-card {
    display: grid; grid-template-columns: auto 1fr auto; gap: 28px; align-items: center;
    background: var(--card); border: 1px solid var(--line); border-radius: 12px;
    padding: clamp(24px, 4vw, 40px);
  }
  .re-icon { color: var(--olive); }
  .re-card h3 { font-size: clamp(22px, 2.6vw, 30px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 8px; line-height: 1.15; }
  .re-card p { font-size: 16px; color: var(--text); line-height: 1.75; max-width: 64ch; }
  .re-card p + p { margin-top: 10px; }
  .re-fine { font-size: 14px !important; color: var(--muted) !important; }

  /* ── AREAS ── */
  .areas { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 36px; }
  .area { font-size: 15px; font-weight: 700; color: var(--ink); background: var(--card); border: 1px solid var(--line); padding: 10px 16px; border-radius: 999px; }

  /* ── CONTACT ── */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(24px, 4vw, 56px); margin-top: 44px; }
  .c-item { padding: 16px 0; border-bottom: 1px solid var(--line); }
  .c-label { display: block; font-size: 12px; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
  .c-val { font-size: 19px; font-weight: 800; color: var(--ink); }
  .c-val a { color: var(--ink); }
  .c-val a:hover { color: var(--gold-ink); }
  .inq { background: var(--card); border: 1px solid var(--line); border-radius: 10px; padding: 22px 24px; margin-bottom: 12px; }
  .inq.gold { border-color: rgba(200,168,75,.6); background: #fbf7ea; }
  .inq h4 { font-size: 17px; font-weight: 900; color: var(--ink); margin-bottom: 6px; }
  .inq p { font-size: 15px; color: var(--text); line-height: 1.7; margin-bottom: 12px; }
  .inq-btn { font-size: 13px; font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink) !important; border-bottom: 2px solid var(--gold); padding-bottom: 2px; }

  /* ── COMPLIANCE + FOOTER ──
     The one dark band on the page: it anchors the bottom and keeps the
     brand's black-and-gold without making the whole site dark. */
  .compliance { background: var(--night); padding: 52px clamp(20px, 5vw, 48px) 20px; color: #c9cdbf; }
  .compliance-inner { max-width: 1180px; margin: 0 auto; }
  .compliance-eyebrow { display: block; font-size: 12px; font-weight: 900; letter-spacing: 0.18em; text-transform: uppercase; color: #b5ba9f; margin-bottom: 24px; }
  .compliance-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 26px 48px; }
  .compliance-block-label { display: block; font-size: 12px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; color: #d9c27a; margin-bottom: 8px; }
  .compliance-block p { font-size: 14px; color: #b9bdaf; line-height: 1.8; }
  .compliance-block a { color: #e8cd77; text-decoration: underline; }

  footer { background: var(--night); border-top: 1px solid rgba(255,255,255,.08); padding: 40px clamp(20px, 5vw, 48px) 48px; text-align: center; }
  footer img.mark { height: 64px; margin-bottom: 14px; }
  footer p { font-size: 14px; color: #b9bdaf; margin-bottom: 6px; }
  footer a { color: #e8cd77; }
  .foot-nav { display: flex; gap: 22px; justify-content: center; flex-wrap: wrap; margin: 16px 0; }
  .foot-nav a { font-size: 13px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #dfe2d6; }
  .foot-nav a:hover { color: #e8cd77; }
  .hub-logo-footer { height: 56px; margin-top: 16px; background: #fff; border-radius: 6px; padding: 6px; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1040px) {
    .specs { grid-template-columns: repeat(3, 1fr); }
    .svc-links { grid-template-columns: repeat(2, 1fr); }
    .div-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 860px) {
    .nav-links li:not(:last-child) { display: none; }
    .name-grid { grid-template-columns: 1fr; }
    .who { grid-template-columns: 1fr; }
    .about-grid { grid-template-columns: 1fr; }
    .about-img { max-width: 240px; }
    .contact-grid { grid-template-columns: 1fr; }
    .compliance-grid { grid-template-columns: 1fr; }
    .re-card { grid-template-columns: 1fr; }
  }
  @media (max-width: 620px) {
    .nav-logo b { display: none; }
    .svc-links { grid-template-columns: 1fr; }
    .specs { grid-template-columns: repeat(2, 1fr); }
    .hero-trust span { padding: 0 9px; font-size: 11px; letter-spacing: 0.06em; }
    .hero-ctas a { flex: 1 1 100%; text-align: center; }
  }
  @media (max-height: 940px) and (min-width: 700px) {
    .home-hero { padding-top: clamp(28px, 3.4vw, 48px); padding-bottom: clamp(24px, 3vw, 40px); }
    .home-hero h1 { font-size: clamp(42px, 7vw, 92px); margin-bottom: 18px; }
    .hero-sub { margin-bottom: 22px; }
    .hero-ctas { margin-bottom: 20px; }
    .estimate { padding-top: 30px; }
  }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    * { animation: none !important; transition: none !important; }
  }
`;

// The words the hero cycles through. The last one is the point of the list.
const DOES = ['trees.', 'drywall.', 'paint.', 'remodels.', 'make-readies.', 'the whole property.'];

const DIVISIONS = [
  {
    id: 'trees',
    icon: 'tree',
    tag: 'Outside',
    name: 'Trees & Grounds',
    blurb: 'Removals, trimming, stumps and storm cleanup, plus the grounds upkeep that keeps a property looking cared for.',
    items: [
      'Tree removal',
      'Tree trimming & pruning',
      'Stump grinding',
      'Storm & limb cleanup',
      'Brush & lot clearing',
      'Landscaping & grounds maintenance',
    ],
    href: '/tree-removal-leander-tx',
    cta: 'Tree service details',
  },
  {
    id: 'build',
    icon: 'hardhat',
    tag: 'Inside & out',
    name: 'Build & Repair',
    blurb: 'Everything on the punch list, from a doorknob hole in the drywall to a full remodel.',
    items: [
      'Remodeling & build-outs',
      'Drywall & texture',
      'Interior & exterior painting',
      'Flooring',
      'Patios & decks',
      'Handyman & repairs',
      { name: 'Roofing, electrical, plumbing, HVAC', note: 'Licensed partners' },
    ],
    href: '/services/home-remodeling-leander-tx',
    cta: 'Remodeling details',
  },
  {
    id: 'commercial',
    icon: 'building',
    tag: 'Commercial',
    name: 'Facilities & Contracts',
    blurb: 'Recurring work for property managers, HOAs, builders, landscape companies and public agencies, on one schedule and one invoice.',
    items: [
      'Make-readies & unit turns',
      'Janitorial & facilities',
      'Pressure washing',
      'Grounds maintenance contracts',
      'Subcontract crews for GCs & landscapers',
      'Government & spot purchases',
    ],
    href: '/services/facilities-maintenance-austin-tx',
    cta: 'Commercial details',
  },
];

const SERVICE_PAGES = [
  { href: '/tree-removal-leander-tx',                         icon: 'tree',     name: 'Tree Removal & Trimming',       city: 'Leander, TX' },
  { href: '/services/landscaping-grounds-maintenance-leander-tx', icon: 'leaf', name: 'Landscaping & Grounds',         city: 'Leander, TX' },
  { href: '/services/home-remodeling-leander-tx',             icon: 'hardhat',  name: 'Remodeling & Construction',     city: 'Leander, TX' },
  { href: '/services/drywall-repair-leander-tx',              icon: 'trowel',   name: 'Drywall Repair',                city: 'Leander, TX' },
  { href: '/services/interior-exterior-painting-leander-tx',  icon: 'roller',   name: 'Interior & Exterior Painting',  city: 'Leander, TX' },
  { href: '/services/handyman-services-leander-tx',           icon: 'toolbox',  name: 'Handyman & Repairs',            city: 'Leander, TX' },
  { href: '/services/pressure-washing-leander-tx',            icon: 'sprayer',  name: 'Pressure Washing',              city: 'Leander, TX' },
  { href: '/services/facilities-maintenance-austin-tx',       icon: 'squeegee', name: 'Facilities & Janitorial',       city: 'Austin, TX' },
];

const AREAS = ['Leander','Cedar Park','Austin','Round Rock','Georgetown','Pflugerville','Liberty Hill','Hutto','Kyle','Buda','San Marcos','Temple','Statewide (Gov)'];

const allServices = DIVISIONS.flatMap((d) => d.items.map((i) => (typeof i === 'string' ? i : i.name)));

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': 'https://joefsanches.com/#sanchesgroup',
  name: 'Sanches Group',
  alternateName: ['Joe Sanches LLC', 'Joe Does It'],
  slogan: 'Joe does the whole property.',
  url: 'https://joefsanches.com',
  telephone: '+1-512-663-8867',
  email: 'hello@joefsanches.com',
  image: 'https://joefsanches.com/logo.png',
  logo: 'https://joefsanches.com/logo.png',
  priceRange: '$$',
  founder: { '@type': 'Person', name: 'Joe Sanches' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Leander',
    addressRegion: 'TX',
    postalCode: '78641',
    addressCountry: 'US',
  },
  areaServed: AREAS.filter((a) => a !== 'Statewide (Gov)').map((name) => ({ '@type': 'City', name: `${name}, TX` })),
  knowsAbout: allServices,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Tree, grounds, construction, repair and maintenance services',
    itemListElement: allServices.map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
  },
};

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setI(DOES.length - 1); return undefined; }
    const t = setInterval(() => {
      setI((n) => {
        // Land on the last word and stay there: it is the sentence's point.
        if (n >= DOES.length - 1) { clearInterval(t); return n; }
        return n + 1;
      });
    }, 1500);
    return () => clearInterval(t);
  }, []);
  const word = DOES[i];
  return (
    <span className="slot">
      <span className={`word${word.length > 14 ? ' long' : ''}`} key={i}>{word}</span>
    </span>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Sanches Group | Tree Removal, Remodeling &amp; Repairs — Leander, TX</title>
        <meta name="description" content="Joe does trees, drywall, paint, remodels and the rest. Sanches Group (Joe Sanches LLC) is a veteran-owned Leander, TX contractor: tree removal and trimming, landscaping, remodeling, drywall, painting, handyman and facilities maintenance. Free estimates." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://joefsanches.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Joe does the whole property. | Sanches Group, Leander TX" />
        <meta property="og:description" content="Tree removal, remodeling, drywall, paint and property maintenance across Central Texas — one company, one name on every job." />
        <meta property="og:url" content="https://joefsanches.com" />
        <meta property="og:image" content="https://joefsanches.com/logo.png" />
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
            <img src="/logo.png" alt="" />
            <b>Sanches Group</b>
          </a>
          <ul className="nav-links">
            <li><a href="/tree-removal-leander-tx">Trees</a></li>
            <li><a href="#work">Services</a></li>
            <li><a href="#clients">Commercial</a></li>
            <li><a href="#government">Government</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="tel:5126638867" className="nav-call">Call 512-663-8867</a></li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section className="home-hero" id="top">
        <span className="hero-skyline" aria-hidden="true" />
        <div className="hero-inner">
          <span className="hero-eyebrow">Joe Sanches LLC · Leander, Texas</span>
          <h1>
            <span className="sr">Joe does trees, drywall, paint, remodels, make-readies — the whole property.</span>
            <span aria-hidden="true">
              <span className="joe">Joe does</span>
              <RotatingWord />
            </span>
          </h1>
          <p className="hero-sub">
            <strong>Tree removal, remodeling, drywall, paint and property maintenance</strong>{' '}
            across Central Texas, from one company with one name on every job.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="btn-gold">Get a Free Estimate</a>
            <a href="sms:5126638867" className="btn-outline">Text a Photo</a>
          </div>
          <div className="hero-trust">
            <span>Licensed &amp; Insured</span>
            <span>Veteran-Owned</span>
            <span>Free Estimates</span>
            <span>One Point of Contact</span>
          </div>
        </div>
      </section>

      {/* FREE ESTIMATE — first thing after the hero, so it is reachable on a phone. */}
      <section className="sec estimate" id="contact">
        <div className="w">
          <div className="estimate-head">
            <h2 className="estimate-title">Tell Joe what the property needs.</h2>
            <p className="estimate-sub">
              Free estimate. A photo helps. You&apos;ll usually hear back the same day.
            </p>
          </div>
          <div className="lead-form-wrap">
            <JobberForm />
          </div>
        </div>
      </section>

      {/* THE NAME */}
      <section className="sec">
        <div className="w name-grid">
          <div>
            <span className="eyebrow">Why it&apos;s called Joe Sanches LLC</span>
            <h2 className="title">My name is on the company. <em>So it&apos;s on every job.</em></h2>
            <p className="lead">
              Plenty of contractors hide behind a logo. I put my name on mine on purpose, so
              there&apos;s never a question of who answers for the work.
            </p>
            <p className="lead">
              A leaning oak, a cracked ceiling, a forty-unit make-ready: it&apos;s the same
              company, the same standard and one person you can call. That&apos;s what
              &ldquo;Joe does it&rdquo; means. You don&apos;t have to find a different company
              for every job.
            </p>
          </div>
          <ul className="does-list" aria-label="What Joe does">
            <li><ToolIcon name="tree" size={30} className="di" /><p><span>Joe does</span> <b>trees.</b></p></li>
            <li><ToolIcon name="trowel" size={30} className="di" /><p><span>Joe does</span> <b>drywall.</b></p></li>
            <li><ToolIcon name="roller" size={30} className="di" /><p><span>Joe does</span> <b>paint.</b></p></li>
            <li><ToolIcon name="building" size={30} className="di" /><p><span>Joe does</span> <b>make-readies.</b></p></li>
            <li><ToolIcon name="shield" size={30} className="di" /><p><span>Joe does</span> <b>the whole property.</b></p></li>
          </ul>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="sec alt" id="work">
        <div className="w">
          <span className="eyebrow">What Joe does</span>
          <h2 className="title">Three crews. One company.</h2>
          <p className="lead">
            The work is organized the way a property is: what&apos;s outside, what&apos;s
            inside, and the recurring upkeep that keeps a building running. Pick one, or put
            all three on the same list.
          </p>

          <div className="div-grid">
            {DIVISIONS.map((d) => (
              <div className={`div-card${d.id === 'trees' ? ' feature' : ''}`} key={d.id} id={d.id}>
                <ToolIcon name={d.icon} size={40} className="div-icon" />
                <span className="div-tag">{d.tag}</span>
                <h3>{d.name}</h3>
                <p>{d.blurb}</p>
                <ul>
                  {d.items.map((item) => (typeof item === 'string'
                    ? <li key={item}>{item}</li>
                    : <li key={item.name}>{item.name}<em>{item.note}</em></li>))}
                </ul>
                <a className="div-link" href={d.href}>{d.cta} →</a>
              </div>
            ))}
          </div>

          <p className="cap-foot">
            Roofing, electrical, plumbing and heating and air are performed by appropriately
            licensed contractors working under Sanches Group&apos;s management. We hold no trade
            qualifier license for those categories and never claim to. We manage the scope, the
            schedule and the standard, and stand behind the result.
          </p>

          <p className="svc-links-label">Service details &amp; free estimates</p>
          <div className="svc-links">
            {SERVICE_PAGES.map((s) => (
              <a className="svc-link" href={s.href} key={s.href}>
                <ToolIcon name={s.icon} size={28} className="svc-icon" />
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
      <section className="sec" id="clients">
        <div className="w">
          <span className="eyebrow">Who we work for</span>
          <h2 className="title">Homeowners, and the businesses that run property.</h2>
          <p className="lead">
            The same crews and the same standard for a single backyard tree or a portfolio of
            buildings.
          </p>
          <div className="who">
            <div className="who-item">
              <strong>Homeowners</strong>
              <p>Tree work, remodels, repairs, paint, flooring, decks, and the punch list you&apos;ve been putting off.</p>
            </div>
            <div className="who-item b2b">
              <strong>Landscape companies &amp; GCs</strong>
              <p>Crews for tree removal, grounds, drywall, paint and finish work. We work under your name on your job and never go around you to your client.</p>
            </div>
            <div className="who-item b2b">
              <strong>Property managers &amp; HOAs</strong>
              <p>Make-readies, unit turns, common-area trees and grounds, and recurring maintenance. We&apos;re your vendor and never compete for your owners.</p>
            </div>
            <div className="who-item">
              <strong>Commercial owners</strong>
              <p>Build-outs, facilities maintenance, janitorial, pressure washing and scheduled upkeep for offices and retail.</p>
            </div>
            <div className="who-item">
              <strong>Builders</strong>
              <p>Lot and brush clearing, drywall, paint, punch-out and warranty callbacks, staffed to your schedule.</p>
            </div>
            <div className="who-item">
              <strong>Government agencies</strong>
              <p>Texas HUB certified, SDVOSB, SAM.gov active. Solicitations, spot purchases and HUB subcontracting plans.</p>
            </div>
          </div>
        </div>
      </section>

      {/* GOVERNMENT / CREDENTIALS */}
      <section className="sec alt" id="government">
        <div className="w">
          <span className="eyebrow">Certifications</span>
          <h2 className="title">Certified. Registered. Ready to perform.</h2>
          <p className="lead">
            All certifications are current and independently verifiable. We take federal, state
            and municipal work across Central Texas. Spot purchases under $25,000 can be
            direct-awarded with no formal solicitation.
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
      <section className="sec" id="about">
        <div className="w">
          <div className="about-grid">
            <div>
              <img src="/joe.png" alt="Joe Sanches, founder of Sanches Group" className="about-img" />
            </div>
            <div>
              <span className="eyebrow">Founder &amp; Principal</span>
              <h2 className="title">Joe Sanches</h2>
              <span className="about-role">Joe Sanches LLC · Sanches Group · Service-Disabled U.S. Veteran</span>
              <p className="about-bio">
                Joe built Sanches Group on the standards he carried in uniform: show up, do the
                work, stand behind it. He put his own name on the company because a name is
                harder to walk away from than a logo.
              </p>
              <p className="about-bio">
                Today Joe answers the phone, writes the estimates and runs the crews. As the
                company grows that won&apos;t always be him on every job, but the standard
                stays the same. Every job has one named person accountable for it, and
                you&apos;ll always know who that is.
              </p>
              <div className="creds">
                <span className="cred">Service-Disabled U.S. Veteran</span>
                <span className="cred">SDVOSB Certified</span>
                <span className="cred">Texas HUB · VetHUB</span>
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

      {/* REAL ESTATE DIVISION */}
      <section className="sec alt" id="real-estate">
        <div className="w">
          <span className="eyebrow">Also from Sanches Group</span>
          <div className="re-card">
            <ToolIcon name="home" size={56} className="re-icon" />
            <div>
              <h3>Joe sells homes, too.</h3>
              <p>
                Joe is a licensed Texas real estate agent. That helps homeowners who are getting
                a house ready to list, or fixing what the inspection found after they buy. One
                trusted name covers the repairs and the transaction.
              </p>
              <p className="re-fine">
                Real estate is a separate division with its own clients. Work we do for trade,
                commercial and property-management customers is never used to source listings.
              </p>
            </div>
            <a href="/realtor" className="btn-outline">Real Estate →</a>
          </div>
        </div>
      </section>

      {/* SERVICE AREA */}
      <section className="sec">
        <div className="w">
          <span className="eyebrow">Service Area</span>
          <h2 className="title">Central Texas.</h2>
          <p className="lead">
            Based in Leander, Williamson County. We cover the Austin metro for tree, grounds,
            construction and maintenance work, and take government and large commercial work
            statewide.
          </p>
          <div className="areas">
            {AREAS.map((a) => <span key={a} className="area">{a}</span>)}
          </div>
        </div>
      </section>

      {/* CONTACT DETAILS */}
      <section className="sec alt" id="reach">
        <div className="w">
          <span className="eyebrow">Contact</span>
          <h2 className="title">Talk to Joe directly.</h2>
          <p className="lead">
            No answering service and no bid coordinator. Tell us what the property needs and
            you&apos;ll hear back, usually the same day.
          </p>
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
                <h4>Subcontract &amp; vendor partnerships</h4>
                <p>Landscape companies, GCs, builders and property managers: crews for trees, grounds, finish work and turns, on one invoice.</p>
                <a href="mailto:hello@joefsanches.com?subject=Subcontract%20%2F%20Vendor%20Partnership%20%E2%80%94%20Sanches%20Group&body=Company%3A%0AType%20of%20work%3A%0ALocation(s)%3A%0AStart%20date%20%2F%20frequency%3A%0A" className="inq-btn">Discuss a Contract →</a>
              </div>
              <div className="inq">
                <h4>Government &amp; Municipal</h4>
                <p>Solicitations, capability statements, teaming, HUB subcontracting plans or spot purchase quotes.</p>
                <a href="mailto:hello@joefsanches.com?subject=Government%20Contracting%20Inquiry%20%E2%80%94%20Sanches%20Group&body=Agency%2FOrganization%3A%0AContract%20type%3A%0ANAICS%2FNIGP%20Code(s)%3A%0AScope%3A%0A" className="inq-btn">Send Inquiry →</a>
              </div>
              <div className="inq">
                <h4>Homeowners</h4>
                <p>Trees, remodels, repairs, paint, flooring, decks and everything in between.</p>
                <a href="sms:5126638867" className="inq-btn">Text a Photo →</a>
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
              <p>Roofing, electrical, plumbing and HVAC work is performed by appropriately licensed contractors engaged and managed by Sanches Group. Sanches Group does not hold, and does not represent itself as holding, TDLR trade qualifier licenses in those categories. Texas does not require a statewide general contractor license; general construction, remodeling, finish trades and tree work are self-performed.</p>
            </div>
            <div className="compliance-block">
              <span className="compliance-block-label">Spot Purchase Availability</span>
              <p>Immediately available for state and municipal spot purchases under $25,000: janitorial (NIGP 910-39), pressure washing (NIGP 968-94), painting (NIGP 910-54), flooring (NIGP 910-25), window washing (NIGP 910-81) and grounds maintenance (NIGP 98852). No formal solicitation required. Direct award eligible. B2G VID: 21829543.</p>
            </div>
            <div className="compliance-block">
              <span className="compliance-block-label">Vendor Non-Solicitation</span>
              <p>Sanches Group works as an outside vendor or subcontractor for property management, landscape and general contracting clients. We will never solicit their customers or portfolio owners, pursue their contracts, or use their work to source real estate business.</p>
            </div>
            <div className="compliance-block">
              <span className="compliance-block-label">Real Estate</span>
              <p>Joe Sanches is a licensed Texas real estate sales agent. Real estate services are offered through his sponsoring broker and are separate from Sanches Group&apos;s contracting services. <a href="https://www.trec.texas.gov/forms/consumer-protection-notice" target="_blank" rel="noopener noreferrer">Texas Real Estate Commission Consumer Protection Notice</a>.</p>
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
          <a href="/tree-removal-leander-tx">Tree Service</a>
          <a href="#work">Services</a>
          <a href="/credentials">Credentials</a>
          <a href="/government">Government</a>
          <a href="#contact">Free Estimate</a>
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
