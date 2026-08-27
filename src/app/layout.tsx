import type { Metadata, Viewport } from "next";

import "./globals.css";
import { rootFontVariables } from "./fonts";

export const metadata: Metadata = {
  title: "SILVAN Digital Studio",
  description:
    "Digitale Lösungen für mehr Sichtbarkeit und weniger wiederkehrende Arbeit.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={rootFontVariables}>{children}</body>
    </html>
  );
}
