## October 19 (seventh pass) — subpages slimmed to the homepage style, deployed
Owner approved the livelier homepage and asked for the same on every page, then a production deploy. Service pages drop section intros and repeated feature lists; hero leads are one or two short sentences; process steps are one line each. The Websites hero uses the shared BrowserFrame (Café Vogel full-page scroll), examples use a headRow with the "all examples" link and image-only cards. Services, About, Examples and example details close with the large phone call (ContactCall) instead of the contact band. The same opening choreography, pointer glow and scroll reveals apply on all pages through the shared components. Deployed to production on 2026-10-19 (silvandigital.ch); not committed to git.

## October 19 (sixth pass) — livelier first impression, small considered details
Owner: "more small cool features and design details, a bit more alive; the first two seconds matter most". All motion is CSS or rAF on transform/opacity, plays once (no infinite loops), and is off for reduced motion; nothing hides text behind JavaScript.
- Opening choreography (CSS only): eyebrow rises, each headline sentence slides up out of its own mask (staggered 120ms), service names, buttons and facts strip follow; the preview settles in.
- Preview as a real browser: light chrome with dots and the demo's actual host, and a 16:10 window that scrolls once down the full Spurwerk demo page and back (13s, alternate, 2 iterations), pausing on hover/focus. Source: public/images/home/spurwerk-scroll.webp (see README there).
- Pointer light: a faint blue radial glow follows the cursor over the navy block (fine pointers only).
- Service index: on hover a 4:3 card with a real image of that service follows the cursor with eased lag (website screenshot, Google before/after example, NFC review card photo, weekly-report demo); a fine ink line draws under the row.
- Scroll reveals via the existing data-reveal system for section heads, example cards, price rows, steps, about, FAQ and the closing call, staggered by --reveal-index.

## October 19 (fifth pass) — calmer homepage, less text
Owner: "still too much text, too full; it must be clean and appealing". Research basis: low visual complexity and prototypical order drive first impressions (Tuch et al. 2012, Lindgaard 2006), users read about 20 % of words (NN/g), references designjoy, linear, Things, Collins, Mercury. Homepage cut from ~730 to ~300 words and from 7000 to ~5900px. Order: opening (service names only, no sub-lines) → services as an index (name left, one line, price and arrow right on the shared split, hover line draws in) → village → examples (images, name, label, no descriptions; heading with "all examples" link on one line) → price band (package and price only, one-sentence cost note, three short steps underneath) → about (one sentence, facts as one line) → four FAQs → closing call (phone number large, one button). All section intro paragraphs removed; section spacing raised to clamp(5rem, 9vw, 8.5rem). The hero preview settles in once on load (opacity/transform, off for reduced motion).

