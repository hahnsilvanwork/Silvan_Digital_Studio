import type { Locale } from '../../content/types';
import styles from './examples.module.css';

export function PresenceExample({locale}: {readonly locale: Locale}) {
  const de=locale === 'de';
  const c=de ? {
    before:'Vor dem Abgleich', after:'Nach bestätigter Korrektur', source:'Angaben im Beispiel', name:'Velowerkstatt · fiktives Beispiel',
    saturday:'Samstag', web:'Website', profile:'Google-Profil', service:'Veloreparatur', absent:'Leistung fehlt', appointment:'Nach Termin',
    conflict:'Zwei Zeiten. Welche gilt?', aligned:'Die Angaben stimmen überein.', confirm:'Der Betrieb bestätigt: Samstag 09–12 Uhr. Veloreparaturen nach Termin.',
  } : {
    before:'Before the review', after:'After the confirmed correction', source:'Details in this example', name:'Bike workshop · fictional example',
    saturday:'Saturday', web:'Website', profile:'Google profile', service:'Bicycle repair', absent:'Service missing', appointment:'By appointment',
    conflict:'Two times. Which is correct?', aligned:'The details now agree.', confirm:'The business confirms: Saturday 09:00–12:00. Bicycle repairs by appointment.',
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
