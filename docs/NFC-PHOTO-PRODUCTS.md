# NFC-Produkte aus Fotos · erster Import vom 8. September 2026

## Nachtrag vom 9. September 2026: Airbnb 031 und 032

031 (quadratisch) und 032 (rund) ergänzen den Katalog als vollständig individuell gestaltete Airbnb-Karten für jeweils CHF 99. Beide stehen in der Kategorie „Individuell“, mit eigenen Hauptbildern aus `031 product.png` / `032 product.png`, lokalen GLB-Modellen und gerenderten 3D-Vorschaubildern. Die deutschen und englischen Anfragen übernehmen Airbnb, Fully Customized und die jeweilige Form.

Die Fronttexturen stammen unverändert aus den gelieferten Referenzbildern; die Bildausschnitte sind im Manifest kalibriert. Nicht gelieferte Rückseiten bleiben neutral weiss. Die Modellproportionen von 80 × 80 × 2 mm sind wie bei den bestehenden Karten nur Annäherungen; die Website nennt „Grösse nach Absprache“. Insgesamt sind jetzt 31 Modelle aus 33 Referenzbildern sowie 31 Hauptbilder zugeordnet, einschliesslich NFC-Chip 030.

## Aktueller Stand: Hauptbilder und korrigierte Nummer

Alle 28 Produkte haben ein eigenes importiertes Hauptbild. Die quadratische WhatsApp-Karte wurde vom Nutzer von 022 auf 009 umnummeriert; Referenzfoto und `009 product.png` sind entsprechend zugeordnet. 022 bezeichnet nur noch TikTok. Die bestehende technische ID `nfc-022-whatsapp` bleibt erhalten, damit gespeicherte Produktlinks und Anfragen weiterhin funktionieren. Die historischen Angaben zur doppelten Nummer weiter unten sind damit überholt.

## Kundensicht: Namen und kompakte Filter

## Hauptbilder aus dem Fotoordner

Dateien wie `001 product.png` werden über `npm run products:images` unverändert nach `public/images/products/main/` kopiert und dem bestehenden Produkt zugeordnet. Der Import läuft auch vor `npm run dev`, `npm run build` und `npm run products:rebuild`. Aktuell sind 001–007 importiert; die gelieferte Schreibweise `003 poduct.png` wird ebenfalls erkannt. Bei der doppelten Nummer 022 muss der Plattformname enthalten sein, etwa `022 WhatsApp product.png`. Unbekannte Nummern und mehrere Hauptbilder für dasselbe Produkt brechen den Import mit einer eindeutigen Meldung ab.

Die Zuordnung steht in `src/content/nfc-main-images.json`. Fehlen Originale auf dem Build-Server, bleiben importierte Bilder erhalten. Neue Bilder werden beim nächsten Import übernommen; es läuft kein dauerhafter Ordner-Watcher. 3D-Vorschaubilder und GLBs bleiben separat, und der interaktive Viewer öffnet weiterhin erst per Button. Produkte ohne eigenes Hauptfoto behalten ihre bisherige Vorschau.

Die Bildnummern bleiben ausschliesslich in der internen Zuordnung und in technischen IDs. Sichtbare Produktnamen, 3D-Dialogtitel und Anfragetexte enthalten keine Bildnummern. Ähnliche Varianten werden mit „Personalisiert“ / „Individuell“ bzw. „Personalized“ / „Custom“ unterschieden. Unter 44rem Breite ersetzt ein beschriftetes natives Auswahlfeld die Kategorien-Schaltflächen; darüber erscheinen kompakte, direkt anklickbare Filter mit Stückzahl. Beide verwenden denselben URL-basierten Auswahlzustand und setzen die Produktleiste beim Wechsel zurück.

## Nachtrag: zweiter Fotosatz 024–029

Sechs weitere Fotos sind integriert, insgesamt 28 GLB-Modelle aus 30 Bilddateien. Nummer 030 wurde angefragt, ist im Fotoordner aber noch nicht vorhanden.

- 024: rechteckige Standard-Menükarte, neu, CHF 49.
- 025/026: runde/quadratische Standard-Menükarten, ersetzen die bisherigen Menü-Platzhalter, CHF 49.
- 027: vollständig individuell gestaltete Menükarte, gemäss Dateiname „fully customiced“, CHF 99. Ersetzt den bisherigen Eintrag `menu-personalized-white`; die technische ID bleibt für bestehende Links erhalten, Paket und Beschreibung sind jetzt Fully Customized.
- 028: vollständig individuelles Booking-Design, CHF 99; ersetzt `booking-custom-blue`.
- 029: personalisierte Google-Review-Karte mit Logo, CHF 69; ersetzt `review-personalized-black`.

Damit sind sämtliche bisherigen Katalog-Platzhalter durch fotografierte Modelle ersetzt. Die ersten 22 Modelle bleiben Standardprodukte. Neue Paketmetadaten steuern Preise, Personalisierung und Anfrageformular konsistent. Alle sechs neuen Rückseiten sind mangels separater Fotos neutral; die dunkle Booking-Rückseite übernimmt den Navy-Grundton.

Die unten stehenden Angaben dokumentieren den ersten Import; Mengen und fehlende Modelle dieses Nachtrags haben Vorrang.

