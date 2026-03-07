import fs from "fs";
import path from "path";

const root = process.cwd();
const queuePath = path.join(root, "keyword-queue.json");
const usedPath = path.join(root, "keyword-used.json");
const postsDir = path.join(root, "content", "posts");

function safeReadJSON(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function slugify(str) {
  return (str || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function main() {
  const count = parseInt(process.argv[2]) || 1;

  let queue = safeReadJSON(queuePath, []);
  let used = safeReadJSON(usedPath, []);

  if (queue.length === 0) {
    console.log("No keywords left in keyword-queue.json");
    process.exit(0);
  }

  fs.mkdirSync(postsDir, { recursive: true });

  const actualCount = Math.min(count, queue.length);
  const pending = [];

  for (let i = 0; i < actualCount; i++) {
    const keywordData = queue.shift();
    const primary = keywordData.primary || keywordData.keyword || "";
    const slug = keywordData.slug || slugify(primary);
    const now = new Date().toISOString();
    const filePath = path.join(postsDir, `${slug}.md`);

    const frontmatter = `---\ntitle: "${primary}"\nslug: ${slug}\ndate: ${now}\n---\n\n<!-- CONTENT NEEDED -->\n`;
    fs.writeFileSync(filePath, frontmatter, "utf8");

    used.push({ ...keywordData, slug, generated_at: now });
    pending.push({ primary, slug, filePath });
  }

  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2), "utf8");
  fs.writeFileSync(usedPath, JSON.stringify(used, null, 2), "utf8");

  console.log(`\nCreated ${actualCount} post skeleton(s). Ask Claude Code to write the content:\n`);
  for (const { primary, filePath } of pending) {
    console.log(`  Keyword: "${primary}"`);
    console.log(`  File:    ${filePath}`);
    console.log(`  Ask me:  "Write the SEO blog post for: ${primary}"`);
    console.log();
  }
}

main();
