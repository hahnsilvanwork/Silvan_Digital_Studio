import Link from "next/link";
import { ContactActions } from "../../components/contact/ContactActions";
import { SiteShell } from "../../components/layout/SiteShell";
import { contactCopy } from "../../content/contact-copy";
import type { Locale } from "../../content/types";
import { createContactVCard } from "../../lib/contact-inquiry";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";
import styles from "../../components/contact/entry.module.css";

export function HelloPage({ locale }: { readonly locale: Locale }) {
  const content = getContent(locale);
  const copy = contactCopy[locale];
  return (
    <SiteShell currentPath={localizePath("/hello", locale)} locale={locale}>
      <div className={pageStyles.page}>
        <section className={`${layoutStyles.container} ${styles.header}`}>
          <p className={pageStyles.heroLabel}>{content.hello.eyebrow}</p>
          <h1 className={styles.title}>{content.hello.title}</h1>
          <p className={pageStyles.editorialTight}>{content.hello.intro}</p>
        </section>
        <div className={`${layoutStyles.container} ${styles.body}`}>
          <section className={styles.panel}>
            <h2 className={pageStyles.sectionLabel}>{content.hello.directContactTitle}</h2>
            <a className={styles.save} download="silvan-hahn.vcf" href={`data:text/vcard;charset=utf-8,${encodeURIComponent(createContactVCard(content.contact))}`}>{copy.save}</a>
            <ContactActions locale={locale} immediate />
          </section>
          <section className={styles.panel}>
            <h2 className={pageStyles.sectionLabel}>{copy.explore}</h2>
            <ul className={pageStyles.launchpad}>
              {content.hello.links.map((link) => (
                <li className={pageStyles.launchpadItem} key={link.href}>
                  <Link className={`${pageStyles.launchpadLink} rowLink`} data-touch-target href={localizePath(link.href, locale)}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
