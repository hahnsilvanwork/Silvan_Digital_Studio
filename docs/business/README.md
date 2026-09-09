# Betriebswerkzeuge

Stand: 9. September 2026. Verantwortlich für echte Betriebsangaben: Silvan Hahn. Diese Vorlagen enthalten keine Kundenfälle, Testergebnisse oder bestätigten Kosten. Ausgefüllte Kopien ausschliesslich privat unter `artifacts/business/` aufbewahren. Der Ordner ist bereits in `.gitignore` ausgeschlossen und muss separat gesichert werden.

| Aufgabe | Vorbereitet und geprüft | Für tatsächlichen Abschluss noch nötig |
|---|---|---|
| U12 Wirtschaftlichkeit | `artifacts/business/Betriebskalkulation.xlsx`: Website-Stufen, NFC-Staffeln, Grenzkosten und Kostendeckung | Echte Kosten, Arbeitszeiten, Steuerbasis und Leistungsgrenzen durch Silvan eintragen; Einstiegsangebote beurteilen |
| U13 Messung und Leadprozess | Leeres Anfragenregister im Workbook; [Messdefinitionen](MESSUNG.md), monatliche Messvorlage und Anfrageablauf | Tatsächliche Antwortorientierung festlegen; interne Testanfrage durchspielen; extern aktivierte Messung tatsächlich prüfen |
| U14 Betreuung, Übergabe und Betriebsnachweise | [Ablauf und Übergabe](ABLAUF-UND-UEBERGABE.md), Support-/Reklamationsablauf und Verweis auf führende Nachweismatrix | Projektbezogene schriftliche Betreuungsvereinbarungen sowie tatsächliche Anbieter-/Produktnachweise vervollständigen |
| U15 SEO-Suchziele und qualitative Nutzertests | [Suchintentionen](SEO-INTENTIONEN.md), Baseline-CSV, [Protokoll für fünf Personen](NUTZERTEST.md) und leere Beobachtungs-CSV | Authentifizierte Search-Console-Ausgangsdaten erheben; fünf geeignete Personen rekrutieren, beobachten und auswerten |

Die Nummern bezeichnen den Umsetzungsplan vom 9. September und nicht die ähnlich nummerierte Nachweismatrix im Rechtsdossier. Der Release-Verantwortliche hat am 9. September erneut authentifiziert: Vercel Hobby ist aktiv. Silvan übernimmt das Upgrade selbst. U02 des Umsetzungsplans bleibt bis zur tatsächlichen Umstellung und Prüfung der passenden Anbietervereinbarung offen. Es wurde hier kein Tarif gekauft oder gewechselt.

Silvan hält Einkaufskosten privat und trägt sie selbst in die Arbeitskopie ein. Es sind keine weiteren Kostenangaben für die Erstellung dieser Vorlage erforderlich. **CHF 90/h ist als veränderbare interne Startannahme voreingetragen**, auf Wunsch als Ausgangspunkt für die Kalkulation. Der Betrag ist kein gemessener eigener Kostenwert und kein veröffentlichter Verkaufstarif. Er soll zunächst eigene Vergütung und Sozialkosten abdecken; separat berechnete Gemeinkosten nicht doppelt einrechnen. Silvan prüft die Annahme anhand tatsächlicher verfügbarer Arbeitszeit und eigener Kosten. Es wurden keine öffentlichen Preise verändert.

## Kalkulation verwenden

1. Workbook öffnen und unter einem privaten Projektnamen kopieren. Blaue Felder sind Eingaben, Formelzellen bleiben erhalten. Der Builder überschreibt die generierte Vorlage; niemals zur Aktualisierung einer ausgefüllten Arbeitskopie starten.
2. Im Blatt **Kosten** die Startannahme CHF 90/h prüfen und bei Bedarf ändern. Sachgerechten Projekt-Gemeinkostenanteil, Aufschlag, bestätigte Steuerquote und monatliche Fixkosten selbst eintragen. Quellen/Datum daneben festhalten. Unbekannte echte Kosten bleiben leer. Eine echte Null muss ausdrücklich eingetragen werden.
3. In **Websites** den konkreten angebotenen Bruttopreis und sämtliche Stunden einschliesslich Beratung, Administration, Korrekturen und Support eintragen. Die öffentlichen Preisgrenzen sind Orientierung, keine zugesicherte Stundenanzahl. Direktkosten umfassen nur Kosten dieses Projekts. Laufende Kundenabos nur für den ausdrücklich im Angebot enthaltenen Zeitraum einrechnen.
4. In **NFC** Menge und reale Kosten eintragen. Die Formel folgt der aktuellen Staffel: erstes Stück `first`, zwei Stück zusammen `pair`, ab drei `pair + (Menge − 2) × additional`. Mehrere Standard-Aufsteller benötigen ein individuelles Angebot. Über zehn Stück bleibt die Formel ein Richtpreis vor weiterem Rabatt.
5. Versandkosten werden konservativ als Kosten erfasst; die Vorlage enthält keinen Versanderlös. Wenn Versand separat kostendeckend berechnet wird, für eine Produktkalkulation beide Seiten weglassen und Versand in der Offerte separat abstimmen. Ein negativer Grenzbeitrag bedeutet, dass weitere Stücke den Gewinn vermindern.

