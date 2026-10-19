import Image from 'next/image';
import manifest from '../../../public/images/projects/evidence/manifest.json';
import type { Project } from '../../content/projects';
import type { Locale } from '../../content/types';
import styles from './work.module.css';

export function ProjectEvidence({project, locale}: {readonly project: Project; readonly locale: Locale}) {
  const language = project.slug === 'falkenried' ? locale : 'de';
  const assets = manifest.filter(item => item.project === project.slug && item.locale === language);
  const flowStart = project.slug === 'falkenried' ? `${language === 'en' ? '/en' : ''}/immobilien/#objekte` : project.slug === 'spurwerk' ? '/velos/' : project.slug === 'salon-lumiere' ? '/leistungen/' : '/kontakt/';
  return <section className={styles.evidence} aria-labelledby={`evidence-${project.slug}`}>
    <h2 id={`evidence-${project.slug}`}>{locale === 'de' ? 'Ein Blick in die Website.' : 'A closer look at the website.'}</h2>
    <p className={styles.evidenceIntro}>{locale === 'de' ? 'Diese Ansichten zeigen die Beispiel-Website auf dem Handy und beim Vorbereiten einer Anfrage.' : `These screenshots show the example website on a phone and while preparing an enquiry.${language === 'de' ? ' This example website is in German.' : ''}`}</p>
    <div className={styles.evidenceGrid}>
      {assets.map(item => <figure className={item.kind === 'mobile' ? styles.evidenceMobile : styles.evidenceWorkflow} key={item.src}>
        <Image src={item.src} width={item.width} height={item.height} sizes={item.kind === 'mobile' ? '(min-width: 56rem) 280px, 80vw' : '(min-width: 56rem) 60vw, 92vw'} alt={`${project.name}: ${locale === 'de' ? (item.kind === 'mobile' ? 'Ansicht auf dem Handy' : 'ausgewählte Angaben in der Demoanfrage') : (item.kind === 'mobile' ? 'view on a phone' : 'selected details in the demo enquiry')}`} />
        <figcaption><strong>{locale === 'de' ? (item.kind === 'mobile' ? 'Auf dem Handy.' : 'Die Anfrage im Beispiel.') : (item.kind === 'mobile' ? 'On a phone.' : 'The example enquiry.')}</strong>
          <span>{item.kind === 'mobile' ? (locale === 'de' ? 'Das Menü und der Einstieg passen sich dem schmalen Bildschirm an.' : 'The menu and opening content adapt to the smaller screen.') : project.copy[locale].outcome}</span>
          {item.kind === 'workflow' ? <a data-touch-target href={new URL(flowStart, item.sourceUrl).href} target="_blank" rel="noopener noreferrer">{locale === 'de' ? 'In der Demo ausprobieren' : language === 'de' ? 'Try it in the demo (German)' : 'Try it in the demo'}<span className="visually-hidden">{locale === 'de' ? ' (neuer Tab)' : ' (new tab)'}</span></a> : null}
        </figcaption>
      </figure>)}
    </div>
  </section>;
}
