import Image from 'next/image';
import type { CSSProperties } from 'react';
import { BrandSignature } from '../../components/brand/BrandSignature';
import { StickyCallBar } from '../../components/editorial/StickyCallBar';
import { ContactCall, EditorialPage, FaqSection, PriceBand, ProjectCards, Section, Steps, TextLink, editorialStyles as styles } from '../../components/editorial/Sections';
import { HomeOpening } from '../../components/home/HomeOpening';
import { Testimonials } from '../../components/home/Testimonials';
import { SiteShell } from '../../components/layout/SiteShell';
import { homeCopy } from '../../content/home-copy';
import { projects } from '../../content/projects';
import type { Locale } from '../../content/types';
import { getContent } from '../../lib/locales';
import { PORTRAIT } from '../../lib/portrait';
import { localizePath } from '../../lib/routes';

/** The two concepts closest to the typical visitor: a café and a salon. */
const HOME_PROJECTS = ['cafe-vogel', 'salon-lumiere'] as const;

/**
 * Homepage order: opening, services, proof (examples), price and process,
 * the person, questions, one closing call. Each section carries one idea;
 * details live on the service pages.
 */
export function HomePage({ locale }: { readonly locale: Locale }) {
  const content = getContent(locale);
  const copy = homeCopy[locale];
  const contactHref = localizePath('/contact', locale);
  const homeProjects = HOME_PROJECTS.map(slug => projects.find(project => project.slug === slug)!);

  return <SiteShell currentPath={localizePath('/', locale)} locale={locale}>
    <EditorialPage>
      <HomeOpening locale={locale} />

      <Section id="work" labelledBy="home-work-title">
        <div className={styles.headRow} data-reveal="rise">
          <h2 id="home-work-title">{copy.workTitle}</h2>
          <TextLink href={localizePath('/work', locale)}>{copy.allWork}</TextLink>
        </div>
        <ProjectCards locale={locale} projects={homeProjects} action={copy.projectCta} idPrefix="home" showOutcome={false} />
      </Section>

      <PriceBand
        titleId="home-prices-title"
        title={copy.costTitle}
        intro={copy.costIntro}
        vat={copy.costVat}
        rows={content.websites.priceTiers.map(tier => ({ id: tier.id, name: tier.name, price: tier.price }))}
        link={{ href: localizePath('/websites', locale), label: copy.costCta }}
        after={<div id="process" aria-label={copy.processTitle}><Steps steps={copy.steps} /></div>}
      />

      <Testimonials items={content.home.testimonials} title={content.home.testimonialsTitle} />

      <section className={`${styles.section} ${styles.studio}`} aria-labelledby="home-studio-title">
        <figure className={styles.portrait} data-reveal="rise">
          <Image {...PORTRAIT} alt="Silvan Hahn" sizes="(min-width: 64rem) 352px, (min-width: 48rem) 40vw, 70vw" />
        </figure>
        <div className={styles.studioCopy} data-reveal="rise" style={{ '--reveal-index': 1 } as CSSProperties}>
          <h2 id="home-studio-title">{copy.studioTitle}</h2>
          <p>{copy.studioCopy}</p>
          <p className={styles.studioLine}>{copy.studioPoints.join(' · ')}</p>
          <TextLink href={localizePath('/about', locale)}>{copy.studioCta}</TextLink>
          <BrandSignature />
        </div>
      </section>

      <FaqSection locale={locale} id="faq" title={copy.faqTitle} items={copy.faq} />

      <ContactCall locale={locale} id="home-contact" title={copy.contactTitle} intro={copy.contactIntro} link={{ href: contactHref, label: copy.contactCta }} />

      <StickyCallBar callLabel={copy.stickyCall} callHref={content.contact.details.phoneHref} enquiryLabel={copy.stickyEnquiry} enquiryHref={contactHref} />
    </EditorialPage>
  </SiteShell>;
}
