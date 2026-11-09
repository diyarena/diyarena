// Interim catalogue. Milestone 8 replaces these getters with Cloudflare D1 queries,
// so every page keeps calling the same functions and nothing else changes.

export type Category = { slug: string; name: string; description: string };

export type Product = {
  slug: string;
  title: string;
  category: string; // Category.slug
  status: "draft" | "published" | "archived";
  featured: boolean;
  price: number;
  currency: string;
  tagline: string;
  description: string;
  contents: string[];
  benefits: string[];
  audience: string[];
  notFor: string[];
  faqs: { q: string; a: string }[];
  accent: [string, string]; // product artwork colours
  checkoutUrl: string | null; // null until a payment provider is configured
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

const products: Product[] = [
  {
    slug: "faceless-youtube-channel-launch-system",
    title: "Faceless YouTube Channel Launch System",
    category: "content-creation",
    status: "published",
    featured: true,
    price: 39,
    currency: "USD",
    tagline: "Plan, launch and organise a faceless YouTube channel step by step.",
    description:
      "A structured set of workbooks, templates and checklists that helps beginners take a faceless YouTube channel from idea to first upload. One-time purchase, instant digital download.",
    contents: [
      "Channel selection workbook",
      "Niche research framework",
      "Channel branding checklist",
      "Video planning templates",
      "Scriptwriting framework",
      "Content calendar",
      "Thumbnail planning guide",
      "AI-assisted production workflow",
      "Publishing checklist",
      "Performance tracking spreadsheet",
    ],
    benefits: [
      "Choose a channel direction with a clear process instead of guesswork",
      "Plan and organise videos with ready-to-use templates",
      "Follow one repeatable workflow from idea to publish",
    ],
    audience: ["Beginners starting a YouTube channel", "Creators who prefer not to appear on camera"],
    notFor: ["Anyone expecting guaranteed views, subscribers or income. No resource can promise those results."],
    faqs: [
      { q: "Is this a one-time payment?", a: "Yes. You pay once and download the files." },
      { q: "Do I need to appear on camera?", a: "No. The system is designed for faceless channels." },
    ],
    accent: ["#FF7A59", "#7C5CFF"],
    checkoutUrl: null,
  },
];

const published = () => products.filter((p) => p.status === "published");

export const getCategories = () => categories;
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProducts = () => published();
export const getFeaturedProducts = () => published().filter((p) => p.featured);
export const getProductsByCategory = (slug: string) => published().filter((p) => p.category === slug);
export const getProduct = (slug: string) => published().find((p) => p.slug === slug);

export const money = (p: Pick<Product, "price" | "currency">) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: p.currency, minimumFractionDigits: 0 }).format(p.price);
