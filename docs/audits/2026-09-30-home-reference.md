# Startseite nach den Bildvorlagen — 30. September 2026

## Analyse und Umsetzung
- Bestehendes Next.js-Projekt weiterverwendet. Keine Neuentwicklung der Website und keine Änderungen an Preisen oder Anfrageabläufen.
- Der frühere Einstieg hatte eine kleinere Überschrift, zwei Aktionen, Porträt-Byline, Telefonnummer und einen vollständigen Demo-Screenshot. Die Vorlage verwendet stattdessen eine grosse Überschrift, einen Kontaktbutton, eine zweizeilige Text-Byline und eine kompakte Garten-Komposition.
- `HomeOpening.tsx` kapselt den neuen Einstieg, die Falkenried-Vorschau und vier echte Leistungslinks. `home-opening.module.css` steuert die zwei Desktop-Spalten, die mobile Reihenfolge und das responsive Leistungsraster.
- Die Vorschau kombiniert echtes HTML mit dem vorhandenen Falkenried-Gartenfoto. Das ist eine Konzeptvorschau, kein Screenshot des heutigen Demo-Layouts. Die Demo selbst wurde nicht geändert.
- `VillageLandscape.tsx` zeichnet die dekorative Landschaft als skalierbares SVG. Das Motiv ist eine Annäherung an die Bildvorlage, keine geografisch genaue Darstellung von Boppelsen.
- Die neue Kopfleisten-Gestaltung ist auf die Startseite begrenzt. Bestehende Menülogik, Fokusführung, Escape und Sprachwechsel bleiben erhalten. Der Desktop-Link zu About trägt jetzt „Über mich“ / „About me“.
- Unter dem Einstieg bleiben Leistungen samt Preisen, ausgewählte Projekte, Person und Kontakt erhalten. Farbfläche und Abstände führen die neue Gestaltung weiter.
- Deutsche und englische Texte sind angepasst. Die bestehenden Test-Erwartungen für die frühere Überschrift wurden aktualisiert; die Preisprüfung ist weiterhin auf das Leistungsangebot gerichtet.

## Bildbereitstellung
Das bestehende Gartenfoto wurde auf 1000 Pixel Breite als WebP vorbereitet. Diese fertige Datei wird direkt ausgeliefert: Die lokale AVIF-Konvertierung des Next-Bildoptimierers blieb bei einer Desktop-Bildgrösse hängen. Die Lösung betrifft nur diese Vorschau, ohne die globale Bildkonfiguration zu verändern.

## Freigabe
Nur lokale Vorschau. Veröffentlichung nach Prüfung und ausdrücklicher Freigabe des Eigentümers.

## Verifikation
- 88 gezielte Unit-Tests erfolgreich (Seiten, Navigation, Sprachinhalte, Leistungsmenü und Designvertrag).
- ESLint für die geänderten React-/Inhaltsdateien erfolgreich.
- Next.js-Produktionsbuild inklusive TypeScript und 40 erzeugten Seiten erfolgreich. Demo-Quellen wurden nicht geändert und für diese lokale Abnahme nicht neu gebaut.
- Chromium und WebKit: jeweils DE/EN bei 320, 390, 768, 1024 und 1440 px ohne horizontalen Überlauf; Gartenbild geladen und dekodiert.
- In beiden Browsern Menü öffnen, Escape, Sprachwechsel, Kontaktlink und Falkenried-Projektlink erfolgreich geprüft.
- Beim ersten schnell navigierenden WebKit-Lauf meldeten abgebrochene RSC-Vorabladungen Zugriffsfehler. Ein erneuter Lauf nach abgeschlossenen Netzwerkanfragen bestand ohne Seitenfehler.
- Produktionsvorschau läuft auf http://localhost:3001; Entwicklungsserver auf http://localhost:3000.
- Screenshots und Prüfskripte liegen lokal in `.tmp/home-reference/`.

## Nachkorrektur: Ausrichtung, NFC und Landschaft
Desktop verwendet jetzt gemeinsame CSS-Subgrid-Zeilen: Bildunterkante und Kontaktbutton sind bündig, Byline und Projektbeschriftung beginnen in derselben Zeile. Der dritte Leistungslink heisst in beiden Sprachen „NFC & QR“. Die Landschaft wurde mit zwei ruhigen Hügelzügen, unterschiedlichen Pflanzen, detaillierten Giebelhäusern und einem Kirchturm neu gezeichnet. Chromium/WebKit jeweils in DE/EN bei 320, 390, 768, 1024 und 1440 px geprüft: kein Überlauf; gemeinsame Desktop-Kanten mit weniger als 1 px Abweichung. ESLint und Produktionsbuild inklusive TypeScript erfolgreich. Weiterhin nur lokal.
