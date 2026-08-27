import Link from "next/link";
import type { CSSProperties } from "react";

import { ContactActions } from "../../components/contact/ContactActions";
import { SiteShell } from "../../components/layout/SiteShell";
import { SplitText } from "../../components/motion/SplitText";
import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";

interface HelloPageProps {
  readonly locale: Locale;
}

/**
 * The NFC card landing page: a short, thumb-reachable launchpad. Every row is a
 * single tap away from a destination or a direct contact action.
 */
export function HelloPage({ locale }: HelloPageProps) {
  const content = getContent(locale);

  return (
    <SiteShell currentPath={localizePath("/hello", locale)} locale={locale}>
      <div className={pageStyles.page}>
        <section className={`${layoutStyles.container} ${pageStyles.pageHeader}`}>
          <p className={pageStyles.heroLabel} data-reveal="rise">
            {content.hello.eyebrow}
          </p>
          <SplitText
            as="h1"
            className={pageStyles.pageTitle}
            text={content.hello.title}
          />
          <p className={pageStyles.editorialTight} data-reveal="rise">
            {content.hello.intro}
          </p>
        </section>

        <section className={`${layoutStyles.container} ${pageStyles.section}`}>
          <h2 className="visually-hidden">{content.navigation.primaryLabel}</h2>
          <ul className={pageStyles.launchpad}>
            {content.hello.links.map((link, index) => (
              <li
                className={pageStyles.launchpadItem}
                data-reveal="rise"
                key={link.href}
                style={{ "--reveal-index": index } as CSSProperties}
              >
                <Link
                  className={pageStyles.launchpadLink}
                  data-touch-target
                  href={localizePath(link.href, locale)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${layoutStyles.container} ${pageStyles.section}`}>
          <h2 className={pageStyles.sectionLabel}>
            {content.hello.directContactTitle}
          </h2>
          <ContactActions locale={locale} />
        </section>
      </div>
    </SiteShell>
  );
}
