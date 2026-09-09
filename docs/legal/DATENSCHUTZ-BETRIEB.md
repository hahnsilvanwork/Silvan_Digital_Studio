# Datenschutz im Betrieb – Arbeitsanweisung und Register

Stand: 7. September 2026. Inhaber und organisatorisch Verantwortlicher: Silvan Hahn, vorbehaltlich Bestätigung der aktuellen Betriebsdaten. **Dieses Dokument beschreibt Sollprozesse und Vorschläge, nicht deren bereits belegte Umsetzung.** Private Nachweise ausserhalb des öffentlichen Repository speichern. Rechtliche Einordnung/Quellen: `RECHTSPRUEFUNG-2026-09-07.md`.

## 1. Zuständigkeit und Ablage

Silvan pflegt Anbieterregister, Löschtermine, Rechteanfragen und Vorfälle. Eine Vertretung für Krankheit/Abwesenheit ist `[zu benennen]`; Zugriff nur falls tatsächlich vereinbart und erforderlich. Zentrale Kontaktadresse aktuell laut Website: `hahn.silvan.work@gmail.com`; Kontotyp und Eignung noch prüfen.

Private Ablagevorschlag: `Betriebsnachweise/Datenschutz/{Anbieter,Verträge,Anfragen,Vorfälle,Löschprotokolle}` mit eingeschränktem Zugriff, Verschlüsselung und Backup. Hier im Repository nur neutrale Muster und Nachweisstatus, keine Ausweiskopien, DPA-Unterschriften mit privaten Daten, Kundenlisten oder Zugangsschlüssel.

## 2. Bearbeitungsinventar

| ID | Verarbeitung/Zweck | Daten/Betroffene | Rolle Silvan | Systeme/Empfänger | Offener Nachweis |
|---|---|---|---|---|---|
| V01 | Hauptwebsite und Demos ausliefern/absichern | IP, Request, Browser, Zeit; Besucher | Verantwortlicher | Vercel, tatsächliche Unterauftragnehmer | Hobby aktiv per API bestätigt: kommerziellen Tarifkonflikt lösen; DPA, Länder, Logkategorien/Fristen |
| V02 | Lokale NFC-Anfrage vorbereiten | Produktdaten, optional Kontaktangaben; Interessenten | Verantwortlicher für Gestaltung der Funktion | Browser-RAM; vor Übergabe kein eigener Anfragebackend | gesamte Request-/Persistenzprüfung |
| V03 | Mail-Anfrage/Offerte | Kontakt, Inhalt, Anhänge; Interessenten/Kunden | Verantwortlicher | Google-Konto, lokale Mailgeräte/Backups | Consumer/Workspace/anderer Vertrag; Länder |
| V04 | WhatsApp-Kontakt | Nummer, Profil, Nachricht, Linktext | Verantwortlicher für eigene Kundenbearbeitung | WhatsApp Ireland Limited; weitere funktionsbezogene Empfänger | App/API, Adressbuch, Backup, Vertragsrollen |
| V05 | LinkedIn-Kontakt | Profil, Nachricht, Geschäftskontakt | Verantwortlicher für eigene Kommunikation | LinkedIn; nur nach Besuch/Nachricht | Kontonutzung und Exportpraxis |
| V06 | Optionale Spline-Ansicht | IP, Browser-/Verbindungsdaten | Verantwortlicher für Einbindung | Spline, Inc., USA; weitere Lieferdienste offen | Transfer, Länder, Lizenz; nur wenn aktiv |
| V07 | Optionale Reichweitenmessung | genaue Felder vor Aktivierung erfassen | Verantwortlicher | Vercel Analytics nur bei Aktivierung | momentan off; neue Freigabe erforderlich |
| V08 | Buchhaltung/Vertrag | Rechnung, Zahlung, vereinbarter Umfang | Verantwortlicher | tatsächliche Bank/Buchhaltung/Treuhand offen | Anbieter und Archivsystem |
| V09 | Kundenhosting/Automation | vom Projekt abhängige Daten | häufig Auftragsbearbeiter | je Kundenvertrag | Anlage pro Projekt; nicht pauschal freigegeben |
| V10 | NFC-Lieferung/Support | Lieferadresse, Auftrag, Charge, Reklamation | Verantwortlicher | tatsächlicher Hersteller/Versanddienst offen | nur notwendige Angaben weitergeben |

