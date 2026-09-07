# Falkenried Gruppe — Bildwelt und Qualitätsverbesserungen

## Ziel

Die bestehende Website erhält eine konsistente, hochwertige Bildwelt für Autowerkstatt, Gartenbau und Immobilien. Das echte Firmenfoto im Hero der Startseite bleibt unverändert. Die Überarbeitung verbessert Glaubwürdigkeit, visuelle Qualität und Ladeverhalten, ohne unbestätigte Personen, Objekte oder Unternehmensangaben zu erfinden.

## Gestaltungsrichtung

Die bestehende Richtung „Heritage Precision“ bleibt erhalten: ruhig, hochwertig, schweizerisch und zurückhaltend. Die drei Geschäftsbereiche unterscheiden sich über Motive und Farbwirkung, gehören aber durch ähnliche Lichtqualität, natürliche Materialien, klare Kompositionen und einheitliche Bildausschnitte sichtbar zur selben Marke.

- BMW: präzise, technisch und serviceorientiert; echte Arbeitssituationen, Diagnostik, Werkzeug und gepflegte Werkstattumgebung statt generischer Autohaus-Inszenierung.
- Gartenbau: zeitgemäße Gärten im Schweizer Kontext; Naturstein, standortgerechte Bepflanzung, Pflege und sichtbares Handwerk statt mediterraner Luxusarchitektur.
- Immobilien: helle, ruhige Architektur- und Wohnmotive mit natürlichen Materialien und nachvollziehbaren Perspektiven. Nicht authentifizierte Aufnahmen werden als Symbolbilder behandelt.

## Bildumfang

Das Startseiten-Hero `falkenried-standort.jpg` wird weder ersetzt noch inhaltlich verändert. Ersetzt werden schwache oder unpassende Bereichsbilder auf den BMW-, Gartenbau- und Immobilienseiten. Neue Bilder werden ausschließlich für Leistungen und Atmosphäre verwendet.

Fiktive Mitarbeiterporträts und Karten, die konkrete Mietobjekte vortäuschen könnten, werden nicht eingesetzt. Solange echte Teamfotos und Namen fehlen, zeigt die Website einen neutralen Kontaktblock ohne erfundene Identität. Solange echte Immobilienfotos fehlen, werden generische Motive als Symbolbilder kenntlich gemacht und nicht als Beleg eines bestimmten verfügbaren Objekts präsentiert.

## Seitliche Anpassungen

### Autowerkstatt

Hero und Detailmotiv werden auf eine zusammengehörige Werkstattserie umgestellt. Die Bildausschnitte müssen genug ruhige Fläche für Hero-Text bieten. Inhalte, Karten und Abläufe bleiben strukturell bestehen. Der Team-Platzhalter wird durch einen neutralen Servicekontakt ersetzt, bis echte Namen und Fotos vorliegen.

### Gartenbau

Hero und zwei Detailbilder werden durch zusammengehörige Motive aus Planung, Ausführung und Pflege ersetzt. Die Motive sollen zum Zürcher Unterland passen und unterschiedliche Leistungen zeigen. Die bestehende zweispaltige Bildkomposition bleibt grundsätzlich erhalten und wird nur bei Bedarf für bessere Ausschnitte angepasst.

### Immobilien

Hero und Kartenbilder erhalten eine einheitliche, glaubwürdige Architektursprache. Bei fehlenden realen Objektbildern tragen Karten beziehungsweise der Abschnitt eine gut sichtbare, aber ruhige Kennzeichnung als Symbolbild. Der fiktive Teamkontakt wird durch einen neutralen Kontaktbereich ersetzt.

### Startseite und gemeinsame Gestaltung

Der Startseiten-Hero bleibt unverändert. Typografie, Farbsystem und Komponenten bleiben erhalten. Abstände, Overlays und `object-position` dürfen gezielt angepasst werden, wenn dies die Lesbarkeit oder den Bildausschnitt verbessert. Es entsteht kein zusätzlicher Galerie- oder Magazinbereich.

## Technische Bildanforderungen

- Projektgebundene Bilder werden unter `src/assets/images/` mit klaren, beschreibenden Dateinamen gespeichert.
- Astro `Image` beziehungsweise die bestehende Hero-Komponente erzeugt responsive Varianten und moderne Ausgabeformate.
- Quellbilder besitzen ausreichend Auflösung für ihre tatsächliche Darstellung, ohne unnötig große Dateien auszuliefern.
- Seitenverhältnisse und Fokuspositionen werden pro Verwendung festgelegt; wichtige Motive dürfen bei mobilen Zuschnitten nicht verloren gehen.
- Alt-Texte beschreiben den sichtbaren Inhalt und behaupten keine nicht belegten Orte, Personen oder Objekte.
- Neu erzeugte Bilder enthalten keine lesbaren Markenfälschungen, Wasserzeichen oder fehlerhafte Beschriftungen.

## Inhaltliche Grenzen und offene Launch-Aufgaben

Die Überarbeitung erfindet keine Namen, Stellenbezeichnungen, Mietpreise, Verfügbarkeiten, Handelsregisterangaben oder Kundenstimmen. Bestehende sichtbare Platzhalter werden entfernt oder neutralisiert. Weiterhin extern zu liefern sind echte Teamdaten, aktuelle Mietobjekte, der Web3Forms-Schlüssel, Handelsregisterdaten und eine rechtliche Prüfung der Datenschutzerklärung. Diese Punkte bleiben in `CONTENT-TODO.md` nachvollziehbar.

## Fehlerbehandlung und Rückfalloption

Wenn ein generiertes Motiv visuell unplausibel ist, technische Artefakte enthält oder nicht zur regionalen Glaubwürdigkeit passt, wird es nicht eingebaut. Das bisherige Bild bleibt dann vorübergehend erhalten oder wird durch einen neutralen, klar gekennzeichneten Bildbereich ersetzt. Bestehende Assets werden nicht destruktiv überschrieben; neue Dateien erhalten eigene Namen.

## Prüfung und Abnahmekriterien

- Startseiten-Hero ist unverändert.
- Deutsche und englische Seiten verwenden dieselbe neue Bildlogik und konsistente Aussagen.
- Keine sichtbaren Namen wie „Vorname Nachname“ und keine falschen Mitarbeiterporträts bleiben bestehen.
- Generische Immobilienbilder werden nicht als echte Objektaufnahmen ausgegeben.
- Alle neuen Bilder funktionieren auf Desktop und Mobil ohne abgeschnittene Hauptmotive.
- Alt-Texte, responsive Bildgrößen und Lazy Loading sind sinnvoll konfiguriert.
- Astro-Typprüfung und Produktions-Build laufen erfolgreich.
- Eine visuelle Prüfung umfasst mindestens Startseite, BMW, Gartenbau und Immobilien in Desktop- und Mobilbreite.
