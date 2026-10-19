import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { allServices } from "@/content/services";
import AppointmentInvitation from "@/components/AppointmentInvitation";

export const metadata: Metadata = { title: "Salon Lumière | Fiktiver Salon in Zürich", description: "Schnitt, Farbe und Pflege entdecken: ein fiktiver Salon mit Richtpreisen und einer Terminanfrage zum Ausprobieren. Kein Versand und keine Buchung." };

const featured = ["damenschnitt", "herrenschnitt", "balayage-ombre", "pflegekur"].map(id => allServices.find(service => service.id === id)!);

export default function Home() {
  return (
    <>
      <section className="salon-hero salon-shell">
        <div className="salon-hero-copy">
          <h1>Ihr Haar.<br /><em>Ihr Stil.</em></h1>
          <p>Ein frischer Schnitt, eine neue Farbe oder Zeit für Pflege. Salon Lumière ist die Idee eines Salons, in dem Ihr persönlicher Stil im Mittelpunkt steht.</p>
          <div className="salon-hero-actions"><Link prefetch={false} href="/kontakt" className="salon-button">Termin anfragen</Link><Link prefetch={false} href="/leistungen" className="salon-text-link">Leistungen & Preise ansehen</Link></div>
          <p className="salon-hero-note">Fiktiver Salon in Zürich · Website zum Ausprobieren</p>
        </div>
        <figure className="salon-hero-image">
          <Image src="/demos/salon/hero-bg.jpg" alt="Heller Salonraum mit grossen Spiegeln, Pflanzen und natürlichen Materialien" width={1408} height={768} loading="eager" fetchPriority="high" />
          <figcaption>Ein heller Raum. Ein Moment für Sie.</figcaption>
        </figure>
      </section>

      <section className="salon-shell salon-section home-services" aria-labelledby="services-heading">
        <div className="section-heading"><div><h2 id="services-heading">Ein neuer Schnitt.<br />Ein anderes Gefühl.</h2><p>Auffrischen oder etwas Neues wagen? Vier Leistungen aus unserem Beispielangebot, jeweils mit Richtpreis und Dauer.</p></div><Link prefetch={false} href="/leistungen" className="salon-text-link">Alle Leistungen & Preise</Link></div>
        <div className="service-preview-list">
          {featured.map(({ id, name, description, price, duration }) => (
            <Link prefetch={false} href={`/leistungen#${id}`} key={id} className="service-preview">
              <div><h3>{name}</h3><p>{description}</p></div>
              <div className="service-preview-price"><strong>{price}</strong><span>{duration}</span></div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
            </Link>
          ))}
        </div>
        <p className="section-note">Beispielhafte Richtpreise. Der genaue Aufwand hängt von Haarlänge, Haarstruktur und gewünschtem Ergebnis ab.</p>
      </section>

      <section className="salon-story">
        <div className="salon-shell story-grid">
          <figure><Image src="/demos/salon/coloring.jpg" alt="Beispielbild: Haarfarbe wird mit einem Pinsel aufgetragen, einzelne Strähnen liegen auf Folien" width={638} height={361} loading="lazy" /><figcaption>Farbe und Form als Inspiration für den fiktiven Salon.</figcaption></figure>
          <div><h2>Raum für Stil.<br /><em>Zeit für Sie.</em></h2><p>Ein guter Schnitt beginnt mit einem Gespräch. Was gefällt Ihnen an Ihrer Frisur? Was möchten Sie verändern? Und wie viel Zeit nehmen Sie sich morgens für Ihr Haar? Dieses Zuhören steht im Mittelpunkt der Salon-Idee.</p><p>Helle Räume, natürliche Materialien und ein übersichtliches Angebot schaffen den passenden Rahmen.</p><Link prefetch={false} href="/ueber-uns" className="salon-text-link">Die Idee hinter Lumière</Link></div>
        </div>
      </section>

      <section className="salon-shell salon-section visit-steps" aria-labelledby="steps-heading">
        <div><h2 id="steps-heading">Von der Idee<br />zum Terminwunsch.</h2><p>So bereiten Sie eine Beispielanfrage vor.</p></div>
        <ol>
          <li><h3>Leistung auswählen</h3><p>Vergleichen Sie Schnitt, Farbe und Pflege. Richtpreis und Dauer stehen direkt bei der jeweiligen Leistung.</p></li>
          <li><h3>Terminwunsch ergänzen</h3><p>Ihre Leistungsauswahl wird übernommen. Sie ergänzen Datum, Uhrzeit und bei Bedarf eine Nachricht.</p></li>
          <li><h3>In Ruhe prüfen</h3><p>Sehen Sie alle Angaben zusammen an und ändern Sie sie bei Bedarf. Die Demo versendet nichts und bucht keinen Termin.</p></li>
        </ol>
      </section>
      <AppointmentInvitation />
    </>
  );
}
