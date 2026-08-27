import { describe, expect, it } from "vitest";

import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  getContent,
  isLocale,
} from "../../src/lib/locales";
import type {
  PriceTier,
  ProcessStep,
  RouteKey,
  ServiceContent,
} from "../../src/content/types";

const returnedWebsites: ServiceContent = getContent("de").websites;
const returnedTier: PriceTier = returnedWebsites.priceTiers[0];
const returnedStep: ProcessStep = returnedWebsites.process[0];
const returnedCtaPath: RouteKey = returnedWebsites.ctaHref;
const returnedNavigationPath: RouteKey = getContent("de").navigation.primary[0].href;

void returnedTier;
void returnedStep;
void returnedCtaPath;
void returnedNavigationPath;

function structuralShape(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(structuralShape);
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [
          key,
          structuralShape((value as Record<string, unknown>)[key]),
        ]),
    );
  }

  return typeof value;
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
    expect(structuralShape(getContent("de"))).toEqual(
      structuralShape(getContent("en")),
    );
  });

  it("keeps ordered semantic identifiers, routes, and field names aligned", () => {
    const german = getContent("de");
    const english = getContent("en");
    const select = (content: typeof german) => ({
      navigation: content.navigation.primary.map(({ href }) => href),
      homeServices: content.home.services.map(({ href }) => href),
      websiteTiers: content.websites.priceTiers.map(({ id }) => id),
      websiteProcess: content.websites.process.map(({ id }) => id),
      reviewProducts: content.reviews.products.map(({ id }) => id),
      reviewProcess: content.reviews.process.map(({ id, label }) => ({ id, label })),
      inquiryFields: content.reviews.inquiry.fields.map(
        ({ name, required }) => ({ name, required }),
      ),
      helloRoutes: content.hello.links.map(({ href }) => href),
      seoPages: Object.keys(content.seo),
    });

    expect(select(german)).toEqual(select(english));
  });

  it.each([
    {
      locale: "de" as const,
      hero: {
        serviceLine: "Websites · Google Reviews · Online-Präsenz · Automation",
        headline: "Mehr Kunden. Weniger Aufwand.",
        supporting:
          "Ich entwickle digitale Lösungen, die Ihr Unternehmen sichtbar machen und wiederkehrende Arbeit reduzieren.",
      },
    },
    {
      locale: "en" as const,
      hero: {
        serviceLine: "Websites · Google Reviews · Online Presence · Automation",
        headline: "More customers. Less busywork.",
        supporting:
          "I build digital solutions that help people find your business and take recurring work off your plate.",
      },
    },
  ])("preserves the approved $locale hero copy", ({ locale, hero }) => {
    const actual = getContent(locale).home.hero;

    // The service line binds each separator to the word before it with U+00A0,
    // so a wrapped line can never begin with a stray middle dot. The approved
    // wording is what this guard protects, not the class of the space.
    expect({
      ...actual,
      serviceLine: actual.serviceLine.replaceAll(" ", " "),
    }).toMatchObject(hero);
  });

  it.each(["de" as const, "en" as const])(
    "keeps the %s service line from wrapping onto a separator",
    (locale) => {
      const { serviceLine } = getContent(locale).home.hero;

      expect(serviceLine).not.toMatch(/ ·/);
      expect(serviceLine.match(/ ·/g)).toHaveLength(3);
    },
  );

  it.each(["de", "en"] as const)(
    "uses the exact TAP / OPEN / REVIEW labels in %s",
    (locale) => {
      expect(getContent(locale).reviews.process.map(({ label }) => label)).toEqual([
        "TAP",
        "OPEN",
        "REVIEW",
      ]);
    },
  );

  it.each([
    {
      locale: "de" as const,
      websitePrices: [
        "CHF 300–699",
        "CHF 700–1,999",
        "CHF 2,000–4,999",
        "ab CHF 5,000",
      ],
      presencePrice: "ab CHF 249",
      nonBinding: /unverbindlich/i,
      quantityDiscount: /Mengenrabatt/i,
    },
    {
      locale: "en" as const,
      websitePrices: [
        "CHF 300–699",
        "CHF 700–1,999",
        "CHF 2,000–4,999",
        "from CHF 5,000",
      ],
      presencePrice: "from CHF 249",
      nonBinding: /no-obligation/i,
      quantityDiscount: /quantity discount/i,
    },
  ])(
    "contains the approved $locale business constants",
    ({ locale, websitePrices, presencePrice, nonBinding, quantityDiscount }) => {
      const content = getContent(locale);

      expect(content.brand).toEqual({
        name: "SILVAN",
        descriptor: "Digital Studio",
      });
      expect(content.websites.priceTiers.map(({ price }) => price)).toEqual(
        websitePrices,
      );
      expect(content.reviews.products.map(({ price }) => price)).toEqual([
        "CHF 49",
        "CHF 69",
        "CHF 80",
      ]);
      expect(content.reviews.quantityDiscount).toMatch(quantityDiscount);
      expect(content.presence.startingPrice).toBe(presencePrice);
      expect(content.contact.details).toEqual({
        email: "hahn.silvan.work@gmail.com",
        phoneDisplay: "078 900 85 00",
        phoneHref: "tel:+41789008500",
        whatsappNumber: "+41789008500",
        whatsappHref: "https://wa.me/41789008500",
        linkedIn: "https://www.linkedin.com/in/silvan-hahn-dev",
      });
      expect(
        content.reviews.inquiry.fields.map(({ name, required }) => ({
          name,
          required,
        })),
      ).toEqual([
        { name: "product", required: true },
        { name: "quantity", required: true },
        { name: "variant", required: true },
        { name: "businessName", required: true },
        { name: "contactPerson", required: true },
        { name: "googleUrl", required: true },
        { name: "street", required: true },
        { name: "postalCode", required: true },
        { name: "city", required: true },
        { name: "note", required: false },
      ]);
      expect(content.reviews.inquiry.requiredError).not.toBe("");
      expect(content.reviews.inquiry.quantityError).not.toBe("");
      expect(content.reviews.inquiry.urlError).not.toBe("");
      expect(content.reviews.inquiry.nonBindingNotice).toMatch(nonBinding);
    },
  );

  it("deep-freezes localized content once and returns stable references", () => {
    const content = getContent("de");

    expect(Object.isFrozen(content)).toBe(true);
    expect(Object.isFrozen(content.navigation.primary)).toBe(true);
    expect(Object.isFrozen(content.navigation.primary[0])).toBe(true);
    expect(Object.isFrozen(content.reviews.inquiry.fields)).toBe(true);
    expect(() => {
      (content.navigation.primary as unknown as { push(value: unknown): void }).push({
        label: "Unsafe",
        href: "https://evil.example",
      });
    }).toThrow(TypeError);
    expect(() => {
      (content.contact.details as { email: string }).email = "changed@example.com";
    }).toThrow(TypeError);
    expect(getContent("de")).toBe(content);
    expect(getContent("de").contact.details.email).toBe(
      "hahn.silvan.work@gmail.com",
    );
  });
});
