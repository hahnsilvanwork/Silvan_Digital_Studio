# Assessment B — technical audit, 8 September 2026

Implementation integrity verdict: **Pass with isolated gaps.** The source expresses a coherent, product-specific bilingual studio website: the NFC catalogue hands actual model selections to an enquiry configurator; schema prices mirror the offers; work samples are labelled concepts; navigation, typography, spacing and focus treatment share a system. The deterministic Impeccable source scan ran **once**, returned `[]` (zero findings), and is preserved in `detector.json`. This is not proof of accessibility or visual quality. There were no detector findings to confirm or dismiss.

## Provisional technical score

| Dimension | Score /4 | Evidence |
|---|---:|---|
| Accessibility | 3 | Labels, focus handling, native dialogs and disclosure controls are strong; select Enter is incorrectly intercepted. No WCAG certification claimed. |
| Performance | 3 | Optimised responsive images and dynamic, on-demand local 3D rendering; no current field Core Web Vitals or throttled lab measurement. |
| Responsive design | 3 | Fluid tokens, mobile catalogue/select controls, 44px global targets; parent independently found no desktop overflow across 30 routes. Mobile results belong to parent assessment. |
| Theming | 3 | Intentional light-only neutral system, with isolated hard-coded local 3D colours. Dark mode is not a requirement and is not penalised. |
| Implementation integrity | 3 | Coherent system, clean detector; public selection lost on locale switch and English 404 falls back to German. |
| **Total** | **15/20 — Good** | Address the isolated interaction/i18n gaps. Scores describe observed evidence, not automated conformance. |

## Scope and limits

Read source for shared layouts, navigation, mobile menu, motion, SEO, privacy telemetry, URL validation, bilingual routes, catalogue, inquiry configurator, native 3D dialog, sandboxed Spline integration and local Three.js stage. No AGENTS.md found in the main source/workspace search excluding node_modules, worktrees and demos. Parent owns session context and independent visual review. Existing production server at localhost:3100 was reused; no build, server shutdown or application-source change performed. Scratch scripts/reports/logs are the only authored files. Existing dirty workspace changes were preserved.

HTTP parsed all 30 main DE/EN routes, plus two missing routes, robots and sitemap; result is `http-audit.json`. Native browser checked DE inquiry select keyboard behaviour, model preset selection, then locale switch. Parent independently verified desktop routes, local 3D open/Escape/return-focus and inquiry summary. No outgoing enquiry was sent. Browser API is read-only for script evaluation, so no detector overlay was injected; CLI and source/DOM evidence were used. Native screen-reader use, forced-colours, 200–400% text zoom, all Safari/Firefox implementations, low-memory GPU failure and third-party service availability were not certified.

## Prioritised findings

### B1 — [P2] Enter on a native select submits the inquiry

- **Location:** `src/components/reviews/ReviewInquiryConfigurator.tsx:147`, especially 153–156; form binding at 239.
- **Category:** Accessibility / interaction integrity.
- **Reproduction:** On DE `/reviews`, focus the destination select, close its popup with Escape, press Enter. Browser returned six validation errors while the select remained collapsed. The form handles every Enter except textarea/button, calls preventDefault and submit; SELECT is not excluded.
- **Impact:** Keyboard visitors expecting Enter to open a select instead see premature errors; on a completed form it can unexpectedly advance to summary. Space or arrow selection offers a workaround, so this is not a total keyboard blocker and no categorical WCAG failure is asserted.
- **Recommendation:** Exclude SELECT and native interactive control behaviours from the custom implicit-submit handler; restrict interception to intended text-input cases. Preserve the existing no-native-GET privacy behaviour. Verify Enter/Space/arrows and completed-form select interactions.
- **Suggested command:** `$impeccable harden`.

### B2 — [P2] Language switch discards public catalogue/model selection

- **Location:** `src/features/pages/ReviewsPage.tsx:35` supplies only the static route; `src/components/ui/LanguageSwitcher.tsx:38` builds href from that value.
- **Category:** Implementation integrity / bilingual flow.
- **Reproduction:** Select Google Reviews round black; URL becomes `/reviews?category=reviews&model=review-round-black#inquiry` and fields are preset. English link remains `/en/reviews`. Clicking it removes the public identifiers, selected model and anchor, returning to an empty inquiry. Parent independently reproduced this too.
- **Impact:** Visitors changing language while exploring an item must locate and select it again.
- **Recommendation:** Preserve an allowlisted category/model and the relevant anchor in locale links. Keep personal field data out of URLs; this finding does not request persistence of private draft values or reversal of the site's declared clear-on-leave policy.
- **Suggested command:** `$impeccable harden`.

### B3 — [P2] Unknown English routes render a German recovery page

- **Location:** `src/app/global-not-found.tsx:44–45` hard-codes DE document and page. Source comments explicitly acknowledge the limitation.
- **Reproduction:** GET `/en/missing-audit-route` returns 404, `lang=de`, German title and “Diese Seite wurde nicht gefunden.” Same response content as unprefixed missing route.
- **Impact:** English visitors following a stale/mistyped URL face German recovery labels and German navigation. The document lang accurately matches the German copy, so this is an i18n/recovery issue, not a wrong-language-attribute WCAG claim.
- **Recommendation:** Resolve English misses into a complete English recovery document without nesting root HTML or sacrificing HTTP 404/noindex. This may require routing/root-layout changes; verify both arbitrary missing URLs and missing project slugs.
- **Suggested command:** `$impeccable harden`.

### B4 — [P3] Inactive hero slides remain in the accessibility tree

