# SILVAN Digital Studio Website Design Specification

## 1. Purpose and success criteria

Build a production-ready bilingual personal business website for **SILVAN — Digital Studio**, operated by Silvan Hahn in Switzerland. The website is simultaneously a service website, portfolio, digital business card, sales presentation, NFC destination, and referral link.

The finished product must make five questions answerable within a short mobile visit:

1. Who is Silvan?
2. Which digital services does he provide?
3. What does each service roughly cost?
4. What evidence of design and development quality is available?
5. How can a prospective customer contact him immediately?

Usability and the 320–480px experience take priority. The 390px viewport is the primary design reference; 1440px is the primary desktop reference. Tablet and wide desktop receive intentional compositions rather than enlarged mobile layouts.

## 2. Brand and visual direction

The visible brand is **SILVAN**, with **Digital Studio** as its descriptor. The public identity is Silvan Hahn, Switzerland. The design retains the supplied Swiss editorial direction:

- warm off-white paper-like background;
- near-black typography and surfaces;
- electric blue used sparingly for focus, active states, and priority actions;
- large neo-grotesk display typography;
- small technical labels;
- hairline rules, asymmetric grids, strong alignment, and generous negative space;
- flat layers without decorative shadows or generic card grids;
- square or subtly softened geometry;
- restrained motion that supports hierarchy rather than delaying access.

The top-level German hero uses:

- service line: **Websites · Google Reviews · Online-Präsenz · Automation**;
- headline: **Mehr Kunden. Weniger Aufwand.**;
- supporting message: **Ich entwickle digitale Lösungen, die Ihr Unternehmen sichtbar machen und wiederkehrende Arbeit reduzieren.**

German copy addresses visitors formally with **Sie**. The English version conveys the same meaning naturally rather than translating word-for-word.

Navigation uses the SILVAN wordmark. The supplied monogram artwork can support the favicon and social identity after it is prepared as an optimized asset. The supplied raster wordmark screenshot is not used as large navigation text.

## 3. Information architecture and localization

German is the default language. English mirrors the same structure under `/en`.

| German/default route | English route | Purpose |
| --- | --- | --- |
| `/` | `/en` | Service selection, proof, pricing cues, personal trust, direct contact |
| `/websites` | `/en/websites` | Website offer, portfolio examples, price tiers, process, contact |
| `/reviews` | `/en/reviews` | NFC products, prices, process, configurator, WhatsApp inquiry |
| `/presence` | `/en/presence` | Google Business Profile, local visibility, consistent profiles |
| `/automation` | `/en/automation` | Practical internal email, reporting, and workflow automation |
| `/work` | `/en/work` | Data-driven portfolio index |
| `/work/[project]` | `/en/work/[project]` | Reusable project detail layout |
| `/about` | `/en/about` | Silvan's identity, approach, values, and portrait |
| `/contact` | `/en/contact` | Direct WhatsApp, email, telephone, and LinkedIn actions |
| `/hello` | `/en/hello` | Thumb-friendly NFC digital-card launchpad |

The language switcher retains the equivalent route and project slug when possible. Localized content comes from typed dictionaries with the same key structure, preventing structural drift. Navigation labels, metadata, image descriptions, validation messages, and 404 content are localized.

## 4. Critical mobile journeys

### Review Card lead

Home or `/hello` → Google Reviews → prices and explanation → Tap/Open/Review → configurator → WhatsApp.

All product prices appear together before long-form content:

- NFC Review Card including programming/setup: CHF 49;
- NFC Stand: CHF 69;
- two cards: CHF 80;
- larger quantities: quantity discounts available.

### Website lead

Home or `/hello` → Websites → examples → price tiers → process → WhatsApp or email.

The tiers are:

- Simple Info Website: CHF 300–699;
- Standard Business Website: CHF 700–1,999;
- Premium Large Website: CHF 2,000–4,999;
- Custom Large Project: from CHF 5,000.

### Unsure business owner

The home service chooser explains Online Presence as the route for a business that is difficult to find or inconsistently represented online. `/presence` explains Google Business Profile setup and optimization, local visibility, consistent business information, and basic profile setup from CHF 249.

### Referral and NFC visitor

The homepage and `/hello` expose services, work, About, approximate pricing, and contact without requiring exploration of unrelated content. `/hello` uses especially large row targets and direct WhatsApp, phone, and email actions.

## 5. Page designs

### Home

The mobile hero shows a compact service line, the approved benefit-led headline, a direct supporting sentence, and two clear actions. A ruled service list follows immediately with starting prices. Selected work, the one-person studio story, and direct contact follow in that order. Desktop expands into an asymmetric editorial grid with a full navigation row and immersive project imagery.

### Websites

The first viewport identifies the service and overall CHF 300–5,000+ range. The four service levels remain visible and expandable for concise scope explanations. Portfolio examples appear before or near the process so visitors can verify quality quickly. The page ends with direct inquiry actions.

### Google Reviews

The first mobile viewport explains the product, shows real product imagery supplied as `img.png` and `img_1.png`, exposes prices, and offers **Unverbindlich anfragen**. The process uses exactly:

1. **TAP** — Customer taps the NFC card or stand.
2. **OPEN** — The Google review page opens.
3. **REVIEW** — The customer leaves genuine feedback.

No copy instructs or implies that customers must leave five-star reviews.

### Online Presence

The page diagnoses common discoverability problems in plain language, shows the included service areas, states the starting price, explains the working process, and ends in direct contact. It avoids unprovable ranking guarantees.

### Automation

