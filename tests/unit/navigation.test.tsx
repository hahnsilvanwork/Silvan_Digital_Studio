import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { Footer } from "../../src/components/layout/Footer";
import { MobileMenu } from "../../src/components/layout/MobileMenu";
import { Navigation } from "../../src/components/layout/Navigation";
import { SITE_CONTENT_ID } from "../../src/components/layout/site-regions";
import { LanguageSwitcher } from "../../src/components/ui/LanguageSwitcher";
import { getContent } from "../../src/lib/locales";

const de = getContent("de");
const en = getContent("en");

function renderWithSiteContent(ui: React.ReactElement) {
  const siteContent = document.createElement("div");
  siteContent.id = SITE_CONTENT_ID;
  siteContent.append(document.createElement("main"));
  document.body.append(siteContent);

  return { ...render(ui), siteContent };
}

afterEach(() => {
  document.getElementById(SITE_CONTENT_ID)?.remove();
});

describe("Navigation", () => {
  // jsdom applies the mobile-first base styles, where the horizontal navigation
  // is display:none and the drawer carries the routes. The structural
  // assertions below therefore query the hidden subtree; which navigation is
  // actually visible per breakpoint is asserted in the Playwright suite.
  it("hides the horizontal navigation and offers the drawer at mobile width", () => {
    render(<Navigation currentPath="/" locale="de" />);

    expect(
      screen.queryByRole("navigation", { name: de.navigation.primaryLabel }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: de.navigation.openMenuLabel }),
    ).toBeVisible();
  });

  it("exposes every primary route as a real link in German", () => {
    render(<Navigation currentPath="/" locale="de" />);

    const navigation = screen.getByRole("navigation", { hidden: true });

    // A display:none element has no computed accessible name, so the label is
    // asserted directly rather than through the name filter.
    expect(navigation).toHaveAttribute(
      "aria-label",
      de.navigation.primaryLabel,
    );
    const links = within(navigation).getAllByRole("link", { hidden: true });

    expect(links.map((link) => link.textContent)).toEqual([
      "Websites",
      "Google Reviews",
      "Online-Präsenz",
      "Automation",
      "Arbeiten",
      "Über mich",
      "Kontakt",
    ]);
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/websites",
      "/reviews",
      "/presence",
      "/automation",
      "/work",
      "/about",
      "/contact",
    ]);
  });

  it("prefixes every primary route under the English locale", () => {
    render(<Navigation currentPath="/en" locale="en" />);

    const navigation = screen.getByRole("navigation", { hidden: true });

    // A display:none element has no computed accessible name, so the label is
    // asserted directly rather than through the name filter.
    expect(navigation).toHaveAttribute(
      "aria-label",
      en.navigation.primaryLabel,
    );

    expect(
      within(navigation)
        .getAllByRole("link", { hidden: true })
        .map((link) => link.getAttribute("href")),
    ).toEqual([
      "/en/websites",
      "/en/reviews",
      "/en/presence",
      "/en/automation",
      "/en/work",
      "/en/about",
      "/en/contact",
    ]);
  });

  it("points the wordmark at the home route of the active locale", () => {
    const { rerender } = render(<Navigation currentPath="/work" locale="de" />);

    expect(screen.getByRole("link", { name: /SILVAN/ })).toHaveAttribute(
      "href",
      "/",
    );

    rerender(<Navigation currentPath="/en/work" locale="en" />);

    expect(screen.getByRole("link", { name: /SILVAN/ })).toHaveAttribute(
      "href",
      "/en",
    );
  });

  it("marks exactly one primary link as the current page", () => {
    render(<Navigation currentPath="/reviews" locale="de" />);

    const navigation = screen.getByRole("navigation", { hidden: true });

    // A display:none element has no computed accessible name, so the label is
    // asserted directly rather than through the name filter.
    expect(navigation).toHaveAttribute(
      "aria-label",
      de.navigation.primaryLabel,
    );
    const current = within(navigation)
      .getAllByRole("link", { hidden: true })
      .filter((link) => link.getAttribute("aria-current") === "page");

    expect(current).toHaveLength(1);
    expect(current[0]).toHaveAttribute("href", "/reviews");
  });

  it("marks a localized project detail route as part of the work section", () => {
    render(<Navigation currentPath="/en/work/archa" locale="en" />);

    const navigation = screen.getByRole("navigation", { hidden: true });

    // A display:none element has no computed accessible name, so the label is
    // asserted directly rather than through the name filter.
    expect(navigation).toHaveAttribute(
      "aria-label",
      en.navigation.primaryLabel,
    );
    const current = within(navigation)
      .getAllByRole("link", { hidden: true })
      .filter((link) => link.getAttribute("aria-current") === "page");

    expect(current).toHaveLength(1);
    expect(current[0]).toHaveAttribute("href", "/en/work");
  });

  it("marks no primary link when the route is outside the main navigation", () => {
    render(<Navigation currentPath="/hello" locale="de" />);

    const navigation = screen.getByRole("navigation", { hidden: true });

    // A display:none element has no computed accessible name, so the label is
    // asserted directly rather than through the name filter.
    expect(navigation).toHaveAttribute(
      "aria-label",
      de.navigation.primaryLabel,
    );

    expect(
      within(navigation)
        .getAllByRole("link", { hidden: true })
        .filter((link) => link.hasAttribute("aria-current")),
    ).toHaveLength(0);
  });

  it("offers a skip link that targets the main content", () => {
    render(<Navigation currentPath="/" locale="de" />);

    expect(
      screen.getByRole("link", { name: de.a11y.skipToContent }),
    ).toHaveAttribute("href", "#main-content");
  });
});

