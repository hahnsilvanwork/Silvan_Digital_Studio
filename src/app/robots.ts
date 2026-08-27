import type { MetadataRoute } from "next";

import { getSiteOrigin } from "../lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const { base, isCanonical } = getSiteOrigin();

  // Until a real domain is configured this build is a preview. Letting it be
  // indexed would put a throwaway URL into search results and split ranking
  // with the eventual production domain.
  if (!isCanonical) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: new URL("/sitemap.xml", base).toString(),
    host: base.host,
  };
}
