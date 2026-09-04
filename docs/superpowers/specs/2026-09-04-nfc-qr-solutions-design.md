# NFC & QR Solutions Page Design

## Objective

Transform the existing bilingual Google Reviews page into one broader NFC and QR solutions page. The page must present Google Review, digital menu, booking/reservation, and custom-use cards clearly while removing automatic 3D initialization from the normal page load. Visitors see optimized product photography first and load exactly one 3D model only after choosing to do so.

The visible German name is **NFC & QR Lösungen** and the English name is **NFC & QR Solutions**. The existing `/reviews` and `/en/reviews` routes remain unchanged so current links, indexing, and bookmarks continue to work. Navigation, page metadata, headings, and on-page copy adopt the broader name.

## Approved User Journey

The page follows this order:

1. Hero with a concise broad value proposition, primary enquiry CTA, and a three-image sequence.
2. Guided product catalogue with category controls for Google Reviews, Menu, and Custom Solutions.
3. A generalized explanation: touch the card, the configured destination opens, and the guest completes the intended action.
4. Use-case inspiration covering booking/reservations, guest Wi-Fi, and digital contact/business cards.
5. Updated enquiry configurator that collects only fields relevant to the selected use case.
6. Process, pricing and compatibility FAQs, then direct contact.

The design principle is: understand first, compare second, configure third. Product names, prices, sizes, and benefits never depend on the 3D experience.

## Hero

The hero remains a balanced copy-and-visual composition on desktop and a clear vertical sequence on mobile. It no longer contains a Spline viewer.

The visual rotates through these three approved source images in this order:

1. `Google Review Circle Black.png` — a standard Google Review card.
2. `All Card Types.png` — an overview of the range.
3. `Menu selfe designed white circle.png` — a personalized menu example.

The sequence crossfades approximately every 5.5 seconds. The first image receives loading priority; later images load without blocking initial rendering. The sequence pauses when the document is hidden and stops on the first image under `prefers-reduced-motion: reduce`. No carousel library is added. Compact position indicators communicate that the visual changes, but the hero contains no unnecessary next/previous controls because all products are available in the catalogue below.

The German hero communicates that one tap can open the right action and names Google Reviews, digital menus, booking/reservations, and custom solutions. English mirrors the meaning rather than translating mechanically.

## Product Catalogue

The approved structure is a guided catalogue with three category controls:

- **Google Reviews**
- **Menü / Menu**
- **Individuell / Custom Solutions**

The controls are real buttons with selected state, at least 44 px touch targets, keyboard operation, and an accessible group label. Every product card shows a product photograph, short product name, price, available form and size, a concise customization description, and either an active 3D action or a calm availability note.

Category changes do not fetch data. All localized catalogue metadata ships with the page, while below-the-fold images use appropriate responsive sizes and lazy loading. The selected category is page-local UI state and does not change the route.

### Image assignment

Optimized, metadata-stripped derivatives of the supplied source files are committed under `public/images/products/catalog/`. The original root-level images remain source material and are not served directly.

| Source image | Catalogue role | 3D behavior |
| --- | --- | --- |
| `Google Review Circle Black.png` | Standard Google Review Card, round black | Opens matching black round scene |
| `Google Review Circle White.png` | Standard Google Review Card, round white | Opens matching white round scene |
| `Google Review Square Blue.png` | Standard Google Review display, blue square | Opens matching blue display scene |
| `Google review stand white.png` | Standard Google Review Stand, white | Opens matching white stand scene |
| `google selfe designed black circle.png` | Personalized Google Review example | Shows `3D-Modell folgt` because the print does not match an existing scene |
| `Menu Circle Black.png` | Standard Menu Card, round black | Shows `3D-Modell folgt` |
| `Menu Square Black.png` | Standard Menu Card, square black | Shows `3D-Modell folgt` |
| `Menu selfe designed white circle.png` | Personalized Menu Card, round white | Shows `3D-Modell folgt` |
| `Bookiing selve designed blue square.png` | Fully customized booking/reservation example | Shows `3D-Modell folgt` |
| `All Card Types.png` | Hero overview only | No 3D action |

