import Link from "next/link";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { ContactActions } from "../../components/contact/ContactActions";
import { SiteShell } from "../../components/layout/SiteShell";
import { revealSequence } from "../../components/motion/reveal-sequence";
import { SplitText } from "../../components/motion/SplitText";
import { FaqList } from "../../components/services/FaqList";
import { PriceTierList } from "../../components/services/PriceTierList";
import { ProcessSteps } from "../../components/services/ProcessSteps";
import { FaqSchema } from "../../components/seo/FaqSchema";
import { ButtonLink } from "../../components/ui/ButtonLink";
import { SectionHeading } from "../../components/ui/SectionHeading";
import type { Locale, RouteKey, ServiceContent } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";

interface ServicePageProps {
  readonly locale: Locale;
  readonly route: RouteKey;
  readonly service: ServiceContent;
  /** Rendered between the price tiers and the process, when a page needs it. */
  readonly children?: ReactNode;
}

export function ServicePage({
  locale,
  route,
  service,
  children,
}: ServicePageProps) {
  const content = getContent(locale);
  const sequence = revealSequence(service.title);

  return (
    <SiteShell currentPath={localizePath(route, locale)} locale={locale}>
      <div className={pageStyles.page}>
        <section className={`${layoutStyles.container} ${pageStyles.pageHeader} ${pageStyles.serviceHeader}`}>
          <div className={pageStyles.serviceHeading}>
          <SplitText
            as="h1"
            className={pageStyles.pageTitle}
            startIndex={sequence.titleStartIndex}
            text={service.title}
          />
          {route === "/websites" ? (
            <Link className={pageStyles.serviceVisual} href={localizePath("/work/archa", locale)}>
              <Image src="/images/editorial/architecture-concept.webp" width={1536} height={1024} sizes="(min-width: 64rem) 48vw, 100vw" priority alt={locale === "de" ? "Archa: Website-Konzept für ein Architekturbüro" : "Archa: website concept for an architecture practice"} />
              <span>Archa / {content.work.conceptLabel}</span>
            </Link>
          ) : null}
          </div>
          <div className={pageStyles.serviceSummary}>
          <p
            className={pageStyles.editorialTight}
            data-reveal="rise"
            style={{ "--reveal-index": sequence.introIndex } as CSSProperties}
          >
            {service.intro}
          </p>
          <div
            className={pageStyles.heroActions}
            data-reveal="rise"
            style={{ "--reveal-index": sequence.actionsIndex } as CSSProperties}
          >
            <ButtonLink href={localizePath(service.ctaHref, locale)}>
              {service.ctaLabel}
            </ButtonLink>
          </div>
        <div className={pageStyles.studioNote}>
          <p className={pageStyles.studioNoteLinks} data-reveal="rise">
            <Link className="hoverUnderline" href={localizePath("/about", locale)}>
              {content.about.eyebrow}
            </Link>
            <Link className="hoverUnderline" href={localizePath("/work", locale)}>
              {content.common.viewWork}
            </Link>
          </p>
        </div>
          </div>
        </section>

        <section className={`${layoutStyles.container} ${pageStyles.section}`}>
          <SectionHeading
            eyebrow={service.priceLabel}
            title={service.benefitsTitle}
          />
          <div className={pageStyles.sectionBody}>
            <PriceTierList
              recommendedLabel={content.common.recommended}
              tiers={service.priceTiers}
            />

            <ul className={pageStyles.benefitList}>
              {service.benefits.map((benefit, index) => (
                <li
                  className={pageStyles.benefit}
                  data-reveal="rise"
                  key={benefit}
                  style={{ "--reveal-index": index } as CSSProperties}
                >
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {children}

        <section className={pageStyles.darkBand}>
          <div className={layoutStyles.container}>
            <SectionHeading title={service.processTitle} />
            <div className={pageStyles.sectionBody}>
              <ProcessSteps steps={service.process} />
            </div>
          </div>
        </section>

        <section className={`${layoutStyles.container} ${pageStyles.section}`}>
          <FaqSchema items={service.faq.items} />
          <SectionHeading title={service.faq.title} />
          <div className={pageStyles.sectionBody}>
            <FaqList items={service.faq.items} locale={locale} />
          </div>
        </section>

        <section className={pageStyles.contactBand}>
          <div className={`${layoutStyles.container} ${pageStyles.contactLayout}`}>
          <SectionHeading
            eyebrow={content.contact.eyebrow}
            intro={content.contact.intro}
            title={content.contact.title}
          />
          <div className={pageStyles.sectionBody}>
            <ContactActions locale={locale} />
          </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
