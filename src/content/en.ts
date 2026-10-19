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
      { label: "Google Business Profile", href: "/presence" },
      { label: "NFC and QR cards", href: "/reviews" },
      { label: "Automations", href: "/automation" },
      { label: "Examples", href: "/work" },
      { label: "Prices", href: "/#prices" },
      { label: "About me", href: "/about" },
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
      serviceLine: "Websites, Google Business Profile, NFC and QR cards and automations",
      headline: homeCopy.en.headline,
      supporting:
        "I’m Silvan Hahn. I build websites, help customers find your business on Google and simplify recurring tasks. Based near Zurich, working with businesses across Switzerland.",
      primaryCta: homeCopy.en.primaryCta,
      secondaryCta: homeCopy.en.secondaryCta,
    },
    servicesTitle: "What would you like to improve?",
    services: [
      {
        title: "Websites",
        description: "Show customers what your business offers, with clear information and easy ways to get in touch.",
        price: "from CHF 300",
        href: "/websites",
      },
      {
        title: "NFC and QR cards",
        description: "Customers hold their phone near a card or scan a QR code to open a page, such as your menu or Google reviews.",
        price: "Stickers from CHF 15 · cards from CHF 29",
        href: "/reviews",
      },
      {
        title: "Google Business Profile",
        description: "Keep your hours, address and phone number clear and up to date on Google and Google Maps.",
        price: "from CHF 249",
        href: "/presence",
      },
      {
        title: "Automations",
        description: "Cut down on repetitive office work, such as collecting enquiries or copying data between programs.",
        price: "On request",
        href: "/automation",
      },
    ],
    workTitle: "Selected work",
    studioTitle: "Your contact from start to finish",
    studioCopy:
      "I’m Silvan Hahn, based in Boppelsen near Zurich. I help with your online presence and simplify everyday tasks. Wherever your business is based, you work directly with me.",
    testimonialsTitle: "What clients say",
    // Stays empty until a real, named and approved client quote exists. The
    // section renders only once this array has entries -- an invented
    // endorsement on the site of a studio that sells Google Reviews would be
    // the most expensive mistake available.
    testimonials: [],
  },
  websites: {
    "eyebrow": "Websites for small businesses",
    "title": "A website your customers understand at once.",
    "intro": "Customers see at a glance what you offer and how to reach you. I take care of the design and the technology, at a fixed price.",
    "priceLabel": "Indicative prices · CHF 300–5,000+",
    "priceTiers": [
      {
        "id": "simple",
        "name": "Compact website",
        "price": "CHF 300–699",
        "description": "For businesses that want to show their services, opening hours and contact details on one clear page.",
        "features": [
          "One page with your services, opening hours and contact details",
          "Easy to use on a phone",
          "Call or write with one tap"
        ]
      },
      {
        "id": "standard",
        "name": "Business website",
        "price": "CHF 700–1,999",
        "recommended": true,
        "description": "For businesses that want separate pages for their services, company and contact details.",
        "features": [
          "Separate pages, for example for services, your business and contact",
          "Design that suits your business",
          "The basics that help search engines such as Google find your pages"
        ]
      },
      {
        "id": "premium",
        "name": "Larger website",
        "price": "CHF 2,000–4,999",
        "description": "For companies with several service areas or substantial content that needs careful organisation and design.",
        "features": [
          "A clear structure for several sections",
          "Menus and pages suited to a lot of content",
          "Consistent layouts for similar pages"
        ]
      },
      {
        "id": "custom",
        "name": "Custom project",
        "price": "from CHF 5,000",
        "description": "For specific features or connections to existing software. We first agree on what your website needs to do.",
        "features": [
          "A concept made for your project",
          "Planning the technology together with you",
          "Building the agreed features"
        ]
      }
    ],
    "benefitsTitle": "Which website fits your business?",
    "benefits": [
      "Structure and design that suit your business",
      "Easy to read on phones and computers",
      "Only online once you approve it"
    ],
    "processTitle": "How your website comes together",
    "process": [
      {
        "id": "consult",
        "label": "01",
        "title": "Free first consultation",
        "description": "By phone, by video or in person."
      },
      {
        "id": "quote",
        "label": "02",
        "title": "Quote with a fixed price",
        "description": "Work only starts once you accept."
      },
      {
        "id": "build",
        "label": "03",
        "title": "Online in 2–4 weeks",
        "description": "Once text and images are ready."
      }
    ],
    "ctaLabel": "Free first consultation",
    "ctaHref": "/contact",
    "faq": {
      "title": "Frequently asked questions about websites",
      "items": [
        {
          "question": "What does a website cost in total?",
          "answer": "A one-off CHF 300 to 699 for a compact website, CHF 700 to 1,999 for a website with several pages, CHF 2,000 to 4,999 for a larger website and from CHF 5,000 for a custom project. Annual costs for your web address and hosting come on top. All amounts are listed in your quote in advance and include VAT."
        },
        {
          "question": "What is included in the price?",
          "answer": "Planning, design, building and going live, as agreed. The quote also states how many rounds of changes are included. Annual costs for your web address and hosting and later changes are not included. They are listed separately in the quote."
        },
        {
          "question": "What are a web address and hosting?",
          "answer": "Your web address is the name of your website, for example www.your-business.ch. Hosting is the space on the internet that keeps your website online. Both come with a yearly fee. The amount depends on size and what you need, and you see it in your quote before you agree."
        },
        {
          "question": "Do I have to provide text and images?",
          "answer": "Not necessarily. In our first conversation we look at what you already have and what is missing. The quote states which content you provide and which I create."
        },
        {
          "question": "How long does it take?",
          "answer": "A compact website is usually online within 2–4 weeks once text and images are ready. We plan larger projects together. The schedule is part of your quote."
        },
        {
          "question": "Can I change things myself later?",
          "answer": "Yes, if you want to. While planning, we discuss what you would like to change yourself, such as opening hours or photos. If needed, I set up a simple editing tool and show you how it works. Its cost is listed in the quote. You can also leave changes to me. We agree on that separately."
        }
      ]
    }
  },
  reviews: {
    eyebrow: "NFC and QR cards",
    title: "Tap the card. Leave a review.",
    intro:
      "Customers hold their phone to the card or scan the code. Your Google review page, menu or booking opens straight away.",
    priceLabel: "Product and design options with link setup included",
    products: [
      {
        id: "nfc-chip",
        name: "NFC sticker",
        price: "CHF 15.–",
        description: "A self-adhesive NFC sticker that opens your chosen link. Attach it to an existing product.",
        features: [productTierSummary("nfc-chip", "en"), "Stick-on format", "Programming included"],
      },
      {
        id: "compact-card",
        name: "Compact NFC card",
        price: "CHF 29.–",
        description: "A flat, rectangular card to present to customers. Available in white or black, without a stand.",
        features: [productTierSummary("compact-card", "en"), "White or black", "Programming included"],
      },
      {
        id: "standard-card",
        name: "Standard card",
        price: "CHF 49.–",
        description: "A card with an existing standard design, without your logo or business name.",
        features: [productTierSummary("standard-card", "en"), "Existing design · NFC and QR", "Programming included"],
      },
      {
        id: "personalized-card",
        name: "Card with your logo",
        price: "CHF 69.–",
        description: "An existing design with your logo or company name.",
        features: [productTierSummary("personalized-card", "en"), "Shape and size depend on model", "Logo and company name"],
      },
      {
        id: "fully-custom-card",
        name: "Custom-designed card",
        price: "CHF 99.–",
        description: "A custom design with your colours, logo and chosen layout.",
        features: [productTierSummary("fully-custom-card", "en"), "Custom design and setup of your chosen link", "Design service included"],
      },
    ],
    quantityDiscount: "Over 10 items: additional quantity discounts by agreement.",
    processTitle: "Three simple steps",
    process: [
      { id: "tap", label: "TAP", title: "Hold the phone to the card", description: "Your customer holds their phone briefly to the card, or scans the QR code with the camera." },
      { id: "open", label: "OPEN", title: "Tap the notification", description: "A notification with your link appears on the phone. One tap is enough. No extra app is needed." },
      { id: "act", label: "ACT", title: "Review, read, book", description: "Your page is open. Your customer writes a review, reads the menu or books a table." },
    ],
    ctaLabel: "Enquire about a card",
    heroImages: [
      { src: "/images/products/catalog/review-round-black.webp", alt: "Black round NFC card for Google reviews" },
      { src: "/images/products/catalog/all-products.webp", alt: "Overview of NFC cards and display stands", fit: "contain" },
      { src: "/images/products/catalog/menu-personalized-white.webp", alt: "White personalised NFC menu card with the SilvanDigital logo" },
    ],
    heroIndicatorLabel: "Product image shown",
    heroPauseLabel: "Pause image rotation",
    heroResumeLabel: "Resume image rotation",
    categories: [
      { id: "reviews", label: "Google reviews" },
      { id: "social", label: "Instagram" },
      { id: "chips", label: "NFC stickers" },
      { id: "menu", label: "Menu" },
      { id: "custom", label: "Custom designs and other uses" },
    ],
    catalogLabel: "Use",
    categoryPrompt: "Which product examples would you like to see?",
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
    interact3dLabel: "Drag with your finger or mouse to rotate the product.",
    catalog: mergePhotoProducts("en", [
      {
        id: "review-round-black", category: "reviews", title: "Standard card · Round, black", price: "CHF 49.–",
        description: "A direct link to your Google review page. Black standard design.",
        image: { src: "/images/products/catalog/review-round-black.webp", alt: "Black round Google review NFC card" },
        details: ["Round", "80 × 80 or 100 × 100 mm"],
        scene: { url: "https://prod.spline.design/k2oyfSvDdVisnlUw/scene.splinecode", fallbackImage: "/images/products/round-nfc-black.webp", ariaLabel: "Interactive 3D model of a black round Google review NFC card" },
      },
      {
        id: "review-round-white", category: "reviews", title: "Standard card · Round, white", price: "CHF 49.–",
        description: "A direct link to your Google review page. White standard design with five printed stars.",
        image: { src: "/images/products/catalog/review-round-white.webp", alt: "White round Google review NFC card" },
        details: ["Round", "80 × 80 or 100 × 100 mm"],
        scene: { url: "https://prod.spline.design/Lu503y2nQ8XllpRe/scene.splinecode", fallbackImage: "/images/products/round-nfc-white.webp", ariaLabel: "Interactive 3D model of a white round Google review NFC card" },
      },
      {
        id: "review-square-blue", category: "reviews", title: "Standard card · Blue", price: "CHF 49.–",
        description: "A blue, square card with a standard design for your Google review page.",
        image: { src: "/images/products/catalog/review-square-blue.webp", alt: "Blue square Google review NFC card" },
        details: ["Square", "80 × 80 or 100 × 100 mm"],
        scene: { url: "https://prod.spline.design/fttoKfHSbrqCbrUd/scene.splinecode", fallbackImage: "/images/products/stand-blue.webp", ariaLabel: "Interactive 3D model of a blue Google review NFC card" },
      },
      {
        id: "review-stand-white", category: "reviews", title: "Standard display stand · White", price: "CHF 49.–",
        description: "A display stand with a standard design for your Google review page. For a reception desk, counter or table.",
        image: { src: "/images/products/catalog/review-stand-white.webp", alt: "White Google review NFC display stand" },
        details: ["Display stand", "Standard design without personalisation"],
        scene: { url: "https://prod.spline.design/9R8JSb5RsHstdJxk/scene.splinecode", fallbackImage: "/images/products/card-stand-white.webp", ariaLabel: "Interactive 3D model of a white Google review display stand" },
      },
      {
        id: "review-personalized-black", category: "reviews", title: "With your logo · Round, black", price: "CHF 69.–",
        description: "A card for your Google review page. I add your logo and business name to the existing design.",
        image: { src: "/images/products/catalog/review-personalized-black.webp", alt: "Personalised black Google review card with the SilvanDigital logo" },
        details: ["Round or square", "80 × 80 or 100 × 100 mm"],
      },
      {
        id: "menu-round-black", category: "menu", title: "Standard Menu · Round, black", price: "CHF 49.–",
        description: "Guests can open your food and drinks menu directly on their phone.",
        image: { src: "/images/products/catalog/menu-round-black.webp", alt: "Black round NFC menu card" },
        details: ["Round", "80 × 80 or 100 × 100 mm"],
      },
      {
        id: "menu-square-black", category: "menu", title: "Standard Menu · Square", price: "CHF 49.–",
        description: "A black card with a standard design for your food and drinks menu.",
        image: { src: "/images/products/catalog/menu-square-black.webp", alt: "Black square NFC menu card" },
        details: ["Square", "80 × 80 or 100 × 100 mm"],
      },
      {
        id: "menu-personalized-white", category: "menu", title: "Menu · With your logo, white", price: "CHF 69.–",
        description: "A card for your menu. I add your logo and business name to the existing design.",
        image: { src: "/images/products/catalog/menu-personalized-white.webp", alt: "White personalised round NFC menu card" },
        details: ["Round or square", "80 × 80 or 100 × 100 mm"],
      },
      {
        id: "booking-custom-blue", category: "custom", title: "Bookings · Custom design", price: "CHF 99.–",
        description: "Example design for bookings and reservations. Choose your own colours, logo and layout or let me design the card for you.",
        image: { src: "/images/products/catalog/booking-custom-blue.webp", alt: "Blue custom-designed NFC booking card" },
        details: ["Round or square", "80 × 80 or 100 × 100 mm", "Custom design and setup of your chosen link"],
      },
    ]),
    useCasesTitle: "What you can use the cards for",
    useCases: [
      { title: "Google reviews", description: "Customers can go straight to your Google review page." },
      { title: "Digital menu", description: "Guests can open your current food and drinks menu on their phone." },
      { title: "Bookings and reservations", description: "Customers can go straight to appointment bookings or table reservations." },
      { title: "Guest Wi-Fi", description: "NFC or a QR code can make joining your guest Wi-Fi easier. Setup and device requirements are agreed individually." },
      { title: "Digital contact card", description: "Customers can open your contact details and save them on their phone." },
    ],
    inquiry: {
      title: "Enquire about a card",
      intro: "Choose a product, how you will use it and the quantity. The estimated product price appears below. Shape and size are confirmed in your quote. For direct Wi-Fi access, choose “I need help with setup” and describe your requirements in the notes. Then review your enquiry and choose WhatsApp or email.",
      fields: [
        { name: "destination", label: "What would you like to use it for?", placeholder: "Choose how you will use it", required: true },
        { name: "product", label: "Product", placeholder: "Choose a product", required: true },
        { name: "shape", label: "Shape", placeholder: "Choose a shape", required: true },
        { name: "size", label: "Size", placeholder: "Choose a size", required: true },
        { name: "quantity", label: "Quantity", placeholder: "For example, 2", required: true },
        { name: "setup", label: "Do you already have the right link?", placeholder: "Please choose", required: true },
        { name: "destinationUrl", label: "Link to the page you want to open", placeholder: "https://…", required: false, autoComplete: "url" },
        { name: "businessName", label: "Business (optional)", placeholder: "Your business name", required: false, autoComplete: "organization" },
        { name: "contactPerson", label: "Contact person (optional)", placeholder: "First and last name", required: false, autoComplete: "name" },
        { name: "note", label: "Design, colour or note (optional)", placeholder: "For example, your logo, business colours or a guest Wi-Fi connection", required: false },
      ],
      destinationOptions: [
        { value: "reviews", label: "Google reviews" },
        { value: "tripadvisor", label: "Tripadvisor" },
        { value: "instagram", label: "Instagram" },
        { value: "tiktok", label: "TikTok" },
        { value: "facebook", label: "Facebook" },
        { value: "youtube", label: "YouTube" },
        { value: "whatsapp", label: "WhatsApp" },
        { value: "menu", label: "Digital menu" },
        { value: "booking", label: "Bookings and reservations" },
        { value: "airbnb", label: "Airbnb" },
        { value: "wifi", label: "Guest Wi-Fi" },
        { value: "contact", label: "Digital contact card" },
        { value: "other", label: "Another use" },
      ],
      productOptions: [
        { value: "nfc-chip", label: "NFC sticker · 1 item CHF 15.–" },
        { value: "compact-card", label: "Compact NFC card · CHF 29.–" },
        { value: "standard-card", label: "Standard card · CHF 49.–" },
        { value: "standard-stand", label: "Standard display stand · CHF 49.–" },
        { value: "personalized-card", label: "Card with your logo · CHF 69.–" },
        { value: "fully-custom-card", label: "Custom-designed card · CHF 99.–" },
      ],
      shapeOptions: [{ value: "round", label: "Round" }, { value: "square", label: "Square" }, { value: "rectangle", label: "Rectangular" }],
      sizeOptions: [{ value: "80", label: "80 × 80 mm" }, { value: "100", label: "100 × 100 mm" }, { value: "confirm", label: "Size to be agreed" }],
      setupOptions: [
        { value: "ready", label: "I have the right link" },
        { value: "needs-setup", label: "I need help with setup" },
      ],
      submitLabel: "Open enquiry in WhatsApp",
      editLabel: "Edit details",
      requiredError: "Please complete this field.",
      errorSummary: (count: number) =>
        count === 1
          ? "One field still needs to be completed or corrected."
          : `${count} fields still need to be completed or corrected.`,
      quantityError: "Please enter a whole number from 1 to 999. You can ask about larger quantities in the notes.",
      urlError: "Please enter a complete link beginning with https://. For Google reviews, use a Google link.",
      confirmTitle: "Please check your details",
      nonBindingNotice: "Your enquiry carries no obligation to buy. An order is only agreed once you and I have accepted the quote with the services and total price.",
      privacyNotice: "Your details stay in this browser tab. When you change language, the enquiry is saved for up to two minutes and deleted after the transfer attempt. Nothing is sent to me until you send the message yourself.",
      messageIntro: "Hi Silvan, I would like to enquire about an NFC or QR product, with no obligation to buy.",
    },
    faq: {
      title: "Frequently asked questions about NFC and QR cards",
      items: [
        {
          question: "How do NFC and QR work?",
          answer:
            "Customers hold a compatible phone near the card, stand or sticker, then tap the link shown. On products with a QR code, they can scan it instead. Opening the NFC link needs no extra NFC app. The linked page may require a login or an app of its own.",
        },
        {
          question: "Does it work with every phone?",
          answer:
            "The phone must support NFC links. On some devices, NFC needs to be switched on first. On products with a QR code, customers can use their phone camera instead. The individual sticker has no printed QR code. The phone needs an internet connection to open the linked page. We discuss any specific device requirements before you order.",
        },
        {
          question: "Does the card automatically lead to good reviews?",
          answer:
            "No. The card makes your review page easier to find. Customers decide whether to leave a review, what to write and how many stars to give. The card does not buy reviews or guarantee a particular rating.",
        },
        {
          question: "Which pages or uses are possible?",
          answer:
            "For example, your Google review page, menu, booking page, social media profiles or contact details. Direct guest Wi-Fi access can also be arranged individually. Choose “I need help with setup” in the enquiry and describe your requirements in the notes, or contact me directly. I can also set up a Google Business Profile if you do not yet have one.",
          link: { label: "Set up a Google Business Profile", href: "/presence" },
        },
        {
          question: "Which designs and sizes are available?",
          answer:
            "The catalogue includes round, square and rectangular cards, display stands and NFC stickers. Shape and size depend on the model. Round cards offer a choice of 80 or 100 mm diameter; square cards offer 80 × 80 or 100 × 100 mm. Unconfirmed dimensions are labelled “Size to be agreed”. Your enquiry records your preferences; I confirm availability in the quote. The option with your logo adapts an existing design. The custom option lets you choose the whole design.",
        },
        {
          question: "What does it cost and what is included?",
          answer:
            "Compact NFC card: 1 item CHF 29, 2 together CHF 40, each additional CHF 15. Standard card: 1 item CHF 49, 2 total CHF 80, each additional item CHF 20. NFC sticker: 1 item CHF 15, 2 total CHF 25, each additional item CHF 5. Card with your logo: 1 item CHF 69, 2 total CHF 100, each additional item CHF 25. Custom-designed card: 1 item CHF 99, 2 total CHF 150, each additional item CHF 30. One Standard display stand costs CHF 49; multiple stands are priced by agreement. For more than 10 items, further discounts are available by agreement. Programming and setup of the agreed link are included. Shipping and additional services are itemised separately in the quote.",
        },
      ],
    },
  },
  presence: {
    "eyebrow": "Google Business Profile",
    "title": "Your business on Google. With the right details.",
    "intro": "When people look you up on Google or Google Maps, they see your listing. I set it up or bring it up to date.",
    "priceLabel": "from CHF 249",
    "startingPrice": "from CHF 249",
    "priceTiers": [
      {
        "id": "profile",
        "name": "Google Business Profile",
        "price": "from CHF 249",
        "description": "Check and update an existing listing, or set up a new one. Your quote lists the locations included.",
        "features": [
          "Check an existing listing or set up a new one",
          "Check opening hours, address and phone number with you",
          "Add your services and photos and record the changes"
        ]
      }
    ],
    "benefitsTitle": "What I do for you",
    "benefits": [
      "Check the details for contradictions",
      "Describe your services clearly",
      "A summary of what has changed"
    ],
    "processTitle": "How we bring your listing up to date",
    "process": [
      {
        "id": "consult",
        "label": "01",
        "title": "Free first consultation",
        "description": "We look at your listing together."
      },
      {
        "id": "quote",
        "label": "02",
        "title": "Quote with a fixed price",
        "description": "You confirm your details."
      },
      {
        "id": "update",
        "label": "03",
        "title": "Update and summary",
        "description": "With a summary of what changed."
      }
    ],
    "ctaLabel": "Free first consultation",
    "ctaHref": "/contact",
    "faq": {
      "title": "Frequently asked questions about Google Business Profile",
      "items": [
        {
          "question": "What is a Google Business Profile?",
          "answer": "It is your business listing on Google and Google Maps. Customers see your address, opening hours, phone number, photos and reviews there. The listing is free on Google. You only pay for my work."
        },
        {
          "question": "I already have a listing. Is a check worth it?",
          "answer": "Yes, if details are missing, out of date or different from your website. We compare the listing with the details you confirm."
        },
        {
          "question": "Will I appear higher on Google afterwards?",
          "answer": "Nobody can promise that. Google decides the order. I make sure your details are correct and complete. I do not promise a particular position or more enquiries."
        },
        {
          "question": "What exactly does it cost?",
          "answer": "From CHF 249 incl. VAT for my work. Your quote sets the exact fixed price, for example depending on how many locations you have. Ongoing updates or work on other platforms are only agreed if you want them."
        },
        {
          "question": "What do I receive at the end?",
          "answer": "Your updated listing and a summary of what has changed. Anything Google is still checking is clearly marked as open."
        },
        {
          "question": "How do I get more reviews?",
          "answer": "With an NFC or QR card. Customers hold their phone to the card or scan the code and can review you on Google straight away. The cards can also be ordered on their own.",
          "link": {"href": "/reviews", "label": "View NFC and QR cards"}
        }
      ]
    }
  },
  automation: {
    "eyebrow": "Automations",
    "title": "Set it up once. Save time every week.",
    "intro": "Do you copy details by hand or write the same report every Friday? A program can do that for you.",
    "priceLabel": "On request",
    "priceTiers": [
      {
        "id": "custom-automation",
        "name": "Automation to suit your needs",
        "price": "On request",
        "description": "We start with work you do by hand today. That shows what is possible and whether it is worth it.",
        "features": [
          "Check whether the work can be simplified",
          "Set up the automation and test it with you",
          "A short guide in plain language"
        ]
      }
    ],
    "benefitsTitle": "Two examples from everyday office work",
    "benefits": [
      "Enquiries go into your list on their own",
      "The weekly report writes itself",
      "A confirmation for every enquiry"
    ],
    "processTitle": "How it works",
    "process": [
      {
        "id": "consult",
        "label": "01",
        "title": "Free first consultation",
        "description": "Tell me what keeps repeating."
      },
      {
        "id": "quote",
        "label": "02",
        "title": "Quote with a fixed price",
        "description": "Running costs are listed separately."
      },
      {
        "id": "setup",
        "label": "03",
        "title": "Set up and explain",
        "description": "Tested, with a short guide."
      }
    ],
    "ctaLabel": "Free first consultation",
    "ctaHref": "/contact",
    "faq": {
      "title": "Frequently asked questions about automations",
      "items": [
        {
          "question": "Which work is suitable?",
          "answer": "Work that repeats regularly and always follows the same steps. For example, copying details from enquiries into a list or turning open tasks into a weekly report. If there are many exceptions, doing it by hand is often simpler."
        },
        {
          "question": "What does an automation cost?",
          "answer": "It depends on the task and your software. The first consultation is free. After that you receive a written quote with a fixed price, incl. VAT. If a more detailed review is needed, it is priced in the quote too. Subscriptions to other services and usage fees are listed separately."
        },
        {
          "question": "Do I need new software?",
          "answer": "Not necessarily. Where possible I work with the programs you already use. If an extra subscription is needed, it is in the quote with its cost."
        },
        {
          "question": "What if it is not worth it?",
          "answer": "Then I tell you. If looking after the automation takes more effort than it saves, you are better off keeping your current process."
        },
        {
          "question": "What happens if something stops working?",
          "answer": "We agree beforehand who is notified about an error and how you carry on in the meantime. Support and maintenance are agreed to suit your needs."
        },
        {
          "question": "What happens to my data?",
          "answer": "Before we start, we agree which information is processed, who has access and where it is stored. I only use the access you give me for this."
        },
        {
          "question": "What do I get at the end?",
          "answer": "A set-up and tested automation, a short guide in plain language and an overview of who looks after what."
        }
      ]
    }
  },
  work: {
    "eyebrow": "Work",
    "title": "See what your website could look like.",
    "intro": "I built these four websites for fictional businesses. Click through them and try how customers find a service and prepare an enquiry.",
    "conceptLabel": "Fictional example project",
    "projectInfoLabel": "About the project",
    "categoryLabel": "Business type",
    "yearLabel": "Year",
    "typeLabel": "Project type",
    "challengeLabel": "The task",
    "approachLabel": "Design and layout",
    "outcomeLabel": "What visitors can try",
    "ctaLabel": "Discuss your website"
  },
  about: {
    "eyebrow": "About",
    "title": "You always speak to me directly.",
    "intro": "I'm Silvan Hahn and I work independently in Boppelsen, near Zurich. I build websites, set up Google Business Profiles, supply NFC and QR cards and build automations. For small businesses across Switzerland.",
    "body": [
      "You work directly with me, from planning to delivery. I design websites and digital solutions that help your customers find the information they need and fit the way you work.",
      "We can stay in touch by email, phone or video call. In-person meetings are available by arrangement."
    ],
    "valuesTitle": "How I work",
    "values": [
      {
        "title": "Clear",
        "description": "I explain the goals, scope and decisions so you know what we are planning and why."
      },
      {
        "title": "Personal",
        "description": "The person you speak to also plans, designs and builds your project."
      },
      {
        "title": "Practical",
        "description": "The solution follows what your business needs and can use in its daily work."
      }
    ],
    "standardsTitle": "What I check for your project",
    "standards": [
      "Your customers should find important information quickly. I check loading times and avoid unnecessarily heavy pages.",
      "Readable text, clear contrast and helpful guidance make the website easier to use. I also check that it can be used with a keyboard.",
      "Text is easy to read on phones, and important features are simple to use.",
      "After changes, I check important steps again, such as finding a service and getting in touch. Automated checks help catch errors early."
    ],
    "portraitAlt": "Portrait of Silvan Hahn taken indoors",
    "portraitCaption": "Silvan Hahn in Boppelsen, near Zurich"
  },
  contact: {
    eyebrow: "Contact",
    title: "Let’s talk about what you need.",
    intro: "The first consultation is free and without obligation. I reply within 24 hours.",
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
      { label: "Legal notice", href: "/imprint" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
  hello: {
    "eyebrow": "SILVAN Digital Studio · Boppelsen, near Zurich",
    "title": "Hello, I'm Silvan.",
    "intro": "I help small businesses across Switzerland with websites, Google Business Profiles, NFC and QR cards and automations. Reply within 24 hours, free first consultation.",
    "links": [
      {
        "label": "Websites",
        "href": "/websites"
      },
      {
        "label": "NFC and QR cards",
        "href": "/reviews"
      },
      {
        "label": "Google Business Profile",
        "href": "/presence"
      },
      {
        "label": "Automations",
        "href": "/automation"
      },
      {
        "label": "Examples to try",
        "href": "/work"
      },
      {
        "label": "About me",
        "href": "/about"
      },
      {
        "label": "Contact",
        "href": "/contact"
      }
    ],
    "directContactTitle": "Get in touch with me"
  },
  imprint: imprintContent.en,
  privacy: privacyContent.en,
  notFound: {
    "eyebrow": "404",
    "title": "This page could not be found.",
    "description": "The link may be outdated, or the address may have been entered incorrectly. The home page has details of my services and ways to get in touch.",
    "homeLabel": "Back to home"
  },
  // Keyword first, brand last -- see the note on the German dictionary. British
  // spelling, matching the rest of the English copy.
  seo: {
    home: {"title":"Websites, Google Profiles, NFC Cards and Automations | SILVAN","description":"More customers, less office work: websites, Google Business Profiles, NFC and QR cards and automations for small businesses. Fixed price, reply within 24 hours."},
    websites: {"title":"Websites for Your Business | From CHF 300 | SILVAN","description":"A website designed around your business, easy to use on phones and computers. From CHF 300, with the work and price agreed in a written quote."},
    reviews: {"title":"NFC Cards and QR Codes for Businesses | SILVAN","description":"For reviews, menus and bookings. Compact NFC cards from CHF 29, stickers from CHF 15, standard cards and stands from CHF 49. Link setup included."},
    presence: {"title":"Google Business Profile Setup | From CHF 249","description":"Help customers find your hours, address and services on Google and Google Maps. Review and setup from CHF 249. The Google profile itself is free."},
    automation: {"title":"Automations for Small Businesses | SILVAN","description":"Less repetitive office work: enquiries go into your list on their own and the weekly report writes itself. Free first consultation, fixed price in your quote."},
    work: {"title":"Demo Websites to Explore | SILVAN Digital Studio","description":"Four example websites for fictional businesses: a café, a salon, a bicycle shop and a company group. View them and try preparing an enquiry."},
    about: {"title":"About Me | Silvan Hahn, near Zurich | SILVAN","description":"I’m Silvan Hahn, working independently near Zurich. Websites, Google Business Profiles, NFC and QR cards and automations for small businesses."},
    contact: {"title":"Contact | Free First Consultation | SILVAN","description":"Call or write to me. The first consultation is free and I reply within 24 hours. Based near Zurich, working with businesses across Switzerland."},
    hello: {"title":"Hello, I’m Silvan | SILVAN Digital Studio","description":"Silvan Hahn at a glance: call, save my contact details or view my services. Websites, Google Business Profile, NFC and QR cards, automations."},
    imprint: {"title":"Legal Notice | SILVAN Digital Studio","description":"Provider and contact: Silvan Hahn, Boppelsen. Information about services, prices, enquiries, example projects and copyright."},
    privacy: {"title":"Privacy | SILVAN Digital Studio","description":"How this website and its demos process data. Information about contact, hosting, saved details and website measurement."},
  },
} as const satisfies SiteContent;
