#!/usr/bin/env python3
"""
Cleans up blog posts by:
1. Removing "Meta Description" sections that appear as visible page content
2. Removing broken placeholder internal link sections
3. Adding real Related Reading sections to key posts
"""
import os
import re
import sys

POSTS_DIR = "/home/user/joefsanches-seo/content/posts"

# Patterns that mark the start of garbage sections to remove (and everything after)
GARBAGE_SECTION_PATTERNS = [
    r'\n---\n\n### (?:Suggested )?Internal Link',
    r'\n\n### (?:Suggested )?Internal Link',
    r'\n---\n\n## Internal Link',
    r'\n\n## Internal Link',
    r'\n\n\*\*Meta Description',
    r'\n\n### Meta Description',
    r'\n---\n\n### Meta Description',
    r'\n\n---\n\n### Meta Description',
    r'\n---\n### Meta Description',
]

# Real internal links for key posts (slug -> list of (anchor_text, slug) to link to)
RELATED_READING = {
    "leander-vs-cedar-park-property-taxes": [
        ("Leander TX Pros and Cons: An Honest Local Assessment", "leander-tx-pros-and-cons-2026"),
        ("Moving to Leander TX: Complete Relocation Guide", "moving-to-leander-tx-complete-relocation-guide-2026"),
        ("Homestead Exemption in Leander TX: How to Lower Your Tax Bill", "homestead-exemption-leander-tx-2026"),
    ],
    "best-neighborhoods-in-leander-tx-for-families-2026": [
        ("Top-Rated Schools in Leander ISD by Neighborhood", "top-rated-schools-in-leander-isd-neighborhoods"),
        ("Is Leander TX Safe? Crime Rates & What Locals Say", "is-leander-tx-safe-2026"),
        ("VA Loan Homes in Leander TX: A Veteran's Guide", "va-loan-homes-leander-tx"),
    ],
    "where-not-to-live-in-leander-tx-reddit-insights": [
        ("Leander TX Pros and Cons: An Honest Local Assessment", "leander-tx-pros-and-cons-2026"),
        ("Is Leander TX Safe? Crime Rates & What Locals Say", "is-leander-tx-safe-2026"),
        ("Moving to Leander TX: Complete Relocation Guide", "moving-to-leander-tx-complete-relocation-guide-2026"),
    ],
    "leander-tx-real-estate-market-trends-2026": [
        ("Sell My House Fast in Leander TX: What Actually Works in 2026", "sell-my-house-fast-leander"),
        ("Is 2026 a Good Time to Buy a Home in Leander TX?", "is-2026-a-good-time-to-buy-a-home-in-leander-tx"),
        ("Leander vs Cedar Park Real Estate 2026: Which Market Is Better?", "leander-vs-cedar-park-real-estate-market-comparison-2026"),
    ],
    "leander-vs-cedar-park-real-estate-market-comparison-2026": [
        ("Leander vs Cedar Park Property Taxes 2026: Which City Costs More?", "leander-vs-cedar-park-property-taxes"),
        ("Sell My House Fast in Leander TX: What Actually Works in 2026", "sell-my-house-fast-leander"),
        ("Moving to Leander TX: Complete Relocation Guide", "moving-to-leander-tx-complete-relocation-guide-2026"),
    ],
    "is-2026-a-good-time-to-buy-a-home-in-leander-tx": [
        ("Homes for Sale in Leander TX Under $500K: 2026 Guide", "homes-for-sale-leander-tx-under-500k-2026"),
        ("VA Loan Homes in Leander TX: A Veteran's Complete Guide", "va-loan-homes-leander-tx"),
        ("Best Neighborhoods in Leander TX for Families 2026", "best-neighborhoods-in-leander-tx-for-families-2026"),
    ],
    "moving-to-leander-tx-guide-for-relocators": [
        ("Leander vs Cedar Park Property Taxes 2026: Real Numbers", "leander-vs-cedar-park-property-taxes"),
        ("Is Leander TX Safe? Crime Rates & What Locals Say", "is-leander-tx-safe-2026"),
        ("VA Loan Homes in Leander TX: A Veteran's Complete Guide", "va-loan-homes-leander-tx"),
    ],
    "pros-and-cons-of-living-in-crystal-falls-leander": [
        ("Best Neighborhoods in Leander TX for Families 2026", "best-neighborhoods-in-leander-tx-for-families-2026"),
        ("Leander TX Pros and Cons: An Honest Local Assessment", "leander-tx-pros-and-cons-2026"),
        ("Leander vs Cedar Park Property Taxes 2026: Real Numbers", "leander-vs-cedar-park-property-taxes"),
    ],
    "new-construction-homes-for-sale-in-leander-tx-under-500k": [
        ("VA Loan Homes in Leander TX: A Veteran's Complete Guide", "va-loan-homes-leander-tx"),
        ("Homes for Sale in Leander TX Under $500K: 2026 Guide", "homes-for-sale-leander-tx-under-500k-2026"),
        ("Summerlyn Leander TX: Neighborhood Guide", "summerlyn-leander-tx-neighborhood-guide"),
    ],
    "leander-homes-for-sale-quick-closing": [
        ("Sell My House Fast in Leander TX: What Actually Works in 2026", "sell-my-house-fast-leander"),
        ("Leander TX Real Estate Market Trends 2026", "leander-tx-real-estate-market-trends-2026"),
        ("VA Loan Homes in Leander TX: A Veteran's Complete Guide", "va-loan-homes-leander-tx"),
    ],
    "selling-fast-in-leander-texas": [
        ("Sell My House Fast in Leander TX: What Actually Works in 2026", "sell-my-house-fast-leander"),
        ("Leander TX Real Estate Market Trends 2026", "leander-tx-real-estate-market-trends-2026"),
        ("Best Time to Sell a House in Leander TX", "best-time-to-sell-house-in-leander-tx"),
    ],
    "investment-properties-leander-texas": [
        ("Leander TX Real Estate Market Trends 2026", "leander-tx-real-estate-market-trends-2026"),
        ("New Construction in Leander TX 2026: Builders & Prices", "new-construction-in-leander-tx"),
        ("Leander vs Cedar Park Real Estate 2026", "leander-vs-cedar-park-real-estate-market-comparison-2026"),
    ],
    "homes-under-450k-leander-tx": [
        ("Summerlyn Leander TX: Neighborhood Guide", "summerlyn-leander-tx-neighborhood-guide"),
        ("VA Loan Homes in Leander TX: A Veteran's Complete Guide", "va-loan-homes-leander-tx"),
        ("Best Neighborhoods in Leander TX for Families 2026", "best-neighborhoods-in-leander-tx-for-families-2026"),
    ],
    "top-rated-schools-in-leander-isd-neighborhoods": [
        ("Best Neighborhoods in Leander TX for Families 2026", "best-neighborhoods-in-leander-tx-for-families-2026"),
        ("Is Leander ISD a Good School District?", "is-leander-isd-a-good-school-district"),
        ("Moving to Leander TX: Complete Relocation Guide", "moving-to-leander-tx-complete-relocation-guide-2026"),
    ],
    "first-time-home-buyer-programs-leander-texas": [
        ("VA Loan Homes in Leander TX: A Veteran's Complete Guide", "va-loan-homes-leander-tx"),
        ("Homes for Sale in Leander TX Under $500K: 2026 Guide", "homes-for-sale-leander-tx-under-500k-2026"),
        ("Is 2026 a Good Time to Buy a Home in Leander TX?", "is-2026-a-good-time-to-buy-a-home-in-leander-tx"),
    ],
    "cash-buyers-leander-texas-real-estate": [
        ("Sell My House Fast in Leander TX: What Actually Works in 2026", "sell-my-house-fast-leander"),
        ("Leander TX Real Estate Market Trends 2026", "leander-tx-real-estate-market-trends-2026"),
        ("Selling Fast in Leander Texas: What Actually Works", "selling-fast-in-leander-texas"),
    ],
    "best-luxury-neighborhoods-in-leander-texas": [
        ("Pros and Cons of Living in Crystal Falls Leander TX", "pros-and-cons-of-living-in-crystal-falls-leander"),
        ("Best Neighborhoods in Leander TX for Families 2026", "best-neighborhoods-in-leander-tx-for-families-2026"),
        ("Leander TX Pros and Cons: An Honest Local Assessment", "leander-tx-pros-and-cons-2026"),
    ],
    "is-leander-a-wealthy-area": [
        ("Best Luxury Neighborhoods in Leander Texas", "best-luxury-neighborhoods-in-leander-texas"),
        ("Leander TX Pros and Cons: An Honest Local Assessment", "leander-tx-pros-and-cons-2026"),
        ("Leander vs Cedar Park Property Taxes 2026: Real Numbers", "leander-vs-cedar-park-property-taxes"),
    ],
    "is-leander-isd-a-good-school-district": [
        ("Top-Rated Schools in Leander ISD by Neighborhood", "top-rated-schools-in-leander-isd-neighborhoods"),
        ("Best Neighborhoods in Leander TX for Families 2026", "best-neighborhoods-in-leander-tx-for-families-2026"),
        ("Is Leander ISD Better Than Round Rock ISD?", "is-leander-isd-better-than-round-rock-isd"),
    ],
    "is-leander-isd-better-than-round-rock-isd": [
        ("Is Leander ISD a Good School District?", "is-leander-isd-a-good-school-district"),
        ("Top-Rated Schools in Leander ISD by Neighborhood", "top-rated-schools-in-leander-isd-neighborhoods"),
        ("Best Neighborhoods in Leander TX for Families 2026", "best-neighborhoods-in-leander-tx-for-families-2026"),
    ],
    "why-is-leander-isd-closing-schools": [
        ("Is Leander ISD a Good School District?", "is-leander-isd-a-good-school-district"),
        ("Top-Rated Schools in Leander ISD by Neighborhood", "top-rated-schools-in-leander-isd-neighborhoods"),
        ("Best Neighborhoods in Leander TX for Families 2026", "best-neighborhoods-in-leander-tx-for-families-2026"),
    ],
    "what-500k-buys-you-in-cedar-park-vs-leander-2026": [
        ("Leander vs Cedar Park Property Taxes 2026: Real Numbers", "leander-vs-cedar-park-property-taxes"),
        ("Best Neighborhoods in Leander TX for Families 2026", "best-neighborhoods-in-leander-tx-for-families-2026"),
        ("VA Loan Homes in Leander TX: A Veteran's Complete Guide", "va-loan-homes-leander-tx"),
    ],
    "how-mud-taxes-affect-your-total-leander-property-tax-bill": [
        ("Leander vs Cedar Park Property Taxes 2026: Real Numbers", "leander-vs-cedar-park-property-taxes"),
        ("How to Protest Your 2026 Property Taxes in Williamson County", "how-to-protest-your-2026-property-taxes-in-williamson-county-a-step-by-step-guide"),
        ("Homestead Exemption in Leander TX: How to Lower Your Tax Bill", "homestead-exemption-leander-tx-2026"),
    ],
    "homestead-exemption-leander-tx-2026": [
        ("Leander vs Cedar Park Property Taxes 2026: Real Numbers", "leander-vs-cedar-park-property-taxes"),
        ("How to Protest Your 2026 Property Taxes in Williamson County", "how-to-protest-your-2026-property-taxes-in-williamson-county-a-step-by-step-guide"),
        ("2026 Leander Property Tax Rate: Complete Guide", "leander-tx-property-tax-rate-2026"),
    ],
    "how-to-protest-your-2026-property-taxes-in-williamson-county-a-step-by-step-guide": [
        ("Homestead Exemption in Leander TX: How to Lower Your Tax Bill", "homestead-exemption-leander-tx-2026"),
        ("Leander vs Cedar Park Property Taxes 2026: Real Numbers", "leander-vs-cedar-park-property-taxes"),
        ("How MUD Taxes Affect Your Leander Property Tax Bill", "how-mud-taxes-affect-your-total-leander-property-tax-bill"),
    ],
    "the-best-new-construction-communities-in-leander-and-cedar-park-for-2026": [
        ("New Construction in Leander TX 2026: Builders & Prices", "new-construction-in-leander-tx"),
        ("VA Loan Homes in Leander TX: A Veteran's Complete Guide", "va-loan-homes-leander-tx"),
        ("Homes for Sale in Leander TX Under $500K: 2026 Guide", "homes-for-sale-leander-tx-under-500k-2026"),
    ],
    "top-5-family-friendly-neighborhoods-in-cedar-park-tx-2026-edition": [
        ("Best Neighborhoods in Leander TX for Families 2026", "best-neighborhoods-in-leander-tx-for-families-2026"),
        ("Leander vs Cedar Park Real Estate 2026", "leander-vs-cedar-park-real-estate-market-comparison-2026"),
        ("Top-Rated Schools in Leander ISD by Neighborhood", "top-rated-schools-in-leander-isd-neighborhoods"),
    ],
    "top-5-leander-neighborhoods-with-the-lowest-property-tax-rates-in-2026": [
        ("Leander vs Cedar Park Property Taxes 2026: Real Numbers", "leander-vs-cedar-park-property-taxes"),
        ("Homestead Exemption in Leander TX: How to Lower Your Tax Bill", "homestead-exemption-leander-tx-2026"),
        ("Best Neighborhoods in Leander TX for Families 2026", "best-neighborhoods-in-leander-tx-for-families-2026"),
    ],
    "why-leander-has-the-highest-property-tax-rates-in-williamson-county-and-how-to-lower-yours": [
        ("Leander vs Cedar Park Property Taxes 2026: Real Numbers", "leander-vs-cedar-park-property-taxes"),
        ("Homestead Exemption in Leander TX: How to Lower Your Tax Bill", "homestead-exemption-leander-tx-2026"),
        ("How to Protest Your 2026 Property Taxes in Williamson County", "how-to-protest-your-2026-property-taxes-in-williamson-county-a-step-by-step-guide"),
    ],
    "2026-leander-vs-liberty-hill-vs-georgetown-property-tax-comparison": [
        ("Leander vs Cedar Park Property Taxes 2026: Real Numbers", "leander-vs-cedar-park-property-taxes"),
        ("Homestead Exemption in Leander TX: How to Lower Your Tax Bill", "homestead-exemption-leander-tx-2026"),
        ("Moving to Leander TX: Complete Relocation Guide", "moving-to-leander-tx-complete-relocation-guide-2026"),
    ],
    "leander-property-tax-calculator-estimate-your-2026-payments": [
        ("Leander vs Cedar Park Property Taxes 2026: Real Numbers", "leander-vs-cedar-park-property-taxes"),
        ("Homestead Exemption in Leander TX: How to Lower Your Tax Bill", "homestead-exemption-leander-tx-2026"),
        ("How MUD Taxes Affect Your Leander Property Tax Bill", "how-mud-taxes-affect-your-total-leander-property-tax-bill"),
    ],
    "leander-property-tax-trends-2023-vs-2026-what-homeowners-need-to-know": [
        ("Leander vs Cedar Park Property Taxes 2026: Real Numbers", "leander-vs-cedar-park-property-taxes"),
        ("How to Protest Your 2026 Property Taxes in Williamson County", "how-to-protest-your-2026-property-taxes-in-williamson-county-a-step-by-step-guide"),
        ("Sell My House Fast in Leander TX: What Actually Works in 2026", "sell-my-house-fast-leander"),
    ],
    "the-homeowner-s-guide-to-williamson-central-appraisal-district-wcad-protests": [
        ("How to Protest Your 2026 Property Taxes in Williamson County", "how-to-protest-your-2026-property-taxes-in-williamson-county-a-step-by-step-guide"),
        ("Leander vs Cedar Park Property Taxes 2026: Real Numbers", "leander-vs-cedar-park-property-taxes"),
        ("Homestead Exemption in Leander TX: How to Lower Your Tax Bill", "homestead-exemption-leander-tx-2026"),
    ],
    "relocating-to-leander-for-work-housing": [
        ("Moving to Leander TX: Complete Relocation Guide", "moving-to-leander-tx-complete-relocation-guide-2026"),
        ("Best Neighborhoods in Leander TX for Families 2026", "best-neighborhoods-in-leander-tx-for-families-2026"),
        ("VA Loan Homes in Leander TX: A Veteran's Complete Guide", "va-loan-homes-leander-tx"),
    ],
    "moving-to-leander-7-things-every-new-resident-needs-to-know": [
        ("Moving to Leander TX: Complete Relocation Guide", "moving-to-leander-tx-complete-relocation-guide-2026"),
        ("Leander TX Pros and Cons: An Honest Local Assessment", "leander-tx-pros-and-cons-2026"),
        ("Is Leander TX Safe? Crime Rates & What Locals Say", "is-leander-tx-safe-2026"),
    ],
    "a-local-s-guide-to-milburn-park-and-cedar-park-amenities": [
        ("Best Neighborhoods in Leander TX for Families 2026", "best-neighborhoods-in-leander-tx-for-families-2026"),
        ("Leander TX Pros and Cons: An Honest Local Assessment", "leander-tx-pros-and-cons-2026"),
        ("Moving to Leander TX: Complete Relocation Guide", "moving-to-leander-tx-complete-relocation-guide-2026"),
    ],
    "cedar-park-vs-leander-which-austin-suburb-is-right-for-you-in-2026": [
        ("Leander vs Cedar Park Property Taxes 2026: Real Numbers", "leander-vs-cedar-park-property-taxes"),
        ("Leander TX Pros and Cons: An Honest Local Assessment", "leander-tx-pros-and-cons-2026"),
        ("Moving to Leander TX: Complete Relocation Guide", "moving-to-leander-tx-complete-relocation-guide-2026"),
    ],
    "is-the-cedar-park-housing-market-cooling-2026-price-trends-forecast": [
        ("Leander vs Cedar Park Real Estate 2026: Which Market Is Better?", "leander-vs-cedar-park-real-estate-market-comparison-2026"),
        ("Leander TX Real Estate Market Trends 2026", "leander-tx-real-estate-market-trends-2026"),
        ("Sell My House Fast in Leander TX: What Actually Works in 2026", "sell-my-house-fast-leander"),
    ],
    "why-your-home-isn-t-selling-in-leander-5-common-mistakes-in-a-shifting-market": [
        ("Sell My House Fast in Leander TX: What Actually Works in 2026", "sell-my-house-fast-leander"),
        ("Leander TX Real Estate Market Trends 2026", "leander-tx-real-estate-market-trends-2026"),
        ("Best Time to Sell a House in Leander TX", "best-time-to-sell-house-in-leander-tx"),
    ],
    "williamson-county-vs-travis-county-which-side-of-leander-saves-you-more-in-taxes": [
        ("Leander vs Cedar Park Property Taxes 2026: Real Numbers", "leander-vs-cedar-park-property-taxes"),
        ("Homestead Exemption in Leander TX: How to Lower Your Tax Bill", "homestead-exemption-leander-tx-2026"),
        ("Moving to Leander TX: Complete Relocation Guide", "moving-to-leander-tx-complete-relocation-guide-2026"),
    ],
}


