import { funnels, type Funnel } from "./funnels";
import { assertLaunchReady } from "./scorecard";
import { artworkBySlug, bundleBySlug, slideshowBySlug, type Slideshow } from "./slides";

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
  price: number | null; // null until the owner sets one
  contentsKind: "files" | "topics"; // files = verified deliverables, topics = planned coverage from the product plan
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
  artwork: string | null; // real box image (hero)
  bundle?: string; // real "everything included" display (cards and contents section)
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
  slug: string; title: string; category: string; price: number | null; accent: [string, string]; featured?: boolean; kind?: "files" | "topics"; archived?: boolean;
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
    contents: ["Niche Research & Selection Workbook", "Channel Branding Worksheet", "30-Day YouTube Content Calendar", "YouTube Channel Setup Checklist", "Video Scriptwriting Framework", "Thumbnail & Title Planning Guide", "AI Prompt Library", "Monetisation Pathways Guide", "Performance Tracker", "Video Production Workflow"],
    benefits: ["Choose a channel direction with a clear process", "Plan and organise videos with ready-to-use templates", "Follow one repeatable workflow from idea to publish"],
    audience: ["Beginners starting a YouTube channel", "Creators who prefer not to appear on camera"],
    notFor: "Anyone expecting guaranteed views, subscribers or income.",
    faq: ["Do I need to appear on camera?", "No. The system is designed for faceless channels."],
  },
  {
    slug: "ai-video-content-creation-toolkit", title: "AI Movie Creation Toolkit", category: "content-creation", price: 39, accent: ["#EF4444", "#8B5CF6"], kind: "topics",
    tagline: "A structured workflow for turning story ideas and scripts into cinematic AI video.", description: "Learn how to use AI tools and structured creative workflows to turn ideas and scripts into video content, even without a production background.",
    outcome: "Work towards turning a story idea into a finished AI-assisted video using a clear workflow.",
    contents: ["Turning ideas and scripts into video content", "Using AI video tools in a structured creative workflow", "Planning scenes and the production process", "Assembling and preparing finished videos"],
    benefits: ["Turn ideas and scripts into video with a structured AI workflow", "See how the creative steps fit together before you generate anything", "Work towards a finished video you can share"],
    audience: ["Content creators, filmmakers and storytellers", "Video editors, entrepreneurs and beginners exploring AI video"],
    notFor: "Anyone expecting AI tools to create a finished film without their own creative direction.",
    faq: ["Do I need video editing experience?", "No. The toolkit is aimed at beginners as well as editors, and plans the workflow from the idea onward."],
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
    slug: "study-abroad-preparation-planner", title: "Study Abroad Application Toolkit", category: "education", price: 29, accent: ["#4F46E5", "#06B6D4"], kind: "topics",
    tagline: "Understand school requirements, documents and the stages of an international application.", description: "A practical resource for organising international school applications and understanding the stages involved, from admission requirements to student visa preparation.",
    outcome: "Work towards an organised, stage-by-stage application plan for studying abroad.",
    contents: ["School applications and admission requirements", "Admission processes and documentation", "Student visa preparation (requirements vary by country and change over time)", "The stages of applying to study abroad"],
    benefits: ["See the stages of an international application in order", "Keep each school's requirements and documents together", "Know what student visa preparation involves and where to check official rules"],
    audience: ["Students exploring international education", "Families supporting an applicant"],
    notFor: "Anyone seeking immigration or legal advice. This is general educational guidance only.",
    faq: ["Is this immigration advice?", "No. It is general educational guidance. Check official sources or a qualified adviser for visa questions."],
  },
  {
    slug: "remote-job-search-toolkit", title: "Get Hired Remotely", category: "careers", price: 29, accent: ["#12B886", "#0B7285"], kind: "topics",
    tagline: "A practical toolkit for finding remote work, positioning your skills and preparing applications.", description: "A toolkit for finding legitimate remote opportunities, presenting your skills and preparing for remote recruitment, for introverts, beginners and experienced professionals alike.",
    outcome: "Work towards a focused, well-prepared remote job search.",
    contents: ["Finding legitimate remote opportunities", "Positioning your skills for remote employers", "Preparing applications", "Navigating remote recruitment", "Improving remote job-search readiness"],
    benefits: ["Find remote opportunities worth your time", "Present your skills clearly to employers you may never meet", "Prepare applications and approach remote recruitment with more confidence"],
    audience: ["Graduates, introverts and beginners", "Professionals, freelancers and career changers"],
    notFor: "Anyone expecting guaranteed interviews, employment or a particular salary.",
    faq: ["Is this useful if I am an introvert?", "Yes. It is written with introverts in mind: the focus is on preparing your skills and applications, not on performing."],
  },
  {
    slug: "ai-productivity-toolkit", title: "Make Your AI Do Anything", category: "ai-automation", price: 29, accent: ["#7048E8", "#C026D3"], featured: true, kind: "topics",
    tagline: "A planned collection of practical AI prompts for everyday tasks, learning, research and business.", description: "A prompt collection for beginners who have AI tools but are unsure what to ask, covering everyday tasks, learning, research, creativity, productivity and business.",
    outcome: "Work towards getting more useful results from the AI tools you already have.",
    contents: ["Prompts for everyday tasks", "Prompts for learning and research", "Prompts for creativity", "Prompts for productivity", "Prompts for business"],
    benefits: ["Start from ready-made prompts instead of a blank box", "Explore AI for learning, research, creativity and business", "See how prompts are worded for different kinds of task"],
    audience: ["AI beginners, students and professionals", "Creators, entrepreneurs and small business owners"],
    notFor: "Anyone expecting AI to replace their own judgement. Always review AI output.",
    faq: ["Is it really 1,000 prompts?", "That is the planned size of the collection. The final prompt count will be confirmed on this page before release."],
  },
  {
    slug: "ai-business-automation-starter-kit", title: "AI Automation for Founders & CEOs", category: "ai-automation", price: 49, accent: ["#0F172A", "#2563EB"], kind: "topics",
    tagline: "A practical introduction to AI automation, workflows and business integrations.", description: "A guide for founders and operators who want to reduce repetitive work by building AI-powered workflows and connecting the tools their business already uses.",
    outcome: "Work towards fewer repetitive tasks and a clearer view of what is worth automating.",
    contents: ["AI automation and how it works", "Building AI-powered workflows", "Connecting business tools through integrations", "Improving business processes", "Keeping human oversight in the loop"],
    benefits: ["Spot the repetitive work in your business", "Understand how AI-powered workflows are built", "See how business tools connect, and where people still need to oversee the process"],
    audience: ["Founders, CEOs and business owners", "Entrepreneurs and operations professionals"],
    notFor: "Anyone who expects every workflow to work with every platform, or automation to run without human oversight.",
    faq: ["Will every workflow work with every platform?", "No. What can be connected depends on each platform, and the toolkit will say what it covers. Automations also need testing and human oversight."],
  },
  {
    slug: "digital-product-creation-blueprint", title: "Mint Money With Digital Products", category: "business", price: 39, accent: ["#F59F00", "#E8590C"], kind: "topics",
    tagline: "A beginner's blueprint for creating, packaging, marketing and selling digital products online.", description: "A structured introduction for people with knowledge, skills or ideas who want to turn them into a digital product, from research through packaging to marketing.",
    outcome: "Work towards a digital product idea that is shaped, packaged and ready to market.",
    contents: ["Researching product ideas", "Creating a digital product", "Packaging and positioning your offer", "Marketing and selling online"],
    benefits: ["Turn what you know into a product idea people could buy", "Learn how digital products are packaged and positioned", "See how digital products are marketed and sold online"],
    audience: ["Aspiring digital entrepreneurs, creators and freelancers", "Coaches and anyone who wants to sell digital products"],
    notFor: "Anyone expecting guaranteed sales or income.",
    faq: ["Is it only for ebooks?", "No. The blueprint applies to many kinds of digital product, such as guides, templates and toolkits."],
  },
  {
    slug: "data-annotation-career-starter-kit", title: "Data Annotation Career Starter Kit", category: "careers", price: null, accent: ["#0EA5E9", "#6366F1"], kind: "topics",
    tagline: "An introduction to AI data annotation: concepts, task types, techniques and preparation.", description: "An introductory learning resource for beginners curious about the human work behind AI, covering annotation concepts, task types, practical techniques and how to prepare.",
    outcome: "Work towards understanding annotation work well enough to prepare for entry-level opportunities.",
    contents: ["Annotation concepts", "Common annotation task types", "Practical techniques and quality standards", "Tools used in annotation work", "Preparing for entry-level opportunities"],
    benefits: ["Understand what annotation tasks involve", "Learn practical techniques and what quality standards mean", "Know how to prepare before looking for entry-level opportunities"],
    audience: ["Beginners, students and graduates", "People exploring opportunities in AI data annotation"],
    notFor: "Anyone expecting guaranteed access to annotation platforms, acceptance or earnings.",
    faq: ["Do I need a technical background?", "No. It is an introductory resource for beginners, students and graduates."],
  },
  {
    slug: "cybersecurity-career-starter-manual", title: "Cybersecurity Career Starter Manual", category: "careers", price: null, accent: ["#0F766E", "#0EA5E9"], kind: "topics",
    tagline: "A beginner-friendly foundation in cybersecurity, digital safety and common threats.", description: "A manual for beginners who find cybersecurity intimidating, covering core concepts, digital safety, common threats and where to go next.",
    outcome: "Work towards understanding cybersecurity basics and where to continue learning.",
    contents: ["Cybersecurity concepts", "Digital safety", "Common threats", "Learning pathways into the field", "Essential security skills"],
    benefits: ["Learn core cybersecurity concepts in plain language", "Understand common threats and basic digital safety", "See learning pathways for taking the subject further"],
    audience: ["Beginners and students", "Aspiring cybersecurity professionals and career changers"],
    notFor: "Anyone looking to attack or gain access to systems they do not own. The material is educational and defensive.",
    faq: ["Do I need to know how to code?", "No. It is a beginner-friendly introduction that starts from concepts and digital safety."],
  },
  {
    slug: "small-business-digital-marketing-toolkit", title: "Digital Marketing Starter Blueprint", category: "business", price: 39, accent: ["#1D4ED8", "#0891B2"], kind: "topics",
    tagline: "A structured introduction to digital marketing, from audience research to campaign planning.", description: "A blueprint for beginners and small business owners covering the essentials of digital marketing: content, audience research, social media, SEO, advertising and campaign planning.",
    outcome: "Work towards a marketing plan built around a defined audience.",
    contents: ["Digital marketing essentials", "Content and audience research", "Social media", "SEO", "Advertising", "Campaign planning"],
    benefits: ["Understand the main parts of digital marketing in one place", "Learn how audience research shapes content and campaigns", "See how SEO, social media and advertising fit together"],
    audience: ["Beginners and aspiring digital marketers", "Entrepreneurs, small business owners and freelancers"],
    notFor: "Anyone expecting guaranteed leads or sales.",
    faq: ["Do I need a marketing background?", "No. It is a structured introduction for beginners, entrepreneurs and small business owners."],
  },
  {
    slug: "the-book-launch-machine", title: "The Book Launch Machine", category: "content-creation", price: null, accent: ["#7C3AED", "#DB2777"], kind: "topics",
    tagline: "An AI-assisted workflow for planning, writing, editing, publishing and marketing a book.", description: "A toolkit for aspiring authors that organises the book process from first idea to launch, with AI used as an assistant while you remain the author.",
    outcome: "Work towards a book with a plan, a writing process and a route to publication.",
    contents: ["Planning and researching a book", "Writing with AI assistance", "Editing", "Publishing", "Marketing and launching"],
    benefits: ["Organise the whole book process in one workflow", "Use AI to assist with research, writing and editing", "See the path from finished draft to publishing and marketing"],
    audience: ["Aspiring and first-time authors", "Entrepreneurs, coaches and professionals with a book idea"],
    notFor: "Anyone expecting AI to produce a publication-ready or commercially successful book on its own.",
    faq: ["Will AI write my book for me?", "No. The workflow uses AI to assist with planning, drafting and editing, and you remain the author who directs and reviews the work."],
  },
  {
    slug: "budget-international-travel-planner", archived: true, title: "Budget International Travel Planner", category: "travel",
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
    slug: "canva-brand-identity-starter-kit", archived: true, title: "Canva Brand Identity Starter Kit", category: "design",
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
    slug: "personal-productivity-focus-system", archived: true, title: "Personal Productivity & Focus System", category: "productivity",
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
];

