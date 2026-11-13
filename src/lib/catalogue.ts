import { funnels, type Funnel } from "./funnels";
import { assertLaunchReady } from "./scorecard";
import { artworkBySlug, slideshowBySlug, type Slideshow } from "./slides";

// Interim catalogue. The next milestone replaces these getters with Cloudflare D1 queries,
// so pages, the menu and /links keep calling the same functions.
// Array order = display order (the admin dashboard will control this later).

export type Category = { slug: string; name: string; description: string };

export type Product = {
  slug: string;
  title: string;
  category: string; // Category.slug
  status: "draft" | "published" | "archived";
  availability: "available" | "coming-soon"; // coming-soon = page is live, purchase is not
  featured: boolean;
  price: number;
  currency: string;
  tagline: string;
  description: string;
  outcome: string; // the practical result the buyer works towards
  addedAt: string; // ISO date the record was created
  contents: string[]; // planned contents until availability is "available"
  benefits: string[];
  audience: string[];
  notFor: string[];
  faqs: { q: string; a: string }[];
  accent: [string, string]; // product artwork colours
  checkoutUrl: string | null;
  seoTitle: string;
  seoDescription: string;
  funnel: Funnel; // product-specific sales page content
  specs?: { format?: string; software?: string; updates?: string; support?: string }; // shown only once the owner confirms them
  slideshow?: Slideshow; // evidence slideshow shown in the laptop (see slides.ts)
  previews: string[]; // real preview images of the actual files (3+ needed to launch)
  artwork: string | null; // real cover or mockup image
  author?: string; // shown in the trust section when provided
  sources?: string[]; // official resources or research the product relies on
  contentUpdatedAt?: string; // ISO date the content was last updated
  bonuses?: { name: string; description: string; file: string }[]; // genuine extras with an actual file
  review: { // owner judgements the scorecard cannot make for you; all start false
    filesComplete: boolean; contentsReviewed: boolean; tested: boolean; copyReviewed: boolean;
    priceValidated: boolean; deliveryTested: boolean; mobileChecked: boolean;
  };
};

export const categories: Category[] = [
  { slug: "education", name: "Education & Scholarships", description: "Research, plan and apply for study opportunities." },
  { slug: "careers", name: "Careers & Remote Work", description: "Tools for finding and applying for work." },
  { slug: "travel", name: "Travel & Relocation", description: "Plan trips, moves and travel costs." },
  { slug: "ai-automation", name: "AI & Automation", description: "Practical workflows with AI and automation tools." },
  { slug: "content-creation", name: "Content Creation", description: "Plan, produce and publish your content." },
  { slug: "business", name: "Business & Entrepreneurship", description: "Frameworks for building and launching." },
  { slug: "design", name: "Design & Creativity", description: "Templates and guides for creative work." },
  { slug: "productivity", name: "Productivity & Personal Development", description: "Systems for focus, planning and habits." },
];

type Spec = {
  slug: string; title: string; category: string; price: number; accent: [string, string]; featured?: boolean;
  tagline: string; description: string; outcome: string; contents: string[]; benefits: string[]; audience: string[];
  notFor: string; faq: [string, string];
};