The three menu products are the requested placeholders for future menu scenes. Their product cards are complete and purchasable; only their 3D action is unavailable. Adding their future scene URLs changes data only, not layout or component behavior.

## Product Definitions and Pricing

Card prices apply to both Google Review and menu destinations unless stated otherwise.

| Product | Price | Included presentation |
| --- | ---: | --- |
| Standard Card | CHF 49.– | Fixed black standard design; round or square |
| Two Standard Cards | CHF 80.– | Two standard cards; published bundle price |
| Standard Stand | CHF 69.– | Standard stand only; no personalization at present |
| Personalized Card | CHF 69.– | Existing design plus customer logo and/or company name |
| Fully Customized Card | CHF 99.– | Complete design in the customer's corporate identity |

Cards are available as round or square products in 80 × 80 mm and 100 × 100 mm. Shape and size do not change the listed price. Orders of multiple products receive a quantity discount. Only the two-standard-card CHF 80 bundle has a public fixed discount; personalized, fully customized, stand, and larger-quantity discounts are quoted on enquiry.

Fully Customized Cards may open Google Reviews, a digital menu, hotel booking, restaurant reservation, guest Wi-Fi access, a digital business/contact card, or another agreed destination. These are use cases of the same custom product, not separate price products.

## Optional 3D Dialog

The catalogue page loads no Spline runtime, scene file, WebGL context, or canvas. Existing page-level Spline preconnects and automatic scene provider behavior are removed from the route.

An active **In 3D ansehen / View in 3D** button opens an accessible modal dialog for the selected product. Only then does the client dynamically initialize the existing Spline product viewer with that product's scene URL. Only one modal and one scene can exist at any time.

The dialog contains:

- the selected product name;
- a prominent close control;
- a stable, reserved 3D stage using the matching still while the scene loads;
- a short interaction hint for mouse or touch;
- an inline loading state and a recoverable error state.

The native dialog interaction model, or an equivalent correctly tested implementation, must trap focus, support Escape, prevent background interaction, and return focus to the button that opened it. Closing the dialog unmounts the Spline component and removes its viewer and WebGL canvas entirely. Switching products requires closing or replacing the sole active dialog; hidden background scenes are never retained or prefetched.

Under reduced motion, the 3D viewer may still open after the visitor's explicit action, but automatic turntable motion remains disabled. The product can be rotated manually. If runtime or scene loading fails, the photograph stays visible and the dialog offers one clear retry action plus close.

Products without an exact scene do not render a disabled fake button. They show non-interactive text such as **3D-Modell folgt / 3D model coming soon** in the same metadata area.

## Component and Data Architecture

The implementation uses focused units with explicit responsibilities:

- A localized catalogue data type owns stable ID, category, design tier, price label, shape and size metadata, use-case text, image metadata, and an optional scene URL.
- `ProductHero` owns the three-image sequence, document-visibility pause, and reduced-motion behavior. It knows nothing about Spline.
- `ProductCatalog` owns selected-category state and renders semantic category controls and product cards.
- `ProductCard` renders the static, indexable product information and reports a request to view one optional scene.
- `Product3DDialog` owns dialog lifecycle, focus restoration, the matching static still, lazy viewer creation, error/retry state, and complete cleanup.
- The existing `SplineProduct` and scene-control helpers remain responsible for the actual viewer once requested, but no longer initialize during ordinary page rendering.
- `ReviewsPage` remains the server-rendered page composer and supplies localized data to the client islands.

The former `ProductShowcase` automatic-page-viewer pattern is removed from this route. It may be simplified or retired if no other route consumes it, but unrelated reusable Spline control behavior is not rewritten without need.

## Enquiry Configurator

The current Review Card configurator becomes an NFC and QR solutions configurator. It keeps the existing WhatsApp handoff and clear non-binding notice.

The form collects:

- destination/use case: Google Review, menu, booking/reservation, guest Wi-Fi, digital contact card, or another destination;
- product: standard card, two standard cards, standard stand, personalized card, or fully customized card;
- form: round or square when the selected product is a card;
- size: 80 × 80 mm or 100 × 100 mm when the selected product is a card;
- quantity;
- business and contact-person details;
- destination link or a note that the destination still needs setup;
- optional design/color notes.

