import Link from "next/link";
import {
  getBestSellers, getCategories, getProductsByCategory, getRecentlyAdded, getStoreProducts, getTrendingProducts,
  type Product,
} from "@/lib/catalogue";
import { HeroFigure } from "@/components/HeroFigure";
import { ProductBrowser } from "@/components/ProductBrowser";
import { ProductCard } from "@/components/ProductCard";

const journey = [
  ["Discover", "Find the resource that fits what you want to do."],
  ["Explore", "See exactly what each product contains before you decide."],
  ["Purchase", "Check out securely through a hosted checkout."],
  ["Access", "Receive your digital files once payment is confirmed."],
  ["Apply", "Put the templates and workflows to work."],
];

const accomplish = [
  { title: "Learn", text: "Plan study, scholarships and a move abroad with structured planners and checklists.", href: "/education" },
  { title: "Create", text: "Turn ideas into channels, brands and videos with templates and repeatable workflows.", href: "/content-creation" },
  { title: "Build", text: "Organise a business, a job search or your week with trackers and toolkits.", href: "/business" },
];

const h2 = "mb-6 text-2xl font-bold tracking-tight text-[#111] md:text-3xl";

function Row({ title, items }: { title: string; items: Product[] }) {
  if (items.length === 0) return null; // sections only appear when products genuinely qualify
  return (
    <section className="mt-20">
      <h2 className={h2}>{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </section>
  );
}

export default function Home() {
  const all = getStoreProducts();
  const categories = getCategories();
  const withProducts = categories.filter((c) => getProductsByCategory(c.slug).length > 0);
  // A product appears in only one special row: trending, then best sellers, then recently added.
  const trending = getTrendingProducts();
  const used = new Set(trending.map((p) => p.slug));
  const best = getBestSellers().filter((p) => !used.has(p.slug));
  best.forEach((p) => used.add(p.slug));
  const recent = getRecentlyAdded().filter((p) => !used.has(p.slug));

  return (
    <main className="mx-auto max-w-6xl px-5 pt-6">
      <section className="relative isolate overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-white via-[#FAFAF8] to-[#EEF1FA] px-6 py-12 shadow-[0_30px_80px_-40px_rgba(17,17,17,0.25)] md:px-12 md:py-16">
        <div aria-hidden className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#9DB8FF]/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-[#C4B5FD]/25 blur-3xl" />
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.04] tracking-[-0.035em] text-[#111] sm:text-5xl xl:text-6xl">
              Everything you need to make it happen yourself.
            </h1>
            <p className="mt-6 max-w-xl text-xl font-medium leading-snug text-[#242424]">
              Knowledge, tools and intelligent resources to help you learn faster, create better, work smarter and build independently.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#6B6B68]">
              Explore practical digital products, AI-powered resources, step-by-step systems and ready-to-use tools designed to turn ideas into action.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#explore" className="rounded-full bg-[#111] px-7 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-[#242424]">Explore All Products</Link>
              <Link href="#categories" className="rounded-full border border-[#E6E6E4] bg-white/80 px-7 py-3.5 text-base font-semibold text-[#111] backdrop-blur transition hover:bg-white">Explore Categories</Link>
            </div>
            <p className="mt-5 text-sm text-[#6B6B68]">Every product lists exactly what is inside before you buy.</p>
          </div>
          <HeroFigure />
        </div>
      </section>

      <section id="categories" className="mt-20 scroll-mt-8">
        <h2 className={h2}>Explore categories</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {withProducts.map((c) => {
            const items = getProductsByCategory(c.slug);
            const [a, b] = items[0].accent;
            return (
              <Link key={c.slug} href={`/${c.slug}`} className="group overflow-hidden rounded-2xl border border-[#E6E6E4] bg-white transition hover:shadow-lg">
                <div className="flex h-24 items-end p-4" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}>
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/90">{items.length} {items.length === 1 ? "resource" : "resources"}</span>
                </div>
                <div className="p-5">
                  <p className="text-lg font-semibold leading-snug text-[#111]">{c.name}</p>
                  <p className="mt-1 text-[#6B6B68]">{c.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="explore" className="mt-20 scroll-mt-8">
        <h2 className={h2}>All products</h2>
        <ProductBrowser products={all} categories={categories} />
      </section>

      <Row title="Trending now" items={trending} />
      <Row title="Best sellers" items={best} />
      <Row title="Recently added" items={recent} />

      <section className="mt-20">
        <h2 className={h2}>Discover what you can accomplish</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {accomplish.map((x) => (
            <Link key={x.title} href={x.href} className="rounded-2xl border border-[#E6E6E4] bg-white p-7 transition hover:shadow-lg">
              <p className="text-3xl font-extrabold tracking-tight text-[#111]">{x.title}</p>
              <p className="mt-3 text-lg leading-relaxed text-[#242424]">{x.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="how" className="mt-20 scroll-mt-8">
        <h2 className={h2}>How DIY Arena works</h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {journey.map(([t, d], i) => (
            <li key={t} className="rounded-2xl border border-[#E6E6E4] bg-white p-5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#111] text-sm font-semibold text-white">{i + 1}</span>
              <p className="mt-3 text-lg font-semibold text-[#111]">{t}</p>
              <p className="mt-1 text-[#6B6B68]">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 rounded-2xl border border-[#E6E6E4] bg-white p-8 md:p-10">
        <h2 className="text-2xl font-bold tracking-tight text-[#111]">What you can rely on</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          <li className="text-lg text-[#242424]">Every product page lists its contents in full, with what each item is for.</li>
          <li className="text-lg text-[#242424]">Each page says who the product is not for, and what it cannot promise.</li>
          <li className="text-lg text-[#242424]">We only publish real feedback from real buyers. There are no reviews yet, so none are shown.</li>
        </ul>
      </section>

      <section className="mt-20 rounded-[2rem] bg-[#111] p-10 text-center md:p-14">
        <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white md:text-4xl">Ready to make it happen?</h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-white/75">Find the resource that fits what you want to do next.</p>
        <Link href="#explore" className="mt-7 inline-block rounded-full bg-white px-7 py-3.5 font-semibold text-[#111]">Explore All Products</Link>
      </section>
    </main>
  );
}
