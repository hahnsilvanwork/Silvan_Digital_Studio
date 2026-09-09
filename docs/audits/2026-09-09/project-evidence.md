# Project screenshot evidence — 2026-09-09

Ten actual public-demo screenshots, captured in isolated Playwright Chromium contexts by `scripts/capture-project-evidence.mjs`. No shared browser tabs were changed. No forms were submitted, no messages were sent, no bookings were made. Synthetic selection only: 14 October 2026, 10:00, two people where applicable. Names/emails remain the demos' original placeholders.

Each file was visually opened and inspected. Mobile captures show the upper 390×780 CSS-pixel home viewport at DPR 2. Workflow captures are scrolled page viewports at DPR 1.5, retaining original site styles and native selected/focused control states. Café and Salon use a taller viewport to reveal the relevant date/time controls. Browser screenshot pixels were converted directly to quality-84 WebP using Sharp; no AI or screenshot-content editing was used. All captured pages passed horizontal-overflow and broken-image assertions. Property/service carry-over was asserted before capture.

All projects remain fictional demo concepts. Falkenried has real German and English captures; other projects only have German captures and must be labelled accordingly in the English portfolio. Screenshots demonstrate UI states, not business outcomes or live availability. The capture does not establish message-preservation/reset/confirmation behavior, since submissions were deliberately excluded.

Assets live under `public/images/projects/evidence/`. `manifest.json` includes individual source URLs, capture timestamps, dimensions, viewport, language, bytes and descriptions.

| File | Intrinsic pixels | Bytes | Demonstrates |
| --- | --- | ---: | --- |
| falkenried-mobile-de.webp | 780×1560 | 73,314 | German mobile home |
| falkenried-mobile-en.webp | 780×1560 | 82,218 | English mobile home |
| falkenried-workflow-de.webp | 1500×1170 | 36,290 | First sample property's enquiry link carries German title into focused form selection |
| falkenried-workflow-en.webp | 1500×1170 | 30,860 | Same actual property selection flow in English |
| cafe-vogel-mobile-de.webp | 780×1560 | 66,260 | German mobile home |
| cafe-vogel-workflow-de.webp | 1500×1350 | 72,190 | Two people, date and generated 10:00 preferred time selected beside opening hours |
| steiner-handwerk-mobile-de.webp | 780×1560 | 52,258 | German mobile home |
| steiner-handwerk-workflow-de.webp | 1500×1170 | 67,580 | Malerarbeiten link carries service into focused enquiry control |
| salon-lumiere-mobile-de.webp | 780×1560 | 72,818 | German mobile home |
| salon-lumiere-workflow-de.webp | 1500×1350 | 88,610 | Balayage / Ombré selected from services page and sample date/time entered |

Capture command completed successfully: `node scripts/capture-project-evidence.mjs`. The final Café and Salon framing was re-inspected after increasing viewport height; section titles and selected time controls are visible below the fixed navigation. Preserve each image's native aspect ratio when integrating; do not force workflow images into the mobile ratio.
