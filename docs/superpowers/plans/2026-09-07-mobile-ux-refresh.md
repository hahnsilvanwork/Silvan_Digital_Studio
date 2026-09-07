# Mobile UX refresh

Goal: Make SILVAN's services easier to understand and navigate, especially on phones. Local preview only; the user reviews before deployment.

Architecture: Keep Next.js, typed German/English content and CSS modules. Extend the existing visual system, without adding runtime dependencies.

Design direction: Swiss editorial typography with purposeful pale blue, mint and sand surfaces. Preserve the blue primary action and use darker ink for readable body copy. Alternatives considered: a purely monochrome polish would not address the requested separation; a dark, animation-heavy showcase would make the small-business offer harder to scan.

Research:
- https://www.nngroup.com/articles/homepage-design-principles/ : explain the offer and provide clear starting points.
- https://www.nngroup.com/articles/visual-hierarchy-ux-definition/ : use scale, contrast and grouping to guide attention.
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html : minimum target size and spacing. Aim for 44px controls here.
- https://stripe.com/payments : inspiration for separating product benefits and product visuals.
- https://linear.app/ : inspiration for disciplined typography and grouping, adapted to a local independent studio.

Tasks:
- [x] Fix the home services link to reach all four services.
- [x] Add distinct service surfaces and section backgrounds; improve price-tier grouping and form readability.
- [x] Make the mobile menu visibly labelled while preserving its accessible name and focus handling.
- [x] Replace the 3D Unicode arrow with SVG and explicit label layout; keep lazy 3D loading and fallback.
- [x] Remove prose em/en dashes in German and English; retain meaningful Swiss price notation and numerical ranges.
- [x] Shorten the studio introduction and clarify offer terminology without inventing business claims.
- [x] Verify mobile layouts, language switching, navigation, catalogue/dialog and enquiry flows. Run typecheck, lint, unit tests and production build.

Verification: 256 unit tests passed. Chromium and emulated mobile Safari: 63 E2E tests passed, 7 intentionally skipped for browser/device applicability. Ten routes checked at 320, 390, 768, 1024, 1280 and 1536px without horizontal page overflow. Screenshots inspected for home, websites and the mobile 3D button. Spline E2E uses a stub to test lifecycle and geometry; this does not certify GPU rendering on physical phones. No real enquiry sent. Local dev server remains on port 3000.

Initial findings: The 3D button's text is present in the current local render at 390px; the diagonal Unicode arrow can vary by platform. The reported text disappearance has not been reproduced. The home secondary CTA incorrectly points only to /websites. Existing mobile navigation exposes only a hamburger visually. Repeated sections have very similar backgrounds. Preserve the pre-existing next-env.d.ts change.
