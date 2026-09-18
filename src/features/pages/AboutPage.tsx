import Image from "next/image";
import type { CSSProperties } from "react";

import { ContactActions } from "../../components/contact/ContactActions";
import { SiteShell } from "../../components/layout/SiteShell";
import { ButtonLink } from "../../components/ui/ButtonLink";
import { studioCopy } from "../../content/studio-copy";
import { SectionHeading } from "../../components/ui/SectionHeading";
import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { PORTRAIT } from "../../lib/portrait";
import { localizePath } from "../../lib/routes";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";
import styles from "../../styles/about.module.css";

interface AboutPageProps {
  readonly locale: Locale;
}

export function AboutPage({ locale }: AboutPageProps) {
  const content = getContent(locale);
  const copy = studioCopy[locale];

  return (
    <SiteShell currentPath={localizePath("/about", locale)} locale={locale}>
      <div className={pageStyles.page}>
        <section className={`${layoutStyles.container} ${styles.intro}`}>
          <div className={styles.introCopy}>
            <p className={pageStyles.heroLabel}>{content.about.eyebrow}</p>
            <h1 className={styles.title}>{content.about.title}</h1>
            <p className={styles.lead}>{content.about.intro}</p>
          </div>
          {/* The approved photograph, not a generated likeness. The frame keeps
              the asset's own 4:5 crop, so the image fills it without an upscale
              at any column width. */}
          <figure className={styles.portrait}>
            <Image
              alt={content.about.portraitAlt}
              className={pageStyles.portraitImage}
              height={PORTRAIT.height}
              priority
              sizes="(min-width: 98rem) 696px, (min-width: 48rem) 46vw, 92vw"
              src={PORTRAIT.src}
              width={PORTRAIT.width}
            />
            <figcaption className={pageStyles.portraitCaption}>
              {content.about.portraitCaption}
            </figcaption>
          </figure>
        </section>
        <section className={`${layoutStyles.container} ${styles.body}`} aria-label={content.about.eyebrow}>
          {content.about.body.map((paragraph) => (
            <p className={pageStyles.aboutParagraph} key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className={`${layoutStyles.container} ${styles.proof}`}>
          <h2>{copy.proofTitle}</h2>
          <p>{copy.proof}</p>
          <ButtonLink href={`${localizePath("/reviews", locale)}?category=reviews&model=review-round-black#inquiry`}>{copy.proofLink}</ButtonLink>
        </section>

        <section className={`${layoutStyles.container} ${pageStyles.section}`}>
          <SectionHeading title={content.about.standardsTitle} />
          <div className={pageStyles.sectionBody}>
            <ul className={pageStyles.benefitList}>
              {content.about.standards.map((standard, index) => (
                <li
                  className={pageStyles.benefit}
                  data-reveal="rise"
                  key={standard}
                  style={{ "--reveal-index": index } as CSSProperties}
                >
                  {standard}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={pageStyles.darkBand}>
          <div className={layoutStyles.container}>
            <SectionHeading title={content.about.valuesTitle} />
            <div className={pageStyles.sectionBody}>
              <ul className={pageStyles.valueList}>
                {content.about.values.map((value, index) => (
                  <li
                    className={pageStyles.value}
                    data-reveal="rise"
                    key={value.title}
                    style={{ "--reveal-index": index } as CSSProperties}
                  >
                    <h3 className={pageStyles.valueTitle}>{value.title}</h3>
                    <p className={pageStyles.valueDescription}>
                      {value.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={`${layoutStyles.container} ${pageStyles.section}`}>
          <SectionHeading
            eyebrow={content.contact.eyebrow}
            intro={content.contact.intro}
            title={content.contact.title}
          />
          <div className={pageStyles.sectionBody}>
            <ContactActions locale={locale} />
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
