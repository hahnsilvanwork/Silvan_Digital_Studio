import { productTierSummary } from "../lib/product-pricing";
import { mergePhotoProducts } from "./photo-products";
import { imprintContent, privacyContent } from "./legal-content";
import type { SiteContent } from "./types";
import { homeCopy } from './home-copy';

export const en = {
  brand: {
    name: "SILVAN",
    descriptor: "Digital Studio",
  },
  navigation: {
    primary: [
      { label: "Websites", href: "/websites" },
      { label: "NFC & QR", href: "/reviews" },
      { label: "Online Presence", href: "/presence" },
      { label: "Automation", href: "/automation" },
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    primaryLabel: "Main navigation",
    menuLabel: "Menu",
    languageLabel: "Choose language",
    germanLabel: "German",
    englishLabel: "English",
    openMenuLabel: "Open menu",
    closeMenuLabel: "Close menu",
  },
  a11y: {
    skipToContent: "Skip to content",
    currentPage: "Current page",
    externalLink: "Opens an external link",
    previousProject: "Previous project",
    nextProject: "Next project",
  },
  common: {
    learnMore: "Learn more",
    viewWork: "View work",
    getInTouch: "Get in touch",
    from: "from",
    onRequest: "On request",
    recommended: "For multi-page websites",
  },
  home: {
    hero: {
      serviceLine: "Websites and digital solutions for Swiss businesses",
      headline: homeCopy.en.headline,
      supporting:
        "I'm Silvan Hahn. I build websites, help people find your business online and simplify recurring tasks. You work directly with me, from the first idea to launch.",
      primaryCta: homeCopy.en.primaryCta,
      secondaryCta: homeCopy.en.secondaryCta,
    },
    servicesTitle: "What would you like to improve?",
    services: [
      {
        title: "Websites",
        description: "Clear, fast websites that make your offer easy to understand.",
        price: "from CHF 300",
        href: "/websites",
      },
      {
        title: "Reviews and digital menus",
        description: "Cards and stands for reviews, menus, bookings, and custom destinations.",
        price: "Chips from CHF 15 · cards from CHF 49",
        href: "/reviews",
      },
      {
        title: "Get found locally",
        description: "A Google Business Profile and a consistent online presence for your business.",
        price: "from CHF 249",
        href: "/presence",
      },
      {
        title: "Simplify recurring tasks",
        description: "For example, recording enquiries and transferring data. We check which workflows can be automated.",
        price: "On request",
        href: "/automation",
      },
    ],
    workTitle: "Selected work",
    studioTitle: "Work directly with the developer",
    studioCopy:
      "I'm Silvan Hahn, an independent web developer in Boppelsen near Zurich. You work directly with the person who plans, designs and builds your website.",
    testimonialsTitle: "What clients say",
    // Stays empty until a real, named and approved client quote exists. The
    // section renders only once this array has entries -- an invented
    // endorsement on the site of a studio that sells Google Reviews would be
    // the most expensive mistake available.
    testimonials: [],
  },
  websites: {
    eyebrow: "Websites",
    title: "A website that makes your business easy to choose.",
    intro:
      "From a compact page with contact details to a large custom presence: we plan your website around your content, features and future updates.",
    priceLabel: "Indicative prices · CHF 300–5,000+",
    priceTiers: [
      {
        id: "simple",
        name: "Compact Website",
        price: "CHF 300–699",
        description: "When your offer and contact details fit on a single page.",
        features: ["One concise page", "Mobile optimised", "Direct contact options"],
      },
      {
        id: "standard",
        name: "Business Website",
        price: "CHF 700–1,999",
        recommended: true,
        description: "When customers need separate pages for your services, business and contact information.",
        features: ["Multiple content pages", "Custom layout", "Essential search foundations"],
      },
      {
        id: "premium",
        name: "Extensive Website",
        price: "CHF 2,000–4,999",
        description: "When substantial content needs distinct sections and the design and interactions need more planning.",
        features: ["Site structure for multiple sections", "Custom-designed interactions", "Flexible building blocks for page content"],
      },
      {
        id: "custom",
        name: "Custom Project",
        price: "from CHF 5,000",
        description: "When specific requirements first need a dedicated concept and technical planning.",
        features: ["Tailored concept", "Technical planning", "Project-specific delivery"],
      },
    ],
    benefitsTitle: "Which scope fits your business?",
    benefits: [
      "A clear structure for customers and search engines",
      "A responsive experience on every screen",
      "A technical foundation that makes later adjustments easier to follow",
    ],
    processTitle: "How your website takes shape",
    process: [
      { id: "understand", label: "01", title: "Understand", description: "We clarify the goals, audience, content, and right scope." },
      { id: "design", label: "02", title: "Design", description: "I develop a clear visual direction and page structure." },
      { id: "build", label: "03", title: "Build", description: "The design and content become a fast, responsive, accessible website." },
      { id: "launch", label: "04", title: "Launch", description: "After a shared review, the website goes live cleanly." },
    ],
    ctaLabel: "Discuss your website",
    ctaHref: "/contact",
    faq: {
      title: "Frequently asked questions about websites",
      items: [
        {
          question: "What does a website cost?",
          answer:
            "A compact information page starts at CHF 300. A multi-page business website sits between CHF 700 and CHF 1,999, larger presences between CHF 2,000 and CHF 4,999. Custom projects start at CHF 5,000. The tier follows from the scope we agree on beforehand.",
        },
        {
          question: "What is included in the price?",
          answer:
            "Concept, design, build, and launch within the scope of the chosen tier. Domain and hosting are not part of the price. We clarify which option makes sense for you in conversation.",
        },
        {
          question: "Can I edit text and images myself?",
          answer:
            "This depends on the agreed editing solution. A content management system (CMS) is not automatically included in a price tier. Before the project starts, we clarify what you want to edit yourself, how often updates are needed and who will make them. The quote specifies the solution, any introduction and the costs of setup, content updates and technical maintenance.",
        },
        {
          question: "How does a project run?",
          answer:
            "In four steps: we clarify goals and scope, I develop a visual direction and the page structure, build the design and content, and after a shared review the website goes live.",
        },
        {
          question: "Does the website work on a phone?",
          answer:
            "Yes. Every tier is designed and tested for mobile rather than adapted afterwards. The narrow screen is the starting point, not the exception.",
        },
        {
          question: "Who do I work with?",
          answer:
            "Directly with me. There is no handover between sales, design, and development. The person who plans your project also builds it.",
        },
      ],
    },
  },
  reviews: {
    eyebrow: "NFC & QR Solutions",
    title: "One tap. Exactly the right action.",
    intro:
      "With an NFC card or a QR stand your customers reach reviews, menus or bookings directly. They simply hold up their phone or scan the QR code.",
    priceLabel: "Design levels including setup",
    products: [
      {
        id: "nfc-chip",
        name: "NFC sticker",
        price: "CHF 15.–",
        description: "A stick-on chip for your agreed digital link.",
        features: [productTierSummary("nfc-chip", "en"), "Stick-on format", "Programming included"],
      },
      {
        id: "standard-card",
        name: "Standard Card",
        price: "CHF 49.–",
        description: "A Standard Card in the fixed design.",
        features: [productTierSummary("standard-card", "en"), "No personalization · NFC and QR", "Programming included"],
      },
      {
        id: "personalized-card",
        name: "Personalized Card",
        price: "CHF 69.–",
        description: "An existing design with your logo or company name.",
        features: [productTierSummary("personalized-card", "en"), "Shape and size depend on model", "Logo and company name"],
      },
      {
        id: "fully-custom-card",
        name: "Fully Customized Card",
        price: "CHF 99.–",
        description: "A completely custom design aligned with your brand identity.",
        features: [productTierSummary("fully-custom-card", "en"), "Custom design and digital destination", "Design service included"],
      },
    ],
    quantityDiscount: "Over 10 items: additional quantity discounts by agreement.",
    processTitle: "Three simple steps",
    process: [
      { id: "tap", label: "TAP", title: "Tap", description: "The customer taps the NFC card or stand with their phone." },
      { id: "open", label: "OPEN", title: "Open", description: "An NFC-compatible phone opens the saved link without an extra NFC app. The destination service's requirements apply to the next action." },
      { id: "act", label: "ACT", title: "Act", description: "The guest reviews, reads the menu, books or saves your contact details." },
    ],
    ctaLabel: "Make a no-obligation inquiry",
    heroImages: [
      { src: "/images/products/catalog/review-round-black.webp", alt: "Black round NFC card for Google reviews" },
      { src: "/images/products/catalog/all-products.webp", alt: "Overview of NFC cards and display stands", fit: "contain" },
      { src: "/images/products/catalog/menu-personalized-white.webp", alt: "White personalized NFC menu card with the SilvanDigital logo" },
    ],
    heroIndicatorLabel: "Product image shown",
    heroPauseLabel: "Pause image rotation",
    heroResumeLabel: "Resume image rotation",
    categories: [
      { id: "reviews", label: "Google Reviews" },
      { id: "tripadvisor", label: "Tripadvisor" },
      { id: "social", label: "Social Media" },
      { id: "contact", label: "WhatsApp" },
      { id: "chips", label: "NFC chips" },
      { id: "menu", label: "Menu" },
      { id: "custom", label: "Custom" },
    ],
    catalogLabel: "Choose a product category",
    categoryPrompt: "Choose an application",
    productSingular: "product",
    productPlural: "products",
    previousProductLabel: "Previous product",
    nextProductLabel: "Next product",
    productPositionLabel: "Product",
    productPositionOfLabel: "of",
    forms: ["Round", "Square", "Rectangular"],
    sizes: ["80 × 80 mm", "100 × 100 mm", "Other sizes by agreement"],
    view3dLabel: "View in 3D",
    comingSoonLabel: "3D model coming soon",
    close3dLabel: "Close 3D view",
    loading3dLabel: "Loading 3D model …",
    error3dLabel: "The 3D model could not be loaded.",
    retry3dLabel: "Try again",
    interact3dLabel: "Drag with one finger or your mouse to rotate",
    catalog: mergePhotoProducts("en", [
      {
        id: "review-round-black", category: "reviews", title: "Standard Card · Round Black", price: "CHF 49.–",
        description: "A fixed Google Review design that leads directly to genuine feedback.",
        image: { src: "/images/products/catalog/review-round-black.webp", alt: "Black round Google Review NFC card" },
        details: ["Round", "80 × 80 or 100 × 100 mm"],
        scene: { url: "https://prod.spline.design/k2oyfSvDdVisnlUw/scene.splinecode", fallbackImage: "/images/products/round-nfc-black.webp", ariaLabel: "Interactive 3D model of a black round Google Review NFC card" },
      },
      {
        id: "review-round-white", category: "reviews", title: "Standard Card · Round White", price: "CHF 49.–",
        description: "A bright Google Review design with a clear NFC prompt and five stars.",
        image: { src: "/images/products/catalog/review-round-white.webp", alt: "White round Google Review NFC card" },
        details: ["Round", "80 × 80 or 100 × 100 mm"],
        scene: { url: "https://prod.spline.design/Lu503y2nQ8XllpRe/scene.splinecode", fallbackImage: "/images/products/round-nfc-white.webp", ariaLabel: "Interactive 3D model of a white round Google Review NFC card" },
      },
      {
        id: "review-square-blue", category: "reviews", title: "Standard Card · Blue", price: "CHF 49.–",
        description: "A square Google Review design with a clear tap prompt.",
        image: { src: "/images/products/catalog/review-square-blue.webp", alt: "Blue square Google Review NFC card" },
        details: ["Square", "80 × 80 or 100 × 100 mm"],
        scene: { url: "https://prod.spline.design/fttoKfHSbrqCbrUd/scene.splinecode", fallbackImage: "/images/products/stand-blue.webp", ariaLabel: "Interactive 3D model of a blue Google Review NFC card" },
      },
      {
        id: "review-stand-white", category: "reviews", title: "Standard Stand · White", price: "CHF 49.–",
        description: "A visible display stand for a reception, counter, or table.",
        image: { src: "/images/products/catalog/review-stand-white.webp", alt: "White Google Review NFC display stand" },
        details: ["Display stand", "Standard design without personalization"],
        scene: { url: "https://prod.spline.design/9R8JSb5RsHstdJxk/scene.splinecode", fallbackImage: "/images/products/card-stand-white.webp", ariaLabel: "Interactive 3D model of a white Google Review display stand" },
      },
      {
        id: "review-personalized-black", category: "reviews", title: "Personalized · Round Black", price: "CHF 69.–",
        description: "A Google Review design with your logo and company name.",
        image: { src: "/images/products/catalog/review-personalized-black.webp", alt: "Personalized black Google Review card with the SilvanDigital logo" },
        details: ["Round or square", "80 × 80 or 100 × 100 mm"],
      },
      {
        id: "menu-round-black", category: "menu", title: "Standard Menu · Round Black", price: "CHF 49.–",
        description: "Opens your digital food and drinks menu with one tap.",
        image: { src: "/images/products/catalog/menu-round-black.webp", alt: "Black round NFC menu card" },
        details: ["Round", "80 × 80 or 100 × 100 mm"],
      },
      {
        id: "menu-square-black", category: "menu", title: "Standard Menu · Square", price: "CHF 49.–",
        description: "A clear black standard design for your digital menu.",
        image: { src: "/images/products/catalog/menu-square-black.webp", alt: "Black square NFC menu card" },
        details: ["Square", "80 × 80 or 100 × 100 mm"],
      },
      {
        id: "menu-personalized-white", category: "menu", title: "Personalized Menu · White", price: "CHF 69.–",
        description: "A menu design with your logo and company name.",
        image: { src: "/images/products/catalog/menu-personalized-white.webp", alt: "White personalized round NFC menu card" },
        details: ["Round or square", "80 × 80 or 100 × 100 mm"],
      },
      {
        id: "booking-custom-blue", category: "custom", title: "Fully Customized · Booking", price: "CHF 99.–",
        description: "A fully custom design in your brand identity for bookings or reservations.",
        image: { src: "/images/products/catalog/booking-custom-blue.webp", alt: "Blue custom-designed NFC booking card" },
        details: ["Round or square", "80 × 80 or 100 × 100 mm", "Custom design and digital destination"],
      },
    ]),
    useCasesTitle: "One product, many possibilities",
    useCases: [
      { title: "Google Reviews", description: "Opens your review page directly." },
      { title: "Digital Menu", description: "Shows food and drinks without a printed menu." },
      { title: "Booking & Reservation", description: "Takes guests directly to a booking or table reservation." },
      { title: "Guest Wi-Fi", description: "Makes joining your guest Wi-Fi easier." },
      { title: "Digital contact card", description: "Saves contact and business details quickly." },
    ],
    inquiry: {
      title: "Ask about an NFC & QR solution",
      intro: "Choose a product and use case, enter the quantity and see the base cost. Shape and size are preferences; we confirm the details in your quote. Then choose how to contact us.",
      fields: [
        { name: "destination", label: "Destination or use case", placeholder: "Choose a use case", required: true },
        { name: "product", label: "Product", placeholder: "Choose a product", required: true },
        { name: "shape", label: "Shape", placeholder: "Choose a shape", required: true },
        { name: "size", label: "Size", placeholder: "Choose a size", required: true },
        { name: "quantity", label: "Quantity", placeholder: "For example, 2", required: true },
        { name: "setup", label: "Destination page", placeholder: "Choose destination status", required: true },
        { name: "destinationUrl", label: "Destination link", placeholder: "https://…", required: false, autoComplete: "url" },
        { name: "businessName", label: "Business (optional)", placeholder: "Your business name", required: false, autoComplete: "organization" },
        { name: "contactPerson", label: "Contact person (optional)", placeholder: "First and last name", required: false, autoComplete: "name" },
        { name: "note", label: "Design, colour or note (optional)", placeholder: "Logo, brand colours or other wishes", required: false },
      ],
      destinationOptions: [
        { value: "reviews", label: "Google Reviews" },
        { value: "tripadvisor", label: "Tripadvisor" },
        { value: "instagram", label: "Instagram" },
        { value: "tiktok", label: "TikTok" },
        { value: "facebook", label: "Facebook" },
        { value: "youtube", label: "YouTube" },
        { value: "whatsapp", label: "WhatsApp" },
        { value: "menu", label: "Digital menu" },
        { value: "booking", label: "Booking & reservation" },
        { value: "airbnb", label: "Airbnb" },
        { value: "wifi", label: "Guest Wi-Fi" },
        { value: "contact", label: "Digital contact card" },
        { value: "other", label: "Another destination" },
      ],
      productOptions: [
        { value: "nfc-chip", label: "NFC sticker · 1 item CHF 15.–" },
        { value: "standard-card", label: "Standard Card · CHF 49.–" },
        { value: "standard-stand", label: "Standard Stand · CHF 49.–" },
        { value: "personalized-card", label: "Personalized Card · CHF 69.–" },
        { value: "fully-custom-card", label: "Fully Customized Card · CHF 99.–" },
      ],
      shapeOptions: [{ value: "round", label: "Round" }, { value: "square", label: "Square" }, { value: "rectangle", label: "Rectangular" }],
      sizeOptions: [{ value: "80", label: "80 × 80 mm" }, { value: "100", label: "100 × 100 mm" }, { value: "confirm", label: "Size to be agreed" }],
      setupOptions: [
        { value: "ready", label: "I have the destination link" },
        { value: "needs-setup", label: "The destination still needs setup" },
      ],
      submitLabel: "Open inquiry in WhatsApp",
      editLabel: "Edit details",
      requiredError: "Please complete this field.",
      errorSummary: (count: number) =>
        count === 1
          ? "One field still needs to be completed or corrected."
          : `${count} fields still need to be completed or corrected.`,
      quantityError: "Please enter a whole quantity from 1 to 999. Request larger quantities in the message.",
      urlError: "Please enter a valid HTTPS link; use a Google link for reviews.",
      confirmTitle: "Please check your details",
      nonBindingNotice: "This is a no-obligation enquiry. An agreement is only formed once both parties have accepted the quote specifying the scope and total price.",
      privacyNotice: "Your details stay in this browser tab. When changing language, the enquiry is held for up to two minutes and deleted after transfer. Nothing is sent to us until you choose to pass it on.",
      messageIntro: "Hi Silvan, I would like to make a no-obligation inquiry about an NFC & QR solution.",
    },
    faq: {
      title: "Frequently asked questions about NFC & QR solutions",
      items: [
        {
          question: "How does an NFC & QR solution work?",
          answer:
            "Your guest taps the card, stand or NFC chip with a compatible phone. A QR code, where present, can be scanned instead. Opening the NFC link needs no extra NFC app; the destination service may require a login or its own app.",
        },
        {
          question: "Does it work with every phone?",
          answer:
            "The phone must support reading NFC links; some devices require NFC to be enabled. A QR code, where present, offers an alternative. The individual stick-on chip has no printed QR code. Linked websites require an internet connection.",
        },
        {
          question: "Can I buy or influence reviews with this?",
          answer:
            "No, and that is deliberate. The card only shortens the path to the review page. What your customer writes there is entirely their decision. Anything else breaches Google's policies and damages your profile more than it helps.",
        },
        {
          question: "Which destinations can the card open?",
          answer:
            "Beyond Google Reviews, it can open digital menus, booking and reservation pages, guest Wi-Fi, contact details, and other HTTPS destinations. I can also set up a missing Google profile.",
          link: { label: "Set up a Google Business Profile", href: "/presence" },
        },
        {
          question: "Which designs and sizes are available?",
          answer:
            "The catalogue includes round, square and rectangular cards, stands and stick-on chips. Shape and size depend on the model. Unconfirmed dimensions are labelled 'Size to be agreed'. The 80 × 80 mm and 100 × 100 mm enquiry options are preferred sizes for suitable cards, not availability guarantees for every model. Personalized adds a logo or business name; Fully Customized is designed entirely in your brand identity.",
        },
        {
          question: "What does it cost and what is included?",
          answer:
            "Standard Card: 1 item CHF 49, 2 total CHF 80, each additional item CHF 20. NFC sticker: 1 item CHF 15, 2 total CHF 25, each additional item CHF 5. Personalized Card: 1 item CHF 69, 2 total CHF 100, each additional item CHF 25. Fully Customized Card: 1 item CHF 99, 2 total CHF 150, each additional item CHF 30. One Standard Stand costs CHF 49; multiple stands are priced by agreement. For more than 10 items, further discounts are available by agreement. Programming and setup of the agreed link are included. Shipping and additional services are itemised separately in the quote.",
        },
      ],
    },
  },
  presence: {
    eyebrow: "Online Presence",
    title: "Clear business details on Google and Maps.",
    intro:
      "I review, create or update your Google Business Profile: opening hours, contact options and services, agreed with you.",
    priceLabel: "from CHF 249",
    startingPrice: "from CHF 249",
    priceTiers: [
      {
        id: "profile",
        name: "Google Business Profile Foundation",
        price: "from CHF 249",
        description: "Review, setup or improvements to your Google profile. The quote defines the profiles, locations and exact services; ongoing maintenance is agreed separately.",
        features: ["Profile review or setup", "Check of your business details", "Service information and handover summary"],
      },
    ],
    benefitsTitle: "A dependable local presence",
    benefits: [
      "Identify conflicting opening hours and contact details",
      "Check listed services against what you actually offer",
      "Track completed changes and outstanding items",
    ],
    processTitle: "How we approach it",
    process: [
      { id: "audit", label: "01", title: "Review the profile", description: "We check existing details, ownership and access, and define the scope in the quote." },
      { id: "align", label: "02", title: "Confirm the details", description: "You confirm opening hours, contact options and services. We work through any required Google verification together." },
      { id: "optimize", label: "03", title: "Edit the details", description: "With your approval, I edit the agreed profile details using the access you have granted." },
      { id: "handover", label: "04", title: "Hand over the status", description: "You receive a summary of changes, pending reviews and next steps. We clarify future access and maintenance." },
    ],
    ctaLabel: "Discuss your online presence",
    ctaHref: "/contact",
    faq: {
      title: "Frequently asked questions about online presence",
      items: [
        {
          question: "What is a Google Business Profile?",
          answer:
            "The entry that appears on Google and in Google Maps when someone searches for your business, or for your service nearby. It shows the address, opening hours, contact routes, and reviews.",
        },
        {
          question: "I already have a profile. Is this still worth it?",
          answer:
            "A review can reveal missing or conflicting details. We check the Google profile against the business information you confirm. Edits to other platforms or locations are only included when agreed in the quote.",
        },
        {
          question: "Does this guarantee a better ranking on Google?",
          answer:
            "No. I promise neither a position on Google nor additional enquiries. The aim is clear business information agreed with you.",
        },
        {
          question: "What do I get at the end?",
          answer:
            "The agreed profile work and a summary of changes, outstanding items and next steps. Pending Google verifications are recorded as open. Ongoing maintenance is only included by separate agreement; ownership stays with you.",
        },
      ],
    },
  },
  automation: {
    eyebrow: "Automation",
    title: "Turn recurring work into a clear, reliable workflow.",
    intro:
      "I examine manual routines and build sensible automations for emails, reports, information handoffs, and internal processes.",
    priceLabel: "On request",
    priceTiers: [
      {
        id: "custom-automation",
        name: "Custom Automation",
        price: "On request",
        description: "The scope and solution depend on your current process and what is technically worthwhile.",
        features: ["Feasibility assessment", "Focused implementation", "Documented handover"],
      },
    ],
    benefitsTitle: "Good candidates for automation",
    benefits: [
      "Recurring emails and notifications",
      "Regular reports and data preparation",
      "Information handoffs and repeatable internal workflows",
    ],
    processTitle: "From bottleneck to solution",
    process: [
      { id: "discover", label: "01", title: "Discover", description: "We map the current process and the time it consumes." },
      { id: "assess", label: "02", title: "Assess", description: "I evaluate feasibility, risks, and the realistic benefit." },
      { id: "implement", label: "03", title: "Implement", description: "The right solution is introduced and tested step by step." },
      { id: "handover", label: "04", title: "Handover", description: "You receive a straightforward introduction and documentation." },
    ],
    ctaLabel: "Discuss your workflow, no obligation",
    ctaHref: "/contact",
    faq: {
      title: "Frequently asked questions about automation",
      items: [
        {
          question: "Which tasks can be automated?",
          answer:
            "Recurring tasks with clear rules can be suitable, such as reports, notifications, or information handoffs. Whether implementation is feasible and worthwhile depends on data quality, available interfaces, access permissions, and exceptions in the workflow.",
        },
        {
          question: "Why is there no price on this page?",
          answer:
            "The effort depends on your process and the systems involved. The first enquiry carries no obligation. The scope and price of a detailed analysis are agreed before it is commissioned; implementation and possible ongoing costs are set out in the relevant quote.",
        },
        {
          question: "What if an automation is not worth it?",
          answer:
            "Then I say so. An automation that costs more upkeep than it saves in time is not progress. The feasibility check is allowed to conclude that today's process is the better one.",
        },
        {
          question: "What happens after delivery?",
          answer:
            "You receive a clear introduction and documentation. We agree who operates the workflow, who is notified of failures, and what maintenance is planned. Ongoing support and any required external subscriptions or usage fees depend on the specific quote and are not automatically included.",
        },
      ],
    },
  },
  work: {
    eyebrow: "Work",
    title: "Digital concepts with a clear purpose.",
    intro: "Four example websites you can explore yourself. Self-initiated concepts for fictional businesses, from design through to implementation.",
    conceptLabel: "Concept project",
    projectInfoLabel: "Project information",
    categoryLabel: "Category",
    yearLabel: "Year",
    typeLabel: "Type",
    challengeLabel: "Challenge",
    approachLabel: "Approach",
    outcomeLabel: "Intended outcome",
    ctaLabel: "Discuss your project",
  },
  about: {
    eyebrow: "About",
    title: "Direct collaboration, carefully delivered.",
    intro: "I'm Silvan Hahn, an independent web developer in Boppelsen, canton Zurich.",
    body: [
      "I combine clear design with maintainable development, focusing on digital solutions that are genuinely useful in day-to-day business.",
      "You work directly with the person planning and building your project. Decisions stay understandable, communication stays short, and the scope stays realistic.",
    ],
    valuesTitle: "How I work",
    values: [
      { title: "Clear", description: "Goals, scope, and decisions stay easy to follow." },
      { title: "Direct", description: "There are no handoffs between sales, design, and development." },
      { title: "Practical", description: "The solution fits your business rather than a short-lived trend." },
    ],
    standardsTitle: "What you can expect",
    standards: [
      "Your visitors should reach the important information quickly. I check loading times and keep the pages technically lean.",
      "Your website should work well with a keyboard too. Clear structure, readable contrast and understandable guidance are part of my checks.",
      "Designed for the narrow screen rather than adapted to it afterwards.",
      "When something changes, I check the important journeys again. Automated tests help catch errors early.",
    ],
    portraitAlt: "Silvan Hahn, portrait photograph taken indoors",
    portraitCaption: "Silvan Hahn, independent web developer",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk about what you need.",
    intro: "Email or message me directly on WhatsApp. You can also reach me by phone or on LinkedIn.",
    addressLabel: "Address",
    address: ["Silvan Hahn", "Regensbergstrasse 23", "8113 Boppelsen", "Switzerland"],
    emailLabel: "Email",
    phoneLabel: "Phone",
    whatsappLabel: "WhatsApp",
    linkedInLabel: "LinkedIn",
    details: {
      email: "hahn.silvan.work@gmail.com",
      // International format: the English pages are the ones a caller outside
      // Switzerland reads, and "078..." cannot be dialled from abroad.
      phoneDisplay: "+41 78 900 85 00",
      phoneHref: "tel:+41789008500",
      whatsappNumber: "+41 78 900 85 00",
      whatsappHref: "https://wa.me/41789008500",
      linkedIn: "https://www.linkedin.com/in/silvan-hahn-dev",
    },
  },
  footer: {
    navLabel: "Footer navigation",
    legalNavLabel: "Legal",
    contactTitle: "Direct contact",
    rights: "All rights reserved.",
    legal: [
      { label: "Imprint", href: "/imprint" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
  hello: {
    eyebrow: "SILVAN Digital Studio",
    title: "Hi, I'm Silvan.",
    intro: "Websites, local visibility, and practical automation for Swiss businesses.",
    links: [
      { label: "Websites", href: "/websites" },
      { label: "NFC & QR", href: "/reviews" },
      { label: "Online Presence", href: "/presence" },
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    directContactTitle: "Contact me directly",
  },
  imprint: imprintContent.en,
  privacy: privacyContent.en,
  notFound: {
    eyebrow: "404",
    title: "This page could not be found.",
    description: "The link may be outdated, or the address may have been entered incorrectly.",
    homeLabel: "Back to home",
  },
  // Keyword first, brand last -- see the note on the German dictionary. British
  // spelling, matching the rest of the English copy.
  seo: {
    home: { title: "Websites & NFC for businesses in Zurich | SILVAN", description: "Websites and NFC cards, chips and stands for reviews, menus and contact details. Work directly with Silvan Hahn in Boppelsen near Zurich. Websites from CHF 300." },
    websites: { title: "Business Websites for Swiss SMEs, from CHF 300", description: "Fast, mobile-first websites for Swiss SMEs from CHF 300. Indicative price ranges, with scope and price set out in a written quote." },
    reviews: { title: "NFC & QR Solutions for Businesses | SILVAN", description: "NFC cards and stands from CHF 49, stick-on chips from CHF 15. For reviews, menus and bookings. Link programming and setup included." },
    presence: { title: "Google Business Profile Setup for Swiss Businesses", description: "Google Business Profile setup and optimisation, consistent business details, and better local visibility. For Swiss SMEs from CHF 249." },
    automation: { title: "Automating Recurring Work for Swiss SMEs | SILVAN", description: "Automate recurring emails, reports and internal workflows without a heavy software rollout. For Swiss SMEs, scoped on request." },
    work: { title: "Work: Website Design Concepts | SILVAN Digital Studio", description: "Four explorable demo websites for trades, a café, a salon and a business group. Actual screenshots and insights into structure and visual design." },
    about: { title: "Silvan Hahn, Independent Web Developer near Zurich", description: "I'm Silvan Hahn, an independent web developer in Boppelsen, canton Zurich. You work directly with the person who plans, designs and builds your project." },
    contact: { title: "Contact: Web Design Enquiry, Canton Zurich | SILVAN", description: "Talk your project through directly with Silvan Hahn by email, WhatsApp, phone or LinkedIn. Based in Boppelsen ZH. Enquiries are non-binding." },
    hello: { title: "Hi, I'm Silvan | SILVAN Digital Studio", description: "A direct route to websites, Google reviews, online presence, work, and contact." },
    imprint: { title: "Imprint | SILVAN Digital Studio", description: "Responsible for this website: Silvan Hahn, Boppelsen. Legal form, contact details, and copyright." },
    privacy: { title: "Privacy | SILVAN Digital Studio", description: "Privacy information about this website, demos, hosting, contact channels and optional cookieless measurement. Controller: Silvan Hahn, Boppelsen, Switzerland." },
  },
} as const satisfies SiteContent;