for (const s of specs) if (!funnels[s.slug]) throw new Error(`Missing sales-page content for ${s.slug}`);

// Nothing is purchasable until its files and checkout exist, so every product starts as "coming-soon".
const products: Product[] = specs.map((s) => ({
  slug: s.slug, title: s.title, category: s.category, status: s.archived ? "archived" : "published", contentsKind: s.kind ?? "files", availability: "coming-soon",
  featured: !!s.featured, price: s.price, currency: "USD", tagline: s.tagline, description: s.description,
  outcome: s.outcome, addedAt: "2026-11-09",
  contents: s.contents, benefits: s.benefits, audience: s.audience, notFor: [funnels[s.slug].notFor2, s.notFor].filter((x) => !x.startsWith("Anyone expecting guaranteed")),
  faqs: [
    { q: s.faq[0], a: s.faq[1] },
    { q: funnels[s.slug].faq2[0], a: funnels[s.slug].faq2[1] },
    { q: "Is this a one-time payment?", a: "Yes. You will pay once and download the files." },
    { q: "When will it be available?", a: "This resource is still being prepared. What is described on this page is planned and may change before release." },
  ],
  accent: s.accent, checkoutUrl: null, seoTitle: funnels[s.slug].seo?.title ?? s.title, seoDescription: funnels[s.slug].seo?.description ?? funnels[s.slug].lead, funnel: funnels[s.slug],
  previews: [], artwork: artworkBySlug[s.slug] ?? null, bundle: bundleBySlug[s.slug], slideshow: slideshowBySlug[s.slug],
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
  if (p.contentsKind === "files" && p.funnel.inside.length !== p.contents.length) throw new Error(`Contents and explanations differ in length: ${p.slug}`);
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
  p.price == null ? "Price to be announced" : new Intl.NumberFormat("en-US", { style: "currency", currency: p.currency, minimumFractionDigits: 0 }).format(p.price);
