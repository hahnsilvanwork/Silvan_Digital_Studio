import hochbeet from "../assets/images/garden/references/hochbeet.jpg";
import trockenmauer from "../assets/images/garden/references/trockenmauer.jpg";
import gestaltung from "../assets/images/garden/references/gartengestaltung.jpg";
import quarzit from "../assets/images/garden/references/stahlblech-quarzit.jpg";
import wasser from "../assets/images/garden/references/wasserspiel.jpg";
import spielplatz from "../assets/images/garden/references/spielplatz.jpg";
export const gardenReferenceImages = [
  { image: hochbeet, documentary: true, alt: { de: "Von Falkenried Gruppe bepflanztes Hochbeet", en: "Raised bed planted by Falkenried Gruppe" } },
  { image: trockenmauer, documentary: true, alt: { de: "Trockenmauer aus Lägernsteinen von Falkenried Gruppe", en: "Dry-stone wall built by Falkenried Gruppe" } },
  { image: gestaltung, documentary: true, alt: { de: "Ausgeführte Gartengestaltung von Falkenried Gruppe", en: "Garden design completed by Falkenried Gruppe" } },
  { image: quarzit, documentary: true, alt: { de: "Gartendetail mit Stahlblech und Quarzit", en: "Garden detail combining steel edging and quartzite" } },
  { image: wasser, documentary: true, alt: { de: "Wasserspiel aus Granit und Stahl", en: "Water feature in granite and steel" } },
  { image: spielplatz, documentary: true, alt: { de: "Gestalteter Spielplatz im Grünen", en: "Landscaped playground in a green setting" } },
] as const;
