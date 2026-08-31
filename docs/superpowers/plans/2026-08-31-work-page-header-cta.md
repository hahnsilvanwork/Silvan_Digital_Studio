# Work Page Header CTA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the existing work-page CTA directly below the introduction and make it use the same compact header-action layout as the service pages.

**Architecture:** Change only the `WorkPage` composition: reuse the existing `heroActions` wrapper and reveal sequence, then remove the former bottom CTA container. Extend the existing work-page unit test to lock down both the localized destination and the CTA’s position before the project previews.

**Tech Stack:** Next.js 16, React 19, CSS Modules, Testing Library, Vitest

---

## File map

- `tests/unit/pages.test.tsx`: change the work CTA contract from an end-of-page action to a header action that precedes project links.
- `src/features/pages/WorkPage.tsx`: move the existing `ButtonLink` into the page header using `pageStyles.heroActions`.
- No stylesheet or content changes are needed because the correct shared layout, label, and destination already exist.

### Task 1: Move the work CTA into the page header

**Files:**
- Modify: `tests/unit/pages.test.tsx`
- Modify: `src/features/pages/WorkPage.tsx`

- [ ] **Step 1: Write the failing page-order test**

Replace the existing `offers a way to act at the end of the %s portfolio` test with:

```tsx
it.each(["de", "en"] as const)(
  "offers a header action before the %s portfolio",
  (locale) => {
    render(<WorkPage locale={locale} />);

    const main = screen.getByRole("main");
    const content = getContent(locale);
    const cta = within(main).getByRole("link", {
      name: content.work.ctaLabel,
    });
    const firstProject = within(main).getByRole("link", {
      name: new RegExp(projects[0].name),
    });

    expect(cta).toHaveAttribute(
      "href",
      locale === "de" ? "/contact" : "/en/contact",
    );
    expect(
      cta.compareDocumentPosition(firstProject) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  },
);
```

- [ ] **Step 2: Run the targeted test and verify RED**

Run:

```powershell
npm test -- tests/unit/pages.test.tsx -t "offers a header action"
```

Expected: FAIL because the current CTA follows the project links in document order.

- [ ] **Step 3: Implement the minimal page composition change**

In `WorkPage`, insert this block immediately after the introductory paragraph:

```tsx
<div
  className={pageStyles.heroActions}
  data-reveal="rise"
  style={{ "--reveal-index": sequence.actionsIndex } as CSSProperties}
>
  <ButtonLink href={localizePath("/contact", locale)}>
    {content.work.ctaLabel}
  </ButtonLink>
</div>
```

Delete the entire bottom CTA container after the project section:

```tsx
<div className={`${layoutStyles.container} ${pageStyles.section}`}>
  <div className={pageStyles.sectionBody} data-reveal="rise">
    <ButtonLink href={localizePath("/contact", locale)}>
      {content.work.ctaLabel}
    </ButtonLink>
  </div>
</div>
```

- [ ] **Step 4: Run the targeted test and verify GREEN**

Run:

```powershell
npm test -- tests/unit/pages.test.tsx -t "offers a header action"
```

Expected: both German and English cases PASS.

- [ ] **Step 5: Run static verification**

Run:

```powershell
npm test
npm run typecheck
npm run lint
```

Expected: all unit tests pass, TypeScript reports no errors, and ESLint reports no errors or warnings.

### Task 2: Review the combined local result

**Files:**
- Verify: `src/features/pages/WorkPage.tsx`
- Verify: `src/components/work/work.module.css`

- [ ] **Step 1: Keep or restart the local development server**

Run:

```powershell
npm run dev
```

Expected: Next.js serves the project at `http://localhost:3000`.

- [ ] **Step 2: Present `/work` for user review**

Confirm the CTA is directly below the introductory paragraph, has intrinsic
button width, and no longer appears after the project list. Keep the approved
two-left/two-right desktop grid unchanged. Do not push or deploy until the user
explicitly approves the combined result.

### Task 3: Release both approved layout changes

**Files:**
- Commit: `src/features/pages/WorkPage.tsx`
- Commit: `src/components/work/work.module.css`
- Commit: `tests/unit/pages.test.tsx`
- Commit: `tests/unit/design-contract.test.ts`

- [ ] **Step 1: Run final verification after user approval**

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
git add -- src/features/pages/WorkPage.tsx src/components/work/work.module.css tests/unit/pages.test.tsx tests/unit/design-contract.test.ts
git commit -m "fix: refine work page layout"
```

Expected: one implementation commit containing the approved grid alignment,
CTA placement, and their regression tests.

- [ ] **Step 3: Push and verify Vercel**

Run `git push`, wait for the connected Vercel production deployment, and verify
the production home page and `/work`. The home page must retain the approved
project-grid alignment; `/work` must show both the aligned grid and compact
header CTA.
