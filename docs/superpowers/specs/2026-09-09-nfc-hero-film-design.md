# NFC-Produktfilm — Ein Tap. Genau die richtige Aktion.

Stand: 9. September 2026. Konzept zur Umsetzung freigegeben; Nutzer hat ausdrücklich Higgsfield für KI-Filmszenen gewählt. Noch kein Videoauftrag eingereicht. Plugin ist nach Metadaten installiert und aktiviert; Nutzer bestätigt die Kontoverbindung. Die Generierungswerkzeuge sind in diesem Task weiterhin nicht verfügbar.

## Kommunikationsziel

Schweizer KMU sollen innerhalb eines Durchlaufs verstehen: Eine physische NFC-Karte führt über das Smartphone zu einer nützlichen digitalen Zielseite. Die Karte und der Ablauf sind der Blickfang. Die Website-Überschrift und die beiden Handlungsoptionen bleiben jederzeit als HTML lesbar. Der Film unterstützt die Anfrage und den Produktkatalog.

## Recherche und Konsequenzen

- Bestehende Website geprüft: https://silvandigital.ch/reviews . Der Einstieg zeigt momentan einen Produkt-Slider mit drei Bildern, warmweisser Fläche und schwarzer Typografie. Die neue Szene greift diese Materialien und Palette auf.
- Apple beschreibt bei Background Tag Reading eine Mitteilung, die zum Öffnen angetippt wird. Daher keine magisch automatisch erscheinende Website, keine Bezahlgeste und kein zusätzlicher App-Installationsschritt: https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading . Gilt für das gezeigte iPhone-artige Beispiel, nicht als universelles Versprechen für jedes Smartphone.
- Film lautlos und inline; komprimierte Varianten, sofortiges Poster und bewusste Ladeprioritäten: https://web.dev/learn/performance/video-performance . Dateigrösse messen statt allein Auflösung beurteilen.
- Bei parallelem Text und dauerhaftem Autoplay eine sichtbare Pause anbieten: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html . Bei `prefers-reduced-motion` nur das Standbild automatisch laden: https://web.dev/articles/prefers-reduced-motion .
- Higgsfield-Verbindung und Skill-Installation sind separate Dinge. Generierung kostet Modell-/Auflösungs-abhängige Credits; Konto, Modell und Kosten noch nicht geprüft: https://higgsfield.ai/mcp . Keine Generierung als Zugriffstest.

## Kritische Abwägung

1. Reine Produktrotation wäre elegant, erklärt aber die Nutzung nicht. Nicht als alleiniger Film gewählt.
2. Nutzer wünscht ausdrücklich fünf Anwendungen aus demselben Blickwinkel. Deshalb eine synchron geschnittene Vergleichsfolge mit je 1.2 Sekunden Erkennungszeit und danach ein ruhiger Menü-Abschluss. Kein vollständiges Tutorial für jede Anwendung; NFC ist der gezeigte Zugang, QR wird nicht zusätzlich demonstriert.
3. Lange Website-Texte im Video wären auf Mobilgeräten zu klein und durch KI fehleranfällig. Website-Texte bleiben HTML. Im Smartphone nur kurze, notwendige Worte und ein klar erkennbares Menü.
4. Eine erfundene positive Bewertung oder abgeschlossene Buchung suggeriert ein Ergebnis. Gezeigt werden nur der Einstieg und die Möglichkeit, keine Bewertung mit vorausgewählten Sternen.
5. Die schwarzen Produkte wirken bereits hochwertig; weiches Studiolicht, warme weisse Hohlkehle und zurückhaltende Bewegung reichen. Keine Neonwellen, Konfetti, Sci-Fi-Oberflächen oder dramatische Verdunkelung hinter schwarzem Webtext.
6. Fotoreferenz ist keine Garantie für identische Produktbeschriftung. Unveränderte Wortbilder, Form, Farbe und Logo werden im Video überprüft. Eine fehlerhafte Generierung ist kein fertiges Produktvideo.
7. Vorhandene GLBs sind vereinfachte Foto-Rekonstruktionen, kein Beleg für makrotaugliche exakte Produktgeometrie. Gewählte Produktion erfolgt ausdrücklich über Higgsfield.

## 15-Sekunden-Choreografie — überarbeitete Nutzerentscheidung

Die neue Anwendungsfolge ersetzt die frühere Begleitprodukt-Szene. Blickwinkel, Telefonposition, Kartenmittelpunkt, Hintergrund und Beleuchtung bleiben während aller Wechsel gleich. Kartendesign und passende Smartphoneansicht wechseln framegleich per sauberem Match Cut. Unterschiedliche Originalformen bleiben erhalten, ohne Form-Morphing.

| Zeit | Handlung / Karten- und Bildschirm-Paar |
|---|---|
| 0–1.5 s | Menükarte vollständig sichtbar, kurzer ruhiger Kameraweg. |
| 1.5–3 s | Smartphone nähert sich; NFC-Mitteilung erscheint. |
| 3–3.5 s | Ein Tap auf die Mitteilung; Kamera und Telefon kommen zur Ruhe. |
| 3.5–4.7 s | Menükarte + digitale Speisekarte. |
| 4.7–5.9 s | Google-Karte + Einstieg zum Bewerten, ungewählte Sterne. |
| 5.9–7.1 s | Instagram-Karte + beispielhafte Profilansicht. |
| 7.1–8.3 s | Facebook-Karte + beispielhafte Unternehmensseite. |
| 8.3–9.5 s | Airbnb-Karte + beispielhafte Aufenthalts-/Reiseansicht, keine Buchungsbestätigung. |
| 9.5–13 s | Karte UND Display zurück zum Menü. Ruhige Ansicht, kleiner Scroll zu Kaffee/Patisserie. |
| 13–15 s | Telefon zieht zurück; Anfangskomposition wird für den Loop wiederhergestellt. |

