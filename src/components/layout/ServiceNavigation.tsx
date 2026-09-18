"use client";

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import type { Locale } from '../../content/types';
import type { PrimaryLink } from './nav-links';
import styles from './navigation.module.css';

/** Native disclosure remains usable before hydration; Escape/outside clicks close it. */
export function ServiceNavigation({ locale, links }: { readonly locale: Locale; readonly links: readonly PrimaryLink[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && ref.current && !ref.current.contains(event.target)) ref.current.open = false;
    }
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, []);

  return <details ref={ref} className={styles.serviceDisclosure}
    onKeyDown={event => {
      if (event.key === 'Escape' && ref.current?.open) {
        event.preventDefault();
        ref.current.open = false;
        ref.current.querySelector('summary')?.focus();
      }
    }}
    onBlur={event => {
      if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
    }}>
    <summary className={`${styles.primaryLink} ${styles.serviceSummary}`} data-active={links.some(link => link.isCurrent) || undefined}>
      {locale === 'de' ? 'Weitere Leistungen' : 'More services'}
      <span className={styles.disclosureArrow} aria-hidden="true" />
    </summary>
    <ul className={styles.serviceList}>
      {links.map(link => <li key={link.href}>
        <Link href={link.href} aria-current={link.isCurrent ? 'page' : undefined} onClick={() => { if (ref.current) ref.current.open = false; }}>
          {link.label}
        </Link>
      </li>)}
    </ul>
  </details>;
}
