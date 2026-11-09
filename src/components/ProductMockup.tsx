import type { Product } from "@/lib/catalogue";

export function ProductMockup({ product, className = "" }: { product: Product; className?: string }) {
  const [a, b] = product.accent;
  return (
    <div
      role="img"
      aria-label={`${product.title} cover`}
      className={`grid place-items-center rounded-xl p-6 text-center font-semibold text-white ${className}`}
      style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
    >
      <span className="text-balance leading-tight">{product.title}</span>
    </div>
  );
}
