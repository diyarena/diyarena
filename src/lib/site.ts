export const site = {
  name: "DIY Arena",
  url: "https://diyarena.info-diyarena.workers.dev", // switch to https://diyarena.com once the domain is connected
  tagline: "Everything you need to do it yourself.",
  handle: "@doityourselfarena",
  supportEmail: null as string | null, // set once a support address is chosen
  // Realistic hero character: upload the image to public/brand/ and set its path here.
  // headY = how far down (in %) the character's head sits, so the light streams meet it.
  heroImage: { src: "/brand/hero-character.webp", headY: 31 } as { src: string; headY: number } | null,
  // Optional photographic glass backdrop for the hero (see ASSETS_NEEDED.md). null = drawn glass layers.
  heroBackdrop: null as string | null,
};

export type InfoPage = { title: string; body: string[]; draft?: boolean };

// Lines starting with "## " render as headings.
export const infoPages: Record<string, InfoPage> = {
  about: {
    title: "About DIY Arena",
    body: [
      "DIY Arena provides practical digital resources: guides, templates, toolkits and workbooks that help people learn, create, work and build things independently.",
      "Our products are educational and informational resources. They do not guarantee scholarships, jobs, visas, income or business results.",
    ],
  },
  faq: {
    title: "Frequently asked questions",
    body: [
      "## What is DIY Arena?",
      "A store for practical digital resources across education, careers, travel, AI, content creation, business, design and productivity.",
      "## What do I receive when I buy?",
      "Digital files. Each product page lists exactly what is included.",
      "## Are results guaranteed?",
      "No. Our products are educational resources and cannot promise specific outcomes.",
    ],
  },
  contact: { title: "Contact and support", body: ["Support contact details will be published here before launch."], draft: true },
  privacy: { title: "Privacy policy", body: ["This policy will be published before the first product goes on sale."], draft: true },
  terms: { title: "Terms and conditions", body: ["These terms will be published before the first product goes on sale."], draft: true },
  refund: { title: "Refund policy", body: ["The refund policy will be published before the first product goes on sale."], draft: true },
};
