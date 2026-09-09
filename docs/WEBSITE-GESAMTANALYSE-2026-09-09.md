# SILVAN Digital Studio – Gesamtanalyse und Verbesserungsplan

Method: dual-agent (A: /root/design_review · B: /root/browser_evidence), ergänzt um aktuelle Live-Messungen, Codeprüfung und Recherche durch den Hauptagenten. Stand: 9. September 2026.

## Urteil

Die Website ist bereits professionell, glaubwürdig und in den geprüften Situationen schnell. Der sichtbare Auftritt liegt nach fachlicher Einschätzung ungefähr bei **7,5/10**. Das ist ein Orientierungsurteil, kein errechneter Qualitätsindex, keine Conversionmessung und keine Bewertung des künftigen Unternehmensgewinns. Für einen herausragenden Auftritt fehlt vor allem eine klarere Übersetzung der vorhandenen Fähigkeiten in sichtbare Kundenvorteile sowie bessere Auswahlführung. Ein kompletter Neubau ist durch die Befunde nicht begründet.

Ein konkretes Zugänglichkeitsproblem ist die automatisch laufende NFC-Animation ohne Pause. Ein reproduzierbarer Bedienfehler ist der Verlust ausgefüllter Anfragedaten beim Sprachwechsel. Die Technik hat ausserdem eine moderate Entwicklungsabhängigkeitsmeldung. Geschäftlich müssen tatsächliche Kalkulation, Betreuung und der dokumentierte Hostingtarif geklärt sein. Diese Punkte sind relevanter als zusätzliche dekorative Effekte.

Fehlende Kundenbewertungen, Kundenlogos und messbare Kundenergebnisse werden **nicht als Mangel gewertet**. Die Website hat noch keine Kunden; die ehrlich gekennzeichneten Konzeptprojekte sind dafür eine sinnvolle Grundlage.

## Umfang und Grenzen

- 30 Hauptseiten in Deutsch/Englisch live aufgerufen: 15 Routen je Sprache einschliesslich vier Projektdetails, Kontakt, Impressum, Datenschutz und Hello.
- Neun repräsentative Routen visuell auf Desktop und Smartphone bewertet; Home, NFC und Kontakt zusätzlich bei 320, 390, 768 und 1440 px geprüft.
- Menü, 3D-Dialog, Modellwahl, Anfragevorschau, fehlerhafte Eingaben, Sprachwechsel und Kopierfallback bedient. Keine Nachricht versendet.
- Drei mobile Performance-Läufe für Startseite, NFC und Arbeiten; automatischer Barrierecheck über alle 30 Hauptseiten.
- Aktueller Code, Haupt-/Demo-Abhängigkeiten und Betriebsdokumente geprüft. Lint, TypeScript und 411 Unit-/Komponententests erfolgreich.
- Vier eigenständige Demostarts auf Erreichbarkeit geprüft. Die komplette Bedienung sämtlicher Demo-Unterseiten wurde **nicht erneut vollständig auditiert**; ihre Darstellung im Portfolio ist Teil dieser Bewertung.
- Keine Search-Console-/Analytics-Kontodaten, realen Nutzertests, Geschäftszahlen oder aktuelle authentifizierte Hostingtarifprüfung. Kein Penetrationstest, keine rechtliche Gesamtfreigabe, keine vollständige Screenreader-/Realgeräteprüfung.
- Vorhandene Änderungen bleiben unangetastet. Es wurden nur Auditunterlagen und Diagnoseartefakte ergänzt, keine Websiteänderung veröffentlicht.

## Bewertung mit Unterbereichen

Skala: 1–3 schwach, 4–6 erhebliche Lücken, 7–8 gut mit gezielten Verbesserungen, 9–10 aussergewöhnlich und breit belegt. Halbe Punkte drücken fachliches Urteil aus, keine Messpräzision. „Offen“ bedeutet fehlende Evidenz, nicht null Qualität.

