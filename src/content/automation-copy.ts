export const automationCopy = {
  de: {
    eyebrow: "Illustrativer Ablauf",
    title: "Von der Aufgabenliste zum Wochenbericht.",
    intro: "Ein mögliches Beispiel zur Erklärung, kein eingesetztes Kundensystem. Dieses Beispiel verarbeitet keine Geschäftsdaten und versendet keine Nachrichten.",
    steps: [
      { title: "Auslöser", text: "Zum vereinbarten Wochenabschluss liegt eine aktuelle Aufgabenliste mit Status und zuständiger Person vor." },
      { title: "Verarbeitung", text: "Der Ablauf prüft Pflichtangaben, zeigt den Status und zählt offene und erledigte Aufgaben. Unvollständige Einträge werden zur Prüfung markiert." },
      { title: "Ergebnis", text: "Ein Berichtsentwurf fasst offene und erledigte Aufgaben zusammen. Fehlende Angaben bleiben sichtbar, statt stillschweigend ergänzt zu werden." },
      { title: "Menschliche Kontrolle", text: "Die zuständige Person prüft den Entwurf und gibt ihn für die Weitergabe frei. Bei fehlenden Daten oder einem abgebrochenen Lauf erhält sie eine Fehlermeldung und bearbeitet den Fall manuell." },
    ],
    limit: "Ob sich dieser Ablauf umsetzen lässt, hängt von Ihrer Datenquelle, den verfügbaren Schnittstellen und den erlaubten Zugriffen ab. Das Beispiel verspricht keine bestimmte Integration oder Zeitersparnis.",
    agreementTitle: "Vor der Umsetzung klären",
    agreement: [
      { title: "Daten und Systeme", text: "Welche Daten liegen in welcher Qualität vor? Welche Systeme erlauben den nötigen Zugriff? Regeln, Ausnahmen und Berechtigungen bestimmen die Machbarkeit." },
      { title: "Betrieb und Fehlerfälle", text: "Wer ist nach der Übergabe verantwortlich, wer bekommt Fehlermeldungen und wie wird bei Ausfällen weitergearbeitet? Zuständigkeit, Meldeweg und Wartungsumfang werden vereinbart." },
      { title: "Aufwand und laufende Kosten", text: "Analyse, Umsetzung und mögliche Wartung werden in der Offerte abgegrenzt. Nötige externe Abos oder nutzungsabhängige Gebühren werden für die konkrete Lösung ausgewiesen." },
    ],
    contact: "Der erste Kontakt ist unverbindlich: Beschreiben Sie Ihren heutigen Ablauf und den Engpass. Eine vertiefte Analyse oder Umsetzung beginnt erst nach einer beidseitig angenommenen Offerte mit Leistungsumfang und Preis.",
  },
  en: {
    eyebrow: "Illustrative workflow",
    title: "From a task list to a weekly report.",
    intro: "A possible example to explain the approach, not a deployed client system. This example processes no business data and sends no messages.",
    steps: [
      { title: "Trigger", text: "At the agreed weekly cut-off, an up-to-date task list is available with a status and responsible person for each task." },
      { title: "Processing", text: "The workflow checks required fields, shows each status and counts open and completed tasks. Incomplete entries are flagged for review." },
      { title: "Result", text: "A draft report summarises open and completed tasks. Missing information stays visible instead of being filled in silently." },
      { title: "Human review", text: "The responsible person checks the draft and approves it for sharing. If data is missing or a run fails, they receive an error notification and handle the case manually." },
    ],
    limit: "Whether this workflow is feasible depends on your data source, available interfaces, and permitted access. The example promises no particular integration or time saving.",
    agreementTitle: "Agree before implementation",
    agreement: [
      { title: "Data and systems", text: "What data is available, and how complete is it? Which systems allow the required access? Rules, exceptions, and permissions determine feasibility." },
      { title: "Operation and failures", text: "Who is responsible after handover, who receives error notifications, and how does work continue during an outage? Ownership, notification channels, and maintenance scope are agreed." },
      { title: "Effort and ongoing costs", text: "Analysis, implementation, and possible maintenance are scoped in the quote. Any required external subscriptions or usage fees are specified for the particular solution." },
    ],
    contact: "The first contact is a no-obligation enquiry: describe your current workflow and bottleneck. Detailed analysis or implementation only starts once both parties have accepted a quote specifying the scope and price.",
  },
} as const;
