import type { Locale } from "./types";

export const portfolioCopy = {
  de: {
    approachLabel: "Gestaltungsentscheidung",
    outcomeLabel: "Im Konzept umgesetzt",
    limitsLabel: "Rahmen der Fallstudie",
    limits: "Eigeninitiiertes Konzept für ein fiktives Unternehmen, kein Kundenauftrag. Gezeigt werden Gestaltung und Funktionen, keine gemessenen Geschäftsergebnisse. Demoformulare versenden keine Daten und buchen keine Termine; Verfügbarkeiten werden nicht geprüft.",
  },
  en: {
    approachLabel: "Design decision",
    outcomeLabel: "Implemented in the concept",
    limitsLabel: "Scope of this case study",
    limits: "A self-initiated concept for a fictional business, not a client commission. It demonstrates design and functionality, with no measured business results. Demo forms do not send data or book appointments; availability is not checked.",
  },
} as const satisfies Record<Locale, {
  approachLabel: string;
  outcomeLabel: string;
  limitsLabel: string;
  limits: string;
}>;
