import type { CSSProperties } from "react";

import { ContactActions } from "../../components/contact/ContactActions";
import { SiteShell } from "../../components/layout/SiteShell";
import { revealSequence } from "../../components/motion/reveal-sequence";
import { SplitText } from "../../components/motion/SplitText";
import { ProductCatalog } from "../../components/products/ProductCatalog";
import { ProductHero } from "../../components/products/ProductHero";
import { ReviewInquiryConfigurator } from "../../components/reviews/ReviewInquiryConfigurator";
import { FaqList } from "../../components/services/FaqList";
import { PriceTierList } from "../../components/services/PriceTierList";
import { ProcessSteps } from "../../components/services/ProcessSteps";
import { FaqSchema } from "../../components/seo/FaqSchema";
import { ButtonLink } from "../../components/ui/ButtonLink";
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
  const sequence = revealSequence(reviews.title);

  return (
    <SiteShell currentPath={localizePath("/reviews", locale)} locale={locale}>
      <div className={pageStyles.page}>
        <section
          className={`${layoutStyles.container} ${pageStyles.pageHeader} ${pageStyles.reviewsHero}`}
        >
            <div className={pageStyles.reviewsHeroCopy} data-reviews-hero-copy>
              <p className={pageStyles.heroLabel} data-reveal="rise">
                {reviews.eyebrow}
              </p>
              <SplitText
                as="h1"
                className={pageStyles.pageTitle}
                startIndex={sequence.titleStartIndex}
                text={reviews.title}
              />
              <p
                className={pageStyles.editorialTight}
                data-reveal="rise"
                style={
                  { "--reveal-index": sequence.introIndex } as CSSProperties
                }
              >
                {reviews.intro}
              </p>
              <div
                className={pageStyles.heroActions}
                data-reveal="rise"
                style={
                  { "--reveal-index": sequence.actionsIndex } as CSSProperties
                }
              >
                <ButtonLink href="#inquiry">{reviews.ctaLabel}</ButtonLink>
              </div>
            </div>

            <div className={pageStyles.reviewsHeroProduct}>
              <ProductHero
                images={reviews.heroImages}
                indicatorLabel={reviews.heroIndicatorLabel}
                pauseLabel={reviews.heroPauseLabel}
                resumeLabel={reviews.heroResumeLabel}
              />
            </div>
        </section>

        <section
          className={`${layoutStyles.container} ${pageStyles.section} ${pageStyles.sectionLead}`}
        >
            <SectionHeading
              eyebrow={reviews.eyebrow}
              title={reviews.catalogLabel}
            />
            <div className={pageStyles.sectionBody}>
              <ProductCatalog
                categories={reviews.categories}
                labels={{
                  category: reviews.catalogLabel,
                  categoryPrompt: reviews.categoryPrompt,
                  productSingular: reviews.productSingular,
                  productPlural: reviews.productPlural,
                  view3d: reviews.view3dLabel,
                  comingSoon: reviews.comingSoonLabel,
                  close: reviews.close3dLabel,
                  loading: reviews.loading3dLabel,
                  error: reviews.error3dLabel,
                  retry: reviews.retry3dLabel,
                  interact: reviews.interact3dLabel,
                }}
                products={reviews.catalog}
              />
            </div>

            <div className={pageStyles.sectionBody}>
              <p className={pageStyles.sectionLabel} data-reveal="rise">
                {reviews.priceLabel}
              </p>
              <PriceTierList tiers={reviews.products} />
              <p className={pageStyles.note} data-reveal="rise">
                {reviews.quantityDiscount}
              </p>
            </div>
        </section>

        <section className={`${layoutStyles.container} ${pageStyles.section}`}>
            <SectionHeading title={reviews.useCasesTitle} />
            <ul className={`${pageStyles.sectionBody} ${pageStyles.useCaseGrid}`}>
              {reviews.useCases.map((useCase) => (
                <li className={pageStyles.useCase} key={useCase.title}>
                  <h3>{useCase.title}</h3>
                  <p>{useCase.description}</p>
                </li>
              ))}
            </ul>
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
          <FaqSchema items={reviews.faq.items} />
          <SectionHeading title={reviews.faq.title} />
          <div className={pageStyles.sectionBody}>
            <FaqList items={reviews.faq.items} locale={locale} />
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
