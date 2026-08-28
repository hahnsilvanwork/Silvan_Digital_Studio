import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { FaqSchema } from "../../src/components/seo/FaqSchema";
import { Testimonials } from "../../src/components/home/Testimonials";
import type { Locale } from "../../src/content/types";
import { AutomationPage } from "../../src/features/pages/AutomationPage";
import { HomePage } from "../../src/features/pages/HomePage";
import { LegalPage } from "../../src/features/pages/LegalPage";
import { PresencePage } from "../../src/features/pages/PresencePage";
import { ReviewsPage } from "../../src/features/pages/ReviewsPage";
import { WebsitesPage } from "../../src/features/pages/WebsitesPage";
import { getContent, SUPPORTED_LOCALES } from "../../src/lib/locales";

vi.mock("../../src/app/fonts", () => ({ rootFontVariables: "font-variables" }));

const LOCALES = SUPPORTED_LOCALES as readonly Locale[];

/** Every page that publishes an FAQ, paired with the array it should publish. */
const FAQ_PAGES = [
  ["websites", WebsitesPage, (l: Locale) => getContent(l).websites.faq],
  ["reviews", ReviewsPage, (l: Locale) => getContent(l).reviews.faq],
  ["presence", PresencePage, (l: Locale) => getContent(l).presence.faq],
  ["automation", AutomationPage, (l: Locale) => getContent(l).automation.faq],
] as const;

describe("legal pages", () => {
  it.each(LOCALES)("renders the %s imprint with the mandatory details", (locale) => {
    const content = getContent(locale);

    render(
      <LegalPage content={content.imprint} locale={locale} route="/imprint" />,
    );

    const main = screen.getByRole("main");

    expect(
      within(main).getByRole("heading", { level: 1 }),
    ).toHaveTextContent(content.imprint.title);

    // Art. 3 para. 1 lit. s UCA asks for an identity and a way to reach it.
    // These four strings are the whole point of the page existing.
    for (const required of [
      "Silvan Hahn",
      "Regensbergstrasse 23",
      "8113 Boppelsen",
      content.contact.details.email,
    ]) {
      expect(main).toHaveTextContent(required);
    }
  });

  it.each(LOCALES)("renders the %s privacy statement", (locale) => {
    const content = getContent(locale);

    render(
      <LegalPage content={content.privacy} locale={locale} route="/privacy" />,
    );

    const main = screen.getByRole("main");

    expect(main).toHaveTextContent(content.privacy.title);
    expect(main).toHaveTextContent("Silvan Hahn");
    // Every section heading has to reach the page, or a clause is silently lost.
    for (const section of content.privacy.sections) {
      expect(
        within(main).getByRole("heading", { level: 2, name: section.title }),
      ).toBeInTheDocument();
    }
  });

  it.each(LOCALES)("states in %s that no cookies are set", (locale) => {
    const { privacy } = getContent(locale);
    const text = privacy.sections
      .flatMap((section) => [section.title, ...section.body])
      .join(" ")
      .toLowerCase();

    expect(text).toContain("cookie");
    expect(text).toMatch(locale === "de" ? /keine cookies/ : /no cookies/);
  });

  it.each(LOCALES)(
    "names every measurement service the %s build actually loads",
    (locale) => {
      const packageJson = JSON.parse(
        readFileSync(resolve(process.cwd(), "package.json"), "utf8"),
      ) as { dependencies?: Record<string, string> };
      const document = readFileSync(
        resolve(process.cwd(), "src/components/layout/RootDocument.tsx"),
        "utf8",
      );
      const text = getContent(locale)
        .privacy.sections.flatMap((section) => [section.title, ...section.body])
        .join(" ");

      // The privacy statement is a claim about what the code does, so the two
      // have to be checked against each other. Shipping analytics while the
      // page still promises none is the failure this guards against -- in
      // either direction, since removing it should update the text too.
      const shipsVercelAnalytics =
        packageJson.dependencies?.["@vercel/analytics"] !== undefined &&
        document.includes("<Analytics />");

      expect(text.includes("Vercel Analytics")).toBe(shipsVercelAnalytics);
    },
  );

  it.each(LOCALES)(
    "never promises in the %s search snippet what the page then contradicts",
    (locale) => {
      // The privacy body was updated when analytics shipped; its own meta
      // description and llms.txt were not, so the search result promised "no
      // tracking at all" and the page it opened said otherwise. Both are read
      // by people and machines that never see the body.
      const description = getContent(locale).seo.privacy.description;
      const llms = readFileSync(
        resolve(process.cwd(), "public/llms.txt"),
        "utf8",
      );

      for (const claim of [description, llms]) {
        expect(claim).not.toMatch(/kein Tracking|no tracking/i);
      }
    },
  );
});

