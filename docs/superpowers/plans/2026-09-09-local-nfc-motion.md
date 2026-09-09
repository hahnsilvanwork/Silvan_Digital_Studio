# Lokale NFC Motion-Grafik

Die aktuelle Nutzeranweisung ersetzt für diese Umsetzung die kostenpflichtige Filmproduktion: vorhandene Fotos, React und CSS, keine neuen Dienste oder Pakete. Das bestehende Higgsfield-Konzept bleibt als separate Produktionsidee erhalten.

Ziel: elegante helle Produktbühne im NFC-Einstieg mit synchron wechselnder Karte und beispielhaftem Smartphone-Ziel. Fünf Anwendungen, in Version 2 je neun Sekunden. HTML-Texte und Katalog bleiben erhalten. Keine Videodatei oder fotorealistische KI-Szene behaupten.

1. Eigenständige `NfcMotionHero.tsx` und CSS-Modul erstellen. Lokalisierte Beispielansichten, vorhandene Originalbilder, kontrollierte Bewegung mit drei Ebenen: Produkt, Smartphone, weiches Umgebungslicht.
2. Pause, Bewegungsreduktion, unsichtbaren Tab und Viewport berücksichtigen; ohne JavaScript sofortiges Standbild.
3. Nur die Hero-Einbindung in `ReviewsPage.tsx` ersetzen.
4. Typecheck, gezielte bestehende Tests und Browserprüfung auf Desktop/Mobil samt Pause und Bewegungsreduktion durchführen. Lokale Vorschau öffnen; kein Deployment.

## Version 2: realistischere Oberflächen und Kontaktbewegung

Nachtrag Version 3: Auf Nutzerwunsch Szenen von 9 auf 7.5 Sekunden verkürzt (Gesamtloop 37.5 Sekunden). Die Haltephase an der Karte entfernt; abgestimmte Beschleunigung zwischen den Wegpunkten verhindert Zwischenstopps. Kontakt, Notification und Tap bleiben synchron. Hintergrund über die gesamte Hero-Breite wurde nur besprochen, nicht umgesetzt. Browserprüfungen und Typecheck erneut bestanden.

Umgesetzt auf Nutzerwunsch: eigene `NfcDemoScreen.tsx` mit Instagram-Profil, Facebook-Unternehmensseite, Google-Bewertungseinstieg, Unterkunft und Café-Speisekarte. Fiktive Demoansichten, keine echten Konten oder behaupteten Plattform-Screenshots. Vier optimierte Fotos (zusammen ca. 150 KB) aus vorhandenen Café-Vogel- und Falkenried-Demos unter `public/images/motion/`; keine externen Bildabrufe.

Neun-Sekunden-Ablauf: ruhiger Anfang; Handy schwenkt mit oberem Lesebereich zur Karte; NFC-Mitteilung; Rückkehr zur lesbaren Position; sichtbarer Tap; Öffnen und Halten der Zielseite; Rückkehr zum Anfang. Sperrbildschirm, Kameralinse, Seitentasten, Statussymbole und dezente Glasreflexion ergänzen das Gehäuse. Animation und Produktdruck bleiben separate Ebenen.

Geprüft: fünf Szenen und Loop, Kontaktabstand auf Desktop ca. 7 px, Erkennung vor Tap und Seitenöffnung, manuelle Pause inklusive Pseudoelementen, Viewport-Pause, Mobilbreite, Bewegungsreduktion, Englisch und Standbild ohne JavaScript. Typecheck, gezieltes ESLint und 32 bestehende Tests bestanden. Kein Deployment.
