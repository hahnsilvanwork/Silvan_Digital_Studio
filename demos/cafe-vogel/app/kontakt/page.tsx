import ReservationForm from "../components/ReservationForm";
import { openingHours } from "../data/hours";

export default function Kontakt() {
  return (
    <>
      <section className="page-intro wrap">
        <h1>Ein Platz für Ihre Auszeit.</h1>
        <p>
          Kaffee zu zweit oder Frühstück in guter Gesellschaft: Probieren Sie
          aus, wie Sie einen Tisch für Ihren Besuch anfragen würden.
        </p>
      </section>
      <section className="wrap section-space contact-grid">
        <div className="contact-info">
          <div>
            <h2>Ein fiktives Café in Zürich.</h2>
            <p>
              Café &amp; Konditorei Vogel ist erfunden. Die Website zeigt eine
              mögliche Café-Idee für Zürich, ohne realen Standort.
            </p>
          </div>
          <div>
            <h2>Beispiel-Öffnungszeiten</h2>
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
          <h2>Tischanfrage ausprobieren</h2>
          <p className="form-note" id="demo-note">
            Bitte verwenden Sie Beispieldaten. Ihre Angaben bleiben in dieser
            Browseransicht und werden nicht dauerhaft gespeichert. Es wird
            nichts versendet und kein Tisch reserviert.
          </p>
          <ReservationForm />
        </div>
      </section>
    </>
  );
}
