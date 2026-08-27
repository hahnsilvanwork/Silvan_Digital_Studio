import type { Metadata } from "next";

import { ContactPage } from "../../../features/pages/ContactPage";
import { getContent } from "../../../lib/locales";

const content = getContent("de");

export const metadata: Metadata = {
  title: content.seo.contact.title,
  description: content.seo.contact.description,
};

export default function Page() {
  return <ContactPage locale="de" />;
}
