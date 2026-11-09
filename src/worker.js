import catalogue from "../public/data/catalogue.json";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // One central catalogue feeds every page.
    if (url.pathname === "/api/products") {
      return Response.json(catalogue, {
        headers: { "cache-control": "public, max-age=300" },
      });
    }

    // /products/<slug> -> shared product page, 404 for unknown slugs.
    const match = url.pathname.match(/^\/products\/([a-z0-9-]+)\/?$/);
    if (match) {
      const exists = catalogue.products.some((p) => p.slug === match[1]);
      if (!exists) return new Response("Product not found", { status: 404 });
      return env.ASSETS.fetch(new Request(new URL("/product", url), request));
    }

    return env.ASSETS.fetch(request);
  },
};
