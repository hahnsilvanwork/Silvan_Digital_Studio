import type { CSSProperties } from "react";

import { SiteShell } from "../../components/layout/SiteShell";
import { revealSequence } from "../../components/motion/reveal-sequence";
import { SplitText } from "../../components/motion/SplitText";
import { ProjectPreview } from "../../components/work/ProjectPreview";
import { projects } from "../../content/projects";
import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";
import workStyles from "../../components/work/work.module.css";

interface WorkPageProps {
  readonly locale: Locale;
}

export function WorkPage({ locale }: WorkPageProps) {
  const content = getContent(locale);
  const sequence = revealSequence(content.work.title);

  return (
    <SiteShell currentPath={localizePath("/work", locale)} locale={locale}>
      <div className={pageStyles.page}>
        <section className={`${layoutStyles.container} ${pageStyles.pageHeader}`}>
          <p className={pageStyles.heroLabel} data-reveal="rise">
            {content.work.eyebrow}
          </p>
          <SplitText
            as="h1"
            className={pageStyles.pageTitle}
            startIndex={sequence.titleStartIndex}
            text={content.work.title}
          />
          <p
            className={pageStyles.editorialTight}
            data-reveal="rise"
            style={{ "--reveal-index": sequence.introIndex } as CSSProperties}
          >
            {content.work.intro}
          </p>
        </section>

        <section className={`${layoutStyles.container} ${pageStyles.section}`}>
          <h2 className="visually-hidden">{content.work.eyebrow}</h2>
          <ul className={workStyles.previewList}>
            {projects.map((project, index) => (
              <li key={project.slug}>
                <ProjectPreview
                  index={index}
                  locale={locale}
                  // Two columns, so the first row is the first two cards.
                  priority={index < 2}
                  project={project}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SiteShell>
  );
}
