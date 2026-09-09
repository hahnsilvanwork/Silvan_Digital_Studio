import Image from "next/image";
import Link from "next/link";
import { ContactActions } from "../../components/contact/ContactActions";
import { Testimonials } from "../../components/home/Testimonials";
import { SiteShell } from "../../components/layout/SiteShell";
import { ServiceDirectory } from "../../components/services/ServiceDirectory";
import { ButtonLink } from "../../components/ui/ButtonLink";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { auditCopy } from "../../content/audit-copy";
import { projects } from "../../content/projects";
import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { PORTRAIT } from "../../lib/portrait";
import { localizePath } from "../../lib/routes";
import layoutStyles from "../../styles/layout.module.css";
import styles from "../../components/home/editorial-home.module.css";

export function HomePage({ locale }: { readonly locale: Locale }) {
  const content = getContent(locale);
  const { hero } = content.home;
  const copy = auditCopy[locale].home;
  return (
    <SiteShell currentPath={localizePath("/", locale)} locale={locale}>
      <div className={styles.home}>
        <section className={`${layoutStyles.container} ${styles.hero}`}>
          <h1 className={styles.title}>{hero.headline}</h1>
          <div className={styles.heroCopy}>
            <p>{copy.intro}</p>
            <div className={styles.actions}>
              <ButtonLink href={localizePath("/contact", locale)}>{hero.primaryCta}</ButtonLink>
              <Link className={styles.textLink} href="#services">{hero.secondaryCta}<span className={styles.arrow} aria-hidden="true" /></Link>
            </div>
          </div>
          <figure className={styles.heroFigure}>
            <Link className={styles.heroImageLink} href={localizePath(`/work/${projects[0].slug}`, locale)} aria-label={copy.heroProjectLabel}>
              <Image quality={90} src={projects[0].image[locale]} alt={projects[0].copy[locale].imageAlt} width={1440} height={1000} loading="eager" fetchPriority="high" sizes="(min-width: 90rem) 750px, (min-width: 64rem) 54vw, 92vw" />
            </Link>
            <figcaption className={styles.caption}>
              <span>{projects[0].name} / {content.work.conceptLabel}</span>
              <Link href={localizePath(`/work/${projects[0].slug}`, locale)}>{copy.viewProject}<span className={styles.arrow} aria-hidden="true" /></Link>
            </figcaption>
          </figure>
        </section>
        <section id="services" className={`${layoutStyles.container} ${styles.services}`}>
          <div className={styles.sectionIntro}>
            <h2>{content.home.servicesTitle}</h2>
            <p>{copy.servicesIntro}</p>
          </div>
          <ServiceDirectory locale={locale} services={content.home.services} />
        </section>
        <section className={styles.work}>
          <div className={layoutStyles.container}>
            <div className={styles.sectionTop}>
              <h2>{content.home.workTitle}</h2>
              <p>{copy.workIntro}</p>
            </div>
            <ul className={styles.projects}>
              {projects.slice(1, 3).map((project) => (
                <li key={project.slug}>
                  <Link className={styles.selectedProject} href={localizePath(`/work/${project.slug}`, locale)}>
                    <Image quality={90} src={project.image[locale]} width={1440} height={1000} sizes="(min-width: 64rem) 46vw, 100vw" alt="" />
                    <div className={styles.projectHeading}><h3>{project.name}</h3><span className={styles.arrow} aria-hidden="true" /></div>
                    <p>{project.copy[locale].tagline}</p>
                    <span className={styles.projectLabel}>{content.work.conceptLabel}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link className={styles.textLink} href={localizePath("/work", locale)}>{content.common.viewWork}<span className={styles.arrow} aria-hidden="true" /></Link>
          </div>
        </section>
        <section className={styles.productBand}>
          <div className={`${layoutStyles.container} ${styles.productLayout}`}>
            <div className={styles.productCopy}>
              <h2>{copy.productTitle}</h2>
              <p>{copy.productIntro}</p>
              <Link className={styles.textLink} href={localizePath("/reviews", locale)}>{copy.productCta}<span className={styles.arrow} aria-hidden="true" /></Link>
            </div>
            <Link className={styles.productImage} href={localizePath("/reviews", locale)}>
              <Image src="/images/products/catalog/all-products.webp" width={1536} height={1024} sizes="(min-width: 64rem) 52vw, 100vw" alt={copy.productAlt} />
            </Link>
          </div>
        </section>
        <Testimonials items={content.home.testimonials} title={content.home.testimonialsTitle} />
        <section className={`${layoutStyles.container} ${styles.studio}`}>
          <figure className={styles.portrait}>
            <Image {...PORTRAIT} alt="Silvan Hahn" sizes="(min-width: 64rem) 30vw, 80vw" />
            <figcaption>Silvan Hahn / Boppelsen, Zürich</figcaption>
          </figure>
          <div className={styles.studioCopy}>
            <h2>{content.home.studioTitle}</h2>
            <p>{content.home.studioCopy}</p>
            <Link className={styles.textLink} href={localizePath("/about", locale)}>{content.about.eyebrow}<span className={styles.arrow} aria-hidden="true" /></Link>
          </div>
        </section>
        <section className={`${layoutStyles.container} ${styles.contact}`}>
          <SectionHeading intro={content.contact.intro} title={content.contact.title} />
          <ContactActions locale={locale} />
        </section>
      </div>
    </SiteShell>
  );
}
