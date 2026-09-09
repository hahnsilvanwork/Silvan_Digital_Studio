import type { Metadata } from "next";
import ContactDemo from "@/components/ContactDemo";

export const metadata: Metadata = {
  title: "Demo-Terminanfrage | Salon Lumière",
  description: "Wunschleistung, Datum und Uhrzeit in einer lokalen Demo-Anfrage ausprobieren. Kein Versand, keine dauerhafte Speicherung und keine echte Buchung.",
};

export default function KontaktPage() {
  return <ContactDemo />;
}
