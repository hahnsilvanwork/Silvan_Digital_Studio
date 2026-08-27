import type { Metadata } from "next";

import { AutomationPage } from "../../../features/pages/AutomationPage";
import { buildPageMetadata } from "../../../lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  page: "automation",
  route: "/automation",
});

export default function Page() {
  return <AutomationPage locale="de" />;
}
