import { localPhone } from '../../components/editorial/icons';
import { HeroCaption, PageHero, heroStyles } from '../../components/editorial/PageHero';
import { ContactCall, EditorialPage, FaqSection, PriceBand, RuledList, Section, SectionHead, Steps, editorialStyles } from '../../components/editorial/Sections';
import { StickyCallBar } from '../../components/editorial/StickyCallBar';
import { SiteShell } from '../../components/layout/SiteShell';
import { PresenceExample } from '../../components/services/PresenceExample';
import { presenceCopy } from '../../content/presence-copy';
import { presencePageCopy, serviceCommon } from '../../content/service-pages-copy';
import type { Locale } from '../../content/types';
import { getContent } from '../../lib/locales';
import { localizePath } from '../../lib/routes';
import styles from '../../styles/presence.module.css';

export function PresencePage({ locale }: { readonly locale: Locale }) {
  const content = getContent(locale);
  const service = content.presence;
  const tier = service.priceTiers[0];
  const copy = presencePageCopy[locale];
  const common = serviceCommon[locale];
  const { phoneDisplay, phoneHref } = content.contact.details;
  const contactHref = localizePath('/contact?service=presence', locale);

  return <SiteShell currentPath={localizePath('/presence', locale)} locale={locale}>
    <EditorialPage>
      <PageHero
        id="presence"
        eyebrow={service.eyebrow}
        title={service.title}
        titleFit="7.2cqi"
        lead={service.intro}
        primary={{ href: contactHref, label: service.ctaLabel }}
        call={{ href: phoneHref, display: localPhone(phoneDisplay, locale), label: common.callLabel }}
        facts={copy.facts}
        byline={{ href: localizePath('/about', locale), name: common.bylineName, role: common.bylineRole }}
        visual={<div className={heroStyles.visualBody}>
          <p className={heroStyles.visualTitle} id="presence-listing-title">{copy.listingTitle}</p>
          <ul className={heroStyles.visualList} aria-labelledby="presence-listing-title">
            {copy.listing.map((item, index) => <li key={item}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{item}</li>)}
          </ul>
          <HeroCaption id="presence-free" name={locale === 'de' ? 'Der Eintrag ist bei Google kostenlos' : 'The listing is free on Google'} label={locale === 'de' ? 'Sie bezahlen nur meine Arbeit' : 'You only pay for my work'} />
        </div>}
      />

      <PriceBand
        id="packages"
        titleId="presence-packages-title"
        title={copy.packagesTitle}
        intro={copy.packagesIntro}
        vat={copy.vat}
        rows={[{
          id: tier.id,
          name: tier.name,
          price: tier.price,
          text: tier.description,
          more: <>{tier.features.join(', ')}.</>,
          link: { href: contactHref, label: copy.packageLink },
        }]}
        box={copy.box}
      />

      <Section id="examples" labelledBy="presence-example-title">
        <div data-service-example>
          <SectionHead id="presence-example-title" title={copy.exampleTitle} intro={copy.exampleIntro} />
          <p className={styles.exampleLabel}>{copy.exampleLabel}</p>
          <PresenceExample locale={locale} />
          <p className={editorialStyles.note}>{copy.exampleNote}</p>
        </div>
      </Section>

      <Section id="process" labelledBy="presence-process-title">
        <SectionHead id="presence-process-title" title={service.processTitle} />
        <Steps steps={service.process} />
      </Section>

      <Section id="ownership" labelledBy="presence-ownership-title" band>
        <SectionHead id="presence-ownership-title" title={copy.ownershipTitle} />
        <RuledList items={copy.ownership.map(item => ({ title: item.title, text: item.text }))} />
        <p className={editorialStyles.note}>{copy.googleLinksLabel}</p>
        <ul className={styles.links}>
          {presenceCopy[locale].links.map(link => <li key={link.id}><a href={`https://support.google.com/business/answer/${link.id}?hl=${locale}`} rel="noreferrer">{link.label}</a></li>)}
        </ul>
      </Section>

      <FaqSection locale={locale} id="questions" title={service.faq.title} items={service.faq.items} />

      <ContactCall locale={locale} id="presence-contact" title={copy.contactTitle} intro={common.contactIntro} link={{ href: contactHref, label: common.contactLink }} />

      <StickyCallBar callLabel={common.stickyCall} callHref={phoneHref} enquiryLabel={common.stickyEnquiry} enquiryHref={contactHref} watch={['presence-hero-actions', 'presence-contact']} />
    </EditorialPage>
  </SiteShell>;
}
