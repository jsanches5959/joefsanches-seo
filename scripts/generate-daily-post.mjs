import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

const queue = safeReadJSON(queuePath, []);
const used = safeReadJSON(usedPath, []);

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is not set");
  process.exit(1);
}

if (queue.length === 0) {
  console.log("No keywords left in keyword-queue.json");
  process.exit(0);
}

const next = queue.shift();
fs.mkdirSync(postsDir, { recursive: true });

const primary = next.primary || next.keyword || "";
const slug = next.slug || slugify(primary);
const now = new Date().toISOString();

const prompt = [
  "You are Joe F. Sanches, a Texas real estate agent in Leander.",
  "Write a 900-1400 word SEO blog post targeting the exact keyword below.",
  `Keyword: "${primary}"`,
  "Rules:",
  "- Write for buyers/relocators in Leander / Cedar Park / Austin.",
  "- Include multiple headings and a short FAQ section with 2 questions.",
  "- Avoid made-up hard facts (like exact school ratings).",
  "- End with a local CTA: call/text (replace with your number) and a contact form placeholder.",
].join("\n");

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You write SEO real estate blog posts." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 1100,
  });

  const body = completion.choices?.[0]?.message?.content?.trim() || "";

  const frontmatter = `---\ntitle: ${primary}\nslug: ${slug}\ndate: ${now}\n---\n\n`;

  fs.writeFileSync(path.join(postsDir, `${slug}.md`), frontmatter + body, "utf8");
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2), "utf8");

  used.push({ ...next, slug, generated_at: now });
  fs.writeFileSync(usedPath, JSON.stringify(used, null, 2), "utf8");

  console.log(`Generated post content/posts/${slug}.md`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
