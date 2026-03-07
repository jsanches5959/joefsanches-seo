import fs from "fs";
import path from "path";
import Anthropic from "@anthropic-ai/sdk";
import { execSync } from "child_process";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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

async function generatePost(keywordData, queue, used) {
  const primary = keywordData.primary || keywordData.keyword || "";
  const slug = keywordData.slug || slugify(primary);
  const now = new Date().toISOString();

  console.log(`Generating post for: ${primary}...`);

  const prompt = [
    "You are Joe F. Sanches, a highly knowledgeable and trusted Texas real estate agent specializing in Leander, Cedar Park, and the greater Austin area.",
    "Your task is to write a comprehensive, high-quality, and SEO-optimized blog post (minimum 1200 words, ideally 1500+) targeting the exact keyword below. The primary goal is to establish Joe as the undeniable local authority for real estate in these areas, driving organic traffic and generating leads.",
    `Keyword: "${primary}"`,
    "Rules for High-Quality SEO Content:",
    "- **Keyword Integration:** Naturally weave the primary keyword and relevant long-tail variations throughout the article, especially in headings and the first paragraph. Maintain a natural keyword density without stuffing.",
    "- **Hyper-Local Focus:** Provide deep, valuable, and hyper-local insights for potential buyers, sellers, and relocators in Leander, Cedar Park, and Austin. Mention specific neighborhoods, schools (without ratings), local businesses, and community events where relevant.",
    "- **Unique Perspective:** Offer fresh, unique angles and actionable advice that goes beyond generic real estate information. Think about what only a local expert like Joe would know.",
    "- **Structure and Readability:** Use clear, descriptive headings (H1 for title, H2s for main sections, H3s for sub-sections) to improve readability and SEO. Use bullet points or numbered lists for easy digestion of information.",
    "- **FAQ Section:** Include a concise, informative FAQ section with 3-5 common questions related to the topic, providing direct and helpful answers.",
    "- **Avoid Fictional Data:** DO NOT generate fictional statistics, specific school ratings, or market predictions. Focus on general benefits, current market trends, and local knowledge.",
    "- **Strong Call to Action (CTA):** Conclude with a compelling, local Call to Action that encourages readers to contact Joe F. Sanches for personalized real estate assistance. Explicitly mention calling/texting (512) XXX-XXXX and visiting joefsanches.com for a contact form.",
    "- **Tone:** Write in an engaging, informative, trustworthy, and authoritative tone, reflecting Joe's expertise and approachability.",
    "- **Internal Linking:** Suggest at least 2-3 opportunities for internal linking to other relevant posts on the blog. Provide specific anchor text and placeholder URLs (e.g., 'Learn more about [Topic] in our guide to [Related Post Title]').",
    "- **Meta Description Suggestion:** Provide a concise (150-160 characters) meta description at the end of the post, optimized for the primary keyword and encouraging clicks.",
  ].join("\n");

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: [
      { role: "user", content: prompt },
    ],
  });

  const body = message.content?.[0]?.text?.trim() || "";
  const frontmatter = `---\ntitle: ${primary}\nslug: ${slug}\ndate: ${now}\n---\n\n`;

  fs.writeFileSync(path.join(postsDir, `${slug}.md`), frontmatter + body, "utf8");

  used.push({ ...keywordData, slug, generated_at: now });
  return true;
}

async function main() {
  const count = parseInt(process.argv[2]) || 1;
  console.log(`Requested to generate ${count} post(s).`);

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY is not set");
    process.exit(1);
  }

  let queue = safeReadJSON(queuePath, []);
  let used = safeReadJSON(usedPath, []);

  if (queue.length === 0) {
    console.log("No keywords left in keyword-queue.json");
    process.exit(0);
  }

  fs.mkdirSync(postsDir, { recursive: true });

  const actualCount = Math.min(count, queue.length);
  for (let i = 0; i < actualCount; i++) {
    const next = queue.shift();
    await generatePost(next, queue, used);
    console.log(`Successfully generated (${i + 1}/${actualCount})`);
  }

  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2), "utf8");
  fs.writeFileSync(usedPath, JSON.stringify(used, null, 2), "utf8");

  console.log("Batch generation complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
