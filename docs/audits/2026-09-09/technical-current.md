# Technischer Stand – SILVAN, 9. September 2026

Geprüft: öffentliche Website https://silvandigital.ch und aktueller, bereits umfangreich veränderter Arbeitsstand. Keine Websiteänderungen oder Veröffentlichung durch dieses Audit. Alte Auditbefunde wurden nicht als aktuelle Fehler übernommen.

## Aktuelle Ergebnisse

| Prüfung | Ergebnis | Grenze |
|---|---|---|
| Live-Crawl, 15 Routen je Sprache | 30 × HTTP 200; keine erfassten JavaScript-Laufzeitfehler | Seitenaufrufe, keine vollständige Prüfung jedes Interaktionszustands |
| axe, 30 Routen, Chromium 390 × 844 | 0 gemeldete Verstösse; kein horizontaler Überlauf | WCAG 2 A/AA und 2.1 AA; kein vollständiger WCAG-2.2- oder Screenreader-Nachweis |
| Meta-/SEO-Grundlagen | eindeutige Seitentitel, je ein H1, Canonicals, DE/EN/x-default im HTML, sprachpassendes html lang, JSON-LD | Keine Search-Console-Daten oder Zusicherung tatsächlicher Indexierung |
| Crawling-Endpunkte | robots.txt und sitemap.xml 200; fehlende DE/EN-Routen 404 mit passendem html lang | 404-Stichprobe, kein vollständiger Redirect-Audit |
| Indexsteuerung | /hello und /en/hello absichtlich noindex, follow; nicht in Sitemap | Kein Fehler |
| Netzwerk bei normalen Seitenaufrufen | keine erfassten Ressourcen von anderen Origins | Externe Kontaktlinks und nachgeladene Interaktionen getrennt betrachten; Hostinglogs nicht sichtbar |
| Header | HSTS, nosniff, DENY, Permissions-Policy, Referrer-Policy, Header-CSP und Meta-CSP vorhanden | Kein Penetrationstest, keine Prüfung von Konto/MFA/Berechtigungen |
| Live-Erreichbarkeit | Hauptseite, Kontakt, NFC und vier eigenständige Demostarts erfolgreich | Kein vollständiger neuer Unterseitenaudit aller vier Demos |
| ESLint und TypeScript | erfolgreich | Aktueller lokaler Arbeitsstand; kein neuer Gesamtproduktionsbuild |
| Unit-/Komponententests | 38 Testdateien, 411 Tests erfolgreich | Kein erneuter Gesamtlauf aller E2E-Suiten |
| npm audit Haupt-Lockfile | 2 moderate Paketmeldungen, eine gemeinsame Vitest-Advisory; keine high/critical | Entwicklungswerkzeuge, keine nachgewiesene Live-Ausnutzbarkeit |
| npm audit vier Demo-Lockfiles | jeweils 0 gemeldete Schwachstellen | Stand der Registry-Advisories zum Prüfzeitpunkt |

Die Unit-Tests geben Next/Image-Warnungen zu quality=90 aus. Die reale next.config.ts erlaubt [75,90], und die live erfassten Bilder liefern keinen entsprechenden Laufzeitfehler. Daher zunächst Testumgebung prüfen; keine belegte kaputte Produktionskonfiguration melden.

## Geschwindigkeit

Chromium, 390 × 844 CSS-Pixel, DPR 1, 4-fache CPU-Drosselung, 150 ms Netzlatenz, 1,6 Mbit/s Download, 750 kbit/s Upload, Browsercache deaktiviert. Drei frische Browserkontexte pro Route, Beobachtung bis acht Sekunden nach DOMContentLoaded, kein Scrollen. Live-CDN; kein erzwungener kalter CDN-Cache. Auf demselben Rechner liefen weitere Prüfungen: orientierende Laborwerte, keine standardisierte Lighthouse-Wertung und keine Feldmessung.

| Route | LCP Läufe | Median LCP | CLS alle Läufe | Beobachtete Ressourcenübertragung* |
|---|---|---|---|---|
| / | 1,360 / 1,336 / 1,464 s | 1,360 s | 0 | ca. 345 kB |
| /reviews | 1,880 / 2,016 / 1,848 s | 1,880 s | 0 | ca. 421 kB |
| /work | 1,552 / 1,484 / 1,480 s | 1,484 s | 0 | ca. 361 kB |

*Summe der Resource-Timing-transferSize-Werte im Beobachtungsfenster, ohne Hauptdokument und ohne späteres Scrollen/3D. Kein Gesamtgewicht der Seite. Das bestehende Messskript schreibt irrtümlich „local server lab only“ in sein conditions-Feld; sein base-Feld und der Aufruf belegen https://silvandigital.ch. Die tatsächlichen Bedingungen stehen oben.

