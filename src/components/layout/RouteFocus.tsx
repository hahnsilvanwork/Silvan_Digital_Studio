"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { MAIN_CONTENT_ID } from "./site-regions";

/**
 * Moves focus to the main region after a client-side navigation.
 *
 * Following a link used to change the document title and nothing else a screen
 * reader could hear: the route announcer stayed empty and focus fell back to
 * `<body>`, so someone who activated "Google Reviews" got no confirmation that
 * anything had happened and had to hunt for the new content. Focusing `<main>`
 * both announces the new page and puts the reading position at the top of it.
 *
 * The first render is skipped -- on a fresh page load the browser is already at
 * the top and stealing focus would fight the skip link.
 */
export function RouteFocus() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    document.getElementById(MAIN_CONTENT_ID)?.focus();
  }, [pathname]);

  return null;
}
