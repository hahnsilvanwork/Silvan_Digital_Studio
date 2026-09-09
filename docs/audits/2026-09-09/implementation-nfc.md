# NFC implementation — 9 September 2026

Scope: U01, U03, U08 and the delegated public U09 product updates. Existing product truth, pricing, presets, URL identifiers and optional 3D retained. Impeccable craft-floor applied to the existing editorial design; no new visual identity.

## Delivered

- U01: localized native pause/resume button on the motion figure. Explicit pause is independent of automatic viewport/document visibility suspension, so returning cannot restart a paused composition. Reduced motion retains the static composition and hides the irrelevant play control. 44px minimum target, readable control type and native keyboard semantics.
- U03: full NFC enquiry draft and preview state transferred only on a deliberate, unmodified same-tab other-language click. A versioned sessionStorage envelope validates all field types/limits/options, destination path and two-minute validity. Read attempts delete the envelope before any restoration, including invalid and expired data; no restoration if deletion fails. Preview is rebuilt in the destination language only for valid fields. Ordinary edits never write to storage. Invalidated previews do not survive edits. No personal data added to public website links or telemetry. Blocked storage offers a localized native confirmation: cancel preserves details, OK explicitly discards them while changing language. Legal and form notices describe the limited exception. Unconsumed expired data cannot be restored and is removed on the next consumption attempt or tab closure; the validity period is not a promise of timed physical deletion.
- U08: application selection now leads into flat card / stand / adhesive chip guidance, followed by existing variants. Only families available for that application appear; All product types restores every variant. Families are derived from existing product presets. Selection controls are native keyboard/touch buttons, with a wrapped layout and existing mobile product rail. No material, dimension, bestseller or delivery assertions invented. Existing selected model stays in the URL when comparing families.
- Integration: LanguageSwitcher also preserves the parent's validated website-tier context on contact links. ReviewsPage receives only the locale prop for the catalogue.

## Files

- src/components/products/NfcMotionHero.tsx and nfc-motion.module.css
- src/components/products/ProductCatalog.tsx and products.module.css
- src/components/reviews/ReviewInquiryConfigurator.tsx
- src/components/ui/LanguageSwitcher.tsx
- src/lib/inquiry-draft.ts (new)
- src/content/inquiry-copy.ts and legal-content.ts (draft notices only)
- src/features/pages/ReviewsPage.tsx (locale prop only)
- tests/unit/inquiry-draft.test.ts, inquiry-language-transfer.test.tsx, nfc-motion-control.test.tsx, catalogue-families.test.tsx (new)

## Validation

- New draft unit suite first failed because the implementation did not exist; after implementation it passed.
- Initial U01/U03/U08 run: 13 affected suites / 66 tests passed with Vitest 4.1.11, including full draft transfer in both directions, localized preview/CHF 100 estimate, blocked storage, modified clicks, TTL/shape/options/deletion, motion controls and existing model/price/3D/form behaviours.
- TypeScript --noEmit passed. Targeted ESLint passed.
- Parent owns the final bounded desktop/mobile browser batch and actual navigation check. Unit DOM tests do not prove browser root-layout navigation or actual screen reader behaviour. No deploy or commit by this worker.

## U09 owner-confirmed facts integrated

Round cards now display a choice of Ø 80 / Ø 100 mm; square cards 80 × 80 / 100 × 100 mm. Chip, rectangular and stand dimensions remain on their existing evidence. The raw import is untouched. Round/square model presets leave size open so the visitor selects the variant; display and outbound draft use diameter notation for rounds. Existing regression assertions were updated to require size selection and focus, rather than removing validation. Public native disclosure near the catalogue states standard stock at the owner location, configured personalized/custom delivery in 3–5 weeks after agreement, and Google-card support boundaries. Material, waterproofness and mounting claims were not extrapolated.

Additional files: src/content/photo-products.ts; src/lib/inquiry-selection.ts; src/lib/whatsapp.ts (round-size formatting only); existing photo-products, inquiry-selection, compact-inquiry, inquiry-suggestions and review-inquiry tests. Final targeted check follows this update.

Final U01/U03/U08/U09 targeted result: 14 suites / 76 tests passed on Vitest 4.1.11; TypeScript --noEmit passed; targeted ESLint passed. Browser batch remains with parent.
