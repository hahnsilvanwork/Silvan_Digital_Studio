# Startseite Redesign – Design-Spec (2026-10-19)

## Auftrag (Silvan, 2026-10-19)
Komplette Überarbeitung von Text und Darstellung der Startseite (DE/EN). Besucher, vor allem ältere Inhaber ohne Technikwissen und überwiegend am Handy, sollen sofort verstehen, was angeboten wird, was es kostet und wie sie starten. Andere Seiten folgen später. Lokal, kein Deploy.

## Entscheide von Silvan
- Designsprache bleibt: Navy #081B3C, Geist, Weiss, feine blaue Linien, echte Screenshots, Dorf-Illustration. Verfeinern statt ersetzen; keine generische «KI-Optik» (abgelehnt: Creme/Serif, Schweizer Rot, Indigo/Limette). Logo bleibt Navy.
- Alle vier Leistungen gleichwertig.
- Erlaubte Versprechen: Antwort innert 24 Stunden, Erstgespräch kostenlos, Fixpreis laut schriftlicher Offerte, kompakte Website in ca. 2–4 Wochen online (sobald Inhalte vorliegen).
- Preise inkl. MWST. Jährliche Kosten (Adresse, Betrieb) hängen von Grösse und Wunsch ab: keine Zahl, aber klar benannt und in der Offerte fixiert.
- Region: «Boppelsen bei Zürich – für Betriebe in der ganzen Schweiz».
- Kontaktwege: Anrufen, E-Mail/Formular. Keine echten Referenzen; Demos bleiben ehrlich als fiktiv beschriftet.

## Grundlagen
Persona-Review (5 Personas) und Marktrecherche (MacherWeb, Websharks, Ridge Collective, Garçon Studios; NN/g zu Preis, Senioren, Scannen). Hauptprobleme vorher: generischer Titel, doppelte Preisliste, Gesamtkosten und Dauer fehlen, Telefon erst am Seitenende, Fachwörter, wenig passende Demos, Ablauf/FAQ nicht angezeigt.

## Aufbau (8 Abschnitte, Reihenfolge Handy = Desktop)
1. **Start (Navy-Block):** H1 «Mehr Kunden über das Internet. Weniger Büroarbeit.», ein erklärender Satz, Primär «Kostenloses Erstgespräch» → /contact, Sekundär Telefonnummer (tel:), Faktenzeile (24 h · Fixpreis · inkl. MWST). Rechts/unten Spurwerk-Vorschau mit Beschriftung und kleine Porträt-Zeile. Checkliste entfällt (doppelt zu Abschnitt 2). Höhe inhaltsbasiert statt Vollbild, damit die Leistungen sichtbar beginnen.
2. **Vier Leistungen:** eine linierte 4er-Liste (Desktop 4 Spalten, Handy gestapelt): Name, ein Alltagssatz, Preis, Link. Ersetzt Leistungsraster + «Preise auf einen Blick».
3. **Dorf-Illustration** als Übergang (bestehend).
4. **Ablauf:** 3 nummerierte Schritte, Dauer im 3. Schritt.
5. **Kosten Website:** 4 Pakete als linierte Tabelle (Werte aus `de.ts`/`en.ts`), Hinweis inkl. MWST, Absatz «Laufende Kosten».
6. **Beispiele:** Café Vogel und Salon Lumière (passender zur Zielgruppe), Link zu allen.
7. **Über mich:** Porträt, kurzer Text, drei Punkte.
8. **Häufige Fragen:** 5–6 native `<details>`.
9. **Kontakt:** bestehender Kontaktblock mit neuem Text.
Zusätzlich Handy: unauffällige feste Leiste unten (Anrufen · Anfrage), erscheint erst nach dem Start-Block, respektiert Safe-Area.

## Design-Verfeinerung (innerhalb der bestehenden Tokens)
- Typografie trägt die Hierarchie: Abschnittstitel `--text-heading`, Fliesstext min. 17–18 px, Zeilenlänge ≤ 60ch, Zahlen als Ziffern.
- Linien statt Karten: Hairlines `--color-line`, keine Schatten-Kacheln, keine Icon-Quadrate, keine Pillen-Buttons.
- Ein Akzent: Gold #dda055 nur für kleine Markierungen (Schrittnummern), wie bisher bei den Häkchen.
- Flächenwechsel: Weiss / `--color-stone` für Kosten und Kontakt.
- Bewegung: nur bestehende, dezente Pfeil-Hover; reduced-motion respektiert.

## Nicht im Umfang
Andere Seiten, Navigation/Footer, neue Pakete oder Preise, Deploy, Commit.

## Prüfung
Typecheck, Lint, Unit-Tests (Vorbestand: 1 fehlschlagender Navigationstest), Screenshots 375/768/1280/1440, unabhängige Persona-Review des Ergebnisses.
