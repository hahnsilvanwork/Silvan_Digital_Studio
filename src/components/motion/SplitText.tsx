import { Fragment, type CSSProperties, type ElementType } from "react";

import { countWords, wordStepMs } from "./reveal-sequence";
import styles from "./split-text.module.css";

interface SplitTextProps {
  readonly text: string;
  readonly as?: ElementType;
  readonly className?: string;
  /** Shifts the stagger so a following block continues the same rhythm. */
  readonly startIndex?: number;
}

/**
 * Splits a line into words, each in its own clip box, so the text can rise into
 * view on reveal. The words stay separated by real spaces, so the rendered text
 * and its accessible name are identical to the original string.
 */
export function SplitText({
  text,
  as: Tag = "span",
  className,
  startIndex = 0,
}: SplitTextProps) {
  const words = text.split(/\s+/).filter(Boolean);
  // A longer headline takes smaller steps, so the sweep costs the same time
  // whatever the line length. The custom property inherits down to the words.
  const step = `${wordStepMs(countWords(text))}ms`;

  return (
    <Tag
      className={className ? `${styles.split} ${className}` : styles.split}
      data-reveal="mask"
      style={{ "--reveal-step-word": step } as CSSProperties}
    >
      {words.map((word, index) => (
        <Fragment key={`${index}-${word}`}>
          {index > 0 ? " " : null}
          <span className={styles.word}>
            <span
              className={styles.wordInner}
              data-mask-item
              style={{ "--reveal-index": startIndex + index } as CSSProperties}
            >
              {word}
            </span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
