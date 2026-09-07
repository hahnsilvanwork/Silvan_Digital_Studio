# BMW-Bereich Ausbau Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Den BMW-Bereich zweisprachig um Servicekatalog, Occasionen, Servicestation, Zubehör und verifizierte FAQ-Inhalte erweitern.

**Architecture:** Verifizierte Inhalte liegen typisiert in einer zentralen Datendatei. Kleine Astro-Komponenten rendern Bereichsnavigation, Servicekarten und den zustimmungsbasierten Autolina-Embed; Seiten bleiben dünne Kompositionen.

**Tech Stack:** Astro 7, TypeScript, Tailwind CSS 4, Node Test Runner, Astro Assets

---

### Task 1: BMW-Datenvertrag

**Files:**
- Create: src/data/bmw.ts
- Create: tests/bmw-content.test.mjs
- Modify: package.json

- [ ] **Step 1: Write the failing test**

~~~js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("BMW data contains every verified service and station feature", async () => {
  const source = await readFile(new URL("../src/data/bmw.ts", import.meta.url), "utf8");
  for (const item of ["holiday-check", "climate-service", "windscreen", "body-damage", "rbv", "bmw-i", "service-plus"]) {
    assert.match(source, new RegExp('id: "' + item + '"'));
  }
  for (const item of ["fuel", "charging", "car-wash", "vacuum"]) assert.match(source, new RegExp('id: "' + item + '"'));
  assert.match(source, /verifiedOn: "2026-08-24"/);
});
~~~

- [ ] **Step 2: Run test to verify it fails**

Run: node --test tests/bmw-content.test.mjs
Expected: FAIL because src/data/bmw.ts does not exist.

- [ ] **Step 3: Write minimal implementation**

Create exported BMWService, StationFeature and LocalizedText types; export bmwServices, stationFeatures, bmwFaqs and autolina with the exact verified German/English content from the design sources. Store prices as optional display strings and verifiedOn as 2026-08-24. Add test:bmw to package.json.

- [ ] **Step 4: Run test to verify it passes**

Run: npm run test:bmw
Expected: PASS with one test.

- [ ] **Step 5: Commit**

~~~bash
git add src/data/bmw.ts tests/bmw-content.test.mjs package.json
git commit -m "feat: add verified BMW content data"
~~~

### Task 2: Reusable BMW navigation and Autolina consent

**Files:**
- Create: src/components/SectionNav.astro
- Create: src/components/ExternalEmbed.astro
- Modify: tests/bmw-content.test.mjs

- [ ] **Step 1: Write the failing test**

Add assertions that SectionNav accepts items and activePath, and that ExternalEmbed contains data-external-embed, a button, a noscript fallback and no iframe src attribute in server-rendered markup.

- [ ] **Step 2: Run test to verify it fails**

Run: npm run test:bmw
Expected: FAIL because both components are missing.

- [ ] **Step 3: Write minimal implementation**

SectionNav renders an accessible nav with horizontally scrollable mobile links and distributed desktop links. ExternalEmbed renders a local consent panel; its inline click handler creates an iframe from data-src only after activation and leaves target=_blank fallback visible.

- [ ] **Step 4: Run test to verify it passes**

Run: npm run test:bmw
Expected: PASS.

- [ ] **Step 5: Commit**

~~~bash
git add src/components/SectionNav.astro src/components/ExternalEmbed.astro tests/bmw-content.test.mjs
git commit -m "feat: add BMW section navigation and external embed"
~~~

### Task 3: BMW detail pages and language routes

**Files:**
- Create: src/pages/bmw-garage/service/index.astro
- Create: src/pages/bmw-garage/occasionen/index.astro
- Create: src/pages/bmw-garage/servicestation/index.astro
- Create: src/pages/bmw-garage/zubehoer/index.astro
- Create: src/pages/en/bmw-garage/service/index.astro
- Create: src/pages/en/bmw-garage/used-cars/index.astro
- Create: src/pages/en/bmw-garage/service-station/index.astro
- Create: src/pages/en/bmw-garage/accessories/index.astro
- Modify: src/i18n/nav.ts
- Modify: tests/bmw-content.test.mjs

- [ ] **Step 1: Write the failing test**

Assert all eight page files exist, each imports SectionNav, and routes contains bmwService, bmwOccasions, bmwStation and bmwAccessories with DE/EN paths.

- [ ] **Step 2: Run test to verify it fails**

Run: npm run test:bmw
Expected: FAIL listing the missing page files and route keys.

- [ ] **Step 3: Write minimal implementation**

Compose each page from BaseLayout, Hero or compact hero, SectionNav, verified data, accessible cards and area-specific CTAs. Occasion pages use ExternalEmbed with the verified Autolina URL and external fallback. Station pages separate 24/7 services from time-limited wash/vacuum hours. Accessories link to official BMW Switzerland.

- [ ] **Step 4: Run test to verify it passes**

Run: npm run test:bmw
Expected: PASS.

- [ ] **Step 5: Commit**

~~~bash
git add src/pages/bmw-garage src/pages/en/bmw-garage src/i18n/nav.ts tests/bmw-content.test.mjs
git commit -m "feat: add bilingual BMW detail pages"
~~~

### Task 4: Upgrade BMW hubs and FAQ

**Files:**
- Modify: src/pages/bmw-garage.astro
- Modify: src/pages/en/bmw-garage.astro
- Modify: src/pages/faq.astro
- Modify: src/pages/en/faq.astro
- Modify: tests/bmw-content.test.mjs

- [ ] **Step 1: Write the failing test**

Assert both hubs link to every BMW detail route, both FAQ pages source BMW questions from src/data/bmw.ts, and unsupported claims such as Textil-Waschanlage or Neu- und Occasionswagen are absent.

- [ ] **Step 2: Run test to verify it fails**

Run: npm run test:bmw
Expected: FAIL on missing links and old unsupported wording.

- [ ] **Step 3: Write minimal implementation**

Replace the three generic cards with four linked portal cards, add SectionNav, retain stable header behavior, use verified wording, and map bmwFaqs into the existing FAQ presentation in both languages.

- [ ] **Step 4: Run test to verify it passes**

Run: npm run test:bmw
Expected: PASS.

- [ ] **Step 5: Commit**

~~~bash
git add src/pages/bmw-garage.astro src/pages/en/bmw-garage.astro src/pages/faq.astro src/pages/en/faq.astro tests/bmw-content.test.mjs
git commit -m "feat: turn BMW pages into a service portal"
~~~

### Task 5: BMW verification

**Files:**
- Modify: CONTENT-TODO.md
- Modify: docs/2026-08-24-live-site-gap-audit.md

- [ ] **Step 1: Document source dates and remaining legal checks**

Record Autolina consent behavior, source verification date, externally maintained prices, and image licensing review.

- [ ] **Step 2: Run complete verification**

Run: npm run test:bmw; npm run test:data; npm run test:forms; npm run test:portfolio; npm run test:home-media; node --test tests/layout-stability.test.mjs; npx astro check; npm run build
Expected: all tests pass, Astro reports no errors, and build exits 0.

- [ ] **Step 3: Verify local pages**

Start or retain astro dev --background and request all eight new routes plus both hubs. Expected: HTTP 200 for every route.

- [ ] **Step 4: Commit**

~~~bash
git add CONTENT-TODO.md docs/2026-08-24-live-site-gap-audit.md
git commit -m "docs: record BMW portal verification"
~~~
