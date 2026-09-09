# Website-Verbesserungen – einzeln umsetzen und abnehmen

**Ziel:** Die belegten Auditbefunde systematisch beheben, ohne Referenzen, Kundenfeedback, Produktdaten oder Geschäftsergebnisse zu erfinden.

**Aktueller Abschlussstand:** Alle 21 Themen lokal umgesetzt. Themen 19–21 wurden auf ausdrücklichen Nutzerwunsch gemeinsam abgeschlossen. Keine Veröffentlichung und kein Commit. Ausführlicher Abschluss mit Prüfergebnissen und Messgrenzen: [Abschluss 19–21](../../audits/2026-09-08/abschluss-19-21.md).

**Arbeitsweise:** Genau EIN Thema pro Umsetzung. Erst aktuellen Stand lesen, Umfang konkretisieren, Thema umsetzen, passende Prüfungen durchführen und Ergebnis berichten. Danach STOPP bis zur Rückmeldung des Nutzers. Keine automatische Fortsetzung zum nächsten Thema. Der Nutzer darf Reihenfolge, Umfang oder Richtung ändern.

**Architektur:** Bestehende Next.js-/React-Hauptwebsite und getrennte Demo-Projekte erhalten. Inhalte möglichst über bestehende DE/EN-Inhaltsquellen ändern. Produktlogik, Metadaten und Demoexporte nur im jeweils zuständigen Thema anfassen.

**Technik:** Next.js, React, TypeScript, CSS Modules, Vitest, bestehende Browserprüfungen; Astro/Next.js in den Demos.

**Ausgangsbasis:** docs/WEBSITE-AUDIT-2026-09-08.md und dessen Anhänge. Vor jedem Thema Befunde am aktuellen Code erneut bestätigen. Seit dem Audit kam bereits der NFC-Chip hinzu (docs/NFC-CHIP-030.md); alte Produktanzahlen und Annahmen sind deshalb kein unveränderliches Pflichtenheft. Bestehende uncommittete Arbeit bewahren.

## Reihenfolge und klarer Umfang

Jedes spätere Thema erhält bei seinem Start einen konkreten Umsetzungsplan auf Basis des dann aktuellen Stands. Diese Liste definiert Ergebnis, Grenzen und Abnahme; sie erfindet keine heute ungeklärten Funktionen oder Produktdaten.

| Nr. | Thema | Konkrete Arbeit / betroffene Bereiche | Abnahme |
|---|---|---|---|
| 1 | Anfrage und Auftrag eindeutig unterscheiden | Nur nonBindingNotice in src/content/de.ts und en.ts; Wiederverwendung in Zusammenfassung, WhatsApp, E-Mail und Kopiertext prüfen | Anfrage bleibt unverbindlich; beide Seiten müssen Offerte annehmen; gleicher Sinn DE/EN, kein wechselnder Sprecher |
| 2 | Hauptseiten-Aussagen bereinigen | de.ts/en.ts: Popularitätsbadge sachlich ersetzen, Preisrahmen statt „feste“ Preise, absolute Geschwindigkeits-/Testzusagen präzisieren | Keine unbelegten Popularitäts-/Erfolgsgarantien; sichtbare Preise und Metadaten semantisch konsistent |
| 3 | NFC-Produktinformationen konsistent machen | de.ts/en.ts, photo-products.ts, inquiry-copy.ts, Chip-Inhalte: Formate, Grössen, Preise, Mengenpakete und Begriffe gegen aktuelle Produktdaten abgleichen | Katalog/FAQ/Formular stimmen überein; unbekannte Masse bleiben ausdrücklich unbekannt; Chipstaffel erhalten |
| 4 | Tastaturbedienung der Anfrage korrigieren | ReviewInquiryConfigurator.tsx und passende Regressionstests: Enter auf Select nicht als Absenden abfangen | Enter/Space/Pfeiltasten funktionieren nativ; echte Formularprüfung und Datenschutzschutz bleiben erhalten |
| 5 | Sprache und öffentliche Auswahl erhalten | LanguageSwitcher.tsx, ReviewsPage.tsx, Auswahl-Hook, ProjectDetail.tsx: freigegebene Modell-/Kategorieparameter erhalten; passende Demo-Sprache | Modell bleibt beim DE/EN-Wechsel erhalten; keine persönlichen Felder in URL; deutsche Demos klar benannt |
| 6 | Englische Fehlerseiten | global-not-found.tsx und Route-Gruppen: passende englische Fehlerantwort ohne verschachtelte Dokumente | Echte 404/noindex in DE/EN; verständliche lokale Rückwege für ungültige Seiten und Projektpfade |
| 7 | Falkenried-Aktionen reparieren | PropertyCard.astro, CompanyContentPage.astro, FAQ und Termin-CTAs: Immobilienanfrage, Artikel-, Partner- und Anrufaktionen ehrlich bedienbar machen | Jede Aktion führt zum bezeichneten Demoergebnis; keine echte Nachricht oder fingierte externe Aktion |
| 8 | Falkenried Englisch vervollständigen | VideoPreview.astro, i18n/nav.ts, Footer, EN-Seiten und gemeinsame Renderer | Keine versehentlichen deutschen Texte/Ziele; Demo-Stimmen gleich klar gekennzeichnet; DE unverändert nutzbar |
| 9 | Falkenried Inhalte bereinigen | Zeitlinien, 24h-/Planer-/Verified-Aussagen, Gartenreferenzen, Tippfehler und dünne/duplizierte Portaltexte | Fiktive Geschichte intern schlüssig, Democharakter und tatsächliche Funktionen deckungsgleich |
| 10 | Café-Demo vervollständigen | app/kontakt, speisekarte, ueber-uns, Start, Footer und Metadaten | Wunschzeit möglich; Menü und Generationen konsistent; Rückweg zu SILVAN; ehrlicher lokaler Demoablauf |
| 11 | Salon-Demo vervollständigen | src/app-Seiten, Teamdarstellung, Formular und Metadaten | Anfrage statt uneingelöster Buchung; Preis-/Leistungsauswahl verständlich; Teamstil einheitlich; spezifische Titel |
| 12 | Steiner und öffentliche Projektnamen | Steiner-Demo, projects.ts, legal-content.ts, zugehörige Bilder/Beschriftungen | Ein kohärenter Name je Konzept über alle Oberflächen; stabile Slugs/Links; Projektbeispiel nachvollziehbar |
| 13 | Website-Angebote entscheidungsfähig machen | WebsitesPage/ServicePage, PriceTierList, de.ts/en.ts und audit-copy.ts | Besucher können Unterschiede und Inhaltspflege erklären; nur tatsächlich angebotene Leistungen; ungeklärte Paketgrenzen gezielt mit Nutzer klären |
| 14 | NFC-Anfrage vereinfachen | ProductCatalog, ProductCard, ReviewInquiryConfigurator und CSS | Modell und Preis erkennbar, festgelegte Daten zusammengefasst, verbleibende Entscheidungen klar; Karten/Stand/Bundle/Chip getestet |
| 15 | Portfolio zu kurzen Fallstudien ausbauen | WorkPage, ProjectDetail, projects.ts und Projektbilder | Arbeit früh sichtbar; je Konzept konkrete belegbare Entscheidungen/Resultate statt identischem Ergebnissatz; klare Demo-Hinweise |
| 16 | Online-Präsenz verständlich belegen | PresencePage, Inhalte und eine klar bezeichnete Anschauung | Leistungsgrenzen/Inhaberschaft klar; Beispiel zeigt reale Problemart ohne erfundene Kundenergebnisse; Zugriff/Verifikation nur wahrheitsgemäss |
| 17 | Automation verständlich belegen | AutomationPage, Inhalte und exemplarischer Prozess | Auslöser/Verarbeitung/Ergebnis/Kontrolle verständlich; Machbarkeit, Betrieb und Zusatzkosten eingeordnet; keine erfundene Einsparung |
| 18 | Startseite und Über mich fokussieren | HomePage, AboutPage, editorial-home.module.css, pages.module.css | Hauptangebot/Arbeit/Person früh erkennbar; weniger Wiederholung und verzögerte Erstinhalte; Designidentität bewahren |
| 19 | Kontakt und Hello verbessern | ContactPage, HelloPage, ContactActions, CTA-Quellen | Passender Anfrageanlass ohne Personendaten in URL; verständlicher nächster Schritt; kompakter NFC-Einstieg; vCard nur mit vorhandenen freigegebenen Kontaktdaten |
| 20 | Rechtstexte leichter lesbar machen | LegalPage, legal-content.ts, pages.module.css | Kompakter Kopf, Inhaltsübersicht und gut erreichbare Abschnitte; keine erfundenen rechtlichen/geschäftlichen Fakten |
| 21 | Barrierefreiheit, Leistung und abschliessender Feinschliff | ProductHero, 3D-Tokens, Motion, relevante Styles und Prüfungen | Inaktive Slides sinnvoll verborgen; Fokus/Zoom/Mobil geprüft; echte Leistungsmessung dokumentiert; nur gemessene Schwächen optimieren |

