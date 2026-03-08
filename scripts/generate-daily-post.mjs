import fs from "fs";
import path from "path";
import OpenAI from "openai";

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

async function generateContent(keyword) {
  const client = new OpenAI();
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    max_tokens: 2048,
    messages: [
      {
        role: "system",
        content: "You are an expert SEO content strategist and real estate writer specializing in the Leander, Texas market. Your goal is to create high-quality, authoritative, and helpful content that ranks well on Google and provides genuine value to potential homebuyers and sellers."
      },
      {
        role: "user",
        content: `Write a comprehensive, high-quality SEO blog post for Joe Sanches, a licensed Realtor and military veteran based in Leander, TX.

Topic/Primary Keyword: "${keyword}"

Target Audience: Homebuyers, sellers, and residents in Leander, Cedar Park, and the Greater Austin area.

Joe's Contact Info (Include in CTA at the end):
- Phone: 512-663-8867
- Email: hello@joefsanches.com
- Website: joefsanches.com

Requirements:
1. Format: Markdown (no frontmatter).
2. Structure:
   - Start with a compelling, SEO-friendly H1 title that naturally includes the primary keyword.
   - Use descriptive H2 and H3 subheadings to organize the content.
   - Use bullet points or numbered lists where appropriate for readability.
3. Content Quality:
   - Length: 800-1200 words.
   - Depth: Provide specific, actionable information. Avoid generic real estate advice. Include local context, specific neighborhood names (e.g., Crystal Falls, Travisso, Larkspur), local school info (Leander ISD), and current market trends.
   - SEO: Naturally integrate the primary keyword and related secondary keywords throughout the text. Focus on "Search Intent"—what is the user looking for when they search for this?
   - Tone: Professional, authoritative, yet approachable and helpful.
4. Specific Instructions for this post:
   - Research and include accurate details related to the topic. If the topic is about property taxes, mention Williamson County (WilCo) or Travis County where applicable.
   - Highlight Joe's unique perspective as a military veteran and local expert.
5. CTA: End with a strong Call to Action, encouraging readers to contact Joe Sanches for a personalized consultation or market analysis.

DO NOT use generic filler text. DO NOT wrap the response in code blocks.`
      }
    ]
  });
  return response.choices[0].message.content;
}

async function main() {
  const count = parseInt(process.argv[2]) || 1;

  let queue = safeReadJSON(queuePath, []);
  let used = safeReadJSON(usedPath, []);

  if (queue.length === 0) {
    console.log("No keywords left in keyword-queue.json");
    process.exit(0);
  }

  fs.mkdirSync(postsDir, { recursive: true });

  const actualCount = Math.min(count, queue.length);

  for (let i = 0; i < actualCount; i++) {
    const keywordData = queue.shift();
    const primary = keywordData.primary || keywordData.keyword || "";
    const slug = keywordData.slug || slugify(primary);
    const now = new Date().toISOString();
    const filePath = path.join(postsDir, `${slug}.md`);

    console.log(`Generating post for: "${primary}"...`);
    try {
      const content = await generateContent(primary);

      const frontmatter = `---\ntitle: "${primary}"\nslug: ${slug}\ndate: ${now}\n---\n\n${content}\n`;
      fs.writeFileSync(filePath, frontmatter, "utf8");

      used.push({ ...keywordData, slug, generated_at: now });
      console.log(`Successfully generated (${i + 1}/${actualCount}): ${filePath}`);
    } catch (error) {
      console.error(`Error generating post for "${primary}":`, error.message);
      // Put the keyword back in the queue if it failed
      queue.unshift(keywordData);
      break;
    }
  }

  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
  fs.writeFileSync(usedPath, JSON.stringify(used, null, 2));

  console.log(`\nBatch generation complete.`);
}

main();
