// Evidence slideshow shown inside the laptop on a product page.
// Rules: slides are the supplied banners, unaltered. Every slide says what kind of evidence it is and where it comes from.
// A slide may never imply the product caused a result. Disable a slide with enabled: false.

export type SlideKind = "illustrative" | "third-party" | "industry" | "demo" | "testimonial";
export type Slide = { src: string; alt: string; caption: string; kind: SlideKind; source: string; enabled: boolean };
export type Slideshow = { title: string; intro: string; slides: Slide[] };

export const kindLabel: Record<SlideKind, string> = {
  illustrative: "Illustrative graphic",
  "third-party": "Third-party example",
  industry: "Public information",
  demo: "Product demonstration",
  testimonial: "Customer testimonial",
};

export const SLIDESHOW_DISCLAIMER =
  "Everything shown here comes from public sources or is illustrative. None of it is a result achieved by DIY Arena customers. Individual results vary and are not guaranteed.";

const d = "/products/faceless-youtube";
const channel = "Public YouTube channel page. Not a DIY Arena customer, and not a result of this product.";

export const slideshowBySlug: Record<string, Slideshow> = {
  "faceless-youtube-channel-launch-system": {
    title: "Faceless channels in practice",
    intro: "Public examples and background on what faceless YouTube channels look like, so you can judge the idea before you buy.",
    slides: [
      { src: `${d}/slide-01.webp`, alt: "Illustrative revenue graphic showing $9,336 with the question: how much money can you realistically make from faceless YouTube channels?", caption: "How much can faceless channels realistically earn?", kind: "illustrative", source: "Illustrative graphic. The figure is not a verified result and not an outcome of this product.", enabled: true },
      { src: `${d}/slide-02.webp`, alt: "Banner: lessons from failed faceless YouTube channels on Reddit, showing failure and lesson.", caption: "Lessons from failed faceless channels on Reddit", kind: "third-party", source: "Screenshot of a public Reddit discussion. Not a DIY Arena customer.", enabled: true },
      { src: `${d}/slide-03.webp`, alt: "Banner asking whether faceless YouTube channels are worth it, with a sample analytics dashboard behind a question mark.", caption: "Are faceless YouTube channels worth it?", kind: "illustrative", source: "Illustrative graphic with sample analytics figures. Not a verified result.", enabled: true },
      { src: `${d}/slide-04.webp`, alt: "Banner: step by step, how to monetize a faceless YouTube channel, showing YouTube Partner Program eligibility of 1,000 subscribers plus 4,000 watch hours or 10 million Shorts views.", caption: "How a channel becomes eligible to earn from ads", kind: "industry", source: "YouTube Partner Program eligibility as shown on the supplied banner. Requirements change, so check YouTube's official page before relying on them.", enabled: true },
      { src: `${d}/slide-05.webp`, alt: "The Coding Sloth, a coding channel, with its channel page and recent videos.", caption: "The Coding Sloth: a coding channel", kind: "third-party", source: channel, enabled: true },
      { src: `${d}/slide-06.webp`, alt: "easy, actually, a self improvement channel, with its channel page and recent videos.", caption: "easy, actually: a self-improvement channel", kind: "third-party", source: channel, enabled: true },
      { src: `${d}/slide-07.webp`, alt: "Modern Ideas, a self improvement channel, with its channel page and recent videos.", caption: "Modern Ideas: a self-improvement channel", kind: "third-party", source: channel, enabled: true },
      { src: `${d}/slide-08.webp`, alt: "Primate Economics, a finance channel, with its channel page and recent videos.", caption: "Primate Economics: a finance channel", kind: "third-party", source: channel, enabled: true },
      { src: `${d}/slide-09.webp`, alt: "Explains 101, a finance explainer channel, with its channel page and recent videos.", caption: "Explains 101: a finance explainer channel", kind: "third-party", source: channel, enabled: true },
      { src: `${d}/slide-10.webp`, alt: "fern, a crime documentary channel, with its channel page and recent videos.", caption: "fern: a crime documentary channel", kind: "third-party", source: channel, enabled: true },
      { src: `${d}/slide-11.webp`, alt: "Banner: top faceless YouTube channels that are making big money, showing three video thumbnails with 3.7M, 2.9M and 2.4M.", caption: "Top faceless channels, as listed on the banner", kind: "third-party", source: "Examples from the supplied banner. View counts and any earnings are not verified by DIY Arena.", enabled: true },
      { src: `${d}/slide-12.webp`, alt: "A named person's YouTube channel analytics screenshot from a community chat.", caption: "A creator's channel analytics", kind: "third-party", source: "Screenshot of a named person's analytics from a private community post. Switched off until permission to use it is confirmed.", enabled: false },
      { src: `${d}/slide-13.webp`, alt: "Banner asking whether faceless YouTube channels are profitable, with a YouTube logo and a dollar-sign light bulb.", caption: "Are faceless YouTube channels profitable?", kind: "illustrative", source: "Illustrative graphic. Not a verified result.", enabled: true },
    ],
  },
};

// Real cover or box artwork per product (replaces the generated tile).
export const artworkBySlug: Record<string, string> = {
  "faceless-youtube-channel-launch-system": `${d}/box.webp`,
};
