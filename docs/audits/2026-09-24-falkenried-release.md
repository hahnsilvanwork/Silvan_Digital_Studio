# Falkenried release — 24 September 2026

## Delivered
Shared German/English homepage with a garden-led opening and three photographic division links. Removed illustrative testimonials and invented founding chronology. Refined subpage heroes, typography and control readability. Adaptive header switches to compact navigation when enlarged text needs more space. Property filters announce counts; selected properties carry into the enquiry form. Forms validate locally and support review, edit and clear without sending or storing data. FAQ content remains available without JavaScript.

## Verification
- Astro production build: 45 pages; type check: 0 errors, 0 warnings (27 pre-existing/non-blocking hints).
- 38 data, content and form unit/contract tests passed.
- All 44 regular DE/EN routes at 390 and 1440 CSS pixels: 88 checks, no horizontal overflow, missing images, missing/duplicate H1 or JavaScript errors. Repeated successfully on public production.
- Axe WCAG2A/AA and 2.1AA on seven representative routes at both widths: no automated violations. Not a complete accessibility certification.
- Local review/edit/clear workflows tested in DE/EN contact and property forms with no data requests; property filter/selection, FAQ keyboard tabs and mobile menu passed. Representative WebKit routes passed.
- Independent review identified header overflow at 200% text. Corrected; targeted checks at 390, 1024 and 1440 passed. No-JS FAQ content and disabled forms confirmed.
- Scoped design/product documents updated from final source.

## Production
Current deployment: dpl_9WwzaZDfLUWq3tfihenZw3LF94E8
Public: https://silvan-demo-falkenried.vercel.app/
Immutable: https://silvan-demo-falkenried-eadmyre03-silvan1.vercel.app/
Prior production for rollback: dpl_8vy1j7tvGE3SiBKxWJkHFEUCoJJe

## Portfolio follow-through
Screenshots of all four live demos are being refreshed separately. Before changing the main website, compared its production source file SHA-1 hashes (deployment dpl_4svVrgirvCYYfKp3UfA1Aj24BznS) with the workspace: existing main application sources match production, despite unrelated uncommitted changes in Git. Preserve those changes; only commit this release's scoped edits.
