import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-[#E6E6E4] bg-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link href="/" aria-label="DIY Arena home">
          <Image src="/brand/logo-black.png" alt="DIY Arena" width={400} height={160} priority className="h-8 w-auto" />
        </Link>
        <nav className="text-sm text-[#242424]">
          <Link href="/#categories" className="hover:text-[#111]">Categories</Link>
        </nav>
      </div>
    </header>
  );
}
