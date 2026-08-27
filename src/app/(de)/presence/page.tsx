import type { Metadata } from "next";

import { PresencePage } from "../../../features/pages/PresencePage";
import { buildPageMetadata } from "../../../lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  page: "presence",
  route: "/presence",
});

export default function Page() {
  return <PresencePage locale="de" />;
}
