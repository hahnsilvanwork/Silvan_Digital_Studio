# Rechtliche Vorprüfung – SILVAN Digital Studio

Stand und Quellenabruf: 7. September 2026. Gegenstand: Schweizer Webstudio von Silvan Hahn, Boppelsen ZH; Website, vier Konzeptdemos, Webentwicklung, Google-Präsenz, Automationen und NFC/QR-Waren. Interne Arbeitsunterlage, keine öffentlichen AGB. Dies ist eine quellengestützte rechtliche Vorprüfung und keine verbindliche Stellungnahme einer Anwaltskanzlei.

## 1. Ergebnis und Beweisgrenzen

Das Geschäftsmodell ist grundsätzlich umsetzbar. Der Quellcode belegt jedoch weder den sozialversicherungs- und steuerrechtlichen Status noch die Berechtigung zur kommerziellen Hosting-Nutzung oder die Produktsicherheit. Eine pauschale Erklärung «vollständig rechtskonform» wäre deshalb nicht belastbar.

**Belegt aus der Ausgangsfassung:** Anbietername und Postanschrift stehen im Impressum; NFC-Anfragen sind ausdrücklich unverbindlich; der Browser bereitet Nachrichten lokal vor; Websitepreise beginnen bei CHF 300, NFC bei CHF 49 und Google-Präsenz bei CHF 249; Domain/Hosting werden separat erwähnt; Kundenstimmen sind leer; Arbeiten werden als Konzepte bezeichnet. Die technische Vorprüfung beschreibt Vercel-Hosting, optionale inaktive Messung, Spline auf Klick und ein bei JavaScript-Ausfall undichtes Demoformular. Quelle: `src/content/de.ts` sowie `artifacts/SECURITY-RECHT-CHECK-2026-09-07.md`. Dieser Bericht beschreibt diese Ausgangslage; spätere Codekorrekturen sind mit dem technischen Abschlussbericht abzugleichen.

**Zusätzlich bestätigt:** Die technische Hauptprüfung hat am 7. September 2026 mittels authentifizierter Vercel-API für `silvan1` den aktiven Tarif `hobby` und für das Hauptprojekt die Region `iad1` festgestellt. Der kommerzielle Tarifkonflikt ist damit konkret belegt; die Region beweist keine ausschliessliche Datenlokation. Nachweisdetails und Handlung: `NACHWEISE-UND-OFFENE-PUNKTE.md`.

**Nicht belegt:** tatsächliche Rechtsform-/Registerdaten; AHV-Anerkennung; MWST-Registrierung oder Befreiung; Umsatzentwicklung; ausschliesslich B2B/CH; auf das Hobby-Konto anwendbarer Auftragsbearbeitungsvertrag; Google-Kontotyp; vollständige Dienstleisterstaaten; Spline-Transfergrundlage; Produktlieferkette, Prüfberichte, Lizenzketten und konkrete Kundenverträge.

**Priorität:** (1) widersprechende Datenflussangaben und nachgewiesene Demoübertragung korrigieren; (2) Unternehmens-/Providerstatus nachweisen; (3) NFC-Vertrieb anhand echter Lieferantenunterlagen freigeben; (4) jedes Projekt über eine ausgefüllte Offerte und passenden Datenschutzanhang abwickeln. Ein fehlender Nachweis wird als offen behandelt, nicht als erwiesener Gesetzesverstoss.

## 2. Anwendbarkeitsmatrix

| Bereich | Einordnung | Anwendung im konkreten Betrieb | Benötigte Feststellung |
|---|---|---|---|
| DSG/Datensicherheit | MUSS | Besucher-IP, E-Mail-Anfragen und natürliche Kontaktpersonen sind Personendaten; fehlende Datenbank befreit nicht | Dienstleister, Zwecke, Empfänger, Länder, Löschung |
| Identität/UWG | MUSS bei einschlägigem elektronischem Angebot; jedenfalls Transparenzstandard | Echter Betreiber, zustellbare Anschrift, E-Mail, keine erfundenen Referenzen | Name/Adresse aktuell, allfälliger HR-Name |
| Vertragsrecht OR | MUSS | Angebote und Annahmen auch per E-Mail/Chat möglich | Bindungsablauf, genauer Leistungsumfang |
| AHV/Steuer | MUSS nach tatsächlicher Tätigkeit | Nebenerwerb und geringer Umsatz sind keine allgemeine Ausnahme | Kassenentscheid, Einnahmen/Spesen, Steuererklärung |
| Handelsregister | BEDINGT | Umsatz und Voraussetzungen nach OR 931 prüfen | Vorjahresumsatz über alle eigenen Einzelunternehmen, Tätigkeit |
| MWST | BEDINGT | Massgeblicher weltweiter Umsatz, Beginn und freiwillige Registrierung | ESTV-Abklärung, Rechnungsgestaltung |
| PBV | BEDINGT; UWG-Irreführung unabhängig relevant | Konsumentenwarenangebote und Preiswerbung; reine B2B-Offerten anders | Werden Privatkunden angenommen? Versand-/Zuschlagsmodell |
| Auftragsbearbeitung | BEDINGT | Bei Hosting/Wartung/Automation mit Kundendaten; nicht automatisch beim rein lokalen Design | Kundenrollen und Datenzugriff |
| Produktsicherheit/Produktehaftung | MUSS für einschlägige Waren | Physische NFC-Produkte, Weiterverkauf, Eigenmarke, Import | Hersteller, Chip, Materialien, Produktunterlagen |
| Funkanlagenrecht | BEDINGT produktbezogen | NFC-Etikett ist ohne technische Einordnung weder pauschal frei noch pauschal CE-pflichtig | Datenblatt, Endprodukt, BAKOM-/Fachabklärung |
| DSGVO | BEDINGT | EU-Niederlassung, gezieltes Angebot an Personen in der EU oder relevante Verhaltensbeobachtung | Tatsächlicher Markt und Tracking |
| EU-Verbraucherrecht/GPSR | BEDINGT | EU-Absatz und Produkt-/Käufereigenschaften; E-Mail-Verkauf kann Fernabsatz sein | Zielland, Käuferzweck, Produktrolle |
| Barrierefreiheit | BEDINGTE gesetzliche Pflichten; EMPFOHLENE Qualität | Keine automatische EAA-Pflicht jeder Schweizer Portfolioseite | EU-E-Commerce, Unternehmensgrösse, öffentlicher Auftrag |
| Urheber-/Markenrechte | MUSS | Code, Bilder, Modelle, Fonts, Logos, Konzeptnamen | Nutzungsrecht pro Asset und Verwendung |
| AGB als eigenes Dokument | EMPFOHLEN, keine allgemeine Pflicht | Ein klarer Einzelvertrag kann genügen | Keine ungenehmigten Muster als verbindlich veröffentlichen |

