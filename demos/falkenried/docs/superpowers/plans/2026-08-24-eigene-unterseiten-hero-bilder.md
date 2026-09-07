# Eigene Unterseiten-Hero-Bilder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Neun BMW- und Gartenbau-Unterseiten erhalten jeweils ein eigenes, echtes und inhaltlich passendes Hero-Bild.

**Architecture:** Zwei zentrale Bildzuordnungen importieren lokale Astro-Assets und liefern pro Seitentyp Bild sowie DE/EN-Alternativtext. BMWPortalPage und GardenPortalPage verwenden diese Zuordnungen, ohne den bestehenden Hero-Aufbau zu verändern.

**Tech Stack:** Astro 7, TypeScript, Astro Assets, Node Test Runner

---

### Task 1: Echte Originalbilder beschaffen

**Files:**
- Create: src/assets/images/bmw/subpages/service.jpg
- Create: src/assets/images/bmw/subpages/occasions.jpg
- Create: src/assets/images/bmw/subpages/service-station.jpg
- Create: src/assets/images/bmw/subpages/accessories.jpg
- Create: src/assets/images/garden/subpages/design.jpg
- Create: src/assets/images/garden/subpages/maintenance.jpg
- Create: src/assets/images/garden/subpages/transport.jpg
- Create: src/assets/images/garden/subpages/references.jpg
- Create: src/assets/images/garden/subpages/tips.jpg

- [ ] **Step 1: Resolve the original image URLs**

Read the official BMW service, occasions, service station and accessories pages plus the official garden service/reference pages. Select one distinct image whose subject directly represents each route.

- [ ] **Step 2: Download the nine selected originals**

Use Invoke-WebRequest with explicit official wp-content URLs and explicit local destinations. Expected: nine non-empty JPEG files in the two subpages directories.

- [ ] **Step 3: Verify file signatures**

Run:
~~~powershell
Get-ChildItem src/assets/images/bmw/subpages,src/assets/images/garden/subpages -File | ForEach-Object { if ($_.Length -lt 10000) { throw "Image too small: $($_.FullName)" } }
~~~
Expected: exit 0 and no small/empty files.

### Task 2: Test-first image contracts

**Files:**
- Create: tests/subpage-hero-images.test.mjs
- Create: src/data/bmw-images.ts
- Create: src/data/garden-hero-images.ts
- Modify: package.json

- [ ] **Step 1: Write the failing contract**

~~~js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("every subpage has a unique local hero with bilingual alt text", async () => {
  for (const path of ["../src/data/bmw-images.ts", "../src/data/garden-hero-images.ts"]) {
    const source = await readFile(new URL(path, import.meta.url), "utf8");
    assert.match(source, /alt:\s*\{\s*de:/);
    assert.match(source, /en:/);
    assert.doesNotMatch(source, /https?:\/\//);
  }
});
~~~

- [ ] **Step 2: Run and verify RED**

Run: node --test tests/subpage-hero-images.test.mjs
Expected: FAIL because both mapping files are missing.

- [ ] **Step 3: Add minimal typed mappings**

Export bmwHeroImages keyed by service, occasions, station and accessories, and gardenHeroImages keyed by design, maintenance, transport, references and tips. Every value contains image and alt.de/alt.en. Add test:subpage-images to package.json.

- [ ] **Step 4: Run and verify GREEN**

Run: npm run test:subpage-images
Expected: PASS.

- [ ] **Step 5: Commit**

~~~bash
git add src/assets/images/bmw/subpages src/assets/images/garden/subpages src/data/bmw-images.ts src/data/garden-hero-images.ts tests/subpage-hero-images.test.mjs package.json
git commit -m "feat: add unique verified subpage hero images"
~~~

### Task 3: Connect images to shared page components

**Files:**
- Modify: src/components/BMWPortalPage.astro
- Modify: src/components/GardenPortalPage.astro
- Modify: tests/subpage-hero-images.test.mjs

- [ ] **Step 1: Extend the failing contract**

Assert BMWPortalPage imports bmwHeroImages and renders hero.image/hero.alt[lang]; assert GardenPortalPage does the equivalent with gardenHeroImages. Assert neither component imports the old shared detailImage or heroImage.

- [ ] **Step 2: Run and verify RED**

Run: npm run test:subpage-images
Expected: FAIL because both components still use a shared image.

- [ ] **Step 3: Implement the mappings**

Select const hero = bmwHeroImages[kind] and const hero = gardenHeroImages[kind]. Pass hero.image to Astro Image and hero.alt[lang] to alt while preserving current widths, sizes, overlay, text placement and height.

- [ ] **Step 4: Run and verify GREEN**

Run: npm run test:subpage-images
Expected: PASS.

- [ ] **Step 5: Commit**

~~~bash
git add src/components/BMWPortalPage.astro src/components/GardenPortalPage.astro tests/subpage-hero-images.test.mjs
git commit -m "feat: give every service subpage its own hero"
~~~

### Task 4: Verify and document

**Files:**
- Modify: CONTENT-TODO.md

- [ ] **Step 1: Record image provenance**

Add the nine official source URLs, retrieval date and remaining publication-approval note to CONTENT-TODO.md.

- [ ] **Step 2: Run full verification**

Run: npm run test:subpage-images; npm run test:bmw; npm run test:garden; npm run test:content; node --test tests/layout-stability.test.mjs; npx astro check; npm run build
Expected: zero failures, zero Astro errors and a successful production build.

- [ ] **Step 3: Verify routes on the running server**

Request the nine German routes and representative English counterparts at http://localhost:4321. Expected: HTTP 200 for every route.

- [ ] **Step 4: Commit**

~~~bash
git add CONTENT-TODO.md
git commit -m "docs: record subpage hero image sources"
~~~
