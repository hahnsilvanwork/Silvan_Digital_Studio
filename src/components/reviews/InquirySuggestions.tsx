"use client";

import Image from 'next/image';
import { useState } from 'react';
import type { Locale, NfcProduct } from '../../content/types';
import { inquiryCopy } from '../../content/inquiry-copy';
import styles from './review-inquiry.module.css';

export function InquirySuggestions({ models, locale, onSelect }: {
  readonly models: readonly NfcProduct[];
  readonly locale: Locale;
  readonly onSelect: (model: NfcProduct) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const copy = inquiryCopy[locale];
  return <section className={styles.suggestions} data-testid="inquiry-suggestions" aria-label={copy.suggestions}>
    <h3 className={styles.modelTitle}>{copy.suggestions}</h3>
    <p className={styles.hint} role="status">{models.length ? `${models.length} ${copy.matches}` : copy.noMatches}</p>
    {models.length ? <>
      <ul className={styles.suggestionList}>
        {(expanded ? models : models.slice(0, 4)).map(model => <li key={model.id}>
          <button className={styles.suggestionButton} type="button" onClick={() => onSelect(model)}>
            <Image src={model.image.src} alt="" width={72} height={72} className={styles.suggestionImage} />
            <span><span className={styles.suggestionTitle}>{model.title}</span><span className={styles.hint}>{copy.chooseModel}</span></span>
          </button>
        </li>)}
      </ul>
      {!expanded && models.length > 4 ? <button type="button" className={styles.editButton} onClick={() => setExpanded(true)}>{copy.allMatches} ({models.length})</button> : null}
    </> : null}
  </section>;
}