def build_related_reading(links):
    lines = ["\n\n---\n\n## Related Reading\n"]
    for anchor, slug in links:
        lines.append(f"- [{anchor}](/posts/{slug})")
    return "\n".join(lines)


def clean_post(content):
    """Remove garbage sections from the bottom of a post."""
    # Find the earliest garbage section marker and truncate there
    earliest_pos = len(content)
    for pattern in GARBAGE_SECTION_PATTERNS:
        match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
        if match and match.start() < earliest_pos:
            earliest_pos = match.start()
    if earliest_pos < len(content):
        content = content[:earliest_pos]
    # Also strip broken joefsanches.com internal links (replace with empty for now)
    content = re.sub(
        r'\[([^\]]+)\]\(https?://(?:www\.)?joefsanches\.com/(?!$)[^\)]+\)',
        r'\1',
        content
    )
    return content.rstrip() + "\n"


def get_slug(filepath):
    filename = os.path.basename(filepath)
    return filename.replace(".md", "")


def process_file(filepath):
    slug = get_slug(filepath)
    with open(filepath, "r") as f:
        content = f.read()

    original = content
    content = clean_post(content)

    # Add Related Reading if we have links for this slug
    if slug in RELATED_READING:
        related = build_related_reading(RELATED_READING[slug])
        # Only add if not already present
        if "## Related Reading" not in content:
            content = content.rstrip() + related + "\n"

    if content != original:
        with open(filepath, "w") as f:
            f.write(content)
        return True
    return False


if __name__ == "__main__":
    changed = 0
    for filename in sorted(os.listdir(POSTS_DIR)):
        if not filename.endswith(".md"):
            continue
        filepath = os.path.join(POSTS_DIR, filename)
        if process_file(filepath):
            changed += 1
            print(f"  fixed: {filename}")
    print(f"\n{changed} files updated.")
