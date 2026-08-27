import type { CSSProperties } from "react";

import { SplitText } from "../motion/SplitText";
import styles from "./ui.module.css";

interface SectionHeadingProps {
  readonly title: string;
  readonly eyebrow?: string;
  readonly intro?: string;
  readonly level?: 1 | 2 | 3;
  readonly size?: "display" | "title" | "heading";
  readonly id?: string;
}

export function SectionHeading({
  title,
  eyebrow,
  intro,
  level = 2,
  size = "heading",
  id,
}: SectionHeadingProps) {
  const Heading = `h${level}` as const;

  return (
    <div className={styles.sectionHeading}>
      {eyebrow ? (
        <p className={styles.eyebrow} data-reveal="rise">
          {eyebrow}
        </p>
      ) : null}

      <SplitText
        as={Heading}
        className={`${styles.headingText} ${styles[size]}`}
        text={title}
      />

      {intro ? (
        <p
          className={styles.intro}
          data-reveal="rise"
          style={{ "--reveal-index": 2 } as CSSProperties}
        >
          {intro}
        </p>
      ) : null}

      {id ? <span aria-hidden="true" id={id} /> : null}
    </div>
  );
}
