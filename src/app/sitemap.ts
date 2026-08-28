import type { MetadataRoute } from "next";

import { projects } from "../content/projects";
import type { InternalPath } from "../content/types";
import { SUPPORTED_LOCALES } from "../lib/locales";
import { createProjectPath, localizePath } from "../lib/routes";
import { getSiteOrigin } from "../lib/site-url";

const ROUTES: readonly InternalPath[] = [
  "/",
  "/websites",
  "/reviews",
  "/presence",
  "/automation",
  "/work",
  "/about",
  "/contact",
  // "/hello" is deliberately absent. It is the destination of a handed-over NFC
  // card, not a page anyone searches for: nothing on the site links to it and
  // its content repeats the main navigation. It still resolves when tapped; it
  // just does not ask to be indexed. See its metadata for the matching robots
  // directive.
  "/imprint",
  "/privacy",
];

/**
 * Bump this when the published copy of the site actually changes. It is the
 * date every entry reports, so it has to mean something.
 */
const CONTENT_REVISION = "2026-08-27";

/** The service pages are what a visitor is meant to land on from a search. */
const PRIORITY: Partial<Record<string, number>> = {
  "/": 1,
  "/websites": 0.9,
  "/reviews": 0.9,
  "/presence": 0.8,
  "/automation": 0.8,
  "/work": 0.7,
  "/about": 0.6,
  "/contact": 0.6,
  "/imprint": 0.2,
  "/privacy": 0.2,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const { base } = getSiteOrigin();
  // Pinned to the last content revision rather than to the build clock. With
  // `new Date()` every deployment -- including one that only changed a
  // stylesheet -- told crawlers that all 26 URLs had changed, which trains them
  // to stop trusting the field.
  const lastModified = new Date(CONTENT_REVISION);
  const paths: InternalPath[] = [
    ...ROUTES,
    ...projects.map((project) => createProjectPath(project.slug)),
  ];

  return paths.flatMap((route) =>
    SUPPORTED_LOCALES.map((locale) => ({
      url: new URL(localizePath(route, locale), base).toString(),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: PRIORITY[route] ?? 0.5,
      // Both languages are listed for every entry, so a crawler is told which
      // pages are translations of each other rather than duplicates.
      alternates: {
        languages: Object.fromEntries(
          SUPPORTED_LOCALES.map((option) => [
            option,
            new URL(localizePath(route, option), base).toString(),
          ]),
        ),
      },
    })),
  );
}
