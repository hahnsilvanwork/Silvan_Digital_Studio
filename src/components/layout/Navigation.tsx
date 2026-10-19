import Link from "next/link";
import { BrandLogo } from "../brand/BrandLogo";

import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { ServiceNavigation } from "./ServiceNavigation";
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
  const serviceLinks = links.filter(link => ['/websites', '/reviews', '/presence', '/automation'].some(route => link.href === localizePath(route, locale)));

  return (
    <header className={styles.header}>
      <a className={styles.skipLink} href={`#${MAIN_CONTENT_ID}`}>
        {content.a11y.skipToContent}
      </a>

      <div className={styles.bar}>
        <Link className={styles.wordmark} href={localizePath("/", locale)}>
          <BrandLogo className={styles.headerLogo} priority />
        </Link>

        <nav
          aria-label={content.navigation.primaryLabel}
          className={styles.primaryNav}
        >
          <ul className={styles.primaryList}>
            <li><ServiceNavigation locale={locale} links={serviceLinks} /></li>
            {links.filter(link => !serviceLinks.includes(link)).map(link => (
              <li key={link.href}>
                <Link
                  aria-current={link.isCurrent ? "page" : undefined}
                  className={`${styles.primaryLink} hoverUnderline${link.href === localizePath('/contact', locale) ? ` ${styles.contactLink}` : ''}`}
                  data-touch-target
                  href={link.href}
                >
                  {link.label}
                  {link.href === localizePath('/contact', locale) && <svg className={styles.contactArrow} aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 12h17M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" /></svg>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.desktopLanguages}><LanguageSwitcher currentPath={currentPath} locale={locale} /></div>
          <MobileMenu currentPath={currentPath} locale={locale} />
        </div>
      </div>
    </header>
  );
}
