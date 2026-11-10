import type { MetadataRoute } from "next";
import { getCategories, getProducts, getProductsByCategory } from "@/lib/catalogue";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string) => ({ url: `${site.url}${path}` });
  return [
    u("/"), u("/products"), u("/about"), u("/faq"),
    ...getCategories().filter((c) => getProductsByCategory(c.slug).length > 0).map((c) => u(`/${c.slug}`)),
    ...getProducts().map((p) => u(`/products/${p.slug}`)), // published products only
  ];
}
