"use client";



import Image from "next/image";

import {

  useId,

  Fragment,

  useEffect,

  useRef,

  useState,

  useSyncExternalStore,

  type FormEvent,

  type KeyboardEvent,

} from "react";



import type { Locale, ReviewInquiryFieldName } from "../../content/types";

import { getContent } from "../../lib/locales";

import { consumeInquiryDraft, DRAFT_REQUEST, type DraftRequest } from "../../lib/inquiry-draft";

import { inquiryCopy } from "../../content/inquiry-copy";

import { InquiryEstimate } from './InquiryEstimate';

import { InquirySuggestions } from './InquirySuggestions';

import {

  EMPTY_REVIEW_INQUIRY,

  INQUIRY_LIMITS,

  requiredInquiryFields,

  validateReviewInquiry,

  visibleInquiryFields,

  type ReviewInquiryErrorKind,

  type ReviewInquiryErrors,

  type ReviewInquiryValues,

} from "../../lib/validation";

import { buildReviewInquiryUrl, buildReviewInquiryEmail, buildReviewInquiryMessage, inquiryDisplayValue } from "../../lib/whatsapp";

import styles from "./review-inquiry.module.css";

import { applyInquiryPreset, getInquiryPreset, getMatchingInquiryModels } from "../../lib/inquiry-selection";

import { useCatalogueSelection, setCatalogueSelection } from "./use-catalogue-selection";

import { trackInquiryEvent } from "../../lib/telemetry-client";



interface ReviewInquiryConfiguratorProps {

  readonly locale: Locale;

}



const subscribeHydration = () => () => {};

const clientReady = () => true;

const serverReady = () => false;



function focusInquiryStart(form: HTMLFormElement | null) {

  // A late selection effect must not interrupt someone already typing.

  if (!form || (form.contains(document.activeElement) && document.activeElement?.hasAttribute("name"))) return;

  form.querySelector<HTMLElement>("[name]")?.focus({ preventScroll: true });

}



