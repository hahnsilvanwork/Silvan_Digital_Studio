import { localPhone } from '../../components/editorial/icons';
import { HeroCaption, PageHero, heroStyles } from '../../components/editorial/PageHero';
import { ContactCall, EditorialPage, FaqSection, PriceBand, RuledList, Section, SectionHead, Steps, editorialStyles } from '../../components/editorial/Sections';
import { StickyCallBar } from '../../components/editorial/StickyCallBar';
import { SiteShell } from '../../components/layout/SiteShell';
import { WorkflowExample } from '../../components/services/WorkflowExample';
import { automationPageCopy, serviceCommon } from '../../content/service-pages-copy';
import type { Locale } from '../../content/types';
import { getContent } from '../../lib/locales';
import { localizePath } from '../../lib/routes';
import styles from '../../styles/automation.module.css';

export function AutomationPage({ locale }: { readonly locale: Locale }) {
  const content = getContent(locale);
  const service = content.automation;
  const tier = service.priceTiers[0];
  const copy = automationPageCopy[locale];
  const common = serviceCommon[locale];
  const { phoneDisplay, phoneHref } = content.contact.details;
  const contactHref = localizePath('/contact?service=automation', locale);

  return <SiteShell currentPath={localizePath('/automation', locale)} locale={locale}>
    <EditorialPage>
      <PageHero
        id="automation"
        eyebrow={service.eyebrow}
        title={service.title}
        titleFit="7.4cqi"
        lead={service.intro}
        primary={{ href: contactHref, label: service.ctaLabel }}
        call={{ href: phoneHref, display: localPhone(phoneDisplay, locale), label: common.callLabel }}
        facts={copy.facts}
        byline={{ href: localizePath('/about', locale), name: common.bylineName, role: common.bylineRole }}
        visual={<div className={heroStyles.visualBody}>
          <p className={heroStyles.visualTitle} id="automation-visual-title">{copy.visualTitle}</p>
          <ul className={heroStyles.visualList} aria-labelledby="automation-visual-title">
            {service.benefits.map((item, index) => <li key={item}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{item}</li>)}
          </ul>
          <HeroCaption id="automation-caption" name={copy.visualCaption} label={locale === 'de' ? 'Ob es passt, klären wir im Erstgespräch' : 'We check whether it fits in the first consultation'} />
        </div>}
      />

      <Section id="examples" labelledBy="automation-cases-title">
        <SectionHead id="automation-cases-title" title={service.benefitsTitle} />
        <ul className={styles.cases}>{copy.cases.map(item => <li key={item.title}>
          <h3>{item.title}</h3>
          <dl>
            <div><dt>{copy.todayLabel}</dt><dd>{item.today}</dd></div>
            <div><dt>{copy.automatedLabel}</dt><dd>{item.automated}</dd></div>
          </dl>
        </li>)}</ul>
        <p className={styles.more}><strong>{copy.moreLabel}</strong> {copy.more.join(locale === 'de' ? '; ' : '; ')}.</p>
        <p className={editorialStyles.note}>{copy.casesNote}</p>
      </Section>

      <Section id="demo" labelledBy="automation-demo-title" band>
        <div data-service-example>
          <SectionHead id="automation-demo-title" title={copy.demoTitle} intro={copy.demoIntro} />
          <WorkflowExample locale={locale} />
        </div>
      </Section>

      <Section id="fit" labelledBy="automation-fit-title">
        <SectionHead id="automation-fit-title" title={copy.fitTitle} />
        <RuledList numbered items={copy.fitQuestions.map(question => ({ title: question, text: '' }))} />
        <p className={editorialStyles.note}>{copy.fitNote}</p>
      </Section>

      <PriceBand
        id="packages"
        titleId="automation-cost-title"
        title={copy.cost.title}
        intro={copy.cost.text}
        rows={[{ id: tier.id, name: tier.name, price: tier.price, text: tier.description, link: { href: contactHref, label: common.contactLink } }]}
      />

      <Section id="process" labelledBy="automation-process-title">
        <SectionHead id="automation-process-title" title={service.processTitle} />
        <Steps steps={service.process} />
      </Section>

      <FaqSection locale={locale} id="questions" title={service.faq.title} items={service.faq.items} />

      <ContactCall locale={locale} id="automation-contact" title={copy.contactTitle} intro={common.contactIntro} link={{ href: contactHref, label: common.contactLink }} />

      <StickyCallBar callLabel={common.stickyCall} callHref={phoneHref} enquiryLabel={common.stickyEnquiry} enquiryHref={contactHref} watch={['automation-hero-actions', 'automation-contact']} />
    </EditorialPage>
  </SiteShell>;
}
