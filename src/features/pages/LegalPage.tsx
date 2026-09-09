import { SiteShell } from "../../components/layout/SiteShell";
import type { LegalContent, Locale, RouteKey } from "../../content/types";
import { localizePath } from "../../lib/routes";
import layoutStyles from "../../styles/layout.module.css";
import styles from "../../styles/legal.module.css";

interface LegalPageProps {
  readonly locale: Locale;
  readonly route: RouteKey;
  readonly content: LegalContent;
}

/** Plain, server-rendered reading and native navigation for both legal pages. */
export function LegalPage({ locale, route, content }: LegalPageProps) {
  const contentsLabel = locale === "de" ? "Inhaltsübersicht" : "Contents";
  const backLabel = locale === "de" ? "Zur Inhaltsübersicht" : "Back to contents";

  return (
    <SiteShell currentPath={localizePath(route, locale)} locale={locale}>
      <div className={`${layoutStyles.container} ${styles.page}`}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.intro}>{content.intro}</p>
          <p className={styles.updated}>
            {content.updatedLabel}: {content.updated}
          </p>
        </header>

        <nav aria-labelledby="legal-contents" className={styles.contents}>
          <h2 className={styles.contentsHeading} id="legal-contents" tabIndex={-1}>
            {contentsLabel}
          </h2>
          <ol className={styles.contentsList}>
            {content.sections.map((section, index) => (
              <li key={section.title}>
                <a href={`#section-${index + 1}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.body}>
          {content.sections.map((section, index) => (
            <section className={styles.section} key={section.title}>
              <h2 className={styles.heading} id={`section-${index + 1}`} tabIndex={-1}>
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p className={styles.paragraph} key={paragraph}>
                  {paragraph}
                </p>
              ))}
              {section.links?.map((link) => (
                <p className={styles.paragraph} key={link.href}>
                  <a href={link.href} rel="noreferrer">{link.label}</a>
                </p>
              ))}
              <a className={styles.backLink} href="#legal-contents">{backLabel}</a>
            </section>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