const specs: Spec[] = [
  {
    slug: "faceless-youtube-channel-launch-system", title: "Faceless YouTube Channel Launch System", category: "content-creation",
    price: 39, accent: ["#FF7A59", "#7C5CFF"], featured: true,
    tagline: "Plan, launch and organise a faceless YouTube channel step by step.",
    description: "A structured set of workbooks, templates and checklists for beginners taking a faceless YouTube channel from idea to first upload.",
    outcome: "Work towards a launched faceless channel with a consistent publishing routine.",
    contents: ["Channel selection workbook", "Niche research framework", "Channel branding checklist", "Video planning templates", "Scriptwriting framework", "Content calendar", "Thumbnail planning guide", "AI-assisted production workflow", "Publishing checklist", "Performance tracking spreadsheet"],
    benefits: ["Choose a channel direction with a clear process", "Plan and organise videos with ready-to-use templates", "Follow one repeatable workflow from idea to publish"],
    audience: ["Beginners starting a YouTube channel", "Creators who prefer not to appear on camera"],
    notFor: "Anyone expecting guaranteed views, subscribers or income.",
    faq: ["Do I need to appear on camera?", "No. The system is designed for faceless channels."],
  },
  {
    slug: "fully-funded-scholarship-toolkit", title: "Fully Funded Scholarship Research & Application Toolkit", category: "education",
    price: 39, accent: ["#2E7DFF", "#22C1C3"], featured: true,
    tagline: "Research opportunities and organise your scholarship applications.",
    description: "Frameworks, trackers and templates to help you research scholarships and universities and prepare applications in an organised way.",
    outcome: "Work towards a well-organised, on-time set of scholarship applications.",
    contents: ["Scholarship research framework", "University research spreadsheet", "Application planning workbook", "Personal statement planning guide", "CV templates", "Recommendation request templates", "Application checklist", "Interview preparation resources"],
    benefits: ["Keep your research in one place", "Track requirements and deadlines", "Prepare each application with a clear checklist"],
    audience: ["Students planning to apply for scholarships", "Applicants managing several applications"],
    notFor: "Anyone expecting guaranteed scholarships, admission or funding. This product does not guarantee them.",
    faq: ["Does this guarantee a scholarship?", "No. It helps you organise your research and applications. Outcomes depend on you and the selection committees."],
  },
  {
    slug: "remote-job-search-toolkit", title: "Remote Job Search Toolkit", category: "careers",
    price: 29, accent: ["#12B886", "#0B7285"],
    tagline: "Organise your remote job search from CV to interview.",
    description: "Workbooks, templates and trackers to help you prepare applications and manage a remote job search.",
    outcome: "Work towards a structured, trackable remote job search.",
    contents: ["Remote job search workbook", "CV templates", "Cover letter templates", "Job application tracker", "Interview preparation guide", "Portfolio checklist", "Professional profile optimisation guide"],
    benefits: ["Keep every application organised", "Prepare CVs and cover letters from templates", "Practise for interviews with a guide"],
    audience: ["Job seekers looking for remote roles", "Professionals changing careers"],
    notFor: "Anyone expecting guaranteed employment.",
    faq: ["Is a portfolio required?", "No. The portfolio checklist is one part of the toolkit. The CV, cover letter and tracker templates work without one."],
  },
  {
    slug: "ai-productivity-toolkit", title: "AI Productivity Toolkit", category: "ai-automation",
    price: 29, accent: ["#7048E8", "#C026D3"], featured: true,
    tagline: "Practical AI prompts and workflows for everyday work.",
    description: "Prompts, workflows and templates for using AI tools to plan, research and write more efficiently.",
    outcome: "Work towards faster, more consistent everyday work with AI tools.",
    contents: ["Practical AI prompt library", "Productivity workflows", "Research templates", "Writing workflows", "Planning templates", "Task automation examples", "Tool selection guide"],
    benefits: ["Save time on repeated tasks", "Use AI tools with ready-made prompts", "Choose tools with a simple guide"],
    audience: ["Professionals and students", "Freelancers and small teams"],
    notFor: "Anyone expecting AI to replace their own judgement. Always review AI output.",
    faq: ["Will this still be useful if AI tools change?", "AI tools change quickly, so the prompts and workflows are designed to be adapted, and the tool selection guide focuses on how to choose rather than on one product."],
  },
  {
    slug: "digital-product-creation-blueprint", title: "Digital Product Creation & Launch Blueprint", category: "business",
    price: 39, accent: ["#F59F00", "#E8590C"],
    tagline: "Go from product idea to launch with a clear framework.",
    description: "Frameworks and checklists to research, create, price and launch your own digital product.",
    outcome: "Work towards launching your first digital product with a clear plan.",
    contents: ["Product research framework", "Product development workbook", "Offer creation guide", "Pricing worksheet", "Landing page template", "Product launch checklist", "Marketing content planner"],
    benefits: ["Test ideas before you build", "Price and position your offer clearly", "Launch with a checklist"],
    audience: ["Aspiring digital-product creators", "Creators and freelancers"],
    notFor: "Anyone expecting guaranteed sales or income.",
    faq: ["Do I need a website?", "Not to start. The blueprint covers the planning steps first."],
  },
  {
    slug: "budget-international-travel-planner", title: "Budget International Travel Planner", category: "travel",
    price: 19, accent: ["#0EA5E9", "#34D399"],
    tagline: "Plan trips and track costs in one place.",
    description: "Spreadsheets and checklists to plan an international trip, compare options and track expenses.",
    outcome: "Work towards a trip that is planned and budgeted before you book.",
    contents: ["Travel budgeting spreadsheet", "Trip planning workbook", "Destination research template", "Travel preparation checklist", "Accommodation comparison sheet", "Packing list", "Travel expense tracker"],
    benefits: ["Know your trip budget before you book", "Compare accommodation side by side", "Track spending while you travel"],
    audience: ["Budget-conscious travellers", "People planning a trip abroad"],
    notFor: "Anyone looking for visa or immigration advice.",
    faq: ["Does it include visa guidance?", "No. Always check official sources for entry requirements."],
  },
  {
    slug: "canva-brand-identity-starter-kit", title: "Canva Brand Identity Starter Kit", category: "design",
    price: 29, accent: ["#EC4899", "#F97316"],
    tagline: "Build a consistent brand identity in Canva.",
    description: "Workbooks, templates and guides for defining and applying a simple brand identity.",
    outcome: "Work towards a consistent, ready-to-use brand identity.",
    contents: ["Brand strategy workbook", "Colour palette templates", "Typography selection guide", "Brand board templates", "Social media templates", "Brand consistency checklist"],
    benefits: ["Define your brand before you design", "Keep colours and fonts consistent", "Start from ready-made templates"],
    audience: ["Small business owners and creators", "Beginners new to branding"],
    notFor: "Anyone needing custom logo design. This is a starter kit of templates.",
    faq: ["Do I need Canva?", "The templates are designed to be used in Canva."],
  },
  {
    slug: "ai-video-content-creation-toolkit", title: "AI Video Content Creation Toolkit", category: "content-creation",
    price: 39, accent: ["#EF4444", "#8B5CF6"],
    tagline: "Plan, script and publish AI-assisted videos.",
    description: "Frameworks and templates for planning, scripting and publishing video content with AI tools.",
    outcome: "Work towards a repeatable process for producing AI-assisted videos.",
    contents: ["Video concept framework", "Script templates", "AI video production workflow", "Voiceover planning guide", "Editing checklist", "Publishing calendar", "Content performance tracker"],
    benefits: ["Plan videos around clear concepts", "Follow one production workflow", "Track what works"],
    audience: ["Content creators", "Small businesses making video"],
    notFor: "Anyone expecting guaranteed views or growth.",
    faq: ["Does the workflow depend on one AI video tool?", "The workflow is organised around the stages every video goes through, so you can follow it with the tools you prefer."],
  },
  {
    slug: "small-business-digital-marketing-toolkit", title: "Small Business Digital Marketing Toolkit", category: "business",
    price: 39, accent: ["#1D4ED8", "#0891B2"],
    tagline: "Plan and track your marketing in one toolkit.",
    description: "Worksheets and templates to plan marketing, define your customer and track results.",
    outcome: "Work towards a simple marketing plan you can follow and measure.",
    contents: ["Marketing strategy workbook", "Customer profile template", "Social media content calendar", "Campaign planning worksheet", "Brand messaging templates", "Performance tracker"],
    benefits: ["Define who you are marketing to", "Plan content ahead of time", "Measure what you do"],
    audience: ["Small business owners", "Freelancers promoting their services"],
    notFor: "Anyone expecting guaranteed leads or sales.",
    faq: ["Is this for a specific industry?", "No. The templates are general and can be adapted."],
  },
  {
    slug: "personal-productivity-focus-system", title: "Personal Productivity & Focus System", category: "productivity",
    price: 19, accent: ["#16A34A", "#65A30D"],
    tagline: "Plan your week, set goals and protect your focus.",
    description: "Planners and trackers for weekly planning, goal setting, habits and focused work sessions.",
    outcome: "Work towards a weekly routine that keeps your goals and focus on track.",
    contents: ["Weekly planning workbook", "Goal-setting template", "Focus session planner", "Habit tracker", "Project tracker", "Reflection worksheets"],
    benefits: ["Plan each week with intent", "Track goals and habits", "Build a regular reflection routine"],
    audience: ["Students and professionals", "Anyone who wants a simple planning system"],
    notFor: "Anyone seeking medical or mental-health treatment. This is a planning tool.",
    faq: ["Is this a habit-building course?", "No. It is a set of planners and trackers, not a course or coaching programme."],
  },
  {
    slug: "study-abroad-preparation-planner", title: "Study Abroad Preparation Planner", category: "education",
    price: 29, accent: ["#4F46E5", "#06B6D4"],
    tagline: "Compare destinations and prepare your study-abroad plan.",
    description: "Worksheets and checklists to compare destinations, track universities and prepare documents and budgets.",
    outcome: "Work towards a clear, organised plan for studying abroad.",
    contents: ["Study destination comparison worksheet", "University research tracker", "Document preparation checklist", "Application timeline", "Budget planning spreadsheet", "Preparation workbook"],
    benefits: ["Compare options side by side", "Track documents and deadlines", "Plan your budget early"],
    audience: ["Prospective international students", "Families supporting an applicant"],
    notFor: "Anyone seeking immigration or legal advice. This is general educational guidance only.",
    faq: ["Is this immigration advice?", "No. It is general educational guidance. Check official sources or a qualified adviser for visa questions."],
  },
  {
    slug: "ai-business-automation-starter-kit", title: "AI Business Automation Starter Kit", category: "ai-automation",
    price: 49, accent: ["#0F172A", "#2563EB"],
    tagline: "Plan and build simple business automations.",
    description: "Planning workbooks and workflow examples for automating routine business processes.",
    outcome: "Work towards your first working business automations, tested step by step.",
    contents: ["Automation planning workbook", "Workflow diagrams", "Practical n8n examples", "Lead management workflow", "Customer follow-up workflow", "Business process templates", "Implementation instructions"],
    benefits: ["Map processes before automating", "Start from example workflows", "Follow step-by-step implementation notes"],
    audience: ["Small business owners", "Freelancers and operators"],
    notFor: "Anyone expecting automations to work without setup and testing.",
    faq: ["Do I need an n8n account?", "The examples are built in n8n, so you will need access to n8n to follow them. The implementation instructions are meant to guide you through each build."],
  },
];

