export type Lang = "de" | "en";

export const defaultLang: Lang = "de";

// Maps every route to its DE and EN path so the language switch
// always lands on the equivalent page, not just the homepage.
export const routes: Record<string, { de: string; en: string }> = {
  home: { de: "/", en: "/en/" },
  bmw: { de: "/bmw-garage/", en: "/en/bmw-garage/" },
  bmwService: { de: "/bmw-garage/service/", en: "/en/bmw-garage/service/" },
  bmwOccasions: { de: "/bmw-garage/occasionen/", en: "/en/bmw-garage/used-cars/" },
  bmwStation: { de: "/bmw-garage/servicestation/", en: "/en/bmw-garage/service-station/" },
  bmwAccessories: { de: "/bmw-garage/zubehoer/", en: "/en/bmw-garage/accessories/" },
  gartenbau: { de: "/gartenbau/", en: "/en/gartenbau/" },
  gardenDesign: { de: "/gartenbau/gartengestaltung/", en: "/en/gartenbau/garden-design/" },
  gardenMaintenance: { de: "/gartenbau/gartenunterhalt/", en: "/en/gartenbau/garden-maintenance/" },
  gardenTransport: { de: "/gartenbau/mulden-transporte/", en: "/en/gartenbau/containers-transport/" },
  gardenReferences: { de: "/gartenbau/referenzen/", en: "/en/gartenbau/references/" },
  gardenTips: { de: "/gartenbau/tipps/", en: "/en/gartenbau/tips/" },
  immobilien: { de: "/immobilien/", en: "/en/immobilien/" },
  geschichte: { de: "/geschichte/", en: "/en/history/" },
  faq: { de: "/faq/", en: "/en/faq/" },
  news: { de: "/aktuelles/", en: "/en/news/" },
  events: { de: "/veranstaltungen/", en: "/en/events/" },
  jobs: { de: "/jobs/", en: "/en/jobs/" },
  partners: { de: "/partner/", en: "/en/partners/" },
  kontakt: { de: "/kontakt/", en: "/en/contact/" },
  impressum: { de: "/impressum/", en: "/en/imprint/" },
  datenschutz: { de: "/datenschutz/", en: "/en/privacy/" },
  notfound: { de: "/", en: "/en/" },
};

export const nav = {
  de: {
    bmw: "Autowerkstatt",
    gartenbau: "Gartenbau",
    immobilien: "Immobilien",
    geschichte: "Über Falkenried",
    faq: "FAQ",
    kontakt: "Kontakt",
    cta: "Kontakt aufnehmen",
    langSwitch: "EN",
  },
  en: {
    bmw: "Auto Workshop",
    gartenbau: "Landscaping",
    immobilien: "Real Estate",
    geschichte: "About Falkenried",
    faq: "FAQ",
    kontakt: "Contact",
    cta: "Get in Touch",
    langSwitch: "DE",
  },
} as const;

export const footer = {
  de: {
    tagline:
      "Mobilität, Garten und Immobilien: ein fiktives Unternehmenskonzept für das Zürcher Unterland.",
    divisionsHeading: "Bereiche",
    companyHeading: "Unternehmen",
    legalHeading: "Rechtliches",
    ueberUns: "Über uns",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    copyright: "Falkenried Gruppe. Designkonzept.",
  },
  en: {
    tagline:
      "Mobility, gardens and real estate: a fictional company concept for the Zürcher Unterland.",
    divisionsHeading: "Divisions",
    companyHeading: "Company",
    legalHeading: "Legal",
    ueberUns: "About Us",
    impressum: "Imprint",
    datenschutz: "Privacy Policy",
    copyright: "Falkenried Gruppe. Design concept.",
  },
} as const;

export const common = {
  de: {
    address: "Musterweg 12, 8165 Zürcher Unterland",
    phone: "Telefon auf Anfrage",
    phoneHref: "#demo-hinweis",
    email: "info@falkenried.example",
    emailHref: "/kontakt/#allgemeine-anfrage",
  },
  en: {
    address: "Musterweg 12, 8165 Zürcher Unterland",
    phone: "Phone number on request",
    phoneHref: "#demo-hinweis",
    email: "info@falkenried.example",
    emailHref: "/en/contact/#general-inquiry",
  },
} as const;

export function getLangFromUrl(url: URL): Lang {
  return url.pathname.startsWith("/en/") || url.pathname === "/en" ? "en" : "de";
}
