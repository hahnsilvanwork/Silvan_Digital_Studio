# salon-lumiere

A fictional portfolio demo, maintained as part of SILVAN Digital Studio. Forms demonstrate interactions without sending data. This source folder has its own package.json and package-lock.json; no separate Git checkout is needed.

From this folder: npm ci, then npm run build. From the repository root: npm run demos:build builds all four demos and npm run demos:sync publishes their generated files under public/demos.

See [demo operations](../../docs/DEMO-OPERATIONS.md) and [the root README](../../README.md) for verification and deployment. Never edit generated out/ or dist/ files.

## Refinement released 24 September 2026

The four pages retain the warm salon identity, with earlier service/pricing access, open service rows, honest concept/team descriptions, labelled navigation and a complete local appointment preview. All twelve services and prices are preserved. Date/time choices respect example opening hours and the maximum stated service duration, without claiming real availability. Review, edit and clear remain entirely in memory; forms are disabled before hydration and without JavaScript.

From this folder: `npm run lint`, `node --test tests/*.test.mjs`, `npm run build`.
From the repository root after building: `node scripts/prepare-vercel-demos.mjs salon`, start `node scripts/serve-vercel-demos.mjs`, then `node demos/salon-lumiere/tests/browser-check.mjs`. The browser check requires the root Playwright/axe dependencies and writes local evidence under `artifacts/salon-2026-09-24/`. `SALON_URL` selects another host; `SALON_LIVE=1` performs the shorter live sweep; `SALON_SCREENSHOTS=0` skips image captures.

Next link prefetch is deliberately disabled: this static export requests missing flattened segment-prefetch files otherwise. Normal client navigation and direct loads are covered by browser tests. Native selects use paint containment to prevent WebKit's enlarged option labels contributing invisible document overflow at 200% text.

Published at https://silvan-demo-salon-lumiere.vercel.app. See [release and verification](../../docs/audits/2026-09-24-salon-release.md). Portfolio screenshots are intentionally updated only after all four demos have been revised.
