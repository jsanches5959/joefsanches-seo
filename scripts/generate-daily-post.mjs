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
    model: "gpt-4o-mini",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `Write a detailed SEO blog post for a Leander TX real estate website. The keyword/topic is: "${keyword}"

Joe Sanches is a licensed Realtor based in Leander, TX. Military veteran. Phone: 512-663-8867. Email: hello@joefsanches.com.

Requirements:
- Write in markdown format (no frontmatter)
- Start with a compelling H1 that includes the keyword
- 600-900 words
- Include practical, specific local info about Leander/Cedar Park/Austin TX area
- Use H2 subheadings to break up sections
- End with a CTA to contact Joe (phone + email)
- No fluff, no filler — direct and useful
- Do not wrap in code blocks`
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
    const content = await generateContent(primary);

    const frontmatter = `---\ntitle: "${primary}"\nslug: ${slug}\ndate: ${now}\n---\n\n${content}\n`;
    fs.writeFileSync(filePath, frontmatter, "utf8");

    used.push({ ...keywordData, slug, generated_at: now });
    console.log(`Created: ${filePath}`);
  }

  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
  fs.writeFileSync(usedPath, JSON.stringify(used, null, 2));

  console.log(`\nDone. Created ${actualCount} post(s).`);
}

main();
