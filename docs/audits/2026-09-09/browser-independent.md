# Assessment B – unabhängiger Browser- und Detektornachweis

Datum: 9. September 2026. Ziel: https://silvandigital.ch; Quellbaum `src`. Assessment B wurde ohne Einsicht in Assessment A durchgeführt. Befunde wurden erst nach expliziter Meldung des Elternagenten über den Abschluss von A weitergegeben. Keine Website-Dateien geändert und keine Nachricht versendet.

## Methode und Grenzen

PRODUCT.md sowie Impeccable critique.md (Assessment B) und audit.md gelesen. Der Elternauftrag weist B die lokale Playwright-Installation zu; eigene Chromium-Seiten, keine bestehenden Benutzertabs. Produktion unter 320, 390, 768 und 1440 CSS-Pixeln geprüft, jeweils Home, NFC-Katalog und Kontakt. Zusätzlich native Tastaturereignisse für Menü und 3D-Dialog, Anfragevorschau, Fehlerfälle, Clipboard und Sprachwechsel. Keine Doppelung der zentralen Axe- und Performanceprüfung. Headless Chromium ist keine vollständige Prüfung mit realem Screenreader oder realem iOS-Gerät.

## Deterministischer Scan

Ein Aufruf von `C:/Users/StartKlar/.codex/skills/impeccable/scripts/impeccable.cmd detect --json src`: Exit 0, JSON `[]`, **0 Findings**, keine Regeln oder Fundorte. Folglich keine detektorbasierten False Positives. Dies ist kein Beweis vollständiger Fehlerfreiheit. Rohdatei: `artifacts/audit-2026-09-09/browser/detector.json`. Ignore-Datei war nicht vorhanden.

## Verifizierte Probleme

### [P1] Automatische NFC-Animation ohne erreichbare Pausefunktion

**Ort:** `src/components/products/NfcMotionHero.tsx:50`, `src/components/products/nfc-motion.module.css:6`.

Das Hero auf `/reviews` startet ohne Aktion und wiederholt Szenen mit 37,5 Sekunden sowie Bewegungen mit 7,5 Sekunden unendlich. Im sichtbaren Hero existiert kein Pause-/Stoppbedienelement. Die Zustandslogik pausiert beim Verlassen des Viewports oder verstecktem Tab; das hilft nicht, wenn jemand die benachbarten Inhalte in Ruhe lesen möchte. Reduced Motion liefert zuverlässig ein statisches Bild, ersetzt aber keine Pausemöglichkeit für Besucher ohne diese Systemeinstellung. Einordnung: WCAG 2.2.2 Pause, Stop, Hide; P1 nach Audit-Skala für eine AA-relevante Barriere.

**Reproduktion:** `/reviews` mit normaler Bewegungseinstellung öffnen, Hero sichtbar lassen, über neun Sekunden beobachten. CSS und Browseranimationen bestätigen laufende Endlosschleifen. **Fix:** lokalisierter, tastaturbedienbarer Pause/Fortsetzen-Schalter mit eindeutigem Zustand; pausierten Zustand bei Fokus und weiterer Interaktion beibehalten. Alternative: statisches Startbild mit explizitem Abspielen. `$impeccable animate`, danach `$impeccable polish`.

### [P2] Sprachwechsel verwirft einen ausgefüllten Anfrageentwurf

**Ort:** `src/components/reviews/ReviewInquiryConfigurator.tsx:62`, `src/components/ui/LanguageSwitcher.tsx:28`.

**Reproduktion:** Auf `/reviews` das erste Modell anfragen; Menge 3, Zielseite „Ziel muss noch eingerichtet werden“, Firma und Notiz eingeben; „Angaben prüfen“; dann EN im Header. Modell, Kategorie und `#inquiry` bleiben korrekt in der URL. Die Eingaben gehen jedoch verloren: Menge wird wieder 1, Notiz/Firma/Setup werden leer, die Vorschau verschwindet. Nach einem Sprachwechsel muss ein zweisprachiger Besucher seine Arbeit wiederholen.

**Ursache:** Der Entwurf liegt ausschließlich im lokalen React-State; die Sprachroute erzeugt den Formularzustand neu. **Fix:** Entwurf in einem gemeinsamen, sprachübergreifenden Client-State erhalten. Personenbezogene Eingaben weiterhin aus URL und Server-Logs heraushalten; dauerhafte Browserpersistenz ist hierfür nicht nötig. `$impeccable harden`, danach `$impeccable polish`.

## Erfolgreiche Nachweise

