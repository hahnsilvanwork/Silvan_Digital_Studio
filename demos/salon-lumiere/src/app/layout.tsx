import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Salon Lumière – Fiktives Salonkonzept",
  description:
    "Fiktives Salonkonzept mit beispielhaften Leistungen und einer lokalen Demo-Terminanfrage ohne Versand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <a className="salon-skip" href="#main">Zum Inhalt</a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
