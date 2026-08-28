import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import type { Project } from "../../content/projects";
import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import pageStyles from "../../styles/pages.module.css";
import styles from "./work.module.css";

interface ProjectPreviewProps {
  readonly project: Project;
  readonly locale: Locale;
  readonly index?: number;
  /** True only where this card is in the first viewport. */
  readonly priority?: boolean;
}

export function ProjectPreview({
  project,
  locale,
  index = 0,
  priority = false,
}: ProjectPreviewProps) {
  const content = getContent(locale);
  const copy = project.copy[locale];

  return (
    <article
      className={styles.preview}
      data-reveal="rise"
      style={{ "--reveal-index": index % 2 } as CSSProperties}
    >
      <Link
        className={`${styles.previewLink} mediaLink`}
        href={localizePath(`/work/${project.slug}`, locale)}
      >
        <span
          className={pageStyles.projectMedia}
          data-project={project.slug}
          data-reveal="scale"
          data-reveal-priority={priority ? "" : undefined}
        >
          <Image
            alt={copy.imageAlt}
            height={279}
            priority={priority}
            sizes="(min-width: 64rem) 44vw, 100vw"
            src={project.image}
            width={512}
          />
        </span>

        <span className={styles.previewMeta}>
          <span className={styles.previewConcept}>{content.work.conceptLabel}</span>
          <span className={styles.previewYear}>{project.year}</span>
          <span className={styles.previewCategory}>{copy.category}</span>
        </span>

        <h3 className={styles.previewName}>{project.name}</h3>
        <p className={styles.previewTagline}>{copy.tagline}</p>
      </Link>
    </article>
  );
}