Conditional validation prevents irrelevant requirements. A Google Business Profile link is required only when Google Review is selected. A URL field remains validated when supplied for any use case. Shape and size are not requested for the standard stand. The generated bilingual WhatsApp message includes all selected details and states that pricing for additional quantity discounts is confirmed personally.

## Content Changes

The current Google-only process becomes destination-neutral:

1. **Berühren / Tap** — the guest touches the card or stand with a phone.
2. **Öffnen / Open** — the configured page or action opens directly.
3. **Handeln / Act** — the guest reviews, reads, books, connects, or saves contact details.

The product section explains the three design levels before individual examples. The use-case section demonstrates range without inventing separate products or prices. FAQ content covers NFC and QR compatibility, included programming/setup, Google policy integrity, supported destinations, custom design, card sizes, and quantity discounts.

## Performance Requirements

- Normal page load makes no request to `cdn.spline.design` or `prod.spline.design`.
- Normal page DOM contains no `spline-viewer`, canvas, or WebGL context.
- Exactly one scene URL is requested after an active 3D button is selected.
- Closing the dialog removes the viewer and canvas rather than hiding them.
- No scene-prefetch loop runs when one scene becomes ready.
- Product photos use optimized WebP derivatives, meaningful dimensions, responsive `sizes`, and lazy loading below the fold.
- The first hero image may load eagerly; later hero images must not compete with the initial page's essential resources.
- A fixed media aspect ratio prevents layout shift across hero, catalogue, loading, and error states.
- The implementation adds no carousel, dialog, or 3D dependency.

## Responsive and Accessible Behavior

- Mobile is the primary composition from 320 px upward.
- Product cards use one column on the narrowest screens, two where content remains readable, and a balanced multi-column catalogue on desktop.
- Category controls wrap without horizontal scrolling and remain at least 44 px high.
- Product copy and prices remain visible without hover.
- The modal fits within the viewport, keeps its close control visible, and allows the stage to resize without page overflow.
- Desktop preserves the editorial two-column hero; mobile orders copy, CTA, then visual.
- Images have localized descriptive alternative text. Decorative loading stills inside an already labelled dialog use empty alternative text.
- Category selection and modal states are available to assistive technology.
- Reduced-motion users receive the same content without hero crossfades or automatic 3D rotation.

## SEO and Routing

`/reviews` and `/en/reviews` remain the canonical routes. Navigation labels, page titles, descriptions, headings, FAQ schema, sitemap-facing metadata, and relevant internal links use the broader NFC and QR positioning. Static server-rendered text includes the product categories, prices, use cases, sizes, and key FAQ answers; search visibility never depends on the client-side category selection or 3D dialog.

## Testing and Verification

Implementation follows test-first development. Coverage includes:

- localized catalogue data, pricing, sizes, categories, and image metadata;
- hero order, timing, visibility pause, and reduced-motion behavior;
- semantic category controls and correct product filtering;
- no Spline loader, viewer, preconnect, scene request, or canvas before explicit action;
- exactly one viewer after an eligible 3D action;
- full viewer removal, body interaction restoration, and trigger-focus restoration on close;
- Escape and keyboard navigation behavior;
- stationary reduced-motion 3D behavior;
- loading failure preserves the photograph and retry attempts only the chosen scene;
- all three menu products and the custom booking example communicate that 3D is forthcoming;
- configurator conditional fields, validation, and localized WhatsApp output;
- no horizontal overflow and usable modal behavior at 320, 768, 1024, 1280, and 1536 px;
- successful typecheck, lint, unit suite, production build, and relevant Playwright projects.

## Out of Scope

- Changing the public `/reviews` route.
- Deploying or publishing before the user reviews the local site.
- Creating or editing Spline scenes.
- Inventing 3D scenes for menu or custom products.
- Online checkout, payment, inventory, or binding order placement.
- Publishing fixed volume-discount prices beyond two Standard Cards for CHF 80.–.
- Personalizing the standard stand before that product is offered.
- Redesigning unrelated pages or global brand tokens.
