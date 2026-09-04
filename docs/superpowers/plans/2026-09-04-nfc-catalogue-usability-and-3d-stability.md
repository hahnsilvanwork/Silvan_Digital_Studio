# NFC Catalogue Usability and 3D Stability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make all product families unmistakable, preserve the full wide overview image, and eliminate zero-sized WebGPU rendering during 3D dialog open/close.

**Architecture:** Keep `ReviewsPage` server-rendered and extend its serialized catalogue content with image-fit and count-aware category data derived by the client catalogue. `Product3DDialog` becomes a measured viewport grid and owns an explicit opening/closing state; `SplineProduct` receives an external active flag so the renderer is paused one frame before unmount. Browser tests observe both geometry and console behavior.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, Vitest/Testing Library, Playwright, Spline Viewer 2.0.16.

---

### Task 1: Preserve the wide overview image

**Files:**
- Modify: `src/content/types.ts`
- Modify: `src/content/de.ts`
- Modify: `src/content/en.ts`
- Modify: `src/components/products/ProductHero.tsx`
- Modify: `src/components/products/products.module.css`
- Test: `tests/unit/product-hero.test.tsx`

- [ ] Add a failing test asserting that the second hero image exposes `data-fit="contain"` while square images expose `data-fit="cover"`.
- [ ] Run `npx vitest run tests/unit/product-hero.test.tsx` and confirm it fails because no fit mode exists.
- [ ] Add `fit?: "cover" | "contain"` to `ProductHeroImage`, set the overview slide to `contain` in both locales, emit `data-fit`, and style the two modes without changing the stable frame dimensions.
- [ ] Re-run the focused test and confirm all hero tests pass.
- [ ] Commit the hero change.

### Task 2: Make product families self-evident

**Files:**
- Modify: `src/components/products/ProductCatalog.tsx`
- Modify: `src/components/products/products.module.css`
- Modify: `src/content/types.ts`
- Modify: `src/content/de.ts`
- Modify: `src/content/en.ts`
- Test: `tests/unit/product-showcase.test.tsx`
- Test: `tests/unit/pages.test.tsx`

- [ ] Add failing tests that require a “choose application” legend, localized product-count text on every category control, and a live selected-category result heading.
- [ ] Run the two focused test files and confirm the new assertions fail against the compact chip navigation.
- [ ] Add singular/plural count formatters to localized catalogue labels and render each control as a named panel with count. Render a polite result heading above the cards.
- [ ] Replace compact chip CSS with a full-width segmented navigation: all choices visible in a two-column mobile grid and equal three-column grid from tablet width. Keep every control at least 44 pixels tall.
- [ ] Re-run focused tests and commit the navigation change.

### Task 3: Gate 3D creation on real geometry

**Files:**
- Modify: `src/components/products/Product3DDialog.tsx`
- Modify: `src/components/products/SplineProduct.tsx`
- Modify: `src/components/products/products.module.css`
- Test: `tests/unit/product-showcase.test.tsx`
- Test: `tests/unit/spline-product.test.tsx`

- [ ] Add failing tests proving the Spline component is absent until the dialog stage reports positive width and height, backdrop click requests close, and `active={false}` calls `app.stop()` before unmount.
- [ ] Run the focused tests and confirm each fails for the intended missing lifecycle behavior.
- [ ] In `Product3DDialog`, observe the open stage with `ResizeObserver`, mount Spline only after a positive measurement, centralize close-button/cancel/backdrop handling, mark the dialog closing, and defer owner removal by one animation frame.
- [ ] Add `active?: boolean` to `SplineProduct`, combine it with viewport visibility, and pause the application during cleanup and before the dialog is removed.
- [ ] Convert dialog layout to `grid-template-rows: auto minmax(0, 1fr) auto`, a viewport-constrained block size, `overflow: hidden`, and stage-filling product/viewer rules.
- [ ] Re-run focused tests and commit the lifecycle fix.

### Task 4: Verify browser geometry and WebGPU regression

**Files:**
- Modify: `tests/e2e/reviews-spline.spec.ts`

- [ ] Add browser assertions for the overview slide fit mode, category names/counts, a non-scrolling dialog at 390 × 568 and 1440 × 700, and backdrop close.
- [ ] Record console messages during three repeated open/close cycles and fail on messages containing `texture size`, `depthBuffer`, `swapchain texture`, or `GPUValidationError`.
- [ ] Run the focused Playwright suite in Chromium, Firefox, WebKit, and mobile Safari and correct only evidenced cross-browser issues.
- [ ] Run `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`.
- [ ] Visually inspect mobile and desktop screenshots after scrolling through reveal animations.
- [ ] Keep the local server running at `http://127.0.0.1:3000/reviews` and do not deploy.
- [ ] Commit the final browser checks.

## Self-review

- Every approved requirement maps to a task: natural image fit (Task 1), category discoverability (Task 2), compact dialog and renderer sequencing (Task 3), responsive/console verification (Task 4).
- No new product cards are added because the user identified discoverability—not missing inventory—as the actual problem.
- The lifecycle API is consistently named `active`; dialog geometry readiness remains internal to `Product3DDialog`.
- No placeholder implementation steps or unresolved choices remain.
