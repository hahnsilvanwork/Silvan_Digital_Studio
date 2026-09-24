# Café Vogel release — 24 September 2026

Third demo in the sequence. All four routes refined while retaining cream/espresso colours, Playfair/EB Garamond typography and existing photography. New readable logo/header, stronger hero alignment, coordinated spacing, menu category navigation, consistent CHF prices, honest concept story and no fabricated family history or reviews. Local reservation flow now validates Zurich dates/times (including elapsed same-day slots), has complete review/edit/reset states and remains disabled without hydration. It sends nothing and stores no form data.

## Verification

- Production static build and ESLint passed.
- Node data/validation tests 6/6, including menu consistency, timezone boundaries, invalid/oversized fields, weekends/holidays and elapsed slots. Node emits a module-type detection warning for directly imported TypeScript; tests pass.
- Chromium/WebKit 46/46: four routes at320/390/768/1440, axe WCAG A/AA, image loading, overflow, navigation/resize,22 menu items/category anchors, weekday/weekend/holiday slot boundaries/reset, full reservation review/edit/clear/privacy,200% text,no-JS and runtime errors.
- Source images:7069277 bytes; three delivered WebP alternatives:483818 bytes (~93% reduction). Original JPEGs retained as source assets. Dimensions and alt text supplied; no new image provenance claims.
- SilvanDigital work/contact/privacy destinations each return HTTP200.
- Local captures/reports: artifacts/cafe-2026-09-24/ (ignored QA evidence).

## Publication

Project: silvan1/silvan-demo-cafe-vogel.
Public domain: https://silvan-demo-cafe-vogel.vercel.app/
Previous production / rollback: dpl_T4vdzDiUDiKwkRBLuGdEL5AAssgp
Previous immutable URL: https://silvan-demo-cafe-vogel-o2wsmiizc-silvan1.vercel.app

Main-site screenshots remain deferred. Next demo after the user's instruction: Falkenried. Only once that release is complete, refresh all four main-site portfolio screenshots.

## Final result

Independent finish reviewer: SHIP, no material fixes. Minor notes: some mobile CHF labels wrap, logo tracking slightly tighter than guideline, native scrollbars; no release blockers.
Production deployment: dpl_9ZeofF5k48Qbct4xhQAW7dkvCAWJ
Immutable URL: https://silvan-demo-cafe-vogel-mk6tbjyrp-silvan1.vercel.app
Live verification:15/15 browser checks passed across all four routes at390/1440, navigation, menu anchors, reservation slots/review/edit/reset,200% text,no-JS and runtime. HTTP200, noindex/nofollow, CSP and icon/hero image verified. No other demo or main-site deployment.
