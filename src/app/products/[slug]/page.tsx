import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProduct, getWhatYouGet, money, type Product } from "@/lib/catalogue";
import { ProductMockup } from "@/components/ProductMockup";
import { StickyBuyBar } from "@/components/StickyBuyBar";

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

function BuyButton({ p, dark = false }: { p: Product; dark?: boolean }) {
  const base = `inline-block rounded-full px-7 py-3 font-semibold ${dark ? "bg-white text-[#111]" : "bg-[#111] text-white"}`;
  if (p.availability === "available" && p.checkoutUrl) return <a href={p.checkoutUrl} className={base}>{p.funnel.cta}</a>;
  return <button disabled className={`${base} cursor-not-allowed opacity-40`}>Coming soon</button>;
}

const h2 = "mb-4 text-2xl font-bold tracking-tight text-[#111]";

// Each layout orders the sections differently, so pages are not one sequence with new text.
const layouts: Record<Product["funnel"]["layout"], string[]> = {
  journey: ["problem", "solution", "transformation", "journey", "modules", "inside", "audience", "value", "faq", "trust", "buy"],
  toolkit: ["problem", "modules", "solution", "transformation", "inside", "audience", "journey", "value", "trust", "faq", "buy"],
  planner: ["inside", "modules", "problem", "solution", "transformation", "audience", "journey", "value", "faq", "trust", "buy"],
};

