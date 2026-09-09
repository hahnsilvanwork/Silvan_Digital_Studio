# Assessment A – unabhängige Designkritik

Datum: 8. September 2026. Agent: /root/design_review. Kein Detector ausgeführt oder gelesen. Keine Website-Dateien verändert. Quellen: PRODUCT.md, DESIGN.md, alle src/features/pages, geteilte Layout-, Produkt-, Anfrage- und Projektkomponenten, deutsches Inhaltsmodell, zweisprachige Projekt- und Ergänzungstexte. Liveprüfung im eigenen frischen Hintergrundtab http://localhost:3100, Standardviewport 1265×712. Desktop-Sichtprüfung: Startseite, Websites, NFC/QR inklusive Modellübernahme, Online-Präsenz, Automation, Arbeiten, Café-Vogel-Detail, Über mich, Kontakt, Hello und Datenschutz. Weitere Projektdetails, Impressum und 404 wurden anhand ihrer vollständigen Inhalte und geteilten Implementierung beurteilt, nicht als individuell visuell geprüft ausgegeben. Smartphone-Prüfung durch Parent; mobile Aussagen hier sind Quellcode-Befunde oder Hypothesen. Keine Live-Demos extern besucht. Keine vollständige assistive-Technologie-Zertifizierung.

## Gestalterisches Urteil vor allen Detector-Ergebnissen

Die Seite wirkt wie ein bewusst gestaltetes, ruhiges Schweizer Entwicklerportfolio. Warmer Papiergrund, fast schwarze Archivo, offene Zeilen, deutlich erkennbare echte Produktbilder und das echte Porträt ergeben eine glaubwürdige Basis. Sie ist erheblich spezifischer als eine austauschbare SaaS-Landingpage mit Pastellkacheln. Die Eigenständigkeit kommt derzeit aber vor allem aus den dargestellten Demo-Websites. Die SILVAN-Komposition selbst bleibt eine sehr bekannte Kombination aus grosser Sans-Serif, Weissraum und Linien. Das ist nicht automatisch falsch: Für lokale KMU ist Ruhe nützlicher als ein Wettbewerb um visuelle Originalität. Das Defizit liegt in der Beweisführung und Entscheidungshilfe, nicht im Mangel an dekorativen Effekten.

Die grosse Chance: Den schönen Auftritt stärker an konkrete Kaufentscheidungen binden. Welche Website passt zu meinem Betrieb? Was ist beim Preis dabei? Was passiert nach meiner Anfrage? Woran erkenne ich, dass die angebotene Automation tatsächlich verstanden wird? Die Seite erklärt viele Abläufe, beantwortet aber diese Fragen häufig erst mit dem Hinweis auf ein späteres Gespräch.

## Die drei wichtigsten Stärken

1. Ehrlich beschriftete, erkundbare Konzeptarbeiten statt erfundener Referenzkunden. Die drei unterschiedlich gefärbten Arbeiten auf der Startseite vermitteln tatsächlich Bandbreite; die Bilddateien zeigen Websites und keine dekorativen Laptop-Mockups. Das stärkt die fachliche Glaubwürdigkeit.
2. Konsequente, ruhige Hierarchie. Besonders die Kontaktseite ist stark: links Absicht, rechts unmittelbar lesbare echte Kontaktziele. Die aktive Navigation ist unterstrichen, Kontaktzeilen sind gross, die Sprache ist fast überall direkt und persönlich.
3. Robuster Anfragegedanke. Das ausgewählte NFC-Modell wird samt Produktart, Form, Grösse und Menge übernommen; der Browser zeigt die Übernahme an und setzt den Fokus ins Formular. Prüfung vor Übergabe, E-Mail- und Kopieralternativen, fokussierte Fehlermeldungen und native FAQ-Disclosures sind gute funktionale Entscheidungen. Diese Qualität sollte erhalten bleiben.

## Prioritäten

### P1 – Tatsachenbehauptungen und interne Widersprüche beschädigen das Vertrauen

Die Business-Website trägt sichtbar „Am häufigsten gewählt“. Das ist eine Popularitätsbehauptung, nicht bloss eine Empfehlung. Die vorhandenen Unterlagen belegen sie nicht; gleichzeitig betont das Portfolio seine fiktiven Konzepte. Daraus folgt nicht, dass die Aussage nachweislich falsch ist, aber ihre Grundlage muss vorhanden sein. Ohne Nachweis durch eine sachliche Eignungsaussage ersetzen, etwa „Für mehrseitige Firmenauftritte“. `src/content/de.ts common.recommended`, `src/components/services/PriceTierList.tsx`.

Die Bestätigungsseite sagt „Sie wird erst nach meiner persönlichen Bestätigung verbindlich“, das Impressum beschreibt die gemeinsame Annahme eines Angebots. Für den Interessenten bleibt unklar, ob Silvan eine unverbindliche Anfrage einseitig verbindlich machen kann. Dieselbe verständliche Ablaufbeschreibung an beiden Orten verwenden: Anfrage → persönliche Offerte → ausdrückliche Annahme. Dies ist eine Kritik an widersprüchlicher UX-Kommunikation, keine Rechtsprüfung. `src/content/de.ts reviews.inquiry.nonBindingNotice`, `src/content/legal-content.ts`.

