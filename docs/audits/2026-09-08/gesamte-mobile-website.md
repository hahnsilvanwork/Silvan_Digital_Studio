# Mobile Optimierung der gesamten Website

Stand: 8. September 2026. Hauptwebsite auf Deutsch und Englisch sowie alle vier Demo-Websites. Bestehende Gestaltung, Angebote und Preise bleiben erhalten.

## Grundlage und Vorgehen

- [W3C: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html): Inhalte bei 320 CSS-Pixeln ohne seitliches Scrollen lesen können.
- [W3C: Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html): ausreichend grosse beziehungsweise getrennte Klickflächen. 24px ist das AA-Minimum mit Ausnahmen; für eigenständige wichtige Bedienelemente verwenden wir 44px. Links im Fliesstext werden nicht künstlich zu grossen Buttons.
- [web.dev: Formulargestaltung](https://web.dev/learn/forms/styling): lesbare Formularfelder, verständliche Beschriftungen und native Bedienelemente.

Erst den bestehenden Build gemessen und Screenshots betrachtet, dann konkrete Probleme behoben. Kein Austausch gegen ein neues Design und keine erfundenen Kundenbelege.

## Hauptwebsite

| Befund | Umsetzung |
| --- | --- |
| Bei 200% Grundschrift ragten Sprachwahl und Menü aus dem 320px-Bildschirm. | Header darf umbrechen; wichtige Kopfbedienelemente behalten 44px Mindestfläche. |
| Nach Scrollen in einem kurzen Menü war Schliessen ausserhalb des Bildes. | Schliessen bleibt im scrollbaren Menü sichtbar. Die aktuelle Seite ist zusätzlich unterstrichen. |
| Ein gewachsener Header kann Sprungziele überdecken. | Tatsächliche Headerhöhe wird beobachtet und als Scrollabstand genutzt. |
| Leistungsseiten reservierten am Handy unnötig 85% Bildschirmhöhe. | Mobile Höhe richtet sich nach dem Inhalt; Desktopgestaltung bleibt erhalten. |
| Quellen- und Rücklinks waren teils nur 15–35px hoch. | Eigenständige Links in Rechtsseiten, Online-Präsenz und FAQ bekommen mindestens 44px Höhe. |
| E-Mail-Adresse brach bei 320px mit isolierter Endung um. | Schriftgrösse richtet sich nach verfügbarem Platz, mit skalierbarer Mindestgrösse. |
| Grosse Schrift verursachte Überbreiten in Preisen, Listen, Formularbeschriftungen und Projektinformationen. | Schrumpfbare Gridspalten und Textumbruch statt erzwungener einzeiliger Inhalte. |
| Produktbildsteuerung wurde bei grösserer Schrift breiter als ihr Container. | Symbolsteuerung bleibt 44px gross und erreichbar. |

Die Produktreihenfolge bleibt aufsteigend: CHF 15, 49, 69, 99. Mengenrechner, Produktübernahme und unverbindliche Anfrage bleiben funktionsfähig.

## Demo-Websites

- **Falkenried:** 19px Seitenüberlauf bei Servicestation-Karten behoben, Menüknopf 44px.
- **Café:** Menüknopf 44px; Menü auf kurzen Displays scrollbar; Escape funktioniert auch nach Touchbedienung; Formularfelder mindestens 16px; grössere Feiertagsauswahl.
- **Steiner:** Alle Menüpunkte auch im Querformat erreichbar.
- **Salon:** Scrollbares Menü auf kurzen Displays; Auswahlfeld 16px und sichtbarer Fokus.

## Prüfung

- 30 Hauptseiten bei 320, 390, 768 und 1280px sowie mit 200% Grundschrift bei 320px: **150 Messungen ohne Dokumentüberlauf**. Vergrösserte Schrift ist ein zusätzlicher Stresstest, keine vollständige Simulation aller Systemeinstellungen echter Handys.
- Auf der Startseite meldet der feinere Elementscanner bei 200% Schrift 3px Überstand der gedrehten Pfeilgrafiken. Diese bleiben innerhalb des Seitenrandes; keine abgeschnittenen Inhalte und kein seitliches Seitenscrollen.
- 407 Unit-Tests bestanden. Ein überlasteter paralleler Durchlauf hatte vier Zeitüberschreitungen; der abschliessende Durchlauf mit zwei Workern besteht unverändert.
- Vollständige Browser-Suite: 443 bestanden, 21 vorgesehene Ausnahmen. Nach den letzten kleinen CSS-Korrekturen zusätzlich 36 relevante Tests in Chromium und mobilem WebKit bestanden.
- Die vier neuen Menü-Regressionsfälle schlugen am alten Build fehl; alle 16 Kombinationen in Chromium, Firefox, WebKit und mobilem WebKit bestehen nach der Korrektur.
- Automatischer axe-Test aller 30 Hauptseiten bei 390px: keine Verstösse gegen die geprüften WCAG-2A/AA- und 2.1AA-Regeln.
- Demos: 448 Messungen über 56 Export-Routen, vier Breiten und Chromium/WebKit ohne Seitenüberlauf oder Formularschrift unter 16px. Acht zusätzliche Menütests bei 667×320 bestanden.
- Vier Demo-Builds, Next-Produktionsbuild, CSP-Nachbearbeitung und ESLint bestanden.
- Bereits veröffentlichte Demos: 44 Falkenried-, fünf Café-, zwei Steiner- und fünf Salon-Routen einschliesslich der geprüften Linkziele live bestanden.
- Hauptwebsite und alle vier Demos veröffentlicht. 48 gezielte Live-Browserfälle bestanden: 43 im ersten Durchlauf; fünf Navigationstimeouts während eines gemeldeten Netzwerkwechsels bestanden unverändert im gezielten Nachlauf mit einem Worker.

Rohdaten und Screenshots liegen unter `artifacts/mobile-site`, `artifacts/mobile-content`, `artifacts/mobile-demos` und `artifacts/final-audit/mobile-site-*`.

## Grenzen

Die Website ist damit in den geprüften mobilen Situationen deutlich robuster. Eine Garantie für jedes Gerät oder eine vollständige WCAG-Zertifizierung wäre nicht belegt. Echte iPhone-/Android-Bedienung mit Bildschirmtastatur und reale Nutzungsdaten bleiben sinnvolle ergänzende Kontrollen. Lokale Last-/Netzwerksimulationen ersetzen keine gemessenen Core Web Vitals echter Besucher.
