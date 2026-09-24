import type { Metadata } from "next";
import "./globals.css";
import "./hero.css";
export const metadata: Metadata = {
  title: "Steiner Bau | Gute Räume fürs echte Leben – Website-Demo",
  description:
    "Website-Demo für einen fiktiven Handwerksbetrieb: Renovationen, Malerarbeiten und Bodenbeläge in Zürich.",
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
