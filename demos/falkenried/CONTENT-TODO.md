# Content-Aufgaben vor dem Launch

Diese Website ist technisch fertig und funktionsfähig. Die am 24. August 2026 auf den offiziellen
Websites veröffentlichten Stammdaten, Ansprechpartner und regulären BMW-Öffnungszeiten wurden
zentral übernommen. Zeitabhängige Angaben müssen vor dem Livegang nochmals bestätigt werden.
Der vollständige Abgleich mit `falkenried.example`, `garage.falkenried.example` und `garten.falkenried.example` steht in
[`docs/2026-08-24-live-site-gap-audit.md`](docs/2026-08-24-live-site-gap-audit.md).

## 1. Team – Fotos und abschliessende Bestätigung (hohe Priorität)

Die Namensplatzhalter wurden durch die offiziell veröffentlichten Ansprechpartner ersetzt:

- Jonas Lindberg – Geschäftsführer, Verkäufer und Serviceberater BMW
- Lukas Falkenried – Gartenbau und technischer Unterhalt Immobilien
- Mara Linden – Geschäftsführerin / Immobilien
- Nora Feldmann – Sachbearbeiterin Immobilien

Die Personen werden bis zum Vorliegen freigegebener Porträts bewusst ohne Stockfoto dargestellt.
Namen, Rollen und Zuständigkeiten vor dem Livegang nochmals durch Falkenried Gruppe bestätigen.

## 2. Immobilien – aktuelle Mietobjekte & Preise

`src/pages/immobilien.astro` zeigt aktuell drei Objekte mit "Preis auf Anfrage" auf Basis von zwei
öffentlich auffindbaren Adressen (Zürcher Unterland Chlupf, Steinbruggstrasse 21). Bitte mit echten,
aktuell verfügbaren Objekten und Mietpreisen ersetzen oder ergänzen.

