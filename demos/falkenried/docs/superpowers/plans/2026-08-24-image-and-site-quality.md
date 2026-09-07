# Image and Site Quality Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace weak imagery with one credible, high-quality visual system for BMW, garden, and real estate while preserving the homepage hero and removing misleading placeholders.

**Architecture:** New raster assets live in the existing division-specific folders under `src/assets/images/` and continue through Astro's `Image`/`Hero` pipeline. A small static regression test protects the homepage hero, forbids visible fake staff names, and requires disclosure for generic property imagery. German and English route pairs are changed together.

**Tech Stack:** Astro 7, TypeScript, Tailwind CSS 4, Astro assets pipeline, Node.js built-in test runner, built-in image generation.

---

## File Map

- Create `tests/content-quality.test.mjs`: deterministic checks for protected hero and misleading placeholder removal.
- Modify `package.json`: add a `test` script using Node's built-in test runner.
- Create `src/assets/images/bmw/service-workshop.jpg` and `src/assets/images/bmw/diagnostics-detail.jpg`: coherent BMW service imagery.
- Create `src/assets/images/garden/swiss-garden-hero.jpg`, `garden-craft-detail.jpg`, and `garden-care-detail.jpg`: coherent Swiss garden imagery.
- Create `src/assets/images/immobilien/residential-architecture-hero.jpg`, `residential-symbol.jpg`, `commercial-symbol.jpg`, and `parking-symbol.jpg`: neutral architectural imagery, explicitly not real listings.
- Modify `src/pages/bmw-garage.astro` and `src/pages/en/bmw-garage.astro`: new imagery and neutral service contact.
- Modify `src/pages/gartenbau.astro` and `src/pages/en/gartenbau.astro`: new garden imagery and accurate alt text.
- Modify `src/pages/immobilien.astro` and `src/pages/en/immobilien.astro`: new imagery, symbol-image disclosure, neutral contact.
- Modify `CONTENT-TODO.md`: record which visual placeholders were neutralized and what real content remains required.

### Task 1: Add Content-Quality Regression Tests

**Files:**
- Create: `tests/content-quality.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing test**

Create `tests/content-quality.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("homepage keeps the real Emil Falkenried hero", async () => {
  for (const page of ["src/pages/index.astro", "src/pages/en/index.astro"]) {
    assert.match(await read(page), /images\/home\/falkenried-standort\.jpg/);
  }
});

test("division pages contain no fake staff names", async () => {
  for (const page of [
    "src/pages/bmw-garage.astro",
    "src/pages/en/bmw-garage.astro",
    "src/pages/immobilien.astro",
    "src/pages/en/immobilien.astro",
  ]) {
    assert.doesNotMatch(await read(page), /Vorname Nachname|First Last/);
  }
});

