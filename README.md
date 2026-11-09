# DIY Arena

Knowledge. Tools. Resources. Do it yourself.

Next.js (TypeScript, Tailwind) running on Cloudflare Workers via the OpenNext adapter.

- Products live in `src/lib/catalogue.ts` (interim; moves to Cloudflare D1 in Milestone 8).
- Product copy comes from the PRD and needs approval before launch.
- No payments, admin, downloads or email yet. The buy button stays disabled until a `checkoutUrl` is set.
- Never commit secrets. Use `.dev.vars` locally and Cloudflare secrets in production.
