import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PersonSchema } from "../../src/components/seo/PersonSchema";
import { getContent } from "../../src/lib/locales";
import { PORTRAIT } from "../../src/lib/portrait";

const LOCALES = ["de", "en"] as const;

interface GraphNode {
  readonly "@type": string;
  readonly "@id"?: string;
  readonly image?: { readonly "@id": string };
  readonly contentUrl?: string;
  readonly url?: string;
  readonly width?: number;
  readonly height?: number;
  readonly caption?: string;
}

function graphFor(locale: (typeof LOCALES)[number]): GraphNode[] {
  const { container } = render(<PersonSchema locale={locale} />);
  const script = container.querySelector('script[type="application/ld+json"]');

  expect(script).not.toBeNull();

  return (JSON.parse(script!.innerHTML) as { "@graph": GraphNode[] })["@graph"];
}

describe("PersonSchema portrait", () => {
  it.each(LOCALES)("points %s Person markup at the committed photograph", (locale) => {
    const graph = graphFor(locale);
    const person = graph.find((node) => node["@type"] === "Person");
    const image = graph.find((node) => node["@type"] === "ImageObject");

    expect(person?.image).toBeDefined();
    // The reference has to resolve inside the same graph, otherwise the Person
    // carries a dangling @id and Google sees no image at all.
    expect(image?.["@id"]).toBe(person?.image?.["@id"]);

    // Google needs to fetch this, so it has to be absolute and has to be the
    // same file the about page renders -- not the optimizer URL, which is not
    // a stable address for the asset.
    for (const field of [image?.contentUrl, image?.url]) {
      expect(field).toMatch(/^https?:\/\//);
      expect(new URL(field!).pathname).toBe(PORTRAIT.src);
    }

    expect(image?.width).toBe(PORTRAIT.width);
    expect(image?.height).toBe(PORTRAIT.height);
    expect(image?.caption).toBe(getContent(locale).about.portraitCaption);
  });

  it("keeps the headshot off the business node", () => {
    // A picture of one person is not a picture of the studio. The markup makes
    // a point of claiming only what the site can stand behind, and this is the
    // easiest place to quietly overstate.
    const business = graphFor("de").find(
      (node) => node["@type"] === "ProfessionalService",
    );

    expect(business).toBeDefined();
    expect(business?.image).toBeUndefined();
  });

  it("still resolves the image when no canonical domain is configured", () => {
    // Preview and local builds have no NEXT_PUBLIC_SITE_URL. The markup is not
    // offered to crawlers there, but it must not produce a relative or
    // malformed contentUrl either.
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    vi.stubEnv("VERCEL_URL", "");

    const image = graphFor("de").find((node) => node["@type"] === "ImageObject");

    expect(() => new URL(image!.contentUrl!)).not.toThrow();

    vi.unstubAllEnvs();
  });
});
