import fs from "fs";
import path from "path";
import https from "https";

const root = process.cwd();
const queuePath = path.join(root, "keyword-queue.json");
const alertsPath = path.join(root, "reddit-alerts.json");

// COMBAT MODE: Aggressive subreddit monitoring for immediate leads
const subredditsToMonitor = [
  "Leander", "Austin", "CedarPark", "RealEstate", 
  "austinjobs", "TeslaLounge", "MovingToAustin", 
  "FirstTimeHomeBuyer", "PersonalFinance", "Austin_Housing"
];

// HIGH-INTENT KEYWORDS: Focus on people who are READY to buy/sell NOW
const keywordsToMonitor = [
  // URGENT SIGNALS
  "quick move-in", "relocating to austin", "tesla jobs", "selling fast",
  "need house", "urgent", "asap", "this week", "this month",
  // MONEY SIGNALS
  "budget", "under 450k", "affordable", "price drop", "negotiation",
  "cash buyer", "quick sale", "sell my house", "investment property",
  // RELOCATION SIGNALS
  "relocating for work", "moving to leander", "new job austin",
  "giga texas", "spacex", "oracle", "apple", "google",
  // DESPERATION SIGNALS (These are your GOLD leads)
  "help", "advice", "first time", "lost", "confused", "overwhelmed"
];

function safeReadJSON(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

// Fetch Reddit posts using standard HTTPS API
function fetchRedditPosts(subreddit, limit = 100) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "www.reddit.com",
      path: `/r/${subreddit}/new.json?limit=${limit}`,
      method: "GET",
      headers: {
        "User-Agent": "Joe-Sanches-SEO-Bot/1.0 (Real Estate Lead Hunter)",
      },
    };

    https.get(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve(json.data?.children || []);
        } catch (e) {
          console.error(`Error parsing Reddit response for r/${subreddit}:`, e);
          resolve([]);
        }
      });
    }).on("error", (e) => {
      console.error(`Error fetching r/${subreddit}:`, e);
      resolve([]);
    });
  });
}

// COMBAT MODE: Score leads by urgency
function scoreLeadUrgency(title, content) {
  let score = 0;
  const lowerContent = content.toLowerCase();
  
  // URGENT signals = highest priority
  if (lowerContent.includes("asap") || lowerContent.includes("urgent") || lowerContent.includes("this week")) score += 100;
  if (lowerContent.includes("help") || lowerContent.includes("advice")) score += 50;
  if (lowerContent.includes("tesla") || lowerContent.includes("giga")) score += 75;
  if (lowerContent.includes("under 450k") || lowerContent.includes("budget")) score += 60;
  if (lowerContent.includes("selling") || lowerContent.includes("buy")) score += 40;
  
  return score;
}

async function main() {
  let keywordQueue = safeReadJSON(queuePath, []);
  let alerts = safeReadJSON(alertsPath, []);
  const existingKeywords = new Set(keywordQueue.map(item => item.primary.toLowerCase()));
  
  console.log("🚨 COMBAT MODE ACTIVATED: Hunting for high-intent leads...");

  for (const subreddit of subredditsToMonitor) {
    console.log(`🔍 Scanning r/${subreddit}...`);
    try {
      const posts = await fetchRedditPosts(subreddit, 100);

      for (const postWrapper of posts) {
        const post = postWrapper.data;
        const title = post.title || "";
        const selftext = post.selftext || "";
        const content = `${title} ${selftext}`.toLowerCase();
        const author = post.author || "unknown";

        // COMBAT MODE: Look for ANY question + ANY money/relocation signal
        const isQuestion = title.includes("?") || 
                           content.includes("how") || 
                           content.includes("help") ||
                           content.includes("advice") ||
                           content.includes("need");

        const hasKeyword = keywordsToMonitor.some(keyword => content.includes(keyword));
        const urgencyScore = scoreLeadUrgency(title, content);

        if (isQuestion && hasKeyword && urgencyScore > 30) {
          // HIGH-PRIORITY ALERT
          const alert = {
            timestamp: new Date().toISOString(),
            subreddit: subreddit,
            author: author,
            title: title,
            urgencyScore: urgencyScore,
            url: `https://reddit.com/r/${subreddit}/comments/${post.id}`,
            preview: content.substring(0, 150)
          };
          
          alerts.push(alert);
          console.log(`🎯 ALERT! Urgency ${urgencyScore}: "${title}" from r/${subreddit}`);
          
          // Also add to keyword queue for content generation
          const questionAsKeyword = title.trim();
          if (questionAsKeyword && !existingKeywords.has(questionAsKeyword.toLowerCase())) {
            keywordQueue.push({ primary: questionAsKeyword });
            existingKeywords.add(questionAsKeyword.toLowerCase());
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error monitoring r/${subreddit}:`, error);
    }
  }

  // Keep only the 50 most recent alerts
  alerts = alerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 50);

  fs.writeFileSync(queuePath, JSON.stringify(keywordQueue, null, 2), "utf8");
  fs.writeFileSync(alertsPath, JSON.stringify(alerts, null, 2), "utf8");
  
  console.log(`✅ COMBAT MODE COMPLETE: Found ${alerts.length} high-intent leads!`);
  console.log(`📧 Check reddit-alerts.json for immediate outreach opportunities.`);
}

main().catch((err) => {
  console.error("Reddit Intelligence script failed:", err);
  process.exit(1);
});
