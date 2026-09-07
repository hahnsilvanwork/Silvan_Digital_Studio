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
      de: "Kontrolle der wichtigsten sicherheits- und reise­relevanten Fahrzeugbereiche.",
      en: "Inspection of the key safety and travel-related areas of your vehicle.",
    },
    audience: { de: "Für sämtliche Automarken", en: "For all vehicle brands" },
    price: { de: "CHF 87.–", en: "CHF 87" },
    details: {
      de: ["Bremsanlage und Prüfstand", "Batterie, Flüssigkeiten und Kühlsystem", "Lenkung, Spur und Unterbodenschutz", "Scheibenwischer und Wagenwäsche"],
      en: ["Brake system and test bench", "Battery, fluids and cooling system", "Steering, alignment and underbody protection", "Wipers and vehicle wash"],
    },
  },
  {
    id: "climate-service",
    title: { de: "Klimaservice", en: "Air-conditioning service" },
    summary: {
      de: "Kältemittelservice oder Desinfektion für angenehme und zuverlässige Kühlung.",
      en: "Refrigerant servicing or disinfection for comfortable, reliable cooling.",
    },
    audience: { de: "Für sämtliche Automarken", en: "For all vehicle brands" },
    details: {
      de: ["Absaugen, Evakuieren und Neubefüllen", "Desinfektion gegen unangenehme Gerüche"],
      en: ["Extraction, evacuation and refilling", "Disinfection to address unpleasant odours"],
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
      de: "Koordination von Reparatur, Versicherung und Mobilität nach einem Karosserieschaden.",
      en: "Coordination of repairs, insurance and mobility after body damage.",
    },
    details: {
      de: ["Unterstützung bei Versicherungsangelegenheiten", "Mobilitätslösung nach Verfügbarkeit", "BMW Pannendienst ausserhalb der Öffnungszeiten"],
      en: ["Support with insurance matters", "Mobility solution subject to availability", "BMW roadside assistance outside opening hours"],
    },
  },
  {
    id: "rbv",
    title: { de: "Reparaturbestätigung (RBV)", en: "Repair confirmation (RBV)" },
    summary: {
      de: "RBV-Fachbetrieb für im Kanton Zürich eingelöste Fahrzeuge nach der Fahrzeugprüfung.",
      en: "Authorised RBV workshop for vehicles registered in the Canton of Zurich after inspection.",
    },
    details: {
      de: ["Termin innert 30 Tagen vereinbaren", "Fahrzeugausweis und Prüfbescheid mitbringen"],
      en: ["Arrange an appointment within 30 days", "Bring the registration document and inspection report"],
    },
  },
  {
    id: "bmw-i",
    title: { de: "BMW i Service", en: "BMW i service" },
    summary: {
      de: "Ausrüstung und Fachkompetenz für Servicearbeiten an BMW Elektrofahrzeugen.",
      en: "Equipment and expertise for servicing BMW electric vehicles.",
    },
    details: { de: ["Diagnose und Wartung für BMW i"], en: ["Diagnostics and maintenance for BMW i"] },
  },
  {
    id: "service-plus",
    title: { de: "BMW Service Plus", en: "BMW Service Plus" },
    summary: {
      de: "Abwicklung der von BMW Service Plus gedeckten Inklusivleistungen als offizielle BMW Servicestelle.",
      en: "Processing of covered BMW Service Plus benefits as an official BMW service centre.",
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
    title: { de: "Staubsauger", en: "Vacuum" },
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
    answer: { de: "Der BMW Service ist unser Schwerpunkt. Feriencheck, Klimaservice und RBV bieten wir gemäss veröffentlichtem Leistungsumfang auch für andere Marken an.", en: "BMW service is our main focus. According to our published scope, we also offer holiday checks, air-conditioning service and RBV for other brands." },
  },
  {
    question: { de: "Kann ich online einen Servicetermin buchen?", en: "Can I book a service appointment online?" },
    answer: { de: "Ja. Der externe BMW-Onlineterminplaner zeigt die verfügbaren Anliegen und Termine.", en: "Yes. The external BMW appointment planner shows available services and dates." },
  },
  {
    question: { de: "Kann ich rund um die Uhr tanken und laden?", en: "Can I refuel and charge around the clock?" },
    answer: { de: "Ja. Tankstelle und die zwei markenoffenen Ladestationen sind rund um die Uhr zugänglich. Für Waschanlage und Staubsauger gelten separate Zeiten.", en: "Yes. The fuel station and two brand-independent charge points are accessible around the clock. Separate hours apply to the car wash and vacuum." },
  },
] as const;

export const autolina = {
  iframeUrl: "https://www.autolina.ch/iframe/1902?bg=ffffff&border=0653b6&buttons=0653b6&garantieFilter=none&transparency=transparent",
  externalUrl: "https://www.autolina.ch/",
  verifiedOn,
} as const;
