# Homepage and navigation — October 9, 2026

## Follow-up: larger welcome screen

Owner rejected the compact screenshot. Desktop hero now has a viewport-relative minimum height, larger 40–64px heading (up to three lines), 16–18px benefit text, more generous spacing and centred columns. The services follow below the welcome screen. Mobile height remains content-driven. This supersedes the compact dimensions recorded below. Production build passed; layout detector returned no findings. Browser matrix assertions now check the new welcome-screen requirement.

Implemented locally from the owner's pasted ten-point brief. No production deployment.

## Changes

- Exact German headline, introduction, four benefit lines and secondary CTA; natural English equivalents.
- Shared header/content/hero outer grid. At 1440px the navy hero is about 100px shorter than the inspected live baseline; services begin around y=708, rather than y=813. Desktop headline stays within two lines.
- Original Spurwerk screenshots and concept labels retained. Personal about-page link moved below the preview in quiet text.
- Updated desktop, drawer and footer navigation: examples and prices, requested service order/labels. Existing destinations preserved. Prices uses /#prices or /en#prices.
- New simple price overview reads existing service prices, including CHF 300, CHF 249, chip CHF 15 and card CHF 29 entry prices, plus automation on request. Website domain, hosting and agreed maintenance costs explicitly separate; no invented recurring amount.
- Existing navigation and homepage tests updated to the new authorized wording, order and second price presentation.

## Verification

- Inspected live homepage and screenshot before implementation.
- 70 existing navigation, locale and page tests pass.
- TypeScript and scoped ESLint pass.
- Production Next.js build passes: 40 static pages generated. The initial sandboxed build could not fetch Geist; retry with network access succeeded.
- 28 responsive browser checks pass against the production build: Chromium and WebKit, DE/EN, widths 320/390/768/1024/1280/1440/1920. The development version also passed this matrix.
- Checked four benefits, two-line desktop title, matching hero/header bounds, desktop service-section visibility, no horizontal overflow, drawer versus desktop navigation, dropdown Escape behavior, drawer closure, price destination below sticky header and no page errors.
- Both language price links verified from /websites, plus 14 retained destination responses (contact, work, about and four services in DE/EN) returning HTTP 200.
- Visually inspected desktop, mobile, tablet and mobile price screenshots. These are browser simulations, not a test with an actual restaurant owner or physical devices.

Evidence: artifacts/home-before-20261009.png and artifacts/home-20261009/. Reproduce browser matrix with scripts/check-home-20261009.mjs (HOME_CHECK_URL can select the local production server).
