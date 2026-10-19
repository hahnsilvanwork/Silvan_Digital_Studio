# Mobile-first header, hero and contact access

Goal: implement the approved first redesign step for predominantly older, non-technical business owners visiting on phones.

Approved direction: retain the exact preferred German headline and main CTA. Use Geist, navy, white and a 1280px content cap. Show a labelled mobile menu with an emphasized Contact link inside it; list all four services openly inside the menu. Explain NFC and automation with familiar examples. Reuse the existing vCard generator for a clearly labelled save-contact link on home and contact pages. No infrastructure changes, publishing or changes to prices/routes.

Implementation sequence:
- [x] Group desktop services in Navigation/ServiceNavigation; preserve MobileMenu focus/escape/resize behaviour and language context.
- [x] Restyle existing HomePage and hero CSS; update bilingual home copy and short service descriptions without replacing the project assets.
- [x] Add reusable SaveContact using createContactVCard; expose phone, email and WhatsApp clearly on ContactPage.
- [x] Update navigation regression expectations; verify vCard data, locale paths, keyboard controls and inquiry context.
- [x] Run typecheck/lint and relevant tests; inspect DE/EN at 320, 390, 768 and 1440px, enlarged text, reduced motion and download. Keep local preview available for review.

Existing files remain the architectural foundation. Larger service-page redesigns and deployment belong to subsequent steps.

Verification: 448 tests across 49 files passed; TypeScript, ESLint and Next production compilation passed. Browser checks covered DE/EN, widths 320–1440px, 200% text on home/contact, menu focus/escape, and vCard filename/content. Actual iOS/Android address-book import still requires a physical-device check. No configuration files changed and no deployment performed.
