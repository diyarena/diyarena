import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/catalogue";
import { ProductCard } from "@/components/ProductCard";

export const dynamicParams = false;
export const generateStaticParams = () => getCategories().map((c) => ({ category: c.slug }));

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCategory((await params).category);
  return c ? { title: c.name, description: c.description } : {};
}

export default async function CategoryPage({ params }: Props) {
  const c = getCategory((await params).category);
  if (!c) notFound();
  const items = getProductsByCategory(c.slug);
  return (
    <main className="mx-auto max-w-5xl px-5 py-14">
      <h1 className="text-3xl font-bold tracking-tight text-[#111]">{c.name}</h1>
      <p className="mt-2 text-[#888]">{c.description}</p>
      {items.length === 0 ? (
        <p className="mt-10 rounded-xl border border-[#E6E6E4] bg-white p-8 text-center text-[#888]">New resources are coming soon.</p>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      )}
    </main>
  );
}
