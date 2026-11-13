import type { Metadata } from "next";
import { getCategories, getProducts } from "@/lib/catalogue";
import { LinksAccordion } from "@/components/LinksAccordion";

export const metadata: Metadata = { title: "Shop", description: "Your destination for practical digital resources." };

export default function LinksPage() {
  const products = getProducts();
  const categories = getCategories().filter((c) => products.some((p) => p.category === c.slug));
  return (
    <main className="mx-auto max-w-md px-5 py-10">
      <h1 className="text-center text-2xl font-bold text-[#111]">DIY Arena</h1>
      <p className="mt-2 text-center text-[#242424]">Your destination for practical digital resources.</p>
      <p className="mb-8 mt-1 text-center text-sm text-[#6B6B68]">Learn something. Find a solution. Make it happen.</p>
      <LinksAccordion categories={categories} products={products} />
    </main>
  );
}
