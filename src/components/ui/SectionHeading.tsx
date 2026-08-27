import type { CSSProperties } from "react";

import { revealSequence } from "../motion/reveal-sequence";
import { SplitText } from "../motion/SplitText";
import styles from "./ui.module.css";

interface SectionHeadingProps {
  readonly title: string;
  readonly eyebrow?: string;
  readonly intro?: string;
  readonly level?: 1 | 2 | 3;
  readonly size?: "display" | "title" | "heading";
}

export function SectionHeading({
  title,
  eyebrow,
  intro,
  level = 2,
  size = "heading",
}: SectionHeadingProps) {
  const Heading = `h${level}` as const;
  const sequence = revealSequence(title);

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
        startIndex={sequence.titleStartIndex}
        text={title}
      />

      {intro ? (
        <p
          className={styles.intro}
          data-reveal="rise"
          style={{ "--reveal-index": sequence.introIndex } as CSSProperties}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
