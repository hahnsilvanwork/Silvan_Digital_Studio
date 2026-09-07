# Stammdaten und Öffnungszeiten – Design

Stand: 24. August 2026\
Status: vom Auftraggeber am 24. August 2026 freigegeben

## Ziel

Alle wiederverwendeten Unternehmensangaben werden aus einer zentralen, typisierten Datenquelle bezogen. Die derzeit auf den offiziellen Websites von Falkenried Gruppe veröffentlichten Angaben werden direkt übernommen. Dadurch verschwinden bekannte Platzhalter und widersprüchliche Kopien lassen sich künftig vermeiden.

Zeitabhängige Angaben werden im Projekt mit Quelle und Prüfdatum dokumentiert und müssen vor dem öffentlichen Launch nochmals durch Falkenried Gruppe bestätigt werden.

## Umfang

Schritt 1 umfasst:

- Unternehmensname, Adresse, Haupttelefon, Fax und allgemeine E-Mail-Adresse
- UID `Fiktives Beispielunternehmen`
- reguläre BMW-Öffnungszeiten und die Regel zum letzten Samstag im Monat
- Hinweis, dass Feiertags- und Sonderöffnungszeiten separat bestätigt und gepflegt werden
- bekannte Ansprechpartner und Rollen:
  - Jonas Lindberg – Geschäftsführer, Verkäufer und Serviceberater BMW
  - Lukas Falkenried – Gartenbau und technischer Unterhalt Immobilien
  - Mara Linden – Geschäftsführerin / Immobilien
  - Nora Feldmann – Sachbearbeiterin Immobilien
- offizielle Links zu den Live-Bereichen Garage und Gartenbau
- externer Soft-NRG-Terminplaner der BMW-Garage
- Verwendung der zentralen Werte auf den betroffenen deutschen und englischen Astro-Seiten
- automatisierte Datenprüfungen, Astro-Typprüfung und Produktions-Build

Nicht Bestandteil dieses Schritts sind neue Seiten, ein CMS, aktuelle Immobilienangebote, Formularzustellung, Teamfotos, News, Sonderöffnungszeiten als Redaktionssystem oder die vollständige inhaltliche Übernahme der BMW- und Gartenbau-Unterseiten.

## Quellen

Die Werte stammen aus den am 24. August 2026 öffentlich erreichbaren offiziellen Websites:

- `https://falkenried.example`
- `https://falkenried.example`
- `https://falkenried.example`
- `https://falkenried.example`
- `https://falkenried.example`
- `https://falkenried.example`
- `https://falkenried.example`

Die Live-Seiten gelten für diese Implementierung als freigegebene Arbeitsgrundlage, nicht als dauerhafte Garantie der Aktualität.

## Architektur

### Zentrale Datenquelle

Eine neue Datei `src/data/company.ts` exportiert unveränderliche, typisierte Objekte:

- `company`: Dachmarken-Stammdaten
- `departments`: bereichsspezifische Links und Ansprechpartner
- `bmwOpeningHours`: strukturierte Wochentage und Zeitfenster
- `externalLinks`: Terminplaner und offizielle Live-Bereiche
- `dataProvenance`: Quellseiten, Abrufdatum und Bestätigungshinweis

Die Daten bleiben bewusst im Quellcode. Für selten geänderte Stammdaten ist dies einfacher und zuverlässiger als die sofortige Einführung eines CMS. Zeitabhängige Inhalte wie Angebote und News erhalten in späteren Etappen ein eigenes Inhaltsmodell.

### Darstellung

Bestehende Komponenten und Seiten importieren die zentrale Datenquelle. In diesem Schritt werden keine neuen visuellen Muster eingeführt. Vorhandene Layouts, Abstände und Komponenten bleiben bestehen.

Folgende Stellen werden mindestens umgestellt:

- Impressum und englisches Imprint: Adresse, Kontakt und UID
- Kontakt und englischer Contact: Adresse, Telefon, Fax, E-Mail und Ansprechpartner
- BMW-Seiten DE/EN: Öffnungszeiten, echter Ansprechpartner und Terminplaner-Link
- Immobilien-Seiten DE/EN: echte Ansprechpartner
- Gartenbau-Seiten DE/EN: Lukas Falkenried als Ansprechpartner
- Geschichte/History: die drei Platzhalterkarten werden durch eine textbasierte Übersicht der vier verifizierten Ansprechpartner ersetzt; die Startseiten bleiben unverändert, weil sie aktuell keine Personennamen ausgeben
- Schema.org-Daten: Organisation, Adresse, Telefon und UID soweit vom bestehenden Schema unterstützt