Die folgenden Abschnitte enthalten Quellen und die Umsetzung dieser Einordnung; «MUSS» bedeutet nicht, dass jeder Einzelfall bereits nachgewiesen ist.

## 3. Unternehmerstatus, Register, Abgaben und Rechnungen

### 3.1 Identität und Einzelunternehmen

Ein Einzelunternehmen entsteht durch die tatsächliche selbstständige Erwerbstätigkeit, nicht erst durch einen Websitehinweis. Der Inhaber haftet grundsätzlich persönlich. Bei einer eingetragenen Firma ist der Familienname erforderlich; SILVAN kann als Geschäftsbezeichnung verwendet werden, muss aber die Identifizierung von Silvan Hahn als Vertragspartner ermöglichen. HR- und MWST-Status sind getrennte Fragen. Die Schwelle nach OR 931 beträgt grundsätzlich **mindestens CHF 100'000** Umsatzerlös im letzten Geschäftsjahr; Ausnahmen, etwa für freie Berufe ohne kaufmännisches Gewerbe, sind anhand der Tätigkeit zu prüfen. Nicht ungeprüft aus einer vereinfachenden Portalseite «erst über 100'000» ableiten. [SECO: Einzelunternehmen](https://www.kmu.admin.ch/de/rechtsform-einzelunternehmen), [amtlicher Gründungsleitfaden, Rechtsformen/OR 931](https://www.kmu.admin.ch/dam/kmu/en/dokumente/Publications/gruenden-2022-alle-partner.pdf.download.pdf/Gr%C3%BCnden%202022%20alle%20Partner.pdf).

**Projektmassnahme:** Die Aussagen «kein Handelsregistereintrag» und «keine MWST-Pflicht» nur mit aktuellem Nachweis verwenden. Ihre Entfernung beseitigt eine unbestätigte Behauptung, ersetzt aber weder eine erforderliche Anmeldung noch korrekte Rechnungen. Keine CHE-Nummer erfinden. In Offerten, Rechnungen und Datenschutzhinweisen denselben rechtlichen Betreiber nennen.

### 3.2 AHV und Einkommensteuer

Die Ausgleichskasse beurteilt die Selbstständigkeit anhand der tatsächlichen Verhältnisse: Auftreten im eigenen Namen, eigenes wirtschaftliches Risiko, organisatorische Unabhängigkeit und Kundenstruktur. Eine Vertragsüberschrift «Freelancer» entscheidet dies nicht. Für selbstständige Einkommen gilt eine Beitragspflicht nach den einschlägigen Regeln; das Merkblatt 2.02 liegt in einer Fassung vom 1. Januar 2026 vor. [AHV/IV: Merkblatt 2.02](https://www.ahv-iv.ch/p/2.02.d).

**Projektmassnahme:** Silvan sammelt erste Offerten, Rechnungen, Zahlungsbelege, Betriebsausgaben und Akquisitionsbelege und klärt die Einstufung mit der zuständigen Ausgleichskasse. Bei nur einem stark weisungsgebenden Auftraggeber gesondert prüfen. Auch Nebenerwerb korrekt deklarieren. Keine Beitragsfreiheit aus Websiteumsatz unter CHF 100'000 folgern. Erwerbsgewinn und Geschäftsvermögen gehören in die persönliche steuerliche Erfassung. Geschäfts- und Privatbelege trennen; private Entnahmen sind nicht einfach Betriebskosten. [SECO: Selbstständigkeit](https://www.kmu.admin.ch/de/selbststaendigkeit-ein-leitfaden).

### 3.3 MWST und ausländische Dienstleistungen

Die allgemeine MWST-Schwelle knüpft grundsätzlich an mindestens CHF 100'000 massgeblichen weltweiten Umsatz aus nicht von der Steuer ausgenommenen Leistungen an. Eine freiwillige Unterstellung kann auch darunter bestehen. Tätigkeitsbeginn und absehbare Umsätze können die Beurteilung beeinflussen; nicht erst am Jahresende reagieren. [ESTV: Steuerpflicht](https://www.estv.admin.ch/de/mwst-steuerpflicht-auslaendische-unternehmen).

**Separates Risiko:** Bei einschlägigen Dienstleistungen aus dem Ausland kann für nicht registrierte Empfänger Bezugsteuer entstehen, wenn sie im Kalenderjahr insgesamt mehr als CHF 10'000 solcher Leistungen beziehen. Nicht jede ausländische SaaS-Rechnung fällt automatisch darunter; Art, Lieferant und Leistungsort prüfen. Vercel, Design-/KI-Abos und andere ausländische Services daher in einer gemeinsamen Ausgabenübersicht erfassen. Einfuhrsteuer für physische NFC-Waren ist wieder eine andere Frage. [ESTV: Bezugsteuer](https://www.estv.admin.ch/de/steuerpflicht-bezugsteuer-mwst).

**Rechnungsentscheidung:** MWST nur mit zutreffendem Status ausweisen. Bei Registrierung Preis netto/Steuer/Endbetrag und UID korrekt darstellen; bei fehlender Registrierung keine scheinbare Steuerposition ausstellen. Die öffentlichen «ab»-Preise müssen mit der danach tatsächlich angebotenen günstigsten Leistung zusammenpassen. Die Steuerbehandlung wird durch die Offerte nicht frei gewählt.

### 3.4 Buchhaltung und Aufbewahrung

Unter CHF 500'000 Umsatzerlös genügt für das Einzelunternehmen grundsätzlich die vereinfachte Erfassung von Einnahmen, Ausgaben und Vermögenslage; ab CHF 500'000 gelten die Regeln der vollständigen Buchführung/Rechnungslegung. Gesetzlich erforderliche Geschäftsunterlagen sind grundsätzlich zehn Jahre aufzubewahren. Nicht sämtliche Chats oder Besucherdaten werden allein dadurch zu zehnjährig aufzubewahrenden Geschäftsbüchern. [SECO: Einzelunternehmen](https://www.kmu.admin.ch/de/rechtsform-einzelunternehmen), [SECO: Leitfaden](https://www.kmu.admin.ch/de/selbststaendigkeit-ein-leitfaden).

**Projektmassnahme:** fortlaufende Rechnungsnummern, Bankabgleich, jährlicher Abschluss, nachvollziehbare Änderungen, lesbare Exporte und unabhängige Sicherung. Vertragliche Beweissicherung und gesetzliche Archivierung getrennt von kurzfristigen Arbeitskopien führen. Konkrete Fristen und Löschvorschläge stehen in `DATENSCHUTZ-BETRIEB.md`.

## 4. Website, Anfrage, Preiswerbung und Vertragsschluss

### 4.1 Der tatsächliche Ablauf zählt

Die aktuelle Produktauswahl ist eine Anfragevorbereitung. Der Besucher öffnet E-Mail oder WhatsApp und sendet dort freiwillig. Das reduziert Checkoutpflichten, verhindert aber nicht, dass später im Chat durch eindeutige übereinstimmende Erklärungen ein Vertrag entsteht. «Schriftlich» ist rechtlich nicht immer dasselbe wie «per E-Mail»; deshalb den gewünschten Kanal konkret benennen. Ein versteckter Impressumssatz kann eine eindeutige persönliche Zusage nicht zuverlässig neutralisieren.

Für elektronischen Geschäftsverkehr nennt das UWG Identitätsangaben, verständliche Vertragsschritte, Korrekturmöglichkeiten und elektronische Bestätigung. Für ausschliesslich individuelle E-Mail-/vergleichbare Kommunikation bestehen Besonderheiten; eine spätere automatisierte Bestellung muss neu geprüft werden. [SECO: Onlinehandel](https://www.seco.admin.ch/de/onlinehandel), [UWG, Art. 3 Abs. 1 lit. s und Abs. 2](https://www.fedlex.admin.ch/eli/cc/1988/223_223_223/de).

**Empfohlener Ablauf:** Anfrage → Rückfragen → vollständige Offerte mit Version und Gesamtpreis → ausdrückliche Annahme dieser Offerte → Bestätigung und gegebenenfalls vereinbarte Anzahlung. Keine automatisch versandte Nachricht «Bestellung bestätigt», solange lediglich eine Anfrage vorliegt. Die Offerte sagt ausdrücklich, ob sie verbindlich ist, wie lange und wie sie angenommen wird.

### 4.2 PBV ohne pauschale Überdehnung

PBV-Konsumentenschutz und reine geschäftliche Beschaffung sind auseinanderzuhalten. Bei Konsumentenwarenangeboten gilt der tatsächlich zu bezahlende CHF-Preis einschliesslich obligatorischer Zuschläge; Versand darf separat ausgewiesen werden, muss aber transparent sein. Auch Preiswerbung kann erfasst sein. Nicht alle Dienstleistungen unterliegen der gleichen Preisanschreibepflicht; «alle Webdienstleistungen müssen immer einen festen Endpreis haben» wäre zu weit. [SECO: PBV-FAQ](https://www.seco.admin.ch/de/faq-pbv), [SECO: Preisgrundlagen](https://www.seco.admin.ch/de/grundlagen-pbv).

**Anwendung:** «ab CHF 49» muss eine wirklich erhältliche NFC-Variante abdecken. Form, Grösse, Material, Personalisierung und Einrichtung dürfen nicht stillschweigend zusätzliche obligatorische Kosten erzeugen. Kein «Endpreis»-Versprechen bei tatsächlich hinzukommenden unbekannten Versandkosten. Bis Versandmodell und Käuferkreis feststehen, transparente unverbindliche Offertenvorbereitung verwenden und vor jeder Annahme Stückpreis, Menge, Versand, Steuer und Gesamtsumme beziffern. Für einen echten B2C-Onlineshop genügt «Versand auf Anfrage» regelmässig nicht als Ersatz für erforderliche sichtbare Kostenangaben. [SECO: Vor dem Kauf](https://www.seco.admin.ch/de/vor-dem-kauf-und-vertragsabschluss).

### 4.3 Widerruf und AGB

In der Schweiz existiert kein allgemeines gesetzliches Widerrufsrecht für gewöhnliche Onlinekäufe. Andere Konstellationen, insbesondere bestimmte Haustür-/Telefonverträge, müssen getrennt geprüft werden. Eine freiwillige Rückgabezusage bindet nach ihrem Inhalt. «Personalisiert, daher keinerlei Rechte» wäre falsch: Mängelrechte sind von einer Rückgabe aus Gefallen zu unterscheiden. [SECO: Schweiz/EU-Widerruf](https://www.kmu.admin.ch/de/widerrufsrecht-in-der-schweiz-und-der-eu).

AGB müssen vor Vertragsschluss zugänglich und wirksam einbezogen sein; eine erstmalige Beilage zur Rechnung ist dafür zu spät. Für das kleine Studio ist eine individuell ausgefüllte Offerte mit passenden Anhängen häufig verständlicher. Die beigefügten Vorlagen sind bewusst intern, mit offenen Entscheidungen; sie sind keine bereits verabschiedeten Bedingungen.

## 5. Kundenverträge und Haftung

### 5.1 Leistungen unterscheiden

Eine fertig definierte Website/Automation mit prüfbarem Erfolg hat werkvertragliche Elemente; Beratung, laufende Betreuung und erfolgsoffene Optimierung auftragsrechtliche. NFC-Verkauf kann kaufrechtliche, individuelle Herstellung zusätzlich werkvertragliche Elemente enthalten. Ein Gesamtprojekt kann gemischt sein. Die Bezeichnung «Dienstleistung» entscheidet die rechtliche Einordnung nicht. Beim Werkvertrag ist insbesondere Art. 377 OR, beim Auftrag Art. 404 OR für vorzeitige Beendigung zu beachten; starre unkündbare Laufzeiten oder pauschaler Anspruch auf das volle Resthonorar nicht unbesehen verwenden. [OR, Art. 363 ff., 377, 394 ff., 404](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/de).

**Projektanwendung:** Pro Auftrag festlegen: Anzahl Seiten/Sprachen, Inhalte, Integrationen, responsives Verhalten, unterstützte Browser, Prüfzustand, Korrekturrunden, Abnahme und verbleibende Fehler. «Grundlegende SEO-Basis» als konkrete Leistungen beschreiben, nicht als Rankinggarantie. «Leicht pflegbar» klären: durch Silvan, über CMS oder durch Kunden mit Codekenntnissen? «Automation reduziert Aufwand» braucht klaren Testfall statt unbeschränkter Erfolgsgarantie.

### 5.2 Abnahme, Mängel und Wartung

Gewährleistung ist nicht dasselbe wie freiwillige Haltbarkeitsgarantie. Beim Kauf bestehen grundsätzlich zweijährige Verjährungsregeln ab Ablieferung, daneben Prüf-/Rügeanforderungen. Für Verbraucherkäufe sind Verkürzungen der Frist begrenzt; die Schweizer Regelung darf nicht pauschal mit EU-Verbrauchergarantie gleichgesetzt werden. Arglistig verschwiegene Mängel können nicht durch Freizeichnung abgesichert werden. [SECO: amtlich beauftragter Bericht zur Schweizer Rechtslage](https://www.seco.admin.ch/dam/en/sd-web/vGPvd0RdetmM/RFAGR_Zusatzbericht_RechtslageSchweiz_FINAL.pdf).

**Vorlagenentscheidung:** Keine Verkürzung oder vollständige Wegbedingung als Default. Mängel dokumentieren und gemeinsam eine konkrete Nachbesserung vereinbaren. Abnahmeprotokoll mit Testversion und offenem Restpunkt verhindert Streit besser als eine aggressive Schweigefiktion. Spätere API-/Browseränderungen, neue Wünsche und Hostingunterhalt vertraglich von vorhandenen Mängeln trennen; die blosse Benennung als Wartung beseitigt keinen Mängelanspruch.

### 5.3 Haftung und Betriebsgrenzen

Der vorgängige Ausschluss der Haftung für rechtswidrige Absicht oder grobe Fahrlässigkeit ist nach Art. 100 OR nichtig. Eine wirtschaftlich sinnvolle Haftungsbegrenzung für andere Schäden braucht eine zum Auftrag passende Prüfung und darf zwingende Ansprüche nicht unterlaufen. [Bundesgericht 4A_237/2023 vom 18. April 2024, E. 5.3](https://www.bger.ch/ext/eurospider/live/de/php/aza/http/index.php?highlight_docid=aza%3A%2F%2F18-04-2024-4A_237-2023&lang=de&type=show_document&zoom=).

**Projektanwendung:** Kein universeller Satz «für Links/Datenverlust niemals verantwortlich». Drittanbieter können eigenverantwortlich sein, trotzdem bleiben eigene Auswahl-, Integrations- und Vertragspflichten. Für kritische Automationen Limitierungen, menschliche Freigaben, Probelauf, Fehleralarm, Wiederholungsschutz und Rückabwicklung definieren. Haftpflicht/Cyberversicherung mit Deckung für Software, Daten, Vertragsvermögensschäden und Waren prüfen; Versicherung ist eine Empfehlung und keine behauptete bestehende Deckung.

### 5.4 Rechte und Übergabe

Kunde und Studio müssen unterscheiden zwischen projektspezifischer Gestaltung, wiederverwendbaren Komponenten, Open Source, gekauften Medien und Kundenmaterial. Eine Zahlung schafft nicht automatisch jede gewünschte Exklusivität. Quellen, Nutzung, Bearbeitung, Weitergabe an Nachfolgeentwickler, Domain-/Hostingkonten und etwaige Portfoliofreigabe ausdrücklich vereinbaren. [IGE: Werke nutzen](https://www.ige.ch/de/etwas-schuetzen/urheberrecht/ein-werk-nutzen).

## 6. Datenschutz der eigenen Website und Kontaktbearbeitung

### 6.1 Information und Rollen

Die Information muss insbesondere Verantwortlichen/Kontakt, Zwecke, Empfänger oder Kategorien und bei Auslandbekanntgabe Staaten sowie gegebenenfalls Garantien/Ausnahmen nachvollziehbar nennen. «Ausserhalb der Schweiz» allein ist zu unbestimmt. Eine technische Privacy-Erklärung ersetzt die tatsächliche Prüfung der Bearbeitung nicht. [EDÖB: Datenschutzerklärungen](https://www.edoeb.admin.ch/de/datenschutzerklaerungen-im-internet).

Silvan ist für Akquisition, Kundenverwaltung und die eigene Website verantwortlich. Bei Kundenhosting oder Automation kann er Auftragsbearbeiter sein; für eigene Rechnungen bleibt er separat verantwortlich. Google/WhatsApp/LinkedIn dürfen nicht ungeprüft als einheitliche «Auftragsbearbeiter» bezeichnet werden. Die Auftragsbearbeiterrolle ist zweck- und vertragsbezogen.

### 6.2 Konkrete Providerbefunde

| Dienst | Quellenbefund | Bedeutung/noch offen |
|---|---|---|
| Vercel | Vercel Inc., USA; DPA wirksam 31.03.2026; nennt Pro und Enterprise als erfasste Pläne; aktives Hobby-Konto durch API bestätigt | Auf dieses Konto anwendbarer Auftragsbearbeitungsvertrag nicht belegt; passenden Vertrag mit zulässigem Tarif/Anbieter herstellen |
| Vercel Hobby | Auf persönliche, nicht kommerzielle Nutzung ausgerichtet; aktiv bestätigt | Konkreter Konflikt für entgeltliche Studioangebote. Zulässigen Tarif/Anbieter wählen; kein Tarifwechsel durch diesen Bericht |
| Spline | Spline, Inc., Delaware/USA; Privacy zuletzt geändert 10.01.2026 | Länder der tatsächlichen Auslieferung/Support, Rollen und Transfermechanismus noch nicht vollständig nachgewiesen |
| Google/Gmail | Google erklärt für Consumer Gmail/Drive ausdrücklich, keinen DPA anzubieten und kein Auftragsbearbeiter zu sein | Kontotyp prüfen; @gmail.com allein beweist nicht sämtliche Vertragsbedingungen. Workspace/CDPA nicht erfinden |
| WhatsApp | Aktuelle Privacy ab 02.07.2026 nennt WhatsApp Ireland Limited für European Region | Vorhandene Angabe Meta Platforms Ireland Ltd. korrigieren; Business-App/API, Backup und Adressbuch separat prüfen |
| LinkedIn | Öffentlich verlinkter Kontaktkanal | Kein eingebetteter Tracker im dokumentierten Ausgangszustand; tatsächliche Nachrichtennutzung und Konto prüfen |

Quellen: [Vercel DPA](https://vercel.com/legal/dpa), [Vercel Hobby](https://vercel.com/docs/plans/hobby), [Spline Privacy](https://spline.design/privacy), [Spline Terms](https://spline.design/terms), [Google Privacy Help Center](https://support.google.com/policies/answer/9581826?hl=en), [WhatsApp aktuelle Privacy](https://www.whatsapp.com/legal/privacy-policy-eea).

Vercel verweist für aktuelle Unterauftragnehmer samt Funktionen/Ländern auf das [Trust Center](https://security.vercel.com/). Die globale Providerliste enthält auch AI-Dienste: deren blosse Aufnahme beweist keinen Einsatz auf dieser Website. Umgekehrt garantiert eine europäische Hostingregion nicht, dass Support, Logs und Weiterverarbeitung ausschliesslich dort bleiben. Eine vollständige projektspezifische Ländermatrix ist noch offen.

WhatsApp nennt unter anderem Irland/USA für Betrieb und Infrastruktur, UK/Israel für Analysen und weitere Staaten für einzelne Funktionen. Diese Angaben sind keine Feststellung, dass jede Websiteanfrage alle diese Staaten durchläuft. Den tatsächlichen Dienst und dessen globalen Datenfluss dokumentieren; eine einzelne EU-Gesellschaft schliesst Drittlandbearbeitung nicht aus.

### 6.3 Auslandmechanismen

Zuerst Staat und Empfänger feststellen, dann Angemessenheit gemäss Anhang 1 DSV prüfen. Bei USA ist eine allfällige Swiss-US-DPF-Zertifizierung **für die genaue juristische Person und die betroffenen Daten** nachzuweisen; nicht aus einem EU-DPF-Logo oder US-Sitz schliessen. Fehlt Angemessenheit, kommen geeignete Garantien, insbesondere anerkannte Standardklauseln mit Schweizer Anpassungen und Transferprüfung, in Betracht. Ein pauschaler Hinweis «mit Nutzung stimmen Sie weltweit zu» ist kein Ersatz. [EDÖB: Auslandbekanntgabe](https://www.edoeb.admin.ch/de/bekanntgabe-von-personendaten-ins-ausland), [EDÖB: Angemessenheit](https://www.edoeb.admin.ch/de/angemessenheit).

**Projektentscheidung:** Solange ein optionaler Dienst nicht ausreichend abgesichert ist, ist sein Deaktivieren oder datensparsame lokale Auslieferung eine konkrete Alternative. Klickaktivierung verbessert Transparenz und minimiert unnötige Verbindungen, beweist aber allein keine rechtmässige Auslandgarantie. Self-Hosting erfordert wiederum eine passende Lizenz und den Nachweis, dass keine versteckten Nachladeverbindungen verbleiben.

### 6.4 Kontaktlinks, Logs, Cookies und Demos

Der vorbereitete WhatsApp-Text wird bereits mit Öffnen des Links an WhatsApp übertragen; erst das Absenden schickt ihn an Silvan. Dies öffentlich klar erklären. «Kein Formularserver» bedeutet nicht «keine Personendatenbearbeitung»: Webserver sieht technische Zugriffe, Mailanbieter sieht empfangene Korrespondenz. Browserhistorie und URL-Logs begründen zusätzliche Zurückhaltung bei sensiblen Angaben. Kopierfunktion bietet eine brauchbare Alternative.

Die dokumentierte Ausgangsstichprobe fand vor Spline-Aktivierung keine Cookies oder Browserpersistenz. Daraus folgt keine globale Garantie für alle Seiten und nachgeladene Drittsoftware. Keine pauschale Bannerpflicht allein wegen Websitebetrieb. Vor Analytics-Aktivierung sämtliche Request-/Identifier-/Storage-Flüsse, Zwecke und rechtlich erforderliche Wahlmöglichkeiten prüfen. Ein Betreiber-Umgebungsschalter ist keine Besuchereinwilligung. [EDÖB: Cookies und ähnliche Technologien](https://www.edoeb.admin.ch/de/faq-datenschutz).

Jede separat erreichbare Demo braucht korrekte Hinweise auf ihren wirklichen Betreiber und Datenfluss. Fiktive Geschäftsadressen dürfen nicht an die Stelle des tatsächlichen Verantwortlichen treten. Formulare ausfallsicher gestalten, nicht bloss per normalem JavaScript «nicht senden». Der dokumentierte No-JS-Fehler ist ein technischer Mangel mit möglicher Datenschutzfolge; es gibt bislang keinen Nachweis realer betroffener Nutzer oder automatisch einer meldepflichtigen Verletzung.

### 6.5 Betrieb statt blossem Erklärungstext

Auskunft in der Regel innert 30 Tagen bearbeiten; bei begründeter Verzögerung informieren. Rechte auf Löschung/Herausgabe sind nicht grenzenlos: gesetzliche Aufbewahrung und Voraussetzungen der Datenportabilität berücksichtigen. [EDÖB: Rechte](https://www.edoeb.admin.ch/de/meine-rechte-kennen-und-durchsetzen).

Bei Verletzungen mit voraussichtlich hohem Risiko Meldung an den EDÖB so rasch wie möglich; nicht automatisch die DSGVO-72-Stunden-Regel auf die Schweiz übertragen. Auftragsbearbeiter informiert seinen Verantwortlichen über Verletzungen; Risikoprüfung und Kommunikation dokumentieren. [EDÖB: Leitfaden zu Art. 24 DSG](https://www.edoeb.admin.ch/dam/de/sd-web/T64CAUyvAMcF/1_2%20Leitfaden%20des%20ED%C3%96B%20betreffend%20die%20Meldung%20von%20Datensicherheitsverletzungen%20und%20Information%20der%20Betroffenen%20nach%20Art.%2024%20DSG_DE.pdf).

Kleine risikoarme Betriebe können von der gesetzlichen Verzeichnispflicht ausgenommen sein; das macht eine schlanke interne Inventarliste nicht überflüssig. Hochriskante Kundendaten/Profiling verändern die Lage. [EDÖB: neues DSG, Bearbeitungsverzeichnis](https://www.edoeb.admin.ch/de/das-neue-datenschutzgesetz-aus-sicht-des-edob).

Vor einer Bearbeitung mit potenziell hohem Risiko ist eine Datenschutz-Folgenabschätzung erforderlich; bei verbleibendem hohem Restrisiko gelten zusätzliche Konsultationsregeln. Für das Studio betrifft dies insbesondere spätere Automationen mit sensiblen Daten, umfangreicher Überwachung oder folgenreichen automatisierten Bewertungen. Die aktuelle einfache Portfolioseite belegt einen solchen Fall nicht. [EDÖB: Datenschutz-Folgenabschätzung](https://www.edoeb.admin.ch/de/datenschutz-folgenabschaetzung).

## 7. NFC: Sicherheit, Lieferkette, Nutzung und Haftung

### 7.1 Vor dem Vertrieb eine Produktakte

**Für jede Variante:** Lieferant mit ladungsfähiger Adresse, tatsächlicher Hersteller, Herkunft/Importeur, Chip-/Antennenmodell, Material und Farbe, Serien-/Chargenzuordnung, Fotos, Einsatzbereich, technische Unterlagen und allfällige Konformitätserklärungen. «Unser Lieferant verkauft das auch» genügt nicht als Akte. Bei Eigenmarke oder wesentlicher Veränderung können zusätzliche Herstellerpflichten entstehen. Händler/Importeure müssen passende Sicherheitsunterlagen beschaffen können. [SECO: Produktesicherheit FAQ](https://www.seco.admin.ch/de/faq-produktesicherheit), [SECO: Nachweispflichten](https://www.seco.admin.ch/dam/seco/de/dokumente/Arbeit/Arbeitsbedingungen/Produktsicherheit/FAQ/FAQ%20Produktsicherheit.pdf.download.pdf/FAQ_PrSG_PrSV_03_09_2015_DE.pdf).

**Prüfliste als projektbezogene Empfehlung:** lose/verschluckbare Teile, Bruchkanten, Kleber, Stabilität des Aufstellers, Reinigungsmittel, Hitze/Sonnenlicht, Einsatz auf Metall, Feuchtigkeit, erreichbare Kinder, Druck-/Materialbeständigkeit. Nicht ohne Nachweis «lebensmittelecht», «spülmaschinenfest», «für Kinder» oder «für draussen» zusagen. Die Bewerbung als digitale Menükarte macht das Produkt nicht automatisch zum Lebensmittelkontaktmaterial; direkter Kontakt wäre separat zu prüfen.

### 7.2 Funk, Kennzeichnung und CE

Falls das konkrete Produkt als Funkanlage erfasst ist, müssen die einschlägigen Anforderungen bereits für Angebot/Inverkehrbringen eingehalten werden. BAKOM weist darauf hin, dass seine Regeln andere Produktvorschriften nicht ersetzen. Die Schweizer Einordnung ist am konkreten Endprodukt vorzunehmen; eine EU-CE-Kennzeichnung ist weder universelle Pflicht jeder QR-Karte noch pauschaler Sicherheitsnachweis. [BAKOM: Marktzugang Funkanlagen](https://www.bakom.admin.ch/de/marktzugang-funkanlagen), [BAKOM: grundlegende Anforderungen](https://www.bakom.admin.ch/de/grundlegende-anforderungen).

**Offene Entscheidung:** Lieferant soll erklären, welches Regelwerk auf genau diesen passiven/aktiven Chip samt Antenne im Endprodukt angewandt wurde und welche Unterlagen dies belegen. Bei unklarer Einordnung zuständige Stelle oder qualifizierte Prüfstelle einbeziehen. Nicht eigenmächtig ein CE-Symbol auf Entwürfe setzen. Funkrechtliche Eignung beweist nicht Material-, Elektroabfall- oder Umwelteignung.

### 7.3 Qualität und Nachmarktprozess

Vor Auslieferung Zieladresse vom Kunden freigeben lassen; Eigentum/Kontrolle an Domain und Google-Profil prüfen; NFC und QR mit dokumentierten Geräten testen; Schreibschutz passend zur späteren Änderungsstrategie setzen. Statischer Link, dynamische Weiterleitung und gehostete digitale Visitenkarte haben unterschiedliche Laufzeiten/Kosten/Datenflüsse. Keine dauerhafte Funktion zusagen, wenn ein Drittanbieterlink oder Abonnement jederzeit wegfallen kann.

Beschwerden mit Charge, Datum, Fehlerbild und Abhilfemassnahme dokumentieren. Bei Sicherheitsverdacht betroffene Charge separieren, weitere Auslieferung prüfen/stoppen, Lieferant und zuständige Behörde einbeziehen sowie Rückruf-/Warnpflichten beurteilen. Kein vorhandenes Beschwerderegister oder Rückrufplan wurde nachgewiesen. Ein Lieferantenvertrag beseitigt eigene gesetzliche Pflichten gegenüber Behörden/Geschädigten nicht. [SECO: Konsumentenprodukte und Nachmarktpflichten](https://www.seco.admin.ch/dam/seco/de/dokumente/Publikationen_Dienstleistungen/Publikationen_Formulare/Arbeit/Arbeitsbedingungen/Broschueren/infoflyer_produktesicherheit_2017.pdf.download.pdf/flyer_produktesicherheit_de_2019.pdf).

## 8. Google-Präsenz, Bewertungen und Marken

Bewertungen müssen auf echten Erfahrungen beruhen. Keine Belohnung, gekauften Bewertungen, künstlichen Konten oder Auswahl nur zufriedener Kunden. Kundenanleitung und Produktgestaltung sollen neutrales Feedback erbitten. Fünf Sterne als grafisches Element sind nicht automatisch ein belegter Rechtsverstoss; zusammen mit Aufforderungen oder behauptetem Bewertungsstand können sie aber irreführend wirken. Keine reale Durchschnittsbewertung suggerieren, wenn nur ein Designmuster gezeigt wird. [Google: Fake Engagement](https://support.google.com/business/answer/7400114).

Die Leistung ab CHF 249 soll Einrichtung/Optimierung durch Silvan vergüten und keinen kostenpflichtigen Pflichtzugang zu Google suggerieren. Kontoinhaberschaft beim Kunden, rollenbasierter Zugriff für Silvan, authentische Betriebsdaten und dokumentierte Freigaben. Ranking, Freischaltung, Anzahl oder Fortbestand von Bewertungen nicht garantieren. Google kann Profile bei Verstössen einschränken. [Google: Business Profile restrictions](https://support.google.com/business/answer/14114287?hl=en).

Eine Google-Verlinkung erlaubt nicht automatisch das Drucken beliebiger Google-Logos auf verkaufte Waren. Markenverwendung für Produktabbildungen, Verpackung und fertige NFC-Ware gesondert anhand aktueller Bedingungen prüfen; keine Partnerschaft/Zertifizierung suggerieren. Bis zum Nachweis neutrale Beschreibung und eigenes Gestaltungssystem verwenden. [Google Brand Resource Center](https://about.google/intl/us_en/brand-resource-center/).

**Zusätzliche Anbieterpflicht bei tatsächlicher Google-Profilverwaltung:** Googles Drittanbieterbedingungen verlangen insbesondere dokumentierte Kundenautorisierung, Gebührenklarheit, Kundeneigentum und zeitnahe Entkopplung bei Beendigung. Für primär KMU betreuende Anbieter gehört ein auffindbarer [Google-Kundenhinweis zur Drittanbieterzusammenarbeit](https://support.google.com/business/answer/7163406) auf die Website und in das Kunden-Onboarding. [Google: Drittanbieterbedingungen](https://support.google.com/business/answer/7353941?hl=en).

## 9. Konzepte, Bilder, Fonts, Code und KI

Die erkennbare Konzeptkennzeichnung verhindert eine falsche Referenzbehauptung, ersetzt aber keine Bild-/Markenrechte. Für jede Demo prüfen: fiktive Firma tatsächlich erfunden, keine reale Person als Kunde dargestellt, Bildlizenz umfasst kommerzielles Portfolio, Modelle dürfen eingebettet/exportiert werden, Schriftlizenz und Open-Source-Hinweise bleiben erhalten. Auch einfache Fotografien können geschützt sein. [IGE: Grundlagen](https://www.ige.ch/de/etwas-schuetzen/urheberrecht/grundlegendes).

**Aktenstruktur:** Assetpfad → Urheber/Quelle → Erwerbs-/Generierungsdatum → Lizenzversion → erlaubte Nutzungen → Attribution → Nachweisdatei. Bei KI-Bildern Modell/Tool, Nutzungsbedingungen und eventuelle Referenzbilder notieren; keine absolute Exklusivität oder Freiheit von Drittrechten behaupten. Keine Kundengeheimnisse, Zugangsdaten oder Personendaten ohne geprüfte Freigabe in KI-Dienste geben. Kundenmaterial mit Herkunftsbestätigung annehmen, erkennbare Konflikte trotzdem klären. Portfolioverwendung eines späteren echten Kundenprojekts gesondert genehmigen lassen.

## 10. EU nur nach erfülltem Anknüpfungspunkt

### 10.1 DSGVO

Reine Erreichbarkeit aus der EU genügt nicht. Gezielte EU-Angebote oder relevante Verhaltensbeobachtung können Art. 3 Abs. 2 DSGVO auslösen; EU-Niederlassungen gesondert prüfen. Auch B2B-Kontaktpersonen bleiben natürliche Personen. Bei Anwendung braucht es passende Rechtsgrundlagen/Informationen, gegebenenfalls Vertreter, Auftragsverträge und die EU-Vorfallprüfung; Behördenmeldung grundsätzlich binnen 72 Stunden, sofern nicht voraussichtlich kein Risiko besteht. [DSGVO, insbesondere Art. 3, 6, 13, 27, 28, 33](https://eur-lex.europa.eu/eli/reg/2016/679/art_3/oj).

**Projektentscheidung:** Marktannahme «primär Schweiz» ist kein Ausschluss aller EU-Verpflichtungen. Erst tatsächliche Lieferländer, Werbung, Bestellmöglichkeiten und Kundentypen feststellen. Keine beliebige DSGVO-Checkbox als Ersatz einbauen.

### 10.2 Verbraucher/Fernabsatz

Bei gezieltem EU-Verbrauchergeschäft nationale Umsetzung und zwingende Verbraucherschutzregeln prüfen. Fernabsatz kann auch ohne Checkout über organisierte E-Mail-Verkäufe vorliegen. Regelmässig 14-tägiges Widerrufsrecht mit Informationspflichten; Ausnahmen für echte kundenspezifische Waren und Regeln zum vorzeitigen Beginn von Dienstleistungen/digitalen Inhalten gesondert erfüllen. Standardauswahl einer Farbe allein ist keine sichere Personalisierungsausnahme. [Verbraucherrechterichtlinie](https://eur-lex.europa.eu/legal-content/DE-EN/TXT/?locale=de&uri=CELEX%3A32011L0083), [EU: Verbraucherrechte](https://europa.eu/youreurope/citizens/consumers/shopping/shopping-consumer-rights/index_de.htm).

### 10.3 GPSR und RED

Für einschlägige in der EU bereitgestellte Verbraucherprodukte ist die GPSR zu prüfen; sie gilt seit 13.12.2024. Auch vernünftigerweise vorhersehbare Verbrauchernutzung kann relevant sein. B2B-Aufkleber allein genügt nicht. Produktakte, Rollen, EU-verantwortlicher Wirtschaftsakteur und Pflichtangaben im Fernabsatz prüfen, darunter Herstellerkontakt, gegebenenfalls EU-verantwortliche Person, Produktidentifikation und Warnungen. [GPSR, Art. 2, 9, 16, 19](https://eur-lex.europa.eu/eli/reg/2023/988/oj?locale=de).

Die RED regelt einschlägige Funkanlagen zusätzlich; GPSR und CE nicht gleichsetzen. Passive NFC-Komponenten/Endprodukte konkret einstufen lassen, statt aus dem Begriff «NFC» eine vollständige Konformitätsentscheidung abzuleiten. [Richtlinie 2014/53/EU](https://eur-lex.europa.eu/eli/dir/2014/53/oj/deu).

### 10.4 Barrierefreiheit

Der European Accessibility Act erfasst bestimmte Produkte und Dienstleistungen, darunter einschlägigen E-Commerce, seit 28.06.2025 über nationale Umsetzung. Dienstleistende Kleinstunternehmen sind nach der Richtlinie ausgenommen (weniger als zehn Beschäftigte und Jahresumsatz oder Bilanzsumme höchstens EUR 2 Mio.); das ist keine pauschale Produktausnahme und muss für den jeweiligen Kunden geprüft werden. [Richtlinie 2019/882/EU, Art. 2–4 und 31](https://eur-lex.europa.eu/legal-content/DE-EN/TXT/?uri=CELEX%3A32019L0882).

**Projektanwendung:** keine pauschale BFSG-/EAA-Garantie für jede verkaufte Website. Den gewünschten Standard und Prüfumfang in der Offerte festlegen. Automatische Tests allein beweisen keine vollständige Barrierefreiheit. Tastatur, Fokus, Formulare, Kontrast, reduzierte Bewegung und Inhalte manuell prüfen; bei öffentlichen Auftraggebern zusätzliche Anforderungen ermitteln.

## 11. Konkrete Freigabelogik

**Websitekorrekturen sofort reviewbar:** falsche Provideridentität ändern, unbestätigte Register-/Steuerbehauptungen entfernen, Datenschutz an aktive Features koppeln, Demos wahrheitsgemäss erklären, Preise nicht als vollständig darstellen wenn Kosten offen sind, keine Garantien erfinden.

**Vor Weiterbetrieb eines konkret betroffenen Dienstes zu lösen:** unzulässiger Hostingtarif; fehlende tragfähige Absicherung tatsächlicher Auslandbearbeitung; nachgewiesene ungewollte personenbezogene Demoübertragung. Eine Erklärung «wird später geprüft» legalisiert die Bearbeitung nicht.

**Vor verbindlicher NFC-Lieferzusage/Vertrieb der betreffenden Variante zu lösen:** Hersteller-/Importeurrolle, anwendbare Sicherheit/Funkregeln, erforderliche Nachweise, konkrete Versand-/Steuer-/Gesamtkosten und Kundenfreigabe.

**Vor jeweiligem Kundenprojekt zu lösen:** Vertragspartner, Leistungsumfang, Kosten und Betrieb; bei Datenzugriff Rollen/Weisungen/Provider; bei EU/B2C passende Zusatzprüfung. Ein allgemeiner unbekannter Punkt soll nicht beliebig andere bereits abgesicherte Leistungen blockieren.

Verantwortliche, Nachweisformat und offene Entscheidungen stehen in `NACHWEISE-UND-OFFENE-PUNKTE.md`; ausführbare Prozesse in `DATENSCHUTZ-BETRIEB.md`; Vertragsentwürfe in `OFFERTEN-UND-VERTRAGSVORLAGEN.md`.

## 12. Quellenqualität und Aktualisierung

Verwendet wurden Behörden, amtliche Gesetzesportale und Originalbedingungen der Anbieter. Gesetzestexte auf Fedlex lieferten im textbasierten Abruf teilweise nur eine JavaScript-Hinweisseite; dort ist keine vollständige aktuelle Artikelprüfung durch diesen Abruf behauptet. Die verlinkten Normen sind Fundstellen, die entscheidenden Aussagen wurden soweit möglich durch amtliche Erläuterungen und Rechtsprechung abgestützt. Ein verlinkter historischer Bericht belegt keine nicht untersuchte Gesetzesänderung; vor konkreter Vertragsfreigabe aktuelle Gesetzesfassung prüfen.

Erneute Prüfung bei: neuem Zielland/Privatkundenvertrieb, Checkout, Konto-/Datenbankfunktion, Analytics-Aktivierung, KI-Integration, Provider-/Tarifwechsel, neuer NFC-Bauart/Lieferant, Umsatzschwellen, Mitarbeiter/Subunternehmern oder neuem echten Kundenportfolio. Quellenkopien und Vertragsannahmen privat archivieren; keine Kunden-/Steuerunterlagen in ein öffentliches Repository legen.
