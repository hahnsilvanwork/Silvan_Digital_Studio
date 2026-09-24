import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import AppointmentInvitation from "@/components/AppointmentInvitation";

export const metadata: Metadata = { title: "Der Salon & das Team | Salon Lumière – Demo", description: "Die Idee hinter Salon Lumière: ein heller Salonraum, persönliche Beratung und drei ausdrücklich fiktive Teamprofile im Websitekonzept." };
const team = [
  { name: "Sophie Maurer", initials: "SM", role: "Schnitt & Beratung", bio: "Sophie steht im Salonkonzept für die persönliche Beratung: Haarstruktur, Alltag und gewünschte Veränderung bilden den Ausgangspunkt.", service: "damenschnitt", link: "Schnitt auswählen" },
  { name: "Lukas Bernhard", initials: "LB", role: "Farbe & Balayage", bio: "Lukas verkörpert den Farbbereich – von einer Auffrischung des bestehenden Tons bis zu weichen, natürlich wirkenden Übergängen.", service: "balayage-ombre", link: "Farbbehandlungen ansehen" },
  { name: "Elena Costa", initials: "EC", role: "Styling & Pflege", bio: "Elena ergänzt das Konzept mit Stylings für besondere Anlässe und Pflege, die sich an den Bedürfnissen des Haars orientiert.", service: "foehnfrisur", link: "Styling entdecken" },
];

export default function UeberUns() {
  return (
    <>
      <section className="page-intro"><div className="salon-shell"><h1>Ein Salon mit Raum<br /><em>für Persönlichkeit.</em></h1><p>Lumière ist die Idee eines persönlichen Quartiersalons: warm, offen und auf das konzentriert, was zu Ihnen passt.</p><p className="section-note">Ein fiktives Websitekonzept. Der Salon und die Teamprofile sind erfunden.</p></div></section>
      <section className="salon-shell salon-section salon-about-grid">
        <figure><Image src="/demos/salon/salon-interior.jpg" width={1408} height={768} alt="Salonraum als Gestaltungsbeispiel mit runden Spiegeln, Sesseln und Pflanzen" loading="eager" /><figcaption>Die Bildwelt des Salonkonzepts: Licht, Holz und natürliche Töne.</figcaption></figure>
        <div><h2>Erst zuhören.<br />Dann gestalten.</h2><p>Manchmal ist es nur eine neue Kontur. Manchmal darf es ein ganz anderer Look sein. Im Mittelpunkt dieses Konzepts steht die Frage, wie Sie sich mit Ihrem Haar wohlfühlen.</p><p>Deshalb gehören verständliche Leistungen, sichtbare Richtpreise und ein einfacher Terminwunsch genauso zum Salon wie die Gestaltung des Raums.</p><Link prefetch={false} href="/leistungen" className="salon-text-link">Leistungen & Preise entdecken</Link></div>
      </section>
      <section className="team-section"><div className="salon-shell salon-section">
        <div className="section-heading"><div><h2>Drei Perspektiven.<br />Ein gemeinsames Gefühl.</h2><p>Beispielprofile zeigen, wie ein Salon sein Team und dessen Schwerpunkte vorstellen kann. Die Initialen stehen bewusst anstelle vermeintlich echter Teamfotos.</p></div></div>
        <div className="team-list">{team.map(({ name, initials, role, bio, service, link }) => <article key={name} className="team-member"><span className="team-initials" aria-hidden="true">{initials}</span><div><h3>{name}</h3><p className="team-role">{role}</p><p>{bio}</p><Link prefetch={false} href={`/leistungen#${service}`} className="salon-text-link">{link}</Link></div></article>)}</div>
      </div></section>
      <AppointmentInvitation />
    </>
  );
}