for (const s of specs) if (!funnels[s.slug]) throw new Error(`Missing sales-page content for ${s.slug}`);

// Nothing is purchasable until its files and checkout exist, so every product starts as "coming-soon".
const products: Product[] = specs.map((s) => ({
  slug: s.slug, title: s.title, category: s.category, status: "published", availability: "coming-soon",
  featured: !!s.featured, price: s.price, currency: "USD", tagline: s.tagline, description: s.description,
  outcome: s.outcome, addedAt: "2026-11-09",
  contents: s.contents, benefits: s.benefits, audience: s.audience, notFor: [funnels[s.slug].notFor2, s.notFor].filter((x) => !x.startsWith("Anyone expecting guaranteed")),
  faqs: [
    { q: s.faq[0], a: s.faq[1] },
    { q: funnels[s.slug].faq2[0], a: funnels[s.slug].faq2[1] },
    { q: "Is this a one-time payment?", a: "Yes. You will pay once and download the files." },
    { q: "When will it be available?", a: "This resource is still being prepared. The contents listed are planned and may change." },
  ],
  accent: s.accent, checkoutUrl: null, seoTitle: s.title, seoDescription: funnels[s.slug].lead, funnel: funnels[s.slug],
  previews: [], artwork: artworkBySlug[s.slug] ?? null, slideshow: slideshowBySlug[s.slug],
  review: { filesComplete: false, contentsReviewed: false, tested: false, copyReviewed: false, priceValidated: false, deliveryTested: false, mobileChecked: false },
}));