Zusätzlich fehlt die Trennung zwischen dem dauerhaften Gesamtportfolio („Unsere Mietobjekte") und
den zeitabhängigen freien Angeboten („Aktuell zu vermieten"). Das Live-Portfolio umfasst Standorte
in Schleinikon Wasen, Boppelsen sowie Zürcher Unterland Gewerbehaus und Chlupf. Details und das empfohlene
Datenmodell stehen im Live-Site-Abgleich.

## 3. Fotos ersetzen

Aus dem Ordner `../Pictures/` wurden folgende Bilder bereits eingebaut (ersetzen frühere Unsplash-Platzhalter):

- `src/assets/images/home/falkenried-standort.jpg` ← **echtes Foto** des Firmengeländes (Startseiten-Hero)
- `src/assets/images/bmw/workshop-hero.jpg` ← Stockfoto BMW (BMW-Garage-Hero)
- `src/assets/images/bmw/workshop-detail.jpg` ← Stockfoto BMW-Showroom (BMW-Detailbereich)
- `src/assets/images/bmw/workshop-lift.jpg` ← Stockfoto Oldtimer-BMW (Geschichte-Hero, passend zu "seit 1969")
- `src/assets/images/garden/garden-aerial.jpg`, `garden-path.jpg`, `hedge-work.jpg` ← Stockfotos Gärten
- `src/assets/images/immobilien/office-glass.jpg` ← Stockfoto modernes Büro (Gewerbefläche-Karte)
- `public/images/og-default.jpg` ← neu generiert aus dem echten Firmenfoto

**Noch unbenutzt in `../Pictures/`** (weitere Stockfotos zur freien Verwendung, z. B. für eine
spätere Bildergalerie): `pexels-04iraq…`, `pexels-adaptphotos…`, `pexels-cax0000…`,
`pexels-danmds…`, `pexels-gustavo-fring…`, `pexels-meike…`, `pexels-miami302…`,
`pexels-style-stance…`, `pexels-thel0stkidd…`.

Noch offen: echte freigegebene Teamfotos sowie Bilder für die Immobilien-Wohnungs-/Parkplatzkarten.
Dafür liegen keine passenden Bilder im Pictures-Ordner vor.

Das am 24. August 2026 bereitgestellte Falkenried-/BMW-Service-Logo ist in der Navigation integriert.
Das offizielle Unternehmensvideo `NEg-SNOsgyk` verwendet ein lokal gespeichertes YouTube-Vorschaubild
und lädt den datenschutzfreundlicheren YouTube-No-Cookie-Player erst nach einem bewussten Klick.
Die drei gelieferten Kundenstimmen sind unverändert auf der deutschen und englischen Startseite eingebunden.

## 4. Kontaktformular aktivieren

Der sichere Demo-Zustand ist technisch abgeschlossen: Die sechs DE-/EN-Formulare für Kontakt,
Gartenbau und Immobilien bleiben sichtbar, erklären den deaktivierten Versand und können ohne Key
keine Anfrage absenden. Datenschutzeinwilligung, Spam-Honeypot sowie Bereichs- und Quellenangaben
sind bereits integriert.

Für den Livegang bleibt offen:

1. Auf [Web3Forms](https://web3forms.com) einen Access Key für `info@falkenried.example` erstellen.
2. Den Key lokal in `.env` und beim Hosting als `PUBLIC_WEB3FORMS_KEY` hinterlegen; nie committen.
3. Neu bauen und veröffentlichen. Erst dann werden die Buttons automatisch aktiviert.
4. Von jedem Bereich je eine DE-/EN-Testnachricht senden und den Eingang bei `info@falkenried.example` bestätigen.

## 5. Impressum – Handelsregisterdaten (technisch erledigt)

Die auf der offiziellen Garage-Datenschutzerklärung publizierte UID `Fiktives Beispielunternehmen` ist zentral
hinterlegt und wird im deutschen und englischen Impressum ausgegeben. Vor dem Livegang bestätigen.

## 5a. BMW-Öffnungszeiten und Sondertage

Die regulären Öffnungszeiten und die Schliessung am letzten Samstag im Monat sind zentral hinterlegt.
Feiertage, Betriebsferien und kurzfristige Sonderöffnungszeiten benötigen vor dem Livegang einen
verantwortlichen Pflegeprozess und dürfen nicht aus alten Newsbeiträgen übernommen werden.

## 6. Datenschutzerklärung rechtlich prüfen

`src/pages/datenschutz.astro` / `src/pages/en/privacy.astro` sind ein Entwurf und sollten vor dem
Livegang von einer Fachperson auf Konformität mit dem Schweizer Datenschutzgesetz (DSG) geprüft werden.

## 7. Division-spezifische Telefonnummern (optional)

Aktuell wird überall die Hauptnummer (Telefon auf Anfrage) verwendet. Falls einzelne Bereiche eigene
Durchwahlen haben, können diese in `src/pages/kontakt.astro` / `src/pages/en/contact.astro` ergänzt werden.

## 8. Domain & Umzug

Die alte Seite läuft über getrennte Subdomains (garage.falkenried.example, garten.falkenried.example, falkenried.example).
Diese neue Seite vereint alles unter einer Domain. Bei der Umstellung auf falkenried.example bitte
Redirects von den alten Subdomains auf die neuen Pfade einrichten, damit keine SEO-Wertigkeit verloren geht.

## 9. OG-Bild / Favicon

`public/images/og-default.jpg` wurde automatisch aus dem Werkstatt-Platzhalterbild generiert;
`public/favicon.svg` ist ein einfaches "HB"-Monogramm. Beides bei Bedarf durch das echte Firmenlogo ersetzen.

## 10. Vollständiger Funktions- und Inhaltsabgleich

Die bisherige Einseiten-Zusammenfassung pro Geschäftsbereich ersetzt noch nicht alle wichtigen
Inhalte der Live-Präsenz. Vor der Ablösung fehlen insbesondere:

- Immobilienportfolio, aktuelle Angebote und Mieter-Dokumentencenter
- BMW-Onlinetermin, detaillierter Servicekatalog, Live-FAQ, Occasionen, Zubehör und Servicestation
- Gartenbau-Leistungsdetails, Mulden/Transporte und echte Referenzgalerien
- pflegbare News, Veranstaltungen, Jobs und Partner
- eine vollständige Redirect-Matrix für alle alten Seiten und beide Subdomains

Prioritäten, Seitenstruktur, konkrete Inhalte und zusätzliche Feature-Vorschläge sind in
[`docs/2026-08-24-live-site-gap-audit.md`](docs/2026-08-24-live-site-gap-audit.md) dokumentiert.

## 11. Ausbau BMW, Gartenbau und Unternehmensinhalte (technisch erledigt)

Am 24. August 2026 wurden die folgenden Bereiche zweisprachig ergänzt:

- BMW-Servicekatalog, zustimmungsbasierte Autolina-Einbettung, Servicestation und Zubehör
- Gartenbau-Leistungsseiten, Mulden und Transporte, Tipps sowie sechs echte Referenzbilder der offiziellen Gartenbau-Seite
- Aktuelles mit drei verifizierten Beiträgen sowie Seiten für Veranstaltungen, Jobs und Partner

Vor dem Livegang offen bleiben die Freigabe der übernommenen Referenzbilder, die regelmässige Prüfung
zeitabhängiger Preise und Öffnungszeiten sowie die Pflege neuer Veranstaltungen und Stellen. Solange
keine bestätigten Termine oder Stellen vorliegen, zeigen die Seiten bewusst einen ehrlichen Leerzustand.

## 12. Individuelle Hero-Bilder der Unterseiten

Am 24. August 2026 wurden neun unterschiedliche Originalbilder von den offiziellen Bereichsseiten
lokal übernommen. BMW: `BMW-XXL-Service.jpg`, `bmw-verkauf_-xxl-e1729180065941.jpg`,
`Falkenried Gruppe-Servicestation-XL-scaled.jpg` und `BMW-Zubehoer-Slider.jpg`. Gartenbau:
`Falkenried Gruppe-Gartengestaltung-scaled.jpg`, `Falkenried Gruppe-Gartenunterhalt-und-Bepflanzungen-Slider.jpg`,
`Falkenried Gruppe-Kranwagen-Slider2.jpg`, `Wasserspiel-mit-Granit-und-Stahl.jpg` und `Rhododendron.jpg`.

Quellen: `garage.falkenried.example`, `bmw.falkenried.example` und `garten.falkenried.example`, jeweils aus deren
`wp-content/uploads`-Bildbestand. Die Bilder sind technisch integriert; die ausdrückliche
Publikationsfreigabe durch Falkenried Gruppe bleibt vor dem Livegang zu bestätigen.
