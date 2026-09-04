# NFC & QR Solutions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the automatically loaded Google Review Spline galleries with a bilingual, image-first NFC and QR catalogue whose matching 3D models load only inside an explicitly opened dialog.

**Architecture:** `ReviewsPage` stays server-rendered and composes a small client-side hero, a client-side categorized catalogue, and the existing enquiry island. Localized product metadata includes an optional scene object; the page contains no Spline provider or external preconnect, while one modal mounts the existing viewer only after a visitor chooses an eligible product.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, `next/image`, native `<dialog>`, existing Spline custom-element loader, Sharp asset conversion, Vitest/Testing Library, Playwright.

---

## File Structure

- `scripts/import-nfc-assets.mjs` — deterministically converts the ten supplied root images to metadata-stripped WebP catalogue assets.
- `public/images/products/catalog/*.webp` — optimized served derivatives; the original PNG files remain untouched.
- `src/content/types.ts` — declares catalogue, hero, scene, category, and conditional enquiry data contracts.
- `src/content/de.ts`, `src/content/en.ts` — contain all localized page, product, pricing, use-case, form, FAQ, navigation, home-card, and SEO copy.
- `src/components/products/ProductHero.tsx` — runs the three-image hero sequence without importing Spline.
- `src/components/products/ProductCatalog.tsx` — owns category selection and selected 3D product state.
- `src/components/products/ProductCard.tsx` — renders one static, indexable product card.
- `src/components/products/Product3DDialog.tsx` — owns modal lifecycle and mounts one viewer only when open.
- `src/components/products/products.module.css` — contains hero, catalogue, card, dialog, loading, error, and responsive presentation.
- `src/features/pages/ReviewsPage.tsx` — composes the redesigned route and removes automatic Spline resources.
- `src/components/reviews/ReviewInquiryConfigurator.tsx` — renders conditional destination/product/form/size/link controls.
- `src/lib/validation.ts`, `src/lib/whatsapp.ts` — validate conditional enquiry values and build the generalized message.
- Focused unit and browser tests under `tests/unit/` and `tests/e2e/` prove every behavioral boundary.

### Task 1: Import optimized catalogue imagery

**Files:**
- Create: `scripts/import-nfc-assets.mjs`
- Create: `tests/unit/nfc-asset-import.test.ts`
- Create: `public/images/products/catalog/all-products.webp`
- Create: `public/images/products/catalog/booking-custom-blue.webp`
- Create: `public/images/products/catalog/review-round-black.webp`
- Create: `public/images/products/catalog/review-round-white.webp`
- Create: `public/images/products/catalog/review-square-blue.webp`
- Create: `public/images/products/catalog/review-stand-white.webp`
- Create: `public/images/products/catalog/review-personalized-black.webp`
- Create: `public/images/products/catalog/menu-round-black.webp`
- Create: `public/images/products/catalog/menu-personalized-white.webp`
- Create: `public/images/products/catalog/menu-square-black.webp`

- [ ] **Step 1: Write the failing asset-import contract**

Create a Vitest test that imports `SOURCE_TO_OUTPUT` from the script, asserts the exact ten filename mappings, runs the importer in a temporary directory, and uses Sharp metadata to assert every result is WebP, no wider than 1600 px, no taller than 1600 px, and contains no EXIF/ICC/XMP payload. Assert every produced file is smaller than its source.

- [ ] **Step 2: Verify RED**

Run: `npx vitest run tests/unit/nfc-asset-import.test.ts`

Expected: FAIL because `scripts/import-nfc-assets.mjs` does not exist.

- [ ] **Step 3: Implement the deterministic importer**

Export an immutable mapping from the exact supplied filenames to the output names above. Export `importNfcAssets({ sourceDir, outputDir })`. For every item, call Sharp with `rotate()`, `resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })`, then `webp({ quality: 84, smartSubsample: true })`; do not call `withMetadata()`. When run directly, resolve the repository root from `import.meta.url` and write to `public/images/products/catalog`.

- [ ] **Step 4: Run importer and verify GREEN**

