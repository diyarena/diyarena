import Link from "next/link";
import { getCategory, getWhatYouGet, money, type Product } from "@/lib/catalogue";
import { ProductMockup } from "./ProductMockup";

export function ProductCard({ product }: { product: Product }) {
  const soon = product.availability === "coming-soon";
  const href = `/products/${product.slug}`;
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-[#E6E6E4] bg-white transition hover:shadow-md">
      <Link href={href} aria-label={product.title}>
        <ProductMockup product={product} className="aspect-[4/3] rounded-none text-lg" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#6B6B68]">{getCategory(product.category)?.name} &middot; {product.contents.length} {soon ? "planned " : ""}items</p>
        <h3 className="text-lg font-semibold leading-snug text-[#111]">
          <Link href={href}>{product.title}</Link>
        </h3>
        <p className="mt-2 text-sm text-[#242424]">{product.description}</p>
        <p className="mt-3 text-sm text-[#242424]">
          <span className="font-medium text-[#111]">Outcome: </span>{product.outcome}
        </p>
        <p className="mt-2 text-sm text-[#6B6B68]">
          <span className="font-medium text-[#242424]">{soon ? "Planned contents: " : "What you get: "}</span>
          {getWhatYouGet(product)}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <p className="font-semibold text-[#111]">
            {money(product)}
            {soon && <span className="ml-2 text-xs font-normal text-[#6B6B68]">Coming soon</span>}
          </p>
          <Link href={href} className="rounded-full bg-[#111] px-4 py-2 text-sm font-semibold text-white">Explore Product</Link>
        </div>
      </div>
    </article>
  );
}
