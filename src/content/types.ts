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
  | "/hello"
  | `/work/${string}`;

export type InternalPath = RouteKey;

export type DeepReadonly<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends readonly unknown[]
    ? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
    : T extends object
      ? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
      : T;

export interface NavigationItem {
  label: string;
  href: InternalPath;
}

export interface Navigation {
  primary: NavigationItem[];
  languageLabel: string;
  germanLabel: string;
  englishLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
}

export interface PriceTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

export interface ProcessStep {
  id: string;
  label: string;
  title: string;
  description: string;
}

export interface ServiceContent {
  eyebrow: string;
  title: string;
  intro: string;
  priceLabel: string;
  priceTiers: PriceTier[];
  benefitsTitle: string;
  benefits: string[];
  processTitle: string;
  process: ProcessStep[];
  ctaLabel: string;
  ctaHref: InternalPath;
}

export interface ContactDetails {
  email: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappNumber: string;
  whatsappHref: string;
  linkedIn: string;
}

export interface ContactContent {
  eyebrow: string;
  title: string;
  intro: string;
  emailLabel: string;
  phoneLabel: string;
  whatsappLabel: string;
  linkedInLabel: string;
  details: ContactDetails;
}

export interface PageSeo {
  title: string;
  description: string;
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
  name: ReviewInquiryFieldName;
  label: string;
  placeholder: string;
  required: boolean;
}

export interface ReviewInquiryContent {
  title: string;
  intro: string;
  fields: ReviewInquiryField[];
  productOptions: { card: string; stand: string };
  submitLabel: string;
  editLabel: string;
  requiredError: string;
  quantityError: string;
  urlError: string;
  nonBindingNotice: string;
  privacyNotice: string;
  messageIntro: string;
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
      href: InternalPath;
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