Run: `node scripts/import-nfc-assets.mjs`

Run: `npx vitest run tests/unit/nfc-asset-import.test.ts`

Expected: ten files written; test PASS.

- [ ] **Step 5: Commit the asset pipeline**

Run: `git add scripts/import-nfc-assets.mjs tests/unit/nfc-asset-import.test.ts public/images/products/catalog && git commit -m "feat: import optimized NFC catalogue imagery"`

### Task 2: Define the bilingual catalogue and pricing model

**Files:**
- Modify: `src/content/types.ts`
- Modify: `src/content/de.ts`
- Modify: `src/content/en.ts`
- Replace: `tests/unit/spline-product-content.test.ts`
- Modify: `tests/unit/navigation.test.tsx`
- Modify: `tests/unit/seo.test.ts`

- [ ] **Step 1: Write failing content contracts**

Assert for both locales:

```ts
expect(content.navigation.primary.find((item) => item.href === "/reviews")?.label)
  .toMatch(locale === "de" ? /NFC.*QR/ : /NFC.*QR/);
expect(content.reviews.heroImages.map((image) => image.src)).toEqual([
  "/images/products/catalog/review-round-black.webp",
  "/images/products/catalog/all-products.webp",
  "/images/products/catalog/menu-personalized-white.webp",
]);
expect(content.reviews.products.map(({ id, price }) => [id, price])).toEqual([
  ["standard-card", "CHF 49.–"],
  ["standard-pair", "CHF 80.–"],
  ["standard-stand", "CHF 69.–"],
  ["personalized-card", "CHF 69.–"],
  ["fully-custom-card", "CHF 99.–"],
]);
expect(content.reviews.catalog.filter((item) => item.category === "menu"))
  .toHaveLength(3);
expect(content.reviews.catalog.filter((item) => item.category === "menu")
  .every((item) => item.scene === undefined)).toBe(true);
```

Also assert every catalogue ID, image path, and scene URL is unique where required; only the four approved Google products expose scenes; all card products contain `80 × 80 mm` and `100 × 100 mm`; the stand exposes neither form nor size controls; use cases include reviews, menu, booking/reservation, guest Wi-Fi, and digital contact card; SEO and home/service navigation use the broad positioning.

- [ ] **Step 2: Verify RED**

Run: `npx vitest run tests/unit/spline-product-content.test.ts tests/unit/navigation.test.tsx tests/unit/seo.test.ts`

Expected: FAIL on missing hero/catalogue fields and old Google-only labels.

- [ ] **Step 3: Implement the data contracts**

Replace the page-specific visualization arrays with:

```ts
export type ProductCategory = "reviews" | "menu" | "custom";
export interface ProductScene {
  readonly url: string;
  readonly fallbackImage: string;
  readonly ariaLabel: string;
}
export interface NfcProduct {
  readonly id: string;
  readonly category: ProductCategory;
  readonly title: string;
  readonly price: string;
  readonly description: string;
  readonly image: { readonly src: string; readonly alt: string };
  readonly details: readonly string[];
  readonly scene?: ProductScene;
}
```

Add localized category labels, catalogue label, view-3D/loading/error/retry/close/interaction labels, coming-soon label, use-case content, hero image metadata, and quantity/size copy. Populate the exact assignments and prices in the approved spec. Keep `/reviews` routes unchanged while updating navigation, home service card, hello link, metadata, and FAQ copy in both languages.

- [ ] **Step 4: Verify GREEN**

