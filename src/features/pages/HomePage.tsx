import Image from 'next/image';
import Link from 'next/link';
import { ContactActions } from '../../components/contact/ContactActions';
import { Testimonials } from '../../components/home/Testimonials';
import { SiteShell } from '../../components/layout/SiteShell';
import { FaqList } from '../../components/services/FaqList';
import { ServiceDirectory } from '../../components/services/ServiceDirectory';
import { FaqSchema } from '../../components/seo/FaqSchema';
import { ButtonLink } from '../../components/ui/ButtonLink';
import { homeCopy } from '../../content/home-copy';
import { projects } from '../../content/projects';
import type { Locale } from '../../content/types';
import { getContent } from '../../lib/locales';
import { PORTRAIT } from '../../lib/portrait';
import { localizePath } from '../../lib/routes';
import layoutStyles from '../../styles/layout.module.css';
import styles from '../../components/home/editorial-home.module.css';

export function HomePage({ locale }: { readonly locale: Locale }) {
  const content = getContent(locale);
  const copy = homeCopy[locale];
  const featured = projects[0];
  const contactHref = localizePath('/contact?service=websites', locale);
  const supportingServices = content.home.services.filter(service => service.href !== '/websites' && service.href !== '/reviews');

  return <SiteShell currentPath={localizePath('/', locale)} locale={locale}>
    <div className={styles.home}>
      <section className={`${layoutStyles.container} ${styles.hero}`}>
        <h1 className={styles.title}>{copy.headline}</h1>
        <div className={styles.heroIntro}>
          <p className={styles.heroDescription}>{copy.intro}</p>
          <div className={styles.actions}>
            <ButtonLink href={localizePath('/websites', locale)}>{copy.primaryCta}</ButtonLink>
            <ButtonLink href={localizePath('/reviews', locale)}>{copy.secondaryCta}</ButtonLink>
          </div>
          <Link className={styles.byline} href={localizePath('/about', locale)}>
            <Image {...PORTRAIT} alt="" sizes="48px" className={styles.avatar} />
            <span>{copy.byline}</span>
          </Link>
        </div>
      </section>

      <section id="services" aria-label={locale === 'de' ? 'Websites und NFC' : 'Websites and NFC'} className={`${layoutStyles.container} ${styles.primaryOffers}`}>
        <article className={styles.primaryOffer}>
          <h2>Websites</h2>
          <Link className={styles.heroImageLink} href={localizePath('/websites', locale)} aria-label={copy.primaryCta}>
            <Image quality={90} src={featured.image[locale]} alt={featured.copy[locale].imageAlt} width={1440} height={1000} loading="eager" fetchPriority="high" sizes="(min-width: 98rem) 696px, (min-width: 64rem) 46vw, 92vw" />
          </Link>
          <p className={styles.offerDescription}>{copy.offerIntro}</p>
          <div><p className={styles.offerPrice}>{content.home.services[0].price}</p><p className={styles.priceNote}>{copy.priceNote}</p></div>
          <ul className={styles.offerPoints}>{copy.offerPoints.map(point => <li key={point}>{point}</li>)}</ul>
          <Link className={styles.textLink} href={localizePath('/websites', locale)}>{copy.pricesCta}<span className={styles.arrow} aria-hidden="true" /></Link>
          <p className={styles.offerNote}>{featured.name} / {content.work.conceptLabel}</p>
        </article>
        <article className={styles.primaryOffer}>
          <h2>NFC &amp; QR</h2>
          <Link className={styles.heroImageLink} href={localizePath('/reviews', locale)} aria-label={copy.secondaryCta}>
            <Image src="/images/products/catalog/all-products.webp" width={1536} height={1024} loading="eager" sizes="(min-width: 98rem) 696px, (min-width: 64rem) 46vw, 92vw" alt={locale === 'de' ? 'NFC-Karten und Aufsteller für Bewertungen und digitale Menüs' : 'NFC cards and stands for reviews and digital menus'} />
          </Link>
          <p className={styles.offerDescription}>{copy.nfcIntro}</p>
          <div><p className={`${styles.offerPrice} ${styles.nfcPrice}`}>{content.home.services[1].price}</p><p className={styles.priceNote}>{locale === 'de' ? 'Je nach Produkt und Ausführung.' : 'Depending on product and configuration.'}</p></div>
          <ul className={styles.offerPoints}>{copy.nfcPoints.map(point => <li key={point}>{point}</li>)}</ul>
          <Link className={styles.textLink} href={localizePath('/reviews', locale)}>{copy.nfcCta}<span className={styles.arrow} aria-hidden="true" /></Link>
        </article>
      </section>

      <section id="work" className={styles.work}>
        <div className={layoutStyles.container}>
          <div className={styles.sectionTop}><h2>{copy.workTitle}</h2><p>{copy.workIntro}</p></div>
          <ul className={styles.projects}>
            {projects.slice(1, 3).map(project => <li key={project.slug} className={styles.project}>
              <Link className={styles.selectedProject} href={localizePath(`/work/${project.slug}`, locale)}>
                <Image quality={90} src={project.image[locale]} width={1440} height={1000} sizes="(min-width: 64rem) 46vw, 100vw" alt={project.copy[locale].imageAlt} />
                <div className={styles.projectHeading}><h3>{project.name}</h3><span className={styles.arrow} aria-hidden="true" /></div>
                <span className={styles.projectLabel}>{content.work.conceptLabel}</span>
              </Link>
              <dl className={styles.projectEvidence}>
                <div><dt>{copy.challenge}</dt><dd>{project.copy[locale].challenge}</dd></div>
                <div><dt>{copy.outcome}</dt><dd>{project.copy[locale].outcome}</dd></div>
              </dl>
              <a className={styles.textLink} href={locale === 'en' && project.demoUrlEn ? project.demoUrlEn : project.demoUrl} target="_blank" rel="noopener noreferrer">
                {copy.demoCta}<span className="visually-hidden"> – {project.name}. {content.a11y.externalLink}</span><span className={styles.arrow} aria-hidden="true" />
              </a>
            </li>)}
          </ul>
          <Link className={styles.textLink} href={localizePath('/work', locale)}>{content.common.viewWork}<span className={styles.arrow} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className={`${layoutStyles.container} ${styles.process}`}>
        <div className={styles.sectionTop}><h2>{copy.processTitle}</h2><p>{copy.processIntro}</p></div>
        <ol className={styles.steps}>{copy.steps.map((step, index) => <li key={step.title}>
          <span className={styles.stepNumber} aria-hidden="true">0{index + 1}</span>
          <h3>{step.title}</h3><p>{step.description}</p>
        </li>)}</ol>
        <Link className={styles.textLink} href={contactHref}>{copy.websiteCta}<span className={styles.arrow} aria-hidden="true" /></Link>
      </section>

      <section className={styles.supportingServices}>
        <div className={`${layoutStyles.container} ${styles.services}`}>
          <div className={styles.sectionIntro}><h2>{copy.servicesTitle}</h2><p>{copy.servicesIntro}</p></div>
          <ServiceDirectory locale={locale} services={supportingServices} />
        </div>
      </section>

      <Testimonials items={content.home.testimonials} title={content.home.testimonialsTitle} />
      <section className={`${layoutStyles.container} ${styles.studio}`}>
        <figure className={styles.portrait}><Image {...PORTRAIT} alt="Silvan Hahn" sizes="(min-width: 98rem) 696px, (min-width: 48rem) 46vw, 92vw" /><figcaption>Silvan Hahn / Boppelsen, Zürich</figcaption></figure>
        <div className={styles.studioCopy}><h2>{content.home.studioTitle}</h2><p>{content.home.studioCopy}</p><Link className={styles.textLink} href={localizePath('/about', locale)}>{content.about.eyebrow}<span className={styles.arrow} aria-hidden="true" /></Link></div>
      </section>

      <section className={`${layoutStyles.container} ${styles.faq}`}>
        <h2>{copy.faqTitle}</h2><FaqSchema items={copy.faq} /><FaqList items={copy.faq} locale={locale} />
      </section>
      <section className={styles.contactBand}>
        <div className={`${layoutStyles.container} ${styles.contact}`}>
          <div className={styles.sectionIntro}><h2>{copy.contactTitle}</h2><p>{copy.contactIntro}</p><Link className={styles.textLink} href={localizePath('/contact', locale)}>{copy.contactCta}<span className={styles.arrow} aria-hidden="true" /></Link></div>
          <ContactActions locale={locale} emphasize immediate />
        </div>
      </section>
    </div>
  </SiteShell>;
}
