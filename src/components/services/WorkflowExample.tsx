'use client';

import { useId, useState } from 'react';
import type { Locale } from '../../content/types';
import styles from './examples.module.css';

const copy = {
  de: {
    input: 'Aufgaben', output: 'Wochenbericht', status: 'Bearbeitungsstand', open: 'Offen', done: 'Erledigt',
    tasks: ['Offerte vorbereiten', 'Lieferung abstimmen', 'Unterlagen prüfen'], owners: ['Alex', 'Sam', 'Alex'],
    missing: 'Fehler ausprobieren: Aufgabe ohne zuständige Person', generate: 'Bericht erstellen', approve: 'Freigeben', reset: 'Beispiel zurücksetzen',
    initial: 'Ändern Sie eine Aufgabe und klicken Sie auf «Bericht erstellen».', changed: 'Aufgaben geändert. Erstellen Sie den Bericht neu.',
    draft: 'Der Bericht ist bereit. Prüfen Sie ihn und geben Sie ihn frei.', warning: 'Zuständigkeit fehlt: Bei einer Aufgabe ist keine Person eingetragen. Entfernen Sie das Häkchen und erstellen Sie den Bericht neu.',
    approved: 'Freigegeben. In diesem Beispiel wird nichts versendet.', pending: 'Noch kein Bericht. Klicken Sie auf «Bericht erstellen».', note: 'Erfundene Aufgaben. Es wird nichts gespeichert oder versendet.',
    missingOwner: 'Keine Person zugeordnet', complete: 'erledigt', remaining: 'offen', review: 'Berichtsvorschau', ready: 'Geprüftes Beispiel',
  },
  en: {
    input: 'Tasks', output: 'Weekly report', status: 'Task status', open: 'Open', done: 'Done',
    tasks: ['Prepare a quote', 'Coordinate delivery', 'Check documents'], owners: ['Alex', 'Sam', 'Alex'],
    missing: 'Try an error: task with no assigned person', generate: 'Create report', approve: 'Approve', reset: 'Reset example',
    initial: 'Change a task and click “Create report”.', changed: 'Tasks changed. Create the report again.',
    draft: 'The report is ready. Check it and approve it.', warning: 'Owner missing: one task has no assigned person. Untick the box and create the report again.',
    approved: 'Approved. This example does not send anything.', pending: 'No report yet. Click “Create report”.', note: 'Made-up tasks. Nothing is saved or sent.',
    missingOwner: 'No person assigned', complete: 'done', remaining: 'open', review: 'Report preview', ready: 'Reviewed example',
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
        </> : <div className={styles.empty}><p>{c.pending}</p></div>}
      </section>
    </div>
    <div className={styles.feedback}><p role="status">{statusText}</p><button type="button" className={styles.reset} onClick={() => {setStatuses(['done','open','open']); setMissingOwner(false); setPhase('initial');}}>{c.reset}</button></div>
  </div>;
}
