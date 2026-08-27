import type { Metadata } from "next";

import { WorkPage } from "../../../../features/pages/WorkPage";
import { getContent } from "../../../../lib/locales";

const content = getContent("en");

export const metadata: Metadata = {
  title: content.seo.work.title,
  description: content.seo.work.description,
};

export default function Page() {
  return <WorkPage locale="en" />;
}
