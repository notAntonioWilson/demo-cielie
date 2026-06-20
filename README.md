# CIÉLIE — Cinematic Demo Storefront

A high-end concept storefront built by OTAI Systems. Next.js 14 (App Router), TypeScript, zero external UI dependencies. Fully responsive, mobile-first.

## The experience

- **Cinematic scroll hero** — opens on a gown in a sunlit Viennese salon. As you scroll, the room settles into frame and the bestselling gown (Sonila) rises into view, then the page flows down into the store.
- **The Edit** — three featured gowns (Sonila, Sarelle, Walley), each made to order.
- **Seasonal editorial + fabric features** — full-bleed image splits with conversion copy.
- **Atelier process, verified reviews, closing CTA** — built to move a visitor from browsing to "begin your gown."
- **Product page** — gallery, sticky purchase rail, colour/size selection with validation, trust row, accordions, reviews, cross-sell, sticky mobile add-to-bag bar.
- **Slide-out cart** with live quantity and subtotal.

## Imagery

All photography is original, generated for this demo in CIÉLIE's colour story and Viennese aesthetic. Images are served from a CDN by URL (see `lib/products.ts`). For launch, swap in real studio photography by replacing the URLs — or download the assets into `/public/images/` and point the paths there for a fully self-contained build.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & deploy

```bash
npm run build
npm run start
```

Push to Git and import into Vercel. No environment variables required.

## Launch notes

- Pricing shown in USD with clean retail numbers — adjust in `lib/products.ts`.
- Checkout is non-functional in the demo. Wire to Shopify Storefront API, Stripe, or a headless backend at launch.
- Reduced-motion is respected: the cinematic hero collapses to a static layout for users who prefer it.
