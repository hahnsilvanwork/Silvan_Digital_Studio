# Inhalts- und Demo-Audit, 8. September 2026

Unabhängige Quelltextprüfung; keine Websiteänderungen, kein Deployment und keine Testläufe. Dateiverweise relativ zu `C:/Users/StartKlar/Documents/Personal Website`. Prioritäten: P1 = wichtiger funktionaler oder Vertrauensbruch; P2 = relevante Verbesserung; P3 = redaktionelle Verfeinerung. Belegte Implementierung und redaktionelle Einschätzung sind getrennt. Dies ist keine juristische Konformitätsprüfung und keine Behauptung, alle Quelltexte entsprächen bereits dem Live-Deployment.

Gelesen: alle vier Demo-AGENTS.md. Die dortigen Anforderungen betreffen Frameworkänderungen/Serverstart, nicht diesen rein lesenden Inhaltsaudit. Hauptseiten: DE/EN-Inhalte, Legal, Audit- und Inquiry-Copy, Projekttexte, Seitenrenderer und Projektkomponenten. Demos: alle Routenfamilien, tatsächliche gemeinsame Renderer, Inhaltsdaten, Navigation, Footer und Formularrenderer. Wichtig: tote Quelltexte/ignorierte Props wurden nicht als sichtbare Fehler behandelt.

## Hauptwebsite: Inhalt je Seite und Abschnitt

### Startseite `/` und `/en`

- **Hero – stark:** klare Nutzenüberschrift, Zielgruppe Schweizer KMU, namentlicher Anbieter und Standort. Der Screenshot zeigt ein echtes erkundbares Konzept und trägt sichtbar „Konzeptprojekt“. `src/features/pages/HomePage.tsx:24`, `src/content/de.ts:46`, `src/content/audit-copy.ts:21`.
- **Hero – ausbaufähig, P2:** „Mehr Kunden. Weniger Aufwand.“ ist eine plausible Nutzenrichtung, aber noch nicht durch reale Ergebnisse belegt. Nicht als messbare Garantie ausbauen. Ergänzend einen konkreten Beispielsatz verwenden: etwa schnellere Angebotsanfrage oder weniger manuelle Datenübertragung.
- **Leistungsübersicht – stark:** vier verständliche Kategorien, CHF-Einstiegspreise konsistent mit Detailseiten (Websites 300, NFC 49, Präsenz 249, Automation auf Anfrage). `src/content/de.ts:53`.
- **Leistungsübersicht – P2:** drei Website-Demos belegen Gestaltung/Umsetzung, aber Präsenz und Automation haben keinen vergleichbar konkreten Beleg. Ein anonymisiertes oder ausdrücklich fiktives Ablaufbeispiel pro Dienstleistung ist wertvoller als weitere allgemeine Qualitätswörter.
- **Ausgewählte Arbeiten – stark:** keine erfundenen Kundenbeziehungen; Konzeptkennzeichnung an jeder Karte. Zwei zusätzliche Projekte plus Hero bilden sinnvolle Auswahl, „Arbeiten ansehen“ führt zur Gesamtsicht. `HomePage.tsx:56`.
- **Produktteaser – stark:** erklärt NFC ohne Fachsprache anhand Bewertungen/Menü/Buchung. **P3:** konkreter Link-/QR-Effekt ist überzeugender als abstraktes „direkter Weg zu Ihnen“; optional Preis ab CHF 49 im Teaser wiederholen.
- **Studio/Porträt – stark:** echte Person, Ort, direkte Zusammenarbeit; leeres Testimonials-Array wird nicht als leere Sektion ausgegeben. **P2:** Expertise ist hauptsächlich als Anspruch formuliert; ein überprüfbarer Werdegang-/Projektbeleg fehlt weiterhin. Keine Kundenstimmen erfinden. `src/content/de.ts:76–85`.
- **Kontaktabschluss – P2:** nennt Kanäle, aber keine Orientierung, was eine sinnvolle erste Anfrage enthalten soll. Ein Satz „Vorhaben, vorhandene Website, Wunschdatum“ senkt Schreibaufwand ohne neues Formular.

### Websites `/websites`, `/en/websites`

- **Hero – stark:** Leistung klar, Demo als Anschauung, direkter CTA. **P2:** „leicht pflegbar“ bleibt unkonkret: Pflege durch Kunde mit CMS, durch Silvan oder per Code? Das ist bei KMU ein Kaufkriterium. Konkret im Paket/FAQ erläutern. `src/content/de.ts:94`.
- **Preise – stark:** vier verständliche Grössenordnungen, klare Trennung vom individuellen Projekt; FAQ nennt konsistent dieselben Beträge.
- **Preise – P2, belegter Widerspruch:** SEO verspricht „Feste Preisstufen“/„Fixed price tiers“, während die sichtbare Kostenerläuterung sie „Richtwerte“/„estimates“ nennt. Einheitlich „Preisrahmen“ oder klarer Unterschied Festpreis nach Offerte versus Richtwert vor Offerte. `src/content/de.ts:667`, `src/content/en.ts` SEO.websites, `src/content/audit-copy.ts:31`.
- **Preise – P2, Beleg offen:** Business-Paket trägt „Am häufigsten gewählt“. Im Repository ist keine Datenbasis für diese Beliebtheitsaussage sichtbar; daraus folgt nicht, dass sie falsch ist. Wenn keine belastbare Basis existiert, durch „Empfohlen für …“ ersetzen. `src/content/de.ts:41`, `src/content/de.ts:111`.
- **Umfang/laufende Kosten – ausdrücklich stark und vorhanden:** Domain/Hosting ausgeschlossen; Seitenzahl, Funktionen, Korrekturrunden, Texte, Bilder, Zeitplan, Wartung, Support und zusätzliche Kosten werden vorab schriftlich vereinbart. Nicht als fehlende Vertragsklärung beanstanden! `src/content/audit-copy.ts:30–32`, `src/features/pages/ServicePage.tsx:100`.
- **Umfang – P2 Verbesserung:** Paketunterschiede sind teilweise qualitative Abstufungen („individuelles Layout“, „hochwertige Interaktionen“). Beispielkonfigurationen mit typischem Seitenumfang, optionaler Inhaltsbearbeitung und einer groben Zeitspanne würden die Selbstwahl erleichtern; keine neuen fixen Zusagen ohne Geschäftsentscheidung.
- **Nutzen/Prozess – stark:** vier nachvollziehbare Phasen; ein Ansprechpartner. **P3:** „wartbarer Code“ ist eher Hersteller- als Käufernutzen. Übersetzen: spätere Änderungen nachvollziehbar, keine unnötigen laufenden Werkzeuge.
- **FAQ/CTA – P2:** ergänzen, wie laufende Aktualisierung praktisch funktioniert; bestehende Scope-Information in zugänglicher Frageform. CTA führt korrekt zum persönlichen Kontakt, aber übernimmt keine gewählte Paketpräferenz.