Auf Über mich suggerieren „sofort da, auch bei langsamer Verbindung“ und „damit eine spätere Änderung nichts Bestehendes still zerstört“ absolute Garantien. HTML-Auslieferung und Tests sind wertvoll, sichern aber weder Null-Ladezeit noch Fehlerfreiheit. Den Nutzen präzise und überprüfbar beschreiben. Die erste Formulierung kollidiert zusätzlich mit den sichtbar verzögerten Reveal-Sequenzen: Der Inhalt ist im Dokument vorhanden, wird visuell aber schrittweise enthüllt.

### P1 – NFC-Auswahl verlangt zu viele Übersetzungen zwischen Katalog, Preisstufe und Anfrage

Sechs Anwendungen, standardmässig neun Google-Produkte, vier Preisangebote und danach ein Formular mit zunächst neun Feldern bilden mehrere mentale Modelle. „Google Reviews · Rund Schwarz“ wird zu „Standard Card“; Kategorien, Plattformen, Form und Personalisierung sind unterschiedlich gruppiert. Die Modellübernahme mildert das Problem merklich, beseitigt es aber nicht. Die Anzahl geöffneter Select-Optionen ist nicht mit gleichzeitig sichtbaren Buttons gleichzusetzen; problematisch ist vor allem das notwendige Verständnis der unabhängigen Dimensionen.

Verbesserung: Anwendung → konkretes Modell → Anzahl/Personalisierung → Kontaktweg als erkennbare Sequenz. Ausgewähltes Modell mit Miniatur und Stückpreis im Formular sichtbar lassen; technisch bereits festgelegte Dimensionen als Zusammenfassung mit „ändern“ darstellen. Bundle-Menge klar als Sets oder Einzelstücke erläutern. Grösseninformation im Katalog und FAQ synchronisieren: Die aktuellen Katalogkarten zeigen vielfach „Grösse nach Absprache“, die allgemeinen Angebote versprechen beide konkreten Grössen. `ProductCatalog.tsx`, `ReviewInquiryConfigurator.tsx`, `photo-products.ts`, `de.ts reviews`.

### P2 – Die Seite verbraucht viel Bildschirmfläche, bevor sie Beweise liefert

Bei 1265×712 zeigt /work im ersten Viewport nur Überschrift, Einleitung und Kontaktknopf, noch kein Projekt. /about zeigt das Porträt erst am unteren Rand. /privacy verbraucht praktisch einen ganzen Bildschirm für die Einleitung. Diese Gleichbehandlung passt nicht zu den unterschiedlichen Aufgaben der Seiten. Auf einer Arbeitsübersicht sollte früh Arbeit sichtbar sein, auf Über mich früh die Person, auf Datenschutz früh die relevante Gliederung. `/websites` hat dagegen Bildbeweis, aber die grosse linke Titel/Bild-Säule schiebt den Preis weit nach unten.

Verbesserung: Seitenköpfe nach Aufgabe dimensionieren; Work und About wesentlich kompakter, juristische Informationsseiten mit Inhaltsübersicht. Die konsequente Typografie behalten. Nicht jede Sektion braucht die Inszenierung einer Titelseite. `pages.module.css .pageHeader/.serviceHeader`, `WorkPage.tsx`, `AboutPage.tsx`, `LegalPage.tsx`.

### P2 – Leistungsseiten bleiben bei allgemeinen Versprechen, obwohl konkrete Belege verfügbar sein sollten

Websites hat einen visuell passenden Beweis, Online-Präsenz und Automation besitzen denselben grossen Zweispaltenkopf ganz ohne Demonstration. Bei Automation führen „Arbeiten ansehen“ ausschliesslich zu Website-Konzepten. Das kann die Breite des Angebots eher infrage stellen als bestätigen. Ein reales, anonymisiertes Ablaufbeispiel oder ehrlich als Beispiel gekennzeichnetes Vorher/Nachher-Schema wäre hilfreicher als mehr Adjektive. Keine erfundenen Einsparungen oder Kunden einsetzen.

### P2 – Kontakt ist leicht erreichbar, aber die Anfrage wird nicht genug vorbereitet

Die vier Kontaktkanäle sind funktional gut. Nach „Website unverbindlich besprechen“ oder „Ablauf unverbindlich prüfen“ landet man jedoch auf demselben allgemeinen Kontakttext ohne mitgenommenes Anliegen. Website-Pakete haben zudem keine direkte paketbezogene Handlung. Ein kurzer Einstieg wie „Schicken Sie mir Ihre bestehende Website, Ihr Ziel und den gewünschten Termin“ senkt die Schreibhürde. Eine ehrlich bestätigte Antwortzeit wäre hilfreich, darf aber nicht erfunden werden. Kanalpriorität E-Mail/WhatsApp klar beibehalten; LinkedIn eher als ergänzende Vertrauensquelle. `ServicePage.tsx`, `ContactActions.tsx`, `ContactPage.tsx`.