## Thema 1 – konkrete Umsetzung

**Status:** Lokal umgesetzt und geprüft. STOPP vor Thema 2; Rückmeldung des Nutzers abwarten.

**Problem:** Der bestehende Hinweis stellt eine persönliche Bestätigung als Bindungspunkt dar und wird gleichzeitig in Kundennachrichten verwendet. Das passt nicht zur vorhandenen Aussage im Impressum, dass beide Seiten das Angebot annehmen.

**Entscheidung:** Nur den gemeinsamen Hinweis in beiden Sprachen korrigieren. Keine zusätzliche Checkbox, kein Checkout, keine Änderung von Preisen, Zahlungsregeln oder bestehenden Offertenbedingungen. Sprecherneutrale Formulierung eignet sich zugleich für die Website und die Nachricht des Interessenten.

**Dateien ändern:**
- src/content/de.ts: reviews.inquiry.nonBindingNotice
- src/content/en.ts: reviews.inquiry.nonBindingNotice

**Vorhandene Konsumenten prüfen, nicht umschreiben:**
- src/components/reviews/ReviewInquiryConfigurator.tsx: sichtbarer Hinweis und Kopiertext
- src/lib/whatsapp.ts: gemeinsame Nachricht für WhatsApp und E-Mail, einschliesslich NFC-Chip
- src/content/legal-content.ts: bestehender Offertenablauf als Abgleich

**Exakter deutscher Text:**

> Diese Anfrage ist unverbindlich. Ein Auftrag entsteht erst, wenn beide Seiten die Offerte mit Leistungsumfang und Gesamtpreis angenommen haben.

**Exakter englischer Text:**

> This is a no-obligation enquiry. An agreement is only formed once both parties have accepted the quote specifying the scope and total price.

- [x] Aktuelle Verbraucher und vorhandene Impressumsformulierung lesen.
- [x] Neue Chip-Änderungen berücksichtigen; bestehende Nachrichtenlogik bewahren.
- [x] Beide zentralen Texte gezielt ersetzen.
- [x] Vorhandene Tests für Inhalte, Anfrage, Fotoproduktanfrage und Chippreisnachrichten ausführen: `npx vitest run tests/unit/locales.test.ts tests/unit/review-inquiry.test.tsx tests/unit/photo-inquiry.test.tsx tests/unit/chip-pricing.test.ts`. Abschliessend 50/50 Tests in vier Dateien bestanden.
- [x] Typecheck ausführen: `npm run typecheck`. Bestanden.
- [x] Alte problematische Formulierung in aktiven Quellen suchen; nur die beiden Textänderungen gegenüber dem Turn-Ausgangsstand kontrollieren. Keine Treffer der alten Verbindlichkeitsformulierung in src.
- [x] Ergebnis und neue Formulierung berichten; vor Thema 2 stoppen.

**Prüfnotiz:** Der erste Testlauf verlangte im bestehenden englischen Inhaltsvertrag die Formulierung „no-obligation“. Diese passende bestehende Terminologie wurde beibehalten; der anschliessende vollständige Themen-Testlauf bestand. Keine Tests abgeschwächt. Kein Produktionsbuild oder Deployment in diesem Auftrag; ein bereits laufender Produktionsserver kann weiterhin den vorherigen Build zeigen.

