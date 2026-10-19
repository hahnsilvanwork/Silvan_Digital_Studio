# SILVAN Digital Studio

## October 19 — subpages slimmed and live

After approving the calmer, livelier homepage the owner asked for the same treatment on all other pages and an explicit production deploy. Service pages now carry shorter leads, one-line process steps, prices without long feature lists and a closing phone call; no new claims were added. Production deploy on 2026-10-19, live at https://silvandigital.ch (all routes 200, no console errors). Changes are not yet committed; E2E tests encoding older layouts still need updating.

## October 19 — all subpages aligned with the approved homepage (local, current)

The owner approved the homepage and asked for every other page to follow it. Websites, Google-Unternehmensprofil, NFC- und QR-Karten and Automationen now open with the same navy block as the homepage (eyebrow, two-sentence headline, plain-language lead, free consultation or card enquiry plus phone, two facts, drawn horizon, byline) and continue with the shared sections: ruled lists, three-step process (free consultation, fixed-price quote, build), price band with annual-cost or delivery note, examples, FAQ with phone hint and the contact band. Contact, About, Examples, example details and /hello use a white page head on the same column split. Naming is unified everywhere (navigation, footer, mobile menu, /hello): Websites, Google-Unternehmensprofil, NFC- und QR-Karten, Automationen. German pages show 078 900 85 00, English pages +41 78 900 85 00. "Ausland" was removed site-wide; the region is Boppelsen near Zurich, for businesses across Switzerland. The contact page opens the optional enquiry by default. No new claims beyond the approved facts; NFC delivery times were not stated because they are unconfirmed. Final pass: section heads and white page heads are top-aligned (title and intro share one top line), price headings start on the first price row, the example evidence grid sits on the shared split, and a full DE/EN copy review removed outcome promises ("mehr Bewertungen" became "Google-Bewertungen mit einem Antippen"), unified service names in structured data and forms, and says demos let visitors prepare (not send) an enquiry. All 471 unit tests and the production build pass. E2E tests that encode the previous layouts still need updating.

## October 19 — customer-first homepage redesign (local, current)

The owner requested a complete rewrite of homepage copy and presentation from the customer's perspective: older, non-technical small-business owners on phones must understand immediately what is offered, what it costs and how to start. Other pages follow later. Owner decisions: keep and refine the existing navy/Geist design language (three new visual directions rejected as generic), navy logo unchanged, all four services equal. Approved claims: reply within 24 hours, free first consultation, fixed price in the written quote, a compact website online in about 2–4 weeks once content is ready. Prices include VAT; annual address/hosting costs depend on size and wishes and are stated in the quote, without a number on the page. Region: Boppelsen near Zurich, for businesses across Switzerland. No real references; demos stay labelled as fictional. Preferred contact: phone, email/form.

Homepage order: navy welcome block (headline “Mehr Kunden über das Internet. Weniger Büroarbeit.”, free consultation and direct phone call, three facts, Spurwerk preview, byline with portrait), four services with plain-language explanation and price (replaces the duplicated price list), village illustration, three-step process, website packages with annual-cost note, Café Vogel and Salon Lumière examples, about, FAQ, contact. Phones get a call/enquiry bar after the hero. After an independent review: hero facts lead with “Websites ab CHF 300 inkl. MWST”; review cards state they can be ordered without a website; automation uses the existing list/weekly-report examples; the about signature is reduced to 11rem; homepage muted text uses #46557A for older readers. Open for later pages: footer service labels, phone notation (078 vs +41) and contact-option styling site-wide. Spec: docs/superpowers/specs/2026-10-19-homepage-redesign-design.md. Not deployed.

## October 9 — welcome-screen correction (local)

Owner reviewed the compact homepage screenshot and explicitly requested a larger blue welcome screen, with “Was kann ich für Sie tun?” farther down. Prioritise a full desktop first-screen introduction over showing the service overview in the first viewport. Existing wording, prices, links and previews remain. This supersedes the earlier compact-height/two-line-title requirement. Local preview only.

## October 9 — clearer homepage and navigation (local)

