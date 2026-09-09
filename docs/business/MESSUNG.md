# Messdefinitionen und Anfragenregister

Ein Datensatz im Blatt **Anfragen** entspricht einer tatsächlich eingegangenen Anfrage, nicht einem Klick. Wiederholte Nachrichten zum selben Anliegen erhalten dieselbe ID. Kundennamen und Nachrichten bleiben im geschützten Kommunikationssystem; im Register möglichst eine private Beleg-ID verwenden. Testfälle als `TEST-…` kennzeichnen und aus Geschäftsauswertungen ausschliessen.

| Messwert | Definition | Quelle / Begrenzung |
|---|---|---|
| Kontakt geöffnet | Registrierte Öffnung eines vorbereiteten E-Mail-/WhatsApp-Links im gewählten Zeitraum | Analytics nur nach verifizierter Aktivierung; Mehrfachklicks möglich, keine Sendebestätigung |
| Anfrage eingegangen | Einmalige echte Anfrage mit Eingangszeit | Tatsächlicher Posteingang, Anruf oder anderer Eingang |
| Qualifiziert | Leistung grundsätzlich passend, Ziel/Umfang und nächster Schritt mit Kontakt geklärt | Datum setzen, Begründung privat dokumentieren; Budget unbekannt sichtbar lassen |
| Offerte | Konkrete versionierte Offerte tatsächlich zugestellt | Versand-/Übergabebeleg und Datum; Entwurf zählt nicht |
| Auftrag | Konkrete Offerte tatsächlich angenommen | Annahmebeleg und Datum |
| Reaktionszeit | Erstreaktion minus tatsächlicher Eingang | Kalenderstunden, Geschäftszeit separat definieren, sofern gewünscht |
| Arbeitszeit | Tatsächlich geleistete Beratung, Herstellung, Administration, Korrekturen, Support | Zeitprotokoll je Auftrag; Schätzwerte separat halten |

Monatlich eine Eingangskohorte bilden: alle echten Anfrage-IDs mit Eingang im gewählten Monat. Für dieselben IDs zum angegebenen Auswertungsstichtag qualifizierte Fälle / Eingänge, Offerten / qualifizierte Fälle und Annahmen / Offerten berechnen. Offene Fälle und Zahl der Fälle immer dazuschreiben. Bei leerem Nenner Ergebnis **nicht verfügbar**. Nicht die Offerten dieses Monats durch Eingänge dieses Monats teilen, wenn sie zu unterschiedlichen Kohorten gehören.

Öffnungen bleiben ein separater aggregierter Monatswert; sie lassen sich nicht zuverlässig zu einzelnen eingegangenen Nachrichten verbinden. Daher keine Conversionrate „gesendet / geöffnet“ als gemessenen Funnel behaupten. Nicht messbare Monate bleiben leer. Eine verifizierte Null ist erlaubt. Der Plattformwert kann durch blockiertes Tracking oder Mehrfachklicks beeinflusst sein.

Für jedes reale Projekt ein privates Zeitprotokoll führen: `Datum;Anfrage-ID;Tätigkeit;Ist-Minuten;Abrechenbar;Notiz`. Die Summe / 60 in **Ist-Zeit h** übernehmen. Tätigkeiten: Beratung, Umsetzung, Korrektur, Administration, Support. Aufwände ab dem ersten Gespräch erfassen; verlorene Offerten sind ebenfalls Arbeitszeit und dürfen in der Gesamtwirtschaftlichkeit nicht verschwinden.

Vorlage für Monatswerte: [messung-monat.csv](messung-monat.csv). Das Blatt **Anfragen** bietet 100 vorbereitete Zeilen. Für weitere Datensätze die Excel-Tabelle erweitern und Datumsformate/Validierungen prüfen. Vertrauliche Arbeitskopie separat verschlüsselt sichern, Zugriff begrenzen und Lösch-/Aufbewahrungsregeln aus dem [Datenschutz-Betriebsplan](../legal/DATENSCHUTZ-BETRIEB.md) auf die konkreten Daten anwenden.
