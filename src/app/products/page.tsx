import type { Metadata } from "next";
import { getProducts } from "@/lib/catalogue";
import { ProductSearch } from "@/components/ProductSearch";

export const metadata: Metadata = { title: "All products", description: "Browse every DIY Arena digital resource." };

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-14">
      <h1 className="text-3xl font-bold tracking-tight text-[#111]">All products</h1>
      <ProductSearch products={getProducts()} />
    </main>
  );
}