| Bereich | Unterbereiche | Urteil | Nächster Hebel |
|---|---|---|---|
| Frontend-Design | Typografie, Farbe, Raster, Abstände, Komponenten, Bildführung | **7,5/10** | Bildgestützte Beweise konsequent auch auf Presence/Automation; vorhandene ruhige Identität behalten |
| Marke und Positionierung | Zielgruppe, Wiedererkennbarkeit, Leistungsfokus, Ton | **7/10** | Konkrete Situationen und sichtbar gelöste Aufgaben stärker als allgemeines Nutzenversprechen |
| Mobile Usability | Umbruch, Touch, Lesbarkeit, Reihenfolge, Katalogvergleich | **8/10** | Mobile Arbeitsbeispiele und einfachere Modellentscheidung |
| Navigation und Orientierung | Seitenstruktur, aktive Zustände, Menü, nächste Schritte | **8/10** | Paketentscheidung direkt in Anfrage fortsetzen; sieben Hauptziele sind kein akuter Defekt |
| Anfrage und Conversion | CTA, Vorauswahl, Validierung, Vorschau, Handoff | **7,5/10** | Entwurf über Sprachwechsel erhalten; Öffnung und echte Anfrage unterscheiden |
| Barrierefreiheit | Semantik, Kontrastscan, Tastatur, Fokus, Bewegung, Fehler | **Gut vorbereitet, P1 offen** | NFC-Pausefunktion; danach gezielt manuell und mit Hilfstechnologie abnehmen |
| Geschwindigkeit | LCP, CLS, Ressourcen, Bilder, Schrift, 3D-Laden | **Laborwerte gut** | Vorhandene Werte als Budget sichern; INP/Feldwerte noch offen |
| Inhalte und Verständlichkeit | Nutzen, Präzision, Fachsprache, Textmenge, FAQ | **7/10** | Technische Abnahmesprache in Käufernutzen übersetzen; Details weiterhin zugänglich halten |
| Portfolio und Vertrauen | Person, Konzepthinweis, sichtbare Umsetzung, mobile Beweise | **7,5/10** | Tatsächliche mobile Screenshots und Funktionsausschnitte, ohne Kundenerfolge zu erfinden |
| Angebot und Preisorientierung | Pakete, Beispiele, Umfang, laufende Kosten, Pflege | **7/10** | Mittlere Websitepakete konkreter unterscheiden; tatsächliche Wirtschaftlichkeit offen |
| NFC-Produktangebot | Varianten, Anwendung, Spezifikation, Preis, Lieferung | **7/10** | Einsatzberatung vor Varianten; Material/Masse/Lieferfakten bestätigen |
| Technisches SEO | Crawlability, Metadaten, Sprachen, JSON-LD, Sitemap | **8/10** | Inhaltsdatum pflegen; tatsächliche Suchleistung noch unbekannt |
| SEO-Inhalte und Akquise | Suchabsicht, interne Links, lokale Relevanz, Nachfrage | **Ausbaufähig, Wirkung offen** | Ein Suchziel pro Leistung, hilfreiche Entscheidungshilfen, echte Ausgangsdaten |
| Mehrsprachigkeit | DE/EN, Sprachmetadaten, Demo-Sprache, Zustandswechsel | **7,5/10** | Texte konsistent, Anfragedatenverlust beheben |
| Technik und Wartbarkeit | Struktur, Tests, Abhängigkeiten, Release, Wiederherstellung | **8/10** | Vitest aktualisieren und aktuellen Stand reproduzierbar veröffentlichen |
| Sicherheit und Datenschutz | Header, Drittanbieter, Datenwege, Rechte, Verträge | **Technik solide; Betrieb teilweise offen** | Tarif-/Vertragsnachweise und tatsächlichen Datenbetrieb bestätigen |
| Geschäftsmodell und Kundenbetrieb | Marge, Kapazität, Offerte, Übergabe, Support, Reklamation | **Nicht seriös benotbar** | Interne Kalkulation und gelebten Prozess mit vorhandenen Vorlagen konkretisieren |
| Messung und Lernen | Besucher, Übergaben, qualifizierte Anfragen, Aufträge, Aufwand | **Vorbereitung vorhanden; Wirkung offen** | Datenschutzgerechte Messkonfiguration plus einfaches Leadregister |

Die wichtigsten Seitennoten aus der unabhängigen Sichtprüfung: Startseite 8; Websites 7,5; NFC 7; Arbeiten 7,5; Falkenried-Detail 7; Kontakt 8,5; About 7,5; Presence und Automation jeweils 6,5. Die Unterschiede ergeben sich überwiegend aus Anschaulichkeit und Auswahlhilfe, nicht aus unterschiedlicher technischer Stabilität.

## Was erhalten bleiben sollte

