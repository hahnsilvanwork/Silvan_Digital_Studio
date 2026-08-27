import type { CSSProperties } from "react";

import { SiteShell } from "../../components/layout/SiteShell";
import { revealSequence } from "../../components/motion/reveal-sequence";
import { SplitText } from "../../components/motion/SplitText";
import type { LegalContent, Locale, RouteKey } from "../../content/types";
import { localizePath } from "../../lib/routes";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";

interface LegalPageProps {
  readonly locale: Locale;
  readonly route: RouteKey;
  readonly content: LegalContent;
}

/**
 * The shared shell for the imprint and the privacy statement.
 *
 * Both are pure prose, so they get the narrow measure the rest of the site uses
 * for reading text rather than the wide editorial grid -- a legal page that
 * runs the full canvas width is unreadable, and these are the two pages a
 * visitor is most likely to actually read end to end.
 */
export function LegalPage({ locale, route, content }: LegalPageProps) {
  const sequence = revealSequence(content.title);

  return (
    <SiteShell currentPath={localizePath(route, locale)} locale={locale}>
      <div className={pageStyles.page}>
        <section className={`${layoutStyles.container} ${pageStyles.pageHeader}`}>
          <p className={pageStyles.heroLabel} data-reveal="rise">
            {content.eyebrow}
          </p>
          <SplitText
            as="h1"
            className={pageStyles.pageTitle}
            startIndex={sequence.titleStartIndex}
            text={content.title}
          />
          <p
            className={pageStyles.editorialTight}
            data-reveal="rise"
            style={{ "--reveal-index": sequence.introIndex } as CSSProperties}
          >
            {content.intro}
          </p>
        </section>

        <section className={`${layoutStyles.container} ${pageStyles.section}`}>
          <div className={pageStyles.legalBody}>
            {content.sections.map((section, index) => (
              <section
                className={pageStyles.legalSection}
                data-reveal="rise"
                key={section.title}
                style={{ "--reveal-index": index % 4 } as CSSProperties}
              >
                <h2 className={pageStyles.legalHeading}>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p className={pageStyles.legalParagraph} key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <p className={pageStyles.legalUpdated} data-reveal="rise">
              {content.updatedLabel}: {content.updated}
            </p>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
