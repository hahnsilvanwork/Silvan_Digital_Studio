import type { CSSProperties } from "react";

import type { FaqItem } from "../../content/types";
import styles from "./services.module.css";

interface FaqListProps {
  readonly items: readonly FaqItem[];
}

/**
 * Questions and answers as a description list, always rendered.
 *
 * Deliberately not an accordion: the rest of this site refuses to hide a fact
 * behind an interaction -- prices and service descriptions are plain text for
 * the same reason. It also means the answers are readable to a crawler, to an
 * assistant summarising the page, and to anyone printing it, none of which
 * click a disclosure triangle.
 */
export function FaqList({ items }: FaqListProps) {
  return (
    <dl className={styles.faq}>
      {items.map((item, index) => (
        <div
          className={styles.faqItem}
          data-reveal="rise"
          key={item.question}
          style={{ "--reveal-index": index } as CSSProperties}
        >
          <dt className={styles.faqQuestion}>{item.question}</dt>
          <dd className={styles.faqAnswer}>{item.answer}</dd>
        </div>
      ))}
    </dl>
  );
}
