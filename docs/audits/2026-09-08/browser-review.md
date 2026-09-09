# Browser-Prüfprotokoll – 8. September 2026

Ziel: aktueller lokaler Produktionsserver http://localhost:3100, bestehender Prozess 43312 aus diesem Workspace. Server wurde nicht neu gebaut, gestartet oder beendet. Kein Formular und keine Nachricht an externe Empfänger versendet. Hauptprüfung über Codex-Browser, temporärer eigener Tab am Ende geschlossen; Viewport zurückgesetzt.

## Abdeckung

Alle 15 Hauptseiten jeweils DE und EN wurden per Browser geladen und DOM-Inhalte geprüft: /, /websites, /reviews, /presence, /automation, /work, /about, /contact, /hello, /imprint, /privacy, /work/falkenried, /work/cafe-vogel, /work/steiner-handwerk, /work/salon-lumiere. EN mit /en-Präfix.

- Desktop 1280 × 720: alle 30 Routen, korrekte Sprache, genau eine H1, keine horizontale Dokumentüberbreite und keine als fertig geladen gemeldeten defekten Bilder.
- Mobil 390 × 844: alle 30 Routen, keine horizontale Dokumentüberbreite.
- 320 × 740: /, /websites, /reviews, /presence, /automation, /about, /contact, /work, /hello, /privacy, /en/websites, /en/reviews ohne Dokumentüberbreite.
- Tablet 768 × 1024: /, /websites, /reviews, /presence, /automation, /work, /about, /contact, /hello ohne Dokumentüberbreite.
- Visuelle Screenshots: Startseite Desktop/Mobil, Website-Angebot mobil, Arbeitsübersicht Desktop, NFC-Katalog mobil, Menü mobil, zwei 3D-Modellzustände; unabhängiger Design-Agent ergänzt die übrigen visuellen Hauptseitenprüfungen.

Dies ist keine umfassende Cross-Browser- oder WCAG-Zertifizierung. Ein Dokument ohne Überbreite beweist nicht allein, dass jedes Element korrekt dargestellt wird. Die Hauptprüfung enthält keine Messung realer Core Web Vitals unter mobilen Netzbedingungen.

## Funktionsprüfung

- Alle 6 NFC-Kategorien geladen: Google Reviews 9, Tripadvisor 2, Social Media 9, WhatsApp 3, Menü 4, Individuell 1 = 28 Produkte.
- Kategorien aktualisieren URL; Produktlinks enthalten category und model sowie #inquiry.
- Rundes Standardmodell korrekt übernommen: reviews, standard-card, round, confirm, quantity 1.
- Individuelles Booking-Modell korrekt übernommen: booking, fully-custom-card, square, confirm, quantity 1.
- Fehlende Zielseitenangabe: klare Fehlermeldung, Fokus auf fehlendes Select, aria-invalid und Fehlerbeschreibung vorhanden.
- Zusammenfassung nach Auswahl „Ziel muss noch eingerichtet werden“ erscheint; vorbereitete WhatsApp- und Mailto-Links enthalten das gewählte Modell und die lesbare Konfiguration.
- Keine Übergabe an WhatsApp/Gmail ausgelöst; keine Zustellung behauptet.
- Lokale 3D-Ansicht rendert Standardkarte und individuelles Booking-Modell. Steuerelemente Vorne/Hinten/Reset/Zoom vorhanden. Escape schliesst und gibt Fokus an ursprünglichen 3D-Button zurück.
- Mobile Produktnavigation „Nächstes Produkt“ verschiebt die horizontale Produktleiste (gemessen 271 px); Karussellüberbreite ist beabsichtigt, keine Seitenüberbreite.
- Mobiles Menü öffnet, Escape schliesst, Fokus zurück auf „Menü öffnen“.
- Englischer unbekannter Pfad /en/audit-missing-page zeigt deutschen Fehlertext und deutsche Rücklinks.
- Während bestehender Produktauswahl zeigt Sprachwechsel nur /en/reviews: ausgewählte category/model und Anker werden nicht übernommen.
- Am Ende keine erfassten Warnungen/Fehler im Browserlog des Prüftabs. Das ist keine Garantie für fehlerfreie Ausführung in allen Zuständen/Geräten.

## Konkrete visuelle Beobachtungen

