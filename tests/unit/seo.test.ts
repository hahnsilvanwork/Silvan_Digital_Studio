import { afterEach, describe, expect, it, vi } from "vitest";

import robots from "../../src/app/robots";
import sitemap from "../../src/app/sitemap";
import { projects } from "../../src/content/projects";
import { buildPageMetadata } from "../../src/lib/page-metadata";
import { getSiteOrigin } from "../../src/lib/site-url";

/** Home, four services, work, about, contact, hello, imprint, privacy. */
const ROUTE_COUNT = 11;

function clearOrigin() {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
  vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
  vi.stubEnv("VERCEL_URL", "");
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("site origin", () => {
  it("treats a configured https domain as canonical", () => {
    clearOrigin();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://silvan.ch");

    expect(getSiteOrigin()).toMatchObject({ isCanonical: true });
    expect(getSiteOrigin().base.origin).toBe("https://silvan.ch");
  });

  it.each(["http://silvan.ch", "not a url", "  "])(
    "refuses %s as a canonical origin",
    (value) => {
      clearOrigin();
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", value);

      expect(getSiteOrigin().isCanonical).toBe(false);
    },
  );

  it("uses the deployment address but never calls it canonical", () => {
    clearOrigin();
    vi.stubEnv("VERCEL_URL", "silvan-abc123.vercel.app");

    expect(getSiteOrigin()).toMatchObject({ isCanonical: false });
    expect(getSiteOrigin().base.origin).toBe("https://silvan-abc123.vercel.app");
  });

  it("falls back to localhost with nothing configured", () => {
    clearOrigin();

    expect(getSiteOrigin().base.origin).toBe("http://localhost:3000");
    expect(getSiteOrigin().isCanonical).toBe(false);
  });
});

describe("robots", () => {
  it("keeps a preview deployment out of the index entirely", () => {
    clearOrigin();
    vi.stubEnv("VERCEL_URL", "silvan-abc123.vercel.app");

    const result = robots();

    expect(result.rules).toEqual([{ userAgent: "*", disallow: "/" }]);
    expect(result.sitemap).toBeUndefined();
  });

  it("opens up and points at the sitemap once a domain exists", () => {
    clearOrigin();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://silvan.ch");

    const result = robots();

    expect(result.rules).toEqual([{ userAgent: "*", allow: "/" }]);
    expect(result.sitemap).toBe("https://silvan.ch/sitemap.xml");
  });
});

describe("sitemap", () => {
  it("covers every route and project in both languages", () => {
    clearOrigin();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://silvan.ch");

    const entries = sitemap();

    expect(entries).toHaveLength((ROUTE_COUNT + projects.length) * 2);

    const urls = entries.map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain("https://silvan.ch/reviews");
    expect(urls).toContain("https://silvan.ch/en/reviews");
    expect(urls).toContain("https://silvan.ch/imprint");
    expect(urls).toContain("https://silvan.ch/en/privacy");
    expect(urls).toContain("https://silvan.ch/work/archa");
    expect(urls).toContain("https://silvan.ch/en/work/archa");

    for (const entry of entries) {
      expect(entry.url.startsWith("https://silvan.ch")).toBe(true);
      expect(Object.keys(entry.alternates?.languages ?? {})).toEqual(["de", "en"]);
    }
  });
});

describe("page metadata", () => {
  it("claims a canonical only once a domain is configured", () => {
    clearOrigin();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://silvan.ch");

    const withDomain = buildPageMetadata({
      locale: "de",
      page: "reviews",
      route: "/reviews",
    });

    expect(withDomain.alternates?.canonical).toBe("/reviews");
    expect(withDomain.robots).toBeUndefined();

    clearOrigin();

    const preview = buildPageMetadata({
      locale: "de",
      page: "reviews",
      route: "/reviews",
    });

    expect(preview.alternates?.canonical).toBeUndefined();
    expect(preview.robots).toMatchObject({ index: false });
  });

  it("always describes both languages and a localized share card", () => {
    clearOrigin();

    for (const [locale, path] of [
      ["de", "/reviews"],
      ["en", "/en/reviews"],
    ] as const) {
      const metadata = buildPageMetadata({ locale, page: "reviews", route: "/reviews" });

      expect(metadata.alternates?.languages).toMatchObject({
        de: "/reviews",
        en: "/en/reviews",
        "x-default": "/reviews",
      });
      expect(metadata.openGraph?.url).toBe(path);
      expect(metadata.openGraph).toMatchObject({
        images: [expect.objectContaining({ url: `/og/${locale}` })],
      });
    }
  });
});
