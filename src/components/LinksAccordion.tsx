"use client";

import { useState } from "react";
import Link from "next/link";
import { money, type Category, type Product } from "@/lib/catalogue";
import { ProductMockup } from "./ProductMockup";

export function LinksAccordion({ categories, products }: { categories: Category[]; products: Product[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      {categories.map((c) => {
        const items = products.filter((p) => p.category === c.slug);
        const isOpen = open === c.slug;
        return (
          <div key={c.slug} className="overflow-hidden rounded-xl border border-[#E6E6E4] bg-white">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : c.slug)}
              className="flex min-h-14 w-full items-center justify-between px-5 text-left font-semibold text-[#111]"
            >
              {c.name}
              <span aria-hidden className="text-[#6B6B68]">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div className="border-t border-[#E6E6E4] p-3">
                {items.length === 0 && <p className="p-2 text-sm text-[#6B6B68]">New resources coming soon.</p>}
                {items.map((p) => (
                  <Link key={p.slug} href={`/products/${p.slug}`} className="flex gap-3 rounded-lg p-2 hover:bg-[#FAFAF8]">
                    <ProductMockup product={p} className="h-16 w-16 shrink-0 text-[0px]" />
                    <span className="min-w-0">
                      <span className="block font-semibold text-[#111]">{p.title}</span>
                      <span className="block text-sm text-[#6B6B68]">{p.tagline}</span>
                      <span className="mt-1 block text-sm font-semibold">{money(p)}{p.availability === "coming-soon" ? " · Coming soon" : ""} &middot; View product</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
