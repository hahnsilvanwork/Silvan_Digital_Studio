export type Locale = "de" | "en";

export type PageKey =
  | "home"
  | "websites"
  | "reviews"
  | "presence"
  | "automation"
  | "work"
  | "about"
  | "contact"
  | "hello"
  | "imprint"
  | "privacy";

export type RouteKey =
  | "/"
  | "/websites"
  | "/reviews"
  | "/presence"
  | "/automation"
  | "/work"
  | "/about"
  | "/contact"
  | "/hello"
  | "/imprint"
  | "/privacy";

declare const projectPathBrand: unique symbol;

export type ProjectPath = `/work/${string}` & {
  readonly [projectPathBrand]: "ProjectPath";
};

export type InternalPath = RouteKey | ProjectPath;

type Primitive = string | number | boolean | bigint | symbol | null | undefined;

export type DeepReadonly<T> = T extends Primitive
  ? T
  : T extends (...args: never[]) => unknown
    ? T
    : T extends readonly unknown[]
      ? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
      : T extends object
        ? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
        : T;

export interface NavigationItem {
  readonly label: string;
  readonly href: RouteKey;
}

export interface Navigation {
  readonly primary: readonly NavigationItem[];
  readonly primaryLabel: string;
  readonly menuLabel: string;
  readonly languageLabel: string;
  readonly germanLabel: string;
  readonly englishLabel: string;
  readonly openMenuLabel: string;
  readonly closeMenuLabel: string;
}

export interface PriceTier {
  readonly id: string;
  readonly name: string;
  readonly price: string;
  readonly description: string;
  readonly features: readonly string[];
  /** At most one tier per page carries this. */
  readonly recommended?: boolean;
}

export interface ProcessStep {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly description: string;
}

export interface ServiceContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly priceLabel: string;
  readonly priceTiers: readonly PriceTier[];
  readonly benefitsTitle: string;
  readonly benefits: readonly string[];
  readonly processTitle: string;
  readonly process: readonly ProcessStep[];
  readonly ctaLabel: string;
  readonly ctaHref: RouteKey;
  readonly faq: FaqContent;
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
  /**
   * An optional follow-on link for an answer that points at another page. The
   * reviews FAQ named "Online-Präsenz" in prose without linking it, so the one
   * genuine upsell path on the site was a dead end for both a reader and a
   * crawler. Kept out of `answer` so the FAQ markup stays plain text.
   */
  readonly link?: { readonly label: string; readonly href: InternalPath };
}

export interface FaqContent {
  readonly title: string;
  readonly items: readonly FaqItem[];
}

/** One heading plus its paragraphs. Legal pages are nothing else. */
export interface LegalSection {
  readonly title: string;
  readonly body: readonly string[];
}

export interface LegalContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly sections: readonly LegalSection[];
  readonly updatedLabel: string;
  readonly updated: string;
}

/**
 * A quote from a named, real person who actually worked with the studio.
 * The array is empty until such a quote exists -- the section renders nothing
 * rather than showing an invented endorsement.
 */
export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly author: string;
  readonly role: string;
}

export interface ContactDetails {
  readonly email: string;
  readonly phoneDisplay: string;
  readonly phoneHref: string;
  /** Display only. The link itself comes from `whatsappHref`. */
  readonly whatsappNumber: string;
  readonly whatsappHref: string;
  readonly linkedIn: string;
}

export interface ContactContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly addressLabel: string;
  readonly address: readonly string[];
  readonly emailLabel: string;
  readonly phoneLabel: string;
  readonly whatsappLabel: string;
  readonly linkedInLabel: string;
  readonly details: ContactDetails;
}

export interface PageSeo {
  readonly title: string;
  readonly description: string;
}

export type ReviewInquiryFieldName =
  | "destination"
  | "product"
  | "shape"
  | "size"
  | "quantity"
  | "businessName"
  | "contactPerson"
  | "setup"
  | "destinationUrl"
  | "note";

export interface ReviewInquiryField {
  readonly name: ReviewInquiryFieldName;
  readonly label: string;
  readonly placeholder: string;
  readonly required: boolean;
  /**
   * The HTML autocomplete token for what this field collects. Every field here
   * asks for the visitor's own name, company or address, so declaring the
   * purpose lets the browser fill it -- on a phone, that is the difference
   * between one tap and ten fields typed by hand.
   */
  readonly autoComplete?: string;
}

