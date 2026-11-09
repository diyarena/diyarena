import Image from "next/image";
import Link from "next/link";

const nav = [
  ["Explore categories", "/#categories"],
  ["All products", "/products"],
  ["How it works", "/#how"],
  ["About", "/about"],
  ["Search", "/products#search"],
];

export function SiteHeader() {
  return (
    <header className="relative border-b border-[#E6E6E4] bg-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link href="/" aria-label="DIY Arena home">
          <Image src="/brand/logo-black.png" alt="DIY Arena" width={400} height={160} priority className="h-8 w-auto" />
        </Link>
        <nav className="hidden gap-6 text-sm md:flex">
          {nav.map(([label, href]) => <Link key={label} href={href} className="hover:text-[#111]">{label}</Link>)}
        </nav>
        <details className="md:hidden">
          <summary className="cursor-pointer list-none text-sm font-medium">Menu</summary>
          <div className="absolute inset-x-0 top-16 z-10 flex flex-col gap-1 border-b border-[#E6E6E4] bg-white px-5 py-3">
            {nav.map(([label, href]) => <Link key={label} href={href} className="py-2">{label}</Link>)}
          </div>
        </details>
      </div>
    </header>
  );
}
