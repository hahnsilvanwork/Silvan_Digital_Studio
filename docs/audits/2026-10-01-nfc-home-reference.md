# NFC hero — homepage reference alignment

The owner rejected the previous full-width NFC headline and supplied the homepage as the explicit visual reference: two coherent columns, including matching heights. The request explicitly authorises production deployment.

## Implementation

- Complete original title moves inside the left column, above explanation and actions. The right film starts at the heading's top edge and ends at the actions' bottom edge.
- Price information occupies the left metadata row; the caption and playback control occupy the corresponding right row. Two shared subgrid rows give these meaningful content anchors the same height.
- Equal columns with 48px gap begin at 1200px. The long heading uses a fluid 40–60px desktop scale; introductory copy is 17–20px with 1.55 leading. Title-to-copy spacing stays 20px; only residual space before actions flexes.
- Below 1200px, the visual sequence remains title, explanation, price, actions, film. Existing shared gutters and mobile sizing remain.
- The complete 19-second film keeps contain fitting. When desktop text requires a slightly taller frame, small neutral letterboxing preserves the source instead of cutting it off. No media asset, factual copy, price, catalogue or enquiry logic changed.

## Local verification

Production build/type checks, static-output hardening, scoped ESLint and the bounded layout detector passed. Detector returned `[]`. Media provenance scan reports one raster and zero missing origins.

The scoped browser run covered 108 checks in Chromium, WebKit and mobile Safari: 107 passed initially. One WebKit English catalogue-expansion check clicked server-rendered HTML before the client handler was ready. The reduced-motion test now waits for client scripts to load; the failed case passed three consecutive isolated reruns. No application behavior was changed for that test timing issue.

All 16 final DE/EN production-build captures at 320, 390, 1024, 1200, 1280, 1440, 1516 and 1600px were opened by the parent and the fresh independent reviewer. Every measured desktop heading/stage top and action/stage bottom delta is zero; metadata vertical-center deltas are below 0.01px. No horizontal overflow. Evidence: `.impeccable/review/nfc-home-reference/`.

The reviewer scored all four original fixes resolved, disposition **SHIP for the bounded NFC hero correction**, against the owner's homepage image. This is not a whole-site audit. The source and canonical documentation supersede the previous full-width-title contracts.

## Production

Deployment `dpl_C7HCaX5ngbmtUFCFWzqweoHnY3gW`, created October 1 at 15:51:22 Europe/Zurich, is **READY**. Vercel inspection confirms `https://silvandigital.ch` and `https://www.silvandigital.ch` aliases. Deployment URL: `https://silvan-digital-studio-hz6f0k14b-silvan1.vercel.app`. The standard production build rebuilt/synced all four demos and passed the main website build/type checks and hardening.

The documenter refreshed the scoped October 1 PRODUCT/DESIGN guidance and NFC surface brief/schema-2 sidecar. The existing in-app NFC browser tab was refreshed to the new production version.

All 16 live DE/EN browser flows passed on `https://silvandigital.ch`: Chromium at 390, 1024, 1200, 1440 and 1516px; WebKit at 390, 1200 and 1516px. Checked shared desktop top/bottom anchors and metadata centers, mobile column edges, no overflow, actual video progression/duration, pause/resume/manual pause persistence, model-linked enquiry and quantity pricing (3 pieces: CHF 100). No enquiry was submitted. No browser errors occurred.

Thirty retained routes return 200; the two withdrawn NFC 2 routes return 404 and remain absent from the sitemap. The live 3,280,704-byte film matches the local SHA256 `0244ad585c453a514c5141f3c76286613c540ae5923a776945df9cf223a45bb7`.

Fresh live screenshots and report: `.tmp/nfc-home-reference/live/`. The parent opened the 1516px desktop and 390px phone captures. The 1516px live image is the final user-facing proof. READY, independent visual verdict and live functional checks are recorded as separate evidence.
