import type { Locale } from "./types";
interface ProjectCopy {
 readonly category: string; readonly tagline: string; readonly seoTitle: string;
 readonly seoDescription: string; readonly challenge: string; readonly approach: string;
 readonly outcome: string; readonly imageAlt: string;
}
export interface Project {
 readonly slug: string; readonly name: string; readonly year: string;
 readonly image: Readonly<Record<Locale, string>>; readonly demoUrl: string;
 readonly demoUrlEn?: string;
 readonly status: "demo-concept";
 readonly copy: Readonly<Record<Locale, ProjectCopy>>;
}
export const projects: readonly Project[] = [
  {
    "slug": "falkenried",
    "name": "Falkenried Gruppe",
    "year": "2026",
    "image": {
      "de": "/images/projects/falkenried-retina.webp?v=20260930",
      "en": "/images/projects/falkenried-retina-en.webp?v=20260930"
    },
    "demoUrl": "https://silvan-demo-falkenried.vercel.app",
    "demoUrlEn": "https://silvan-demo-falkenried.vercel.app/en/",
    "status": "demo-concept",
    "copy": {
      "de": {
        "category": "Unternehmenswebsite",
        "seoTitle": "Falkenried Gruppe: Beispiel-Website | SILVAN",
        "tagline": "Drei Geschäftsbereiche. Ein klarer Überblick.",
        "seoDescription": "Beispiel-Website für eine fiktive Unternehmensgruppe: Gartenbau, Mobilität und Immobilien übersichtlich vorgestellt, auf Deutsch und Englisch.",
        "challenge": "Drei unterschiedliche Angebote sollen leicht zu finden sein. Gleichzeitig soll erkennbar bleiben, dass Gartenbau, Mobilität und Immobilien zur selben Unternehmensgruppe gehören.",
        "approach": "Das gemeinsame Menü führt zu den drei Geschäftsbereichen. Eigene Seiten und grosse Fotos stellen das jeweilige Angebot vor. Deutsch und Englisch sind gleich aufgebaut, damit Besucher auch nach einem Sprachwechsel wissen, wo sie sind.",
        "outcome": "Besucher können ein Immobilienangebot auswählen und eine Demoanfrage dazu vorbereiten. Das gewählte Objekt bleibt in der Anfrage sichtbar, auch beim Wechsel zwischen Deutsch und Englisch.",
        "imageAlt": "Startseite des fiktiven Unternehmens Falkenried Gruppe mit Gartenfoto und drei Geschäftsbereichen"
      },
      "en": {
        "category": "Company website",
        "seoTitle": "Falkenried Gruppe: Example Website | SILVAN",
        "tagline": "Three divisions. One clear overview.",
        "seoDescription": "An example website for a fictional company group: clear introductions to landscaping, mobility and property, in German and English.",
        "challenge": "Three different services need to be easy to find, while making it clear that landscaping, mobility and property belong to the same company group.",
        "approach": "A shared menu leads to the three divisions. Each has its own pages and large photographs to introduce its services. The German and English versions follow the same layout, so visitors can find their way when they switch languages.",
        "outcome": "Visitors can choose a property and prepare a demo enquiry about it. The selected property stays visible in the enquiry, including when switching between German and English.",
        "imageAlt": "Fictional Falkenried Gruppe home page with a garden photograph and three business divisions"
      }
    }
  },
  {
    "slug": "cafe-vogel",
    "name": "Café & Konditorei Vogel",
    "year": "2026",
    "image": {
      "de": "/images/projects/cafe-vogel-retina.webp?v=20260930",
      "en": "/images/projects/cafe-vogel-retina-en.webp?v=20260930"
    },
    "demoUrl": "https://silvan-demo-cafe-vogel.vercel.app",
    "status": "demo-concept",
    "copy": {
      "de": {
        "category": "Café & Konditorei",
        "seoTitle": "Café & Konditorei Vogel: Beispiel-Website | SILVAN",
        "tagline": "Ein Vorgeschmack auf den Cafébesuch.",
        "seoDescription": "Beispiel-Website für ein fiktives Café mit Konditorei: warme Farben, Gebäckfotos, eine übersichtliche Speisekarte und eine Besuchsanfrage zum Ausprobieren.",
        "challenge": "Die Website soll Lust auf einen Cafébesuch machen. Gäste sollen zugleich schnell sehen, was es gibt, wann geöffnet ist und wie sie einen Besuch anfragen können.",
        "approach": "Creme- und Brauntöne sowie grosse Gebäckfotos geben einen Eindruck der Café-Atmosphäre. Die Auswahl auf der Startseite und die Speisekarte nutzen dieselben Angaben. Die Öffnungszeiten stehen direkt bei der Besuchsanfrage.",
        "outcome": "Gäste können die Speisekarte ansehen und eine Besuchsanfrage in der Demo vorbereiten. Datum, Wunschzeit und Personenzahl erscheinen vor dem Abschluss zusammen zur Kontrolle.",
        "imageAlt": "Startseite der Beispiel-Website für Café & Konditorei Vogel in warmen Farben mit einem grossen Gebäckfoto"
      },
      "en": {
        "category": "Café & patisserie",
        "seoTitle": "Café & Konditorei Vogel: Example Website | SILVAN",
        "tagline": "A taste of the café before you visit.",
        "seoDescription": "An example website for a fictional café and patisserie, with warm colours, pastry photographs, a clear menu and a visit enquiry to try.",
        "challenge": "The website should make guests look forward to visiting. They also need to find the menu, opening hours and a way to enquire about a visit quickly.",
        "approach": "Cream and brown tones and large pastry photographs give a sense of the café's atmosphere. The home page selection and the full menu use the same information. Opening hours appear alongside the visit enquiry.",
        "outcome": "Guests can browse the menu and prepare a visit enquiry in the demo. The date, preferred time and party size appear together for review before they finish.",
        "imageAlt": "German-language home page of the fictional Café & Konditorei Vogel, with warm colours and a large pastry photograph"
      }
    }
  },
  {
    "slug": "spurwerk",
    "name": "Spurwerk Veloatelier",
    "year": "2026",
    "image": {
      "de": "/images/projects/spurwerk-retina.webp?v=20261002",
      "en": "/images/projects/spurwerk-retina.webp?v=20261002"
    },
    "demoUrl": "https://silvan-demo-spurwerk.vercel.app/",
    "status": "demo-concept",
    "copy": {
      "de": {
        "category": "Veloatelier & Werkstatt",
        "seoTitle": "Spurwerk Veloatelier: Beispiel-Website | SILVAN",
        "tagline": "Das passende Velo. Der nächste Schritt ist klar.",
        "seoDescription": "Beispiel-Website für ein fiktives Veloatelier: Velokategorien vergleichen, Werkstattleistungen ansehen und eine Beratungs- oder Probefahrtanfrage vorbereiten.",
        "challenge": "Besucher sollen ein passendes Velo finden oder Hilfe für eine Reparatur anfragen können, auch ohne Fachwissen und auf dem Handy.",
        "approach": "Eigene Seiten führen durch Velokategorien, Werkstatt und Beratung. Grosse Velobilder, helle Flächen und dunkelgrüne Akzente prägen den Auftritt. Filter helfen bei der Auswahl. Bei den Werkstattleistungen stehen Richtpreise.",
        "outcome": "Besucher können eine Velokategorie auswählen und eine Beratungs- oder Probefahrtanfrage vorbereiten. Die gewählte Kategorie und die Art der Anfrage werden ins Formular übernommen. Das Beispiel ist keine echte Terminbuchung.",
        "imageAlt": "Startseite des fiktiven Spurwerk Veloateliers mit grünem Velo und hellen Flächen"
      },
      "en": {
        "category": "Bicycle shop & workshop",
        "seoTitle": "Spurwerk Veloatelier: Example Website | SILVAN",
        "tagline": "Find the right bike. See the next step.",
        "seoDescription": "An example website for a fictional bicycle shop: compare bike categories, explore workshop services and prepare an advice or test-ride enquiry. Demo in German.",
        "challenge": "Visitors need to find a suitable bike or ask about a repair, even without technical knowledge and when browsing on their phone.",
        "approach": "Dedicated pages introduce bike categories, workshop services and advice. Large bicycle images, light backgrounds and forest-green accents shape the design. Filters help visitors explore the range, while workshop services include guide prices.",
        "outcome": "Visitors can choose a bike category and prepare an advice or test-ride enquiry. Their chosen category and enquiry type carry through to the form. This example does not book a real appointment. The demo is in German.",
        "imageAlt": "German-language home page of the fictional Spurwerk Veloatelier with a green bicycle and light backgrounds"
      }
    }
  },
  {
    "slug": "salon-lumiere",
    "name": "Salon Lumière",
    "year": "2026",
    "image": {
      "de": "/images/projects/salon-lumiere-retina.webp?v=20260930",
      "en": "/images/projects/salon-lumiere-retina-en.webp?v=20260930"
    },
    "demoUrl": "https://silvan-demo-salon-lumiere.vercel.app",
    "status": "demo-concept",
    "copy": {
      "de": {
        "category": "Salon & Beauty",
        "seoTitle": "Salon Lumière: Beispiel-Website | SILVAN",
        "tagline": "Stil entdecken. Leistungen und Preise vergleichen.",
        "seoDescription": "Beispiel-Website für einen fiktiven Salon: helle Räume, zwölf Leistungen mit Richtpreisen und eine Terminanfrage zum Ausprobieren.",
        "challenge": "Die Website soll den Stil des Salons vermitteln. Besucher sollen Leistungen und Preise vergleichen und anschliessend einfach einen Termin anfragen können.",
        "approach": "Helle Räume, warme Naturtöne und eine elegante Schrift prägen den Auftritt. Zwölf Leistungen mit Richtpreisen machen das Angebot übersichtlich. Die fiktiven Teamprofile zeigen Initialen. Eine ausgewählte Leistung wird auf die Kontaktseite übernommen.",
        "outcome": "Besucher können Behandlungen und Richtpreise vergleichen, eine Leistung auswählen und einen Terminwunsch ergänzen. Vor dem Abschluss zeigt die Demo alle Angaben noch einmal zur Kontrolle.",
        "imageAlt": "Startseite der Beispiel-Website für Salon Lumière mit hellem Salonraum und einer Übersicht der Leistungen"
      },
      "en": {
        "category": "Salon & beauty",
        "seoTitle": "Salon Lumière: Example Website | SILVAN",
        "tagline": "Explore the style. Compare services and prices.",
        "seoDescription": "An example website for a fictional salon, with bright interiors, twelve services with guide prices and an appointment enquiry to try.",
        "challenge": "The website should convey the salon's style. Visitors need to compare services and prices, then find a simple way to enquire about an appointment.",
        "approach": "Bright interiors, warm natural tones and elegant lettering shape the site. Twelve services with guide prices make the offering easy to browse. Fictional team profiles show initials. A chosen service is carried through to the contact page.",
        "outcome": "Visitors can compare treatments and guide prices, choose a service and add a preferred appointment date and time. The demo brings all their details together for review before they finish.",
        "imageAlt": "German-language home page of the fictional Salon Lumière, with a bright salon interior and an overview of services"
      }
    }
  }
];
export function getProject(slug: string): Project | undefined { return projects.find(project => project.slug === slug); }
export function getAdjacentProject(slug: string): Project | undefined {
 const index = projects.findIndex(project => project.slug === slug);
 return index < 0 ? undefined : projects[(index + 1) % projects.length];
}
