import { SiteShell } from "../../components/layout/SiteShell";
import { SplitText } from "../../components/motion/SplitText";
import { ButtonLink } from "../../components/ui/ButtonLink";
import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";

interface NotFoundPageProps {
  readonly locale: Locale;
}

export function NotFoundPage({ locale }: NotFoundPageProps) {
  const content = getContent(locale);
  const home = localizePath("/", locale);

  return (
    <SiteShell currentPath={home} locale={locale}>
      <div className={pageStyles.page}>
        <section className={`${layoutStyles.container} ${pageStyles.hero}`}>
          <p className={pageStyles.heroLabel}>{content.notFound.eyebrow}</p>
          <div className={pageStyles.heroBody}>
            <SplitText
              as="h1"
              className={pageStyles.heroTitle}
              text={content.notFound.title}
            />
            <p className={pageStyles.editorialTight}>
              {content.notFound.description}
            </p>
            <div className={pageStyles.heroActions}>
              <ButtonLink href={home}>{content.notFound.homeLabel}</ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
