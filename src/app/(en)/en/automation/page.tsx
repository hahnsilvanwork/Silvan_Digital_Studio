import type { Metadata } from "next";

import { AutomationPage } from "../../../../features/pages/AutomationPage";
import { getContent } from "../../../../lib/locales";

const content = getContent("en");

export const metadata: Metadata = {
  title: content.seo.automation.title,
  description: content.seo.automation.description,
};

export default function Page() {
  return <AutomationPage locale="en" />;
}
