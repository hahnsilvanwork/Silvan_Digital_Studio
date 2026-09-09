# Revision 03 — popup and stabilization

User requested a more realistic NFC notification and removal of shaking in the phone and screen. This revision edits the existing authorized base locally and consumes no generation credits.

The earlier generic menu notification was replaced with a compact German NFC website banner, NFC icon, Safari opening instruction and an explicitly reserved example domain. The background is an illustrative Safari start page. This remains a reconstructed demonstration, not a recording of a particular iOS release. Apple background-reading documentation establishes the notification-to-open interaction: https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading

Phone, bezel and hand are aligned together during the tap. During the application montage (4–12.5 seconds), a fixed source pose removes AI motion and independent screen tracking drift. The cards and displayed pages continue switching, with menu scrolling retained. Source motion remains for the approach, tap and exit. The original product is removed before foreground alignment to prevent a duplicate card edge.

Verification script decodes the complete export, checks frame count, compares holding-hand pixel changes against revision 02, and writes enlarged transition frames for inspection. See artifacts/nfc-hero/revision-03-composite/verification.json. This is not a claim that the AI hand movement is physically exact or that the UI is an authentic OS capture.

Deliverable: artifacts/nfc-hero/revision-03-composite/nfc-hero-revision-03.mp4. Earlier exports are preserved.
