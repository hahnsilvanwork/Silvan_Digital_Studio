import { ContactInquiry } from "../../components/contact/ContactInquiry";
import { SiteShell } from "../../components/layout/SiteShell";
import { contactCopy } from "../../content/contact-copy";
import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";
import styles from "../../components/contact/entry.module.css";

export function ContactPage({ locale }: { readonly locale: Locale }) {
  const content = getContent(locale);
  const copy = contactCopy[locale];
  return (
    <SiteShell currentPath={localizePath("/contact", locale)} locale={locale}>
      <div className={pageStyles.page}>
        <section className={`${layoutStyles.container} ${styles.header}`}>
          <p className={pageStyles.heroLabel}>{content.contact.eyebrow}</p>
          <h1 className={styles.title}>{content.contact.title}</h1>
          <p className={pageStyles.editorialTight}>{content.contact.intro}</p>
        </section>
        <div className={`${layoutStyles.container} ${styles.body}`}>
          <section className={styles.panel}>
            <h2 className="visually-hidden">{content.contact.eyebrow}</h2>
            <ContactInquiry locale={locale} />
          </section>
          <div className={styles.panel}>
            <section className={styles.next}>
              <h2>{copy.nextTitle}</h2>
              <p>{copy.next}</p>
            </section>
            <address className={pageStyles.postalAddress}>
              <span className={pageStyles.postalAddressLabel}>{content.contact.addressLabel}</span>
              {content.contact.address.map((line) => <span key={line}>{line}</span>)}
            </address>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