### NFC & QR `/reviews`, `/en/reviews`

- **Hero/Katalog – stark:** klare Anwendungen, Produktbilder, Preis am Modell, Kategorien, „Dieses Modell anfragen“, optionale 3D-Ansicht. Die fotografierten Produkte werden mit lokalen GLB-Modellen zusammengeführt (`src/content/photo-products.ts:42–84`).
- **Preisstruktur – stark:** CHF 49 Standard, CHF 80 Zweierpaket, CHF 69 personalisiert, CHF 99 individuell; Mengenrabatt und unverbindliche Anfrage klar. Hinweis zu CHF, Abgaben, separatem Versand und Gesamtpreis vor Bestellung vorhanden. `src/features/pages/ReviewsPage.tsx:132`.
- **Kaufbedingungen – ausdrücklich vorhanden:** Smartphonevoraussetzungen, Internet, Zieländerung, neue Zielwebsite, Versandgebiet/Termin/Ersatz werden erklärt oder vor Bestellung vereinbart. `src/content/audit-copy.ts:35–40`. Nicht pauschal als fehlend aufführen.
- **P2, Begriffsklarheit:** die Stufen „Standard Card“, „Personalized Card“, „Fully Customized Card“ und Anwendungen konkurrieren um Aufmerksamkeit. Ein kurzer deutscher Dreiklang („Standard / Mit Logo / Eigenes Design“) macht den Unterschied leichter. Die Form „Card“ bezeichnet teilweise grössere Tisch-/Wandprodukte; Abmessungen konsequent sichtbar halten.
- **P2, aktueller Katalog versus FAQ:** FAQ beschreibt Standard/personalisierte Karten nur als rund oder quadratisch mit 80/100 mm; der neue Katalog enthält auch rechteckige Produkte und „Grösse nach Absprache“. Der Parent hat sechs Kategorien und 28 Produkte am aktuellen Runtime bestätigt. FAQ an Modellvielfalt anpassen, produktabhängige Formate erklären, nicht pauschal 80/100 zusagen. `src/content/de.ts:438`, EN-Gegenstück `src/content/en.ts` FAQ, `src/content/photo-products.ts:29`, `:47–49`.
- **P2, Prozessbehauptung präzisieren:** „ohne App“ betrifft das Öffnen eines NFC-Links, nicht zwingend die Zielaktion. Bewertungen können Anmeldung, WhatsApp eine App/Anmeldung erfordern. Besser „ohne zusätzliche NFC-App; Voraussetzungen des Zieldienstes gelten“. `src/content/de.ts:213`.
- **P2, Konfigurator:** fachlich sinnvoll, aber viele Pflichtentscheidungen (Ziel, Produkt, Form, Grösse, Menge, Zielseitenstatus). Eine modellbasierte Vorbelegung existiert; zusätzlich „Ich brauche Beratung“ als wirklich kurzer Einstieg denkbar. Nicht bloss Auswahlfelder entfernen, wenn sie für Offerte nötig sind.
- **P2, Produktinformation:** Material, Befestigung/Standfestigkeit, Reinigung und konkretes Nutzungsumfeld sind kein prägnanter Teil der Standardangebote. Für ein physisches Produkt helfen 2–3 belastbare Angaben stärker als eine weitere Bildvariante. Vor Veröffentlichung Angaben real bestätigen.
- **Anfrage/Datenschutz – stark:** WhatsApp/E-Mail/Kopieren, Vorschau und klare Erklärung, dass Nutzer selbst sendet; keine Checkout-Täuschung. Zweierpakete werden ausdrücklich als Pakete gezählt. `src/content/inquiry-copy.ts:13–16`.
- **Kein aktueller Datenschutzzirkelschluss:** alte Spline-Copy existiert, wird aber nur bei tatsächlich nicht-GLB-Szenen gerendert. Alte Spline-URLs in Wörterbüchern allein sind kein Nachweis aktiven Drittanbieterladens. `src/components/products/ProductCatalog.tsx`, `photo-products.ts`.

### Online-Präsenz `/presence`, `/en/presence`

- **Hero/Paket – stark:** Google-Unternehmensprofil als konkretes Produkt, ab CHF 249, Prüfung/Einrichtung/Geschäftsdaten/Leistungen klar.
- **Kosten/Inhaberschaft – stark:** Google-Profil selbst kostenlos, Dienstleistung separat bezahlt, Kunde bleibt Inhaber, Zugang nur nach ausdrücklicher Freigabe. `src/features/pages/PresencePage.tsx:18`.
- **P2, Leistungsgrenze:** „überall gleich“ in FAQ klingt nach sämtlichen Verzeichnissen/Plattformen, Paket nennt dagegen nur Google-Basis. Benennen, welche Kanäle überprüft/geändert werden und ob weitere Verzeichnisse Zusatzumfang sind. `src/content/de.ts:458–461`, `src/content/de.ts:490`.
- **P2, fehlende Entscheidungshilfe:** Zugangsvoraussetzungen, ein oder mehrere Standorte, Unterstützung bei Verifikation, voraussichtlicher Ablauf bei fehlendem Zugriff werden nicht greifbar erklärt. Keine Verifikation oder bestimmte Sichtbarkeit garantieren.
- **Nutzen/Prozess/FAQ – stark:** Prüfung → Abgleich → Optimierung → Übergabe; explizit keine Rankinggarantie. **P2:** einen kleinen Vorher/Nachher-Beispielfall zu falschen Öffnungszeiten oder unklarem Leistungsprofil ergänzen, klar als Beispiel.

