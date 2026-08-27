import type { Metadata, Viewport } from "next";

import "../globals.css";
import { RootDocument } from "../../components/layout/RootDocument";
import { buildPageMetadata } from "../../lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  page: "home",
  route: "/",
});

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
