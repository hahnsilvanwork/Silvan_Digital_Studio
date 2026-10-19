"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { allServices, serviceFromQuery } from "@/content/services";
import { type Appointment, type AppointmentErrors, swissDate, nextDate, durationMinutes, timeSlots, validateAppointment, localizedDate } from "@/lib/appointment";
import styles from "./contact.module.css";

const hours = [
  ["Montag", "09:00 – 19:00"], ["Dienstag", "09:00 – 19:00"],
  ["Mittwoch", "09:00 – 19:00"], ["Donnerstag", "09:00 – 20:00"],
  ["Freitag", "09:00 – 20:00"], ["Samstag", "09:00 – 17:00"], ["Sonntag", "Geschlossen"],
];
const subscribeToReadiness = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
const subscribeToService = (notify: () => void) => {
  window.addEventListener("popstate", notify);
  return () => window.removeEventListener("popstate", notify);
};
const currentService = () => serviceFromQuery(window.location.search);
const emptySnapshot = () => "";
const subscribeToDate = (notify: () => void) => {
  const timer = window.setInterval(notify, 60_000);
  return () => window.clearInterval(timer);
};
const todaySnapshot = () => swissDate();
const emptyForm: Appointment = { name: "", email: "", message: "", desiredDate: "", desiredTime: "" };

