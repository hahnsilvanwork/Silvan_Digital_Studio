'use client';

import { useId, useState } from 'react';
import type { Locale } from '../../content/types';
import styles from './examples.module.css';

const copy = {
  de: {
    input: 'Ihre Aufgabenliste', output: 'Ihr Wochenbericht', status: 'Status', open: 'Offen', done: 'Erledigt',
    tasks: ['Offerte vorbereiten', 'Lieferung abstimmen', 'Unterlagen prüfen'], owners: ['Alex', 'Sam', 'Alex'],
    missing: 'Fehlende Zuständigkeit ausprobieren', generate: 'Bericht erstellen', approve: 'Als geprüft markieren', reset: 'Beispiel zurücksetzen',
    initial: 'Ändern Sie einen Status und erstellen Sie den Bericht.', changed: 'Daten geändert – bitte einen neuen Bericht erstellen.',
    draft: 'Entwurf bereit. Prüfen Sie die Angaben vor der Freigabe.', warning: 'Zuständigkeit fehlt. Bitte den markierten Eintrag zuerst klären.',
    approved: 'Geprüft – in dieser Demonstration wird nichts versendet.', pending: 'Noch kein Bericht', note: 'Interaktive Demonstration mit fiktiven Aufgaben. Alle Änderungen bleiben in dieser Ansicht. Es werden keine Daten gespeichert oder versendet.',
    missingOwner: 'Zuständigkeit fehlt', complete: 'erledigt', remaining: 'offen', review: 'Zur Prüfung', ready: 'Freigegebenes Beispiel',
  },
  en: {
    input: 'Your task list', output: 'Your weekly report', status: 'Status', open: 'Open', done: 'Done',
    tasks: ['Prepare a quote', 'Coordinate delivery', 'Check documents'], owners: ['Alex', 'Sam', 'Alex'],
    missing: 'Try a missing owner', generate: 'Create report', approve: 'Mark as reviewed', reset: 'Reset example',
    initial: 'Change a status and create the report.', changed: 'Data changed – please create a new report.',
    draft: 'Draft ready. Check the information before approving it.', warning: 'Owner missing. Resolve the flagged entry first.',
    approved: 'Reviewed – nothing is sent in this demonstration.', pending: 'No report yet', note: 'Interactive demonstration with fictional tasks. Changes stay in this view. No data is saved or sent.',
    missingOwner: 'Owner missing', complete: 'done', remaining: 'open', review: 'For review', ready: 'Approved example',
  },
} as const;

export function WorkflowExample({locale}: {readonly locale: Locale}) {
  const c = copy[locale];
  const id = useId();
  const [statuses, setStatuses] = useState(['done', 'open', 'open']);
  const [missingOwner, setMissingOwner] = useState(false);
  const [phase, setPhase] = useState<'initial' | 'changed' | 'draft' | 'approved'>('initial');
  const generated = phase === 'draft' || phase === 'approved';
  const done = statuses.filter(status => status === 'done').length;
  const statusText = phase === 'draft' ? (missingOwner ? c.warning : c.draft) : c[phase];

  return <div className={styles.example} data-workflow-example>
    <p className={styles.disclaimer}>{c.note}</p>
    <div className={styles.workbench}>
      <section className={styles.input} aria-labelledby={`${id}-input`}>
        <h3 id={`${id}-input`}>{c.input}</h3>
        <ul className={styles.tasks}>
          {c.tasks.map((task, index) => <li key={task}>
            <div><label htmlFor={`${id}-${index}`}>{task}</label><small>{missingOwner && index === 1 ? c.missingOwner : c.owners[index]}</small></div>
            <select id={`${id}-${index}`} aria-label={`${c.status}: ${task}`} value={statuses[index]} onChange={event => {
              setStatuses(previous => previous.map((value, position) => position === index ? event.target.value : value));
              setPhase('changed');
            }}><option value="open">{c.open}</option><option value="done">{c.done}</option></select>
          </li>)}
        </ul>
        <label className={styles.check}><input type="checkbox" checked={missingOwner} onChange={event => {setMissingOwner(event.target.checked); setPhase('changed');}} />{c.missing}</label>
        <button type="button" className={styles.primary} onClick={() => setPhase('draft')}>{c.generate}</button>
      </section>
      <section className={styles.output} aria-labelledby={`${id}-output`}>
        <div className={styles.reportTop}><h3 id={`${id}-output`}>{c.output}</h3><span>{phase === 'approved' ? c.ready : c.review}</span></div>
        {generated ? <>
          <p className={styles.reportSummary}>{done} {c.complete}<span> / </span>{3 - done} {c.remaining}</p>
          <ul className={styles.reportList}>{c.tasks.map((task, index) => <li key={task}><span>{task}<small>{missingOwner && index === 1 ? c.missingOwner : c.owners[index]}</small></span><strong>{statuses[index] === 'done' ? c.done : c.open}</strong></li>)}</ul>
          <button type="button" className={styles.secondary} disabled={missingOwner || phase === 'approved'} onClick={() => setPhase('approved')}>{c.approve}</button>
        </> : <div className={styles.empty}><span aria-hidden="true">—</span><p>{c.pending}</p></div>}
      </section>
    </div>
    <div className={styles.feedback}><p role="status">{statusText}</p><button type="button" className={styles.reset} onClick={() => {setStatuses(['done','open','open']); setMissingOwner(false); setPhase('initial');}}>{c.reset}</button></div>
  </div>;
}
