import { describe, expect, it } from "vitest";

import {
  getLocaleFromPath,
  localizePath,
  switchLocale,
} from "../../src/lib/routes";
import type { InternalPath } from "../../src/content/types";

const contactPath = "/contact" satisfies InternalPath;
const projectPath = "/work/archa" satisfies InternalPath;

// @ts-expect-error External URLs are not valid content destinations.
const externalPath: InternalPath = "https://evil.example";
// @ts-expect-error Misspelled static routes are rejected by the content model.
const misspelledPath: InternalPath = "/contcat";

void contactPath;
void projectPath;
void externalPath;
void misspelledPath;

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

  it.each([
    "/../contact",
    "/./reviews",
    "/en/../contact",
    "/%2e%2e/contact",
    "/%2E/reviews",
    "/en/%2e%2E/contact",
  ])("rejects raw or encoded dot segments: %s", (path) => {
    expect(() => switchLocale(path, "en")).toThrow(TypeError);
  });

  it.each([
    "/work%2Farcha",
    "/en/%2f%2fevil.example",
    "/work%5Carcha",
    "/%5c%5cevil.example",
  ])("rejects encoded slash and backslash ambiguity: %s", (path) => {
    expect(() => switchLocale(path, "en")).toThrow(TypeError);
  });

  it.each(["/%", "/%2", "/%GG/contact"])(
    "rejects malformed percent encoding: %s",
    (path) => {
      expect(() => switchLocale(path, "en")).toThrow(TypeError);
    },
  );

  it.each(["/work//archa", "/en///contact"])(
    "rejects repeated path separators: %s",
    (path) => {
      expect(() => switchLocale(path, "de")).toThrow(TypeError);
    },
  );

  it("preserves URL-like query and hash text as inert suffix data", () => {
    const input =
      "/reviews?next=https://evil.example/a//b&encoded=%2F%2E#https://other.example/x";

    expect(switchLocale(input, "en")).toBe(`/en${input}`);
  });
});
