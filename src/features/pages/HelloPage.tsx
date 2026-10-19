import Image from 'next/image';
import Link from 'next/link';
import { ContactActions } from '../../components/contact/ContactActions';
import { SaveContact } from '../../components/contact/SaveContact';
import { Arrow } from '../../components/editorial/icons';
import { EditorialPage, editorialStyles } from '../../components/editorial/Sections';
import { SiteShell } from '../../components/layout/SiteShell';
import { contactCopy } from '../../content/contact-copy';
import type { Locale } from '../../content/types';
import { getContent } from '../../lib/locales';
import { PORTRAIT } from '../../lib/portrait';
import { localizePath } from '../../lib/routes';
import styles from '../../components/contact/entry.module.css';

/** Landing page behind Silvan's own NFC card: reach him first, then explore. */
export function HelloPage({ locale }: { readonly locale: Locale }) {
  const content = getContent(locale);
  const copy = contactCopy[locale];
  return <SiteShell currentPath={localizePath('/hello', locale)} locale={locale}>
    <EditorialPage>
      <section className={styles.contactPage} aria-labelledby="hello-title">
        <div className={styles.contactHead}>
          <p className={styles.personBlock}>
            <Image className={styles.avatar} src={PORTRAIT.src} width={PORTRAIT.width} height={PORTRAIT.height} sizes="48px" alt="" />
            <span><strong>Silvan Hahn</strong><span>{content.hello.eyebrow}</span></span>
          </p>
          <h1 id="hello-title" className={editorialStyles.pageTitle}>{content.hello.title}</h1>
          <p className={editorialStyles.pageLead}>{content.hello.intro}</p>
        </div>
        <div className={styles.contactSide}>
          <h2 className="visually-hidden">{content.hello.directContactTitle}</h2>
          <ContactActions locale={locale} immediate emphasize compact />
          <SaveContact locale={locale} />
        </div>
      </section>
      <section className={styles.helloLinks} aria-labelledby="hello-explore-title">
        <h2 id="hello-explore-title">{copy.explore}</h2>
        <ul>
          {content.hello.links.map(link => <li key={link.href}>
            <Link href={localizePath(link.href, locale)}>{link.label}<Arrow /></Link>
          </li>)}
        </ul>
      </section>
    </EditorialPage>
  </SiteShell>;
}
