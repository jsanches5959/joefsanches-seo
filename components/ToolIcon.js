/**
 * Line-drawn tool icons for the service cards.
 *
 * Inline SVG rather than an icon font or sprite sheet: no extra network
 * request, no flash of missing glyphs, and stroke="currentColor" lets each icon
 * inherit the gold from whatever it sits inside, including on hover.
 *
 * Drawn on a 24x24 grid at one stroke weight so the set reads as a single
 * family rather than a pile of clip art. Each was rendered and checked at both
 * 72px and 30px — the small size is what the cards actually use, and detail
 * that survives large can turn to mud small.
 */

const paths = {
  // Hard hat — general construction and remodeling.
  hardhat: (
    <>
      <path d="M6 16a6 6 0 0 1 12 0" />
      <path d="M3.2 16h17.6" />
      <path d="M9.8 16v-5.4M14.2 16v-5.4" />
    </>
  ),

  // Apartment blocks — unit turns and multi-family work.
  building: (
    <>
      <path d="M4 20.4V4.6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v15.8" />
      <path d="M14 20.4V9.4h5a1 1 0 0 1 1 1v10" />
      <path d="M2.8 20.4h18.4" />
      <path d="M6.8 7.2h1.6M10.2 7.2h1.6M6.8 11h1.6M10.2 11h1.6M6.8 14.8h1.6M10.2 14.8h1.6" />
      <path d="M16.4 12.8h1.6M16.4 16.4h1.6" />
    </>
  ),

  // Paint roller — interior and exterior painting.
  roller: (
    <>
      <rect x="2.8" y="3.2" width="11.4" height="5.2" rx="1.6" />
      <path d="M14.2 5.8h2.8a1.4 1.4 0 0 1 1.4 1.4v1.6a1.4 1.4 0 0 1-1.4 1.4h-4.6a1.4 1.4 0 0 0-1.4 1.4v1.4" />
      <rect x="9.2" y="13.2" width="4" height="7.4" rx="2" />
    </>
  ),

  // Taping knife — drywall repair and finishing.
  trowel: (
    <>
      <rect x="1.8" y="10.2" width="5.8" height="3.6" rx="1.8" />
      <path d="M7.6 12h1.6" />
      <path d="M9.2 9.6 18.6 7.4a1.6 1.6 0 0 1 2 1.6v6a1.6 1.6 0 0 1-2 1.6L9.2 14.4Z" />
    </>
  ),

  // Toolbox — handyman work and small repairs.
  toolbox: (
    <>
      <rect x="2.6" y="8.4" width="18.8" height="11.4" rx="1.8" />
      <path d="M8 8.4V6.6a1.6 1.6 0 0 1 1.6-1.6h4.8A1.6 1.6 0 0 1 16 6.6v1.8" />
      <path d="M2.6 13.2h18.8" />
      <path d="M10.4 13.2v-1.8h3.2v1.8" />
    </>
  ),

  // Spray gun — pressure washing. The discharge is drawn as arcs rather than a
  // fan of straight lines: three lines meeting near the nozzle read as an
  // arrowhead, which is not what the icon is meant to say.
  sprayer: (
    <>
      <path d="M3.4 8.4h11.4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4.6v3.4a2.3 2.3 0 0 1-4.6 0v-3.4H3.4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Z" />
      <path d="M18.2 8.2a3.6 3.6 0 0 1 0 4.4" />
      <path d="M20.6 6.6a6.4 6.4 0 0 1 0 7.6" />
    </>
  ),

  // Squeegee — janitorial and facilities maintenance.
  squeegee: (
    <>
      <path d="M3.2 16.4h17.6a1 1 0 0 1 1 1v1.4a1 1 0 0 1-1 1H3.2a1 1 0 0 1-1-1v-1.4a1 1 0 0 1 1-1Z" />
      <path d="M9.2 16.4v-1.8h5.6v1.8" />
      <path d="M12 14.6V3.4" />
    </>
  ),

  // Shield and star — certifications and government contracting.
  shield: (
    <>
      <path d="M12 2.6 20 5.5v6.1c0 4.8-3.3 8.1-8 9.8-4.7-1.7-8-5-8-9.8V5.5L12 2.6Z" />
      <path d="M12 8.2 13 10.82 15.8 10.96 13.62 12.73 14.35 15.44 12 13.9 9.65 15.44 10.38 12.73 8.2 10.96 11 10.82Z" />
    </>
  ),
  // Roof slope with shingle courses — roofing.
  roof: (
    <>
      <path d="M1.6 14.2 12 5.2l10.4 9" />
      <path d="M1.6 14.2h20.8" />
      <path d="M6.4 14.2 12 9.4l5.6 4.8" />
    </>
  ),

  // Pergola over a slab — patios, decks and outdoor structures.
  deck: (
    <>
      <path d="M2.4 6.6h19.2" />
      <path d="M6 3.6v3M10 3.6v3M14 3.6v3M18 3.6v3" />
      <path d="M4.6 6.6v13.8M19.4 6.6v13.8" />
      <path d="M2.4 20.4h19.2" />
    </>
  ),

  // Lightning bolt — electrical.
  bolt: (
    <>
      <path d="M13.4 2.6 4.6 13.8h6.2l-1.2 7.6 8.8-11.2h-6.2l1.2-7.6Z" />
    </>
  ),

  // Wall unit with airflow — heating and cooling.
  hvac: (
    <>
      <rect x="2.6" y="4.4" width="18.8" height="7" rx="1.8" />
      <path d="M5.4 9h13.2" />
      <path d="M7 14.4c1.4 1.4 1.4 2.6 0 4M12 14.4c1.4 1.4 1.4 2.6 0 4M17 14.4c1.4 1.4 1.4 2.6 0 4" />
    </>
  ),

  // Pipe run through an inline valve — plumbing.
  pipe: (
    <>
      <path d="M2.2 12h6.6M15.2 12h6.6" />
      <rect x="8.8" y="9.4" width="6.4" height="5.2" rx="1" />
      <path d="M12 9.4V6.4M9.8 6.4h4.4" />
    </>
  ),

  // Staggered planks — flooring.
  planks: (
    <>
      <rect x="2.4" y="5.6" width="8" height="4.2" rx=".6" />
      <rect x="12.4" y="5.6" width="9.2" height="4.2" rx=".6" />
      <rect x="2.4" y="11.4" width="9.2" height="4.2" rx=".6" />
      <rect x="13.6" y="11.4" width="8" height="4.2" rx=".6" />
      <rect x="2.4" y="17.2" width="8" height="4.2" rx=".6" />
      <rect x="12.4" y="17.2" width="9.2" height="4.2" rx=".6" />
    </>
  ),
};


export default function ToolIcon({ name, size = 24, className = '' }) {
  const art = paths[name];
  if (!art) return null;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {art}
    </svg>
  );
}
