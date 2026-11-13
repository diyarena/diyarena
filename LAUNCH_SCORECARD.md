# DIY Arena Product Launch Scorecard

A product may only be marked **available** (purchasable) when it scores **80/100 or more** and passes every gate below. The build fails if a product is marked available without earning it (`src/lib/scorecard.ts`, enforced in `src/lib/catalogue.ts`).

## Hard gates (must all pass, regardless of score)
- All files created
- Checkout configured
- Purchase and download tested end to end
- Refund policy published

## Scoring (100 points)
| Area | Weight | What earns the points |
|---|---:|---|
| Clear customer problem | 15 | Problem described in a full sentence (3); Three recognisable situations (4); Target audience defined (3); Who it is not for defined (2); Practical outcome stated (3) |
| Product quality and usefulness | 20 | All planned files created (8, owner judgement); Files reviewed against the page, item by item (6, owner judgement); Tried on a real task (6, owner judgement) |
| Strength of sales copy | 15 | Headline, intro, problem and solution written for this product (4); Every contents item explained (3); No guarantee or hype wording (2); Copy reviewed and approved by the owner (6, owner judgement) |
| Product previews and presentation | 10 | Three or more real preview images (6); Real cover artwork uploaded (4) |
| Offer and pricing | 10 | Price and currency set (2); Price validated with real buyers (4, owner judgement); Refund policy published (2); Delivery details stated (file format and updates) (2) |
| Trust and credibility | 15 | Author and relevant experience stated (4); Sources or official resources cited (3); Content update date shown (2); Format and software requirements stated (3); Support contact published (3) |
| Checkout and delivery experience | 10 | Checkout configured for this product (4); Paid purchase and secure download tested end to end (6, owner judgement) |
| Mobile experience | 5 | Checked on a real phone (5, owner judgement) |

Items marked "owner judgement" are set by you in each product's `review` flags. They start false and the system never sets them. Quality and tested-on-a-real-task cannot be measured by software.

## Current scores (snapshot from the real code, run on 2026-11-13)
| Product | Score | Ready |
|---|---:|---|
| Faceless YouTube Channel Launch System | 26/100 | no |
| Fully Funded Scholarship Research & Application Toolkit | 26/100 | no |
| Remote Job Search Toolkit | 26/100 | no |
| AI Productivity Toolkit | 26/100 | no |
| Digital Product Creation & Launch Blueprint | 26/100 | no |
| Budget International Travel Planner | 26/100 | no |
| Canva Brand Identity Starter Kit | 26/100 | no |
| AI Video Content Creation Toolkit | 26/100 | no |
| Small Business Digital Marketing Toolkit | 26/100 | no |
| Personal Productivity & Focus System | 26/100 | no |
| Study Abroad Preparation Planner | 26/100 | no |
| AI Business Automation Starter Kit | 26/100 | no |

All 12 products currently score the same, because the sales copy is complete for each while every real-world item (files, previews, checkout, policies) is still missing.

### Breakdown (same for every product today)
| Area | Earned | Weight |
|---|---:|---:|
| Clear customer problem | 15 | 15 |
| Product quality and usefulness | 0 | 20 |
| Strength of sales copy | 9 | 15 |
| Product previews and presentation | 0 | 10 |
| Offer and pricing | 2 | 10 |
| Trust and credibility | 0 | 15 |
| Checkout and delivery experience | 0 | 10 |
| Mobile experience | 0 | 5 |

### Still missing, largest first
- 8 pts: All planned files created (Product quality and usefulness) [owner judgement]
- 6 pts: Files reviewed against the page, item by item (Product quality and usefulness) [owner judgement]
- 6 pts: Tried on a real task (Product quality and usefulness) [owner judgement]
- 6 pts: Copy reviewed and approved by the owner (Strength of sales copy) [owner judgement]
- 6 pts: Three or more real preview images (Product previews and presentation)
- 6 pts: Paid purchase and secure download tested end to end (Checkout and delivery experience) [owner judgement]
- 5 pts: Checked on a real phone (Mobile experience) [owner judgement]
- 4 pts: Real cover artwork uploaded (Product previews and presentation)
- 4 pts: Price validated with real buyers (Offer and pricing) [owner judgement]
- 4 pts: Author and relevant experience stated (Trust and credibility)
- 4 pts: Checkout configured for this product (Checkout and delivery experience)
- 3 pts: Sources or official resources cited (Trust and credibility)
- 3 pts: Format and software requirements stated (Trust and credibility)
- 3 pts: Support contact published (Trust and credibility)
- 2 pts: Refund policy published (Offer and pricing)
- 2 pts: Delivery details stated (file format and updates) (Offer and pricing)
- 2 pts: Content update date shown (Trust and credibility)

### One way to reach 80
Files created (8), reviewed (6), tried on a real task (6), copy approved (6), 3 previews (6), cover artwork (4), checkout configured (4), purchase and download tested (6), price validated (4), refund policy published (2), support contact (3) lifts a product from 26 to 81. Publishing the refund policy is a gate, so it is not optional.

## How to use it
1. Finish a product's real files and previews.
2. Set its `review` flags honestly in `src/lib/catalogue.ts` after you have actually done each check.
3. Only then change its `availability` to "available" and add its `checkoutUrl`. If anything is missing, the build error lists exactly what.
When the admin dashboard exists, this scorecard moves there.
