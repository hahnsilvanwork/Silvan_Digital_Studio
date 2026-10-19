"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  ["/", "Startseite"],
  ["/speisekarte", "Speisekarte"],
  ["/ueber-uns", "Über Vogel"],
  ["/kontakt", "Tischanfrage"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePathname().replace(/\/$/, "") || "/";
  const [previous, setPrevious] = useState(path);
  const button = useRef<HTMLButtonElement>(null);
  if (previous !== path) {
    setPrevious(path);
    setOpen(false);
  }
  useEffect(() => {
    const media = matchMedia("(min-width: 900px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    const escape = (e: KeyboardEvent) => {
      if (open && e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    media.addEventListener("change", resize);
    document.addEventListener("keydown", escape);
    return () => {
      media.removeEventListener("change", resize);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <>
      <div className="demo-banner">
        Ein fiktives Café von{" "}
        <a href="https://silvandigital.ch/work/">SilvanDigital</a>
      </div>
      <header className="site-header">
        <div className="wrap header-inner">
          <Link
            prefetch={false}
            className="brand"
            href="/"
            aria-label="Café Vogel: Startseite"
          >
            <span>
              Vogel<span className="brand-dot">.</span>
            </span>
            <span className="brand-description">Café & Konditorei</span>
          </Link>
          <button
            ref={button}
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? "Schliessen" : "Menü"}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              {open ? (
                <path d="m6 6 12 12M6 18 18 6" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
          <nav
            id="main-navigation"
            className={open ? "main-navigation is-open" : "main-navigation"}
            aria-label="Hauptnavigation"
          >
            {links.map(([href, label]) => (
              <Link
                prefetch={false}
                key={href}
                href={href}
                aria-current={path === href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
