import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/catalogue";
import { infoPages, site } from "@/lib/site";
import { ProductCard } from "@/components/ProductCard";

export const dynamicParams = false;
export const generateStaticParams = () => [
  ...getCategories().map((c) => ({ slug: c.slug })),
  ...Object.keys(infoPages).map((slug) => ({ slug })),
];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const c = getCategory(slug);
  if (c) return { title: c.name, description: c.description };
  const i = infoPages[slug];
  return i ? { title: i.title, robots: i.draft ? { index: false } : undefined } : {};
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  const c = getCategory(slug);
  if (c) {
    const items = getProductsByCategory(c.slug);
    return (
      <main className="mx-auto max-w-5xl px-5 py-14">
        <h1 className="text-3xl font-bold tracking-tight text-[#111]">{c.name}</h1>
        <p className="mt-2 text-[#6B6B68]">{c.description}</p>
        {items.length === 0 ? (
          <p className="mt-10 rounded-xl border border-[#E6E6E4] bg-white p-8 text-center text-[#6B6B68]">New resources are coming soon.</p>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        )}
      </main>
    );
  }
  const info = infoPages[slug];
  if (!info) notFound();
  return (
    <main className="mx-auto max-w-2xl px-5 py-14">
      <h1 className="text-3xl font-bold tracking-tight text-[#111]">{info.title}</h1>
      <div className="mt-6 space-y-4">
        {info.body.map((line) =>
          line.startsWith("## ") ? (
            <h2 key={line} className="pt-4 text-lg font-semibold text-[#111]">{line.slice(3)}</h2>
          ) : (
            <p key={line}>{line}</p>
          ),
        )}
        {slug === "contact" && site.supportEmail && <p>Email: {site.supportEmail}</p>}
      </div>
    </main>
  );
}
