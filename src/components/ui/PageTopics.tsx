import type { Locale } from '../../content/types';
import styles from './page-topics.module.css';

export function PageTopics({ locale, items }: {
  readonly locale: Locale;
  readonly items: readonly { readonly href: string; readonly label: string }[];
}) {
  return <nav className={styles.topics} aria-label={locale === 'de' ? 'Auf dieser Seite' : 'On this page'}>
    <span className={styles.label}>{locale === 'de' ? 'Auf dieser Seite' : 'On this page'}</span>
    <ul>{items.map(item => <li key={item.href}><a href={item.href}><span>{item.label}</span></a></li>)}</ul>
  </nav>;
}