24 Original-PNGs aus `NFC Cards` ergeben 22 Standardprodukte. 001 und 007 haben zwei Ansichten. Die doppelte Nummer 022 gehört zu zwei verschiedenen Produkten (TikTok und WhatsApp); Plattform und Nummer bilden gemeinsam die Zuordnung. Nummern 009 und 012 sind im gelieferten Satz nicht vorhanden.

## Ergebnis

- Google Reviews: 8 neue Modelle (einschliesslich vier ersetzter bisheriger Modelle).
- Tripadvisor: 2 neue Modelle.
- Social Media: 9 neue Modelle für Instagram, TikTok, YouTube und Facebook.
- WhatsApp / Kontakt: 3 neue Modelle.
- Alle 22 ohne Personalisierung, zum bestehenden Standardpreis CHF 49.
- Fünf bisherige Katalogeinträge ohne neue Fotos bleiben erhalten; ihre bisherigen 3D-Platzhalter bleiben sichtbar.
- Deutsch und Englisch, Kategorieauswahl und Modellübernahme ins Anfrageformular sind integriert.

## Dateien und Wiederholung

`public/models/nfc/` enthält 22 eigenständige GLB-Dateien mit eingebetteten PNG-Texturen. Sie lassen sich auch ausserhalb dieser Website in einem GLB-kompatiblen Programm öffnen. `public/images/products/nfc/` enthält die aus diesen Modellen gerenderten Katalogbilder.

Die geprüfte Zuordnung und die vier Bildecken jeder bedruckten Fläche stehen in `scripts/nfc-photo-manifest.mjs`. `src/content/nfc-import.json` wird daraus generiert. Texte und Kategorien werden in `src/content/photo-products.ts` lokalisiert.

Nach Ergänzung oder Änderung der Zuordnungen:

```powershell
npm run products:rebuild
npm run typecheck
npm test
npm run build
```

Mit laufender lokaler Website auf Port 3100 prüft `npm run check:viewer` alle 22 Modelle nochmals auf erfolgreiche Anzeige, externe Netzwerkanfragen und Verstösse gegen die Sicherheitsrichtlinie. Eine andere Testadresse kann über `VIEWER_CHECK_URL` gesetzt werden.

`products:rebuild` erzeugt zuerst die GLBs und danach die Vorschaubilder in einem lokalen Chromium-Browser. Originalbilder werden nicht verändert. Neue, noch nicht zugeordnete Fotos führen zu einer verständlichen Fehlermeldung, damit nichts stillschweigend vergessen oder mit einem falschen Produkt zusammengeführt wird. Perspektive, Form und Produktgruppierung müssen bei neuen Fototypen einmal geprüft werden; dies ist keine beliebige automatische Photogrammetrie.

Die Website selbst benötigt weder den Fotoordner noch eine Spline-Verbindung. Sie verwendet die bereits exportierten Dateien. Der Viewer wird erst beim Öffnen geladen und unterstützt Maus/Finger, Zoom/Pinch, Pfeiltasten, +/- sowie Vorderseite, Rückseite und Zurücksetzen. Bei Fehlern bleibt das Vorschaubild sichtbar und es gibt eine Wiederholen-Schaltfläche. Schliessen bricht Ladevorgänge ab und gibt Grafikressourcen frei.

## Grenzen und bewusste Annahmen

- Aufsteller: 76 mm Breite, 127,5 mm Höhe und 50 mm Fuss entsprechen den abgebildeten Massangaben. Nicht fotografierte Bauteile, Biegeverlauf und ca. 2 mm Materialdicke sind angenähert.
- Rechteckige Karten: 54 × 85,6 × 0,8 mm dienen nur als Modellproportion. Runde/quadratische Platten: 80 × 80 × 2 mm. Diese Masse sind nicht vom Benutzer bestätigt und werden nicht als zugesicherte Produktmasse angezeigt. Das Anfrageformular verwendet „Grösse nach Absprache“.
- 001 und 007 nutzen die jeweils zweite gelieferte Ansicht als Rückseite.
- Bei allen anderen Modellen ist die Rückseite im passenden Grundton neutral. Farbverläufe ohne separate Rückseite werden dort auf einen passenden einfarbigen Ton reduziert.
- 018–023 zeigen hinter der Vorderseite einen teilweise verdeckten Schutzliner mit Aufdruck. Daraus lässt sich keine vollständige Rückseite ablesen; der Liner wurde deshalb nicht als frei erfundene vollständige Druckfläche rekonstruiert.
- Logos, Schrift, QR-Motive und auch bereits im Originalfoto sichtbare Reflexionen bleiben im Foto erhalten. Die Auflösung ist durch die gelieferten Bilder begrenzt. Die QR-Ziele in diesen Referenzfotos wurden nicht als individuelle Kundenziele eingerichtet.
- Dies sind interaktive Produktvisualisierungen, keine geprüften Fertigungs- oder 3D-Druckdateien.

Es wurde lokal umgesetzt und geprüft. Keine Veröffentlichung oder Bestellung wurde ausgelöst.

Validierung: Produktions-Build, TypeScript und ESLint erfolgreich; 325 Tests vor der zusätzlichen CSP-Regression erfolgreich; 34 Browserprüfungen in Chromium und mobilem Safari erfolgreich. Zusätzlich sind alle GLBs auf gültige Geometrie, Indizes und eingebettete Texturen geprüft. Die Einzelprüfung der lokalen Modelle kontrolliert auch das Freigeben der Ansicht und die CSP.
