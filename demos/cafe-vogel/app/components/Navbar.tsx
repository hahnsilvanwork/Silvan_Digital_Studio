"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Startseite" },
  { href: "/speisekarte", label: "Speisekarte" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname().replace(/\/$/, "") || "/";

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      document.querySelector<HTMLButtonElement>('[aria-controls="mobile-navigation"]')?.focus();
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F2E8D5]/97 backdrop-blur-sm border-b border-[#1A1208]/20">
      <nav aria-label="Hauptnavigation" className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start leading-none gap-0.5">
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-lg font-black text-[#1A1208] tracking-tight">
            Café & Konditorei
          </span>
          <span className="text-[11px] text-[#755031] tracking-[0.25em] uppercase font-medium" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
            ✦ Vogel ✦ Zürich ✦
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={`text-sm tracking-wide transition-colors duration-200 ${
                  pathname === href
                    ? "text-[#755031] font-bold"
                    : "text-[#1A1208]/70 hover:text-[#755031]"
                }`}
                style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/kontakt"
              className="border border-[#1A1208] text-[#1A1208] text-xs tracking-[0.15em] uppercase px-5 py-2 hover:bg-[#1A1208] hover:text-[#F2E8D5] transition-colors duration-200"
              style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
            >
              Reservierungsdemo
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden min-h-11 min-w-11 p-3 -mr-2" aria-label={open ? "Menü schliessen" : "Menü öffnen"} aria-expanded={open} aria-controls="mobile-navigation">
          <span className="block w-5 relative h-4">
            {[
              open ? "top-2 rotate-45" : "top-0",
              `top-2 ${open ? "opacity-0" : "opacity-100"}`,
              open ? "top-2 -rotate-45" : "top-4",
            ].map((cls, i) => (
              <span key={i} className={`absolute block h-0.5 w-full bg-[#1A1208] transition-all duration-300 ${cls}`} />
            ))}
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div id="mobile-navigation" hidden={!open} className={`md:hidden overflow-y-auto overscroll-contain transition-all duration-300 bg-[#F2E8D5] border-t border-[#1A1208]/10 ${open ? "max-h-[calc(100dvh-81px)] opacity-100" : "max-h-0 opacity-0"}`}>
        <ul className="px-6 py-4 flex flex-col gap-1">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={`block py-3 text-base border-b border-[#1A1208]/10 last:border-0 transition-colors duration-200 ${
                  pathname === href ? "text-[#755031] font-bold" : "text-[#1A1208]/80 hover:text-[#755031]"
                }`}
                style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <Link
              href="/kontakt"
              className="block text-center py-3 border border-[#1A1208] text-[#1A1208] text-sm tracking-[0.1em] uppercase hover:bg-[#1A1208] hover:text-[#F2E8D5] transition-colors duration-200"
              style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
            >
              Reservierungsdemo
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
