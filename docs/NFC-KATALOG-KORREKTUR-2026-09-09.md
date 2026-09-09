# NFC-Katalog und Hero-Ausrichtung

Auf Nutzerwunsch wurde die zusätzliche Produkttyp-/Einsatzort-Auswahl vollständig entfernt. Die bisherigen Anwendungskategorien führen wieder direkt zu allen zugehörigen Modellen. Grössenwahl, Lieferangaben und Anfragefunktionen bleiben erhalten.

Der Hero verwendet gleich breite Desktopspalten und berücksichtigt die tatsächliche Höhe der Bildunterschrift samt Pausensteuerung. Die Steuerung ist kompakter beschriftet; ihre vollständigen zugänglichen Namen und die Tastaturbedienung bleiben bestehen. Der Text-/Grafikblock schliesst in DE/EN bei 1280, 1366, 1440 und 1536 px oben und unten mit weniger als 0,04 px Abweichung ab. Auf schmaleren Tabletbreiten bleibt die Grafik proportional in ihrer Spalte und oben ausgerichtet; auf dem Handy steht sie unter dem Text. Alle sechs geprüften Breiten von 390 bis 1536 px ohne horizontalen Überlauf.

Validierung: Produktionsbuild und CSP-Härtung, Lint, TypeScript und 430 Unit-/Komponententests erfolgreich. 14 Chromium-/mobile-WebKit-Browserprüfungen für direkte Kategorienauswahl, Sprachwechsel, Anfragen und Animation bestanden. Die Tests warten jetzt über den bestehenden Hydration-Helper auf initialisierte Eventhandler; die zuvor sofort erfolgenden Interaktionen hatten sporadisch vor der Initialisierung stattgefunden. Sichtprüfung der Desktop- und Mobilansichten durchgeführt.

Website-Quellcommit: `aea86c2`; ergänzte Testsynchronisation: `8161258`. Lokale Prüfbelege unter `artifacts/filter-alignment*`.

Veröffentlicht auf https://silvandigital.ch/reviews und /en/reviews. Vercel-Deployment `dpl_AU85NgvWQG4sm2jfaZyXT5JnY9po`, https://silvan-digital-studio-1uctj65ic-silvan1.vercel.app, READY und Produktionsdomain zugewiesen. Remote-Build erfolgreich, 192 HTML-Dokumente mit CSP gehärtet. Acht Live-Browserprüfungen für direkte Kategorien und Pause bestanden; zwölf DE-/EN-Ansichten bestätigen die oben genannten Ausrichtungsmasse auf der Produktionsdomain. Hobby-Tarif unverändert.

## Nachkorrektur: gemeinsame Buttonzeile

Der Nutzer beanstandete zu Recht, dass die vorherige Messung der gesamten Figur nicht die unterschiedlich hohen Buttons erfasste. Pause/Weiter verwendet nun dieselbe Mindesthöhe wie die beiden CTA-Links. Die Figur spannt die ganze gemeinsame Höhe auf: proportionaler Film oben, Bedienzeile am unteren Rand. Von 1024 bis 1279 px erhält die Textspalte wieder mehr Breite; ab 1280 px gleich breite Spalten.

Regressionstest `tests/e2e/nfc-hero-alignment.spec.ts` prüft die Ober- und Unterkante jedes Buttons direkt, in laufendem und pausiertem Zustand, nach der echten Eingangsanimation. Zusätzlich: obere Grafikkante, unverändertes Seitenverhältnis und Überlauf. 28 lokale und 28 Live-Tests bestanden: Chromium/WebKit, DE/EN, 1024/1100/1152/1280/1366/1440/1536 px. Alle geprüften Buttonkanten unterscheiden sich um weniger als 1 px. Build, Lint und TypeScript erfolgreich; Mobilansicht bei 390 px weiterhin geprüft.

Quellcommit `8872cba`; Live-Deployment `dpl_DyEtCjjRmuEkwwXsM8XscihnxaQ8`, https://silvan-digital-studio-5jxr4pqgy-silvan1.vercel.app, READY und auf silvandigital.ch zugewiesen. Nachweise: `artifacts/hero-controls-*`. Vorheriger Deploymentstand oben bleibt als Rückweg dokumentiert.
