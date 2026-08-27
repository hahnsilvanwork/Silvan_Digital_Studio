import type { Metadata } from "next";

import { LegalPage } from "../../../features/pages/LegalPage";
import { getContent } from "../../../lib/locales";
import { buildPageMetadata } from "../../../lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  page: "imprint",
  route: "/imprint",
});

export default function Page() {
  return (
    <LegalPage
      content={getContent("de").imprint}
      locale="de"
      route="/imprint"
    />
  );
}
