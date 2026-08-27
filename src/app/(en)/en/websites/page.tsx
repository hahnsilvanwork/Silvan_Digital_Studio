import type { Metadata } from "next";

import { WebsitesPage } from "../../../../features/pages/WebsitesPage";
import { buildPageMetadata } from "../../../../lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  page: "websites",
  route: "/websites",
});

export default function Page() {
  return <WebsitesPage locale="en" />;
}
