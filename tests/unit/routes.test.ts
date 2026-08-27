import { describe, expect, it } from "vitest";

import {
  getLocaleFromPath,
  localizePath,
  switchLocale,
} from "../../src/lib/routes";

describe("localized routes", () => {
  it("detects the locale from a localized internal path", () => {
    expect(getLocaleFromPath("/en/about")).toBe("en");
    expect(getLocaleFromPath("/reviews")).toBe("de");
  });

  it.each([
    ["/reviews", "en", "/en/reviews"],
    ["/en/about", "de", "/about"],
    ["/en", "de", "/"],
    ["/en/work/archa", "de", "/work/archa"],
    ["/work/archa", "en", "/en/work/archa"],
  ] as const)("switches %s to %s as %s", (path, locale, expected) => {
    expect(switchLocale(path, locale)).toBe(expected);
  });

  it("preserves query strings and hashes", () => {
    expect(switchLocale("/reviews?from=hello#prices", "en")).toBe(
      "/en/reviews?from=hello#prices",
    );
    expect(switchLocale("/en/work/archa?view=mobile#details", "de")).toBe(
      "/work/archa?view=mobile#details",
    );
  });

  it("normalizes root and trailing slashes", () => {
    expect(localizePath("/", "en")).toBe("/en");
    expect(localizePath("/reviews/", "en")).toBe("/en/reviews");
    expect(localizePath("/en/reviews/", "de")).toBe("/reviews");
    expect(localizePath("/en/", "en")).toBe("/en");
  });

  it.each([
    "https://evil.example/reviews",
    "http://evil.example/en/about",
    "//evil.example/work/archa",
    "/en//evil.example/work/archa",
    "javascript:alert(1)",
  ])("rejects external-looking input without creating an open redirect: %s", (path) => {
    expect(() => switchLocale(path, "en")).toThrow(TypeError);
  });
});
