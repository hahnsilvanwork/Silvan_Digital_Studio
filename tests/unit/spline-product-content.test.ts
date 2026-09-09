import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { getContent } from "../../src/lib/locales";

import { photoImports } from "../../src/content/photo-products";

const locales = ["de", "en"] as const;
const expectedHeroImages = [
  "/images/products/catalog/review-round-black.webp",
  "/images/products/catalog/all-products.webp",
  "/images/products/catalog/menu-personalized-white.webp",
];

describe("NFC and QR product catalogue", () => {
  it.each(locales)("positions the broad offer in %s", (locale) => {
    const content = getContent(locale);

    expect(
      content.navigation.primary.find((item) => item.href === "/reviews")
        ?.label,
    ).toMatch(/NFC.*QR/);
    expect(content.reviews.heroImages.map(({ src }) => src)).toEqual(
      expectedHeroImages,
    );
    expect(content.reviews.products.map(({ id, price }) => [id, price])).toEqual(
      [
        ["nfc-chip", "CHF 15.–"],
        ["standard-card", "CHF 49.–"],
        ["personalized-card", "CHF 69.–"],
        ["fully-custom-card", "CHF 99.–"],
      ],
    );
    expect(content.reviews.products).toHaveLength(4);
    expect(
      content.reviews.catalog.find(({ id }) => id === "review-stand-white")
        ?.price,
    ).toBe("CHF 49.–");
    expect(
      content.reviews.inquiry.productOptions.find(
        ({ value }) => value === "standard-stand",
      )?.label,
    ).toContain("CHF 49.–");
  });

  it.each(locales)("ships every catalogue image for %s", (locale) => {
    const { catalog, heroImages } = getContent(locale).reviews;

    for (const image of [
      ...heroImages.map(({ src }) => src),
      ...catalog.map(({ image }) => image.src),
    ]) {
      expect(
        existsSync(resolve(process.cwd(), "public", image.replace(/^\//, ""))),
      ).toBe(true);
    }
  });

  it.each(locales)("keeps IDs, images, and scenes unambiguous for %s", (locale) => {
    const { catalog } = getContent(locale).reviews;
    const unique = (values: readonly string[]) => new Set(values).size;
    const sceneUrls = catalog.flatMap((product) =>
      product.scene ? [product.scene.url] : [],
    );

    expect(unique(catalog.map(({ id }) => id))).toBe(catalog.length);
    expect(unique(catalog.map(({ image }) => image.src))).toBe(catalog.length);
    expect(unique(sceneUrls)).toBe(sceneUrls.length);
    expect(sceneUrls).toHaveLength(photoImports.length);
    for (const sceneUrl of sceneUrls) {
      expect(sceneUrl).toMatch(
        /^\/models\/nfc\/[\w-]+\.glb$/,
      );
    }
  });

  it.each(locales)("provides all four photographed menu models in %s", (locale) => {
    const menu = getContent(locale).reviews.catalog.filter(
      ({ category }) => category === "menu",
    );

    expect(menu).toHaveLength(4);
    expect(menu.every(({ scene }) => scene?.format === 'glb')).toBe(true);
  });

  it.each(locales)("offers both card forms and sizes at one price for %s", (locale) => {
    const { catalog, forms, sizes } = getContent(locale).reviews;

    expect(forms).toHaveLength(3);
    expect(sizes).toEqual(expect.arrayContaining(["80 × 80 mm", "100 × 100 mm"]));
    expect(sizes).toHaveLength(3);
    expect(catalog.find(({ id }) => id === "review-stand-white")?.details)
      .not.toContain(expect.stringMatching(/80|100/));
  });

  it.each(locales)("shows the approved custom destinations for %s", (locale) => {
    const useCases = getContent(locale).reviews.useCases
      .map(({ title }) => title)
      .join(" ");

    expect(useCases).toMatch(/Google/);
    expect(useCases).toMatch(/Menü|Menu/);
    expect(useCases).toMatch(/Booking|Reserv/);
    expect(useCases).toMatch(/WLAN|Wi-Fi/);
    expect(useCases).toMatch(/Visitenkarte|contact card/);
  });
});
