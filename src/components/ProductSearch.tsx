"use client";

import { useState } from "react";
import type { Product } from "@/lib/catalogue";
import { ProductCard } from "./ProductCard";

export function ProductSearch({ products }: { products: Product[] }) {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const shown = products.filter((p) => !term || `${p.title} ${p.tagline}`.toLowerCase().includes(term));
  return (
    <>
      <input
        id="search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products"
        aria-label="Search products"
        className="mt-6 w-full rounded-xl border border-[#E6E6E4] bg-white px-4 py-3 outline-none focus:border-[#111]"
      />
      {shown.length === 0 ? (
        <p className="mt-8 text-[#6B6B68]">No products match your search.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      )}
    </>
  );
}
