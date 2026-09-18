"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import { getPrimaryLinks } from "./nav-links";
import { SITE_CONTENT_ID } from "./site-regions";
import styles from "./navigation.module.css";

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';

interface MobileMenuProps {
  readonly locale: Locale;
  readonly currentPath: string;
}

export function MobileMenu({ locale, currentPath }: MobileMenuProps) {
  const content = getContent(locale);
  const links = getPrimaryLinks(locale, currentPath);
  const supportingLinks = links.filter(link => ['/presence', '/automation', '/about'].some(route => link.href === localizePath(route, locale)));
  const mainLinks = links.filter(link => !supportingLinks.includes(link));
  const dialogId = useId();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = triggerRef.current?.closest("header");
    if (!header || typeof ResizeObserver === "undefined") return;
    // Larger text can wrap the header onto two rows. Anchor destinations must
    // clear its actual height, including after rotating the device.
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty(
        "--header-offset", `${header.getBoundingClientRect().height}px`,
      );
    });
    observer.observe(header);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--header-offset");
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    // The trigger stays mounted, so focus can return before the panel unmounts.
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open || typeof window.matchMedia !== 'function') return;
    const desktop = window.matchMedia('(min-width: 72rem)');
    function releaseDrawer(event: MediaQueryListEvent) {
      if (!event.matches) return;
      const focusWasInDrawer = panelRef.current?.contains(document.activeElement);
      setOpen(false);
      // The mobile trigger disappears here; return focus to the visible home link.
      if (focusWasInDrawer) triggerRef.current?.closest('header')?.querySelector<HTMLAnchorElement>('a[href="/"], a[href="/en"]')?.focus();
    }
    desktop.addEventListener('change', releaseDrawer);
    return () => desktop.removeEventListener('change', releaseDrawer);
  }, [open]);

  // The page lock and the background inertness both live outside this subtree,
  // so they are applied imperatively and released by the same effect -- also
  // when the component unmounts while the drawer is still open.
  useEffect(() => {
    if (!open) {
      return;
    }

    const siteContent = document.getElementById(SITE_CONTENT_ID);

    document.body.dataset.menuOpen = "true";
    siteContent?.setAttribute("inert", "");

    return () => {
      delete document.body.dataset.menuOpen;
      siteContent?.removeAttribute("inert");
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    }
  }, [open]);

  // Escape is bound to the document rather than the panel so it still closes the
  // drawer after a backdrop click has moved focus off the panel.
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      event.preventDefault();
      close();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [close, open]);

  const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !panelRef.current) {
      return;
    }

    const focusable = [
      ...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ];

    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <button
        aria-label={content.navigation.openMenuLabel}
        aria-controls={dialogId}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={styles.menuTrigger}
        data-touch-target
        onClick={() => setOpen(true)}
        ref={triggerRef}
        type="button"
      >
        <span aria-hidden="true" className={styles.menuTriggerIcon} />
      </button>

      {open ? (
        <div className={styles.overlay}>
          {/* Redundant convenience only: Escape and the close button carry the
              same action for keyboard and assistive-technology users. */}
          <div
            aria-hidden="true"
            className={styles.backdrop}
            data-testid="mobile-menu-backdrop"
            onClick={close}
          />
          <div
            aria-label={content.navigation.menuLabel}
            aria-modal="true"
            className={styles.panel}
            id={dialogId}
            onKeyDown={trapFocus}
            ref={panelRef}
            role="dialog"
          >
            <div className={styles.panelHeader}>
              <span className={styles.panelBrand}>{content.brand.name}</span>
              <button
                className={styles.menuClose}
                data-touch-target
                onClick={close}
                ref={closeRef}
                type="button"
              >
                {content.navigation.closeMenuLabel}
              </button>
            </div>

            <ul className={styles.panelList}>
              {mainLinks.map((link) => (
                <li className={styles.panelItem} key={link.href}>
                  <a
                    aria-current={link.isCurrent ? "page" : undefined}
                    className={`${styles.panelLink}${link.href === localizePath('/contact', locale) ? ` ${styles.panelLinkContact}` : ''}`}
                    data-touch-target
                    href={link.href}
                    onClick={close}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className={styles.panelGroupLabel}>{locale === 'de' ? 'Weiteres' : 'More'}</p>
            <ul className={styles.panelList}>
              {supportingLinks.map(link => <li className={styles.panelItem} key={link.href}>
                <a aria-current={link.isCurrent ? 'page' : undefined} className={`${styles.panelLink} ${styles.panelSecondaryLink}`} data-touch-target href={link.href} onClick={close}>{link.label}</a>
              </li>)}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
