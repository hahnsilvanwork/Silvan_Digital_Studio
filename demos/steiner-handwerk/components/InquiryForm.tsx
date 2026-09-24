"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import {
  emptyDraft,
  fieldLimits,
  normalizeInquiry,
  serviceChoices,
  validateInquiry,
  type InquiryDraft,
  type InquiryErrors,
} from "../lib/inquiry";

export type Selection = { service: string; project: string };
const subscribeToHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export default function InquiryForm({
  selection,
  onSelectionChange,
}: {
  selection: Selection;
  onSelectionChange: (selection: Selection) => void;
}) {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    clientSnapshot,
    serverSnapshot,
  );
  const [draft, setDraft] = useState<InquiryDraft>({ ...emptyDraft });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [review, setReview] = useState<InquiryDraft | null>(null);
  const [previousSelection, setPreviousSelection] = useState(selection);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const focusName = useRef(false);

  // Reset only the review when another section changes the selected service/project.
  if (
    previousSelection.service !== selection.service ||
    previousSelection.project !== selection.project
  ) {
    setPreviousSelection(selection);
    setReview(null);
  }

  useEffect(() => {
    if (review) summaryRef.current?.focus();
  }, [review]);
  useEffect(() => {
    if (focusName.current && !review) {
      nameRef.current?.focus();
      focusName.current = false;
    }
  });

  function update(field: keyof InquiryDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hydrated) return;
    const nextErrors = validateInquiry(draft);
    setErrors(nextErrors);
    const firstError = (Object.keys(nextErrors) as (keyof InquiryDraft)[])[0];
    if (firstError) {
      formRef.current
        ?.querySelector<HTMLElement>(`#inquiry-${firstError}`)
        ?.focus();
      return;
    }
    setReview(normalizeInquiry(draft));
  }

  function clear() {
    setDraft({ ...emptyDraft });
    setErrors({});
    setReview(null);
    onSelectionChange({ service: "Noch offen", project: "" });
    focusName.current = true;
  }

  function field(
    fieldName: Exclude<keyof InquiryDraft, "message">,
    label: string,
    required = false,
  ) {
    return (
      <div className="field">
        <label htmlFor={`inquiry-${fieldName}`}>
          {label}
          {required ? " *" : " (optional)"}
        </label>
        <input
          ref={fieldName === "name" ? nameRef : undefined}
          id={`inquiry-${fieldName}`}
          type={fieldName === "email" ? "email" : "text"}
          autoComplete={
            fieldName === "name"
              ? "name"
              : fieldName === "email"
                ? "email"
                : fieldName === "location"
                  ? "address-level2"
                  : "off"
          }
          required={required}
          maxLength={fieldLimits[fieldName]}
          value={draft[fieldName]}
          onChange={(event) => update(fieldName, event.target.value)}
          aria-invalid={errors[fieldName] ? true : undefined}
          aria-describedby={
            errors[fieldName] ? `inquiry-${fieldName}-error` : undefined
          }
        />
        {errors[fieldName] && (
          <p className="field-error" id={`inquiry-${fieldName}-error`}>
            {errors[fieldName]}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="inquiry-form">
      <p className="form-note" id="inquiry-privacy">
        <strong>Dies ist eine fiktive Demo.</strong> Ihre Angaben werden nur
        hier zur Prüfung angezeigt. Es wird nichts versendet oder in einem
        Browser-Speicher gespeichert. Bitte verwenden Sie Beispieldaten.
      </p>
      <noscript>
        <p className="form-note">
          Für die lokale Vorschau benötigen Sie JavaScript. Das Formular ist
          deshalb deaktiviert.
        </p>
      </noscript>
      {review ? (
        <div
          className="inquiry-summary"
          ref={summaryRef}
          tabIndex={-1}
          role="region"
          aria-label="Zusammenfassung Ihrer Beispielanfrage"
          data-testid="inquiry-summary"
        >
          <h3>Ihre Beispielanfrage im Überblick</h3>
          <p className="form-note">
            Nur eine Vorschau. Diese Anfrage wurde nicht versendet.
          </p>
          <dl>
            <dt>Leistung</dt>
            <dd>{selection.service || "Noch offen"}</dd>
            {selection.project && (
              <>
                <dt>Projekt als Inspiration</dt>
                <dd>{selection.project}</dd>
              </>
            )}
            <dt>Name</dt>
            <dd>{review.name}</dd>
            <dt>E-Mail</dt>
            <dd>{review.email}</dd>
            {review.location && (
              <>
                <dt>Ort</dt>
                <dd>{review.location}</dd>
              </>
            )}
            {review.timeframe && (
              <>
                <dt>Zeitraum</dt>
                <dd>{review.timeframe}</dd>
              </>
            )}
            <dt>Ihr Vorhaben</dt>
            <dd style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
              {review.message}
            </dd>
          </dl>
          <div className="form-actions">
            <button
              className="button"
              type="button"
              onClick={() => {
                setReview(null);
                focusName.current = true;
              }}
            >
              Angaben ändern
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={clear}
            >
              Angaben löschen
            </button>
          </div>
        </div>
      ) : (
        <form
          ref={formRef}
          noValidate
          onSubmit={submit}
          aria-describedby="inquiry-privacy"
        >
          <fieldset disabled={!hydrated}>
            <legend>Ihr Vorhaben · * Pflichtfelder</legend>
            <div className="field">
              <label htmlFor="inquiry-service">Gewünschte Leistung</label>
              <select
                id="inquiry-service"
                value={selection.service || "Noch offen"}
                onChange={(event) =>
                  onSelectionChange({
                    ...selection,
                    service: event.target.value,
                  })
                }
              >
                {serviceChoices.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            {selection.project && (
              <div className="selection-note">
                <p>
                  Projekt als Inspiration: <strong>{selection.project}</strong>
                </p>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() =>
                    onSelectionChange({ ...selection, project: "" })
                  }
                >
                  Projektauswahl entfernen
                </button>
              </div>
            )}
            <div className="field-pair">
              {field("name", "Name", true)}
              {field("email", "E-Mail", true)}
            </div>
            <div className="field-pair">
              {field("location", "Ort des Vorhabens")}
              {field("timeframe", "Gewünschter Zeitraum")}
            </div>
            <div className="field">
              <label htmlFor="inquiry-message">Was haben Sie vor? *</label>
              <textarea
                id="inquiry-message"
                rows={5}
                required
                maxLength={fieldLimits.message}
                value={draft.message}
                onChange={(event) => update("message", event.target.value)}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={
                  errors.message
                    ? "inquiry-message-hint inquiry-message-error"
                    : "inquiry-message-hint"
                }
              />
              <p id="inquiry-message-hint" className="form-note">
                Maximal 2000 Zeichen. Ein paar Sätze zu Ihrem Vorhaben genügen.
              </p>
              {errors.message && (
                <p className="field-error" id="inquiry-message-error">
                  {errors.message}
                </p>
              )}
            </div>
            {Object.values(errors).some(Boolean) && (
              <p className="field-error" role="alert">
                Bitte prüfen Sie die markierten Felder.
              </p>
            )}
            <div className="form-actions">
              <button className="button" type="submit">
                Angaben prüfen
              </button>
              <button
                className="button button-secondary"
                type="button"
                onClick={clear}
              >
                Angaben löschen
              </button>
            </div>
          </fieldset>
        </form>
      )}
    </div>
  );
}
