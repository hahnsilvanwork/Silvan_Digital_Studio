import Link from "next/link";

import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { SUPPORTED_LOCALES } from "../../lib/locales";
import { switchLocale } from "../../lib/routes";
import styles from "../layout/navigation.module.css";

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
          href={switchLocale(currentPath, option)}
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
