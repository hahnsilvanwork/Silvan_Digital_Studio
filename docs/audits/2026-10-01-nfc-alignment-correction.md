# NFC — Korrektur der Film-Ausrichtung

Der Eigentümer hat die Ausrichtung der unmittelbar zuvor veröffentlichten NFC-Seite beanstandet und eine genaue Analyse und Verbesserung angefordert. Der bestehende direkte Veröffentlichungsauftrag gilt weiterhin. Ausgangspunkt: `dpl_FfAPphLypvSx7hpzeWPeQBVDQJfJ`.

## Ursache und Änderung

Die Seitenränder und oberen Kanten waren mathematisch bündig. Der lange Titel innerhalb der halben Desktop-Spalte machte den Textblock jedoch wesentlich höher als den vollständigen 16:9-Film. Deutsch: bei 1440px 536px Text gegenüber 419px Film mit Steuerung (118px Unterschied), bei 1024px 513px gegenüber 309px (204px Unterschied). Englisch hatte andere Zeilenumbrüche und damit andere Unterschiede.

Der unveränderte Titel bildet jetzt eine gemeinsame Zeile oberhalb der beiden Desktop-Spalten. Darunter stehen Erklärung, Preisnotiz und Aktionen links, der vollständige Film rechts. Beschreibung und Film beginnen auf gleicher Höhe. Die Aktionsbuttons und die Wiedergabesteuerung schliessen unten bündig ab. Mobil bleibt die Reihenfolge Titel, Erklärung/Preise/Aktionen, Film erhalten; die bisherigen Abstände bleiben bestehen. Auf Tablet nutzt der Film die gesamte Textbreite, statt bei 512px zu enden.

Geändert sind nur die Titelposition im vorhandenen `ReviewsPage.tsx`, die NFC-Layoutregeln und die Desktop-Anordnung von Film und Bildunterschrift. Video, Filmgeschwindigkeit, Texte, Modelle, Preise, Mengenberechnung, Anfrage, Kontakt, Navigation und andere Seiten bleiben erhalten. Katalog- und Kontaktspalten wurden separat geprüft; ihre vorhandene bewusste Struktur wird beibehalten.

## Nachweise

- Zehn DE/EN-Ansichten bei 390, 806, 1024, 1280 und 1440px neu aufgenommen. Gemessener Desktop-Unterschied zwischen unteren Aktions- und Filmkanten nach der Korrektur: 0px. Tablet-Film und Text teilen beide Seitenkanten.
- 108 Browserfälle bestanden in Chromium, WebKit und iPhone-Safari-Emulation: Ausrichtung bei sieben Desktopbreiten bis 1536px, Film/Fallbacks bei 320–1440px, vorhandene Modell-/Mengen-/Preis-/Anfragefunktion.
- 29 betroffene Komponenten- und Seitenprüfungen bestanden. ESLint, Next.js-Build und Typecheck bestanden; 40 Routen, 97 lokal gehärtete statische HTML-Dokumente.
- Layout-Detektor einmal: `[]`. Frische isolierte Layout-Bewertung bestätigte die Ursache und prüfte Katalog sowie Anfrage. Vollständige Aufnahmen warten auf abgeschlossene Wort-Einblendungen.
- Frischer unabhängiger Abschlussreview: **Disposition `ship`**, alle zehn erforderlichen Aufnahmen geprüft, keine materiellen visuellen Korrekturen. Bericht `.impeccable/review/nfc-alignment/finish-review.md`.
- Der zunächst eingeschränkte Windows-Testprozess blockierte den nativen WebKit-Mediendecoder. Der identische unveränderte Quellstand spielt im uneingeschränkten Testprozess ab und besteht alle 108 Fälle. Keine Testanforderung wurde abgeschwächt.

Aufnahmen, Messwerte und unabhängiger Abschlussreview: `.impeccable/review/nfc-alignment/`. WebKit-/iPhone-Prüfungen sind Emulation, kein physisches iPhone.

## Veröffentlichung

Am 1. Oktober direkt veröffentlicht: `dpl_BVbXrugugYY6qp14PbB8o1a4a5HC`, **READY**, Produktions-Aliase `https://silvandigital.ch` und `https://www.silvandigital.ch` durch Vercel Inspect bestätigt. Deployment erstellt um 14:21:45 Uhr Europe/Zurich. Alle vier Demo-Builds und der Hauptbuild erfolgreich; Produktions-CSP auf 192 statischen HTML-Dokumenten.

Anschliessend auf der öffentlichen Domain geprüft: **12 DE/EN-Browserabläufe bestanden**, Chromium bei 390/806/1024/1440px und WebKit bei 390/1440px. Gemeinsame Titelbreite, bündige oberen und unteren Desktop-Kanten sowie gemeinsame Text-/Filmbreite auf Tablet/Mobil geprüft. Tatsächliche Filmwiedergabe, 19-Sekunden-Dauer, Pause/Weiter, erhaltene manuelle Pause, Modellwahl, Menge und CHF-100-Gesamtpreis geprüft. Keine JavaScript-Seitenfehler oder horizontalen Überläufe.

30 bestehende Routen erreichbar; beide NFC-2-Routen mit 404 und ohne Sitemap-Eintrag. Ausgelieferter Film stimmt per SHA-256 exakt mit der unveränderten lokalen Datei überein. Nachweise: `.tmp/nfc-alignment/live/report.json` und Live-Aufnahmen `390-hero.png`, `806-hero.png`, `1024-hero.png`, `1440-hero.png` im selben Verzeichnis. Die aktualisierte öffentliche Seite ist im bestehenden In-App-Browser geöffnet.