test("generic property imagery is disclosed in both languages", async () => {
  assert.match(await read("src/pages/immobilien.astro"), /Symbolbild/);
  assert.match(await read("src/pages/en/immobilien.astro"), /Reference image/);
});
```

- [ ] **Step 2: Add the test command**

Add this entry to `scripts` in `package.json`:

```json
"test": "node --test tests/*.test.mjs"
```

- [ ] **Step 3: Run the tests to verify the new protections fail for current placeholders**

Run: `npm test`

Expected: homepage test passes; staff-name and property-disclosure tests fail.

- [ ] **Step 4: Commit the test harness**

```bash
git add package.json tests/content-quality.test.mjs
git commit -m "test: add visual content quality guards"
```

### Task 2: Generate and Validate the BMW Image Pair

**Files:**
- Create: `src/assets/images/bmw/service-workshop.jpg`
- Create: `src/assets/images/bmw/diagnostics-detail.jpg`

- [ ] **Step 1: Generate the BMW hero image with the built-in image tool**

Use this exact prompt:

```text
Use case: photorealistic-natural
Asset type: full-width website hero for a premium independent BMW service workshop in the Zurich Unterland, Switzerland
Primary request: an experienced automotive technician working beside a modern dark blue BMW inside an immaculate but genuinely active workshop
Scene/backdrop: contemporary Swiss garage, orderly tools, vehicle lift and subtle daylight through industrial windows
Style/medium: premium editorial automotive photography, natural textures, believable documentary detail
Composition/framing: wide landscape, technician and car concentrated in the right two thirds, calm darker negative space on the left for white website copy, eye-level 35mm camera
Lighting/mood: cool natural daylight with restrained warm task lights, precise, trustworthy, understated
Color palette: navy, steel, graphite, clean neutral whites
Constraints: no readable signs, no invented company logo, no license plate text, no watermark, physically plausible tools and hands
Avoid: futuristic showroom, excessive reflections, racing aesthetic, luxury-ad cliché, text
```

Save the selected project-bound output as `src/assets/images/bmw/service-workshop.jpg` without overwriting the old asset.

- [ ] **Step 2: Generate the BMW diagnostics detail image**

Use this exact prompt:

```text
Use case: photorealistic-natural
Asset type: 4:3 website editorial detail image
Primary request: close documentary view of a skilled automotive technician performing computer diagnostics on a BMW in a clean Swiss workshop
Scene/backdrop: real service bay with organized professional equipment and subtle mechanical detail
Style/medium: high-end editorial photography, realistic skin and hands, crisp material texture
Composition/framing: landscape 4:3, technician and diagnostic tool clearly visible, no large empty foreground
Lighting/mood: controlled natural workshop light, calm competence
Color palette: graphite, navy, silver, muted BMW blue accent
Constraints: no readable UI text, no fake logos or signage, no watermark, anatomically correct hands
Avoid: staged handshake, showroom sales scene, neon lighting, text
```

Save as `src/assets/images/bmw/diagnostics-detail.jpg`.

- [ ] **Step 3: Inspect both files**

Check each image at original detail. Reject and regenerate if hands, vehicle geometry, tools, logos, or lighting are implausible. Confirm the hero retains useful left-side copy space and both files are at least 1536 px on the long edge.

- [ ] **Step 4: Commit the accepted BMW assets**

```bash
git add src/assets/images/bmw/service-workshop.jpg src/assets/images/bmw/diagnostics-detail.jpg
git commit -m "assets: add coherent BMW service photography"
```

### Task 3: Generate and Validate the Garden Image Set

**Files:**
- Create: `src/assets/images/garden/swiss-garden-hero.jpg`
- Create: `src/assets/images/garden/garden-craft-detail.jpg`
- Create: `src/assets/images/garden/garden-care-detail.jpg`

- [ ] **Step 1: Generate the garden hero**

Use this prompt:

```text
Use case: photorealistic-natural
Asset type: full-width garden-service website hero
Primary request: a beautifully completed contemporary private garden appropriate to the Zurich Unterland, with layered native planting, precise natural-stone paths, mature greenery and a discreet gardener finishing work
Scene/backdrop: Swiss residential garden, restrained contemporary architecture, temperate Central European planting
Style/medium: premium landscape editorial photography, realistic seasonal detail
Composition/framing: wide landscape, garden detail and gardener on the right, darker calm foliage on the left for white copy
Lighting/mood: soft early-morning light after light rain, cultivated but natural, trustworthy
Color palette: deep natural greens, limestone grey, warm timber, restrained flowers
Constraints: botanically and structurally plausible, no visible brand, no text, no watermark
Avoid: Mediterranean villa, palm trees, tropical planting, palace garden, oversaturated HDR
```

Save as `src/assets/images/garden/swiss-garden-hero.jpg`.

- [ ] **Step 2: Generate two complementary garden detail images**

Generate one landscape image of a gardener precisely laying a natural-stone path and one landscape image of careful seasonal pruning among layered Swiss planting. Use the same natural editorial lighting and palette as the hero; require plausible hands/tools, no text, no logos, and no watermark. Save them as `garden-craft-detail.jpg` and `garden-care-detail.jpg`.

- [ ] **Step 3: Inspect the set for continuity and realism**

Verify Central European planting, believable tools and hands, compatible color grading, and useful square crops. Regenerate any image that reads as a different climate or contains synthetic artifacts.

- [ ] **Step 4: Commit the accepted garden assets**

```bash
git add src/assets/images/garden/swiss-garden-hero.jpg src/assets/images/garden/garden-craft-detail.jpg src/assets/images/garden/garden-care-detail.jpg
git commit -m "assets: add Swiss garden service photography"
```

### Task 4: Generate and Validate Neutral Real-Estate Imagery

**Files:**
- Create: `src/assets/images/immobilien/residential-architecture-hero.jpg`
- Create: `src/assets/images/immobilien/residential-symbol.jpg`
- Create: `src/assets/images/immobilien/commercial-symbol.jpg`
- Create: `src/assets/images/immobilien/parking-symbol.jpg`

- [ ] **Step 1: Generate the architectural hero**

Use this prompt:

```text
Use case: photorealistic-natural
Asset type: full-width real-estate portfolio website hero, used as atmospheric reference photography rather than a listing
Primary request: refined contemporary multi-family residential architecture in the Zurich Unterland, viewed from a landscaped courtyard at blue hour
Scene/backdrop: plausible Swiss low-rise building, timber and mineral facade, restrained landscaping, warm occupied windows
Style/medium: premium architectural editorial photography, natural perspective and materials
Composition/framing: wide landscape, building mass on the right, calm shaded facade and sky on the left for white copy
Lighting/mood: quiet blue hour, warm interior light, stable and trustworthy
Color palette: slate, warm timber, soft grey, muted green
Constraints: no people as focal subjects, no readable address, no sign, no logo, no watermark
Avoid: skyscraper, luxury resort, impossible cantilevers, extreme wide-angle distortion, text
```

Save as `src/assets/images/immobilien/residential-architecture-hero.jpg`.

- [ ] **Step 2: Generate three category reference images**

Generate consistent landscape reference images for: a bright unfurnished Swiss apartment, a practical modern small-business office, and a clean underground parking bay. Keep natural perspective, modest high-quality materials, neutral daylight, no readable address/signage, no logos, no watermark. Save as `residential-symbol.jpg`, `commercial-symbol.jpg`, and `parking-symbol.jpg`.

- [ ] **Step 3: Inspect for misleading specificity and visual artifacts**

Reject images containing addresses, identifiable project signage, impossible room geometry, malformed vehicles, or implausible Swiss construction. Confirm all images can be truthfully labelled as reference imagery.

- [ ] **Step 4: Commit the accepted real-estate assets**

```bash
git add src/assets/images/immobilien/residential-architecture-hero.jpg src/assets/images/immobilien/residential-symbol.jpg src/assets/images/immobilien/commercial-symbol.jpg src/assets/images/immobilien/parking-symbol.jpg
git commit -m "assets: add neutral real estate reference photography"
```

### Task 5: Integrate BMW and Garden Assets in Both Languages

**Files:**
- Modify: `src/pages/bmw-garage.astro`
- Modify: `src/pages/en/bmw-garage.astro`
- Modify: `src/pages/gartenbau.astro`
- Modify: `src/pages/en/gartenbau.astro`

- [ ] **Step 1: Replace BMW imports and accurate alt text**

In both BMW pages, import `service-workshop.jpg` as `heroImage` and `diagnostics-detail.jpg` as `detailImage`. Use alt text equivalent to:

```text
DE hero: "Automobiltechniker bei der Arbeit in einer modernen BMW-Servicewerkstatt"
DE detail: "Techniker bei der Fahrzeugdiagnose in der Werkstatt"
EN hero: "Automotive technician at work in a modern BMW service workshop"
EN detail: "Technician performing vehicle diagnostics in the workshop"
```

- [ ] **Step 2: Replace the fake BMW team cards with neutral contact copy**

Remove `TeamCard` and portrait imports from both BMW pages. Replace the team grid with a compact service-contact block that uses no personal name or portrait and links to the localized contact route. German heading: `Ihr persönlicher Servicekontakt`; English heading: `Your personal service contact`.

- [ ] **Step 3: Replace garden imports and alt text**

In both garden pages, point `heroImage`, `pathImage`, and `hedgeImage` to the three new garden assets. Use accurate localized descriptions of the completed Swiss garden, natural-stone work, and seasonal pruning.

- [ ] **Step 4: Run checks**

Run: `npm test && npm run build`

Expected: tests still fail only on real-estate disclosure until Task 6; Astro build succeeds.

- [ ] **Step 5: Commit the division integration**

```bash
git add src/pages/bmw-garage.astro src/pages/en/bmw-garage.astro src/pages/gartenbau.astro src/pages/en/gartenbau.astro
git commit -m "feat: integrate BMW and garden visual systems"
```

### Task 6: Integrate Real-Estate Imagery and Disclosure

**Files:**
- Modify: `src/pages/immobilien.astro`
- Modify: `src/pages/en/immobilien.astro`

- [ ] **Step 1: Replace all real-estate image imports**

Map the new files to the existing variables: architecture hero to `heroImage`, residential reference to `apartmentImg`, commercial reference to `officeImg`, and parking reference to `parkingImg`.

- [ ] **Step 2: Add explicit reference-image disclosure**

Add this text immediately above the property grid in German:

```astro
<p class="mb-6 text-sm text-[var(--color-ink-muted)]">
  Die Abbildungen sind Symbolbilder und zeigen nicht die aktuell angebotenen Objekte.
