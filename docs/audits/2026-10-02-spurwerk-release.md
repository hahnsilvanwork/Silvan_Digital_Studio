# Spurwerk ersetzt Steiner — veröffentlicht

2. Oktober 2026. Nutzerauftrag vollständig umgesetzt: Bauprojekt im öffentlichen Portfolio durch Spurwerk Veloatelier ersetzt und Startseite verfeinert. Produktion: https://silvandigital.ch . Projekt: https://silvandigital.ch/work/spurwerk .

## Umsetzung

Neue aktuelle Bilder direkt aus der veröffentlichten Spurwerk-Demo, DE/EN-Projektbeschreibungen, explizite Fiktions- und Sprachkennzeichnung, Portfolio- und Folgeprojektlinks, Rechtstext-Inventar/Datenschutzverweis, Sitemap und Telemetriepfad. Alte /work/steiner-handwerk und /work/architech-studio in DE/EN leiten dauerhaft auf Spurwerk; alte öffentliche /demos/handwerk-Wege führen zur neuen externen Demo. Frühere eigenständige Demoquellen bleiben intern erhalten; im öffentlichen Portfolio wird Steiner nicht mehr angeboten. Die Spurwerk-Website selbst wurde nicht verändert oder neu veröffentlicht.

Startseite: Spurwerk als Hauptbeispiel, andere Beispiele darunter ohne Wiederholung; gemeinsame Desktop-Rasterzeilen für Titel-/Bildbereich und Namens-/Projektbeschriftung, sauberere Typografie/Abstände, schärferes vorab geladenes responsives Bild mit dezenter Tiefe, konsistente SVG-Pfeile und kurze Hoverreaktionen. Keine Bewegung bei reduzierter Bewegung. Kontakt und vier Angebote bleiben auf Mobil vor dem grossen Demobild. Keine neue Abhängigkeit, keine neuen kostenpflichtigen Dienste.

## Prüfung

119 Unit-Tests in sechs relevanten Dateien; 40 Startseiten-/Kontakt-/Qualitätsfälle und zwei neue Projekt-/Weiterleitungsfälle in Chromium/WebKit bestanden. Ein visueller Durchgang und eine gebündelte Korrektur der englischen Metadatenausrichtung, danach Bestätigung. 12 Startseitenansichten DE/EN mit 320,390,768,1024,1440,1920 CSS-Pixeln ohne gemessenen horizontalen Überstand. Neue Projektbilder dekodiert, Seite/Modals unverändert bedienbar. Unabhängige visuelle Gegenprüfung: kein Releaseblocker; Hinweis auf englisches Menülabel erwies sich in Quelle/Bild als bereits korrektes 'Menu'.

8 geänderte Routen im automatischen WCAG-A/AA-Scan ohne Verstoss; übliche manuell zu prüfende Dialog-Referenz bei geschlossenem Menü bleibt kein vollständiges Screenreader-Zertifikat. Impeccable-Detektor [], ESLint ohne Codefehler; CSS wird von Design-Contract-Tests und Sichtprüfung abgedeckt. Mobiles Hero-AVIF bei 390px/DPR1: 21.147 Bytes, HTTP200. Kein daraus abgeleiteter öffentlicher LCP-Wert.

32 geänderte/neue Dateien per SHA-256 gegen geprüften Snapshot übertragen; zuvor jedes Original gegen Baseline geprüft. Vollständiger Originalprojekt-Build inklusive vorhandener Demos und Sicherheitsnachbearbeitung bestanden.

## Veröffentlichung und Live-Beleg

Vercel Deployment dpl_D7PGPpg79VthSDbYvfUwdJfWgnTq, Zustand READY, Alias https://silvandigital.ch.
Deployment-URL: https://silvan-digital-studio-6isp0txtb-silvan1.vercel.app .

**40 Live-Routenszenarien bestanden**: Chromium/WebKit × DE/EN × 390/1440px × Startseite/Arbeiten/Spurwerk/Impressum/Datenschutz. Tatsächliche neue Bilder geladen, Namens-/Projektzeilen bei Desktop auf weniger als2px Differenz geprüft, keine Steiner-Texte, keine Browserausnahmen und kein horizontaler Überstand. Alte Profilrouten, ältere Aliasrouten und drei öffentliche Demo-Einstiege liefern korrekte308-Weiterleitungen. Sitemap enthält Spurwerk und kein steiner-handwerk. Keine Nachricht/Formularübermittlung während der Prüfungen.

Belege: deployment.json, live-check.json, final-local-check.json, a11y-image.json, visual/, capture-results.json, project-review.md, source-manifest.json, transfer-manifest.json, integration-result.json.

Grenzen: simulierte Ansichten, keine echten Mobilgeräte oder Kundenstudie; keine garantierte Conversionsteigerung oder neue pauschale9/10-Bewertung. Bestehende lokale Vorschau bleibt auf http://127.0.0.1:3210/ (Session20466) verfügbar.
