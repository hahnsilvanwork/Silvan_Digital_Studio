# Assessment A – unabhängige Designkritik

Datum: 9. September 2026. Methode: isolierter Design-Agent `/root/design_review`, ohne frühere Audits oder Detektorresultate. Live-Ziel: https://silvandigital.ch. Kontext: PRODUCT.md, DESIGN.md, Assessment-A-Anleitung aus Impeccable critique. Keine Implementierungsänderungen.

## Umfang und Aussagegrenzen

Neun Live-Routen (`/`, `/websites`, `/reviews`, `/work`, `/contact`, `/about`, `/presence`, `/automation`, `/work/falkenried`) mit Chromium/Playwright in eigenen neuen Seiten bei 1440 × 1000 und 390 × 844 geprüft. Vollständige Screenshots und sichtbare Texte liegen unter `artifacts/audit-2026-09-09/design/`. Zusätzlich echte mobile Viewportbilder und eine NFC-Modellwahl bis zur Pflichtfeldvalidierung. Keine Nachrichten versandt, keine Bestellung ausgelöst. Nicht geprüft: vollständige Demo-Interaktionen, Screenreader, 200%-Zoom, Performance unter langsamer Verbindung, sämtliche Formularzustände. Die Heuristikwerte sind eine fachliche Einschätzung dieses begrenzten Rundgangs, kein Accessibility-Zertifikat.

## Design-Spezifität zuerst

Die Seite ist nachvollziehbar für einen unabhängigen Schweizer Entwickler gestaltet: zurückhaltende Typografie, echte Person, Ortsbezug, CHF-Preise, sichtbare Websites und physische NFC-Produkte. Besonders die farbigen Projekte im neutralen Rahmen geben dem Auftritt Glaubwürdigkeit. Sie wirkt ordentlich und persönlich, aber noch nicht unverwechselbar auf dem Niveau eines herausragenden Designstudios. Die Eigenständigkeit stammt hauptsächlich aus den gezeigten Projekten und dem Porträt. Die Rahmenkomposition und besonders Presence/Automation könnten nach einem Texttausch vielen kleinen Agenturen dienen. Die beste nächste Entwicklung wäre mehr konkreter Arbeitsnachweis in der vorhandenen visuellen Sprache, nicht zusätzliche Dekoration.

## Was bereits gut funktioniert

1. **Schnelle Einordnung auf der Startseite.** Bei 390 px sind Nutzenüberschrift, Schweizer KMU, Person/Ort und zwei gut bedienbare nächste Schritte sichtbar; das Konzeptbild folgt direkt. Die vier Leistungszeilen führen mit verständlichem Kurztext und Preisanker weiter. Beleg: `home-mobile-viewport.png`, `home-1440.png`.
2. **Ehrliche, anschauliche Arbeitsproben.** Vier eigenständige visuelle Richtungen und explizite Konzeptkennzeichnung. Die Detailseite nennt Aufgabe, Gestaltung und Grenzen und bietet eine konkrete Demo sowie Kontakt. Fehlende Kundenstimmen sind hier kein Defekt: Es gibt noch keine Kunden, und die vorhandenen Demonstrationen sind der richtige Beweisweg. Beleg: `work-1440.png`, `work-falkenried-390.png`.
3. **Konkrete Kontakt- und Anfrageführung.** Kontaktwege sind grosse echte Links. Auf `/contact` wird der externe Entwurf erklärt. Bei NFC übernimmt eine Modellwahl das Produkt und zeigt es mit Bild, Preis und Änderungsmöglichkeit; die leere Pflichtauswahl erhält Fokus und verständlichen Hinweis. Beleg: `contact-mobile-viewport.png`, `reviews-mobile-selected.png`, `reviews-mobile-validation.png`.

## Prioritäten

### 1. [P2] Die Arbeitsbeweise sprechen zu oft wie technische Abnahmekriterien

**Beleg:** `/work` erklärt bei Falkenried, dass der Objekttitel übernommen und der Fokus auf ein Feld gesetzt wird; bei Café Vogel werden halbstündige Schritte, Datumswechsel und Zurücksetzen erklärt. Auf `/about` steht unter „Was ich voraussetze“, dass Inhalte als fertiges HTML ausgeliefert werden. Diese Aussagen sind konkret und ehrlich, dominieren aber den kurzen Raum, in dem ein KMU-Inhaber die geschäftliche Relevanz erkennen soll. Die tatsächliche Interaktion wird nirgends neben diesem Text gezeigt.

**Wirkung:** Die sorgfältige Umsetzung ist erkennbar; der Nutzen erfordert Übersetzungsarbeit. Ein Interessent für eine Café-Seite sollte zuerst verstehen, wie Gäste Angebot und Besuch planen, nicht wie ein Formular intern seinen Zustand behandelt.

