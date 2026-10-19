import type { Locale } from '../../content/types';
import styles from './examples.module.css';

export function PresenceExample({locale}: {readonly locale: Locale}) {
  const de=locale === 'de';
  const c=de ? {
    before:'Vor der Korrektur', after:'Nach der Korrektur', source:'Öffnungszeiten und Leistungen der fiktiven Velowerkstatt im Vergleich', name:'Velowerkstatt',
    saturday:'Samstag', web:'Website', profile:'Google-Profil', service:'Veloreparatur', absent:'Nicht angegeben', appointment:'Nach Vereinbarung',
    conflict:'Zwei Öffnungszeiten. Welche stimmen?', aligned:'Die Angaben stimmen überein.', confirm:'Die Werkstatt bestätigt: Samstag 09–12 Uhr. Veloreparaturen nach Vereinbarung.',
  } : {
    before:'Before the correction', after:'After the correction', source:'Opening hours and services at a fictional bicycle workshop, before and after correction', name:'Bicycle workshop',
    saturday:'Saturday', web:'Website', profile:'Google profile', service:'Bicycle repair', absent:'Not listed', appointment:'By appointment',
    conflict:'Two sets of hours. Which is correct?', aligned:'The details now match.', confirm:'The workshop confirms: Saturday 09:00–12:00. Bicycle repairs by appointment.',
  };
  return <figure className={styles.presence} aria-label={c.source}>
    <div className={styles.comparison}>
      {[false,true].map(after => <section className={after ? styles.after : styles.before} key={String(after)}>
        <h3>{after ? c.after : c.before}</h3><p className={styles.businessName}>{c.name}</p>
        <dl className={styles.hours}>
          <div><dt>{c.profile}<small>{c.saturday}</small></dt><dd>{after ? '09–12' : '09–16'}<span> {de ? 'Uhr' : ''}</span></dd></div>
          <div><dt>{c.web}<small>{c.saturday}</small></dt><dd>09–12<span> {de ? 'Uhr' : ''}</span></dd></div>
          <div><dt>{c.service}</dt><dd className={styles.serviceValue}>{after ? c.appointment : c.absent}</dd></div>
        </dl><p className={styles.verdict}>{after ? c.aligned : c.conflict}</p>
      </section>)}
    </div>
    <figcaption>{c.confirm}</figcaption>
  </figure>;
}
