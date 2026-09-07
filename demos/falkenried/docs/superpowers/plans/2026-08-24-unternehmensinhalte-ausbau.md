# Unternehmensinhalte Ausbau Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Zweisprachige, ehrlich pflegbare Seiten für Aktuelles, Veranstaltungen, Jobs und Partner bereitstellen.

**Architecture:** Ein typisierter Content-Layer trennt aktuelle, zeitgebundene und institutionelle Inhalte. Gemeinsame ContentCard- und EmptyState-Komponenten stellen echte Einträge und fehlende aktuelle Angebote konsistent dar.

**Tech Stack:** Astro 7, TypeScript, Tailwind CSS 4, Node Test Runner, Astro Assets

---

### Task 1: Content-Datenvertrag

**Files:**
- Create: src/data/company-content.ts
- Create: tests/company-content.test.mjs
- Modify: package.json

- [ ] **Step 1: Write the failing test**

~~~js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("company content contains only verified publication states", async () => {
  const source = await readFile(new URL("../src/data/company-content.ts", import.meta.url), "utf8");
  for (const slug of ["gewerbeschau-dielsdorf", "welcher-antrieb-passt", "feriencheck"]) assert.match(source, new RegExp('slug: "' + slug + '"'));
  assert.match(source, /jobs: readonly JobOpening\\[\\] = \\[\\]/);
  assert.doesNotMatch(source, /demo|placeholder|fiktiv/i);
});
~~~

- [ ] **Step 2: Run test to verify it fails**

Run: node --test tests/company-content.test.mjs
Expected: FAIL because company-content.ts does not exist.

- [ ] **Step 3: Write minimal implementation**

Define NewsItem, EventItem, JobOpening and Partner types with LocalizedText fields, publication dates, sourceUrl, verifiedOn and optional image. Export the three verified news entries, only verifiable event dates, an empty jobs array and officially confirmed partners. Add test:content.

- [ ] **Step 4: Run test to verify it passes**

Run: npm run test:content
Expected: PASS.

- [ ] **Step 5: Commit**

~~~bash
git add src/data/company-content.ts tests/company-content.test.mjs package.json
git commit -m "feat: add verified company content data"
~~~

### Task 2: Shared editorial components

**Files:**
- Create: src/components/ContentCard.astro
- Create: src/components/EmptyState.astro
- Modify: tests/company-content.test.mjs

- [ ] **Step 1: Write the failing test**

Assert ContentCard uses time datetime, safe optional images and a descriptive link; assert EmptyState requires title, description and action.

- [ ] **Step 2: Run test to verify it fails**

Run: npm run test:content
Expected: FAIL because both components are missing.

- [ ] **Step 3: Write minimal implementation**

ContentCard renders category, title, summary, optional verified image and semantic date. EmptyState renders a calm bordered panel with one useful CTA and no alarming error language.

- [ ] **Step 4: Run test to verify it passes**

Run: npm run test:content
Expected: PASS.

- [ ] **Step 5: Commit**

~~~bash
git add src/components/ContentCard.astro src/components/EmptyState.astro tests/company-content.test.mjs
git commit -m "feat: add editorial cards and honest empty states"
~~~

### Task 3: Bilingual listing pages

**Files:**
- Create: src/pages/aktuelles/index.astro
- Create: src/pages/veranstaltungen/index.astro
- Create: src/pages/jobs/index.astro
- Create: src/pages/partner/index.astro
- Create: src/pages/en/news/index.astro
- Create: src/pages/en/events/index.astro
- Create: src/pages/en/jobs/index.astro
- Create: src/pages/en/partners/index.astro
- Modify: src/i18n/nav.ts
- Modify: tests/company-content.test.mjs

- [ ] **Step 1: Write the failing test**

Assert eight page files and four language route pairs exist. Assert event/job pages import EmptyState and listings import only company-content data.

- [ ] **Step 2: Run test to verify it fails**

Run: npm run test:content
Expected: FAIL listing missing routes.

- [ ] **Step 3: Write minimal implementation**

Build news grids, upcoming/archived event logic based on explicit dates, honest no-jobs state with mail/contact CTA, and verified partner cards without invented endorsements. English pages use the same records and route-equivalent language switching.

- [ ] **Step 4: Run test to verify it passes**

Run: npm run test:content
Expected: PASS.

- [ ] **Step 5: Commit**

~~~bash
git add src/pages/aktuelles src/pages/veranstaltungen src/pages/jobs src/pages/partner src/pages/en/news src/pages/en/events src/pages/en/jobs src/pages/en/partners src/i18n/nav.ts tests/company-content.test.mjs
git commit -m "feat: add bilingual company content pages"
~~~

### Task 4: Discovery links without navbar movement

**Files:**
- Modify: src/components/Footer.astro
- Modify: src/pages/index.astro
- Modify: src/pages/en/index.astro
- Modify: tests/layout-stability.test.mjs
- Modify: tests/company-content.test.mjs

- [ ] **Step 1: Write the failing test**

Assert footer and both homepages expose all four company content areas while Header.astro retains the existing desktop grid and unchanged top-level nav keys.

- [ ] **Step 2: Run test to verify it fails**

Run: npm run test:content; node --test tests/layout-stability.test.mjs
Expected: content test fails on missing discovery links while layout stability continues to pass.

- [ ] **Step 3: Write minimal implementation**

Add compact company-content links to the existing footer company column and a latest-content section to both homepages. Do not add a permanent top-level header item.

- [ ] **Step 4: Run test to verify it passes**

Run: npm run test:content; node --test tests/layout-stability.test.mjs
Expected: all tests pass.

- [ ] **Step 5: Commit**

~~~bash
git add src/components/Footer.astro src/pages/index.astro src/pages/en/index.astro tests/layout-stability.test.mjs tests/company-content.test.mjs
git commit -m "feat: surface company content without shifting navigation"
~~~

### Task 5: Final documentation and verification

**Files:**
- Modify: CONTENT-TODO.md
- Modify: docs/2026-08-24-live-site-gap-audit.md

- [ ] **Step 1: Update launch notes**

Record content source dates, empty job/event state, partner approval requirement and the process for adding future records.

- [ ] **Step 2: Run complete verification**

Run: npm run test:content; npm run test:garden; npm run test:bmw; npm run test:data; npm run test:forms; npm run test:portfolio; npm run test:home-media; node --test tests/layout-stability.test.mjs; npx astro check; npm run build
Expected: zero test failures, zero Astro errors, build exit 0.

- [ ] **Step 3: Visual and HTTP review**

Check all eight content routes plus both homepages at desktop and mobile widths and request each route from the running server. Expected: responsive layouts and HTTP 200.

- [ ] **Step 4: Commit**

~~~bash
git add CONTENT-TODO.md docs/2026-08-24-live-site-gap-audit.md
git commit -m "docs: complete content expansion handoff"
~~~