</p>
```

Add the localized equivalent above the English grid:

```astro
<p class="mb-6 text-sm text-[var(--color-ink-muted)]">
  Reference images are shown and do not depict the properties currently offered.
</p>
```

Change individual image alt text so it describes a reference apartment, office, or parking space without naming a specific address.

- [ ] **Step 3: Replace the fake real-estate contact card**

Remove the `TeamCard` and portrait import. Keep the contact column, but use the localized heading and a neutral text-only contact introduction with no personal identity.

- [ ] **Step 4: Run regression tests**

Run: `npm test`

Expected: all three tests pass.

- [ ] **Step 5: Commit the real-estate integration**

```bash
git add src/pages/immobilien.astro src/pages/en/immobilien.astro
git commit -m "feat: clarify real estate reference imagery"
```

### Task 7: Update Launch Documentation and Verify the Site

**Files:**
- Modify: `CONTENT-TODO.md`

- [ ] **Step 1: Update the image and team sections**

Document the new atmospheric images, state that generic staff portraits were removed from BMW and real estate, retain the requirement for real names/photos, and state that real property photography is still required before listings are represented as concrete available objects.

- [ ] **Step 2: Run all automated verification**

Run: `npm test`

Expected: all tests pass.

Run: `npx astro check`

Expected: zero errors.

Run: `npm run build`

Expected: successful static build with all German and English routes generated.

- [ ] **Step 3: Check generated asset output**

Inspect `dist/_astro/` and confirm the new source images are emitted as optimized variants rather than copied at full source size only. Confirm the homepage still references `falkenried-standort.jpg` in both language routes.

- [ ] **Step 4: Perform desktop and mobile visual review**

At widths near 1440 px and 390 px, inspect `/`, `/bmw-garage`, `/gartenbau`, `/immobilien`, and their English counterparts. Verify hero copy contrast, focal crops, no layout shift, disclosure visibility, consistent card heights, and no fake team identities.

- [ ] **Step 5: Commit the documentation and final adjustments**

```bash
git add CONTENT-TODO.md src package.json tests
git commit -m "docs: update visual content launch requirements"
```

## Completion Criteria

- The real homepage hero remains unchanged in source references and appearance.
- New BMW, garden, and real-estate imagery passes visual artifact review.
- German and English pages remain structurally synchronized.
- No fake employee name or portrait is presented as company fact.
- Generic real-estate imagery is explicitly disclosed.
- `npm test`, `npx astro check`, and `npm run build` pass.
