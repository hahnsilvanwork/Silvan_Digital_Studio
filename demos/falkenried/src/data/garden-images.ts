import hochbeet from "../assets/images/garden/references/hochbeet.jpg";
import trockenmauer from "../assets/images/garden/references/trockenmauer.jpg";
import gestaltung from "../assets/images/garden/references/gartengestaltung.jpg";
import quarzit from "../assets/images/garden/references/stahlblech-quarzit.jpg";
import wasser from "../assets/images/garden/references/wasserspiel.jpg";
import spielplatz from "../assets/images/garden/references/spielplatz.jpg";
export const gardenReferenceImages = [
  { image: hochbeet, documentary: true, alt: { de: "Blühendes Hochbeet mit Natursteinmauer", en: "Flowering raised bed with a natural stone wall" } },
  { image: trockenmauer, documentary: true, alt: { de: "Runder Sitzplatz mit Steinmauer und Feuerstelle", en: "Circular seating area with a stone wall and fire pit" } },
  { image: gestaltung, documentary: true, alt: { de: "Garten mit Sitzplatz, Steinmauern und dekorativen Stahlelementen", en: "Garden with a seating area, stone walls and decorative steel features" } },
  { image: quarzit, documentary: true, alt: { de: "Beet mit Steinplatten und rostfarbenen Sichtschutzelementen", en: "Border with stone slabs and rust-coloured privacy screens" } },
  { image: wasser, documentary: true, alt: { de: "Wasserwand mit gestuften Steinbecken im Garten", en: "Water wall with stepped stone pools in a garden" } },
  { image: spielplatz, documentary: true, alt: { de: "Spielbereich mit Holzschaukeln und Kletterelementen", en: "Play area with wooden swings and climbing equipment" } },
] as const;