### Automation `/automation`, `/en/automation`

- **Hero – stark:** E-Mails, Berichte, Übergaben als konkrete Aufgabenfamilien; keine pauschale Einsparungszahl.
- **Paket/Preis – stark:** Machbarkeit, Umsetzung und dokumentierte Übergabe; ehrliche individuelle Kalkulation.
- **P2, Nutzennachweis:** kein kompletter Miniablauf (Auslöser → Verarbeitung → Resultat) oder demonstrierbarer Prototyp. Einen typischen Prozess exemplarisch zeigen, inklusive menschlicher Freigabe wo passend.
- **P2, Widerspruch im Ton:** FAQ „Alles, was regelmässig nach denselben Regeln abläuft“ ist viel weiter als der sinnvoll vorsichtige Rest der Seite. „Viele wiederkehrende, regelbasierte Aufgaben – abhängig von Datenzugang und Systemen“ ist belastbarer. `src/content/de.ts:541`.
- **Prozess/FAQ – stark:** Nutzen/Risiken werden geprüft, Ergebnis darf „lohnt sich nicht“ sein. **P2:** Betriebsverantwortung nach Übergabe bleibt abstrakt: Überwachung, Fehlermeldungen, Wartung, externe Abos und Zuständigkeit bei geänderten Schnittstellen vorab benennen. Allgemeine Vertragsregel im Impressum ersetzt keine verständliche Angebotsdarstellung.
- **CTA – P3:** „Ablauf prüfen“ lässt offen, ob Erstprüfung kostenlos oder bereits Leistung ist. Umfang des unverbindlichen Erstkontakts von beauftragter Analyse unterscheiden.

### Arbeiten `/work`, `/en/work` und vier Projektseiten

- **Übersicht – stark:** exakt vier Konzepte, Herkunft als eigeninitiierte fiktive Unternehmen ausdrücklich benannt; Branchenvariation Café/Handwerk/Salon/Gruppe. `src/content/de.ts:564`, `src/content/projects.ts`.
- **Alle Detailseiten – stark:** Aufgabe, Ansatz, beabsichtigtes Ergebnis; Demo öffnen, Kontakt-CTA und nächstes Projekt. Keine erfundenen Erfolgskennzahlen. `src/components/work/ProjectDetail.tsx:28`.
- **Alle Detailseiten – P2:** „Ergebnis“ ist bei allen vier Projekten derselbe Demo-Hinweis. Das ist ehrlich, liefert aber wenig eigenständigen Kompetenzbeleg. Pro Projekt ein tatsächlich vorhandenes funktionales Ergebnis beschreiben, etwa Bereichsnavigation, Speisekarte, responsiver Leistungseinstieg oder Preis-/Dauerübersicht; den Demo-Hinweis separat beibehalten.
- **Falkenried – P2:** hoher Funktionsumfang wird im Text nur allgemein als Navigation/Fotografie beschrieben. Zahl und Art der Bereiche, DE/EN und die bewusst deaktivierten externen Funktionen erklären.
- **Café – P2:** Atmosphäre wird gut begründet; Speisekarte/Öffnungszeiten/Reservierungsdemonstration konkret als Designaufgaben zeigen. Unvollständige Uhrzeitwahl der Demo zuerst beheben.
- **Steiner – P2:** Portfolio nennt „Steiner Handwerk“, Demo markiert sich „STEINER BAU“, Impressum/Datenschutz nennen „Steiner Bau“. Einheitlichen öffentlichen Namen festlegen; Slug kann stabil bleiben. `src/content/projects.ts:83`, `demos/steiner-handwerk/app/page.tsx:20`, `src/content/legal-content.ts:14`.
- **Salon – P2:** Preise/Dauer und persönliche Bildsprache sind gute Belege. Im Ergebnis hervorheben, wie Kunden eine Leistung auswählen; Termin-CTA konsistent als Anfrage darstellen.
- **P2, Sprachübergang:** der Demo-Button verwendet immer `project.demoUrl`, ohne Sprachpfad. `/en/work/falkenried` öffnet deshalb Deutsch, obwohl Falkenried eine englische Seite hat. Für dieses Projekt `/en/` wählen; bei den drei rein deutschen Demos am Button „Demo in German“ angeben. `src/components/work/ProjectDetail.tsx:48`.

### Über mich `/about`, `/en/about`

- **Intro/Porträt – stark:** Name, Ort, direkte Zuständigkeit, vorhandenes echtes Porträt. Keine erfundenen Teamgrössen oder Kundenlogos.
- **P2:** Text bleibt fast ausschliesslich bei allgemeinen Arbeitsprinzipien. Konkrete, nachprüfbare Erfahrung, bevorzugte Projekttypen oder ein Satz zum beruflichen Hintergrund würden die Person greifbarer machen.
- **Standards – P2:** „sofort da, auch bei langsamer Verbindung“ ist absolut und technisch nicht einlösbar; HTML-Auslieferung verhindert keine Netzwerkzeit. „Automatisch getestet, damit … nichts … zerstört“ klingt ebenfalls nach Vollgarantie. Formulieren als nachprüfbare Arbeitsweise statt Fehlerausschluss. `src/content/de.ts:595`, `src/content/de.ts:598`.
- **Standards – P2:** Tastatur/Screenreader/Kontraste sind überprüfbare Ansprüche. Ergebnisse des technischen Audits hier als Grenze nutzen; nicht selbst Zertifizierung oder lückenlose Barrierefreiheit ableiten.
- **Arbeitsweise/CTA – stark:** „klar, direkt, praktisch“ passt zu Einzelanbieterpositionierung; Kontakt erreichbar. Nächster Inhaltsschritt: ein überprüfbares Beispiel, wie diese Prinzipien ein Projekt verändert haben.

### Kontakt `/contact`, `/en/contact`

