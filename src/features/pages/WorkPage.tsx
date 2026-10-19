import { ContactCall, EditorialPage, PageHead, ProjectCards, Section, TextLink, editorialStyles } from '../../components/editorial/Sections';
import { SiteShell } from '../../components/layout/SiteShell';
import { projects } from '../../content/projects';
import type { Locale } from '../../content/types';
import { getContent } from '../../lib/locales';
import { localizePath } from '../../lib/routes';

/** Closest to the typical visitor first: café, salon, workshop, then the company group. */
const WORK_ORDER = ['cafe-vogel', 'salon-lumiere', 'spurwerk', 'falkenried'] as const;

const copy = {
  de: {
    note: 'Alle Beispiele sind fiktiv. Es sind keine Kundenaufträge.',
    action: 'Beispiel ansehen',
    contactTitle: 'Möchten Sie eine Website wie diese?',
    contactIntro: 'Rufen Sie an oder schreiben Sie mir. Im kostenlosen Erstgespräch klären wir, was Ihre Website braucht. Danach erhalten Sie eine Offerte mit Fixpreis.',
    contactLink: 'Anfrage schreiben',
  },
  en: {
    note: 'All examples are fictional. They are not client projects.',
    action: 'View example',
    contactTitle: 'Would you like a website like this?',
    contactIntro: 'Call or write to me. In a free first consultation we work out what your website needs. You then receive a quote with a fixed price.',
    contactLink: 'Send an enquiry',
  },
} as const;

export function WorkPage({ locale }: { readonly locale: Locale }) {
  const content = getContent(locale);
  const c = copy[locale];
  const ordered = WORK_ORDER.map(slug => projects.find(project => project.slug === slug)).filter(project => project !== undefined);
  const listed = [...ordered, ...projects.filter(project => !WORK_ORDER.includes(project.slug as (typeof WORK_ORDER)[number]))];
  const contactHref = localizePath('/contact?service=websites', locale);

  return <SiteShell currentPath={localizePath('/work', locale)} locale={locale}>
    <EditorialPage>
      <PageHead
        id="work-title"
        eyebrow={locale === 'de' ? 'Beispiele' : 'Examples'}
        title={content.work.title}
        lead={content.work.intro}
        aside={<>
          <p className={editorialStyles.note}>{c.note}</p>
          <TextLink href={localizePath('/contact', locale)}>{content.work.ctaLabel}</TextLink>
        </>}
      />

      <Section id="examples" labelledBy="work-examples-title">
        <h2 id="work-examples-title" className="visually-hidden">{content.work.eyebrow}</h2>
        <ProjectCards locale={locale} projects={listed} action={c.action} idPrefix="work" />
      </Section>

      <ContactCall locale={locale} id="work-contact" title={c.contactTitle} intro={c.contactIntro} link={{ href: contactHref, label: c.contactLink }} />
    </EditorialPage>
  </SiteShell>;
}
