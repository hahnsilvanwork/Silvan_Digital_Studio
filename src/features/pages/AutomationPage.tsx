import type { Locale } from "../../content/types";
import { automationCopy } from "../../content/automation-copy";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { getContent } from "../../lib/locales";
import { ServicePage } from "./ServicePage";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";
import styles from "../../styles/automation.module.css";
import { WorkflowExample } from '../../components/services/WorkflowExample';
import exampleStyles from '../../components/services/examples.module.css';

interface AutomationPageProps {
  readonly locale: Locale;
}

export function AutomationPage({ locale }: AutomationPageProps) {
  const copy = automationCopy[locale];
  return (
    <ServicePage
      locale={locale}
      route="/automation"
      service={getContent(locale).automation}
    >
      <section className={`${layoutStyles.container} ${pageStyles.section}`} data-service-example>
        <SectionHeading title={copy.title} intro={locale === 'de' ? 'Probieren Sie aus, wie eine Aufgabenliste zum prüfbaren Bericht wird. Mit Beispieldaten, direkt auf dieser Seite.' : 'Try turning a task list into a report you can review. Using sample data, right on this page.'} />
        <div className={pageStyles.sectionBody}>
          <WorkflowExample locale={locale} />
          <details className={exampleStyles.disclosure}><summary>{locale === 'de' ? 'Wie der Ablauf funktioniert' : 'How the workflow works'}</summary><div>
          <ol className={styles.flow}>
            {copy.steps.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.number} aria-hidden="true">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <p className={pageStyles.note}>{copy.limit}</p>
          </div></details>
        </div>
      </section>
      <section className={`${layoutStyles.container} ${pageStyles.section}`}>
        <SectionHeading title={copy.agreementTitle} intro={copy.contact} />
        <div className={`${pageStyles.sectionBody} ${styles.agreement}`}>
          {copy.agreement.map((item) => (
            <details className={exampleStyles.disclosure} key={item.title}>
              <summary>{item.title}</summary><div>
              <p>{item.text}</p>
              </div></details>
          ))}
        </div>
      </section>
    </ServicePage>
  );
}
