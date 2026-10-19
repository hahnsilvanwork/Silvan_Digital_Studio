import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/content/services";
import AppointmentInvitation from "@/components/AppointmentInvitation";

export const metadata: Metadata = { title: "Leistungen & Richtpreise | Salon Lumière: Demo", description: "Zwölf Leistungen mit Richtpreisen und Dauer im fiktiven Salon Lumière. Schnitt, Farbe und Pflege vergleichen und eine Terminanfrage ausprobieren." };
const sections = [
  { id: "herren", description: "Klare Konturen, ein frischer Schnitt oder beides zusammen." },
  { id: "damen", description: "Ein Schnitt für Ihren Alltag. Ein Styling für Ihren Anlass." },
  { id: "farbe", description: "Von sanften Reflexen bis zu einem neuen Farbton." },
  { id: "pflege", description: "Pflege für trockenes, beanspruchtes oder schwer zu bändigendes Haar." },
];

export default function Leistungen() {
  return (
    <>
      <section className="page-intro"><div className="salon-shell"><h1>Ihr Stil.<br /><em>Ihre Möglichkeiten.</em></h1><p>Hier finden Sie alle Leistungen mit Richtpreis und Dauer. Wählen Sie, was zu Ihrem Wunsch passt. Wenn Sie noch unsicher sind, können Sie eine Beratung auswählen.</p><p className="section-note">Fiktives Salonangebot. Alle Preise und Zeiten sind Beispiele.</p><nav className="page-topics" aria-label="Leistungsbereiche">{services.map(({ category }, index) => <a key={category} href={`#${sections[index].id}`}>{category}</a>)}</nav></div></section>
      <div className="salon-shell service-categories">
        {services.map(({ category, items }, index) => (
          <section id={sections[index].id} className="service-category" key={category} aria-labelledby={`${sections[index].id}-heading`}>
            <div className="category-intro"><h2 id={`${sections[index].id}-heading`}>{category}</h2><p>{sections[index].description}</p></div>
            <div className="service-menu">{items.map(({ id, name, description, price, duration }) => (
              <article key={id} id={id} className="service-row">
                <div className="service-description"><h3>{name}</h3><p>{description}</p></div>
                <div className="service-facts"><strong>{price}</strong><span>{duration}</span></div>
                <Link prefetch={false} href={`/kontakt?service=${id}#demo-form`} className="salon-text-link service-request" aria-label={`${name}: Termin anfragen`}>Termin anfragen<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg></Link>
              </article>
            ))}</div>
          </section>
        ))}
      </div>
      <section className="salon-shell salon-section salon-faq" aria-labelledby="questions-heading">
        <div><h2 id="questions-heading">Gut zu wissen.</h2><p>Damit Sie Ihre Auswahl in Ruhe treffen können.</p></div>
        <div>
          <details><summary>Wie sind die Preise zu verstehen?</summary><p>Die Beträge sind Richtpreise für dieses fiktive Angebot. Der genaue Preis hängt von Haarlänge, Haarstruktur und Aufwand ab. In einem echten Salon wird er nach der Beratung und vor der Behandlung vereinbart.</p></details>
          <details><summary>Welche Leistung passt zu mir?</summary><p>Wenn Sie unsicher sind, wählen Sie in der Anfrage «Beratung zur passenden Leistung». Im optionalen Nachrichtenfeld können Sie beschreiben, was Sie sich wünschen.</p><Link prefetch={false} href="/kontakt" className="salon-text-link">Beratung auswählen</Link></details>
          <details><summary>Wird mein Termin direkt gebucht?</summary><p>Nein. Der Salon ist fiktiv. Sie können eine Anfrage vorbereiten und Ihre Angaben zusammen ansehen. Die Demo versendet keine Daten, reserviert keinen Termin und prüft keine freien Termine.</p></details>
        </div>
      </section>
      <AppointmentInvitation />
    </>
  );
}
