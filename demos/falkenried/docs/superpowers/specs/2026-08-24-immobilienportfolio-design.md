# Immobilienportfolio „Unsere Mietobjekte“ – Design

Stand: 24. August 2026\
Status: vom Auftraggeber freigegeben

## Ziel

Das dauerhafte Immobilienportfolio der Falkenried Gruppe wird unabhängig von freien Angeboten dargestellt. Besucher verstehen, welche Liegenschaften zum eigenen Bestand gehören, auch wenn aktuell keine Einheit verfügbar ist.

## Informationsarchitektur

- `/immobilien/` bleibt der Bereichseinstieg
- `/immobilien/objekte/` zeigt das Gesamtportfolio
- `/immobilien/objekte/[slug]/` zeigt eine Liegenschaft im Detail
- `/immobilien/angebote/` wird in der folgenden Etappe für aktuelle Verfügbarkeiten umgesetzt

Die Navigation trennt eindeutig „Unsere Mietobjekte“ und „Aktuell zu vermieten“.

## Datenmodell

Eine Astro Content Collection speichert pro Liegenschaft:

- stabile ID und URL-Slug
- Name, Adresse, Ort und Objekttypen
- Kurz- und Langbeschreibung DE/EN
- Einheiten und bekannte Zimmergrössen
- Park-, Bastel- und Gewerbeflächen
- Ausstattung und Lagevorteile
- Titelbild und kuratierte Galerie
- Verknüpfung zu Dokumenten und aktuellen Angeboten
- Quellenstand und Bestätigungshinweis

Die ersten fünf Profile basieren auf den offiziellen Live-Seiten:

1. Schleinikon Wasen, Rotbuechstrasse 12/14
2. Schleinikon Wasen, Rotbuechstrasse 7/7A
3. Boppelsen
4. Zürcher Unterland Gewerbehaus, Steinbruggstrasse 21
5. Zürcher Unterland Chlupf, Musterweg 12

## Premium-Hybrid-Gestaltung

- starkes, ruhiges Titelbild pro Liegenschaft
- Faktenleiste für Ort, Typen und Einheiten
- kurze redaktionelle Beschreibung statt Textwand
- ausgewählte Galerie mit konsistenten Seitenverhältnissen
- Lageabschnitt ohne unnötiges Tracking; externe Kartenverknüpfung statt eingebettetem Google-Tracking
- CTA zu aktuellen Angeboten und objektbezogener Anfrage

## Bildstrategie

Zuerst werden ausreichend grosse, scharfe und eindeutig zur Liegenschaft gehörende Bilder der offiziellen Falkenried-Websites geprüft. Schwache, kleine oder doppelte Bilder werden nicht übernommen. Danach folgen passende vorhandene Projektbilder. Fehlende neutrale Architektur- oder Detailmotive dürfen professionell lizenziert oder KI-generiert sein, werden aber nicht als dokumentarische Aufnahme einer konkreten Liegenschaft ausgegeben.

Jedes Bild erhält Herkunftsnotiz, Alt-Text, optimierte Ausgabegrössen und einen sinnvollen Fokuspunkt. Echte Gebäudeaufnahmen und illustrative Stimmungsbilder werden redaktionell unterscheidbar gehalten.

## Filter und Leerzustände

Die Übersicht filtert nach Ort und Typ. Filter funktionieren ohne Serverzustand und lassen sich per URL beziehungsweise Query nachvollziehen. Wenn ein Filter keine Treffer liefert, erscheint ein klarer Leerzustand mit Zurücksetzen-Aktion.

## Tests und Abnahme

- fünf vollständige, validierte Portfolio-Datensätze
- eindeutige IDs und Slugs
- keine Angebotsverfügbarkeit im dauerhaften Portfolio erfinden
- Filter und Detailseiten funktionieren in DE/EN
- Bilder besitzen Alt-Text und Quellenklassifikation
- `astro check`, Datentests und Produktions-Build bestehen
- Desktop und Mobilansicht werden visuell geprüft

## Nicht enthalten

- aktuelle Preise oder Verfügbarkeit
- Mieter-Dokumentencenter
- geschützte Mieterinformationen
- Immobilien fremder Eigentümer