Keine neuen Tests, die nur einen redaktionellen String nachschreiben. Bestehende Verhaltensprüfungen sichern die Wiederverwendung und den Nachrichtenablauf. Bei späteren Verhaltensänderungen zunächst reproduzierbaren Regressionstest ergänzen.

## Thema 2 – konkrete Umsetzung

**Status:** Lokal umgesetzt und geprüft. STOPP vor Thema 3; nächste Anweisung des Nutzers abwarten.

**Umfang:** Je vier zentrale Texte in de.ts und en.ts ändern. Das Business-Paket erhält ein sachliches Label für mehrseitige Websites. Die Website-Metabeschreibung benennt Preisrahmen und die schriftliche Offerte. Die Standards erklären HTML-Auslieferung und den Nutzen automatisierter Tests ohne sofortiges Laden oder Fehlerfreiheit zu garantieren.

**Abnahme:** Keine unbelegte Popularitätsaussage, keine festen Paketpreise trotz Preisbereichen und keine absoluten Ladezeit-/Testzusagen in diesen Texten. Preise, Paketumfang, Komponenten und bestehende NFC-Änderungen bleiben erhalten.

- [x] Acht Textwerte gezielt ändern und gegen den Ausgangsstand vergleichen: exakt vier Textwerte pro Sprache geändert.
- [x] Bestehende Tests für Sprachinhalte, Seiten, SEO und Rechtstexte/FAQ ausführen: `npx vitest run tests/unit/locales.test.ts tests/unit/pages.test.tsx tests/unit/seo.test.ts tests/unit/legal-and-faq.test.tsx` – 97/97 Tests bestanden.
- [x] Typecheck ausführen: `npm run typecheck` bestanden. Keine Treffer der acht alten Formulierungen in src.
- [x] Ergebnis berichten und vor Thema 3 stoppen.

**Prüfgrenze:** Kein neuer Produktionsbuild, keine Browserprüfung des geänderten Standes und kein Deployment. Der Testlauf meldet zusätzlich eine Bildkonfigurationswarnung: Projektbilder verwenden quality 90, konfiguriert ist 75. Für Thema 21 vorgemerkt; diese Textänderung berührt die Bildkonfiguration nicht.

## Thema 3 – NFC-Produktinformationen

**Status:** Lokal umgesetzt und geprüft. STOPP vor Thema 4; nächste Anweisung des Nutzers abwarten.

**Datenabgleich:** Der aktuelle Import enthält 29 Produkte: 19 Standardkarten, 6 Standardaufsteller, 1 personalisierte Karte, 2 individuell gestaltete Karten und 1 Klebechip. Nur die sechs Aufsteller haben bestätigte Masse. `photo-products.ts` zeigt bei allen übrigen Modellen bereits korrekt «Grösse nach Absprache»; die Importmasse dienen dort ausschliesslich der Visualisierung. Diese Daten und die bestehende Preisberechnung wurden nicht verändert.

**Umgesetzt in de.ts/en.ts und inquiry-copy.ts:**
- Pauschale Zusagen «beide Grössen» und eingeschränkte Formauswahl in Paketmerkmalen und FAQ durch modellabhängige Angaben ersetzt.
- Grössen in der Anfrage als Wünsche eingeordnet; tatsächliche Masse werden in der Offerte bestätigt. Bestehende Auswahlwerte bleiben kompatibel.
- Zweierpaket ausdrücklich als zwei Standardkarten bezeichnet. Chipstaffel in Preis-FAQ und Mengenhinweis ergänzt: 1 = CHF 15, 2 = CHF 25, 3 = CHF 30.
- NFC-App vom Zieldienst unterschieden; mögliche Anmeldung oder App des Zieldienstes erwähnt. Beim abgebildeten Klebechip keinen QR-Aufdruck versprochen.
- Einstiegspreise in Leistungsübersicht und SEO nach Karten und Chips unterschieden. Zugehörige strukturierte Daten in PersonSchema.tsx auf Mindestpreis CHF 15 aktualisiert.

**Prüfung:** 120/120 bestehende Tests in locales, photo-products, photo-inquiry, chip-pricing, review-inquiry, seo, person-schema und legal-and-faq bestanden. `npm run typecheck` bestanden. Die Tests prüfen unter anderem alle importierten Modelle, unbekannte Masse, Anfrageübernahme, kumulative Chippreise und Übereinstimmung sichtbarer Preise mit strukturierten Daten. Keine Tests abgeschwächt oder neue Produktdaten erfunden.

**Prüfgrenze:** Kein Produktionsbuild, keine Browserprüfung und kein Deployment. Bekannte Bildqualitätswarnung aus Thema 2 weiterhin vorhanden. Ältere Katalogeinträge im Quelltext werden vollständig durch die aktuellen Fotoimporte ersetzt; die vorhandenen Produkttests prüfen diese Zusammenführung. Bedienungsänderungen bleiben Thema 4 beziehungsweise 14.

## Thema 4 – Tastaturbedienung der Anfrage

**Status:** Lokal umgesetzt und geprüft. STOPP vor Thema 5; nächste Anweisung des Nutzers abwarten.

**Ursache:** Der Enter-Handler des Formulars schloss nur Textareas und Buttons aus. Dadurch fing er auch Enter auf nativen Selects ab und löste die Formularprüfung aus, statt die Auswahl dem Browser zu überlassen.

**Änderung:** In ReviewInquiryConfigurator.tsx greift die explizite Enter-Prüfung nur noch bei einzeiligen Inputs. Bereits behandelte Ereignisse und aktive Texteingabe-Komposition werden respektiert. Selects, Textareas und Buttons behalten ihre jeweilige Tastaturbedienung. Der bestehende Submit-Schutz gegen native Formularnavigation bleibt erhalten.

**Regression:** Zuerst Tests ergänzt und gegen den alten Code ausgeführt: beide Sprachvarianten des Select-Tests sowie der Kompositionstest scheiterten nachweislich am verhinderten Tastaturereignis. Danach minimale Handlerkorrektur umgesetzt.