## Seite für Seite und Sektion für Sektion

### Startseite /

- **Header:** Wortmarke klein, gut lesbar und glaubwürdig; sieben Navigationspunkte plus zwei Sprachoptionen ergeben jedoch neun Auswahlziele. Die Desktopnavigation wirkt im geprüften Viewport ordentlich, aber die Reihenfolge präsentiert alle Angebote als gleich wichtig. Prüfen, ob vier Leistungen unter „Leistungen“ gebündelt werden können, ohne mobile Erreichbarkeit zu verschlechtern. P2.
- **Hero:** „Mehr Kunden. Weniger Aufwand.“ ist unmittelbar verständlich und besitzt guten Rhythmus; er könnte allerdings auf fast jedem Dienstleistungsanbieter stehen. Der konkretisierende Text nennt KMU, Silvan und Boppelsen und rettet die Einordnung. Falkenried ist ein guter, farbiger Beweis. Die kleine Konzeptzeile schützt vor Verwechslung; die sichtbare Website-im-Website-Darstellung enthält viele winzige nicht bedienbare Inhalte. Sinnvoll als Gesamtbild, ungeeignet zum Lesen der Demo. Der eigentliche Link „Projekt ansehen“ ist deshalb wichtig. P2: Im ersten Text schneller die Hauptleistung priorisieren; die Bildbeschriftung nicht verkleinern.
- **Leistungsübersicht:** Vier klare Einstiege, Nutzen und Startpreis in derselben Zeile. Das ist eine gute Auswahlhilfe. „Was möchten Sie verbessern?“ fragt nach Problemen, die Antworten sind aber Anbieter-Kategorien: Websites, NFC, Präsenz, Automation. Eine zusätzliche Alltagseinordnung könnte die Frage tatsächlich beantworten. P2. Die viewporthohe Services-Sektion führt bei wenig Inhalt zu grosszügigem Leerraum; mobil am realen Gerät bewerten.
- **Ausgewählte Arbeiten:** Café und Handwerk sind ästhetisch deutlich verschieden und belegen Reichweite. Die Wortwahl „Eigene Konzepte“ ist ehrlich. Ein Satz zum konkreten Problem wäre stärker als „bis ins Detail“. Drei Konzepte inklusive Hero sind eine vernünftige Dosis; kein endloses Raster nötig. P3.
- **NFC-Band:** Der dunkle Wechsel setzt einen sinnvollen visuellen Höhepunkt und Produktfotografie erklärt das physische Angebot. Die Überschrift ist etwas abstrakt; „Karten und Aufsteller für Bewertungen, Menüs und Buchungen“ wäre schneller erfassbar, ohne die ganze Gestaltung umzubauen. P2. Die mobile Bild-vor-Text-Reihenfolge ist im Quellcode bewusst gesetzt und sinnvoll.
- **Kundenstimmen:** Es wird kein leerer Platzhalter und keine erfundene Stimme ausgegeben. Das ist richtig; nicht künstlich mit Lob auffüllen. Sobald echte, freigegebene Kundenstimmen vorliegen, nach nachweisbarer Relevanz integrieren.
- **Studio/Porträt:** Der echte Mensch und lokaler Standort sind die spezifischsten Vertrauenssignale. Der Absatz wiederholt sich sinngemäss mehrfach im Gesamtauftritt. Statt mehr Wiederholung ein konkretes Detail zur Zusammenarbeit anbieten. P3.
- **Kontaktabschluss:** Gute direkte Wege. Gleich danach wiederholt der Footer die Kanäle; funktional erlaubt, aber die Seite endet dadurch länger und administrativer als nötig. P3.

### Websites /websites

- **Einstieg:** Klarer Nutzen, konkreter Screenshot, direkte CTA. Das Bild wird im Desktop links unter die sehr grosse Headline gesetzt; die rechte Erklärung ist vertikal mittig und erscheint als zweite grosse Textmasse. Es wirkt ruhig, aber nicht besonders effizient. Eher Headline und Einleitung enger verbinden und erste Preisorientierung früher zeigen. P2.
- **Pakete:** Vier Angebote sind gerade noch gut vergleichbar. Die Zweiergruppierung funktioniert besser als vier schmale Spalten. Breite Preisspannen und abstrakte Features unterscheiden die Pakete jedoch unzureichend: „individuelles Layout“ versus „hochwertige Interaktionen“ erklärt einem KMU kaum den Mehrwert. Die definitive schriftliche Offerte ist gut, ersetzt aber keine verständliche Ausgangsorientierung. Keine neuen Leistungen oder fixe Seitenzahlen erfinden; tatsächlich geltende Grenzen nennen. P2. Popularitätslabel P1 wie oben.
- **Umfang/laufende Kosten:** Sehr wichtig und explizit; Domain/Hosting werden nicht versteckt. Der lange zweite Absatz bündelt sieben Entscheidungsthemen. Als drei kurze Gruppen „einmaliger Umfang / Ihre Inhalte / nach dem Start“ leichter scannbar machen. P2.
- **Nutzenliste:** Struktur und Mobiloptimierung nachvollziehbar; „wartbarer Code“ ist mehr Anbieterargument. Mit späteren Änderungen und laufender Betreuung verbinden. P3.
- **Ablauf:** Vier Schritte sind gut merkbar; Rollen und Abnahmepunkte sind verständlich. Der Prozess sagt wenig zu Input, Zeit oder Revisionen; nur verifizierte typische Erwartungen ergänzen. P2.
- **FAQ:** Native Details sind gut. Fragen wiederholen oft direkt zuvor präsentierte Inhalte. Preis und Leistungsumfang sind legitim; Platz für wirklich offene Einwände wie Pflege, Inhaltsänderung oder Betreuung schaffen. P2.
- **Abschluss:** Unverbindliche Kontaktwege gut, aber gewähltes Paket wird nicht übernommen. Paketbezogene CTA neben dem Angebot oder kontextbezogener Nachrichteneinstieg wäre hilfreicher. P2.

