import Image from "next/image";
import type { CSSProperties } from "react";

import { ContactActions } from "../../components/contact/ContactActions";
import { SiteShell } from "../../components/layout/SiteShell";
import { SplitText } from "../../components/motion/SplitText";
import { ReviewInquiryConfigurator } from "../../components/reviews/ReviewInquiryConfigurator";
import { PriceTierList } from "../../components/services/PriceTierList";
import { ProcessSteps } from "../../components/services/ProcessSteps";
import { SectionHeading } from "../../components/ui/SectionHeading";
import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";

interface ReviewsPageProps {
  readonly locale: Locale;
}

export function ReviewsPage({ locale }: ReviewsPageProps) {
  const content = getContent(locale);
  const { reviews } = content;

  return (
    <SiteShell currentPath={localizePath("/reviews", locale)} locale={locale}>
      <div className={pageStyles.page}>
        <section className={`${layoutStyles.container} ${pageStyles.pageHeader}`}>
          <p className={pageStyles.heroLabel} data-reveal="rise">
            {reviews.eyebrow}
          </p>
          <SplitText
            as="h1"
            className={pageStyles.pageTitle}
            text={reviews.title}
          />
          <p
            className={pageStyles.editorialTight}
            data-reveal="rise"
            style={{ "--reveal-index": 2 } as CSSProperties}
          >
            {reviews.intro}
          </p>
        </section>

        <section className={`${layoutStyles.container} ${pageStyles.section}`}>
          <h2 className="visually-hidden">{reviews.priceLabel}</h2>

          <div className={pageStyles.productShowcase}>
            {[
              "/images/products/review-cards.png",
              "/images/products/review-stands.png",
            ].map((source, index) => (
              <span
                className={pageStyles.productImage}
                data-reveal="scale"
                key={source}
                style={{ "--reveal-index": index } as CSSProperties}
              >
                <Image
                  alt={reviews.productImageAlt}
                  height={1000}
                  sizes="(min-width: 48rem) 45vw, 90vw"
                  src={source}
                  width={1000}
                />
              </span>
            ))}
          </div>

          {/* Every price is rendered before any long-form content, so a visitor
              never has to read the process to find out what it costs. */}
          <div className={pageStyles.sectionBody}>
            <PriceTierList
              priceLabel={reviews.priceLabel}
              tiers={reviews.products}
            />
            <p className={pageStyles.note} data-reveal="rise">
              {reviews.quantityDiscount}
            </p>
          </div>
        </section>

        <section className={pageStyles.darkBand}>
          <div className={layoutStyles.container}>
            <SectionHeading title={reviews.processTitle} />
            <div className={pageStyles.sectionBody}>
              <ProcessSteps steps={reviews.process} />
            </div>
          </div>
        </section>

        <section
          className={`${layoutStyles.container} ${pageStyles.section}`}
          id="inquiry"
        >
          <SectionHeading
            eyebrow={reviews.ctaLabel}
            title={reviews.inquiry.title}
          />
          <div className={pageStyles.sectionBody}>
            <ReviewInquiryConfigurator locale={locale} />
          </div>
        </section>

        <section className={`${layoutStyles.container} ${pageStyles.section}`}>
          <SectionHeading
            eyebrow={content.contact.eyebrow}
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