**Prüfung:** 35/35 Tests in review-inquiry, photo-inquiry und chip-pricing bestanden; Typecheck bestanden. Fünf neue Testfälle decken Select-Ereignisse in DE/EN, Fehlerprüfung per Input-Enter, Zeilenumbrüche/Komposition und gültige Prüfung per Input-Enter sowie Button-Enter/Leertaste ab. Auch bei ausgefülltem Formular löst Select-Enter keine Vorschau aus. Die URL bleibt bei den geprüften Übergängen unverändert.

**Prüfgrenze:** Die DOM-Tests prüfen, dass native Select-Ereignisse nicht verhindert werden; sie simulieren nicht das geöffnete Auswahlmenü des Betriebssystems. Keine zusätzliche Browserprüfung, kein Produktionsbuild oder Deployment in diesem Thema.

## Thema 5 – Sprachwechsel und Demo-Sprache

**Status:** Lokal umgesetzt und geprüft. STOPP vor Thema 6; nächste Anweisung des Nutzers abwarten.

**Umsetzung:** LanguageSwitcher verwendet die öffentliche Katalogauswahl aus dem bestehenden URL-Hook. Auf der NFC-Seite werden ausschliesslich bekannte Kategorien und Modell-IDs sowie die Anker #inquiry/#products übernommen. Bei widersprüchlicher Kategorie bestimmt das bekannte Modell seine Kategorie. Unbekannte Parameter und persönliche Felder werden nicht in Sprachlinks kopiert. Andere Seiten übernehmen keinen Katalogzustand. Der Hook reagiert zusätzlich auf Ankeränderungen; seine bestehende Auswahlfunktion bleibt erhalten. Ohne JavaScript bleiben die grundlegenden Sprachlinks verfügbar; dynamische Auswahlübernahme setzt JavaScript voraus.

**Demos:** Explizite englische Demo-URL für Falkenried in projects.ts hinterlegt und in ProjectDetail verwendet. Englische Projektseiten kennzeichnen die drei ausschliesslich deutschsprachigen Demos sichtbar mit «German». Die lokale Falkenried-Route src/pages/en/index.astro existiert; die übrigen drei Demoquellen enthalten keine englischen Routen. Keine Demoübersetzungen in diesem Thema.

**Prüfung:** Zuerst sechs Regressionen mit dem alten Code nachgewiesen. Danach 97 Tests in language-selection, navigation, routes, photo-inquiry und review-inquiry bestanden. Zwei zusätzliche Integrationsfälle ergänzt; alle neun Tests der language-selection-Datei erneut bestanden (insgesamt 99 unterschiedliche Tests). Abgedeckt: DE→EN und EN→DE, Auswahländerungen, Kategorie ohne Modell, unbekannte IDs, widersprüchliche Kategorie, History-Ereignis, keine privaten Parameter, Modellübernahme im englischen Formular und Demo-Sprachziele. Typecheck bestanden.

**Prüfgrenze:** Keine Browserprüfung oder Liveprüfung externer Demo-Deployments, kein Produktionsbuild und kein Deployment. Bekannte Bildqualitätswarnung bleibt Thema 21. Persönliche Anfragefelder bleiben wie bisher nur im aktuellen Formularzustand und werden beim Seiten-/Sprachwechsel nicht übertragen.

## Thema 6 – Englische Fehlerseiten

**Status:** Lokal umgesetzt und mit Produktionsbuild geprüft. STOPP vor Thema 7; nächste Anweisung des Nutzers abwarten.

**Ursache und Lösung:** Beide Sprachgruppen teilen dieselbe globale Fehlerseite, die bislang fest Deutsch ausgab. Ein vorgeschalteter Proxy setzt die Sprache ausschliesslich aus dem URL-Pfad und überschreibt eingehende Sprachheader. global-not-found.tsx liest sie serverseitig und liefert das vollständige deutsche oder englische Dokument einschliesslich lokalisiertem Titel und Rückwegen. Unbekannte normale Pfade, Projekt-Slugs und tiefere englische Pfade liefern weiterhin echte HTTP-404-Antworten und noindex ohne Canonical. Es gibt genau ein html/body-Paar. Die bestehenden Sprachlayouts bleiben bestehen.

**Skriptschutz:** Die globale Fehlerseite ist jetzt dynamisch; normale Inhaltsseiten bleiben statisch. Deshalb erzeugt der Proxy einen frischen Nonce je Anfrage. Next erhält die Richtlinie als Request-Header für seine Runtime-Skripte; RootDocument setzt die gleichwertige CSP im Kopf der Fehlerseite und versieht eigene Skripte mit dem Nonce. Statische Seiten behalten ihre Build-Hashes. Die Build-Härtung nimmt ausschliesslich /_not-found aus der Static-Prüfung aus; alle anderen neuen dynamischen Seiten werden weiterhin abgelehnt. Der bestehende Sicherheitstest akzeptiert den statischen oder den Nonce-Marker, prüft aber unverändert die tatsächliche Blockierung eingeschleuster Skripte.

**Nachweis:** Gegen den vorherigen Produktionsserver auf Port 3100 bestanden die beiden deutschen HTTP-Fälle und scheiterten alle drei englischen Fälle an lang=de. Ein erster Versuch auf Port 3000 wurde verworfen, weil dort ein anderes Projekt läuft. Für den neuen Stand wurden eigene Server auf 3106/3107 verwendet. Ein fehlender JSDOM-Typ im ersten Testentwurf wurde durch echte Playwright-Browserprüfungen statt einer zusätzlichen Abhängigkeit behoben.

