import type { Metadata } from "next";

import { ContactPage } from "../../../../features/pages/ContactPage";
import { buildPageMetadata } from "../../../../lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  page: "contact",
  route: "/contact",
});

export default function Page() {
  return <ContactPage locale="en" />;
}
