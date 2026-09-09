import { SiteShell } from "../../components/layout/SiteShell";
import { ButtonLink } from "../../components/ui/ButtonLink";
import { ProjectPreview } from "../../components/work/ProjectPreview";
import { projects } from "../../content/projects";
import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";
import workStyles from "../../components/work/work.module.css";

interface WorkPageProps {
  readonly locale: Locale;
}

export function WorkPage({ locale }: WorkPageProps) {
  const content = getContent(locale);

  return (
    <SiteShell currentPath={localizePath("/work", locale)} locale={locale}>
      <div className={pageStyles.page}>
        <section className={`${layoutStyles.container} ${workStyles.overviewHeader}`}>
          <p className={pageStyles.heroLabel}>
            {content.work.eyebrow}
          </p>
          <h1 className={workStyles.overviewTitle}>{content.work.title}</h1>
          <p className={workStyles.overviewIntro}>
            {content.work.intro}
          </p>
          <div className={workStyles.overviewActions}>
            <ButtonLink href={localizePath("/contact", locale)}>
              {content.work.ctaLabel}
            </ButtonLink>
          </div>
        </section>

        <section className={`${layoutStyles.container} ${workStyles.overviewProjects}`}>
          <h2 className="visually-hidden">{content.work.eyebrow}</h2>
          <ul className={workStyles.previewList}>
            {projects.map((project, index) => (
              <li key={project.slug}>
                <ProjectPreview
                  index={index}
                  locale={locale}
                  // Two columns, so the first row is the first two cards.
                  priority={index < 2}
                  project={project}
                  showOutcome
                />
              </li>
            ))}
          </ul>
        </section>

      </div>
    </SiteShell>
  );
}
