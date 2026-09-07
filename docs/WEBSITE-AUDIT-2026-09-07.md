# SILVAN Digital Studio – Website-Prüfung vom 7. September 2026

## Kurzfazit

Die Hauptwebsite ist technisch gut aufgestellt: schnell, mobil sauber, klar gestaltet und mit umfangreichen Tests. Ein kompletter Neubau ist nicht nötig. Die wichtigsten Verbesserungen sind zwei echte Fehler im NFC-Anfrageformular, Sicherheitsupdates in den separaten Demo-Projekten, zusätzliche Schutzheader und präzisere Datenschutzangaben. Danach lohnen sich ein einfacherer Anfrageablauf und bessere Informationen zu Leistungen und Folgekosten.

Geprüft wurden der aktuelle lokale Hauptprojektstand, https://silvandigital.ch und die vier verlinkten Live-Demos. Bestehende lokale Änderungen wurden nicht korrigiert oder überschrieben. Dieser Bericht ist eine Bestandsaufnahme mit Verbesserungsvorschlägen; es wurden keine Website-Änderungen veröffentlicht.

## 1. Umfang, Methoden und Ergebnisse

| Prüfung | Ergebnis |
| --- | --- |
| ESLint Hauptprojekt | Ohne gemeldete Fehler |
| TypeScript Hauptprojekt | Ohne gemeldete Fehler |
| Produktionsbuild | Im Playwright-Webserver-Aufruf erfolgreich; Browser-Tests starteten gegen diesen Build |
| Vitest | 19 Testdateien, 261 Tests bestanden |
| Playwright | 168 Fälle: 146 bestanden, 18 übersprungen, 4 fehlgeschlagen |
| Browser | Chromium, Firefox, WebKit und emuliertes iPhone 13 |
| Live-Sitemap | Alle 28 Seiten mit HTTP 200 erreichbar |
| Live-Linkprüfung Hauptdomain | 62 eindeutige interne URLs inklusive Anker-Varianten geprüft; keine HTTP-Fehler |
| Barrierefreiheit | axe-core 4.10.3: keine automatisiert erkannten WCAG-A/AA-Verstösse in 33 Seiten-/Viewport-Kombinationen |
| Mobilansicht | Alle 28 Sitemap-Seiten bei 390 px ohne horizontalen Überlauf |
| Weitere Breiten | Startseite, Websites, NFC, Arbeiten und Kontakt auch bei 320, 768, 1024, 1440 und 1536 px ohne horizontalen Überlauf |
| Live-Demos | Falkenried 44, Café 5, Steiner 2 und Salon 4 Seiten: insgesamt 55 mobile Seitenprüfungen bestanden |
| Demo-Prüfinhalt | HTTP-Status, sichtbare H1, geladene Bilder, JavaScript-Ausnahmen, horizontaler Überlauf und interne Linkziele |
| Echtes 3D | Ein Live-Modell in Chromium geöffnet: Spline erst nach Klick geladen, Modell bereit, keine JavaScript-Ausnahme |
| HTTPS / Domain | HTTP → HTTPS per 308; www → Hauptdomain per 301; HSTS vorhanden |
| Fehlerseite | Unbekannte Live-URL liefert echten HTTP 404 |

Die vier Browser-Fehler sind derselbe veraltete Test in vier Browserprojekten, nicht vier verschiedene Websitefehler. Die 18 übersprungenen Fälle sind überwiegend Viewport-/WebKit-spezifische Ausnahmen, etwa ein auf Desktop nicht vorhandenes Mobilmenü. Das bedeutet auch: Fokusfallen werden dadurch nicht in jeder Browserkonfiguration tatsächlich getestet.