### NFC & QR /reviews

- **Hero:** Nutzen und Bedienidee klar. Die Fotografien belegen echte Gegenstände; im Desktop ist das Bild relativ klein gegenüber sehr grosser Copy. Es demonstriert eher ein Sortiment als eine konkrete Anwendung am Empfang. Ein echtes Anwendungsfoto wäre aus Produktverständnis wertvoll, aber nicht nötig, um die vorhandene Seite nutzbar zu machen. P2. Auto-Wechsel besitzt Pause – gut. Der laufende Wechsel trägt weniger zum Kaufverständnis bei als eine bewusst gewählte klare Hauptaufnahme. P3.
- **Kategorien:** Aktiver Filter und Produktanzahl sichtbar, Filter ohne Navigation zur Fremdseite. Sechs Kategorien sind ein Grenzfall; Plattformen und Zwecke sind vermischt. „Social Media“, „WhatsApp“ und „Individuell“ sind nicht logisch parallel. Nach Kundenziel gruppieren oder erklären. P2.
- **Produktkarten:** Grössere Fotos, Preis, Form und direkte Anfrage sind richtig. Neun ähnliche Google-Varianten erzeugen wiederholtes Lesen. Weniger identische Beschreibungen, stärkere Unterschiede nach Farbe/Form/Personalisierung. P2. 3D bleibt optional, was gut ist; nicht zum notwendigen Einkaufsschritt machen.
- **Preisblock:** Transparente CHF-Preise und Versandhinweis. Paarangebot ist ein Mengenpaket, die anderen Einträge sind Designstufen; Titel „Designstufen“ beschreibt diese Mischung nicht exakt. Die englischen Produktbegriffe auf deutscher Seite kosten zusätzliche Denkarbeit. P2.
- **Bedingungs-FAQ:** Nutzung, Links, Lieferung und Änderung werden ehrlich begrenzt. Teilweise dieselben Themen wie in späterer FAQ. Zusammenführen oder Unterschiede klar benennen. Bedingungen nicht noch weiter in versteckten Flächen verteilen. P2.
- **Drei Schritte:** Tap/Open/Act beschreibt die Nutzung durch Endkunden, nicht die Bestellung durch den Unternehmer. Nach Katalog und Preis kann die Überschrift „Drei einfache Schritte“ als Bestellablauf missverstanden werden. „So nutzen Ihre Kunden die Karte“ präzisiert die Aufgabe. P2.
- **Anwendungsfälle:** Disclosure reduziert sichtbare Dichte. Fünf Einsatzfälle sind als Beispiele gut; WLAN und Visitenkarte brauchen technisch teilweise andere Zielkonzepte als eine gewöhnliche HTTPS-Seite. Nur als konkretes vereinbartes Angebot formulieren. P2.
- **Anfrage:** Vorbelegung live bestätigt. Fokus sichtbar, klare Labels, grosse Controls. Formular wirkt allerdings wie eine interne Produktspezifikation und enthält neun sichtbare Felder; Produktdaten und optionale Personendaten sollten visuell getrennt werden. Modellfoto und sofort verständlicher Mengenpreis fehlen. Entwurfsverlust bei Neuladen ist bewusst erklärt, bleibt aber für unterbrochene Smartphone-Nutzung teuer. Nicht einfach Speicherung einführen, ohne den gewählten Datenschutzansatz zu beachten; zuerst Anzahl nötiger Eingaben reduzieren. P1/P2.
- **Prüfung/Übergabe:** Sichtbare Zusammenfassung und bearbeitbare Rückkehr gut; WhatsApp ist der primäre Kanal, E-Mail und Kopieren geben Freiheit. Die Seite muss deutlich zwischen „Nachricht vorbereitet“ und „Nachricht tatsächlich gesendet“ unterscheiden, was die vorhandenen Begleittexte weitgehend tun. Verbindlichkeitsformulierung P1.
- **FAQ/Abschluss:** Ehrliche Aussage, keine Bewertungen kaufen zu können, verdient Erhalt. „ohne App“ und „jedes Smartphone“ dürfen nicht stärker formuliert werden als die spezifischen Bedingungen. Normale direkte Kontaktwege sind ein guter Ausweg für Nutzer, die nicht konfigurieren möchten.

