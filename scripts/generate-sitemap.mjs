import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pagesDir = path.join(root, "pages");
const postsDir = path.join(root, "content", "posts");
const publicDir = path.join(root, "public");

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://joefsanches.com";

/* This used to be three hand-written arrays of URLs. Every new page had to be
   remembered here or it never reached the sitemap, and /guides is exactly the
   kind of page that gets forgotten. The routes are now read off the filesystem,
   the same way Next.js builds them, so the sitemap cannot fall behind. */

// Pages that exist but should not be in a sitemap.
const EXCLUDE = new Set(["/404", "/500", "/_app", "/_document", "/leads"]);

/* lastmod matters: a sitemap that claims every page changed today, every time
   it is regenerated, is telling Google something plainly untrue, and Google
   responds by ignoring the field. The last commit that touched the file is the
   honest answer. Falls back to the file's mtime outside a git checkout. */
function lastModified(file) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", file], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) return out;
  } catch (e) {
    // Not a git checkout, or the file is untracked.
  }
  return fs.statSync(file).mtime.toISOString().split("T")[0];
}

/* Priority is a hint about relative importance within the site. The service
   and money pages lead, then the hubs, then the guides. */
function priorityFor(url) {
  if (url === "/") return "1.0";
  if (url.startsWith("/services/")) return "0.9";
  if (url.startsWith("/posts/")) return "0.7";
  if (url.startsWith("/neighborhoods/")) return "0.8";
  if (/^\/(tree-removal-leander-tx|government|property-tax-leander-tx|new-construction-leander-tx)$/.test(url)) return "0.95";
  if (/^\/(lennar|kb-home|taylor-morrison|david-weekley|meritage)/.test(url)) return "0.8";
  if (/^\/(credentials|moving-to-leander-tx|leander-home-buyer-guide)$/.test(url)) return "0.85";
  return "0.9";
}

// Top-level and nested .js routes, minus dynamic ones and the API directory.
function staticRoutes(dir = pagesDir, prefix = "") {
  const found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "api") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...staticRoutes(full, `${prefix}/${entry.name}`));
      continue;
    }
    if (!entry.name.endsWith(".js")) continue;
    if (entry.name.startsWith("[")) continue; // dynamic; expanded from content below
    const name = entry.name.replace(/\.js$/, "");
    const url = name === "index" ? prefix || "/" : `${prefix}/${name}`;
    if (EXCLUDE.has(url)) continue;
    // A page whose only job is to redirect is not a destination. /sanches-group
    // is a permanent redirect to the homepage and was being listed as a URL to
    // index, which asks Google to crawl something it will only be bounced from.
    if (/\bredirect:\s*\{/.test(fs.readFileSync(full, "utf8"))) continue;
    found.push({ url, file: full });
  }
  return found;
}

// The dynamic routes, expanded from the content that drives them.
function fromJson(jsonName, routePrefix) {
  const file = path.join(root, "content", jsonName);
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")).map((item) => ({
      url: `${routePrefix}/${item.slug}`,
      file,
    }));
  } catch (e) {
    console.error(`Could not read ${jsonName}: ${e.message}`);
    return [];
  }
}

function fromPosts() {
  try {
    return fs
      .readdirSync(postsDir)
      .filter((f) => f.endsWith(".md"))
      // A post whose front matter points its canonical somewhere else is not
      // the URL we want indexed, so listing it here would contradict the page.
      .filter((f) => !/^canonicalTo:/m.test(fs.readFileSync(path.join(postsDir, f), "utf8")))
      .map((f) => ({
        url: `/posts/${f.replace(/\.md$/, "")}`,
        file: path.join(postsDir, f),
      }));
  } catch (e) {
    console.error(`Error reading posts: ${e.message}`);
    return [];
  }
}

const pages = [
  ...staticRoutes(),
  ...fromJson("neighborhoods.json", "/neighborhoods"),
  ...fromJson("services.json", "/services"),
  ...fromPosts(),
]
  .map((p) => ({ url: p.url, lastmod: lastModified(p.file), priority: priorityFor(p.url) }))
  .sort((a, b) => Number(b.priority) - Number(a.priority) || a.url.localeCompare(b.url));

const seen = new Set();
const unique = pages.filter((p) => !seen.has(p.url) && seen.add(p.url));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${unique
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

const sitemapPath = path.join(publicDir, "sitemap.xml");
fs.writeFileSync(sitemapPath, xml, "utf8");
console.log(`✅ Sitemap generated: ${sitemapPath} (${unique.length} URLs)`);