- **Stark:** E-Mail, WhatsApp, Telefon, LinkedIn plus vollständige gleiche Postadresse wie Impressum; internationale Telefonform; kein funktionsloses Sendeformular. `src/content/de.ts:603–623`, `src/features/pages/ContactPage.tsx:52`.
- **P2:** kleine Anfragehilfe und realistische Antwortorientierung fehlen. Nur eine tatsächlich einhaltbare Zeit nennen; alternativ erklären, was nach Kontakt passiert (kurze Rückfrage, Umfang, Offerte).
- **P3:** Gmail ist funktional, eine eigene Domain-Mail würde zur bestehenden Marke passen. Kein technischer Defekt und kein Pflichtpunkt.

### Hello `/hello`, `/en/hello`

- **Stark:** einfacher Kurzweg zu Leistungen und Direktkontakt.
- **P2, belegte Lücke:** Intro nennt praktische Automationen, Linkliste lässt Automation aus. In Hauptnavigation existiert sie. Ergänzen oder Intro entsprechend fokussieren. `src/content/de.ts:638–645`, gleiche Lücke EN.
- **P3:** als persönliche NFC-Zielseite wäre „Kontakt speichern“ mit vCard ein möglicher Mehrwert; aktuell nicht vorhanden, aber auch nicht auf dieser Seite versprochen.

### Impressum/Datenschutz, beide Sprachen

- **Stark:** Anbieter, Adresse, Kontakt, Geschäftsbezeichnung; klare Unverbindlichkeit von Konfiguration/Anfrage, Gesamtpreis/Umfang vor Vertrag; fiktive Konzepte und keine gekauften Bewertungen ausdrücklich erklärt. Datenschutzhinweise unterscheiden Browserzustand, Clipboard, WhatsApp-URL, Mailprogramm, Hosting und optionales 3D/Measurement.
- **P2, redaktionell belegt:** Projektname „Steiner Bau“ weicht von „Steiner Handwerk“ ab; vereinheitlichen. SEO-Impressum verspricht „Rechtsform“, Text nennt lediglich Geschäftsbezeichnung/Person; Metabeschreibung an tatsächlich vorhandene Inhalte anpassen oder verifizierte Rechtsform ergänzen. Keine Schlussfolgerung, welche Register-/UID-Angaben gesetzlich verlangt sind.
- **Grenze:** Angaben zu tatsächlich eingesetzten Verträgen, Retention und Plattformkonten lassen sich allein aus Websitecode nicht verifizieren. Keine pauschale Konformitätsbehauptung; aktuell sichtbare technische Mechanismen beachten.

### 404

- Kurze verständliche Erklärung und Rückweg vorhanden; kein weiterer kommerzieller Inhalt nötig. Sprachen werden über vorhandene Seitentexte behandelt; technische Route/Statusprüfung separat.

## Alle vier Demo-Websites

Fiktive Namen, Adressen, Jahre, Leistungen, Teamrollen und illustrative Stimmen sind **für sich kein Fehler**: Das Portfolio und Demo-Hinweise deklarieren die Fiktion. Bewertet wird, ob die jeweilige Demo ein zusammenhängendes, verständliches und ehrlich bedienbares Websitekonzept zeigt. Verbesserungsvorschläge dürfen keine scheinbar echten Referenzen erzeugen.

### Steiner Bau / Steiner Handwerk – eine Route `/`

1. **Navigation/Hero:** markante klare Leistungspositionierung, geografischer Bezug, direkte Kontaktstrecke, sichtbares DEMO-PROJEKT. Sidebar führt zu Start/Leistungen/Projekten/Über/Kontakt. Starkes Gegenstück zu den hellen Café-/Salonseiten.
2. **Versprechenstreifen:** eine Ansprechperson, klare Absprachen, Sauberkeit; relevant für Renovation. Keine überzogenen Zahlen.
3. **Leistungen:** vier sauber differenzierte Bereiche mit verständlichen Unterleistungen. **P3:** alle Einzel-CTAs führen zur gleichen Anfrage ohne Vorauswahl; eine Auswahlübernahme würde die Funktionsqualität verdeutlichen.
4. **Projekte:** ausdrücklich exemplarische Projekte und BEISPIELPROJEKT; gute Konsequenz bei Fiktionskennzeichnung. **P2:** reine Bilder + Orts-/Leistungsnamen liefern wenig Projekttiefe. Ein Beispiel mit Ausgangslage, Arbeitsumfang und Detailfoto wäre überzeugender.
5. **Über-Team:** Haltung und Abläufe plausibel. **P3:** „Die Menschen dahinter“ wird durch ein Arbeitsfoto und allgemein formuliertes Team beschrieben, nicht durch tatsächliche Personen. Für Demo entweder „So arbeiten wir“ nennen oder klar fiktive Rollenprofile.
6. **Prozess:** Reden → Planen → Machen ist verständlich und kurz.
7. **Kontakt:** explizites Demoformular, nur Testdaten, deaktiviert bis Handler bereit, ehrlicher lokaler Status. **P3:** nach Versuch kein gesonderter Neustart wie Café/Salon; weitere Eingaben möglich, Status bleibt Erfolg. Ein klarer Reset verbessert Demonstration.
8. **Footer:** Portfolio-Rückweg, Fiktion, Datenschutz vorhanden. **P2:** Namenswechsel zu Portfolio siehe oben.

Beleg: `demos/steiner-handwerk/app/page.tsx:3–27` (kompakt geschriebene Datei, Sektionen jeweils auf einer langen Zeile). Kein eigener EN-Auftritt.

### Café Vogel / Konditorei Vogel – vier Routen

#### `/`

- Hero, Spezialitäten, Geschichtsteaser, Öffnungszeiten/Standort und Kundenstimme ergeben ein glaubwürdiges Café-Erlebnis. Preise für Café Crème, Cappuccino und Linzer Torte stimmen mit Speisekarte überein; Stunden sind mit Kontakt/Footer konsistent.
- **P2:** „Vollständige Speisekarte“ enthält weder Startseiten-Buttergebäck CHF 2.80 noch Sauerteigbrot CHF 5.80. Frühstückskorb nennt auf Startseite Saisonfrüchte, in Detailkarte eine andere Aufzählung ohne diese Früchte. Gemeinsame Menüquelle mit identischen Namen/Bestandteilen; falls Tagesauswahl bewusst abweicht, so benennen. `app/page.tsx:3–9`, `app/speisekarte/page.tsx:3–44`.
- **P2:** „Maria S., Stammkundin“ ist nur durch globalen Footer als fiktiv erkennbar. Direkt „Beispielstimme“ nennen, analog Falkenried DE. Fiktive Stimme nicht pauschal als Betrug werten. `app/page.tsx:186–196`.
- **P3:** „Café Vogel“ versus „Konditorei Vogel“ kann bewusste Markenarchitektur sein; im Portfolio beide verbinden, damit Nutzer nicht denken, sie seien auf anderer Demo.

