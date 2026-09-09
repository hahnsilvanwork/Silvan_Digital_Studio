import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt & Reservierungsdemo",
  description: "Öffnungszeiten und fiktiver Standort. Eine Tischanfrage mit Datum, Wunschzeit und Personenzahl lokal ausprobieren – ohne Versand oder Speicherung.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
