# Steiner Bau release — 24 September 2026

## Outcome

Second of four demo sites completed and published: https://silvan-demo-steiner.vercel.app/

Replaced the dark orange/sidebar design with limestone, forest green and sage, broad Barlow typography, horizontal navigation, larger room imagery and a new brand favicon. Four service rows explain scope. Four explicitly illustrative project ideas provide expandable planning questions and carry service/project context into the enquiry. Added a transparent process and FAQ. Contact is local-only with accessible validation, review, edit and clear; no network submission or persistent storage. Main-site portfolio screenshots remain deferred until all four demos are done.

## Verification

- Production static build passed (Next warns about multiple workspace lockfiles; existing monorepo configuration, no build failure).
- ESLint passed; validator tests 3/3.
- Chromium and WebKit: 22/22 checks across 320, 390, 768, 1024 and 1440 px, WCAG A/AA axe checks, images/anchors, menus and resize, all service/project selections, form lifecycle, 200% body text, runtime errors and disabled no-JS form.
- Independent finish reviewer disposition SHIP: no material fixes. Minor observations: slightly tight heading tracking, glyph arrows and repeated demo explanations; no usability defects in captures.
- Production: 8/8 browser checks, HTTP 200, icon 200, noindex/nofollow and security headers verified. SilvanDigital contact/work destinations both return 200.
- Screenshots and reports: artifacts/steiner-2026-09-24/ (ignored local QA evidence).

## Deployment / rollback

Project: silvan1/silvan-demo-steiner. Prepared only handwerk with scripts/prepare-vercel-demos.mjs; linked and deployed static output.

Current: dpl_5pwWx5qwCkP5skQQFzQuvPfCz5YM
Deployment: https://silvan-demo-steiner-89kdlwgk5-silvan1.vercel.app
Previous production: dpl_CumKEmr6JzNtb1NREb4RmtfR711M
Previous URL: https://silvan-demo-steiner-6pe0iovts-silvan1.vercel.app

No main-site deployment, no screenshot refresh, no other demo modified. Pause now. On the next user instruction continue with Café Vogel, then Falkenried. Refresh the four portfolio screenshots only after both are complete.
