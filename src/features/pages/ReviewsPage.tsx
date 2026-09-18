import type { CSSProperties } from "react";

import { ContactActions } from "../../components/contact/ContactActions";
import { SiteShell } from "../../components/layout/SiteShell";
import { revealSequence } from "../../components/motion/reveal-sequence";
import { SplitText } from "../../components/motion/SplitText";
import { ProductCatalog } from "../../components/products/ProductCatalog";
import { NfcMotionHero } from "../../components/products/NfcMotionHero";
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
import { inquiryCopy } from "../../content/inquiry-copy";
import { auditCopy } from "../../content/audit-copy";
import inquiryStyles from "../../components/reviews/review-inquiry.module.css";

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
                <ButtonLink href="#products">{locale === "de" ? "Modelle auswählen" : "Choose a model"}</ButtonLink>
                <ButtonLink href="#inquiry" variant="secondary">
                  {reviews.ctaLabel}
                </ButtonLink>
              </div>
            </div>

            <div className={pageStyles.reviewsMotionProduct}>
              <NfcMotionHero locale={locale} />
            </div>
        </section>

        <section
          className={`${layoutStyles.container} ${inquiryStyles.catalogueSection}`}
          id="products"
        >
            <SectionHeading
              eyebrow={reviews.eyebrow}
              title={reviews.catalogLabel}
            />
            <div className={inquiryStyles.contentBlock}>
              <ProductCatalog
                locale={locale}
                categories={reviews.categories}
                labels={{
                  category: reviews.catalogLabel,
                  categoryPrompt: reviews.categoryPrompt,
                  productSingular: reviews.productSingular,
                  productPlural: reviews.productPlural,
                  previousProduct: reviews.previousProductLabel,
                  nextProduct: reviews.nextProductLabel,
                  productPosition: reviews.productPositionLabel,
                  productPositionOf: reviews.productPositionOfLabel,
                  view3d: reviews.view3dLabel,
                  comingSoon: reviews.comingSoonLabel,
                  close: reviews.close3dLabel,
                  loading: reviews.loading3dLabel,
                  error: reviews.error3dLabel,
                  retry: reviews.retry3dLabel,
                  interact: reviews.interact3dLabel,
                  requestModel: inquiryCopy[locale].requestModel,
                  external3d: inquiryCopy[locale].external3d,
                }}
                products={reviews.catalog}
              />
            </div>

            <div className={inquiryStyles.pricingBlock}>
              <p className={pageStyles.sectionLabel} data-reveal="rise">
                {reviews.priceLabel}
              </p>
              <PriceTierList tiers={reviews.products} />
              <p className={pageStyles.note}>
                {locale === "de"
                  ? "Preise in CHF inklusive der beschriebenen Einrichtung und allfälliger gesetzlicher Abgaben. Versand wird abhängig von Lieferort und Menge separat offeriert. Den Gesamtpreis und Liefertermin erhalten Sie vor einer Bestellung; die Anfrage ist unverbindlich."
                  : "Prices in CHF include the setup described and any legally applicable charges. Shipping is quoted separately based on destination and quantity. You receive the total price and delivery date before ordering; enquiries are non-binding."}
              </p>
              <p className={pageStyles.note} data-reveal="rise">
                {reviews.quantityDiscount}
              </p>
              <div><ButtonLink href="#inquiry">{reviews.ctaLabel}</ButtonLink></div>
              <div className={inquiryStyles.conditionsBlock}>
              <h3 className={inquiryStyles.conditionsTitle}>{auditCopy[locale].nfcConditions.title}</h3>
              <FaqList items={auditCopy[locale].nfcConditions.items} locale={locale} />
              </div>
            </div>
        </section>

        <section className={`${layoutStyles.container} ${inquiryStyles.compactSection}`}>
          <SectionHeading title={reviews.processTitle} />
          <div className={inquiryStyles.contentBlock}>
            <ProcessSteps steps={reviews.process} />
          </div>
          <details className={inquiryStyles.disclosure}>
            <summary>{reviews.useCasesTitle}</summary>
            <ul className={`${inquiryStyles.contentBlock} ${pageStyles.useCaseGrid}`}>
              {reviews.useCases.map((useCase) => (
                <li className={pageStyles.useCase} key={useCase.title}>
                  <h3>{useCase.title}</h3>
                  <p>{useCase.description}</p>
                </li>
              ))}
            </ul>
          </details>
        </section>

        <section
          className={`${layoutStyles.container} ${inquiryStyles.compactSection}`}
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

        <section className={pageStyles.contactBand}>
          <div className={`${layoutStyles.container} ${pageStyles.contactLayout}`}>
          <SectionHeading
            eyebrow={content.contact.eyebrow}
            title={content.contact.title}
          />
          <div className={pageStyles.sectionBody}>
            <ContactActions locale={locale} />
          </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
