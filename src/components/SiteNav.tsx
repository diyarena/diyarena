"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export type MenuCategory = {
  slug: string;
  name: string;
  products: { slug: string; title: string; soon: boolean }[];
};

const MAX = 5; // products shown per category before "View all"
const more = [
  ["All products", "/products"],
  ["How it works", "/#how"],
  ["About", "/about"],
  ["Search", "/products#search"],
] as const;

function Columns({ categories }: { categories: MenuCategory[] }) {
  return (
    <>
      {categories.map((c) => (
        <div key={c.slug}>
          <Link href={`/${c.slug}`} className="text-xs font-semibold uppercase tracking-wide text-[#111] hover:underline">
            {c.name}
          </Link>
          <ul className="mt-2 space-y-1">
            {c.products.slice(0, MAX).map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="text-sm text-[#242424] hover:text-[#111] hover:underline">
                  {p.title}
                  {p.soon && <span className="ml-1 text-xs text-[#888]">Soon</span>}
                </Link>
              </li>
            ))}
            {c.products.length > MAX && (
              <li><Link href={`/${c.slug}`} className="text-sm text-[#888] hover:underline">View all &rarr;</Link></li>
            )}
          </ul>
        </div>
      ))}
    </>
  );
}

export function SiteNav({ categories }: { categories: MenuCategory[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // desktop dropdown
  const [mobile, setMobile] = useState(false); // mobile panel
  const [mobileCats, setMobileCats] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => { setOpen(false); setMobile(false); setMobileCats(false); }, [pathname]);
  useEffect(() => {
    const down = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) { setOpen(false); setMobile(false); }
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); setMobile(false); trigger.current?.focus(); }
    };
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", down); document.removeEventListener("keydown", key); };
  }, []);

  // Close menus when any link inside them is used (covers same-page #anchors).
  const closeOnLink = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) { setOpen(false); setMobile(false); }
  };
  const panel = "menu-in absolute inset-x-0 top-full z-20 border-b border-[#E6E6E4] bg-white";

  return (
    <div ref={root} className="contents">
      <nav aria-label="Main" className="hidden items-center gap-6 text-sm md:flex">
        <Link href="/" className="hover:text-[#111]">Home</Link>
        <div
          className="flex h-16 items-center"
          onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
        >
          <button
            ref={trigger}
            type="button"
            aria-expanded={open}
            aria-controls="categories-menu"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-1 hover:text-[#111]"
          >
            Categories <span aria-hidden className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}>&#9662;</span>
          </button>
          {open && (
            <div id="categories-menu" onClick={closeOnLink} className={`${panel} shadow-lg`}>
              <div className="mx-auto grid max-h-[70vh] max-w-5xl gap-8 overflow-y-auto px-5 py-8 sm:grid-cols-2 lg:grid-cols-3">
                <Columns categories={categories} />
              </div>
              <div className="mx-auto max-w-5xl px-5 pb-5">
                <Link href="/products" className="text-sm font-semibold text-[#111] hover:underline">View all products &rarr;</Link>
              </div>
            </div>
          )}
        </div>
        {more.map(([label, href]) => <Link key={label} href={href} className="hover:text-[#111]">{label}</Link>)}
      </nav>

      <button
        type="button"
        aria-expanded={mobile}
        aria-controls="mobile-menu"
        onClick={() => setMobile((m) => !m)}
        className="text-sm font-medium md:hidden"
      >
        {mobile ? "Close" : "Menu"}
      </button>
      {mobile && (
        <div id="mobile-menu" onClick={closeOnLink} className={`${panel} max-h-[80vh] overflow-y-auto px-5 py-3 md:hidden`}>
          <Link href="/" className="block py-2">Home</Link>
          <button
            type="button"
            aria-expanded={mobileCats}
            onClick={() => setMobileCats((c) => !c)}
            className="flex w-full items-center justify-between py-2"
          >
            Categories <span aria-hidden>{mobileCats ? "−" : "+"}</span>
          </button>
          {mobileCats && <div className="space-y-5 pb-3 pl-3 pt-1"><Columns categories={categories} /></div>}
          {more.map(([label, href]) => <Link key={label} href={href} className="block py-2">{label}</Link>)}
        </div>
      )}
    </div>
  );
}
