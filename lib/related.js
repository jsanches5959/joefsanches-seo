import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

/* Words that appear in so many of these titles that matching on them says
   nothing. Without this list every Leander post looks related to every other
   Leander post and the picks come out arbitrary. */
const STOP = new Set([
  'a', 'about', 'actually', 'after', 'all', 'an', 'and', 'any', 'are', 'as',
  'at', 'be', 'before', 'best', 'but', 'by', 'can', 'complete', 'do', 'does',
  'every', 'for', 'from', 'get', 'guide', 'has', 'have', 'how', 'in', 'is',
  'it', 'know', 'local', 'look', 'me', 'more', 'most', 'much', 'my', 'need',
  'not', 'of', 'on', 'one', 'or', 'out', 'real', 'really', 'right', 'should',
  'so', 'texas', 'that', 'the', 'their', 'them', 'then', 'there', 'this',
  'to', 'tx', 'up', 'us', 'vs', 'want', 'was', 'what', 'when', 'where',
  'which', 'while', 'who', 'why', 'will', 'with', 'you', 'your',
  '2023', '2024', '2025', '2026',
]);

function tokens(s) {
  return new Set(
    String(s)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .split(' ')
      .filter((w) => w.length > 2 && !STOP.has(w))
  );
}

const LIMIT = 6;

/* Shared words alone put tree posts under drywall posts, because both say
   "central texas" and both say "cost". A topic, taken from the slug, is a much
   stronger signal of what a reader actually wants next. First match wins, so
   the order matters: "tree-roots-foundation" is a tree post. */
const TOPICS = [
  ['tree', /\b(tree|trees|oak|oaks|cedar|juniper|canker|stump|limb|branches|arborist|brush|lot-clearing|wildfire|defensible)\b/],
  ['drywall', /\b(drywall|sheetrock|texture|knockdown|orange-peel|nail-pops)\b/],
  ['paint', /\b(paint|painting|sheen|eggshell|satin|semigloss|primer)\b/],
  ['tax', /\b(tax|taxes|mud|wcad|appraisal|protest|exemption|homestead)\b/],
  ['school', /\b(school|schools|isd)\b/],
  ['builder', /\b(new-construction|builder|builders|lennar|meritage|kb-home|taylor-morrison|weekley|spec|quick-move|incentives)\b/],
  ['selling', /\b(sell|selling|seller|sellers|listing|downsizing|home-worth|cash-buyers|quick-sale|closing)\b/],
  ['relocating', /\b(moving|relocat|relocating|relocators|commute|metrorail|tesla|apple|military|california|bay-area)\b/],
  ['buying', /\b(buy|buying|buyer|buyers|loan|loans|va|first-time|mortgage|programs)\b/],
  ['neighborhood', /\b(neighborhood|neighborhoods|crystal-falls|travisso|bryson|larkspur|northline|deerbrooke|summerlyn|palmera|block-house|rancho-sienna|safe|safest|walkable|pros-and-cons|living)\b/],
  ['market', /\b(market|prices|price|trends|inventory|investment|cost-of-living)\b/],
];

function topicOf(slug) {
  const hit = TOPICS.find(([, re]) => re.test(slug));
  return hit ? hit[0] : null;
}

/* Computed once and reused. getStaticProps runs per page, so without this the
   140 post files would be read 140 times over and the balancing below would
   have nothing global to balance against. */
let cache = null;

function build() {
  const posts = fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const slug = f.replace(/\.md$/, '');
      const { data } = matter(fs.readFileSync(path.join(postsDirectory, f), 'utf8'));
      return {
        slug,
        linkTitle: data.title || data.seoTitle || slug,
        contracting: data.category === 'contracting',
        topic: topicOf(slug),
        words: tokens(`${data.title || ''} ${slug}`),
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  const by = {};
  posts.forEach((p) => { by[p.slug] = p; });

  function overlap(a, b) {
    let n = 0;
    b.words.forEach((w) => { if (a.words.has(w)) n += 1; });
    return n;
  }

  /* No amount of shared wording makes a different topic the right next read.
     "Cedar Park vs Leander Property Tax Rate: What a $450K Home Actually
     Costs You" and "What Drywall Repair Actually Costs in Central Texas" have
     five words in common and nothing else, so topic is a gate rather than a
     weight — anything outside it is only ever filler, below. */
  function sameTopic(a, b) {
    return a.topic === b.topic;
  }

  /* Picking the top six by affinity alone concentrates every link on a handful
     of posts whose titles share common words, and leaves the rest with none —
     which is the problem this is meant to solve. So the candidate score is
     discounted by how many links a post has already been given, and posts are
     processed in a fixed slug order so the result is identical on every build
     and Google is not served a different set each crawl. */
  const chosen = {};
  const inbound = {};
  posts.forEach((p) => { inbound[p.slug] = 0; });

  function take(p, ranked, picks) {
    while (picks.length < LIMIT) {
      let best = null;
      ranked.forEach((x) => {
        if (picks.some((y) => y.slug === x.q.slug)) return;
        const adjusted = x.base - 2 * inbound[x.q.slug];
        if (
          !best
          || adjusted > best.adjusted
          || (adjusted === best.adjusted && x.q.slug.localeCompare(best.x.q.slug) < 0)
        ) {
          best = { x, adjusted };
        }
      });
      if (!best) break;
      picks.push(best.x.q);
      inbound[best.x.q.slug] += 1;
    }
  }

  posts.forEach((p) => {
    const others = posts.filter((q) => q.slug !== p.slug);
    const picks = [];

    // First choice: same topic, ranked by how much wording they share.
    take(
      p,
      others
        .filter((q) => q.contracting === p.contracting && sameTopic(p, q))
        .map((q) => ({ q, base: 6 + 3 * overlap(p, q) })),
      picks
    );

    // Only three posts on the site are about paint, so a paint post runs out
    // of same-topic matches at two links. Rather than leave the slots empty,
    // top up from the same side of the business, nearest wording first — a
    // thinner match, but still plausible reading and still a link the page
    // would not otherwise have.
    if (picks.length < LIMIT) {
      take(
        p,
        others
          .filter((q) => q.contracting === p.contracting)
          .map((q) => ({ q, base: 1 + overlap(p, q) })),
        picks
      );
    }

    chosen[p.slug] = picks.map((q) => ({ slug: q.slug, title: q.linkTitle }));
  });

  cache = chosen;
  return cache;
}

/* Which posts to offer at the bottom of a post.

   The site has ~140 posts and, before this, not one of them linked to another.
   Every post was a dead end: a reader who finished it had nowhere to go but
   back, and Google saw a flat pile of pages with nothing to say which were
   related or which mattered. Sixty-three had a single inbound link. */
export function relatedPosts(slug) {
  return (cache || build())[slug] || [];
}
