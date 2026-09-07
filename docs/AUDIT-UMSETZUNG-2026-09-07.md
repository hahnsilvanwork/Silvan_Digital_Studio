# Umsetzung des Website-Audits

Stand: 7. September 2026. Bezug: [ursprünglicher Audit](WEBSITE-AUDIT-2026-09-07.md).

## Kurzfassung

Die im Projekt umsetzbaren Korrekturen und Verbesserungen sind implementiert und lokal gegen einen Produktionsbuild geprüft. Das Anfrageformular hat einen vollständigen Modell-Übergabe- und Prüfablauf mit WhatsApp-, E-Mail- und Kopieroption. Sicherheitsheader, Vorschau-Schutz, aktualisierte Demo-Abhängigkeiten und automatische Prüfabläufe sind vorbereitet. Inhalte, mobile Darstellung und Bildauslieferung wurden verbessert.

**Nach ausdrücklicher Freigabe am 7. September 2026 veröffentlicht:** Hauptwebsite unter https://silvandigital.ch und alle vier eigenständigen Vercel-Demos. Es wurde nichts ins Git-Repository gepusht und keine Kontaktanfrage versendet. Bestehende lokale Arbeiten wurden erhalten.

## Was konkret umgesetzt wurde

| Auditpunkt | Umsetzung und Ergebnis |
| --- | --- |
| Unsichtbares Linkfeld blockiert Anfrage | Validierung berücksichtigt nur relevante sichtbare Felder; Fehlerfokus bleibt bei sichtbaren Eingaben. Der genaue Fehlerablauf ist durch Tests abgesichert. |
| Technische Werte in der Bestätigung | Gemeinsame deutsche/englische Darstellung für Zusammenfassung, WhatsApp, E-Mail und kopierten Text; verständliche Anwendung, Form, Grösse und Einrichtung. |
| Nur WhatsApp als Formularausgang | E-Mail mit vorbereitetem Text und Kopierfunktion ergänzt. Bei verweigerter Zwischenablage erscheint ein manuell kopierbarer Text. |
| Katalog und Formular getrennt | „Dieses Modell anfragen“ übernimmt das Modell und passende Felder. Kategorie und Modell sind über öffentliche Kennungen teilbar; personenbezogene Eingaben stehen nicht in diesen URLs. Änderungen, Kategorie-Wechsel und erneute Modellwahl verwerfen veraltete Bestätigungen. |
| Unbegrenzte Eingaben | Sichere ganze Mengen von 1 bis 999; verständlicher Hinweis für grössere Aufträge. Begrenzte Textfelder und Zeichenzähler. Die Eingabe 1000 wird als ungültig erkannt und nicht unbemerkt auf 100 gekürzt. HTTPS-Ziele mit eingebetteten Zugangsdaten werden abgewiesen. |
| Unklarer erster Schritt / Pflichtangaben | Erst „Angaben prüfen“, danach den Kontaktkanal wählen. Firma und Kontaktperson sind optional; Paketeinheiten werden erklärt. |
| Datenschutz und externe Inhalte | DE/EN erklären Spline nach bewusster Aktivierung und die Datenübergabe bereits beim Öffnen des vorbereiteten WhatsApp-Links. Kurzer 3D-Hinweis am Katalog; Datum aktualisiert. |
| Fehlende Schutzheader | Erzwungene CSP-Basis gegen fremde Basis-URLs, Plugins und Einbettung; zusätzlich nosniff, DENY, eingeschränkte Geräteberechtigungen und strict-origin als Referrer-Policy. Header und Referer ohne Anfrageparameter in Browser-Tests geprüft. |
| Breitere CSP | Ressourcen-/Skript-Richtlinie als Report-Only ergänzt. Die vollständige Skriptsperre ist bewusst noch nicht erzwungen; siehe offene Aktivierung unten. |
| Vorschauen können indexierbar sein | Explizite Nichtproduktionsumgebung verhindert Canonicals und Indexierung auch bei versehentlich gesetzter Produktions-URL. URL-Validierung und SEO-Regressionstests ergänzt. |
| Verwundbare Demo-Abhängigkeiten | Alle vier Projekte gezielt aktualisiert, einschliesslich Salon-Migration auf Next 16 und passender ESLint-Konfiguration. Alle Demo-Exporte neu gebaut; alle fünf Paketbäume melden beim abschliessenden Audit null bekannte Schwachstellen. |
| Zu grosse Demo-Veröffentlichungen | Referenzprüfung und gemeinsame Export-Dateiliste; acht unreferenzierte JPGs werden nicht mehr ausgeliefert. 25.003.349 Bytes pro Veröffentlichungsformat eingespart. Originale erhalten. Präfix- und eigenständige Demo-Auslieferung sind dokumentiert. |
| Erstes sichtbares Bild | Hohe Ladepriorität für das erste Hero-Bild und präzisere responsive Bildgrössen. Weitere Bilder werden nicht pauschal hoch priorisiert; 3D bleibt auf Anfrage geladen. |
| Leistungsumfang / Folgekosten | Umfang, Inhalte, Korrekturen, Zeitrahmen und Support werden bei Website-Angeboten angesprochen; Domain/Hosting als Zusatzkosten kenntlich. Konkrete Werte werden schriftlich angeboten, statt unbelegte Garantien einzuführen. |
| NFC-Konditionen | Liefer-, Versand-, Einrichtungs-, Kompatibilitäts-, Änderungs- und Ersatzhinweise direkt beim Preisbereich zusammengeführt. Nicht festgelegte Konditionen werden vor Bestellung in der Offerte geklärt. |
| Lange mobile Seite | Anwendungen und Prozess in zugänglichen aufklappbaren Details; Preise bleiben sichtbar. Footer mobil kompakter, mit vollständigen zugänglichen Namen der Kontaktlinks. |
| Allgemeine Einleitung / wiederholtes Projekt | Sichtbarer Bezug zu Schweizer KMU und Zürich; unterschiedliche Projekte im Hero und in der Projektauswahl. |
| Sprachpflege | Neue gemeinsame DE/EN-Inhaltsmodule für Home, Angebotsbedingungen, Anfrage und Messung. |
| Anfragen und reale Ladezeiten messen | Optionale, datensparsame Kontakt-/Anfrageereignisse und numerische LCP-/INP-/CLS-Werte implementiert. Nur bekannte Seitenpfade; keine Formularinhalte, Query-Strings oder Fragmente in den Anwendungsmeldungen. DNT/GPC werden berücksichtigt. Standardmässig deaktiviert. |
| Automatische Qualität | GitHub-Workflows für Lint, Typecheck, Unit-Tests, Produktionsbuild und vier Browserprojekte. Eigene Build-Matrix aller vier Demos mit vorhandenen Lint-/Falkenried-Tests. |
| Automatische Sicherheitskontrolle | Haupt-Lockfile und alle vier Demo-Lockfiles ausdrücklich einbezogen; zusätzlich wöchentlicher Abhängigkeitscheck. |
| Verfügbarkeit / Betrieb | Stündlicher Workflow für sieben öffentliche Einstiegsseiten und echte 404-Antwort; prüft auch sichtbare Überschrift und JavaScript-Ausnahmen. Betriebs-, Alarmierungs-, Wiederherstellungs- und Aktivierungsanleitung ergänzt. |
| Staler Sprachtest / Testlücken | Aktueller Steiner-Projektslug; zusätzliche Regressionen für Formular, Modellübergabe, Fokus, Zwischenablage, Sicherheit, SEO und Messung. |
| Echtes 3D | Alle vier verfügbaren echten Szenen mit sichtbarem Canvas und abgeschlossenem Ladezustand im lokalen Produktionsbuild geöffnet; keine JavaScript-Ausnahmen. Mock-Tests bleiben zusätzlich für Dialog-/Fokusverhalten erhalten. |
| Lokale NoFallbackError-Meldung | Untersucht; unbekannte Route liefert weiterhin echten HTTP 404 mit Schutzheadern. Kein nachgewiesener Besucherfehler, deshalb keine spekulative Änderung der Routinglogik. Beobachtung im Betriebshandbuch dokumentiert. |
| Altcode / Dokumentation / Sitemap | Ungenutzte ProductShowcase-Komponente und ihre ausschliesslichen Inhaltsstrukturen entfernt; aktuelle Katalogtests erhalten. README, Demo-Betrieb und Inhaltsrevision der Sitemap aktualisiert. |

