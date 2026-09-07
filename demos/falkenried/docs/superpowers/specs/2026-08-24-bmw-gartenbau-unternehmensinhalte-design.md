# BMW, Gartenbau und Unternehmensinhalte – Design

**Datum:** 24. August 2026\
**Status:** vom Auftraggeber freigegeben

## Ziel

Die kompakten Bereichsseiten werden zu zweisprachigen Portalen ausgebaut. Autowerkstatt erhält einen
detaillierten Service- und Angebotsbereich, Gartenbau eigenständige Leistungs- und Referenzseiten,
und die Falkenried Gruppe erhält pflegbare Seiten für Aktuelles, Veranstaltungen, Jobs und Partner.
Veröffentlicht werden ausschliesslich verifizierte Inhalte; fehlende aktuelle Einträge werden durch
ehrliche leere Zustände ersetzt.

## Leitentscheidungen

- Alle neuen Seiten werden auf Deutsch und Englisch umgesetzt.
- Die Hauptnavigation bleibt in Anzahl und Anordnung stabil, damit sie sich beim Sprachwechsel nicht
  verschiebt.
- Unterseiten sind über Bereichskarten, lokale Bereichsnavigationen, Querverweise und den Footer
  erreichbar.
- Verifizierte Bilder der offiziellen Falkenried-Websites werden bevorzugt. Vorhandene hochwertige
  Bilder dürfen ergänzen, wenn kein geeignetes echtes Bild vorliegt.
- Fahrzeuge, Preise, Termine, Stellen, Partner, Projekte und Referenzen werden nicht erfunden.
- Zeitkritische Angaben werden zentral gepflegt und, wo sinnvoll, mit einem Prüfdatum versehen.

## Informationsarchitektur

### Autowerkstatt

- /bmw-garage/ und /en/bmw-garage/: Bereichseinstieg
- /bmw-garage/service/ und englisches Gegenstück: vollständiger Servicekatalog
- /bmw-garage/occasionen/ und englisches Gegenstück: Autolina-Fahrzeugangebot
- /bmw-garage/servicestation/ und englisches Gegenstück: Tankstelle, Laden, Waschen, Saugen
- /bmw-garage/zubehoer/ und englisches Gegenstück: Originalzubehör und Kompletträder

Das zentrale FAQ wird um einen klar abgegrenzten BMW-Bereich erweitert. Die BMW-Einstiegsseite
verlinkt alle Detailseiten und zeigt die wichtigsten Handlungen: Servicetermin, Occasionen ansehen
und Kontakt aufnehmen.

### Gartenbau

- /gartenbau/ und /en/gartenbau/: Bereichseinstieg
- /gartenbau/gartengestaltung/ und englisches Gegenstück
- /gartenbau/gartenunterhalt/ und englisches Gegenstück
- /gartenbau/mulden-transporte/ und englisches Gegenstück
- /gartenbau/referenzen/ und englisches Gegenstück
- /gartenbau/tipps/ und englisches Gegenstück

Die Referenzübersicht verwendet echte, verifizierbare Projekte und Bilder der offiziellen
Gartenbau-Präsenz. Galerien erhalten sinnvolle Alternativtexte, Bildgrössen und responsive
Darstellung. Tipps und Fachbeiträge werden datengetrieben aufgebaut.

### Unternehmensinhalte

- /aktuelles/ und /en/news/
- /veranstaltungen/ und /en/events/
- /jobs/ und /en/jobs/
- /partner/ und /en/partners/

Aktuelles startet mit den drei auf der offiziellen BMW-Seite veröffentlichten Beiträgen von 2026:
Gewerbeschau Dielsdorf, Antriebsratgeber und Feriencheck. Die Gewerbeschau wird zusätzlich als
Veranstaltung eingeordnet, sofern ihre Daten verifizierbar sind. Ohne zukünftige Veranstaltung
zeigt die Seite einen erklärenden leeren Zustand. Ohne offene Stelle informiert die Jobseite
ehrlich darüber und bietet eine Initiativbewerbung per Kontaktweg an. Partner erscheinen nur mit
offiziell belegter Beziehung.

## Inhalte BMW

Der Servicekatalog bildet mindestens diese veröffentlichten Leistungen ab:

- Feriencheck für alle Marken
- Klimaservice für alle Marken
- Reparatur oder Ersatz von Frontscheiben
- Unterstützung bei Blechschäden und Versicherungsabwicklung
- Reparaturbestätigungsverfahren (RBV) für im Kanton Zürich eingelöste Fahrzeuge
- BMW i Service
- BMW Service Plus
- Pannenhilfe und direkter BMW-Onlinetermin

Preise werden nur übernommen, wenn sie unmittelbar vor der Implementierung noch auf der
offiziellen Seite stehen. Sie erhalten ein sichtbares Prüfdatum oder einen Änderungshinweis. Die
Servicestation beschreibt die 24/7-Tankstelle, zwei markenoffene Ladestationen, Waschanlage und
Staubsauger samt verifizierten Zahlungs- und Öffnungsangaben. Zubehör verweist für das aktuelle
Sortiment auf offizielle BMW-Angebote.

