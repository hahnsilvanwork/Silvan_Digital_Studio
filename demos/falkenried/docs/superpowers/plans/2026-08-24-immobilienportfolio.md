# Immobilienportfolio Implementation Plan

**Goal:** Das dauerhafte Portfolio mit fünf verifizierten Liegenschaften getrennt von aktuellen Angeboten in DE und EN bereitstellen.

**Architecture:** Eine Astro Content Collection enthält sprachneutrale Fakten und lokalisierte Texte. Übersicht und dynamische Detailseiten lesen dieselben Datensätze. Bilder aus dem Projekt dienen vorläufig als klar bezeichnete Symbolbilder; Verfügbarkeit und Preise werden nicht erfunden.

**Tech Stack:** Astro 7 Content Collections, TypeScript, Node `node:test`, Tailwind CSS 4

### Task 1: Datenvertrag test-first

**Files:** `tests/property-portfolio.test.mjs`, `package.json`, `src/content.config.ts`, `src/content/properties/*.json`

- [ ] `test:portfolio` ergänzen und einen fehlschlagenden Test für exakt fünf eindeutige IDs/Slugs, DE-/EN-Texte, Adressen, Typen, Einheiten, Bildherkunft und Quellenstand schreiben.
- [ ] Collection-Schema und fünf JSON-Datensätze erstellen: Rotbuechstrasse 12/14, Rotbuechstrasse 7/7A, Boppelsen, Steinbruggstrasse 21, Musterweg 12.
- [ ] Sicherstellen, dass kein Datensatz Preis, freie Einheit oder Verfügbarkeit behauptet.
- [ ] `npm run test:portfolio` und `astro check` ausführen; committen.

### Task 2: Portfolio-Komponenten test-first

**Files:** `tests/property-portfolio.test.mjs`, `src/components/PortfolioCard.astro`, `src/components/PortfolioFilter.astro`, `src/data/property-images.ts`

- [ ] Vertrag für Links, Mehrfach-Typen, Query-Parameter, Leerzustand und Reset-Aktion zuerst fehlschlagen lassen.
- [ ] Premium-Hybrid-Karte mit Ort, Typen, Einheiten-Fakten und Symbolbild-Hinweis umsetzen.
- [ ] Clientfilter `?ort=` und `?typ=` synchronisieren, kombinieren und bei null Treffern einen zugänglichen Leerzustand zeigen.
- [ ] Tests und `astro check` ausführen; committen.

### Task 3: DE-/EN-Übersichten test-first

**Files:** `src/pages/immobilien/objekte/index.astro`, `src/pages/en/immobilien/objekte/index.astro`, `src/i18n/nav.ts`, Immobilien-Einstiegsseiten

- [ ] Seitenvertrag für beide Routen, fünf Karten, Navigation und klare Trennung von Portfolio/Angeboten schreiben und RED prüfen.
- [ ] Beide Übersichten aus `getCollection("properties")` rendern; Immobilien-Einstieg auf Portfolio und spätere Angebote verzweigen.
- [ ] Route-Mapping für korrekten Sprachwechsel ergänzen.
- [ ] Tests, `astro check` und Build ausführen; committen.

### Task 4: Zehn Detailseiten test-first

**Files:** `src/pages/immobilien/objekte/[slug].astro`, `src/pages/en/immobilien/objekte/[slug].astro`

- [ ] Vertrag für `getStaticPaths`, lokalisierte Inhalte, Faktenleiste, Ausstattung, Lage, Symbolbild-Kennzeichnung, Kartenlink und objektbezogene Anfrage schreiben und RED prüfen.
- [ ] DE-/EN-Detailtemplates implementieren; `ContactForm` erhält stabile `objectId` und jeweilige Detailseitenquelle.
- [ ] Keine aktuellen Angebote behaupten; CTA verweist transparent auf die folgende Angebots-Etappe.
- [ ] Tests, `astro check` und Build ausführen; committen.

### Task 5: Gesamtprüfung und Dokumentation

**Files:** `CONTENT-TODO.md`

- [ ] Portfolio als technisch umgesetzt dokumentieren; echte Objektfotografie und finale Inhaltsfreigabe offen lassen.
- [ ] `test:data`, `test:forms`, `test:portfolio`, Layouttest, `astro check`, Build und `git diff --check` ausführen.
- [ ] Übersicht und mindestens eine Detailseite in DE/EN auf Desktop-/Mobilbreite prüfen.
- [ ] Dokumentation committen und Vorschau unter `http://localhost:4321` laufend lassen.