Verantwortlichenrolle des Dienstleisters für eigene Zwecke und Auftragsbearbeiterrolle für Kundendaten können nebeneinander vorkommen. Keine schematische Einordnung allein nach dem Namen der Software.

## 3. Anbieter vor Nutzung freigeben

Für jeden Anbieter ausfüllen:

| Feld | Eintrag |
|---|---|
| Juristische Person/Anschrift | `[ ]` |
| Produkt/Tarif/Accountinhaber | `[ ]` |
| Konkreter Zweck/Datenkategorien | `[ ]` |
| Eigene-/Auftragsbearbeiterrolle | `[ ]` |
| Vertrag/DPA-Version und Annahmebeleg | `[ ]` |
| Datenländer: Speicherung, Logs, Support, Unterauftrag | `[alle konkret, Quelle/Datum]` |
| Transfergrundlage je Land/Empfänger | `[Angemessenheit, CH-DPF-Eintrag, SCC etc.]` |
| Besondere Sicherungen | `[Verschlüsselung, Zugriffe, zusätzliche Massnahmen]` |
| Aufbewahrung/Backups/Löschung | `[tatsächlicher Vertrag und Einstellung]` |
| Security-/Subprocessor-Benachrichtigung | `[Empfänger, abonnierter Kanal]` |
| Datenexport/Wechsel | `[Format, Test, Kündigungsfolgen]` |
| Entscheidung und nächster Review | `[freigegeben/eingeschränkt/nicht einsetzen, Begründung, Datum]` |

