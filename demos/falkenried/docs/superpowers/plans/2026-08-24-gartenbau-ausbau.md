# Gartenbau Ausbau Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Den Gartenbau zweisprachig um belegte Leistungsseiten, Mulden und Transporte, echte Referenzgalerien sowie Fachbeiträge erweitern.

**Architecture:** Typisierte Gartenbau-Daten und lokale Astro-Assets speisen gemeinsame Karten- und Galeriekomponenten. Die Bereichsseiten verwenden dieselbe SectionNav wie BMW und behalten die bestehende Designsprache.

**Tech Stack:** Astro 7, TypeScript, Tailwind CSS 4, Node Test Runner, Astro Assets

---

### Task 1: Verifizierte Daten und Bilder

**Files:**
- Create: src/data/garden.ts
- Create: src/data/garden-images.ts
- Create: tests/garden-content.test.mjs
- Modify: package.json
- Create: src/assets/images/garden/references/*

- [ ] **Step 1: Write the failing test**

~~~js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("garden data covers the three verified service families", async () => {
  const source = await readFile(new URL("../src/data/garden.ts", import.meta.url), "utf8");
  for (const id of ["design", "maintenance", "containers-transport"]) assert.match(source, new RegExp('id: "' + id + '"'));
  assert.match(source, /verifiedOn: "2026-08-24"/);
});
~~~

- [ ] **Step 2: Run test to verify it fails**

Run: node --test tests/garden-content.test.mjs
Expected: FAIL because garden.ts does not exist.

- [ ] **Step 3: Write minimal implementation**

Define LocalizedText, GardenService, GardenProject and GardenArticle; export the officially listed work items and only named/verifiable reference projects. Download approved official-site images into the reference folder and map each import with documentary=true and bilingual alt text. Add test:garden.

- [ ] **Step 4: Run test to verify it passes**

Run: npm run test:garden
Expected: PASS.

- [ ] **Step 5: Commit**

~~~bash
git add src/data/garden.ts src/data/garden-images.ts src/assets/images/garden/references tests/garden-content.test.mjs package.json
git commit -m "feat: add verified garden services and references"
~~~

### Task 2: Gallery and garden detail pages

**Files:**
- Create: src/components/ImageGallery.astro
- Create: src/pages/gartenbau/gartengestaltung/index.astro
- Create: src/pages/gartenbau/gartenunterhalt/index.astro
- Create: src/pages/gartenbau/mulden-transporte/index.astro
- Create: src/pages/gartenbau/referenzen/index.astro
- Create: src/pages/en/gartenbau/garden-design/index.astro
- Create: src/pages/en/gartenbau/garden-maintenance/index.astro
- Create: src/pages/en/gartenbau/containers-transport/index.astro
- Create: src/pages/en/gartenbau/references/index.astro
- Modify: src/i18n/nav.ts
- Modify: tests/garden-content.test.mjs

- [ ] **Step 1: Write the failing test**

Assert eight pages exist, route pairs exist, ImageGallery uses Astro Image with widths and sizes, and every gallery record has non-empty DE/EN alt text.

- [ ] **Step 2: Run test to verify it fails**

Run: npm run test:garden
Expected: FAIL on missing files.

- [ ] **Step 3: Write minimal implementation**

Build focused pages from verified service data, SectionNav, ImageGallery and ContactForm links. Gallery cards identify the project only where the official source names it; otherwise label the image as an example from Falkenried Gruppe without inventing location or scope.

- [ ] **Step 4: Run test to verify it passes**

Run: npm run test:garden
Expected: PASS.

- [ ] **Step 5: Commit**

~~~bash
git add src/components/ImageGallery.astro src/pages/gartenbau src/pages/en/gartenbau src/i18n/nav.ts tests/garden-content.test.mjs
git commit -m "feat: add bilingual garden service and gallery pages"
~~~

### Task 3: Garden tips and upgraded hubs

**Files:**
- Create: src/pages/gartenbau/tipps/index.astro
- Create: src/pages/en/gartenbau/tips/index.astro
- Modify: src/pages/gartenbau.astro
- Modify: src/pages/en/gartenbau.astro
- Modify: src/i18n/nav.ts
- Modify: tests/garden-content.test.mjs

- [ ] **Step 1: Write the failing test**

Assert tip pages render data from gardenArticles, hubs link all five subsections, and unsupported claims 3D-Visualisierung, Lichtplanung and Pflegeabos are absent.

- [ ] **Step 2: Run test to verify it fails**

Run: npm run test:garden
Expected: FAIL on missing pages and unsupported existing copy.

- [ ] **Step 3: Write minimal implementation**

Create article cards for timeless, professionally safe topics derived from the published service scope; label them as tips, not completed projects. Upgrade hubs to portal cards and verified process language while retaining forms and stable global navigation.

- [ ] **Step 4: Run test to verify it passes**

Run: npm run test:garden
Expected: PASS.

- [ ] **Step 5: Commit**

~~~bash
git add src/pages/gartenbau.astro src/pages/en/gartenbau.astro src/pages/gartenbau/tipps src/pages/en/gartenbau/tips src/i18n/nav.ts tests/garden-content.test.mjs
git commit -m "feat: complete garden portal and expert tips"
~~~

### Task 4: Garden verification

**Files:**
- Modify: CONTENT-TODO.md
- Modify: docs/2026-08-24-live-site-gap-audit.md

- [ ] **Step 1: Record image origins and open approvals**

List every documentary image source URL, download date and any outstanding publication approval.

- [ ] **Step 2: Run complete verification**

Run: npm run test:garden; npm run test:bmw; npm run test:data; npm run test:forms; npm run test:portfolio; npm run test:home-media; node --test tests/layout-stability.test.mjs; npx astro check; npm run build
Expected: all tests pass, Astro has no errors, build exits 0.

- [ ] **Step 3: Verify local pages**

Request all ten new DE/EN routes and both hubs from the running development server. Expected: HTTP 200.

- [ ] **Step 4: Commit**

~~~bash
git add CONTENT-TODO.md docs/2026-08-24-live-site-gap-audit.md
git commit -m "docs: record garden portal verification"
~~~
