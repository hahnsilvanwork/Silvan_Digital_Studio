# Startseite Logo, Video und Kundenstimmen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Logo, klickgeschütztes Unternehmensvideo, drei Kundenstimmen und gleichmässig zentrierte FAQ-Tabs umsetzen.

**Architecture:** Lokale Bildassets werden über Astro optimiert. Eine fokussierte Video-Komponente rendert zunächst nur Vorschau und externen Fallback-Link und erzeugt den `youtube-nocookie.com`-Iframe erst nach Klick. Ein statischer Vertrag schützt alle vier Anforderungen und die bestehende Header-Zentrierung.

**Tech Stack:** Astro 7, TypeScript, Node `node:test`, Tailwind CSS 4

---

### Task 1: Medien- und Layoutvertrag RED

**Files:**
- Create: `tests/home-media-layout.test.mjs`
- Modify: `package.json`

- [ ] Testskript `test:home-media` mit `node --test tests/home-media-layout.test.mjs` ergänzen.
- [ ] Test schreiben, der in `Header.astro` einen Logo-Import, `<Image>` und den Alt-Text `Falkenried Gruppe – Startseite` verlangt.
- [ ] Test schreiben, der eine `VideoPreview.astro` mit `youtube-nocookie.com`, Video-ID `NEg-SNOsgyk`, Klick-Handler und Fallback-Link verlangt.
- [ ] Test schreiben, der auf DE/EN alle drei Namen und Originalzitate sowie ein `md:grid-cols-3`-Layout verlangt.
- [ ] Test schreiben, der in `FaqTabs.astro` `justify-center`, `md:grid-cols-3` und zentrierte Tabs verlangt.
- [ ] `npm run test:home-media` ausführen; erwartetes Ergebnis: FAIL wegen fehlender Implementierung.

### Task 2: Logo und Video GREEN

**Files:**
- Create: `src/assets/images/brand/falkenried-logo.png`
- Create: `src/assets/images/home/company-video-preview.jpg`
- Create: `src/components/VideoPreview.astro`
- Modify: `src/components/Header.astro`

- [ ] Bereitgestelltes Logo unverändert nach `src/assets/images/brand/falkenried-logo.png` kopieren.
- [ ] Offizielles YouTube-Maxres-Vorschaubild lokal als `company-video-preview.jpg` speichern; falls Maxres nicht vorhanden ist, `hqdefault.jpg` verwenden.
- [ ] Header-Text durch Astro-`Image` mit proportionaler Höhe `h-10 lg:h-12`, `w-auto` und unveränderter Gridstruktur ersetzen.
- [ ] `VideoPreview` mit lokalem Bild, zugänglicher Play-Schaltfläche, `<noscript>`-Link und Klick-Erzeugung eines Iframes mit `https://www.youtube-nocookie.com/embed/NEg-SNOsgyk?autoplay=1` erstellen.
- [ ] `npm run test:home-media` ausführen; Logo-/Videotests müssen PASS sein.

### Task 3: Kundenstimmen und FAQ GREEN

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/en/index.astro`
- Modify: `src/components/FaqTabs.astro`

- [ ] Auf beiden Startseiten nach den Bereichskarten `VideoPreview` einfügen.
- [ ] Darunter drei `<Testimonial>` in `grid grid-cols-1 md:grid-cols-3` mit den unveränderten Zitaten und Ortsangaben rendern; EN kennzeichnet sie als deutsche Originalzitate.
- [ ] FAQ-Tabliste auf `grid grid-cols-1 md:grid-cols-3` umstellen; Buttons erhalten `w-full text-center`.
- [ ] `npm run test:home-media`, Layouttest und `astro check` ausführen; alle müssen PASS sein.
- [ ] Änderungen mit `feat: add homepage video testimonials and brand logo` committen.

### Task 4: Vollständige Abnahme

**Files:**
- Modify: `CONTENT-TODO.md`

- [ ] Logo-/Video-Herkunft und Kundenstimmen als integriert dokumentieren.
- [ ] `test:data`, `test:forms`, `test:portfolio`, `test:home-media`, Layouttest, `astro check`, Build und `git diff --check` ausführen.
- [ ] `/`, `/en/`, `/faq/` und `/en/faq/` im laufenden Server auf HTTP 200 und erwartete Inhalte prüfen.
- [ ] Dokumentation committen; `http://localhost:4321` weiterlaufen lassen.