#### `/speisekarte`

- Stark: Frühstück/Backwaren/Getränke/Torten, Preise und Beschreibungen, Zeitfenster und Bestellvorlauf, Hinweis auf Allergien/frische Zutaten; als HTML leicht zugänglich.
- **P2:** echte Komplettheit gegenüber Startseite herstellen; gegebenenfalls Portionsbezug der einzelnen Tortenstücke eindeutig machen.
- **P3:** Kategorienavigation würde die lange Speisekarte auf Mobilgeräten beschleunigen. Noch keine separate Detailseite nötig.

#### `/ueber-uns`

- Stark: Erzählung, Chronik, Werte und CTA bauen ein schlüssiges Familienhandwerk-Konzept auf.
- **P2, Widerspruch:** Überschrift „Drei Generationen“, Erzählung und Chronik nennen Gründer Elisabeth/Hans und Sohn Michael – zwei Generationen. Eine dritte Generation plausibel ergänzen oder Titel auf zwei ändern. `app/ueber-uns/page.tsx:3–8`, `:54–65`.
- **P3:** „ausschliesslich … regionale Zutaten“ kollidiert inhaltlich mit Arabica-Kaffee und Schokolade im Angebot. Aussage auf passende lokale Zutaten begrenzen. Kein Beschaffungsbeweis nötig, sondern interne fiktive Plausibilität. `:113`, `app/speisekarte/page.tsx:25–34`.
- **P3:** „zwei Ofen“ im ersten Chronikeintrag zu „zwei Öfen“.

#### `/kontakt`

- Stark: Adresse ausdrücklich fiktiv, keine reale Rufnummer, Stunden, anschaulicher Standortplatzhalter, Demoformular mit ehrlicher Bestätigung und Wiederholen.
- **P1/P2 funktionale Lücke:** Reservierungsformular fragt Datum und Personen, aber keine Uhrzeit. Damit demonstriert es noch keine vollständige Tischanfrage. Wunschzeit oder Zeitfenster ergänzen; Demoabsenden weiterhin lokal. `app/kontakt/page.tsx:19`, `:152–166`.
- **P3:** „Reservierung“ versus „Demo-Reservierung ausprobieren“ am Einstieg konsequent aufeinander beziehen. Footer-Kennzeichnung ist gut, ein früher kurzer Konzept-Hinweis wäre auf Direktbesuchen klarer.

Navigation hat vier klare Ziele; kein EN-Auftritt. Portfolio-Rückweg im Café-eigenen Footer nicht vorhanden (im Gegensatz Steiner/Salon); als P2 gemeinsamen „Zurück zu SILVAN“-Einstieg ergänzen. `app/components/Footer.tsx:29–68`.

### Salon Lumière – vier Routen

#### `/`

- Stark: persönliche Ansprache, klare Termin-/Preis-CTAs, freundliches Interieur, Teamteaser, drei Werte, vier Preisbeispiele; Preise stimmen mit Leistungsseite überein.
- **P2:** Abschluss „Buchen Sie jetzt Ihren Termin“ führt nur zur allgemeinen Terminanfrage-Demo. Konsistent „Termin anfragen / Anfrage ausprobieren“. `src/app/page.tsx:169`.
- **P3:** Bereich „Expertise“ bleibt narrativ („führende Häuser“) – als ausdrücklich fiktive Geschichte zulässig, aber weniger stark als ein paar illustrative Arbeitsbeispiele.

#### `/leistungen`

- Stark: vier Kategorien, zwölf Leistungen, Beschreibung, CHF und Dauer; nutzbarer als viele echte Salonseiten.
- **P2:** Karten nennen teils scheinbar feste Preise (Herrenschnitt CHF 45), Schlussnotiz erklärt alle Preise unverbindlich. Einheitliche Preislogik („Richtpreise“, abhängig von …) nahe Liste. `src/app/leistungen/page.tsx:8–23`, `:156`.
- **P2:** kein Direkt-CTA je Leistung; Klick von Home zu Leistungen/weiter Kontakt verliert Leistungswahl. Für eine hochwertige Demo Auswahl in Anfrage übernehmen.
- **P2:** „Termin buchen“ am Ende erneut zu „Termin anfragen“ korrigieren. `:174`.
- **P3:** Schweizer Schreibweise vereinheitlichen (massgeschneidert, gleichmässig, regelmässig), aktuell mehrere ß-Varianten.

#### `/ueber-uns`

- Stark: klarer Gründer-/Teamzusammenhang, drei Rollen mit Spezialisierungen, Werte. Seit 2010 und 15+ ist 2026 intern plausibel.
- **P2:** zwei von drei Teamkarten haben nur Initialen (`image: null`), eine hat ein Foto. Wirkt im Portfolio weniger fertig; entweder hochwertige klar illustrative Bilder oder durchgängig typografische Teamdarstellung. `src/app/ueber-uns/page.tsx:14`, `:21`.
- **P3:** letzte Werte-Sektion hat keinen eigenen nächsten Schritt; Kontakt bleibt im Header/Footer. Kurzer „Passende Stylistin anfragen“-Übergang möglich.

#### `/kontakt`

- Stark: fiktive Adresse, klar keine reale Kontaktadresse, Tageshervorhebung der Stunden, Demo-Erklärung, ehrliche Erfolgsmeldung/erneut ausprobieren.
- **P2:** lediglich Name/E-Mail/Nachricht; kein Wunschdatum, Zeitraum oder Leistung. Für allgemeine Anfrage akzeptabel, für beworbene Termin-Demo dünn. „Terminanfrage“ gezielt simulieren oder als allgemeines Kontaktformular benennen. `src/app/kontakt/page.tsx:31–36`.
- Footer macht Fiktion umfassend sichtbar und bietet Rückweg zum Projekt. Kein EN-Auftritt.

