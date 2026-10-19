# NFC introduction — compact grouping after owner screenshot

The owner rejected the deployed opening at 1423 × 764 because the stretched left column separated prices from actions by approximately 200px. The screenshot takes precedence over the earlier shared-bottom alignment review. The owner explicitly requests correction and another production deployment.

## Change

The existing `/reviews` and `/en/reviews` introduction keeps its full-width title and two equal desktop columns. The explanation, price and actions now form a natural stack, with 24px between price and actions. Both content groups start together, but their heights remain independent. Desktop H1 is capped at 48px and the explanatory paragraph uses 20px with 1.55 leading. The film retains its complete 16:9 frame and a natural caption row with a 44px minimum playback control.

The supplied twice-speed 19-second film, poster, original video, copy, catalogue, prices and enquiry behavior are unchanged. No new page is introduced. Stacked mobile/tablet media still fills the shared content width.

## Local evidence

- Production Next.js build and static-output hardening passed.
- Scoped ESLint and the one bounded Impeccable layout detector pass passed; detector returned no findings.
- 108 scoped Playwright tests passed across Chromium, WebKit and mobile Safari, covering DE/EN layout, playback and fallback states, product pricing and enquiry selection.
- Final screenshots cover DE/EN at 390, 806, 1024, 1423 × 764 and 1440px, plus DE/EN full pages at 390 and 1440px. All 14 files were opened and validated by the parent.
- Evidence and geometry: `.impeccable/review/nfc-compact-intro/`.

## Independent verdict and production

The fresh review starts from the owner's rejected screenshot. `verdict-review.md` scores all five material fixes resolved, disposition **ship** at the scored-fix scope. This verdict does not imply whole-site approval. It confirms compact grouping, independent media height, introductory hierarchy, secondary playback treatment and required responsive evidence.

The documenter superseded the rejected bottom-alignment guidance in the scoped October 1 sections of PRODUCT/DESIGN and the NFC surface brief/sidecar. The sidecar validates as schema version 2. No application edits followed the final review.

Production deployment `dpl_5vRxQtb7idwXaLPMHccTvDVetaG7`, created October 1 at 15:28:30 Europe/Zurich, is **READY**. Vercel inspection confirms aliases `https://silvandigital.ch` and `https://www.silvandigital.ch`; deployment URL is `https://silvan-digital-studio-j5yh02jqc-silvan1.vercel.app`. The normal production build rebuilt/synced all four demos and passed the main production build/type checks and static-output hardening.

Live verification against `https://silvandigital.ch` passed:

- 30 retained routes return HTTP 200; both withdrawn NFC 2 routes return 404 and remain absent from the sitemap.
- The served film bytes match the local film SHA256 `0244ad585c453a514c5141f3c76286613c540ae5923a776945df9cf223a45bb7` (3,280,704 bytes), with a real 19-second playback duration.
- 14 DE/EN browser flows: Chromium at 390, 806, 1024, 1423 and 1440px; WebKit at 390 and 1440px. Verified playback progress, pause/resume and retained manual pause, compact price/actions, complete 16:9 media, shared edges, no horizontal overflow and no browser errors.
- Model selection opens the enquiry; quantity 3 gives CHF 100. No enquiry was submitted.
- Fresh live proof/report: `.tmp/nfc-compact-intro/live/`. Parent opened the 1423 × 764 desktop proof and the 390px phone proof. The existing in-app browser NFC tab was refreshed to the published version.

Local tests, the limited independent five-fix verdict, production READY and live checks are separate evidence. No whole-website visual audit is asserted.
