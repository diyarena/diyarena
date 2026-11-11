import type { Metadata } from "next";
import { getCategories, getStoreProducts } from "@/lib/catalogue";
import { ProductBrowser } from "@/components/ProductBrowser";

export const metadata: Metadata = { title: "All products", description: "Browse every DIY Arena digital resource." };

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-14">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-[#111]">All products</h1>
      <ProductBrowser products={getStoreProducts()} categories={getCategories()} search sort />
    </main>
  );
}
