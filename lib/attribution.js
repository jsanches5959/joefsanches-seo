// Source classification shared by the client tracker and the /api/track route.
// Pure functions, no dependencies, safe to import from either runtime.

const AI_ASSISTANTS = [
  [/(^|\.)chatgpt\.com$/, 'ChatGPT'],
  [/(^|\.)chat\.openai\.com$/, 'ChatGPT'],
  [/(^|\.)openai\.com$/, 'ChatGPT'],
  [/(^|\.)perplexity\.ai$/, 'Perplexity'],
  [/(^|\.)claude\.ai$/, 'Claude'],
  [/(^|\.)gemini\.google\.com$/, 'Gemini'],
  [/(^|\.)bard\.google\.com$/, 'Gemini'],
  [/(^|\.)copilot\.microsoft\.com$/, 'Copilot'],
  [/(^|\.)you\.com$/, 'You.com'],
  [/(^|\.)phind\.com$/, 'Phind'],
  [/(^|\.)poe\.com$/, 'Poe'],
];

const SEARCH_ENGINES = [
  [/(^|\.)google\./, 'Google'],
  [/(^|\.)bing\.com$/, 'Bing'],
  [/(^|\.)duckduckgo\.com$/, 'DuckDuckGo'],
  [/(^|\.)search\.yahoo\.com$/, 'Yahoo'],
  [/(^|\.)ecosia\.org$/, 'Ecosia'],
  [/(^|\.)brave\.com$/, 'Brave'],
];

const SOCIAL = [
  [/(^|\.)facebook\.com$/, 'Facebook'],
  [/(^|\.)instagram\.com$/, 'Instagram'],
  [/(^|\.)linkedin\.com$/, 'LinkedIn'],
  [/(^|\.)(twitter|x)\.com$/, 'X'],
  [/(^|\.)reddit\.com$/, 'Reddit'],
  [/(^|\.)nextdoor\.com$/, 'Nextdoor'],
  [/(^|\.)youtube\.com$/, 'YouTube'],
  [/(^|\.)t\.co$/, 'X'],
];

function matchList(host, list) {
  for (const [re, label] of list) {
    if (re.test(host)) return label;
  }
  return null;
}

/**
 * Classify where a visit came from.
 * `utmSource` wins over the referrer because AI assistants often strip the
 * referrer header but still append ?utm_source=chatgpt.com to links they cite.
 * Returns { source, channel }.
 */
export function classifySource(referrer, utmSource) {
  // 1. UTM first — survives referrer stripping.
  if (utmSource) {
    const u = String(utmSource).toLowerCase().trim();
    const viaUtm = matchList(u, AI_ASSISTANTS);
    if (viaUtm) return { source: viaUtm, channel: 'AI Assistant' };
    if (/chatgpt|openai/.test(u)) return { source: 'ChatGPT', channel: 'AI Assistant' };
    if (/perplexity/.test(u)) return { source: 'Perplexity', channel: 'AI Assistant' };
    if (/claude|anthropic/.test(u)) return { source: 'Claude', channel: 'AI Assistant' };
    if (/gemini|bard/.test(u)) return { source: 'Gemini', channel: 'AI Assistant' };
  }

  // 2. Referrer hostname.
  let host = '';
  if (referrer) {
    try {
      host = new URL(referrer).hostname.toLowerCase();
    } catch {
      host = '';
    }
  }

  if (!host) {
    // No referrer and no UTM. Note that AI assistants and messaging apps
    // frequently strip referrers, so "Direct" is not purely type-in traffic.
    return { source: utmSource ? String(utmSource) : 'Direct', channel: 'Direct / Unknown' };
  }

  const ai = matchList(host, AI_ASSISTANTS);
  if (ai) return { source: ai, channel: 'AI Assistant' };

  const se = matchList(host, SEARCH_ENGINES);
  if (se) return { source: se, channel: 'Search' };

  const so = matchList(host, SOCIAL);
  if (so) return { source: so, channel: 'Social' };

  return { source: host, channel: 'Referral' };
}

/** Short human label for an email subject line, e.g. "ChatGPT" or "Google". */
export function shortLabel(attr) {
  if (!attr || !attr.source) return 'Direct';
  return attr.source;
}