**Abschliessende Prüfungen:**
- `npx next build`: bestanden; normale Inhaltsseiten statisch, nur /_not-found dynamisch.
- `node scripts/harden-static-output.mjs`: bestanden, 97 statische HTML-Dokumente gehärtet.
- localized-404.spec.ts: 18/18 Prüfungen in Chromium und WebKit bestanden. Ohne JavaScript: Sprache, Status, noindex, kein Canonical, vollständiges Dokument und sichtbare Rückwege. Mit JavaScript: englische Fehlerseite hydriert, mobiles Menü funktioniert, frischer Nonce je Anfrage und Skriptinjektion blockiert. Gefälschter Sprachheader wird überschrieben; reguläre englische Projektseite und Rückweg funktionieren.
- Zwei relevante bestehende E2E-Sicherheitsprüfungen bestanden (HTTP-Header und Skriptblockierung auf regulären Seiten und 404).
- 34/34 Unit-Tests in pages, person-schema und static-csp bestanden.
- Typecheck und gezielter ESLint-Lauf bestanden.

**Referenz:** Die [Next.js-Dokumentation zu global-not-found](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) erläutert die separate Dokumentausgabe bei mehreren Root-Layouts. Das konkrete Verhalten wurde zusätzlich mit der installierten Next-Version 16.3.3 und dem Produktionsserver geprüft.

**Grenze:** Kein Deployment und keine Änderungen an Demo-Inhalten. Prebuild-Schritte für Produktbilder und Demos wurden nicht erneut ausgeführt; geprüft wurde der Next-Produktionsbuild des vorhandenen lokalen Inhaltsstands samt HTML-Härtung. Die ausschliesslich für diesen Auftrag gestarteten Prüfserver wurden beendet. Der Next-Server protokolliert bei den unbekannten statisch begrenzten Projekt-Slugs interne `NoFallbackError`-Meldungen; die zugehörigen HTTP-Antworten und Browserprüfungen bestanden dennoch vollständig. Diese Framework-Logmeldungen sind nicht als behoben ausgewiesen.

## Themen 7–9 – Falkenried gemeinsam

**Status:** Auf ausdrücklichen Nutzerwunsch gemeinsam umgesetzt und geprüft. STOPP vor Thema 10.

**Thema 7 – Aktionen:**
- Immobilienkarten haben echte Anfrage-Links. Die Auswahl übernimmt den genauen Objekttitel in das lokale Formular und setzt den Tastaturfokus darauf. Ein schon eingegebener Nachrichtentext bleibt erhalten. Ohne JavaScript führt der Anker zum weiterhin gesperrten Demoformular.
- Nachrichtenkarten versprechen keinen externen Originalartikel mehr; der Beispielstatus ist direkt an der Karte sichtbar. Es wurden keine zusätzlichen Originalartikel erfunden.
- Partner-Aktionen führen zum passenden lokalen Demo-Kontakt. Bewerbungs- und Telefonaktionen benennen ihren tatsächlichen Demo-Effekt.
- Werkstatt-CTAs und Prozess beschreiben eine lokale Serviceanfrage, keinen externen Buchungsplaner oder reservierten Termin.

**Thema 8 – Englisch:**
- VideoPreview rendert sein tatsächliches Bildporträt samt Text, Alt-Text und History-Link in der jeweiligen Sprache; es wurde kein Video vorgetäuscht.
- Navigation, Kontaktlinks, Telefon-/Faxplatzhalter, Footer, FAQ-Bereichstitel, Werkstattüberschrift und rechtliche Metabeschreibungen lokalisiert.
- Beispielstimmen auf Englisch übersetzt und wie auf Deutsch unmittelbar als fiktiv gekennzeichnet.

**Thema 9 – Inhalt:**
- Fiktive Chronik konsistent: Gründung 1969, Werkstattausbau statt abweichender Partnerschaftsbehauptung, Immobilienbereich seit 2000. Ortsdopplungen bereinigt.
- Aktive 24-Stunden-Rückmeldezusagen auf Start-, Garten- und Kontaktseiten entfernt; lokale Demo sendet nichts und löst keine Antwort aus.
- Verifizierungsbehauptungen und unerklärtes Preissternchen in den Werkstatt-Portalseiten durch klaren Beispielstatus ersetzt. Fahrzeugseite benennt das Konzept statt geprüfter verfügbarer Fahrzeuge.
- Gartenreferenzen als Bildideen bezeichnet; Planung, Pflege und Transport erhalten unterschiedliche konkrete Anfragehinweise statt wiederholtem Hero-Intro. Zubehörseite erklärt benötigte Fahrzeugangaben am Dachtransportbeispiel.
- Fiktive Nachrichten und Partner konsistent beschrieben; Jobs/Veranstaltungen bleiben ehrliche Demo-Leerzustände.

**Prüfung:**
- Die zwei neuen Aktions-Regressionstests scheiterten zunächst am alten Code; abschliessend alle 36 Falkenried-Node-Tests bestanden.
- Zehn Browserprüfungen in Chromium/WebKit bestanden: DE/EN-Objektübernahme mit Enter, Fokus, bestehender Nachrichtentext, lokale Bestätigung ohne POST, Nachrichten-/Partner-/FAQ-Aktionen sowie englische Porträt-/Serviceziele. Erste URL-Erwartungen wurden an die tatsächliche Next-Normalisierung ohne abschliessenden Slash angepasst; Zielpfade blieben unverändert geprüft.
- Vollständiger `npm run build` im Hauptprojekt einschliesslich Demo-Builds, lokaler Synchronisierung und CSP-Härtung bestanden. Nach abschliessendem Falkenried-Textabgleich dessen 45 Seiten erneut gebaut, lokal synchronisiert und gehärtet.
- Alle 45 erzeugten Falkenried-Seiten auf interne Seitenlinks geprüft: keine fehlenden Ziele. Gezielter Scan auf die bekannten deutschen EN-Resttexte ohne relevante Treffer.
- Astro Check: 0 Fehler, 0 Warnungen, 29 Hinweise (unter anderem bestehende veraltete Zod-API und ungenutzte Imports). Hauptprojekt-Typecheck und ESLint der neuen Browsertests bestanden.

**Grenzen:** Kein Deployment, keine realen Nachrichten, Termine, Originalartikel oder Kundenergebnisse. Die Build-Ausgabe «published» des Sync-Skripts bezeichnet ausschliesslich Dateien im lokalen public-Verzeichnis. Die anderen Demos wurden durch die vorhandene Build-Pipeline nur neu erzeugt; deren geplante Verbesserungen sind weiterhin offen. Zwölf Themen bleiben (10–21). Der eigene Prüfserver auf Port 3109 wird beendet.

