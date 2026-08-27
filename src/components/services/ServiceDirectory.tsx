import Link from "next/link";
import type { CSSProperties } from "react";

import type { Locale, RouteKey } from "../../content/types";
import { localizePath } from "../../lib/routes";
import styles from "./services.module.css";

interface ServiceEntry {
  readonly title: string;
  readonly description: string;
  readonly price: string;
  readonly href: RouteKey;
}

interface ServiceDirectoryProps {
  readonly services: readonly ServiceEntry[];
  readonly locale: Locale;
}

/**
 * A ruled directory of services. Name, description and starting price are all
 * rendered text -- none of them is revealed by hover or interaction.
 */
export function ServiceDirectory({ services, locale }: ServiceDirectoryProps) {
  return (
    <ul className={styles.directory}>
      {services.map((service, index) => (
        <li
          className={styles.directoryItem}
          data-reveal="rise"
          key={service.href}
          style={{ "--reveal-index": index } as CSSProperties}
        >
          <Link
            className={`${styles.directoryLink} rowLink`}
            data-touch-target
            href={localizePath(service.href, locale)}
          >
            <span className={styles.directoryTitle}>{service.title}</span>
            <span className={styles.directoryDescription}>
              {service.description}
            </span>
            <span className={styles.directoryPrice}>{service.price}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
