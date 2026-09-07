# Startseite: Logo, Video, Kundenstimmen und FAQ-Navigation

Stand: 24. August 2026\
Status: vom Auftraggeber freigegeben

## Ziel

Die Dachmarke wird in der Navigation bildlich erkennbar, das bestehende Unternehmensvideo erhält auf der Startseite einen hochwertigen Einstieg und drei echte Kundenstimmen stärken das Vertrauen. Die drei FAQ-Bereiche werden mittig und gleichmässig in ihrer Leiste verteilt.

## Navigation und Logo

Das neu bereitgestellte Bild `Screenshot 2026-08-24 142342.png` ersetzt den Text „Falkenried Gruppe“ im Header. Es wird als optimiertes lokales Asset übernommen und mit sinnvollem Alt-Text verlinkt. Die sichtbare Höhe bleibt auf Mobilgeräten kompakt und auf Desktop proportional; die bestehende dreispaltige Header-Geometrie und damit die stabile Zentrierung der Hauptnavigation bleiben unverändert. Weil das Logo einen weissen Hintergrund besitzt, wird es nicht künstlich freigestellt oder verzerrt.

## Unternehmensvideo

Auf der deutschen und englischen Startseite folgt nach den drei Geschäftsbereichen ein grosszügiger Videoabschnitt. Das Video `NEg-SNOsgyk` erscheint zunächst als lokale Vorschau mit Titel, Play-Schaltfläche und kurzer Einführung. Erst nach bewusster Aktivierung wird ein `youtube-nocookie.com`-Iframe geladen; YouTube erhält daher nicht bereits beim ersten Seitenaufruf eine Verbindung. Ohne JavaScript bleibt ein normaler externer YouTube-Link verfügbar.

## Kundenstimmen

Direkt unter dem Video erscheint der Abschnitt „Kundenstimmen“ mit den drei gelieferten Originalzitaten von H. B. aus Nassenwil, J. W. aus Bachs und C. H. aus Schleinikon. Auf Desktop werden sie als drei gleichwertige Karten verteilt, auf Mobilgeräten untereinander. Die Zitate werden nicht inhaltlich verändert. Auf der englischen Seite bleiben sie bewusst deutsch und erhalten den Hinweis „Original customer quote in German“, damit keine Übersetzung als Original ausgegeben wird.

## FAQ-Bereichsauswahl

Die Ursache der linksbündigen Darstellung liegt im Tablisten-Flexlayout ohne Verteilungsregel. Die drei Schaltflächen erhalten auf grösseren Ansichten den gleichen verfügbaren Anteil und zentrierten Text; auf kleinen Ansichten dürfen sie sauber umbrechen beziehungsweise die volle Breite nutzen. ARIA-Rollen, Auswahlzustände und bestehende Tab-Funktion bleiben erhalten.

## Tests und Abnahme

- Logo ist lokal eingebunden, besitzt Alt-Text und verändert die mittige Desktop-Navigation beim Sprachwechsel nicht.
- Das Vorschaubild ist sichtbar; der YouTube-Iframe wird erst nach Klick und über `youtube-nocookie.com` erzeugt.
- Alle drei Originalzitate und Herkunftsangaben erscheinen auf DE und EN.
- Die drei FAQ-Tabs sind gleich breit und zentriert.
- Datentests, Komponentenverträge, Layouttest, `astro check` und Produktions-Build bestehen.
- Startseite und FAQ werden im laufenden Server auf Desktop- und Mobilbreite visuell geprüft.

## Nicht enthalten

- Autoplay beim Seitenaufruf
- Tracking oder YouTube-Cookies vor Zustimmung/Klick
- Slider oder automatische Rotation der Kundenstimmen
- inhaltliche Bearbeitung oder erfundene Übersetzung der Zitate
