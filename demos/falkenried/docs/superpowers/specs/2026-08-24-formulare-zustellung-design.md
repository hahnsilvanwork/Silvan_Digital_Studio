# Formulare und Zustellung – Design

Stand: 24. August 2026\
Status: vom Auftraggeber freigegeben

## Ziel

Die bestehenden Kontakt-, BMW-, Gartenbau- und Immobilienanfragen erhalten ein einheitliches, ehrliches Versandverhalten. Web3Forms übernimmt die spätere Zustellung an `info@falkenried.example`. Ohne konfigurierten Access Key bleibt die Demo sichtbar, behauptet aber niemals eine erfolgreiche Zustellung.

## Architektur

`ContactForm.astro` bleibt die zentrale Formular-Komponente. Eine kleine Konfigurationsfunktion entscheidet anhand von `PUBLIC_WEB3FORMS_KEY`, ob der Versand aktiv ist. Alle Formulare senden an denselben Web3Forms-Endpunkt; Bereich, Seitensprache, Seitenquelle und optional eine Objekt-ID werden als Metadaten mitgesendet.

Die Aktivierung erfolgt ausschließlich über die Umgebungsvariable. Der Key wird weder im Repository noch im ausgelieferten Quelltext dokumentiert.

## Verhalten ohne Key

- alle Felder bleiben sichtbar, damit das Layout überprüfbar ist
- oberhalb des Buttons erscheint ein Demo-Hinweis
- der Button ist deaktiviert und eindeutig beschriftet
- Telefon und `info@falkenried.example` werden als direkte Alternativen angeboten
- es gibt keine simulierte Erfolgsmeldung

## Verhalten mit Key

- Pflichtfelder werden im Browser validiert
- eine explizite Datenschutz-Einwilligung ist erforderlich
- ein unsichtbares Honeypot-Feld reduziert Bot-Spam
- während des Versands ist der Button gesperrt
- Web3Forms-Erfolg zeigt eine bestätigte Erfolgsmeldung
- Netzwerk-, Validierungs- und Anbieterfehler zeigen eine verständliche Fehlermeldung
- Formulardaten bleiben bei einem Fehler erhalten

## Routing und Metadaten

Alle Nachrichten gehen an `info@falkenried.example`. Der Betreff kennzeichnet den Bereich:

- Allgemeine Anfrage
- Autowerkstatt
- Gartenbau
- Immobilien
- Immobilien – konkrete Objektanfrage

Zusätzlich werden Sprache und Quellseite immer übermittelt; eine Objekt-ID wird nur bei einer konkreten Immobilienanfrage ergänzt. Der Empfänger kann dadurch Nachrichten zuordnen, ohne mehrere Empfängeradressen zu pflegen.

## Sicherheit und Datenschutz

- kein Access Key im Git-Verlauf
- keine sensiblen Daten in Analytics-Ereignissen
- Datenschutzhinweis direkt am Formular
- nur erforderliche Felder erheben
- keine Dateiuploads in dieser Etappe
- keine Newsletter-Einwilligung mit der Kontaktanfrage koppeln

## Tests und Abnahme

Die Implementierung folgt Test-First und deckt mindestens ab:

- Demo-Modus ohne Key
- aktiver Modus mit syntaktisch vorhandenem Key
- korrekter Bereichsbetreff
- optionale Objekt-ID
- Honeypot und Datenschutzpflicht
- echte Erfolgs- und Fehlerzustände
- keine bisherige falsche Erfolgssimulation

Abnahme: Datentests, Komponententest beziehungsweise statischer Vertragstest, `astro check` und Produktions-Build bestehen. Die Vorschau bleibt im Hintergrund erreichbar.

## Nicht enthalten

- Beschaffung des echten Web3Forms-Keys
- eigener Mailserver
- Dateianhänge
- CRM-Integration
- geschütztes Kundenkonto
