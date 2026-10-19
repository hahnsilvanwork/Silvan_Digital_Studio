import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { ContactActions } from '../contact/ContactActions';
import { SaveContact } from '../contact/SaveContact';
import { FaqSchema } from '../seo/FaqSchema';
import { FaqList } from '../services/FaqList';
import type { FaqItem, Locale } from '../../content/types';
import type { Project } from '../../content/projects';
import { getContent } from '../../lib/locales';
import type { ServiceReason } from '../../lib/contact-inquiry';
import { localizePath } from '../../lib/routes';
import { Arrow, localPhone } from './icons';
import styles from './editorial.module.css';

export const editorialStyles = styles;

export interface TitledText { readonly title: string; readonly text: string }

/** Page wrapper: sets the shared column split, section rhythm and text colour. */
export function EditorialPage({ children }: { readonly children: ReactNode }) {
  return <div className={styles.home}>{children}</div>;
}

/** Heading on the left, intro on the right, aligned on the last baseline. */
export function SectionHead({ id, title, intro }: { readonly id: string; readonly title: string; readonly intro?: string }) {
  return <div className={styles.head} data-reveal="rise"><h2 id={id}>{title}</h2>{intro ? <p>{intro}</p> : null}</div>;
}

export function Section({ id, labelledBy, band = false, className, children }: { readonly id?: string; readonly labelledBy: string; readonly band?: boolean; readonly className?: string; readonly children: ReactNode }) {
  const inner = <section id={id} className={`${styles.section}${className ? ` ${className}` : ''}`} aria-labelledby={labelledBy}>{children}</section>;
  return band ? <div className={styles.band}>{inner}</div> : inner;
}

/** White page head for pages without the navy opening. */
export function PageHead({ id, eyebrow, title, lead, aside }: { readonly id: string; readonly eyebrow?: string; readonly title: string; readonly lead?: string; readonly aside?: ReactNode }) {
  return <header className={styles.pageHead}>
    <div>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h1 id={id} className={styles.pageTitle}>{title}</h1>
    </div>
    <div className={styles.pageAside}>{lead ? <p className={styles.pageLead}>{lead}</p> : null}{aside}</div>
  </header>;
}

export function RuledList({ items, numbered = false }: { readonly items: readonly TitledText[]; readonly numbered?: boolean }) {
  return <ul className={styles.ruled}>{items.map((item, index) => <li key={item.title}>
    {numbered ? <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span> : null}
    <h3>{item.title}</h3>{item.text ? <p>{item.text}</p> : null}
  </li>)}</ul>;
}

export function Steps({ steps }: { readonly steps: readonly { readonly title: string; readonly description: string }[] }) {
  return <ol className={styles.steps}>{steps.map((step, index) => <li key={step.title} data-reveal="rise" style={{ '--reveal-index': index } as CSSProperties}>
    <span className={styles.stepNumber} aria-hidden="true">{index + 1}</span>
    <h3>{step.title}</h3>
    <p>{step.description}</p>
  </li>)}</ol>;
}

export interface PriceRow { readonly id: string; readonly name: string; readonly price: string; readonly text?: string; readonly more?: ReactNode; readonly link?: { readonly href: string; readonly label: string } }

/** Pale band: intro left (sticky on desktop), ruled price lines right. */
export function PriceBand({ id = 'prices', titleId, title, intro, vat, rows, box, link, after }: {
  readonly id?: string; readonly titleId: string; readonly title: string; readonly intro: string; readonly vat?: string;
  readonly rows: readonly PriceRow[]; readonly box?: TitledText; readonly link?: { readonly href: string; readonly label: string };
  /** Extra content inside the band, below the price grid (for example the three steps). */
  readonly after?: ReactNode;
}) {
  return <section id={id} className={styles.band} aria-labelledby={titleId}>
    <div className={styles.cost}>
      <div className={styles.costIntro} data-reveal="rise">
        <h2 id={titleId}>{title}</h2>
        <p>{intro}</p>
        {vat ? <p className={styles.vat}>{vat}</p> : null}
      </div>
      <div className={styles.costDetail}>
        <ul className={styles.tiers}>{rows.map((row, index) => <li key={row.id} data-reveal="rise" style={{ '--reveal-index': index } as CSSProperties}>
          <h3 className={styles.tierName}>{row.name}</h3>
          <span className={styles.tierPrice}>{row.price.replaceAll('CHF ', 'CHF ')}</span>
          {row.text ? <span className={styles.tierText}>{row.text}</span> : null}
          {row.more ? <span className={styles.tierMore}>{row.more}</span> : null}
          {row.link ? <Link className={`${styles.textLink} ${styles.tierLink}`} href={row.link.href}>{row.link.label}<Arrow /></Link> : null}
        </li>)}</ul>
        {box ? <div className={styles.running}><h3>{box.title}</h3><p>{box.text}</p></div> : null}
        {link ? <Link className={styles.textLink} href={link.href}>{link.label}<Arrow /></Link> : null}
      </div>
    </div>
    {after ? <div className={styles.bandAfter}>{after}</div> : null}
  </section>;
}

