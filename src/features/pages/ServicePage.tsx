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
import { PageTopics } from "../../components/ui/PageTopics";
import type { Locale, RouteKey, ServiceContent } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import { getServiceReason } from "../../lib/contact-inquiry";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";
import websiteStyles from '../../styles/websites.module.css';
import { SaveContact } from '../../components/contact/SaveContact';

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
  const refined = route === "/websites" || route === "/presence" || route === "/automation";
  const pageTopics = <PageTopics locale={locale} items={[
          { href: '#packages', label: locale === 'de' ? 'Leistungen & Preise' : 'Services & prices' },
          { href: '#examples', label: locale === 'de' ? 'Beispiele & Details' : 'Examples & details' },
          { href: '#process', label: locale === 'de' ? 'Ablauf' : 'How it works' },
          { href: '#questions', label: locale === 'de' ? 'Fragen' : 'Questions' },
        ]} />;
  const sequence = revealSequence(service.title);
  const reason = getServiceReason(new URLSearchParams({ service: route.slice(1) }));
  const contactHref = `${service.ctaHref}${service.ctaHref === "/contact" && reason ? `?service=${reason}` : ""}`;

  return (
    <SiteShell currentPath={localizePath(route, locale)} locale={locale}>
      <div className={`${pageStyles.page}${refined ? ` ${websiteStyles.websitePage}` : ''}`}>
        <section className={`${layoutStyles.container} ${pageStyles.pageHeader} ${pageStyles.serviceHeader}${route !== '/websites' ? ` ${pageStyles.compactServiceHeader}` : ''}${route === '/websites' ? ` ${pageStyles.websiteHeader} ${websiteStyles.hero}` : ''}`}>
          <div className={`${pageStyles.serviceCopy}${refined ? ` ${websiteStyles.copy}` : ''}`}>
          <div className={pageStyles.serviceHeading}>
          {refined ? <h1 className={`${pageStyles.pageTitle} ${websiteStyles.title}`}>{service.title}</h1> : <SplitText
            as="h1"
            className={pageStyles.pageTitle}
            startIndex={sequence.titleStartIndex}
            text={service.title}
          />}
          </div>
          <div className={`${pageStyles.serviceSummary}${route === '/websites' ? ` ${websiteStyles.summary}` : ''}`}>
          <p
            className={pageStyles.editorialTight}
            data-reveal={refined ? undefined : 'rise'}
            style={{ "--reveal-index": sequence.introIndex } as CSSProperties}
          >
            {service.intro}
          </p>
          {route === '/websites' ? <p className={websiteStyles.startingPrice}>
            <strong>{locale === 'de' ? 'Websites ab CHF 300' : 'Websites from CHF 300'}</strong>
            <span>{locale === 'de' ? 'Einmaliger Preis für die Umsetzung. Internetadresse und Betrieb der Website kosten separat.' : 'A one-off price for the build. Your web address and keeping the site online cost extra.'}</span>
          </p> : null}
          {route === '/automation' ? <p className={websiteStyles.startingPrice}>
            <strong>{service.priceTiers[0]?.price}</strong>
            <span>{locale === 'de' ? 'Zuerst klären wir, ob sich die Aufgabe sinnvoll vereinfachen lässt. Leistungen und Preis vereinbaren wir vor dem Start.' : 'First, we check whether simplifying the task is worthwhile. We agree on the work and price before starting.'}</span>
          </p> : null}
          {route === '/presence' ? <p className={websiteStyles.startingPrice}>
            <strong>{service.priceTiers[0]?.price}</strong>
            <span>{locale === 'de' ? 'Für meine Arbeit an Ihrem Profil. Das Google-Unternehmensprofil selbst ist kostenlos.' : 'For my work on your profile. Google Business Profile itself is free.'}</span>
          </p> : null}
          <div
            className={`${pageStyles.serviceActions}${route === '/websites' ? ` ${websiteStyles.actions}` : ''}`}
            data-reveal={refined ? undefined : 'rise'}
            style={{ "--reveal-index": sequence.actionsIndex } as CSSProperties}
          >
            <ButtonLink href={localizePath(contactHref, locale)}>
              {service.ctaLabel}
            </ButtonLink>
            {route === '/websites' ? <a className={websiteStyles.priceLink} href="#packages">{locale === 'de' ? 'Leistungen und Preise ansehen' : 'View services and prices'}</a> : null}
          </div>
          </div>
          {route !== '/websites' ? <div className={pageStyles.headingTopics}>{pageTopics}</div> : null}
          </div>
          {route === "/websites" ? (
            <Link className={pageStyles.serviceVisual} href={localizePath(`/work/${projects[0].slug}`, locale)}>
              <Image quality={90} src={projects[0].image[locale]} width={1440} height={1000} sizes="(min-width: 64rem) 46vw, 92vw" priority alt={projects[0].copy[locale].imageAlt} />
              <span>{projects[0].name} / {content.work.conceptLabel}</span>
            </Link>
          ) : null}
        </section>

        {route === '/websites' ? <div className={layoutStyles.container}>{pageTopics}</div> : null}
        <section id="packages" className={`${layoutStyles.container} ${pageStyles.section}`}>
          <SectionHeading immediate
              title={service.benefitsTitle}
          />
          <div className={pageStyles.sectionBody}>
            {route === '/websites' ? <p className={pageStyles.note} data-testid="website-package-scope">{auditCopy[locale].websiteScope.beforePackages}</p> : null}
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

            {route !== '/presence' ? <ul className={pageStyles.benefitList}>
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
            </ul> : null}
          </div>
        </section>

        <div id="examples">{children}</div>

        <section id="process" className={pageStyles.darkBand}>
          <div className={layoutStyles.container}>
            <SectionHeading immediate title={service.processTitle} />
            <div className={pageStyles.sectionBody}>
              <ProcessSteps steps={service.process} />
            </div>
          </div>
        </section>

        <section id="questions" className={`${layoutStyles.container} ${pageStyles.section}`}>
          <FaqSchema items={service.faq.items} />
          <SectionHeading immediate title={service.faq.title} />
          <div className={pageStyles.sectionBody}>
            <FaqList items={service.faq.items} locale={locale} />
          </div>
        </section>

        <section className={pageStyles.contactBand}>
          <div className={`${layoutStyles.container} ${pageStyles.contactLayout}`}>
          <SectionHeading immediate
            eyebrow={content.contact.eyebrow}
            intro={refined ? (locale === 'de' ? 'Erzählen Sie mir von Ihrem Vorhaben: per Telefon, E-Mail oder WhatsApp. Sie brauchen keine technischen Vorkenntnisse, und Ihre Anfrage ist unverbindlich.' : 'Tell me about your project by phone, email or WhatsApp. You do not need any technical knowledge, and your enquiry carries no obligation.') : content.contact.intro}
            title={content.contact.title}
          />
          <div className={pageStyles.sectionBody}>
            <ContactActions locale={locale} reason={reason ?? undefined} emphasize compact={refined} immediate={refined} includeLinkedIn={!refined} />
            {refined ? <SaveContact locale={locale} /> : null}
          </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
