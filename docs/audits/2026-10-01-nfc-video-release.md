# NFC — Rückkehr zum Live-Stand und schneller Kartenfilm

Der Eigentümer hat NFC 2 zurückgezogen und die direkte Veröffentlichung der bisherigen Website mit einem einzigen Medienwechsel autorisiert. Ausgangspunkt ist die am 30. September veröffentlichte Version `dpl_Cp4jLY7wzKLPoyH2BGPBiRWWPUhu` mit Alias `https://silvandigital.ch`.

## Wiederherstellung und Umfang

Die 760 Quell-Dateien der produktiven Veröffentlichung wurden über die Vercel-Dateiliste mit den lokalen SHA-1-Inhalten verglichen. 747 waren bereits identisch. Die 13 geänderten Dateien wurden aus der Veröffentlichung heruntergeladen, anhand ihrer Hashes geprüft und exakt wiederhergestellt. Danach stimmten alle 760 überein. Ein Git-Reset wurde nicht verwendet, weil Git HEAD älter als diese Veröffentlichung ist.

Die NFC-2-Seiten in beiden Sprachen, ihre Filmsequenzen, Komponenten, Styles, Texte, Tests und Entwurfsdokumente wurden entfernt. Navigation und Sitemap entsprechen wieder der veröffentlichten Version. Die gelieferten Originalmedien bleiben erhalten.

Im veröffentlichten NFC-Aufbau ersetzt der eigene Kartenfilm die bisherige HTML-/CSS-Motion-Komposition. Die ganze 16:9-Bildfläche bleibt sichtbar. Desktop nutzt die vorhandene rechte Spalte mit bündigem oberen Rand; Handy und Tablet behalten die Reihenfolge Text, Aktionen, Film. Katalog, Preise, Mengenlogik, Anfrage und Kontakt sind unverändert. Eine zusätzliche Seite oder durchgehende Scrollanimation ist nicht enthalten.

## Medien und Verhalten

- Quelle: `NFC Cards/SilvanDigital-NFC-4K-38-Sekunden.mp4`, unverändert.
- Veröffentlichung: `public/videos/nfc-cards-fast.mp4`; doppelte Geschwindigkeit, exakt **19.000000 Sekunden**, H.264, 1280 × 720, 24 fps, 456 Bilder, 3'280'704 Bytes, ohne Ton, Fast Start.
- Poster: tatsächliches erstes Bild des gelieferten Films, 1280 × 720, 44'980 Bytes. Herkunft im unterstützten WebP-Sidecar; Scan: ein Raster, keine fehlende Herkunft.
- Nativer stummer Loop, Pause/Weiter; explizite Pause bleibt beim Scrollen und bei Tabwechseln erhalten. Ausserhalb der Ansicht und bei verborgenem Dokument wird pausiert. Reduzierte Bewegung und Datensparmodus laden den Film nicht. Fehlender Film und JavaScript-Abwesenheit behalten das Standbild.

## Lokale Prüfung

- 94 betroffene Komponenten-, Seiten-, Design-, Navigations- und SEO-Prüfungen bestanden.
- 42 Filmprüfungen in Chromium, WebKit und iPhone-Safari-Emulation bestanden, DE/EN bei 320, 390, 806, 1024 und 1440px. Tatsächliche Wiedergabe, 19-Sekunden-Dauer, vollständiges Bild, Pause/Weiter, Vorzugszustand und echter Medien-404 geprüft. NFC 2 liefert in beiden Sprachen 404 und steht nicht in der Sitemap.
- Weitere 42 Ausrichtungsfälle bei sieben Desktopbreiten und 24 bestehende Modell-/Preis-/Anfragefälle bestanden auf derselben Implementierung.
- ESLint und Next.js-Typecheck bestanden. Alle vier Demos wurden gebaut und synchronisiert; Hauptbuild: 40 Routen, CSP-Härtung: 97 statische HTML-Dokumente.
- Frischer unabhängiger Impeccable-Review: **Disposition `ship`**, keine materiellen Befunde im autorisierten Umfang. Sechs gültige Desktop-, Handy- und 806px-Aufnahmen; Datensatz `.impeccable/review/nfc-video/finish-review.md`. Detektor einmal ausgeführt: `[]`.

Die erste Testfassung verwendete für reduzierte Bewegung einen dafür ungeeigneten Hydrationsmarker. Zudem berichtet der Windows-WebKit-Decoder skalierte Bildmasse und nutzt einen nativen Medien-Netzwerkpfad. Die Prüfungen warten deshalb korrekt auf die reduzierte Ansicht, prüfen das Seitenverhältnis statt identischer Decoder-Masse und erzeugen den Medienfehler durch einen tatsächlichen 404-Pfad. Die Website wurde für diese Testanpassungen nicht verändert. Für gültige Aufnahmen wird auf das Ende des nativen weichen Scrollens und aller Wort-Einblendungen gewartet.

## Veröffentlichung

Am 1. Oktober 2026 direkt veröffentlicht: `dpl_FfAPphLypvSx7hpzeWPeQBVDQJfJ`, Status **READY**. Vercel Inspect bestätigt die Produktions-Aliase `https://silvandigital.ch` und `https://www.silvandigital.ch`; Deployment erstellt um 13:06:38 Uhr Europe/Zurich. Alle vier Demos und der Hauptbuild erfolgreich; der Produktionsbuild härtete 192 statische HTML-Dokumente.

Die anschliessende Prüfung direkt auf `https://silvandigital.ch` ist bestanden: 30 bestehende Routen erreichbar, beide entfernten NFC-2-Routen mit 404, keine NFC-2-Sitemap-Einträge. Der ausgelieferte Film entspricht per SHA-256 bytegenau der lokalen 3'280'704-Byte-Datei. Zehn DE/EN-Browserfälle in Chromium und WebKit bei 390, 806 und 1440px prüfen tatsächliche Wiedergabe, 19 Sekunden, Ausrichtung, vollständiges Bild, Pause/Weiter, erhaltene manuelle Pause sowie Modellauswahl, Menge und Preis. Keine JavaScript-Seitenfehler oder horizontalen Überläufe. Safari-Prüfungen verwenden WebKit-/iPhone-Emulation, kein physisches iPhone.

Live-Nachweis: `.tmp/nfc-video-release/live/report.json`, Screenshots `390-hero.png`, `806-hero.png`, `1440-hero.png` im selben Verzeichnis. Der In-App-Browser zeigt die aktualisierte produktive NFC-Seite.
