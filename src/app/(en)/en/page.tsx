import type { Metadata } from "next";

import { HomePage } from "../../../features/pages/HomePage";
import { getContent } from "../../../lib/locales";

const content = getContent("en");

export const metadata: Metadata = {
  title: content.seo.home.title,
  description: content.seo.home.description,
};

export default function Page() {
  return <HomePage locale="en" />;
}