## Abschliessende Prüfung

| Prüfung | Ergebnis |
| --- | --- |
| Hauptprojekt ESLint / TypeScript | Bestanden |
| Hauptprojekt Produktionsbuild | Bestanden, Grundlage der abschliessenden Browser-Suite |
| Hauptprojekt Unit-Tests | **291 bestanden, 0 fehlgeschlagen** |
| Hauptprojekt Browser-Tests | **174 bestanden, 18 übersprungen, 0 fehlgeschlagen**; Chromium, Firefox, WebKit und emuliertes iPhone |
| Zusätzliche Ansichten | 6 Seiten bei 390 und 1440 px; alle HTTP 200, keine defekten Bilder, horizontalen Überläufe oder JavaScript-Ausnahmen |
| Automatisierte Barrierefreiheit | Keine axe-Verstösse in diesen 12 Ansichten und in der Anfragebestätigung |
| Visuelle Kontrolle | Desktop-Startseite, mobile Start-/NFC-Seite, Anfragebestätigung und echtes 3D kontrolliert |
| Echte Spline-Integration | Alle 4 Szenen geladen; Anwendung und Canvas vorhanden, Ladeanzeige beendet, keine JavaScript-Ausnahmen |
| Demo-Builds | Alle 4 bestanden |
| Falkenried-Quelltests | 35 bestanden |
| Demo-Auslieferung | 56 mobile Routen einschliesslich Framework-Fehlerseiten, 55 interne Linkziele und 2.244 HTML-Ressourcenreferenzen geprüft; Menü-/Formular-Smokes bestanden |
| Abhängigkeits-Audit | Hauptprojekt plus 4 Demos: jeweils 0 bekannte Schwachstellen zum Prüfzeitpunkt |
| Mobile Lighthouse-Nachmessung, lokal | Home 94/100, LCP 3,1 s; NFC 93/100, LCP 3,3 s; jeweils CLS 0. Die LCP-Erkennung bestätigt beim Home-Bild hohe Priorität und frühe Entdeckung. |

