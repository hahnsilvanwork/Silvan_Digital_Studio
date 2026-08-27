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
  "/hello",
];

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
  "/hello": 0.4,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const { base } = getSiteOrigin();
  const lastModified = new Date();
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
