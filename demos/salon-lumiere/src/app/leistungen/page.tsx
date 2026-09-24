import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/content/services";
import AppointmentInvitation from "@/components/AppointmentInvitation";

export const metadata: Metadata = { title: "Leistungen & Richtpreise | Salon Lumière – Demo", description: "Zwölf Salonleistungen mit Richtpreisen und Dauer: Schnitt, Styling, Farbe und Pflege vergleichen und direkt in eine lokale Demo-Terminanfrage übernehmen." };
const sections = [
  { id: "herren", description: "Klare Konturen, ein frischer Schnitt oder beides zusammen." },
  { id: "damen", description: "Ein Schnitt für Ihren Alltag. Ein Styling für Ihren Anlass." },
  { id: "farbe", description: "Von sanften Reflexen bis zu einem neuen Farbton." },
  { id: "pflege", description: "Zeit für die Bedürfnisse Ihrer Haare." },
];

export default function Leistungen() {
  return (
    <>
      <section className="page-intro"><div className="salon-shell"><h1>Ihr Look.<br /><em>Ihre Möglichkeiten.</em></h1><p>Alle Leistungen mit Richtpreis und Zeitbedarf. Wählen Sie aus, was zu Ihrem Wunsch passt – oder beginnen Sie mit einer Beratung.</p><p className="section-note">Fiktives Salonangebot. Alle Preise und Zeiten sind Beispiele.</p><nav className="page-topics" aria-label="Leistungsbereiche">{services.map(({ category }, index) => <a key={category} href={`#${sections[index].id}`}>{category}</a>)}</nav></div></section>
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
          <details><summary>Wie sind die Preise zu verstehen?</summary><p>Die Beträge sind Richtpreise im fiktiven Salonangebot. Haarlänge, Haarstruktur und Aufwand beeinflussen den Preis. In einem realen Salon wird der endgültige Preis nach der Beratung vor der Behandlung vereinbart.</p></details>
          <details><summary>Ich weiss noch nicht, welche Leistung passt.</summary><p>Wählen Sie in der Anfrage „Beratung zur passenden Leistung“. Im optionalen Nachrichtenfeld können Sie Ihren Wunsch beschreiben.</p><Link prefetch={false} href="/kontakt" className="salon-text-link">Mit einer Beratung beginnen</Link></details>
          <details><summary>Wird mein Termin direkt gebucht?</summary><p>Nein. Diese Website ist ein fiktives Konzept. Die Anfrage lässt sich bis zur Zusammenfassung ausprobieren. Es werden weder Daten versendet noch Termine reserviert; eine echte Verfügbarkeitsprüfung findet nicht statt.</p></details>
        </div>
      </section>
      <AppointmentInvitation />
    </>
  );
}
