import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./ui.module.css";

interface ButtonLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: "primary" | "secondary";
  /** External destinations open in a new tab and are named as such. */
  readonly externalHint?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  externalHint,
}: ButtonLinkProps) {
  const className = `${styles.button} ${
    variant === "primary" ? styles.buttonPrimary : styles.buttonSecondary
  }`;

  if (externalHint) {
    return (
      <a
        className={className}
        data-touch-target
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
        <span className="visually-hidden">{externalHint}</span>
      </a>
    );
  }

  return (
    <Link className={className} data-touch-target href={href}>
      {children}
    </Link>
  );
}
