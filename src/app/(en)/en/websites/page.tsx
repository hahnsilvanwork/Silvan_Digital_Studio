import type { Metadata } from "next";

import { WebsitesPage } from "../../../../features/pages/WebsitesPage";
import { getContent } from "../../../../lib/locales";

const content = getContent("en");

export const metadata: Metadata = {
  title: content.seo.websites.title,
  description: content.seo.websites.description,
};

export default function Page() {
  return <WebsitesPage locale="en" />;
}
