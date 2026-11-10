# DIY Arena: project status

## Built and deployed (Cloudflare Workers via OpenNext)
- Home page with animated hero character, categories, featured products, how it works.
- Main navigation with a Categories dropdown (desktop hover/click, mobile accordion, Escape and outside-click close, empty categories hidden).
- `/products` with search, 8 category pages, `/links` mobile directory, About, FAQ.
- 12 product pages with unique slugs, all marked "coming soon" (nothing is purchasable yet).
- Sitemap and robots; canonical and Open Graph metadata per product.

## Not built yet
- Cloudflare D1 (catalogue is still `src/lib/catalogue.ts`), R2, admin dashboard and login.
- Payments, webhooks, secure downloads, transactional email, reviews.
- Real product files and product mockup artwork (covers are placeholder colour panels).
- Policy pages (privacy, terms, refund, contact are placeholders), cart, Product structured data.

## Rules in force
- A product only becomes purchasable when `availability` is "available" and a `checkoutUrl` exists.
- Contents listed on coming-soon pages are planned, not delivered.

## Next
1. D1 schema and migrations, catalogue read from D1.
2. Admin login and product/category management.
3. R2 uploads, then payments and secure delivery.
