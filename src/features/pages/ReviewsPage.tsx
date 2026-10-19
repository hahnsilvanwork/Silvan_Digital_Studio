import { ContactActions } from '../../components/contact/ContactActions';
import { SaveContact } from '../../components/contact/SaveContact';
import { localPhone } from '../../components/editorial/icons';
import { PageHero, heroStyles } from '../../components/editorial/PageHero';
import { EditorialPage, FaqSection, PriceBand, RuledList, Section, SectionHead, Steps, editorialStyles } from '../../components/editorial/Sections';
import { StickyCallBar } from '../../components/editorial/StickyCallBar';
import { SiteShell } from '../../components/layout/SiteShell';
import { NfcMotionHero } from '../../components/products/NfcMotionHero';
import { ProductCatalog } from '../../components/products/ProductCatalog';
import { InquiryDisclosure } from '../../components/reviews/InquiryDisclosure';
import { ReviewInquiryConfigurator } from '../../components/reviews/ReviewInquiryConfigurator';
import { auditCopy } from '../../content/audit-copy';
import { inquiryCopy } from '../../content/inquiry-copy';
import { reviewsPageCopy, serviceCommon } from '../../content/service-pages-copy';
import type { Locale } from '../../content/types';
import { STARTER_PRODUCT_IDS } from '../../lib/catalogue-groups';
import { getContent } from '../../lib/locales';
import { localizePath } from '../../lib/routes';
import styles from '../../styles/nfc-page.module.css';

export function ReviewsPage({ locale }: { readonly locale: Locale }) {
  const content = getContent(locale);
  const { reviews } = content;
  const copy = reviewsPageCopy[locale];
  const common = serviceCommon[locale];
  const { phoneDisplay, phoneHref } = content.contact.details;
  // Device compatibility is already covered by the main FAQ, including the QR exception for stickers.
  const [setup, , ...remainingConditions] = auditCopy[locale].nfcConditions.items;
  const faqItems = [...reviews.faq.items, setup, ...remainingConditions];

  return <SiteShell currentPath={localizePath('/reviews', locale)} locale={locale}>
    <EditorialPage>
      <PageHero
        id="reviews"
        eyebrow={reviews.eyebrow}
        title={reviews.title}
        titleFit="8.4cqi"
        lead={reviews.intro}
        primary={{ href: '#inquiry', label: reviews.ctaLabel }}
        call={{ href: phoneHref, display: localPhone(phoneDisplay, locale), label: common.callLabel }}
        facts={copy.facts}
        byline={{ href: localizePath('/about', locale), name: common.bylineName, role: common.bylineRole }}
        visual={<div className={`${heroStyles.visualBody} ${styles.film}`}><NfcMotionHero locale={locale} /></div>}
      />

      <Section id="how-it-works" labelledBy="reviews-how-title">
        <SectionHead id="reviews-how-title" title={copy.howTitle} intro={copy.howIntro} />
        <Steps steps={reviews.process} />
      </Section>

      <Section id="uses" labelledBy="reviews-uses-title" band>
        <SectionHead id="reviews-uses-title" title={reviews.useCasesTitle} />
        <RuledList items={reviews.useCases.map(useCase => ({ title: useCase.title, text: useCase.description }))} />
      </Section>

      <Section id="products" labelledBy="reviews-catalogue-title" className={styles.catalogue}>
        <SectionHead id="reviews-catalogue-title" title={copy.catalogueTitle} intro={copy.catalogueIntro} />
        <ProductCatalog
          locale={locale}
          starterProductIds={STARTER_PRODUCT_IDS}
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
      </Section>

      <PriceBand
        id="prices"
        titleId="reviews-prices-title"
        title={copy.pricesTitle}
        intro={copy.pricesIntro}
        vat={copy.vat}
        rows={reviews.products.map(product => ({ id: product.id, name: product.name, price: product.price, text: product.description, more: <>{product.features.join(' · ')}</> }))}
        box={{ title: copy.deliveryTitle, text: `${copy.deliveryText} ${reviews.quantityDiscount}` }}
      />

      <Section id="inquiry" labelledBy="reviews-inquiry-title">
        <div className={styles.support}>
          <div className={styles.supportIntro}>
            <h2 id="reviews-inquiry-title">{reviews.inquiry.title}</h2>
            <p>{copy.inquiryIntro}</p>
          </div>
          <div className={styles.supportChannels}><ContactActions locale={locale} compact immediate emphasize includeLinkedIn={false} /></div>
          <div className={styles.supportSave}><SaveContact locale={locale} /></div>
        </div>
        <InquiryDisclosure locale={locale}><ReviewInquiryConfigurator locale={locale} /></InquiryDisclosure>
        <p className={editorialStyles.note}>{copy.inquiryNote}</p>
      </Section>

      <FaqSection locale={locale} id="questions" title={reviews.faq.title} items={faqItems} />

      <StickyCallBar callLabel={common.stickyCall} callHref={phoneHref} enquiryLabel={copy.stickyEnquiry} enquiryHref="#inquiry" watch={['reviews-hero-actions', 'inquiry']} />
    </EditorialPage>
  </SiteShell>;
}