## Themen 10–12 – Café, Salon und Steiner gemeinsam

**Status:** Auf Nutzerwunsch gemeinsam lokal umgesetzt und geprüft. STOPP vor Thema 13. Noch neun Themen (13–21).

**Thema 10 – Café:**
- Einheitlicher Name Café & Konditorei Vogel in Demo, Portfolio und Konzeptliste der Rechtstexte.
- Gemeinsame Menüquelle für Startseite und Speisekarte; Frühstücksfrüchte und fehlende Backwaren angeglichen. Zwei Generationen, Ofenbeschreibung und regionale Aussagen konsistent; Beispielstimme ausdrücklich fiktiv.
- Pflicht-Wunschzeit in halbstündigen Schritten innerhalb der dargestellten Öffnungszeiten. Datumwechsel setzt die Zeit zurück. Feiertagszeiten können ausdrücklich ausprobiert werden; kein erfundener Feiertagskalender und keine Verfügbarkeitsprüfung.
- Bestätigung zeigt Datum, Zeit und Personenzahl als lokale Vorschau. Frühere Demokennzeichnung, Rückweg zu SILVAN und individuelle Seitenmetadaten.

**Thema 11 – Salon:**
- Anfrage statt Buchung; gemeinsamer Katalog mit zwölf Leistungen und Richtpreisen. Bekannte Leistungs-IDs werden aus der Leistungsseite in die Kontaktseite übernommen; unbekannte und doppelte Werte bleiben unbeachtet.
- Wunschdatum und Wunschzeit ergänzt, lokale Zusammenfassung mit Leistung. Freie Terminwünsche ohne Verfügbarkeitsbehauptung; kein Versand und keine Terminbuchung.
- Teamdarstellung einheitlich mit Initialen, Biografien als fiktiv bezeichnet; Schweizer Schreibweise und Metadaten der vier Seiten angeglichen.

**Thema 12 – Steiner und Projektnamen:**
- Portfolio und Metadaten auf den vorhandenen Namen Steiner Bau abgestimmt. Slug steiner-handwerk und bestehende URLs erhalten.
- Vier Projektbeispiele erhalten individuelle Erklärungen als Gestaltungsideen. Über-uns-Einstieg beschreibt die Arbeitsweise. Leistungspfeile übernehmen die gewählte Leistung ins Formular und setzen den Fokus; neue Demo-Anfrage leert das Formular.
- Vorschaubilder aller drei Demos frisch aufgenommen. Englische Portfolioansichten zeigen die tatsächlich deutschsprachige Demo; die bisherige rein für Screenshots eingesetzte Textübersetzung wird nicht mehr ausgeführt. Alt-Texte und Bilddokumentation entsprechend angepasst.

**Prüfung:**
- Vollständiger npm run build einschliesslich aller Demoexporte, lokaler Synchronisierung und CSP-Härtung erfolgreich (97 HTML-Dokumente). Kein Deployment.
- Zwölf E2E-Prüfungen in Chromium, WebKit und mobilem Safari bestanden: Zeitwechsel, Feiertagsauswahl, Leistungsübernahme, lokale Bestätigung, unbekannte URL-Werte, Steiner-Fokus/Zurücksetzen und Namenskonsistenz.
- Zwölf Formular-Sicherheitsprüfungen bestanden: drei Demos jeweils ohne JavaScript, mit blockierten Skripten, per Enter und per Klick. Ohne Handler bleiben Felder gesperrt; kein Versand, kein Formular-URL-Wechsel und kein Local-/Session-Storage beim geprüften Ablauf.
- Fünf Café- und zwei Salon-Tests sowie deren Typechecks bestanden. Hauptprojekt-Typecheck und gezieltes ESLint der Browsertests bestanden; Salon-Lint ohne Fehler mit bestehender Bildwarnung.
- Neun Screenshotdurchläufe (je Demo Desktop DE/EN und 390px mobil) ohne defekte Bilder, horizontalen Überlauf oder JavaScript-Ausnahmen. Café/Salon-Desktop und Steiner-Mobilansicht zusätzlich visuell kontrolliert.

**Prüfhinweis:** Die bisherigen Screenshot-/Formularscripts warteten mit networkidle auf dauerhafte Next-Prefetch-Anfragen der lokal eingebetteten statischen Demos. Die Wartebedingung wurde auf load plus konkrete Inhalts-/Formularprüfungen geändert. Der Sicherheitslauf unterscheidet anfängliche GET-/HEAD-Vorababrufe von der Formularaktion, prüft Eingaben auf Datenabfluss und erwartet beim Absenden weiterhin keine neue Anfrage. Die Hintergrundabrufe selbst sind damit nicht als behoben ausgewiesen.

**Grenzen:** Keine echten Kundenstimmen, Ergebnisse oder Buchungen ergänzt. Demo-Geschäftsdaten bleiben fiktiv. Änderungen und Bilder liegen lokal; eigenständige Live-Demo-Deployments wurden nicht aktualisiert. Eigener Prüfserver auf Port 3110 beendet. Thema 13 ist als Nächstes vorgesehen.

## Themen 13–15 – Angebote, NFC-Anfrage und Fallstudien

**Status:** Auf Nutzerwunsch als nächste Dreiergruppe lokal umgesetzt und geprüft. STOPP vor Thema 16; sechs Themen (16–21) bleiben.

**Umsetzungsentscheidungen:** Bestehende Preisstufen anhand vorhandener Leistungen erklären, keine neuen Paketgrenzen festlegen. Bei einer Modellanfrage bereits festgelegte Daten zusammenfassen, offene Entscheidungen editierbar lassen. Im Portfolio die Arbeit früher zeigen und vier unterschiedliche Funktionsbelege aus den Demoquellen beschreiben. Angebote und Portfolio wurden getrennt bearbeitet, NFC und Integration durch den Hauptagenten; anschliessende unabhängige Quelltextprüfung ohne wesentliche Befunde.

