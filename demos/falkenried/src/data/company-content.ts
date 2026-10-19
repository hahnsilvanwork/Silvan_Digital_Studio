import type { Lang } from "../i18n/nav";
type Localized = Record<Lang, string>;
export type NewsItem = { slug: string; title: Localized; summary: Localized; year: number; category: Localized; sourceUrl: string };
export type EventItem = { title: Localized; startsAt: string; summary: Localized };
export type JobOpening = { title: Localized; location: string };
export type Partner = { name: string; service: Localized; description: Localized; url: string; phone?: string };
export const verifiedOn = "2026-08-24";
export const news: readonly NewsItem[] = [
  { slug: "gewerbeschau-dielsdorf", title: { de: "Gewerbeschau Dielsdorf", en: "Dielsdorf trade fair" }, summary: { de: "Ein Musterbeitrag für die Teilnahme an einer regionalen Gewerbeschau. Er zeigt, wie ein Unternehmen zu einem Besuch am Stand einladen könnte; eine echte Teilnahme wird hier nicht angekündigt.", en: "A sample post about taking part in a regional trade fair. It shows how a business could invite visitors to its stand; no actual attendance is announced here." }, year: 2026, category: { de: "Unternehmen", en: "Company" }, sourceUrl: "https://falkenried.example" },
  { slug: "welcher-antrieb-passt", title: { de: "Welcher Antrieb passt zu mir?", en: "Which type of car suits my needs?" }, summary: { de: "Benzin oder Diesel, Hybrid oder Elektro? Entscheidend ist, wie Sie Ihr Auto im Alltag nutzen. Dieser Beispielbeitrag zeigt ein mögliches Thema für einen Fahrzeugratgeber.", en: "Petrol or diesel, hybrid or electric? The starting point is how you use your car each day. This sample post shows a possible topic for a motoring guide." }, year: 2026, category: { de: "Ratgeber", en: "Guide" }, sourceUrl: "https://falkenried.example" },
  { slug: "feriencheck", title: { de: "Feriencheck", en: "Holiday check" }, summary: { de: "Bremsen, Batterie und Flüssigkeiten: Der Beispielbeitrag stellt vor, welche Fahrzeugbereiche vor einer längeren Reise geprüft werden können.", en: "Brakes, battery and fluids: this sample post introduces the vehicle checks that can be made before a longer journey." }, year: 2026, category: { de: "Service", en: "Service" }, sourceUrl: "https://falkenried.example" },
] as const;
export const events: readonly EventItem[] = [];
export const jobs: readonly JobOpening[] = [];
export const partners: readonly Partner[] = [
  { name: "Talblick Mobilität", service: { de: "Mietwagen für Ihren Umzug", en: "Rental vehicles for your move" }, description: { de: "Beispiel für einen Partner mit Transportern und Umzugsfahrzeugen im Wehntal. Das Profil gehört zum fiktiven Unternehmenskonzept.", en: "An example partner offering vans and moving vehicles in the Wehntal valley. This profile is part of the fictional business concept." }, url: "/kontakt/", phone: "Telefon auf Anfrage" },
  { name: "Lindenklar Reinigung", service: { de: "Wohnungsreinigung", en: "Apartment cleaning" }, description: { de: "Beispiel für einen Reinigungspartner, der Wohnungen für die Übergabe vorbereitet. Das Profil gehört zum fiktiven Unternehmenskonzept.", en: "An example cleaning partner preparing apartments for handover. This profile is part of the fictional business concept." }, url: "/kontakt/" },
] as const;
