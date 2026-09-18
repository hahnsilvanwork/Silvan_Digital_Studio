# Alignment and divider cleanup

The owner identified remaining visual misalignment and redundant rules after the functional mobile review. This pass addresses the structural causes rather than treating passing functionality tests as visual approval.

## Changes

- Shared equal-column homepage grid, 48px desktop gap and top alignment; removed independent offer indentation and variable 5:7, 4:8 and 2:3 column splits.
- Full mobile image edges, consistent section spacing, updated responsive image sizes, compact 4:3 homepage portrait.
- Website-service headline, intro and actions grouped before the image on phones and beside it on desktop. Removed viewport-height spacers and vertically centred disconnected summaries.
- Removed homepage section/step borders, automatic consecutive-section rules, redundant header borders, persistent secondary-action underlines, and outer FAQ/service-directory rules. Interior item separators remain where useful.
- Consecutive white sections share spacing rather than accumulating padding on both sides of a separator.
- Removed staggered portfolio rows. About image and text share equal top-aligned desktop columns.
- Matched text insets and chevron positions in highlighted and ordinary contact rows; removed redundant top/bottom rules.

## Verification

Rendered mobile website hero, homepage hero, portrait/biography, FAQ/contact transition, and desktop image/text pairs inspected. Verified real shared column coordinates, not only absence of overflow. Added regression checks for common desktop axes, full-width mobile imagery, service-action-before-image order and equal contact-label insets.

445 unit tests passed. The scoped browser run passed 42 tests in Chromium/mobile WebKit; the expanded quality suite passed 24 (46 distinct cases across these runs). The final desktop website-column specificity correction passed its targeted two-browser check against the final rebuilt output. Production build/TypeScript, ESLint, diff whitespace checks and layout detector passed. No physical-device test or live deployment is claimed.

Local preview remains at http://localhost:3117. The previous Vercel authentication limitation is unchanged.
