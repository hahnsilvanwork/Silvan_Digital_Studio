import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Konditorei Vogel – Zürich",
  description: "Feine Backwaren, Torten und Café Crème seit 1987. Täglich frisch gebacken in Zürich.",
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
