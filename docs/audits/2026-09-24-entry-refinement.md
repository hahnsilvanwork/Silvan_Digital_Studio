# Entry refinement — 24 September 2026

Owner request: bring page topics under the Google visibility and automation titles, simplify the homepage opening, and make the NFC animation stage fit the site's clean white/navy design.

Implemented:
- Presence and Automation topic navigation is inside the heading column with 32px desktop spacing; all anchors retained. Primary CTA follows text width; duplicate price link removed because the topic navigation provides it.
- Homepage opening retains original headline, service description and real portfolio preview. Compact 48px primary action, quiet work link, smaller personal byline and calmer spacing. Removed redundant opening phone row; actual contact options elsewhere remain.
- NFC stage uses cool neutral background, fine border and restrained navy device treatment. Removed duplicate decorative topline, refined caption/pause button. All five product scenes and motion controls retained. NFC secondary action is a plain underlined link.

Validation:
- Production build and TypeScript successful; 28 existing page/motion tests passed; scoped ESLint passed.
- 24 DE/EN views at390/768/1440: no horizontal overflow or page errors; topic alignment measured on desktop.
- Eight representative axe WCAG2A/AA and2.1AA checks: no automated violations. Four mobile WebKit routes passed.
- Pause/resume, reduced motion and all topic anchors checked.
- Independent review of eight mobile/desktop screenshots: ship, no must-fix findings. DESIGN.md appended without replacing existing notes.

Deployment: dpl_6BWe6RLNWYceCkH1gMrsVWsDgUuY
Immutable URL: https://silvan-digital-studio-aude336x9-silvan1.vercel.app
Rollback: dpl_81THMCD7tJTRR1Q9Qz11bqTPnbHg
Public verification to be recorded once READY.

Existing unrelated working-tree changes preserved. Earlier title-weight adjustment remains included in the working source.
Production READY and aliased to silvandigital.ch. Repeated all24 DE/EN views,8 axe checks and4 mobile WebKit views against public production: passed.

## Owner follow-up: English title, direct phone and topic alignment
English homepage headline uses a smaller desktop size and two deliberate sentence lines; narrow layouts still wrap naturally. Restored a discreet direct telephone link below the personal byline. Presence/Automation use a single topic nav after the summary in DOM/mobile order; desktop grid places it in the left column with its bottom aligned to the contact button. Production build passed;24 DE/EN views at390/768/1024/1440 verified two-line desktop English heading, telephone destination, desktop bottom alignment within2px and mobile nav below button.
Deployment: dpl_6JGbBjeoUoeXQdNaipNaGR1vjVgR; https://silvan-digital-studio-4w10qvig1-silvan1.vercel.app

## Visible alignment correction
Replaced topic-link font underlines with explicit text-span rules. On desktop, links align these visible rules to the contact button bottom (previous checks only aligned the larger invisible link hitboxes). Homepage columns now stretch together and finish with phone/caption text on the same baseline; phone returns to the main left grid edge. Mobile reading order retained.
Verification:24 DE/EN views at390/768/1024/1440 passed overflow checks; measured visible topic rule edges and homepage footer text bottoms within1.5px at desktop widths. Desktop screenshots reviewed. Production build passed.
Deployment dpl_GXtG9iwRC1aSajBzFiVbYKuSG8aE; https://silvan-digital-studio-4veqc8nh6-silvan1.vercel.app
