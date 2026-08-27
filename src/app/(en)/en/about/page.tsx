import type { Metadata } from "next";

import { AboutPage } from "../../../../features/pages/AboutPage";
import { getContent } from "../../../../lib/locales";

const content = getContent("en");

export const metadata: Metadata = {
  title: content.seo.about.title,
  description: content.seo.about.description,
};

export default function Page() {
  return <AboutPage locale="en" />;
}
