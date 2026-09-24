# Steiner Bau — product context

This folder owns a fictional German-language Swiss building-trades portfolio demo for SilvanDigital. It demonstrates how a local business around Zürich could explain its services and help a visitor formulate a project. It is not an operating contractor, booking service or source of customer references. Its design authority is scoped to this demo; it does not govern the parent website.

The page should persuade through understandable scope, appealing room ideas and a clear next step. The intended visitor is considering work at home and may not yet know the right service or materials. The four service areas are Renovationen, Malerarbeiten, Bodenbeläge, and Fassade & Aussen. The main anchor routes are Leistungen, Projektideen, Arbeitsweise and Kontakt, with a three-step process and FAQ supporting the decision.

## Core interaction

A service action carries its service into the enquiry. A project-idea action carries both its associated service and inspiration title. The visitor can change the service, remove the inspiration, or choose “Noch offen”. Existing draft text survives a changed selection; an existing review returns to editing.

The form collects required name, email and project description, plus optional location and timeframe. It trims values, validates required fields and email shape, and enforces limits of 100/254/2000/150/150 characters respectively. Errors are attached to fields and focus moves to the first invalid field. “Angaben prüfen” opens a local summary; “Angaben ändern” restores editing; “Angaben löschen” clears both the draft and selection.

There is no submission endpoint, email delivery, browser-storage persistence or booking. Data lives only in the open page's React state. The form requests example data, labels the review as unsent, and remains disabled before hydration or without JavaScript. Reloading discards the draft. Ordinary navigation and native disclosures remain available without JavaScript.

## Truth and accessibility

The banner, project introduction, image captions, enquiry and footer identify the fictional context. The new opening image (`public/hero-zuhause.webp`) is AI-generated and explicitly captioned “KI-Gestaltungsidee · kein Kundenprojekt”. Existing local gallery and craft assets remain illustrative; none are claimed completed customer work. No prices, testimonials or invented credentials supply false proof. External SilvanDigital links connect the demonstration to the real studio portfolio and contact page.

The document language is German. Metadata specifies `noindex, nofollow`. Local fonts avoid a remote font dependency. The implementation includes a skip link, visible focus, labelled controls, keyboard-operable native disclosures, responsive navigation, accessible error feedback and reduced-motion support.

## Presentation contract

The chosen code-led visual direction is a Swiss architecture exhibition: limestone, forest green, sage, regular Barlow and large room imagery. The revised opening places “Aus Räumen wird Zuhause.” and its actions on a forest plane beside a warm furnished-room illustration, full bleed in a 42%/58% desktop composition. The primary action leads to the enquiry and the secondary link to project ideas. At 700px and below, compact copy and photo stack so the image begins within the reviewed mobile first viewport. Navigation still changes at 900px; lower-page grids stack at 600px. Craft imagery appears later to explain the approach. Exact tokens and responsive behavior are recorded in `DESIGN.md`.

This record includes the replacement opening following a fresh hero review disposition of “ship” with no material defects reported. Deployment evidence and operational checks belong in the repository's release records, not in this product description.