### Online-Präsenz /presence

- **Hero:** „Damit Ihr Unternehmen dort stimmt“ wirkt sprachlich ungewohnt; das anschliessende Google-Unternehmensprofil erklärt es erst. Ein direkter Bezug auf Google/Maps wäre hilfreicher. Bildloser Kopf wirkt im Vergleich zur Website-Leistung austauschbar. P2.
- **Angebot:** Ein Paket reduziert Entscheidungsdruck; Startpreis gut. „Google Business Profile Basis“ mischt unnötig Englisch und Deutsch. Abgrenzung von einmaliger Einrichtung und laufender Pflege präzisieren. P2.
- **Nutzen:** Öffnungszeiten, Daten und Kontaktwege sind reale KMU-Probleme. Drei sehr ähnliche Aussagen könnten durch ein konkretes Beispiel eines inkonsistenten Eintrags ersetzt werden. P2.
- **Kontrolle/Kosten:** Stärkster Abschnitt der Seite. Kostenloses Google-Produkt versus bezahlte Dienstleistung und Eigentümerschaft werden klar getrennt. Der Abschnitt wirkt als eigens eingeschobener Textblock; könnte näher ans Angebot, damit die Information am Entscheidungspunkt steht. P2.
- **Prozess:** Vier verständliche Schritte, aber ohne konkretes Enddokument oder Bildbeispiel. Die Übergabe als greifbare Checkliste zeigen, sofern das tatsächlich geliefert wird. P2.
- **FAQ:** Keine Rankinggarantie und Erklärung des Profils sind ehrlich. „meistens ja“ auf die Frage nach Optimierungsnutzen ist wenig diagnostisch; konkrete häufige Lücken nennen. P3.
- **Kontakt:** Ein Link zur Prüfung des bestehenden Profils könnte als Kontext vorbefüllt werden; generisches Kontaktziel verliert den Anlass. P2.

### Automation /automation

- **Hero:** Verständlicher als viele Automationsanbieter, vermeidet grosse KI-Versprechen. Allerdings nur abstrakte Arbeit und Workflows. Ein fassbarer Beispielablauf fehlt vollständig. P2.
- **Angebot und geeignete Aufgaben:** „Auf Anfrage“ ist ehrlich. Das erste sichtbare Element unter „Geeignete Aufgaben“ ist aber ein generisches Preisangebot, nicht eine Aufgabe; erst danach folgen Beispiele. Die Überschrift passt nicht zur ersten Information. P2.
- **Prozess:** Prüfung von Nutzen und Risiken ist gut. Ein exemplarischer Fehlerfall, menschliche Kontrolle und späterer Verantwortlicher würden mehr Vertrauen schaffen als das wiederholte „gezielt/verständlich“. Nur anhand realer Arbeitsweise ergänzen. P2.
- **FAQ:** Die ehrliche Möglichkeit, von Automation abzuraten, ist stark. „Alles, was regelmässig nach denselben Regeln abläuft“ klingt dagegen zu umfassend; technische Zugänge, Datenqualität und Ausnahmen bestimmen die Machbarkeit. Differenzierter formulieren. P2.
- **Beweis/Abschluss:** Website-Arbeiten sind kein Beweis für gelieferte Automationen. Entweder einen als Beispiel bezeichneten Ablauf zeigen oder den Link spezifisch „Website-Arbeiten“ nennen. P2.

### Arbeiten /work und vier Projektdetails