Ein dezenter HTML-Hinweis „Beispiele verschiedener Karten und Linkziele“ (EN: “Examples of different cards and link destinations”) verhindert den Eindruck, eine einzelne Karte würde automatisch fünf Apps nacheinander öffnen. Kartentext und Smartphone-Ziel müssen fachlich zusammenpassen. Die Airbnb-Karte ist ein Aufenthalts-/Bewertungsmotiv, daher keine erfundene bestätigte Buchung. Smartphoneansichten bleiben als Beispiele erkennbar; keine realen Konten, Kennzahlen oder zugesagten Ergebnisse erfinden.

## Bildreferenzen

Alle fünf Originalbilder wurden visuell geprüft; noch keine Übertragung an Higgsfield.

- Menü: `public/images/products/main/menu-round-black-78746a65bfe4.png` — schwarze runde Menükarte.
- Google: `public/images/products/main/review-round-black-4554e8ac3153.png` — schwarze runde Google-Karte.
- Instagram: `public/images/products/main/nfc-014-instagram-e94ce06a2966.png` — pink/violette rechteckige Karte.
- Facebook: `public/images/products/main/nfc-020-facebook-10ab09650ef7.png` — blaues quadratisches Produkt. Schutzpapier auf dem Foto nicht als zweites Produkt inszenieren.
- Airbnb: `public/images/products/main/nfc-032-airbnb-87be1722e571.png` — rot/weisse runde Karte mit Aufenthalts-/Bewertungsmotiv und QR-Code. Druck nicht verändern oder als garantiert scanbar ausgeben.

Referenzlimit vor Upload prüfen. Wenn das Modell keine fünf Identitätsreferenzen unterstützt, ausdrücklich den tatsächlichen Engpass nennen; keine Produkte stillschweigend weglassen. Ein vollständiger Auftrag bleibt vorgesehen. Alte Entwurfstafeln v1/v2 zeigen das vorherige Konzept und sind keine aktuelle Ablaufvorlage.

## Bildraum und Website

Masterziel 1920×1080, 15 Sekunden, 30 fps Lieferung; tatsächlich verfügbare native Werte vor Auftrag prüfen. Lautlos, kein Sprecher, kein Soundtrack. Links ca. 42 Prozent ruhiger heller Raum für HTML-Überschrift und CTAs. Handlung rechts mit Abstand zum Rand. Kein Text wird über eine Produktkante gesetzt.

Mobile braucht eine eigene Komposition. Erst prüfen, ob das rechte Hauptmotiv innerhalb eines 4:5-Ausschnitts vollständig und verständlich bleibt. Wenn nicht, separate autorisierte Formatproduktion oder geeignetes Standbild; kein blindes `object-fit: cover`, das das Telefon abschneidet. Film unter dem Text auf dem Handy. Deutsch und Englisch behalten ihre bestehenden HTML-Texte. Eingebrannte deutsche Menüs dürfen nicht unbemerkt als englische Fassung ausgeliefert werden; separate Lokalisierung oder entsprechend gekennzeichnetes Produktbeispiel planen.

Website-Integration erst nach geprüftem Film: neue abgegrenzte Hero-Komponente, vorhandene Produktkatalog-/Anfragefunktionen erhalten. Videoautoplay nur ohne Bewegungsreduktion, Pause per Tastatur, Poster bei Fehler/Autoplay-Verweigerung, Pause ausserhalb des Viewports und bei verborgenem Tab. Kein neuer schwerer 3D-Player für den Hintergrundfilm.

## Produktionsfreigabe und Bewertung

Autorisiert: Konzept, Recherche, Higgsfield-Produktion, Qualitätsprüfung und Umsetzung des NFC-Einstiegs. Produktionskosten erst aus tatsächlichem Modellangebot ermitteln; unbekannte Kosten nicht als kostenlos darstellen. Bei bezahltem Auftrag konkreten Betrag/Creditbedarf und Budget klären. Keine weiteren Unterseiten nebenbei umbauen.

Ein vollständiger Generierungsauftrag mit allen Phasen. Modellwahl nach erreichbaren aktuellen Fähigkeiten, geeigneter Seedance bevorzugt. Keine festen Modellparameter aus Werbeseiten ableiten. Bei unklarem Jobstatus denselben Job weiterverfolgen; keine Duplikate. Maximal eine gezielte Korrekturgenerierung im vereinbarten Kostenrahmen; keine unbegrenzte Qualitätsiteration.

Abnahme separat für Kommunikation, Produktidentität, Bewegung, Webintegration: volle Wiedergabe, Anfang/Ende, Tap/Notification, kleine Displays, Text, Geometrie und Bildrand prüfen. Dateiformat, Dauer, Abmessungen, fps, Audiospur und Dateigrösse messen. Je ein Desktop-/Mobil-Durchgang und höchstens ein Bestätigungsdurchgang nach gebündelten Korrekturen. Ohne Wiedergabeprüfung keinen Bewegungs-Pass vergeben.

## Aktueller Stand

- Recherche, Originalbildsichtung, kritische Abwägung und Sequenz: vorbereitet.
- Installation/Aktivierung bestätigt; Verbindung laut Nutzer erfolgt. Zugriff auf Generierungswerkzeuge / aktuelles Modell / Kosten / Upload: ausstehend.
- Generierungsauftrag / fertiger Film / Wiedergabeprüfung / Integration: nicht ausgeführt.
- Bestehende umfangreiche lokale Änderungen werden erhalten; kein Deployment und kein pauschaler Commit.
