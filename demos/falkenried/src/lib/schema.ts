import type { Lang } from "../i18n/nav";
import { bmwOpeningHours, company } from "../data/company.ts";

const BASE = {
  "@context": "https://schema.org",
  name: company.name,
  url: "https://falkenried.example",
  logo: "https://falkenried.example",
  telephone: company.phone.international,
  email: company.email,
  vatID: company.uid,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    postalCode: company.address.postalCode,
    addressLocality: company.address.locality,
    addressRegion: company.address.region,
    addressCountry: company.address.country,
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: bmwOpeningHours.monday[0][0], closes: bmwOpeningHours.monday[0][1] },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: bmwOpeningHours.monday[1][0], closes: bmwOpeningHours.monday[1][1] },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday"], opens: bmwOpeningHours.friday[0][0], closes: bmwOpeningHours.friday[0][1] },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday"], opens: bmwOpeningHours.friday[1][0], closes: bmwOpeningHours.friday[1][1] },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: bmwOpeningHours.saturday[0][0], closes: bmwOpeningHours.saturday[0][1] },
  ],
};

export function organizationSchema(lang: Lang) {
  return {
    ...BASE,
    "@type": "Organization",
    description:
      lang === "de"
        ? "Fiktives Unternehmenskonzept im Zürcher Unterland mit Beispielen für Autowerkstatt, Gartenbau und Immobilienverwaltung."
        : "Fictional business concept in the Zürcher Unterland with examples of car servicing, landscaping and property management.",
  };
}

export function automotiveBusinessSchema(lang: Lang) {
  return {
    ...BASE,
    "@type": "AutomotiveBusiness",
    "@id": "https://falkenried.example",
    description:
      lang === "de"
        ? "Fiktives Werkstattkonzept im Zürcher Unterland mit Beispielen für Service, Reparaturen, Fahrzeugverkauf und eine Servicestation."
        : "Fictional workshop concept in the Zürcher Unterland with examples of servicing, repairs, vehicle sales and a service station.",
  };
}

export function realEstateSchema(lang: Lang) {
  return {
    ...BASE,
    "@type": "RealEstateAgent",
    "@id": "https://falkenried.example",
    description:
      lang === "de"
        ? "Fiktives Immobilienkonzept mit beispielhaften Wohn- und Gewerberäumen im Zürcher Unterland."
        : "Fictional property concept with example homes and commercial spaces in the Zürcher Unterland.",
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
