# Project concept visuals

The four concept visuals are imported by `scripts/import-mockup-assets.ps1` from the
supplied Stitch mockups. Each file is pinned by byte length and SHA-256 in the
importer and in `tests/unit/design-contract.test.ts`.

## File names describe the picture, not the project

`architecture-practice.jpg`, `objects-shop.jpg`, `studio-mobile.jpg` and
`apparel-store.jpg` are named after what they show. They were once named after the
projects that used them, and the two drifted apart: the file called `archa.jpg` held
a furniture shop while Archa's copy described an architecture practice, so the one
page meant to prove design ability showed a picture that contradicted its own text.

Naming by content makes that mismatch visible in the diff. `image:` in
`src/content/projects.ts` decides which project uses which picture — when a concept
is reassigned, change that field, and check the copy still describes the picture.

## Intrinsic resolution

All four files are 512×279 pixels. That is well below a full-bleed editorial crop,
so the design system never upscales them:

- `.projectMedia > :is(img, picture)` caps the rendered width at `min(100%, 32rem)`,
  which keeps every asset at or below its intrinsic width on all target viewports.
- `object-fit: contain` shows the whole composition instead of cropping it.
- `object-position` is set per project through `--project-media-object-position`, so
  each concept can be nudged inside its frame without a new crop.

## Replacing a concept with real client work

Replace the file, then update the pinned byte length and SHA-256 in both the importer
and the design contract test. Raise the `32rem` cap only once the replacement asset is
genuinely wider than 512 pixels.
