import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tischanfrage ausprobieren",
  description:
    "Eine Tischanfrage für das fiktive Café Vogel ausprobieren: Datum, Wunschzeit und Personenzahl prüfen. Kein Versand, keine Reservierung oder dauerhafte Speicherung.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
