import type { CSSProperties } from "react";

import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { contactCopy } from "../../content/contact-copy";
import type { ServiceReason, WebsiteTier } from "../../lib/contact-inquiry";
import { buildContactMessage } from "../../lib/contact-message";
import styles from "./contact.module.css";

interface ContactActionsProps {
  readonly locale: Locale;
  readonly reason?: ServiceReason;
  readonly immediate?: boolean;
  readonly tier?: WebsiteTier;
  readonly brief?: string;
  readonly emphasize?: boolean;
}

/**
 * The four approved contact destinations. Every one is a real link with its own
 * accessible name; nothing here posts to a server.
 */
export function ContactActions({ locale, reason, tier, brief = '', emphasize = false, immediate = false }: ContactActionsProps) {
  const content = getContent(locale);
  const { details } = content.contact;
  const copy = contactCopy[locale];
  const message = reason || brief.trim() ? buildContactMessage(locale, reason, tier, brief) : undefined;

  const actions = [
    {
      label: content.contact.whatsappLabel,
      value: details.whatsappNumber,
      href: message ? `${details.whatsappHref}?text=${encodeURIComponent(message)}` : details.whatsappHref,
      external: true,
    },
    {
      label: content.contact.emailLabel,
      value: details.email,
      href: message ? `mailto:${details.email}?subject=${encodeURIComponent(reason ? `${copy.subject}: ${copy.reasons[reason]}` : copy.subject)}&body=${encodeURIComponent(message)}` : `mailto:${details.email}`,
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
          className={`${styles.action}${emphasize && index === 0 ? ` ${styles.primaryAction}` : ''}`}
          data-reveal={immediate ? undefined : "rise"}
          key={action.href}
          style={{ "--reveal-index": index } as CSSProperties}
        >
          <a
            className={`${styles.actionLink} rowLink`}
            data-touch-target
            href={action.href}
            {...(action.external
              ? { rel: "noopener noreferrer", target: "_blank" }
              : {})}
          >
            <span className={styles.actionLabel}>{action.label}</span>
            <span className={`${styles.actionValue}${action.href.startsWith("mailto:") ? ` ${styles.emailValue}` : ""}`}>{action.value}</span>
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
