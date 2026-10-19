import type { Metadata } from "next";
import ContactDemo from "@/components/ContactDemo";

export const metadata: Metadata = {
  title: "Terminanfrage ausprobieren | Salon Lumière",
  description: "Eine Terminanfrage für den fiktiven Salon Lumière ausprobieren: Leistung, Datum und Uhrzeit auswählen und prüfen. Kein Versand oder echte Buchung.",
};

export default function KontaktPage() {
  return <ContactDemo />;
}
