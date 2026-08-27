import type { Metadata } from "next";

import { AboutPage } from "../../../../features/pages/AboutPage";
import { buildPageMetadata } from "../../../../lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  page: "about",
  route: "/about",
});

export default function Page() {
  return <AboutPage locale="en" />;
}
