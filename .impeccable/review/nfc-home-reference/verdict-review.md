# Final verdict: NFC homepage-reference correction

**Disposition: SHIP for this bounded visual correction.** All four initial material fixes are resolved. This is approval of the DE/EN NFC hero layout against the owner reference, not whole-site approval or proof of deployment. Complete the already-running functional checks and normal release verification separately.

I opened all 16 final production-build screenshots (DE and EN at 320, 390, 1024, 1200, 1280, 1440, 1516 and 1600px), read geometry.json and contract.md, and inspected the revised hero CSS, media CSS and alignment test. The original owner images remain the visual authority.

| Initial fix | Score | Final evidence |
| --- | --- | --- |
| Heading inside the left column; shared top anchor | Resolved | The heading now belongs to the complete left group. All supplied two-column measurements have identical title/stage top coordinates. At the owner width of 1516px both begin at y=141.046875. |
| Compact upper group; price and caption metadata aligned | Resolved | Actions end precisely at the film-stage bottom at every measured desktop width. At 1516px both end at y=516.03125. Price and caption share the same vertical center; the 44px control retains its touch target. The left group no longer stops far above the right. |
| Natural responsive height without a huge empty spacer or cropped film | Resolved | Compact DE groups drive stage height where necessary at 1280/1440px; small neutral letterboxing preserves the complete source. EN has a moderate 54-74px introduction-to-action gap at 1200-1440px, acceptable within the shared-height composition and substantially different from the rejected blank lower-left region. Both languages are tightly balanced at 1516/1600px. Price-to-action separation remains compact. The source uses object-fit: contain. |
| DE/EN desktop and narrow-width integrity | Resolved | The 1200px switch avoids forcing the long title into inadequate columns. DE/EN 320/390/1024px retain coherent stacked content, intact copy and visible actions. Keeping existing prices before actions on stacked views is accepted. All supplied geometry reports overflow=false. Viewport screenshots ending partway through the film show normal scrolling, not source cropping. |

The film frame and its lower metadata now form a coherent right column matching the complete left column, as requested by the homepage reference. No further material visual fix from the original scope remains.

The alignment test meaningfully checks real top/bottom anchors, metadata center, bounded action/metadata gaps, touch targets, contain fitting and horizontal overflow in playing/paused states. Its final run result and the separate 19-second media/reduced-motion checks are the implementing agent's verification responsibility; still screenshots alone do not prove those behaviors.
