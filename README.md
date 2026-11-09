# DIY Arena

Knowledge. Tools. Resources. Do it yourself.

Runs on Cloudflare Workers with static assets. No database or payments yet.

## Run locally
    npm install
    npm run dev

## Structure
- `public/` static pages and styles
- `public/data/catalogue.json` the single product catalogue every page reads
- `src/worker.js` serves `/api/products` and `/products/<slug>`

Never commit secrets. Use `.dev.vars` locally (git-ignored) and Cloudflare secrets in production.
