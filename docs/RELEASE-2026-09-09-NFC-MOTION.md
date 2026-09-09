# NFC Motion-Grafik veröffentlicht

## Laptop-Ausrichtung

Deployment `dpl_BTvW2zSGQESXrfX2oT3RgbP7CuRY` veröffentlicht. Kleine CSS-Korrektur: In der zweispaltigen Ansicht bestimmt der Textblock die verfügbare Höhe; die gesamte Grafik inklusive Bildunterschrift wird proportional eingepasst und oben ausgerichtet. Handy-Layout bleibt erhalten. DE/EN an 1280×800, 1366×768, 1440×900 und 1536×864 geprüft: obere und untere Kante weichen weniger als 1 px ab. Auf engeren Tablet-Breiten bleibt die Breite begrenzt, ohne das Motiv zu verzerren. 19 Design-Vertragstests und Vercel-Produktionsbuild erfolgreich.

## Gestalterischer Nachtrag

Live-Deployment `dpl_BJcTLL76WYcmeAe57re7LUT9tmyj`, https://silvan-digital-studio-mrcrx9e7v-silvan1.vercel.app, erfolgreich auf silvandigital.ch zugewiesen. Auf Nutzerwunsch Emoji-Pfeil aus allen Szenen entfernt; rahmenlose helle Studiofläche, kleine SILVAN-Signatur, grössere Anwendungstitel und konkrete DE-/EN-Erklärungen statt Szenenzähler und allgemeiner Claims. Doppelten Demo-Hinweis im Telefon entfernt; Fiktionshinweis bleibt unter der Grafik.

Typecheck, gezieltes ESLint, 44 betroffene Tests und Animationsprüfung bestanden. Auf der Live-Domain DE↔EN, fehlenden Pfeil/Stop-Button, Animation und Layout in Desktop-Chromium und mobilem WebKit geprüft; keine Browserausnahmen. Beide NFC-Routen HTTP 200 mit Meta-CSP und nosniff.

## Vorherige Veröffentlichung

Auf ausdrücklichen Nutzerwunsch: lokale Motion-Grafik in den NFC-Hero integriert, deutsch/englische Smartphone-Demoansichten an die Seitensprache gebunden und manuellen Pause-Button entfernt. Automatische Pause bei ausgeblendetem Tab/Viewport und Standbild bei Bewegungsreduktion bleiben erhalten. Originale Produktdrucke bleiben unverändert.

- Produktion: https://silvandigital.ch/reviews und https://silvandigital.ch/en/reviews
- Deployment: https://silvan-digital-studio-dx4cxcg1y-silvan1.vercel.app
- ID: dpl_FhaQwAMzMKH4RJuxXEeRKRf6HoZr
- Vercel: READY, Produktionsdomain erfolgreich zugewiesen.

Lokaler Produktionsbuild einschliesslich Demo-Builds und CSP-Härtung erfolgreich, Lint erfolgreich, 411 Unit-/Komponententests bestanden. Bestehender Motion-Vertrag erkennt jetzt Per-Keyframe-Easing als Interpolationsbeschreibung und erlaubt Endlosschleifen gezielt im NFC-Film-Modul.

Neun Browserprüfungen für Sprachwechsel und Anfrage-Handoff erfolgreich. Filmprüfung: fünf Szenen, Loop, Kontaktposition, Erkennung vor Tap und Seitenöffnung, kein Pause-Button, Viewport-Pause, reduzierte Bewegung und Standbild ohne JavaScript. Alle 31 lokalen Produktmodelle inklusive CSP geprüft. Der alte Spline-Prüfer wartet auf einen mittlerweile ersetzten Viewer-Selektor und lief in einen Timeout; die aktuelle lokale 3D-Prüfung bestand vollständig.

Live-Prüfung: DE → EN → DE auf Desktop-Chromium (1440 px) und mobilem WebKit (390 px), lokalisierte Filmtexte, laufende Animation, fehlender Pause-Button, kein horizontaler Überlauf und keine Browserausnahmen. Beide NFC-Routen HTTP 200, fehlende Route HTTP 404; Meta-CSP, Sicherheitsheader, Canonical und Indexierbarkeit geprüft. Keine separaten Demo-Deployments und keine Nachrichten versendet.
