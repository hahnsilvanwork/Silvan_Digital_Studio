import type { Metadata } from "next";

import { LegalPage } from "../../../features/pages/LegalPage";
import { getContent } from "../../../lib/locales";
import { buildPageMetadata } from "../../../lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  page: "privacy",
  route: "/privacy",
});

export default function Page() {
  return (
    <LegalPage
      content={getContent("de").privacy}
      locale="de"
      route="/privacy"
    />
  );
}
