"use client";

import { useState } from "react";
import type { Category, Product } from "@/lib/catalogue";
import { ProductCard } from "./ProductCard";

type Sort = "default" | "low" | "high";

export function ProductBrowser({
  products, categories, search = false, sort = false,
}: { products: Product[]; categories: Category[]; search?: boolean; sort?: boolean }) {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [order, setOrder] = useState<Sort>("default");

  const present = categories.filter((c) => products.some((p) => p.category === c.slug));
  const term = q.trim().toLowerCase();
  let shown = products.filter(
    (p) =>
      (cat === "all" || p.category === cat) &&
      (!term || `${p.title} ${p.description} ${p.outcome} ${p.contents.join(" ")}`.toLowerCase().includes(term)),
  );
  if (order === "low") shown = [...shown].sort((a, b) => a.price - b.price);
  if (order === "high") shown = [...shown].sort((a, b) => b.price - a.price);

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm ${active ? "border-[#111] bg-[#111] text-white" : "border-[#E6E6E4] bg-white text-[#242424]"}`;

  return (
    <div>
      {search && (
        <input
          id="search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products"
          aria-label="Search products"
          className="mb-4 w-full rounded-xl border border-[#E6E6E4] bg-white px-4 py-3 outline-none focus:border-[#111]"
        />
      )}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button type="button" className={chip(cat === "all")} onClick={() => setCat("all")}>All</button>
        {present.map((c) => (
          <button key={c.slug} type="button" className={chip(cat === c.slug)} onClick={() => setCat(c.slug)}>{c.name}</button>
        ))}
        {sort && (
          <select
            aria-label="Sort products"
            value={order}
            onChange={(e) => setOrder(e.target.value as Sort)}
            className="ml-auto rounded-full border border-[#E6E6E4] bg-white px-3 py-1.5 text-sm"
          >
            <option value="default">Sort: Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        )}
      </div>
      {shown.length === 0 ? (
        <p className="py-8 text-[#6B6B68]">No products match your search.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      )}
    </div>
  );
}
