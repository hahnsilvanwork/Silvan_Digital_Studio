"use client";

import { useId, useRef, useState, type FormEvent } from "react";

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
  const confirmRef = useRef<HTMLAnchorElement>(null);

  const [values, setValues] = useState<ReviewInquiryValues>(
    EMPTY_REVIEW_INQUIRY,
  );
  const [errors, setErrors] = useState<ReviewInquiryErrors>({});
  const [inquiryUrl, setInquiryUrl] = useState<string | null>(null);

  const messageFor = (kind: ReviewInquiryErrorKind) => {
    if (kind === "quantity") return inquiry.quantityError;
    if (kind === "url") return inquiry.urlError;
    return inquiry.requiredError;
  };

  const update = (name: ReviewInquiryFieldName, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

  if (inquiryUrl) {
    return (
      <div className={styles.confirm}>
        {/* What is about to be sent, restated. The message itself leaves for
            WhatsApp and cannot be corrected afterwards, so the last screen
            before that has to show it rather than hide it behind "edit". */}
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
          ref={confirmRef}
          rel="noopener noreferrer"
          target="_blank"
        >
          {inquiry.submitLabel}
          <span className="visually-hidden">{content.a11y.externalLink}</span>
        </a>
        <button
          className={styles.editButton}
          data-touch-target
          onClick={() => setInquiryUrl(null)}
          type="button"
        >
          {inquiry.editLabel}
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit} ref={formRef}>
      <p className={styles.formIntro}>{inquiry.intro}</p>

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

      <button className={styles.submit} data-touch-target type="submit">
        {inquiry.submitLabel}
      </button>
    </form>
  );
}
