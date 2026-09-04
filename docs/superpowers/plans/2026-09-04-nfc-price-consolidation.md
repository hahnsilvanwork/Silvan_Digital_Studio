# NFC Price Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Price the Standard Stand at CHF 49 and show exactly four entries in the lower NFC pricing overview.

**Architecture:** Keep pricing in the existing localized content objects and preserve the stand as a separate catalogue item. Consolidate only the lower comparison entry so cards and stands share one standard-price tier, while all customer-facing summaries and inquiry values remain consistent.

**Tech Stack:** Next.js 16, React 19, TypeScript, Vitest

---

### Task 1: Lock the new pricing contract with tests

**Files:**
- Modify: `tests/unit/spline-product-content.test.ts`
- Modify: `tests/unit/locales.test.ts`
- Modify: `tests/unit/pages.test.tsx`

- [ ] **Step 1: Change the expected stand catalogue price**

In `spline-product-content.test.ts`, change the `standard-stand` expectation from `CHF 69.–` to `CHF 49.–`.

- [ ] **Step 2: Assert four lower pricing entries**

Add a locale-independent assertion:

```ts
expect(content.reviews.products).toHaveLength(4);
expect(content.reviews.products.map(({ id }) => id)).toEqual([
  "standard-card",
  "standard-pair",
  "personalized-card",
  "fully-custom-card",
]);
```

- [ ] **Step 3: Update the localized price-array expectation**

The catalogue array must expect the stand at CHF 49 while retaining Personalized at CHF 69.

- [ ] **Step 4: Run the focused tests and confirm RED**

Run:

```powershell
npx vitest run tests/unit/spline-product-content.test.ts tests/unit/locales.test.ts tests/unit/pages.test.tsx
```

Expected: failure because content still contains five tiers and a CHF 69 stand.

### Task 2: Consolidate all customer-facing prices

**Files:**
- Modify: `src/content/de.ts`
- Modify: `src/content/en.ts`

- [ ] **Step 1: Consolidate the lower overview**

Rename the first tier to `Standard Card oder Standard Stand` / `Standard Card or Standard Stand`, keep it at CHF 49, and remove the separate `standard-stand` tier from `reviews.products`.

- [ ] **Step 2: Update catalogue and inquiry prices**

Set the `review-stand-white` catalogue price to `CHF 49.–` and the `standard-stand` inquiry label to `Standard Stand · CHF 49.–` in both locales.

- [ ] **Step 3: Update the FAQ summary**

State that a Standard Card or Standard Stand costs CHF 49 in German and English. Keep the two-card, Personalized, Fully Customized, setup, and quantity-discount information unchanged.

- [ ] **Step 4: Run focused and complete verification**

Run:

```powershell
npx vitest run tests/unit/spline-product-content.test.ts tests/unit/locales.test.ts tests/unit/pages.test.tsx tests/unit/review-inquiry.test.tsx
npm test
npm run typecheck
npm run lint
npm run build
```

Expected: all commands exit with code 0.

- [ ] **Step 5: Commit implementation**

```powershell
git add -- src/content/de.ts src/content/en.ts tests/unit/spline-product-content.test.ts tests/unit/locales.test.ts tests/unit/pages.test.tsx docs/superpowers/plans/2026-09-04-nfc-price-consolidation.md
git commit -m "fix: consolidate NFC standard pricing"
```
