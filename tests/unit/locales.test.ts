import { describe, expect, it } from "vitest";

import { projects } from "../../src/content/projects";
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

const DASH = /[\u2010-\u2015\u2212]/;

/** "CHF 300–699" and "CHF 49.–" are Swiss notation, not prose dashes. */
function withoutPriceNotation(value: string): string {
  return value.replace(/(\d)\u2013(?=\d)/g, "$1").replace(/(\d\.)\u2013/g, "$1");
}

function collectStrings(value: unknown): readonly string[] {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectStrings);
  }

  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }

  return [];
}

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
        serviceLine: "Websites und digitale Lösungen für Schweizer KMU",
        headline: "Mehr Kunden. Weniger Aufwand.",
        supporting:
          "Ich bin Silvan Hahn. Ich entwickle Websites, mache Ihr Unternehmen online sichtbar und vereinfache wiederkehrende Aufgaben. Direkt mit Ihnen, von der Idee bis zum Start.",
      },
    },
    {
      locale: "en" as const,
      hero: {
        serviceLine: "Websites and digital solutions for Swiss businesses",
        headline: "More customers. Less busywork.",
        supporting:
          "I'm Silvan Hahn. I build websites, help people find your business online and simplify recurring tasks. You work directly with me, from the first idea to launch.",
      },
    },
  ])("preserves the approved $locale hero copy", ({ locale, hero }) => {
    const actual = getContent(locale).home.hero;

    expect({
      ...actual,
      serviceLine: actual.serviceLine.replaceAll(" ", " "),
    }).toMatchObject(hero);
  });

  it.each(["de" as const, "en" as const])("describes each %s catalogue model accessibly", (locale) => {
    const catalog = getContent(locale).reviews.catalog;
    expect(catalog.length).toBeGreaterThan(0);
    for (const product of catalog) {
      expect(product.image.alt.length).toBeGreaterThan(20);
      if (product.scene) expect(product.scene.ariaLabel.length).toBeGreaterThan(20);
    }
  });

  it.each(["de" as const, "en" as const])(
    "declares what each %s personal field collects",
    (locale) => {
      const { fields } = getContent(locale).reviews.inquiry;
      const tokenFor = (name: string) =>
        fields.find((field) => field.name === name)?.autoComplete;

      // WCAG 1.3.5: on a phone this is the difference between one tap and
      // nine fields typed by hand.
      expect(tokenFor("contactPerson")).toBe("name");
      expect(tokenFor("businessName")).toBe("organization");
      expect(tokenFor("destinationUrl")).toBe("url");
    },
  );

  it.each(["de" as const, "en" as const])(
    "keeps the %s introduction free of decorative separators",
    (locale) => {
      const { serviceLine } = getContent(locale).home.hero;

      expect(serviceLine).not.toMatch(/[·—–]/);
    },
  );

  it.each(["de" as const, "en" as const])(
    "writes %s prose without em or en dashes",
    (locale) => {
      // Long dashes in running text are what makes the copy read as machine
      // written, so a sentence breaks with a full stop or a colon instead.
      // The only dashes left are Swiss price notation: a range between digits
      // and the ".–" that stands in for the missing rappen.
      const offenders = collectStrings(getContent(locale)).filter((value) =>
        DASH.test(withoutPriceNotation(value)),
      );

      expect(offenders).toEqual([]);
    },
  );

  it.each(["de" as const, "en" as const])(
    "writes the %s project copy without em or en dashes",
    (locale) => {
      const offenders = projects
        .flatMap((project) => collectStrings(project.copy[locale]))
        .filter((value) => DASH.test(withoutPriceNotation(value)));

      expect(offenders).toEqual([]);
    },
  );

  it.each(["de", "en"] as const)(
    "uses the exact TAP / OPEN / ACT labels in %s",
    (locale) => {
      expect(getContent(locale).reviews.process.map(({ label }) => label)).toEqual([
        "TAP",
        "OPEN",
        "ACT",
      ]);
    },
  );

  it.each([
    {
      locale: "de" as const,
      websitePrices: [
        "CHF 300–699",
        "CHF 700–1'999",
        "CHF 2'000–4'999",
        "ab CHF 5'000",
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
        "CHF 15.–",
        "CHF 49.–",
        "CHF 69.–",
        "CHF 99.–",
      ]);
      expect(content.reviews.products.map(({ id }) => id)).toEqual([
        "nfc-chip",
        "standard-card",
        "personalized-card",
        "fully-custom-card",
      ]);
      expect(content.reviews.quantityDiscount).toMatch(quantityDiscount);
      expect(content.presence.startingPrice).toBe(presencePrice);
      expect(content.contact.details).toEqual({
        email: "hahn.silvan.work@gmail.com",
        phoneDisplay: "+41 78 900 85 00",
        phoneHref: "tel:+41789008500",
        whatsappNumber: "+41 78 900 85 00",
        whatsappHref: "https://wa.me/41789008500",
        linkedIn: "https://www.linkedin.com/in/silvan-hahn-dev",
      });
      expect(
        content.reviews.inquiry.fields.map(({ name, required }) => ({
          name,
          required,
        })),
      ).toEqual([
        { name: "destination", required: true },
        { name: "product", required: true },
        { name: "shape", required: true },
        { name: "size", required: true },
        { name: "quantity", required: true },
        { name: "setup", required: true },
        { name: "destinationUrl", required: false },
        { name: "businessName", required: false },
        { name: "contactPerson", required: false },
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
