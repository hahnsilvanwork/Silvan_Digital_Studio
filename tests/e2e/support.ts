import type { Page } from "@playwright/test";

/** The drawer replaces the inline navigation below this width. */
export const NAV_BREAKPOINT_PX = 1024;

export function isDrawerViewport(page: Page): boolean {
  const viewport = page.viewportSize();

  return viewport === null ? false : viewport.width < NAV_BREAKPOINT_PX;
}

/**
 * The configurator is a client component whose form has no `action`: submitting
 * it before React has attached its handler fires a native GET, reloads the page
 * and throws the visitor's input away. Waiting on the flag ScrollReveal sets
 * from an effect is a real post-hydration signal rather than a sleep.
 *
 * Every project runs with the default `no-preference`, so the flag is always
 * reached; a project that forced reduced motion would need a different signal.
 */
export async function waitForHydration(page: Page) {
  await page.waitForFunction(
    () => document.documentElement.dataset.motionReady === "true",
    undefined,
    { timeout: 20_000 },
  );
}

/** The element that currently holds focus, described well enough to assert on. */
export async function activeElement(page: Page) {
  return page.evaluate(() => {
    const element = document.activeElement as HTMLElement | null;

    if (element === null) return null;

    return {
      tag: element.tagName.toLowerCase(),
      name: element.getAttribute("name"),
      text: (element.textContent ?? "").trim().slice(0, 60),
      href: element.getAttribute("href"),
    };
  });
}

export const CONTACT = {
  email: "hahn.silvan.work@gmail.com",
  phoneHref: "tel:+41789008500",
  phoneDisplay: "078 900 85 00",
  whatsApp: "+41789008500",
  linkedIn: "https://www.linkedin.com/in/silvan-hahn-dev",
} as const;