// Product-specific visual languages for the hero (colours come from each product's own artwork).
function look(kind: Product["funnel"]["look"], a: string, b: string) {
  const grid = "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)";
  switch (kind) {
    case "studio":
      return { dark: true, serif: false, style: { backgroundColor: "#111", backgroundImage: `radial-gradient(60% 80% at 85% 15%, ${a}66, transparent), radial-gradient(50% 60% at 5% 100%, ${b}55, transparent)` } };
    case "tech":
      return { dark: true, serif: false, style: { backgroundColor: "#0B1020", backgroundImage: `${grid}, radial-gradient(60% 80% at 85% 10%, ${a}66, transparent)`, backgroundSize: "32px 32px, 32px 32px, auto" } };
    case "academic":
      return { dark: false, serif: true, style: { backgroundColor: "#FAFAF8", backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #E6E6E4 32px)", borderTop: `4px solid ${a}` } };
    case "business":
      return { dark: false, serif: false, style: { backgroundColor: "#fff", backgroundImage: "linear-gradient(#E6E6E4 1px, transparent 1px)", backgroundSize: "100% 40px", borderLeft: `6px solid ${a}` } };
    default:
      return { dark: false, serif: false, style: { backgroundImage: `linear-gradient(135deg, ${a}14, ${b}14)` } };
  }
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const f = p.funnel;
  const soon = p.availability === "coming-soon";
  const cat = getCategory(p.category);
  const [a, b] = p.accent;
  const L = look(f.look, a, b);
  const priceNote = soon ? "Planned price. One-time payment." : "One-time payment";
  const href = p.availability === "available" ? p.checkoutUrl : null;

  const sections: Record<string, React.ReactNode> = {
    problem: (
      <section key="problem">
        <h2 className={h2}>{f.problemTitle}</h2>
        <p className="text-lg text-[#242424]">{f.problem}</p>
        <ul className="mt-4 space-y-2">
          {f.situations.map((x) => <li key={x} className="flex gap-3"><span aria-hidden className="text-[#888]">&ndash;</span>{x}</li>)}
        </ul>
      </section>
    ),
    solution: (
      <section key="solution">
        <h2 className={h2}>{f.solutionTitle}</h2>
        <p className="text-lg text-[#242424]">{f.solution}</p>
      </section>
    ),
    transformation: (
      <section key="transformation" className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[#E6E6E4] bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#888]">Where many people start</p>
          <p className="mt-2 text-lg text-[#242424]">{f.before}</p>
        </div>
        <div className="rounded-xl p-6 text-white" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/80">What you can work towards</p>
          <p className="mt-2 text-lg">{f.after}</p>
        </div>
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
      <section key="journey" id="how" className="scroll-mt-20">
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
    inside: (
      <section key="inside" id="inside" className="scroll-mt-20">
        <h2 className={h2}>{soon ? "Planned contents" : "What you get inside"}</h2>
        <ul className="divide-y divide-[#E6E6E4] rounded-xl border border-[#E6E6E4] bg-white">
          {p.contents.map((c, i) => (
            <li key={c} className="flex gap-3 p-4">
              <span aria-hidden className="mt-0.5 text-[#888]">&#10003;</span>
              <div>
                <p className="font-medium text-[#111]">{c}</p>
                <p className="text-sm text-[#888]">{f.inside[i]}</p>
              </div>
            </li>
          ))}
        </ul>
        {soon && <p className="mt-4 text-sm text-[#888]">This resource is still being prepared. Contents are planned and may change before release.</p>}
        {p.specs && (
          <dl className="mt-4 grid gap-3 rounded-xl bg-[#F1F1EF] p-4 text-sm sm:grid-cols-2">
            {Object.entries(p.specs).map(([k, v]) => <div key={k}><dt className="font-medium capitalize text-[#111]">{k}</dt><dd className="text-[#888]">{v}</dd></div>)}
          </dl>
        )}
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
    value: (
      <section key="value">
        <h2 className={h2}>Why it is worth having</h2>
        <ul className="list-disc space-y-1 pl-5">{f.value.map((x) => <li key={x}>{x}</li>)}</ul>
      </section>
    ),
    faq: (
      <section key="faq" id="faq" className="scroll-mt-20">
        <h2 className={h2}>Frequently asked questions</h2>
        {p.faqs.map((x) => (
          <details key={x.q} className="border-b border-[#E6E6E4] py-3">
            <summary className="cursor-pointer font-medium">{x.q}</summary>
            <p className="mt-2 text-[#888]">{x.a}</p>
          </details>
        ))}
      </section>
    ),
    trust: (
      <section key="trust" className="rounded-xl border border-[#E6E6E4] bg-white p-6">
        <h2 className={h2}>What you can rely on</h2>
        <ul className="list-disc space-y-1 pl-5 text-[#242424]">
          <li>All {p.contents.length} {soon ? "planned " : ""}items are listed above, each with what it is for.</li>
          {f.disclaimer && <li>{f.disclaimer}</li>}
          <li>There are no customer reviews yet. We will only publish real feedback from real buyers.</li>
          <li>
            See the <Link className="underline" href="/refund">refund policy</Link> and the{" "}
            <Link className="underline" href="/contact">contact page</Link>.
          </li>
        </ul>
      </section>
    ),
    buy: (
      <section key="buy" id="buy" className="scroll-mt-20 rounded-2xl bg-[#F1F1EF] p-8 text-center">
        <p className="text-sm text-[#888]">{soon ? "Planned contents" : "You receive"}</p>
        <p className="mt-1 text-lg font-semibold text-[#111]">{getWhatYouGet(p)}</p>
        <p className="mt-5 text-3xl font-bold text-[#111]">{money(p)}</p>
        <p className="mb-5 text-sm text-[#888]">{priceNote}</p>
        <BuyButton p={p} />
        <p className="mt-5 text-sm text-[#888]">
          <Link className="underline" href="/refund">Refund policy</Link> &middot; <Link className="underline" href="/contact">Support</Link>
        </p>
      </section>
    ),
  };

  const muted = L.dark ? "text-white/70" : "text-[#888]";
  return (
    <main className="mx-auto max-w-5xl px-5 py-10 pb-28">
      <section id="hero" className={`rounded-2xl p-6 md:p-10 ${L.dark ? "text-white" : "text-[#242424]"}`} style={L.style}>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className={`text-sm ${muted}`}>
              {cat && <Link href={`/${cat.slug}`} className="hover:underline">{cat.name}</Link>} &middot; {p.title}
              {soon && <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs text-[#242424]">Coming soon</span>}
            </p>
            <h1 className={`mt-3 text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl ${L.serif ? "font-serif" : ""} ${L.dark ? "text-white" : "text-[#111]"}`}>{f.headline}</h1>
            <p className={`mt-4 text-lg ${L.dark ? "text-white/85" : "text-[#242424]"}`}>{f.lead}</p>
            <ul className="mt-5 space-y-1">
              {p.benefits.map((x) => <li key={x} className="flex gap-2"><span aria-hidden>&#10003;</span>{x}</li>)}
            </ul>
            <p className={`mt-6 text-3xl font-bold ${L.dark ? "text-white" : "text-[#111]"}`}>{money(p)}</p>
            <p className={`mb-5 text-sm ${muted}`}>{priceNote} &middot; {p.contents.length} {soon ? "planned " : ""}items</p>
            <div className="flex flex-wrap items-center gap-4">
              <BuyButton p={p} dark={L.dark} />
              <a href="#inside" className="font-medium underline underline-offset-4">See everything inside</a>
            </div>
            {f.disclaimer && <p className={`mt-4 text-xs ${muted}`}>{f.disclaimer}</p>}
          </div>
          <ProductMockup product={p} className="aspect-[4/3] text-2xl shadow-2xl" />
        </div>
      </section>
      <nav aria-label="On this page" className="mt-4 flex gap-5 text-sm text-[#888]">
        <a href="#inside" className="hover:text-[#111]">Inside</a>
        <a href="#how" className="hover:text-[#111]">How it works</a>
        <a href="#faq" className="hover:text-[#111]">FAQ</a>
        <a href="#buy" className="hover:text-[#111]">Get it</a>
      </nav>
      <div className="mx-auto mt-12 max-w-3xl space-y-14">{layouts[f.layout].map((k) => sections[k])}</div>
      <StickyBuyBar title={p.title} price={money(p)} href={href} label={f.cta} watch={["hero", "buy"]} />
    </main>
  );
}