Run: `npx vitest run tests/unit/spline-product-content.test.ts tests/unit/navigation.test.tsx tests/unit/seo.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit content and types**

Run: `git add src/content/types.ts src/content/de.ts src/content/en.ts tests/unit/spline-product-content.test.ts tests/unit/navigation.test.tsx tests/unit/seo.test.ts && git commit -m "feat: define bilingual NFC product catalogue"`

### Task 3: Build the image-only hero

**Files:**
- Create: `src/components/products/ProductHero.tsx`
- Modify: `src/components/products/products.module.css`
- Create: `tests/unit/product-hero.test.tsx`

- [ ] **Step 1: Write failing hero tests**

Use fake timers and a stubbed `matchMedia`. Assert the first approved image renders immediately, the active indicator advances after 5,500 ms, hidden-document state prevents advancement, visible state resumes it, and reduced motion renders the first image without starting an interval. Assert no module or element name containing `Spline` or `spline-viewer` appears.

- [ ] **Step 2: Verify RED**

Run: `npx vitest run tests/unit/product-hero.test.tsx`

Expected: FAIL because `ProductHero` does not exist.

- [ ] **Step 3: Implement `ProductHero`**

Accept `images`, render all images in one stable-aspect-ratio figure, set only the first image to priority, and use a 5,500 ms interval while the page is visible and reduced motion is false. Apply active/inactive classes for opacity and set indicator text with localized accessible labels. Clear the interval and visibility listener on unmount.

- [ ] **Step 4: Add responsive hero styling and verify GREEN**

Use a stable `aspect-ratio`, `object-fit: cover`, opacity-only crossfade, and `@media (prefers-reduced-motion: reduce)` with no transition. Preserve mobile order and the existing desktop editorial proportions.

Run: `npx vitest run tests/unit/product-hero.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit hero**

Run: `git add src/components/products/ProductHero.tsx src/components/products/products.module.css tests/unit/product-hero.test.tsx && git commit -m "feat: add image-only NFC hero"`

### Task 4: Build the categorized catalogue and on-demand 3D dialog

**Files:**
- Create: `src/components/products/ProductCard.tsx`
- Create: `src/components/products/ProductCatalog.tsx`
- Create: `src/components/products/Product3DDialog.tsx`
- Modify: `src/components/products/products.module.css`
- Replace: `tests/unit/product-showcase.test.tsx`
- Modify: `tests/unit/spline-product.test.tsx`

- [ ] **Step 1: Write failing catalogue tests**

Render the catalogue with one scene product and one no-scene product. Assert category buttons are a labelled group with `aria-pressed`, product image/name/price/details remain visible, selecting a category reveals the correct products, the eligible card has `In 3D ansehen`, and the unavailable card exposes plain `3D-Modell folgt` text with no button.

- [ ] **Step 2: Write failing dialog lifecycle tests**

Mock `SplineProduct` only at the component boundary. Assert no mocked viewer renders initially; clicking the eligible action opens a `dialog`, shows the selected title and matching still, and renders exactly one viewer. Dispatch `cancel` and assert the dialog component unmounts, no viewer remains, and focus returns to the trigger. Simulate viewer error/retry through explicit callback props and assert the still remains while retry remounts only that scene.

- [ ] **Step 3: Verify RED**

Run: `npx vitest run tests/unit/product-showcase.test.tsx tests/unit/spline-product.test.tsx`

Expected: FAIL because catalogue/dialog components and callback contract are missing.

- [ ] **Step 4: Implement catalogue and card**

`ProductCatalog` owns `activeCategory` and `selectedProduct`. It renders all category buttons and the active category's products. `ProductCard` uses `next/image`, semantic headings, visible price and details, and calls `onView3D(product)` only when `scene` exists. Without a scene it renders the localized coming-soon text.

- [ ] **Step 5: Implement the modal lifecycle**

Mount `Product3DDialog` only while `selectedProduct !== null`. In an effect call `dialog.showModal()` and close on cleanup. Handle native `cancel` with `preventDefault()` and the same close callback. Store the opening button in `ProductCatalog` and restore its focus after state closes. Wrap only the requested viewer in `SplineSceneProvider`; do not render or import it elsewhere on the page. Keep the matching still visible through loading/error and provide one retry button that increments a viewer key.

- [ ] **Step 6: Add catalogue/dialog styling and verify GREEN**

Use one/two/three-column responsive grids, wrapping 44 px category controls, stable square product media, a viewport-contained dialog, a visible 44 px close control, backdrop, and `touch-action: pan-y` on the 3D stage. Do not create horizontal carousels.

Run: `npx vitest run tests/unit/product-showcase.test.tsx tests/unit/spline-product.test.tsx`

