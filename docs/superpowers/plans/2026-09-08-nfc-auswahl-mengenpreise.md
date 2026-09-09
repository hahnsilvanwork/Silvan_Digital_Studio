# NFC-Auswahl und Mengenpreise – Umsetzung

**Auftrag:** Direkt vom Nutzer zum Planen und Umsetzen freigegeben. Bestehenden Stil und Modelldaten verwenden, keine zusätzlichen Produktvarianten erfinden. Kein Commit/Deployment; abschliessend lokalen Produktionsserver aktualisieren.

**Design:** Beide Einstiege nutzen dieselbe Modellauswahl. Produktbild und bestehender Anfrage-Link führen zur bebilderten Vorauswahl unten. Im freien Formular werden passende vorhandene Modelle vorgeschlagen; erst eine ausdrückliche Auswahl übernimmt deren Angaben. Persönliche Eingaben bleiben erhalten. Vorschläge überschreiben keine Auswahl automatisch. Nicht passende Kombinationen bleiben als individuelle Anfrage möglich.

**Architektur:** Gemeinsame URL-Auswahl im vorhandenen Catalogue-Hook; reine Matching-Funktion neben den bestehenden Presets; kleine Vorschlagskomponente. Preisberechnung zentral in product-pricing.ts, mit denselben Angaben in Formular, Zusammenfassung und Kontaktentwürfen. DE/EN gleichwertig.

## Arbeitspakete

- [x] Preisfunktion und Grenztests: Standard 49/80/+20, Sticker 15/25/+5, Personalized 69/100/+25, Customized 99/150/+30. Mengen 1,2,3,10,11 und ungültige Werte prüfen. Über 10 nur Grundpreis vor zusätzlichem Rabatt; Versand separat. Aufsteller unverändert, mehrere auf Anfrage.
- [x] Preiskachel Zweierpaket durch Sticker ersetzen; Kartenstaffeln, FAQ und Mengenrabatttext DE/EN aktualisieren. Doppelte Paket-/Stückzählung aus der normalen Auswahl entfernen.
- [x] Katalogbild als zugänglichen Link zur vorhandenen bebilderten Anfrage gestalten. Gemeinsame Anfrageaktion setzt Hash vor dem Auswahlereignis; Modellwechsel und Wiederwahl funktionieren ohne Verlust persönlicher Angaben.
- [x] Passende Modelle anhand Anwendung, Produkt und Form ermitteln. Unbestimmte Felder filtern nicht; erst nach Produktwahl Vorschläge zeigen. Freie vollständig individuelle Ziele erlauben passende frei gestaltbare Karten; Stickerdestination bleibt frei wählbar. Keine abweichenden Modelle als passend ausgeben.
- [x] Vorschläge mit echten Bildern und ausdrücklicher Übernahme anbieten. Kein Treffer: individuelle Anfrage bleibt möglich. Bei Produktwechsel abhängige ungültige Form/Grösse zurücksetzen; keine alten Modellnamen in Zusammenfassung behalten.
- [x] Gesamtpreis in Formular, Modellvorschau und Zusammenfassung anzeigen; Mail/WhatsApp/Kopieren teilen dieselbe Berechnung. Mengenangaben sind Stück, kein versteckter Paketmultiplikator.
- [x] Unit-/Komponententests, TypeScript/Lint, Produktionsbuild/CSP und Browserchecks DE/EN (Mobil/Desktop): Bildklick, Modellwechsel, freie Vorschläge, Eingabenerhalt, Preise, >10 Hinweis, 320px, Linkentwürfe ohne Versand.
- [x] Änderungen/Prüfgrenzen dokumentieren und Website unter localhost:3113 mit neuem Build laufen lassen.

Alternative eines automatisch gewählten ersten Treffers verworfen: Bei mehreren Farben/Designs wäre das eine unbegründete Auswahl. Ein getrenntes Formular pro Produkt würde vorhandene Funktionen duplizieren. Die vorhandene gemeinsame Auswahl wird daher erweitert.

## Ergebnis und Prüfung

Lokal umgesetzt am 8. September 2026. Katalogbilder und Modellanfrage öffnen dieselbe bebilderte Vorauswahl. Im freien Formular erscheinen bis zu vier passende Modelle mit einer Aktion zum Anzeigen aller Treffer. Die ausdrückliche Übernahme erhält Menge, Notizen und Kontaktdaten; beim neutralen Sticker bleibt die gewählte Zielanwendung erhalten. Nicht passende Kombinationen werden als individuelle Anfrage gekennzeichnet. Alle vier Staffeln sind zentral berechnet und in DE/EN dargestellt, einschliesslich Kontaktentwürfen. Das frühere Zweierpaket ist aus der normalen Auswahl entfernt; Mengen sind Stückzahlen.

- 406/406 Unit-/Komponententests bestanden, darunter neue Matching-, Eingabenerhalt- und Preistests.
- 36/36 Browserprüfungen in Chromium und mobilem Safari bestanden: Bildklick, Wiederwahl, direkte Modelllinks, individuelle Formularauswahl, Fokus, 320px, Chip-3D, Preise und Kontaktentwürfe sowie Regressionen früherer Einstiege.
- Produktionsbuild inklusive TypeScript und CSP-Härtung für 97 HTML-Dateien bestanden. ESLint erfolgreich.
- Neue Vorschlags- und Auswahlansicht mit axe geprüft: keine automatisch gefundenen Verstösse; mobile Aufnahmen visuell kontrolliert.
- Unabhängiges Review fand fehlenden Tastaturfokus nach Vorschlagsübernahme und eine veraltete Katalogzählung bei externem Kategorienwechsel; beide korrigiert. Browserprüfung fand ausserdem einen sehr frühen Formularzugriff vor Hydration; Eingabefelder warten nun auf die aktive Formularlogik.

Der neue Produktionsstand läuft auf http://localhost:3113/reviews. Kein Deployment/Commit, keine echten Nachrichten gesendet. Über 10 Stück wird der reguläre Staffelpreis vor einem zusätzlichen individuell vereinbarten Rabatt angezeigt. Aufsteller bleiben bei CHF 49 für ein Stück, mehrere auf Anfrage. Die bekannte Image-Qualitätswarnung im Unit-Test-Kontext besteht unabhängig von der erfolgreichen Produktionskonfiguration fort.
