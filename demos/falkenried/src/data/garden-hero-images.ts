import design from "../assets/images/garden/subpages/design.jpg";
import maintenance from "../assets/images/garden/subpages/maintenance.jpg";
import transport from "../assets/images/garden/hedge-work.jpg";
import references from "../assets/images/garden/subpages/references.jpg";
import tips from "../assets/images/garden/subpages/tips.jpg";

export const gardenHeroImages = {
  design: { image: design, alt: { de: "Von Falkenried Gruppe gestaltete Gartenanlage", en: "Garden designed by Falkenried Gruppe" } },
  maintenance: { image: maintenance, alt: { de: "Gartenunterhalt und Bepflanzung durch Falkenried Gruppe", en: "Garden maintenance and planting by Falkenried Gruppe" } },
  transport: { image: transport, alt: { de: "Kranlastwagen der Falkenried Gruppe im Transporteinsatz", en: "Falkenried Gruppe crane truck during transport work" } },
  references: { image: references, alt: { de: "Ausgeführtes Wasserspiel aus Granit und Stahl", en: "Completed water feature made of granite and steel" } },
  tips: { image: tips, alt: { de: "Blühender Rhododendron in einer gepflegten Gartenanlage", en: "Flowering rhododendron in a maintained garden" } },
} as const;
