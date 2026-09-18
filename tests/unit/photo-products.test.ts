import { describe, expect, it } from "vitest";
import { createPhotoProducts, photoImports } from "../../src/content/photo-products";
import { getContent } from "../../src/lib/locales";
import { applyInquiryPreset, getInquiryPreset } from "../../src/lib/inquiry-selection";
import { EMPTY_REVIEW_INQUIRY, validateReviewInquiry } from "../../src/lib/validation";

const pending: string[] = [];
const replaced = ["review-square-blue", "review-round-black", "review-round-white", "review-stand-white"];

describe("photographed NFC catalogue", () => {
  it.each(['de','en'] as const)('uses distinct customer-facing names without internal numbers in %s', (locale) => {
    const products=createPhotoProducts(locale);
    expect(new Set(products.map(p=>p.title)).size).toBe(products.length);
    for(const product of products) expect(product.title).not.toMatch(/\b\d{3}\b/);
  });
  it.each(["de", "en"] as const)("replaces photographed models and retains pending %s products", (locale) => {
    const { catalog, categories } = getContent(locale).reviews;
    expect(catalog).toHaveLength(photoImports.length + pending.length);
    for (const id of replaced) {
      expect(catalog.filter((product) => product.id === id)).toHaveLength(1);
      expect(catalog.find((product) => product.id === id)?.scene?.format).toBe("glb");
    }
    for (const id of pending) expect(catalog.find((product) => product.id === id)).toBeDefined();
    expect(new Set(catalog.map((product) => product.id)).size).toBe(catalog.length);
    for (const product of catalog) expect(categories.map(({ id }) => id)).toContain(catalogueGroup(product));
  });

  it("assigns the renamed WhatsApp photo to 009 and keeps existing inquiry links valid", () => {
    const whatsapp = photoImports.find(product => Number(product.number) === 9)!;
    expect(whatsapp.platform).toBe('whatsapp');
    expect(whatsapp.id).toBe('nfc-022-whatsapp');
    expect(getInquiryPreset(whatsapp.id)?.destination).toBe('whatsapp');
    expect(photoImports.filter(product => Number(product.number) === 22).map(p => p.platform)).toEqual(['tiktok']);
    expect(new Set(photoImports.map(p => p.number)).size).toBe(photoImports.length);
  });

  it.each(["de", "en"] as const)("imports only standard products with honest %s dimensions", (locale) => {
    for (const product of createPhotoProducts(locale)) {
      const source = photoImports.find((item) => item.id === product.id)!;
      expect(product.personalized).toBe(source.personalized);
      expect(product.price).toBe(source.packageId === 'nfc-chip' ? 'CHF 15.–' : source.packageId === 'fully-custom-card' ? 'CHF 99.–' : source.personalized ? 'CHF 69.–' : 'CHF 49.–');
      if (source.packageId !== 'nfc-chip' && ['round', 'square'].includes(source.kind)) {
        expect(product.details).toContain(source.kind === 'round' ? (locale === 'de' ? 'Wahlweise Ø 80 oder Ø 100 mm' : 'Choice of Ø 80 or Ø 100 mm') : (locale === 'de' ? 'Wahlweise 80 × 80 oder 100 × 100 mm' : 'Choice of 80 × 80 or 100 × 100 mm'));
      } else if (!source.dimensionsConfirmed) {
        expect(product.details.join(" ")).not.toMatch(/\d+\s*×/);
        expect(product.details).toContain(locale === "de" ? "Grösse nach Absprache" : "Size to be agreed");
      } else {
        expect(product.details).toContain(`${source.dimensionsMm.join(" × ")} mm`);
      }
      expect(product.scene?.fallbackImage).toBe(source.imageUrl);
    }
  });

  it.each(["de", "en"] as const)("offers a valid standard inquiry for every imported %s model", (locale) => {
    const inquiry = getContent(locale).reviews.inquiry;
    for (const product of photoImports) {
      const preset = getInquiryPreset(product.id)!;
      expect(inquiry.destinationOptions.map(({ value }) => value)).toContain(preset.destination);
      expect(preset.product).toBe(product.packageId);
      expect(preset.shape).toBe(product.kind === "stand" ? "" : product.kind === "card" ? "rectangle" : product.kind);
      expect(preset.size).toBe(product.packageId === "nfc-chip" || product.kind === "card" ? "confirm" : "");
      expect(validateReviewInquiry({ ...EMPTY_REVIEW_INQUIRY, ...preset, quantity: "1", setup: "needs-setup" })).toEqual(!preset.size && product.kind !== "stand" ? {size: "required"} : {});
      expect(validateReviewInquiry({ ...EMPTY_REVIEW_INQUIRY, ...preset, size: preset.size || "80", quantity: "1", setup: "needs-setup" })).toEqual({});
    }
  });

  it("resets stale dimensions while retaining contact and quantity", () => {
    const card = photoImports.find((product) => product.kind === "card")!;
    const current = { ...EMPTY_REVIEW_INQUIRY, size: "100", quantity: "3", contactPerson: "Ada" };
    const selected = applyInquiryPreset(current, card.id);
    expect(selected).toMatchObject({ size: "confirm", shape: "rectangle", quantity: "3", contactPerson: "Ada" });
    expect(applyInquiryPreset(selected, "menu-round-black")).toMatchObject({ size: "", shape: "round" });
    expect(applyInquiryPreset(current, "unknown")).toBe(current);
    expect(getInquiryPreset("constructor")).toBeNull();
  });
});
import { catalogueGroup } from '../../src/lib/catalogue-groups';
