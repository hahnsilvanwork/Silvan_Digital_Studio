# Reusable Spline Product Integration Design

## Objective

Integrate the supplied white round Google Review NFC tag into the existing bilingual Google Reviews page without redesigning unrelated content. The result must preserve static rendering and the current mobile-first design while creating a reusable foundation for later Google Review and restaurant/menu products.

## Existing Context

- `ReviewsPage` is a server component that renders bilingual content from `src/content/de.ts` and `src/content/en.ts`.
- The hero is currently a single-column `pageHeader`; desktop has unused space to the right of the text.
- The first content section contains two static product images in a responsive grid.
- The site uses CSS Modules, shared design tokens, mobile-first `min-width` queries, and a `64rem` desktop breakpoint.
- Existing tests enforce responsive overflow, 44 px touch targets, reduced-motion support, static page content, and committed asset metadata.

## Approved Scene and Runtime

- Scene: `https://prod.spline.design/Lu503y2nQ8XllpRe/scene.splinecode`
- Runtime: `https://cdn.spline.design/@splinetool/viewer@2.0.16/build/spline-viewer.js`
- Integration: native `<spline-viewer>` custom element, never an iframe.
- The versioned runtime is registered through one shared client-side loader promise so repeated component instances cannot inject it more than once.
- The Viewer keeps its own default lazy-loading behavior. The component adds an Intersection Observer so the custom element itself is not instantiated until shortly before it is needed and is removed again when it is no longer near the viewport.

## Component Architecture

### `SplineProduct`

A focused client component accepts reusable visualization metadata:

```tsx
<SplineProduct
  sceneUrl="https://prod.spline.design/.../scene.splinecode"
  fallbackImage="/images/products/round-nfc-white.webp"
  ariaLabel="White round Google Review NFC tag"
  priority={false}
/>
```

It owns viewport observation, reduced-motion handling, runtime registration, loading state, error state, and the transition from the static fallback to the custom element. It does not know about Google products, page copy, selectors, pricing, or locale.

### Product data

The reviews content type gains a product-visualization collection with stable IDs, localized titles and accessible labels, the scene URL, and the fallback path. German and English dictionaries contain the visible localized strings. The first collection contains only `round-nfc-white`; adding later products is a data-only operation.

### `ProductShowcase`

A reusable client component accepts a collection and renders exactly one active `SplineProduct`. It owns future selector state without adding a carousel dependency. With one product, no selector controls or dots render. When more products are added, semantic buttons with at least 44 px targets switch the active item and replace the old custom element instead of retaining hidden canvases.

### Page-level scene coordinator

A small client provider around the Reviews page arbitrates viewer activation. Each `SplineProduct` reports whether it is near the viewport; the provider grants a single page-wide lease to the nearest eligible visualization. A newly eligible lower showcase revokes the off-screen hero lease before it mounts its custom element, and the reverse happens when scrolling back. Reduced-motion users grant no lease. This makes the one-canvas performance rule explicit rather than relying on observer timing.

### Page composition

`ReviewsPage` remains the server-rendered owner of page structure and marketing copy. It supplies localized visualization data to the client islands and wraps only this page in the scene coordinator.

- Hero: the existing text and CTA form the left column on desktop; the active white round tag fills the right column. On mobile the existing order remains eyebrow, headline, intro, CTA, then visualization.
- Product section: the left static card image is replaced by the Google product showcase. The right stand photograph remains unchanged. The layout leaves a clear component slot that can later accept a restaurant/menu showcase, but no restaurant title, copy, or fake scene is introduced now.

## Performance and Lifecycle

- The page HTML, headline, intro, pricing, CTA, and metadata render without waiting for Spline.
- A fixed square aspect ratio reserves space before client hydration and prevents layout shift.
- `priority` controls the observer margin rather than forcing the Spline runtime into the initial server response. The hero may initialize sooner than a non-critical lower showcase.
- A component instantiates its viewer only while it holds the page-wide scene lease. Entering the lower showcase revokes and unmounts the hero viewer before the lower viewer is created, so two WebGL scenes are never intentionally active together.
- The runtime script is asynchronous, module-based, and shared across all instances.
- The scene itself retains Spline's lazy-loading behavior; no eager-loading attribute is applied.
- No added dependency, React 3D renderer, carousel package, pointer-tracking loop, or custom turntable animation is included.

## Motion and Input

- Existing motion authored inside the Spline scene may run; the website does not layer another animation over it.
- Under `prefers-reduced-motion: reduce`, the scene is not instantiated and the static fallback remains.
- The visualization does not enter the keyboard tab order and cannot create a keyboard trap.
- CSS preserves vertical pan gestures over the visualization so page scrolling remains available on touch devices.
- Local Spline pointer behavior may operate where it does not conflict with scrolling. No hover-only control is required to understand or navigate the product.

## Loading and Failure States

- The fallback occupies exactly the same aspect-ratio box as the viewer.
- The fallback fades away only after the custom element reports that the scene is ready; opacity is the only animated property.
- A runtime or scene failure keeps the fallback visible and removes the failed viewer.
- If the fallback image itself is unavailable, the reserved neutral surface remains stable and carries the accessible description without displaying a fabricated product.
- The required matching static export does not currently exist. It must be added later at `public/images/products/round-nfc-white.webp`; the implementation must not manufacture a substitute.

## Responsive Layout

- Base styles target 320–430 px widths and use `minmax(0, 1fr)`, `max-inline-size: 100%`, and the fixed aspect ratio to prevent intrinsic overflow.
- On mobile, the visualization follows the CTA and is size-capped so the hero does not become disproportionately tall.
- At the existing `64rem` breakpoint, the hero becomes a balanced two-column grid, with the text receiving more width than the visualization.
- The product remains fully contained with no crop, frame, widget border, card background, decorative shadow, or gradient.
- The lower product area preserves the existing two-column behavior and current stand image.

## Accessibility and SEO

- All product names, descriptions, CTA labels, and prices remain semantic HTML outside the canvas.
- The visualization receives a localized accessible description but remains supplementary.
- Static route rendering, metadata, canonical URLs, locale routing, robots, sitemap, and structured data remain unchanged.
- Any future selector uses real buttons, communicates the selected item, and is fully operable without hover or swipe.

## Testing

Test-first implementation will add focused unit and browser coverage:

- localized product visualization metadata exists for German and English;
- a single-product showcase renders no unnecessary selector and only one viewer host;
- reduced motion and load failure retain the static fallback;
- switching data supports one active scene without background canvases;
- the hero CTA remains visible and clickable;
- the page has no horizontal overflow at 320, 375, 390, and 430 px;
- vertical scrolling works when a gesture starts over the visualization;
- the Spline box has stable dimensions before and after initialization;
- desktop uses the approved two-column hero composition.

Final verification runs `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, and the relevant Playwright projects. Network-dependent Spline loading is intercepted in deterministic browser tests so the suite does not depend on the CDN or scene service.

## Out of Scope

- Automatic rotation between products.
- New restaurant/menu scenes or fabricated menu imagery.
- Additional product variants before their real scene URLs and metadata exist.
- Editing the Spline scene's internal animation, camera, materials, or event setup.
- Changes to unrelated sections, navigation, SEO routes, canonical behavior, or site-wide design tokens.