**Fix:** In Projektkarten zuerst ein bis zwei Sätze über Aufgabe und sichtbare Lösung, etwa „Gäste finden Speisekarte und Öffnungszeiten und können ihren Besuch in einer Demo planen.“ Die präzise Interaktion als „In der Demo ausprobieren“ auf der Detailseite behalten. Auf About technische Merkmale in verständliche Folgen übersetzen und Details optional vertiefen. Keine Erfolgszahlen erfinden.

**Werkzeug:** `$impeccable clarify` / `$impeccable distill`.

### 2. [P2] Presence und Automation sind deutlich textlastiger als das Bildversprechen der Marke

**Beleg:** Die mobilen Seiten sind rund 5924 bzw. 6016 px lang. Fast die ganze Strecke besteht aus Überschrift, Absatz, Liste und nächsten Absätzen; die dunkle Prozessfläche ist die einzige grössere visuelle Unterbrechung. Der Öffnungszeitenvergleich und die Aufgabenliste-zum-Wochenbericht-Idee sind bereits vorhanden, werden aber ausschliesslich beschrieben. Siehe `presence-390.png`, `automation-390.png` und zugehörige Desktopbilder.

**Wirkung:** Nach der bildgestützten Startseite entsteht ein emotionales Tief. Beide erklärungsbedürftigen Angebote erfordern gerade dort viel Lesen, wo ein konkretes sichtbares Beispiel schneller helfen könnte. Viele Abgrenzungen sind sinnvoll; ihre gleiche Darstellungsform macht die Seiten dennoch schwerer zu überfliegen.

**Fix:** Aus vorhandenen, ausdrücklich hypothetischen Beispielen je eine belegbar illustrative Ansicht gestalten: Öffnungszeiten vorher/nachher, sowie drei Aufgaben → Berichtsentwurf → menschliche Freigabe. Eine kurze Nutzen- und Umfangsebene voranstellen; Detailbedingungen und Ablaufschritte darunter bündeln. Keine angeblichen Kundensysteme oder Leistungsversprechen ergänzen.

**Werkzeug:** `$impeccable distill` / `$impeccable clarify`.

### 3. [P2] Der NFC-Katalog zeigt Varianten, hilft aber nur begrenzt bei der Modellentscheidung

**Beleg:** Desktop zeigt sieben Kategorien und initial neun Google-Reviews-Modelle, fast alle mit sehr ähnlichem Beschreibungstext und gleichem CHF-49-Preis. Form, Farbe, Aufsteller und Personalisierung stehen auf derselben Entscheidungsebene. Mobile reduziert die Kategorie sinnvoll auf eine Auswahl und zeigt eine horizontale Produktfolge; für einen Vergleich mehrerer Modelle müssen Besucher dennoch durchblättern. `reviews-1440.png`, `reviews-mobile-catalogue.png`.

**Wirkung:** Ein Kunde kann ein Modell anfragen, muss aber selbst herausfinden, wann eine flache Karte oder ein Aufsteller sinnvoll ist. Die starke Modellvorbelegung löst die anschliessende Anfrage gut; die vorausgehende Auswahl bleibt der schwächere Abschnitt.

**Fix:** Oberhalb der Modelle zwei bis drei kurze Einsatzempfehlungen („Für den Tresen: Aufsteller“, „Für flexible Platzierung: flache Karte“, „Mit Ihrem Namen/Logo: personalisiert“) und danach Varianten. Keine willkürlichen Bestsellerlabels. Farbvarianten möglichst innerhalb einer Modellfamilie vergleichen. Den vollständigen Katalog und die funktionierende Vorbelegung erhalten.

**Werkzeug:** `$impeccable clarify` / `$impeccable distill`.

### 4. [P2] Der mobile Arbeitsnachweis bleibt bei einer verkleinerten Desktopansicht

**Beleg:** `/work/falkenried` zeigt bei 390 px dasselbe 1440 × 1000-Desktopbild wie die Übersicht. Es beweist den Gesamtstil, doch Menüpunkte und kleine Details sind darin kaum lesbar. Unterhalb folgen reine Textbeschreibungen; die tatsächliche mobile Gestaltung und die erwähnte Objektanfrage werden nicht abgebildet. `work-falkenried-390.png`, `home-mobile-viewport.png`.

**Wirkung:** Für die laut PRODUCT.md überwiegend mobilen Besucher wird „funktioniert auf dem Smartphone“ eher beschrieben als direkt demonstriert. Der vorhandene Demo-Link ist ein guter Ausweg, verlangt jedoch einen zusätzlichen Kontextwechsel.

