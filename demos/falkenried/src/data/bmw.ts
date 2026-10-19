import type { Lang } from "../i18n/nav";

export type LocalizedText = Record<Lang, string>;

export type BMWService = {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  details: Record<Lang, readonly string[]>;
  price?: LocalizedText;
  audience?: LocalizedText;
};

export type StationFeature = {
  id: string;
  title: LocalizedText;
  eyebrow: LocalizedText;
  description: LocalizedText;
  availability: LocalizedText;
  payment?: LocalizedText;
};

export const verifiedOn = "2026-08-24";
export const bmwDataMeta = { verifiedOn: "2026-08-24" } as const;

export const bmwServices: readonly BMWService[] = [
  {
    id: "holiday-check",
    title: { de: "Feriencheck", en: "Holiday check" },
    summary: {
      de: "Vor einer längeren Fahrt werden Bremsen, Batterie, Flüssigkeiten und weitere Fahrzeugbereiche geprüft.",
      en: "Checks of brakes, battery, fluids and other parts of your vehicle before a longer journey.",
    },
    audience: { de: "Für sämtliche Automarken", en: "For all vehicle brands" },
    price: { de: "CHF 87.–", en: "CHF 87" },
    details: {
      de: ["Bremsen auf dem Prüfstand kontrollieren", "Batterie, Flüssigkeiten und Kühlung prüfen", "Lenkung, Spur und Unterbodenschutz ansehen", "Scheibenwischer prüfen und Fahrzeug waschen"],
      en: ["Check the brakes on a test bench", "Check the battery, fluids and cooling system", "Inspect steering, alignment and underbody protection", "Check the wipers and wash the vehicle"],
    },
  },
  {
    id: "climate-service",
    title: { de: "Klimaservice", en: "Air-conditioning service" },
    summary: {
      de: "Die Klimaanlage warten und bei unangenehmen Gerüchen eine Desinfektion prüfen.",
      en: "Service the air conditioning and consider disinfection if there are unpleasant odours.",
    },
    audience: { de: "Für sämtliche Automarken", en: "For all vehicle brands" },
    details: {
      de: ["Kältemittel absaugen und die Anlage neu befüllen", "Anlage bei Bedarf desinfizieren"],
      en: ["Remove the refrigerant and refill the system", "Disinfect the system if needed"],
    },
  },
  {
    id: "windscreen",
    title: { de: "Frontscheiben-Service", en: "Windscreen service" },
    summary: {
      de: "Beratung, Reparatur oder Ersatz bei Steinschlag und Rissen in der Frontscheibe.",
      en: "Advice, repair or replacement for stone chips and windscreen cracks.",
    },
    details: {
      de: ["Schaden fachgerecht beurteilen", "Versicherungsdeckung und freie Werkstattwahl klären"],
      en: ["Professional damage assessment", "Clarification of insurance cover and choice of repairer"],
    },
  },
  {
    id: "body-damage",
    title: { de: "Blechschäden", en: "Body damage" },
    summary: {
      de: "Nach einem Karosserieschaden die Reparatur, Versicherungsfragen und eine mögliche Ersatzmobilität klären.",
      en: "After body damage, discuss the repair, insurance questions and possible replacement transport.",
    },
    details: {
      de: ["Versicherungsfragen zur Reparatur besprechen", "Ersatzmobilität nach Verfügbarkeit klären", "Pannenhilfe ausserhalb der Öffnungszeiten separat organisieren"],
      en: ["Discuss insurance questions about the repair", "Check replacement transport, subject to availability", "Arrange roadside assistance separately outside opening hours"],
    },
  },
  {
    id: "rbv",
    title: { de: "Reparaturbestätigung (RBV)", en: "Repair confirmation (RBV)" },
    summary: {
      de: "Ein Beispiel für die Reparatur von Mängeln, die bei einer Fahrzeugprüfung festgestellt wurden. Die Demo weist keine behördliche Anerkennung nach.",
      en: "An example of repairs for faults identified during a vehicle inspection. This demo does not represent an officially authorised inspection workshop.",
    },
    details: {
      de: ["Nötige Reparaturen anhand des Prüfbescheids klären", "Fahrzeugausweis und Prüfbescheid berücksichtigen"],
      en: ["Use the inspection report to identify the required repairs", "Refer to the registration document and inspection report"],
    },
  },
  {
    id: "bmw-i",
    title: { de: "BMW i Service", en: "BMW i service" },
    summary: {
      de: "Diagnose und Wartung von BMW Elektrofahrzeugen als Teil des beispielhaften Werkstattangebots.",
      en: "Diagnostics and maintenance for BMW electric vehicles in the example workshop services.",
    },
    details: { de: ["Diagnose und Wartung für BMW i"], en: ["Diagnostics and maintenance for BMW i"] },
  },
  {
    id: "service-plus",
    title: { de: "BMW Service Plus", en: "BMW Service Plus" },
    summary: {
      de: "Bei einem echten Serviceauftrag müsste zuerst geprüft werden, welche Arbeiten durch ein bestehendes BMW Service Plus Paket gedeckt sind.",
      en: "For a real service appointment, the first step would be to check which work an existing BMW Service Plus package covers.",
    },
    details: {
      de: ["Gültigkeit und Deckung werden fahrzeugbezogen geprüft"],
      en: ["Eligibility and coverage are checked for the individual vehicle"],
    },
  },
] as const;

