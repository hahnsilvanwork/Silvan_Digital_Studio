import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Salon Lumière – Haarsalon in Zürich",
  description:
    "Ihr exklusiver Haarsalon im Herzen Zürichs. Schnitte, Färbungen und Strähnen für Damen und Herren.",
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
