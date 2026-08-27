import Link from "next/link";

import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { getPrimaryLinks } from "./nav-links";
import { MAIN_CONTENT_ID } from "./site-regions";
import styles from "./navigation.module.css";

interface NavigationProps {
  readonly locale: Locale;
  readonly currentPath: string;
}

export function Navigation({ locale, currentPath }: NavigationProps) {
  const content = getContent(locale);
  const links = getPrimaryLinks(locale, currentPath);

  return (
    <header className={styles.header}>
      <a className={styles.skipLink} href={`#${MAIN_CONTENT_ID}`}>
        {content.a11y.skipToContent}
      </a>

      <div className={styles.bar}>
        <Link className={styles.wordmark} href={localizePath("/", locale)}>
          <span className={styles.wordmarkName}>{content.brand.name}</span>
          <span className={styles.wordmarkDescriptor}>
            {content.brand.descriptor}
          </span>
        </Link>

        <nav
          aria-label={content.navigation.primaryLabel}
          className={styles.primaryNav}
        >
          <ul className={styles.primaryList}>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  aria-current={link.isCurrent ? "page" : undefined}
                  className={`${styles.primaryLink} hoverUnderline`}
                  data-touch-target
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher currentPath={currentPath} locale={locale} />
          <MobileMenu currentPath={currentPath} locale={locale} />
        </div>
      </div>
    </header>
  );
}
