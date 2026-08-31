# Project Grid Edge Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the two desktop project columns with opposite edges of the standard site container on both the home page and `/work`, while preserving the current mobile layout and card sizing.

**Architecture:** Keep the shared `ProjectPreview` markup unchanged and modify only the shared `.previewList` desktop rule. A design-contract test will lock down the absence of a list-width cap and the use of `space-between`, which distributes the existing capped columns to opposite container edges on both consuming pages.

**Tech Stack:** Next.js 16, React 19, CSS Modules, PostCSS, Vitest, Playwright

---

## File map

- `tests/unit/design-contract.test.ts`: add the regression contract for the shared project-grid alignment.
- `src/components/work/work.module.css`: remove the desktop list cap and distribute the two capped tracks across the container.
- No component markup or page-specific styles need to change because the home page and `/work` already share `.previewList`.

### Task 1: Lock down and implement edge alignment

**Files:**
- Modify: `tests/unit/design-contract.test.ts`
- Modify: `src/components/work/work.module.css`

- [ ] **Step 1: Write the failing design-contract test**

Add the shared work stylesheet beside the existing core stylesheet references:

```ts
const work = stylesheetByPath.get("src/components/work/work.module.css")!;
```

Add this test immediately after `gives the project grid an explicit column`:

```ts
it("aligns the desktop project columns with opposite container edges", () => {
  expect(
    exactDeclarationValues(work.root, ".previewList", "justify-content"),
  ).toContain("space-between");
  expect(
    exactDeclarationValues(work.root, ".previewList", "max-inline-size"),
  ).toHaveLength(0);
});
```

- [ ] **Step 2: Run the targeted test and verify RED**

Run:

```powershell
npm test -- tests/unit/design-contract.test.ts -t "aligns the desktop project columns"
```

Expected: FAIL because the current desktop rule has no `justify-content: space-between` and still declares `max-inline-size`.

- [ ] **Step 3: Implement the minimal shared CSS change**

In the `@media (min-width: 64rem)` `.previewList` rule, keep the capped columns and existing gaps, remove `max-inline-size`, and add `justify-content`:

```css
.previewList {
  grid-template-columns: repeat(2, minmax(0, 32rem));
  justify-content: space-between;
  column-gap: var(--space-lg);
  row-gap: var(--space-lg);
}
```

Update the adjacent comment so it describes distributing capped tracks to the container edges instead of capping the whole list.

- [ ] **Step 4: Run the targeted test and verify GREEN**

Run:

```powershell
npm test -- tests/unit/design-contract.test.ts -t "aligns the desktop project columns"
```

Expected: PASS.

- [ ] **Step 5: Run the full static verification**

Run:

```powershell
npm test
npm run typecheck
npm run lint
```

Expected: all unit tests pass, TypeScript reports no errors, and ESLint reports no errors or warnings.

### Task 2: Verify the responsive result locally

**Files:**
- Verify: `src/features/pages/HomePage.tsx`
- Verify: `src/features/pages/WorkPage.tsx`
- Verify: `src/components/work/work.module.css`

- [ ] **Step 1: Start the local development server**

Run:

```powershell
npm run dev
```

Expected: Next.js reports a local URL, normally `http://localhost:3000`.

- [ ] **Step 2: Inspect both affected pages at the required widths**

Open `/` and `/work` at 320, 768, 1024, 1280, and 1536 CSS pixels. Confirm:

- below `64rem`, project previews remain in one column;
- at and above `64rem`, project 1 and 3 align with the left content edge;
- project 2 and 4 align with the right content edge;
- the right-column vertical offset remains;
- images do not exceed their existing `32rem` cap;
- neither page has horizontal overflow.

- [ ] **Step 3: Present localhost to the user and wait at the release gate**

Give the user the local URLs for `/` and `/work`. Do not commit the implementation, push to Git, or deploy to Vercel until the user explicitly approves the local result.

### Task 3: Release after explicit approval

**Files:**
- Commit: `tests/unit/design-contract.test.ts`
- Commit: `src/components/work/work.module.css`

- [ ] **Step 1: Run final verification after approval**

Run:

```powershell
npm test
npm run typecheck
npm run lint
npm run build
```

Expected: every command exits with code 0.

- [ ] **Step 2: Commit only the reviewed implementation**

Run:

```powershell
git add -- tests/unit/design-contract.test.ts src/components/work/work.module.css
git commit -m "fix: align project grid to content edges"
```

Expected: one commit containing only the test and shared stylesheet change.

- [ ] **Step 3: Push the current branch**

Run:

```powershell
git push
```

Expected: the remote accepts the new documentation and implementation commits.

- [ ] **Step 4: Verify the production deployment**

Wait for the connected Vercel production deployment to finish, then open the production home page and `/work`. Confirm both use the approved edge-aligned desktop layout and remain single-column on mobile.