export default function Kontakt() {
  const requestedService = useSyncExternalStore(subscribeToService, currentService, emptySnapshot);
  const [chosenService, setChosenService] = useState<string | null>(null);
  const service = chosenService ?? requestedService;
  const selected = allServices.find(({ id }) => id === service);
  const duration = selected ? durationMinutes(selected.duration) : 0;
  const ready = useSyncExternalStore(subscribeToReadiness, clientReady, serverReady);
  const today = useSyncExternalStore(subscribeToDate, todaySnapshot, emptySnapshot);
  const [formData, setFormData] = useState<Appointment>(emptyForm);
  const [errors, setErrors] = useState<AppointmentErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  const focusAfterRender = useRef<string | null>(null);
  const slots = timeSlots(formData.desiredDate, duration);
  useEffect(() => {
    if (submitted) statusRef.current?.focus();
    else if (focusAfterRender.current) {
      document.getElementById(focusAfterRender.current)?.focus();
      focusAfterRender.current = null;
    }
  }, [submitted, notice]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors = validateAppointment(formData, duration);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      setNotice("Bitte prüfen Sie die markierten Angaben.");
      document.getElementById(firstError)?.focus();
    } else {
      setNotice("");
      setSubmitted(true);
    }
  }
  function change(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value, ...(name === "desiredDate" ? { desiredTime: "" } : {}) }));
    setErrors(prev => ({ ...prev, [name]: undefined, ...(name === "desiredDate" ? { desiredTime: undefined } : {}) }));
    setNotice("");
  }
  function edit() {
    focusAfterRender.current = "name";
    setSubmitted(false);
  }
  function clear() {
    setFormData({ ...emptyForm });
    setChosenService("");
    setErrors({});
    focusAfterRender.current = "service";
    setSubmitted(false);
    setNotice("Alle Angaben wurden gelöscht.");
    // Also works when clearing an already-visible form.
    document.getElementById("service")?.focus();
  }
  function describedBy(field: keyof Appointment, hint?: string) {
    return [hint, errors[field] ? `${field}-error` : ""].filter(Boolean).join(" ") || undefined;
  }
  const error = (field: keyof Appointment) => errors[field] ? <p id={`${field}-error`} className={styles.error}>{errors[field]}</p> : null;

  return (
    <>
      <section className="page-intro">
        <div className="salon-shell">
          <h1>Ihr Terminwunsch.</h1>
          <p>Wählen Sie eine Leistung, ergänzen Sie Datum und Wunschzeit und prüfen Sie Ihre Angaben. Bitte verwenden Sie zum Ausprobieren nur Beispieldaten.</p>
        </div>
      </section>
      <section className={`salon-shell salon-section ${styles.layout}`}>
        <div id="demo-form" className={styles.formColumn}>
          <h2>{submitted ? "Ihre Beispielanfrage im Überblick" : "Terminanfrage ausprobieren"}</h2>
          <p className={styles.intro}>Der Salon ist fiktiv. Ihre Angaben werden nicht versendet oder dauerhaft gespeichert. Es wird kein Termin gebucht.</p>
          <p role="status" aria-live="polite" className={styles.notice}>{notice}</p>
          {submitted ? (
            <div ref={statusRef} tabIndex={-1} className={styles.summary} aria-label="Zusammenfassung Ihrer Beispielanfrage">
              <p>Dies ist nur eine Vorschau. Ihre Angaben bleiben in dieser Browseransicht. Es wurde nicht geprüft, ob ein Termin frei ist.</p>
              <dl data-testid="inquiry-summary">
                <div><dt>Leistung</dt><dd>{selected?.name ?? "Beratung zur passenden Leistung"}{selected ? <span>{selected.price} · {selected.duration}</span> : <span>Preis und Dauer noch offen</span>}</dd></div>
                <div><dt>Wunschdatum</dt><dd>{localizedDate(formData.desiredDate)}</dd></div>
                <div><dt>Wunschzeit</dt><dd>{formData.desiredTime} Uhr</dd></div>
                <div><dt>Name</dt><dd>{formData.name}</dd></div>
                <div><dt>E-Mail</dt><dd>{formData.email}</dd></div>
                <div><dt>Nachricht</dt><dd className={styles.message}>{formData.message || "Keine Nachricht ergänzt"}</dd></div>
              </dl>
              <div className={styles.actions}>
                <button type="button" className="salon-button" onClick={edit}>Angaben ändern</button>
                <button type="button" className="salon-button-secondary" onClick={clear}>Angaben löschen</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <noscript><p>Zum Ausprobieren muss JavaScript in Ihrem Browser aktiviert sein. Sonst können Sie das Formular nicht ausfüllen.</p></noscript>
              <fieldset disabled={!ready} className={styles.fields} aria-label="Terminanfrage zum Ausprobieren">
                <p className={styles.hint}>Name, E-Mail, Wunschdatum und Wunschzeit sind erforderlich. Wenn Sie keine Leistung wählen, wird eine Beratung in die Beispielanfrage übernommen.</p>
                <div className={styles.field}>
                  <label htmlFor="service">Gewünschte Leistung</label>
                  <select id="service" name="service" value={service} aria-describedby="service-detail" onChange={event => { setChosenService(event.target.value); setFormData(prev => ({ ...prev, desiredTime: "" })); setErrors(prev => ({ ...prev, desiredTime: undefined })); }}>
                    <option value="">Beratung zur passenden Leistung</option>
                    {allServices.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                  </select>
                  <p id="service-detail" className={styles.serviceDetail} aria-live="polite">{selected ? `${selected.price} · ${selected.duration}` : "Preis und Dauer werden bei der Beratung geklärt."}</p>
                </div>
                <div className={styles.pair}>
                  <div className={styles.field}>
                    <label htmlFor="desiredDate">Wunschdatum</label>
                    <input id="desiredDate" name="desiredDate" type="date" required min={today ? nextDate(today) : undefined} value={formData.desiredDate} onChange={change} aria-invalid={!!errors.desiredDate} aria-describedby={describedBy("desiredDate", "date-time-note")} />
                    {error("desiredDate")}
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="desiredTime">Wunschzeit</label>
                    <select id="desiredTime" name="desiredTime" required value={formData.desiredTime} onChange={change} aria-invalid={!!errors.desiredTime} aria-describedby={describedBy("desiredTime", "date-time-note")}>
                      <option value="">{!formData.desiredDate ? "Zuerst Datum wählen" : slots.length ? "Uhrzeit wählen" : "Keine Beispielzeiten"}</option>
                      {slots.map(time => <option key={time} value={time}>{time} Uhr</option>)}
                    </select>
                    {error("desiredTime")}
                  </div>
                </div>
                <p id="date-time-note" className={styles.hint}>Wählen Sie einen Tag ab morgen. Sonntags ist im Beispiel geschlossen. Die Zeiten passen zu den Öffnungszeiten; bei einer gewählten Leistung wird die längste angegebene Dauer berücksichtigt. Freie Termine werden nicht geprüft.</p>
                <div className={styles.field}>
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" required maxLength={100} value={formData.name} onChange={change} placeholder="Anna Beispiel" aria-invalid={!!errors.name} aria-describedby={describedBy("name")} />
                  {error("name")}
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">E-Mail</label>
                  <input id="email" name="email" type="email" inputMode="email" required maxLength={254} value={formData.email} onChange={change} placeholder="anna@example.com" aria-invalid={!!errors.email} aria-describedby={describedBy("email")} />
                  {error("email")}
                </div>
                <div className={styles.field}>
                  <label htmlFor="message">Nachricht <span>(optional)</span></label>
                  <textarea id="message" name="message" rows={4} maxLength={1000} value={formData.message} onChange={change} placeholder="Was möchten Sie ergänzen?" aria-invalid={!!errors.message} aria-describedby={describedBy("message", "message-hint")} />
                  <p id="message-hint" className={styles.hint}>Höchstens 1000 Zeichen.</p>
                  {error("message")}
                </div>
                <div className={styles.actions}>
                  <button type="submit" className="salon-button">Angaben prüfen</button>
                  <button type="button" className="salon-button-secondary" onClick={clear}>Angaben löschen</button>
                </div>
              </fieldset>
            </form>
          )}
        </div>
        <aside className={styles.visit} aria-label="Beispieladresse und Öffnungszeiten">
          <div>
            <h2>Ein fiktiver Salon in Zürich.</h2>
            <p>So könnte ein Salon seine Besuchsinformationen zeigen. Die Adresse und die Öffnungszeiten sind erfundene Beispiele.</p>
            <address>Salon Lumière<br />Beispieladresse 42<br />8001 Zürich</address>
            <p className={styles.hint}>Keine reale Kontaktadresse.</p>
          </div>
          <div>
            <h3>Öffnungszeiten im Beispiel</h3>
            <dl className={styles.hours}>{hours.map(([day, time]) => <div key={day}><dt>{day}</dt><dd>{time}</dd></div>)}</dl>
          </div>
        </aside>
      </section>
    </>
  );
}
