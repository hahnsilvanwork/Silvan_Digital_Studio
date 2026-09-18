import Link from "next/link";
import { projects } from "../../content/projects";
import { auditCopy } from "../../content/audit-copy";
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
import { getServiceReason } from "../../lib/contact-inquiry";
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
  const reason = getServiceReason(new URLSearchParams({ service: route.slice(1) }));
  const contactHref = `${service.ctaHref}${service.ctaHref === "/contact" && reason ? `?service=${reason}` : ""}`;

  return (
    <SiteShell currentPath={localizePath(route, locale)} locale={locale}>
      <div className={pageStyles.page}>
        <section className={`${layoutStyles.container} ${pageStyles.pageHeader} ${pageStyles.serviceHeader}${route === '/websites' ? ` ${pageStyles.websiteHeader}` : ''}`}>
          <div className={pageStyles.serviceCopy}>
          <div className={pageStyles.serviceHeading}>
          <SplitText
            as="h1"
            className={pageStyles.pageTitle}
            startIndex={sequence.titleStartIndex}
            text={service.title}
          />
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
            className={pageStyles.serviceActions}
            data-reveal="rise"
            style={{ "--reveal-index": sequence.actionsIndex } as CSSProperties}
          >
            <ButtonLink href={localizePath(contactHref, locale)}>
              {service.ctaLabel}
            </ButtonLink>
            <Link className={pageStyles.serviceSecondaryAction} href={localizePath("/about", locale)}>
              {content.about.eyebrow}
            </Link>
            <Link className={pageStyles.serviceSecondaryAction} href={localizePath("/work", locale)}>
              {content.common.viewWork}
            </Link>
          </div>
          </div>
          </div>
          {route === "/websites" ? (
            <Link className={pageStyles.serviceVisual} href={localizePath(`/work/${projects[0].slug}`, locale)}>
              <Image quality={90} src={projects[0].image[locale]} width={1440} height={1000} sizes="(min-width: 64rem) 46vw, 92vw" priority alt={projects[0].copy[locale].imageAlt} />
              <span>{projects[0].name} / {content.work.conceptLabel}</span>
            </Link>
          ) : null}
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
              websiteLocale={route === '/websites' ? locale : undefined}
            />

            {route === "/websites" ? (
              <div className={pageStyles.legalSection}>
                <h3 className={pageStyles.legalHeading}>{auditCopy[locale].websiteScope.title}</h3>
                <p className={pageStyles.note}>{auditCopy[locale].websiteScope.costs}</p>
                <p className={pageStyles.note}>{auditCopy[locale].websiteScope.agreement}</p>
              </div>
            ) : null}

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
            <ContactActions locale={locale} reason={reason ?? undefined} emphasize />
          </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