- **Indexkopf:** Offenheit über fiktive Unternehmen sehr gut. Zu viel Einleitungsraum, kein Projekt im ersten Desktopviewport. P2.
- **Raster:** Vier Arbeiten sind gut überschaubar, Kategorien und Konzeptstatus sichtbar. Keine unnötigen Filter – genau richtig bei dieser Menge. Visuelle Unterschiede Kaffee/Handwerk/Gruppe/Salon liefern echten Nutzen.
- **Detailstruktur gemeinsam:** Titel → Demoaktion → Screenshot → Fakten → Aufgabe/Ansatz/Ergebnis → Projektanfrage → nächstes Projekt ist grundsätzlich schlüssig. Drei kurze Ein-Satz-Absätze reichen als Beschreibung, nicht als starke Fallstudie. „Beabsichtigtes Ergebnis“ enthält viermal wortgleich hauptsächlich den Demo-Hinweis. Das schützt ehrlich vor Ergebnisbehauptungen, zeigt aber kaum projektbezogene Problemlösung. P2: Pro Konzept zwei konkrete Designentscheidungen anhand von Ausschnitten erläutern, z.B. mobilen Kontaktweg oder Angebotsstruktur. Keine erfundenen Geschäftsergebnisse.
- **Falkenried:** Drei Geschäftsbereiche sind ein glaubwürdiges strukturelles Problem; zeigen, wie ein Gartenbaukunde direkt im passenden Bereich landet. Aktuell prägt das grüne Bild eher Atmosphäre als die Komplexität der Informationsarchitektur. P2.
- **Café Vogel:** Warme Patisserie-Bildwelt, elegante Typografie und reale Angebotsaufgabe passen zusammen. Die Vorschau führt „Konditorei Vogel“, die Karte „Café Vogel“ – als Variation verständlich, aber offizielle Namensführung vereinheitlichen. Praktische Informationen wie Speisekarte/Öffnung stärker als Designentscheidung ausweisen. P3/P2.
- **Steiner Handwerk:** Dunkle Typografie und Orange sind ein sinnvoller Kontrast zu den anderen Demos. Die Vorschau nennt sichtbar „Steiner Bau“, Portfolioüberschrift „Steiner Handwerk“, Impressum ebenfalls „Steiner Bau“. Das ist ein konkreter redaktioneller Bruch. Eine konsistente Bezeichnung über Screenshot, Demo und Portfolio wählen. P2.
- **Salon Lumière:** Heller, eleganter Ansatz passt zum Angebot und erweitert das Spektrum. Die Erklärung könnte den Weg von Inspiration über Preise zur Terminanfrage genauer zeigen. Inhaltlich derzeit ebenso dünn wie die anderen Details. P2.
- **Ende/Navigation:** Kontakt-CTA nach den Projektinformationen ist richtig. Nur „Nächstes Projekt“ schafft einen Rundlauf; ein klarer Rückweg „Alle Arbeiten“ neben diesem Element würde die Orientierung verbessern. P3.

### Über mich /about

- **Intro:** Unabhängiger Entwickler und Ortsbezug glaubwürdig. Die Überschrift behauptet allgemein sorgfältige Zusammenarbeit; das eigentlich individuelle Porträt wird visuell nach unten gedrückt. Person früher zeigen. P2.
- **Porträt/Text:** Echtes Bild und direkte Zusammenarbeit sind relevant. Zwei Absätze wiederholen stark die Startseite. Ein wahres Detail zu Erfahrung, Motivation oder Arbeitsalltag wäre spezifischer; keine Vita erfinden. P2.
- **Standards:** „Was ich voraussetze“ klingt nach Anforderungen an den Kunden, obwohl eigene Qualitätsansprüche folgen. „Worauf Sie sich verlassen können“ oder „Meine Qualitätsstandards“ wäre klarer. HTML, Code und automatische Tests in Kundennutzen übersetzen. Absolute Zusagen wie oben P1/P2.
- **Arbeitsweise:** Klar/Direkt/Praktisch sind verständlich, aber sehr allgemeine Eigenschaften. Jede mit einem beobachtbaren Verhalten konkretisieren. P3.
- **Kontakt:** Gut erreichbar; Text könnte hier persönlichere Einladung statt dieselbe wiederholte Kontaktüberschrift sein. P3.

### Kontakt /contact

- **Intro + Ziele:** Einer der stärksten Desktopbereiche. Keine überflüssige Form, keine Pflichtangaben, echte grosse Kontaktwerte. WhatsApp und E-Mail gut erkennbar.
- **Lücke:** Kein Hinweis, was eine erste Nachricht enthalten soll, keine bestätigte Erreichbarkeits-/Antworterwartung, alle Service-CTAs landen kontextlos hier. P2.
- **Adresse:** Vertrauenssignal konsistent und unaufdringlich; keine unnötige schwere Karte. Gut.
- **Footer-Doppelung:** Auf dieser ohnehin kontaktbezogenen Seite dieselben vier Wege erneut auszubreiten ist redundant, aber kein gravierender Fehler. P3.

### Hello /hello

- **Begrüssung:** Direkt und geeignet als NFC-Einstieg, aber sehr grosser normaler Seitenkopf statt kompakter persönlicher Kontaktkarte. Sechs Leistungs-/Seitenlinks stehen vor den direkten Kontaktwegen in mobiler DOM-Reihenfolge. Wer eine Karte antippt, möchte eher Kontakt speichern oder sofort schreiben. P2.
- **Linkliste:** Grosszügige berührbare Zeilen sind gut. Automation wird in der Einleitung beworben, fehlt aber als Link in der Liste. P2.
- **Identität:** Kein Porträt und kein „Kontakt speichern“-Angebot. Beides wäre in diesem Kontext besonders nützlich; vCard nur mit den bereits freigegebenen Daten erzeugen. P2.
- **Abschluss:** Standardheader, sechs Links, vier Kontaktwege und kompletter Footer machen die Kurzseite länger als ihr Zweck verlangt. Eine kompakte Route mit drei priorisierten Handlungen würde den NFC-Gedanken besser erfüllen. P2.

### Impressum /imprint und Datenschutz /privacy

