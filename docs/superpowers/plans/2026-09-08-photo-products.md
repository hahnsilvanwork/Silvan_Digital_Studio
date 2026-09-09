# Photo product import and local 3D viewer

User authorized implementation in the existing project and delegated design decisions. Preserve existing uncommitted work. No deployment is included in this change.

## Design
Build 22 standard products from 24 reference images. Match by number plus platform because 022 names two distinct products. Replace four matching Google catalogue entries, retain unmatched older entries. Google, Tripadvisor, social media, WhatsApp/contact, menu and custom remain distinct applications. A product's application does not imply personalization.

Create reusable GLB assets using rounded extruded card/plate geometry and bent stand geometry. Map the original photographs using calibrated UV coordinates; do not regenerate printed artwork or QR codes. The supplied PNG bytes remain unchanged. Use actual supplied reverse artwork for 001 and 007, neutral colour otherwise. The partially hidden protective liner in 018–023 is not a full reverse artwork; use a neutral back and document this. Stand dimensions visible in references: width 76 mm, height 127.5 mm, footprint 50 mm. Other model dimensions and material thickness are visualization assumptions, not verified manufacturing dimensions.

Load locally bundled Three.js only on explicit 3D activation, with mouse/touch orbit and zoom, keyboard controls and reset/front/back buttons. Keep existing Spline fallback support for older scenes. Export self-contained GLBs and render consistent catalogue thumbnails from these models. Keep generator and mapping manifest for later additions.

## Implementation and checks
- [x] Inventory and calibrate all photographs; preserve original source files.
- [x] Generate GLBs and manifest; verify every source is accounted for and models parse.
- [x] Integrate localized catalogue, categories and inquiry presets with regression tests.
- [x] Implement viewer with disposal, failure fallback, keyboard and mobile support.
- [x] Render all product thumbnails, visually inspect cards/stands/front/back.
- [x] Run unit tests, typecheck, lint, production build and browser journeys.
- [x] Document assumptions and regeneration commands for the next batch.
