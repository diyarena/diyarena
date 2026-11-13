"use client";

import { useEffect, useState } from "react";

// Shows a purchase bar once the visitor has scrolled past the hero, and hides it again at the offer section.
export function StickyBuyBar({
  title, price, href, label, watch,
}: { title: string; price: string; href: string | null; label: string; watch: string[] }) {
  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      setHidden((h) => {
        const next = { ...h };
        entries.forEach((e) => { next[e.target.id] = e.isIntersecting; });
        return next;
      });
    });
    watch.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [watch]);

  if (watch.some((id) => hidden[id] !== false)) return null; // not scrolled yet, or the hero/offer is in view
  return (
    <div className="menu-in fixed inset-x-0 bottom-0 z-30 border-t border-[#E6E6E4] bg-white/95 px-4 py-3 backdrop-blur md:inset-x-auto md:bottom-5 md:right-5 md:w-[420px] md:rounded-2xl md:border md:shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[#111]">{title}</p>
          <p className="text-sm text-[#6B6B68]">{price}</p>
        </div>
        {href ? (
          <a href={href} className="shrink-0 rounded-full bg-[#111] px-5 py-2 text-sm font-semibold text-white">{label}</a>
        ) : (
          <span className="shrink-0 rounded-full bg-[#F1F1EF] px-5 py-2 text-sm font-medium text-[#6B6B68]">Coming soon</span>
        )}
      </div>
    </div>
  );
}