- **Gemeinsames Layout:** Schmale Lesespalte und sachliche Abschnitte sind richtig. Der grosse Marketingkopf verbraucht zu viel Raum; Stand und Inhaltsübersicht sollten früh erreichbar sein. P2.
- **Impressum:** Anbieter, Preise, Anfrageablauf, Konzepte, Marken und Rechte sind gut getrennt. „Steiner Bau“ widerspricht dem Portfolio-Namen. Einladungs-/Verbindlichkeitstexte mit Anfrageübersicht abstimmen. Keine Aussage über Rechtskonformität aus diesem Designreview ableiten.
- **Datenschutz:** Viele konkrete Datenwege werden erklärt; das ist wertvoll. Zwölf lange Abschnitte ohne Inhaltsverzeichnis erschweren gezielte Suche nach WhatsApp oder 3D. Eine kurze Gliederung mit Ankern wäre klarer. Technical Begriffe wie localStorage, sessionStorage und LCP/INP/CLS erscheinen ohne Kundennutzen; technisch genaue Details können in einer sekundären Erklärung stehen. P2. Nicht aus vorhandenen Spline-Altdateien auf tatsächliche externe Datenflüsse schliessen: aktuelles Produkt-Merging kann lokale Modelle einsetzen.

### 404

Quellcode: verständliche Fehlerursache und Link zurück zur Startseite. Für eine kleine Seite ausreichend, kein Pflicht-Suchfeld nötig. Optional zusätzlich „Kontakt“ und „Arbeiten“ anbieten, wenn externe Portfolioverweise häufig sind. P3. Keine individuelle visuelle Browserprüfung dieses Zustands durch Assessment A.

### Englisch und gemeinsame Komponenten

Sprachwechsel hält den jeweiligen Seitenpfad bei; Projekttexte und ergänzende Bedingungen sind vollständig zweisprachig modelliert. In deutschen Texten stören unnötige englische Kategorien mehr als im englischen Auftritt. Keine Aussage, dass jede englische Seite pixelweise geprüft wurde. Die lokale Ortsangabe und echten Kontaktdaten bleiben als Identität erhalten.

FAQ-Disclosures reduzieren Dichte und nutzen Browserkonventionen. Menu besitzt Escape, Fokusfalle und Rückkehrfokus; 3D besitzt Schliessen, Ladezustand, Fehler und Wiederholen im Code. Diese sind Stärken, aber kein Ersatz für echte Screenreaderprüfung. Die direkt beobachteten Reveal-Fragmente verschwanden nach dem Einschwingen: kein permanentes Abschneiden behaupten. Kritikwürdig ist allenfalls unnötiges Warten auf inhaltliche Überschriften, besonders bei wiederholten Besuchen.

## Kognitive Last

- Gut: Startseite vier Leistungseinstiege; Website vier Pakete; Prozesse drei oder vier Schritte; FAQ als progressive Offenlegung; Auswahl wird in Anfrage übertragen.
- Zu viele gleichrangige Einstiege: sieben Hauptmenüpunkte plus zwei Sprachen; sechs NFC-Kategorien; Hello sechs Links vor vier Kontaktwegen. Nicht jede Zahl ist automatisch ein Usabilityfehler, aber es fehlt Priorisierung nach Nutzeraufgabe.
- Erinnerungslast: Preisstufe, Modell, Form und Grösse werden in mehreren Bereichen unterschiedlich benannt. Website-Paket muss beim späteren Kontakt erneut formuliert werden.
- Sprachlast: Business Profile, Standard Card, Personalized, Fully Customized, CI, responsive, Workflows und Code-Merkmale verlangen Übersetzung.
- Wiederholungslast: Standard-Serviceprozess, FAQ und Kontakttexte liefern auf mehreren Seiten dieselben Aussagen; vier Projektergebnisse sind identisch. Kürzen zugunsten konkreter Unterschiede.
- Unterbrechung: Anfragezustand geht beim Neuladen verloren; sehr relevant für Smartphone-Persona. Das ist transparent, aber belastet trotzdem.

## Emotionale Reise und Personas

**Reise:** Ruhiger erster Eindruck → Interesse durch farbige Konzepte → breite Leistungswahl → Unsicherheit bei Paketumfang oder Automationsbeweis → bei NFC steigende Konfigurationslast → Entlastung durch unverbindliche Prüfung und direkte Kontaktwege. Visueller Höhepunkt ist die Arbeit, emotionaler Vertrauenspunkt die echte Person. Beide sollten auf den jeweiligen Seiten früher erscheinen. Das Ende ist erreichbar und sachlich, aber repetitiver Footer und fehlende nächste Erwartung schwächen die Erinnerung an eine persönliche Zusammenarbeit.

**Jordan, erstmaliger KMU-Besucher:** Versteht „Website ab CHF 300“, kann aber kaum zwischen Business und umfangreich unterscheiden. NFC-Namen und Grössenwechsel sind zusätzliche Hürden. Gewünschter Weg: eigenes Problem erkennen → passende Beispiele → transparentes Angebot → kleine erste Nachricht.

