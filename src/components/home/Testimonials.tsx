import type { CSSProperties } from "react";

import type { Testimonial } from "../../content/types";
import { SectionHeading } from "../ui/SectionHeading";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";
import styles from "./testimonials.module.css";

interface TestimonialsProps {
  readonly title: string;
  readonly items: readonly Testimonial[];
}

/**
 * Client quotes -- and nothing at all until there are real ones.
 *
 * The section is wired up so that adding one entry to `home.testimonials` in
 * the content file publishes it, but the array ships empty on purpose. A studio
 * that sells Google Reviews cannot put an invented endorsement on its own home
 * page; the empty state is the honest one, and it costs nothing to leave the
 * structure ready.
 *
 * When the first real quotes arrive, `Review` structured data becomes truthful
 * too and can be added alongside -- not before.
 */
export function Testimonials({ title, items }: TestimonialsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className={`${layoutStyles.container} ${pageStyles.section}`}>
      <SectionHeading title={title} />
      <div className={pageStyles.sectionBody}>
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li
              className={styles.item}
              data-reveal="rise"
              key={item.id}
              style={{ "--reveal-index": index } as CSSProperties}
            >
              <figure className={styles.figure}>
                <blockquote className={styles.quote}>{item.quote}</blockquote>
                <figcaption className={styles.attribution}>
                  <span className={styles.author}>{item.author}</span>
                  <span className={styles.role}>{item.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
