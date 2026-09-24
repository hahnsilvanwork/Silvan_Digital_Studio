import Link from "next/link";

export default function AppointmentInvitation() {
  return (
    <section className="appointment-invitation">
      <div className="salon-shell invitation-inner">
        <div><h2>Was darf sich<br /><em>für Sie verändern?</em></h2><p>Wählen Sie eine Leistung und halten Sie Ihren Terminwunsch fest. Die Demo zeigt Ihnen die Anfrage vor dem Abschluss.</p></div>
        <div className="invitation-action"><Link prefetch={false} href="/kontakt" className="salon-button">Termin anfragen</Link><span>Zum Ausprobieren. Ohne Versand oder Buchung.</span></div>
      </div>
    </section>
  );
}
