import type { CSSProperties } from "react";

import { ContactActions } from "../../components/contact/ContactActions";
import { Testimonials } from "../../components/home/Testimonials";
import { SiteShell } from "../../components/layout/SiteShell";
import { revealSequence } from "../../components/motion/reveal-sequence";
import { SplitText } from "../../components/motion/SplitText";
import { ServiceDirectory } from "../../components/services/ServiceDirectory";
import { ButtonLink } from "../../components/ui/ButtonLink";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { ProjectPreview } from "../../components/work/ProjectPreview";
import { projects } from "../../content/projects";
import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";
import workStyles from "../../components/work/work.module.css";

interface HomePageProps {
  readonly locale: Locale;
}

export function HomePage({ locale }: HomePageProps) {
  const content = getContent(locale);
  const { hero } = content.home;
  const currentPath = localizePath("/", locale);
  const sequence = revealSequence(hero.headline);

  return (
    <SiteShell currentPath={currentPath} locale={locale}>
      <div className={pageStyles.page}>
        <section className={`${layoutStyles.container} ${pageStyles.hero}`}>
          <p className={pageStyles.heroLabel} data-reveal="rise">
            {hero.serviceLine}
          </p>

          <div className={pageStyles.heroBody}>
            <SplitText
              as="h1"
              className={pageStyles.heroTitle}
              startIndex={sequence.titleStartIndex}
            text={hero.headline}
            />
            <p
              className={pageStyles.editorialTight}
              data-reveal="rise"
              style={{ "--reveal-index": sequence.introIndex } as CSSProperties}
            >
              {hero.supporting}
            </p>
            <div
              className={pageStyles.heroActions}
              data-reveal="rise"
              style={{ "--reveal-index": sequence.actionsIndex } as CSSProperties}
            >
              <ButtonLink href={localizePath("/contact", locale)}>
                {hero.primaryCta}
              </ButtonLink>
              <ButtonLink
                href={localizePath("/websites", locale)}
                variant="secondary"
              >
                {hero.secondaryCta}
              </ButtonLink>
            </div>
          </div>
        </section>

        <section
          className={`${layoutStyles.container} ${pageStyles.section}`}
          id="services"
        >
          <SectionHeading
            eyebrow={content.brand.descriptor}
            title={content.home.servicesTitle}
          />
          <div className={pageStyles.sectionBody}>
            <ServiceDirectory locale={locale} services={content.home.services} />
          </div>
        </section>

        <section className={`${layoutStyles.container} ${pageStyles.section}`}>
          <SectionHeading
            eyebrow={content.work.eyebrow}
            title={content.home.workTitle}
          />
          <div className={pageStyles.sectionBody}>
            <ul className={workStyles.previewList}>
              {projects.slice(0, 4).map((project, index) => (
                <li key={project.slug}>
                  <ProjectPreview
                    index={index}
                    locale={locale}
                    project={project}
                  />
                </li>
              ))}
            </ul>
            <div className={pageStyles.sectionActions}>
              <ButtonLink
                href={localizePath("/work", locale)}
                variant="secondary"
              >
                {content.common.viewWork}
              </ButtonLink>
            </div>
          </div>
        </section>

        <Testimonials
          items={content.home.testimonials}
          title={content.home.testimonialsTitle}
        />

        <section className={pageStyles.darkBand}>
          <div className={layoutStyles.container}>
            <SectionHeading
              eyebrow={content.about.eyebrow}
              intro={content.home.studioCopy}
              title={content.home.studioTitle}
            />
            <div className={pageStyles.sectionActions}>
              <ButtonLink
                href={localizePath("/about", locale)}
                variant="secondary"
              >
                {content.common.learnMore}
              </ButtonLink>
            </div>
          </div>
        </section>

        <section className={`${layoutStyles.container} ${pageStyles.section}`}>
          <SectionHeading
            eyebrow={content.contact.eyebrow}
            intro={content.contact.intro}
            title={content.contact.title}
          />
          <div className={pageStyles.sectionBody}>
            <ContactActions locale={locale} />
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