**Formeln:** Vollkosten = Direktkosten + Gesamtzeit × Stundensatz + Gemeinkostenanteil. Ergebnis = Nettoerlös − Vollkosten. Mindest-Bruttopreis = Vollkosten × (1 + Risiko-/Gewinnaufschlag) × (1 + Steuerquote). Aufschlag ist ein Kostenaufschlag, keine Umsatzmarge. Maximal tragbare Stunden = (Nettoerlös − Direktkosten − Gemeinkostenanteil) / Stundensatz. Monats-Breakeven = aufgerundete Fixkosten / positiven Deckungsbeitrag vor Gemeinkostenanteil. Diese Monatsrechnung unterstellt identische Projekte und verfügbare Kapazität; sie ist keine Absatzprognose.

NFC-Grenzkosten je Stück = (Einkauf + Druck) / (1 − Ausschussquote) + Programmierminuten / 60 × Stundensatz. Reklamationskosten werden als realistisch begründeter Betrag je Auftrag eingegeben. Fixzeit enthält Gestaltung, Abstimmung, Versandabwicklung und Rechnungsarbeit. Die erste kostendeckende Menge ist kein Versprechen, dass jede höhere Menge wirtschaftlich ist.

Vor verbindlicher Offerte Leistungsgrenzen anhand [ABLAUF-UND-UEBERGABE.md](ABLAUF-UND-UEBERGABE.md) ausfüllen. Preise wurden durch die Kalkulation nicht verändert. Andere Leistungen können anhand derselben Vollkostenformel in einer privaten Kopie kalkuliert werden; es liegen keine bestätigten Presence-/Automation-Leistungszeiten vor.

## Wiederverwendbare Vorlage erzeugen

`create-toolkit.mjs` enthält öffentliche Preisanker, die explizite Startannahme CHF 90/h, Formeln und ansonsten leere Eingabefelder. Benötigt den gebündelten Node-Runtime und `@oai/artifact-tool` (über `load_workspace_dependencies` ermitteln). Aus dem Repository-Stamm `BUSINESS_NODE_MODULES` auf dessen `node_modules` setzen und das Skript mit dem gebündelten Node starten. Keine Installation oder externe Aktivierung erforderlich.

Geprüft: Export, Formel-Fehlersuche, visuelle Ansichten aller vier Blätter und temporäre synthetische Eingaben. Website: CHF 300 Erlös, CHF 20 Direktkosten, 4 h × CHF 50 und CHF 10 Gemeinkosten ergeben CHF 70 Ergebnis. NFC-Chips: 3 Stück ergeben CHF 30 Erlös, CHF 2 variable Kosten je Stück und CHF 10 Auftragskosten ergeben CHF 14 Ergebnis. Diese Prüfdaten sind im ausgelieferten Workbook wieder entfernt. Excel selbst wurde nicht geöffnet; die Rechenprüfung erfolgte mit Artifact Tool. Das Workbook enthält native Formeln und Datenvalidierungen.

## Offene Betriebsnachweise

Die [vorhandene Nachweismatrix](../legal/NACHWEISE-UND-OFFENE-PUNKTE.md) bleibt die führende Liste für Produktunterlagen, Anbietervereinbarungen, Steuerstatus und Rechte. Keine vertraulichen Belege in dieses Verzeichnis kopieren. Private Beleg-IDs genügen. Technischer Betrieb, Monitoring und Veröffentlichung folgen [OPERATIONS.md](../OPERATIONS.md).

## Abgleich mit dem Umsetzungsplan

Unabhängiger Dokumentenabgleich am 9. September mit U12–U15 in [WEBSITE-GESAMTANALYSE-2026-09-09.md](../WEBSITE-GESAMTANALYSE-2026-09-09.md): Die vorbereiteten Werkzeuge decken die vorgesehenen Themen ab. Die frühere Zuordnung „U14 Suchziele“ war unzutreffend und ist oben berichtigt. Fertige Vorlagen erfüllen noch nicht die tatsächlichen Abnahmekriterien des Plans.

Die echten Restaktionen ausserhalb der Dokumentenerstellung sind:

1. **U12, Silvan privat:** Kosten, Steuerbasis und Aufwand eintragen. Einstiegsangebote und Mengenrabatte mit diesen Werten rechnen, Leistungsgrenzen bestätigen. CHF 90/h allein belegt keine Wirtschaftlichkeit.
2. **U13, Silvan/Betrieb:** Antwortorientierung festlegen, Testanfrage intern vom Eingang bis zur Offerte nachverfolgen und tatsächliche Zeit erfassen. Analytics-/Eventaktivierung und Dashboard-Eingang in der realen Umgebung prüfen; Öffnungsereignisse bleiben von empfangenen Nachrichten getrennt. Konto-/Releaseprüfung liegt beim Release-Verantwortlichen.
3. **U14, Silvan mit Anbieter/Lieferant/Kunde:** Anwendbare Anbietervereinbarungen und modellbezogene Produktnachweise ablegen; unsichere Material-/Schutzeigenschaften zuordnen. Website-Betreuung pro Auftrag schriftlich vereinbaren und Übergabe protokollieren. Das gewählte Vercel-Upgrade selbst ausführen und den neuen Tarif/Vertrag belegen; dies gehört zugleich zum offenen U02. Bestehende Kartenbestands-/Lieferzeitangaben ersetzen keine vollständige Produktakte.
4. **U15, Silvan:** Search-Console-Zugang und Ausgangsmessung mit tatsächlichen Daten prüfen. Fünf geeignete Personen rekrutieren, die beschriebenen Aufgaben tatsächlich beobachten, Befunde und Änderungen dokumentieren. Ein Protokoll ohne durchgeführte Sitzungen ist kein Nutzertestnachweis.

Keine dieser tatsächlichen Prüfungen wird durch die Dateierstellung als erledigt ausgewiesen. Bereits bestätigte Geschäftsangaben werden nicht erneut angefragt.
