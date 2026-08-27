import type { Metadata } from "next";

import { PresencePage } from "../../../../features/pages/PresencePage";
import { getContent } from "../../../../lib/locales";

const content = getContent("en");

export const metadata: Metadata = {
  title: content.seo.presence.title,
  description: content.seo.presence.description,
};

export default function Page() {
  return <PresencePage locale="en" />;
}