- **Responsiv:** 12 Kombinationen aus Route und Breite ohne dokumentweiten horizontalen Overflow. Nach vollständigem Durchscrollen keine sichtbaren Links, Buttons oder Selects unter 44 × 44 CSS-Pixeln in diesen Ansichten. Bildschirmaufnahmen liegen als `view-*.png` vor. Die frühen `home-*.png`/`reviews-*.png` sind Vollseitenaufnahmen vor Scroll-Reveals und dürfen wegen noch nicht ausgelöster Reveal-Inhalte nicht als Nachweis leerer Abschnitte verwendet werden.
- **Menü:** Enter öffnet, Fokus startet auf „Menü schliessen“, zehn Tab-Schritte bleiben im Dialog und zyklieren korrekt; Escape schließt und gibt Fokus an „Menü öffnen“ zurück.
- **3D:** Erstes Produkt lädt bedienbare Ansicht, Fokus startet auf Schließen; Bühne, Vorder-/Rückseite, Reset und Zoom sind per Tab erreichbar. Escape schließt und gibt Fokus an den ursprünglichen „In 3D ansehen“-Button zurück.
- **Modellübergabe:** Erstes Modell übernimmt `review-round-black`, Produkttyp/Form und Menge 1; Fokus landet beim ersten offenen Feld. Preis für ein Stück CHF 49. Drei Stück werden in der Vorschau und im vorbereiteten WhatsApp-/Mailtext korrekt als CHF 100 ausgewiesen, einschließlich Versand- und Unverbindlichkeitshinweis. Externe Übergabelinks wurden nur gelesen, nicht geöffnet.
- **Validierung:** Fehlender Setup-Wert wird mit Klartext markiert und fokussiert. Menge 1000 sowie ein fremder HTTPS-Link für Google Reviews werden mit konkreten Korrekturhinweisen abgewiesen. Fokus landet auf Menge. Eingaben bleiben erhalten. Das Bearbeiten eines Felds entfernt momentan alle Fehleranzeigen; beim erneuten Prüfen werden verbleibende Fehler wieder ermittelt. Als kleine Implementierungsbeobachtung, nicht als zusätzliche prioritäre Barriere gewertet.
- **Vorschau:** Fokus geht zur Überschrift „Bitte prüfen Sie Ihre Angaben“, nicht direkt auf einen externen Link.
- **Clipboard:** Kontrolliert verweigerter Clipboard-Zugriff zeigt eine verständliche Meldung und den vollständigen Text in einer schreibgeschützten, beim Fokus markierbaren Textarea. Kontrollierter Erfolg zeigt „Anfrage kopiert“. Beides ohne Nachrichtentransfer geprüft; Erfolg wurde durch einen lokalen Clipboard-Stub simuliert, nicht als systemweite Clipboard-Berechtigungsprüfung ausgegeben.
- **Sprachkontext:** Katalogmodell/Kategorie/Hash bleiben DE→EN erhalten; `/contact?service=websites` wird korrekt zu `/en/contact?service=websites` mit weiter ausgewähltem Website-Anliegen. Kontaktlinks enthalten das passende Anliegen.
- **Reduced Motion:** Mit Systemeinstellung `reduce` keine aktiven Animationen auf `/reviews`, keine auf Opazität 0 verbliebenen Reveal-Inhalte. Der globale `0.01ms`-Override in `motion.css:148` ist vorhanden; die NFC-Komponente besitzt zusätzlich eine bewusste statische Alternative. Kein beobachteter Verlust von Formularstatus oder Feedback daraus, daher nicht pauschal als eigenständiger Fehler gewertet.

## Overlay und Bereinigung

Mutable Preflight (Seitentitel und angehängtes Script-Element) auf `/`, `/reviews` und `/contact` erfolgreich. Der reguläre Versuch, `http://localhost:8400/detect.js` einzufügen, wurde auf allen drei Produktionsrouten von der bestehenden Content Security Policy (`script-src`) blockiert. Kein CSP-Bypass, keine zuverlässige sichtbare Overlayansicht und keine Live-Detektorbefunde. Fallback: einmaliger CLI-Scan, DOM-Messungen, Screenshots und interaktive Browserprüfungen. Headless-Browser erzeugt ohnehin keinen sichtbaren Human-Tab.

Temporärer Impeccable-Live-Server: Port 8400, PID 29464; mit `live-server stop --keep-inject` erfolgreich beendet. Es wurde keine HTML-Datei injiziert. Alle eigenen Browserprozesse wurden geschlossen. Diagnose-Skripte und Rohbelege sind bewusst als reproduzierbare Audit-Artefakte erhalten, nicht als Websitecode. Ein erster Randfalllauf hatte einen zu breiten Status-Locator im Testskript; nach Eingrenzung auf den Absatz erneut erfolgreich. Das war ein Testskriptfehler, kein Produktfehler.

## Rohbelege

`artifacts/audit-2026-09-09/browser/evidence.json`: Breitenmessungen und Inventar. `flows.json`: Fokusverläufe, Modell/Preisübergabe, Clipboard-Ausfall, Sprachverlust, Reduced Motion. `edges.json`: Maße nach Scroll, ungültige Menge/URL, Clipboard-Erfolg. `motion-normal.json`: aktive normale Hero-Animationen und fehlende Buttons. `overlay.json`: drei CSP-Blockaden. Zugehörige `.mjs`-Skripte erlauben Wiederholung.
