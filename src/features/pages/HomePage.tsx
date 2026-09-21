import Image from 'next/image';
import Link from 'next/link';
import { ContactActions } from '../../components/contact/ContactActions';
import { Testimonials } from '../../components/home/Testimonials';
import { SiteShell } from '../../components/layout/SiteShell';
import { ServiceDirectory } from '../../components/services/ServiceDirectory';
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
  const contactHref = localizePath('/contact', locale);

  return <SiteShell currentPath={localizePath('/', locale)} locale={locale}>
    <div className={styles.home}>
      <section className={`${layoutStyles.container} ${styles.hero}`}>
        <div className={styles.heroIntro}>
          <h1 className={styles.title}>{copy.headline}</h1>
          <p className={styles.heroDescription}>{copy.intro}</p>
          <div className={styles.actions}>
            <ButtonLink href={contactHref}>{copy.primaryCta}</ButtonLink>
            <Link className={styles.textLink} href="#services">{copy.secondaryCta}<span className={styles.arrow} aria-hidden="true" /></Link>
          </div>
          <Link className={styles.byline} href={localizePath('/about', locale)}>
            <Image {...PORTRAIT} alt="" sizes="48px" className={styles.avatar} />
            <span>{copy.byline}</span>
          </Link>
        </div>
        <figure className={styles.heroFigure}>
          <Link className={styles.heroImageLink} href={localizePath(`/work/${featured.slug}`, locale)} aria-label={`${featured.name} – ${copy.projectCta}`}>
            <Image quality={90} src={featured.image[locale]} alt={featured.copy[locale].imageAlt} width={1440} height={1000} loading="eager" fetchPriority="high" sizes="(min-width: 98rem) 696px, (min-width: 64rem) 46vw, 92vw" />
          </Link>
          <figcaption className={styles.caption}>
            <span>{featured.name} / {content.work.conceptLabel}</span>
            <Link href={localizePath(`/work/${featured.slug}`, locale)}>{copy.projectCta}<span className={styles.arrow} aria-hidden="true" /></Link>
          </figcaption>
        </figure>
      </section>

      <section id="services" className={styles.supportingServices}>
        <div className={`${layoutStyles.container} ${styles.services}`}>
          <div className={styles.sectionIntro}><h2>{copy.servicesTitle}</h2><p>{copy.servicesIntro}</p></div>
          <ServiceDirectory locale={locale} services={content.home.services} />
        </div>
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
            </li>)}
          </ul>
          <Link className={styles.textLink} href={localizePath('/work', locale)}>{content.common.viewWork}<span className={styles.arrow} aria-hidden="true" /></Link>
        </div>
      </section>

      <Testimonials items={content.home.testimonials} title={content.home.testimonialsTitle} />
      <section className={`${layoutStyles.container} ${styles.studio}`}>
        <figure className={styles.portrait}><Image {...PORTRAIT} alt="Silvan Hahn" sizes="(min-width: 98rem) 696px, (min-width: 48rem) 46vw, 92vw" /><figcaption>Silvan Hahn / Boppelsen, Zürich</figcaption></figure>
        <div className={styles.studioCopy}><h2>{content.home.studioTitle}</h2><p>{content.home.studioCopy}</p><Link className={styles.textLink} href={localizePath('/about', locale)}>{content.about.eyebrow}<span className={styles.arrow} aria-hidden="true" /></Link></div>
      </section>

      <section className={styles.contactBand}>
        <div className={`${layoutStyles.container} ${styles.contact}`}>
          <div className={styles.sectionIntro}><h2>{copy.contactTitle}</h2><p>{copy.contactIntro}</p><Link className={styles.textLink} href={contactHref}>{copy.contactCta}<span className={styles.arrow} aria-hidden="true" /></Link></div>
          <ContactActions locale={locale} emphasize immediate />
        </div>
      </section>
    </div>
  </SiteShell>;
}
