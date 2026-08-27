import type { Metadata, Viewport } from "next";

import "../globals.css";
import { RootDocument } from "../../components/layout/RootDocument";
import { buildPageMetadata } from "../../lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  page: "home",
  route: "/",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // The paper tone, so mobile browser chrome continues the page instead of
  // framing it in the platform's default grey.
  themeColor: "#f9f8f6",
};

export default function GermanLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="de">{children}</RootDocument>;
}
