# SILVAN Digital Studio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved bilingual, mobile-first SILVAN Digital Studio website as a production-ready Next.js application with functional routing, accessible interactions, direct contact actions, and a WhatsApp Review Card configurator.

**Architecture:** Next.js App Router renders German routes at the root and thin English route wrappers under `/en`. Typed locale dictionaries and portfolio records feed reusable server-rendered page compositions; client components are limited to the mobile menu and Review Card configurator. CSS Modules plus global design tokens implement the Swiss editorial system without a UI framework or global state library.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS Modules, Vitest, Testing Library, Playwright, ESLint, `next/image`, `next/font`

**Approved specification:** `docs/superpowers/specs/2026-08-27-silvan-digital-studio-design.md`

---

## File structure

```text
src/
  app/
    layout.tsx, page.tsx, globals.css, not-found.tsx
    websites/page.tsx, reviews/page.tsx, presence/page.tsx
    automation/page.tsx, work/page.tsx, work/[slug]/page.tsx
    about/page.tsx, contact/page.tsx, hello/page.tsx
    en/... matching route wrappers
    sitemap.ts, robots.ts, icon.tsx, opengraph-image.tsx
  components/
    layout/Navigation.tsx, MobileMenu.tsx, Footer.tsx
    ui/ButtonLink.tsx, SectionHeading.tsx, PriceDisplay.tsx
    services/ServiceDirectory.tsx, ProcessSteps.tsx
    work/ProjectPreview.tsx, ProjectDetail.tsx
    reviews/NFCProductVisual.tsx, ReviewInquiryConfigurator.tsx
    contact/ContactActions.tsx
  content/
    types.ts, de.ts, en.ts, projects.ts
  features/pages/
    HomePage.tsx, WebsitesPage.tsx, ReviewsPage.tsx
    PresencePage.tsx, AutomationPage.tsx, WorkPage.tsx
    AboutPage.tsx, ContactPage.tsx, HelloPage.tsx
  lib/
    locales.ts, routes.ts, metadata.ts, whatsapp.ts, validation.ts
  styles/
    layout.module.css, pages.module.css, motion.css
tests/
  unit/*.test.ts(x)
  e2e/*.spec.ts
public/images/
  products/review-cards.png, products/review-stands.png
  portrait/README.md
  projects/*
```

