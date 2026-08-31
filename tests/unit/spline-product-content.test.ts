import { describe, expect, it } from "vitest";

import { getContent } from "../../src/lib/locales";

describe("review product visualizations", () => {
  it.each(["de", "en"] as const)(
    "defines the reusable white round NFC tag for %s",
    (locale) => {
      const reviews = getContent(locale).reviews;
      const product = reviews.productVisualizations[0];

      expect(product).toMatchObject({
        id: "round-nfc-white",
        sceneUrl:
          "https://prod.spline.design/Lu503y2nQ8XllpRe/scene.splinecode",
      });
      expect(product.title.length).toBeGreaterThan(0);
      expect(product.ariaLabel.length).toBeGreaterThan(0);
      expect(reviews.productSelectorLabel.length).toBeGreaterThan(0);
      expect(reviews.secondaryProductImage.src).toBe(
        "/images/products/review-stands.png",
      );
    },
  );

  it("does not request a fallback file that has not been supplied", () => {
    const product = getContent("de").reviews.productVisualizations[0];

    expect(product.fallbackImage).toBeUndefined();
  });
});
