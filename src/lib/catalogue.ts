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
  contents: string[]; // planned contents until availability is "available"
  benefits: string[];
  audience: string[];
  notFor: string[];
  faqs: { q: string; a: string }[];
  accent: [string, string]; // product artwork colours
  checkoutUrl: string | null;
  seoTitle: string;
  seoDescription: string;
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
  tagline: string; description: string; contents: string[]; benefits: string[]; audience: string[];
  notFor: string; faq: [string, string];
};

const specs: Spec[] = [
  {
    slug: "faceless-youtube-channel-launch-system", title: "Faceless YouTube Channel Launch System", category: "content-creation",
    price: 39, accent: ["#FF7A59", "#7C5CFF"], featured: true,
    tagline: "Plan, launch and organise a faceless YouTube channel step by step.",
    description: "A structured set of workbooks, templates and checklists for beginners taking a faceless YouTube channel from idea to first upload.",
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
    contents: ["Remote job search workbook", "CV templates", "Cover letter templates", "Job application tracker", "Interview preparation guide", "Portfolio checklist", "Professional profile optimisation guide"],
    benefits: ["Keep every application organised", "Prepare CVs and cover letters from templates", "Practise for interviews with a guide"],
    audience: ["Job seekers looking for remote roles", "Professionals changing careers"],
    notFor: "Anyone expecting guaranteed employment.",
    faq: ["Does it include job listings?", "No. It is a set of tools and templates, not a job board."],
  },
  {
    slug: "ai-productivity-toolkit", title: "AI Productivity Toolkit", category: "ai-automation",
    price: 29, accent: ["#7048E8", "#C026D3"], featured: true,
    tagline: "Practical AI prompts and workflows for everyday work.",
    description: "Prompts, workflows and templates for using AI tools to plan, research and write more efficiently.",
    contents: ["Practical AI prompt library", "Productivity workflows", "Research templates", "Writing workflows", "Planning templates", "Task automation examples", "Tool selection guide"],
    benefits: ["Save time on repeated tasks", "Use AI tools with ready-made prompts", "Choose tools with a simple guide"],
    audience: ["Professionals and students", "Freelancers and small teams"],
    notFor: "Anyone expecting AI to replace their own judgement. Always review AI output.",
    faq: ["Which AI tools does it cover?", "The tools covered will be listed on this page before launch."],
  },
  {
    slug: "digital-product-creation-blueprint", title: "Digital Product Creation & Launch Blueprint", category: "business",
    price: 39, accent: ["#F59F00", "#E8590C"],
    tagline: "Go from product idea to launch with a clear framework.",
    description: "Frameworks and checklists to research, create, price and launch your own digital product.",
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
    contents: ["Video concept framework", "Script templates", "AI video production workflow", "Voiceover planning guide", "Editing checklist", "Publishing calendar", "Content performance tracker"],
    benefits: ["Plan videos around clear concepts", "Follow one production workflow", "Track what works"],
    audience: ["Content creators", "Small businesses making video"],
    notFor: "Anyone expecting guaranteed views or growth.",
    faq: ["Which AI video tools are covered?", "The tools covered will be listed on this page before launch."],
  },
  {
    slug: "small-business-digital-marketing-toolkit", title: "Small Business Digital Marketing Toolkit", category: "business",
    price: 39, accent: ["#1D4ED8", "#0891B2"],
    tagline: "Plan and track your marketing in one toolkit.",
    description: "Worksheets and templates to plan marketing, define your customer and track results.",
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
    contents: ["Weekly planning workbook", "Goal-setting template", "Focus session planner", "Habit tracker", "Project tracker", "Reflection worksheets"],
    benefits: ["Plan each week with intent", "Track goals and habits", "Build a regular reflection routine"],
    audience: ["Students and professionals", "Anyone who wants a simple planning system"],
    notFor: "Anyone seeking medical or mental-health treatment. This is a planning tool.",
    faq: ["Is it digital or printable?", "The format will be confirmed on this page before launch."],
  },
  {
    slug: "study-abroad-preparation-planner", title: "Study Abroad Preparation Planner", category: "education",
    price: 29, accent: ["#4F46E5", "#06B6D4"],
    tagline: "Compare destinations and prepare your study-abroad plan.",
    description: "Worksheets and checklists to compare destinations, track universities and prepare documents and budgets.",
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
    contents: ["Automation planning workbook", "Workflow diagrams", "Practical n8n examples", "Lead management workflow", "Customer follow-up workflow", "Business process templates", "Implementation instructions"],
    benefits: ["Map processes before automating", "Start from example workflows", "Follow step-by-step implementation notes"],
    audience: ["Small business owners", "Freelancers and operators"],
    notFor: "Anyone expecting automations to work without setup and testing.",
    faq: ["Which tools do I need?", "Tool requirements will be listed per workflow before launch."],
  },
];

// Nothing is purchasable until its files and checkout exist, so every product starts as "coming-soon".
const products: Product[] = specs.map((s) => ({
  slug: s.slug, title: s.title, category: s.category, status: "published", availability: "coming-soon",
  featured: !!s.featured, price: s.price, currency: "USD", tagline: s.tagline, description: s.description,
  contents: s.contents, benefits: s.benefits, audience: s.audience, notFor: [s.notFor],
  faqs: [
    { q: s.faq[0], a: s.faq[1] },
    { q: "Is this a one-time payment?", a: "Yes. You will pay once and download the files." },
    { q: "When will it be available?", a: "This resource is still being prepared. The contents listed are planned and may change." },
  ],
  accent: s.accent, checkoutUrl: null, seoTitle: s.title, seoDescription: s.description,
}));

const published = () => products.filter((p) => p.status === "published");

export const getCategories = () => categories;
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProducts = () => published();
export const getFeaturedProducts = () => published().filter((p) => p.featured);
export const getProductsByCategory = (slug: string) => published().filter((p) => p.category === slug);
export const getProduct = (slug: string) => published().find((p) => p.slug === slug);

export const money = (p: Pick<Product, "price" | "currency">) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: p.currency, minimumFractionDigits: 0 }).format(p.price);
