import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { PORTRAIT } from '../../lib/portrait';
import { HeroGlow } from './HeroGlow';
import { HeroHorizon } from './HeroHorizon';
import { Arrow, PhoneIcon } from './icons';
import styles from './page-hero.module.css';

export interface HeroFact { readonly value: string; readonly label: string }
export interface HeroItem { readonly name: string; readonly text: string }

interface PageHeroProps {
  /** Prefix for element ids, e.g. "home" gives home-title, home-facts, home-hero-actions. */
  readonly id: string;
  readonly eyebrow: string;
  /** Each sentence is set on its own line from the two-column breakpoint. */
  readonly title: string;
  /** Column-relative title size; tune so the longest sentence keeps one line. */
  readonly titleFit?: string;
  readonly lead?: string;
  readonly items?: readonly HeroItem[];
  /** Show only the item names (no second line). */
  readonly namesOnly?: boolean;
  readonly primary: { readonly href: string; readonly label: string };
  readonly call: { readonly href: string; readonly display: string; readonly label: string };
  readonly visual: ReactNode;
  readonly facts: readonly HeroFact[];
  readonly byline: { readonly href: string; readonly name: string; readonly role: string };
}

/** The navy opening shared by the homepage and every service page. */
export function PageHero({ id, eyebrow, title, titleFit, lead, items, namesOnly = false, primary, call, visual, facts, byline }: PageHeroProps) {
  return <div className={styles.opening}>
    <section className={styles.hero} aria-labelledby={`${id}-title`}>
      <HeroGlow className={styles.glow} />
      <div className={styles.intro}>
        <div className={styles.introText}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 id={`${id}-title`} className={styles.title} style={titleFit ? { '--title-fit': titleFit } as CSSProperties : undefined}>
            {title.split(/(?<=\.)\s/).map((line, index) => <span key={line}>{index > 0 ? ' ' : null}<span className={styles.titleLine}><span className={styles.titleInner} style={{ '--i': index } as CSSProperties}>{line}</span></span></span>)}
          </h1>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
          {items ? <ul className={`${styles.heroList}${namesOnly ? ` ${styles.heroNames}` : ''}`}>{items.map((item, index) => <li key={item.name} style={{ '--i': index } as CSSProperties}><strong>{item.name}</strong>{namesOnly ? null : <> <span>{item.text}</span></>}</li>)}</ul> : null}
        </div>
        <div id={`${id}-hero-actions`} className={styles.actions}>
          <Link className={styles.primary} href={primary.href} aria-describedby={`${id}-facts`}>{primary.label}<Arrow /></Link>
          <a className={styles.call} href={call.href} aria-label={`${call.label}: ${call.display}`}><PhoneIcon /><span>{call.display}</span></a>
        </div>
      </div>
      <figure className={styles.visual}>{visual}</figure>
      <div className={styles.strip}>
        <HeroHorizon />
        <ul id={`${id}-facts`} className={styles.facts}>{facts.map(fact => <li key={fact.value}><strong>{fact.value}</strong> <span>{fact.label}</span></li>)}</ul>
        <Link className={styles.byline} href={byline.href}>
          <Image className={styles.avatar} src={PORTRAIT.src} width={PORTRAIT.width} height={PORTRAIT.height} sizes="48px" alt="" />
          <span><span className={styles.bylineName}>{byline.name}</span><span className={styles.bylineRole}>{byline.role}</span></span>
        </Link>
      </div>
    </section>
  </div>;
}

/** Caption row on the bottom line of the visual column. */
export function HeroCaption({ id, name, label, action }: { readonly id: string; readonly name: string; readonly label: string; readonly action?: string }) {
  return <span className={styles.caption}>
    <span className={styles.captionIdentity}><span id={`${id}-name`}>{name}</span><span id={`${id}-label`} className={styles.captionLabel}>{label}</span></span>
    {action ? <span id={`${id}-action`} className={styles.captionAction}>{action}<Arrow /></span> : null}
  </span>;
}

export const heroStyles = styles;

/**
 * A light browser window showing a real page that scrolls once from top to
 * bottom and back. The scroll distance comes from the capture's proportions,
 * so any full-page screenshot works.
 */
export function BrowserFrame({ src, width, height, host, alt }: { readonly src: string; readonly width: number; readonly height: number; readonly host: string; readonly alt: string }) {
  // The window is 16:10, so it shows 0.625 of the page width in height.
  const end = -(1 - (0.625 * width) / height) * 100;
  return <span className={`${styles.previewStage} ${styles.browser}`} style={{ '--scroll-end': end.toFixed(1) } as CSSProperties}>
    <span className={styles.browserBar} aria-hidden="true"><span className={styles.browserDots}><i /><i /><i /></span><span className={styles.browserUrl}>{host}</span></span>
    <span className={styles.browserView}>
      <Image className={styles.browserPage} src={src} width={width} height={height} quality={85} preload sizes="(min-width: 1600px) 620px, (min-width: 1024px) 42vw, (min-width: 768px) 560px, 84vw" alt={alt} />
    </span>
  </span>;
}
