# Demo publishing and security verification

The four demos are published on their existing Vercel domains. Their source is now tracked in the main repository under `demos/`; build output is generated, never edited or committed.

## Build and publication

Run `npm ci` and `npm run build` inside each demo before publication:

- `demos/steiner-handwerk`
- `demos/cafe-vogel`
- `demos/salon-lumiere`
- `demos/falkenried`

The three Next exports use Next 16.3.4 and explicit webpack builds. Falkenried resolves Astro 7.3.1. Salon now uses the ESLint CLI and a local flat config; its date display preserves hydration safety and its menu closes when the route changes. Salon lint passes with one existing advisory for the intentionally eager static hero image.

At the portfolio root, run `node scripts/sync-demos.mjs`, then `node scripts/prepare-vercel-demos.mjs`. Both use the same checked file list from `publicationFiles()` in the sync script. Every generated HTML, CSS, JS, JSON, text, XML and SVG file is scanned before omitting unreferenced JPEGs. MP4s, source maps and hidden files remain excluded. After successful copying, stale destination files are removed so old chunks and retired images cannot survive repeated publication. Source files are never deleted.

Two publication formats remain intentional: `/demos/<slug>/` preserves portfolio/legacy links, while standalone packages in `.scratch/vercel-demos/<slug>` support the existing separate demo domains. Standalone URLs have the prefix removed and explicit portfolio links point back to silvandigital.ch. Deploy both formats from the same verified build; do not independently edit exports.

## Evidence and checks

- `audits/demo-dependencies-2026-09-07.json`: zero npm audit findings in all four complete dependency trees, including development dependencies.
- All four production exports built successfully; Next builds include TypeScript checks.
- Falkenried: 35/35 Node source/data tests pass. Outdated real-business, embed, form delivery and layout expectations now assert the existing fictional demonstration contract. The visible fictional partner spelling was corrected to Talblick Mobilitaet (with the German umlaut in the source).
- `../artifacts/demo-polish/standalone-verification.json`: 56 mobile route checks, including framework error pages; 55 unique internal link destinations, loaded images, visible H1, no overflow and no JavaScript exceptions.
- `audits/demo-publication-2026-09-07.json`: matching manifests for both formats, 2,244 prefixed HTML references checked, menu open/Escape and local demo-form interaction checks.
- Reproduce the browser sweep with `node scripts/serve-vercel-demos.mjs` (ports 3200-3203), `node scripts/verify-standalone-demos.mjs`, and `node scripts/verify-demo-publication.mjs` from the portfolio root.

Six obsolete Steiner JPEGs totaling 24,899,329 bytes and two Salon JPEGs totaling 104,020 bytes are omitted from each publication format. Unused original images and video are archived locally under `.scratch/archive/cleanup-2026-09-07/` and are no longer part of the source public directories. Published Steiner is approximately 2.1 MiB after cleanup.

These local checks do not verify live deployments, delivery services, real devices, or future npm advisories. Re-run audits and checks for each release. The forms are demonstration-only and the browser checks send no messages.