### Mehrsprachigkeit

Fakten wie Namen, UID, Telefonnummern, Adressen, URLs und Zeitfenster werden nicht dupliziert. Übersetzbare Bezeichnungen wie Rollen, Wochentage und Hinweise bleiben in den Seiten beziehungsweise einer kleinen sprachabhängigen Abbildung. Dadurch entstehen keine zwei unabhängig gepflegten Datenbestände.

## Datenregeln

- Telefonnummern werden getrennt als lesbare Anzeige und `tel:`-Wert gespeichert.
- E-Mail-Adressen werden als lesbarer Wert hinterlegt und von Verbrauchern für `mailto:` verwendet.
- Öffnungszeiten bestehen aus strukturierten Zeitfenstern, nicht aus einem einzigen formatierten Absatz.
- Samstag enthält die Zusatzregel „jeweils letzter Samstag im Monat geschlossen“.
- Sonntags ist die Garage geschlossen.
- Feiertags- und Betriebsferien werden nicht erfunden oder aus alten Meldungen abgeleitet.
- Ansprechpartner dürfen mehrere Rollen beziehungsweise Bereiche besitzen.
- Stockporträts werden nicht mit echten Namen kombiniert. In BMW, Immobilien und Geschichte/History werden bekannte Ansprechpartner bis zum Vorliegen echter freigegebener Bilder ohne Porträt dargestellt. Lukas Falkenrieds bestehende Stockbild-Zuordnung wird ebenfalls entfernt.

## Fehlervermeidung

Eine automatisierte Prüfung stellt sicher, dass folgende Pflichtwerte vorhanden und plausibel formatiert sind:

- Firmenname
- vollständige Adresse
- UID mit Präfix `CHE-`
- Telefonanzeige und internationaler `tel:`-Wert
- allgemeine E-Mail-Adresse
- mindestens ein Öffnungszeitfenster für Montag bis Samstag
- geschlossener Sonntag
- Terminplaner als HTTPS-URL
- eindeutige Personen-IDs und nicht leere Namen/Rollen

Fehlende oder falsch formatierte Pflichtwerte lassen die Prüfung fehlschlagen. Die Website soll keine stillen Fantasiewerte als Ersatz anzeigen.

## Tests und Abnahme

Die Implementierung folgt Test-First:

1. Datenvertrag und Pflichtfeldprüfungen werden als zunächst fehlschlagende Tests festgelegt.
2. Die zentrale Datenquelle wird minimal implementiert, bis die Tests bestehen.
3. Seiten werden auf die zentrale Quelle umgestellt.
4. Statische Prüfungen stellen sicher, dass bekannte Platzhalter wie `Vorname Nachname` und `[TODO]` für die UID in den betroffenen Seiten nicht mehr vorkommen.
5. `astro check` und `astro build` müssen ohne Fehler durchlaufen.

Die Etappe ist abgenommen, wenn:

- alle im Umfang genannten Werte zentral definiert sind,
- deutsche und englische Seiten dieselben Fakten verwenden,
- UID, Teamnamen und BMW-Öffnungszeiten sichtbar korrekt ausgegeben werden,
- der BMW-Termin-CTA zum offiziellen Soft-NRG-Planer führt,
- keine echten Personen mit unbestätigten Stockporträts verknüpft werden,
- Datenprüfungen, Astro-Check und Produktions-Build erfolgreich sind,
- `CONTENT-TODO.md` nur noch die weiterhin offenen Bestätigungen aufführt.

## Folgende Etappen

Nach Abschluss dieses Schritts bleibt die priorisierte Reihenfolge:

1. Formulare und E-Mail-Zustellung
2. Immobilienportfolio „Unsere Mietobjekte“
3. aktuelle Mietangebote
4. Mieter-Dokumentencenter
5. BMW-Termin und Servicekatalog
6. BMW Occasionen, Zubehör und Servicestation
7. Gartenbau-Leistungshubs
8. Gartenbau-Referenzen und Galerien
9. News, Jobs und Partner
10. Recht, SEO, Weiterleitungen und Launch
