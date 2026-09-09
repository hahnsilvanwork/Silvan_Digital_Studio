import Image from 'next/image';
import manifest from '../../../public/images/projects/evidence/manifest.json';
import type { Project } from '../../content/projects';
import type { Locale } from '../../content/types';
import styles from './work.module.css';

export function ProjectEvidence({project, locale}: {readonly project: Project; readonly locale: Locale}) {
  const language = project.slug === 'falkenried' ? locale : 'de';
  const assets = manifest.filter(item => item.project === project.slug && item.locale === language);
  const flowStart = project.slug === 'falkenried' ? `${language === 'en' ? '/en' : ''}/immobilien/#objekte` : project.slug === 'steiner-handwerk' ? '/#leistungen' : project.slug === 'salon-lumiere' ? '/leistungen/' : '/kontakt/';
  return <section className={styles.evidence} aria-labelledby={`evidence-${project.slug}`}>
    <h2 id={`evidence-${project.slug}`}>{locale === 'de' ? 'Gestaltung, die sich benutzen lässt.' : 'Design you can use.'}</h2>
    <p className={styles.evidenceIntro}>{locale === 'de' ? 'Echte Ansichten der Konzeptwebsite: auf dem Smartphone und beim nächsten Schritt.' : `Actual views of the concept website: on a phone and at the next step.${language === 'de' ? ' This demo is in German.' : ''}`}</p>
    <div className={styles.evidenceGrid}>
      {assets.map(item => <figure className={item.kind === 'mobile' ? styles.evidenceMobile : styles.evidenceWorkflow} key={item.src}>
        <Image src={item.src} width={item.width} height={item.height} sizes={item.kind === 'mobile' ? '(min-width: 56rem) 280px, 80vw' : '(min-width: 56rem) 60vw, 92vw'} alt={`${project.name}: ${locale === 'de' ? (item.kind === 'mobile' ? 'tatsächliche Smartphoneansicht' : 'ausgewähltes Anliegen in der Demoanfrage') : (item.kind === 'mobile' ? 'actual mobile view' : 'selected details in the demo enquiry')}`} />
        <figcaption><strong>{locale === 'de' ? (item.kind === 'mobile' ? 'Auch unterwegs klar.' : 'Vom Interesse zur Anfrage.') : (item.kind === 'mobile' ? 'Clear on the go.' : 'From interest to enquiry.')}</strong>
          <span>{item.kind === 'mobile' ? (locale === 'de' ? 'Die echte mobile Oberfläche mit Navigation und Einstieg.' : 'The real mobile interface, with navigation and opening content.') : project.copy[locale].outcome}</span>
          {item.kind === 'workflow' ? <a data-touch-target href={new URL(flowStart, item.sourceUrl).href} target="_blank" rel="noopener noreferrer">{locale === 'de' ? 'Ablauf in der Demo öffnen' : 'Open this flow in the demo'}<span className="visually-hidden">{locale === 'de' ? ' (neuer Tab)' : ' (new tab)'}</span></a> : null}
        </figcaption>
      </figure>)}
    </div>
  </section>;
}