**Thema 13 – Website-Angebote:**
- Vier bestehende Preise unverändert. Einsatzzwecke unterscheiden kompakte Einzelseite, mehrseitige Unternehmenswebsite, umfangreich gegliederte Inhalte und individuell geplante Anforderungen.
- Preisrahmen ausdrücklich als Richtwerte bezeichnet; unklare Pflegeversprechen ersetzt.
- Sichtbarer Abschnitt und passende DE/EN-FAQ zur späteren Inhaltspflege: selbst bearbeiten setzt eine vereinbarte Bearbeitungslösung voraus. CMS, bearbeitbare Inhalte, Einführung, Zuständigkeit und laufende Kosten sind Gegenstand der Offerte, keine automatisch enthaltenen Leistungen.
- Keine Seitenhöchstzahlen, Korrekturrunden, Termine oder Wartungspreise erfunden. Gemeinsamer ServicePage-/Preisrenderer unverändert.

**Thema 14 – NFC-Anfrage:**
- Gewähltes Modell mit Produktfoto, Preis und vorhandenen Modellangaben zusammengefasst. Passende vorbelegte Werte werden als Daten angezeigt und müssen nicht nochmals in Auswahlfeldern bestätigt werden.
- «Auswahl anpassen» öffnet die Entscheidungen wieder. Eine geänderte Produktart/Form entfernt die alte Modellzuordnung, erhält aber Kontaktangaben und Menge. Der universelle Klebechip behält bei einer anderen Zielanwendung seine Modellzuordnung.
- Formulare ohne Modell behalten die freie Auswahl. Karten, rechteckige Modelle, Aufsteller, Zweierpakete und Klebechip geprüft. Unbekannte Masse bleiben nach Absprache; keine erfundenen Abmessungen.
- Fokus geht zum ersten verbleibenden Feld beziehungsweise ersten Fehler. Ein später Modell-Fokuseffekt unterbricht keine bereits begonnene Eingabe. Vorschau, WhatsApp, E-Mail und Kopiertext bleiben konsistent.
- Zweierpakete nennen in Vorschau und Nachricht jetzt auch die Kartenanzahl, beispielsweise «2 Pakete (4 Karten)». Chipstaffel unverändert.

**Thema 15 – Portfolio:**
- Kompakterer Übersichtskopf und Detailkopf; erste Projektvorschau auf Desktop und 390px bereits im ersten Bildschirmbereich.
- Individuelle Gestaltungsentscheidungen und funktionale Ergebnisse für alle vier Konzepte, auch in der Übersicht. Beispiele: DE/EN-Objektübernahme, Café-Wunschzeiten, Steiner-Leistungsübernahme, Salon-Leistungs-/Terminwünsche.
- Fiktiver Konzeptstatus und fehlende Geschäftsmessungen separat erklärt. Keine Kundenaufträge oder Erfolgskennzahlen erfunden.
- Die in 10–12 aktualisierten Bilder erhalten eine Versionskennung: Sichtprüfung hatte noch einen alten optimierten Café-Screenshot gezeigt. Next erlaubt dafür ausschliesslich die sechs konkreten Bildpfade mit der festgelegten Version; andere Bild-Querys bleiben gesperrt. Dateinamen, Projekt-Slugs und Demo-Sprachziele erhalten.

**Nachweise:**
- 182 Tests in zwölf relevanten Unit-/Komponentendateien bestanden. Nach letzten Änderungen an Paketdarstellung/Fokus die 38 betroffenen Tests erneut erfolgreich, ebenso die zwei Projektbildtests nach Bildversionierung.
- 24 Browserprüfungen in Chromium und mobilem Safari bestanden: DE/EN-Karten, rechteckige Modelle, Aufsteller, Wechsel zum Zweierpaket, Chip mit 3D/Mengenpreis, Angebotsabschnitt, früher Portfolioeinstieg und alle acht Projektseiten.
- Ein mobiler Chip-Lauf zeigte einen Fokuswettlauf; nach Korrektur sechs zusätzliche Wiederholungen (DE/EN jeweils dreimal) erfolgreich.
- Abschliessender Next-Produktionsbuild und CSP-Härtung für 97 HTML-Dokumente bestanden. Demoquellen unverändert; deren bereits erzeugte Exporte wurden verwendet.
- TypeScript, gezieltes ESLint und Diff-Prüfung erfolgreich. Desktop-/Mobilaufnahmen von Portfolio und Formular visuell geprüft; tatsächliche aktualisierte Café-Vorschau bestätigt. Bildoptimierung liefert für freigegebene Version HTTP 200, für fremde Version HTTP 400.

**Grenzen:** Kein Deployment und kein Commit. Externe Demo-Deployments müssen bei einer späteren Veröffentlichung mit dem lokalen Stand abgeglichen werden. Eine im Unit-Test-Image-Mock ausgegebene Qualitätswarnung (90 gegenüber dessen Standard 75) bleibt; der Produktionskonfiguration sind beide Qualitätsstufen bereits bekannt. Eigener Prüfserver auf Port 3111 beendet. Nächstes Thema: 16, Online-Präsenz verständlich belegen.

## Themen 16–18 – Präsenz, Automation und persönliche Einstiege

**Status:** Auf Nutzerwunsch gemeinsam lokal umgesetzt und geprüft. STOPP vor Thema 19. Noch drei Themen (19–21).

**Entscheidungen:** Zwei klar als hypothetisch bezeichnete Anschauungen erklären die Leistungen ohne erfundene Kundenergebnisse. Bestehende Preisangaben bleiben erhalten. Auf Startseite und Über mich werden vorhandenes Angebot, Arbeit und echtes Porträt früher sichtbar. Keine neue Biografie oder Berufserfahrung ergänzen.

**Thema 16 – Online-Präsenz:**
- Google/Maps und der tatsächlich vereinbarte Profilumfang klar benannt. Standorte, andere Plattformen, Websiteänderungen und laufende Pflege werden ausdrücklich abgegrenzt.
- Inhaberschaft bleibt beim Kunden; Administratorzugriff ohne Passwortweitergabe, fehlender Zugang und Google-Bestätigung erläutert. Offizielle Google-Dokumentation zu Rollen, Bestätigung und Drittanbietern geprüft und direkt verlinkt.
- Hypothetischer Reparaturbetrieb zeigt widersprüchliche Samstagszeiten und fehlende Leistungsangaben: Vorher, gemeinsame Prüfung, angestrebter korrigierter Stand. Keine gemessene Wirkung oder Rankingzusage.

