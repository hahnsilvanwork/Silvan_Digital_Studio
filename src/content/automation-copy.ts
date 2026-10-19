export const automationCopy = {
  de: {
    eyebrow: "Ablauf zum Ausprobieren",
    title: "Von der Aufgabenliste zum Wochenbericht.",
    intro: "Probieren Sie den Ablauf mit erfundenen Aufgaben aus. Das Beispiel bleibt auf dieser Seite: Es speichert keine Daten und versendet keine Nachrichten.",
    steps: [
      { title: "Aufgaben erfassen", text: "Jede Aufgabe hat eine zuständige Person und den Stand «offen» oder «erledigt». Im Beispiel können Sie diesen Stand ändern." },
      { title: "Bericht erstellen", text: "Mit einem Klick zählt der Ablauf offene und erledigte Aufgaben und fasst sie in einem Bericht zusammen." },
      { title: "Fehlende Angaben erkennen", text: "Fehlt bei einer Aufgabe die zuständige Person, weist der Bericht darauf hin. Sie können den Entwurf erst als geprüft markieren, wenn die Angabe vollständig ist." },
      { title: "Selbst prüfen", text: "Sie prüfen den Entwurf und markieren ihn als geprüft. Das zeigt den Kontrollschritt vor einer möglichen Weitergabe; in diesem Beispiel wird nichts versendet." },
    ],
    limit: "Für Ihren Betrieb prüfen wir, wo die Aufgaben erfasst werden und ob Ihre Programme die nötigen Daten bereitstellen können. Erst dann lässt sich sagen, wie eine passende Lösung aussieht und ob sich der Aufwand lohnt.",
    agreementTitle: "Das klären wir vor dem Start",
    agreement: [
      { title: "Ihre Daten und Programme", text: "Welche Angaben sind vorhanden, und sind sie vollständig? Können Ihre Programme sie bereitstellen? Wir klären Zugriffe, Regeln und Ausnahmen, bevor ich eine Lösung plane." },
      { title: "Betreuung und Fehler", text: "Wer kümmert sich nach der Übergabe um den Ablauf? Wer wird bei einem Fehler informiert, und wie arbeiten Sie dann weiter? Zuständigkeiten, Benachrichtigungen und Wartung halten wir gemeinsam fest." },
      { title: "Einmalige und laufende Kosten", text: "Die Offerte nennt die Kosten für die Prüfung, die Umsetzung und eine allfällige Wartung. Benötigte Abos anderer Anbieter oder Gebühren pro Nutzung werden für Ihre Lösung separat aufgeführt." },
    ],
    contact: "Erzählen Sie mir, welche Aufgabe Sie immer wieder von Hand erledigen. Die erste Anfrage ist unverbindlich. Eine ausführliche Prüfung oder Umsetzung beginnt erst, wenn wir beide der Offerte mit Leistungen und Preis zugestimmt haben.",
  },
  en: {
    eyebrow: "Try a sample process",
    title: "From a task list to a weekly report.",
    intro: "Try the process with fictional tasks. Everything stays on this page: no data is saved and no messages are sent.",
    steps: [
      { title: "Record the tasks", text: "Each task has an assigned person and a status of ‘open’ or ‘done’. In this example, you can change the status." },
      { title: "Create the report", text: "With one click, the process counts open and completed tasks and brings them together in a report." },
      { title: "Spot missing information", text: "If a task has no assigned person, the report flags it. You can only mark the draft as reviewed once that information is complete." },
      { title: "Review it yourself", text: "Check the draft and mark it as reviewed. This shows the review step before a report could be shared; this example does not send anything." },
    ],
    limit: "For your business, we first check where tasks are recorded and whether your software can provide the data we need. That tells us what a suitable solution could look like and whether it is worth building.",
    agreementTitle: "What we agree before starting",
    agreement: [
      { title: "Your data and software", text: "What information do you have, and is it complete? Can your software make it available? We check access, rules and exceptions before I plan a solution." },
      { title: "Support and errors", text: "Who will look after the process once it is in use? Who is told about an error, and how will work continue? We agree on responsibilities, notifications and maintenance together." },
      { title: "One-off and ongoing costs", text: "Your quote sets out the costs of the review, the build and any maintenance. Required subscriptions to other services or usage fees are listed separately for your solution." },
    ],
    contact: "Tell me about a task you keep doing by hand. Your first enquiry carries no obligation. A detailed review or build only starts once we have both accepted the quote with the agreed work and price.",
  },
} as const;
