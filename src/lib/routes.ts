import type { Locale } from "../content/types";
import { DEFAULT_LOCALE } from "./locales";

function splitInternalPath(input: string): { pathname: string; suffix: string } {
  if (
    !input.startsWith("/") ||
    input.includes("\\") ||
    /[\u0000-\u001F\u007F]/.test(input)
  ) {
    throw new TypeError("Expected an internal pathname beginning with a single slash.");
  }

  const suffixIndex = input.search(/[?#]/);
  const pathname = suffixIndex === -1 ? input : input.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? "" : input.slice(suffixIndex);

  if (pathname.includes("//")) {
    throw new TypeError("Expected an internal pathname without duplicate slashes.");
  }

  for (const segment of pathname.split("/").slice(1)) {
    let decodedSegment: string;

    try {
      decodedSegment = decodeURIComponent(segment);
    } catch {
      throw new TypeError("Expected a pathname with valid percent encoding.");
    }

    if (
      decodedSegment === "." ||
      decodedSegment === ".." ||
      decodedSegment.includes("/") ||
      decodedSegment.includes("\\") ||
      /[\u0000-\u001F\u007F]/.test(decodedSegment)
    ) {
      throw new TypeError("Expected a canonical internal pathname.");
    }
  }

  return { pathname, suffix };
}

function normalizePathname(pathname: string): string {
  const withoutTrailingSlash = pathname.replace(/\/+$/, "");
  return withoutTrailingSlash || "/";
}

function withoutLocalePrefix(pathname: string): string {
  if (pathname === "/en") {
    return "/";
  }

  return pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
}

export function getLocaleFromPath(input: string): Locale {
  const { pathname } = splitInternalPath(input);
  const normalized = normalizePathname(pathname);
  return normalized === "/en" || normalized.startsWith("/en/")
    ? "en"
    : DEFAULT_LOCALE;
}

export function localizePath(input: string, locale: Locale): string {
  const { pathname, suffix } = splitInternalPath(input);
  const basePath = normalizePathname(withoutLocalePrefix(normalizePathname(pathname)));

  if (locale === DEFAULT_LOCALE) {
    return `${basePath}${suffix}`;
  }

  return `${basePath === "/" ? "/en" : `/en${basePath}`}${suffix}`;
}

export function switchLocale(input: string, locale: Locale): string {
  return localizePath(input, locale);
}
