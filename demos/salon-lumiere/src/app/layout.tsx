import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Salon Lumière: Fiktiver Salon",
  description:
    "Ein fiktiver Salon mit zwölf Leistungen, Richtpreisen und einer Terminanfrage zum Ausprobieren. Die Demo versendet nichts und bucht keine Termine.",
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
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
