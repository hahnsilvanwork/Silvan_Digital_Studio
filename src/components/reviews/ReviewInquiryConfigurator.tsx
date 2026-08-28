"use client";

import {
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import type { Locale, ReviewInquiryFieldName } from "../../content/types";
import { getContent } from "../../lib/locales";
import {
  EMPTY_REVIEW_INQUIRY,
  validateReviewInquiry,
  type ReviewInquiryErrorKind,
  type ReviewInquiryErrors,
  type ReviewInquiryValues,
} from "../../lib/validation";
import { buildReviewInquiryUrl } from "../../lib/whatsapp";
import styles from "./review-inquiry.module.css";

interface ReviewInquiryConfiguratorProps {
  readonly locale: Locale;
}

export function ReviewInquiryConfigurator({
  locale,
}: ReviewInquiryConfiguratorProps) {
  const content = getContent(locale);
  const { inquiry } = content.reviews;
  const fieldPrefix = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const confirmRef = useRef<HTMLHeadingElement>(null);

  const [values, setValues] = useState<ReviewInquiryValues>(
    EMPTY_REVIEW_INQUIRY,
  );
  const [errors, setErrors] = useState<ReviewInquiryErrors>({});
  const [inquiryUrl, setInquiryUrl] = useState<string | null>(null);

  const errorCount = Object.keys(errors).length;

  const messageFor = (kind: ReviewInquiryErrorKind) => {
    if (kind === "quantity") return inquiry.quantityError;
    if (kind === "url") return inquiry.urlError;
    return inquiry.requiredError;
  };

  const update = (name: ReviewInquiryFieldName, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const submit = () => {
    const nextErrors = validateReviewInquiry(values);
    setErrors(nextErrors);

    const firstInvalid = inquiry.fields.find(
      (field) => nextErrors[field.name] !== undefined,
    );

    if (firstInvalid) {
      // Send focus to the first field that actually needs correcting rather
      // than leaving the visitor to hunt for the message.
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)
        ?.focus();
      setInquiryUrl(null);
      return;
    }

    setInquiryUrl(buildReviewInquiryUrl(values, locale));
    window.requestAnimationFrame(() => confirmRef.current?.focus());
  };

  /**
   * The form has no `action`, so a native submit would GET the current URL with
   * every field in the query string -- the visitor's name, company and full
   * postal address into browser history, the Referer of the next request and
   * the server log, on a form that promises none of it is stored here. This
   * enquiry cannot work without JavaScript anyway (it builds a wa.me link in
   * the browser), so there is no native path to preserve: the button is a plain
   * button and Enter is handled explicitly, which keeps implicit submission for
   * keyboard users without ever handing the browser a form to send.
   */
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key !== "Enter") return;

    const target = event.target as HTMLElement;
    // A textarea takes Enter as a newline, and a button already turns Enter
    // into a click -- handling it here too would run the submit twice.
    if (target.tagName === "TEXTAREA" || target.tagName === "BUTTON") return;

    event.preventDefault();
    submit();
  };

  if (inquiryUrl) {
    return (
      <div className={styles.confirm}>
        {/* What is about to be sent, restated. The message itself leaves for
            WhatsApp and cannot be corrected afterwards, so the last screen
            before that has to show it rather than hide it behind "edit".
            Focus lands on this heading rather than on the send link: landing on
            the link announced only "open in WhatsApp", leaving the visitor one
            keypress from sending a message they were never told they could
            check. */}
        <h3 className={styles.confirmTitle} ref={confirmRef} tabIndex={-1}>
          {inquiry.confirmTitle}
        </h3>
        <dl className={styles.summary}>
          {inquiry.fields
            .filter((field) => values[field.name].trim() !== "")
            .map((field) => (
              <div className={styles.summaryRow} key={field.name}>
                <dt className={styles.summaryLabel}>{field.label}</dt>
                <dd className={styles.summaryValue}>{values[field.name]}</dd>
              </div>
            ))}
        </dl>
        <p className={styles.confirmNotice}>{inquiry.nonBindingNotice}</p>
        <a
          className={styles.confirmLink}
          data-touch-target
          href={inquiryUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {inquiry.submitLabel}
          <span className="visually-hidden">{content.a11y.externalLink}</span>
        </a>
        <button
          className={styles.editButton}
          data-touch-target
          onClick={() => {
            setInquiryUrl(null);
            // Returning to the form used to drop focus on <body>, which puts a
            // keyboard visitor silently back at the top of the document. Send
            // it to the first control instead, mirroring the submit path.
            window.requestAnimationFrame(() =>
              formRef.current
                ?.querySelector<HTMLElement>("[name]")
                ?.focus(),
            );
          }}
          type="button"
        >
          {inquiry.editLabel}
        </button>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      noValidate
      onKeyDown={handleKeyDown}
      onSubmit={handleFormSubmit}
      ref={formRef}
    >
      <p className={styles.formIntro}>{inquiry.intro}</p>

      {/* Submitting an empty form marks up to eight fields at once. Focus goes
          to the first, so a screen reader announces that one and nothing about
          the others. This says how many there are. */}
      <p aria-live="polite" className={styles.errorSummary} role="status">
        {errorCount > 0 ? inquiry.errorSummary(errorCount) : ""}
      </p>

      <div className={styles.fields}>
        {inquiry.fields.map((field) => {
          const fieldId = `${fieldPrefix}-${field.name}`;
          const errorId = `${fieldId}-error`;
          const error = errors[field.name];

          return (
            <p className={styles.field} key={field.name}>
              {/* The optional field names itself as optional in the copy, so
                  no separate marker is needed here. */}
              <label className={styles.label} htmlFor={fieldId}>
                {field.label}
              </label>

              {field.name === "product" ? (
                <select
                  aria-describedby={error ? errorId : undefined}
                  aria-invalid={error ? true : undefined}
                  aria-required={field.required || undefined}
                  className={styles.control}
                  id={fieldId}
                  name={field.name}
                  onChange={(event) => update(field.name, event.target.value)}
                  value={values[field.name]}
                >
                  <option value="">{field.placeholder}</option>
                  {inquiry.productOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.name === "note" ? (
                <textarea
                  className={styles.control}
                  id={fieldId}
                  name={field.name}
                  onChange={(event) => update(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  value={values[field.name]}
                />
              ) : (
                <input
                  aria-describedby={error ? errorId : undefined}
                  aria-invalid={error ? true : undefined}
                  aria-required={field.required || undefined}
                  autoComplete={field.autoComplete}
                  className={styles.control}
                  id={fieldId}
                  inputMode={field.name === "quantity" ? "numeric" : undefined}
                  name={field.name}
                  onChange={(event) => update(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  type={field.name === "googleUrl" ? "url" : "text"}
                  value={values[field.name]}
                />
              )}

              {error ? (
                <span className={styles.error} id={errorId}>
                  {messageFor(error)}
                </span>
              ) : null}
            </p>
          );
        })}
      </div>

      <p className={styles.privacy}>{inquiry.privacyNotice}</p>

      <button
        className={styles.submit}
        data-touch-target
        onClick={submit}
        type="button"
      >
        {inquiry.submitLabel}
      </button>
    </form>
  );
}