- **Location:** `src/components/products/ProductHero.tsx:64–66`; `src/components/products/products.module.css` heroImage opacity rules.
- **Category:** Accessibility polish.
- **Evidence:** DE and EN browser accessibility snapshots enumerate all three hero images simultaneously although one is active. Opacity controls visibility without removing inactive images from the accessibility tree.
- **Impact:** Assistive-technology readers encounter image descriptions that are not currently shown; the active-position affordance requires extra interpretation. Images are informative and only three exist, so severity is low.
- **Recommendation:** Hide inactive slides from assistive technology, retaining accurate alt text on the active image and the working labelled/pause controls. Do not introduce noisy automatic live announcements.
- **Suggested command:** `$impeccable harden`.

### B5 — [P3] Local 3D presentation bypasses shared colour tokens

- **Location:** `src/components/products/local-product.module.css:4–8`, `src/components/products/local-product-stage.ts:11`, `src/components/products/products.module.css:297` and 440.
- **Category:** Theming maintainability.
- **Evidence:** Viewer focus, controls and background use literal hex colours, including repeated #f0efec in CSS and WebGL.
- **Impact:** Future palette changes can leave the product viewer and the surrounding still-image surfaces out of step. No present contrast or dark-mode defect is asserted.
- **Recommendation:** Define a product-stage surface/control token family and pass its resolved surface colour into the renderer; retain purposeful lighting/material colours.
- **Suggested command:** `$impeccable document`, then `$impeccable polish`.

Counts: **0 P0, 0 P1, 3 P2, 2 P3**. Broadly low-risk polish; B1–B3 are the useful next changes.

## Verification results

- `npm run lint`: exit 0; log `lint.log`.
- `npm run typecheck`: exit 0; log `typecheck.log`.
- `npm test`: exit 1; 29 files passed, 1 failed; **343 passed /344 tests**. `builds WhatsApp only after a valid personalized-menu inquiry` at `tests/unit/review-inquiry.test.tsx:159` exceeded 5000ms while lint/typecheck/test ran concurrently. `unit-tests.log` preserves full result.
- Focused recheck `npx vitest run tests/unit/review-inquiry.test.tsx`: exit 0; **15/15 passed**, affected test 2160ms. `unit-inquiry-recheck.log`. Consistent with contention, not proof of deterministic full-suite stability. The full suite was not represented as passing.
- Unit stderr reports Next image quality 90 missing in test configuration. Verified false positive for the shipped configuration: `next.config.ts` explicitly defines `qualities: [75, 90]`. Tests do not initialise that runtime configuration; actual image routes were not diagnosed as broken.
- `npm audit --omit=dev --json`: exit 0, **zero reported production dependency vulnerabilities** at audit time; `dependency-audit.json`. Not a penetration test, and dev dependencies excluded.
- All **30 main routes** HTTP 200; correct DE/EN HTML language, one H1 each, title and description, zero `<img>` without alt, absolute production canonicals/DE/EN/x-default alternates; all 30 have a meta CSP. Both `/hello` versions explicitly noindex/follow. Both missing probes return real 404 and noindex; English-language fallback issue B3.
- robots.txt and sitemap.xml HTTP 200. Site's build uses canonical `https://silvandigital.ch`; the scan inspected local built output, not the deployed public site's configuration.

## Positive findings and false-positive exclusions

- Native `<dialog>` is labelled, supports Escape/backdrop/close and has explicit load/failure/retry states. Return focus is implemented in ProductCatalog; parent observed it working. Local renderer has labelled keyboard controls, no continuous animation loop, bounded pixel ratio, restricted same-origin model paths, timeout/abort, resize handling and GPU/resource disposal.
- Optional Spline viewer uses an opaque-origin sandbox without allow-same-origin, validates event origin/source/protocol, suppresses referrers and has a 30-second fallback. CSP, frame protections, permissions restrictions, attribute-script prohibition and escaped JSON-LD are present. No exploit confirmed.
- Inquiry is client-memory only, encodes handoff text, avoids native GET of fields, validates quantity/length/HTTPS and relevant Google hostnames, exposes optional status, describes errors, focuses first error, allows summary review/edit and email/copy alternatives.
- Telemetry removes query/hash, allowlists paths/events and excludes enquiry field values from the event payloads. No private credentials or .env content was read for this audit.
- Global minimum controls are 44px, focus rings have inner/outer layers; mobile menu traps keyboard focus, marks content inert, locks body scroll, Escape closes and restores trigger focus. Native details/summary handle FAQs.
- The global reduced-motion rule uses 0.01ms, but **do not report it as an observed failure solely from syntax**: intentional static reveal/underline/media states also exist, carousel stops for reduced motion, and explicit local 3D is on demand. No lost feedback or blocked interaction was verified.
- Images use Next sizing/format optimisation, initial hero fetch priority, lazy loading for later content, intrinsic/aspect layout reservation. Local Three.js is dynamically imported only when requested. No real-user CWV performance claim can be made from these code patterns alone.
- Single light theme is intentional (`color-scheme: light`); missing dark mode is not a defect. Minor product-stage token drift is isolated, not a site-wide failure.

## Recommended order

1. `$impeccable harden`: B1 native keyboard behaviour, B2 allowlisted public locale state and B3 English recovery. Include B4 while touching hero semantics if desired.
2. `$impeccable document`: consolidate the small 3D token boundary B5 without changing the palette.
3. `$impeccable polish`: verify the final changed interactions and responsive/error states in one bounded confirmation pass.

No fixes made. Re-run `$impeccable audit` after approved fixes if a refreshed score is desired.
