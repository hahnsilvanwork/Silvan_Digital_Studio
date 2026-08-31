import Image from "next/image";
import type { CSSProperties } from "react";

import { ContactActions } from "../../components/contact/ContactActions";
import { SiteShell } from "../../components/layout/SiteShell";
import { revealSequence } from "../../components/motion/reveal-sequence";
import { SplitText } from "../../components/motion/SplitText";
import { ProductShowcase } from "../../components/products/ProductShowcase";
import { SplineSceneProvider } from "../../components/products/SplineSceneProvider";
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

// The hero sits beside the headline, so it sweeps more slowly than the
// product section below.
const HERO_SECONDS_PER_REVOLUTION = 60;

interface ReviewsPageProps {
  readonly locale: Locale;
}

export function ReviewsPage({ locale }: ReviewsPageProps) {
  const content = getContent(locale);
  const { reviews } = content;
  const sequence = revealSequence(reviews.title);

  return (
    <SiteShell currentPath={localizePath("/reviews", locale)} locale={locale}>
      {/* The runtime and the scenes come from two Spline hosts. Opening those
        connections while the page is still parsing takes the handshakes off
        the critical path on mobile. */}
      <link crossOrigin="anonymous" href="https://cdn.spline.design" rel="preconnect" />
      <link crossOrigin="anonymous" href="https://prod.spline.design" rel="preconnect" />

      <SplineSceneProvider>
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

            <div
              className={pageStyles.reviewsHeroProduct}
              data-spline-placement="hero"
            >
              <ProductShowcase
                priority
                products={reviews.productVisualizations}
                rotatePerVisit
                secondsPerRevolution={HERO_SECONDS_PER_REVOLUTION}
                selectable={false}
                selectorLabel={reviews.productSelectorLabel}
              />
            </div>
          </section>

          <section
            className={`${layoutStyles.container} ${pageStyles.section} ${pageStyles.sectionLead}`}
          >
            <h2 className="visually-hidden">{reviews.priceLabel}</h2>

            <div className={pageStyles.productShowcase}>
              <div
                className={pageStyles.productSpline}
                data-spline-placement="products"
              >
                <ProductShowcase
                  products={reviews.productVisualizations}
                  selectorLabel={reviews.productSelectorLabel}
                />
              </div>
              {reviews.menuVisualizations.length > 0 ? (
                <div
                  className={pageStyles.productSpline}
                  data-spline-placement="menu"
                >
                  <ProductShowcase
                    products={reviews.menuVisualizations}
                    selectorLabel={reviews.menuSelectorLabel}
                  />
                </div>
              ) : (
                <span
                  className={pageStyles.productImage}
                  data-reveal="scale"
                  style={{ "--reveal-index": 1 } as CSSProperties}
                >
                  <Image
                    alt={reviews.secondaryProductImage.alt}
                    height={1080}
                    sizes="(min-width: 64rem) 46vw, 50vw"
                    src={reviews.secondaryProductImage.src}
                    width={1080}
                  />
                </span>
              )}
            </div>

            {/* Every price is rendered before any long-form content, so a visitor
              never has to read the process to find out what it costs. */}
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
      </SplineSceneProvider>
    </SiteShell>
  );
}
