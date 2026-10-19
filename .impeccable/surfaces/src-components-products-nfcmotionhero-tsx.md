# Existing NFC page — supplied card film

Scope: the existing `/reviews` and `/en/reviews` page. NFC 2 is withdrawn. Keep the approved page, navigation, catalogue, prices and enquiry. The owner's latest homepage screenshot is the visual authority for a balanced two-column introduction, superseding the preceding full-width-title compositions. Publication is explicitly authorised and production is READY. This brief records the visual correction; live release evidence is in docs/audits/2026-10-01-nfc-home-reference.md.

THESIS: The real card film demonstrates the product in the existing NFC introduction.

OWN-WORLD: Preserve SILVAN navy, Geist, white page, approved spacing and shared gutters. The supplied film brings its own stone and gold.

STORY: Understand the product, see the card, then use the existing models, prices and enquiry.

FIRST VIEWPORT: The complete approved title, introduction and actions belong to the left desktop column. Title top and action bottom align precisely with film-stage top and bottom. Price information and film caption/control occupy a shared lower metadata row with aligned vertical centers. Below 1200px, visual order is title, intro, price, actions, full shared-width film.

FORM: Preserve the existing page outside the hero. At 1200px, two equal columns use subgrid with 48px between columns and 16px between upper and metadata rows. Title scales from 40–60px; intro scales from 17–20px/1.55. Upper text spacing is 20px, with only residual space before actions flexing. The stage grows with taller text when necessary; contain fitting preserves the complete film with neutral letterboxing. Mobile typography, sequence-specific pacing, 12-second silent loop, pause control and poster fallback remain unchanged.

FINISH: Close the independent review, record the implementation and media provenance, then verify the authorised production release.

## Implemented surface

The desktop breakpoint is 75rem / 1200px. Two equal columns share two rows through subgrid, with a 1rem (16px) row gap and 3rem (48px) column gap. The complete H1, introduction and actions form the upper left group; the film stage occupies the upper right. Title top equals stage top and action bottom equals stage bottom. The H1 uses a fluid 40–60px scale and introductory copy 17–20px/1.55. The upper group has 1.25rem (20px) gaps, with an automatic margin before the actions absorbing only residual row space. The existing price note is centered in the lower metadata row alongside the caption and playback control.

The upper row responds to actual content. Where the full title and intro need more height, the stage grows and contain fitting keeps the entire original 16:9 source visible with modest neutral letterboxing. Below 1200px, visual order remains title, intro, price, actions, then full shared-width film, with unchanged mobile typography. The phone viewport can end within the media without cropping the media itself. The homepage-reference contract supersedes prior NFC topology contracts, without changing the catalogue or inquiry structure.

The supplied film is retimed by sequence with smooth speed ramps: H.264, 1280 × 720, 24fps, 456 frames, exactly 19 seconds and 3,280,704 bytes. Its matched first-frame WebP poster is 1280 × 720 and 44,980 bytes. Silent inline playback loops while visible and the tab is active. Pause/resume is labelled in DE/EN, has a visible keyboard focus state and a minimum 44px touch target. The caption/control shares the desktop metadata row with prices and stays secondary to sales actions. User pause persists across offscreen and hidden-tab suspension. Reduced motion and data saving retain the poster without downloading video; no JavaScript and failed video also retain it.

## Documentation and review

The October 1 NFC entry in `DESIGN.md` and `src-components-products-nfcmotionhero-tsx.design.json` document this local correction without replacing the global identity. Three UI source changes implement it: `ReviewsPage.tsx` groups the H1 with intro/actions and separates price metadata; `nfc-page.module.css` and `nfc-motion.module.css` implement the shared upper/metadata rows and adaptive complete-film stage. Existing DE/EN copy, the variably paced 12-second film, poster, models, prices and inquiry behavior remain unchanged.

Fresh independent correction review: `.impeccable/review/nfc-home-reference/verdict-review.md`, disposition **ship for the bounded DE/EN hero correction**, all four material fixes resolved. The reviewer opened all 16 captures: DE/EN at 320/390/1024/1200/1280/1440/1516/1600px. Paired geometry confirms identical title/stage top and action/stage bottom anchors, aligned metadata centers, complete media and no overflow. Parent validation reports build/types, hardening/scoped ESLint, detector `[]` and an asset-provenance scan with zero missing assets passing. The initial 108 scoped browser checks produced 107 passes and one WebKit early-click catalogue failure; the test now waits for network idle before the button click, and the single failed case passed three consecutive reruns. The earlier film review and media provenance remain in `.impeccable/review/nfc-video/`. Production is READY and all 16 live browser flows passed; release evidence is recorded separately in docs/audits/2026-10-01-nfc-home-reference.md. This local verdict does not assert whole-site approval.

October 1 follow-up: the accepted layout now uses a sequence-paced 12-second film (288 frames, 2,795,619 bytes). READY deployment dpl_FjQfrj2js5nRsmt7bxFqNR4ZSJuq is live at https://silvandigital.ch. All 16 Chromium/WebKit DE/EN live flows passed, including exact duration, playback, pause/resume, alignment, no overflow and enquiry; 30 retained routes return 200. See docs/audits/2026-10-01-nfc-video-pacing.md for the separate timing-change evidence.


## October 1 — quieter animation controls
Owner-approved follow-up: the NFC film has a 16px pause/play SVG in a 44px touch target, inset 8px at the bottom right of the video. The control has DE/EN accessible names, a tooltip and keyboard focus; caption and hero alignment remain unchanged. The homepage signature has no playback controls, plays once on view, pauses offscreen and resumes unfinished playback when visible. Reduced-motion/data-saving and error posters remain. This supersedes earlier below-film and homepage pause/replay descriptions. Evidence: docs/audits/2026-10-01-motion-controls.md.