describe("LanguageSwitcher", () => {
  it("keeps the current route when switching language", () => {
    render(<LanguageSwitcher currentPath="/reviews" locale="de" />);

    expect(
      screen.getByRole("link", { name: de.navigation.englishLabel }),
    ).toHaveAttribute("href", "/en/reviews");
  });

  it("keeps the project slug when switching back to German", () => {
    render(<LanguageSwitcher currentPath="/en/work/archa" locale="en" />);

    expect(
      screen.getByRole("link", { name: en.navigation.germanLabel }),
    ).toHaveAttribute("href", "/work/archa");
  });

  it("names the group and marks the active language", () => {
    render(<LanguageSwitcher currentPath="/about" locale="de" />);

    const group = screen.getByRole("group", {
      name: de.navigation.languageLabel,
    });
    const german = within(group).getByRole("link", {
      name: de.navigation.germanLabel,
    });
    const english = within(group).getByRole("link", {
      name: de.navigation.englishLabel,
    });

    expect(german).toHaveAttribute("aria-current", "true");
    expect(german).toHaveAttribute("hrefLang", "de");
    expect(english).not.toHaveAttribute("aria-current");
    expect(english).toHaveAttribute("hrefLang", "en");
  });
});

describe("MobileMenu", () => {
  beforeEach(() => {
    delete document.body.dataset.menuOpen;
  });

  it("starts closed behind a semantic button", () => {
    renderWithSiteContent(<MobileMenu currentPath="/" locale="de" />);

    const trigger = screen.getByRole("button", {
      name: de.navigation.openMenuLabel,
    });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger.getAttribute("aria-controls")).toBeTruthy();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.dataset.menuOpen).toBeUndefined();
  });

  it("opens an accessible dialog, locks the page and makes the background inert", async () => {
    const user = userEvent.setup();
    const { siteContent } = renderWithSiteContent(
      <MobileMenu currentPath="/" locale="de" />,
    );
    const trigger = screen.getByRole("button", {
      name: de.navigation.openMenuLabel,
    });

    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: de.navigation.menuLabel });
    const close = within(dialog).getByRole("button", {
      name: de.navigation.closeMenuLabel,
    });

    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(dialog.id).toBe(trigger.getAttribute("aria-controls"));
    expect(close).toHaveFocus();
    expect(document.body.dataset.menuOpen).toBe("true");
    expect(siteContent).toHaveAttribute("inert");
  });

  it("lists every primary route inside the drawer", async () => {
    const user = userEvent.setup();
    renderWithSiteContent(<MobileMenu currentPath="/presence" locale="de" />);

    await user.click(
      screen.getByRole("button", { name: de.navigation.openMenuLabel }),
    );

    const dialog = screen.getByRole("dialog");
    const links = within(dialog).getAllByRole("link");

    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/websites",
      "/reviews",
      "/presence",
      "/automation",
      "/work",
      "/about",
      "/contact",
    ]);
    expect(
      links.filter((link) => link.getAttribute("aria-current") === "page"),
    ).toHaveLength(1);
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    const { siteContent } = renderWithSiteContent(
      <MobileMenu currentPath="/" locale="de" />,
    );
    const trigger = screen.getByRole("button", {
      name: de.navigation.openMenuLabel,
    });

    await user.click(trigger);
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
    expect(document.body.dataset.menuOpen).toBeUndefined();
    expect(siteContent).not.toHaveAttribute("inert");
  });

  it("closes on the close button and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    renderWithSiteContent(<MobileMenu currentPath="/" locale="de" />);
    const trigger = screen.getByRole("button", {
      name: de.navigation.openMenuLabel,
    });

    await user.click(trigger);
    await user.click(
      screen.getByRole("button", { name: de.navigation.closeMenuLabel }),
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes when the backdrop outside the panel is clicked", async () => {
    const user = userEvent.setup();
    renderWithSiteContent(<MobileMenu currentPath="/" locale="de" />);

    await user.click(
      screen.getByRole("button", { name: de.navigation.openMenuLabel }),
    );
    await user.click(screen.getByTestId("mobile-menu-backdrop"));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps Tab and Shift+Tab inside the open drawer", async () => {
    const user = userEvent.setup();
    renderWithSiteContent(<MobileMenu currentPath="/" locale="de" />);

    await user.click(
      screen.getByRole("button", { name: de.navigation.openMenuLabel }),
    );

    const dialog = screen.getByRole("dialog");
    const focusable = [
      ...dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
    ];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    expect(focusable.length).toBeGreaterThan(1);

    last.focus();
    await user.tab();
    expect(first).toHaveFocus();

    await user.tab({ shift: true });
    expect(last).toHaveFocus();
  });

  it("releases the page lock when it unmounts while open", async () => {
    const user = userEvent.setup();
    const { siteContent, unmount } = renderWithSiteContent(
      <MobileMenu currentPath="/" locale="de" />,
    );

    await user.click(
      screen.getByRole("button", { name: de.navigation.openMenuLabel }),
    );
    unmount();

    expect(document.body.dataset.menuOpen).toBeUndefined();
    expect(siteContent).not.toHaveAttribute("inert");
  });
});

