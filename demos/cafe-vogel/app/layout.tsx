import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: { default: "Café & Konditorei Vogel – Fiktives Café in Zürich", template: "%s | Café & Konditorei Vogel" },
  description: "Fiktives Café-Konzept von SILVAN: Backwaren, Speisekarte, Öffnungszeiten und eine lokale Reservierungsdemo ohne Versand.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <a className="skip-link" href="#main-content">Zum Inhalt</a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
