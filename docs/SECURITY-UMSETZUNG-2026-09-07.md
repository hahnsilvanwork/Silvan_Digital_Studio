# Security- und Rechtsverbesserungen vom 7. September 2026

## Umsetzung im Projekt

- Alle vier Demos liefern Formulare ohne JavaScript deaktiviert aus. Erst nach Installation der lokalen Ereignisbehandlung werden sie nutzbar. Zusätzliche CSP verhindert Formularübertragung. Überflüssige simulierte Einwilligung und Versandmetadaten in Falkenried entfernt; neun Formularrouten werden in 36 Browserfällen geprüft.
- Statische Seiten und Fehlerseiten erhalten eine **durchgesetzte** Ressourcenrichtlinie mit pro Dokument berechneten SHA-256-Werten für Inline-Skripte. Kein allgemeines `unsafe-inline` oder JavaScript-`unsafe-eval` im Hauptdokument. Styles benötigen weiterhin Inline-Freigabe. Der Build verweigert unbehandelte dynamische Seiten, ISR und neue Route-Handler.
- Die 3D-Ansicht wurde in eine Sandbox ohne `allow-same-origin` ausgelagert. Nur dort sind die für Spline erforderliche dynamische Codeausführung und konkret begrenzte externe Ressourcen erlaubt. Die Hauptseite und ihre Anfragefelder bleiben unzugänglich. Spline-Einstiegscode erhält SHA-384-Integritätsprüfung; Nachrichtenbrücke akzeptiert nur den zugehörigen Frame und fest definierte Nachrichtentypen.
- Die vier echten Modelle wurden mit externen Originalressourcen geprüft. Hierbei wurden auch Googles Draco-Decoder und Modellschriften erkannt; die Datenschutzhinweise wurden entsprechend ergänzt. Ein Integritätstest weist veränderten Laufzeitcode zurück. Modellfehler lassen Produktbild und Anfrage verfügbar.
- Eigenständige Demo-Pakete erhalten Framing-, Referrer-, Geräteberechtigungs- und Formularschutz, eine statische CSP sowie sichtbare Datenschutzhinweise. Generierte Assets bleiben vom Git-Repository und Upload ausgeschlossen und werden beim Build erzeugt.
- GitHub Actions sind auf konkrete Commit-Hashes festgelegt, Checkout speichert keine Git-Credentials. Dependabot-Konfiguration deckt Actions und fünf npm-Projekte ab. Vorhandene Tests/Audits bleiben erhalten; der frühere README-Zeichenvergleich wurde korrigiert.
- Rechtstexte in Deutsch/Englisch zentralisiert und erweitert: Anbieter, unverbindliche Anfragen, Preise/Versand, Drittanbieter, Datenflüsse, Kontakt, Aufbewahrung und Betroffenenrechte. Nicht bestätigte Aussagen zu Handelsregister/MWST sowie pauschale Vertrags-/Haftungsgarantien entfernt. Gesetzliche Rechte werden nicht pauschal ausgeschlossen.
- Die Präsenz-Seite trennt den kostenlosen Google-Dienst von der eigenen Dienstleistung, wahrt die Inhaberschaft des Kunden und verlinkt den erforderlichen Google-Drittanbieterhinweis.
- Umfangreiches Rechtsdossier, konkrete interne Offerten-/Vertragsentwürfe, Datenschutzbetriebsabläufe und Nachweismatrix erstellt. 106 versionierte Medien wurden mit SHA-256 inventarisiert; das Inventar erfindet keine Lizenzen.
- Ein wiederholbarer Quellcode-Backup-/Wiederherstellungslauf wurde ergänzt. Lokale Sicherung ist von unabhängiger, verschlüsselter Ausfallsicherung zu unterscheiden.

## Nachweise und Prüfgrenzen

Die aktuelle Quellcodeprüfung umfasst statische Analyse, Unit-Tests, produktionsnahe Browserprüfungen und reale Spline-Ladevorgänge. Maschinenlesbare Ausgaben liegen unter dem lokal ignorierten `artifacts/security/`, Build-/Testsuite-Logs unter `artifacts/security-*.log`.

Abschlussnachweise vom 7. September 2026:

