import type { Metadata } from "next";

import { HelloPage } from "../../../features/pages/HelloPage";
import { getContent } from "../../../lib/locales";

const content = getContent("de");

export const metadata: Metadata = {
  title: content.seo.hello.title,
  description: content.seo.hello.description,
};

export default function Page() {
  return <HelloPage locale="de" />;
}
