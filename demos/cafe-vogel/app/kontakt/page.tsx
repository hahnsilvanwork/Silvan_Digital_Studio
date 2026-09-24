import ReservationForm from "../components/ReservationForm";
import { openingHours } from "../data/hours";

export default function Kontakt() {
  return (
    <>
      <section className="page-intro wrap">
        <h1>Ein Platz für Ihre Auszeit.</h1>
        <p>
          Ein Kaffee zu zweit oder ein Frühstück in guter Gesellschaft: Planen
          Sie hier Ihren beispielhaften Besuch.
        </p>
      </section>
      <section className="wrap section-space contact-grid">
        <div className="contact-info">
          <div>
            <h2>Mitten in Zürich gedacht.</h2>
            <p>
              Café &amp; Konditorei Vogel ist ein fiktives Café in Zürich. Diese
              Beispielwebsite hat keinen realen Standort.
            </p>
          </div>
          <div>
            <h2>Unsere Öffnungszeiten</h2>
            <dl className="hours-list">
              {openingHours.map(({ day, time }) => (
                <div key={day}>
                  <dt>{day}</dt>
                  <dd>{time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div>
          <h2>Besuch ausprobieren</h2>
          <p className="form-note" id="demo-note">
            Demoformular: Bitte verwenden Sie Beispieldaten. Nichts wird
            versendet oder gespeichert; es entsteht keine Reservierung.
          </p>
          <ReservationForm />
        </div>
      </section>
    </>
  );
}
