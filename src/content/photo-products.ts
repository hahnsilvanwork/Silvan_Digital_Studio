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
  readonly packageId: "compact-card" | "standard-card" | "standard-stand" | "personalized-card" | "fully-custom-card" | "nfc-chip";
}

export const photoImports = imported as readonly PhotoImport[];

const platformNames: Record<Locale, Record<string, string>> = {
  de: { google: "Google-Bewertungen", tripadvisor: "Tripadvisor", instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok", youtube: "YouTube", whatsapp: "WhatsApp", menu: "Speisekarte", booking: "Buchungen", airbnb: "Airbnb" },
  en: { google: "Google reviews", tripadvisor: "Tripadvisor", instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok", youtube: "YouTube", whatsapp: "WhatsApp", menu: "Menu", booking: "Bookings", airbnb: "Airbnb" },
};
const applications: Record<Locale, Record<string, string>> = {
  de: {
    google: "Ihre Kunden öffnen Ihre Google-Bewertungsseite direkt auf dem Handy.",
    tripadvisor: "Ihre Kunden gelangen direkt zu Ihrer Seite auf Tripadvisor.",
    instagram: "Ihre Kunden öffnen Ihr Instagram-Profil direkt auf dem Handy.",
    facebook: "Ihre Kunden öffnen Ihre Facebook-Seite direkt auf dem Handy.",
    tiktok: "Ihre Kunden gelangen direkt zu Ihrem TikTok-Profil.",
    youtube: "Ihre Kunden gelangen direkt zu Ihrem YouTube-Kanal.",
    whatsapp: "Ihre Kunden öffnen direkt einen Chat mit Ihnen in WhatsApp.",
    menu: "Ihre Gäste öffnen die Speise- und Getränkekarte direkt auf dem Handy.",
    booking: "Ihre Kunden gelangen direkt zu Ihrer Buchungs- oder Reservationsseite.",
    airbnb: "Ihre Gäste gelangen direkt zur vereinbarten Seite auf Airbnb.",
  },
  en: {
    google: "Customers can open your Google review page directly on their phone.",
    tripadvisor: "Customers can go straight to your Tripadvisor page.",
    instagram: "Customers can open your Instagram profile directly on their phone.",
    facebook: "Customers can open your Facebook page directly on their phone.",
    tiktok: "Customers can go straight to your TikTok profile.",
    youtube: "Customers can go straight to your YouTube channel.",
    whatsapp: "Customers can open a chat with you directly in WhatsApp.",
    menu: "Guests can open your food and drinks menu directly on their phone.",
    booking: "Customers can go straight to your booking or reservation page.",
    airbnb: "Guests can go straight to the agreed page on Airbnb.",
  },
};
const shapes = {
  de: { card: "Rechteckig", square: "Quadratisch", round: "Rund", stand: "Aufsteller" },
  en: { card: "Rectangular", square: "Square", round: "Round", stand: "Display stand" },
};
const colors: Record<Locale, Record<string, string>> = {
  de: { white: "Weiss", black: "Schwarz", blue: "Blau", gradient: "Farbverlauf", green: "Grün" },
  en: { white: "White", black: "Black", blue: "Blue", gradient: "Gradient", green: "Green" },
};

export function createPhotoProducts(locale: Locale): NfcProduct[] {
  return photoImports.map((item) => {
    const platform = platformNames[locale][item.platform] ?? item.platform;
    const shape = shapes[locale][item.kind];
    const color = colors[locale][item.color] ?? item.color;
    const variant = item.packageId === 'fully-custom-card' ? (locale === 'de' ? ' · Individuelles Design' : ' · Custom design') : item.personalized ? (locale === 'de' ? ' · Mit Ihrem Logo' : ' · With your logo') : '';
    const chip = item.packageId === 'nfc-chip';
    const compact = item.packageId === "compact-card";
    const title = compact ? `${platform} · ${locale === "de" ? "NFC-Kompaktkarte" : "Compact NFC card"} ${color}` : chip ? (locale === 'de' ? 'NFC-Klebechip' : 'NFC sticker') : `${platform} · ${shape}, ${color}${variant}`;
    const alt = locale === 'de' ? `NFC-Produkt für ${platform}: ${shape}, ${color}` : `NFC product for ${platform}: ${shape}, ${color}`;
    // Owner confirmed selectable round/square card sizes on 9 September 2026.
    // These are choices, not dimensions inferred from the 3D model or chip.
    const dimensions = !chip && item.kind === 'round' ? (locale === 'de' ? 'Wahlweise Ø 80 oder Ø 100 mm' : 'Choice of Ø 80 or Ø 100 mm')
      : !chip && item.kind === 'square' ? (locale === 'de' ? 'Wahlweise 80 × 80 oder 100 × 100 mm' : 'Choice of 80 × 80 or 100 × 100 mm')
      : item.dimensionsConfirmed
      ? `${item.dimensionsMm.join(" × ")} mm`
      : locale === "de" ? "Grösse nach Absprache" : "Size to be agreed";
    const fullyCustom = item.packageId === 'fully-custom-card';
    const design = fullyCustom ? (locale === 'de' ? 'Vollständig individuelles Design' : 'Fully custom design')
      : item.personalized ? (locale === 'de' ? 'Bestehendes Design mit Ihrem Logo und Firmennamen' : 'Existing design with your logo and business name')
      : (locale === 'de' ? 'Standarddesign ohne eigenes Logo oder Firmennamen' : 'Standard design without your own logo or business name');
    return {
      id: item.id, packageId: item.packageId, category: item.category, title, price: compact ? "CHF 29.–" : chip ? "CHF 15.–" : fullyCustom ? "CHF 99.–" : item.personalized ? "CHF 69.–" : "CHF 49.–",
      personalized: item.personalized, platform: item.platform, kind: item.kind,
      description: compact ? (locale === 'de' ? 'Flache Karte zum Vorzeigen, ohne Aufsteller. Ihre Kunden öffnen damit Ihre Google-Bewertungsseite.' : 'A flat card to present to customers, without a stand. It opens your Google review page.') : fullyCustom ? (locale === 'de' ? `Designbeispiel. ${applications.de[item.platform]} Die Gestaltung wählen Sie selbst oder ich übernehme sie für Sie.` : `Example design. ${applications.en[item.platform]} Choose your own design or let me create it for you.`) : chip ? (locale === 'de' ? 'Selbstklebender NFC-Chip für Visitenkarten oder vorhandene Aufsteller, zum Beispiel aus Plexiglas. Er öffnet den vereinbarten Link.' : 'A self-adhesive NFC sticker for business cards or existing stands, such as acrylic displays. It opens your chosen link.') : item.personalized ? (locale === 'de' ? `${applications.de[item.platform]} Das gezeigte Design ergänze ich mit Ihrem Logo und Firmennamen.` : `${applications.en[item.platform]} I add your logo and business name to the design shown.`) : applications[locale][item.platform],
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
