import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { allServices } from "@/content/services";
import AppointmentInvitation from "@/components/AppointmentInvitation";

export const metadata: Metadata = { title: "Salon Lumière | Fiktives Salonkonzept in Zürich", description: "Schnitt, Farbe und Pflege: Entdecken Sie das Salonkonzept mit transparenten Richtpreisen und einer lokalen Demo-Terminanfrage ohne Versand." };

const featured = ["damenschnitt", "herrenschnitt", "balayage-ombre", "pflegekur"].map(id => allServices.find(service => service.id === id)!);

export default function Home() {
  return (
    <>
      <section className="salon-hero salon-shell">
        <div className="salon-hero-copy">
          <h1>Ihr Haar.<br /><em>Ihre Geschichte.</em></h1>
          <p>Schnitt, Farbe und Pflege, die zu Ihnen passen. Entdecken Sie Salon Lumière – ein Salonkonzept mit Raum für Ihren eigenen Stil.</p>
          <div className="salon-hero-actions"><Link prefetch={false} href="/kontakt" className="salon-button">Termin anfragen</Link><Link prefetch={false} href="/leistungen" className="salon-text-link">Leistungen & Preise ansehen</Link></div>
          <p className="salon-hero-note">Fiktiver Salon in Zürich · Interaktive Konzeptwebsite</p>
        </div>
        <figure className="salon-hero-image">
          <Image src="/demos/salon/hero-bg.jpg" alt="Heller Salonraum mit grossen Spiegeln, Pflanzen und natürlichen Materialien" width={1408} height={768} loading="eager" fetchPriority="high" />
          <figcaption>Ein heller Raum. Ein Moment für Sie.</figcaption>
        </figure>
      </section>

      <section className="salon-shell salon-section home-services" aria-labelledby="services-heading">
        <div className="section-heading"><div><h2 id="services-heading">Ein neuer Schnitt.<br />Ein anderes Gefühl.</h2><p>Vom kleinen Auffrischen bis zur Veränderung: vier Einstiege in unser beispielhaftes Angebot.</p></div><Link prefetch={false} href="/leistungen" className="salon-text-link">Alle Leistungen & Preise</Link></div>
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
          <figure><Image src="/demos/salon/coloring.jpg" alt="Gestaltungsbild einer sorgfältig aufgetragenen Haarfarbe mit Pinsel und Folien" width={638} height={361} loading="lazy" /><figcaption>Farbe, Form und Persönlichkeit – die Idee hinter Lumière.</figcaption></figure>
          <div><h2>Raum für Stil.<br /><em>Zeit für Sie.</em></h2><p>Ein guter Look beginnt beim Zuhören. Welche Veränderung wünschen Sie sich? Wie tragen Sie Ihr Haar im Alltag? Unser Salonkonzept stellt dieses Gespräch an den Anfang.</p><p>Helle Räume, natürliche Materialien und ein überschaubares Angebot geben dieser Idee ihren Rahmen.</p><Link prefetch={false} href="/ueber-uns" className="salon-text-link">Den Salon kennenlernen</Link></div>
        </div>
      </section>

      <section className="salon-shell salon-section visit-steps" aria-labelledby="steps-heading">
        <div><h2 id="steps-heading">Von der Idee<br />zum Terminwunsch.</h2><p>So lässt sich die Anfrage in dieser Demo ausprobieren.</p></div>
        <ol>
          <li><h3>Leistung auswählen</h3><p>Schnitt, Farbe oder Pflege vergleichen. Richtpreis und Zeitbedarf stehen direkt dabei.</p></li>
          <li><h3>Wunsch ergänzen</h3><p>Die gewählte Leistung wird übernommen. Sie ergänzen Datum, Uhrzeit und bei Bedarf eine Nachricht.</p></li>
          <li><h3>In Ruhe prüfen</h3><p>Alle Angaben noch einmal ansehen und ändern. Die Demo versendet nichts und bucht keinen Termin.</p></li>
        </ol>
      </section>
      <AppointmentInvitation />
    </>
  );
}
