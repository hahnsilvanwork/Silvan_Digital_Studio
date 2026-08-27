import type { CSSProperties } from "react";

import { ContactActions } from "../../components/contact/ContactActions";
import { SiteShell } from "../../components/layout/SiteShell";
import { revealSequence } from "../../components/motion/reveal-sequence";
import { SplitText } from "../../components/motion/SplitText";
import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";

interface ContactPageProps {
  readonly locale: Locale;
}

/**
 * Direct contact only. There is no form and no submission endpoint, so nothing
 * a visitor types here can be lost between a server and an inbox.
 */
export function ContactPage({ locale }: ContactPageProps) {
  const content = getContent(locale);
  const sequence = revealSequence(content.contact.title);

  return (
    <SiteShell currentPath={localizePath("/contact", locale)} locale={locale}>
      <div className={pageStyles.page}>
        <section className={`${layoutStyles.container} ${pageStyles.pageHeader}`}>
          <p className={pageStyles.heroLabel} data-reveal="rise">
            {content.contact.eyebrow}
          </p>
          <SplitText
            as="h1"
            className={pageStyles.pageTitle}
            startIndex={sequence.titleStartIndex}
            text={content.contact.title}
          />
          <p
            className={pageStyles.editorialTight}
            data-reveal="rise"
            style={{ "--reveal-index": sequence.introIndex } as CSSProperties}
          >
            {content.contact.intro}
          </p>
        </section>

        <section className={`${layoutStyles.container} ${pageStyles.section}`}>
          <h2 className="visually-hidden">{content.contact.eyebrow}</h2>
          <ContactActions locale={locale} />
        </section>
      </div>
    </SiteShell>
  );
}
