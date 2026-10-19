# Homepage and navigation implementation plan

Goal: Implement the owner's supplied ten-point brief locally, preserving existing pages, prices, demos and functions.

Architecture: Retain HomeOpening and its preview. Use the shared container width and existing bilingual content. Add a homepage price section linked from shared navigation, with prices read from the existing service content.

Tech stack: Next.js, React, CSS modules, Playwright, Vitest.

- Update home-copy.ts with the supplied German headline, intro and four bold-led benefits, and natural English equivalents.
- Update HomeOpening.tsx and home-opening.module.css: compact two-column desktop hero, two-line desktop headline, common container edges, quiet byline under the unchanged preview. Preserve service links and both CTA destinations.
- Update navigation labels/order in de.ts and en.ts; allow the specific /#prices navigation destination. Keep mobile descriptions matched to the reordered services.
- Add HomePrices.tsx with four existing starting prices, links to service details and explicit separate domain, hosting and maintenance costs. Insert after HomeOpening.
- Update existing navigation expectations. Run type checking, scoped lint and unit tests, then browser checks in German and English at 320, 390, 768, 1024, 1280, 1440 and 1920px. Inspect actual screenshots, headline line count, container edges, overflow, menu and price anchor behavior.
- Record local verification. No deployment is part of this request.
