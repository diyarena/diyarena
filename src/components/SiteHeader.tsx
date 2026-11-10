import Image from "next/image";
import Link from "next/link";
import { getCategories, getProducts } from "@/lib/catalogue";
import { SiteNav, type MenuCategory } from "./SiteNav";

export function SiteHeader() {
  const products = getProducts();
  const categories: MenuCategory[] = getCategories()
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      products: products
        .filter((p) => p.category === c.slug)
        .map((p) => ({ slug: p.slug, title: p.title, soon: p.availability === "coming-soon" })),
    }))
    .filter((c) => c.products.length > 0); // empty categories stay hidden

  return (
    <header className="relative border-b border-[#E6E6E4] bg-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link href="/" aria-label="DIY Arena home">
          <Image src="/brand/logo-black.png" alt="DIY Arena" width={400} height={160} priority className="h-8 w-auto" />
        </Link>
        <SiteNav categories={categories} />
      </div>
    </header>
  );
}
