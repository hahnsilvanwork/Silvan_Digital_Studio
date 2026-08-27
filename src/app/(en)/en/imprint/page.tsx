import type { Metadata } from "next";

import { LegalPage } from "../../../../features/pages/LegalPage";
import { getContent } from "../../../../lib/locales";
import { buildPageMetadata } from "../../../../lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  page: "imprint",
  route: "/imprint",
});

export default function Page() {
  return (
    <LegalPage
      content={getContent("en").imprint}
      locale="en"
      route="/imprint"
    />
  );
}
