import type { CSSProperties } from "react";

import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import styles from "./contact.module.css";

interface ContactActionsProps {
  readonly locale: Locale;
}

/**
 * The four approved contact destinations. Every one is a real link with its own
 * accessible name; nothing here posts to a server.
 */
export function ContactActions({ locale }: ContactActionsProps) {
  const content = getContent(locale);
  const { details } = content.contact;

  const actions = [
    {
      label: content.contact.whatsappLabel,
      value: details.whatsappNumber,
      href: details.whatsappHref,
      external: true,
    },
    {
      label: content.contact.emailLabel,
      value: details.email,
      href: `mailto:${details.email}`,
      external: false,
    },
    {
      label: content.contact.phoneLabel,
      value: details.phoneDisplay,
      href: details.phoneHref,
      external: false,
    },
    {
      label: content.contact.linkedInLabel,
      value: "silvan-hahn-dev",
      href: details.linkedIn,
      external: true,
    },
  ];

  return (
    <ul className={styles.actions}>
      {actions.map((action, index) => (
        <li
          className={styles.action}
          data-reveal="rise"
          key={action.href}
          style={{ "--reveal-index": index } as CSSProperties}
        >
          <a
            className={styles.actionLink}
            data-touch-target
            href={action.href}
            {...(action.external
              ? { rel: "noopener noreferrer", target: "_blank" }
              : {})}
          >
            <span className={styles.actionLabel}>{action.label}</span>
            <span className={styles.actionValue}>{action.value}</span>
            {action.external ? (
              <span className="visually-hidden">
                {content.a11y.externalLink}
              </span>
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
