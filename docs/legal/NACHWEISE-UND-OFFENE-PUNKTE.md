# Nachweise, Entscheidungen und offene Punkte

Stand: 7. September 2026. Interner Freigabestatus für SILVAN Digital Studio. Eine korrigierte Websitekopie ist keine Bestätigung von unbekannten Unternehmens-, Provider- oder Produktfakten. Verantwortlicher für betriebliche Angaben: Silvan Hahn. Diese Liste verlangt keine unnötige Veröffentlichung vertraulicher Dokumente.

## 1. Bestätigter Kontobefund

Die technische Hauptprüfung hat am 7. September 2026 über authentifizierten Vercel-API-Zugriff für das Konto `silvan1` **`billing.plan=hobby`, Status aktiv** festgestellt. Das Hauptprojekt wurde der Region `iad1` zugeordnet. Die Region ist eine technische Konfigurationsangabe, keine Zusicherung exklusiver Datenhaltung und keine vollständige Länderliste für CDN, Logs oder Support.

Vercel beschränkt Hobby auf persönliche, nicht kommerzielle Nutzung. Die Website wirbt entgeltliche Leistungen an; damit ist der Tarifkonflikt jetzt **bestätigt, nicht nur hypothetisch**. Der aktuelle DPA benennt Pro/Enterprise als erfasste Pläne; ein für dieses Hobby-Konto anwendbarer Auftragsbearbeitungsvertrag ist nicht nachgewiesen. [Vercel Hobby](https://vercel.com/docs/plans/hobby), [Vercel DPA](https://vercel.com/legal/dpa).

**Erforderliche konkrete Entscheidung:** zulässiger Vercel-Tarif mit passendem Vertrag oder Wechsel auf passend abgesichertes Hosting. Es wurde durch die Dokumentenerstellung weder ein Tarif gekauft noch Hosting gewechselt. Eine blosse Tarifumbenennung in der Datenschutzerklärung ist keine Lösung. Bei Migration alle Demos, Domains, Logs, Integrationen und Löschung beim Altanbieter berücksichtigen.

## 2. Nachweismatrix

| ID/Priorität | Frage/aktueller Status | Nachweis oder Entscheidung | Eigentümer | Zeitpunkt |
|---|---|---|---|---|
| U01 hoch | Vollständiger Betreibername/Adresse laut Website vorhanden, Aktualität nicht unabhängig bestätigt | kurze Bestätigung; bei Firmenänderung amtlicher Eintrag | Silvan | vor verbindlichen Offerten/Publikation geänderter Angaben |
| U02 hoch | AHV-Status unbekannt | Anerkennung/Anmeldung bei zuständiger Kasse und allfällige Rückfragen | Silvan/Kasse | jetzt klären; nicht auf CHF100'000 warten |
| U03 hoch | HR-Status unbekannt | Zefix/HR-Auszug bzw. dokumentierte Eintragspflichtprüfung mit Umsatz/Tätigkeit | Silvan/Treuhand | jetzt und jährlich/bei Schwelle |
| U04 hoch | MWST-Status unbekannt | UID/MWST-Auszug oder dokumentierte ESTV-/Treuhandprüfung | Silvan/Treuhand | vor Steuerbehauptungen und Rechnungen |
| U05 mittel | Einnahmen-/Ausgaben-/Vermögenserfassung nicht geprüft | System, Abschlussrhythmus, Belegarchiv; keine Steuerunterlagen ins Repo | Silvan/Treuhand | sofort organisatorisch |
| U06 bedingt | Bezugsteuer/Einfuhrsteuer nicht geprüft | Ausländische Servicebezüge kumulieren; Lieferimporte prüfen | Silvan/Treuhand | vor relevanten Schwellen/Importen |
| M01 hoch | CH/EU und B2B/B2C unbekannt | tatsächliche Werbung, Annahmepraxis, Lieferländer schriftlich festlegen | Silvan | vor länderspezifischer Freigabe |
| H01 blockierend | Vercel Hobby aktiv bestätigt | zulässiger Tarif oder alternative Hostingentscheidung | Silvan | vor kommerziellem Weiterbetrieb auf abgesicherter Grundlage |
| H02 hoch | Vercel DPA für Hobby nicht nachgewiesen | passender Vertragseinbezug mit neuem Tarif/Anbieter; Versionsbeleg | Silvan | mit H01 |
| H03 hoch | komplette Hostingstaaten/Transferkette offen | dienstbezogene Unterauftragnehmerliste, Support/Logländer, CH-DPF- oder SCC-Beleg | Silvan/Provider | vor vollständiger Datenschutzfreigabe |
| D01 hoch | Gmail-Kontotyp unbekannt | Konto-/Tarifbestätigung, Vertragspartei, DPA soweit angeboten, Einstellungen | Silvan | vor behaupteter Auftragsbearbeiterabsicherung |
| D02 hoch | Spline-USA, Garantie nicht nachgewiesen | aktuelle geeignete Grundlage oder Dienst deaktivieren/lokal ersetzen mit Lizenz | Silvan/Provider | vor unbeschränkter Freigabe der Einbindung |
| D03 mittel | WhatsApp-App/API/Backups unbekannt | App-Typ, relevante Bedingungen, Adressbuchrechte, Backup/Ende-zu-Ende-Optionen | Silvan | vor Kundenprozessfreigabe |
| D04 mittel | weitere Betriebsanbieter unbekannt | Bank/Treuhand/Cloud/Versand/CRM/AI konkret inventarisieren | Silvan | vor ihrem Einsatz mit Personendaten |
| D05 hoch | öffentliche Länder-/Garantieangaben noch unvollständig belegbar | `legal-content.ts` mit tatsächlicher Matrix und Transferbasis abschliessen | Silvan + Umsetzung | nach H03/D01/D02 |
| D06 mittel | Lösch-/Auskunfts-/Vorfallsprozess nur als Entwurf | `DATENSCHUTZ-BETRIEB.md` annehmen und echte Abläufe einrichten | Silvan | vor Behauptung fest gelebter Fristen |
| D07 bedingt | Analytics aktuell off laut Vorprüfung | vor Einschalten Datenfluss/Identifier/Länder/Information/Wahlmöglichkeiten prüfen | Silvan | vor Aktivierung |
| C01 hoch | konkrete Vertragsvorlagen jetzt erstellt, noch nicht beschlossen | pro Auftrag ausfüllen, Preis/Laufzeit/Abnahme/Rechte wählen | Silvan/Kunde | vor Annahme eines Auftrags |
| C02 bedingt | Kundendatenzugriff | Rollen-, TOM- und Unterauftragnehmeranhang vereinbaren | Silvan/Kunde | vor erstem Datenzugriff |
| P01 blockierend je Produkt | Hersteller/Importeur/Eigenmarke unbekannt | Lieferant, Herkunft, Vertrags-/Rollenbeleg je Variante | Silvan/Lieferant | vor Vertrieb/Lieferzusage betreffender Variante |
| P02 blockierend je Produkt | Sicherheit/Funk-/Materialnachweise unbekannt | Produktakte, technische Klassifikation, erforderliche Erklärungen/Tests | Silvan/Lieferant/Fachstelle | vor Angebot/Inverkehrbringen soweit vorgeschrieben |
| P03 hoch | Versand/Kosten/Zielmarkt offen | Versandmatrix, Gesamtpreis und Lieferzeit pro Auftrag | Silvan | vor verbindlicher Annahme; B2C-Angebot früher transparent |
| P04 mittel | Charge/Reklamation/Recall-Prozess unbelegt | Register und Ansprechpartner einrichten | Silvan | vor Auslieferung |
| P05 bedingt | EU-GPSR/RED-Vertrieb | EU-Rollen/Onlineangaben und Produktregime prüfen | Silvan/Fachstelle | vor EU-Angebot/Vertrieb |
| R01 hoch | Google-Logo auf physischen Produkten/Lizenzen offen | erlaubte Nutzung oder markenneutrale Gestaltung | Silvan | vor Druck/Verkauf und Abbildung betroffener Ware |
| R02 mittel | Demos/Medien/Fonts/Modelle nicht vollständig lizenziert dokumentiert | Assetregister mit Lizenzversion und Erwerbsbeleg | Silvan | vor abschliessender Portfoliofreigabe |
| R03 bedingt | echte Kundenreferenzen derzeit keine | separate Freigabe und echte Aussage/Ergebnisse | Silvan/Kunde | vor späterer Veröffentlichung |
| R04 bedingt | Google-Profilverwaltung für KMU | Kundenautorisierung, Gebühren-/Kundenhinweis, Rollen- und Austrittsprozess gemäss Google-Policy | Silvan/Kunde | vor Profilverwaltung |
| S01 hoch | tatsächliche MFA/Rollen/Backups nicht vollständig nachgewiesen | private Nachweise und Restore-Test | Silvan | betrieblich zeitnah |

«Blockierend» bezieht sich auf die konkret betroffene Nutzung/Produktfreigabe; es behauptet kein behördlich ausgesprochenes Betriebsverbot. Fehlende Lieferantendokumente im Repository belegen nicht automatisch, dass sie nirgendwo existieren.

## 3. Nachweise sinnvoll erheben

Für jede Zeile eine private Evidenz-ID vergeben: `[ID, Titel, Quelle, Datum, Geltungsbereich, Ergebnis, nächster Review]`. Wo möglich reichen relevante Bestätigungen oder geschwärzte Auszüge. Steuererklärungen, private Kontodaten oder Ausweiskopien sind nicht zur Veröffentlichung bestimmt.

**Hosting:** Tarifrechnung/Settings, DPA mit Version/Einbezug, Vertragspartei, relevante Subprocessor-Liste, tatsächlich benutzte Features, Region/Logs/Supportdaten, aktueller Swiss-US-DPF-Eintrag falls darauf gestützt. Ein Browser-IP-Geolookup ist kein Nachweis einer vollständigen Transferkette.

**NFC:** Rechnung/Lieferschein, Herstelleranschrift, genaue Typen-/Chargenbezeichnung, Material/Chip/Antennendaten, gültige erforderliche Konformitätsunterlagen für das Endprodukt, Produkt-/Verpackungskennzeichnung, Nutzungs- und Warnhinweise, Rückverfolgbarkeit. Keine fremde Konformitätserklärung für ein nur ähnlich aussehendes Modell verwenden.

**Assets:** lokale Datei, Originalquelle, Urheber, Lizenzversion am Erwerbstag, kommerzieller Nutzungsumfang, Bearbeitung/Weitergabe/Attribution, Kaufbeleg oder Erstellungsnachweis. «Von Google Bilder» und «von KI» sind keine vollständigen Lizenznachweise.

## 4. Review der überarbeiteten öffentlichen Rechtstexte

Am 7. September 2026 wurde die neue `src/content/legal-content.ts` als Entwurf gegengelesen. Gegenüber der Ausgangsfassung sind insbesondere verbessert: keine unbestätigten HR-/MWST-Statusbehauptungen, korrekte WhatsApp-Gesellschaft, klare Trennung von Anfrage und Vertrag, Einbezug der Demos, differenzierte Rechte und Aufbewahrung, keine pauschalen Haftungsausschlüsse.

**Materiell offen bleibt die Auslandabsicherung:** Der Text erklärt derzeit, welche Mechanismen abhängig vom Einzelfall erforderlich sein können. Er belegt noch nicht, welcher Mechanismus für jeden tatsächlichen Datenfluss gilt. Verweise auf weitere Länder in Providerinformationen ersetzen keine abgeschlossene Prüfung der erforderlichen Länder-/Garantieinformation. Insbesondere H01–H03 und D01–D02 sind durch den neuen Text nicht erledigt. [EDÖB: Internet-Datenschutzerklärungen](https://www.edoeb.admin.ch/de/datenschutzerklaerungen-im-internet), [EDÖB: Auslandbekanntgabe](https://www.edoeb.admin.ch/de/bekanntgabe-von-personendaten-ins-ausland).

**Preisentscheidung:** Die Aussage, veröffentlichte Beträge enthielten allfällige gesetzliche Abgaben, ist eine wirtschaftliche Zusage. Silvan muss diese Beträge bei entsprechender Steuerpflicht als Bruttopreise handhaben oder das Angebot vor neuer Verwendung konsistent ändern. Später einfach MWST auf einen ausdrücklich als abgabeninklusive publizierten Preis aufzuschlagen wäre widersprüchlich. Versand im B2C-Angebot rechtzeitig konkretisieren.

**Technische Wahrheitsprüfung:** Aussagen wie «erst auf Klick», «keine Cookies durch die eigene Anwendung», «keine Serveranfragen aus Demoformularen» müssen anhand der finalen Implementierung und No-JS-/Hydration-/Fehlerfälle bestätigt werden. Dieser Dokumentenreview ersetzt diese Prüfung nicht.

## 5. Zu treffende Entscheidungen

1. Welcher rechtlich/vertraglich passende Hostingweg soll verwendet werden? Kostenpflichtige Änderung erst nach tatsächlicher Auswahl ausführen.
2. Sollen Angebote auf Schweizer Geschäftskunden beschränkt sein, und entspricht das der Annahmepraxis? Keine künstliche Beschränkung in Texte schreiben, wenn tatsächlich anders verkauft wird.
3. Welche Preis-/Versand-/Zahlungs-/Wartungsbedingungen werden wirtschaftlich angeboten? Nicht von einer Vorlage stillschweigend entscheiden lassen.
4. Welche NFC-Varianten sind mit welchen Lieferantenunterlagen tatsächlich verkaufsbereit?
5. Welche Kommunikation/Cloud bleibt im Betrieb und welche passende vertragliche Absicherung wird verwendet?

Diese Entscheidungen sind echte unbekannte Tatsachen oder wirtschaftliche Bindungen. Reversible technische Korrekturen, Lesbarkeitsverbesserungen und interne Entwürfe können unabhängig davon vorbereitet werden.

## 6. Abschlussblatt pro Freigabe

`Gegenstand/Version:` `[ ]`  
`Geprüfter Zielmarkt/Kundentyp:` `[ ]`  
`Betroffene IDs oben:` `[ ]`  
`Nachweise und Prüfergebnis:` `[ ]`  
`Technischer Test-/Buildbeleg:` `[ ]`  
`Verbleibende Einschränkungen:` `[ ]`  
`Konkrete Entscheidung:` `[Freigabe / eingeschränkte Freigabe / noch nicht freigegeben]`  
`Entscheidende Person/Datum:` `[ ]`  
`Nächster Review/Auslöser:` `[ ]`

Kein allgemeines Häkchen «alles legal». Jede Freigabe benennt ihren sachlichen Umfang. Rechtsnormen und Providerbedingungen können sich ändern; vor neuen Märkten oder Produktvarianten erneut prüfen.
