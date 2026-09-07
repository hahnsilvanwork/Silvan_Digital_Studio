# Eigene Hero-Bilder für BMW- und Gartenbau-Unterseiten

**Datum:** 24. August 2026\
**Status:** zur Umsetzung ausgewählt – Variante A

## Ziel

Jede BMW- und Gartenbau-Unterseite erhält ein eigenes, inhaltlich passendes Hero-Bild. Dadurch ist
der Seitenzweck bereits im ersten Bildschirmbereich erkennbar und die Portale wirken weniger
wiederholend und hochwertiger.

## Bildstrategie

Echte Bilder der offiziellen Falkenried-Websites haben Vorrang. Bereits vorhandene hochwertige
Bilder werden nur verwendet, wenn kein passendes Originalmotiv auffindbar ist. Künstlich erzeugte
Bilder sind für diese Änderung nicht vorgesehen.

## Zuordnung BMW

- Service: echte Werkstatt- oder Serviceaufnahme
- Occasionen: echtes Motiv aus dem veröffentlichten BMW-Occasionsbereich
- Servicestation: echte Tankstelle, Ladestation oder Waschanlage am Standort
- Zubehör: echtes veröffentlichtes BMW-Zubehörmotiv

## Zuordnung Gartenbau

- Gartengestaltung: ausgeführte Gartenanlage aus den offiziellen Referenzen
- Gartenunterhalt: echte Bepflanzungs- oder Pflegeaufnahme
- Mulden und Transporte: echter Kranlastwagen, Transport oder Mulde der Falkenried Gruppe
- Referenzen: besonders starkes abgeschlossenes Referenzprojekt
- Tipps: ruhiges saisonales Gartenmotiv aus dem belegten Bildbestand

## Darstellung

Der vorhandene Aufbau der Hero-Bereiche bleibt bestehen. Bildhöhe, dunkle Überlagerung,
Textposition und responsive Bildoptimierung bleiben auf allen Unterseiten gleich. Nur das Motiv und
der zweisprachige Alternativtext ändern sich. Der Kontrast muss für weisse Überschriften weiterhin
ausreichen.

## Technik

Die Bildzuordnung liegt zentral in je einer BMW- und Gartenbau-Bilddatei. Die gemeinsamen
BMWPortalPage- und GardenPortalPage-Komponenten wählen das Bild anhand des Seitentyps aus. Dadurch
entstehen keine voneinander abweichenden Einzelimplementierungen.

## Qualität

- Jede der neun Unterseiten verwendet ein eigenes Motiv.
- Jedes Bild besitzt einen konkreten deutschen und englischen Alternativtext.
- Astro Image erzeugt responsive Formate und passende Bildgrössen.
- Fehlende oder nicht abrufbare Originalbilder werden nicht durch leere externe URLs ersetzt.
- Vertragsprüfungen verhindern versehentlich doppelte Hero-Zuordnungen.
- Abschliessend folgen Astro Check, Produktions-Build und HTTP-Prüfung aller betroffenen Routen.