export function FaqSection({ locale, id = 'faq', title, items }: { readonly locale: Locale; readonly id?: string; readonly title: string; readonly items: readonly FaqItem[] }) {
  const { phoneDisplay, phoneHref } = getContent(locale).contact.details;
  const hint = locale === 'de' ? 'Ihre Frage ist nicht dabei? Rufen Sie mich an:' : 'Your question is not listed? Call me:';
  return <section id={id} className={`${styles.section} ${styles.faq}`} aria-labelledby={`${id}-title`}>
    <FaqSchema items={items} />
    <div className={styles.faqHead} data-reveal="rise">
      <h2 id={`${id}-title`}>{title}</h2>
      <p>{hint} <a href={phoneHref}>{localPhone(phoneDisplay, locale)}</a></p>
    </div>
    <FaqList items={items} locale={locale} />
  </section>;
}

export function ContactBand({ locale, id = 'contact-band', title, intro, link, reason }: {
  readonly locale: Locale; readonly id?: string; readonly title: string; readonly intro: string;
  readonly link: { readonly href: string; readonly label: string }; readonly reason?: ServiceReason;
}) {
  return <section id={id} className={styles.band} aria-labelledby={`${id}-title`}>
    <div className={styles.contact}>
      <div className={styles.contactIntro}>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{intro}</p>
        <Link className={styles.textLink} href={link.href}>{link.label}<Arrow /></Link>
      </div>
      <div className={styles.contactChannels}><ContactActions locale={locale} reason={reason} emphasize immediate compact includeLinkedIn={false} /></div>
      <div className={styles.contactSave}><SaveContact locale={locale} /></div>
    </div>
  </section>;
}

export function ProjectCards({ locale, projects, action, idPrefix = 'project', showOutcome = true }: { readonly locale: Locale; readonly projects: readonly Project[]; readonly action: string; readonly idPrefix?: string; readonly showOutcome?: boolean }) {
  const label = getContent(locale).work.conceptLabel;
  return <ul className={styles.projects}>{projects.map((project, index) => <li key={project.slug} data-reveal="rise" style={{ '--reveal-index': index } as CSSProperties}>
    <Link className={styles.projectLink} href={localizePath(`/work/${project.slug}`, locale)} aria-labelledby={`${idPrefix}-${project.slug}-title ${idPrefix}-${project.slug}-action`}>
      <Image quality={90} src={project.image[locale]} width={1440} height={1000} sizes="(min-width: 86rem) 660px, (min-width: 48rem) 46vw, 92vw" alt={project.copy[locale].imageAlt} />
      <span className={styles.projectMeta}>
        <span className={styles.projectName} id={`${idPrefix}-${project.slug}-title`}>{project.name}</span>
        <span className={styles.projectLabel}>{label}</span>
      </span>
      {showOutcome ? <span className={styles.projectOutcome}>{project.copy[locale].outcome}</span> : null}
      <span className={styles.projectAction} id={`${idPrefix}-${project.slug}-action`}>{action}<Arrow /></span>
    </Link>
  </li>)}</ul>;
}

export function TextLink({ href, children }: { readonly href: string; readonly children: ReactNode }) {
  return <Link className={styles.textLink} href={href}>{children}<Arrow /></Link>;
}

/** Closing call: one line, the phone number set large, one button. */
export function ContactCall({ locale, id, title, intro, link }: { readonly locale: Locale; readonly id: string; readonly title: string; readonly intro: string; readonly link: { readonly href: string; readonly label: string } }) {
  const { phoneDisplay, phoneHref } = getContent(locale).contact.details;
  const display = localPhone(phoneDisplay, locale);
  return <section id={id} className={styles.band} aria-labelledby={`${id}-title`}>
    <div className={styles.call}>
      <div className={styles.callText} data-reveal="rise">
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{intro}</p>
      </div>
      <div className={styles.callActions} data-reveal="rise" style={{ '--reveal-index': 1 } as CSSProperties}>
        <a className={styles.callNumber} href={phoneHref} aria-label={`${locale === 'de' ? 'Anrufen' : 'Call'}: ${display}`}>{display}</a>
        <Link className={styles.callButton} href={link.href}>{link.label}<Arrow /></Link>
      </div>
    </div>
  </section>;
}