1. Echte Person, regionaler Bezug, klare Preisanker und direkter Kontakt. Das schafft eine brauchbare Grundlage für Vertrauen ohne Kundenstimmen.
2. Vier sichtbar unterschiedliche und ehrlich bezeichnete Konzeptprojekte. Der neutrale Rahmen lässt die Arbeiten wirken.
3. Gute technische Basis: Seitenauslieferung, Bildoptimierung, lokales optionales 3D, Fokusführung und Tests. In den beobachteten normalen Aufrufen wurden keine fremden Ressourcen geladen.

## Die wichtigsten konkreten Verbesserungen

### 01 · P1 · NFC-Animation steuerbar machen

**Beleg:** /reviews; NfcMotionHero.tsx und nfc-motion.module.css. Endlose 37,5-/7,5-Sekunden-Zyklen, kein Pausebutton; 51 laufende Browseranimationen im normalen Modus. Reduced Motion funktioniert, reicht für diesen Anwendungsfall aber nicht als alleiniger Ersatz einer erreichbaren Steuerung.

**Warum:** Besucher müssen die danebenstehenden Inhalte ohne fortlaufende Bewegung lesen können. Das ist eine konkrete Zugänglichkeitslücke nach [WCAG 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

**Lösung:** Sichtbarer DE/EN-Schalter „Animation pausieren / fortsetzen“ mit verständlichem Zustand und Tastaturbedienung. Explizites Pausieren darf beim Wiedereintritt in den Viewport nicht aufgehoben werden. Alternative: statischer Anfang und bewusstes Starten. Die Bildqualität und Produktgeschichte erhalten.

**Abnahme:** Tab/Enter/Space funktionieren; Pause bleibt bei Scrollen und Tabwechsel erhalten; Reduced Motion bleibt statisch. Zustände auch auf Mobilgeräten und in Englisch prüfen. Empfohlener Arbeitsmodus: impeccable animate/harden.

### 02 · P2 · Anfragedaten beim Sprachwechsel erhalten

**Beleg:** Erstes NFC-Modell wählen, Menge 3, Zielseitenstatus, Firma und Notiz ausfüllen, Vorschau öffnen, EN wählen. Modell bleibt; Menge wird 1, restliche Eingaben und Vorschau gehen verloren.

**Lösung:** Eine sichere, kurzlebige Entwurfsübergabe zwischen den Sprachen. Wichtig: Die Website hat getrennte DE-/EN-Root-Layouts. Ein beliebiger zusätzlicher React-Provider allein reicht deshalb nicht zuverlässig; Next.js dokumentiert vollständige Seitenladungen zwischen Root-Layouts. In der Umsetzung tabgebundene Übergabe per sessionStorage mit Schema-/Versionsprüfung, kurzer Lebensdauer, Löschen nach Übernahme und Fallback bei gesperrtem Speicher prüfen. Nur beim bewussten Sprachwechsel schreiben; Formular- und Datenschutzhinweis entsprechend präzisieren. Private Eingaben niemals in URL, Analytics oder Serverlogs übertragen. Alternativ erfordert rein flüchtiger gemeinsamer State einen bewusst geplanten Layoutumbau. Quelle: [Next.js Route Groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups).

**Abnahme:** DE→EN→DE erhält Modell, Menge, Werte und korrekten Preis; Texte sind übersetzt; gesperrter Speicher führt zu verständlichem Hinweis statt stillem Verlust. Eine alte Vorschau darf nach geänderten Daten nicht als aktuell erscheinen. Empfohlener Arbeitsmodus: impeccable harden.

### 03 · P2 · Fähigkeiten als Kundenvorteile zeigen

**Beleg:** Projekttexte erläutern Fokussetzung, Zurücksetzen und Auswahlzustände; About erklärt fertiges HTML. Das belegt Sorgfalt, zwingt Käufer aber zur Übersetzung.

**Lösung:** Zuerst die Aufgabe des Besuchers benennen, dann die sichtbare Umsetzung zeigen. Etwa „Gäste finden Speisekarte und Öffnungszeiten und können ihren Besuch in einer Demo planen“. Technische Details in einer zweiten Ebene erhalten. Je Projekt eine echte mobile Ansicht und einen konkreten Funktionsausschnitt ergänzen.

**Abnahme:** Ein fachfremder Interessent kann den Nutzen jeder gezeigten Arbeit erklären. Fiktive Herkunft bleibt erkennbar; keine Conversion- oder Erfolgszahlen erfinden. Empfohlener Arbeitsmodus: impeccable clarify/adapt.

### 04 · P2 · NFC-Katalog zur Entscheidungshilfe machen

**Beleg:** Initial neun Google-Reviews-Modelle mit überwiegend ähnlicher Beschreibung; mehrere Kaufkriterien stehen nebeneinander. Viele Masse sind noch nach Absprache.

**Lösung:** Anwendung → Produktfamilie → Variante. Kurze belegbare Empfehlungen für Tresen, flache Karte und vorhandenen Aufsteller. Farbe/Form innerhalb einer Familie vergleichbar machen. Reale Material-, Mass-, Befestigungs- und Pflegeangaben klären. Funktionierende Modell-/Preisübernahme erhalten.

**Abnahme:** Ein Besucher findet ohne Hilfe einen passenden Produkttyp; Filter und Varianten sind mit Tastatur und Touch bedienbar. Keine willkürliche Bestsellerbehauptung. Empfohlener Arbeitsmodus: impeccable clarify/distill.

### 05 · P2 · Presence/Automation konkret und kürzer erfassbar machen

**Beleg:** Beide mobilen Seiten haben ungefähr 6.000 px lange, überwiegend textliche Strecken. Bereits vorhandene sinnvolle Beispiele werden beschrieben, kaum gezeigt.

**Lösung:** Den Öffnungszeitenabgleich als verständlichen Vorher/Nachher-Vergleich darstellen. Die Aufgabenliste-zum-Bericht-Idee mit wenigen Beispieldaten zeigen. Nutzen und Lieferumfang zuerst, Details zu Zugriff, Abgrenzung und Betrieb darunter sinnvoll bündeln. Die wichtigen Bedingungen bleiben auffindbar.

**Abnahme:** Die Grundidee wird ohne Lesen sämtlicher Absätze verständlich; Beispielstatus und Grenzen bleiben deutlich. Empfohlener Arbeitsmodus: impeccable distill/clarify, abschliessend polish.

## Messwerte und technische Einordnung

| Mobile Laborprüfung | Median LCP | CLS |
|---|---:|---:|
| Startseite | 1,36 s | 0 |
| NFC /reviews | 1,88 s | 0 |
| Arbeiten /work | 1,48 s | 0 |

Jeweils drei Läufe mit Chromium, 390 × 844, vierfacher CPU-Drosselung, 150 ms Netzlatenz und 1,6 Mbit/s Download. Browsercache aus, Live-CDN, acht Sekunden nach DOMContentLoaded beobachtet. Weitere Prüfungen liefen auf demselben Rechner. Kein Lighthouse-Score und keine Aussage über das 75. Perzentil echter Besuche. INP bleibt offen. Googles Zielwerte für reale Nutzer: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1. [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).

30 automatisierte axe-Prüfungen meldeten keine Verstösse; die manuell gefundene Pause-Lücke zeigt die Grenze dieser Aussage. Haupt-Crawl ohne JavaScript-Laufzeitfehler. Menü- und 3D-Fokus, Escape-Rückkehr, ungültige Menge/URL sowie Kopierfallback funktionierten in den Stichproben. Drei Stück des ersten Standardmodells ergeben korrekt CHF 100 in Vorschau und beiden Kontaktentwürfen.

Npm meldet zwei moderate betroffene Pakete aufgrund derselben Vitest-Advisory. Die vier Demo-Lockfiles sind ohne gemeldete Schwachstellen. Kontrolliertes Update statt pauschalem force-fix; dies betrifft Entwicklungswerkzeuge, nicht eine nachgewiesene Live-Angriffsmöglichkeit. [Vitest-Advisory](https://github.com/advisories/GHSA-82fw-gwwq-j7x9).

## Priorisierter Umsetzungsplan

P1 = zuerst beheben/klären; P2 = relevanter nächster Ausbau; P3 = Pflege/Feinschliff. Reihenfolge berücksichtigt Nutzerwirkung und Abhängigkeiten. Aufwand ist eine grobe Schätzung in Arbeitsstunden nach Klärung nötiger Inhalte, keine Offerte. Nutzen wird qualitativ eingeordnet.

| ID | Priorität / Massnahme | Nutzen | Aufwand | Fertig, wenn … |
|---|---|---|---|---|
| U01 | P1 NFC-Pausefunktion | Zugänglichkeit, ruhiges Lesen | 1–3 h | Zustände in DE/EN, Touch/Tastatur und Reduced Motion geprüft |
| U02 | P1 Hostingstatus aus Vorbefund klären | Verlässliche Betriebsgrundlage | 0,5–2 h Prüfung; Wechsel separat | Aktueller Tarif/Vertrag dokumentiert, bei Bedarf passende Lösung entschieden |
| U03 | P2 Sprachwechsel ohne Entwurfsverlust | Vermeidet verlorene Eingaben | 4–8 h | Beide Richtungen, Speicherfehler, Löschung, Hinweise und Preis getestet |
| U04 | P2 Vitest-Abhängigkeit aktualisieren | Wartung, CI, Entwicklungsumgebung | 2–6 h | Auditbefund beseitigt, Lint/Typen/Tests erfolgreich |
| U05 | P2 Projekt-/About-Texte am Nutzen ausrichten | Verständlichkeit und Vertrauen | 3–6 h | DE/EN konkret, sachlich und ohne erfundene Wirkung |
| U06 | P2 Mobile Projekt- und Funktionsbilder | Sichtbarer Kompetenzbeweis | 4–8 h | Vier echte mobile Aufnahmen plus ausgewählte Abläufe, responsive optimiert |
| U07 | P2 Websitepakete vergleichen und anfragen | Einfachere Angebotswahl | 4–8 h | Typischer Fall je Stufe; Paketkontext im Kontaktentwurf |
| U08 | P2 NFC-Auswahlführung überarbeiten | Passendes Produkt schneller finden | 6–12 h | Anwendung/Familie/Variante nachvollziehbar; Auswahl bleibt erhalten |
| U09 | P2 NFC-Produktdaten und Lieferfakten bestätigen | Kaufgewissheit | 2–4 h Redaktion plus Lieferantenklärung | Nur bestätigte Daten publiziert; offene Varianten korrekt erklärt |
| U10 | P2 Presence-Beispiel visuell erklären | Verständlicher Leistungsnachweis | 4–8 h | Klarer hypothetischer Vorher/Nachher-Vergleich |
| U11 | P2 Automation mit Beispieldaten zeigen | Abstraktes Angebot greifbar machen | 6–12 h | Ablauf, Ergebnis und menschliche Freigabe sichtbar; keine echten Daten |
| U12 | P2 Preis-/Aufwandskalkulation | Wirtschaftliches Angebot | 2–4 h plus echte Kostendaten | Einstiegspreise und Mengenrabatte mit Aufwand/Kosten abgeglichen |
| U13 | P2 Messung und Leadprozess konkretisieren | Lernen aus echten Anfragen | 3–6 h plus Kontoentscheidungen | Öffnung, Anfrage, Offerte, Auftrag und Aufwand getrennt erfasst |
| U14 | P2 Betreuung/Übergabe/Betriebsnachweise festlegen | Verlässliche Kundenerfahrung | 2–5 h plus externe Nachweise | Vorlagen, Verantwortung und tatsächliche Anbieter-/Produktnachweise geklärt |
| U15 | P2 SEO-Suchziele und qualitative Nutzertests | Relevante Nachfrage verstehen | 4–8 h plus Rekrutierung | Seitenzuordnung und fünf beobachtete Aufgabenrundgänge dokumentiert |
| U16 | P3 Sitemap-Daten und Testwarnungen pflegen | Saubere Wartung | 1–3 h | Zutreffende Inhaltsrevisionen; Next/Image-Testwarnung richtig behandelt |
| U17 | P2 geprüften Release reproduzierbar sichern | Sicher weiterentwickeln | 1–3 h | Version, Haupt-/Demo-Deployments und Rückweg dokumentiert |

**Sinnvolle Reihenfolge:** U01–U04 zuerst; dann U05–U07 als sichtbare Verbesserung der Verkaufsstrecke. U08–U11 bilden den zweiten Gestaltungsblock. U02/U09/U12/U14 benötigen tatsächliche Geschäftsangaben und können parallel vorbereitet werden. U13/U15 sorgen danach dafür, dass echte Beobachtungen die weiteren Entscheidungen bestimmen. Jeder veröffentlichte Block bekommt U17 und eine passende, begrenzte Abnahme.

Beim Hosting liegt ein am 7. September authentifiziert dokumentierter Hobby-Befund vor, keine erneute Kontoprüfung von heute. Falls inzwischen umgestellt, diesen Punkt als erledigt dokumentieren. Hobby ist laut aktueller [Vercel-Dokumentation](https://vercel.com/docs/plans/hobby) für nicht kommerzielle persönliche Nutzung vorgesehen. Es wurde kein Tarif gekauft.

## Heuristische Detailbewertung

Unabhängige Designbewertung A: 26/36. Nach Einbezug des in B nachgewiesenen Kontroll-/Sprachwechselproblems wird Kontrolle/Freiheit von 3 auf 2 gesetzt: **25/36**. Das ist eine Synthese derselben Prüfung, kein zeitlicher Trend. Auf Expertenbeschleuniger wird bei dieser primär erklärenden Verkaufswebsite keine künstliche Note vergeben.

| Heuristik | 0–4 | Einordnung |
|---|---:|---|
| Systemstatus sichtbar | 3 | Auswahl, Fehler und Vorschau verständlich |
| Kundensprache | 2 | Technische Details vor Käufernutzen |
| Kontrolle und Freiheit | 2 | Animation ohne Pause, Entwurfsverlust bei Sprachwechsel |
| Konsistenz | 3 | Ruhiger gemeinsamer Rahmen |
| Fehlervermeidung | 3 | Validierung und unverbindliche Vorschau |
| Wiedererkennen | 3 | Kontext sichtbar; Variantenentscheidung ausbaufähig |
| Flexibilität für Experten | n/a | Kein Kernmassstab dieser Verkaufs-/Portfoliofläche |
| Ästhetik und Konzentration | 3 | Gute Gestaltung, lange Textstrecken |
| Fehlerbehebung | 3 | Verständliche Fehlermeldungen, Kopierfallback |
| Hilfe und Erklärung | 3 | FAQ, Preis-/Nutzungshinweise vorhanden |

Technische Impeccable-Einordnung: Accessibility 2/4 (manuelle Pause-Lücke), Performance 3/4 (gute Laborwerte, Feld offen), Responsive 3/4 (gute Stichproben), Theming 3/4 (konsistente feste Gestaltung, kein Dark Mode verlangt), Implementierung 3/4 (zwei verifizierte Interaktionslücken trotz sauberem Detektor). **14/20**, im geprüften Rahmen gut. Eine Punktesumme hebt einen konkreten P1-Befund nicht auf.

Für einen unerfahrenen Erstbesucher ist die NFC-Modellentscheidung der grösste Denkschritt. Ein abgelenkter Mobilbesucher muss auf Presence/Automation viel lesen. Ein sorgfältig prüfender Käufer findet ehrliche Konzepte, muss für mobile Funktionsbeweise aber in die externe Demo wechseln. Genau diese Situationen begründen die priorisierten Verbesserungen.

## Vertiefungen und Forschung

Die Detailunterlagen enthalten Belege, Ursachen, Lösungsvorschläge und Grenzen:

- [Unabhängige Designbewertung](audits/2026-09-09/design-independent.md)
- [Unabhängige Browserprüfung](audits/2026-09-09/browser-independent.md)
- [Technik, Performance und Sicherheit](audits/2026-09-09/technical-current.md)
- [Angebot, Kalkulation, SEO, Kundenprozess und Betriebsfragen](audits/2026-09-09/business-and-growth.md)

Forschungsgrundlage: W3C zu Bewegung und Touchzielen; Google/web.dev zu Performance, SEO und Sprachen; Next.js zur Layoutnavigation; Vitest-Advisory; Schweizer KMU-Portal zur Kalkulation; EDÖB zu tatsächlichen Datenbearbeitungen; Vercel zu Tarifbedingungen; NN/g zur Preis-/Umfangsorientierung auf B2B-Websites. Die Quellen begründen Empfehlungen, nicht eine gemessene Conversionsteigerung dieser Website.

## Definition von „top tier“ für die nächste Umsetzung

Die entscheidenden Besucheraufgaben funktionieren ohne vermeidbare Barrieren und ohne Datenverlust. Jede Leistung hat einen verständlichen Umfang und einen sichtbaren, ehrlichen Beleg. Mobile Besucher können Produkte und Angebote auswählen. Geschwindigkeit bleibt unter den bisherigen Testbedingungen gut. Preise sind intern kalkuliert; Übergabe und Betreuung sind verlässlich geregelt. Neue Verbesserungen werden an echten Beobachtungen und qualifizierten Anfragen beurteilt. Zusätzliche Effekte, Tools oder Seiten müssen zu diesen Zielen beitragen.
