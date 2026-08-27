import type { Metadata, Viewport } from "next";

import "../globals.css";
import { RootDocument } from "../../components/layout/RootDocument";
import { getContent } from "../../lib/locales";

const content = getContent("en");

export const metadata: Metadata = {
  title: content.seo.home.title,
  description: content.seo.home.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
