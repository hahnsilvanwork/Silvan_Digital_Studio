# SilvanDigital: Unterseiten und lokale Qualitätsprüfung

Stand: 23. September 2026. Lokal unter http://127.0.0.1:3000. Nicht veröffentlicht.

## Umgesetzt

Phase 4 ist für Websites, Google & Sichtbarkeit, NFC & QR, Automation, Arbeiten, Studio und Kontakt umgesetzt. Die Änderungen bewahren Preise, echte Kontaktdaten, Konzeptkennzeichnung, DE/EN und Anfragekontext.

- Automation: verständlicher Einstieg, Preis auf Anfrage mit Erklärung, kompakter direkter Kontakt und Kontaktdatei. Die interaktive Demo behält Zustände für Entwurf, Prüfung, Fehler und Zurücksetzen.
- Arbeiten: explizite Links zum Konzept und abschliessende Kontaktmöglichkeiten mit Website-Anfragekontext.
- Studio: Kontakt bereits im Einstieg, begrenztes originales 4:5-Porträt, lesbare Standards und abgestimmter Kontaktbereich.
- NFC und Websites: vorherige Vereinfachungen einschliesslich aufklappbarer Anfrage, Mengenberechnung und vertikal lesbarem Paketvergleich erhalten.

## Prüfergebnisse

- Vollständige Unit-Suite: 50 Dateien, 450 Tests erfolgreich. Nach der abschliessenden Studio-Layoutkorrektur zusätzlich alle 25 Seitentests erfolgreich.
- ESLint und Next.js-Produktionsbuild erfolgreich, 40 statische Seiten generiert.
- 30 öffentliche DE/EN-Seiten in Chromium und WebKit bei 320, 390, 768 und 1280 px geprüft: keine horizontalen Überläufe, unzureichenden geprüften Bedienziele oder fehlenden Sprungziele; lokale Seitenlinks erfolgreich aufgelöst.
- 32 ausgewählte Chromium-Browsertests, 16 WebKit-Browsertests und 4 mobile Safari-Menütests erfolgreich, einschliesslich gezielter Wiederholungen nach Anpassung veralteter Tests. Desktop-Durchläufe überspringen mobile Menütests; WebKit überspringt den Test zur Tab-Reihenfolge aufgrund seiner Plattformpräferenz. Die Fokusbegrenzung wurde separat mit 15 Tab-Schritten in Chromium geprüft.
- Axe WCAG 2A/AA und 2.1AA auf allen 30 Seiten ohne automatisch erkannte Verstösse. Studio nach dem letzten Layoutschritt erneut DE/EN geprüft. Dies ist keine vollständige Konformitätszertifizierung.
- Sprachwechsel, Tastatur-Sprunglink, Menüschliessen/Fokus, 200%-Text im Menü, Querformat, Anfrageentwürfe, Clipboard-Fallback, Automation-Prüfung/Fehlerkorrektur und Zurücksetzen geprüft.
- Kontaktdatei als silvan-hahn.vcf heruntergeladen; vCard-Struktur und Telefonnummer geprüft. Der Import in die Kontakte-App auf einem physischen Handy wurde nicht geprüft.
- Metadaten auf 30 Seiten: Titel, Beschreibung, Canonical, Dokumentensprache, genau eine H1 und parsebare JSON-LD-Daten vorhanden.
- Desktop- und mobile Ansichten der bearbeiteten Seiten visuell geprüft. Ein Screenshot unmittelbar nach Viewportwechsel zeigte eine falsche Aufnahmehöhe; frisches Laden bestätigte, dass die tatsächliche Seite am Footer endet.

## Lokale Ladezeitmessung

Chromium, 390×844, DPR 1, CPU vierfach verlangsamt, 150 ms Latenz, 1,6 Mbit/s Download, 750 Kbit/s Upload, Cache deaktiviert. Je drei Durchläufe, Beobachtung bis acht Sekunden nach DOMContentLoaded.

| Seite | LCP-Median | CLS |
| --- | ---: | ---: |
| Startseite | 1,020 s | 0 |
| NFC & QR | 1,352 s | 0 |
| Arbeiten | 1,012 s | 0 |

Lokale Laborwerte, keine Felddaten oder vollständige Core-Web-Vitals-Freigabe. INP wurde nicht als Feldmetrik ermittelt. Rohdaten liegen lokal unter artifacts/final-audit/; Screenshots und ergänzende Prüfung unter .artifacts/.

## Grenzen und nächster Schritt

Lokale Phase-5-Prüfung abgeschlossen. Vor einer Veröffentlichung bleibt eine kurze Prüfung auf echten iOS-/Android-Geräten sinnvoll, besonders für den Kontaktimport und externe Telefon-/Mail-/WhatsApp-Apps. Es wurden keine Nachrichten versendet und keine Infrastruktur-, Hosting- oder Deployment-Konfiguration verändert. Kein Deployment und kein Git-Push wurden vorgenommen. Die eigenständigen fiktiven Demo-Websites waren nicht Gegenstand einer vollständigen erneuten Prüfung.
