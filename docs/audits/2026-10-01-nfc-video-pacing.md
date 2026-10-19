# NFC film — sequence-specific pacing

The owner requests a shorter, selectively faster film while retaining time for useful product views. The accepted homepage-reference layout remains unchanged.

The current 19-second film was inspected at half-second intervals. It spends the most time assembling the separated layers; camera travel and turns also delay the next meaningful view. The replacement is encoded directly from the user's unchanged 3840×2160, 38-second/912-frame master in `NFC Cards/SilvanDigital-NFC-4K-38-Sekunden.mp4`.

## Timing decisions

Positions below refer to the formerly published 19-second film. Speeds are relative to that version; a final 1.0297 time normalisation makes the output exactly 12 seconds.

| Previous position | Content | Speed |
| --- | --- | --- |
| 0–1.25s | Opening front view | 1× |
| 1.25–2.75s | First turn | 1.6× |
| 2.75–4.5s | Layer separation | 1.5× |
| 4.5–6.5s | Exploded view | 1.6× |
| 6.5–7.7s | Move towards chip | 2× |
| 7.7–8.7s | Chip detail | 1× |
| 8.7–10s | Pull back | 2× |
| 10–14.5s | Layer assembly | 2.5× |
| 14.5–16s | Assembled front | 1.5× |
| 16–18s | Final turn | 2× |
| 18–19s | Second design | 1× |

Rate changes use integrated smoothstep transitions over 0.5 seconds of master time; output timestamps remain continuous. No scene or part of the source frame is removed. All original source files remain intact; a copy of the prior 19-second web film is in `.tmp/nfc-video-pacing/previous-19s.mp4`.

## Verification

FFprobe: H.264 1280×720, 24fps, 288 frames, duration **12.000000 seconds**, 2,795,619 bytes. Before/after contact sheets were opened and reviewed. Encoding recipe and rate map: `.tmp/nfc-video-pacing/encode.mjs` and `pacing.json`.

The existing public video is replaced and its component URL gains `?v=12s` so previously cached media does not hide the update. Runtime pause, visibility, reduced-motion and fallback logic is unchanged. Local browser and production evidence follow after completion.

Local verification: production build/typecheck, 97-file HTML hardening check and scoped ESLint passed. The targeted three-browser suite passed 41/42 initially; one mobile-Safari case timed out waiting for the existing hydration marker before media checks. That exact case passed three consecutive single-worker reruns. All video duration, pause/resume, reduced-motion and fallback checks passed. No layout code was changed.

Production: READY deployment dpl_FjQfrj2js5nRsmt7bxFqNR4ZSJuq (https://silvan-digital-studio-h3hmzr12k-silvan1.vercel.app), aliased to https://silvandigital.ch and www. Vercel inspect confirmed Ready. All 16 Chromium/WebKit DE/EN live flows passed across mobile/tablet/desktop, including exact 12-second duration, playback, persistent pause/resume, alignment, no horizontal overflow and model/quantity enquiry. All 30 retained routes returned 200; the two removed NFC 2 routes returned 404 and remain absent from sitemap. Live film bytes match local SHA256 DDF6131E410B0E750483435072CADDE95C9ED2ACEA8DAB30977F2831677DCD31. Report and screenshots: .tmp/nfc-video-pacing/live/. The final 1516px live capture was opened and reviewed; the existing in-app page was refreshed.
