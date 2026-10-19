import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: {
    default: "Café & Konditorei Vogel: Fiktives Café in Zürich",
    template: "%s | Café & Konditorei Vogel",
  },
  description:
    "Ein fiktives Café von SilvanDigital: Gebäck, Speisekarte und Beispiel-Öffnungszeiten entdecken. Eine Tischanfrage ausprobieren, ohne Versand oder Reservierung.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <noscript>
          <style>{`.menu-toggle{display:none!important}.main-navigation{display:flex!important;flex-wrap:wrap}.site-header{position:relative}`}</style>
        </noscript>
        <a className="skip-link" href="#main-content">
          Zum Inhalt
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
