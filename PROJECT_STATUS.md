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

## Conversion audit pass: done
- See CONVERSION_AUDIT.md (12 individual reports). Copy, FAQs, not-for lines, trust and offer sections improved; designed cover tile added.
- Biggest remaining blocker: purchase buttons are disabled everywhere and there is no waitlist.

## Launch scorecard and sales-engine data model: done
- `src/lib/scorecard.ts` scores every product out of 100 across 8 weighted areas and enforces hard gates. A product marked "available" without 80 plus all gates fails the build. Tested by compiling and running the code: all 12 products score 26, none are ready, an unearned launch is blocked.
- Product records now support real previews (click-to-enlarge gallery), cover artwork, author, sources, update date and bonuses. Each section appears only when real data exists.
- See LAUNCH_SCORECARD.md.
- Correction: earlier "syntax scan" lines in this log's history did not actually run. A proper scan and the real data-library test now pass; the full app build on Cloudflare remains the real test of the page components.

## Premium redesign, phases 1 to 4 (hero and homepage): done in code, untested in a browser
- Hero: glass environment, 12-stream knowledge network (AI models, agents, apps and web tools, skills, connectors and plugins, social media, YouTube and video, automation, plus 4 icon-only nodes) with light travelling toward the character's head. Character is about 26% larger. Network simplifies on phones; motion stops for reduced-motion users.
- Homepage: category tiles, full catalogue, accomplish section, five-step journey, honest trust section, final call to action.
- Readability: body grey darkened from #888 to #6B6B68 (about 5:1 contrast). #888 is no longer used for text.
- Not done: photographic glass asset, official brand logos, real product mockups and previews (see ASSETS_NEEDED.md); product-page and /links visual upgrade beyond the colour fix.

## Product page: laptop slideshow and real artwork: done in code, untested in a browser
- Faceless YouTube page now uses its real product box in the hero (overlapping the panel edge) and a laptop-on-hand section after the problem and solution, playing the 12 enabled banners inside the laptop screen. Slide 12 (a named person's analytics) is switched off.
- Each slide shows what kind of evidence it is and its source; a disclaimer sits under the laptop. Controls: previous, pause or play, next, dots. Pauses on hover; autoplay is off for reduced-motion users.
- Real artwork also replaces the generated tile on product cards and /links.
- Other 11 products have no slides yet, so they show no laptop. See SLIDESHOW_GUIDE.md.
- Launch scorecard: the Faceless YouTube product rises from 26 to 30 for having real artwork. Slides are not counted as product previews.

## Product pages: hero box, bundle display and slideshows for every product
- Faceless YouTube hero uses the new box, large enough to straddle the dark gradient and the white page. The bundle image is the product display on cards, /links and the contents section.
- Faceless YouTube contents now match the bundle artwork (10 items).
- The other 11 products each have a 5-slide laptop slideshow generated from their own planned contents (outcome, problem, what is inside, how to use it, before and after). They are labelled "Product overview" and contain no results, testimonials or third-party claims.
- The Faceless YouTube slideshow keeps the 12 supplied evidence banners, each labelled by type and source.

## Next
- Phase 4: D1 schema, constraints and admin duplicate checks.
- Phases 5 to 8: analytics, trending and sharing, payments (provider must support a Nigerian seller), secure delivery.
