# Einheitliches Design der Hauptwebsite — 30. September 2026

## Bewertung
Der Unterschied kam aus separaten Startseiten-Headerregeln, 1440px gegen 1280px Inhaltsbreite und mehrfach überschriebenen Schriftgrössen. Dadurch änderten Logo, Kontaktstil, Trennlinie und Inhaltskanten beim Seitenwechsel ihre Grösse und Position.

Ein flüssiger, aber begrenzter Inhaltsbereich ist sinnvoll: Auf grossen Monitoren bleiben Leselängen, Bilder und Klickwege überschaubar. Vollbreite Farbflächen können Abschnitte verbinden. Die dekorative Landschaft darf etwas breiter als der Inhalt sein, sollte aber nicht unbegrenzt mit einem Ultrawide-Monitor wachsen.

## Umsetzung
- Eine Kopfleiste für alle Hauptseiten: grössere Wortmarke, zurückhaltender Kontaktlink mit Pfeil, einheitliche Sprachauswahl und eingerückte Trennlinie. „Leistungen“ bleibt ein klar bedienbares Menü mit sichtbarem Aufklappzeichen.
- Gemeinsame maximale Inhaltsbreite von 1376px als Mittelweg zwischen vorher 1280px und 1440px. Dieselben Kanten gelten für Header, Abschnitte und Footer. Mobile Seitenränder beginnen bei 20px.
- Hintergrundflächen bleiben durchgehend. Die Dorfzeichnung ist separat auf 1600px begrenzt und mittig platziert. So kann sie die Fläche verbinden, ohne auf sehr breiten Monitoren übergross zu werden.
- Navy, Blau-Grau, feine Linien und helle Flächen sind globale Tokens. Formulare, Produktkarten, Leistungen, Portfolio, Kontakt und rechtliche Seiten übernehmen sie.
- Hauptüberschriften der Unterseiten nutzen 38–60px und Schriftgewicht 650. Abschnittsüberschriften, Einleitungsabstände und Anschlussabstände wurden vereinheitlicht; die Startseite behält ihre kräftige Hauptüberschrift.
- NFC-Vorschau skaliert proportional und hängt nicht mehr von der Höhe des Erklärungstexts ab. Die Garten-Vorschau bemisst ihre Schrift anhand der eigenen Breite.
- Preise, Produkte, Kontaktziele, Anfragezustände und DE/EN-Routen bleiben erhalten. Die eingebetteten Demos behalten ihre eigenständigen Marken.

## Prüfung
- 458 Unit-Tests erfolgreich; vollständiger Next.js-Produktionsbuild inklusive TypeScript erfolgreich.
- 30 DE/EN-Seiten in Chromium und WebKit bei 320, 390, 768, 1280, 1920 und 2560px: 360 Layoutprüfungen ohne horizontalen Überlauf. Header/Footer-Kanten identisch, Inhaltsmaximum eingehalten, jeweils eine Hauptüberschrift.
- HTTP 304 in WebKit bei bereits geladenen Seiten ist eine gültige Cache-Antwort; das Layout wurde trotzdem vollständig geprüft.
- 39 Desktop-Browsertests für Navigation, Sprache, Produktwahl, Anfrageübernahme und Preise erfolgreich. Weitere mobile Prüfungen umfassen Menü, Fokus, Sprache, 200% Schrift und Querformat.
- Ältere Sprachtests wurden an die mobile Sprachauswahl im Menü angepasst. Der Test für Sprachlinks ohne JavaScript prüft ausdrücklich die Desktop-Navigation; das mobile Menü benötigt wie zuvor JavaScript.
- Screenshots und Prüfskripte lokal unter `.tmp/site-design/`.

## Abnahme
Aktuelle Produktionsvorschau: http://localhost:3001. Noch keine Veröffentlichung. Die Demo-Quellen wurden nicht geändert und daher nicht erneut gebaut.
- Abschliessend 19 mobile Browsertests erfolgreich; zwei plattformbedingt nicht anwendbare Tastaturtests übersprungen. Insgesamt 58 erfolgreiche Funktionsprüfungen aus Desktop- und Mobilläufen. Lint ohne Fehler oder Warnungen.
