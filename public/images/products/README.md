# Product image assets

`round-nfc-white.webp`, `round-nfc-black.webp`, `stand-blue.webp` and
`card-white-qr.webp` are stills of the Spline scenes they belong to, rendered
from the same camera the viewer starts on. They fill the product frame while
the 3D runtime loads, so the frame is never blank and never resizes.

Regenerate them with:

    node scripts/render-product-stills.mjs            # every product
    node scripts/render-product-stills.mjs stand-blue # one product

Run it after adding a product to `src/content/de.ts` and after re-exporting a
scene. A still that no longer matches its scene makes the hand-over to 3D
visibly jump, and a missing one fails the content test.

`review-cards.png` and `review-stands.png` are photographs of the physical
products and are unrelated to the Spline scenes.
