#!/bin/bash
# Joe Sanches SEO - Daily Automation Script
# This script runs the lead hunter and content generator

cd /home/ubuntu/joefsanches-seo

echo "Starting Daily SEO Automation for Joe Sanches..."

# 1. Run Reddit Intelligence to find new leads and keywords
echo "Running Reddit Intelligence Lead Hunter..."
node scripts/reddit-intelligence-production.mjs

# 2. Run the Daily Post Generator (if it exists)
# Note: Assuming generate-daily-post.mjs handles the AI writing
if [ -f "scripts/generate-daily-post.mjs" ]; then
    echo "Generating Daily SEO Content..."
    node scripts/generate-daily-post.mjs
fi

# 2.5 Regenerate sitemap to include new posts
echo "Regenerating Sitemap..."
node scripts/generate-sitemap.mjs

# 3. Commit and Push any new content to GitHub
echo "Syncing updates to GitHub..."
git add .
git commit -m "Daily Automated SEO Update: $(date +'%Y-%m-%d')"
git push origin main

echo "Daily Automation Complete. Joe's site is updated!"
