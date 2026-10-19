# Logo und Animation – 30. September 2026

Die neue SILVAN-Digital-Studio-Wortmarke und das gelieferte Video sind in den lokalen Produktionsstand integriert. Die Vorschau läuft unter [127.0.0.1:3110](http://127.0.0.1:3110/), auf Englisch unter [/en](http://127.0.0.1:3110/en). Veröffentlichung erfolgt nach der Abnahme durch den Besitzer.

## Gestaltung und Platzierung

- Gemeinsame Kopfzeile auf sämtlichen Hauptseiten: vollständiges Navy-Logo als SVG mit Link zur Startseite der aktiven Sprache.
- Mobiles Menü: dasselbe Logo, mit weiterhin erreichbarer Schliessen-Schaltfläche.
- Footer: die saubere weisse Vektorversion auf dem vorhandenen Navy-Hintergrund.
- Browser- und Home-Screen-Icons: die tatsächliche S-Kontur der Wortmarke, weiss auf Navy. Die vorhandenen Icon-Adressen bleiben erhalten.
- Deutsche und englische Link-Vorschau: vollständiges Logo, aktuelle Startseitenüberschrift und weisser Hintergrund. Die Unternehmensdaten referenzieren die vollständige Wortmarke.
- Persönlicher Abschnitt der Startseite, unter den Projektbeispielen: der kurze Lichtreflex als Signatur neben beziehungsweise unter der Vorstellung des Entwicklers. Die übrigen Inhalte und die unabhängigen Demo-Marken bleiben erhalten.

Das Logo wird proportional dargestellt; V-Schnitt und Unterzeile kommen aus dem vorhandenen freigegebenen Vektor-Paket. Die beigefügten weissen Rastervarianten weisen sichtbare Freistellungsartefakte auf. Für den Footer wird deshalb die bereits sauber exportierte weisse SVG-Version mit derselben Geometrie verwendet.

## Verhalten des Videos

Das Original ist etwa 6,04 Sekunden lang, 880 × 336 Pixel gross und enthält eine Tonspur. Die Webversion nutzt den ersten 4,8-Sekunden-Abschnitt, entfernt Ton und eingebettete Metadaten und optimiert die MP4-Datei für das Laden im Browser. Sie ist 122.500 Byte gross. Das Original bleibt unverändert als logo-animation-original.mp4 im Logo-Paket erhalten.

Die Animation lädt erst, wenn mindestens die Hälfte ihrer Fläche sichtbar ist. Sie läuft einmal und ohne Ton; es gibt keine Schleife. Sie pausiert beim Verlassen des sichtbaren Bereichs oder bei einem verborgenen Tab. Besucher können sie pausieren und erneut abspielen. Bei reduzierter Bewegung oder Datensparmodus erfolgt kein automatischer Download oder Start; bewusstes Abspielen bleibt möglich. Ohne JavaScript, bei fehlenden Browserfunktionen oder einer nicht ladbaren Videodatei bleibt das Logo als Bild sichtbar.

Das Standbild stammt aus dem Ende desselben Videos. Dadurch wechseln beim Start weder Grösse noch Position der Wortmarke. Die Videofläche hat ein festes Seitenverhältnis und verschiebt keine Inhalte beim Laden. Schaltflächen sind auf Deutsch und Englisch beschriftet, mit Tastatur erreichbar und mindestens 44 Pixel hoch.

## Dateien

Die Ausgangsdateien liegen unter design-assets/brand/silvan-logo-final-2026-09-30/. Die Webdateien liegen unter public/images/brand/ und public/videos/silvan-logo.mp4. scripts/import-brand-assets.mjs erstellt aus dem freigegebenen Paket die Website-Logos, PNG-Version und S-Icons. Für das Video ist keine Laufzeitbibliothek und kein externer Dienst erforderlich.

BrandLogo verwendet eine gemeinsame statische Grafikkomponente. BrandSignature enthält ausschliesslich die Steuerung des Videos. Der Header, das mobile Menü und der Footer nutzen dieselben Logo-Dateien in beiden Sprachen.

## Prüfung

| Prüfung | Ergebnis |
|---|---|
| Produktionsbuild inklusive aller vier Demos | Bestanden |
| Abschliessender Hauptseiten-Build und Nachbearbeitung der Sicherheitsrichtlinien | Bestanden; 97 statische HTML-Dokumente nachbearbeitet |
| TypeScript und ESLint | Bestanden |
| Betroffene Komponenten-, Seiten-, Navigations- und SEO-Tests | 95 bestanden, keine Fehler |
| Neue Logo-/Animationsfälle in Chromium und mobilem Safari | 10 bestanden, keine Fehler |
| Bestehende Navigation, Sprachwechsel und Kontaktabläufe | 37 bestanden, sieben plattformbedingt übersprungen |
| Alle 30 Inhaltsadressen und zwei Fehlerseiten bei 320, 390, 1280 und 1920 Pixel Breite | 128 Ansichten ohne Überlauf, defekte Bilder, fehlende Logos oder JavaScript-Fehler |
| Browser-Icons und beide Link-Vorschaubilder | Erfolgreich geladen und visuell geprüft |

Die neuen Browserfälle prüfen die Logo-Dateien und Rücklinks, verspätetes Laden der Animation, lautlose Wiedergabe ohne Schleife, Dauer unter fünf Sekunden, Pause und Wiederholung, reduzierte Bewegung, Datensparen und die statische Darstellung nach einem echten Medienfehler. Ein späteres Pause-Ereignis darf einen bereits festgestellten Medienfehler nicht überschreiben; dieser Sonderfall wurde korrigiert.

Bei der lokalen Safari-Prüfung wurde der native Mediendownload durch die Netzwerk-Interception des Testwerkzeugs nicht zuverlässig blockiert. Der Fehlerfall verwendet daher eine tatsächlich fehlende Videoadresse und prüft die Reaktion auf deren HTTP-Fehler.

Sichtprüfungen umfassen die Kopfzeile auf Desktop und Mobiltelefon, das mobile Menü bei 320 Pixel Breite, den persönlichen Abschnitt mit laufender Animation, den weissen Footer und die Link-Vorschau in beiden Sprachen. Die Bilder liegen unter artifacts/logo-integration/. Maschinenlesbare Belege liegen unter .tmp/brand-integration/: unit-check.json, browser-check.json, brand-final.json und layout-check.json.

## Stand zur Abnahme

Die lokale Website läuft auf Port 3110. Es wurde kein Commit, Push oder Deployment für diese Logo-Integration ausgeführt. Die vorherige sprachliche Überarbeitung und die bereits vorhandenen Änderungen im Arbeitsverzeichnis sind enthalten.