### Task 1: Bootstrap the application and test harness

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `playwright.config.ts`
- Create: `.env.example`
- Create: `.gitignore`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`

- [ ] **Step 1: Verify the runtime before installation**

Run: `node --version; npm --version`

Expected: Node.js 20.9 or newer and a working npm installation, matching the current Next.js system requirement.

- [ ] **Step 2: Create the package manifest and install the production packages**

Create this manifest, then install the packages so npm replaces the `latest` tags with a reproducible lockfile:

```json
{
  "name": "silvan-digital-studio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {}
}
```

```powershell
npm install next@latest react@latest react-dom@latest
npm install --save-dev typescript @types/node @types/react @types/react-dom eslint eslint-config-next vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitejs/plugin-react @playwright/test
```

Expected: `package-lock.json` is created and `npm audit --omit=dev` reports no unresolved critical production vulnerability.

- [ ] **Step 3: Add strict configuration**

Use strict TypeScript, the `@/*` alias, jsdom for unit tests, Testing Library setup, Chromium/WebKit/Firefox Playwright projects, and these environment declarations:

```dotenv
NEXT_PUBLIC_SITE_URL=
```

Ignore `.next/`, `node_modules/`, `.env*.local`, `playwright-report/`, `test-results/`, `coverage/`, and `.superpowers/` without ignoring the supplied mockup or product images.

- [ ] **Step 4: Add the smallest recognizable shell**

Create a root layout with `lang="de"`, Geist Sans/Mono variables, viewport metadata, and a root page containing the SILVAN wordmark, the service line, and `Mehr Kunden. Weniger Aufwand.`. Keep this slice static.

- [ ] **Step 5: Run the baseline checks**

Run: `npm run typecheck; npm run lint; npm run build`

Expected: all three commands exit 0 and `/` is statically generated.

- [ ] **Step 6: Commit**

```powershell
git add package.json package-lock.json tsconfig.json next.config.ts eslint.config.mjs vitest.config.ts vitest.setup.ts playwright.config.ts .env.example .gitignore src/app
git commit -m "chore: bootstrap SILVAN Next.js application"
```

### Task 2: Define localization, routes, and typed content

**Files:**
- Create: `src/content/types.ts`
- Create: `src/content/de.ts`
- Create: `src/content/en.ts`
- Create: `src/lib/locales.ts`
- Create: `src/lib/routes.ts`
- Test: `tests/unit/locales.test.ts`
- Test: `tests/unit/routes.test.ts`

- [ ] **Step 1: Write failing locale and route tests**

Test that `getContent('de')` and `getContent('en')` expose identical top-level keys, German is the default, `/reviews` switches to `/en/reviews`, `/en/about` switches to `/about`, and project slugs are preserved.

```ts
expect(Object.keys(getContent('de'))).toEqual(Object.keys(getContent('en')))
expect(switchLocale('/reviews', 'en')).toBe('/en/reviews')
expect(switchLocale('/en/work/archa', 'de')).toBe('/work/archa')
```

- [ ] **Step 2: Run tests and confirm failure**

Run: `npm test -- tests/unit/locales.test.ts tests/unit/routes.test.ts`

Expected: FAIL because the modules do not exist.

- [ ] **Step 3: Implement the locale model and complete dictionaries**

Define `Locale = 'de' | 'en'`, `ServiceContent`, `PriceTier`, `ProcessStep`, `ContactContent`, `PageSeo`, and `SiteContent`. Include all approved German `Sie` copy and natural English copy, exact CHF prices, contact details, navigation labels, error messages, and inquiry labels. Implement route switching without browser-language redirects.

- [ ] **Step 4: Run tests and type checking**

Run: `npm test -- tests/unit/locales.test.ts tests/unit/routes.test.ts; npm run typecheck`

Expected: PASS and exit 0.

- [ ] **Step 5: Commit**

```powershell
git add src/content src/lib/locales.ts src/lib/routes.ts tests/unit
git commit -m "feat: add bilingual typed site content"
```

### Task 3: Establish assets and the responsive design system

**Files:**
- Create: `public/images/products/review-cards.png`
- Create: `public/images/products/review-stands.png`
- Create: `public/images/portrait/README.md`
- Create: `public/images/projects/*`
- Create: `scripts/import-mockup-assets.ps1`
- Modify: `src/app/globals.css`
- Create: `src/styles/layout.module.css`
- Create: `src/styles/pages.module.css`
- Create: `src/styles/motion.css`
- Test: `tests/unit/design-contract.test.ts`

- [ ] **Step 1: Write a failing design-contract test**

Read the global stylesheet and assert the presence of warm paper, near-black, electric blue, `clamp(`, `100dvh`, safe-area handling, `:focus-visible`, and `prefers-reduced-motion`.

- [ ] **Step 2: Run the contract test**

Run: `npm test -- tests/unit/design-contract.test.ts`

Expected: FAIL because the tokens and responsive rules are incomplete.

- [ ] **Step 3: Import the supplied product assets**

```powershell
New-Item -ItemType Directory -Force 'public/images/products','public/images/portrait','public/images/projects' | Out-Null
Copy-Item -LiteralPath 'img.png' -Destination 'public/images/products/review-cards.png'
Copy-Item -LiteralPath 'img_1.png' -Destination 'public/images/products/review-stands.png'
```

Create `public/images/portrait/README.md` stating that the future portrait should be saved as `portrait.webp` at a minimum width of 1200px. Until that file exists, render a CSS editorial block labelled `PORTRÄT FOLGT / PORTRAIT TO FOLLOW`, not a false photograph of Silvan.

Create `scripts/import-mockup-assets.ps1` with this deterministic extraction:

```powershell
$home = Get-Content -Raw 'stitch_silvan_digital_studio\silvan_home_mobile\code.html'
$websites = Get-Content -Raw 'stitch_silvan_digital_studio\silvan_websites_mobile\code.html'
$pattern = 'src="(https://lh3.googleusercontent.com/aida-public/[^"]+)"'
$homeUrls = [regex]::Matches($home, $pattern) | ForEach-Object { $_.Groups[1].Value }
$websiteUrls = [regex]::Matches($websites, $pattern) | ForEach-Object { $_.Groups[1].Value }
$assets = @(
  @{ Url = $homeUrls[0]; File = 'public/images/projects/archa.jpg' },
  @{ Url = $homeUrls[1]; File = 'public/images/projects/lumen.jpg' },
  @{ Url = $websiteUrls[0]; File = 'public/images/projects/architech-studio.jpg' },
  @{ Url = $websiteUrls[1]; File = 'public/images/projects/vanguard-apparel.jpg' }
)
foreach ($asset in $assets) {
  Invoke-WebRequest -Uri $asset.Url -OutFile $asset.File
}
```

Run: `powershell -ExecutionPolicy Bypass -File scripts/import-mockup-assets.ps1`

Expected: four non-empty local project images exist and the application has no Google-hosted runtime image dependency.

- [ ] **Step 4: Implement tokens and mobile-first layout primitives**

Use CSS custom properties for colors, fonts, container width, fluid spacing, and type. Base styles target 320px. Add min-width enhancements at 48rem, 64rem, 80rem, and 96rem. Enforce 44px targets, `overflow-wrap`, media-safe sizing, safe areas, and reduced motion.

- [ ] **Step 5: Run the contract and build**

Run: `npm test -- tests/unit/design-contract.test.ts; npm run build`

Expected: PASS and no CSS/build errors.

- [ ] **Step 6: Commit**

```powershell
git add public/images src/app/globals.css src/styles tests/unit/design-contract.test.ts
git commit -m "feat: add SILVAN design system and local assets"
```

### Task 4: Build accessible navigation, language switching, and footer

**Files:**
- Create: `src/components/layout/Navigation.tsx`
- Create: `src/components/layout/MobileMenu.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/navigation.module.css`
- Create: `src/components/ui/LanguageSwitcher.tsx`
- Test: `tests/unit/navigation.test.tsx`

- [ ] **Step 1: Write failing interaction tests**

Test semantic menu buttons, `aria-expanded`, Escape close, backdrop close, initial focus, restored trigger focus, current-page indication, all seven main routes, and language route preservation.

- [ ] **Step 2: Confirm failure**

Run: `npm test -- tests/unit/navigation.test.tsx`

Expected: FAIL because navigation components do not exist.

- [ ] **Step 3: Implement navigation behavior**

Use one client component for menu state. On open, lock body scrolling, mark the background inert, focus the close button, trap Tab/Shift+Tab, and close on Escape. On close, remove inertness and restore focus. Desktop renders a full horizontal navigation; mobile renders the full-screen editorial drawer.

- [ ] **Step 4: Implement footer contacts**

Use exact `mailto:`, `tel:+41789008500`, `https://wa.me/41789008500`, and LinkedIn URLs. Generate the copyright year at render time. External links receive safe attributes.

- [ ] **Step 5: Run tests and commit**

Run: `npm test -- tests/unit/navigation.test.tsx; npm run typecheck`

```powershell
git add src/components tests/unit/navigation.test.tsx
git commit -m "feat: add accessible global navigation and footer"
```

### Task 5: Create reusable editorial components

**Files:**
- Create: `src/components/ui/ButtonLink.tsx`
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/PriceDisplay.tsx`
- Create: `src/components/services/ServiceDirectory.tsx`
- Create: `src/components/services/ProcessSteps.tsx`
- Create: `src/components/contact/ContactActions.tsx`
- Test: `tests/unit/components.test.tsx`

- [ ] **Step 1: Write failing component tests**

Verify anchors remain anchors, price text is visible without interaction, service rows expose names and descriptions to assistive technology, process steps use ordered lists, and contact actions have accessible names.

- [ ] **Step 2: Run and observe failure**

Run: `npm test -- tests/unit/components.test.tsx`

Expected: FAIL because components do not exist.

- [ ] **Step 3: Implement focused server components**

Keep each component semantic and content-driven. Use CSS transitions only for decorative hover/reveal effects. Do not use clickable `div` elements or hide required copy behind hover.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- tests/unit/components.test.tsx; npm run typecheck`

```powershell
git add src/components tests/unit/components.test.tsx
git commit -m "feat: add reusable editorial components"
```

### Task 6: Implement Home and Hello journeys

**Files:**
- Create: `src/features/pages/HomePage.tsx`
- Create: `src/features/pages/HelloPage.tsx`
- Modify: `src/app/page.tsx`
- Create: `src/app/en/page.tsx`
- Create: `src/app/hello/page.tsx`
- Create: `src/app/en/hello/page.tsx`
- Test: `tests/unit/home-hello.test.tsx`

- [ ] **Step 1: Write failing page tests**

Assert the approved hero, all four service paths and price cues, labelled concept work, About preview, WhatsApp/email contact, and the `/hello` six-row launchpad in both languages.

- [ ] **Step 2: Confirm failure**

Run: `npm test -- tests/unit/home-hello.test.tsx`

- [ ] **Step 3: Implement mobile-first pages**

Build the 390px composition first: concise hero, service directory above the fold continuation, selected work, black philosophy band, About preview, and contact. At desktop, convert to the approved asymmetric grid and immersive work layout. `/hello` keeps direct actions within a short thumb-friendly path.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- tests/unit/home-hello.test.tsx; npm run build`

```powershell
git add src/features/pages/HomePage.tsx src/features/pages/HelloPage.tsx src/app
git commit -m "feat: build home and NFC hello journeys"
```

### Task 7: Implement Websites, Work, and reusable project details

**Files:**
- Create: `src/content/projects.ts`
- Create: `src/components/work/ProjectPreview.tsx`
- Create: `src/components/work/ProjectDetail.tsx`
- Create: `src/features/pages/WebsitesPage.tsx`
- Create: `src/features/pages/WorkPage.tsx`
- Create/modify: German and English `websites`, `work`, and `work/[slug]` route files
- Test: `tests/unit/projects.test.ts`
- Test: `tests/unit/websites-work.test.tsx`

- [ ] **Step 1: Write failing project-model tests**

Assert unique slugs, complete bilingual fields, valid years/categories, local image paths, `status: 'placeholder-concept'`, and no `client` claim for the four supplied mockups.

- [ ] **Step 2: Write failing page tests**

Assert Simple Info CHF 300–699, Standard Business CHF 700–1,999, Premium Large CHF 2,000–4,999, Custom Large from CHF 5,000, the Understand/Design/Build/Launch process, concept labels, project metadata, next-project navigation, and missing-slug 404 behavior.

- [ ] **Step 3: Implement data and pages**

Create records for Archa, Lumen, ArchiTech Studio, and Vanguard Apparel. Render them through shared preview/detail components. Use `generateStaticParams` for both localized project routes and `notFound()` for unknown slugs.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- tests/unit/projects.test.ts tests/unit/websites-work.test.tsx; npm run build`

```powershell
git add src/content/projects.ts src/components/work src/features/pages/WebsitesPage.tsx src/features/pages/WorkPage.tsx src/app/websites src/app/en/websites src/app/work src/app/en/work tests/unit
git commit -m "feat: add website offer and reusable portfolio"
```

### Task 8: Implement Reviews and the WhatsApp inquiry configurator

**Files:**
- Create: `src/lib/validation.ts`
- Create: `src/lib/whatsapp.ts`
- Create: `src/components/reviews/NFCProductVisual.tsx`
- Create: `src/components/reviews/ReviewInquiryConfigurator.tsx`
- Create: `src/components/reviews/review-inquiry.module.css`
- Create: `src/features/pages/ReviewsPage.tsx`
- Create: `src/app/reviews/page.tsx`
- Create: `src/app/en/reviews/page.tsx`
- Test: `tests/unit/whatsapp.test.ts`
- Test: `tests/unit/review-configurator.test.tsx`

- [ ] **Step 1: Write failing message-generation tests**

Given a complete inquiry, assert that the generated URL starts with `https://wa.me/41789008500?text=`, includes decoded product, quantity, business, contact, Google link, address, optional note, and the non-binding statement in the selected language.

- [ ] **Step 2: Write failing validation tests**

Assert empty required fields fail, whitespace is trimmed, valid HTTPS Google URLs pass, invalid schemes fail, quantity must be a positive integer, and the optional note may be empty.

- [ ] **Step 3: Implement pure helpers and pass unit tests**

Run: `npm test -- tests/unit/whatsapp.test.ts`

Expected: PASS after implementing pure validation and URL-building functions.

- [ ] **Step 4: Write and implement component behavior**

Test labelled controls, field-specific errors, focus on the first invalid field, preserved values, no success state, and a final anchor whose WhatsApp URL is generated only after valid input. Use native form semantics and local React state.

- [ ] **Step 5: Build the Reviews page**

Place product explanation, supplied card/stand imagery, NFC Card including setup at CHF 49, NFC Stand at CHF 69, two cards at CHF 80, quantity-discount messaging, and CTA before the process. Use Tap/Open/Review copy without five-star prompting. Add only a slow CSS perspective drift that stops for reduced motion; do not install Three.js.

- [ ] **Step 6: Verify and commit**

Run: `npm test -- tests/unit/whatsapp.test.ts tests/unit/review-configurator.test.tsx; npm run build`

```powershell
git add src/lib src/components/reviews src/features/pages/ReviewsPage.tsx src/app/reviews src/app/en/reviews tests/unit
git commit -m "feat: add Review Card journey and WhatsApp inquiry"
```

### Task 9: Implement Presence, Automation, About, and Contact

**Files:**
- Create: `src/features/pages/PresencePage.tsx`
- Create: `src/features/pages/AutomationPage.tsx`
- Create: `src/features/pages/AboutPage.tsx`
- Create: `src/features/pages/ContactPage.tsx`
- Create/modify: matching German and English route wrappers
- Test: `tests/unit/service-pages.test.tsx`

- [ ] **Step 1: Write failing content and link tests**

Assert Presence names Google Business Profile/local visibility and CHF 249; Automation names recurring emails, reports, and internal workflows without guaranteed outcomes; About identifies Silvan Hahn in Switzerland and marks the image as replaceable; Contact exposes all four exact methods and contains no form.

- [ ] **Step 2: Confirm failure**

Run: `npm test -- tests/unit/service-pages.test.tsx`

- [ ] **Step 3: Implement the four page compositions**

Reuse service, process, contact, and heading components. Keep page-specific editorial layouts and avoid repeating whole page trees between locales.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- tests/unit/service-pages.test.tsx; npm run build`

```powershell
git add src/features/pages src/app/presence src/app/en/presence src/app/automation src/app/en/automation src/app/about src/app/en/about src/app/contact src/app/en/contact tests/unit/service-pages.test.tsx
git commit -m "feat: add presence automation about and contact pages"
```

### Task 10: Add localized metadata, structured data, sitemap, and robots

**Files:**
- Create: `src/lib/metadata.ts`
- Create: `src/components/seo/StructuredData.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/icon.tsx`
- Create: `src/app/opengraph-image.tsx`
- Modify: all route files with metadata exports
- Test: `tests/unit/metadata.test.ts`

- [ ] **Step 1: Write failing metadata tests**

Assert unique localized titles/descriptions, correct language alternates when `NEXT_PUBLIC_SITE_URL=https://example.ch`, no invented canonical when it is empty, localized project metadata, all routes in the sitemap when a base URL exists, and no sitemap URL in robots when it does not.

- [ ] **Step 2: Confirm failure**

Run: `npm test -- tests/unit/metadata.test.ts`

- [ ] **Step 3: Implement metadata helpers and files**

Validate the base URL with `new URL()`. Return canonical/alternate fields only when valid. Generate `Person` JSON-LD for Silvan Hahn and service data without ratings, reviews, street address, or unsupported claims. Generate a branded SILVAN icon and social card through framework image metadata.

- [ ] **Step 4: Verify rendered metadata and commit**

Run: `$env:NEXT_PUBLIC_SITE_URL='https://example.ch'; npm test -- tests/unit/metadata.test.ts; npm run build; Remove-Item Env:NEXT_PUBLIC_SITE_URL`

```powershell
git add src/lib/metadata.ts src/components/seo src/app tests/unit/metadata.test.ts
git commit -m "feat: add bilingual technical SEO"
```

### Task 11: Add end-to-end journey and accessibility coverage

**Files:**
- Create: `tests/e2e/navigation.spec.ts`
- Create: `tests/e2e/reviews.spec.ts`
- Create: `tests/e2e/personas.spec.ts`
- Create: `tests/e2e/responsive.spec.ts`
- Create: `tests/e2e/accessibility.spec.ts`

- [ ] **Step 1: Write journey tests**

Cover Home → Websites → pricing → process → contact; Home → Reviews → pricing → configurator → generated WhatsApp URL; Home → Presence; `/hello` referral paths; language switching; all internal links; and every contact URI.

- [ ] **Step 2: Write responsive and interaction tests**

For 320, 375, 390, 430, 768, 1024, 1280, 1440, and 1920px, assert `document.documentElement.scrollWidth <= window.innerWidth`. Verify menu focus, Escape close, 44px primary targets, reduced-motion behavior, no hidden pricing, and keyboard completion of the configurator.

- [ ] **Step 3: Run tests and fix only demonstrated failures**

Run: `npx playwright install chromium firefox webkit; npm run build; npm run test:e2e`

Expected: Chromium, WebKit, and Firefox projects pass with no dead CTA or overflow assertion.

- [ ] **Step 4: Commit**

```powershell
git add tests/e2e playwright.config.ts src
git commit -m "test: cover responsive customer journeys"
```

### Task 12: Final visual, performance, and production verification

**Files:**
- Modify: the exact component or stylesheet named by each recorded QA failure
- Create: `docs/qa/2026-08-27-final-qa.md`

- [ ] **Step 1: Run the complete automated gate**

Run: `npm run lint; npm run typecheck; npm test; npm run build; npm run test:e2e`

Expected: every command exits 0.

- [ ] **Step 2: Review the running application visually**

Start `npm run dev` in a retained session. Inspect the actual rendered pages at all nine target widths, portrait and landscape tablet, and mobile Safari/WebKit. Record findings for overflow, cropping, hierarchy, spacing, menu layering, product imagery, form controls, and animation.

- [ ] **Step 3: Perform the five persona walkthroughs**

Record the number of taps from entry to price and contact for each persona. Review Card and Website pricing must be reachable within one navigation choice from `/` or `/hello`; WhatsApp/email must remain reachable within one further action after the relevant service content. Presence must be one navigation choice from `/` or `/hello`. A referral must reach About, Work, pricing, and Contact from the global navigation without returning to Home. Treat any missed threshold or dead end as a failing QA item, patch the named route/component, and rerun its Playwright specification.

- [ ] **Step 4: Inspect production output**

Confirm all public pages are statically rendered where intended, no unexpected heavy dependency is present, critical images have reserved dimensions, and browser console output is clean.

- [ ] **Step 5: Document the asset replacement and domain steps**

In `docs/qa/2026-08-27-final-qa.md`, record the verified commands, tested viewport matrix, contact destinations, portrait replacement path, project-data replacement path, and the single `NEXT_PUBLIC_SITE_URL` setting required after a domain is chosen.

- [ ] **Step 6: Commit**

```powershell
git add src public tests docs/qa package.json package-lock.json
git commit -m "chore: complete production QA"
```
