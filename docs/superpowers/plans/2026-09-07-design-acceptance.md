# Design acceptance: SILVAN

## Direction

Preserve the photographic homepage and warm neutral identity. Bring service pages into the same system. Prices, factual claims and Claude's punctuation corrections remain intact. Preview locally; deployment requires the user's review.

Reference analysis: TWKS (https://twks.ch/en) uses project-led navigation and clearly named service categories. Studio Merge (https://www.studio-merge.com/) places strong work imagery above descriptive detail. Their expression suits portfolio discovery; SILVAN additionally needs visible pricing and direct contact for local business customers. NN/g's visual hierarchy and proximity principles (https://www.nngroup.com/articles/principles-visual-design/) support grouping related content and separating different tasks through scale, space and surfaces.

## Observable acceptance criteria

- Every page has one identifiable main heading and a clear next action.
- Homepage provides access to all four services, project work and contact.
- Service introductions connect the offer and its explanation on desktop; mobile preserves heading, explanation, action order.
- No adjacent duplicate divider lines around the developer introduction.
- Four website packages use a balanced two-column comparison on desktop, one column on narrow phones. Prices remain legible without clipping.
- Repeated benefits and use cases share typography and spacing; decorative boxes are not used for every paragraph.
- Contact on service pages forms a distinct closing section.
- No document overflow at 320, 390, 768, 1024, 1280 or 1536px across the main routes. German and English paths work.
- Mobile menu and 3D dialog open, close with Escape and restore focus. The 3D button includes visible text and a minimum 44px target.
- Reduced motion leaves content visible. Keyboard navigation and visible focus remain functional.
- Project imagery preserves aspect ratio and concept labels; existing small exports are not stretched beyond their source dimensions.
- Existing locale regression tests protect against prose dashes and punctuation regressions. Build, lint, typecheck and relevant browser flows pass.

## Verification recorded

- Production build: 40 routes generated successfully.
- Unit tests: 260 passed; lint and TypeScript passed.
- Chromium and mobile WebKit browser journeys: 73 passed, 7 desktop-inapplicable mobile-menu tests skipped. Includes navigation, localized routes, contact URI targets, inquiry validation/editing and lazy 3D dialog lifecycle.
- Main-route matrix: ten routes at six viewport widths without document overflow. Main pages visually inspected at 390 and 1280px.
- Independent visual review: no material layout failures; requested verification of lazy product image. Resolved by decoding visible images before screenshots; mobile product photo confirmed present.
- Browser server logged Next's `Internal: NoFallbackError` during intentional missing-route tests; the localized 404 assertions passed. This is recorded rather than described as a completely error-free server log.
- 3D lifecycle tests use a renderer stub. Real device/GPU rendering and live field performance are not established by those tests.

## Limits

These checks substantiate implementation quality, not a promise of subjective perfection or measured conversion lift. Device emulation does not replace an actual phone check. No new customer claims, testimonials or performance figures are invented.
