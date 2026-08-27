import type { Metadata } from "next";

import type { InternalPath, Locale, PageKey } from "../content/types";
import { getContent, SUPPORTED_LOCALES } from "./locales";
import { localizePath } from "./routes";
import { getSiteOrigin } from "./site-url";

/** Open Graph wants a territory, and this studio sells into Switzerland. */
const OG_LOCALE: Readonly<Record<Locale, string>> = {
  de: "de_CH",
  en: "en_US",
};

interface PageMetadataInput {
  readonly locale: Locale;
  readonly route: InternalPath;
  readonly title: string;
  readonly description: string;
}

/**
 * Title, description, canonical, language alternates and social cards for one
 * route in one language. Every page went through its own hand-written object
 * before, which is why none of them carried alternates or Open Graph at all.
 */
export function buildMetadata({
  locale,
  route,
  title,
  description,
}: PageMetadataInput): Metadata {
  const { base, isCanonical } = getSiteOrigin();
  const path = localizePath(route, locale);

  // Referenced explicitly rather than through the opengraph-image convention:
  // a page that declares its own openGraph object replaces the parent's, which
  // would drop a segment-level image from every page but the home page.
  const image = {
    url: `/og/${locale}`,
    width: 1200,
    height: 630,
    alt: title,
  };

  const languages = Object.fromEntries(
    SUPPORTED_LOCALES.map((option) => [option, localizePath(route, option)]),
  );

  return {
    metadataBase: base,
    title,
    description,
    alternates: {
      // Without a configured domain there is no canonical to claim; the
      // alternates still describe how the two languages relate.
      canonical: isCanonical ? path : undefined,
      languages: {
        ...languages,
        "x-default": localizePath(route, "de"),
      },
    },
    openGraph: {
      type: "website",
      siteName: "SILVAN Digital Studio",
      locale: OG_LOCALE[locale],
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
    robots: isCanonical
      ? undefined
      : // A preview deployment must not be indexed, or it competes with the
        // real domain the moment one exists.
        { index: false, follow: false },
  };
}

interface PagePresetInput {
  readonly locale: Locale;
  readonly page: PageKey;
  readonly route: InternalPath;
}

/** The common case: a page whose copy already lives in the seo dictionary. */
export function buildPageMetadata({
  locale,
  page,
  route,
}: PagePresetInput): Metadata {
  const { seo } = getContent(locale);

  return buildMetadata({
    locale,
    route,
    title: seo[page].title,
    description: seo[page].description,
  });
}
