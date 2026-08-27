import Image from "next/image";
import Link from "next/link";

import type { Project } from "../../content/projects";
import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import { SplitText } from "../motion/SplitText";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";
import styles from "./work.module.css";

interface ProjectDetailProps {
  readonly project: Project;
  readonly next: Project;
  readonly locale: Locale;
}

export function ProjectDetail({ project, next, locale }: ProjectDetailProps) {
  const content = getContent(locale);
  const copy = project.copy[locale];
  const nextCopy = next.copy[locale];

  const sections = [
    { label: content.work.challengeLabel, body: copy.challenge },
    { label: content.work.approachLabel, body: copy.approach },
    { label: content.work.outcomeLabel, body: copy.outcome },
  ];

  return (
    <div className={pageStyles.page}>
      <header className={`${layoutStyles.container} ${styles.detailHeader}`}>
        <p className={styles.detailConcept} data-reveal="rise">
          {content.work.conceptLabel}
        </p>
        <SplitText
          as="h1"
          className={styles.detailTitle}
          text={project.name}
        />
        <p className={styles.detailTagline} data-reveal="rise">
          {copy.tagline}
        </p>
      </header>

      <div className={layoutStyles.container}>
        <span
          className={pageStyles.projectMedia}
          data-project={project.slug}
          data-reveal="scale"
        >
          <Image
            alt={copy.imageAlt}
            height={279}
            priority
            sizes="(min-width: 64rem) 70vw, 100vw"
            src={project.image}
            width={512}
          />
        </span>
      </div>

      <section className={`${layoutStyles.container} ${pageStyles.section}`}>
        <h2 className="visually-hidden">{content.work.projectInfoLabel}</h2>

        <dl className={styles.detailFacts} data-reveal="rise">
          <div className={styles.detailFact}>
            <dt className={styles.detailFactLabel}>
              {content.work.projectInfoLabel}
            </dt>
            <dd className={styles.detailFactValue}>{copy.category}</dd>
          </div>
          <div className={styles.detailFact}>
            <dt className={styles.detailFactLabel}>{project.year}</dt>
            <dd className={styles.detailFactValue}>{content.work.conceptLabel}</dd>
          </div>
        </dl>

        <div className={styles.detailBody}>
          {sections.map((section, index) => (
            <section
              className={styles.detailSection}
              data-reveal="rise"
              key={section.label}
              style={{ "--reveal-index": index } as React.CSSProperties}
            >
              <h3 className={styles.detailSectionLabel}>{section.label}</h3>
              <p className={styles.detailSectionBody}>{section.body}</p>
            </section>
          ))}
        </div>
      </section>

      <nav
        aria-label={content.a11y.nextProject}
        className={`${layoutStyles.container} ${styles.detailNext}`}
      >
        <Link
          className={styles.detailNextLink}
          data-touch-target
          href={localizePath(`/work/${next.slug}`, locale)}
        >
          <span className={styles.detailNextLabel}>
            {content.a11y.nextProject}
          </span>
          <span className={styles.detailNextName}>{next.name}</span>
          <span className={styles.detailNextTagline}>{nextCopy.tagline}</span>
        </Link>
      </nav>
    </div>
  );
}
