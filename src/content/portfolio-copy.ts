import type { Locale } from "./types";

export const portfolioCopy = {
  de: {
    approachLabel: "So ist die Website aufgebaut",
    outcomeLabel: "Das können Sie ausprobieren",
    limitsLabel: "Zu diesem Beispiel",
    limits: "Diesen Betrieb gibt es nicht. Ich habe die Website als Beispiel selbst entworfen und gebaut. Es ist kein Kundenauftrag, deshalb gibt es keine Zahlen zu Besuchern oder Umsatz. Formulare in der Demo senden nichts ab und buchen keine Termine.",
  },
  en: {
    approachLabel: "How the website is built",
    outcomeLabel: "What you can try",
    limitsLabel: "About this example",
    limits: "This business does not exist. I designed and built the website myself as an example. It is not a client project, so there are no figures on visitors or sales. Forms in the demo send nothing and book no appointments.",
  },
} as const satisfies Record<Locale, {
  approachLabel: string;
  outcomeLabel: string;
  limitsLabel: string;
  limits: string;
}>;
