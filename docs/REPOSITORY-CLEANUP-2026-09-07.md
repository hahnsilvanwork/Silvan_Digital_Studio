# Repository cleanup — 2026-09-07

The main application remains under `src/`. The four demo applications now have complete, ordinary source directories under `demos/`, each with its own package manifest and lockfile. They are not submodules or nested repositories.

## Changes

- Centralized demo source, export, project and local-port settings in `scripts/demos.config.mjs`.
- Made the production build generate all four demo exports from source before building the main website. Generated exports and dependency/build caches are ignored by Git.
- Updated CI paths, publication scripts, operating guides and the root README for this structure.
- Removed unused prototype layouts, legacy images, obsolete import scripts and dead styles from the active tree. Kept the eight current bilingual retina screenshots.
- Preserved retired files and original demo repositories, including their Git histories, locally under `.scratch/archive/cleanup-2026-09-07/`. This archive is deliberately excluded from Git and deployment.
- Kept local environment files, Vercel metadata, original NFC source PNGs, test reports and worktrees out of Git. Generated `next-env.d.ts` is no longer tracked.
- Retained the preceding website improvements, including product-card alignment, inquiry form layout and validation, bilingual project images, accessibility and security changes.

## Validation

- Main ESLint and TypeScript checks passed.
- Main unit suite: 285 passed.
- Production browser suite: 198 passed, 18 skipped, no failures.
- All four demo applications installed from lockfiles and built successfully.
- Standalone demo verification: 56 mobile routes and 55 link destinations passed.
- Bundled demo publication verification passed.
- `npm audit` reported zero known vulnerabilities for the main application and each of the four demos.

Detailed machine-generated logs stay locally in `artifacts/cleanup-*`. Historical audit reports remain in `docs/audits/`. An audit result records the dependency state at the time of checking, not a permanent security guarantee.

## Working with the cleaned repository

Use `npm ci` for the main application. `npm run build` installs missing demo dependencies, builds their exports and then builds the main website. After a demo lockfile changes, run `npm run demos:install` to refresh existing local demo dependencies. See [demo operations](DEMO-OPERATIONS.md) for standalone deployment and [the README](../README.md) for the directory map.