### Falkenried – 22 Routenpaare DE/EN und 404

#### Gemeinsame Shell/Navigation

- Stark: Hauptbereiche, bereichsbezogene Unternavigation, zugehörige Sprachauswahl, eigenständige Kontakt-/FAQ-/Historyseiten. Demo-Hinweis und noindex sind vorhanden. `src/i18n/nav.ts:7–29`, `src/layouts/BaseLayout.astro:64`.
- **P2, systematischer EN-Bruch:** `nav.en.bmw` ist „Autowerkstatt“, Telefon „Telefon auf Anfrage“, E-Mail-Link zeigt zur deutschen Kontaktseite. Footer-Schlusslink „Datenschutz dieser Demo“ ist ebenfalls Deutsch. `src/i18n/nav.ts:45`, `:102–107`, `src/components/Footer.astro:64`.
- **P2:** „Jetzt anrufen/Call Now“ in FAQ führt nur auf `#demo-hinweis`, nicht zum Telefon. Schutz vor realem Anruf ist gewollt; Aktionslabel sollte den Demo-Effekt ehrlich nennen. `src/pages/faq.astro:78`, `src/pages/en/faq.astro:78`.

#### Start `/`, `/en/`

- Hero, drei Bereiche, Porträt, Stimmen, Geschichte und Kontaktabschluss ergeben klare Struktur und den stärksten Umfangsbeleg des Portfolios.
- **P2 echter Tippfehler:** „Pers?nlicher Fahrzeugservice“. `src/pages/index.astro:41`.
- **P2:** Porträt auf EN wird als komplett deutscher Block mit Link `/geschichte/` gerendert; `VideoPreview` ignoriert übersetzte Props. In tatsächlichem Renderer korrigieren. `src/components/VideoPreview.astro:5`, `src/pages/en/index.astro:62`.
- **P2:** deutsche Beispielstimmen sind direkt als DEMO deklariert, EN sagt „CUSTOMER TESTIMONIALS / What our customers say“. Fiktion lokal in beiden Sprachen gleich klar machen. `src/pages/index.astro:72`, `src/pages/en/index.astro:66`.
- **P2:** Zusage „meldet sich innerhalb von 24 Stunden“ passt nicht zur direkt benachbarten Demo ohne Sendung. Als hypothetischen Musterablauf formulieren oder entfernen. `src/pages/index.astro:100`.
- **P3:** SEO „seit 55 Jahren“ vs 1969 bei Stand 2026: auf „seit 1969“ umstellen; „über 55 Jahre“ im übrigen Text ist nicht falsch.

#### BMW-Übersicht `/bmw-garage/`, `/en/bmw-garage/`

- Stark: differenzierte Leistungen, Benefitliste, drei Prozessschritte, Öffnungszeiten mit Samstagsausnahme, Ansprechpartner und FAQ.
- **P2:** FAQ behauptet externen BMW-Onlineterminplaner; sämtliche tatsächlichen Buchungswege gehen auf lokales Demo-Kontaktformular. EN-Prozess verspricht den externen Planer explizit ebenfalls. `src/data/bmw.ts:167`, `src/pages/en/bmw-garage.astro:118`, `src/data/company.ts:29`.
- **P2:** „Termin auswählen“ wird im Kontaktformular nicht als Datum-/Zeitfeld eingelöst. Entweder passende Demo-Zeitwahl bauen oder sprachlich „Anfrage formulieren“.
- **P2 redaktionelle Inkonsistenz:** DE-Start-Bereich wurde generischer Fahrzeugservice, EN sagt noch „BMW partner“, History EN „BMW Partnership“, DE „Werkstattausbau“. Als fiktive Rollenbeschreibung konsistent halten; keine rechtliche Bewertung der Markennennung daraus ableiten.

#### BMW Service `/bmw-garage/service/`, `/en/bmw-garage/service/`

- Stark: sieben benannte Werkstattleistungen mit Details/Zielgruppe; ein präzises Beispiel CHF 87 für Feriencheck.
- **P2:** „Stand/geprüft/Verified 2026-08-24“ klingt nach realer Datenverifikation, obwohl fiktiver Betrieb. Besser „Beispielpreise / Demo-Inhalte“ statt faktischer Verifizierungsbehauptung. `src/components/BMWPortalPage.astro:39`.
- **P3:** CHF-Preis hat Sternchen ohne spezifische Sternchenerklärung (nur generischer Preisänderungshinweis). Fussnote konkret erklären oder Stern entfernen.

#### Occasionen `/bmw-garage/occasionen/`, `/en/bmw-garage/used-cars/`

- Stark: keine realen externen Angebote werden geladen. Eindeutig „DEMO · FAHRZEUGANGEBOT“, keine falschen Verfügbarkeiten. `src/components/ExternalEmbed.astro:5`.
- **P2:** „Geprüfte BMW Occasionen“ als Hero führt zu einer reinen Hinweiskarte. Für Portfolioziel weniger überzeugend als zwei klar fiktive Fahrzeugkarten mit echten Filtern/Detailzustand. Alternativ Hero ehrlich „Fahrzeugangebot im Konzept“.
- **Wichtig:** `autolina.iframeUrl` und Aktivierungstexte werden zwar übergeben, `ExternalEmbed` rendert sie nicht. Kein Beleg für echte Autolina-Verbindung; Privacy-Text dazu nicht fälschlich als widersprüchlich markieren.

#### Servicestation `/bmw-garage/servicestation/`, `/en/bmw-garage/service-station/`

- Stark: Tankstelle, Laden, Waschen, Sauger getrennt; Öffnungszeiten und Zahlungsarten je Angebot, Sonntagsausnahme ausdrücklich.
- **P2:** wiederum verifizierte Datenbehauptung bei Fiktion. Beispielstatus sichtbarer machen. **P3:** Ladeleistung/Steckertyp fehlt, falls Station als funktionaler Besucherplaner demonstriert werden soll; nur als fiktives Beispieldatum ergänzen.