Owner supplied exact homepage wording and requested direct local implementation. Lead with “Ihr Partner für Webseiten & digitale Lösungen.”, the supplied small-business introduction and four bold-led benefits. Preserve the existing Spurwerk desktop/mobile preview, contact and work destinations, service links, prices and other content. Navigation is Services, Examples, Prices, About me, Contact, DE/EN; German service labels are Webseiten, Bei Google gefunden werden, NFC & QR, Abläufe vereinfachen. Prices links to the bilingual homepage #prices overview using existing service prices, with domain, hosting and agreed maintenance charged separately. No deployment requested. Verification: docs/audits/2026-10-09-home-navigation.md.

## October 2 — Session 3 contact-first refinement (local)

Owner approved the Session 2 concept and requested local implementation. Contact is the primary homepage action; choosing a service is optional. Only clearly labelled fictional demos are available as project evidence. Real commissions are in progress but no project information or photos are available for use.

The homepage retains its identity and headline, adds concise bilingual positioning and contact reassurance, places the four existing service links before the demo on mobile, and displays an actual localized Falkenried website screenshot. The village follows the meaningful content on mobile. Existing prices, routes, portrait, direct contact destinations, NFC flow and demo brands remain.

General contact keeps its optional preparation and existing external channels, with email/WhatsApp draft actions directly after the brief, visible selection context, clipboard fallback and truthful external-send messaging. No backend sender or new storage of personal details. Price/catalogue and other page-topic destination headings are immediately readable. See docs/audits/2026-10-02-session-3.md for verification and limits. No production deployment is authorized by this local implementation request.

## October 1 — return to production and replace NFC hero film
The owner withdraws NFC 2 and requests the last deployed website, with only the existing NFC hero animation replaced by the supplied card film at a faster speed. The October 1 production release is explicitly authorised. `/nfc-2` and `/en/nfc-2`, their media, navigation entries and sitemap entries are removed. The source baseline is deployment `dpl_Cp4jLY7wzKLPoyH2BGPBiRWWPUhu` from September 30, rather than the older Git HEAD.

Keep the existing DE/EN pages, catalogue, prices, inquiry, contact and independent demos. The card film replaces the motion design at `/reviews` and `/en/reviews`: a silent 12-second loop with sequence-specific speed changes, with pause/resume, the complete landscape frame and a static poster for reduced motion, data saving, unavailable video or JavaScript. Align the film with the existing introduction and shared gutters; no new scroll page or whole-page animation.

October 1 alignment follow-up: the owner's latest homepage screenshot supersedes the preceding NFC compositions and authorises matching its balanced two-column hero. From 1200px, keep the complete unchanged title, introduction and actions inside the left column, aligned at the top and action bottom with the complete film stage on the right. Two equal columns share upper and metadata rows through subgrid, with 48px between columns and 16px between rows; the price note is centered alongside the caption and 44px-minimum playback control. Use a fluid 40–60px title and 17–20px/1.55 intro, compact 20px upper-group gaps and only residual space before actions. Let the stage grow with taller text while contain fitting preserves the full 16:9 12-second source. Below 1200px, preserve visual order title, intro, price, actions, film, mobile typography and full shared film width. All copy, models, prices and inquiry behavior remain. Fresh review opened all 16 DE/EN captures and resolved all four material fixes, with disposition ship for the bounded hero correction. Build/types, hardening/scoped ESLint, detector `[]` and zero-missing-asset provenance passed; the initial 108 browser checks had 107 passes and one WebKit early-click catalogue failure, whose corrected network-idle wait passed three consecutive reruns of that case. Production is READY and all 16 live browser flows passed; release evidence is recorded in docs/audits/2026-10-01-nfc-home-reference.md.

## September 30 — complete layout audit and authorised release (current)
The owner requests a complete desktop/mobile review of text, alignment and design, implementation of the findings, and immediate production deployment of the latest website. This explicitly supersedes earlier local-only review gates for the current work. Prioritise the NFC introduction, the Google offer, optical alignment of the supplied logo film, and seeing the village illustration on the first homepage screen. Keep the existing identity, prices, contact destinations, DE/EN content and independent demo identities. Review real screenshots and verify the deployed changed flows.

