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
  | "hello";

export type RouteKey =
  | "/"
  | "/websites"
  | "/reviews"
  | "/presence"
  | "/automation"
  | "/work"
  | "/about"
  | "/contact"
  | "/hello";

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
}

export interface ContactDetails {
  readonly email: string;
  readonly phoneDisplay: string;
  readonly phoneHref: string;
  readonly whatsappNumber: string;
  readonly whatsappHref: string;
  readonly linkedIn: string;
}

export interface ContactContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
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
  | "product"
  | "quantity"
  | "variant"
  | "businessName"
  | "contactPerson"
  | "googleUrl"
  | "street"
  | "postalCode"
  | "city"
  | "note";

export interface ReviewInquiryField {
  readonly name: ReviewInquiryFieldName;
  readonly label: string;
  readonly placeholder: string;
  readonly required: boolean;
}

export interface ReviewInquiryContent {
  readonly title: string;
  readonly intro: string;
  readonly fields: readonly ReviewInquiryField[];
  readonly productOptions: {
    readonly card: string;
    readonly stand: string;
  };
  readonly submitLabel: string;
  readonly editLabel: string;
  readonly requiredError: string;
  readonly quantityError: string;
  readonly urlError: string;
  readonly nonBindingNotice: string;
  readonly privacyNotice: string;
  readonly messageIntro: string;
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
    productImageAlt: string;
    inquiry: ReviewInquiryContent;
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
    challengeLabel: string;
    approachLabel: string;
    outcomeLabel: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    body: string[];
    valuesTitle: string;
    values: { title: string; description: string }[];
    portraitAlt: string;
    portraitStatus: string;
  };
  contact: ContactContent;
  footer: {
    navLabel: string;
    contactTitle: string;
    rights: string;
  };
  hello: {
    eyebrow: string;
    title: string;
    intro: string;
    links: NavigationItem[];
    directContactTitle: string;
  };
  notFound: {
    eyebrow: string;
    title: string;
    description: string;
    homeLabel: string;
  };
  seo: Record<PageKey, PageSeo>;
}

export type SiteContent = DeepReadonly<SiteContentShape>;
