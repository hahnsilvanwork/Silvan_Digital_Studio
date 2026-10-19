# Initial review: NFC hero against owner homepage reference

Disposition: MATERIAL FIX REQUIRED before deployment. Scope is the DE/EN NFC hero only.

Reviewed the two actual owner images and current ReviewsPage.tsx, nfc-page.module.css, NfcMotionHero.tsx, nfc-motion.module.css. The homepage reference, rather than the superseded full-width-title arrangement, is the binding visual direction.

## Reference diagnosis

The approved homepage has two coherent columns: title, introduction, action and author metadata on the left; preview and preview metadata on the right. Their meaningful lower edges nearly coincide. Its left action bottom aligns with the preview bottom; metadata then occupies the final common row. The rejected NFC composition separates the title across both columns, while the left content ends roughly 210px above the right controls. Equal column widths alone do not address this.

## Bounded material fixes

1. Put the complete existing heading inside the left hero column. The top of the heading block and film stage should share the desktop top anchor. Remove the desktop title spanning both columns. Preserve exact DE/EN text.
2. Keep heading, intro and actions a coherent upper group. Place the existing price note as the final metadata group, analogous to homepage author details, aligned with the right caption/control row. Do not stretch every inter-item gap to distribute space.
3. Size both upper regions from actual rendered content. A 16:9 stage beside this long title can be too short near the desktop breakpoint; preserve the complete film with object-fit contain and use measured responsive geometry or stack earlier. Avoid a fixed large desktop height producing a conspicuous empty gulf between actions and prices in English. At wider desktop sizes, action bottom should be near the film bottom; lower metadata rows should share their top/bottom anchors within visual tolerance.
4. Verify real DE and EN at wide desktop and the first two-column breakpoint, plus 390px and 320px stacked. Ensure no title collision, horizontal overflow, stretched film, or arbitrary blank spacer. Keep actions before prices then film in mobile reading order, unless implementation evidence strongly favors another coherent order.

## Acceptance evidence

Provide screenshots plus bounding boxes for title, intro, actions, price note, stage, caption and entire left/right columns. Wide desktop and the first two-column viewport need top/bottom comparison. A column wrapper matching height while its content floats far above the opposite metadata is insufficient. Confirm film remains the original 19-second asset with working pause/resume and reduced-motion fallback. Do not add copy, new decorations, extra sections, or broaden the page redesign.

No unrelated craft-floor issue warrants expanding this owner's correction. Final visual disposition awaits revised screenshot evidence.
