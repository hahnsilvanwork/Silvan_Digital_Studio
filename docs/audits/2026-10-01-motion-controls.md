# Quieter animation controls

Requested: move NFC pause to a quiet in-video icon; remove homepage animation controls.

Implemented an always-available 16px pause/play SVG within a 44px button, 8px from the video bottom/right. Removed aria-hidden from the containing stage so the button remains accessible, retaining it on the decorative video. DE/EN accessible action names, persistent manual pause and keyboard focus remain. Accepted hero geometry and the 12-second film are unchanged.

Removed the homepage signature pause/play/replay button and unused state/styles. The film still runs once; unfinished playback resumes after offscreen suspension because it no longer has a manual resume button. Reduced-motion, data-saving and playback-error posters remain.

Build/typecheck, scoped ESLint and HTML hardening (97 documents) passed. All 22 selected Chromium/WebKit tests passed, covering both languages, mobile/desktop, playback, reduced-motion, data-saving and failures. Two additional local complete paths verified in-video geometry, keyboard pause/resume, no homepage button, one-shot completion and no browser errors/overflow. Opened all four local screenshots at 390/1440px for NFC and homepage. Evidence: .tmp/motion-controls/local/.

Production READY: dpl_9BQ45BXPmdXUJdRBEYa1EdmHU6h1, https://silvan-digital-studio-efvejf5ir-silvan1.vercel.app, aliased to https://silvandigital.ch. Live checks completed for Chromium/WebKit, DE/EN, 390/1440px. The first run completed six paths before the seventh (WebKit DE desktop) exceeded the 5-second video-start expectation. Both desktop Safari paths then passed an isolated confirmation using a 15-second network-start allowance; no application change was needed. All eight combinations are covered across these runs; no clean initial eight-path run is asserted. Live evidence: .tmp/motion-controls/live/ and .tmp/motion-controls/live-safari-confirm/report.json. The desktop live NFC capture was opened and reviewed. Existing in-app NFC tab refreshed.
