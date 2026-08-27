"use client";

import { useEffect } from "react";

/**
 * One observer for the whole document. Server components opt in by adding a
 * `data-reveal` attribute, so a reveal costs no client component of its own and
 * the pages stay statically rendered.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;

    if (root.dataset.motion !== "on") {
      return;
    }

    // The inline script armed a fallback that un-hides everything if the bundle
    // never boots. It has booted, so that safety net can stand down.
    root.dataset.motionReady = "true";

    if (typeof IntersectionObserver === "undefined") {
      root.dataset.motion = "off";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          (entry.target as HTMLElement).dataset.revealed = "true";
          observer.unobserve(entry.target);
        }
      },
      {
        // Threshold 0: an element taller than the viewport can never reach a
        // fractional threshold and would stay hidden forever.
        threshold: 0,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    const observePending = () => {
      for (const element of document.querySelectorAll(
        "[data-reveal]:not([data-revealed])",
      )) {
        observer.observe(element);
      }
    };

    observePending();

    // Client-side navigation swaps the page below this component, so newly
    // rendered elements have to be picked up as they arrive.
    const mutations = new MutationObserver(observePending);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