describe("Footer", () => {
  it("exposes the four approved contact destinations", () => {
    render(<Footer locale="de" />);

    expect(
      screen.getByRole("link", { name: new RegExp(de.contact.emailLabel) }),
    ).toHaveAttribute("href", "mailto:kontakt@silvandigital.ch");
    expect(
      screen.getByRole("link", { name: new RegExp(de.contact.phoneLabel) }),
    ).toHaveAttribute("href", "tel:+41789008500");
    expect(
      screen.getByRole("link", { name: new RegExp(de.contact.whatsappLabel) }),
    ).toHaveAttribute("href", "https://wa.me/41789008500");
    expect(
      screen.getByRole("link", { name: new RegExp(de.contact.linkedInLabel) }),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/silvan-hahn-dev");
  });

  it("opens external destinations safely and names them as external", () => {
    render(<Footer locale="de" />);

    for (const name of [de.contact.whatsappLabel, de.contact.linkedInLabel]) {
      const link = screen.getByRole("link", { name: new RegExp(name) });

      expect(link).toHaveAttribute("target", "_blank");
      expect(link.getAttribute("rel")).toContain("noreferrer");
      expect(link.getAttribute("rel")).toContain("noopener");
      expect(link).toHaveAccessibleName(new RegExp(de.a11y.externalLink));
    }
  });

  it("keeps mail and telephone links in the same tab", () => {
    render(<Footer locale="de" />);

    for (const name of [de.contact.emailLabel, de.contact.phoneLabel]) {
      expect(
        screen.getByRole("link", { name: new RegExp(name) }),
      ).not.toHaveAttribute("target");
    }
  });

  it("localizes its own navigation and renders the current year", () => {
    render(<Footer locale="en" />);

    const navigation = screen.getByRole("navigation", {
      name: en.footer.navLabel,
    });

    expect(
      within(navigation)
        .getAllByRole("link", { hidden: true })
        .map((link) => link.getAttribute("href")),
    ).toEqual([
      "/en/websites",
      "/en/reviews",
      "/en/presence",
      "/en/automation",
      "/en/work",
      "/en/about",
      "/en/contact",
    ]);
    expect(
      screen.getByText(new RegExp(String(new Date().getFullYear()))),
    ).toBeInTheDocument();
  });
});
