# Reduced mobile preview

User direction: preview locally before deployment; less visual density, clearly separated chapters, better mobile proportions, icon-only menu and purposeful professional imagery.

Implemented: warm editorial identity retained; viewport-height homepage introduction; calmer typography and service spacing; two selected projects with larger, explicitly labelled concept visualizations; all four projects remain on Work. Product image precedes its explanation on phones. Website service introduction includes Archa imagery. Repeated service biography removed while About and Work links remain. FAQs use keyboard-accessible native details with answers retained in HTML. Menu has three strokes and an accessible name, without a visible text label.

Asset: new imagegen Lumen visualization saved to public/images/editorial/lumen-concept.webp; provenance and prompt in the adjacent README.

Verification: 260 unit tests passed; lint, typecheck and production build passed. Initial browser matrix covered ten routes at 320, 390, 768, 1024, 1280 and 1536 pixels without horizontal overflow. Mobile menu, service anchor and 3D dialog focus checks passed. Final browser confirmation recorded separately in artifacts. Local dev preview remains at http://localhost:3000. No deployment performed.

Final confirmation: viewport matrix passed again after the typography adjustment. Production browser journeys on a fresh server at port 3217: 37 passed, 7 skipped for device applicability. The first production attempt reached an existing stale server on 3101 (address already in use); its eight failures were resolved by testing the freshly built application on a verified free port, without changing functional code. Native FAQ Enter-key open/close and icon-only 44px menu checks passed in Chromium and WebKit. Mechanical design detector returned no findings.
