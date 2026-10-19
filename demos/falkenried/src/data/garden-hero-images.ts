import design from "../assets/images/garden/subpages/design.jpg";
import maintenance from "../assets/images/garden/subpages/maintenance.jpg";
import transport from "../assets/images/garden/hedge-work.jpg";
import references from "../assets/images/garden/subpages/references.jpg";
import tips from "../assets/images/garden/subpages/tips.jpg";

export const gardenHeroImages = {
  design: { image: design, alt: { de: "Garten mit Steinmauer, Sitzplatz und dekorativen Stahlelementen", en: "Garden with a stone wall, seating area and decorative steel features" } },
  maintenance: { image: maintenance, alt: { de: "Gepflegtes Beet mit Bodendeckern und blühenden Sträuchern", en: "A maintained border with ground cover and flowering shrubs" } },
  transport: { image: transport, alt: { de: "Blühende Rosen und Stauden in einem Gartenbeet", en: "Flowering roses and perennials in a garden border" } },
  references: { image: references, alt: { de: "Gestuftes Wasserspiel mit Steinbecken und einer Wasserwand", en: "A stepped water feature with stone pools and a water wall" } },
  tips: { image: tips, alt: { de: "Bunt blühende Sträucher und Stauden neben einem Gartenweg", en: "Colourful flowering shrubs and perennials beside a garden path" } },
} as const;
