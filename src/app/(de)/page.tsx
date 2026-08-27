import type { Metadata } from "next";

import { HomePage } from "../../features/pages/HomePage";
import { buildPageMetadata } from "../../lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  page: "home",
  route: "/",
});

export default function Page() {
  return <HomePage locale="de" />;
}
