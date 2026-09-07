import Link from "next/link";

import type { FaqItem, Locale } from "../../content/types";
import { localizePath } from "../../lib/routes";
import styles from "./services.module.css";

interface FaqListProps {
  readonly items: readonly FaqItem[];
  readonly locale: Locale;
}

/** Native disclosure keeps answers in the HTML and works without JavaScript. */
export function FaqList({ items, locale }: FaqListProps) {
  return (
    <div className={styles.faq}>
      {items.map((item) => (
        <details
          className={styles.faqItem}
          key={item.question}
        >
          <summary className={styles.faqQuestion}>{item.question}</summary>
          <div className={styles.faqAnswer}>
            {item.answer}
            {item.link ? (
              <>
                {" "}
                <Link
                  className={`${styles.faqLink} hoverUnderline`}
                  href={localizePath(item.link.href, locale)}
                >
                  {item.link.label}
                </Link>
              </>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}
