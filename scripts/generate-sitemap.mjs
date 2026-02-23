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
  const staticPages = [
    { url: "/", lastmod: new Date().toISOString().split("T")[0], priority: "1.0" },
  ];

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
          priority: "0.8",
        };
      });
  } catch (error) {
    console.error("Error reading posts directory:", error);
  }

  // Combine all pages
  const allPages = [...staticPages, ...blogPosts];

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