The page focuses on internal tasks that currently consume time, including recurring emails, reporting, information transfer, and repeatable operational workflows. It explains discovery, feasibility assessment, implementation, and handover. It does not present speculative integrations as already available.

### Work and project detail

Portfolio data supports title, localized description, category, year, image, services, project type, optional URL, optional case-study sections, and status. Archa, Lumen, ArchiTech Studio, and Vanguard Apparel remain visible as **placeholder concepts** until real projects are supplied. They are never described as paid client work.

Project detail pages use a reusable sequence: hero, project information, challenge, approach, result or intended outcome, screenshots, mobile views, and next project. Placeholder concepts use wording that makes hypothetical outcomes explicit.

### About

The page introduces Silvan Hahn as an independent digital developer in Switzerland. It emphasizes direct collaboration, clear design, maintainable development, and practical outcomes. A documented asset path accepts a future real portrait without requiring component changes; the temporary visual is explicitly replaceable and is not presented as a photograph of Silvan.

### Contact

There is no contact form. The page prioritizes direct contact and contains:

- email: `hahn.silvan.work@gmail.com`;
- telephone display: `078 900 85 00`;
- telephone link: `tel:+41789008500`;
- WhatsApp number: `+41789008500`;
- LinkedIn: `https://www.linkedin.com/in/silvan-hahn-dev`.

Email and WhatsApp are primary actions. Phone and LinkedIn remain easy to discover.

### Hello

The personal NFC landing page is a minimal action hub with routes to Websites, Google Reviews, Online Presence, Work, About, and Contact. Automation remains available in the full menu. Direct WhatsApp, phone, and email actions appear without extra navigation.

## 6. Review Card inquiry configurator

The Review Card CTA opens a short, mobile-friendly configurator. It collects:

- product: NFC Card or NFC Stand;
- quantity;
- color or available variant;
- business name;
- contact person;
- Google Business Profile or direct review URL;
- street;
- postal code;
- city;
- optional note.

Required fields use accessible labels and inline error descriptions. Failed validation focuses the first invalid field and preserves all values. Submitted data remains in the browser, is not stored by the website, and is encoded into a readable WhatsApp message to `+41789008500`.

The interface and generated message state that this is a **non-binding inquiry**. It becomes binding only after Silvan personally confirms it. The site does not accept payment or claim an order was placed.

## 7. Technical architecture

Use Next.js App Router and TypeScript. Render pages statically wherever possible. Interactive client code is limited to the mobile menu, language switching where navigation needs client behavior, restrained reveals, and the Review Card configurator.

Typed content and portfolio data are separated from page composition. Shared components include Navigation, MobileMenu, Footer, Button, ServiceLink, PriceDisplay, ProjectPreview, ProjectHero, ProcessStep, ContactActions, NFCProductVisual, SectionHeading, LanguageSwitcher, and ReviewInquiryConfigurator. Components remain concrete; visual fragments are abstracted only when reuse improves consistency.

No global state library is introduced. Navigation and configurator state stay local. No backend, database, authentication, analytics, or contact-form service is required.

The NFC product presentation uses the supplied real imagery with lightweight CSS depth or motion. A continuous Three.js render loop is excluded because it adds weight without improving product understanding. Reduced-motion preferences remove optional movement.

## 8. Responsive behavior and accessibility

Base styles target 320px and progressively enhance with a small min-width breakpoint system around 768px, 1024px, 1280px, and 1536px. Fluid typography and spacing use `clamp()`. Layout uses Grid, Flexbox, and container-aware components rather than fixed desktop widths.

Mobile controls are at least 44px tall. Pricing never depends on hover. Navigation uses semantic links and buttons, visible focus, Escape-to-close, focus trapping, focus restoration, background inertness, and body scroll locking. Fixed elements account for safe-area insets and modern `dvh`/`svh` behavior. No essential interaction depends on hover, animation, or pointer precision.

Images preserve aspect ratio and reserve layout space. Below-the-fold images lazy-load. Text maintains a minimum 1rem body size and readable line lengths. Semantic landmarks and heading levels remain consistent.

## 9. SEO, metadata, and performance

Every page has a unique localized title and description, semantic indexable copy, Open Graph and X metadata, and language alternates. Project pages derive metadata from project records. `sitemap.xml` and `robots.txt` cover both languages.

The production canonical base comes from one validated environment value once a domain exists. Local and temporary builds do not publish an invented production domain. Structured data uses `Person` and valid service information only; it contains no fabricated reviews, ratings, addresses, or business claims.

Framework image optimization, responsive source sizes, modern formats, font subsetting, static rendering, route-level code splitting, and minimal third-party code protect LCP, CLS, and INP. Only critical assets are preloaded.

## 10. Error handling and quality assurance

Unknown routes and project slugs render localized 404 experiences with routes back to Work and Contact. Missing optional project imagery has a controlled visual fallback. Configurator validation is specific and recoverable. External contact links use correct URI formats and safe link behavior.

Verification includes:

- production build, TypeScript, and configured linting;
- unit tests for localized routes, portfolio data, WhatsApp message generation, and validation;
- browser tests for navigation, focus behavior, language switching, configurator errors, and contact links;
- visual review at 320, 375, 390, 430, 768, 1024, 1280, 1440, and 1920px;
- overflow, cropping, tap-target, reduced-motion, keyboard, and iOS viewport checks;
- final persona walkthroughs for Review Card leads, Website leads, unsure owners, referrals, and mobile NFC visitors.

The implementation is complete only when all routes build, interactions work, no dead CTA remains, and the actual rendered application passes mobile and desktop visual review.