## September 30 — approved logo and supplied animation
The owner supplies the SILVAN Digital Studio wordmark with its cut in the V and a six-second logo film. Integrate the approved clean navy/white vector exports in the shared header, mobile drawer, footer, browser icons, share cards and business schema. Keep the independent demo brands. The homepage personal section gets one short, silent, on-view signature animation with pause/replay controls; default to a static image for reduced motion, data saving or failed playback. Preserve the approved content, imagery, routes and behaviour. Keep this iteration running locally for the owner's approval before deployment.

## September 30 — bilingual copy and service area
The owner requests a complete text review of the main website and all four independent demos. Main website and Falkenried remain DE/EN; Café Vogel, Steiner Bau and Salon Lumière remain German only. Use clear, warm, professional customer language, Swiss spelling and formal Sie in German, and natural British English. Many readers are older business owners without technical experience. Zurich is the studio location, not a service boundary: Silvan accepts projects from Switzerland and abroad, with conversations by phone, email or video and personal meetings by arrangement. Direct guest Wi-Fi access through NFC/QR is offered with setup agreed individually; distinguish it from the web-link enquiry flow. Preserve prices, destinations, functionality, brand identities and honest concept labels. This text revision is local and is not authorised for publication.


## September 23 — current owner brief
Most visitors use phones and many are older business owners with little technical experience. Make the four services understandable through everyday examples, keep the labelled mobile menu and its emphasized Contact entry, and expose saving Silvan’s contact with clear instructions. Navigation: Services (all four), Work, Studio, Contact; languages remain available. The owner approved proceeding with the audited header/hero redesign. The preferred H1 is “Ihr digitaler Auftritt. Direkt aus einer Hand.” and primary CTA “Projekt besprechen”. Prices, routes, bilingual inquiry logic and genuine concept evidence remain. This supersedes conflicting historical positioning/navigation below. This iteration is local; no new deployment is requested.


## September 19 owner correction (current)
The company offers online presence as a whole. The homepage introduces websites, NFC & QR, local Google visibility and automation as equal entry points. Website priority applies to navigation only. Keep the homepage concise; scope, pricing, processes and detailed examples belong on the respective service/project pages. Mobile needs readable typography, short introductions and clear topic navigation. Owner approved the reviewed local website for GitHub push and Vercel production deployment on September 21.

<!-- impeccable:product-schema 1 -->

## Platform
Web. Existing Next.js/React website, German and English.

## Users
Swiss small-business owners evaluating websites, NFC/QR products, online presence and automation. This audience is stated by the existing site copy. The owner explicitly says most visitors will use phones.

## Product Purpose
Explain the offer quickly, demonstrate Silvan's design and development skills, and make direct contact easy.

September 18 priority: lead with websites for small businesses; present NFC/QR, local presence and automation as complementary services. Show concrete working concept examples, scope and prices, the collaboration process and the person responsible. Preserve service/package context in contact drafts. Personal contact text is not automatically persisted; NFC reload restoration is restricted to validated non-personal choices in session storage.

## Capabilities and Constraints
Preserve existing routes, prices, bilingual content, contact destinations, product filtering and optional 3D viewing. User authorized production deployment on September 7 after local review and changing the contact email to hahn.silvan.work@gmail.com. No fabricated clients, testimonials or performance claims.

## Brand Commitments
SILVAN, independent developer Silvan Hahn in Boppelsen near Zurich. User rejected generic pastel cards and saturated blue accents and delegates a new, professional image-led design informed by Awwwards.

## Evidence on Hand
Approved portrait in public/images/portrait; product imagery in public/images/products; four implemented and clearly labelled fictional demo websites in src/content/projects.ts. Actual 1440 by 1000 browser screenshots replace the previous placeholders. Demo exports are served from public/demos.

## Product Principles
Mobile usability first. Make services and next actions understandable. Imagery must explain the work. Preserve factual honesty. User has delegated design decisions in the current request.

Owner clarification: Websites and NFC must be direct navigation entries; Online Presence, Automation and About belong under More. This request does not authorize a homepage redesign.

