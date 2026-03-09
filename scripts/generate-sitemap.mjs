import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const postsDir = path.join(root, "content", "posts");
const publicDir = path.join(root, "public");

// Base URL - update this to your actual domain
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://joefsanches.com";

function generateSitemap() {
  const today = new Date().toISOString().split("T")[0];

  // Hub pages — highest priority
  const hubPages = [
    { url: "/", priority: "1.0" },
    { url: "/homes-for-sale-in-leander-tx", priority: "0.9" },
    { url: "/property-tax-leander-tx", priority: "0.95" },
    { url: "/new-construction-leander-tx", priority: "0.95" },
    { url: "/leander-neighborhoods", priority: "0.9" },
    { url: "/leander-isd-schools", priority: "0.9" },
    { url: "/sell-my-house-leander-tx", priority: "0.9" },
    { url: "/buy-home-leander-tx", priority: "0.9" },
    { url: "/leander-real-estate-market-2026", priority: "0.9" },
    { url: "/moving-to-leander-tx", priority: "0.85" },
    { url: "/whats-my-home-worth", priority: "0.9" },
    { url: "/leander-home-buyer-guide", priority: "0.85" },
  ].map(p => ({ ...p, lastmod: today }));

  // Community pages
  const communityPages = [
    "/new-construction-crystal-falls",
    "/new-construction-bryson",
    "/new-construction-northline",
    "/new-construction-larkspur",
    "/new-construction-deerbrooke",
    "/new-construction-travisso",
  ].map(url => ({ url, lastmod: today, priority: "0.85" }));

  // Builder pages
  const builderPages = [
    "/lennar-homes-leander-tx",
    "/kb-home-leander-tx",
    "/taylor-morrison-leander-tx",
    "/david-weekley-leander-cedar-park",
    "/meritage-homes-leander-tx",
  ].map(url => ({ url, lastmod: today, priority: "0.8" }));

  // Neighborhood pages — auto-generate from neighborhoods.json
  let neighborhoodPages = [];
  try {
    const nhFile = path.join(root, "content", "neighborhoods.json");
    const neighborhoods = JSON.parse(fs.readFileSync(nhFile, "utf8"));
    neighborhoodPages = neighborhoods.map(n => ({
      url: `/neighborhoods/${n.slug}`,
      lastmod: today,
      priority: "0.8",
    }));
  } catch (e) {
    console.error("Could not read neighborhoods.json:", e.message);
  }

  // Read all blog posts
  let blogPosts = [];
  try {
    const files = fs.readdirSync(postsDir);
    blogPosts = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const filePath = path.join(postsDir, file);
        const stat = fs.statSync(filePath);
        const slug = file.replace(".md", "");
        return {
          url: `/posts/${slug}`,
          lastmod: stat.mtime.toISOString().split("T")[0],
          priority: "0.7",
        };
      });
  } catch (error) {
    console.error("Error reading posts directory:", error);
  }

  // Combine all pages
  const allPages = [...hubPages, ...communityPages, ...builderPages, ...neighborhoodPages, ...blogPosts];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  // Write to public directory
  const sitemapPath = path.join(publicDir, "sitemap.xml");
  fs.writeFileSync(sitemapPath, xml, "utf8");
  console.log(`✅ Sitemap generated: ${sitemapPath}`);
}

generateSitemap();