- Lint und TypeScript-Prüfung erfolgreich.
- 292 Unit-Tests in 25 Dateien bestanden.
- Vollständige Browsersuite: 207 bestanden, 21 bewusst übersprungen (projektabhängige Desktop-/Mobilfälle und nur einmal erforderliche Skriptprüfungen), insgesamt 228 Fälle über Chromium, Firefox, WebKit und mobiles Safari-Profil.
- Produktionsbuild und alle vier Demo-Builds erfolgreich; der abschliessende Hauptbuild härtete 98 HTML-Dokumente.
- Alle vier echten Spline-Modelle geladen: vor Aktivierung keine Viewer-Drittanbieterabrufe, keine durchgesetzten CSP-Verletzungen beim Laden, Zugriff auf Eltern-Dokument und Speicher gesperrt. Separater Test bestätigt Zurückweisung manipulierter Einstiegsskripte.
- 36 Demo-Formularfälle prüfen neun Routen bei deaktiviertem JavaScript, blockierten Skripten sowie Enter-/Klickbedienung; in die Browsersuite integriert.
- Hauptprojekt-Abhängigkeitsaudit: keine gemeldeten Schwachstellen. Das ist eine Aussage zur abgefragten Datenbank, keine Garantie unbekannter Fehlerfreiheit.
- Quellcode-Backup erfolgreich erzeugt, in einen separaten lokalen Ordner wiederhergestellt und alle 519 enthaltenen Dateien per SHA-256 geprüft. Archiv unter `C:\Users\StartKlar\Documents\Website Backups`; aktueller Nachweis in `artifacts/security/backup-result.json`. Keine unabhängige externe Sicherung und keine Sicherung von Kontoeinstellungen, E-Mails oder Git-Historie.

Die Originalressourcen wurden über das Netz geprüft; die Website- und Browserabnahme erfolgte lokal mit dem Produktionsbuild. Eine erneute Prüfung der tatsächlichen Hostingauslieferung bleibt nach Veröffentlichung erforderlich.

Eine Meta-CSP wird im Browser wirksam, erscheint aber nicht als `script-src` im HTTP-Header. Die Framing- und Sandboxdirektiven werden zusätzlich als HTTP-Header ausgeliefert. Nach Deployment muss die tatsächlich ausgelieferte HTML-Datei geprüft werden; ein Hosting-Adapter könnte Build-Artefakte anders verarbeiten. Unvorhergesehene Plattformfehler oder Nexts dynamische Notfall-Fehlerausgabe sind nicht durch den statischen Hashnachweis abgedeckt. Es wurden keine Last-/DDoS-Angriffe, keine vollständige historische Geheimnisprüfung und keine unabhängige Penetrationstest-Zertifizierung vorgenommen.

Die SRI-Prüfung schützt die versionierte Spline-Einstiegsdatei, nicht automatisch jede nachgeladene Datei. Die Sandbox und die enge Ressourcenrichtlinie begrenzen die verbleibende Vertrauensgrenze. Eine Isolation ist keine datenschutzrechtliche Transfergarantie: beim Abruf externer Dateien werden weiterhin Verbindungsdaten übermittelt.

## Bestätigte und verbleibende externe Aufgaben

**Vercel Hobby ist über authentifizierte API bestätigt.** Ein kommerziell zulässiger Tarif/Host und passende Vertragsgrundlagen sind erforderlich. Der DPA des Anbieters gilt nicht allein deshalb für das vorhandene Hobby-Konto, weil eine öffentliche DPA-Seite existiert. Es wurde weder ein kostenpflichtiger Wechsel vorgenommen noch eine Behörde oder ein Anbieter kontaktiert.

AHV-/Register-/MWST-Status, Absatzmärkte, Gmail-Tarif, Datenübermittlungsgrundlagen/-länder, NFC-Herkunft/Konformität und Bild-/Markenrechte benötigen konkrete Bestätigungen. Der über die API sichtbare Vercel-Regionwert `iad1` belegt keine ausschliessliche US-Datenhaltung; die API lieferte auch keinen belastbaren MFA-Status. MFA, Wiederherstellungscodes, Branch-Schutz, Alarmempfänger, Domainzahlung und externe Backups wurden daher nicht als aktiviert ausgegeben.

Siehe [Nachweise und offene Punkte](legal/NACHWEISE-UND-OFFENE-PUNKTE.md) für konkrete Zuständigkeiten. Vertragsvorlagen sind interne Arbeitsdokumente und noch keine mit Kunden vereinbarten AGB. Die Rechtstexte sind verbessert, aber wegen dieser Tatsachenlücken nicht als umfassend rechtlich freigegeben zu verstehen.

## Veröffentlichung

Die Änderungen werden lokal auf `security-legal-hardening-2026-09-07` vorbereitet und geprüft. Die bestehende Live-Website ist durch die lokalen Änderungen nicht automatisch aktualisiert. Eine Veröffentlichung darf erst anhand der tatsächlichen Hostingentscheidung und der bestätigten Veröffentlichungsangaben erfolgen. Es gibt keine neu gebuchte Zahlung und keine abgegebene amtliche Anmeldung.
