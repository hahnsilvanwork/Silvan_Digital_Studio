import type { Locale } from "./types";

interface ProjectCopy {
  readonly category: string;
  readonly tagline: string;
  /**
   * The search result for this page. The tagline alone made a 45-character
   * description and the title was a template of the project name, so these
   * eight pages were the only ones the metadata sweep never reached.
   */
  readonly seoTitle: string;
  readonly seoDescription: string;
  readonly challenge: string;
  readonly approach: string;
  readonly outcome: string;
  readonly imageAlt: string;
}

export interface Project {
  readonly slug: string;
  readonly name: string;
  readonly year: string;
  readonly image: string;
  /**
   * Every entry is a self-initiated design concept. None of them is a delivered
   * client engagement, and no project claims a client, a result or a metric.
   */
  readonly status: "placeholder-concept";
  readonly copy: Readonly<Record<Locale, ProjectCopy>>;
}

export const projects: readonly Project[] = [
  {
    slug: "archa",
    name: "Archa",
    year: "2026",
    image: "/images/projects/architecture-practice.jpg",
    status: "placeholder-concept",
    copy: {
      de: {
        category: "Markenauftritt",
        tagline: "Ein ruhiger Auftritt für ein Architekturbüro.",
        seoTitle: "Archa – Website-Konzept für ein Architekturbüro",
        seoDescription:
          "Ein ruhiger Markenauftritt für ein Architekturbüro: Struktur, Typografie und Bildsprache aus einem eigeninitiierten Gestaltungskonzept von SILVAN Digital Studio.",
        challenge:
          "Ein Architekturbüro zeigt viel Bildmaterial und verliert dabei leicht die Aussage. Die Aufgabe war, Projekte sichtbar zu machen, ohne die Orientierung zu opfern.",
        approach:
          "Eine schmale Typografie-Skala, grosszügige Weissräume und ein ruhiges Raster, das dem Bild den Vortritt lässt. Navigation und Projektwechsel bleiben immer erreichbar.",
        outcome:
          "Ein Konzept, in dem Bildsprache und Text sich nicht gegenseitig überlagern und der Weg zum Kontakt kurz bleibt.",
        imageAlt: "Gestaltungskonzept Archa: Startseite eines Architekturbüros auf einem Laptop",
      },
      en: {
        category: "Brand presence",
        tagline: "A quiet presence for an architecture practice.",
        seoTitle: "Archa – A Website Concept for an Architecture Practice",
        seoDescription:
          "A quiet brand presence for an architecture practice: structure, typography and imagery from a self-initiated design concept by SILVAN Digital Studio.",
        challenge:
          "An architecture practice shows a lot of imagery and easily loses its message in it. The task was to let the projects speak without giving up orientation.",
        approach:
          "A narrow type scale, generous white space and a calm grid that gives the image priority. Navigation and project switching stay reachable at all times.",
        outcome:
          "A concept where imagery and text stop competing and the path to contact stays short.",
        imageAlt: "Archa design concept: home page for an architecture practice on a laptop",
      },
    },
  },
  {
    slug: "lumen",
    name: "Lumen",
    year: "2026",
    image: "/images/projects/objects-shop.jpg",
    status: "placeholder-concept",
    copy: {
      de: {
        category: "Online-Shop",
        tagline: "Eine Kollektion zeigen, ohne sie zu überfrachten.",
        seoTitle: "Lumen – Konzept für einen Online-Shop | SILVAN",
        seoDescription:
          "Wie sich eine Kollektion zeigen lässt, ohne sie zu überfrachten: Raster, Hierarchie und Preisdarstellung aus einem eigeninitiierten Shop-Konzept.",
        challenge:
          "Ein kleiner Katalog verliert seine Ordnung, sobald Bild, Bezeichnung und Preis um dieselbe Fläche konkurrieren. Gesucht war eine Übersicht, die alle Produkte zeigt, ohne den Blick zu zersplittern.",
        approach:
          "Ein ruhiges Raster aus gleich grossen Produktkarten. Bezeichnung und Preis stehen vollständig sichtbar, ohne Aufklappen oder Hover.",
        outcome:
          "Ein Konzept, in dem sich eine Kollektion in einem Durchgang erfassen lässt.",
        imageAlt: "Gestaltungskonzept Lumen: Produktübersicht eines Objekt-Shops auf einem Laptop",
      },
      en: {
        category: "Online shop",
        tagline: "Showing a collection without cluttering it.",
        seoTitle: "Lumen – An Online Shop Concept | SILVAN Digital",
        seoDescription:
          "How to show a collection without cluttering it: grid, hierarchy and pricing from a self-initiated online shop concept by SILVAN Digital Studio.",
        challenge:
          "A small catalogue loses its order as soon as image, name and price compete for the same space. The brief was an overview that shows every product without splintering the eye.",
        approach:
          "A calm grid of equally sized product cards. Name and price stay fully visible, with nothing hidden behind hover or expansion.",
        outcome:
          "A concept in which a collection can be taken in on a single pass.",
        imageAlt: "Lumen design concept: product overview of an objects shop on a laptop",
      },
    },
  },
  {
    slug: "architech-studio",
    name: "ArchiTech Studio",
    year: "2026",
    image: "/images/projects/studio-mobile.jpg",
    status: "placeholder-concept",
    copy: {
      de: {
        category: "Studio-Website",
        tagline: "Leistungen und Referenzen in einer klaren Ordnung.",
        seoTitle: "ArchiTech Studio – Konzept für eine Studio-Website",
        seoDescription:
          "Leistungen und Referenzen in einer klaren Ordnung: Seitenstruktur und Gestaltung eines eigeninitiierten Website-Konzepts für ein Planungsbüro.",
        challenge:
          "Ein Studio bietet mehrere Leistungen an, die sich im Alltag überschneiden. Die Aufgabe war eine Struktur, die Interessenten schnell zum passenden Angebot führt.",
        approach:
          "Eine Leistungsübersicht mit Einstiegspreisen, gefolgt von Arbeitsbeispielen und einem festen Ablauf. Jede Leistung hat einen eigenen, direkten Weg zum Gespräch.",
        outcome:
          "Ein Konzept, in dem Besucher in wenigen Schritten von der Übersicht zur konkreten Anfrage gelangen.",
        imageAlt: "Gestaltungskonzept ArchiTech Studio: Leistungen und Referenzen auf dem Smartphone",
      },
      en: {
        category: "Studio website",
        tagline: "Services and references in a clear order.",
        seoTitle: "ArchiTech Studio – A Studio Website Concept",
        seoDescription:
          "Services and references in a clear order: page structure and visual design from a self-initiated website concept for a design practice.",
        challenge:
          "A studio offers several services that overlap in practice. The task was a structure that moves an enquiry to the right offer quickly.",
        approach:
          "A service directory with starting prices, followed by work examples and a fixed process. Every service carries its own direct route to a conversation.",
        outcome:
          "A concept that takes a visitor from overview to a concrete enquiry in a few steps.",
        imageAlt: "ArchiTech Studio design concept: services and references on a phone",
      },
    },
  },
  {
    slug: "vanguard-apparel",
    name: "Vanguard Apparel",
    year: "2026",
    image: "/images/projects/apparel-store.jpg",
    status: "placeholder-concept",
    copy: {
      de: {
        category: "Handel",
        tagline: "Eine Kollektion, die auf dem Telefon funktioniert.",
        seoTitle: "Vanguard Apparel – Konzept für einen Mode-Shop",
        seoDescription:
          "Eine Kollektion, die auf dem Telefon funktioniert: mobile Navigation, Produktraster und Kaufweg aus einem eigeninitiierten Handelskonzept.",
        challenge:
          "Mode wird überwiegend mobil betrachtet. Das Konzept musste auf schmalen Bildschirmen genauso überzeugen wie auf grossen.",
        approach:
          "Bildflächen mit festen Seitenverhältnissen, Bedienelemente in Daumenreichweite und eine Navigation, die auch mit einer Hand funktioniert.",
        outcome:
          "Ein Konzept, das dieselbe Sorgfalt auf 320 Pixeln zeigt wie im grossen Editorial-Layout.",
        imageAlt: "Gestaltungskonzept Vanguard Apparel: mobile Kollektionsansicht",
      },
      en: {
        category: "Retail",
        tagline: "A collection that works on a phone.",
        seoTitle: "Vanguard Apparel – A Fashion Retail Concept",
        seoDescription:
          "A collection that works on a phone: mobile navigation, product grid and purchase path from a self-initiated retail concept by SILVAN Digital Studio.",
        challenge:
          "Fashion is mostly browsed on a phone. The concept had to hold up on a narrow screen as convincingly as on a wide one.",
        approach:
          "Image areas with fixed aspect ratios, controls within thumb reach, and navigation that works one-handed.",
        outcome:
          "A concept that shows the same care at 320 pixels as it does in the wide editorial layout.",
        imageAlt: "Vanguard Apparel design concept: mobile collection view",
      },
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProject(slug: string): Project | undefined {
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return undefined;
  }

  return projects[(index + 1) % projects.length];
}
