import Link from "next/link";
import { money, type Product } from "@/lib/catalogue";
import { ProductMockup } from "./ProductMockup";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="block overflow-hidden rounded-xl border border-[#E6E6E4] bg-white transition hover:shadow-md"
    >
      <ProductMockup product={product} className="aspect-[4/3] rounded-none text-lg" />
      <div className="p-4">
        <p className="font-semibold text-[#111]">{money(product)}</p>
        <p className="mt-1 text-sm text-[#888]">{product.tagline}</p>
      </div>
    </Link>
  );
}