// Guard: a duplicate slug or title stops the build instead of silently shipping two products.
for (const key of ["slug", "title"] as const) {
  const seen = new Set<string>();
  for (const p of products) {
    const v = p[key].trim().toLowerCase();
    if (seen.has(v)) throw new Error(`Duplicate product ${key}: ${p[key]}`);
    seen.add(v);
  }
}

const unique = (label: string, values: string[]) => {
  const seen = new Set<string>();
  for (const v of values) {
    const k = v.trim().toLowerCase();
    if (seen.has(k)) throw new Error(`Duplicate ${label}: ${v}`);
    seen.add(k);
  }
};
for (const p of products) {
  if (p.funnel.inside.length !== p.contents.length) throw new Error(`Contents and explanations differ in length: ${p.slug}`);
}
unique("headline", products.map((p) => p.funnel.headline));
unique("not-for qualifier", products.map((p) => p.funnel.notFor2));
unique("transformation", products.map((p) => p.funnel.before));
unique("problem text", products.map((p) => p.funnel.problem));
unique("solution text", products.map((p) => p.funnel.solution));
unique("SEO description", products.map((p) => p.seoDescription));
unique("product FAQ question", products.flatMap((p) => p.faqs.slice(0, 2).map((f) => f.q)));

// Launch gate: a product may only be "available" once its scorecard reaches the threshold and every gate passes.
products.filter((p) => p.availability === "available").forEach(assertLaunchReady);

const published = () => products.filter((p) => p.status === "published");

export const getCategories = () => categories;
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProducts = () => published();
// Store order: featured first, then catalogue order (admin ordering comes with D1).
export const getStoreProducts = () => [...published()].sort((a, b) => Number(b.featured) - Number(a.featured));
// Best sellers and trending need verified sales data (D1 + payments). Until then they stay empty,
// so no section or badge appears that has not been earned.
export const getBestSellers = (): Product[] => [];
export const getTrendingProducts = (): Product[] => [];
// Only meaningful once products have different creation dates.
export const getRecentlyAdded = (limit = 4): Product[] => {
  const list = published();
  if (new Set(list.map((p) => p.addedAt)).size < 2) return [];
  return [...list].sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, limit);
};
export const getWhatYouGet = (p: Product) => {
  const first = p.contents.slice(0, 4);
  const rest = p.contents.length - first.length;
  return first.join(", ") + (rest > 0 ? ` and ${rest} more` : "");
};
export const getFeaturedProducts = () => published().filter((p) => p.featured);
export const getProductsByCategory = (slug: string) => published().filter((p) => p.category === slug);
export const getProduct = (slug: string) => published().find((p) => p.slug === slug);

export const money = (p: Pick<Product, "price" | "currency">) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: p.currency, minimumFractionDigits: 0 }).format(p.price);
