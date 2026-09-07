"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Startseite" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const [previousPath, setPreviousPath] = useState(pathname);
  if (previousPath !== pathname) {
    setPreviousPath(pathname);
    setOpen(false);
  }

  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); document.querySelector<HTMLButtonElement>('[aria-controls="salon-mobile-menu"]')?.focus(); } }; window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);
  // Solid background when: scrolled OR on a subpage
  const solidBg = true;
  // When navbar is transparent (home hero, dark bg), use light text
  const lightText = !solidBg;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solidBg
          ? "bg-cream/95 backdrop-blur-sm shadow-sm border-b border-cream-dark"
          : "bg-transparent"
      }`}
    >
      <nav aria-label="Hauptnavigation" className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span
            className={`font-display text-xl md:text-2xl font-semibold tracking-wide transition-colors duration-300 ${
              lightText ? "text-cream" : "text-charcoal"
            }`}
          >
            Salon
          </span>
          <span className="font-display text-xs md:text-sm tracking-[0.25em] text-gold uppercase font-medium">
            Lumière
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={`relative text-sm tracking-wide font-body font-medium transition-colors duration-200 py-1 group ${
                  pathname === href
                    ? "text-gold"
                    : lightText
                    ? "text-cream/80 hover:text-gold"
                    : "text-charcoal hover:text-gold"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${
                    pathname === href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/kontakt"
              className={`ml-2 px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-200 rounded-none ${
                lightText
                  ? "bg-gold text-charcoal hover:bg-gold-light"
                  : "bg-charcoal text-cream hover:bg-charcoal-light"
              }`}
            >
              Termin anfragen
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-3 -mr-2"
          aria-expanded={open}
          aria-controls="salon-mobile-menu"
          aria-label={open ? "Menü schliessen" : "Menü öffnen"}
        >
          <span className="block w-6 relative h-5">
            <span
              className={`absolute block h-px w-full transition-all duration-300 ${
                lightText ? "bg-cream" : "bg-charcoal"
              } ${open ? "top-2 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute block h-px w-full top-2 transition-all duration-300 ${
                lightText ? "bg-cream" : "bg-charcoal"
              } ${open ? "opacity-0 translate-x-2" : "opacity-100"}`}
            />
            <span
              className={`absolute block h-px w-full transition-all duration-300 ${
                lightText ? "bg-cream" : "bg-charcoal"
              } ${open ? "top-2 -rotate-45" : "top-4"}`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="salon-mobile-menu"
        hidden={!open}
        className={`md:hidden transition-all duration-300 overflow-hidden bg-cream border-b border-cream-dark ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-6 pb-6 pt-2 flex flex-col gap-1">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={`block py-3 text-base font-body border-b border-cream-dark last:border-0 transition-colors duration-200 ${
                  pathname === href
                    ? "text-gold font-medium"
                    : "text-charcoal hover:text-gold"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <Link
              href="/kontakt"
              className="block text-center py-3 bg-charcoal text-cream text-sm font-medium tracking-wide"
            >
              Termin anfragen
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