- Startseite 390 × 844: Hauptkontaktaktion bei y≈699, Höhe 52 px, damit im getesteten ersten Bildschirm sichtbar. Header, Titel, Konzeptbild, Erklärung und Aktion nachvollziehbar angeordnet.
- Startseite mobil Gesamthöhe ca. 5799 px; Website-Angebot ca. 5481 px; NFC-Seite ca. 7939 px. Länge allein ist kein Fehler, aber lange Wege machen Sprunglinks und lokale Aktionen wichtig.
- Work Desktop 1280 × 720: erste Projektabbildung beginnt y≈776; somit kein Projektbild im ersten Bildschirm. Die Bildbelege sollten früher beginnen.
- About Desktop: Porträt beginnt y≈686, nur oberer Rand im ersten Bildschirm.
- Produktbilder nutzen tatsächliche responsive currentSrc: individuelles Produkt 384-px-Variante bei 370-px-Darstellung. Ein src-Fallback mit w=3840 ist NICHT gleichbedeutend mit einem tatsächlichen 3840-px-Download.
- Mehrere Linkzeilen in Datenschutz und Google-Drittanbieterhinweis nur ca. 17 px hoch. Als Inline-Textlinks nicht automatisch ein WCAG-Verstoss; zusätzliche Trefffläche ist eine sinnvolle Komfortverbesserung.
- Seitenüberschriften/Einleitung werden zunächst ausgeblendet und animiert eingeblendet. Frühe Screenshots zeigen deshalb unvollständige Texte, die danach vollständig erscheinen. Kein permanenter Clipping-Bug. Oberhalb des sichtbaren Seitenanfangs kann die Animation dennoch die wahrgenommene Schnelligkeit verschlechtern; Zeitbudget im Code: Wort-Sweep bis 420 ms plus 760-ms-Transition, CTA verzögert.

## Inhaltlich im Browser bestätigt

- Business-Paket hat „Am häufigsten gewählt“; Nachweis dieser Popularität liegt im Projekt nicht vor. Nicht als erwiesene Falschaussage behandeln, sondern belegen oder neutral ersetzen.
- Zusammenfassung nennt „erst nach meiner persönlichen Bestätigung verbindlich“, während Impressum beidseitige Angebotsannahme beschreibt. Unklare Perspektive auch im vorbereiteten Kundentext.
- Impressum/Datenschutz nennen Steiner Bau statt Steiner Handwerk.
- Katalog umfasst rechteckige Karten und oft „Grösse nach Absprache“, während FAQ nur rund/quadratisch 80/100 mm nennt.
- Website-Seite sagt Domain/Hosting separat sowie Umfang schriftlich in Offerte. Diese Hinweise sind vorhanden; Verbesserung wäre konkrete Orientierung je Paket, nicht erstmalige Einführung von Bedingungen.
- Online-Präsenz erklärt kostenloses Google-Profil, Preis für Dienstleistung und Inhaberschaft beim Kunden ausdrücklich.
- Portfolio ist klar als Konzept für fiktive Unternehmen bezeichnet; fehlende reale Kundenbelege sind ein Reifegradthema, keine Täuschung durch die vorhandenen Konzepte.

## Ergänzung: lokale Demo-Exporte

Anschliessend alle 54 im Inhaltsaudit aufgeführten Demo-Routen im lokalen Produktionsserver geprüft (public/demos: cafe, salon, handwerk, falkenried; 53 Inhaltsseiten plus Falkenried-404.html). Alle wurden im Browser bei Desktop-Standard und 390 × 844 geladen. Keine Dokumentüberbreite, keine als fertig geladen gemeldeten defekten Bilder. Jede geprüfte Route hat eine H1. Dies ergänzt den reinen Source-Audit der Demo-Agentin; es sind lokale Exporte, keine Prüfung aller extern veröffentlichten Deployments. Die vier Demo-Startseiten zusätzlich anhand mobiler Screenshots visuell verglichen. Individuelle Unterseiten wurden per DOM, nicht alle als vollständige Screenshots, geprüft.

- Café: Datum/Personenzahl vorhanden, kein Zeitfeld, im DOM bestätigt. Alle vier Seiten tragen denselben Browser-Titel „Konditorei Vogel – Zürich“.
- Salon: alle vier Seiten tragen denselben allgemeinen Browser-Titel. Für noindex-Demos kein akutes Rankingproblem, aber schwache Tab-Orientierung und kein optimales SEO-Arbeitsbeispiel.
- Falkenried Immobilien: alle drei „Details anfragen“-Texte sind wirkungslose span-Elemente; kein Link/Button.
- Falkenried Partner: „Website besuchen“ führt zum eigenen Demo-Kontakt.
- Wichtige Präzisierung gegenüber Source-Audit: „Originalbeitrag ansehen“ führt im ausgelieferten lokalen Export NICHT zur .example-Domain, sondern durch Veröffentlichungshärtung zum Demo-Kontaktformular. Im Source stehen .example-Links. Beide liefern keinen Artikel, aber die konkrete Runtime-Fehlerbeschreibung ist ein falsches Ziel, kein behaupteter DNS-Ausfall.
- Falkenried EN: Überschrift des Porträtabschnitts ist englisch; Bildunterschrift und darin enthaltene Aktion bleiben deutsch und führen zur deutschen Geschichte. Nicht behaupten, die komplette Sektion einschliesslich Titel sei deutsch.
- Artikel-/Partner-/Immobilienfehler durch DOM-Evidenz bestätigt; kein Navigieren zu fingierten externen Domains erforderlich.
- Nach dieser Ergänzung auch Demo-Prüftab geschlossen und Viewport zurückgesetzt.

## Abschliessender Testlauf

Vollständige Unit-Suite nach dem ursprünglichen Einzel-Timeout nochmals allein ausgeführt: **30 Testdateien / 344 Tests bestanden**, 11,20 Sekunden. Log: unit-tests-confirmation.log. Frühere Timeout-Beobachtung bleibt dokumentiert; im abschliessenden Gesamtlauf kein Fehler.