Aktuelle Quellen: [Vercel DPA](https://vercel.com/legal/dpa), [Vercel Trust Center](https://security.vercel.com/), [Google Kontotyp/DPA](https://support.google.com/policies/answer/9581826?hl=en), [Spline Privacy](https://spline.design/privacy), [WhatsApp Privacy](https://www.whatsapp.com/legal/privacy-policy-eea). Diese Links ersetzen keinen Nachweis der auf den eigenen Vertrag anwendbaren Version.

**Konkrete Regeln:** Consumer Gmail nicht als Workspace mit DPA ausgeben; beim bestätigten Vercel-Hobby-Tarif kommerzielle Nutzung und fehlend nachgewiesene DPA-Anwendung durch zulässigen Tarif/Anbieter mit passenden Verträgen lösen; Spline nicht durch einen Klick allein als abgesichert betrachten. EU-/USA-Rechenzentrum, juristischer Sitz und Fernzugriff sind unterschiedliche Angaben. Ganze Provider-Listen nicht unkritisch in die öffentliche Erklärung kopieren, wenn sie ungenutzte Produkte enthalten. Ebenso wenig relevante Support-/Logländer weglassen.

## 4. Erhebung und Arbeitsalltag

- Nur Daten erfragen, die für die aktuelle Anfrage nötig sind. Keine Ausweiskopien/AHV-Nummern in gewöhnlichen Projektanfragen.
- Für vertrauliche Kundendaten einen vereinbarten sicheren Übergabekanal nutzen. Passwörter über Einladungen/Secret-Manager statt Chat teilen.
- WhatsApp-Adressbuchzugriff minimieren; keine vollständigen fremden Kundenadressbücher synchronisieren. Backup und Gerätekopien separat prüfen.
- Keine Kundenlisten, echten Formulareingaben oder Produktionsdaten in öffentliche Demos, Git, Fehlerberichte oder KI-Prompts übernehmen.
- Ein- und ausgehende Projektkommunikation dem richtigen Kundenordner zuordnen; Mailweiterleitungen und Empfänger vor Versand prüfen.
- Gemeinsame Projektkonten vermeiden. Mindestberechtigungen, MFA/Passkeys und getrennte Konten für Kunden einsetzen.
- Datenexporte nach Verwendung löschen; Einmalexporte nicht dauerhaft im Downloads-Ordner liegen lassen.
- Werbezwecke neu prüfen: eine Projektanfrage ist keine pauschale Newslettereinwilligung.

## 5. Aufbewahrung und Löschung

**Unterscheidung:** gesetzliche Aufbewahrung, berechtigte Beweissicherung und praktische Löschziele. Die folgenden Ziele sind interne Vorschläge und erst nach Prüfung/Einrichtung als Praxis zu behaupten. Keine routinemässige Löschung trotz laufendem Streit oder gesetzlicher Pflicht; dafür begrenzten dokumentierten Aufbewahrungsvorbehalt anlegen.

| Kategorie | Vorschlag/gesetzliche Einordnung | Beginn und Umsetzung |
|---|---|---|
| Unbeauftragte gewöhnliche Anfragen | Vorschlag: 6 Monate nach Abschluss der Anfrage | dann löschen oder begründeten offenen Vorgang terminieren |
| Offerten ohne Annahme | Vorschlag: 12 Monate nach Ablauf, bei Streit gezielt länger | nur nötige Offerten-/Kommunikationsbelege |
| Vertrags-/Abnahmeunterlagen | Vorschlag: am Projekt und möglichen Ansprüchen orientiert, jährlich prüfen; nicht pauschal jede Arbeitsdatei zehn Jahre | zentrale finale Version; Sperre bei Anspruch |
| Geschäftsbücher/Buchungsbelege und gesetzlich erfasste Unterlagen | Grundsätzlich gesetzlich zehn Jahre; Umfang und Fristbeginn nach einschlägiger Norm/Steuerpflicht prüfen | Rechnungsarchiv lesbar, nachvollziehbar, separat |
| Zugangstokens/temporäre Exporte | Vorschlag: bei Ende des Zugriffsbedarfs sofort entziehen/löschen | Abschlusscheck; auch lokale Kopien |
| Arbeitskopien nach Projektübergabe | Vorschlag: 90 Tage nach bestätigter Übergabe, soweit kein Betrieb mehr beauftragt | vorher Vollständigkeit der Übergabe prüfen |
| Providerlogs | **Tatsächliche Frist unbekannt**; Anbieter-/Tariffristen dokumentieren, kurze angemessene Frist wählen soweit konfigurierbar | keine öffentlich erfundene 7-/30-Tage-Frist |
| Backups | Vorschlag: rollierender Zyklus 30–90 Tage passend zum Wiederherstellungsbedarf | nach Löschung keine operative Nutzung; bei Restore Löschliste erneut anwenden |
| Betroffenenanfragen | Vorschlag: minimaler Verfahrensnachweis 3 Jahre nach Abschluss, jährlich Notwendigkeit prüfen | unnötige Ausweiskopie vorher entfernen |
| Vorfallsakte | Vorschlag: fallbezogen an Ansprüchen/Pflichten orientieren; jährlicher Review | Belege minimiert und geschützt |
| Produkt-/Sicherheitsakte | Nach anwendbarem Produktrecht und Herstellerrolle bestimmen | nicht nach kurzer Anfragefrist löschen |

Quelle für grundsätzliche Geschäftsaufbewahrung: [SECO: Selbstständigkeit, Buchhaltung](https://www.kmu.admin.ch/de/selbststaendigkeit-ein-leitfaden). Dies ist keine zehnjährige generelle DSG-Erlaubnis für beliebige Daten.

**Monatlicher Löschlauf:** fällige Vorgänge auswählen → gesetzliche/streitbedingte Sperren prüfen → aktive Systeme/lokale Kopien/Exports bearbeiten → Papierunterlagen sicher entsorgen → Provider-/Backuprestlaufzeit notieren → ohne unnötige Inhaltskopie protokollieren. Papierkorb, Mailarchiv, gesendete Nachrichten, Telefonmedien und synchronisierte Geräte einbeziehen.

Löschprotokoll: `[Datum, Kategorie/Vorgangs-ID, Systeme, Löschaktion, verbleibende notwendige Reste mit Grund/Enddatum, Bearbeiter]`.

## 6. Auskunft, Berichtigung, Löschung und Herausgabe

Die Auskunft erfolgt grundsätzlich kostenlos und in der Regel innerhalb von 30 Tagen. Bei notwendiger Verzögerung oder Einschränkung fristgerecht informieren und begründen. Löschung und Portabilität haben gesetzliche Voraussetzungen/Grenzen. [EDÖB: Rechte](https://www.edoeb.admin.ch/de/meine-rechte-kennen-und-durchsetzen).

1. **Eingang:** Datum, Kanal, Begehren und Frist erfassen; unnötige automatische Weiterleitung vermeiden.
2. **Identität:** Risikoangemessen prüfen, vorzugsweise über bekannten Kontaktkanal. Nicht standardmässig vollständigen Ausweis verlangen. Nur notwendige Angaben/Schwärzungen zulassen.
3. **Rolle:** Eigene Daten oder Auftragsdaten eines Kunden? Bei Kundenrolle unverzüglich zuständigen Verantwortlichen informieren und Weisung einholen.
4. **Suche:** Mail, WhatsApp, Projektordner, Buchhaltung, Exporte, Logs soweit verfügbar, Backupkonzept und Provider einbeziehen; Suchumfang dokumentieren.
5. **Prüfung:** Betroffene Person zuordnen; Daten Dritter/Geheimnisse schützen; Aufbewahrungspflichten und zulässige Einschränkungen individuell feststellen.
6. **Antwort:** tatsächlich vorhandene Daten und erforderliche Angaben zu Zwecken, Empfängern, Herkunft soweit verfügbar, Ländern und Dauer/Kriterien. Nicht durch pauschalen Link auf die Website ersetzen.
7. **Sichere Übergabe:** passenden überprüften Kanal verwenden; keine Auskunft an die erste unbekannte E-Mail-Adresse mit gleichem Namen.
8. **Abschluss:** Berichtigungs-/Löschanweisungen auch an relevante Bearbeiter; Restdaten/Gründe/Fristen notieren; Vorgang schliessen und unnötige Identitätsbelege entfernen.

**Eingangsbestätigung:** «Wir haben Ihr Begehren vom `[Datum]` erhalten. Wir prüfen `[Art]` und melden uns innerhalb der massgeblichen Frist. Falls wir zur sicheren Zuordnung weitere Angaben benötigen, erläutern wir Ihnen deren Zweck.»

**Teilweise Löschung:** «Wir haben `[Kategorien/Systeme]` gelöscht. `[genau bezeichnete Unterlagen]` müssen wir wegen `[konkrete Pflicht/Grund]` bis `[Datum/Kriterium]` gesondert aufbewahren. Sie werden für `[begrenzter Zweck]` verwendet. `[Backupregel konkret, sofern zutreffend]`.»

**Keine Treffer:** «In den geprüften Systemen `[sinnvoller Umfang]` haben wir keine Ihrer Person zuordenbaren Daten gefunden. `[Falls nötig klare Begrenzung, z.B. fehlende Identifikationsmöglichkeit anonymer Statistiken]`.» Nicht fälschlich behaupten, ein Provider habe weltweit keinerlei Daten.

## 7. Sicherheitsvorfall

**Auslöser:** falscher Mailempfänger, verlorenes Gerät, Accountübernahme, veröffentlichte Secrets/Kundendaten, ungewollte Formular-URL, kompromittierte Automation, unberechtigter Unterauftragnehmerzugriff. Nicht nur erfolgreiche Hackerangriffe zählen.

### Sofort

Vorgang mit Datum/Uhrzeit anlegen; betroffene Funktion begrenzt eindämmen; Sessions/Tokens widerrufen; gefährdete Automationen stoppen; Beweise geschützt erhalten. Keine relevante Logdatei durch hektisches Aufräumen vernichten. Behebung, Beweissicherung und Betriebsfortführung koordiniert dokumentieren.

### Erste Bewertung

Welche Daten, wie viele Personen, welche Sensibilität, Vertraulichkeit/Integrität/Verfügbarkeit betroffen, seit wann, wer konnte zugreifen, Verschlüsselung und Schlüsselstatus, tatsächliche oder plausible Folgen, bereits ergriffene Massnahmen? Unsicherheiten ausdrücklich notieren. Bei Auftragsbearbeitung den Kunden so rasch wie möglich informieren, statt selbst auf abschliessende Hochrisikobewertung zu warten.

### Meldeentscheidung

Bei voraussichtlich hohem Risiko nach DSG den EDÖB so rasch wie möglich informieren. Betroffene informieren, soweit zu ihrem Schutz erforderlich oder behördlich verlangt; begründete Ausnahmen gesondert prüfen. Die Schweiz hat hierbei keine allgemeine 72-Stunden-Frist. Bei anwendbarer DSGVO Art. 33/34 gesondert prüfen: 72 Stunden für einschlägige Behördenmeldung und andere Risikoschwelle. Quellen: [EDÖB: Art. 24 Leitfaden](https://www.edoeb.admin.ch/dam/de/sd-web/T64CAUyvAMcF/1_2%20Leitfaden%20des%20ED%C3%96B%20betreffend%20die%20Meldung%20von%20Datensicherheitsverletzungen%20und%20Information%20der%20Betroffenen%20nach%20Art.%2024%20DSG_DE.pdf), [DSGVO](https://eur-lex.europa.eu/eli/reg/2016/679/art_3/oj).

**Dokumentation auch bei Nichtmeldung:** Tatsachen, Risikoabwägung, begründete Entscheidung, verantwortliche Person, Neubewertungstermin. «Keine Beschwerden erhalten» ist kein ausreichendes Kriterium für fehlendes Risiko.

**Erstmeldung an betroffenen Auftraggeber:** «Am `[Zeit]` wurde `[belegter Vorfall]` festgestellt. Möglicherweise betroffen: `[Daten/Zeitraum/System]`. Bisher bestätigt `[ ]`; noch offen `[ ]`. Eingedämmt durch `[ ]`. Ansprechpartner `[ ]`; nächstes Update `[ ]`. Bitte koordinieren Sie mit uns Ihre Bewertung und Kommunikation.»

**Abschluss:** Ursache beheben, Zugang/Updates/Tests prüfen, nachträgliche Meldungen ergänzen, Lösch-/Wiederherstellungsmassnahmen dokumentieren, einen wiederholbaren Schutz hinzufügen. Keine Veröffentlichung von Kundennamen oder technischen Angriffsmöglichkeiten ohne sachlichen Bedarf.

## 8. Technische Baseline als Soll

MFA/Passkeys auf GitHub/Vercel/Google/Registrar; verschlüsselte Geräte mit Sperre/Updates; Secret-Manager; minimale Rollen; getrennte Kundenzugänge; keine Schlüssel in Quelltext; überprüfte Dependencies; restriktive passende Header; sichere externe Links; Formulare bei JavaScript-Ausfall sicher; getrennte Tests/Produktion; unabhängiges Backup plus Wiederherstellungstest; Domainverlängerung und Kostenalarme; Zugangsentzug bei Projektende.

Eine Checkliste beweist deren Aktivierung nicht. Pro Massnahme private Beleg-ID und Datum festhalten. Technische Abnahmekriterien mit den tatsächlich durchgeführten Tests des Projektberichts abgleichen.

## 9. Wiederkehrende Reviews

### Ergänzung aus dem technischen Abschlusstest am 7. September 2026

Die vier realen 3D-Modelle laden nach ausdrücklicher Aktivierung neben Spline auch Googles Draco-Decoder über `www.gstatic.com/draco/versioned/decoders/1.5.2/` und Modellschriften über `fonts.gstatic.com`. Diese tatsächlichen Empfänger/Datenflüsse sind in das Bearbeitungs- und Lieferantenverzeichnis aufzunehmen. Die öffentlichen Datenschutzhinweise wurden entsprechend ergänzt. Die Sandbox verhindert den Zugriff auf die Hauptseite und deren Speicher; sie verhindert keine Übermittlung von IP-Adresse und Verbindungsdaten an diese Anbieter. Länder, Rollen und konkrete Übermittlungsgrundlagen bleiben anhand der tatsächlichen Anbieterbedingungen zu belegen. Dieser Test ersetzt den offenen Auslandsnachweis nicht.

Ein Quellcode-Backup mit Wiederherstellung und Hashvergleich von 519 Dateien wurde erfolgreich geprüft. Es liegt auf demselben Computer und erfüllt deshalb noch nicht das Soll einer unabhängigen externen Ausfallsicherung. Kontoeinstellungen, Kundenpost und Git-Historie sind nicht Bestandteil dieser Sicherung.

Monatlich: Rechteanfragen, offene Vorfälle, Löschliste, Kontowarnungen. Vierteljährlich: Benutzerrechte, Provideränderungen, laufende Automationen/Kosten, Restore-Stichprobe. Jährlich: tatsächliche Bearbeitungen gegen Datenschutzerklärung, Markt-/Produktänderungen, Aufbewahrungsgründe und Vertragsset. Diese Frequenzen sind Organisationsvorschläge, keine behaupteten gesetzlichen Universalfristen.

Vor jeder Featureänderung: Datenfluss aufzeichnen → Notwendigkeit minimieren → Rolle/Provider/Länder prüfen → gegebenenfalls Folgenabschätzung/Verträge → Information und erforderliche Wahlmöglichkeiten → technische Prüfung mit fiktiven Daten → dokumentierte Freigabe. Bei hochriskanten Daten oder automatisierten bedeutenden Entscheidungen fachliche Zusatzprüfung auslösen.
