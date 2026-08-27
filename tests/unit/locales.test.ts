import { describe, expect, it } from "vitest";

import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  getContent,
  isLocale,
} from "../../src/lib/locales";

function structuralKeys(value: unknown, path = "root"): string[] {
  if (Array.isArray(value)) {
    const firstItem = value[0];

    return [
      `${path}[]`,
      ...(firstItem === undefined ? [] : structuralKeys(firstItem, `${path}[]`)),
    ];
  }

  if (value !== null && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .flatMap((key) => [
        `${path}.${key}`,
        ...structuralKeys(
          (value as Record<string, unknown>)[key],
          `${path}.${key}`,
        ),
      ]);
  }

  return [];
}

describe("locale content", () => {
  it("uses German as the default and supports exactly German and English", () => {
    expect(DEFAULT_LOCALE).toBe("de");
    expect(SUPPORTED_LOCALES).toEqual(["de", "en"]);
    expect(getContent()).toBe(getContent("de"));
    expect(isLocale("de")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });

  it("keeps the German and English dictionaries structurally identical", () => {
    expect(structuralKeys(getContent("de"))).toEqual(
      structuralKeys(getContent("en")),
    );
  });

  it("contains the approved identity, pricing, contact, and inquiry content", () => {
    const content = getContent("de");

    expect(content.brand).toEqual({ name: "SILVAN", descriptor: "Digital Studio" });
    expect(content.home.hero).toMatchObject({
      serviceLine: "Websites · Google Reviews · Online-Präsenz · Automation",
      headline: "Mehr Kunden. Weniger Aufwand.",
      supporting:
        "Ich entwickle digitale Lösungen, die Ihr Unternehmen sichtbar machen und wiederkehrende Arbeit reduzieren.",
    });
    expect(content.websites.priceTiers.map(({ price }) => price)).toEqual([
      "CHF 300–699",
      "CHF 700–1,999",
      "CHF 2,000–4,999",
      "ab CHF 5,000",
    ]);
    expect(content.reviews.products.map(({ price }) => price)).toEqual([
      "CHF 49",
      "CHF 69",
      "CHF 80",
    ]);
    expect(content.reviews.quantityDiscount).toContain("Mengenrabatt");
    expect(content.presence.startingPrice).toBe("ab CHF 249");
    expect(content.contact.details).toMatchObject({
      email: "hahn.silvan.work@gmail.com",
      phoneDisplay: "078 900 85 00",
      phoneHref: "tel:+41789008500",
      whatsappNumber: "+41789008500",
      linkedIn: "https://www.linkedin.com/in/silvan-hahn-dev",
    });
    expect(content.reviews.inquiry.nonBindingNotice).toContain("unverbindlich");
  });
});