Alle neun LCP-Werte sind unter 2,5 Sekunden. Das ist ein guter Hinweis, aber keine Aussage, dass reale Nutzer die Core Web Vitals bestehen. INP wurde nicht belastbar bestimmt. Ziel im späteren Feldmonitoring: LCP ≤ 2,5 s, INP ≤ 200 ms und CLS ≤ 0,1 jeweils am 75. Perzentil. Quelle: [Google Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).

Vorhandene Optimierungen erhalten: serverseitiger Seiteninhalt, lokale Schrift, responsive Bildauslieferung mit AVIF/WebP, optionales statt initiales 3D, pausierte Bewegung ausserhalb des sichtbaren Bereichs. Bei späteren Änderungen zuerst den konkreten Engpass messen, dann Bildpriorität, Ladeverzögerung, Bildgrösse oder JavaScript-Arbeit bearbeiten. Quellen: [LCP optimieren](https://web.dev/articles/optimize-lcp), [INP optimieren](https://web.dev/articles/optimize-inp).

## Konkrete technische Folgeschritte

### T01 – P2: Vitest kontrolliert aktualisieren

Belegt durch package.json (vitest 3.2.7), Haupt-Lockfile-Audit und [GHSA-82fw-gwwq-j7x9](https://github.com/advisories/GHSA-82fw-gwwq-j7x9). Zwei Paketmeldungen betreffen denselben Fehler in vitest/@vitest/mocker. Er betrifft Entwicklungsserver unter bestimmten Erreichbarkeits-/Pluginbedingungen; keine Behauptung, dass die statisch ausgelieferte Website angreifbar ist. Die Advisory nennt 4.1.11 als gepatchte Version; npm schlägt 5.0.0 vor. Für die Umsetzung kompatible, unterstützte Version mit Vite/Plugin-Konfiguration wählen, bewusst migrieren und alle 411 Tests, Typen und Lint erneut prüfen. Kein blindes audit fix --force. Der vorhandene CI-Audit-Grenzwert moderate würde diesen Stand beanstanden; der tatsächlich letzte GitHub-Lauf wurde nicht abgerufen.

### T02 – P3: Sitemap-Revisionsdatum pflegen

src/app/sitemap.ts setzt alle lastModified-Werte auf 2026-09-07, obwohl inhaltliche Veröffentlichungen am 8./9. September dokumentiert sind. Live-Sitemap bestätigt das Datum. Pro Route ein zutreffendes Inhaltsdatum führen oder ein unzuverlässiges Datum weglassen. Nicht bei jedem Build blind heute einsetzen. Abnahme: geänderte NFC-Seite und unveränderte Seiten haben nachvollziehbare Daten. Quelle: [Google Sitemap-Erstellung](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

### T03 – P2: Messung und Verkaufserfolg verbinden

src/components/layout/PrivacySafeTelemetry.tsx und src/lib/telemetry-client.ts enthalten bereits optionale Ereignisse und Web-Vitals-Berichte. Normale Live-Aufrufe zeigten keine Analytics-Netzwerkanfragen. Ob Messung im Konto deaktiviert ist oder verwertbare historische Daten vorliegen, ist damit nicht abschliessend geklärt. Konfiguration und Datenschutz zuerst prüfen. Ein Öffnen von WhatsApp/E-Mail ist ein Übergabeereignis, keine gesendete oder eingegangene Anfrage. Ergänzend ein manuelles Leadregister mit Quelle, Interesse, qualifizierter Anfrage, Offerte, Auftrag und Aufwand führen. Ein einfacher Prozess reicht vor den ersten Kunden.

### T04 – P2: Reproduzierbare Veröffentlichungen sichern

Der Arbeitsbaum enthält viele bereits vorhandene Änderungen und neue Dateien, die Hauptseite und vier Demo-Deployments betreffen. Das belegt keine verlorenen Daten, erhöht aber den Aufwand, einen Stand exakt wiederherzustellen. Nach der nächsten Umsetzung einen geprüften Commit/Release und Deployment-IDs für Hauptseite und Demos festhalten; Wiederherstellung anhand des vorhandenen Backup-Prozesses nachweisen. Bestehende Nutzeränderungen erhalten. Keine Git-Bereinigung Bestandteil dieses Audits.

## Belege

- Live-Crawl: artifacts/audit-2026-09-09/crawl.json und reproduzierbares crawl.mjs.
- Barrieren: artifacts/final-audit/accessibility-2026-09-09-live.json.
- Performance: artifacts/final-audit/performance-2026-09-09-live.json.
- Dependency-Rohdaten: artifacts/audit-2026-09-09/dependencies-main.json.
- Manuelle, unabhängige Interaktionsprüfung: browser-independent.md.
