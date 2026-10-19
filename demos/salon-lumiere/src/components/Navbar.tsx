"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Startseite" },
  { href: "/leistungen", label: "Leistungen & Preise" },
  { href: "/ueber-uns", label: "Der Salon" },
];

export default function Navbar() {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const [open, setOpen] = useState(false);
  const [previousPath, setPreviousPath] = useState(pathname);
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const brand = useRef<HTMLAnchorElement>(null);
  if (previousPath !== pathname) {
    setPreviousPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const onOutside = (event: PointerEvent | FocusEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 900px)");
    const onResize = () => {
      if (!desktop.matches) return;
      if (document.activeElement === trigger.current || document.activeElement?.closest("#salon-mobile-menu")) brand.current?.focus();
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("focusin", onOutside);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("focusin", onOutside);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="salon-header" ref={header}>
      <div className="salon-nav salon-shell">
        <Link prefetch={false} href="/" className="salon-brand" ref={brand} aria-label="Salon Lumière: Startseite" onClick={() => setOpen(false)}>
          <span>Salon Lumière<span className="brand-period" aria-hidden="true">.</span></span>
        </Link>
        <nav className="salon-desktop-nav" aria-label="Hauptnavigation">
          {links.map(({ href, label }) => <Link prefetch={false} key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}
          <Link prefetch={false} href="/kontakt" className="salon-button" aria-current={pathname === "/kontakt" ? "page" : undefined}>Termin anfragen</Link>
        </nav>
        <button ref={trigger} type="button" className="salon-menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="salon-mobile-menu" aria-label={open ? "Menü schliessen" : "Menü öffnen"}>
          <span>{open ? "Schliessen" : "Menü"}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {open ? <path d="m5 5 14 14M5 19 19 5" /> : <path d="M3 7h18M3 17h18" />}
          </svg>
        </button>
      </div>
      <nav id="salon-mobile-menu" className="salon-mobile-nav" aria-label="Mobile Navigation" hidden={!open}>
        <div className="salon-shell">
          {links.map(({ href, label }) => <Link prefetch={false} key={href} href={href} onClick={() => setOpen(false)} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}
          <Link prefetch={false} href="/kontakt" className="salon-button" onClick={() => setOpen(false)} aria-current={pathname === "/kontakt" ? "page" : undefined}>Termin anfragen</Link>
          <p>Fiktiver Salon · Keine echte Buchung</p>
        </div>
      </nav>
    </header>
  );
}
