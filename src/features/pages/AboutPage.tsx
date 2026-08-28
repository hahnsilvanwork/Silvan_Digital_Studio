import Image from "next/image";
import type { CSSProperties } from "react";

import { ContactActions } from "../../components/contact/ContactActions";
import { SiteShell } from "../../components/layout/SiteShell";
import { revealSequence } from "../../components/motion/reveal-sequence";
import { SplitText } from "../../components/motion/SplitText";
import { SectionHeading } from "../../components/ui/SectionHeading";
import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";

interface AboutPageProps {
  readonly locale: Locale;
}

export function AboutPage({ locale }: AboutPageProps) {
  const content = getContent(locale);
  const sequence = revealSequence(content.about.title);

  return (
    <SiteShell currentPath={localizePath("/about", locale)} locale={locale}>
      <div className={pageStyles.page}>
        <section className={`${layoutStyles.container} ${pageStyles.pageHeader}`}>
          <p className={pageStyles.heroLabel} data-reveal="rise">
            {content.about.eyebrow}
          </p>
          <SplitText
            as="h1"
            className={pageStyles.pageTitle}
            startIndex={sequence.titleStartIndex}
            text={content.about.title}
          />
          <p
            className={pageStyles.editorialTight}
            data-reveal="rise"
            style={{ "--reveal-index": sequence.introIndex } as CSSProperties}
          >
            {content.about.intro}
          </p>
        </section>

        <section
          className={`${layoutStyles.container} ${pageStyles.section} ${pageStyles.aboutLayout}`}
        >
          {/* The approved photograph, not a generated likeness. The frame keeps
              the asset's own 4:5 crop, so the image fills it without an upscale
              at any column width. */}
          <figure className={pageStyles.portrait} data-reveal="scale">
            <Image
              alt={content.about.portraitAlt}
              className={pageStyles.portraitImage}
              height={1700}
              priority
              sizes="(min-width: 64rem) 30vw, 100vw"
              src="/images/portrait/portrait.webp"
              width={1360}
            />
            <figcaption className={pageStyles.portraitCaption}>
              {content.about.portraitCaption}
            </figcaption>
          </figure>

          <div className={pageStyles.aboutBody}>
            {content.about.body.map((paragraph, index) => (
              <p
                className={pageStyles.aboutParagraph}
                data-reveal="rise"
                key={paragraph}
                style={{ "--reveal-index": index } as CSSProperties}
              >
                {paragraph}
              </p>
            ))}
          </div>
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
