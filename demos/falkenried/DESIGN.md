# Falkenried — design reference

Updated 24 September 2026. Scope: `demos/falkenried`. Source components and the final CSS cascade are authoritative.

## Direction

A calm regional business concept joining motoring, landscaping and property. Warm cream, deep green, generous spacing and substantial photography make the three areas feel related. The homepage uses an editorial split composition and three photographic service links. Avoid decorative statistics, invented testimonials or unsupported company heritage.

## Current foundations

| Role | Value |
|---|---|
| Page surface | `#f5f3ed` |
| White content surface | `#ffffff` |
| Soft surface | `#ebece4` |
| Primary / hover | `#163c35` / `#265b4e` |
| Main / muted text | `#191c1d` / `#424751` |
| Divider | `#c2c6d3` |
| Workshop text accent | `#1c4f73` |
| Garden accent | `#2d5a27` |
| Property accent | `#55606b` |
| Validation text | `#9a1515` |

Hanken Grotesk Variable is the active body and shared heading font. Georgia provides the homepage hero and brand-symbol serif accents; importing Inter does not make it the current body face. The homepage hero scales from 48px on small screens to 84px on wide screens. Shared controls use readable, sentence-case labels; legacy uppercase labels remain in supporting components.

Content containers cap at 1280px, with responsive gutters starting at 24px. The homepage splits copy and image above 899px; its three service columns become a single column below that breakpoint. Sections use generous vertical separation. Small radii and borders provide structure; shared cards have no shadow in the final cascade.

## Components and behaviour

- **Homepage:** clear introduction, garden photograph with an explicit concept caption, three service links, explanation of the fictional company and a contact invitation. No empty video block or testimonial section.
- **Shared heroes:** split or full-image layouts. Full-image text uses a dark contrast overlay and distinct white/green buttons. Hero images load eagerly with responsive widths; supporting homepage images load lazily.
- **Header:** fixed brand/navigation bar, equivalent-page language switch and mobile menu. It switches to compact navigation when the measured desktop links no longer fit, including enlarged text. Escape closes an open menu and returns focus.
- **Controls:** primary and secondary buttons have a minimum height of 48px and visible focus treatment. Image and dark sections use light focus outlines. Preserve reduced-motion rules and the skip link.
- **Properties:** image, status, descriptive content and enquiry link. Category filters update `aria-pressed`, hide nonmatching cards and announce the result count. Property links carry the selected object into the enquiry form.
- **Forms:** persistent labels, inline validation and a local review panel with edit/clear actions. Summary values wrap and preserve line breaks. The fieldset starts disabled until the submit-cancellation handler is installed.
- **FAQ:** native disclosures inside keyboard-operable tabs. Without JavaScript all FAQ panels remain readable and the tab controls remain hidden.

## Rules for future edits

Keep German and English layouts equivalent without forcing identical line breaks. Test long labels, mobile widths and 200% text before release. Keep photographs useful to the service being described; the concept caption and demo notice must remain understandable. Do not restore navy branding, a fabricated founding date, accreditation claims or real submission behaviour from older mockup notes. Contrast numbers in old comments are not a substitute for checking rendered colours.
