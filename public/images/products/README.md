# Product images

catalog/ contains the active NFC product photography and hero images. Regenerate these derivatives with node scripts/import-nfc-assets.mjs when the locally archived source PNGs are available.

round-nfc-black.webp, round-nfc-white.webp, stand-blue.webp and card-stand-white.webp are the stills used while the four Spline scenes load. node scripts/render-product-stills.mjs reads the current scene URLs and fallback filenames from src/content/de.ts; optional arguments select a fallback basename. Rendering accesses the external Spline runtime.

Retired composite PNGs and unused fallback stills have been archived locally.
