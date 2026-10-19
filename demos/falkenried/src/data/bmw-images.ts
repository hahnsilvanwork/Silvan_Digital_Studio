import service from "../assets/images/bmw/subpages/service.jpg";
import occasions from "../assets/images/bmw/workshop-detail.jpg";
import station from "../assets/images/bmw/workshop-hero.jpg";
import accessories from "../assets/images/bmw/subpages/accessories.jpg";

export const bmwHeroImages = {
  service: { image: service, alt: { de: "Mechaniker arbeitet am Motorraum eines Fahrzeugs", en: "Mechanic working under the bonnet of a car" } },
  occasions: { image: occasions, alt: { de: "Klassische BMW-Fahrzeuge in einem Ausstellungsraum", en: "Classic BMW cars in a showroom" } },
  station: { image: station, alt: { de: "Weisser BMW vor einem Garagentor als Symbolbild für den Fahrzeugbereich", en: "White BMW outside a garage, illustrating the motoring section" } },
  accessories: { image: accessories, alt: { de: "Frau legt eine Tasche auf den Rücksitz eines BMW", en: "Woman placing a bag on the rear seat of a BMW" } },
} as const;
