import service from "../assets/images/bmw/subpages/service.jpg";
import occasions from "../assets/images/bmw/subpages/occasions.jpg";
import station from "../assets/images/bmw/workshop-hero.jpg";
import accessories from "../assets/images/bmw/subpages/accessories.jpg";

export const bmwHeroImages = {
  service: { image: service, alt: { de: "BMW Servicearbeiten in der Werkstatt der Falkenried Gruppe", en: "BMW service work in the Falkenried Gruppe workshop" } },
  occasions: { image: occasions, alt: { de: "BMW Occasion vor moderner Architektur", en: "Used BMW in front of modern architecture" } },
  station: { image: station, alt: { de: "Servicestation der Falkenried Gruppe mit Tankstelle und Ladeangebot", en: "Falkenried Gruppe service station with fuel and charging facilities" } },
  accessories: { image: accessories, alt: { de: "Auswahl an Original BMW Zubehör", en: "Selection of Original BMW accessories" } },
} as const;
