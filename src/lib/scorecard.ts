import type { Product } from "./catalogue";
import { infoPages, site } from "./site";

// DIY Arena Product Launch Scorecard: 100 points across 8 areas. A product needs 80 AND every hard gate
// before it may be marked "available". Items marked manual are judgements only the owner can make,
// so they stay false until the owner sets them in the product's `review` flags.
export const LAUNCH_THRESHOLD = 80;

type Check = { label: string; points: number; pass: boolean; manual?: boolean };
export type Area = { key: string; label: string; weight: number; checks: Check[]; earned: number };

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const hype = /(100%|guaranteed (income|results|jobs|scholarships|sales)|get rich|make money fast|instant results)/i;

export function scoreProduct(p: Product) {
  const f = p.funnel;
  const r = p.review;
  const refundPublished = !infoPages.refund.draft;
  const supportPublished = !!site.supportEmail && !infoPages.contact.draft;
  const copy = [f.headline, f.lead, f.problem, f.solution, p.description, p.outcome, ...f.modules.map((m) => m.text), ...f.inside].join(" ");

  const defs: { key: string; label: string; weight: number; checks: Check[] }[] = [
    { key: "problem", label: "Clear customer problem", weight: 15, checks: [
      { label: "Problem described in a full sentence", points: 3, pass: words(f.problem) >= 10 },
      { label: "Three recognisable situations", points: 4, pass: f.situations.length >= 3 },
      { label: "Target audience defined", points: 3, pass: p.audience.length > 0 },
      { label: "Who it is not for defined", points: 2, pass: p.notFor.length > 0 },
      { label: "Practical outcome stated", points: 3, pass: words(p.outcome) >= 6 },
    ] },
    { key: "quality", label: "Product quality and usefulness", weight: 20, checks: [
      { label: "All planned files created", points: 8, pass: r.filesComplete, manual: true },
      { label: "Files reviewed against the page, item by item", points: 6, pass: r.contentsReviewed, manual: true },
      { label: "Tried on a real task", points: 6, pass: r.tested, manual: true },
    ] },
    { key: "copy", label: "Strength of sales copy", weight: 15, checks: [
      { label: "Headline, intro, problem and solution written for this product", points: 4, pass: words(f.headline) >= 5 && words(f.lead) >= 10 && words(f.solution) >= 10 },
      { label: "Every contents item explained", points: 3, pass: f.inside.length === p.contents.length && f.inside.every((x) => words(x) >= 5) },
      { label: "No guarantee or hype wording", points: 2, pass: !hype.test(copy) },
      { label: "Copy reviewed and approved by the owner", points: 6, pass: r.copyReviewed, manual: true },
    ] },
    { key: "previews", label: "Product previews and presentation", weight: 10, checks: [
      { label: "Three or more real preview images", points: 6, pass: p.previews.length >= 3 },
      { label: "Real cover artwork uploaded", points: 4, pass: !!p.artwork },
    ] },
    { key: "offer", label: "Offer and pricing", weight: 10, checks: [
      { label: "Price and currency set", points: 2, pass: p.price > 0 && !!p.currency },
      { label: "Price validated with real buyers", points: 4, pass: r.priceValidated, manual: true },
      { label: "Refund policy published", points: 2, pass: refundPublished },
      { label: "Delivery details stated (file format and updates)", points: 2, pass: !!(p.specs?.format && p.specs?.updates) },
    ] },
    { key: "trust", label: "Trust and credibility", weight: 15, checks: [
      { label: "Author and relevant experience stated", points: 4, pass: !!p.author },
      { label: "Sources or official resources cited", points: 3, pass: (p.sources?.length ?? 0) > 0 },
      { label: "Content update date shown", points: 2, pass: !!p.contentUpdatedAt },
      { label: "Format and software requirements stated", points: 3, pass: !!(p.specs?.format && p.specs?.software) },
      { label: "Support contact published", points: 3, pass: supportPublished },
    ] },
    { key: "checkout", label: "Checkout and delivery experience", weight: 10, checks: [
      { label: "Checkout configured for this product", points: 4, pass: !!p.checkoutUrl },
      { label: "Paid purchase and secure download tested end to end", points: 6, pass: r.deliveryTested, manual: true },
    ] },
    { key: "mobile", label: "Mobile experience", weight: 5, checks: [
      { label: "Checked on a real phone", points: 5, pass: r.mobileChecked, manual: true },
    ] },
  ];

  const areas: Area[] = defs.map((d) => ({ ...d, earned: d.checks.filter((c) => c.pass).reduce((n, c) => n + c.points, 0) }));
  const total = areas.reduce((n, a) => n + a.earned, 0);
  const gates = [
    { label: "All files created", pass: r.filesComplete },
    { label: "Checkout configured", pass: !!p.checkoutUrl },
    { label: "Purchase and download tested end to end", pass: r.deliveryTested },
    { label: "Refund policy published", pass: refundPublished },
  ];
  return { total, areas, gates, ready: total >= LAUNCH_THRESHOLD && gates.every((g) => g.pass) };
}

// Called at build time for every product marked "available": a product that has not earned its launch fails the build.
export function assertLaunchReady(p: Product) {
  const s = scoreProduct(p);
  if (s.ready) return;
  const missing = [
    ...s.gates.filter((g) => !g.pass).map((g) => `gate: ${g.label}`),
    ...s.areas.flatMap((a) => a.checks.filter((c) => !c.pass).map((c) => `${a.label}: ${c.label} (${c.points})`)),
  ];
  throw new Error(`"${p.title}" cannot be "available": ${s.total}/100 (needs ${LAUNCH_THRESHOLD} and all gates). Missing: ${missing.join("; ")}`);
}
