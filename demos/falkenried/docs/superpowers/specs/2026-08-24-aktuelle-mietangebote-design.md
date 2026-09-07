# Aktuelle Mietangebote – Design

Stand: 24. August 2026\
Status: vom Auftraggeber freigegeben

## Ziel

Aktuell freie Wohnungen, Gewerberäume und Parkplätze werden getrennt vom dauerhaften Portfolio gepflegt. Zeitabhängige Angaben verschwinden nach Ablauf automatisch aus der aktiven Übersicht und können nicht versehentlich dauerhaft als verfügbar erscheinen.

## Datenmodell

Eine eigene Content Collection speichert:

- stabile Angebots-ID und Slug
- zugehörige Liegenschafts-ID
- Kategorie: Wohnung, Gewerbe, Parkplatz oder Nebenraum
- Titel und Beschreibung DE/EN
- Adresse
- Nettomiete, Nebenkosten und optionale Zusatzkosten
- Verfügbar-ab-Datum
- Veröffentlichungs- und Ablaufdatum
- Status: aktiv, reserviert oder vermietet
- Flächen-, Zimmer- und Ausstattungsangaben
- Titelbild und Galerie
- Formularreferenz
- Quellseite und letzter Prüfzeitpunkt

## Ausgangsangebote

Als erste Datensätze dienen die am 24. August 2026 offiziell veröffentlichten Angebote:

- Aussenparkplatz in Schleinikon, CHF 60 pro Monat, verfügbar ab 1. September 2026 oder nach Vereinbarung
- Gewerberaum an der Steinbruggstrasse 21 in Zürcher Unterland, ca. 52 m², CHF 520 Nettomiete plus CHF 120 Nebenkosten, verfügbar ab 1. Oktober 2026 oder nach Vereinbarung

Diese Angaben werden mit Quelle und Abrufdatum gekennzeichnet und müssen vor einem öffentlichen Launch erneut bestätigt werden.

## Darstellung

- `/immobilien/angebote/` zeigt nur aktive, nicht abgelaufene Angebote
- Karten zeigen Preis, Nebenkosten, Verfügbarkeit, Ort und Typ
- Detailseiten zeigen Ausstattung, Galerie und zugehörige Liegenschaft
- objektbezogener CTA übergibt Angebots-ID und Titel an das Immobilienformular
- reservierte Angebote sind klar markiert und nicht mit „verfügbar“ gleichgesetzt
- wenn nichts frei ist, erscheint „Derzeit keine freien Objekte“ mit allgemeiner Kontaktmöglichkeit

## Ablaufregeln

Ein Angebot ist nur aktiv, wenn der Status `aktiv` ist und das Ablaufdatum nicht überschritten wurde. Reservierte, vermietete oder abgelaufene Datensätze bleiben für interne Pflege erhalten, erscheinen aber nicht in der aktiven Übersicht. Es gibt keine automatische Annahme, dass ein Angebot weiterhin verfügbar ist.

## Bilder

Konkrete Angebotsbilder müssen das reale Angebot zeigen. Allgemeine Stock- oder KI-Bilder dürfen nur als eindeutig neutrales Platzhaltermotiv verwendet werden, niemals als vermeintliche Innenansicht des Angebots. Schwache Live-Bilder werden technisch optimiert, aber nicht künstlich verfälscht.

## Tests und Abnahme

- aktive, reservierte und abgelaufene Zustände werden getestet
- Preise und Nebenkosten bleiben getrennte Felder
- Angebots-ID wird korrekt ans Formular übergeben
- zugehörige Portfolio-Verknüpfung ist gültig
- Leerzustand funktioniert
- DE/EN-Seiten, `astro check` und Produktions-Build bestehen
- Desktop und Mobilansicht werden visuell geprüft

## Nicht enthalten

- automatische Synchronisation mit einem externen Immobilienportal
- Online-Mietvertrag
- Bonitätsprüfung
- Upload von Betreibungsregisterauszügen