describe("service page FAQs", () => {
  it.each(
    FAQ_PAGES.flatMap(([name, Page, select]) =>
      LOCALES.map((locale) => [`${name} (${locale})`, Page, select, locale] as const),
    ),
  )("renders every %s question and answer as plain text", (_label, Page, select, locale) => {
    const faq = select(locale);

    render(<Page locale={locale} />);

    const main = screen.getByRole("main");

    expect(faq.items.length).toBeGreaterThan(0);
    expect(
      within(main).getByRole("heading", { level: 2, name: faq.title }),
    ).toBeInTheDocument();

    for (const item of faq.items) {
      // Both halves must be in the document and visible. Nothing here is
      // allowed to hide behind a disclosure control -- that is what makes the
      // FAQPage markup below legitimate.
      expect(within(main).getByText(item.question)).toBeVisible();
      expect(within(main).getByText(item.answer)).toBeVisible();
    }
  });
});

describe("FaqSchema", () => {
  it("renders nothing without questions", () => {
    const { container } = render(<FaqSchema items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it.each(
    FAQ_PAGES.flatMap(([name, , select]) =>
      LOCALES.map((locale) => [`${name} (${locale})`, select, locale] as const),
    ),
  )("never claims a %s answer the page does not show", (_label, select, locale) => {
    const faq = select(locale);
    const { container } = render(<FaqSchema items={faq.items} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );

    expect(script).not.toBeNull();

    const parsed = JSON.parse(script!.innerHTML) as {
      "@type": string;
      mainEntity: { name: string; acceptedAnswer: { text: string } }[];
    };

    expect(parsed["@type"]).toBe("FAQPage");
    // Google requires that marked-up questions and answers are visible on the
    // page. The test above proves the content array is rendered; this one
    // proves the markup carries that same array and nothing else, so the two
    // cannot drift apart.
    expect(
      parsed.mainEntity.map((entry) => ({
        question: entry.name,
        answer: entry.acceptedAnswer.text,
      })),
    ).toEqual(faq.items.map(({ question, answer }) => ({ question, answer })));
  });

  it("cannot be closed by content", () => {
    const { container } = render(
      <FaqSchema
        items={[{ question: "</script><script>x()</script>", answer: "a" }]}
      />,
    );

    expect(container.querySelectorAll("script")).toHaveLength(1);
    expect(container.innerHTML).not.toContain("</script><script>");
  });
});

describe("testimonials", () => {
  it("renders nothing while there is no real client quote", () => {
    const { container } = render(<Testimonials items={[]} title="Was Kunden sagen" />);

    expect(container).toBeEmptyDOMElement();
  });

  it.each(LOCALES)("keeps the %s home page free of invented endorsements", (locale) => {
    const content = getContent(locale);

    // The guard that matters: a studio selling Google Reviews must not ship a
    // quote nobody said. The section is wired up and renders as soon as this
    // array has entries -- it just has to stay empty until they are real.
    expect(content.home.testimonials).toEqual([]);

    render(<HomePage locale={locale} />);

    expect(
      screen.queryByRole("heading", { name: content.home.testimonialsTitle }),
    ).not.toBeInTheDocument();
  });

  it("renders a quote once one exists", () => {
    render(
      <Testimonials
        items={[
          {
            id: "example",
            quote: "Kurze Wege, klare Entscheidungen.",
            author: "Vorname Nachname",
            role: "Rolle, Unternehmen",
          },
        ]}
        title="Was Kunden sagen"
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Was Kunden sagen" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Kurze Wege, klare Entscheidungen."),
    ).toBeInTheDocument();
    expect(screen.getByText("Vorname Nachname")).toBeInTheDocument();
  });
});
