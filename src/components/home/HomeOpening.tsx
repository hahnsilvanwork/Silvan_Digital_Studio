import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Arrow, localPhone } from '../editorial/icons';
import { BrowserFrame, HeroCaption, PageHero, heroStyles } from '../editorial/PageHero';
import { homeCopy } from '../../content/home-copy';
import { projects } from '../../content/projects';
import type { Locale } from '../../content/types';
import { getContent } from '../../lib/locales';
import { localizePath } from '../../lib/routes';
import { HoverPreview } from './HoverPreview';
import { VillageLandscape } from './VillageLandscape';
import styles from './home-opening.module.css';

export { Arrow, PhoneIcon, localPhone } from '../editorial/icons';

const featuredProject = projects.find(project => project.slug === 'spurwerk')!;

export function HomeOpening({ locale }: { readonly locale: Locale }) {
  const copy = homeCopy[locale];
  const content = getContent(locale);
  const { phoneDisplay, phoneHref } = content.contact.details;
  const prices = new Map(content.home.services.map(service => [service.href, service.price]));

  return <div className={styles.opening}>
    <PageHero
      id="home"
      eyebrow={copy.eyebrow}
      title={copy.headline}
      items={copy.heroServices}
      namesOnly
      primary={{ href: localizePath('/contact', locale), label: copy.primaryCta }}
      call={{ href: phoneHref, display: localPhone(phoneDisplay, locale), label: copy.callLabel }}
      facts={copy.facts}
      byline={{ href: localizePath('/about', locale), name: copy.byline, role: copy.bylineRole }}
      visual={<Link className={heroStyles.visualLink} href={localizePath(`/work/${featuredProject.slug}`, locale)} aria-labelledby="home-demo-name home-demo-action" aria-describedby="home-demo-label">
        <span className={heroStyles.screens}>
          <BrowserFrame src="/images/home/spurwerk-scroll.webp" width={960} height={3411} host={new URL(featuredProject.demoUrl).host} alt={featuredProject.copy[locale].imageAlt} />
          <span className={heroStyles.mobilePreview}><Image src="/images/projects/evidence/spurwerk-mobile-de-20261002.webp" width={780} height={1560} quality={90} sizes="(min-width: 1024px) 150px, 22vw" alt="" /></span>
        </span>
        <HeroCaption id="home-demo" name={featuredProject.name} label={copy.demoLabel} action={copy.exampleCta} />
      </Link>}
    />

    <section id="services" className={styles.services} aria-labelledby="home-services-title">
      <h2 id="home-services-title" className={styles.servicesTitle} data-reveal="rise">{copy.servicesTitle}</h2>
      <HoverPreview images={[
        { key: '/websites', src: projects.find(project => project.slug === 'cafe-vogel')!.image[locale], width: 1440, height: 1000 },
        { key: '/presence', src: '/images/home/service-presence.webp', width: 720, height: 345 },
        { key: '/reviews', src: '/images/products/catalog/review-round-black.webp', width: 1254, height: 1254 },
        { key: '/automation', src: '/images/home/service-automation.webp', width: 720, height: 476 },
      ]}>
      <ul className={styles.index}>{copy.services.map((service, index) => <li key={service.href} data-preview={service.href} data-reveal="rise" style={{ '--reveal-index': index } as CSSProperties}>
        <Link className={styles.indexRow} href={localizePath(service.href, locale)} aria-label={`${service.name}: ${service.action}`}>
          <h3 className={styles.serviceName}>{service.name}</h3>
          <span className={styles.indexRight}>
            <span className={styles.serviceText}>{service.text}</span>
            <span className={styles.servicePrice}>{('price' in service ? service.price : prices.get(service.href) ?? '').split(' · ').map(part => <span key={part}>{part.replaceAll('CHF ', 'CHF ')}</span>)}</span>
            <span className={styles.indexArrow}><Arrow /></span>
          </span>
        </Link>
      </li>)}</ul>
      </HoverPreview>
    </section>

    <VillageLandscape />
  </div>;
}