**Thema 17 – Automation:**
- Statische Anschauung einer Aufgabenliste zum Wochenbericht: Auslöser, Prüfung/Verarbeitung, Berichtsentwurf und menschliche Freigabe samt Fehlerfall.
- Datenzugang, Schnittstellen, Berechtigungen, Betriebsverantwortung, Fehlermeldungen, Wartung und externe Gebühren als konkrete Klärungspunkte.
- Unverbindlicher Erstkontakt von beauftragter Analyse/Umsetzung getrennt. Absolute Aussage «Alles … lässt sich automatisieren» durch eine bedingte Machbarkeitsaussage ersetzt.
- Keine tatsächlich laufende Automation, Kundenintegration oder Zeitersparnis vorgetäuscht.

**Thema 18 – Startseite und Über mich:**
- Startseite: Erklärung und Kontaktaktion stehen in der Lesereihenfolge vor dem Projektbild. Desktopanordnung erhalten; erzwungene Bildschirmhöhen im Hero-/Leistungsbereich entfernt und Abstände reduziert.
- Über mich: Einleitung und echtes vorhandenes Porträt im gemeinsamen Einstieg. Titel/Einleitung/Porträt werden ohne gestaffelte Einblendung dargestellt. Bestehende Aussagen bleiben erhalten; Prüfmethoden als Arbeitsweise statt uneingeschränkter Zugänglichkeitszusage formuliert.
- Neues konkretes Beispiel verweist auf die vorhandene modellbasierte NFC-Anfrage. Kein erfundener persönlicher Hintergrund.
- Bei der 320px-Prüfung zeigte die englische Leistungsliste 10px horizontalen Überlauf. Die implizite Mindestbreite ihrer Grid-Spalten wurde korrigiert; beide Sprachen passen nun auch bei 320px.

**Prüfung:**
- 75 bestehende Unit-/Komponententests (pages, locales, legal-and-faq) bestanden; TypeScript und gezieltes ESLint erfolgreich.
- Abschliessend zwölf Browserprüfungen in Chromium und mobilem Safari bestanden: DE/EN-Erklärungs-/Kontaktreihenfolge, früher Porträteinstieg, echtes Modellziel samt Fokus, Beispielabschnitte, Kontaktwege und alle vier Seiten bei 320px ohne horizontalen Überlauf.
- Desktop-/Mobilaufnahmen angefertigt und Startseite, Porträteinstieg sowie beide Beispiele visuell kontrolliert. Ein langer Element-Screenshot enthielt eine Aufnahmeartefakt-Überlagerung des festen Headers; eine normale mobile Viewportaufnahme bestätigte die korrekte Darstellung.
- Abschliessender Next-Produktionsbuild und CSP-Härtung von 97 HTML-Dokumenten bestanden. Demoquellen unverändert. Unabhängige Quelltextprüfung ohne wesentliche Befunde; Diffprüfung erfolgreich.

**Grenzen:** Keine Veröffentlichung, kein Commit und keine echten externen Änderungen. Beispiele sind Anschauungen und verarbeiten keine Geschäftsdaten. Die bekannte Unit-Test-Image-Mock-Warnung zur Bildqualität bleibt ohne Produktionsbuildfehler. Eigener Prüfserver auf Port 3112 beendet. Nächstes Thema: 19, Kontakt und Hello verbessern.

## Themen 19–21 – Kontakt, Rechtstexte und Abschlussprüfung

**Status:** Gemeinsam lokal umgesetzt und geprüft; die vereinbarte Reihe ist abgeschlossen.

- Kontakt/Hello: kompakte Einstiege, öffentlicher Anfragegrund mit passenden Kontaktentwürfen und Sprachwechsel, echte vCard aus bestehenden Kontaktdaten.
- Rechtstexte: statische lesbare Darstellung, Inhaltsübersicht, direkte Abschnittslinks und verlässliche Fokusziele in DE/EN.
- Feinschliff: inaktive Produktbilder für Screenreader verborgen; gemeinsame CSS-/WebGL-Farbtokens; Mobile-first-Konvention korrigiert.
- 387 Unit-/Komponententests bestanden, Produktionsbuild inklusive TypeScript und CSP-Härtung erfolgreich. 18 Browserprüfungen für das neue Paket samt 3D bestanden; nach letztem Build weitere 24 Prüfungen für Themen 16–21 bestanden.
- 30 Seiten automatisch auf WCAG-A/AA-Regeln geprüft, ohne automatisch gefundene Verstösse. Mobile Darstellung, Textvergrösserung, Abschnittsfokus und vCard-Download geprüft. Drei mobile Labormessungen je Startseite, NFC und Portfolio dokumentiert.
- Details, Messwerte und Grenzen: [Abschlussbericht](../../audits/2026-09-08/abschluss-19-21.md). Offen bleiben Veröffentlichung/Liveprüfung und echte Rückmeldungen bzw. noch nicht bestätigte Angaben; keine perfekte Punktzahl behauptet.

## Informationen, die nicht erfunden werden

Echte Kundenstimmen, Namen realer Kunden, Geschäftsergebnisse, Produktmaterialien/-masse, verbindliche Paketgrenzen, Lieferzeiten, Antwortgarantien und beruflicher Hintergrund werden nur aus bestätigten Angaben übernommen. Wo erforderlich, stellt der jeweilige Auftrag eine konkrete Frage; alle davon unabhängigen Teile werden vorher erledigt.

## Abschluss jedes Themas

Berichten: geändert, praktisch verbessert, geprüft, verbleibende Grenze. Nutzer entscheidet anschliessend über Fortsetzung. Liveveröffentlichung wird nicht stillschweigend mit jedem kleinen Auftrag gekoppelt; lokal umgesetzter Stand und öffentlich sichtbarer Stand werden ausdrücklich unterschieden.
