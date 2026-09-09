# NFC/QR – mobile Vereinfachung

Auftrag: Preisreihenfolge CHF 15 → 49 → 69 → 99; anschliessend gezielte Verbesserung der mobilen Verständlichkeit. Bestehendes Design, Preisstaffeln und Produktfunktionen erhalten.

## Befunde und Änderungen

- Preisreihenfolge in beiden Sprachquellen korrigiert: NFC-Sticker, Standard Card, Personalized Card, Fully Customized Card.
- Auf kleinen Bildschirmen bestand kein horizontaler Überlauf; Formulareingaben waren bereits 52px hoch und mit 16px Schrift bedienbar.
- Die ausgewählte Anfrage wiederholte Modelldaten und stellte optionale Namen vor die nötige Zielseitenangabe. Ergänzende Modelldaten sind jetzt über ein natives Details-Element abrufbar, Bild und Einzelpreis bleiben sichtbar. Zielseite und gegebenenfalls URL stehen vor den optionalen Angaben.
- Kürzere Einleitung und Mengenhinweise; doppelte Versand-/Offertenhinweise im Mengenrabatttext entfernt. Konditionen und bestätigte Staffelpreise bleiben vollständig zugänglich.
- Hauptaktionen „Angaben prüfen“ und WhatsApp nutzen auf dem Handy die volle Formularbreite. Desktopdarstellung bleibt kompakt.
- Zusätzlicher direkter Anfrage-Link nach dem Preisvergleich verkürzt den Weg zum Formular.

## Geprüft

- 407 Unit-/Komponententests bestanden; TypeScript/Produktionsbuild, gezieltes ESLint und Diffprüfung erfolgreich.
- 24 Browserprüfungen in Chromium/Mobile Safari für Modellübernahme, Preisberechnung, Fokus, Kontaktdaten und neue mobile Darstellung bestanden; vier zusätzliche Prüfungen in Firefox/WebKit ebenfalls erfolgreich.
- DE/EN, 320/390px sowie Desktop berücksichtigt. Neues Details-Element per Klick geöffnet/geschlossen, Pflichtfeldreihenfolge, volle Aktionsbreite, Mindestzielhöhe 44px und Abschluss der unverbindlichen Anfrage geprüft.
- Automatische axe-Prüfung der ausgewählten Anfrage ohne gefundene Verstösse. Keine formale WCAG-Zertifizierung.
- Kontrollierte Vorher-/Nachher-Messung bei gleichem Modell: Formularhöhe bei 390px von rund 1554px auf 1345px reduziert (rund 209px); bei 320px von 1804px auf 1509px. Normale mobile Viewportaufnahme bestätigt korrekte Darstellung; lange Elementaufnahmen können feste Header als Aufnahme-Artefakt einblenden.

Auf https://silvandigital.ch veröffentlicht. Abschliessend 38 Live-Browserprüfungen in Chromium und Mobile Safari bestanden, einschliesslich Preisreihenfolge, Modelldetails, Anfrageabschluss, Grundkosten, Sprachwechsel und Kontaktwege. Demoquellen in diesem Auftrag unverändert. Keine Nachrichten versendet, keine Kunden-/Produktdaten erfunden.
