import imported from "./nfc-import.json";
import mainImages from "./nfc-main-images.json";
import type { Locale, NfcProduct, ProductCategory } from "./types";
import { productTierSummary } from '../lib/product-pricing';

interface PhotoImport {
  readonly id: string;
  readonly number: string | number;
  readonly platform: string;
  readonly kind: "card" | "square" | "round" | "stand";
  readonly category: ProductCategory;
  readonly color: string;
  readonly modelUrl: string;
  readonly imageUrl: string;
  readonly dimensionsMm: readonly number[];
  readonly dimensionsConfirmed: boolean;
  readonly personalized: boolean;
  readonly packageId: "standard-card" | "standard-stand" | "personalized-card" | "fully-custom-card" | "nfc-chip";
}

export const photoImports = imported as readonly PhotoImport[];

const platformNames: Record<string, string> = {
  google: "Google Reviews", tripadvisor: "Tripadvisor", instagram: "Instagram",
  facebook: "Facebook", tiktok: "TikTok", youtube: "YouTube", whatsapp: "WhatsApp",
  menu: "Menü", booking: "Booking", airbnb: "Airbnb",
};
const shapes = {
  de: { card: "Rechteckig", square: "Quadratisch", round: "Rund", stand: "Aufsteller" },
  en: { card: "Rectangular", square: "Square", round: "Round", stand: "Stand" },
};
const colors: Record<Locale, Record<string, string>> = {
  de: { white: "Weiss", black: "Schwarz", blue: "Blau", gradient: "Farbverlauf", green: "Grün" },
  en: { white: "White", black: "Black", blue: "Blue", gradient: "Gradient", green: "Green" },
};

export function createPhotoProducts(locale: Locale): NfcProduct[] {
  return photoImports.map((item) => {
    const platform = item.platform === 'menu' && locale === 'en' ? 'Menu' : platformNames[item.platform] ?? item.platform;
    const shape = shapes[locale][item.kind];
    const color = colors[locale][item.color] ?? item.color;
    const variant = item.packageId === 'fully-custom-card' ? (locale === 'de' ? ' · Individuell' : ' · Custom') : item.personalized ? (locale === 'de' ? ' · Personalisiert' : ' · Personalized') : '';
    const chip = item.packageId === 'nfc-chip';
    const title = chip ? (locale === 'de' ? 'NFC-Chip zum Aufkleben' : 'Stick-on NFC chip') : `${platform} · ${shape} ${color}${variant}`;
    const alt = `${platform} NFC ${shape} · ${color}`;
    // Owner confirmed selectable round/square card sizes on 9 September 2026.
    // These are choices, not dimensions inferred from the 3D model or chip.
    const dimensions = !chip && item.kind === 'round' ? (locale === 'de' ? 'Wahlweise Ø 80 oder Ø 100 mm' : 'Choice of Ø 80 or Ø 100 mm')
      : !chip && item.kind === 'square' ? (locale === 'de' ? 'Wahlweise 80 × 80 oder 100 × 100 mm' : 'Choice of 80 × 80 or 100 × 100 mm')
      : item.dimensionsConfirmed
      ? `${item.dimensionsMm.join(" × ")} mm`
      : locale === "de" ? "Grösse nach Absprache" : "Size to be agreed";
    const fullyCustom = item.packageId === 'fully-custom-card';
    const design = fullyCustom ? (locale === 'de' ? 'Vollständig individuelles Design' : 'Fully custom design')
      : item.personalized ? (locale === 'de' ? 'Personalisiertes Design mit Logo und Firmenname' : 'Personalized design with logo and company name')
      : (locale === 'de' ? 'Standarddesign ohne Personalisierung' : 'Standard design without personalization');
    return {
      id: item.id, category: item.category, title, price: chip ? "CHF 15.–" : fullyCustom ? "CHF 99.–" : item.personalized ? "CHF 69.–" : "CHF 49.–",
      personalized: item.personalized, platform: item.platform, kind: item.kind,
      description: chip ? (locale === 'de' ? 'Selbstklebender NFC-Chip für Visitenkarten und vorhandene Aufsteller, zum Beispiel aus Plexiglas.' : 'Self-adhesive NFC chip for business cards and existing stands, such as acrylic displays.') : locale === "de"
        ? `${item.personalized ? 'Designbeispiel' : 'Standarddesign'} für den direkten Zugang zu ${platform} per NFC.`
        : `${item.personalized ? 'Example design' : 'Standard design'} for direct access to ${platform} via NFC.`,
      image: { src: (mainImages as Record<string, string>)[item.id] ?? item.imageUrl, alt: chip ? (locale === 'de' ? 'Runder selbstklebender NFC-Chip mit sichtbarer Antennenspule' : 'Round self-adhesive NFC chip with visible antenna coil') : alt },
      details: chip ? [productTierSummary('nfc-chip', locale), dimensions, locale === 'de' ? 'Zum Aufkleben auf vorhandene Produkte' : 'Attach to existing products'] : [shape, dimensions, design],
      scene: {
        url: item.modelUrl, format: "glb", fallbackImage: item.imageUrl,
        ariaLabel: locale === "de" ? `Interaktives 3D-Modell: ${chip ? title : alt}` : `Interactive 3D model: ${chip ? title : alt}`,
      },
    };
  });
}

/** Replace photographed legacy models in place and retain those awaiting photos. */
export function mergePhotoProducts(locale: Locale, legacy: readonly NfcProduct[]): NfcProduct[] {
  const photos = createPhotoProducts(locale);
  const byId = new Map(photos.map((product) => [product.id, product]));
  const legacyIds = new Set(legacy.map((product) => product.id));
  return [
    ...legacy.map((product) => byId.get(product.id) ?? product),
    ...photos.filter((product) => !legacyIds.has(product.id)),
  ];
}
