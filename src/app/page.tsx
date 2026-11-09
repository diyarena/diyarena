import Link from "next/link";
import { getCategories, getFeaturedProducts } from "@/lib/catalogue";
import { ProductCard } from "@/components/ProductCard";

const steps = [
  "Find the resource you need.",
  "Purchase securely.",
  "Receive your digital product.",
  "Start putting it to work.",
];

export default function Home() {
  const categories = getCategories();
  const featured = getFeaturedProducts();
  return (
    <main className="mx-auto max-w-5xl px-5">
      <section className="py-20 md:py-28">
        <h1 className="max-w-2xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-[#111] md:text-6xl">
          The knowledge and tools to make it happen yourself.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-[#888]">
          Discover practical digital resources, step-by-step guides and ready-to-use tools designed to help you learn,
          create, work and achieve more independently.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/products" className="rounded-full bg-[#111] px-6 py-3 font-semibold text-white">Explore Digital Products</Link>
          <Link href="#categories" className="rounded-full border border-[#E6E6E4] bg-white px-6 py-3 font-semibold">Browse Categories</Link>
        </div>
      </section>

      <section id="categories" className="scroll-mt-8">
        <h2 className="mb-5 text-xl font-semibold text-[#111]">Categories</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`} className="rounded-xl border border-[#E6E6E4] bg-white p-5 transition hover:border-[#111]">
              <p className="font-semibold text-[#111]">{c.name}</p>
              <p className="mt-1 text-sm text-[#888]">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 text-xl font-semibold text-[#111]">Featured</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}

      <section id="how" className="mt-16 scroll-mt-8">
        <h2 className="mb-5 text-xl font-semibold text-[#111]">How DIY Arena works</h2>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s} className="rounded-xl border border-[#E6E6E4] bg-white p-5">
              <span className="text-sm text-[#888]">Step {i + 1}</span>
              <p className="mt-1 font-semibold text-[#111]">{s}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 max-w-2xl">
        <h2 className="mb-3 text-xl font-semibold text-[#111]">Turn knowledge into action</h2>
        <p className="text-[#888]">
          DIY Arena provides practical resources that help people turn knowledge into action: guides, templates and
          toolkits you can use straight away.
        </p>
      </section>

      <section className="mt-16 rounded-2xl bg-[#F1F1EF] p-10 text-center">
        <h2 className="text-2xl font-bold text-[#111]">Everything you need to do it yourself.</h2>
        <p className="mx-auto mt-2 max-w-md text-[#888]">Explore the catalogue and find your next resource.</p>
        <Link href="/products" className="mt-6 inline-block rounded-full bg-[#111] px-6 py-3 font-semibold text-white">Explore Digital Products</Link>
      </section>
    </main>
  );
}
