import Image from 'next/image';
import Link from 'next/link';
import { localPhone } from '../../components/editorial/icons';
import { BrowserFrame, HeroCaption, PageHero, heroStyles } from '../../components/editorial/PageHero';
import { ContactCall, EditorialPage, FaqSection, PriceBand, ProjectCards, RuledList, Section, SectionHead, Steps, TextLink, editorialStyles } from '../../components/editorial/Sections';
import { StickyCallBar } from '../../components/editorial/StickyCallBar';
import { SiteShell } from '../../components/layout/SiteShell';
import { projects } from '../../content/projects';
import { serviceCommon, websitesPageCopy } from '../../content/service-pages-copy';
import type { Locale } from '../../content/types';
import { getContent } from '../../lib/locales';
import { localizePath } from '../../lib/routes';

const heroProject = projects.find(project => project.slug === 'cafe-vogel')!;
const exampleProjects = ['salon-lumiere', 'falkenried'].map(slug => projects.find(project => project.slug === slug)!);

export function WebsitesPage({ locale }: { readonly locale: Locale }) {
  const content = getContent(locale);
  const service = content.websites;
  const copy = websitesPageCopy[locale];
  const common = serviceCommon[locale];
  const { phoneDisplay, phoneHref } = content.contact.details;
  const contactHref = localizePath('/contact?service=websites', locale);

  return <SiteShell currentPath={localizePath('/websites', locale)} locale={locale}>
    <EditorialPage>
      <PageHero
        id="websites"
        eyebrow={service.eyebrow}
        title={service.title}
        titleFit="8.4cqi"
        lead={service.intro}
        primary={{ href: contactHref, label: service.ctaLabel }}
        call={{ href: phoneHref, display: localPhone(phoneDisplay, locale), label: common.callLabel }}
        facts={copy.facts}
        byline={{ href: localizePath('/about', locale), name: common.bylineName, role: common.bylineRole }}
        visual={<Link className={heroStyles.visualLink} href={localizePath(`/work/${heroProject.slug}`, locale)} aria-labelledby="websites-demo-name websites-demo-action" aria-describedby="websites-demo-label">
          <span className={heroStyles.screens}>
            <BrowserFrame src="/images/home/cafe-vogel-scroll.webp" width={960} height={2160} host={new URL(heroProject.demoUrl).host} alt={heroProject.copy[locale].imageAlt} />
            <span className={heroStyles.mobilePreview}><Image src="/images/projects/evidence/cafe-vogel-mobile-de-20260930.webp" width={780} height={1560} quality={90} sizes="(min-width: 1024px) 150px, 22vw" alt="" /></span>
          </span>
          <HeroCaption id="websites-demo" name={heroProject.name} label={content.work.conceptLabel} action={common.exampleAction} />
        </Link>}
      />

      <Section id="included" labelledBy="websites-included-title">
        <SectionHead id="websites-included-title" title={copy.includedTitle} />
        <RuledList items={copy.included} />
      </Section>

      <PriceBand
        id="packages"
        titleId="websites-packages-title"
        title={service.benefitsTitle}
        intro={copy.packagesIntro}
        vat={copy.vat}
        rows={service.priceTiers.map(tier => ({
          id: tier.id,
          name: tier.name,
          price: tier.price,
          text: tier.description,
          more: <><strong>{copy.fitLabel}</strong> {copy.fits[tier.id as keyof typeof copy.fits]}</>,
          link: { href: localizePath(`/contact?service=websites&tier=${tier.id}`, locale), label: copy.packageLink },
        }))}
        box={{ title: copy.runningTitle, text: copy.runningText }}
      />

      <Section id="process" labelledBy="websites-process-title">
        <SectionHead id="websites-process-title" title={service.processTitle} />
        <Steps steps={service.process} />
      </Section>

      <Section id="examples" labelledBy="websites-examples-title">
        <div className={editorialStyles.headRow} data-reveal="rise">
          <h2 id="websites-examples-title">{copy.examplesTitle}</h2>
          <TextLink href={localizePath('/work', locale)}>{common.allExamples}</TextLink>
        </div>
        <ProjectCards locale={locale} projects={exampleProjects} action={common.exampleAction} idPrefix="websites" showOutcome={false} />
      </Section>

      <FaqSection locale={locale} id="questions" title={service.faq.title} items={service.faq.items} />

      <ContactCall locale={locale} id="websites-contact" title={copy.contactTitle} intro={common.contactIntro} link={{ href: contactHref, label: common.contactLink }} />

      <StickyCallBar callLabel={common.stickyCall} callHref={phoneHref} enquiryLabel={common.stickyEnquiry} enquiryHref={contactHref} watch={['websites-hero-actions', 'websites-contact']} />
    </EditorialPage>
  </SiteShell>;
}