Die 18 übersprungenen Browserfälle sind weiterhin konfigurierte Browser-/Viewport-Ausnahmen; sie werden nicht als bestanden gezählt. Beim Salon verbleibt ein vorhandener Lint-Hinweis zur statischen Hero-Bildausgabe, kein Buildfehler. Automatische Accessibility-Tests und Browseremulation ersetzen keine vollständige Screenreader- oder Realgeräteprüfung.

Die neuen Lighthouse-Einzelläufe betreffen den lokalen Produktionsserver, die ursprünglichen 98/97-Punkte-Läufe dagegen die Live-Domain. Sie sind kein kontrollierter Vorher-/Nachher-Vergleich und belegen keine messbare Beschleunigung. Die lokalen LCP-Werte liegen noch über 2,5 Sekunden; nach Veröffentlichung sind mehrere vergleichbare Messungen und reale Besucherdaten erforderlich. Beide neuen JSON-Berichte wurden ohne Messfehler oder Laufwarnungen gespeichert; die CLI endete anschliessend erneut beim Aufräumen temporärer Chrome-Verzeichnisse mit Windows-EPERM.

## Was ausserhalb des Codes noch offen ist

- **Veröffentlichung erledigt:** Hauptseite und alle vier Demo-Exports wurden auf die bestehenden Produktionsprojekte veröffentlicht. Der Live-Smoke prüft Schutzheader, Produktions-Canonical, fehlendes noindex, Anfragebestätigung und vorbereitete Kontaktlinks, englische NFC-Seite sowie ein vollständig geladenes echtes 3D-Modell. Die Verfügbarkeitsprüfung bestätigt sieben Einstiegsseiten und einen echten HTTP 404.
- **CI und Alarmierung aktivieren:** Workflows müssen im GitHub-Repository vorliegen und Actions aktiviert sein. Branch-Schutz, Benachrichtigungen, zuständiger Empfänger sowie Vercel-Logalarme sind Kontoeinstellungen. Die Dateien allein aktivieren diese nicht.
- **Messung aktivieren:** Vercel-Projekt und Tarif auf Analytics/Custom-Events prüfen; dann `NEXT_PUBLIC_MEASUREMENT_ENABLED=true` setzen und neu bauen. Erst nach Prüfung realer Payloads und Dashboard-Eingang gilt die Messung als in Betrieb. Derzeit werden keine neuen Messdaten behauptet.
- **CSP weiter ausrollen:** Die Basis wird erzwungen, die breitere Skript-Richtlinie läuft nur als Report-Only. Für vollständige Durchsetzung müssen Next-Inline-Skripte pro Build sicher berücksichtigt werden. Ein zentraler Report-Empfänger ist nicht eingerichtet; Details und Vorgehen stehen im Betriebshandbuch.
- **Geschäftskonditionen festlegen:** Konkrete NFC-Lieferzeit, Versandkosten sowie Hosting-/Wartungstarife sind nicht vorgegeben. Die Website erklärt deshalb die Klärung in der schriftlichen Offerte. Verbindliche Zahlen können nach deiner Festlegung eingetragen werden.
- **Echte Nachweise ergänzen:** Kundenstimmen und Projektresultate benötigen reale Belege und Freigaben. Search Console, Unternehmensprofil und tatsächliche Suchnachfrage brauchen Kontozugriff; kein Ranking oder Geschäftserfolg wurde erfunden.
- **Reale Nutzung prüfen:** iOS-/Android-Geräte, tatsächliche Nachrichtenzustellung und ausreichend reale Ladezeit-/Conversion-Daten bleiben Betriebsschritte. Es wurde keine Anfrage an dich oder Dritte versendet.

## Dokumentation und Belege

- [Betrieb und Aktivierung](OPERATIONS.md)
- [Demo-Betrieb](DEMO-OPERATIONS.md)
- [Browser- und Accessibility-Ergebnisse](../artifacts/audit-remediation/browser-qa.json)
- [Echte 3D-Modelle, vollständig geladen](../artifacts/audit-remediation/real-models-confirmed.json)
- [Browser-Testprotokoll](../artifacts/audit-remediation-e2e-final.txt)
- [Unit-Testbericht](../artifacts/audit-remediation-unit.json)
- [Lighthouse lokal: Home](../artifacts/audit-remediation/lighthouse-home.json) und [NFC](../artifacts/audit-remediation/lighthouse-reviews.json)
- [Demo-Abhängigkeitsprüfung](audits/demo-dependencies-2026-09-07.json)
- [Demo-Veröffentlichungsprüfung](audits/demo-publication-2026-09-07.json)

Screenshots und weitere Rohbelege liegen unter `artifacts/audit-remediation/`. Dieses Verzeichnis ist lokal ignoriert und muss bei Weitergabe des Berichts separat mitgeliefert werden.