## Occasionen und externe Inhalte

Die offizielle Seite bindet das Falkenried-Angebot von Autolina per Iframe ein. Die neue Seite
übernimmt dieses Prinzip datenschutzbewusst:

1. Vor einer Nutzeraktion werden keine Autolina-Ressourcen geladen.
2. Eine lokale Vorschau erklärt die Weitergabe an einen externen Anbieter.
3. Nach Klick wird das verifizierte Autolina-Iframe geladen.
4. Ein sichtbarer externer Link bleibt als Fallback erhalten.

Eine eigene Fahrzeugdatenbank, Preis-Synchronisation oder kopierte Fahrzeugliste ist nicht Teil
dieser Ausbaustufe.

## Inhalte Gartenbau

Die Leistungsseiten übernehmen und strukturieren das offiziell belegte Angebot:

- Planung und Neuanlage von Gärten, Wegen, Mauern, Sitzplätzen, Wasserspielen und Erdarbeiten
- Rasenpflege, Schneidarbeiten, Bepflanzungen, Pflanzenschutz, Unkrautbekämpfung, Rosenpflege und
  Schneeräumen
- Muldenservice, Krantransporte sowie Transporte mit Last- oder Lieferwagen

Jede Seite erhält eine klare Leistungsgliederung, passende echte Bilder, einen Projekt-CTA und
Querverweise. Fachbeiträge verwenden nur belastbare Themen. Saisonale Tipps dürfen als zeitlose
Beratung formuliert werden, behaupten aber keine nicht belegten Spezialleistungen.

## Komponenten und Daten

Strukturierte Astro-/TypeScript-Daten bilden Services, Beiträge, Veranstaltungen, Jobs, Partner und
Referenzprojekte ab. Wiederverwendbare Komponenten übernehmen:

- lokale Bereichsnavigation
- Leistungs- und Inhaltskarten
- responsive Bildergalerien
- Metadaten für Datum, Kategorie und Aktualitätsstatus
- leere Zustände mit sinnvoller nächster Handlung
- externe Inhalte mit Einwilligung und Fallback
- bereichsspezifische Call-to-Actions

Die vorhandenen Layout-, Typografie- und Bildmuster bleiben die visuelle Grundlage.

## Sprache und Navigation

Jede Route wird in der zentralen Sprachzuordnung mit ihrer Gegenroute erfasst. Beim Sprachwechsel
bleibt der Nutzer auf derselben inhaltlichen Seite. Die Hauptnavigation erhält keine zusätzlichen
permanent sichtbaren Punkte. Neue Unternehmensseiten werden über Startseitenbereiche, Footer und
kontextuelle Links erschlossen. Lokale Bereichsnavigationen sind mobil scrollbar oder umbrechbar
und auf grossen Bildschirmen gleichmässig verteilt.

## Fehler- und Leerzustände

- Autolina nicht aktiviert: lokale Vorschau mit Datenschutzhinweis und Aktivierung
- Autolina nicht einbettbar: externer Link zum verifizierten Händlerangebot
- keine aktuellen Veranstaltungen: klare Meldung plus Kontakt-/News-Verweis
- keine offenen Stellen: klare Meldung plus Initiativbewerbung
- keine verifizierten Partner oder Referenzen: kein veröffentlichter Eintrag
- fehlendes echtes Bild: hochwertiges Ergänzungsbild mit korrekter Einordnung oder bildlose Karte

## Qualität und Tests

Die Umsetzung erfolgt testgetrieben. Automatische Vertrags- und Inhaltstests prüfen:

- Existenz aller deutschen und englischen Routen
- eindeutige Gegenrouten im Sprachwechsel
- unveränderte Hauptnavigation und stabile Layoutklassen
- vollständige Service- und Gartenbau-Datensätze
- interne Links und externe Fallback-Links
- Autolina wird vor dem Klick nicht geladen
- korrekte leere Zustände für Veranstaltungen und Jobs
- Alternativtexte und responsive Bildverwendung

Abschliessend folgen alle Tests, Astro Check, Produktions-Build, lokale HTTP-Aufrufe und eine
visuelle Prüfung wichtiger Seiten auf Desktop und Mobil. Der Entwicklungsserver bleibt zur Abnahme
unter der bekannten lokalen Adresse aktiv.

## Nicht Bestandteil

- eigenes CMS oder Benutzerkonten
- automatische Autolina-API-Synchronisation
- Bewerbungsportal oder Datei-Upload
- Veranstaltungsbuchung oder Ticketverkauf
- erfundene Demo-Fahrzeuge, Referenzen, Stellen oder Partner
- rechtliche Freigabe externer Inhalte; diese bleibt vor dem Livegang beim Betreiber