Expected: PASS.

- [ ] **Step 7: Commit catalogue and modal**

Run: `git add src/components/products/ProductCard.tsx src/components/products/ProductCatalog.tsx src/components/products/Product3DDialog.tsx src/components/products/products.module.css tests/unit/product-showcase.test.tsx tests/unit/spline-product.test.tsx && git commit -m "feat: load NFC 3D models on demand"`

### Task 5: Recompose the page around the approved journey

**Files:**
- Modify: `src/features/pages/ReviewsPage.tsx`
- Modify: `src/styles/pages.module.css`
- Modify: `tests/unit/pages.test.tsx`
- Replace: `tests/e2e/reviews-spline.spec.ts`

- [ ] **Step 1: Write failing page tests**

Assert the page contains the broad heading and intro, the enquiry CTA precedes the hero visual on mobile DOM order, every public price appears before the process, the use cases include Booking/Reservation, WLAN/Wi-Fi, and digital contact card, process labels are TAP/OPEN/ACT rather than REVIEW, all three menu placeholders render, and no `preconnect` links for either Spline host exist.

- [ ] **Step 2: Verify RED**

Run: `npx vitest run tests/unit/pages.test.tsx`

Expected: FAIL on old page composition and Google-only copy.

- [ ] **Step 3: Implement the approved composition**

Remove both Spline preconnects, the page-level provider, both automatic `ProductShowcase` instances, and legacy secondary product image logic. Compose `ProductHero`, `ProductCatalog`, the price/design-level explanation, generalized three-step section, use-case grid, enquiry, FAQ, and contact in the approved order. Keep FAQ schema and existing server rendering.

- [ ] **Step 4: Adapt page layout CSS and verify GREEN**

Reuse existing tokens, section rhythm, dark band, and desktop breakpoint. Add only page-level grids that cannot live with the components. Ensure the mobile DOM order is copy, CTA, hero image.