Grenzen: Kein Zugriff auf Vercel-Kontoeinstellungen, WAF, Rechnungen, Suchmaschinen-Konsolen, Analytics-Auswertungen, Mailzustellung oder Produktionslogs. Kein Lasttest, invasiver Penetrationstest oder vollständiges Screenreader-/Realgeräte-Labor. Demo-Quellprojekte wurden auf Abhängigkeiten und ihre ausgelieferten Seiten geprüft; ihre separaten Builds, Lint- und Unit-Suiten wurden nicht alle neu ausgeführt. Automatische Accessibility-Tests sind kein Nachweis vollständiger WCAG-Konformität. Es wurden keine Nachrichten versendet.

## 2. Sofort priorisieren

### P1 – Ausgeblendetes Linkfeld blockiert NFC-Anfragen

**Belegt:** `src/lib/validation.ts:116` prüft `destinationUrl` auch dann, wenn `setup` das Feld ausblendet. `ReviewInquiryConfigurator.tsx` behält beim Wechsel die Werte bei und sucht anschliessend ein nicht mehr vorhandenes Feld für den Fehlerfokus.

**Reproduktion auf der Live-Seite:** Anfrage ausfüllen → „Link ist vorhanden“ wählen → ungültigen Link eintragen → auf „Ziel muss noch eingerichtet werden“ wechseln → Anfrage fortsetzen. Ergebnis: „Ein Feld muss noch ausgefüllt oder korrigiert werden“, aber kein sichtbares ungültiges Feld und kein Weg zur Bestätigung.

**Auswirkung:** Interessenten können in einer scheinbar vollständig ausgefüllten Anfrage stecken bleiben.

**Massnahme:** Nur sichtbare/relevante Felder validieren oder den nicht mehr relevanten URL-Wert bewusst zurücksetzen. Fehlerfokus ausschliesslich auf sichtbare Felder legen. Regressionstest mit genau diesem Wechsel ergänzen. **Aufwand:** klein.

### P1 – Demo-Abhängigkeiten mit Sicherheitswarnungen

`npm audit --json` am Prüftag meldet folgende Anzahl betroffener Pakete, einschliesslich transitiver und Entwicklungsabhängigkeiten:

| Projekt | Mittel | Hoch | Kritisch | Gesamt |
| --- | ---: | ---: | ---: | ---: |
| Hauptwebsite | 0 | 0 | 0 | 0 |
| Steiner | 0 | 4 | 0 | 4 |
| Café Vogel | 0 | 4 | 0 | 4 |
| Falkenried | 1 | 5 | 0 | 6 |
| Salon Lumière | 0 | 11 | 1 | 12 |

**Einordnung:** Dies sind Paketwarnungen, keine nachgewiesenen ausnutzbaren Lücken auf den Live-Seiten. Next-Demos werden mit `output: "export"` als statische Dateien veröffentlicht. Server-Actions-/Middleware-Lücken sind dort nicht automatisch erreichbar. Build-Werkzeuge und eventuell ausgelieferter Client-Code müssen trotzdem aktualisiert werden. Insbesondere Salon verwendet laut `package.json` noch Next 14.2.5.

**Massnahme:** Zuerst Salon, dann die übrigen Demo-Abhängigkeiten gezielt aktualisieren; direkte und transitive Pakete getrennt prüfen. Keine blinde Aktualisierung mit `--force`. Danach jeweils bauen, Exporte neu erzeugen und Interaktionen sowie Links testen. Beim Salon reicht eine vom Tool vorgeschlagene Patchversion möglicherweise nicht zur Behebung aller Warnungen; das Ergebnis erneut kontrollieren. **Aufwand:** mittel, Salon eventuell grösser.

### P1 – Datenschutz beschreibt externe Inhalte unvollständig

**Belegt:** `src/content/de.ts` und `en.ts` erwähnen Spline nicht. Beim Öffnen eines 3D-Modells lädt der Browser JavaScript von `cdn.spline.design` sowie die Szene von `prod.spline.design`. Vor dem Klick wurden keine Spline-Anfragen beobachtet.