export interface ReviewInquiryContent {
  readonly title: string;
  readonly intro: string;
  readonly fields: readonly ReviewInquiryField[];
  /**
   * Every product the page advertises, in the order it is priced there. The
   * select renders this list, so an advertised product cannot go missing from
   * the order form -- which is exactly how the CHF 80 two-card bundle was
   * priced on the page but impossible to actually ask for.
   */
  readonly destinationOptions: readonly InquiryOption[];
  readonly productOptions: readonly InquiryOption[];
  readonly shapeOptions: readonly InquiryOption[];
  readonly sizeOptions: readonly InquiryOption[];
  readonly setupOptions: readonly InquiryOption[];
  readonly submitLabel: string;
  readonly editLabel: string;
  readonly requiredError: string;
  /** Announced once per submit, so errors beyond the focused field are heard. */
  readonly errorSummary: (count: number) => string;
  readonly quantityError: string;
  readonly urlError: string;
  /** Announced first on the confirm step, so the summary is heard before the send link. */
  readonly confirmTitle: string;
  readonly nonBindingNotice: string;
  readonly privacyNotice: string;
  readonly messageIntro: string;
}

export interface ProductVisualization {
  readonly id: string;
  readonly title: string;
  readonly sceneUrl: string;
  readonly fallbackImage?: string;
  readonly ariaLabel: string;
}

export interface InquiryOption {
  readonly value: string;
  readonly label: string;
}

export type ProductCategory = "reviews" | "menu" | "custom";

export interface ProductScene {
  readonly url: string;
  readonly fallbackImage: string;
  readonly ariaLabel: string;
}

export interface NfcProduct {
  readonly id: string;
  readonly category: ProductCategory;
  readonly title: string;
  readonly price: string;
  readonly description: string;
  readonly image: { readonly src: string; readonly alt: string };
  readonly details: readonly string[];
  readonly scene?: ProductScene;
}

export interface ProductHeroImage {
  readonly src: string;
  readonly alt: string;
  readonly fit?: "cover" | "contain";
}

interface SiteContentShape {
  brand: {
    name: string;
    descriptor: string;
  };
  navigation: Navigation;
  a11y: {
    skipToContent: string;
    currentPage: string;
    externalLink: string;
    previousProject: string;
    nextProject: string;
  };
  common: {
    learnMore: string;
    viewWork: string;
    getInTouch: string;
    from: string;
    onRequest: string;
    recommended: string;
  };
  home: {
    hero: {
      serviceLine: string;
      headline: string;
      supporting: string;
      primaryCta: string;
      secondaryCta: string;
    };
    servicesTitle: string;
    services: {
      title: string;
      description: string;
      price: string;
      href: RouteKey;
    }[];
    workTitle: string;
    studioTitle: string;
    studioCopy: string;
    testimonialsTitle: string;
    testimonials: Testimonial[];
  };
  websites: ServiceContent;
  reviews: {
    eyebrow: string;
    title: string;
    intro: string;
    priceLabel: string;
    products: PriceTier[];
    quantityDiscount: string;
    processTitle: string;
    process: ProcessStep[];
    ctaLabel: string;
    heroImages: readonly ProductHeroImage[];
    heroIndicatorLabel: string;
    categories: readonly {
      readonly id: ProductCategory;
      readonly label: string;
    }[];
    catalogLabel: string;
    catalog: readonly NfcProduct[];
    forms: readonly string[];
    sizes: readonly string[];
    view3dLabel: string;
    comingSoonLabel: string;
    close3dLabel: string;
    loading3dLabel: string;
    error3dLabel: string;
    retry3dLabel: string;
    interact3dLabel: string;
    useCasesTitle: string;
    useCases: readonly { readonly title: string; readonly description: string }[];
    productSelectorLabel: string;
    menuSelectorLabel: string;
    productVisualizations: readonly ProductVisualization[];
    /** Restaurant and digital menu products. Empty until their scenes exist. */
    menuVisualizations: readonly ProductVisualization[];
    secondaryProductImage: { readonly src: string; readonly alt: string };
    inquiry: ReviewInquiryContent;
    faq: FaqContent;
  };
  presence: ServiceContent & {
    startingPrice: string;
  };
  automation: ServiceContent;
  work: {
    eyebrow: string;
    title: string;
    intro: string;
    conceptLabel: string;
    projectInfoLabel: string;
    categoryLabel: string;
    yearLabel: string;
    typeLabel: string;
    challengeLabel: string;
    approachLabel: string;
    outcomeLabel: string;
    /**
     * The portfolio pages were the only ones that ended without an invitation
     * to act. Every service page closes with one; a visitor who has just read a
     * whole case study is the most engaged reader on the site and was offered
     * nothing but the next project.
     */
    ctaLabel: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    body: string[];
    valuesTitle: string;
    values: { title: string; description: string }[];
    standardsTitle: string;
    standards: string[];
    portraitAlt: string;
    portraitCaption: string;
  };
  contact: ContactContent;
  footer: {
    navLabel: string;
    legalNavLabel: string;
    contactTitle: string;
    rights: string;
    legal: NavigationItem[];
  };
  hello: {
    eyebrow: string;
    title: string;
    intro: string;
    links: NavigationItem[];
    directContactTitle: string;
  };
  imprint: LegalContent;
  privacy: LegalContent;
  notFound: {
    eyebrow: string;
    title: string;
    description: string;
    homeLabel: string;
  };
  seo: Record<PageKey, PageSeo>;
}

export type SiteContent = DeepReadonly<SiteContentShape>;