**Fix:** Die unverfälschte Desktopübersicht behalten und auf der Detailseite eine tatsächliche mobile Aufnahme sowie einen gezielten Screenshot des erwähnten Ablaufs ergänzen. Je Bild ein kurzer Satz, warum diese Lösung für den Nutzer wichtig ist. Keine künstlichen Geräte-Mockups nötig.

**Werkzeug:** `$impeccable adapt` / `$impeccable clarify`.

### 5. [P2] Die Website-Preisstufen enden ohne direkten nächsten Schritt pro Umfang

**Beleg:** `/websites` hat vier nachvollziehbare Preisbereiche, aber keine Anfrageaktion in den einzelnen Paketen. Nach den Paketen folgen Kostenhinweise, Pflege, Prozess und FAQ, bevor erneut grosse Kontaktwege erscheinen. `websites-1440.png`. Die Business-Website wird optisch hervorgehoben, aber die gerade getroffene Paketwahl wird nicht sichtbar in die Kontaktaktion übernommen.

**Wirkung:** Wer seinen Umfang gefunden hat, muss sich neu orientieren und seine Einordnung erneut formulieren. Es ist kein Blocker, denn Header und Hero führen zum Kontakt; die Entscheidung wird lediglich nicht direkt fortgesetzt.

**Fix:** Pro Paket einen klaren Textlink „Diesen Umfang besprechen“ anbieten und den Umfang im Kontaktentwurf vorbelegen. Keine automatische feste Preiszusage; die Richtwert- und Offertenlogik erhalten.

**Werkzeug:** `$impeccable clarify`.

## Nielsen-Heuristiken

Skala: 0 kritisch, 1 schwach, 2 teilweise erfüllt, 3 gut, 4 hervorragend. Hoher Wert ist gut.

| # | Heuristik | Wert | Begründung |
|---|---|---:|---|
| 1 | Sichtbarkeit des Systemstatus | 3 | Aktive Desktopnavigation; Modellwahl und Validierungszustand sichtbar. Nur begrenzter Interaktionstest. |
| 2 | Übereinstimmung mit der Lebenswelt | 2 | Angebote und CHF verständlich; Portfolio/About teilweise stark auf Implementierungsdetails ausgerichtet. |
| 3 | Kontrolle und Freiheit | 3 | Direkte Links, Modelländerung und unverbindliche Übergabe; kein beobachteter gefangener Zustand. |
| 4 | Konsistenz und Standards | 3 | Sehr konsistenter Grundrahmen; NFC-Formular verwendet auffällig rundere Kontrollen als die übrigen 4-px-Aktionen. |
| 5 | Fehlervermeidung | 3 | Modellvoreinstellung, Mengenpreis und Offenlegung der Versand-/Offertenlogik; Pflichtfelder werden vor Übergabe geprüft. |
| 6 | Wiedererkennen statt Erinnern | 3 | Dienste, Preise, grosse Kontaktwege und gewähltes Produkt sichtbar; Modellvergleich und Paketfortsetzung könnten besser führen. |
| 7 | Flexibilität und Effizienz | n/a | Überwiegend Persuade-/Portfoliofläche; Expertenbeschleuniger sind kein sinnvoller Kernmassstab dieses Rundgangs. |
| 8 | Ästhetik und minimalistisches Design | 3 | Ruhig, klar, gut gegliedert; lange Textstrecken und detailreiche Projektkartentexte schwächen die Konzentration. |
| 9 | Fehler erkennen und beheben | 3 | Beobachtete NFC-Pflichtfeldprüfung fokussiert das betroffene Feld und benennt den Handlungsbedarf. Andere Fehlerpfade nicht geprüft. |
| 10 | Hilfe und Dokumentation | 3 | Kontextnahe FAQs, Leistungsumfang, Nutzung und Lieferung sind vorhanden. Keine unnötige Forderung nach einem Hilfezentrum. |
| | **Gesamt** | **26/36** | **72,2 % – gut; gezielte Verbesserungen sinnvoll.** |

## Kognitive Belastung