Zusätzlich behauptet der Abschnitt „Anfrage für Review Cards“, Daten gelangten erst beim Abschicken der Nachricht zu WhatsApp. Tatsächlich enthält bereits der ausgehende `wa.me`-Link die Anfrage im URL-Parameter `text`. Beim Öffnen dieses Links wird die URL an den externen Dienst übermittelt; das spätere Absenden an den Empfänger ist ein weiterer Schritt.

**Massnahme:** Spline, Zweck und Aktivierungszeitpunkt beschreiben. WhatsApp-Text an den tatsächlichen Ablauf anpassen: Datenübergabe beim Öffnen des vorbereiteten Links, Versand an Silvan erst bei Bestätigung in WhatsApp. Optional direkt am 3D-Knopf einen kurzen Hinweis auf den externen Inhalt ergänzen. Die Texte sind technisch zu korrigieren; eine abschliessende rechtliche Bewertung ist damit nicht verbunden. **Aufwand:** klein.

### P2 – Schutzheader fehlen auf der Hauptdomain

**Belegt:** Live-Antwort der Startseite enthält HSTS, aber keine `Content-Security-Policy`, kein `X-Content-Type-Options`, keine explizite `Referrer-Policy`, keine `Permissions-Policy` und kein `X-Frame-Options`. `next.config.ts` definiert keine Header. Das Fehlen bedeutet nicht, dass ein Angriff gelungen ist; zusätzliche Schutzschichten fehlen.

**Massnahme:** `nosniff` und eine passende Referrer-Policy ergänzen; ungenutzte Geräteberechtigungen beschränken. Einbettung mit CSP `frame-ancestors` regeln. CSP zunächst als Report-Only testen und passend zu Next-Inline-Skripten, JSON-LD, Analytics und Spline entwickeln. Nicht pauschal Inline-Skripte abschalten, weil damit Funktionen ausfallen können. Die Richtlinie kontrolliert erlaubte Ressourcen und kann XSS-Risiken begrenzen: [MDN zu CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy). **Aufwand:** mittel.

## 3. Funktion und Anfrageablauf

### P2 – Bestätigung zeigt technische Werte

**Belegt:** `src/components/reviews/ReviewInquiryConfigurator.tsx:139` gibt `values[field.name]` direkt aus. Live erscheinen `menu`, `personalized-card`, `round`, `100` und `ready`. Die WhatsApp-Nachricht selbst übersetzt diese Werte bereits korrekt in `src/lib/whatsapp.ts`.

**Massnahme:** Dieselbe zentrale Zuordnung für Zusammenfassung und Nachricht verwenden: „Digitales Menü“, „Personalized Card“, „Rund“, „100 × 100 mm“, „Link ist vorhanden“. Beide Sprachen testen. **Aufwand:** klein.

### P2 – Konfigurierte Anfrage nur über WhatsApp

**Belegt:** Der Konfigurator erzeugt ausschliesslich einen WhatsApp-Link. E-Mail und Telefon sind auf der Website vorhanden, übernehmen aber nicht die bereits erfassten Konfigurationsdaten.

**Auswirkung:** Wer WhatsApp nicht nutzt oder am Geschäftscomputer nicht anmelden kann, muss Angaben erneut übertragen.

**Massnahme:** „Anfrage kopieren“ und optional „Per E-Mail anfragen“ direkt in der Bestätigung anbieten. Ein eigenes Backend ist dafür zunächst nicht notwendig. **Aufwand:** klein bis mittel.

### P2 – Produktwahl und Anfrage sind getrennt

Der Produktkatalog filtert Produkte und öffnet 3D, übergibt jedoch keine Produktauswahl an das Formular. Besucher müssen das betrachtete Modell erneut zuordnen; Farbe und Gestaltung landen teilweise im Freitext.

**Massnahme:** Einen Knopf „Dieses Modell anfragen“ anbieten, der Anwendung, Produkttyp und passende Gestaltung vorwählt und zum Formular führt. Kategorien bei Bedarf in URL-Parametern abbilden, damit ein konkreter Zustand teilbar ist. **Aufwand:** mittel.

