# DIY Arena: project status

## Phase 1 audit (of the code in this repository)
- **Architecture:** Next.js (TypeScript, Tailwind) on Cloudflare Workers via the OpenNext adapter; deploys from GitHub through Cloudflare Workers Builds (`npm run deploy`).
- **Data:** no D1 database yet. Categories and 12 product records live in `src/lib/catalogue.ts`. Slugs and titles are unique; a build-time guard throws on duplicates.
- **Products:** all 12 are published as "coming soon". No product files exist, so nothing is purchasable and no contents are claimed as delivered.
- **Payments:** none. No provider, checkout, webhook, order or entitlement code.
- **Admin:** none. Catalogue changes need a code edit.
- **Storage:** no R2 buckets.
- **Analytics:** none, so no sales, best-seller or trending data exists. Those sections stay hidden rather than showing invented numbers.
- **Known gaps:** placeholder policy pages; product covers are placeholder colour panels; `src/components/ProductSearch.tsx` is unused and can be deleted.

## Phase 2 (homepage and catalogue): done
- Hero with the approved headline and the animated character.
- Complete All Products grid with category filter; cards show artwork, title, description, outcome, planned contents or what you get, price and CTA.
- Trending now, Best sellers and Recently added render only when real data qualifies (currently hidden).
- Explore by category (only categories with products), How it works.
- `/products` has search, category filter and price sorting.
- Nav: Explore, Categories (dropdown), All Products, About, Search.

## Phase 3 (product sales pages): done
- Each of the 12 products has its own headline, lead, problem and solution text, three modules, usage steps and FAQs (`src/lib/funnels.ts`).
- Three page layouts (journey, toolkit, planner) order the sections differently; each product page also has a subtle tint from its own artwork colours.
- Build-time guards now fail the build on duplicate slug, title, headline, problem, solution, SEO description or product FAQ question.
- Still placeholder: product artwork is a colour panel with the title. Real mockups and preview images are needed.

## Phase 3b (sales-funnel upgrade): done
- Product-specific visual languages: studio, tech, academic, business and soft heroes, each built from the product's own artwork colours.
- Hero lists the product's real benefits, price, purchase button and "See everything inside".
- New sections: transformation (before and after), item-by-item "what you get inside" explanations, why it is worth having, and an honest trust section (no invented reviews).
- Sticky purchase bar after the hero, hidden again at the offer; in-page section links.
- Build guard also checks that every contents item has an explanation.
- Not built (needs real assets, database or traffic): real previews and demonstrations, funnel analytics, A/B testing, the admin sales-page editor, verified reviews, real checkout.

## Next
- Phase 4: D1 schema, constraints and admin duplicate checks.
- Phases 5 to 8: analytics, trending and sharing, payments (provider must support a Nigerian seller), secure delivery.
