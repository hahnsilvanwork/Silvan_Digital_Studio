# Session 5 — kurze Freigabeprüfung und Veröffentlichung

2. Oktober 2026. Vom Nutzer ausdrücklich als kurze Session mit Redeploy beauftragt.

- S4-Zieldateien vorab gegen die geprüften SHA-256-Werte bestätigt.
- Vollständiger Originalprojekt-Build inklusive Demo-Build-/Synchronisationspipeline und CSP-Nachbearbeitung erfolgreich.
- 16 zusätzliche lokale Chromium-/WebKit-Fälle für DE/EN-Startseite, responsive Hierarchie, Anfrageentwürfe, Sprungziele und Direktkontakt ohne JavaScript bestanden.
- Kompakter zusätzlicher Check lokal und live je 32 Routenszenarien bestanden: Chromium/WebKit × DE/EN × 390/1440px × Startseite/Websites/Kontakt/Hello. Live nach READY geprüft. HTTP200, H1, kein horizontaler Überstand, tatsächliches Hero-Bild geladen, normalisierte korrekte Startseiten-Canonicals, S4-Kostenhinweis, vierte Hello-Leistung, identische E-Mail-/WhatsApp-Entwürfe und mobile Menüschliessung/Fokusrückgabe. Keine Nachricht versendet. Keine Browserausnahmen im finalen Durchgang.
- Erstes lokales Hilfsskript unterbrach ausstehende Prefetch-Anfragen beim schnellen Navigieren, was WebKit als access-control errors meldete. Vollständiges Laden vor dem nächsten Wechsel löste die Testabbrüche; ungefilterte finalen Fehlerlisten lokal/live leer. Erster Live-Canonicalvergleich scheiterte nur am äquivalenten fehlenden Root-Slash; Vergleich auf URL-Normalform korrigiert. Keine Websiteänderung dafür.

Deployment: dpl_8iK7SPzEksYTFVUdRFwAT4u5arje
Status: READY
Alias: https://silvandigital.ch
Deployment: https://silvan-digital-studio-93rsgh9vn-silvan1.vercel.app

Belege: deployment.json, local-check.json, live-check.json. Die Veröffentlichung enthält S3/S4 aus dem bestehenden Originalprojekt; kein Git-Reset, kein Commit, keine neuen kostenpflichtigen Dienste.

Bewusst kurze Abnahme: keine echten iOS-/Android-Geräte, keine Zielgruppenrunde/Screenreader-Vollprüfung und keine neue vergleichbare Performance-/Conversionmessung. Keine pauschale 9/10-Freigabe. Sitemap-lastmod-Pflegepunkt aus S4 weiterhin offen, kein künstliches Aktualisieren aller Datumswerte.
