import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import AppointmentInvitation from "@/components/AppointmentInvitation";

export const metadata: Metadata = { title: "Der Salon & das Team | Salon Lumière: Demo", description: "Die Idee hinter dem fiktiven Salon Lumière: helle Räume, persönliche Beratung und drei erfundene Teamprofile als Beispiel einer Salon-Website." };
const team = [
  { name: "Sophie Maurer", initials: "SM", role: "Schnitt & Beratung", bio: "Sophie steht im Beispiel für Beratung und Schnitt. Die Frisur soll zur Haarstruktur, zum Alltag und zur gewünschten Veränderung passen.", service: "damenschnitt", link: "Schnitt auswählen" },
  { name: "Lukas Bernhard", initials: "LB", role: "Farbe & Balayage", bio: "Lukas steht im Beispiel für Farbe: einen bestehenden Ton auffrischen oder weiche, natürlich wirkende Farbverläufe gestalten.", service: "balayage-ombre", link: "Farbbehandlungen ansehen" },
  { name: "Elena Costa", initials: "EC", role: "Styling & Pflege", bio: "Elena steht im Beispiel für Frisuren zu besonderen Anlässen und für Pflege, die zu den Bedürfnissen des Haars passt.", service: "foehnfrisur", link: "Styling ansehen" },
];

export default function UeberUns() {
  return (
    <>
      <section className="page-intro"><div className="salon-shell"><h1>Ein Salon mit Raum<br /><em>für Ihren Stil.</em></h1><p>Lumière ist die Idee eines Quartiersalons, in dem man sich Zeit für Sie nimmt. Für Ihre Wünsche, Ihr Haar und eine Frisur, mit der Sie sich wohlfühlen.</p><p className="section-note">Eine Beispiel-Website. Der Salon und die Teamprofile sind erfunden.</p></div></section>
      <section className="salon-shell salon-section salon-about-grid">
        <figure><Image src="/demos/salon/salon-interior.jpg" width={1408} height={768} alt="Salonraum als Gestaltungsbeispiel mit runden Spiegeln, Sesseln und Pflanzen" loading="eager" /><figcaption>So könnte Lumière aussehen: viel Licht, Holz und natürliche Töne.</figcaption></figure>
        <div><h2>Erst zuhören.<br />Dann gestalten.</h2><p>Manchmal reicht ein frischer Schnitt. Manchmal wünschen Sie sich eine grössere Veränderung. Die Salon-Idee beginnt bei der Frage, welche Frisur zu Ihnen und Ihrem Alltag passt.</p><p>Verständlich beschriebene Leistungen, sichtbare Richtpreise und eine einfache Terminanfrage gehören deshalb genauso dazu wie ein einladender Raum.</p><Link prefetch={false} href="/leistungen" className="salon-text-link">Leistungen & Preise ansehen</Link></div>
      </section>
      <section className="team-section"><div className="salon-shell salon-section">
        <div className="section-heading"><div><h2>Drei Schwerpunkte.<br />Eine gemeinsame Idee.</h2><p>So könnte ein Salon sein Team vorstellen. Die folgenden Namen und Profile sind erfunden. Anstelle von Teamfotos sehen Sie die Anfangsbuchstaben der Namen.</p></div></div>
        <div className="team-list">{team.map(({ name, initials, role, bio, service, link }) => <article key={name} className="team-member"><span className="team-initials" aria-hidden="true">{initials}</span><div><h3>{name}</h3><p className="team-role">{role}</p><p>{bio}</p><Link prefetch={false} href={`/leistungen#${service}`} className="salon-text-link">{link}</Link></div></article>)}</div>
      </div></section>
      <AppointmentInvitation />
    </>
  );
}
