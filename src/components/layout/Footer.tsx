import Link from "next/link";

import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
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
      label: content.contact.emailLabel,
      value: details.email,
      href: `mailto:${details.email}`,
      external: false,
    },
    {
      label: content.contact.phoneLabel,
      value: details.phoneDisplay,
      href: details.phoneHref,
      external: false,
    },
    {
      label: content.contact.whatsappLabel,
      value: details.whatsappNumber,
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

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.footerWordmark}>{content.brand.name}</span>
          <span className={styles.footerDescriptor}>
            {content.brand.descriptor}
          </span>
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

          <ul className={styles.footerContactList}>
            {contactActions.map((action) => (
              <li key={action.href}>
                <a
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
          <ul className={styles.footerNavList}>
            {content.navigation.primary.map((item) => (
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
