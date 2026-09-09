# Abschluss der Themen 19–21

Stand: 8. September 2026. Lokal umgesetzt; kein Commit und kein Deployment.

## 19 – Kontakt und Hello

- Kompakter Einstieg, verständlicher nächster Schritt und direkte Kontaktwege.
- Website, Präsenz und Automation übergeben einen erlaubten öffentlichen Anfragegrund. Die Auswahl bereitet passende E-Mail-/WhatsApp-Texte vor; Besucher ergänzen und senden selbst.
- Sprachwechsel erhält den erlaubten Grund. Unbekannte oder doppelte Werte werden ignoriert; private Query-Felder werden nicht in Kontakttexte oder Sprachlinks übernommen.
- Hello zeigt direkte Kontakte zuerst und bietet eine tatsächlich herunterladbare vCard aus vorhandenem Namen, Telefon und E-Mail.

## 20 – Rechtstexte

- Kompakter Titel, sichtbarer Stand, nummeriertes Inhaltsverzeichnis und direkte Abschnittslinks in beiden Sprachen.
- Schmale Textspalte, lesbarer Zeilenabstand, Tastaturfokus am Sprungziel und Rücksprung zum Verzeichnis.
- Inhalte erscheinen ohne verzögerte Animation. Bestehende rechtliche Angaben wurden nicht neu erfunden oder rechtlich zertifiziert.

## 21 – Zugänglichkeit und Feinschliff

- Inaktive Produktbilder sind im Accessibility-Baum verborgen; das aktuelle Bild bleibt zugänglich. Bestehende Pause-/Reduzierte-Bewegung-Logik bleibt erhalten.
- Produktbühne und 3D-Bedienelemente nutzen gemeinsame Farbtokens, einschliesslich des WebGL-Hintergrunds.
- Eine Desktop-first-Media-Query im Automationsbeispiel wurde auf die bestehende Mobile-first-Konvention umgestellt.

## Prüfung

- 387/387 Unit-/Komponententests bestanden. Vollständiges ESLint sowie abschliessendes gezieltes ESLint erfolgreich.
- Next-Produktionsbuild inklusive TypeScript und CSP-Härtung von 97 HTML-Dateien erfolgreich. Unveränderte Demo-Exporte wurden weiterverwendet.
- 18 Browserprüfungen in Chromium und mobilem Safari bestanden: DE/EN-Anfragegrund, Sprachwechsel und Zurück-Navigation, vCard-Download, Abschnittsposition/Fokus, 320px-Reflow sowie 3D-Tastaturbedienung, Schliessen mit Fokusrückgabe und Fehler-/Wiederholungszustand.
- Nach dem letzten Build zusätzlich 24 Browserprüfungen für Themen 16–21 bestanden. Frühere Kontaktziel-Assertions wurden auf die nun beabsichtigten Kontextlinks angepasst.
- Automatischer axe-Check auf 30 Hauptseiten (15 Routen in beiden Sprachen), WCAG-2-A/AA- und 2.1-AA-Regeln: keine automatisch gefundenen Verstösse und kein horizontaler Überlauf bei 390px.
- Kontakt, Hello, Datenschutz und Impressum in beiden Sprachen zusätzlich mit 200% Basisschrift bei 640px geprüft: kein horizontaler Überlauf. Dies ist eine Textvergrösserungsprüfung, keine vollständige Browserzoom-Zertifizierung.
- Mobile Aufnahmen von Kontakt, Hello und Datenschutz visuell geprüft. Unabhängige Quelltextprüfung ohne wesentliche Befunde.
- Ein erster Browsertest navigierte zurück, bevor der Sprachwechsel abgeschlossen war; er wartet nun ausdrücklich auf die Ziel-URL. Ein paralleler WebKit-3D-Lauf überschritt die Wartezeit; der anschliessende serielle Gesamtlauf bestand unverändert.

## Mobile Labormessung

Chromium, lokaler Produktionsserver, 390×844, CPU-Verlangsamung 4×, simuliert 150ms Latenz, Download 1,6 Mbit/s und Upload 750 kbit/s, Browsercache deaktiviert. Je drei neue Kontexte, acht Sekunden Beobachtung nach DOMContentLoaded. Medianwerte; keine Lighthouse-Punktzahl. Server- und Betriebssystemcaches sind nicht kontrolliert.

| Seite | LCP vorher | LCP nachher | CLS nachher |
|---|---:|---:|---:|
| Startseite | 892 ms | 856 ms | 0 |
| NFC/QR | 1084 ms | 956 ms | 0 |
| Portfolio | 884 ms | 944 ms | 0 |

Die Unterschiede sind Messschwankungen und kein belegter Optimierungseffekt. Es zeigte sich kein Anlass, auf Verdacht weitere Ladeoptimierungen einzubauen. Die abschliessende CSS-Konventionskorrektur betrifft nur die Automationsseite und wurde nach diesen Messungen gebaut.

Rohdaten und Aufnahmen liegen lokal unter `artifacts/final-audit/`. Das Hilfsskript `scripts/audit-final.mjs` erzeugt die Performance- und axe-Berichte; axe-core muss in der Prüfumgebung verfügbar sein. Es berichtet Befunde und ist kein automatisches CI-Freigabetor.

## Verbleibende Grenzen und nächste Schritte

Alle 21 vereinbarten Umsetzungsthemen sind lokal bearbeitet. Das bedeutet keine garantierte volle Bewertung oder vollständige WCAG-Konformität. Reale Kundenstimmen, belegte Ergebnisse und noch nicht bestätigte Geschäfts-/Produktangaben bleiben offen. Im Unit-Test-Kontext erscheint weiterhin die bekannte Next-Image-Qualitätswarnung; die Produktionskonfiguration erlaubt bereits 75 und 90 und der Build besteht.

Als nächster eigenständiger Schritt ist eine Veröffentlichung des geprüften Hauptseiten- und Demo-Stands mit anschliessender Liveprüfung sinnvoll. Danach: echte Nutzungsdaten einschliesslich INP/Core Web Vitals sammeln, reale Rückmeldungen auswerten und Inhalte nur anhand bestätigter Fakten ergänzen. In diesem Auftrag wurden keine Nachrichten versendet oder externen Dienste verändert.
