# Salon Lumière — Überarbeitung und Veröffentlichung

24. September 2026. Erste von vier einzeln beauftragten Demo-Überarbeitungen abgeschlossen.

## Änderungen

- Bestehende Creme-/Braunwelt und Playfair/DM-Sans-Schriften bewahrt; gemeinsame Abstände, Ausrichtung, Schriftgrössen und Bedienelemente neu geordnet.
- Startseite mit kompakterem Einstieg, frühen Leistungen/Preisen, zusätzlichem vorhandenen Farbfoto, nachvollziehbarem Anfrageablauf und Kontaktabschluss.
- Alle zwölf Leistungen samt unveränderten Preisen und Zeiten als lesbare Zeilen; Themenlinks, individuelle Anfragewege und FAQ ergänzt.
- Salonseite und drei Teamprofile kürzer und konkret. Erfundenes Prestige, Magazinreferenzen, Erfahrungsdauer und pauschale Nachhaltigkeitsaussagen entfernt.
- Sichtbar beschriftetes mobiles Menü mit Escape/Fokusrückgabe, Schliessen bei Navigation, Fokus ausserhalb und Desktopwechsel. Nicht modales Disclosure.
- Kontaktformular auf Mobil zuerst; Auswahl und Preis/Dauer sichtbar. Schweizer zukünftiges Datum, Sonntag und passende Beispielzeiten geprüft. Die längste angegebene Behandlungsdauer muss bis zur Schliesszeit Platz haben. Keine echte Verfügbarkeitsprüfung.
- Vollständige lokale Zusammenfassung, Bearbeitung ohne Eingabeverlust und vollständiges Löschen. Nachricht optional, Feldlängen begrenzt, Fehler zugeordnet. Kein Versand und keine Browserpersistenz; ohne JavaScript und vor Hydration deaktiviert.
- Statisches Next-Prefetch abgeschaltet, nachdem fehlende Segmentdateien und Safari-Meldungen reproduziert wurden. Normale Links und direkte Seitenaufrufe bleiben funktionsfähig.
- Layout bei 200% Text korrigiert; native Selects erhalten Paint-Containment gegen unsichtbaren WebKit-Optionsüberlauf.

## Nachweise

- ESLint ohne Fehler; Produktionsbuild inklusive TypeScript erfolgreich, alle vier Inhaltsseiten statisch exportiert.
- Sechs Node-Tests erfolgreich: alle zwölf öffentlichen Service-IDs, ungültige Querywerte, Schweizer Datum/DST/Jahreswechsel, Öffnungszeiten/Dauer, Datums-/Zeitvalidierung und Feldgrenzen. Neue Validierungsfälle wurden vor Implementierung als fehlgeschlagen beobachtet.
- 40 lokale Browserprüfungen erfolgreich: 32 Kombinationen aus vier Seiten, 320/390/768/1280 px und Chromium/WebKit; acht zusätzliche Szenarien für Menü/Fokus/Breakpoint, vollständige Anfrage mit Fehlerkorrektur, 200%-Text und No-JS-Schutz.
- 200%-Text auf allen vier Seiten bei 390 px sowie auf Home bei 900/1024/1280 px geprüft. Keine horizontalen Überläufe im finalen Lauf.
- axe WCAG 2A/AA und 2.1AA auf allen vier Seiten bei 390 px sowie Kontakt nach Interaktion ohne automatisch erkannte Verstösse. Keine vollständige Konformitätszertifizierung.
- Alle Bilder, genau eine H1, Beschreibungen, noindex, Sprungziele und geprüfte kleine Bedienziele kontrolliert. 21 interne Linkziele erfolgreich; alle zwölf Leistungen im Browser mit korrekter Auswahl übernommen.
- Desktop-/Mobilansichten visuell geprüft. Impeccable-Detektor einmal ausgeführt, keine Findings. Separater Quellreview ohne bestätigte offene Befunde; sein Hinweis auf Desktop-Textvergrösserung wurde reproduziert und behoben.
- Zwölf Prüfungen auf der Live-Domain erfolgreich: acht Seiten-/Breitenkombinationen plus Menü, vollständiger lokaler Anfrageablauf, Textvergrösserung und deaktiviertes No-JS-Formular.
- Live HTTP 200, X-Robots-Tag noindex/nofollow und CSP mit form-action 'none' bestätigt.

Rohbelege lokal: `artifacts/salon-2026-09-24/local-checks.json`, `live-checks.json`, Vorher-/Nachher-Aufnahmen. Keine realen personenbezogenen Angaben eingegeben und keine Nachricht versendet. Browseremulation ersetzt keine Hardwareprüfung auf einem echten iPhone/Android-Gerät. Keine neue Performance-Feldmessung behauptet.

## Veröffentlichung und Rückweg

- Öffentliche Adresse: https://silvan-demo-salon-lumiere.vercel.app
- Projekt: `silvan1/silvan-demo-salon-lumiere`
- Neues Deployment: `dpl_FbySCGv6hASsJhLpy352dHh7hi3a`, READY, Production.
- Deployment-Adresse: https://silvan-demo-salon-lumiere-illm443gd-silvan1.vercel.app
- Vorheriges Deployment als Rückweg: `dpl_Fjbc1fVYGeNLHGmWZ3rYVTBaQ45o` / https://silvan-demo-salon-lumiere-ke06l2cwa-silvan1.vercel.app

Nur das bestehende eigenständige Salon-Projekt veröffentlicht. Die Hauptwebsite verlinkt bereits diese öffentliche Demo. Der eingebettete Legacy-Export unter silvandigital.ch/demos/salon wird beim nächsten Hauptseitenbuild aus den neuen Quellen erneuert. Die Hauptwebsite und ihre Screenshots wurden in diesem Auftrag nicht veröffentlicht oder verändert; andere Demo-Deployments ebenfalls nicht.

## Fortsetzung

1. Salon Lumière: fertig und live.
2. Steiner Bau: erst nach nächster Nutzeranweisung; grosse Freiheit bei Farbe, Design und Struktur ausdrücklich gewünscht.
3. Café Vogel: anschliessend einzeln überarbeiten und veröffentlichen.
4. Falkenried: anschliessend einzeln überarbeiten und veröffentlichen.
5. Erst nach Abschluss aller vier: neue echte Screenshots für SilvanDigital aufnehmen, Portfolioabbildungen aktualisieren und Hauptseite veröffentlichen.

Jetzt vereinbarte Pause. Keine Automation oder automatische Fortsetzung eingerichtet.
