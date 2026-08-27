import type { Metadata } from "next";

import { PresencePage } from "../../../../features/pages/PresencePage";
import { buildPageMetadata } from "../../../../lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  page: "presence",
  route: "/presence",
});

export default function Page() {
  return <PresencePage locale="en" />;
}
