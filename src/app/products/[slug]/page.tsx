import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, money, type Product } from "@/lib/catalogue";
import { ProductMockup } from "@/components/ProductMockup";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: p.title, description: p.tagline, openGraph: { title: p.title, description: p.tagline } } : {};
}

function BuyButton({ p }: { p: Product }) {
  const base = "inline-block rounded-full bg-[#111] px-7 py-3 font-semibold text-white";
  return p.checkoutUrl ? (
    <a href={p.checkoutUrl} className={base}>Get Instant Access</a>
  ) : (
    <button disabled className={`${base} cursor-not-allowed opacity-40`}>Coming soon</button>
  );
}

const List = ({ title, items }: { title: string; items: string[] }) => (
  <section className="mt-10">
    <h2 className="mb-3 text-lg font-semibold text-[#111]">{title}</h2>
    <ul className="list-disc space-y-1 pl-5">{items.map((i) => <li key={i}>{i}</li>)}</ul>
  </section>
);

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <div className="grid gap-10 md:grid-cols-2">
        <ProductMockup product={p} className="aspect-[4/3] text-2xl" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#111]">{p.title}</h1>
          <p className="mt-3 text-[#242424]">{p.description}</p>
          <p className="mt-6 text-3xl font-bold text-[#111]">{money(p)}</p>
          <p className="mb-5 text-sm text-[#888]">One-time payment</p>
          <BuyButton p={p} />
        </div>
      </div>
      <div className="max-w-2xl">
        <List title="What you will receive" items={p.contents} />
        <List title="Benefits" items={p.benefits} />
        <List title="Who this is for" items={p.audience} />
        <List title="Who this is not for" items={p.notFor} />
        <section className="mt-10">
          <h2 className="mb-3 text-lg font-semibold text-[#111]">Frequently asked questions</h2>
          {p.faqs.map((f) => (
            <details key={f.q} className="border-b border-[#E6E6E4] py-3">
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-2 text-[#888]">{f.a}</p>
            </details>
          ))}
        </section>
        <section className="mt-10">
          <h2 className="mb-3 text-lg font-semibold text-[#111]">How it works</h2>
          <ol className="list-decimal space-y-1 pl-5">
            <li>Purchase securely through a hosted checkout.</li>
            <li>Get access to your files once payment is confirmed.</li>
            <li>Start putting the resources to work.</li>
          </ol>
        </section>
        <section className="mt-10">
          <h2 className="mb-3 text-lg font-semibold text-[#111]">Refund and support</h2>
          <p className="text-[#888]">
            Read our <Link className="underline" href="/refund">refund policy</Link> or visit the{" "}
            <Link className="underline" href="/contact">contact page</Link>.
          </p>
        </section>
        <div className="mt-10"><BuyButton p={p} /></div>
      </div>
    </main>
  );
}
