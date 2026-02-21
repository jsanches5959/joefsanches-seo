import fs from "fs";
import path from "path";
import { get_reddit_posts } from "/opt/.manus/.sandbox-runtime/data_api"; // Assuming this path for the Reddit API

const root = process.cwd();
const queuePath = path.join(root, "keyword-queue.json");

const subredditsToMonitor = ["Leander", "Austin", "CedarPark", "RealEstate"];
const keywordsToMonitor = [
  "moving to leander", "best realtor in austin", "property taxes",
  "real estate agent", "buying home", "selling home", "new construction",
  "neighborhoods", "schools", "mortgage", "first time home buyer"
];

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

async function main() {
  let keywordQueue = safeReadJSON(queuePath, []);
  const existingKeywords = new Set(keywordQueue.map(item => item.primary.toLowerCase()));

  for (const subreddit of subredditsToMonitor) {
    console.log(`Monitoring r/${subreddit}...`);
    try {
      const result = await get_reddit_posts({
        subreddit: subreddit,
        limit: 50 // Fetch a reasonable number of recent posts
      });

      if (result && result.posts) {
        for (const postWrapper of result.posts) {
          const post = postWrapper.data;
          const title = post.title || "";
          const selftext = post.selftext || "";
          const content = `${title} ${selftext}`.toLowerCase();

          // Check if post contains any of the keywords and is a question
          const isQuestion = title.includes("?") || selftext.includes("?") ||
                             title.includes("how to") || selftext.includes("how to") ||
                             title.includes("what is") || selftext.includes("what is");

          const hasKeyword = keywordsToMonitor.some(keyword => content.includes(keyword));

          if (isQuestion && hasKeyword) {
            const questionAsKeyword = title.trim();
            if (questionAsKeyword && !existingKeywords.has(questionAsKeyword.toLowerCase())) {
              keywordQueue.push({ primary: questionAsKeyword });
              existingKeywords.add(questionAsKeyword.toLowerCase());
              console.log(`Added new question from r/${subreddit}: "${questionAsKeyword}"`);
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error monitoring r/${subreddit}:`, error);
    }
  }

  fs.writeFileSync(queuePath, JSON.stringify(keywordQueue, null, 2), "utf8");
  console.log("Reddit monitoring complete. Keyword queue updated.");
}

main().catch((err) => {
  console.error("Reddit Intelligence script failed:", err);
  process.exit(1);
});
