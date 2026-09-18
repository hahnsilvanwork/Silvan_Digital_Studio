# Mobile quality pass — 18 September 2026

User requested a complete review and direct refinement of buttons, navigation, sizing, spacing and alignment, prioritizing mobile. Preserve the established identity, copy, prices and routes.

## Findings and changes

- Home and NFC hero actions wrapped to different widths on phones. Both now share the available width and a comfortable 52px minimum height; desktop retains inline actions.
- Shared button copy is now 16px, with explicit vertical padding so long translated labels retain breathing room when wrapping.
- Website package actions were 55px apart vertically at 768px because adjacent cards contained different text lengths. A CSS subgrid shares content rows within each pair, aligning prices, features and actions without fixed content heights.
- An open mobile drawer survived the desktop breakpoint and kept the page inert. It now releases the lock, removes the overlay and restores focus to the visible home link when appropriate. Environments without matchMedia retain the ordinary menu behavior.
- Automation example select controls were 15px. They are now 16px with 48px target height.
- Narrow package comparison tables now explain horizontal scrolling and keyboard access. The table stays in its own scroll region.
- Navigation chevrons have stronger default contrast; package action arrows use the same drawn chevron convention rather than a font glyph.

## Verification

- All 30 DE/EN public pages checked in Chromium and mobile WebKit at 320, 390, 768 and 1280px: no horizontal document overflow, missing same-page anchors, undersized inspected controls or text inputs under 16px. All discovered main-site internal route destinations return 200. Demo applications are separate unchanged projects and were not redesigned.
- New browser regressions cover menu breakpoint cleanup, hero alignment, package action alignment at 768/1024/1280px, keyboard table scrolling, and automation demo review/error/reset paths.
- Main browser run: 111 passed, 7 intentional device-specific skips. Extended run: 33 passed initially; four failures were stale test assumptions from the preceding approved change (service-specific contact URL and safe NFC session selection). Updated tests retain privacy assertions. Targeted repeat: all 46 passed across Chromium/mobile WebKit. Across these suites, 167 distinct browser tests pass; the final menu guard was also verified against the rebuilt output.
- 48 unit suites / 445 tests pass. ESLint and TypeScript checks pass. Production Next build produces 40 pages; static hardening covers 97 documents. Existing demo exports were retained.
- Visual inspection: primary mobile pages at 390px, product selection and form, 1280px service layout, and corrected 768px package pairs. Confirmed the mobile action changes and reset the temporary viewport afterward. This is browser emulation, not a physical iPhone/Android hardware test.
- Impeccable detector over src reports no findings. No contact message or personal data was submitted.

Preview: http://localhost:3117/. Deployment remains pending the owner's Vercel login, as documented in the preceding implementation report.
