# NFC compact cards — local review

Implemented white nfc-001-google and black nfc-033-google as NFC-Kompaktkarte / Compact NFC card: CHF 29 for one, CHF 40 for two, CHF 15 per additional card. Standard cards retain their existing pricing. Five pricing tiers; inquiry model selection, quantity calculation, and generated inquiry summaries share these rates.

The seven starter models now contain the white menu design instead of the blue booking design. Both remain available in their application/category groups. The custom category includes all fully custom examples first, with an explanation that clients may choose their own design or have Silvan create it.

## Image generation

Used the built-in image generator (no fallback). Original white photo: `NFC Cards/001 product.png`. Saved black photograph: `NFC Cards/033 product.png`. Saved black reverse: `NFC Cards/033-blackcard google review-back.png`. Public photo: `public/images/products/main/nfc-033-google-3a9b58da008b.png`. Photo-based 3D model: `public/models/nfc/nfc-033-google.glb`; thumbnail: `public/images/products/nfc/nfc-033-google.png`.

Front prompt: Edit this exact product photograph to create the BLACK colour variant of the same thin rectangular NFC Google review card. Preserve the exact composition, front-facing camera, rectangular shape with rounded corners, dimensions/proportions, card position, grey-white studio background, floor, shadows and lighting. Change ONLY the white card body to matte black/charcoal; change the existing black text and line-art on the card to white for legibility. Keep the multicoloured Google G logo and all five gold stars unchanged in colour. Preserve exact artwork and text positions and exact wording: 'review us', 'on Google', 'NFC', 'Tap your phone'. No extra text, no stand, no mockup framing, no other objects. Square product photo. The entire card must be visible with same margins as the reference. This is a sibling product colour variant.

Reverse prompt: Create the matching BLACK colour variant of this exact flat rectangular Google review card BACK artwork for a 3D product model. Keep the original portrait aspect ratio, straight-on flat view, the entire card visible, card position, rounded corners, and all layout. Change the card body from white to matte black and the black words 'review us' and 'on Google' to white. Keep the Google logo colours and five gold stars. IMPORTANT keep the original QR code black on a WHITE square panel, do not invert it; preserve its existing pattern and position as closely as possible. Retain a small pale neutral outside margin just like the original. Do not add any objects, perspective, hands, text or stand. This is the back face of the same rectangular card, a product design visualisation.

Reverse correction prompt: Retouch this exact flat black Google review card artwork. Remove ALL irregular pure-black patches or transparent holes from the card surface, especially on both sides of the Google logo and both bottom corners. Make the entire card body a smooth consistent opaque matte charcoal black (#171717), with subtle uniform lighting only. Preserve EXACT composition, image dimensions, card bounds, all text, multicoloured logo, five stars and black-on-white QR panel. Preserve thin rounded border. Outside the card use opaque light neutral grey. No transparency anywhere in the image. No blotches, no stains, no dark islands. Same straight-on view and layout.

Generated artwork is a product visualisation; the pictured QR is not a production-configured customer destination.

## Validation

Full unit suite: 454 tests passed. Lint passed. New compact card and existing selection/pricing browser coverage: 12 tests passed across German/English and mobile/desktop. Final image correction rebuilt the GLB and thumbnail. Subsequent locale/model unit checks: 53 passed. Production build including TypeScript passed. No deployment or push; review locally before publication.
