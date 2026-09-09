# SILVAN Digital Studio

Bilingual portfolio and NFC product catalogue for Silvan Hahn. Main website: **https://silvandigital.ch**. Repository: https://github.com/hahnsilvanwork/Silvan_Digital_Studio.

## Start locally

Requires Node.js **22.12 or newer** (Node 24 is used on Vercel).

```bash
npm ci
# Copy .env.example to .env.local and review its settings.
npm run dev
```

The website runs at http://localhost:3000. Before opening bundled demos on a fresh checkout, run `npm run demos:build && npm run demos:sync`.

## Repository map

| Directory | Responsibility |
| --- | --- |
| `src/app` | German/English routes, layouts and generated SEO endpoints |
| `src/features/pages` | Complete page compositions |
| `src/components` | Shared UI and its component styles |
| `src/content` | Typed German/English copy, products and project definitions |
| `src/lib` | Validation, inquiry messages, routing and optional measurement |
| `src/styles` | Global layout and motion styles |
| `demos/` | Four independent demo applications, each with its own lockfile |
| `public/images/` | Only active, web-ready portfolio/product/portrait assets |
| `scripts/` | Repeatable build, image capture, publication and verification tools |
| `tests/` | Unit tests and browser journeys |
| `docs/` | Operating guides, audits and historical design decisions |
| `.github/workflows/` | Quality checks, dependency audits and availability monitoring |

Generated `public/demos/`, demo `out/` or `dist/`, `.next/`, `node_modules/`, local archives and test artifacts are ignored. Do not edit or commit generated exports. The four demo source trees are ordinary folders in this repository, not nested Git repositories or submodules.

## Build and check

| Command | Purpose |
| --- | --- |
| `npm run build` | Build all demos, regenerate bundled exports, then build the main website |
| `npm run viewer:build` | Generate the sandboxed 3D viewer for local development |
| `npm run check:viewer` | Verify all four real models and sandbox/CSP isolation against a production server |
| `npm run backup:source` | Snapshot current source outside the project and verify recovery by SHA-256 |
| `npm run start` | Serve the production build |
| `npm run demos:install` | Install all demo dependencies from their lockfiles |
| `npm run demos:build` | Build each demo; installs missing dependencies on a clean checkout |
| `npm run demos:sync` | Generate bundled `/demos/...` files from verified exports |
| `npm run demos:prepare-vercel` | Generate independent demo deployment packages |
| `npm run lint` | Main ESLint checks; demos have separate checks |
| `npm run typecheck` | Main TypeScript checks (run `npx next typegen` first on a clean checkout) |
| `npm test` | Unit tests |
| `npm run test:e2e` | Four-browser production journeys, including the build |
| `npm run check:availability` | Live main/demo status, headings, JavaScript and real 404 |

Run `npm ci` again after changing the main lockfile and `npm run demos:install` after changing demo lockfiles. The source/export/hosting map is maintained once in `scripts/demos.config.mjs`.

## Configuration and deployment

Only `.env.example` is committed. Local `.env*` files and Vercel credentials remain private.

- Production origin: `NEXT_PUBLIC_SITE_URL=https://silvandigital.ch`.
- Vercel supplies `VERCEL_ENV`; previews remain noindex even if the production origin is accidentally present.
- Optional measurement defaults to `NEXT_PUBLIC_MEASUREMENT_ENABLED=false`. Enable only after checking the Vercel account configuration and payloads described in the operating guide.
- Main Vercel project: `silvan-digital-studio`, scope `silvan1`. Its normal `npm run build` also generates the demos from source.
- Main deployment: `npx vercel deploy --prod --yes --project silvan-digital-studio --scope silvan1`.
- Standalone demo URLs and release instructions: [demo operations](docs/DEMO-OPERATIONS.md).

The application has no customer database or message-sending backend. NFC inquiries remain in the browser until the visitor opens the selected contact channel. Demo forms are fictional previews and do not send data. Customer testimonials and results must be real and approved.

## Images and languages

Project images are selected by locale in `src/content/projects.ts`. `npm run demos:screenshots` captures the demos with a 1440 x 1000 CSS viewport at 2x density, producing 2880 x 2000 WebP files. Set `DEMO_BASE_URL` to the running main website origin (default: http://localhost:3110).

Images for the German portfolio end in `-retina.webp`; those for the English portfolio end in `-retina-en.webp`. Falkenried has a real English route. Café, Steiner Bau and Salon screenshots show their actual German demos in both portfolio languages. The capture does not inject a translation. Optional project IDs limit regeneration, e.g. `npm run demos:screenshots -- steiner-handwerk`. Only the current portfolio language's image is rendered, with responsive sizes and quality 90.

Original photos and retired assets are local archival material, not deployment inputs. NFC source PNGs remain under the ignored `assets/nfc-products/source/`; `node scripts/import-nfc-assets.mjs` regenerates their web derivatives when the originals are available.

## Further documentation

- [Detailed legal/business dossier and contract drafts](docs/legal/README.md)
- [Security implementation and remaining external actions](docs/SECURITY-UMSETZUNG-2026-09-07.md)

- [Documentation index](docs/README.md)
- [Operations, privacy-safe measurement, CSP rollout and recovery](docs/OPERATIONS.md)
- [Demo build and publication](docs/DEMO-OPERATIONS.md)
- [Repository cleanup and validation](docs/REPOSITORY-CLEANUP-2026-09-07.md)
- [Design direction](DESIGN.md) and [product context](PRODUCT.md)
