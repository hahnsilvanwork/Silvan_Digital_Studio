import Image from "next/image";

import type { Project } from "../../content/projects";
import { portfolioCopy } from "../../content/portfolio-copy";
import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import { ContactCall, EditorialPage, Section, SectionHead, TextLink, editorialStyles } from "../editorial/Sections";
import { ButtonLink } from "../ui/ButtonLink";
import styles from "./work.module.css";
import { ProjectEvidence } from './ProjectEvidence';

interface ProjectDetailProps {
  readonly project: Project;
  readonly next: Project;
  readonly locale: Locale;
}

const detailCopy = {
  de: { aboutTitle: 'Worum es geht', allExamples: 'Alle Beispiele', nextLabel: 'Nächstes Beispiel', contactTitle: 'Möchten Sie eine Website wie diese?', contactIntro: 'Rufen Sie an oder schreiben Sie mir. Im kostenlosen Erstgespräch klären wir, was Ihre Website braucht. Danach erhalten Sie eine Offerte mit Fixpreis.', contactLink: 'Anfrage schreiben' },
  en: { aboutTitle: 'What it is about', allExamples: 'All examples', nextLabel: 'Next example', contactTitle: 'Would you like a website like this?', contactIntro: 'Call or write to me. In a free first consultation we work out what your website needs. You then receive a quote with a fixed price.', contactLink: 'Send an enquiry' },
} as const;

export function ProjectDetail({ project, next, locale }: ProjectDetailProps) {
  const content = getContent(locale);
  const copy = project.copy[locale];
  const caseStudy = portfolioCopy[locale];
  const d = detailCopy[locale];

  const sections = [
    { label: content.work.challengeLabel, body: copy.challenge },
    { label: caseStudy.approachLabel, body: copy.approach },
    { label: caseStudy.outcomeLabel, body: copy.outcome },
  ];

  return (
    <EditorialPage>
      <header className={styles.detailHead}>
        <div>
          <p className={editorialStyles.eyebrow}>{content.work.conceptLabel} · {copy.category}</p>
          <h1 className={editorialStyles.pageTitle}>{project.name}</h1>
        </div>
        <div className={styles.detailAside}>
          <p className={editorialStyles.pageLead}>{copy.tagline}</p>
          <div className={styles.detailActions}>
            <ButtonLink href={locale === "en" ? project.demoUrlEn ?? project.demoUrl : project.demoUrl} externalHint={locale === "de" ? " (neuer Tab)" : " (new tab)"}>
              {locale === "de" ? "Beispiel-Website öffnen" : project.demoUrlEn ? "Open example website" : "Open example website (German)"}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={{ flexShrink: 0 }}><path d="M7 17 17 7M7 7h10v10" /></svg>
            </ButtonLink>
            <TextLink href={localizePath('/work', locale)}>{d.allExamples}</TextLink>
          </div>
        </div>
      </header>

      <div className={styles.detailMedia} data-project={project.slug}>
        <Image alt={copy.imageAlt} height={1000} priority quality={90} sizes="(min-width: 98rem) 1376px, 92vw" src={project.image[locale]} width={1440} />
      </div>

      <Section labelledBy="detail-about-title">
        <SectionHead id="detail-about-title" title={d.aboutTitle} />
        <dl className={styles.detailRows}>
          {sections.map(section => <div key={section.label}>
            <dt>{section.label}</dt>
            <dd>{section.body}</dd>
          </div>)}
        </dl>
        <div className={styles.evidence}><ProjectEvidence project={project} locale={locale} /></div>
        <aside className={`${editorialStyles.running} ${styles.limits}`} aria-label={caseStudy.limitsLabel}>
          <h3>{caseStudy.limitsLabel}</h3>
          <p>{caseStudy.limits}</p>
        </aside>
      </Section>

      <ContactCall locale={locale} id="detail-contact" title={d.contactTitle} intro={d.contactIntro} link={{ href: localizePath('/contact?service=websites', locale), label: d.contactLink }} />

      <nav aria-label={content.a11y.nextProject} className={styles.detailNav}>
        <TextLink href={localizePath(`/work/${next.slug}`, locale)}>{d.nextLabel}: {next.name}</TextLink>
        <TextLink href={localizePath('/work', locale)}>{d.allExamples}</TextLink>
      </nav>
    </EditorialPage>
  );
}
