import type { Metadata } from "next";

import { WorkPage } from "../../../../features/pages/WorkPage";
import { buildPageMetadata } from "../../../../lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  page: "work",
  route: "/work",
});

export default function Page() {
  return <WorkPage locale="en" />;
}