- Hauptnavigation: sieben inhaltliche Ziele plus zwei Sprachen; mehr als vier Optionen. Noch scanbar, aber keine klare Gruppierung zwischen Leistungen und Studio. Als kleinere Beobachtung, nicht als schwerwiegender Navigationsdefekt.
- Startseite: vier Leistungswege passen gut in eine einzelne Auswahlaufgabe. Hero mit einem primären und einem sekundären CTA ist klar priorisiert.
- NFC Desktop: sieben Kategorien und neun initiale Modelle überschreiten die Orientierungsschwelle; Mobile entschärft dies durch Auswahlfeld und horizontale Galerie. Die spezifische Empfehlung bleibt offen.
- Kontakt: vier eindeutig bezeichnete Kanäle; vertraute Alternativen, keine unnötige Vervielfachung.
- Leseaufwand: Work, Presence und Automation verlangen mehrfach Lesen und Einordnen, obwohl eine konkrete Darstellung die Entscheidung vereinfachen könnte.
- Wiederholung: Umfang, Schritte, FAQs und Abschlusskontakt sind vorhersehbar; bei den textreichen Diensten könnte die erste sichtbare Ebene kürzer sein.

## Emotionaler Verlauf und Personas

Der Auftakt ist kompetent und zurückhaltend; die farbigen Projekte und das echte Porträt bilden die stärksten Momente. Ein Tief entsteht auf langen sachlichen Serviceabschnitten. Kontakt beendet die Reise klar und ohne Formularhürde. Auf der Projektseite ist der Kontaktbutton sinnvoll vorhanden, wirkt im grossen leeren Abschnitt jedoch etwas losgelöst.

**Jordan, unerfahrener Erstbesucher:** Versteht die Hauptleistungen, könnte aber zwischen NFC-Modellfamilien und den englischen Designstufen stocken. Fachliche Portfolioformulierungen helfen ihm weniger als ein kurzer Nutzensatz.

**Casey, abgelenkter Mobilbesucher:** Einstieg und Kontakt sind angenehm lesbar und gross genug. Lange Textstrecken und die horizontal zu vergleichenden Produktvarianten brauchen zusätzliche Aufmerksamkeit. Keine generelle mobile Unbenutzbarkeit beobachtet.

**Riley, prüfender Interessent:** Findet ehrliche Konzeptkennzeichnungen und Preisabgrenzungen. Möchte die behaupteten Funktionen sehen; auf der Projektseite muss er dafür zur externen Demo wechseln. Die NFC-Fehlermeldung reagiert im geprüften Fall nachvollziehbar.

## Subjektive Bereichsnoten /10

Diese Werte sind Designurteile, keine gemessenen Konversionsraten.

| Bereich | Note | Kurzurteil |
|---|---:|---|
| Startseite | 8 | Gute Angebotsführung, persönliche und konkrete Bilder. |
| Websites | 7,5 | Umfang gut erklärt; Paketfortsetzung und visuelle Beweise ausbaufähig. |
| NFC & QR | 7 | Starkes Produktmaterial und gute Vorbelegung; Modellentscheidung relativ aufwendig. |
| Arbeiten | 7,5 | Eigenständige Beispiele; Begleittext zu technisch. |
| Projektdetail Falkenried | 7 | Solider Nachweis, aber nur eine Desktopansicht und wenig bildliche Tiefe. |
| Kontakt | 8,5 | Direkte Wege, klare Entwurfserklärung und nächster Schritt. |
| Über mich | 7,5 | Persönlich und glaubwürdig; mehr Nutzerperspektive in der Arbeitsweise. |
| Online-Präsenz | 6,5 | Sachlich klar, visuell eintönig. |
| Automation | 6,5 | Vernünftige Abgrenzung, aber abstrakte lange Erklärstrecke. |
| Visuelles Gesamtsystem | 7,5 | Kohärent und professionell; noch begrenzte Eigenständigkeit des Rahmens. |
| Mobile Gebrauchstauglichkeit | 8 | Im geprüften Umfang gut; kein vollständiger Accessibility-Test. |
| Kommerzielle Klarheit | 7,5 | Preise und Kontakt gut; Nutzenbeweise und Auswahlunterstützung verbessern. |

## Fragen für die spätere Synthese

- Welches konkrete Stück Arbeit soll ein KMU-Inhaber nach 30 Sekunden erinnern: die Websitegestaltung, das physische NFC-Produkt oder einen gelösten Ablauf?
- Würde ein echter mobiler Ablauf mehr Vertrauen schaffen als ein weiterer erklärender Absatz?

Questions skipped: Assessment A stellt keine Fragen direkt an den Nutzer; die abschliessende Auswahlfrage gehört zur Synthese des Hauptagenten.

## Laufnotizen

Eigene neue Playwright-Seiten, nur produktive Seite gelesen und reversible Formularauswahl getestet. Kein lokaler Server gestartet, kein Overlay injiziert. Alle Browserprozesse dieses Rundgangs geschlossen. Temporäre Capture-Skripte nach Abschluss entfernt; Screenshots und Textprotokolle bleiben als Belege. Keine Detektorresultate oder früheren Audits gelesen. Keine existierende Ignore-Datei am geprüften Pfad gefunden.
