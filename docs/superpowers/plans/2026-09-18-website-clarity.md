# Website clarity and enquiry improvements

> Execution: subagent-driven-development for the isolated NFC change, main agent for the integrated homepage/navigation/contact changes; independent final review.

**Goal:** Implement the approved website comparison recommendations thoroughly in German and English, preserving the established visual identity, routes, prices and truthful claims.

**Architecture:** Existing Next.js server page compositions and typed content remain. Prioritize website services in the homepage narrative. Improve existing client inquiry components rather than add an external message backend or new dependencies.

**Authorization:** User approved the preceding critique and asked for autonomous implementation while away. Webdesign is the main offer; retain the calm editorial design. No further design interview is necessary. Do not invent testimonials, results, response-time promises, or an unconfigured domain mailbox.

## Design

Homepage sequence: concrete website headline and developer identity; featured concept with explicit problem/implementation/demo evidence; selected work; three-step collaboration; compact supporting services; personal introduction; short questions; clear enquiry. Website offer/prices and optional products remain findable. Primary contact button gets visual priority. Use a native supporting-services disclosure on desktop and group secondary services visibly in mobile navigation and footer.

## Tasks

- [x] Homepage: src/features/pages/HomePage.tsx, src/components/home/editorial-home.module.css and a focused bilingual src/content/home-copy.ts. Add concrete copy, honest concept case evidence using implemented demos, process and FAQ. Reuse accessible FAQ component. Keep all route destinations and images.
- [x] Navigation: Navigation.tsx, MobileMenu.tsx, nav-links.ts and navigation.module.css. Desktop website/work/about/contact priority, secondary services reachable through a named services entry and mobile grouping. Preserve active states, Escape/focus return and 44px targets. Update meaningful navigation regression tests before structural change.
- [x] Contact: ContactActions.tsx, ContactInquiry.tsx, content/contact-copy.ts, ServicePage.tsx. Preserve service context in closing CTAs; carry guidance into draft; emphasize one direct channel, offer a small optional local brief with copy fallback rather than invent an unconfigured form backend. Test draft parity and selected tier retention first.
- [x] NFC: isolated implementer owns inquiry draft restoration and ReviewsPage hero priority. Save bounded, validated session draft without personal/contact fields, restore safely without overriding explicit model selection or language transfer. Add regression tests for reload/remount, stale/malformed storage, unavailable storage, and locale handoff. Lead with model choice.
- [x] Verification: focused red/green regressions, complete unit suite, lint, typecheck, production build. Browser desktop/mobile DE/EN and keyboard/contact/NFC paths, bounded visual pass then one correction pass. Existing E2E checks where compatible; no actual message submission. Run detector once over changed UI after completion.
- [x] Independent review, document tested outcomes, retain a local git commit and prepare/release only the verified build according to existing deployment workflow.

## Scope decisions

Keep current warm-paper/graphite visual language, self-hosted font and real project screenshots. Real customer proof needs user assets; instead show functional concept demos and factual implementation choices. Keep current working email. Winno is a reference, not an editing target. No fabricated SEO/performance guarantees. No recurring automation or artificial two-hour delay.

## Delivered and verified — 18 September 2026

All six implementation tasks above are complete locally. The desktop supporting-service entry uses a native details disclosure (keyboard, Escape, outside-click and focus-leave handling); mobile shows a separate supporting-service group. Contact project text stays in memory and has a selectable fallback when clipboard access fails. Privacy copy describes the NFC session storage and existing language transfer accurately.

Validation on the final production build:

- `npm run lint` and `npm run typecheck`: passed.
- `npx vitest run --maxWorkers=4`: 48 files, 445 tests passed.
- Full `npm run build`: passed, including the four unchanged demo exports. After final copy/CSS corrections, main `next build` passed again (40 pages), followed by `harden-static-output.mjs` (97 static documents).
- Chromium and mobile Safari E2E: 69 passed, 7 intentional device-specific skips across navigation, contact, clarity improvements, language, inquiry handoff, configurator and mobile resilience suites. No pending test failures. An initial WebKit process launch failure passed on the single-worker rerun. Backdrop regression now clicks its exposed area at 600px; phone menus intentionally fill the screen. The landscape test follows the newly grouped final destination (automation).
- New real-browser regressions verify safe NFC reload restoration and personal-field exclusion, reset, contact draft parity/copy fallback, and 320px DE/EN overflow/header fit.
- Visual desktop and 320/390px checks: hierarchy, navigation, contact and bilingual content confirmed. Temporary browser viewport reset.
- Impeccable detector over `src`: `[]` (no reported findings).
- Independent implementation source review found no P1/P2 issues; its mobile grouping, translated service labels and featured-demo proof suggestions were addressed.

Production preview runs locally at http://localhost:3117. No message was sent through any contact channel. No backend or new dependency was introduced.

Deployment is pending authentication: Vercel CLI reports no credentials on this machine. Its interactive login was cancelled while the owner was away. Nothing was pushed or published. After the owner signs in with `npx vercel login`, use the existing project's deployment workflow; do not create a replacement hosting project. Branch: `codex/website-clarity-2026-09-18`.