## September 30 — supplied desktop and mobile homepage references
The owner supplied two visual references and requested analysis, implementation and local review before deployment. The opening now leads with “Ihr Betrieb. Digital gut aufgestellt.”, the plain-language website/Google/automation explanation and “Kontakt aufnehmen”. Use a two-column desktop introduction and a single mobile column, compact developer byline, labelled Falkenried concept preview, four linked service entry points and a decorative village landscape. Preserve existing service prices, remaining page sections, inquiry flows and German/English routes. Deployment requires the owner's review of this local iteration.

## September 30 — consistent design across the main website
The owner requests applying the approved homepage design throughout SilvanDigital, including identical headers, consistent sizing and clear wide-screen behavior. Main content, header rule and footer share one 86rem (1376px) maximum width with responsive gutters. Background bands remain full width; the homepage landscape is centered and capped at 100rem (1600px). Use one shared navy/blue-grey palette, title/heading scale and introductory spacing across service, portfolio/detail, about, contact, hello and legal pages in DE/EN. Preserve prices, inquiry functionality, product selection, contact destinations and independent demo brands. Local preview remains the review gate; no publication is authorized yet.

## September 30 — one service overview and clearer NFC contact
The homepage now has one compact service overview, including existing starting prices, followed directly by projects. Remove the repeated long service directory; retain the services anchor and all four destination links. On the NFC page, place the explanation and save-contact action together in the left desktop column, alongside the contact channels. Mobile order is explanation, contact channels, save contact, then the detailed inquiry. Preserve pricing and inquiry behavior. Review locally before publishing.

October 1 follow-up: the accepted layout now uses a sequence-paced 12-second film (288 frames, 2,795,619 bytes). READY deployment dpl_FjQfrj2js5nRsmt7bxFqNR4ZSJuq is live at https://silvandigital.ch. All 16 Chromium/WebKit DE/EN live flows passed, including exact duration, playback, pause/resume, alignment, no overflow and enquiry; 30 retained routes return 200. See docs/audits/2026-10-01-nfc-video-pacing.md for the separate timing-change evidence.


## October 1 — quieter animation controls
Owner-approved follow-up: the NFC film has a 16px pause/play SVG in a 44px touch target, inset 8px at the bottom right of the video. The control has DE/EN accessible names, a tooltip and keyboard focus; caption and hero alignment remain unchanged. The homepage signature has no playback controls, plays once on view, pauses offscreen and resumes unfinished playback when visible. Reduced-motion/data-saving and error posters remain. This supersedes earlier below-film and homepage pause/replay descriptions. Evidence: docs/audits/2026-10-01-motion-controls.md.

## October 2 — session 4 decision clarity and content QA
The bilingual copy audit retains the complete online-presence positioning and fictional-demo truth. /hello exposes all four services. Website prices are accompanied by a short separate-cost/scope/content-responsibility statement before the first package action; fuller details remain below. Every English project workflow link to a German-only demo announces that language directly. No prices, service commitments or hosting contracts changed. Local verification and outstanding customer/device/performance gates: docs/audits/2026-10-02-session-4.md. Not deployed.

## October 2 — Spurwerk portfolio replacement and homepage finish
The owner requests replacing the Steiner construction demo across the public portfolio with the independently hosted Spurwerk Veloatelier concept and explicitly authorises production deployment after verification. Feature Spurwerk in the homepage opening; retain Falkenried, Café Vogel and Salon Lumière elsewhere. Real screenshots, bilingual explanations and fictional-demo labels remain mandatory; Spurwerk itself is German-only. Preserve incoming Steiner profile links through permanent redirects. Keep the contact-first mobile sequence, four services, approved portrait, existing prices and contact flows.

## 2026-10-02 — Approved navy homepage
User approved the supplied navy hero concept and explicitly requested implementation and production deployment. This supersedes the previous white opening and services-before-demo reading order. Keep a contact-first introduction, truthful Spurwerk desktop/mobile screenshots, fictional-demo label, four unchanged service prices and the existing village illustration. Use subtle transform-only hover feedback with reduced-motion support; preserve other pages and portrait.
