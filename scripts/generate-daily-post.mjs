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
  "You are Joe F. Sanches, a highly knowledgeable and trusted Texas real estate agent specializing in Leander, Cedar Park, and the greater Austin area.",
  "Write a comprehensive, SEO-optimized blog post (1000-1500 words) targeting the exact keyword below. The goal is to establish Joe as the local authority for real estate in these areas.",
  `Keyword: "${primary}"`, // Use the primary keyword for the post
  "Rules:",
  "- Focus on providing valuable, hyper-local insights for potential buyers, sellers, and relocators in Leander, Cedar Park, and Austin.",
  "- Incorporate local landmarks, community features, market trends, and unique aspects of the area relevant to the keyword.",
  "- Structure the post with clear, descriptive headings (H1, H2, H3) to improve readability and SEO.",
  "- Include a short, informative FAQ section with 2-3 common questions related to the topic.",
  "- Avoid generating fictional statistics or specific school ratings. Focus on general benefits and local knowledge.",
  "- Conclude with a strong, local Call to Action (CTA) that encourages readers to contact Joe F. Sanches for personalized real estate assistance. Mention calling/texting (512) XXX-XXXX and visiting joefsanches.com for a contact form.",
  "- Write in an engaging, informative, and trustworthy tone, reflecting Joe's expertise.",
  "- Suggest opportunities for internal linking to other relevant posts on the blog (e.g., 'Learn more about X in our guide to Y').",
].join("\n");

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You write SEO real estate blog posts." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 1500, // Increased max_tokens to accommodate 1000-1500 words
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
