export type Lang = "de" | "en";
export type TimeRange = readonly [opens: string, closes: string];

export const company = {
  name: "Falkenried Gruppe",
  uid: "Fiktives Beispielunternehmen",
  address: {
    street: "Musterweg 12",
    postalCode: "8165",
    locality: "Zürcher Unterland",
    region: "ZH",
    country: "CH",
  },
  phone: {
    display: "Keine reale Telefonnummer in dieser Demo",
    international: "DEMO",
    href: "#demo-hinweis",
  },
  fax: {
    display: "Kein Faxdienst in dieser Demo",
    international: "DEMO",
  },
  email: "info@falkenried.example",
} as const;

export const externalLinks = {
  corporate: "https://falkenried.example",
  garage: "https://falkenried.example",
  garden: "https://falkenried.example",
  bmwAppointment: "/kontakt/#allgemeine-anfrage",
} as const;

export const people = {
  "jonas-lindberg": {
    id: "jonas-lindberg",
    name: "Jonas Lindberg",
    roles: {
      de: ["Geschäftsführer", "Verkäufer", "Serviceberater"],
      en: ["Managing director", "Sales adviser", "Service adviser"],
    },
  },
  "lukas-falkenried": {
    id: "lukas-falkenried",
    name: "Lukas Falkenried",
    roles: {
      de: ["Gartenbau", "Technischer Immobilienunterhalt"],
      en: ["Landscaping", "Property maintenance"],
    },
  },
  "mara-linden": {
    id: "mara-linden",
    name: "Mara Linden",
    roles: {
      de: ["Geschäftsführerin", "Immobilien"],
      en: ["Managing director", "Property"],
    },
  },
  "nora-feldmann": {
    id: "nora-feldmann",
    name: "Nora Feldmann",
    roles: {
      de: ["Sachbearbeiterin Immobilien"],
      en: ["Property administrator"],
    },
  },
} as const;

export const bmwOpeningHours = {
  monday: [["07:30", "12:00"], ["13:00", "17:30"]],
  tuesday: [["07:30", "12:00"], ["13:00", "17:30"]],
  wednesday: [["07:30", "12:00"], ["13:00", "17:30"]],
  thursday: [["07:30", "12:00"], ["13:00", "17:30"]],
  friday: [["07:30", "12:00"], ["13:00", "17:00"]],
  saturday: [["08:30", "13:00"]],
  sunday: [],
  lastSaturdayClosed: true,
} as const satisfies Record<string, readonly TimeRange[] | boolean>;

export const dataProvenance = {
  checkedAt: "2026-08-24",
  requiresLaunchConfirmation: true,
  sources: [
    "https://falkenried.example",
    "https://falkenried.example",
    "https://falkenried.example",
    "https://falkenried.example",
    "https://falkenried.example",
    "https://falkenried.example",
    "https://falkenried.example",
  ],
} as const;

export function formatAddress(separator = ", ") {
  return `${company.address.street}${separator}${company.address.postalCode} ${company.address.locality}`;
}

export function formatRoles(person: keyof typeof people, lang: Lang) {
  return people[person].roles[lang].join(", ");
}