**Casey, abgelenkter Smartphone-Nutzer:** Native Selects, grosse Ziele und WhatsApp helfen. Lange Vorläufe, neun Formularfelder und Entwurfsverlust erschweren Unterbrechungen. Die Hello-Seite priorisiert allgemeine Navigation vor direktem Kontakt und passt deshalb nur teilweise zum Tap-Kontext.

**Riley, skeptischer Prüfer:** Schätzt Konzeptlabels, keine Rankinggarantie und nachvollziehbare Bedingungen. Bleibt an Popularitätslabel, absoluter Test-/Ladezeitzusage, Namenswechseln und Verbindlichkeitstext hängen. Diese kleinen Widersprüche betreffen genau die behauptete Sorgfalt.

## Nielsen-Bewertung (höher ist besser)

Bewertet wird das Gesamtsystem inklusive Konfigurator. Deshalb sind 5 und 9 anwendbar; 7 ist für das überwiegende Portfolio-/Anfrageprodukt ohne wiederkehrende Expertenaufgabe n/a.

| # | Heuristik | Score | Begründung |
|---|---|---:|---|
| 1 | Systemstatus sichtbar | 3/4 | Aktive Navigation, Filterzahl, Modellübernahme und Zustände vorhanden; externe Nachrichtenzustände naturgemäss begrenzt. |
| 2 | Sprache der Nutzer | 2/4 | Meist klar, aber englische Produkttaxonomie und abstrakte technische Leistungsbegriffe. |
| 3 | Kontrolle/Freiheit | 3/4 | Bearbeiten, Alternative zu WhatsApp, Menü/3D schliessbar; Anfrageverlust bei Neuladen. |
| 4 | Konsistenz/Standards | 2/4 | Visuell konsistent, inhaltliche Namens-/Verbindlichkeits-/Taxonomiebrüche. |
| 5 | Fehlervermeidung | 3/4 | Vorbelegung und Prüfung vor Übergabe; uneindeutige Produktdimensionen bleiben. |
| 6 | Wiedererkennen statt Erinnern | 2/4 | Modell übernommen, aber Pakete ohne Kontextübergabe und mehrere Benennungsebenen. |
| 7 | Flexibilität/Effizienz | n/a | Kein wiederkehrender Expertenworkflow; keine künstliche Shortcutpflicht für ein Portfolio. |
| 8 | Ästhetik/Minimalismus | 3/4 | Ruhig und kohärent; zu grosse Einleitungen, Wiederholungen, schwache inhaltliche Spezifität einzelner Seiten. |
| 9 | Fehler erkennen/beheben | 3/4 | Konkrete Formfehler, Fokus, Kopierfallback und 3D-Retry im Code; End-to-End-Fehlerpfade nicht sämtlich live getestet. |
| 10 | Hilfe/Dokumentation | 2/4 | FAQ und Bedingungen vorhanden, aber teils doppelt und fern vom konkreten Entscheidungspunkt. |
| | Gesamt | **23/36 = 63,9 %** | **Akzeptabel: substanzielle Verbesserungen der Entscheidungshilfe nötig, kein kompletter gestalterischer Neubau.** |

## Sinnvolle nächste Schritte

1. P1-Vertrauenstexte harmonisieren und Tatsachenbasis für Popularitätslabel prüfen. Keine neue Gestaltung nötig.
2. NFC-Modell/Preis/Grösse/Personalisierung zu einer konsistenten Auswahlführung verbinden; bestehende robuste Übergabe beibehalten.
3. Work-, About-, Hello- und Legal-Köpfe auf den jeweiligen Zweck kürzen. Im ersten Bildschirm konkrete Arbeit, Person oder Aufgabe zeigen.
4. Website-Pakete mit tatsächlicher Abgrenzung versehen; pro Service den Kontaktanlass übernehmen.
5. Für Online-Präsenz und Automation je einen ehrlichen, konkreten Beleg schaffen; Projektdetails um wirklich sichtbare Designentscheidungen ergänzen.
6. Danach mobile Aufgabe-Tests mit drei Personen: Websitebudget einordnen, bestimmtes NFC-Modell anfragen, nach Tap Kontakt aufnehmen. Erfolg und Verständnis beobachten, nicht nur Screenshots bewerten.

Mögliche Impeccable-Arbeitsschritte: clarify für Widersprüche und Begriffe; distill für wiederholte Inhalte und übergrosse Vorläufe; adapt für die priorisierten mobilen Wege; harden für Unterbrechung und Fehlerzustände. Keine Anweisung, jetzt Code zu verändern.

## Fragen für die Synthese

Welche einzige Leistung soll ein neuer Besucher zuerst mit SILVAN verbinden? Welche konkrete Paketabgrenzung gilt heute tatsächlich? Gibt es einen überprüfbaren Automations- oder Google-Profil-Beleg, den wir zeigen dürfen? Soll Hello vor allem Kontakt speichern oder das Gesamtangebot präsentieren? Diese Fragen sind Vorschläge an den Parent, keine zusätzliche Genehmigungsschranke dieses abgeschlossenen Reviews.
