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
        <section className={`${layoutStyles.container} ${pageStyles.pageHeader}`}>
          <p className={pageStyles.heroLabel} data-reveal="rise">
            {service.eyebrow}
          </p>
          <SplitText
            as="h1"
            className={pageStyles.pageTitle}
            startIndex={sequence.titleStartIndex}
            text={service.title}
          />
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
            <FaqList items={service.faq.items} />
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