#### Zubehör `/bmw-garage/zubehoer/`, `/en/bmw-garage/accessories/`

- Stark: Zubehör vs Kompletträder, klare Beratungs-CTAs.
- **P2:** nach grossem Hero nur zwei generische Karten. Ein konkretes saisonales Beispiel und welche Fahrzeugangaben zur Anfrage gehören würden inhaltliche Tiefe schaffen.

#### Garten-Übersicht `/gartenbau/`, `/en/gartenbau/`

- Stark: Planung/Pflege getrennt, Prozess in vier Schritten, Bildwelt, Ansprechpartnergedanke, Anfrage und FAQ. Bereichsnavigation macht Details zugänglich.
- **P2:** erneute echte Rückmeldezusage „24 Stunden“ neben lokalem Demoformular. Konsistent als Vorschau formulieren. `src/pages/gartenbau.astro:120`.
- **P3:** Aussagen zur Gartenwirkung sind eher emotional als konkret; etwa Gelände, Materialien und Pflegeaufwand anhand eines illustrativen Beispiels verdeutlichen.

#### Gartengestaltung `/gartenbau/gartengestaltung/`, `/en/gartenbau/garden-design/`

- Stark: Planung/Neuanlage, Wege/Mauern/Sitzplätze, Wasser/Erdarbeiten konkret. **P2:** Hero-Intro und Inhalt wiederholen dieselbe Datenquelle; eine Planungsentscheidung oder kleines Beispiel statt Verdopplung. `src/components/GardenPortalPage.astro:18–30`, `src/data/garden.ts:6`.

#### Gartenunterhalt `/gartenbau/gartenunterhalt/`, `/en/gartenbau/garden-maintenance/`

- Stark: Rasen/Schnitt/Bepflanzung/Pflanzenschutz/Schnee als nachvollziehbarer Umfang. **P2:** Einmalpflege vs saisonaler/ganzjähriger Betreuung und Anfragebedarf präzisieren; aktuell hauptsächlich Liste mit wiederholtem Intro.

#### Mulden/Transport `/gartenbau/mulden-transporte/`, `/en/gartenbau/containers-transport/`

- Stark: 4–6 m³, Fahrzeugtypen und Materialarten konkret. **P2:** Angaben, die Anfrage ermöglichen (Ort/Zufahrt, Materialart, Menge, Zeitraum), fehlen als Hilfestellung; nicht zur echten Abfallberatung erweitern.

#### Gartenreferenzen `/gartenbau/referenzen/`, `/en/gartenbau/references/`

- Stark: Bildauswahl ausdrücklich keine Kundenreferenzen. **P2:** Hero „Gärten, die wir gestaltet haben“ kollidiert mit diesem direkt folgenden Hinweis. „Gartenideen im Designkonzept“ ist konsistent. `src/components/GardenPortalPage.astro:22`, `:30`.
- **P3:** nur Galerie; ein illustratives Kurzbeispiel mit Gestaltungsziel wäre ein besserer Kompetenzbeleg.

#### Gartentipps `/gartenbau/tipps/`, `/en/gartenbau/tips/`

- Stark: drei verständliche Themen Pflanzzeiten, Jahrespflege, Materialzusammenhang; konditionale Aussagen berücksichtigen Standort/Boden/Pflanze.
- **P3:** sehr kurze generische Inhalte, keine echten Detailratgeber. Titel nicht als umfassende Wissensbibliothek aufblasen; eine konkrete Saison-Checkliste reicht als Demoausbau.

#### Immobilien `/immobilien/`, `/en/immobilien/`

- Stark: Eigentumsbestand erklärt, drei filterbare Objektarten, Mietprozess, Ansprechpartner, spezifische Anfrage und FAQ. Keine erfundenen Sofortverfügbarkeiten, Preise „auf Anfrage“.
- **P1/P2, funktionsloses Aktionsversprechen:** „Details anfragen“/„Request Details“ ist nur `<span>` und hat keine Funktion. Als Button zum Formular mit Objektauswahl implementieren oder neutral „Beispielobjekt“ nennen. `src/components/PropertyCard.astro:54`.
- **P2:** keine objektbezogenen Kenndaten wie Zimmer/Fläche/Lage; dadurch zwar filterbar, aber nicht entscheidungsfähig. Für Demo genügen klar erfundene vollständige Daten einer Musterwohnung.
- **P3:** „Zürcher Unterland, Zürcher Unterland“ und „Schöfflisdorf-Zürcher Unterland“ wirken wie ungeprüfte Ortsersetzungen. Fiktiven Ort bewusst konsistent benennen. `src/pages/immobilien.astro:63`, `:75`.
- **P2:** Bewerbungstext nennt Betreibungsauszug; Demo-Hinweis schon vor diesem Schritt/Anfrage sehr klar halten, keine realen Dokumente sammeln. Der aktuelle Renderer besitzt kein Uploadfeld; kein Datenabfluss nachgewiesen.

#### Geschichte `/geschichte/`, `/en/history/`

- Stark: Chronik 1969/1985/2000/heute, Bereichsteam, Werte, Abschluss-CTA. Keine echte Unternehmensgeschichte suggerieren ausserhalb Demo-Kontext.
- **P2:** BMW-Partnerschaftsbezeichnung unterscheidet sich DE/EN, siehe oben. Geschichte spricht Immobilienaufbau ab 2000, Immobilien-Hero „seit über 50 Jahren“ – interner Zeitlinienkonflikt. Entweder Immobilientradition separat erklären oder Dauer korrigieren. `src/pages/geschichte.astro:71`, `src/pages/immobilien.astro:33`.

#### FAQ `/faq/`, `/en/faq/`

- Stark: drei Bereiche und konkrete Kundenfragen; differenzierte Tank-/Waschzeiten bereits in gemeinsamer BMW-FAQ.
- **P2:** nicht funktionierendes Planer-Versprechen und falsches Call-Now-Label wie oben; EN-Titelgruppe bleibt „Autowerkstatt“.
- **P3:** generische hohe Qualitäts-/Garantieaussagen als fiktiver Inhalt nicht automatisch als echte Garantie von SILVAN interpretieren. Für Musterwebsite bedingte Aussagen/Modellbezug präzisieren.

