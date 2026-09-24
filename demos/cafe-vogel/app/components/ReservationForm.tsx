"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  availableTimes,
  emptyReservation,
  limits,
  validateReservation,
  zurichClock,
} from "../data/reservation";
import type { Reservation, ReservationErrors } from "../data/reservation";

const subscribeToReadiness = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export default function ReservationForm() {
  const ready = useSyncExternalStore(
    subscribeToReadiness,
    clientReady,
    serverReady,
  );
  const [form, setForm] = useState<Reservation>({ ...emptyReservation });
  const [errors, setErrors] = useState<ReservationErrors>({});
  const [review, setReview] = useState(false);
  const focusName = useRef(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const times = ready ? availableTimes(form.date, form.holiday) : [];

  useEffect(() => {
    if (review) summaryRef.current?.focus();
    else if (focusName.current) {
      nameRef.current?.focus();
      focusName.current = false;
    }
  }, [review]);

  const change = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "date" ? { time: "" } : {}),
    }));
    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
      ...(name === "date" ? { time: undefined } : {}),
    }));
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ready) return;
    const result = validateReservation(form);
    setErrors(result.errors);
    if (result.valid) {
      setForm(result.value);
      setReview(true);
    } else document.getElementById(Object.keys(result.errors)[0])?.focus();
  };
  const returnToForm = (clear = false) => {
    if (clear) setForm({ ...emptyReservation });
    setErrors({});
    focusName.current = true;
    setReview(false);
    if (!review) {
      nameRef.current?.focus();
      focusName.current = false;
    }
  };
  const error = (key: keyof Reservation) =>
    errors[key] ? (
      <p className="field-error" id={`${key}-error`}>
        {errors[key]}
      </p>
    ) : null;
  const describedBy = (key: keyof Reservation) =>
    errors[key] ? `${key}-error` : undefined;

  if (review)
    return (
      <div
        className="reservation-summary"
        data-testid="reservation-summary"
        ref={summaryRef}
        tabIndex={-1}
        aria-labelledby="summary-title"
      >
        <h3 id="summary-title">Ihre Angaben im Überblick</h3>
        <p>Unversendet: Dies ist nur eine Vorschau Ihrer Eingaben.</p>
        <dl>
          <div>
            <dt>Name</dt>
            <dd>{form.name}</dd>
          </div>
          <div>
            <dt>E-Mail</dt>
            <dd>{form.email}</dd>
          </div>
          <div>
            <dt>Telefon</dt>
            <dd>{form.phone || "Nicht angegeben"}</dd>
          </div>
          <div>
            <dt>Personen</dt>
            <dd>
              {form.persons === "more" ? "Mehr als 8 (Anfrage)" : form.persons}
            </dd>
          </div>
          <div>
            <dt>Datum</dt>
            <dd>{form.date.split("-").reverse().join(".")}</dd>
          </div>
          <div>
            <dt>Wunschzeit</dt>
            <dd>{form.time} Uhr</dd>
          </div>
          <div>
            <dt>Feiertagszeiten</dt>
            <dd>{form.holiday ? "Ja" : "Nein"}</dd>
          </div>
          <div>
            <dt>Wünsche &amp; Anmerkungen</dt>
            <dd>{form.message || "Nicht angegeben"}</dd>
          </div>
        </dl>
        <div className="form-actions">
          <button
            type="button"
            className="cafe-button"
            onClick={() => returnToForm()}
          >
            Angaben ändern
          </button>
          <button
            type="button"
            className="cafe-button button-secondary"
            onClick={() => returnToForm(true)}
          >
            Angaben löschen
          </button>
        </div>
      </div>
    );

  return (
    <form
      className="reservation-form"
      onSubmit={submit}
      noValidate
      aria-describedby="demo-note"
    >
      <noscript>
        <p>
          Zum Ausprobieren bitte JavaScript aktivieren. Das Formular bleibt
          sonst deaktiviert.
        </p>
      </noscript>
      <fieldset disabled={!ready} aria-label="Besuch ausprobieren">
        <p>* Pflichtfelder</p>
        {Object.keys(errors).some(
          (key) => errors[key as keyof Reservation],
        ) && (
          <p className="field-error" role="alert">
            Bitte prüfen Sie die markierten Angaben.
          </p>
        )}
        {(
          [
            {
              id: "name",
              label: "Name *",
              type: "text",
              placeholder: "Beispielname",
            },
            {
              id: "email",
              label: "E-Mail *",
              type: "email",
              placeholder: "name@example.com",
            },
            {
              id: "phone",
              label: "Telefon (optional)",
              type: "tel",
              placeholder: "",
            },
          ] as const
        ).map(({ id, label, type, placeholder }) => (
          <div className="field" key={id}>
            <label htmlFor={id}>{label}</label>
            <input
              ref={id === "name" ? nameRef : undefined}
              id={id}
              name={id}
              type={type}
              value={form[id]}
              onChange={change}
              required={id !== "phone"}
              maxLength={limits[id]}
              placeholder={placeholder}
              autoComplete="off"
              aria-invalid={Boolean(errors[id])}
              aria-describedby={describedBy(id)}
            />
            {error(id)}
          </div>
        ))}
        <div className="field-pair">
          <div className="field">
            <label htmlFor="persons">Personen *</label>
            <select
              id="persons"
              name="persons"
              value={form.persons}
              onChange={change}
              required
              aria-invalid={Boolean(errors.persons)}
              aria-describedby={describedBy("persons")}
            >
              <option value="">Anzahl wählen</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                <option value={number} key={number}>
                  {number} {number === 1 ? "Person" : "Personen"}
                </option>
              ))}
              <option value="more">Mehr als 8 (Anfrage)</option>
            </select>
            {error("persons")}
          </div>
          <div className="field">
            <label htmlFor="date">Datum *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              min={ready ? zurichClock().date : undefined}
              onChange={change}
              required
              aria-invalid={Boolean(errors.date)}
              aria-describedby={describedBy("date")}
            />
            {error("date")}
          </div>
        </div>
        <div className="holiday-field">
          <label htmlFor="holiday">
            <input
              type="checkbox"
              id="holiday"
              name="holiday"
              checked={form.holiday}
              onChange={(event) => {
                setForm((previous) => ({
                  ...previous,
                  holiday: event.target.checked,
                  time: "",
                }));
                setErrors((previous) => ({ ...previous, time: undefined }));
              }}
            />{" "}
            Feiertagszeiten ausprobieren
          </label>
        </div>
        <div className="field">
          <label htmlFor="time">Wunschzeit *</label>
          <select
            id="time"
            name="time"
            value={form.time}
            onChange={change}
            disabled={!form.date}
            required
            aria-invalid={Boolean(errors.time)}
            aria-describedby={["time-help", describedBy("time")]
              .filter(Boolean)
              .join(" ")}
          >
            <option value="">
              {!form.date
                ? "Zuerst Datum wählen"
                : !times.length
                  ? "Keine Zeiten – anderes Datum wählen"
                  : "Uhrzeit wählen"}
            </option>
            {times.map((time) => (
              <option value={time} key={time}>
                {time} Uhr
              </option>
            ))}
          </select>
          <p id="time-help">
            Wunschzeiten gemäss Öffnungszeiten in Zürich. Feiertage wählen Sie
            manuell; freie Plätze werden nicht geprüft.
          </p>
          {error("time")}
        </div>
        <div className="field">
          <label htmlFor="message">Wünsche &amp; Anmerkungen (optional)</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={change}
            rows={4}
            maxLength={limits.message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
          />
          {error("message")}
        </div>
        <div className="form-actions">
          <button type="submit" className="cafe-button">
            Angaben prüfen
          </button>
          <button
            type="button"
            className="cafe-button button-secondary"
            onClick={() => returnToForm(true)}
          >
            Angaben löschen
          </button>
        </div>
      </fieldset>
    </form>
  );
}
