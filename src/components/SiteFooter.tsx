import Link from "next/link";
import { getCategories, getProductsByCategory } from "@/lib/catalogue";
import { site } from "@/lib/site";

export function SiteFooter() {
  const cats = getCategories().filter((c) => getProductsByCategory(c.slug).length > 0);
  return (
    <footer className="mt-20 border-t border-[#E6E6E4] bg-white py-10 text-sm text-[#888]">
      <div className="mx-auto grid max-w-5xl gap-8 px-5 sm:grid-cols-3">
        <div>
          <p className="font-semibold text-[#111]">{site.name}</p>
          <p className="mt-2">{site.tagline}</p>
          <p className="mt-2">{site.handle}</p>
        </div>
        <ul className="space-y-2">
          <li className="font-semibold text-[#111]">Shop</li>
          <li><Link href="/products">All products</Link></li>
          {cats.map((c) => <li key={c.slug}><Link href={`/${c.slug}`}>{c.name}</Link></li>)}
        </ul>
        <ul className="space-y-2">
          <li className="font-semibold text-[#111]">Help</li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/faq">FAQ</Link></li>
          <li><Link href="/privacy">Privacy policy</Link></li>
          <li><Link href="/terms">Terms and conditions</Link></li>
          <li><Link href="/refund">Refund policy</Link></li>
        </ul>
      </div>
      <p className="mx-auto mt-8 max-w-5xl px-5">&copy; {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
