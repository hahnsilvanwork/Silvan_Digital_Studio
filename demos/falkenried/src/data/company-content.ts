import type { Lang } from "../i18n/nav";
type Localized = Record<Lang, string>;
export type NewsItem = { slug: string; title: Localized; summary: Localized; year: number; category: Localized; sourceUrl: string };
export type EventItem = { title: Localized; startsAt: string; summary: Localized };
export type JobOpening = { title: Localized; location: string };
export type Partner = { name: string; service: Localized; description: Localized; url: string; phone?: string };
export const verifiedOn = "2026-08-24";
export const news: readonly NewsItem[] = [
  { slug: "gewerbeschau-dielsdorf", title: { de: "Gewerbeschau Dielsdorf", en: "Dielsdorf trade fair" }, summary: { de: "Dieser Musterbeitrag zeigt, wie die Teilnahme an einer regionalen Gewerbeschau angekündigt werden könnte. Er kündigt keine tatsächliche Veranstaltungsteilnahme an.", en: "This sample post illustrates how participation in a regional trade fair could be announced. It does not announce actual attendance." }, year: 2026, category: { de: "Unternehmen", en: "Company" }, sourceUrl: "https://falkenried.example" },
  { slug: "welcher-antrieb-passt", title: { de: "Welcher Antrieb passt zu mir?", en: "Which drivetrain suits me?" }, summary: { de: "Ein Einstieg in die persönliche Abwägung zwischen Verbrenner, Hybrid und Elektromobilität – passend zu Fahrprofil und Alltag.", en: "An introduction to choosing between combustion, hybrid and electric mobility based on your driving profile and everyday needs." }, year: 2026, category: { de: "Ratgeber", en: "Guide" }, sourceUrl: "https://falkenried.example" },
  { slug: "feriencheck", title: { de: "Feriencheck", en: "Holiday check" }, summary: { de: "Vor der Reise werden zentrale Sicherheits- und Betriebsbereiche des Fahrzeugs kontrolliert.", en: "Before your journey, key safety and operating areas of the vehicle are inspected." }, year: 2026, category: { de: "Service", en: "Service" }, sourceUrl: "https://falkenried.example" },
] as const;
export const events: readonly EventItem[] = [];
export const jobs: readonly JobOpening[] = [];
export const partners: readonly Partner[] = [
  { name: "Talblick Mobilität", service: { de: "Mietwagen für Ihren Umzug", en: "Rental vehicles for your move" }, description: { de: "Mietwagenstation in Schöfflisdorf im Wehntal.", en: "Rental vehicle station in Schöfflisdorf in the Wehntal valley." }, url: "/kontakt/", phone: "Telefon auf Anfrage" },
  { name: "Lindenklar Reinigung", service: { de: "Wohnungsreinigung", en: "Apartment cleaning" }, description: { de: "Fiktives Partnerprofil für Wohnungsreinigung bei einem Mieterwechsel.", en: "Fictional partner profile for apartment cleaning when tenants move." }, url: "/kontakt/" },
] as const;
