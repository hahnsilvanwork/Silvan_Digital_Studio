import Image from "next/image";
import Link from "next/link";
import { ContactActions } from "../../components/contact/ContactActions";
import { Testimonials } from "../../components/home/Testimonials";
import { SiteShell } from "../../components/layout/SiteShell";
import { ServiceDirectory } from "../../components/services/ServiceDirectory";
import { ButtonLink } from "../../components/ui/ButtonLink";
import { SectionHeading } from "../../components/ui/SectionHeading";
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
  const de = locale === "de";
  return (
    <SiteShell currentPath={localizePath("/", locale)} locale={locale}>
      <div className={styles.home}>
        <section className={`${layoutStyles.container} ${styles.hero}`}>
          <h1 className={styles.title}>{hero.headline}</h1>
          <figure className={styles.heroFigure}>
            <Link className={styles.heroImageLink} href={localizePath("/work/archa", locale)} aria-label={de ? "Architekturkonzept Archa ansehen" : "Explore the Archa architecture concept"}>
              <Image src="/images/editorial/architecture-concept.webp" alt={de ? "Visualisierung des Website-Konzepts Archa auf einem Laptop auf hellem Naturstein" : "Archa website concept shown on a laptop on pale natural stone"} width={1536} height={1024} priority sizes="(min-width: 64rem) 56vw, 100vw" />
            </Link>
            <figcaption className={styles.caption}>
              <span>Archa / {content.work.conceptLabel}</span>
              <Link href={localizePath("/work/archa", locale)}>{de ? "Projekt ansehen" : "View project"}<span className={styles.arrow} aria-hidden="true" /></Link>
            </figcaption>
          </figure>
          <div className={styles.heroCopy}>
            <p>{de ? "Websites und digitale Lösungen von Silvan Hahn. Persönlich gestaltet. Einfach zu bedienen." : "Websites and digital solutions by Silvan Hahn. Personally designed. Easy to use."}</p>
            <div className={styles.actions}>
              <ButtonLink href={localizePath("/contact", locale)}>{hero.primaryCta}</ButtonLink>
              <Link className={styles.textLink} href="#services">{hero.secondaryCta}<span className={styles.arrow} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>
        <section id="services" className={`${layoutStyles.container} ${styles.services}`}>
          <div className={styles.sectionIntro}>
            <h2>{content.home.servicesTitle}</h2>
            <p>{de ? "Ein klarer Auftritt. Einfachere Abläufe. Finden Sie den passenden Einstieg für Ihr Unternehmen." : "A clearer presence. Simpler workflows. Find the right starting point for your business."}</p>
          </div>
          <ServiceDirectory locale={locale} services={content.home.services} />
        </section>
        <section className={styles.work}>
          <div className={layoutStyles.container}>
            <div className={styles.sectionTop}>
              <h2>{content.home.workTitle}</h2>
              <p>{de ? "Eigene Konzepte. Von der ersten Idee bis ins Detail." : "Self-initiated concepts. From the first idea to the finest detail."}</p>
            </div>
            <ul className={styles.projects}>
              {projects.slice(0, 2).map((project) => (
                <li key={project.slug}>
                  <Link className={styles.selectedProject} href={localizePath(`/work/${project.slug}`, locale)}>
                    <Image src={`/images/editorial/${project.slug === "archa" ? "architecture" : "lumen"}-concept.webp`} width={1536} height={1024} sizes="(min-width: 64rem) 46vw, 100vw" alt="" />
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
              <h2>{de ? "Ein kleines Produkt. Ein direkter Weg zu Ihnen." : "A small product. A direct connection to you."}</h2>
              <p>{de ? "Bewertungen, Speisekarten oder Buchungen: Ihre Kunden halten das Handy an die Karte oder scannen den QR-Code. Das richtige Ziel öffnet sich direkt." : "Reviews, menus or bookings: your customers tap the card or scan the QR code. The right destination opens straight away."}</p>
              <Link className={styles.textLink} href={localizePath("/reviews", locale)}>{de ? "NFC & QR entdecken" : "Explore NFC & QR"}<span className={styles.arrow} aria-hidden="true" /></Link>
            </div>
            <Link className={styles.productImage} href={localizePath("/reviews", locale)}>
              <Image src="/images/products/catalog/all-products.webp" width={1536} height={1024} sizes="(min-width: 64rem) 52vw, 100vw" alt={de ? "NFC-Karten und Aufsteller für Google-Bewertungen und digitale Speisekarten" : "NFC cards and stands for Google reviews and digital menus"} />
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
