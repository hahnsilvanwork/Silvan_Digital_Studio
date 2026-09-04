# NFC Asset Refresh and Mobile Usability Design

## Objective

Replace the three corrected NFC product images, normalize the local source-asset names, and make the `/reviews` product journey substantially shorter and clearer on phones without weakening desktop presentation, accessibility, SEO, or the on-demand 3D performance model.

## Corrected image assignment

The new square, opaque 1254 × 1254 PNGs replace these active sources:

| New upload | Product | Stable public derivative |
| --- | --- | --- |
| `new_menu_black_square.png` | Standard Menu, square black | `menu-square-black.webp` |
| `new_white_blue_card_square.png` | Standard Google Review Card, blue/white square | `review-square-blue.webp` |
| `new_white_ständer.png` | Standard Google Review Stand, white | `review-stand-white.webp` |

The public WebP paths remain stable, so localized content, image URLs, browser caches, and product IDs require no migration. The importer regenerates metadata-free WebP files from the corrected sources.

## Source asset organization

Active full-resolution PNG sources move from the repository root into the local `assets/nfc-products/source/` directory. All ten use lowercase kebab-case names beginning with `nfc-`:

- `nfc-product-range-overview.png`
- `nfc-booking-custom-square-blue.png`
- `nfc-google-review-round-black.png`
- `nfc-google-review-round-white.png`
- `nfc-google-review-square-blue.png`
- `nfc-google-review-stand-white.png`
- `nfc-google-review-personalized-round-black.png`
- `nfc-menu-round-black.png`
- `nfc-menu-square-black.png`
- `nfc-menu-personalized-round-white.png`

The three superseded originals move to the ignored, recoverable `.superpowers/replaced-nfc-assets/` folder. The source directory remains local and ignored like other full-resolution photography; optimized WebP derivatives remain the committed website assets. The importer and its contract test use the normalized relative paths.

## Mobile product journey

The current one-column phone layout stacks five Google Review cards and makes the first catalogue/pricing section about 4,688 px tall. Product imagery is readable, but comparison requires excessive vertical scrolling.

Below 44 rem, the product cards become a horizontal scroll-snap rail:

- one card occupies approximately 88% of the available width;
- a visible part of the following card communicates that the row can be swiped;
- previous and next buttons provide an explicit non-gesture alternative;
- a live localized position label communicates `1 von 5` / `1 of 5`;
- changing category resets the rail to its first product;
- keyboard, button, touch, and trackpad interaction all operate the same card sequence;
- product names, prices, descriptions, details, and 3D actions remain visible and indexable.

At 44 rem and above, the existing two-column grid returns. At 72 rem it remains a three-column grid. The desktop information density and visual hierarchy are preserved.

The carousel controls are absent when a category contains only one product. Disabled boundary buttons remain visible for multi-product categories so direction and position are always understandable. Scroll events update the position label without moving focus.

## Mobile visual refinements

- The hero keeps the copy → CTA → image order and still shows all essential content within the first phone viewport at 390 × 844.
- Phone hero spacing and image maximum size become slightly tighter at narrow widths while preserving the square media frame.
- The three hero indicators become labelled image-selection buttons. A compact pause/resume control gives visitors control over the 5.5-second automatic sequence, and manual selection pauses automatic advancement.
- Catalogue controls remain a visible two-column layout with the third category spanning the row.
- Product cards in the rail use consistent image proportions and equal-height composition, aligned to the tallest item in the active category.
- The four price tiers remain a vertical reading sequence on narrow phones because a 2 × 2 layout would make the names and included details cramped. Spacing between tiers is reduced only enough to remove dead space.
- Touch controls remain at least 44 CSS pixels.
- No information becomes hover-only, and no product is removed from the DOM merely to shorten the page.

## Component architecture

`ProductCatalog` continues to own active-category and selected-3D-product state. It additionally owns a rail element ref and active product index. Category changes reset both index and scroll position. Previous/next actions calculate the target card from the active category and use the rail's own horizontal scroll position, avoiding vertical page jumps.

`ProductCard` receives stable product-index data attributes used only for rail positioning and tests. `Product3DDialog` and `SplineProduct` are unchanged: 3D still loads only after deliberate activation.

Localized review content adds concise labels for previous product, next product, and the product-position announcement. German and English remain structurally identical.

## Accessibility and reduced motion

- The rail has a localized accessible label and each arrow has a descriptive localized name.
- The position announcement uses `aria-live="polite"`.
- Arrow disabled states reflect the first and last product.
- Native horizontal scrolling remains available even if JavaScript enhancement fails.
- Programmatic rail movement uses instant scrolling under reduced motion and smooth scrolling otherwise.
- Existing focus restoration, dialog lifecycle, and 3D reduced-motion behavior remain intact.
- The 3D dialog contains touch overscroll so gestures cannot scroll the obscured page behind it.

## Performance

- New PNGs are never served directly.
- WebP derivatives are resized to at most 1600 × 1600, stripped of EXIF/ICC/XMP metadata, and encoded with the existing quality settings.
- The rail adds no library and does not cause Spline or scene prefetching.
- Below-the-fold Next.js images retain lazy loading and responsive `sizes` tuned for the narrower mobile card.
- Stable public filenames avoid unnecessary code and content churn.

## Verification

- Importer tests assert all normalized source-to-output mappings and derivative properties.
- Image hashes or pixel checks confirm the three public derivatives actually changed.
- Unit tests cover category reset, previous/next boundaries, position labels, and unchanged on-demand 3D behavior.
- Playwright checks 320, 390, 768, 1024, 1280, and 1536 px widths for overflow, visible controls, touch-target size, rail advancement, and desktop grid behavior.
- Visual screenshots cover the 390 px hero, catalogue, pricing transition, and the desktop catalogue.
- Full unit tests, typecheck, lint, production build, and the relevant cross-browser suite must pass.

## Out of scope

- Changing product prices, product names, public routes, or 3D scenes.
- Redesigning unrelated pages or global navigation.
- Deploying before local review.
