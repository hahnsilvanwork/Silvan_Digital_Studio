import { render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { RootDocument } from "../../src/components/layout/RootDocument";
import { projects } from "../../src/content/projects";
import { homeCopy } from '../../src/content/home-copy';
import { inquiryCopy } from '../../src/content/inquiry-copy';
import type { Locale } from "../../src/content/types";
import { AboutPage } from "../../src/features/pages/AboutPage";
import { AutomationPage } from "../../src/features/pages/AutomationPage";
import { ContactPage } from "../../src/features/pages/ContactPage";
import { HelloPage } from "../../src/features/pages/HelloPage";
import { HomePage } from "../../src/features/pages/HomePage";
import { NotFoundPage } from "../../src/features/pages/NotFoundPage";
import { PresencePage } from "../../src/features/pages/PresencePage";
import { ReviewsPage } from "../../src/features/pages/ReviewsPage";
import { WebsitesPage } from "../../src/features/pages/WebsitesPage";
import { WorkPage } from "../../src/features/pages/WorkPage";
import { getContent } from "../../src/lib/locales";

vi.mock("../../src/app/fonts", () => ({ rootFontVariables: "font-variables" }));

const de = getContent("de");
const en = getContent("en");

describe("RootDocument", () => {
  it.each([
    ["de" as Locale, "de"],
    ["en" as Locale, "en"],
  ])("declares the %s document language", (locale, lang) => {
    const markup = renderToStaticMarkup(
      <RootDocument locale={locale}>
        <main />
      </RootDocument>,
    );

    // The font custom properties have to land on :root, or globals.css cannot
    // build --font-sans from them and the page drops to the browser serif.
    expect(markup).toContain(`<html class="font-variables" lang="${lang}">`);
  });

  it("arms the motion flag before the page content", () => {
    const markup = renderToStaticMarkup(
      <RootDocument locale="de">
        <main id="page" />
      </RootDocument>,
    );

    // The flag has to be set before the first paint, or a reveal would flash
    // its final state and then jump back to hidden.
    expect(markup.indexOf("silvan-motion-flag")).toBeLessThan(
      markup.indexOf('id="page"'),
    );
    expect(markup).toContain("prefers-reduced-motion");
  });
});

describe("HomePage", () => {
  it("leads with the headline, a free consultation and a direct phone call", () => {
    render(<HomePage locale="de" />);

    const main = screen.getByRole("main");
    const hero = main.querySelector('section')!;

    expect(within(main).getByRole("heading", { level: 1, name: de.home.hero.headline })).toBeInTheDocument();
    expect(within(hero).getByRole("link", { name: homeCopy.de.primaryCta })).toHaveAttribute("href", "/contact");
    expect(within(hero).getByRole("link", { name: `${homeCopy.de.callLabel}: 078 900 85 00` })).toHaveAttribute("href", de.contact.details.phoneHref);
    for (const fact of homeCopy.de.facts) expect(within(hero).getByText(fact.value)).toBeInTheDocument();
    expect(within(hero).getByText(homeCopy.de.byline)).toBeInTheDocument();
  });

  it("shows the four services once, each with a price and a link", () => {
    render(<HomePage locale="de" />);

    const services = within(screen.getByRole("main").querySelector('#services') as HTMLElement);
    expect(services.getAllByRole('link')).toHaveLength(4);
    for (const service of de.home.services) {
      const item = services.getByRole('link', { name: new RegExp(`^${homeCopy.de.services.find(entry => entry.href === service.href)!.name}:`) });
      expect(item).toHaveAttribute('href', service.href);
      expect(item.closest('li')!.textContent).toMatch(/CHF|Anfrage/);
    }
  });

  it("lists every website package with its price and the VAT note", () => {
    render(<HomePage locale="de" />);

    const prices = within(screen.getByRole("main").querySelector('#prices') as HTMLElement);
    expect(prices.getByRole('heading', { name: homeCopy.de.costTitle })).toBeVisible();
    for (const tier of de.websites.priceTiers) {
      expect(prices.getByText(tier.name)).toBeVisible();
      expect(prices.getByText(tier.price)).toBeVisible();
    }
    expect(prices.getByText(homeCopy.de.costVat)).toBeVisible();
    expect(prices.getByText(homeCopy.de.costIntro)).toBeVisible();
  });

  it("shows the process and answers the common questions", () => {
    render(<HomePage locale="de" />);

    const main = screen.getByRole("main");
    for (const step of homeCopy.de.steps) expect(within(main).getByRole('heading', { name: step.title })).toBeVisible();
    for (const item of homeCopy.de.faq) expect(within(main).getByText(item.question)).toBeInTheDocument();
  });

  it("labels the concept projects as concepts and never claims a client", () => {
    render(<HomePage locale="en" />);

    const main = screen.getByRole("main");
    const conceptLabels = within(main).getAllByText(en.work.conceptLabel);

    // The featured hero demo and both example projects carry the same label.
    expect(conceptLabels).toHaveLength(3);
    expect(homeCopy.en.demoLabel).toBe(en.work.conceptLabel);
    expect(within(main).getByRole('heading', { name: homeCopy.en.workTitle })).toBeVisible();
  });

  it("localizes every internal destination under /en", () => {
    render(<HomePage locale="en" />);

    const main = screen.getByRole("main");

    for (const link of within(main).getAllByRole("link", { hidden: true })) {
      const href = link.getAttribute("href") ?? "";

      if (href.startsWith("/")) {
        expect(href).toMatch(/^\/en(\/|$)/);
      }
    }
  });

  it.each(['de', 'en'] as const)('puts contact before the labelled demo and the services in %s reading order', locale => {
    render(<HomePage locale={locale} />);
    const main = screen.getByRole('main');
    const copy = homeCopy[locale];
    const contact = within(main).getByRole('link', { name: copy.primaryCta });
    const services = main.querySelector('#services')!;
    const demo = within(main).getByRole('link', { name: `Spurwerk Veloatelier ${copy.exampleCta}` });
    const demoLabel = within(demo).getByText(copy.demoLabel);

    expect(contact).toHaveAccessibleDescription(copy.facts.map(fact => `${fact.value} ${fact.label}`).join(' '));
    expect(contact.compareDocumentPosition(services) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(demo.compareDocumentPosition(services) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(demo).toHaveAccessibleDescription(copy.demoLabel);
    expect(demo).toContainElement(demoLabel);
    const image = within(demo).getByRole('img');
    const featured = projects.find(project => project.slug === 'spurwerk')!;
    // The preview frame scrolls through a full-page capture of the same demo.
    expect(decodeURIComponent(image.getAttribute('src')!)).toContain('/images/home/spurwerk-scroll.webp');
    expect(main.querySelectorAll('img[alt="' + featured.copy[locale].imageAlt + '"]')).toHaveLength(1);
    expect(image).toHaveAttribute('width', '960');
    expect(image).toHaveAttribute('height', '3411');
  });

  it("keeps the phone shortcut bar hidden until the hero has scrolled away", () => {
    render(<HomePage locale="de" />);

    const bar = screen.getByRole('main').querySelector('[data-visible]')!;
    expect(bar).toHaveAttribute('data-visible', 'false');
    expect(bar).toHaveAttribute('aria-hidden', 'true');
  });
});

describe("Service pages", () => {
  it("renders every approved website price tier", () => {
    render(<WebsitesPage locale="de" />);

    const main = screen.getByRole("main");

    for (const tier of de.websites.priceTiers) {
      expect(within(main.querySelector('#packages')!).getByRole("heading", { name: tier.name })).toBeVisible();
      expect(within(main).getAllByText(tier.price).length).toBeGreaterThan(0);
    }
  });

  it("renders the four-step website process in order", () => {
    render(<WebsitesPage locale="de" />);

    const steps = screen
      .getByRole("main")
      .querySelectorAll("ol > li h3");

    expect([...steps].map((step) => step.textContent)).toEqual(
      de.websites.process.map((step) => step.title),
    );
  });

  it("names Google Business Profile and the presence starting price", () => {
    render(<PresencePage locale="de" />);

    const main = screen.getByRole("main");

    expect(main.textContent).toContain("Google-Unternehmensprofil");
    expect(within(main).getAllByText("ab CHF 249").length).toBeGreaterThan(0);
  });

  it("describes automation without promising a guaranteed outcome", () => {
    render(<AutomationPage locale="de" />);

    const text = screen.getByRole("main").textContent ?? "";

    expect(text).toContain("Auf Anfrage");
    expect(text).not.toMatch(/garantiert|garantie/i);
  });
});

describe("ReviewsPage", () => {
  it("keeps the CTA before the local motion hero and does not mount 3D", () => {
    render(<ReviewsPage locale="de" />);

    const main = screen.getByRole("main");
    const cta = within(main).getAllByRole("link", {
      name: de.reviews.ctaLabel,
    })[0];
    const heroImage = main.querySelector("[data-nfc-motion]")!;

    expect(
      cta.compareDocumentPosition(heroImage) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(main.querySelector("spline-viewer")).toBeNull();
    expect(main.querySelector("[data-product-3d-dialog]")).toBeNull();
    expect(heroImage).toHaveTextContent("Kurzfilm: die Karten aus der Nähe.");
    expect(heroImage.querySelector('img')).toHaveAttribute('src', '/videos/nfc-cards-poster.webp');
    expect(heroImage.querySelector('video')).toHaveAttribute('preload', 'none');
    expect(heroImage.querySelectorAll('[data-index]')).toHaveLength(0);
  });

  it("keeps every NFC base price visible outside optional details", () => {
    render(<ReviewsPage locale="de" />);
    const prices = screen.getByRole('main').querySelector('#prices')!;
    for (const product of de.reviews.products) {
      const price = within(prices as HTMLElement).getByText(product.price);
      expect(price).toBeVisible();
      expect(price.closest('details')).toBeNull();
      expect(within(prices as HTMLElement).getByText(product.name)).toBeVisible();
      for (const feature of product.features) expect(prices.textContent).toContain(feature);
    }
  });

  it("explains using the product before model selection without a disclosure", () => {
    render(<ReviewsPage locale="de" />);
    const main = screen.getByRole('main');
    const process = main.querySelector('#how-it-works')!;
    expect(process.compareDocumentPosition(main.querySelector('#products')!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    for (const step of de.reviews.process) {
      const heading = within(process as HTMLElement).getByRole('heading', {name: step.title});
      expect(heading).toBeVisible();
      expect(heading.closest('details')).toBeNull();
    }
  });

  it("shows the catalogue categories and broader use cases", () => {
    render(<ReviewsPage locale="de" />);

    const main = screen.getByRole("main");
    expect(main.querySelectorAll('[data-product-card]')).toHaveLength(3);
    expect(within(main).getByRole('button', {name: 'Alle 7 ausgewählten Modelle anzeigen'})).toBeVisible();
    for (const category of de.reviews.categories) {
      expect(
          within(within(main).getByRole('combobox', {name:de.reviews.categoryPrompt})).getByRole("option", {
          name: new RegExp(`^${category.label}`),
        }),
      ).toBeVisible();
    }
    for (const useCase of de.reviews.useCases) {
      expect(within(main).getAllByText(useCase.title).length).toBeGreaterThan(0);
    }
  });

  it("shows the quantity discount and the non-binding notice", () => {
    render(<ReviewsPage locale="de" />);

    const text = screen.getByRole("main").textContent ?? "";

    expect(text).toContain(de.reviews.quantityDiscount);
    expect(text).toContain(inquiryCopy.de.draftNotice);
  });
});

describe("WorkPage", () => {
  it("links every concept project to its localized detail route", () => {
    render(<WorkPage locale="en" />);

    const main = screen.getByRole("main");

    for (const project of projects) {
      expect(
        within(main).getByRole("link", { name: new RegExp(project.name) }),
      ).toHaveAttribute("href", `/en/work/${project.slug}`);
    }
  });

  it.each(["de", "en"] as const)(
    "offers a header action before the %s portfolio",
    (locale) => {
      render(<WorkPage locale={locale} />);

      const main = screen.getByRole("main");
      const content = getContent(locale);
      const cta = within(main).getByRole("link", {
        name: content.work.ctaLabel,
      });
      const firstProject = within(main).getByRole("link", {
        name: new RegExp(projects[0].name),
      });

      expect(cta).toHaveAttribute(
        "href",
        locale === "de" ? "/contact" : "/en/contact",
      );
      expect(
        cta.compareDocumentPosition(firstProject) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    },
  );
});

describe("AboutPage", () => {
  it("identifies Silvan Hahn and shows the approved portrait", () => {
    render(<AboutPage locale="de" />);

    const main = screen.getByRole("main");

    expect(main.textContent).toContain("Silvan Hahn");
    expect(within(main).getByText(de.about.portraitCaption)).toBeVisible();

    // The alt text names the photograph rather than restating the caption, so
    // the image is not announced twice to a screen reader.
    const portrait = within(main).getByAltText(de.about.portraitAlt);

    expect(portrait).toBeVisible();
    expect(portrait.getAttribute("src")).toContain(
      encodeURIComponent("/images/portrait/portrait.webp"),
    );
  });
});

describe("ContactPage", () => {
  it.each(["de", "en"] as const)("carries the public service reason into the %s contact link", (locale) => {
    const content = getContent(locale);
    const pages = [[WebsitesPage, "websites"], [PresencePage, "presence"], [AutomationPage, "automation"]] as const;
    for (const [Page, reason] of pages) {
      const { unmount } = render(<Page locale={locale} />);
      expect(within(screen.getByRole("main")).getByRole("link", { name: content[reason].ctaLabel })).toHaveAttribute("href", `${locale === "en" ? "/en" : ""}/contact?service=${reason}`);
      unmount();
    }
  });

  it("exposes the four direct destinations and contains no form", () => {
    render(<ContactPage locale="de" />);

    const main = screen.getByRole("main");
    const direct = within(main).getByRole('group', { name: 'Direktkontakt' });

    expect(
      within(direct).getByRole("link", { name: /WhatsApp/ }),
    ).toHaveAttribute("href", "https://wa.me/41789008500");
    expect(within(direct).getByRole("link", { name: /E-Mail/ })).toHaveAttribute(
      "href",
      "mailto:hahn.silvan.work@gmail.com",
    );
    expect(within(direct).getByRole("link", { name: /Anrufen/ })).toHaveAttribute(
      "href",
      "tel:+41789008500",
    );
    expect(within(direct).getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/silvan-hahn-dev",
    );
    expect(main.querySelector("form")).toBeNull();
  });
});

describe("HelloPage", () => {
  it("keeps every launchpad route one tap away", () => {
    render(<HelloPage locale="de" />);

    const main = screen.getByRole("main");

    for (const link of de.hello.links) {
      expect(
        within(main).getByRole("link", {
          name: link.label,
        }),
      ).toHaveAttribute("href", link.href);
    }
    expect(
      within(main).getByRole("link", { name: /WhatsApp/ }),
    ).toBeInTheDocument();
  });
});

describe("NotFoundPage", () => {
  it("explains the missing page and offers the way home", () => {
    render(<NotFoundPage locale="de" />);

    const main = screen.getByRole("main");

    expect(
      within(main).getByRole("heading", { level: 1, name: de.notFound.title }),
    ).toBeInTheDocument();
    expect(
      within(main).getByRole("link", { name: de.notFound.homeLabel }),
    ).toHaveAttribute("href", "/");
  });
});



