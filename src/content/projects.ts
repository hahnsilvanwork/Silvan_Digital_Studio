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
    "image": { "de": "/images/projects/falkenried-retina.webp", "en": "/images/projects/falkenried-retina-en.webp" },
    "demoUrl": "https://silvan-demo-falkenried.vercel.app",
    "demoUrlEn": "https://silvan-demo-falkenried.vercel.app/en/",
    "status": "demo-concept",
    "copy": {
      "de": {
        "category": "Unternehmenswebsite",
        "tagline": "Drei Geschäftsbereiche. Ein stimmiger Auftritt.",
        "seoTitle": "Falkenried Gruppe: Website-Konzept | SILVAN",
        "seoDescription": "Drei Geschäftsbereiche. Ein stimmiger Auftritt. Eine gemeinsame Navigation und eigenständige Bereichsseiten verbinden grosszügige Fotografie mit klaren Wegen zu Leistungen und Kontakt.",
        "challenge": "Gartenbau, Mobilität und Immobilien brauchen eigene Einstiege, ohne die gemeinsame Identität zu verlieren.",
        "approach": "Die gemeinsame Navigation hält Gartenbau, Mobilität und Immobilien unter einem Dach. Jeder Bereich erhält eigene Leistungsseiten und Bildwelten. Deutsche und englische Seiten folgen derselben Struktur, damit beim Sprachwechsel die Orientierung erhalten bleibt.",
        "outcome": "Interessenten finden den passenden Geschäftsbereich und können ein Immobilienangebot direkt in ihre Demoanfrage übernehmen. Der Zusammenhang zwischen Objekt und Anfrage bleibt auf Deutsch und Englisch klar.",
        "imageAlt": "Screenshot der überarbeiteten Startseite von Falkenried Gruppe"
      },
      "en": {
        "category": "Company website",
        "tagline": "Three divisions. One coherent presence.",
        "seoTitle": "Falkenried Gruppe: Website Concept | SILVAN",
        "seoDescription": "Three divisions. One coherent presence. Shared navigation and dedicated division pages pair generous photography with clear paths to services and contact.",
        "challenge": "Landscaping, mobility and property need distinct entry points within a shared identity.",
        "approach": "Shared navigation brings landscaping, mobility and property together. Each division has dedicated service pages and imagery. German and English pages follow the same structure to preserve orientation when switching languages.",
        "outcome": "Visitors find the relevant division and can take a property listing straight into their demo enquiry. The connection between the property and the enquiry stays clear, in German and English.",
        "imageAlt": "Screenshot of the refined Falkenried Gruppe home page"
      }
    }
  },
  {
    "slug": "cafe-vogel",
    "name": "Café & Konditorei Vogel",
    "year": "2026",
    "image": { "de": "/images/projects/cafe-vogel-retina.webp?v=20260908", "en": "/images/projects/cafe-vogel-retina-en.webp?v=20260908" },
    "demoUrl": "https://silvan-demo-cafe-vogel.vercel.app",
    "status": "demo-concept",
    "copy": {
      "de": {
        "category": "Café & Konditorei",
        "tagline": "Ein digitaler Vorgeschmack auf Kaffee und Patisserie.",
        "seoTitle": "Café & Konditorei Vogel: Website-Konzept | SILVAN",
        "seoDescription": "Ein digitaler Vorgeschmack auf Kaffee und Patisserie. Warme Farben, grossflächige Patisserie-Fotografie und eine übersichtliche Angebotsstruktur bringen Stimmung und Orientierung zusammen.",
        "challenge": "Ein Café-Auftritt soll Atmosphäre vermitteln und gleichzeitig Angebot, Öffnungszeiten und Kontakt schnell zugänglich machen.",
        "approach": "Warme Creme- und Brauntöne sowie grosse Patisserie-Fotos vermitteln die Café-Atmosphäre. Die Startseite zeigt eine Auswahl aus derselben Menüquelle wie die Speisekarte. Öffnungszeiten stehen direkt beim Kontaktformular, damit Angebot und Besuchsplanung zusammenpassen.",
        "outcome": "Gäste finden Speisekarte und Öffnungszeiten und können ihren Besuch in der Demo planen. Datum, passende Wunschzeit und Personenzahl werden vor dem Abschluss übersichtlich zusammengefasst.",
        "imageAlt": "Screenshot der überarbeiteten Startseite von Café & Konditorei Vogel"
      },
      "en": {
        "category": "Café & patisserie",
        "tagline": "A first taste of coffee and patisserie.",
        "seoTitle": "Café & Konditorei Vogel: Website Concept | SILVAN",
        "seoDescription": "A first taste of coffee and patisserie. Warm colours, generous patisserie photography and an organised menu combine atmosphere with easy navigation.",
        "challenge": "A café website should convey its atmosphere while keeping its menu, opening hours and contact easy to find.",
        "approach": "Warm cream and brown tones with large patisserie photographs convey the café atmosphere. The home page draws its selection from the same menu source as the full menu. Opening hours sit alongside the contact form to support planning a visit.",
        "outcome": "Guests can find the menu and opening hours, then plan a visit in the demo. Their date, suitable preferred time and party size are brought together for a clear review.",
        "imageAlt": "Screenshot of the German-language Café & Konditorei Vogel home page"
      }
    }
  },
  {
    "slug": "steiner-handwerk",
    "name": "Steiner Bau",
    "year": "2026",
    "image": { "de": "/images/projects/steiner-handwerk-retina.webp?v=20260908", "en": "/images/projects/steiner-handwerk-retina-en.webp?v=20260908" },
    "demoUrl": "https://silvan-demo-steiner.vercel.app",
    "status": "demo-concept",
    "copy": {
      "de": {
        "category": "Handwerk & Renovation",
        "tagline": "Handwerk mit Charakter. Klar bis zur Anfrage.",
        "seoTitle": "Steiner Bau: Website-Konzept | SILVAN",
        "seoDescription": "Handwerk mit Charakter. Klar bis zur Anfrage. Markante Typografie, dunkle Flächen und eine gezielte Akzentfarbe geben den Arbeiten einen eigenen Rahmen. Leistungen und Projektbeispiele führen zur Demoanfrage.",
        "challenge": "Unterschiedliche Handwerksleistungen müssen verständlich werden und auch auf dem Smartphone schnell erreichbar bleiben.",
        "approach": "Die einseitige Website führt von vier Leistungsbereichen über erklärte Projektideen zum Kontakt. Seitennavigation, grosse Schrift und dunkle Flächen geben der Strecke Struktur; auf dem Smartphone wird die Navigation zum aufklappbaren Menü. Die Projektbilder sind als Gestaltungsideen eingeordnet.",
        "outcome": "Wer eine Renovation plant, gelangt von der passenden Leistung direkt zur Demoanfrage. Das gewählte Anliegen ist bereits eingetragen; Besucher ergänzen ihr Vorhaben, statt von vorn anzufangen.",
        "imageAlt": "Screenshot der überarbeiteten Startseite von Steiner Bau"
      },
      "en": {
        "category": "Trades & renovation",
        "tagline": "Craft with character. Clear through to the enquiry.",
        "seoTitle": "Steiner Bau: Website Concept | SILVAN",
        "seoDescription": "Craft with character. Clear through to the enquiry. Distinctive typography, dark surfaces and a focused accent colour frame the work. Services and example projects lead into the demo enquiry.",
        "challenge": "Different trade services need clear explanations and must remain easy to reach on a phone.",
        "approach": "The single-page website moves from four service categories through explained project ideas to contact. Side navigation, large type and dark surfaces structure the page; on phones, navigation becomes an expandable menu. Project images are presented as design ideas.",
        "outcome": "Visitors planning a renovation move straight from the relevant service to a demo enquiry. Their chosen service is already included, so they can describe the project without starting again.",
        "imageAlt": "Screenshot of the German-language Steiner Bau home page"
      }
    }
  },
  {
    "slug": "salon-lumiere",
    "name": "Salon Lumière",
    "year": "2026",
    "image": { "de": "/images/projects/salon-lumiere-retina.webp?v=20260908", "en": "/images/projects/salon-lumiere-retina-en.webp?v=20260908" },
    "demoUrl": "https://silvan-demo-salon-lumiere.vercel.app",
    "status": "demo-concept",
    "copy": {
      "de": {
        "category": "Salon & Beauty",
        "tagline": "Raum für Stil. Zeit für Persönlichkeit.",
        "seoTitle": "Salon Lumière: Website-Konzept | SILVAN",
        "seoDescription": "Raum für Stil. Zeit für Persönlichkeit. Ein heller, zweiteiliger Einstieg, elegante Serifentypografie und warme Naturtöne. Leistungen mit Preisen und eine eigene Kontaktseite ergänzen die Bildwelt.",
        "challenge": "Ein Salon braucht eine persönliche Bildsprache und einen einfachen Weg von der Inspiration zu Leistungen und Terminanfrage.",
        "approach": "Ein heller, zweiteiliger Einstieg und Serifenschrift prägen den Salonauftritt. Zwölf Leistungen mit Richtpreisen machen das Angebot vergleichbar. Die fiktiven Teamprofile verwenden einheitliche Initialen; die Leistungsauswahl führt direkt zur eigenen Kontaktseite.",
        "outcome": "Besucher vergleichen Behandlungen und Richtpreise, wählen ihre Leistung und ergänzen einen Terminwunsch. Die Demo zeigt alle Angaben vor dem Abschluss noch einmal zur Kontrolle.",
        "imageAlt": "Screenshot der überarbeiteten Startseite von Salon Lumière"
      },
      "en": {
        "category": "Salon & beauty",
        "tagline": "Room for style. Time for personality.",
        "seoTitle": "Salon Lumière: Website Concept | SILVAN",
        "seoDescription": "Room for style. Time for personality. A light split introduction, elegant serif typography and warm natural tones. Services with prices and a dedicated contact page complete the visual world.",
        "challenge": "A salon needs personal imagery and a simple path from inspiration to services and appointment enquiries.",
        "approach": "A light split introduction and serif type define the salon's appearance. Twelve services with guide prices make the offering comparable. Fictional team profiles use consistent initials, and service selection leads directly to a dedicated contact page.",
        "outcome": "Visitors compare treatments and guide prices, choose a service and add a preferred appointment. The demo shows their details together for a final review.",
        "imageAlt": "Screenshot of the German-language Salon Lumière home page"
      }
    }
  }
];
export function getProject(slug: string): Project | undefined { return projects.find(project => project.slug === slug); }
export function getAdjacentProject(slug: string): Project | undefined {
 const index = projects.findIndex(project => project.slug === slug);
 return index < 0 ? undefined : projects[(index + 1) % projects.length];
}