export const stationFeatures: readonly StationFeature[] = [
  {
    id: "fuel",
    title: { de: "Tankstelle", en: "Fuel station" },
    eyebrow: { de: "Diesel und Bleifrei", en: "Diesel and unleaded" },
    description: {
      de: "Selbstbedienungstankstelle mit optionaler Monatsrechnung für Firmenkunden.",
      en: "Self-service fuel station with optional monthly billing for business customers.",
    },
    availability: { de: "24 Stunden · 365 Tage", en: "24 hours · 365 days" },
    payment: { de: "CHF/EUR-Noten, Karten und TWINT", en: "CHF/EUR notes, cards and TWINT" },
  },
  {
    id: "charging",
    title: { de: "Elektroladestation", en: "EV charging" },
    eyebrow: { de: "Zwei Ladepunkte · alle Marken", en: "Two charge points · all brands" },
    description: {
      de: "Laden mit BMW Public Charging oder Kreditkarte direkt vor Ort.",
      en: "Charge with BMW Public Charging or by credit card directly on site.",
    },
    availability: { de: "Rund um die Uhr", en: "Around the clock" },
    payment: { de: "BMW Charging oder Kreditkarte", en: "BMW Charging or credit card" },
  },
  {
    id: "car-wash",
    title: { de: "Waschanlage", en: "Car wash" },
    eyebrow: { de: "Selbstbedienung", en: "Self service" },
    description: {
      de: "Waschplätze mit Bargeld-, Karten- und TWINT-Zahlung sowie Wertkarte.",
      en: "Wash bays accepting cash, cards and TWINT, plus a stored-value card.",
    },
    availability: { de: "Mo–Fr 07–12 / 13–20 · Sa 07–12 / 13–18", en: "Mon–Fri 07–12 / 13–20 · Sat 07–12 / 13–18" },
    payment: { de: "Bargeld, Karten, TWINT oder Wertkarte", en: "Cash, cards, TWINT or stored-value card" },
  },
  {
    id: "vacuum",
    title: { de: "Staubsauger", en: "Vacuum cleaner" },
    eyebrow: { de: "Selbstbedienung", en: "Self service" },
    description: {
      de: "Selbstbedienungs-Staubsauger direkt bei der Servicestation.",
      en: "Self-service vacuum directly at the service station.",
    },
    availability: { de: "Mo–Fr 07–12 / 13–20 · Sa 07–12 / 13–18", en: "Mon–Fri 07–12 / 13–20 · Sat 07–12 / 13–18" },
    payment: { de: "Münzeinwurf: CHF 1", en: "Coin operation: CHF 1" },
  },
] as const;

export const bmwFaqs = [
  {
    question: { de: "Welche Automarken betreuen Sie?", en: "Which vehicle brands do you service?" },
    answer: { de: "Das Werkstattkonzept legt den Schwerpunkt auf BMW. Feriencheck und Klimaservice sind als Beispiele für alle Marken beschrieben. Die Angaben zeigen ein mögliches Angebot und keine bestätigte Herstellerpartnerschaft.", en: "The workshop concept focuses on BMW. Holiday checks and air-conditioning services are examples intended for all brands. These details illustrate possible services, not a confirmed manufacturer partnership." },
  },
  {
    question: { de: "Kann ich online einen Servicetermin buchen?", en: "Can I book a service appointment online?" },
    answer: { de: "Sie können im Demoformular eine Serviceanfrage vorbereiten und Ihre Angaben prüfen. Es wird nichts gesendet und kein Termin gebucht.", en: "You can prepare a service enquiry in the demo form and review your details. Nothing is sent and no appointment is booked." },
  },
  {
    question: { de: "Kann ich rund um die Uhr tanken und laden?", en: "Can I refuel and charge around the clock?" },
    answer: { de: "Im Beispiel sind die Tankstelle und zwei Ladepunkte für alle Marken rund um die Uhr zugänglich. Für Waschanlage und Staubsauger gelten die separat genannten Zeiten.", en: "In the example, the fuel station and two charge points for all brands are accessible around the clock. The car wash and vacuum cleaner have their own opening hours." },
  },
] as const;

export const autolina = {
  iframeUrl: "https://www.autolina.ch/iframe/1902?bg=ffffff&border=0653b6&buttons=0653b6&garantieFilter=none&transparency=transparent",
  externalUrl: "https://www.autolina.ch/",
  verifiedOn,
} as const;
