# Salon Lumière: vollständige Überarbeitung und Veröffentlichung

## Auftrag und Gestaltung

Der Nutzer autorisiert die vollständige Optimierung der ersten Demo und anschliessendes Deployment. Danach pausieren; weitere Demos und Portfolio-Screenshots folgen erst später. Ausgangspunkt ist der Website-Leitfaden vom 24. September. Die helle Creme-/Braunwelt, Playfair Display und DM Sans bleiben; eine komplett andere Identität ist beim Salon nicht gewünscht. Aus drei Möglichkeiten (rein kosmetische Korrektur, umfassende Weiterentwicklung der vorhandenen Identität, vollständiger Markenwechsel) passt die zweite zum Auftrag.

Modus: Persuade für die Informationsseiten, Operate für die lokale Anfrage. Mehr Orientierung durch frühere Leistungen/Preise, reduzierte Wiederholungen, ruhige editoriale Zeilen statt zwölf dekorativer Karten. Visuelle Handschrift durch vorhandene Salonfotografie, grosse aber mobile lesbare Serifenschrift und feine braune Akzente. Fiktive Auszeichnungen, Erfahrung und Nachhaltigkeitsbehauptungen entfernen; reale Salonqualität nicht behaupten. Keine neue Buchungsintegration, kein Datenversand.

## Architektur und Aufgaben

- [x] Bestehende Desktop-/Mobilansichten aufnehmen, lokale Next-Dokumentation lesen und Veröffentlichungspfad feststellen.
- [x] Gemeinsames CSS, Header, Footer und wiederverwendbaren Kontaktabschluss überarbeiten. Menü mit sichtbarer Beschriftung, Escape, Klick ausserhalb und Breakpoint-Schliessen; nicht modaler Disclosure, kein unnötiger Fokusfang.
- [x] Startseite: kompakter geteilter Fotoeinstieg, direkt danach vier repräsentative Leistungen mit Preisen, Saloneinblick, verständlicher Anfrageablauf und Kontaktabschluss.
- [x] Leistungen: alle zwölf unveränderten Leistungen/Preise mit Dauer, vier Themenlinks, lesbare Zeilen, eindeutige Anfrageverknüpfung und kurze FAQ.
- [x] Über uns: konkretes fiktives Salonkonzept, vorhandene Raumfotografie, kompakte drei Teamprofile ohne erfundene Erfolgsbelege, Verbindung zur Leistungsauswahl.
- [x] Kontakt separat implementieren und prüfen: Auswahl und Preis/Dauer zeigen, Formular auf Mobil vor Besuchsinformation, kurze Felder, Datum/Uhrzeit sinnvoll gegen Öffnungszeiten prüfen, vollständige Zusammenfassung, Angaben ändern und vollständig löschen. Keine Datenübertragung oder Browserpersistenz. Ohne JavaScript bleibt das Formular deaktiviert.
- [x] Verhaltensprüfungen: Datum in Vergangenheit/Sonntag/Schliesszeit, Kontextübernahme aller Leistungen, Formularbearbeitung und Zurücksetzen, mobile Menüzustände, keine Übermittlung. Vorher/nachher Fehlerbeleg für neue Validierung.
- [x] Lint, Node-Tests, Produktionsbuild; Browserprüfung aller vier Seiten bei 320/390/768/1280 px, Chromium/WebKit, 200 % Text, Tastatur, Bilder, Metadaten/noindex, Kontraste und Fehlerzustände. Mechanischer Designdetektor einmal. Visuelle Gesamtsichtung und maximal eine Korrekturrunde.
- [x] Salon-Export separat vorbereiten und auf das bestehende Vercel-Projekt silvan-demo-salon-lumiere veröffentlichen. Aktuelle Hauptseitenarbeit und andere Demos nicht veröffentlichen. Portfolio verlinkt bereits die eigenständige Salon-Domain; neue Screenshots bleiben ausdrücklich bis Abschluss aller vier ausstehend.
- [x] Live-Routen, Dateien, Menü und lokale Anfrage gegen veröffentlichte Domain prüfen, Bericht und Fortschritt dieses Plans ergänzen. Danach an Nutzer zurückgeben und pausieren.

## Betroffene Dateien

`demos/salon-lumiere/src/app/{page.tsx,globals.css,layout.tsx,leistungen/page.tsx,ueber-uns/page.tsx}`; `src/components/{Navbar,Footer,ContactDemo}.tsx`; neue gemeinsame Salon-Komponenten und Kontaktvalidierung unter `src/`; dazu gezielte Tests und Demo-Dokumentation. Keine Änderungen an Preisen, Routen oder anderen Demoquellen. Generierte Exporte entstehen ausschliesslich aus dem Build.

## Abnahme

Ein Besucher findet eine Leistung samt Preis/Dauer, übernimmt sie in einen Terminwunsch, korrigiert fehlerhafte Angaben und prüft eine vollständige Zusammenfassung. Der Democharakter und fehlende Buchungs-/Versandfunktion bleiben klar. Texte sind bei 320 px und grosser Schrift lesbar; keine abgeschnittenen Bedienelemente. Veröffentlichung nur nach erfolgreicher Prüfung, bereits ausdrücklich autorisiert.
