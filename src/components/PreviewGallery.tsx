"use client";

import { useEffect, useState } from "react";

// Click-to-enlarge gallery. Rendered only when a product has real preview images.
export function PreviewGallery({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState<string | null>(null);
  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, []);
  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, i) => (
          <button key={src} type="button" onClick={() => setOpen(src)} className="overflow-hidden rounded-xl border border-[#E6E6E4] bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${title}, preview ${i + 1}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </button>
        ))}
      </div>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Enlarged preview" onClick={() => setOpen(null)} className="fixed inset-0 z-40 grid place-items-center bg-black/80 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={open} alt="Enlarged preview" className="max-h-full max-w-full rounded-lg" />
          <button type="button" onClick={() => setOpen(null)} className="absolute right-4 top-4 rounded-full bg-white px-4 py-1.5 text-sm font-medium">Close</button>
        </div>
      )}
    </>
  );
}
