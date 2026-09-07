import type { Locale } from "./types";
interface ProjectCopy {
 readonly category: string; readonly tagline: string; readonly seoTitle: string;
 readonly seoDescription: string; readonly challenge: string; readonly approach: string;
 readonly outcome: string; readonly imageAlt: string;
}
export interface Project {
 readonly slug: string; readonly name: string; readonly year: string;
 readonly image: Readonly<Record<Locale, string>>; readonly demoUrl: string;
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
    "status": "demo-concept",
    "copy": {
      "de": {
        "category": "Unternehmenswebsite",
        "tagline": "Drei Geschäftsbereiche. Ein stimmiger Auftritt.",
        "seoTitle": "Falkenried Gruppe: Website-Konzept | SILVAN",
        "seoDescription": "Drei Geschäftsbereiche. Ein stimmiger Auftritt. Eine gemeinsame Navigation und eigenständige Bereichsseiten verbinden grosszügige Fotografie mit klaren Wegen zu Leistungen und Kontakt.",
        "challenge": "Gartenbau, Mobilität und Immobilien brauchen eigene Einstiege, ohne die gemeinsame Identität zu verlieren.",
        "approach": "Eine gemeinsame Navigation und eigenständige Bereichsseiten verbinden grosszügige Fotografie mit klaren Wegen zu Leistungen und Kontakt.",
        "outcome": "Eine direkt erkundbare, responsive Konzeptwebsite. Das Unternehmen ist fiktiv; Formulare demonstrieren den Ablauf und versenden keine Daten.",
        "imageAlt": "Screenshot der überarbeiteten Startseite von Falkenried Gruppe"
      },
      "en": {
        "category": "Company website",
        "tagline": "Three divisions. One coherent presence.",
        "seoTitle": "Falkenried Gruppe: Website Concept | SILVAN",
        "seoDescription": "Three divisions. One coherent presence. Shared navigation and dedicated division pages pair generous photography with clear paths to services and contact.",
        "challenge": "Landscaping, mobility and property need distinct entry points within a shared identity.",
        "approach": "Shared navigation and dedicated division pages pair generous photography with clear paths to services and contact.",
        "outcome": "An explorable, responsive concept website. The business is fictional; forms demonstrate the flow without sending data.",
        "imageAlt": "Screenshot of the refined Falkenried Gruppe home page"
      }
    }
  },
  {
    "slug": "cafe-vogel",
    "name": "Café Vogel",
    "year": "2026",
    "image": { "de": "/images/projects/cafe-vogel-retina.webp", "en": "/images/projects/cafe-vogel-retina-en.webp" },
    "demoUrl": "https://silvan-demo-cafe-vogel.vercel.app",
    "status": "demo-concept",
    "copy": {
      "de": {
        "category": "Café & Konditorei",
        "tagline": "Ein digitaler Vorgeschmack auf Kaffee und Patisserie.",
        "seoTitle": "Café Vogel: Website-Konzept | SILVAN",
        "seoDescription": "Ein digitaler Vorgeschmack auf Kaffee und Patisserie. Warme Farben, grossflächige Patisserie-Fotografie und eine übersichtliche Angebotsstruktur bringen Stimmung und Orientierung zusammen.",
        "challenge": "Ein Café-Auftritt soll Atmosphäre vermitteln und gleichzeitig Angebot, Öffnungszeiten und Kontakt schnell zugänglich machen.",
        "approach": "Warme Farben, grossflächige Patisserie-Fotografie und eine übersichtliche Angebotsstruktur bringen Stimmung und Orientierung zusammen.",
        "outcome": "Eine direkt erkundbare, responsive Konzeptwebsite. Das Unternehmen ist fiktiv; Formulare demonstrieren den Ablauf und versenden keine Daten.",
        "imageAlt": "Screenshot der überarbeiteten Startseite von Café Vogel"
      },
      "en": {
        "category": "Café & patisserie",
        "tagline": "A first taste of coffee and patisserie.",
        "seoTitle": "Café Vogel: Website Concept | SILVAN",
        "seoDescription": "A first taste of coffee and patisserie. Warm colours, generous patisserie photography and an organised menu combine atmosphere with easy navigation.",
        "challenge": "A café website should convey its atmosphere while keeping its menu, opening hours and contact easy to find.",
        "approach": "Warm colours, generous patisserie photography and an organised menu combine atmosphere with easy navigation.",
        "outcome": "An explorable, responsive concept website. The business is fictional; forms demonstrate the flow without sending data.",
        "imageAlt": "Screenshot of the refined Café Vogel home page"
      }
    }
  },
  {
    "slug": "steiner-handwerk",
    "name": "Steiner Handwerk",
    "year": "2026",
    "image": { "de": "/images/projects/steiner-handwerk-retina.webp", "en": "/images/projects/steiner-handwerk-retina-en.webp" },
    "demoUrl": "https://silvan-demo-steiner.vercel.app",
    "status": "demo-concept",
    "copy": {
      "de": {
        "category": "Handwerk & Renovation",
        "tagline": "Handwerk mit Charakter. Klar bis zur Anfrage.",
        "seoTitle": "Steiner Handwerk: Website-Konzept | SILVAN",
        "seoDescription": "Handwerk mit Charakter. Klar bis zur Anfrage. Markante Typografie, dunkle Flächen und eine gezielte Akzentfarbe geben den Arbeiten einen eigenen Rahmen. Leistungen und Projektbeispiele führen zur Demoanfrage.",
        "challenge": "Unterschiedliche Handwerksleistungen müssen verständlich werden und auch auf dem Smartphone schnell erreichbar bleiben.",
        "approach": "Markante Typografie, dunkle Flächen und eine gezielte Akzentfarbe geben den Arbeiten einen eigenen Rahmen. Leistungen und Projektbeispiele führen zur Demoanfrage.",
        "outcome": "Eine direkt erkundbare, responsive Konzeptwebsite. Das Unternehmen ist fiktiv; Formulare demonstrieren den Ablauf und versenden keine Daten.",
        "imageAlt": "Screenshot der überarbeiteten Startseite von Steiner Handwerk"
      },
      "en": {
        "category": "Trades & renovation",
        "tagline": "Craft with character. Clear through to the enquiry.",
        "seoTitle": "Steiner Handwerk: Website Concept | SILVAN",
        "seoDescription": "Craft with character. Clear through to the enquiry. Distinctive typography, dark surfaces and a focused accent colour frame the work. Services and example projects lead into the demo enquiry.",
        "challenge": "Different trade services need clear explanations and must remain easy to reach on a phone.",
        "approach": "Distinctive typography, dark surfaces and a focused accent colour frame the work. Services and example projects lead into the demo enquiry.",
        "outcome": "An explorable, responsive concept website. The business is fictional; forms demonstrate the flow without sending data.",
        "imageAlt": "Screenshot of the refined Steiner Handwerk home page"
      }
    }
  },
  {
    "slug": "salon-lumiere",
    "name": "Salon Lumière",
    "year": "2026",
    "image": { "de": "/images/projects/salon-lumiere-retina.webp", "en": "/images/projects/salon-lumiere-retina-en.webp" },
    "demoUrl": "https://silvan-demo-salon-lumiere.vercel.app",
    "status": "demo-concept",
    "copy": {
      "de": {
        "category": "Salon & Beauty",
        "tagline": "Raum für Stil. Zeit für Persönlichkeit.",
        "seoTitle": "Salon Lumière: Website-Konzept | SILVAN",
        "seoDescription": "Raum für Stil. Zeit für Persönlichkeit. Ein heller, zweiteiliger Einstieg, elegante Serifentypografie und warme Naturtöne. Leistungen mit Preisen und eine eigene Kontaktseite ergänzen die Bildwelt.",
        "challenge": "Ein Salon braucht eine persönliche Bildsprache und einen einfachen Weg von der Inspiration zu Leistungen und Terminanfrage.",
        "approach": "Ein heller, zweiteiliger Einstieg, elegante Serifentypografie und warme Naturtöne. Leistungen mit Preisen und eine eigene Kontaktseite ergänzen die Bildwelt.",
        "outcome": "Eine direkt erkundbare, responsive Konzeptwebsite. Das Unternehmen ist fiktiv; Formulare demonstrieren den Ablauf und versenden keine Daten.",
        "imageAlt": "Screenshot der überarbeiteten Startseite von Salon Lumière"
      },
      "en": {
        "category": "Salon & beauty",
        "tagline": "Room for style. Time for personality.",
        "seoTitle": "Salon Lumière: Website Concept | SILVAN",
        "seoDescription": "Room for style. Time for personality. A light split introduction, elegant serif typography and warm natural tones. Services with prices and a dedicated contact page complete the visual world.",
        "challenge": "A salon needs personal imagery and a simple path from inspiration to services and appointment enquiries.",
        "approach": "A light split introduction, elegant serif typography and warm natural tones. Services with prices and a dedicated contact page complete the visual world.",
        "outcome": "An explorable, responsive concept website. The business is fictional; forms demonstrate the flow without sending data.",
        "imageAlt": "Screenshot of the refined Salon Lumière home page"
      }
    }
  }
];
export function getProject(slug: string): Project | undefined { return projects.find(project => project.slug === slug); }
export function getAdjacentProject(slug: string): Project | undefined {
 const index = projects.findIndex(project => project.slug === slug);
 return index < 0 ? undefined : projects[(index + 1) % projects.length];
}
