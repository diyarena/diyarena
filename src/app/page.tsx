import Link from "next/link";
import {
  getBestSellers, getCategories, getProductsByCategory, getRecentlyAdded, getStoreProducts, getTrendingProducts,
  type Product,
} from "@/lib/catalogue";
import { HeroFigure } from "@/components/HeroFigure";
import { ProductBrowser } from "@/components/ProductBrowser";
import { ProductCard } from "@/components/ProductCard";

const steps = ["Find the resource you need.", "Discover exactly what it contains.", "Purchase securely.", "Receive instant digital access.", "Start putting it into practice."];

function Row({ title, items }: { title: string; items: Product[] }) {
  if (items.length === 0) return null; // sections only appear when products genuinely qualify
  return (
    <section className="mt-16">
      <h2 className="mb-5 text-xl font-semibold text-[#111]">{title}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </section>
  );
}

export default function Home() {
  const all = getStoreProducts();
  const categories = getCategories();
  // A product appears in only one special row: trending, then best sellers, then recently added.
  const trending = getTrendingProducts();
  const used = new Set(trending.map((p) => p.slug));
  const best = getBestSellers().filter((p) => !used.has(p.slug));
  best.forEach((p) => used.add(p.slug));
  const recent = getRecentlyAdded().filter((p) => !used.has(p.slug));

  return (
    <main className="mx-auto max-w-5xl px-5">
      <section className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="max-w-2xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-[#111] md:text-5xl lg:text-6xl">
            Everything you need to make it happen yourself.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[#888]">
            Discover practical digital products, step-by-step resources and ready-to-use tools that help you learn, create,
            work and achieve more.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#explore" className="rounded-full bg-[#111] px-6 py-3 font-semibold text-white">Explore All Products</Link>
            <Link href="#categories" className="rounded-full border border-[#E6E6E4] bg-white px-6 py-3 font-semibold">Explore Categories</Link>
          </div>
        </div>
        <HeroFigure />
      </section>

      <section id="explore" className="scroll-mt-8">
        <h2 className="mb-5 text-xl font-semibold text-[#111]">All products</h2>
        <ProductBrowser products={all} categories={categories} />
      </section>

      <Row title="Trending now" items={trending} />
      <Row title="Best sellers" items={best} />
      <Row title="Recently added" items={recent} />

      <section id="categories" className="mt-20 scroll-mt-8">
        <h2 className="mb-5 text-xl font-semibold text-[#111]">Explore by category</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {categories
            .filter((c) => getProductsByCategory(c.slug).length > 0)
            .map((c) => (
              <Link key={c.slug} href={`/${c.slug}`} className="rounded-xl border border-[#E6E6E4] bg-white p-5 transition hover:border-[#111]">
                <p className="font-semibold text-[#111]">{c.name}</p>
                <p className="mt-1 text-sm text-[#888]">{c.description}</p>
                <p className="mt-3 text-xs text-[#888]">{getProductsByCategory(c.slug).length} resources</p>
              </Link>
            ))}
        </div>
      </section>

      <section id="how" className="mt-16 scroll-mt-8">
        <h2 className="mb-5 text-xl font-semibold text-[#111]">How DIY Arena works</h2>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s} className="rounded-xl border border-[#E6E6E4] bg-white p-5">
              <span className="text-sm text-[#888]">Step {i + 1}</span>
              <p className="mt-1 font-semibold text-[#111]">{s}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
