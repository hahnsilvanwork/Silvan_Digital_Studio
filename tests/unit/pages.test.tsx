import { render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { RootDocument } from "../../src/components/layout/RootDocument";
import { projects } from "../../src/content/projects";
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
  it("leads with the approved hero and both calls to action", () => {
    render(<HomePage locale="de" />);

    const main = screen.getByRole("main");

    // Testing Library normalizes the rendered text, and \s matches U+00A0, so the
    // expected string has to be normalized the same way to line up with it.
    expect(
      within(main).getByText(de.home.hero.serviceLine.replaceAll(" ", " ")),
    ).toBeInTheDocument();
    expect(
      within(main).getByRole("heading", {
        level: 1,
        name: de.home.hero.headline,
      }),
    ).toBeInTheDocument();
    expect(
      within(main).getByRole("link", { name: de.home.hero.primaryCta }),
    ).toHaveAttribute("href", "/contact");
    expect(
      within(main).getByRole("link", { name: de.home.hero.secondaryCta }),
    ).toHaveAttribute("href", "/websites");
  });

  it("shows every service with its starting price without interaction", () => {
    render(<HomePage locale="de" />);

    const main = screen.getByRole("main");

    for (const service of de.home.services) {
      expect(within(main).getByText(service.price)).toBeVisible();
      expect(
        within(main).getByRole("link", {
          name: new RegExp(service.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
        }),
      ).toHaveAttribute("href", service.href);
    }
  });

  it("labels the concept projects as concepts and never claims a client", () => {
    render(<HomePage locale="en" />);

    const main = screen.getByRole("main");
    const conceptLabels = within(main).getAllByText(en.work.conceptLabel);

    expect(conceptLabels).toHaveLength(projects.length);
    expect(main.textContent).not.toMatch(/\bclient\b/i);
  });

  it("localizes every internal destination under /en", () => {
    render(<HomePage locale="en" />);

    const main = screen.getByRole("main");

    for (const link of within(main).getAllByRole("link")) {
      const href = link.getAttribute("href") ?? "";

      if (href.startsWith("/")) {
        expect(href).toMatch(/^\/en(\/|$)/);
      }
    }
  });
});

describe("Service pages", () => {
  it("renders every approved website price tier", () => {
    render(<WebsitesPage locale="de" />);

    const main = screen.getByRole("main");

    for (const tier of de.websites.priceTiers) {
      expect(within(main).getByText(tier.name)).toBeVisible();
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

    expect(main.textContent).toContain("Google Business Profile");
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
  it("places every product price before the process section", () => {
    render(<ReviewsPage locale="de" />);

    const text = screen.getByRole("main").textContent ?? "";
    const processIndex = text.indexOf(de.reviews.processTitle);

    for (const product of de.reviews.products) {
      const priceIndex = text.indexOf(product.price);

      expect(priceIndex).toBeGreaterThanOrEqual(0);
      expect(priceIndex).toBeLessThan(processIndex);
    }
  });

  it("uses TAP / OPEN / REVIEW without prompting for five stars", () => {
    render(<ReviewsPage locale="de" />);

    const main = screen.getByRole("main");

    for (const label of ["TAP", "OPEN", "REVIEW"]) {
      expect(within(main).getByText(label)).toBeVisible();
    }
    expect(main.textContent).not.toMatch(/5\s*Sterne|fünf Sterne/i);
  });

  it("shows the quantity discount and the non-binding notice", () => {
    render(<ReviewsPage locale="de" />);

    const text = screen.getByRole("main").textContent ?? "";

    expect(text).toContain(de.reviews.quantityDiscount);
    expect(text).toContain(de.reviews.inquiry.privacyNotice);
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
    "offers a way to act at the end of the %s portfolio",
    (locale) => {
      // The portfolio was the only part of the site that ended without an
      // invitation, so its most engaged readers were offered nothing but the
      // next project.
      render(<WorkPage locale={locale} />);

      const main = screen.getByRole("main");
      const content = getContent(locale);

      expect(
        within(main).getByRole("link", { name: content.work.ctaLabel }),
      ).toHaveAttribute("href", locale === "de" ? "/contact" : "/en/contact");
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
  it("exposes the four direct destinations and contains no form", () => {
    render(<ContactPage locale="de" />);

    const main = screen.getByRole("main");

    expect(
      within(main).getByRole("link", { name: /WhatsApp/ }),
    ).toHaveAttribute("href", "https://wa.me/41789008500");
    expect(within(main).getByRole("link", { name: /E-Mail/ })).toHaveAttribute(
      "href",
      "mailto:kontakt@silvandigital.ch",
    );
    expect(within(main).getByRole("link", { name: /Telefon/ })).toHaveAttribute(
      "href",
      "tel:+41789008500",
    );
    expect(within(main).getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
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
          name: new RegExp(link.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
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
