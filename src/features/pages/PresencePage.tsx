import type { Locale } from "../../content/types";
import { presenceCopy } from "../../content/presence-copy";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { getContent } from "../../lib/locales";
import { ServicePage } from "./ServicePage";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";
import styles from "../../styles/presence.module.css";
import { PresenceExample } from '../../components/services/PresenceExample';
import exampleStyles from '../../components/services/examples.module.css';

interface PresencePageProps {
  readonly locale: Locale;
}

export function PresencePage({ locale }: PresencePageProps) {
  const copy = presenceCopy[locale];
  return (
    <ServicePage
      locale={locale}
      route="/presence"
      service={getContent(locale).presence}
    >
      <section className={`${layoutStyles.container} ${pageStyles.section}`} data-service-example>
        <SectionHeading title={copy.exampleTitle} intro={copy.exampleIntro} />
        <p className={exampleStyles.disclaimer}>{copy.exampleEyebrow}</p>
        <div className={pageStyles.sectionBody}><PresenceExample locale={locale} />
          <p className={styles.note}>{copy.exampleNote}</p>
        </div>
      </section>
      <section className={`${layoutStyles.container} ${pageStyles.section}`}>
        <SectionHeading title={copy.scopeTitle} />
        <div className={`${pageStyles.sectionBody} ${styles.details}`}>
          <details className={exampleStyles.disclosure}><summary>{locale === 'de' ? 'Kosten und Leistungsumfang' : 'Cost and scope'}</summary><div><p>{copy.costs}</p></div></details>
          <details className={exampleStyles.disclosure}><summary>{locale === 'de' ? 'Zugriff und Inhaberschaft' : 'Access and ownership'}</summary><div><p>{copy.access}</p></div></details>
          <details className={exampleStyles.disclosure}><summary>{locale === 'de' ? 'Bestätigung durch Google' : 'Verification by Google'}</summary><div><p>{copy.verification}</p></div></details>
          <ul className={styles.links}>
            {copy.links.map((link) => (
              <li key={link.id}><a href={`https://support.google.com/business/answer/${link.id}?hl=${locale}`} rel="noreferrer">{link.label}</a></li>
            ))}
          </ul>
        </div>
      </section>
    </ServicePage>
  );
}
