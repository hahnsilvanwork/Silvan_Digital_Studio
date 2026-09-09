"use client";



import Link from "next/link";

import { DRAFT_REQUEST, saveInquiryDraft, type DraftRequest } from "../../lib/inquiry-draft";



import type { Locale } from "../../content/types";

import { getContent } from "../../lib/locales";

import { SUPPORTED_LOCALES } from "../../lib/locales";

import { switchLocale } from "../../lib/routes";

import styles from "../layout/navigation.module.css";

import { useCatalogueSelection } from "../reviews/use-catalogue-selection";

import { useServiceReason, useWebsiteTier } from "../contact/use-service-reason";



interface LanguageSwitcherProps {

  readonly locale: Locale;

  readonly currentPath: string;

}



/**

 * Two links, so switching language keeps the visitor on the equivalent route.

 * They render as real anchors, so the switch still works without client

 * JavaScript -- next/link only adds prefetching and client-side navigation on

 * top of that.

 */

export function LanguageSwitcher({ locale, currentPath }: LanguageSwitcherProps) {

  const { navigation } = getContent(locale);

  const selection = useCatalogueSelection();

  const serviceReason = useServiceReason();
  const websiteTier = useWebsiteTier();

  const pathname = currentPath.split(/[?#]/)[0];

  const isCatalogue = switchLocale(pathname, "de") === "/reviews";

  const { reviews } = getContent(locale);

  const model = isCatalogue ? reviews.catalog.find((item) => item.id === selection.modelId) : undefined;

  const category = model?.category ?? (isCatalogue ? reviews.categories.find((item) => item.id === selection.category)?.id : undefined);

  const params = new URLSearchParams();

  if (category) params.set("category", category);

  if (model) params.set("model", model.id);

  if (switchLocale(pathname, "de") === "/contact" && serviceReason) params.set("service", serviceReason);

  if (switchLocale(pathname, "de") === "/contact" && serviceReason === "websites" && websiteTier) params.set("tier", websiteTier);
  const hash = isCatalogue && ["#inquiry", "#products"].includes(selection.hash) ? selection.hash : "";

  const publicPath = `${pathname}${params.size ? `?${params}` : ""}${hash}`;

  const labels: Record<Locale, string> = {

    de: navigation.germanLabel,

    en: navigation.englishLabel,

  };



  return (

    <div

      aria-label={navigation.languageLabel}

      className={styles.languages}

      role="group"

    >

      {SUPPORTED_LOCALES.map((option) => (

        <Link

          aria-current={option === locale ? "true" : undefined}

          className={styles.language}

          data-touch-target

          href={switchLocale(publicPath, option)}

          onClick={(event) => {

            if (!isCatalogue || option === locale || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            const detail: DraftRequest = {};

            window.dispatchEvent(new CustomEvent(DRAFT_REQUEST, { detail }));

            if (!detail.draft) return;

            let saved = false;

            try { saved = saveInquiryDraft(window.sessionStorage, switchLocale(publicPath, option), detail.draft); } catch { /* Storage access itself may be blocked. */ }

            if (!saved && !window.confirm(locale === "de"

              ? "Ihr Browser erlaubt die Übergabe Ihrer Anfrage nicht. Abbrechen behält Ihre Angaben. Mit OK wechseln Sie die Sprache und verwerfen die Angaben."

              : "Your browser cannot transfer your enquiry. Cancel keeps your details. OK changes language and discards your details.")) event.preventDefault();

          }}

          hrefLang={option}

          key={option}

        >

          <span aria-hidden="true">{option.toUpperCase()}</span>

          {/* The visible code is an abbreviation; assistive technology gets the

              language named in the language the visitor is currently reading. */}

          <span className="visually-hidden">{labels[option]}</span>

        </Link>

      ))}

    </div>

  );

}

