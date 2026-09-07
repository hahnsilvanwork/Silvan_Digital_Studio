# falkenried

A fictional portfolio demo, maintained as part of SILVAN Digital Studio. Forms demonstrate interactions without sending data. This source folder has its own package.json and package-lock.json; no separate Git checkout is needed.

From this folder: npm ci, then npm run build. From the repository root: npm run demos:build builds all four demos and npm run demos:sync publishes their generated files under public/demos.

See [demo operations](../../docs/DEMO-OPERATIONS.md) and [the root README](../../README.md) for verification and deployment. Never edit generated out/ or dist/ files.
