import Link from "next/link";
import { BrandLogo } from "../brand/BrandLogo";

import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import { localPhone } from "../editorial/icons";
import styles from "./navigation.module.css";

interface FooterProps {
  readonly locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const content = getContent(locale);
  const { details } = content.contact;
  const year = new Date().getFullYear();

  const contactActions = [
    {
      label: content.contact.phoneLabel,
      value: localPhone(details.phoneDisplay, locale),
      href: details.phoneHref,
      external: false,
    },
    {
      label: content.contact.emailLabel,
      value: details.email,
      href: `mailto:${details.email}`,
      external: false,
    },
    {
      label: content.contact.whatsappLabel,
      value: localPhone(details.whatsappNumber, locale),
      href: details.whatsappHref,
      external: true,
    },
    {
      label: content.contact.linkedInLabel,
      value: "silvan-hahn-dev",
      href: details.linkedIn,
      external: true,
    },
  ];
  const serviceHrefs = ['/websites', '/presence', '/reviews', '/automation'];
  const navGroups = [
    { title: locale === 'de' ? 'Leistungen' : 'Services', items: content.navigation.primary.filter(item => serviceHrefs.includes(item.href)) },
    { title: 'Studio', items: content.navigation.primary.filter(item => !serviceHrefs.includes(item.href)) },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <BrandLogo className={styles.footerLogo} tone="white" />
        </div>

        <section className={styles.footerContact}>
          <h2 className={styles.footerHeading}>{content.footer.contactTitle}</h2>

          {/* The postal address belongs on every page, not only on /contact and
              /imprint. It is the one signal that says where this studio
              actually is, and it has to read identically everywhere it appears
              so a business listing and a citation can be matched against it. */}
          <address className={styles.footerAddress}>
            {content.contact.address.join(", ")}
          </address>
          <p className={styles.footerAddress}>{locale === 'de' ? 'Für Betriebe in der ganzen Schweiz. Antwort innert 24 Stunden.' : 'For businesses across Switzerland. Reply within 24 hours.'}</p>

          <ul className={styles.footerContactList}>
            {contactActions.map((action) => (
              <li key={action.href}>
                <a
                  aria-label={`${action.label}: ${action.value}${action.external ? `. ${content.a11y.externalLink}` : ""}`}
                  className={styles.footerContactLink}
                  data-touch-target
                  href={action.href}
                  {...(action.external
                    ? { rel: "noopener noreferrer", target: "_blank" }
                    : {})}
                >
                  <span className={styles.footerContactLabel}>
                    {action.label}
                  </span>
                  <span className={styles.footerContactValue}>
                    {action.value}
                  </span>
                  {action.external ? (
                    <span className="visually-hidden">
                      {content.a11y.externalLink}
                    </span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <nav aria-label={content.footer.navLabel} className={styles.footerNav}>
          {navGroups.map(group => <div key={group.title} className={styles.footerNavGroup}>
            <h2 className={styles.footerHeading}>{group.title}</h2>
            <ul className={styles.footerNavList}>
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    className={`${styles.footerNavLink} hoverUnderline`}
                    data-touch-target
                    href={localizePath(item.href, locale)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>)}
        </nav>

        <nav
          aria-label={content.footer.legalNavLabel}
          className={styles.footerLegalNav}
        >
          <ul className={styles.footerLegalList}>
            {content.footer.legal.map((item) => (
              <li key={item.href}>
                <Link
                  className={`${styles.footerLegalLink} hoverUnderline`}
                  data-touch-target
                  href={localizePath(item.href, locale)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className={styles.footerLegal}>
          © {year} {content.brand.name} {content.brand.descriptor}.{" "}
          {content.footer.rights}
        </p>
      </div>
    </footer>
  );
}
