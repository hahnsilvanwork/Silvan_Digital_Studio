import type { MetadataRoute } from "next";

import { getContent } from "../lib/locales";

/**
 * The web app manifest. German is the default language of the site, so the
 * manifest describes the German entry point -- a visitor who installs the site
 * from the English routes still lands on a page that offers the switch.
 *
 * `display: "browser"` on purpose: this is a website, not an application, and
 * a standalone shell would take away the browser's back button and address bar
 * for no gain.
 */
export default function manifest(): MetadataRoute.Manifest {
  const content = getContent("de");

  return {
    name: `${content.brand.name} ${content.brand.descriptor}`,
    short_name: content.brand.name,
    description: content.seo.home.description,
    lang: "de-CH",
    start_url: "/",
    scope: "/",
    display: "browser",
    background_color: "#f9f8f6",
    theme_color: "#f9f8f6",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
