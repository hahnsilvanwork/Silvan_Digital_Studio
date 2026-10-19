import type { Metadata } from "next";
import "./globals.css";
import "./hero.css";
export const metadata: Metadata = {
  title: "Steiner Bau | Renovationen für Ihr Zuhause | Website-Demo",
  description:
    "Gestaltungskonzept für einen fiktiven Handwerksbetrieb in Zürich: Renovationen, Malerarbeiten, Bodenbeläge und Fassaden. Mit Projektideen und einem Formular zum Ausprobieren.",
  robots: { index: false, follow: false },
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
          <style>{`.menu-toggle{display:none!important}.navigation{display:flex!important;flex-wrap:wrap}.site-header{position:relative}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