## October 19 (fourth pass) — one editorial system for every page
Shared building blocks live in src/components/editorial: PageHero (navy opening with title fit per page via --title-fit, lead or ruled list, primary + phone actions, visual column with caption, horizon strip with two facts and byline), Sections (EditorialPage wrapper with --home-split 1fr/1fr and --home-gap 3rem, SectionHead aligned on last baseline, RuledList, Steps, PriceBand, FaqSection with phone hint, ContactBand, ProjectCards, PageHead for white page heads), StickyCallBar (phone-only, watches each page's hero actions and contact section). Service pages use the navy opening; contact, about, examples and /hello use the white PageHead. Old patterns removed from these pages: uppercase eyebrows, dot bullets, tier cards with badges, navy process bands, page-topic bars, per-element reveal animations. The NFC film keeps its full 16:9 frame inside the navy opening (no crop).

## October 19 (third pass) — four services in the hero and a drawn horizon
Final alignment: the facts strip reuses the hero grid. Two facts (price, fixed price) sit under the two service columns; the byline, now carrying “Antwort innert 24 Stunden”, starts exactly with the preview (column-gap: normal on the subgrid inherits the hero gap). Measured at 1900px: 327 / 680 / 1082.
Owner feedback: the offer is four equal services, not mainly websites, and the gold dot and map contours read as generic. Below the headline the hero now lists Websites, Google-Unternehmensprofil, NFC- und QR-Karten and Automationen as a ruled 2×2 list (name in white 650, one short benefit in muted text; one column on phones). No eyebrow ornament. The divider above the facts strip is a hand-drawn horizon in the village illustration's line language: flat on the left, rising on the right into the Lägern ridge carrying a pine, houses, Boppelsen's church and one gold autumn tree (white strokes 28–60%, gold only for the tree). The dark full-width line under the header was the programmatic focus ring on #main-content; it is removed for that landmark only.

## October 19 (second pass) — aligned welcome block and shared column line
Owner asked for a better headline and exact alignment. Headline “Mehr Kunden. Weniger Büroarbeit.” sized from its column (9.4cqi, capped 5rem) so each sentence stays on one line on desktop. From 72rem the hero is a grid (1.22fr / 1fr): the gold eyebrow rule and the preview start on the same top line, the buttons and the caption end on the same bottom line, and a full-width subgrid strip carries three facts (value + label) under the text and the byline under the preview. Below 72rem everything stacks. All two-column homepage sections share --home-split (1fr / 1fr, 3rem gap) with heads aligned on the last baseline, so right-hand content starts on one vertical line with the third service and the second example (measured: 737px at 1440, 977px at 1920).

## October 19 — refined homepage system (local, current; supersedes earlier homepage layouts)
Same identity: Geist, navy #081B3C/#0B203D hero, white, rule #C7D3E7, pale surface #F2F5F9, gold #DDA055 only as a fine eyebrow rule. No card grids, icon tiles, pill buttons or checkmark lists. Hero height is content-driven (no full-viewport minimum); headline sentences break onto separate lines from 64rem, weight 700. Actions: white primary button and outlined phone button, 56px minimum. Facts separated by thin vertical rules. Services: one ruled list, ink top rule, 4 subgrid-aligned columns with vertical hairlines from 64rem, 2 columns from 48rem, stacked on phones; price in ink at 650 weight. Sections use --text-heading at 650; body copy 17–18px muted; ruled numbered steps; cost band on pale surface with right-aligned tabular prices and a bordered annual-cost note. Phone shortcut bar (call filled, enquiry outlined) slides in by transform only after the hero actions leave the viewport and hides over the contact section; hidden from 48rem. Motion remains transform-only with reduced-motion fallbacks.

## September 23 — remaining service and portfolio pages
Automation now introduces repeated data entry and hand-written reports in everyday language, with a clear quote-before-implementation explanation. Preserve the interactive demonstration and its error/review states. Studio exposes a personal contact action in the introduction, caps the original uncropped portrait at 22rem, groups four standards in two columns on desktop and uses the shared paired contact layout. Portfolio previews explicitly say “Konzept ansehen” / “View concept”; the overview closes with contextual website contact options and vCard download. The established concept labels, project outcomes and demo links remain.

## September 23 — NFC simplification and service-page continuation
NFC is a Persuade surface for phone-first, nontechnical business owners. Explain phone use before the catalogue. Start with three representative products (review, menu, sticker), expose the remaining starter models through a labelled button, and retain category filtering, prices, optional 3D and URL-based selection. Use compact price rows with optional quantity details. The enquiry form stays mounted but starts collapsed; hash links and model requests open it before scrolling/focus. Direct contact and saving the contact are alongside the enquiry. Consolidate delivery/setup questions into one FAQ and avoid duplicate compatibility answers.
Websites and Google visibility use readable headings, early cost information, explicit price links and compact direct contact. Google-profile ownership/access guidance and honest hypothetical examples remain; Google's free profile is clearly distinguished from paid setup work. Prices and bilingual enquiry logic are unchanged. Local preview only.

# SILVAN / Photographic studio portfolio

## October 9 — owner correction: full welcome screen

The owner rejects the compact hero and requests a larger welcome screen, with services farther below. This supersedes the earlier two-line desktop title and first-viewport service visibility constraints. Desktop uses a viewport-related minimum height, never a fixed height, a 40–64px headline with up to three lines, larger benefit text, generous internal spacing and vertically centred text/preview columns. Services begin after a 3.5rem gap. Mobile retains its content-driven height. Existing copy, preview composition, navigation and prices remain.

## October 9 — targeted homepage refinement

The current owner brief supersedes earlier hero wording. Use the shared --content-width for the navy hero as well as navigation and following content. Keep the existing preview composition, with a compact two-column hero from 64rem, a two-line desktop headline and four quiet benefit rows with gold checks drawn from the existing landscape accent. The small personal link sits below the preview. Add a simple ruled price overview, without changing existing price values or introducing new packages. Preserve mobile drawer behavior and bilingual routes. See docs/audits/2026-10-09-home-navigation.md for local verification.

## October 2 — Contact-first homepage and enquiry completion

This owner-approved refinement preserves Geist, the current navy #081B3C / white / blue-grey tokens and the 86rem shared container. Homepage mobile order is introduction, contact action and reassurance, personal byline, four service links with existing prices, clearly labelled real demo screenshot, then the contained decorative village. On desktop the screenshot sits beside the introduction, with services below. This supersedes the earlier first-screen village placement. Do not duplicate interactive elements to obtain the responsive order.

The demo uses a real language-matched Falkenried website screenshot with responsive image optimization, reserved geometry and explicit fictional-business context before the image. It is one link with a visible caption/action. No new autoplay hero, simulated form or customer claim. Existing portrait and NFC film retain their approved behavior.

The optional general enquiry ends with primary email and secondary WhatsApp actions using the same draft as the upper direct-contact group. Copy remains a quieter alternative. Selected context is visible, status never claims delivery, and keyboard focus is explicit. Important page-topic destination headings use immediate text rather than word masks. Local implementation only; evidence and remaining scope: docs/audits/2026-10-02-session-3.md.

## October 1 — existing NFC introduction with supplied film

<!-- The following canonical sections document this NFC hero replacement only. They do not redefine the global design system. -->

## Overview

The owner rejects NFC 2 and restores the September 30 production website. The supplied card film demonstrates the physical product inside the existing NFC introduction on `/reviews` and `/en/reviews`. The owner's latest homepage screenshot is the visual authority for the balanced two-column hero, superseding the preceding full-width-title arrangements. Preserve the approved page, original headings, catalogue, prices, contact and inquiry. This is an extension of the existing white, Geist and navy identity.

## Colors

The surrounding page and playback control inherit the established navy ink, muted blue-grey copy, pale hover surface and fine border tokens. The film retains its supplied stone, white and gold material; its warm stage fallback stays confined to the media frame (#e9e5dc). Do not extend the film's palette to the page.

## Typography

Keep the existing Geist headings and supporting copy. From the two-column breakpoint, the title uses a local fluid scale from 40px to 60px; the introductory paragraph scales from 17px to 20px with 1.55 line-height. Mobile typography remains unchanged. The film caption is quiet supporting text (.8125rem, 1.5 line-height); the labelled pause/resume control remains readable (.875rem). Both inherit the site's font family.

## Layout

At the desktop breakpoint (75rem / 1200px), two equal columns share an upper content row and a lower metadata row through subgrid, with a 3rem (48px) column gap and 1rem (16px) row gap. The complete unchanged title sits inside the left column with introduction and actions. The title top aligns with the film-stage top; the actions end at the film-stage bottom. The upper text group keeps 1.25rem (20px) gaps, with only residual space before the actions flexing through an automatic margin. The price note occupies the lower left metadata row, vertically centered with the film caption/control row on the right.

The upper row sizes from actual content. The stage follows the film's 16:9 geometry when it fits, but can grow taller when the title and copy require it; contain fitting keeps the entire 16:9 source visible with modest neutral letterboxing. Below 1200px, retain the visual order title, explanation, price, actions, then full shared-width film, with unchanged mobile typography. Mobile may naturally continue below the viewport; the media itself remains uncropped. This homepage-reference composition supersedes the preceding October 1 NFC hero topology only.

## Elevation & Depth

The media frame has a fine border and no added shadow. Physical depth comes from the supplied film. Preserve the quiet white page around it.

## Shapes

Use gently rounded frame and control corners (4px), without extra decorative framing. Keep the complete rectangular film window and the caption outside the video area.

## Components

The hero uses the supplied silent card film retimed by sequence with smooth speed ramps: H.264, 1280 × 720, 24fps, 288 frames and exactly 12 seconds. It loops while visible and the tab is active. A nearby labelled control pauses and resumes playback; user pause persists while the section leaves view or the tab becomes hidden. The control has a minimum touch height of 44px and a visible keyboard focus outline. The caption/control row stays visually secondary to the sales actions and shares the desktop metadata row with the price note.

The matched first-frame poster remains visible until playback supplies a frame, and when video fails. Reduced motion and data saving prevent video download and retain the poster; absent JavaScript also retains it. An unavailable or blocked playback can be resumed through the control. Preserve the existing bilingual caption and button names.

## Do's and Don'ts

- **Do** preserve the restored production page, shared gutters and homepage-reference column balance.
- **Do** show the full supplied 16:9 film and retain its matched first frame as fallback.
- **Do** retain silent playback, persistent pause, visibility suspension and static preference handling.
- **Don't** crop the film, restore NFC 2 or add a new scroll page.
- **Don't** turn the film's material palette into a new site identity or change copy, catalogue, prices or inquiry behavior.

Fresh correction review: `.impeccable/review/nfc-home-reference/verdict-review.md`, disposition ship for the bounded DE/EN hero correction, with all four material fixes resolved. The reviewer opened all 16 DE/EN captures at 320, 390, 1024, 1200, 1280, 1440, owner-width 1516 and 1600px. `geometry.json` records identical title/stage top and action/stage bottom anchors, aligned metadata centers, complete film and no horizontal overflow. Parent validation reports build/types, hardening/scoped ESLint, detector `[]` and an asset-provenance scan with zero missing assets passing. The initial 108 scoped browser checks had 107 passes and one WebKit early-click catalogue failure; after the test waited for network idle before the button click, that single failed case passed three consecutive reruns. The earlier film review and media provenance remain in `.impeccable/review/nfc-video/`. This documents the reviewed local correction; production is READY and all 16 live browser flows passed, recorded separately in docs/audits/2026-10-01-nfc-home-reference.md.

<!-- End of October 1 NFC hero documentation. Historical content below is preserved. -->

September 23 homepage continuation: service directory is one open column on phones and two equal columns from 768px, with visible prices and labelled links. Two selected concept projects reuse factual outcomes from the project content. Personal section explains collaboration and quotation. Contact channels precede contact saving in mobile reading order; LinkedIn remains in the footer and contact page. Footer labels and address are readable without expanding controls.

## September 23 — current design direction
The current owner brief supersedes historical visual directions below: Geist, navy #111C2D, white #FFFFFF, surface #F8F9FA, muted #4B5563, borders #E5E7EB; gold only as an optional small accent. Normal content max 1280px. Mobile is the primary surface: 38–42px hero headline, 16–18px body, labelled controls at least 44px, explicit contact and plain-language explanations. Desktop H1 capped at 64px. Retain real concept preview and compact personal byline; limit the later portrait. All four services share a desktop disclosure and remain openly listed in the mobile menu. Owner refinement: no additional Contact button in the mobile header. Contact remains emphasized inside the labelled mobile menu; language switching is inside the drawer. Contact saving reuses the existing vCard data with instructions; phone, email and WhatsApp remain real links. Preserve existing prices, inquiry context and safety/accessibility behaviour. No infrastructure changes.


## September 19 online-presence and mobile correction (latest direction)
The homepage leads with “Online-Präsenz, die zu Ihnen passt.” and a general project enquiry. Its order is introduction, four equal service links, selected concepts, the person, contact. Detailed website pricing, project evidence, process and website FAQs live on their dedicated pages. Preserve the existing palette, imagery and navigation. Mobile uses a smaller fluid headline and shorter copy. Service pages have wrapping topic links to prices, examples, process and FAQs; website package features are native disclosures while prices remain visible. This supersedes the website-first homepage direction below. Owner approved GitHub push and production deployment on September 21.

## September 18 alignment correction (latest direction)

The owner explicitly requested cleaner alignment and fewer dividers after the mobile pass. Use a shared equal-column grid with a 3rem desktop gap across the homepage's paired sections, top-align the groups and remove arbitrary image insets. On phones, primary images fill the text column. Owner correction: the homepage and About portraits retain the original 4:5 ratio, showing the complete approved photograph without a cover crop. Portfolio pairs no longer stagger vertically.

Website-service heading, explanation and actions form one group before the project image on mobile and beside it on desktop. Other service headers use the same paired grid. A section break uses spacing or a surface change; it does not add an automatic border above an already ruled list. FAQ and service-list rules remain only between items. Contact labels share the same inset across highlighted and ordinary rows. This supersedes earlier asymmetric-column and stagger directions below.

## September 18 clarity update (current homepage)

Websites are the primary offer. The hero groups the concrete headline, explanation, primary contact action and actual developer identity before the concept image on phones. Desktop keeps a two-column composition. The image has an explicit concept label, factual implementation evidence and a direct demo link.

The following sections are website scope/pricing, two selected concept projects with task and implementation, three collaboration steps, compact supporting services, the developer, native FAQ disclosures and a contextual contact action. Keep fictional work clearly labelled and avoid invented customer results.

Desktop navigation uses four direct destinations and a native disclosure for supporting services. Mobile groups these services below the main destinations. Contact offers an optional collapsed brief, direct channel drafts and a selectable clipboard fallback. The NFC flow restores only validated non-personal selections within the same tab for up to eight hours; the existing short language transfer remains separate.

The historical direction below remains relevant for palette, typography and assets; this section supersedes its earlier homepage order.

Mobile refinement: home/NFC hero actions fill the phone column with a 52px minimum height; shared button text is 16px with vertical padding for wrapped labels. Website package pairs share subgrid rows from tablet width to align comparisons and actions. An open mobile drawer releases the page when the desktop navigation takes over. Preserve native scrolling for wide comparison tables and expose a mobile scroll hint.

Direction: a photographic contact sheet and Swiss editorial portfolio. Work and people carry the identity; typography and spacing organise it. User rejected the pastel card system and electric blue; replace them throughout.

Home is a Persuade surface: clear offer with a large, honestly labelled concept image in the first viewport; a concise service directory; selected work; physical NFC products; the actual developer; contact. The cultural references are Swiss studio portfolios, architecture monographs and carefully edited photographic contact sheets. The selected system is the fourth of the grounded candidates considered (Swiss poster, architecture monograph, product catalogue, photographic contact sheet, studio journal, typographic index, exhibition guide). Instrument displays, marbling and underwater worlds were rejected as unrelated to the business; retain their discipline of consistent states, one material family and a legible sequence without borrowing their motifs.

Palette: existing warm white #f9f8f6, graphite #1a1a1a, warm stone #e9e5df, restrained muted text #676561. Dark sections reverse the ink/paper tokens. No saturated blue, pastel category coding, gradient text or coloured bullet points.

Typography: existing self-hosted Archivo. Display up to 6rem, -0.035em tracking, editorial sentence case. Main labels and control text remain readable. Uppercase reserved for small genuine metadata.

Shapes: open rows and editorial columns. Buttons use a small 4px corner, product cards preserve functional grouping. Avoid ornamental boxes and decorative icons.

Media: new 1536x1024 architecture-concept mockup generated from the existing concept, displayed with its concept label; actual portrait and existing product photography. Keep original 512px project images within their native size. No stock office pictures, invented clients or altered portrait.

Responsive: phone order is headline, concept image, concise explanation, actions. Two-column hero and asymmetric studio section on wide screens. Service rows stack content at 320px. 44px minimum controls. Real links and optional 3D retained.

References inspected: https://www.awwwards.com/sites/twks ; https://twks.ch/en ; https://www.awwwards.com/sites/studio-merge ; https://www.studio-merge.com/ ; https://www.awwwards.com/sites/little-plains . Borrow the use of meaningful project imagery and deliberate hierarchy, not their branding.
# Service-page refinement

September 7 mobile simplification: homepage introduction occupies at least the available viewport and grows naturally when needed. Two selected concept projects appear on the homepage, using 1536px editorial assets; the full project directory remains on Work. Mobile product photography comes before product copy. Header uses an icon-only, 44px menu trigger with an accessible name. Native FAQ disclosures reduce initial reading density while preserving all answers and keyboard operation. Website service introduction includes the labelled Archa visualization. Avoid repeating the developer biography on each service.

Service introductions use a 7:5 desktop split with the explanation, action and developer introduction grouped together. One rule closes the introduction. Four website packages form two pairs; a single offer uses two columns internally on desktop. Benefits and use cases use restrained lists. Warm stone closes service pages around the contact action. The dedicated contact page places actual destinations beside its introduction on desktop and underneath on mobile.

# Demo portfolio update

September 7: Falkenried Gruppe, Café Vogel, Steiner Handwerk and Salon Lumière replace the four placeholder projects. Use actual 1440×1000 viewport screenshots in their original colours, without device mockups or cropping. Project cards fill their grid columns. Homepage and website service page feature the Falkenried screenshot. Each detail page links to an explorable static demo; all remain clearly labelled concept projects.

Latest owner clarification: the Websites/NFC priority change applies only to navigation. Keep the existing homepage unchanged. Direct navigation contains Websites, NFC & QR, Work and Contact; More groups Online Presence, Automation and About.

## September 21 NFC and contact refinement
NFC uses the existing warm palette with an alpine lock-screen wallpaper. Product cards align closed title/description rows but expand their specifications independently. The film aligns with the right content edge and the hero actions have equal widths. Contact prioritises WhatsApp/email, groups phone/LinkedIn into a compact row, and reveals optional enquiry fields on demand (preselected service links open them). Preserve bilingual drafts and all existing contact destinations.

## September 24 — quieter introductions and NFC presentation
The latest owner refinement puts the Presence and Automation topic navigation directly beneath each page title. On desktop, this heading group sits beside the explanation, price context and a content-width enquiry button; on phones it comes before the explanation. Keep topic links wrapping naturally and retain their existing section targets.

The homepage opening uses one compact primary action, a quieter work link and a small personal byline. The headline and concept preview align at the top of their desktop columns; on phones the preview follows the introduction. Preserve the current Geist, white and navy system and the clearly labelled concept evidence.

The NFC animation uses a pale cool-grey stage, a fine border and restrained navy phone framing to fit the surrounding site. Product imagery and the fictional-profile label remain visible. Retain the existing tap-to-open story and reduced-motion behaviour; avoid adding decorative badges or a competing colour palette. These changes supersede the earlier full-width homepage action and warm NFC stage directions.

## September 30 — user-supplied homepage references (supersedes earlier homepage styling)
The homepage opening follows the supplied white/navy layouts: bold Geist headline, subdued blue-grey supporting copy, fine blue rules, a dark contact button and a two-part cream/green Falkenried preview. Desktop uses two equal columns and four service links in one row; mobile stacks the introduction and preview and uses a two-column service grid. The header on this page uses an inset rule, spaced wordmark, text contact link and labelled mobile menu. Below the links, an original decorative SVG landscape introduces a pale-blue service section. The garden photo is reused from the existing Falkenried demo and precompressed as WebP; the reference illustration is approximated with vector artwork rather than embedded as a screenshot. Keep controls accessible, text selectable, all destination links real and the concept label explicit. Subsequent sections keep existing content and prices. Local review before release.

## September 30 — site-wide consolidation (current owner brief)
Replace the homepage-only header variant with one shared header on every main-site route. Logo maximum 28px, desktop navigation 18px, inset border, text Contact link with SVG arrow and the existing native Services disclosure. Retain the labelled mobile drawer, focus management and language switching. Use the same content-width token for page sections, header and footer: max 86rem / 1376px, responsive gutters from 20px to 64px. Backgrounds span the viewport; the decorative landscape has a separate max 100rem / 1600px to avoid indefinite stretching. Homepage preview typography now responds to its own container width instead of screen width.
Palette tokens: ink #081b3c, muted #627198, rule #c7d3e7, pale surface #f2f5f9, primary action #081e40. Main titles 38–60px, weight 650; homepage retains its approved stronger hero. Section headings 30–42px, weight 600. Shared introductory padding and shorter adjoining-section gaps unify page rhythm. Pricing, forms, readable legal text and photographic evidence keep appropriate local widths. NFC showcase remains proportional independently of adjacent copy height. This supersedes the earlier homepage-only scope and historical header dimensions.

## September 30 — homepage sequence and NFC inquiry alignment
Use a single four-link service grid with quiet price labels. The landscape now introduces the pale project section, removing repetition before the examples. NFC inquiry uses a two-column grid: introduction above SaveContact on the left, contact channels spanning both rows on the right. Stack introduction, channels and save action on mobile; keep the detailed inquiry underneath.
## September 30 — approved SILVAN identity
Use the approved navy #081B3C / white SILVAN Digital Studio vectors, preserving their proportions and diagonal V cut. The header and mobile drawer use a compact full logo; the navy footer uses the white version. The tab and home-screen icons use the actual S outline. Share cards use the full logo and current homepage headline on white. The personal homepage section includes the supplied light-reflection film as a signature: under five seconds, silent, no loop, loaded only when viewed, with a matched still frame for fallback. Pause and replay controls remain readable and keyboard accessible. Reduced motion and data saving suppress automatic playback/download. Preserve the existing page hierarchy and the approved uncropped portrait.

## September 30 — full text and alignment audit (latest refinement)
The homepage illustration follows the introduction before the concept preview on phones, and spans both columns immediately below the introduction/preview on desktops. Use concise mobile introductory copy, 16px readable supporting text, a 48px primary action, and a compact byline. Desktop preserves the paired preview and its concept label while reducing the opening's height. The four services follow once, with the first text edge flush to the container.
NFC introduction owns one responsive grid with equal desktop columns and a 3rem gap. Copy, CTA and proportional film begin at the top; the film starts at the second column's left edge. Single-offer sections use flush text edges and tightly grouped features; remove the repeated Google benefits list. The About portrait and website hero preview begin at their respective column starts. Portfolio multi-line headings use 1.18 leading. Long service notes retain a 75ch reading measure.
The original logo film and matched poster keep their proportions and share the same 700x200 visible window within their 880x336 source. This removes the source's unused white border, aligning the actual wordmark with adjacent text. Existing pause/replay, reduced-motion and media-failure behavior remains.

October 1 follow-up: the accepted layout now uses a sequence-paced 12-second film (288 frames, 2,795,619 bytes). READY deployment dpl_FjQfrj2js5nRsmt7bxFqNR4ZSJuq is live at https://silvandigital.ch. All 16 Chromium/WebKit DE/EN live flows passed, including exact duration, playback, pause/resume, alignment, no overflow and enquiry; 30 retained routes return 200. See docs/audits/2026-10-01-nfc-video-pacing.md for the separate timing-change evidence.


## October 1 — quieter animation controls
Owner-approved follow-up: the NFC film has a 16px pause/play SVG in a 44px touch target, inset 8px at the bottom right of the video. The control has DE/EN accessible names, a tooltip and keyboard focus; caption and hero alignment remain unchanged. The homepage signature has no playback controls, plays once on view, pauses offscreen and resumes unfinished playback when visible. Reduced-motion/data-saving and error posters remain. This supersedes earlier below-film and homepage pause/replay descriptions. Evidence: docs/audits/2026-10-01-motion-controls.md.

## October 2 — session 4 decision-adjacent terms
Use the existing muted paragraph treatment above website package cards to state one-off versus ongoing costs and scope/content responsibilities. Keep the detailed explanation below for readers who need it. Announce German-only external demo destinations in each English action label, including workflow links. Preserve the approved typography, colors, motion and layout. Local QA evidence: docs/audits/2026-10-02-session-4.md.

## October 2 — refined opening with Spurwerk
The current Spurwerk screenshot is the main work sample. Align the desktop introduction and project at their top labels and bottom metadata; use the existing navy/white world, sharpen the screenshot and add one restrained image elevation. Consistent small SVG arrows identify service paths and respond briefly to pointer hover; reduced-motion removes transformations. Mobile keeps the meaningful order introduction/contact, four services, then labelled demo. Other homepage examples exclude the featured project to avoid repetition. No autoplay video, decorative loader or new dependency.

## 2026-10-02 — Approved navy homepage
User approved the supplied navy hero concept and explicitly requested implementation and production deployment. This supersedes the previous white opening and services-before-demo reading order. Keep a contact-first introduction, truthful Spurwerk desktop/mobile screenshots, fictional-demo label, four unchanged service prices and the existing village illustration. Use subtle transform-only hover feedback with reduced-motion support; preserve other pages and portrait.
