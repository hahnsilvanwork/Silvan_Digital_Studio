import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { getContent } from "../../src/lib/locales";

const locales = ["de", "en"] as const;

describe("review product visualizations", () => {
  it.each(locales)("offers every Google Review product for %s", (locale) => {
    const { productVisualizations } = getContent(locale).reviews;

    expect(productVisualizations.map(({ id }) => id)).toEqual([
      "round-nfc-white",
      "round-nfc-black",
      "stand-blue",
      "card-white-qr",
      "card-stand-white",
    ]);
    for (const product of productVisualizations) {
      expect(product.sceneUrl).toMatch(
        /^https:\/\/prod\.spline\.design\/[\w-]+\/scene\.splinecode$/,
      );
      expect(product.title.length).toBeGreaterThan(3);
      expect(product.ariaLabel.length).toBeGreaterThan(20);
    }
  });

  it.each(locales)("keeps every scene and label distinct for %s", (locale) => {
    const { productVisualizations } = getContent(locale).reviews;
    const unique = (values: readonly string[]) => new Set(values).size;

    // A shared scene URL would silently show the same product twice, and a
    // shared label would leave the selector buttons indistinguishable.
    expect(unique(productVisualizations.map((p) => p.sceneUrl))).toBe(
      productVisualizations.length,
    );
    expect(unique(productVisualizations.map((p) => p.title))).toBe(
      productVisualizations.length,
    );
  });

  it.each(locales)(
    "ships a still of every product so the frame is never blank for %s",
    (locale) => {
      const { productVisualizations } = getContent(locale).reviews;

      for (const { id, fallbackImage } of productVisualizations) {
        expect(fallbackImage).toBe(`/images/products/${id}.webp`);
        // A path that points at nothing would leave the very gap the still
        // exists to close, and only in production.
        expect(
          existsSync(resolve(process.cwd(), "public", `images/products/${id}.webp`)),
        ).toBe(true);
      }
    },
  );

  it.each(locales)(
    "reserves the menu product family without inventing one for %s",
    (locale) => {
      const { menuVisualizations, secondaryProductImage } =
        getContent(locale).reviews;

      // The restaurant/menu scenes do not exist yet. The page has to keep
      // showing the real photograph until they do.
      expect(menuVisualizations).toEqual([]);
      expect(secondaryProductImage.src).toBe(
        "/images/products/review-stands.png",
      );
    },
  );
});
