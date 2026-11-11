import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProduct, money, type Product } from "@/lib/catalogue";
import { ProductMockup } from "@/components/ProductMockup";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  const url = `/products/${p.slug}`;
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    alternates: { canonical: url },
    openGraph: { title: p.seoTitle, description: p.seoDescription, url, type: "website" },
  };
}

function BuyButton({ p }: { p: Product }) {
  const base = "inline-block rounded-full bg-[#111] px-7 py-3 font-semibold text-white";
  if (p.availability === "available" && p.checkoutUrl) return <a href={p.checkoutUrl} className={base}>Get Instant Access</a>;
  return <button disabled className={`${base} cursor-not-allowed opacity-40`}>Coming soon</button>;
}

const h2 = "mb-4 text-2xl font-bold tracking-tight text-[#111]";

// Each layout orders the sections differently, so pages are not the same sequence with new text.
const layouts: Record<Product["funnel"]["layout"], string[]> = {
  journey: ["problem", "solution", "journey", "modules", "contents", "audience", "faq", "buy"],
  toolkit: ["problem", "modules", "solution", "contents", "audience", "journey", "faq", "buy"],
  planner: ["contents", "modules", "problem", "solution", "audience", "journey", "faq", "buy"],
};

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const f = p.funnel;
  const soon = p.availability === "coming-soon";
  const cat = getCategory(p.category);
  const [a, b] = p.accent;

  const sections: Record<string, React.ReactNode> = {
    problem: (
      <section key="problem">
        <h2 className={h2}>{f.problemTitle}</h2>
        <p className="text-lg text-[#242424]">{f.problem}</p>
      </section>
    ),
    solution: (
      <section key="solution">
        <h2 className={h2}>{f.solutionTitle}</h2>
        <p className="text-lg text-[#242424]">{f.solution}</p>
        <ul className="mt-4 list-disc space-y-1 pl-5">{p.benefits.map((x) => <li key={x}>{x}</li>)}</ul>
      </section>
    ),
    modules: (
      <section key="modules">
        <h2 className={h2}>What you will work through</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {f.modules.map((m, i) => (
            <div key={m.title} className="rounded-xl border border-[#E6E6E4] bg-white p-5">
              <span className="text-sm text-[#888]">0{i + 1}</span>
              <h3 className="mt-1 font-semibold text-[#111]">{m.title}</h3>
              <p className="mt-2 text-sm text-[#242424]">{m.text}</p>
            </div>
          ))}
        </div>
      </section>
    ),
    journey: (
      <section key="journey">
        <h2 className={h2}>How to use it</h2>
        <ol className="space-y-4">
          {f.steps.map((s, i) => (
            <li key={s} className="flex gap-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#111] text-sm font-semibold text-white">{i + 1}</span>
              <p className="pt-1">{s}</p>
            </li>
          ))}
        </ol>
      </section>
    ),
    contents: (
      <section key="contents">
        <h2 className={h2}>{soon ? "Planned contents" : "What you will receive"}</h2>
        <ul className="space-y-2">
          {p.contents.map((c) => (
            <li key={c} className="flex gap-3"><span aria-hidden className="text-[#888]">&#10003;</span>{c}</li>
          ))}
        </ul>
        {soon && <p className="mt-4 text-sm text-[#888]">This resource is still being prepared. Contents are planned and may change before release.</p>}
      </section>
    ),
    audience: (
      <section key="audience" className="grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className={h2}>Who it is for</h2>
          <ul className="list-disc space-y-1 pl-5">{p.audience.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div>
          <h2 className={h2}>Who it is not for</h2>
          <ul className="list-disc space-y-1 pl-5">{p.notFor.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </section>
    ),
    faq: (
      <section key="faq">
        <h2 className={h2}>Frequently asked questions</h2>
        {p.faqs.map((x) => (
          <details key={x.q} className="border-b border-[#E6E6E4] py-3">
            <summary className="cursor-pointer font-medium">{x.q}</summary>
            <p className="mt-2 text-[#888]">{x.a}</p>
          </details>
        ))}
      </section>
    ),
    buy: (
      <section key="buy" className="rounded-2xl bg-[#F1F1EF] p-8 text-center">
        <p className="text-3xl font-bold text-[#111]">{money(p)}</p>
        <p className="mb-5 text-sm text-[#888]">{soon ? "Planned price. One-time payment." : "One-time payment"}</p>
        <BuyButton p={p} />
        <p className="mt-5 text-sm text-[#888]">
          <Link className="underline" href="/refund">Refund policy</Link> &middot; <Link className="underline" href="/contact">Support</Link>
        </p>
      </section>
    ),
  };

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <section className="rounded-2xl p-6 md:p-10" style={{ background: `linear-gradient(135deg, ${a}14, ${b}14)` }}>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm text-[#888]">
              {cat && <Link href={`/${cat.slug}`} className="hover:underline">{cat.name}</Link>} &middot; {p.title}
              {soon && <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs text-[#242424]">Coming soon</span>}
            </p>
            <h1 className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight text-[#111] md:text-4xl">{f.headline}</h1>
            <p className="mt-4 text-lg text-[#242424]">{f.lead}</p>
            <p className="mt-6 text-3xl font-bold text-[#111]">{money(p)}</p>
            <p className="mb-5 text-sm text-[#888]">{soon ? "Planned price. One-time payment." : "One-time payment"}</p>
            <BuyButton p={p} />
          </div>
          <ProductMockup product={p} className="aspect-[4/3] text-2xl shadow-lg" />
        </div>
      </section>
      <div className="mx-auto mt-14 max-w-3xl space-y-14">{layouts[f.layout].map((k) => sections[k])}</div>
    </main>
  );
}
