import type { SiteContent } from "./types";

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
    recommended: "Most often chosen",
  },
  home: {
    hero: {
      serviceLine: "Websites · Google Reviews · Online Presence · Automation",
      headline: "More customers. Less busywork.",
      supporting:
        "I build digital solutions for small businesses in Switzerland that help people find you and take recurring work off your plate.",
      primaryCta: "Discuss a project",
      secondaryCta: "Explore services",
    },
    servicesTitle: "Digital solutions for your business",
    services: [
      {
        title: "Websites",
        description: "Clear, fast websites that make your offer easy to understand.",
        price: "from CHF 300",
        href: "/websites",
      },
      {
        title: "NFC & QR Solutions",
        description: "Cards and stands for reviews, menus, bookings, and custom destinations.",
        price: "from CHF 49",
        href: "/reviews",
      },
      {
        title: "Online Presence",
        description: "A consistent presence that makes your business easier to find locally.",
        price: "from CHF 249",
        href: "/presence",
      },
      {
        title: "Automation",
        description: "Practical workflows that reliably reduce repetitive tasks.",
        price: "On request",
        href: "/automation",
      },
    ],
    workTitle: "Selected work",
    studioTitle: "Work directly with the developer",
    studioCopy:
      "SILVAN is Silvan Hahn's independent digital studio in Boppelsen, canton Zurich. I design and build websites for small and medium businesses across Switzerland – advice, design and delivery from one person.",
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
      "From a focused information site to a large custom presence, you get a fast, accessible website that is straightforward to maintain.",
    priceLabel: "CHF 300–5,000+",
    priceTiers: [
      {
        id: "simple",
        name: "Simple Info Website",
        price: "CHF 300–699",
        description: "A focused first presence with the essential information customers need.",
        features: ["One concise page", "Mobile optimised", "Direct contact options"],
      },
      {
        id: "standard",
        name: "Standard Business Website",
        price: "CHF 700–1,999",
        recommended: true,
        description: "For businesses ready to structure services, trust signals, and contact clearly.",
        features: ["Multiple content pages", "Custom layout", "Essential search foundations"],
      },
      {
        id: "premium",
        name: "Premium Large Website",
        price: "CHF 2,000–4,999",
        description: "For substantial content, ambitious design, and more advanced functionality.",
        features: ["Expanded site structure", "Polished interactions", "Flexible content modules"],
      },
      {
        id: "custom",
        name: "Custom Large Project",
        price: "from CHF 5,000",
        description: "For bespoke digital projects with a scope we define together.",
        features: ["Tailored concept", "Technical planning", "Project-specific delivery"],
      },
    ],
    benefitsTitle: "What you get",
    benefits: [
      "A clear structure for customers and search engines",
      "A responsive experience on every screen",
      "Maintainable code without unnecessary technical weight",
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
            "Concept, design, build, and launch within the scope of the chosen tier. Domain and hosting are not part of the price – we clarify which option makes sense for you in conversation.",
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
            "Directly with me. There is no handover between sales, design, and development – the person who plans your project also builds it.",
        },
      ],
    },
  },
  reviews: {
    eyebrow: "NFC & QR Solutions",
    title: "One tap. Exactly the right action.",
    intro:
      "Google reviews, digital menus, and tailored solutions for booking, reservations, and more — programmed and ready to use.",
    priceLabel: "Design levels including setup",
    products: [
      {
        id: "standard-card",
        name: "Standard Card",
        price: "CHF 49.–",
        description: "A fixed black design for Google Reviews or digital menus.",
        features: ["Round or square", "80 × 80 or 100 × 100 mm", "Programming included"],
      },
      {
        id: "standard-pair",
        name: "Two Standard Cards",
        price: "CHF 80.–",
        description: "Two Standard Cards for more than one customer touchpoint.",
        features: ["Choose either shape", "Both sizes available", "Setup included"],
      },
      {
        id: "standard-stand",
        name: "Standard Stand",
        price: "CHF 69.–",
        description: "A visible standard stand for a reception, counter, or table.",
        features: ["No personalization", "NFC and QR", "Setup included"],
      },
      {
        id: "personalized-card",
        name: "Personalized Card",
        price: "CHF 69.–",
        description: "An existing design with your logo or company name.",
        features: ["Round or square", "Both sizes", "Logo and company name"],
      },
      {
        id: "fully-custom-card",
        name: "Fully Customized Card",
        price: "CHF 99.–",
        description: "A completely custom design aligned with your brand identity.",
        features: ["Custom design", "Any digital destination", "Design service included"],
      },
    ],
    quantityDiscount: "A quantity discount applies to larger orders. I give you the price for your quantity when I reply to your enquiry – before anything is binding.",
    processTitle: "Three simple steps",
    process: [
      { id: "tap", label: "TAP", title: "Tap", description: "The customer taps the NFC card or stand with their phone." },
      { id: "open", label: "OPEN", title: "Open", description: "Your business's Google review page opens directly." },
      { id: "review", label: "REVIEW", title: "Review", description: "The customer chooses to leave their honest feedback." },
    ],
    ctaLabel: "Make a no-obligation inquiry",
    heroImages: [
      { src: "/images/products/catalog/review-round-black.webp", alt: "Black round NFC card for Google reviews" },
      { src: "/images/products/catalog/all-products.webp", alt: "Overview of NFC cards and display stands" },
      { src: "/images/products/catalog/menu-personalized-white.webp", alt: "White personalized NFC menu card with the SilvanDigital logo" },
    ],
    heroIndicatorLabel: "Product image shown",
    categories: [
      { id: "reviews", label: "Google Reviews" },
      { id: "menu", label: "Menu" },
      { id: "custom", label: "Custom" },
    ],
    catalogLabel: "Choose a product category",
    forms: ["Round", "Square"],
    sizes: ["80 × 80 mm", "100 × 100 mm"],
    view3dLabel: "View in 3D",
    comingSoonLabel: "3D model coming soon",
    close3dLabel: "Close 3D view",
    loading3dLabel: "Loading 3D model …",
    error3dLabel: "The 3D model could not be loaded.",
    retry3dLabel: "Try again",
    interact3dLabel: "Rotate with your mouse or finger",
    catalog: [
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
        id: "review-stand-white", category: "reviews", title: "Standard Stand · White", price: "CHF 69.–",
        description: "A visible display stand for a reception, counter, or table.",
        image: { src: "/images/products/catalog/review-stand-white.webp", alt: "White Google Review NFC display stand" },
        details: ["Display stand", "Standard design without personalization"],
        scene: { url: "https://prod.spline.design/9R8JSb5RsHstdJxk/scene.splinecode", fallbackImage: "/images/products/card-stand-white.webp", ariaLabel: "Interactive 3D model of a white Google Review display stand" },
      },
      {
        id: "review-personalized-black", category: "reviews", title: "Personalized · Round Black", price: "CHF 69.–",
        description: "A Google Review design with your logo and company name.",
        image: { src: "/images/products/catalog/review-personalized-black.webp", alt: "Personalized black Google Review card with the SilvanDigital logo" },
        details: ["Round", "Example with logo and company name"],
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
        details: ["Round", "Example with logo and company name"],
      },
      {
        id: "booking-custom-blue", category: "custom", title: "Fully Customized · Booking", price: "CHF 99.–",
        description: "A fully custom design in your brand identity for bookings or reservations.",
        image: { src: "/images/products/catalog/booking-custom-blue.webp", alt: "Blue custom-designed NFC booking card" },
        details: ["Square", "Custom design and digital destination"],
      },
    ],
    useCasesTitle: "One product, many possibilities",
    useCases: [
      { title: "Google Reviews", description: "Opens your review page directly." },
      { title: "Digital Menu", description: "Shows food and drinks without a printed menu." },
      { title: "Booking & Reservation", description: "Takes guests directly to a booking or table reservation." },
      { title: "Guest Wi-Fi", description: "Makes joining your guest Wi-Fi easier." },
      { title: "Digital contact card", description: "Saves contact and business details quickly." },
    ],
    productSelectorLabel: "Choose a Google Review product",
    menuSelectorLabel: "Choose a menu product",
    productVisualizations: [
      {
        id: "round-nfc-white",
        fallbackImage: "/images/products/round-nfc-white.webp",
        title: "Round white",
        sceneUrl:
          "https://prod.spline.design/Lu503y2nQ8XllpRe/scene.splinecode",
        ariaLabel:
          "Slowly rotating 3D model of a white round Google Review NFC tag",
      },
      {
        id: "round-nfc-black",
        fallbackImage: "/images/products/round-nfc-black.webp",
        title: "Round black",
        sceneUrl:
          "https://prod.spline.design/k2oyfSvDdVisnlUw/scene.splinecode",
        ariaLabel:
          "Slowly rotating 3D model of a black round Google Review NFC tag",
      },
      {
        id: "stand-blue",
        fallbackImage: "/images/products/stand-blue.webp",
        title: "Blue stand",
        sceneUrl:
          "https://prod.spline.design/fttoKfHSbrqCbrUd/scene.splinecode",
        ariaLabel:
          "Slowly rotating 3D model of a blue Google Review table stand",
      },
      {
        id: "card-white-qr",
        fallbackImage: "/images/products/card-white-qr.webp",
        title: "White card",
        sceneUrl:
          "https://prod.spline.design/VXtEe7dRfsZEicnw/scene.splinecode",
        ariaLabel:
          "Slowly rotating 3D model of a white Google Review card with NFC and a QR code",
      },
      {
        id: "card-stand-white",
        fallbackImage: "/images/products/card-stand-white.webp",
        title: "White card stand",
        sceneUrl:
          "https://prod.spline.design/9R8JSb5RsHstdJxk/scene.splinecode",
        ariaLabel:
          "Slowly rotating 3D model of a white Google Review card stand for a table",
      },
    ],
    menuVisualizations: [],
    secondaryProductImage: {
      src: "/images/products/review-stands.png",
      alt: "NFC stand for a table or counter, asking the customer to review the business on Google",
    },
    inquiry: {
      title: "Ask about Review Cards",
      intro: "Send the essentials through WhatsApp and I will respond personally.",
      fields: [
        { name: "product", label: "Product", placeholder: "Choose a product", required: true },
        { name: "quantity", label: "Quantity", placeholder: "For example, 2", required: true },
        { name: "variant", label: "Colour or variant (optional)", placeholder: "If you have a preference", required: false },
        { name: "businessName", label: "Business", placeholder: "Your business name", required: true, autoComplete: "organization" },
        { name: "contactPerson", label: "Contact person", placeholder: "First and last name", required: true, autoComplete: "name" },
        { name: "googleUrl", label: "Google Business Profile or review link", placeholder: "https://…", required: true, autoComplete: "url" },
        { name: "street", label: "Street", placeholder: "Street and number", required: true, autoComplete: "street-address" },
        { name: "postalCode", label: "Postcode", placeholder: "8000", required: true, autoComplete: "postal-code" },
        { name: "city", label: "Town or city", placeholder: "Zurich", required: true, autoComplete: "address-level2" },
        { name: "note", label: "Optional note", placeholder: "Anything else I should know?", required: false },
      ],
      productOptions: ["NFC Review Card", "NFC Stand", "Two NFC Review Cards"],
      submitLabel: "Open inquiry in WhatsApp",
      editLabel: "Edit details",
      requiredError: "Please complete this field.",
      errorSummary: (count: number) =>
        count === 1
          ? "One field still needs to be completed or corrected."
          : `${count} fields still need to be completed or corrected.`,
      quantityError: "Please enter a valid quantity of at least 1.",
      urlError: "Please enter a valid Google link.",
      confirmTitle: "Please check your details",
      nonBindingNotice: "This is a no-obligation inquiry. It only becomes binding after I personally confirm it.",
      privacyNotice: "Your details are not stored by this website; they are only inserted into the WhatsApp message.",
      messageIntro: "Hi Silvan, I would like to make a no-obligation inquiry about NFC Review Cards.",
    },
    faq: {
      title: "Frequently asked questions about review cards",
      items: [
        {
          question: "How does an NFC review card work?",
          answer:
            "Your customer holds their phone against the card or the stand. Your business's Google review page opens directly – no search, no app, and no link to type out.",
        },
        {
          question: "Does it work with every phone?",
          answer:
            "Current iPhones and Android devices read NFC tags without an extra app. For older devices, a QR code on the card can be used as well.",
        },
        {
          question: "Can I buy or influence reviews with this?",
          answer:
            "No, and that is deliberate. The card only shortens the path to the review page. What your customer writes there is entirely their decision – anything else breaches Google's policies and damages your profile more than it helps.",
        },
        {
          question: "Do I need a Google Business Profile?",
          answer:
            "Yes, the card points to it. If you do not have one yet, or it is incomplete, I set it up under Online presence.",
          link: { label: "Set up a Google Business Profile", href: "/presence" },
        },
        {
          question: "What does it cost and what is included?",
          answer:
            "A card costs CHF 49, a stand CHF 69, two cards CHF 80. Programming and setup for your Google profile are included in each. A quantity discount is available for larger orders.",
        },
      ],
    },
  },
  presence: {
    eyebrow: "Online Presence",
    title: "Get the details right wherever customers find you.",
    intro:
      "I set up or improve your Google Business Profile and make sure your core business information is consistent and easy to understand.",
    priceLabel: "from CHF 249",
    startingPrice: "from CHF 249",
    priceTiers: [
      {
        id: "profile",
        name: "Google Business Profile Foundation",
        price: "from CHF 249",
        description: "A properly configured profile that gives your local visibility a solid foundation.",
        features: ["Profile audit or setup", "Consistent business details", "Clear service information"],
      },
    ],
    benefitsTitle: "A dependable local presence",
    benefits: [
      "Customers can find your business with accurate details",
      "Opening hours and contact options stay consistent",
      "People understand your offer more quickly",
    ],
    processTitle: "How we approach it",
    process: [
      { id: "audit", label: "01", title: "Audit", description: "I review your current presence and identify visible gaps." },
      { id: "align", label: "02", title: "Align", description: "We confirm your services, local area, and correct business details." },
      { id: "optimize", label: "03", title: "Improve", description: "The profile and information are improved in a clear, accountable way." },
      { id: "handover", label: "04", title: "Handover", description: "You receive a clear overview and practical next steps." },
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
            "Usually yes. I check the existing entry for missing or contradictory details, add services and service area, and make sure your business details read the same everywhere.",
        },
        {
          question: "Does this guarantee a better ranking on Google?",
          answer:
            "No. Nobody can guarantee a position on Google, and anyone promising one should make you suspicious. A complete, consistent profile is the ground local visibility can grow on.",
        },
        {
          question: "What do I get at the end?",
          answer:
            "A profile that is set up or reworked, consistent business details, and a clear overview of where things stand and which steps make sense next.",
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
    ctaLabel: "Request a workflow review",
    ctaHref: "/contact",
    faq: {
      title: "Frequently asked questions about automation",
      items: [
        {
          question: "Which tasks can be automated?",
          answer:
            "Anything that runs regularly by the same rules: recurring emails and notifications, regular reports and data preparation, handovers between systems, and repeatable internal workflows.",
        },
        {
          question: "Why is there no price on this page?",
          answer:
            "Because the effort depends entirely on your existing process. I assess feasibility, risks, and the expected benefit first – only then can an honest price be named.",
        },
        {
          question: "What if an automation is not worth it?",
          answer:
            "Then I say so. An automation that costs more upkeep than it saves in time is not progress. The feasibility check is allowed to conclude that today's process is the better one.",
        },
        {
          question: "What happens after delivery?",
          answer:
            "You get a clear introduction and documentation, so the workflow stays understandable and does not depend on a single person.",
        },
      ],
    },
  },
  work: {
    eyebrow: "Work",
    title: "Digital concepts with a clear purpose.",
    intro: "Selected design concepts show how strategy, content, and development can work together.",
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
    standardsTitle: "What I take as given",
    standards: [
      "Every page is delivered as finished HTML and is there immediately – including on a slow connection.",
      "Operable by keyboard and screen reader, with verified colour contrast.",
      "Designed for the narrow screen rather than adapted to it afterwards.",
      "Automatically tested, so a later change cannot quietly break what already worked.",
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
      email: "kontakt@silvandigital.ch",
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
  imprint: {
    eyebrow: "Imprint",
    title: "Who stands behind this website.",
    intro:
      "Provider identification under Art. 3 para. 1 lit. s of the Swiss Federal Act against Unfair Competition (UCA).",
    updatedLabel: "Last updated",
    updated: "August 2026",
    sections: [
      {
        title: "Responsible for this website",
        body: [
          "Silvan Hahn",
          "Regensbergstrasse 23",
          "8113 Boppelsen",
          "Switzerland",
        ],
      },
      {
        title: "Contact",
        body: [
          "Email: kontakt@silvandigital.ch",
          "Phone: +41 78 900 85 00",
          "Every contact route is also listed on the contact page.",
        ],
      },
      {
        title: "Legal form and VAT",
        body: [
          "SILVAN Digital Studio is the trading name of the sole proprietorship of Silvan Hahn. There is no entry in the commercial register.",
          "There is no VAT liability. No VAT is therefore shown on invoices, and the prices stated on this website are final prices.",
        ],
      },
      {
        title: "About the work shown",
        body: [
          "The projects shown under \"Work\" are self-initiated design concepts and are labelled \"Concept project\" on every view. They are not completed client engagements, and no client, result, or metric is claimed for them.",
        ],
      },
      {
        title: "Liability for content",
        body: [
          "The content of this website is prepared with care. No warranty is given for its accuracy, completeness, or currency. Prices are indicative and become binding only with a written confirmation.",
          "Inquiries made through this website are non-binding. A contract comes into effect only through an explicit confirmation.",
        ],
      },
      {
        title: "Liability for links",
        body: [
          "This website links to external websites over whose content there is no influence. The respective provider is solely responsible for that content.",
        ],
      },
      {
        title: "Copyright",
        body: [
          "The content, designs, and images published on this website are subject to Swiss copyright law. Reproduction or use beyond the legally permitted cases requires prior written consent.",
        ],
      },
    ],
  },
  privacy: {
    eyebrow: "Privacy",
    title: "What data this website processes.",
    intro:
      "This statement describes which personal data is processed when you visit this website, under the revised Swiss Federal Act on Data Protection (revFADP).",
    updatedLabel: "Last updated",
    updated: "August 2026",
    sections: [
      {
        title: "Responsible person",
        body: [
          "Silvan Hahn, Regensbergstrasse 23, 8113 Boppelsen, Switzerland",
          "Email: kontakt@silvandigital.ch",
        ],
      },
      {
        title: "Principle",
        body: [
          "This website is built to process as little personal data as possible. It has no contact form that posts to a server, no user accounts, and no comment function.",
        ],
      },
      {
        title: "Audience measurement without cookies",
        body: [
          "This website uses Vercel Analytics to count which pages are opened. No cookies are set and no persistent identifiers are stored. No profiling takes place, you are not recognised across visits, and nothing is followed across other websites.",
          "What is collected: the page opened, the referring address, approximate origin at country level, and device type and browser. From this a daily-rotating, non-reversible value is derived whose only purpose is to stop repeat views within one session being counted twice. That value is not stored and allows no conclusion about you personally.",
          "No advertising services are embedded, and no data is passed to third parties for advertising. Because no cookies are set and no personal data is processed to recognise you, this measurement requires no consent.",
        ],
      },
      {
        title: "Server log files",
        body: [
          "When this website is requested, the hosting provider processes technically necessary data: IP address, date and time of access, the address requested, the referring link, and details about browser and operating system.",
          "This processing is required for the secure and stable operation of the website. The data is not merged with other sources and is not used to identify individuals.",
        ],
      },
      {
        title: "Hosting",
        body: [
          "This website is hosted with Vercel Inc. Data may therefore also be processed on servers outside Switzerland. The provider is contractually bound to maintain an adequate level of data protection.",
        ],
      },
      {
        title: "Fonts",
        body: [
          "The typeface used is downloaded when the website is built and served by this website itself. Your browser makes no connection to an external font provider, and no data is transmitted to third parties.",
        ],
      },
      {
        title: "Review card inquiry",
        body: [
          "On the \"Google Reviews\" page you can enter the details of an inquiry. Those entries are assembled into a WhatsApp message inside your browser only. They are not transmitted to this website and are not stored here.",
          "Only when you send the prepared message in WhatsApp do the details reach WhatsApp and myself. WhatsApp's own privacy terms then apply in addition.",
        ],
      },
      {
        title: "Getting in touch",
        body: [
          "If you contact me by email, phone, WhatsApp, or LinkedIn, your details are used to handle your request and kept for as long as that and any statutory retention obligations require.",
          "WhatsApp and LinkedIn are third-party services. If you use those routes, data is also processed by the respective provider – WhatsApp by Meta Platforms Ireland Ltd., LinkedIn by LinkedIn Ireland Unlimited Company.",
        ],
      },
      {
        title: "External links",
        body: [
          "This website links to external services, for example LinkedIn or Google Business Profiles. The respective provider is responsible for data processing on those websites.",
        ],
      },
      {
        title: "Your rights",
        body: [
          "You have the right to information about the data processed about you, and to its correction, deletion, or release. You may object to processing and withdraw consent at any time.",
          "Please contact the address given above. You also have the right to lodge a complaint with the Federal Data Protection and Information Commissioner (FDPIC).",
        ],
      },
      {
        title: "Data security",
        body: [
          "This website is served exclusively over encrypted HTTPS. Data transmitted between your browser and the server is therefore protected against interception.",
        ],
      },
      {
        title: "Changes",
        body: [
          "This privacy statement may be adapted when the website or the legal requirements change. The version published on this page is the one that applies.",
        ],
      },
    ],
  },
  notFound: {
    eyebrow: "404",
    title: "This page could not be found.",
    description: "The link may be outdated, or the address may have been entered incorrectly.",
    homeLabel: "Back to home",
  },
  // Keyword first, brand last -- see the note on the German dictionary. British
  // spelling, matching the rest of the English copy.
  seo: {
    home: { title: "Web Design for Small Businesses near Zurich | SILVAN", description: "Websites, Google reviews, local visibility and automation for Swiss SMEs. Built directly by an independent developer in Boppelsen ZH – websites from CHF 300." },
    websites: { title: "Business Websites for Swiss SMEs – from CHF 300", description: "Fast, mobile-first business websites for Swiss SMEs, from a CHF 300 one-pager through to a custom build. Fixed price tiers, delivered by the developer." },
    reviews: { title: "NFC & QR Solutions for Businesses | from CHF 49", description: "NFC cards and stands for Google reviews, digital menus, bookings, and custom destinations. Programming and setup included." },
    presence: { title: "Google Business Profile Setup for Swiss Businesses", description: "Google Business Profile setup and optimisation, consistent business details, and better local visibility. For Swiss SMEs from CHF 249." },
    automation: { title: "Automating Recurring Work for Swiss SMEs | SILVAN", description: "Automate recurring emails, reports and internal workflows without a heavy software rollout. For Swiss SMEs, scoped on request." },
    work: { title: "Work: Website Design Concepts | SILVAN Digital Studio", description: "Four self-initiated design concepts – brand site, online shop, studio site and retail – showing how I approach structure, copy and visual design." },
    about: { title: "Silvan Hahn – Independent Web Developer near Zurich", description: "I'm Silvan Hahn, an independent web developer in Boppelsen, canton Zurich. You work directly with the person who plans, designs and builds your project." },
    contact: { title: "Contact – Web Design Enquiry, Canton Zurich | SILVAN", description: "Talk your project through directly with Silvan Hahn by email, WhatsApp, phone or LinkedIn. Based in Boppelsen ZH. Enquiries are non-binding." },
    hello: { title: "Hi, I'm Silvan | SILVAN Digital Studio", description: "A direct route to websites, Google reviews, online presence, work, and contact." },
    imprint: { title: "Imprint | SILVAN Digital Studio", description: "Responsible for this website: Silvan Hahn, Boppelsen. Legal form, contact details, and copyright." },
    privacy: { title: "Privacy | SILVAN Digital Studio", description: "No cookies, no profiling, no recognition across visits – only a cookieless page-view count. Privacy statement under the revised Swiss FADP." },
  },
} as const satisfies SiteContent;