#### Aktuelles `/aktuelles/`, `/en/news/`

- Stark: drei gut unterscheidbare Karten zu Unternehmen/Ratgeber/Service.
- **P1/P2:** alle „Originalbeitrag ansehen“ verlinken `https://falkenried.example`; es gibt keinen passenden Originalartikel. Nicht die absichtlich fiktive Domain beanstanden, sondern die funktionale Schaltfläche, die einen lesbaren Artikel verspricht. Interne Musterartikel, lokale Details oder neutrales nicht klickbares Demolabel. `src/components/CompanyContentPage.astro:20`, `src/data/company-content.ts:9–11`.
- **P2:** „Geprüfte Neuigkeiten“ und Datum „verifiedOn“ überziehen die Fiktion als realen Informationsbestand. Gleichwertige Demokennzeichnung.

#### Veranstaltungen `/veranstaltungen/`, `/en/events/`

- Stark: ehrlicher Leerzustand, kein erfundenes tatsächlich buchbares Datum; Rückweg zu News.
- **P3:** dauerhaft leere Seite beweist wenig gegenüber Portfoliozweck; nur beibehalten, wenn Leerzustandsdesign bewusst gezeigt werden soll, oder eine klar fiktive Beispielveranstaltung ohne echte Anmeldung.

#### Jobs `/jobs/`, `/en/jobs/`

- Stark: keine offenen Stellen erfunden, verständlicher Leerzustand.
- **P2:** „Initiativ bewerben“ suggeriert reale Bewerbung; besser „Bewerbungsanfrage im Demoformular testen“. EN führt hart codiert nach `/kontakt/#allgemeine-anfrage`. `src/components/CompanyContentPage.astro:22`.

#### Partner `/partner/`, `/en/partners/`

- Stark: zwei Partnerarten erklären sinnvolle Ergänzung zur Immobilienleistung.
- **P1/P2:** „Website besuchen“ führt in neuem Tab zum eigenen Kontakt, nicht zur Partnerwebsite. Aktion ehrlich „Partneranfrage ausprobieren“ nennen und lokalisiert zum Demoformular führen. `src/components/CompanyContentPage.astro:23`, `src/data/company-content.ts:16–17`.
- **P2:** „Offiziell veröffentlichte Partner“ ist unnötiger Echtheitsanspruch innerhalb des fiktiven Konzepts.

#### Kontakt `/kontakt/`, `/en/contact/`

- Stark: nach Bereichen getrennte Ansprechpartner und Demoformular; niemand wird versehentlich echt angeschrieben.
- **P2:** 24-Stunden-Zusage entfernen/konjunktivisch; E-Mail aussieht wie Mailaktion, führt aber zur gleichen Formularsektion. Label als Demoaktion klarer.
- **P2:** EN-E-Mail-Links mehrfach hart codiert DE (`src/pages/en/contact.astro:66`, `:99`); globale Telefontexte nicht übersetzt.
- **P3:** Fax „Nicht verfügbar“ nimmt Platz ohne Nutzwert; in einer modernen Demo weglassen oder als bewusstes Layoutbeispiel erklären.

#### Impressum/Datenschutz `/impressum/`, `/datenschutz/`, `/en/imprint/`, `/en/privacy/`

- Stark: Fiktion, illustrative Services/Immobilien/Stimmen und kein echter Kontakt ausdrücklich erklärt; lokal bleiben Formulare/Fonts/Bilder. Keine realen Firmenregisterdaten nötig, um den fiktiven Betrieb „vollständig“ zu machen.
- **P3:** englische Description bleibt „Falkenried – fiktives Designkonzept“; Metadaten übersetzen. Reale Verantwortlichkeit der Demo über SILVAN-Links auffindbar. Kein juristisches Urteil.

#### `/404`

- Verständliche DE/EN-Kurztexte und zwei passende Home-Wege. Kein weiterer Contentausbau nötig.

## Priorisierte nächste Schritte

1. Sichtbare falsche Aktionen in Falkenried reparieren: Artikel, Partner, Immobilien-Details, Call-Now/Terminanfrage; Demo-Schutz beibehalten.
2. Inhaltsparität Falkenried EN herstellen: Porträtblock, Kontakt-/Footer-/Jobs-Links, Werkstattbenennung, Beispielstimmen; Hauptseiten-Demo-CTA auf passenden Sprachpfad.
3. Hauptangebot präzisieren: Preisrahmen statt widersprüchlich „fest“, Beliebtheitsbadge belegen oder ändern, Pflege-/Präsenz-/Automationsumfang konkret, absolute Qualitätsaussagen begrenzen.
4. Café-Zeitfeld, Menükonsistenz, Generationen; Salon-Anfragebegriffe und Auswahlhilfe; Steiner-Namen konsolidieren.
5. Vor weiteren dekorativen Sektionen zunächst reale Kompetenz sichtbar machen: ein belastbares Beispiel je Hauptdienstleistung, projektspezifische Ergebnisse statt vier identischer Resultattexte.

## Vollständige Routenabdeckung dieser Quelltextprüfung

Hauptwebsite: `/`, `/websites`, `/reviews`, `/presence`, `/automation`, `/work`, `/work/falkenried`, `/work/cafe-vogel`, `/work/steiner-handwerk`, `/work/salon-lumiere`, `/about`, `/contact`, `/hello`, `/imprint`, `/privacy` jeweils auch unter `/en`; NotFound-Text/Renderer.

Steiner: `/` mit Start, Leistungen, Projekte, Über, Prozess, Kontakt und Footer.

Café: `/`, `/speisekarte`, `/ueber-uns`, `/kontakt` plus gemeinsame Navigation/Footer.

Salon: `/`, `/leistungen`, `/ueber-uns`, `/kontakt` plus gemeinsame Navigation/Footer.

Falkenried: 22 Paare vollständig in obigen Unterabschnitten aufgeführt, insgesamt 44 Inhaltsrouten plus `/404`. Demos zusammen: 54 Quelltextrouten inklusive Falkenried-404. Gemeinsame Renderer decken entsprechende Routenvarianten ab; dies ist kein Nachweis von 54 interaktiv im Browser geprüften Live-Seiten.