Run: `npx vitest run tests/unit/pages.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit page composition**

Run: `git add src/features/pages/ReviewsPage.tsx src/styles/pages.module.css tests/unit/pages.test.tsx tests/e2e/reviews-spline.spec.ts && git commit -m "feat: redesign reviews route as NFC solutions"`

### Task 6: Generalize the enquiry, validation, and WhatsApp handoff

**Files:**
- Modify: `src/content/types.ts`
- Modify: `src/content/de.ts`
- Modify: `src/content/en.ts`
- Modify: `src/components/reviews/ReviewInquiryConfigurator.tsx`
- Modify: `src/components/reviews/review-inquiry.module.css`
- Modify: `src/lib/validation.ts`
- Modify: `src/lib/whatsapp.ts`
- Modify: `tests/unit/review-inquiry.test.tsx`
- Modify: `tests/unit/legal-and-faq.test.tsx`

- [ ] **Step 1: Write failing conditional-validation tests**

Define values for `destination`, `product`, `shape`, `size`, `quantity`, `businessName`, `contactPerson`, `destinationUrl`, and `note`. Assert Google Review requires a valid HTTPS Google URL; menu/custom accepts another HTTPS URL or the localized `needsSetup` choice; standard stand does not require shape or size; every card does; quantity must be at least one.

- [ ] **Step 2: Write failing configurator and WhatsApp tests**

Assert destination and product selects render first; choosing Standard Stand hides shape and size; choosing a card reveals both; every select has localized options; submitting focuses the first relevant invalid field; a valid German personalized menu enquiry produces a WhatsApp URL containing destination, product, round shape, 100 × 100 mm, quantity, business name, and destination link; English produces equivalent English labels.

- [ ] **Step 3: Verify RED**

Run: `npx vitest run tests/unit/review-inquiry.test.tsx tests/unit/legal-and-faq.test.tsx`

Expected: FAIL because current values and form are Google-only.

- [ ] **Step 4: Implement generalized values and validation**

Replace `googleUrl` with `destinationUrl`; add destination, shape, size, and setup state. Calculate visible/required fields from selected product rather than static `required` flags. Reject non-HTTPS links and require a Google host only for Google Review. Keep all validation pure and return field-keyed errors.

- [ ] **Step 5: Implement conditional form and message**

Render select controls for destination, product, shape, size, and setup state. Exclude hidden fields from validation and confirmation summary. Preserve keyboard Enter behavior, focus management, the non-binding confirmation step, privacy wording, and `noopener noreferrer`. Build the WhatsApp message from the visible completed values and include the quantity-discount-on-request sentence.

- [ ] **Step 6: Verify GREEN and commit**

Run: `npx vitest run tests/unit/review-inquiry.test.tsx tests/unit/legal-and-faq.test.tsx`

Expected: PASS.

Run: `git add src/content/types.ts src/content/de.ts src/content/en.ts src/components/reviews/ReviewInquiryConfigurator.tsx src/components/reviews/review-inquiry.module.css src/lib/validation.ts src/lib/whatsapp.ts tests/unit/review-inquiry.test.tsx tests/unit/legal-and-faq.test.tsx && git commit -m "feat: generalize NFC solution enquiries"`

### Task 7: Prove network, modal, motion, and responsive behavior in the browser

**Files:**
- Replace: `tests/e2e/reviews-spline.spec.ts`
- Modify: `tests/e2e/review-configurator.spec.ts`

- [ ] **Step 1: Write failing E2E tests for zero-load and modal lifecycle**

Track requests to `cdn.spline.design` and `prod.spline.design`. After `/reviews` reaches idle, assert zero matching requests and zero `spline-viewer` elements. Click the black round product action, assert exactly one viewer and eventual selected scene request, close via Escape, then assert zero viewers and focus on the original button. Reopen, close via visible control, and assert the same cleanup.

- [ ] **Step 2: Write failing E2E tests for hero and reduced motion**

At normal motion, assert the hero active indicator advances within 7 seconds. Under reduced motion, wait the same duration and assert it remains on image one. Open 3D under reduced motion and assert the Spline controls report automatic rotation disabled.

- [ ] **Step 3: Write failing E2E responsive and configurator tests**

For widths 320, 768, 1024, 1280, and 1536 assert `scrollWidth === clientWidth`, all category and modal controls are at least 44 px high, the modal box stays within the viewport, and every product price is visible without hover. Exercise a non-Google personalized menu request and assert the WhatsApp confirmation contains only relevant fields.

- [ ] **Step 4: Verify RED, then make only behavior-driven fixes**

Run: `npx playwright test tests/e2e/reviews-spline.spec.ts tests/e2e/review-configurator.spec.ts --project=chromium`

Expected before final fixes: at least one new assertion FAIL. Adjust production code only for the observed contract failures.

- [ ] **Step 5: Verify GREEN and commit**

Run: `npx playwright test tests/e2e/reviews-spline.spec.ts tests/e2e/review-configurator.spec.ts --project=chromium`

Expected: PASS.

Run: `git add tests/e2e/reviews-spline.spec.ts tests/e2e/review-configurator.spec.ts src && git commit -m "test: verify on-demand NFC product experience"`

### Task 8: Full verification and local handoff

**Files:**
- Modify if required by verified failures: only files already listed above.

- [ ] **Step 1: Run static verification**

Run: `npm run typecheck && npm run lint`

Expected: both commands exit 0 with no errors.

- [ ] **Step 2: Run full unit suite**

Run: `npm test`

Expected: all Vitest tests PASS.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: Next.js production build exits 0 and includes `/reviews` and `/en/reviews`.

- [ ] **Step 4: Run relevant browser suite**

Run: `npx playwright test tests/e2e/reviews-spline.spec.ts tests/e2e/review-configurator.spec.ts tests/e2e/navigation.spec.ts --project=chromium`

Expected: all selected Playwright tests PASS.

- [ ] **Step 5: Start the local review server**

Run: `npm run dev`

Expected: a persistent local server prints a reachable localhost URL. Verify `/reviews` and `/en/reviews` respond with HTTP 200 and provide the URL to the user. Do not deploy.
