# Laptop slideshow: how it works and how to add one for another product

The laptop-on-hand slideshow appears on a product page only when that product has enabled slides. Today only the Faceless YouTube product has slides.

## Add slides for a product
1. Put the banner images in `public/products/<product-folder>/` (WebP or JPG, about 1280 px wide, under 100 KB each).
2. Add the product's entry to `slideshowBySlug` in `src/lib/slides.ts` with one object per slide: `src`, `alt`, `caption`, `kind`, `source`, `enabled`.
3. Add its box or cover image to `artworkBySlug`.
Slides play in the order listed. Set `enabled: false` to hide one without deleting it.

## Slide kinds (must be accurate; they show on the page)
- `demo`: a real screenshot or sample from the product itself.
- `testimonial`: a verified customer, with their permission.
- `third-party`: someone else's channel, post or result. Say whose, and that it is not a customer.
- `industry`: public information or rules. Say where it comes from.
- `illustrative`: a graphic that is not a real result.
Never describe a third-party or illustrative slide as a result of the product.

## Rights and risk check before publishing
- You need the right to reuse every image. Screenshots of other people's channels, Reddit posts and private community messages belong to them.
- A named person's analytics (slide 12) is switched off until you have their permission.
- Earnings-style graphics can breach advertising rules and payment-provider policies. Keep the labels and the disclaimer, and have the page reviewed before launch.
