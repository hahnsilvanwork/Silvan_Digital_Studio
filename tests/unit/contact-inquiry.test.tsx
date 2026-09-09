import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ContactInquiry } from "../../src/components/contact/ContactInquiry";
import { ContactActions } from "../../src/components/contact/ContactActions";
import { LanguageSwitcher } from "../../src/components/ui/LanguageSwitcher";
import { renderToStaticMarkup } from "react-dom/server";
import { getServiceReason, createContactVCard } from "../../src/lib/contact-inquiry";
import { getContent } from "../../src/lib/locales";

afterEach(() => window.history.replaceState({}, "", "/"));

describe("public contact context", () => {
  it("accepts only a single known public service id", () => {
    expect(getServiceReason(new URLSearchParams("service=websites&email=private@example.com"))).toBe("websites");
    for (const query of ["", "service=unknown", "service=websites&service=websites", "service=websites&service=presence", "service=__proto__"]) {
      expect(getServiceReason(new URLSearchParams(query))).toBeNull();
    }
  });
  it("hydrates a known reason and prepares only approved public copy", () => {
    window.history.replaceState({}, "", "/contact?service=automation&email=private@example.com");
    render(<ContactInquiry locale="en" />);
    expect(screen.getByRole("combobox")).toHaveValue("automation");
    const email = screen.getByRole("link", { name: /E-?mail/i }).getAttribute("href")!;
    expect(decodeURIComponent(email)).toContain("Automation");
    expect(decodeURIComponent(email)).not.toContain("private@example.com");
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "websites" } });
    expect(decodeURIComponent(screen.getByRole("link", { name: /WhatsApp/ }).getAttribute("href")!)).toContain("Website");
    fireEvent.change(screen.getByRole("combobox", { name: 'What is your enquiry about?' }), { target: { value: "" } });
    expect(screen.getByRole("link", { name: /E-?mail/i })).toHaveAttribute("href", "mailto:hahn.silvan.work@gmail.com");
  });
  it("preserves direct destinations for default callers", () => {
    render(<ContactActions locale="de" />);
    expect(screen.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute("href", "https://wa.me/41789008500");
    expect(screen.getByRole("link", { name: /Telefon/ })).toHaveAttribute("href", "tel:+41789008500");
  });
  it("exports an importable CRLF vCard using existing name, phone and email", () => {
    const content = getContent("de");
    const card = createContactVCard(content.contact);
    expect(card).toBe(`BEGIN:VCARD\r\nVERSION:4.0\r\nFN:${content.contact.address[0]}\r\nTEL;VALUE=uri:${content.contact.details.phoneHref}\r\nEMAIL:${content.contact.details.email}\r\nEND:VCARD\r\n`);
  });
  it("renders direct actions during static export without reflecting browser query data", () => {
    window.history.replaceState({}, "", "/contact?service=automation&note=secret");
    const markup = renderToStaticMarkup(<ContactInquiry locale="de" />);
    expect(markup).toContain('href="mailto:hahn.silvan.work@gmail.com"');
    expect(markup).not.toContain("secret");
  });
  it("retains only the public reason on language switch and tracks changes", () => {
    window.history.replaceState({}, "", "/contact?service=automation&email=private@example.com");
    const { rerender } = render(<><ContactInquiry locale="de" /><LanguageSwitcher locale="de" currentPath="/contact" /></>);
    expect(screen.getByRole("link", { name: "Englisch" })).toHaveAttribute("href", "/en/contact?service=automation");
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "presence" } });
    expect(window.location.search).toBe("?service=presence");
    expect(screen.getByRole("link", { name: "Englisch" })).toHaveAttribute("href", "/en/contact?service=presence");
    rerender(<LanguageSwitcher locale="de" currentPath="/about" />);
    expect(screen.getByRole("link", { name: "Englisch" })).toHaveAttribute("href", "/en/about");
  });
  it("drops duplicate and unknown service values from the language link", () => {
    window.history.replaceState({}, "", "/contact?service=websites&service=presence");
    render(<LanguageSwitcher locale="de" currentPath="/contact" />);
    expect(screen.getByRole("link", { name: "Englisch" })).toHaveAttribute("href", "/en/contact");
  });
});

