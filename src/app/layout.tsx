import type { Metadata, Viewport } from "next";

import "./globals.css";
import { rootFontVariables } from "./fonts";
import {
  DocumentShell,
  metadata as siteMetadata,
  viewport as siteViewport,
} from "./layout-contract";

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = siteViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DocumentShell className={rootFontVariables}>
      {children}
    </DocumentShell>
  );
}
