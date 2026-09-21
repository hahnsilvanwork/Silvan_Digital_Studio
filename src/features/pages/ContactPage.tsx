import { ContactInquiry } from "../../components/contact/ContactInquiry";
import { SiteShell } from "../../components/layout/SiteShell";
import { contactCopy } from "../../content/contact-copy";
import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import layoutStyles from "../../styles/layout.module.css";
import styles from "../../components/contact/entry.module.css";

export function ContactPage({ locale }: { readonly locale: Locale }) {
  const content = getContent(locale);
  const copy = contactCopy[locale];
  return (
    <SiteShell currentPath={localizePath("/contact", locale)} locale={locale}>
      <div className={`${layoutStyles.container} ${styles.contactLayout}`}>
        <section className={styles.header}>
          <h1 className={styles.title}>{locale === "de" ? "Sprechen wir darüber." : "Let’s talk."}</h1>
          <p className={styles.intro}>{locale === 'de'
            ? 'Eine Frage oder eine Idee? Schreiben Sie mir – direkt und unverbindlich.'
            : 'Have a question or an idea? Get in touch directly, with no obligation.'}</p>
        </section>
        <section className={`${styles.panel} ${styles.contactPanel}`}>
          <h2 className="visually-hidden">{content.contact.eyebrow}</h2>
          <ContactInquiry locale={locale} />
        </section>
        <div className={styles.support}>
          <p className={styles.personal}>{content.contact.address[0]} · {content.contact.address[2]}</p>
          <details className={styles.nextDisclosure}>
            <summary>{copy.nextTitle}</summary>
            <p>{copy.next}</p>
            <address className={styles.address}>
              {content.contact.address.map((line) => <span key={line}>{line}</span>)}
            </address>
          </details>
        </div>
      </div>
    </SiteShell>
  );
}
