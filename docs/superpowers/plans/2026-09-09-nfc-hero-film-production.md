# NFC Hero Film Production Plan

> Umsetzung sequenziell in diesem Task. Produktionsmethode vom Nutzer gewählt: Higgsfield. Das Konzept wurde zur Ausarbeitung und Umsetzung freigegeben.

**Goal:** Einen überprüften, verständlichen NFC-Produktfilm als hochwertigen Website-Einstieg liefern.

**Architecture:** Ein zusammenhängender KI-Film aus überprüften Produktreferenzen, danach getrennte Webexporte und ein zugänglicher Video-Hero. Die Website-Texte bleiben HTML.

**Tech Stack:** Higgsfield über bestätigte Verbindung; bestehendes Next.js/React-Projekt für Einbindung. Keine Ersatzproduktion mit lokalem Rendering ohne neue Nutzerentscheidung.

## 1. Vorproduktion

- [x] Live-NFC-Seite, lokale Hero-Komponente und Originalbilder prüfen.
- [x] Tatsächlichen NFC-Ablauf, Videoperformance und Bewegungseinstellungen recherchieren.
- [x] Zeitplan, Identitätsreferenzen und Qualitätskriterien in der zugehörigen Spezifikation festhalten.
- [x] Visuelle Entwurfstafel erzeugen und ausdrücklich als Konzept prüfen, nicht als fertigen Film behandeln. V1/V2 dokumentieren die frühere Fassung.
- [x] Neue Nutzervorgabe in Prompt und Spezifikation übernehmen: fünf Anwendungen aus identischem Blickwinkel; Originalbilder für Menü, Google, Instagram, Facebook und Airbnb prüfen.

## 2. Verbindung und Auftrag

- [x] Higgsfield-Installation/Aktivierung bestätigt; Nutzer bestätigt Konto-Verbindung. Toolangebot erneut geprüft.
- [ ] Higgsfield-Generierungswerkzeuge müssen im Task verfügbar werden; aktuell nicht aufrufbar.
- [ ] Erreichbare Modelle und Schemas für Dauer, Referenzrollen, Audio, Auflösung und Seitenverhältnis lesen.
- [ ] Guthaben/Kosten ausschliesslich lesend prüfen und bei bezahlter Generierung konkreten Rahmen klären.
- [ ] Referenzen entsprechend Schema hochladen; reale IDs protokollieren.
- [ ] Den vollständigen Prompt aus `docs/video/nfc-hero/full-film-prompt.txt` in einem Auftrag übermitteln.
- [ ] Modell, Einstellungen, Prompt-Hash, Referenz-IDs, Kosten und Job-ID in `docs/video/nfc-hero/production-record.json` festhalten. Bei unbekanntem Status selben Job wiederaufnehmen.

## 3. Film prüfen

- [ ] Vollständige Wiedergabe prüfen; nicht nur Standbilder.
- [ ] Tap-Reaktion, Notification, Menü-Haltezeit und Loop-Übergang prüfen. An allen fünf Beispielen framegleichen Karten-/Screenwechsel, festen Blickwinkel und unveränderte Telefonkontur prüfen.
- [ ] Produktdruck, Logo und Geometrie gegen Originale vergleichen.
- [ ] Dimensionen, Dauer, fps, Audiospur und Dateigrösse messen.
- [ ] Gegebenenfalls eine begrenzte Korrektur des vollständigen Films innerhalb des bestätigten Kostenrahmens.

## 4. Webfassung und Einbindung

- [ ] Desktop-/Mobil-Komposition anhand des tatsächlich erzeugten Films festlegen. Wenn identitätserhaltender Ausschnitt nicht funktioniert, Standbild oder gesonderte Formatproduktion vorsehen.
- [ ] Webexporte und Poster unter `public/videos/nfc/` ablegen; Originalmaster separat erhalten.
- [ ] Abgegrenzte Video-Hero-Komponente in `src/components/products/` erstellen; Einbindung ausschliesslich in `src/features/pages/ReviewsPage.tsx` und erforderlichem Hero-CSS.
- [ ] Reduzierte Bewegung, manuelle Pause, Fehlerfallback, Autoplay-Verweigerung und Sichtbarkeit behandeln. Produkt-Slider erst ersetzen, wenn Filmdateien vorhanden sind.
- [ ] Deutsche und englische Ausgabe auf eingebrannte Sprache prüfen.
- [ ] Gezielte Komponenten-/Browserprüfungen für diese Zustände; Typecheck und betroffene Tests. Desktop und Mobil einmal gemeinsam prüfen, Korrekturen bündeln.
- [ ] Film, lokale Vorschau und ehrlichen Qualitätsbericht liefern. Kein Produktionsdeployment aus früheren projektinternen Freigaben ableiten.