export function ReviewInquiryConfigurator({

  locale,

}: ReviewInquiryConfiguratorProps) {

  const content = getContent(locale);

  const hydrated = useSyncExternalStore(subscribeHydration, clientReady, serverReady);

  const { inquiry } = content.reviews;

  const copy = inquiryCopy[locale];

  const fieldPrefix = useId();

  const formRef = useRef<HTMLFormElement>(null);

  const confirmRef = useRef<HTMLHeadingElement>(null);

  const pendingModelFocus = useRef(false);

  const checkedTransfer = useRef(false);



  const [values, setValues] = useState<ReviewInquiryValues>(

    EMPTY_REVIEW_INQUIRY,

  );

  const [errors, setErrors] = useState<ReviewInquiryErrors>({});

  const [inquiryUrl, setInquiryUrl] = useState<string | null>(null);

  const [copyStatus, setCopyStatus] = useState<"" | "copied" | "failed">("");

  const [adjustingSelection, setAdjustingSelection] = useState(false);

  const selection = useCatalogueSelection();

  const model = content.reviews.catalog.find((product) => product.id === selection.modelId);

  const modelTitle = model?.title;

  const matchingModels = getMatchingInquiryModels(content.reviews.catalog, values);

  const preset = getInquiryPreset(selection.modelId);

  const fixedFields = new Set<ReviewInquiryFieldName>(model && preset && !adjustingSelection

    ? (Object.keys(preset) as (keyof typeof preset)[]).filter(name =>

        preset[name] !== "" && values[name] === preset[name] &&

        !(name === "destination" && values.product === "nfc-chip"))

    : []);



  useEffect(() => {

    const preset = getInquiryPreset(selection.modelId);

    const frame = window.requestAnimationFrame(() => {

      if (!checkedTransfer.current) {

        checkedTransfer.current = true;

        let draft = null;

        try { draft = consumeInquiryDraft(window.sessionStorage, `${window.location.pathname}${window.location.search}${window.location.hash}`); } catch { /* Ordinary form still works without storage. */ }

        if (draft) {

          setValues(draft.values);

          setAdjustingSelection(draft.adjustingSelection);

          setInquiryUrl(draft.preview && Object.keys(validateReviewInquiry(draft.values)).length === 0 ? buildReviewInquiryUrl(draft.values, locale, modelTitle) : null);

          return;

        }

      }

      pendingModelFocus.current = Boolean(preset && window.location.hash === "#inquiry");

      if (preset) setValues((current) => applyInquiryPreset(current, selection.modelId));

      setAdjustingSelection(false);

      setInquiryUrl(null);

      setErrors({});

      setCopyStatus("");

    });

    return () => window.cancelAnimationFrame(frame);

  }, [selection.modelId, selection.category, locale, modelTitle]);



  useEffect(() => {

    if (pendingModelFocus.current) {

      pendingModelFocus.current = false;

      focusInquiryStart(formRef.current);

    }

  }, [values]);



  useEffect(() => {

    let frame = 0;

    const reopen = (event: Event) => {

      setInquiryUrl(null);

      setCopyStatus("");

      frame = window.requestAnimationFrame(() => {

        if ((event as CustomEvent<{focusInquiry?: boolean}>).detail?.focusInquiry && window.location.hash === "#inquiry") focusInquiryStart(formRef.current);

      });

    };

    window.addEventListener("silvan:catalogue-selection", reopen);

    return () => { window.removeEventListener("silvan:catalogue-selection", reopen); window.cancelAnimationFrame(frame); };

  }, []);



  useEffect(() => {

    const prepare = (event: Event) => {

      if (!Object.values(values).some(Boolean)) return;

      (event as CustomEvent<DraftRequest>).detail.draft = { values, preview: inquiryUrl !== null, adjustingSelection };

    };

    window.addEventListener(DRAFT_REQUEST, prepare);

    return () => window.removeEventListener(DRAFT_REQUEST, prepare);

  }, [values, inquiryUrl, adjustingSelection]);



  const errorCount = Object.keys(errors).length;

  const visibleFields = new Set(visibleInquiryFields(values));

  const requiredFields = new Set(requiredInquiryFields(values));



  const optionsFor = (name: ReviewInquiryFieldName) => {

    if (name === "destination") return inquiry.destinationOptions;

    if (name === "product") return inquiry.productOptions;

    if (name === "shape") return inquiry.shapeOptions;

    if (name === "size") return values.shape === "rectangle" || values.product === 'nfc-chip'

      ? inquiry.sizeOptions.filter((option) => option.value === "confirm")

      : inquiry.sizeOptions.map(option => values.shape === "round" && ["80", "100"].includes(option.value) ? { ...option, label: `Ø ${option.value} mm` } : option);

    if (name === "setup") return inquiry.setupOptions;

    return null;

  };



  const messageFor = (kind: ReviewInquiryErrorKind) => {

    if (kind === "quantity") return inquiry.quantityError;

    if (kind === "url") return inquiry.urlError;

    if (kind === "length") return copy.lengthError;

    return inquiry.requiredError;

  };



  const update = (name: ReviewInquiryFieldName, value: string) => {

    if (model && (["product", "shape"].includes(name) || (name === "destination" && values.product !== "nfc-chip"))) setCatalogueSelection(model.category);

    setValues((current) => ({ ...current, [name]: value,

      ...(name === 'product' ? { shape: '', size: value === 'nfc-chip' ? 'confirm' : '' } : {}),

      ...(name === "shape" ? { size: value === "rectangle" || current.product === 'nfc-chip' ? "confirm" : "" } : {}) }));

    setErrors({});

    setInquiryUrl(null);

    setCopyStatus("");

  };



  const submit = () => {

    const nextErrors = validateReviewInquiry(values);

    setErrors(nextErrors);



    const firstInvalid = inquiry.fields.find(

      (field) => visibleFields.has(field.name) && nextErrors[field.name] !== undefined,

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



    setInquiryUrl(buildReviewInquiryUrl(values, locale, modelTitle));

    trackInquiryEvent("inquiry_reviewed");

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

    if (event.key !== "Enter" || event.defaultPrevented || event.nativeEvent.isComposing) return;



    const target = event.target as HTMLElement;

    // Only single-line inputs use Enter to review. Selects keep their native

    // selection keys, textareas keep newlines, and buttons activate by click.

    if (target.tagName !== "INPUT") return;



    event.preventDefault();

    submit();

  };



  if (inquiryUrl) {

    return (

      <div className={styles.confirm} data-inquiry-summary>

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

          {modelTitle ? <div className={styles.summaryRow}><dt className={styles.summaryLabel}>{copy.model}</dt><dd className={styles.summaryValue}>{modelTitle}</dd></div> : null}

          {inquiry.fields

            .filter(

              (field) =>

                visibleFields.has(field.name) &&

                values[field.name].trim() !== "",

            )

            .map((field) => (

              <div className={styles.summaryRow} key={field.name}>

                <dt className={styles.summaryLabel}>{field.label}</dt>

                <dd className={styles.summaryValue}>{inquiryDisplayValue(values, field.name, locale)}</dd>

              </div>

            ))}

        </dl>

        <InquiryEstimate product={values.product} quantity={values.quantity} locale={locale} />

        <p className={styles.confirmNotice}>{inquiry.nonBindingNotice}</p>

        <p className={styles.privacy}>{copy.transfer}</p>

        <a

          className={styles.confirmLink}

          data-touch-target

          href={buildReviewInquiryUrl(values, locale, modelTitle)}

          onClick={() => trackInquiryEvent("inquiry_whatsapp_opened")}

          rel="noopener noreferrer"

          target="_blank"

        >

          {inquiry.submitLabel}

          <span className="visually-hidden">{content.a11y.externalLink}</span>

        </a>

        <div className={styles.alternatives}>

          <a className={styles.editButton} data-touch-target href={buildReviewInquiryEmail(values, locale, modelTitle)} onClick={() => trackInquiryEvent("inquiry_email_opened")}>{copy.email}</a>

          <button className={styles.editButton} data-touch-target type="button" onClick={async () => {

            try {

              await navigator.clipboard.writeText(buildReviewInquiryMessage(values, locale, modelTitle));

              setCopyStatus("copied");

              trackInquiryEvent("inquiry_copied");

            } catch { setCopyStatus("failed"); }

          }}>{copy.copy}</button>

        </div>

        <p role="status" aria-live="polite">{copyStatus === "copied" ? copy.copied : copyStatus === "failed" ? copy.copyFailed : ""}</p>

        {copyStatus === "failed" ? <label className={styles.field}>{copy.text}<textarea className={styles.control} readOnly rows={8} value={buildReviewInquiryMessage(values, locale, modelTitle)} onFocus={(event) => event.target.select()} /></label> : null}

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

      <p className={styles.formIntro}>{model ? copy.remaining : inquiry.intro}</p>

      {model ? <section className={styles.modelSelection} data-testid="inquiry-model" aria-label={copy.model}>

        <div className={styles.modelHeading}>

          <Image src={model.image.src} alt={model.image.alt} width={112} height={112} className={styles.modelImage} />

          <div>

            <p className={styles.modelTitle} role="status">{model.title}</p>

            <p className={styles.modelPrice}>{model.price}</p>

            <p className={styles.hint}>{copy.modelPriceHint}</p>

          </div>

        </div>

        {fixedFields.size > 0 ? <details className={styles.modelDetails}>

          <summary>{copy.modelDetails}</summary>

          <dl className={styles.modelFacts}>

          {inquiry.fields.filter(field => fixedFields.has(field.name) && visibleFields.has(field.name)).map(field =>

            <div className={styles.summaryRow} key={field.name}><dt className={styles.summaryLabel}>{field.label}</dt><dd className={styles.summaryValue}>{inquiryDisplayValue(values, field.name, locale)}</dd></div>)}

          </dl>

          <p className={styles.hint}>{copy.selected}</p>

        </details> : null}

        {!adjustingSelection ? <button className={styles.editButton} type="button" data-touch-target onClick={() => {

          setAdjustingSelection(true);

          window.requestAnimationFrame(() => focusInquiryStart(formRef.current));

        }}>{copy.adjustSelection}</button> : null}

      </section> : null}



      {/* Submitting an empty form marks up to eight fields at once. Focus goes

          to the first, so a screen reader announces that one and nothing about

          the others. This says how many there are. */}

      <p aria-live="polite" className={styles.errorSummary} role="status">

        {errorCount > 0 ? inquiry.errorSummary(errorCount) : ""}

      </p>



      <div className={styles.fields}>

        {inquiry.fields.filter((field) => visibleFields.has(field.name) && !fixedFields.has(field.name)).map((field) => {

          const fieldId = `${fieldPrefix}-${field.name}`;

          const errorId = `${fieldId}-error`;

          const error = errors[field.name];

          const options = optionsFor(field.name);



          return (

            <Fragment key={field.name}>

            {field.name === 'quantity' && !model && values.product ? <InquirySuggestions

              key={`${values.product}:${values.destination}:${values.shape}`}

              models={matchingModels} locale={locale} onSelect={nextModel => setCatalogueSelection(nextModel.category, nextModel.id, true)}

            /> : null}

            <div className={`${styles.field} ${field.name === "note" || field.name === "destinationUrl" ? styles.fieldWide : ""}`}>

              {/* The optional field names itself as optional in the copy, so

                  no separate marker is needed here. */}

              <label className={styles.label} htmlFor={fieldId}>

                {field.label}

              </label>



              {options ? (

                <select

                  disabled={!hydrated}

                  aria-describedby={error ? errorId : undefined}

                  aria-invalid={error ? true : undefined}

                  aria-required={requiredFields.has(field.name) || undefined}

                  className={styles.control}

                  id={fieldId}

                  name={field.name}

                  onChange={(event) => update(field.name, event.target.value)}

                  value={values[field.name]}

                >

                  <option value="">{field.placeholder}</option>

                  {options.map((option) => (

                    <option key={option.value} value={option.value}>

                      {option.label}

                    </option>

                  ))}

                </select>

              ) : field.name === "note" ? (

                <textarea

                  disabled={!hydrated}

                  aria-describedby={error ? errorId : `${fieldId}-hint`}

                  aria-invalid={error ? true : undefined}

                  className={styles.control}

                  id={fieldId}

                  name={field.name}

                  onChange={(event) => update(field.name, event.target.value)}

                  placeholder={field.placeholder}

                  rows={3}

                  maxLength={INQUIRY_LIMITS.note}

                  value={values[field.name]}

                />

              ) : (

                <input

                  disabled={!hydrated}

                  aria-describedby={error ? errorId : INQUIRY_LIMITS[field.name] ? `${fieldId}-hint` : undefined}

                  aria-invalid={error ? true : undefined}

                  aria-required={requiredFields.has(field.name) || undefined}

                  autoComplete={field.autoComplete}

                  className={styles.control}

                  id={fieldId}

                  inputMode={field.name === "quantity" ? "numeric" : undefined}

                  name={field.name}

                  maxLength={INQUIRY_LIMITS[field.name]}

                  spellCheck={field.name === "destinationUrl" ? false : undefined}

                  onChange={(event) => update(field.name, event.target.value)}

                  placeholder={field.placeholder}

                  type={field.name === "destinationUrl" ? "url" : "text"}

                  value={values[field.name]}

                />

              )}



              <div className={styles.fieldMessages}>

              {INQUIRY_LIMITS[field.name] ? <span className={styles.hint} id={`${fieldId}-hint`}>

                {field.name === "quantity" ? copy.quantityHint : `${values[field.name].length}/${INQUIRY_LIMITS[field.name]} ${copy.characters}`}

              </span> : null}



              {error ? (

                <span className={styles.error} id={errorId}>

                  {messageFor(error)}

                </span>

              ) : null}

              </div>

            </div>

            </Fragment>

          );

        })}

      </div>



      <InquiryEstimate product={values.product} quantity={values.quantity} locale={locale} />

      <p className={styles.privacy}>{copy.draftNotice}</p>



      <button

        className={styles.submit}

        disabled={!hydrated}

        data-touch-target

        onClick={submit}

        type="button"

      >

        {copy.review}

      </button>

    </form>

  );

}

