import { getCategory, type Product } from "@/lib/catalogue";

// Designed digital cover (a flat tile, not a paper or box mockup). Real bundle artwork replaces it once it exists.
export function ProductMockup({ product, className = "" }: { product: Product; className?: string }) {
  const [a, b] = product.accent;
  const cat = getCategory(product.category);
  return (
    <div
      role="img"
      aria-label={`${product.title} cover`}
      className={`relative flex flex-col justify-between overflow-hidden rounded-xl p-6 text-white ${className}`}
      style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
    >
      <span aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
      <span aria-hidden className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-black/10" />
      <span className="relative text-xs font-medium uppercase tracking-widest text-white/80">{cat?.name}</span>
      <span className="relative text-balance text-[1.15em] font-bold leading-tight">{product.title}</span>
      <span className="relative flex items-center gap-2 text-xs font-medium text-white/80">
        <span className="h-px w-8 bg-white/60" />DIY Arena
      </span>
    </div>
  );
}