### P2 – Freitext und Menge sind unbegrenzt

**Belegt:** Eingabefelder haben keine `maxLength`; `isPositiveInteger` prüft nur Ziffern und einen Wert ab 1. Sehr grosse Zahlen sowie beliebig lange Nachrichten werden nicht sinnvoll begrenzt. Lange Inhalte führen zu sehr grossen WhatsApp-URLs; ein konkretes Versagen bei einer bestimmten URL-Länge wurde nicht getestet.

**Massnahme:** Sinnvolle Feldlängen festlegen, Menge auf eine sichere ganze Zahl und geschäftlich sinnvolle Obergrenze prüfen; grössere Aufträge als individuelle Anfrage zulassen. Einen Zeichenzähler für Nachrichten ergänzen. **Aufwand:** klein.

### P3 – Umfang des Formulars und Schaltflächentext

Bis zu acht Pflichtfelder sind für eine unverbindliche Erstanfrage relativ viel. Der erste Knopf „Anfrage in WhatsApp öffnen“ öffnet tatsächlich zuerst eine interne Prüfung.

**Massnahme:** Erster Schritt „Angaben prüfen“, zweiter Schritt „In WhatsApp öffnen“. Unternehmens-/Kontaktangaben nur verpflichtend machen, wenn sie für die erste Rückmeldung gebraucht werden. Bei zwei Karten im Paket klar erklären, ob „Menge“ Pakete oder einzelne Karten meint. **Aufwand:** klein; Entscheidung zur Angebotslogik nötig.

## 4. Geschwindigkeit und Laden

Mobile Lighthouse-13.4.1-Messungen gegen die Live-Domain mit simulierter Drosselung:

| Messwert | Startseite | NFC & QR |
| --- | ---: | ---: |
| Performance | 98/100 | 97/100 |
| Accessibility | 100/100 | 100/100 |
| Best Practices | 100/100 | 100/100 |
| SEO | 100/100 | 100/100 |
| LCP | 2,3 s | 2,6 s |
| CLS | 0 | 0 |
| Total Blocking Time | 70 ms | 90 ms |
| Übertragene Gesamtmenge im Messlauf | 318 KiB | 371 KiB |

Das sind einzelne Laborläufe, keine repräsentativen Besucherdaten. Andere Audits liefen auf demselben Rechner; Werte können schwanken. Die JSON-Berichte sind vollständig und enthalten weder `runtimeError` noch `runWarnings`. Beide CLI-Prozesse endeten erst beim anschliessenden Aufräumen temporärer Chrome-Verzeichnisse mit einem Windows-EPERM-Fehler. Die Messwerte wurden davor gespeichert.

**P2 – Erstes Produktbild stärker priorisieren:** Lighthouse bemängelt auf beiden Seiten das fehlende `fetchpriority=high` für das LCP-Bild. In `ProductHero.tsx` ist das erste Bild zwar eager, hat aber keine hohe Fetch-Priorität. Nur das erste sichtbare Bild gezielt priorisieren; nicht alle Bilder gleichzeitig. Bildgrössen nach tatsächlichem Layout präzisieren. Geschätztes Bild-Einsparpotenzial: etwa 30 KiB auf Home und 14 KiB auf NFC. Danach mit mehreren ruhigen Messläufen vergleichen.

**P3 – JavaScript fein optimieren:** Lighthouse sieht etwa 27–28 KiB ungenutztes JavaScript. Das ist bei den vorhandenen Gesamtwerten kein Anlass für einen Frameworkwechsel. Zuerst tatsächlich ungenutzte Komponenten entfernen; optionale 3D-Laufzeit weiterhin erst auf Klick laden.

