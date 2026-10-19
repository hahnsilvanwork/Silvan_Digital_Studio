'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './editorial.module.css';

interface StickyCallBarProps {
  readonly callLabel: string;
  readonly callHref: string;
  readonly enquiryLabel: string;
  readonly enquiryHref: string;
  /** Ids of the hero actions and the closing contact section. */
  readonly watch?: readonly [string, string];
}

/**
 * Phone-only shortcut bar. It stays hidden while the hero actions or the
 * contact section are on screen, so it never duplicates a visible button.
 */
export function StickyCallBar({ callLabel, callHref, enquiryLabel, enquiryHref, watch = ['home-hero-actions', 'home-contact'] }: StickyCallBarProps) {
  const [visible, setVisible] = useState(false);
  const [heroId, contactId] = watch;

  useEffect(() => {
    const targets = [heroId, contactId]
      .map(id => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (targets.length === 0 || !('IntersectionObserver' in window)) return;
    const onScreen = new Map<Element, boolean>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) onScreen.set(entry.target, entry.isIntersecting);
      const heroPassed = targets[0].getBoundingClientRect().bottom < 0;
      setVisible(heroPassed && ![...onScreen.values()].some(Boolean));
    });
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, [heroId, contactId]);

  return <div className={styles.stickyBar} data-visible={visible} aria-hidden={!visible} inert={!visible}>
    <a href={callHref}>{callLabel}</a>
    <Link href={enquiryHref}>{enquiryLabel}</Link>
  </div>;
}
