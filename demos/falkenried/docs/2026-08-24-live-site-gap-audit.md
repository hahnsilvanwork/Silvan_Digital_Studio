# Vollständiger Live-Site-Abgleich: Falkenried Gruppe

Stand: 24. August 2026\
Zielgruppe: Projektteam der neuen Astro-Website\
Vergleich: öffentlich erreichbare Live-Präsenz gegen den aktuellen Stand in `src/pages`

## Direkte Antwort

Die neue Website bildet die drei Unternehmensbereiche und die wichtigsten Kontaktwege bereits gut ab. Sie ist jedoch noch keine vollständige inhaltliche Ablösung der Live-Präsenz. Die grössten Lücken sind das vollständige Immobilienportfolio, aktuelle Mietangebote, Mieter-Dokumente, der detaillierte BMW-Service samt Terminplaner und Occasionen, die einzelnen Gartenbau-Leistungen mit Referenzgalerien sowie redaktionelle Inhalte wie Aktuelles, Jobs und Veranstaltungen.

Die Live-Präsenz besteht aus drei miteinander verlinkten Websites:

- [falkenried.example](https://falkenried.example) für Dachmarke und Immobilien
- [garage.falkenried.example](https://falkenried.example) für BMW-Service, Fahrzeugverkauf, Zubehör und Servicestation
- [garten.falkenried.example](https://falkenried.example) für Gartenbau, Gartenunterhalt, Referenzen und Fachbeiträge

Die Sitemaps und öffentlichen WordPress-Schnittstellen enthielten beim Abruf insgesamt 172 Seiten-, Beitrags- und Portfolio-Einträge. Darunter befinden sich Dubletten und ältere Meldungen; die Zahl ist daher kein Zielwert für die neue Navigation.

## Priorisierte Lückenmatrix

| Prio | Bereich | Auf der Live-Präsenz vorhanden | Im Astro-Projekt | Empfehlung |
|---|---|---|---|---|
| P0 | Stammdaten | echte Öffnungszeiten, Schliessungstage, UID Fiktives Beispielunternehmen, Teamdaten | teilweise Platzhalter oder nicht vollständig | vor jedem öffentlichen Launch verifizieren und ersetzen |
| P0 | Formulare | Termin- und Mietinteressenten-Wege, E-Mail-Kontakte, PDF-Formulare | Formulare vorhanden, Zustellung ohne Schlüssel nicht aktiv | Zustellung, Spam-Schutz, Einwilligung und Erfolgs-/Fehlerzustände produktiv machen |
| P0 | Immobilienangebote | zwei aktuelle Angebote mit Preis, Verfügbarkeit und Formular | drei exemplarische Karten mit „Preis auf Anfrage“ | echte Angebotsdaten verwenden; abgelaufene Angebote automatisch ausblenden |
| P1 | Mietobjekte | sechs Portfolio-Kacheln bzw. fünf konkrete Standorte plus Angebotsübersicht | nur einzelne Angebotskarten | eigene Portfolio-Übersicht und Detailseiten umsetzen |
| P1 | Mieter-Dokumente | allgemeine Merkblätter sowie objektbezogene Hausordnungen und Anleitungen | fehlt | Dokumentencenter mit Kategorien, Objektfilter und PDF-Downloads |
| P1 | BMW-Termin | externer Soft-NRG-Onlineterminplaner | nur Anfrageprozess beschrieben | Terminplaner als klarer externer CTA, nicht als internes Formular vortäuschen |
| P1 | BMW-Service | Gratisservice, Garantie, RBV, Rückrufe, Checks, Reparaturen und FAQ | generische Serviceübersicht | verifizierten Leistungskatalog und Live-FAQ übernehmen |
| P1 | BMW-Angebot | Occasionen via Autolina, Fahrzeugberatung, Zubehör, Tankstelle, Laden, Waschen | nur Zusammenfassung auf einer Seite | eigene Abschnitte/Unterseiten und externe Occasionen-Einbindung |
| P1 | Gartenbau | 19 Portfolio-Einträge und zahlreiche Bildergalerien | breite Zusammenfassung auf einer Seite | Leistungs-Hub plus priorisierte Detailseiten und Referenzen |
| P1 | Recht/SEO | spezifische Datenschutztexte, Impressum, bestehende indexierte URLs | Entwürfe und neue URL-Struktur | juristisch prüfen; vollständige 301-Redirect-Matrix erstellen |
| P2 | News | aktuelle Meldungen, Tipps, Veranstaltungen und saisonale Angebote | fehlt | gemeinsamer News-/Ratgeberbereich mit Bereichsfiltern |
| P2 | Team/Über uns | echte Namen, Rollen, Fotos und Immobiliengeschichte | teils Platzhalter | zentrale Teamdatenquelle und echte Porträts |
| P2 | Jobs/Partner | Stellenmeldungen und Immobilienpartner | fehlt | schlanke Jobs- und Partnerseiten, nur bei aktuellem Inhalt anzeigen |

## Schwerpunkt: „Unsere Mietobjekte“

Die Live-Seite [Unsere Mietobjekte](https://falkenried.example) ist keine reine Liste freier Wohnungen. Sie zeigt das gesamte eigene Immobilienportfolio und trennt dieses von „Aktuell zu vermieten“.

### Zu übernehmende Portfolio-Struktur

- Schleinikon Wasen, Rotbuechstrasse 12 und 14: 18 Wohnungen, 2.5/3.5/4.5 Zimmer, Tiefgaragen- und Aussenparkplätze, zwei Bastelräume
- Schleinikon Wasen, Rotbuechstrasse 7 und 7A: umgebautes Bauernhaus und Spycher, drei Wohnungen, 2.5/5.5 Zimmer, Garagenplätze
- Boppelsen: eine 5-Zimmer-Terrassenwohnung
- Zürcher Unterland Gewerbehaus, Steinbruggstrasse 21: Büro-/Gewerberäume, Parkplätze und Einstellhalle mit XL/XXL-Plätzen und Stromanschluss
- Zürcher Unterland Chlupf, Musterweg 12: sechs Wohnungen, 2.5/3/4 Zimmer sowie Einzel- und Doppel-Tiefgaragenplätze; BMW-Werkstatt im Erdgeschoss
- separate Kachel „Aktuell zu vermieten“ als Einstieg in verfügbare Angebote

### Sinnvolle Umsetzung

1. `/immobilien/objekte/` als dauerhaftes Portfolio mit Filtern nach Ort und Typ.
2. Detailseite pro Liegenschaft mit Galerie, Adresse/Karte, Einheiten, Ausstattung und zugehörigen Dokumenten.
3. `/immobilien/angebote/` nur für aktuell freie Einheiten mit Preis, Nebenkosten, Verfügbarkeit und eindeutiger Objekt-ID.
4. Objektbezogenes Anfrageformular; die Objekt-ID wird automatisch mitgesendet.
5. „Derzeit nichts frei“-Zustand plus Interessentenliste statt erfundener Angebote.
6. Datenmodell in einer zentralen JSON-/Content-Collection, damit Portfolio und Angebote nicht doppelt gepflegt werden.

Beim Abruf waren beispielsweise ein Aussenparkplatz in Schleinikon für CHF 60 pro Monat ab 1. September 2026 sowie ein Gewerberaum an der Steinbruggstrasse 21 für CHF 520 plus CHF 120 Nebenkosten ab 1. Oktober 2026 publiziert. Diese Angaben sind zeitabhängig und dürfen nicht statisch als dauerhaft verfügbar behandelt werden.

## BMW: wichtige Inhalte, die noch fehlen oder zu knapp sind

- verifizierte Öffnungszeiten: Montag bis Donnerstag 07:30–12:00 und 13:00–17:30, Freitag bis 17:00, Samstag 08:30–13:00; letzter Samstag im Monat geschlossen; Feiertagsabweichungen separat pflegen
- direkter Link zum bestehenden [Soft-NRG-Terminplaner](https://plan.soft-nrg.com/group/Li8GQSzNltgAKXob-RNkuJzMnSdECQI2mJGL8-Sk8lluIZ7zOitg4g/signin)
- BMW Gratisservice, Garantiearbeiten, Rückrufe und offizieller RBV-Betrieb für den Kanton Zürich
- Servicekatalog: Wartung, Diagnose, Reparaturen, Reifen/Räder, Klima, Batterie, Glas-, Carrosserie- und Hagelschäden sowie saisonale Checks
- Fahrzeugverkauf inklusive Finanzierung/Leasing, ConnectedDrive-Beratung und Occasionen
- Occasionen-Einbindung von Autolina oder alternativ gepflegte externe Fahrzeuglinks
- BMW Originalzubehör mit Offertanfrage
- Tankstelle: Diesel/Bleifrei, 24/7, Kartenzahlung/TWINT und Firmen-Monatsrechnung
- öffentliche E-Ladestation, Selbstbedienungs-Waschanlage und Staubsauger mit bestätigten Betriebs-/Zahlungsdetails
- vollständiges echtes Team; auf der Live-Seite ist mindestens Jonas Lindberg als Geschäftsführer, Verkäufer und Serviceberater genannt
- Live-FAQ statt unbestätigter Formulierungen aus dem Neubau

## Gartenbau: wichtige Inhalte, die noch fehlen oder zu knapp sind

Die neue Seite deckt Planung, Gestaltung und Unterhalt als Themen ab, lässt aber viele kaufentscheidende Leistungen und Bildbelege weg:

- Gartenbau und Gartengestaltung
- Gartenunterhalt und Bepflanzung
- Muldenservice mit 1,5 bis 7 m³ sowie Transporte mit Kran
- Rasenpflege, Schneidarbeiten, Unkrautbekämpfung, Rosenpflege und Pflanzenschutz
- Wischen, Lauben, Giessen, Ferienservice und Schneeräumen
- Bepflanzung und Pflanzkonzepte
- Grabunterhalt/Friedhof sowie Zusammenarbeit mit Pro Luminate
- Planung und 3D-Visualisierung
- Wasser im Garten, Spielplätze, Steingärten, Zäune/Absturzsicherungen, Sichtschutz/Hecken, Natursteinmauern sowie Wege/Plätze/Treppen
- Be-/Entwässerung, Regenwassernutzung und saisonale Unterhaltsverträge
- echte Projektgalerien und Referenzen pro Leistung

Empfehlung: nicht 19 gleichrangige Navigationspunkte erzeugen. Besser sind drei Hubs „Gestaltung“, „Unterhalt“ und „Weitere Dienste“, darunter indexierbare Detailseiten für Leistungen mit eigener Nachfrage und guten Referenzbildern.

## Dachmarke, Kontakt und Unternehmen

- Die Startseite nennt Lukas Falkenried für Gartenbau, Jonas Lindberg für BMW und Mara Linden für Immobilien. Diese Zuordnung ist eine bessere Grundlage als die aktuellen Platzhalter, muss aber vor Veröffentlichung bestätigt werden.
- Das Immobilien-Team nennt Mara Linden (Geschäftsführerin), Nora Feldmann (Sachbearbeiterin Immobilien) und Lukas Falkenried (technischer Unterhalt).
- Die Immobiliengeschichte erklärt den Start des Familienunternehmens 1969, Mietwohnungen beim Garagenneubau und ein eigenes Verwaltungsteam seit 2013.
- Kontaktangaben enthalten zusätzlich Fax Nicht verf?gbar und das E-Mail-Schema `vorname.nachname@falkenried.example`.
- Instagram und Facebook sollten nur eingebunden werden, wenn Zuständigkeit und laufende Pflege geklärt sind.

## Neue Features mit zusätzlichem Nutzen

### Hoher Nutzen

1. **Zentrale Inhaltsverwaltung:** Astro Content Collections oder ein kleines Headless CMS für Angebote, Team, Öffnungszeiten, News und Referenzen. Zeitabhängige Inhalte dürfen nicht im Seitencode verstreut sein.
2. **Objekt- und Angebotsdatenmodell:** Portfolio, Verfügbarkeit und Dokumente werden über stabile IDs verknüpft.
3. **Formular-Routing:** BMW-, Gartenbau- und Immobilienanfragen gehen je nach Anliegen an die richtige Stelle; Quelle, Sprache und Objekt/Leistung werden mitgesendet.
4. **Aktualitätsregeln:** Angebote, Events, Ferienmeldungen und Jobs erhalten Start-/Enddatum und verschwinden automatisch oder wechseln ins Archiv.
5. **Standort-/Bereichs-Öffnungszeiten:** reguläre Zeiten, Sondertage und 24/7-Angebote wie Tankstelle klar getrennt.

### Mittlerer Nutzen

6. **Referenzfinder Gartenbau:** Filter nach Leistung, Stil und Projektart; jedes Projekt führt zu einer passenden Anfrage.
7. **Mieterportal light:** öffentliches Dokumentencenter plus Reparatur-/Schadenmeldung mit Liegenschaftsauswahl; sensible Dokumente nicht öffentlich ablegen.
8. **Service-Erinnerung:** unverbindliche Anfrage für Reifenwechsel, Klima-, Batterie- oder Saisoncheck; keine komplexe Werkstattsoftware nachbauen.
9. **News-Hub mit Bereichsfiltern:** BMW, Gartenbau, Immobilien, Unternehmen; strukturierte Daten und Ablaufdatum für kurzfristige Meldungen.
10. **Suche:** sinnvoll erst nach Aufbau der vielen Leistungs-, Ratgeber- und Objektseiten.

### Später prüfen

11. **Mehrsprachigkeit je Inhalt:** Englisch nur dort weiterführen, wo echte Nachfrage besteht; aktuelle Angebote und News benötigen sonst doppelte Pflege.
12. **Bewertungs-/Referenzsignale:** echte Kundenstimmen oder Google-Bewertungen nur mit Einwilligung und belastbarer Quelle.
13. **PWA/Push oder Kundenkonto:** derzeit zu hoher Pflege- und Datenschutzaufwand im Verhältnis zum erwartbaren Nutzen.

## Empfohlene Umsetzungsreihenfolge

1. Stammdaten, UID, echte Teams, Öffnungszeiten und Sondertage verifizieren.
2. Formulare und Zustellung produktiv machen; Datenschutztexte prüfen.
3. Immobilienportfolio und aktuelle Angebote datengetrieben umsetzen.
4. Mieter-Dokumentencenter erstellen.
5. BMW-Terminplaner, Service, FAQ, Occasionen und Servicestation ergänzen.
6. Gartenbau-Leistungshubs, Detailseiten und Referenzgalerien aufbauen.
7. News, Jobs und Partner als pflegbare Inhalte ergänzen.
8. Redirect-Matrix für jede indexierte alte URL und beide Subdomains ausrollen.
9. Analytics, Search Console, strukturierte Daten, Performance und Barrierefreiheit vor Launch prüfen.

## Quellen und Grenzen

Primärquellen waren die öffentlichen Seiten und Sitemaps von [falkenried.example](https://falkenried.example), [garage.falkenried.example](https://falkenried.example) und [garten.falkenried.example](https://falkenried.example), abgerufen am 24. August 2026. Zusätzlich wurden die öffentlich erreichbaren WordPress-Inhalte dieser drei offiziellen Domains ausgelesen und mit den Astro-Routen im lokalen Projekt verglichen.

Die Prüfung erfasst veröffentlichte Inhalte und verlinkte Funktionen, aber keine internen Abläufe, Formularzustellung, geschützten Dokumente oder analytischen Nutzungsdaten. Zeitabhängige Preise, Personalangaben, Öffnungszeiten und rechtliche Texte sind vor Übernahme von Falkenried Gruppe zu bestätigen. Die automatisierte Browseransicht war in dieser Sitzung nicht verfügbar; daher erfolgte eine strukturelle und inhaltliche Prüfung über HTML, Sitemaps und die öffentlichen WordPress-Schnittstellen, keine vollständige visuelle Prüfung jeder Live-Seite.