**P3 – Echte Besucherdaten ergänzen:** LCP, INP und CLS über reale Besucher beobachten. Aktuell ist Vercel Analytics eingebunden; eine Web-Vitals-/Speed-Insights-Integration wurde im Quellcode nicht gefunden. TBT aus dem Labor ist kein gemessener INP. Die üblichen guten Grenzwerte sind LCP ≤ 2,5 s, INP ≤ 200 ms und CLS ≤ 0,1 am 75. Perzentil: [Web Vitals](https://web.dev/articles/vitals).

### P3 – Alte Demo-Bilddateien aus den Veröffentlichungen entfernen

In `public/demos/handwerk` liegen unter anderem `proj-4.jpg` mit 6.674.150 Bytes sowie `hero-handwerk.jpg` und `team.jpg` mit je 4.168.802 Bytes. Der gesamte Handwerk-Export umfasst rund 25,9 MiB, Café 9,6 MiB, Falkenried 15,2 MiB und Salon 2,4 MiB.

Die Live-Steiner-Seite lädt bereits WebP-Versionen. Die grossen JPGs sind daher kein belegter Engpass ihres normalen Seitenaufrufs. Sie vergrössern aber unnötig Exporte und Deployment-Pakete.

**Massnahme:** Vor Entfernung Referenzen aller Exportseiten prüfen; unbenutzte Originale ausserhalb des öffentlichen Verzeichnisses archivieren. Veröffentlichungen aus einer definierten Dateiliste erzeugen. Doppelte Bereitstellung unter `/demos/...` und separaten Vercel-Domains vereinheitlichen oder bewusst dokumentieren; alte Links durch Weiterleitungen erhalten.

## 5. Design, Verständlichkeit und Conversion

**Beibehalten:** Die ruhige Schwarz-/Weissgestaltung, grosszügige Typografie, klare Trennlinien und echten Projekt-Screenshots ergeben eine konsistente Website. Die mobile Reihenfolge ist verständlich. Das persönliche Foto schafft Nähe. Konzeptprojekte sind sichtbar gekennzeichnet; Kundenreferenzen werden nicht erfunden. Preise, Prozess, FAQ und direkte Kontaktmöglichkeiten sind vorhanden.

**P2 – Leistungsumfang konkreter machen:** Die Website-Pakete geben Preisbereiche und grobe Leistungen an. Domain und Hosting sind im FAQ ausdrücklich ausgeschlossen. Direkt bei den Paketen fehlen aber schnell vergleichbare Angaben zu Seitenumfang, Korrekturrunden, Inhaltslieferung, Wartung/Support und typischem Zeitrahmen. Nur tatsächlich angebotene Leistungen zusagen; laufende Kosten sichtbar neben den Einmalpreisen erklären.

**P2 – NFC-Kaufentscheidungen erleichtern:** Angaben zu Versand, Lieferzeit, Einrichtung, Kompatibilität, späterer Änderung der Zielseite und Ersatz bei defekten Karten übersichtlich zusammenstellen. Nicht alles muss im ersten Bildschirm stehen; eine kurze Leistungs-/Lieferübersicht bei den Preisen reicht. Fehlende Konditionen zuerst geschäftlich festlegen.

**P3 – Mobile NFC-Seite verdichten:** Katalog, ausführliche Preisblöcke, Anwendungen, Prozess, langes Formular, FAQ, Kontakt und grosser Footer ergeben eine lange Seite. Die Inhalte sind brauchbar, wiederholen jedoch teilweise dieselbe Erklärung. Anwendung und Modell früher verbinden, Preise nahe dem ausgewählten Produkt halten und technische Details in aufklappbare Bereiche legen. Die getesteten Mindestfunktionen und Preistransparenz erhalten.

**P3 – Ersten Eindruck präzisieren:** „Mehr Kunden. Weniger Aufwand.“ ist eingängig, aber allgemein. Die anschliessende Erklärung enthält bereits Websites und digitale Lösungen. Den Bezug zu Schweizer KMU/Zürich im sichtbaren Einleitungstext stärker machen. Das Falkenried-Bild erscheint im Hero und nochmals bei den Arbeiten; gegebenenfalls dort ein anderes Projekt zeigen, um schneller die Bandbreite zu vermitteln.

**P3 – Kontakt doppelt vorhanden:** Auf der Kontaktseite und nach langen Inhaltsseiten folgt auf die ausführlichen Kontaktzeilen ein Footer mit ähnlichen Angaben. Mobil kann der Footer kompakter sein. Mindestens einen klaren Kontaktweg plus Impressum/Datenschutz immer erhalten.

**P3 – Vertrauensbelege ausbauen:** Sobald vorhanden, echte Projektresultate, nachvollziehbare Vorher-/Nachher-Beispiele und freigegebene Kundenstimmen ergänzen. Bei Konzepten konkrete Designentscheidungen zeigen statt hypothetischer Umsatzversprechen. Ein neuer Blog, Chatbot oder Shop ist für das aktuelle Angebot nicht automatisch erforderlich.

Diese Punkte sind fachliche Design-/Conversion-Einschätzungen anhand der Screenshots und Inhalte. Eine tatsächlich höhere Anfragerate ist damit noch nicht gemessen. Die technische UI-Prüfung orientiert sich ergänzend an den [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md).

## 6. Backend, Sicherheit und Betrieb

**Architektur:** Es gibt kein eigenes Kundenkonto-, Bestell- oder Kontaktformular-Backend und keine Datenbank. Die Anfrage wird im Browser zusammengesetzt. Next übernimmt Seitenauslieferung, Bildoptimierung und eine OG-Bildroute. Entsprechend gibt es hier keine selbst implementierten Login-/Rollen-/SQL-Abfragen zu testen. Eine klassische CRUD-Backend-Checkliste wäre für diese Website irreführend.

**Positiv:** Kleine direkte Laufzeitabhängigkeiten; keine vom Formular an einen eigenen Server gesendeten Daten; HTTPS-only-Prüfung für Ziel-URLs und zusätzliche Google-Host-Prüfung; JSON-LD wird mit Escaping von `<` serialisiert; externe Kontaktlinks verwenden `noopener noreferrer`. `.env.local` ist ignoriert; unter versionierten `.env*` wurde nur `.env.example` gefunden. Eine vollständige Prüfung der Git-Historie auf Secrets erfolgte nicht.

**P2 – Automatische Qualitätskontrolle:** Im Projekt wurde kein `.github`-Workflow gefunden. Vor jeder Veröffentlichung Lint, Typecheck, Unit-Tests, Build und ausgewählte Browser-Journeys automatisch ausführen. Alle vier Demo-Lockfiles ausdrücklich einschliessen: Hauptprojekt-Lint und Typecheck schliessen die Demo-Verzeichnisse aus, Hauptprojekt-`npm audit` prüft nicht deren Abhängigkeiten. Externe CI-Konfigurationen wurden nicht eingesehen.

**P2 – Betrieb überwachen:** Verfügbarkeit von Hauptdomain, Kontaktseite, NFC-Seite und Demos sowie 404-/JavaScript-Fehler beobachten. Fehlerbehandlung für externe 3D-Ausfälle beibehalten. Verantwortlichkeit für Alarmreaktion, Domainverlängerung, Versionsupdates und Wiederherstellung dokumentieren. Ob entsprechende Vercel- oder externe Dienste schon konfiguriert sind, bleibt offen.

**P2 – Preview-/Produktionsschutz härten:** `getSiteOrigin()` stuft jeden gültigen konfigurierten HTTPS-Wert als kanonisch ein. Das ist bei korrekt auf Production begrenzter Umgebungsvariable in Ordnung. Wird sie auch auf Preview gesetzt, kann eine Preview indexierbar werden. Produktionsumgebung explizit prüfen und nach Deploy automatisch Robots-/Canonical-Werte verifizieren. Aktuelle Live-Robots sind korrekt.

**P3 – Anfragen messen:** Keine eigenen Conversion-Events im Quellcode gefunden. Kontaktklicks und abgeschlossene Konfiguration getrennt von Seitenaufrufen messen, ohne Namen, Nachrichten oder vollständige Anfrage-URLs an Analytics zu senden. Klicks auf WhatsApp belegen noch keinen erfolgreichen Versand. Die technischen Angaben zur Messung regelmässig mit der [Vercel-Dokumentation](https://vercel.com/docs/analytics/privacy-policy) abgleichen.

Ein komplettes CRM, Benutzerkonto-System oder Zahlungsbackend sollte erst entstehen, wenn der Geschäftsablauf es braucht. Dann werden serverseitige Validierung, Spam-/Rate-Limits, Zugriffsschutz, Aufbewahrung und Fehlerprotokollierung eigenständige Anforderungen.

## 7. SEO und Inhalte

**Positiv:** Produktionsdomain ist für Crawler freigegeben. Sitemap umfasst beide Sprachen und Projekte. Metadaten-Helfer definieren Canonicals und Sprachalternativen inklusive `x-default` im HTML. Getrennte Root-Layouts setzen die Dokumentensprache passend. Person-/FAQ-Strukturdaten sind vorhanden; gerendertes JSON-LD wurde beim Live-Crawl ausgelesen. Es werden keine erfundenen Bewertungen markiert. `/hello` ist als NFC-Ziel bewusst aus der Sitemap ausgeschlossen.

**P3 – Änderungsdatum berichtigen:** `src/app/sitemap.ts:31` meldet für alle Seiten den 27. August 2026, obwohl Projekte und Inhalte im September aktualisiert wurden. Tatsächliche Inhaltsänderung pro Seite oder eine korrekt gepflegte Revision verwenden. Nicht bei jedem technischen Build pauschal „heute“ setzen.

**P3 – Nachfrage prüfen:** Search Console und tatsächliche Suchanfragen auswerten, bevor zusätzliche Landingpages entstehen. „Webdesign KMU Zürich“ ist bereits in den Metadaten berücksichtigt. Google-Unternehmensprofil, reale lokale Einträge und Rankings wurden mangels Kontozugriff nicht beurteilt. Lighthouse SEO 100 belegt technische Basisprüfungen, keine gute Platzierung.

**P3 – Sprachpflege vereinfachen:** Teile der HomePage stehen direkt als `locale === "de"`-Text im JSX, andere in den Inhaltsdateien. Sichtbare Texte zentralisieren, damit Änderungen auf Deutsch und Englisch zusammen überprüfbar bleiben. Marken-/Produktbegriffe wie „Booking & Reservation“ und „Personalized Card“ in der deutschen Oberfläche konsistent erklären oder übersetzen.

## 8. Tests, Wartbarkeit und Aufräumen

**P2 – Veralteten Sprachtest aktualisieren:** `tests/e2e/language.spec.ts:16` erwartet weiterhin `/en/work/architech-studio` und „ArchiTech Studio“. Die konfigurierten Weiterleitungen führen korrekt nach `/en/work/steiner-handwerk`. Einen aktuellen Slug für den Sprachwechsel verwenden und die Legacy-Weiterleitung separat prüfen. Danach alle vier Browserprojekte erneut ausführen.

**P2 – Fehlende Tests aus tatsächlichen Fehlern ableiten:** Den versteckten URL-Fehler, verständliche Bestätigungswerte, Maximalmengen und lange Texte absichern. Die bestehenden Tests prüfen den Inhalt des WhatsApp-Links, erkennen aber die technischen Werte in der sichtbaren Zusammenfassung nicht.

**P3 – Mock und echte Integration unterscheiden:** Die 3D-E2E-Suite ersetzt das externe Spline-Runtime-Skript. Sie prüft den Dialogvertrag zuverlässig, aber keine vollständige echte GPU-/CDN-Integration. Ein echtes Live-Modell wurde zusätzlich erfolgreich geprüft. Weitere Modelle, wiederholtes Öffnen und echte iOS-/Android-Geräte sollten als separater Integrationscheck folgen.

**P3 – Lokale 404-Logmeldung untersuchen:** Beim Browser-Test einer nicht existierenden Seite protokolliert Next `Internal: NoFallbackError`; der Test besteht und die Live-URL liefert korrekt 404. Aktuell kein belegter Besucherfehler. Mit konkreter Route und Produktionslogging prüfen, bevor ein Fix angesetzt wird.

**P3 – Ungenutzte Altkomponente prüfen:** `ProductShowcase.tsx` wird im übrigen `src` nicht importiert; die aktuelle NFC-Seite nutzt `ProductHero` und `ProductCatalog`. Die Altkomponente enthält noch Besuchszähler in localStorage und Vorladen mehrerer Szenen. Dies ist kein Nachweis, dass die aktuelle Live-Seite diesen Zähler verwendet. Falls nicht mehr benötigt, Komponente, dazugehörige reine Alttests und nicht genutzte Inhaltsstrukturen gezielt entfernen.

**P3 – Dokumentation aktualisieren:** README spricht von leerem Portrait-Verzeichnis und älteren statischen Routenanzahlen; tatsächlich ist ein Portrait sichtbar und die Sitemap enthält 28 URLs. Dokumentation zum aktuellen Build-/Demobetrieb nachführen. Alte Designexporte und Originalbilder nur aus dem auslieferbaren Paket entfernen; Quellmaterial nicht unüberlegt löschen.

## 9. Empfohlene Reihenfolge

1. Formularblockade und Bestätigungswerte korrigieren; passende Regressionstests ergänzen.
2. Demo-Abhängigkeiten aktualisieren, beginnend bei Salon; neu bauen und prüfen.
3. Datenschutz um Spline und den korrekten WhatsApp-Übergabezeitpunkt ergänzen.
4. Schutzheader testen und einführen; Produktions-/Preview-Konfiguration absichern.
5. Veralteten E2E-Test korrigieren und die Qualitätssicherung für Hauptseite plus Demos automatisieren.
6. Kopier-/E-Mail-Alternative sowie Produktübernahme in die Anfrage ergänzen.
7. Konditionen, Paketumfang, laufende Kosten und Lieferinformationen konkretisieren.
8. LCP-Bilder priorisieren; ungenutzte JPGs und Altcode aus Veröffentlichungen entfernen.
9. Mobile Inhaltslänge und Footer verdichten; Conversion und reale Ladezeiten beobachten.

## 10. Belege

- [Live-Crawl mit Metadaten, Ressourcen und axe-Ergebnissen](../artifacts/audit-2026-09-07/live-audit.json)
- [62 geprüfte interne URLs](../artifacts/audit-2026-09-07/links.json)
- [Lighthouse Startseite](../artifacts/audit-2026-09-07/lighthouse-home.json)
- [Lighthouse NFC & QR](../artifacts/audit-2026-09-07/lighthouse-reviews.json)
- [Reproduktion der Formularfehler, echtes 3D und zusätzliche Breiten](../artifacts/audit-2026-09-07/extra.txt)
- [Startseite Desktop](../artifacts/audit-2026-09-07/home-1440.png)
- [Startseite Mobil](../artifacts/audit-2026-09-07/home-390.png)
- [NFC-Seite Mobil](../artifacts/audit-2026-09-07/reviews-390.png)
- [Websites-Seite Mobil](../artifacts/audit-2026-09-07/websites-390.png)

Die Rohbelege liegen im lokal ignorierten `artifacts`-Verzeichnis. Sie müssen bei einer Weitergabe des Berichts mitkopiert werden. Die Testergebnisse und `npm audit`-Zahlen beziehen sich auf die Ausführungen in dieser Sitzung am 7. September 2026.
