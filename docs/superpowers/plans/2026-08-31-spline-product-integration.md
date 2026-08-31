# Reusable Spline Product Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the supplied white round Google Review NFC tag to the hero and product section through a reusable, bilingual, mobile-safe Spline Viewer architecture that never intentionally runs more than one scene at once.

**Architecture:** Keep `ReviewsPage` server rendered and add small client islands for scene arbitration, runtime loading, the generic visualization, and the future-ready product selector. A page-level coordinator grants one active-scene lease, while each visualization reserves a square fallback surface and mounts the native `<spline-viewer>` only near the viewport and outside reduced-motion mode.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.9, CSS Modules, native Spline Viewer 2.0.16, Vitest/Testing Library, Playwright.

---

## File Structure

- Create `src/components/products/spline-viewer-loader.ts`: one shared, version-pinned runtime loader.
- Create `src/components/products/SplineSceneProvider.tsx`: page-wide single-scene arbitration.
- Create `src/components/products/SplineProduct.tsx`: generic lazy visualization with fallback and failure behavior.
- Create `src/components/products/ProductShowcase.tsx`: one-active-product collection UI and future selector.
- Create `src/components/products/products.module.css`: visualization, fallback, touch, fade, and selector styles.
- Create `src/types/spline-viewer.d.ts`: React/TypeScript declaration for the custom element.
- Create `public/images/products/README.md`: required static-export contract.
- Modify `src/content/types.ts`, `src/content/de.ts`, and `src/content/en.ts`: bilingual product visualization data.
- Modify `src/features/pages/ReviewsPage.tsx` and `src/styles/pages.module.css`: approved hero and lower-section composition.
- Create `tests/unit/spline-viewer-loader.test.ts`, `tests/unit/spline-scene-provider.test.tsx`, `tests/unit/spline-product.test.tsx`, and `tests/unit/product-showcase.test.tsx`.
- Modify `tests/unit/pages.test.tsx`: server-rendered reviews-page contract.
- Create `tests/e2e/reviews-spline.spec.ts`: responsive and interaction coverage.

### Task 1: Add the bilingual product-data contract

**Files:**
- Modify: `src/content/types.ts`
- Modify: `src/content/de.ts`
- Modify: `src/content/en.ts`
- Create: `tests/unit/spline-product-content.test.ts`
- Create: `public/images/products/README.md`

- [ ] **Step 1: Write the failing content-contract test**

```ts
import { describe, expect, it } from "vitest";

import { getContent } from "../../src/lib/locales";

describe("review product visualizations", () => {
  it.each(["de", "en"] as const)(
    "defines the reusable white round NFC tag for %s",
    (locale) => {
      const reviews = getContent(locale).reviews;
      const product = reviews.productVisualizations[0];

      expect(product).toMatchObject({
        id: "round-nfc-white",
        sceneUrl:
          "https://prod.spline.design/Lu503y2nQ8XllpRe/scene.splinecode",
      });
      expect(product.title.length).toBeGreaterThan(0);
      expect(product.ariaLabel.length).toBeGreaterThan(0);
      expect(reviews.productSelectorLabel.length).toBeGreaterThan(0);
      expect(reviews.secondaryProductImage.src).toBe(
        "/images/products/review-stands.png",
      );
    },
  );

  it("does not request a fallback file that has not been supplied", () => {
    const product = getContent("de").reviews.productVisualizations[0];

    expect(product.fallbackImage).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/unit/spline-product-content.test.ts`

Expected: FAIL because `productVisualizations`, `productSelectorLabel`, and `secondaryProductImage` do not exist.

- [ ] **Step 3: Add the typed content model and dictionaries**

Add before `SiteContentShape` in `src/content/types.ts`:

```ts
export interface ProductVisualization {
  readonly id: string;
  readonly title: string;
  readonly sceneUrl: string;
  readonly fallbackImage?: string;
  readonly ariaLabel: string;
}
```

Replace the reviews image field with:

```ts
productSelectorLabel: string;
productVisualizations: readonly ProductVisualization[];
secondaryProductImage: { readonly src: string; readonly alt: string };
```

Replace `productImages` in `de.ts` with:

```ts
productSelectorLabel: "Google-Review-Produkt wählen",
productVisualizations: [
  {
    id: "round-nfc-white",
    title: "Runder Google Review NFC-Tag in Weiss",
    sceneUrl:
      "https://prod.spline.design/Lu503y2nQ8XllpRe/scene.splinecode",
    ariaLabel: "Interaktives 3D-Modell eines weissen runden Google Review NFC-Tags",
  },
],
secondaryProductImage: {
  src: "/images/products/review-stands.png",
  alt: "NFC Aufsteller für Tisch oder Kasse mit der Aufforderung, das Unternehmen auf Google zu bewerten",
},
```

Use the equivalent English values in `en.ts`:

```ts
productSelectorLabel: "Choose a Google Review product",
productVisualizations: [
  {
    id: "round-nfc-white",
    title: "White round Google Review NFC tag",
    sceneUrl:
      "https://prod.spline.design/Lu503y2nQ8XllpRe/scene.splinecode",
    ariaLabel: "Interactive 3D model of a white round Google Review NFC tag",
  },
],
secondaryProductImage: {
  src: "/images/products/review-stands.png",
  alt: "NFC stand for a table or counter, asking the customer to review the business on Google",
},
```

Create `public/images/products/README.md`:

```md
# Product image assets

The Spline fallback for the white round Google Review NFC tag is not supplied yet.
Add a transparent, square WebP export at `round-nfc-white.webp`. Once committed,
add `fallbackImage: "/images/products/round-nfc-white.webp"` to both locale entries.
Do not substitute the existing rectangular review-card photograph: it is a
different product.
```

- [ ] **Step 4: Run the focused and locale tests and verify GREEN**

Run: `npm test -- tests/unit/spline-product-content.test.ts tests/unit/locales.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content/types.ts src/content/de.ts src/content/en.ts tests/unit/spline-product-content.test.ts public/images/products/README.md
git commit -m "feat: add localized Spline product data"
```

### Task 2: Load the native Spline runtime exactly once

**Files:**
- Create: `src/components/products/spline-viewer-loader.ts`
- Create: `src/types/spline-viewer.d.ts`
- Create: `tests/unit/spline-viewer-loader.test.ts`

- [ ] **Step 1: Write the failing loader test**

```ts
import { describe, expect, it } from "vitest";

import {
  SPLINE_VIEWER_SCRIPT_ID,
  SPLINE_VIEWER_SCRIPT_URL,
  loadSplineViewer,
} from "../../src/components/products/spline-viewer-loader";

describe("loadSplineViewer", () => {
  it("shares one version-pinned module script between callers", async () => {
    const first = loadSplineViewer();
    const second = loadSplineViewer();
    const scripts = document.querySelectorAll(`#${SPLINE_VIEWER_SCRIPT_ID}`);
    const script = scripts[0] as HTMLScriptElement;

    expect(scripts).toHaveLength(1);
    expect(script.type).toBe("module");
    expect(script.src).toBe(SPLINE_VIEWER_SCRIPT_URL);
    expect(first).toBe(second);

    if (!customElements.get("spline-viewer")) {
      customElements.define("spline-viewer", class extends HTMLElement {});
    }
    script.dispatchEvent(new Event("load"));

    await expect(first).resolves.toBeUndefined();
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/unit/spline-viewer-loader.test.ts`

Expected: FAIL because the loader module does not exist.

- [ ] **Step 3: Implement the shared loader**

```ts
export const SPLINE_VIEWER_SCRIPT_ID = "spline-viewer-runtime";
export const SPLINE_VIEWER_SCRIPT_URL =
  "https://cdn.spline.design/@splinetool/viewer@2.0.16/build/spline-viewer.js";

let runtimePromise: Promise<void> | undefined;

export function loadSplineViewer(): Promise<void> {
  if (customElements.get("spline-viewer")) return Promise.resolve();
  if (runtimePromise) return runtimePromise;

  runtimePromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(
      SPLINE_VIEWER_SCRIPT_ID,
    ) as HTMLScriptElement | null;
    const script = existing ?? document.createElement("script");

    const loaded = () => {
      script.dataset.status = "loaded";
      customElements.whenDefined("spline-viewer").then(() => resolve());
    };
    const failed = () => reject(new Error("Spline Viewer runtime failed to load"));

    script.addEventListener("load", loaded, { once: true });
    script.addEventListener("error", failed, { once: true });

    if (existing?.dataset.status === "loaded") {
      loaded();
      return;
    }

    if (!existing) {
      script.id = SPLINE_VIEWER_SCRIPT_ID;
      script.type = "module";
      script.src = SPLINE_VIEWER_SCRIPT_URL;
      script.async = true;
      document.head.append(script);
    }
  }).catch((error: unknown) => {
    runtimePromise = undefined;
    throw error;
  });

  return runtimePromise;
}
```

Create `src/types/spline-viewer.d.ts`:

```ts
import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          readonly url: string;
          readonly background?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};
```

- [ ] **Step 4: Run the loader test and typecheck**

Run: `npm test -- tests/unit/spline-viewer-loader.test.ts && npm run typecheck`

Expected: PASS and exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/products/spline-viewer-loader.ts src/types/spline-viewer.d.ts tests/unit/spline-viewer-loader.test.ts
git commit -m "feat: load Spline viewer runtime once"
```

### Task 3: Enforce one page-wide active scene

**Files:**
- Create: `src/components/products/SplineSceneProvider.tsx`
- Create: `tests/unit/spline-scene-provider.test.tsx`

- [ ] **Step 1: Write the failing coordinator test**

```tsx
import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  SplineSceneProvider,
  useSplineSceneLease,
} from "../../src/components/products/SplineSceneProvider";

const reporters = new Map<string, (near: boolean, distance: number) => void>();

function Candidate({ id }: { readonly id: string }) {
  const lease = useSplineSceneLease(id);
  reporters.set(id, lease.reportProximity);
  return <output data-testid={id}>{String(lease.isActive)}</output>;
}

describe("SplineSceneProvider", () => {
  it("grants the lease only to the nearest eligible scene", () => {
    render(
      <SplineSceneProvider>
        <Candidate id="hero" />
        <Candidate id="products" />
      </SplineSceneProvider>,
    );

    act(() => reporters.get("products")?.(true, 900));
    act(() => reporters.get("hero")?.(true, 40));
    expect(screen.getByTestId("hero")).toHaveTextContent("true");
    expect(screen.getByTestId("products")).toHaveTextContent("false");

    act(() => reporters.get("hero")?.(false, Number.POSITIVE_INFINITY));
    expect(screen.getByTestId("products")).toHaveTextContent("true");
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/unit/spline-scene-provider.test.tsx`

Expected: FAIL because the provider does not exist.

- [ ] **Step 3: Implement the coordinator**

```tsx
"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

interface SceneContextValue {
  readonly activeId: string | null;
  readonly reportProximity: (id: string, near: boolean, distance: number) => void;
}

const SceneContext = createContext<SceneContextValue | null>(null);

export function SplineSceneProvider({ children }: { readonly children: ReactNode }) {
  const candidates = useRef(new Map<string, number>());
  const [activeId, setActiveId] = useState<string | null>(null);

  const reportProximity = useCallback(
    (id: string, near: boolean, distance: number) => {
      if (near) candidates.current.set(id, distance);
      else candidates.current.delete(id);

      const nearest = [...candidates.current.entries()].sort(
        ([, first], [, second]) => first - second,
      )[0]?.[0];
      setActiveId(nearest ?? null);
    },
    [],
  );

  const value = useMemo(
    () => ({ activeId, reportProximity }),
    [activeId, reportProximity],
  );

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>;
}

export function useSplineSceneLease(id: string) {
  const context = useContext(SceneContext);
  if (!context) throw new Error("SplineProduct must be inside SplineSceneProvider");

  return {
    isActive: context.activeId === id,
    reportProximity: useCallback(
      (near: boolean, distance: number) =>
        context.reportProximity(id, near, distance),
      [context, id],
    ),
  };
}
```

- [ ] **Step 4: Run the coordinator test and verify GREEN**

Run: `npm test -- tests/unit/spline-scene-provider.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/products/SplineSceneProvider.tsx tests/unit/spline-scene-provider.test.tsx
git commit -m "feat: coordinate one active Spline scene"
```

### Task 4: Build the lazy, failure-safe `SplineProduct`

**Files:**
- Create: `src/components/products/SplineProduct.tsx`
- Create: `src/components/products/products.module.css`
- Create: `tests/unit/spline-product.test.tsx`

- [ ] **Step 1: Write failing behavior tests**

Create an `IntersectionObserver` harness and tests that assert the stable frame is present before activation, the viewer appears only after intersection/runtime readiness, `load-complete` changes the state to ready, `context-loss` restores the fallback, and reduced motion never mounts the viewer. Use a mocked `loadSplineViewer` because jsdom cannot execute the remote WebGL runtime; test the real loader separately in Task 2.

```tsx
import { act, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../src/components/products/spline-viewer-loader", () => ({
  loadSplineViewer: vi.fn(() => Promise.resolve()),
}));

import { SplineProduct } from "../../src/components/products/SplineProduct";
import { SplineSceneProvider } from "../../src/components/products/SplineSceneProvider";

let observerCallback: IntersectionObserverCallback;

beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }
      observe() {}
      disconnect() {}
      unobserve() {}
      takeRecords() { return []; }
      root = null;
      rootMargin = "0px";
      thresholds = [0];
    },
  );
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })));
});

function subject() {
  return render(
    <SplineSceneProvider>
      <SplineProduct
        ariaLabel="White round tag"
        sceneUrl="https://example.com/scene.splinecode"
      />
    </SplineSceneProvider>,
  );
}

describe("SplineProduct", () => {
  it("reserves the frame before creating a viewer", () => {
    subject();
    expect(screen.getByRole("img", { name: "White round tag" })).toHaveAttribute(
      "data-spline-state",
      "idle",
    );
    expect(document.querySelector("spline-viewer")).toBeNull();
  });

  it("mounts near the viewport and reveals only after load-complete", async () => {
    subject();
    act(() => observerCallback([{ isIntersecting: true, boundingClientRect: { top: 0, bottom: 300 } } as IntersectionObserverEntry], {} as IntersectionObserver));
    await waitFor(() => expect(document.querySelector("spline-viewer")).not.toBeNull());
    expect(screen.getByRole("img")).toHaveAttribute("data-spline-state", "loading");
    act(() => document.querySelector("spline-viewer")?.dispatchEvent(new CustomEvent("load-complete")));
    expect(screen.getByRole("img")).toHaveAttribute("data-spline-state", "ready");
  });

  it("keeps the fallback after context loss", async () => {
    subject();
    act(() => observerCallback([{ isIntersecting: true, boundingClientRect: { top: 0, bottom: 300 } } as IntersectionObserverEntry], {} as IntersectionObserver));
    await waitFor(() => expect(document.querySelector("spline-viewer")).not.toBeNull());
    act(() => document.querySelector("spline-viewer")?.dispatchEvent(new CustomEvent("context-loss")));
    expect(screen.getByRole("img")).toHaveAttribute("data-spline-state", "error");
    expect(document.querySelector("spline-viewer")).toBeNull();
  });
});
```

Add the reduced-motion case:

```tsx
it("keeps the static representation under reduced motion", async () => {
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    matches: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })));
  subject();
  act(() => observerCallback([{ isIntersecting: true, boundingClientRect: { top: 0, bottom: 300 } } as IntersectionObserverEntry], {} as IntersectionObserver));
  await waitFor(() =>
    expect(screen.getByRole("img")).toHaveAttribute(
      "data-spline-state",
      "reduced-motion",
    ),
  );
  expect(document.querySelector("spline-viewer")).toBeNull();
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/unit/spline-product.test.tsx`

Expected: FAIL because `SplineProduct` does not exist.

- [ ] **Step 3: Implement the component**

Implement `SplineProduct.tsx` with these exact behaviors:

```tsx
"use client";

import { useEffect, useId, useRef, useState } from "react";

import { useSplineSceneLease } from "./SplineSceneProvider";
import { loadSplineViewer } from "./spline-viewer-loader";
import styles from "./products.module.css";

const LOAD_TIMEOUT_MS = 20_000;
const THRESHOLDS = [0, 0.25, 0.5, 0.75, 1];

interface SplineProductProps {
  readonly sceneUrl: string;
  readonly fallbackImage?: string;
  readonly ariaLabel: string;
  readonly priority?: boolean;
}

type LoadState = "idle" | "loading" | "ready" | "error" | "reduced-motion";

export function SplineProduct({
  sceneUrl,
  fallbackImage,
  ariaLabel,
  priority = false,
}: SplineProductProps) {
  const leaseId = useId();
  const frameRef = useRef<HTMLElement>(null);
  const viewerRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches),
  );
  const [runtimeReady, setRuntimeReady] = useState(false);
  const [fallbackVisible, setFallbackVisible] = useState(Boolean(fallbackImage));
  const [state, setState] = useState<LoadState>("idle");
  const { isActive, reportProximity } = useSplineSceneLease(leaseId);

  useEffect(() => {
    if (!window.matchMedia) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    if (!window.IntersectionObserver) {
      reportProximity(!reducedMotion, 0);
      return () => reportProximity(false, Number.POSITIVE_INFINITY);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        const center = (entry.boundingClientRect.top + entry.boundingClientRect.bottom) / 2;
        reportProximity(
          entry.isIntersecting && !reducedMotion,
          Math.abs(center - window.innerHeight / 2),
        );
      },
      { rootMargin: priority ? "50% 0px" : "12.5% 0px", threshold: THRESHOLDS },
    );
    observer.observe(frame);
    return () => {
      observer.disconnect();
      reportProximity(false, Number.POSITIVE_INFINITY);
    };
  }, [priority, reducedMotion, reportProximity]);

  useEffect(() => {
    if (reducedMotion) {
      setRuntimeReady(false);
      setState("reduced-motion");
      return;
    }
    if (!isActive) {
      setRuntimeReady(false);
      setState("idle");
      return;
    }
    let cancelled = false;
    setState("loading");
    loadSplineViewer().then(
      () => { if (!cancelled) setRuntimeReady(true); },
      () => { if (!cancelled) setState("error"); },
    );
    return () => { cancelled = true; };
  }, [isActive, reducedMotion, sceneUrl]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !runtimeReady) return;
    const complete = () => {
      window.clearTimeout(timeout);
      setState("ready");
    };
    const failed = () => {
      setRuntimeReady(false);
      setState("error");
    };
    const timeout = window.setTimeout(failed, LOAD_TIMEOUT_MS);
    viewer.addEventListener("load-complete", complete, { once: true });
    viewer.addEventListener("context-loss", failed, { once: true });
    return () => {
      window.clearTimeout(timeout);
      viewer.removeEventListener("load-complete", complete);
      viewer.removeEventListener("context-loss", failed);
    };
  }, [runtimeReady]);

  return (
    <figure
      aria-label={ariaLabel}
      className={styles.product}
      data-spline-state={state}
      ref={frameRef}
      role="img"
    >
      <span aria-hidden="true" className={styles.fallback}>
        {fallbackImage && fallbackVisible ? (
          <img
            alt=""
            className={styles.fallbackImage}
            decoding="async"
            loading={priority ? "eager" : "lazy"}
            onError={() => setFallbackVisible(false)}
            src={fallbackImage}
          />
        ) : null}
      </span>
      {runtimeReady ? (
        <spline-viewer
          aria-hidden="true"
          background="transparent"
          className={styles.viewer}
          ref={viewerRef}
          url={sceneUrl}
        />
      ) : null}
    </figure>
  );
}
```

Create `products.module.css`:

```css
.showcase {
  display: grid;
  gap: var(--space-xs);
  min-inline-size: 0;
}

.product {
  position: relative;
  inline-size: 100%;
  max-inline-size: 100%;
  aspect-ratio: 1;
  overflow: clip;
  contain: layout paint;
  touch-action: pan-y;
}

.fallback,
.viewer {
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
}

.fallback {
  opacity: 1;
  transition: opacity var(--duration-medium) var(--ease-out);
}

.fallbackImage {
  inline-size: 100%;
  block-size: 100%;
  object-fit: contain;
}

.viewer {
  display: block;
  max-inline-size: 100%;
  opacity: 0;
  touch-action: pan-y;
  transition: opacity var(--duration-medium) var(--ease-out);
}

.product[data-spline-state="ready"] .fallback {
  opacity: 0;
}

.product[data-spline-state="ready"] .viewer {
  opacity: 1;
}

.selector {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.selector button {
  padding: var(--space-2xs) var(--space-xs);
  border: var(--hairline) solid var(--color-line);
  border-radius: var(--radius-pill);
  background: transparent;
  cursor: pointer;
}

.selector button[aria-pressed="true"] {
  border-color: var(--color-ink);
}

@media (prefers-reduced-motion: reduce) {
  .fallback,
  .viewer {
    transition: none;
  }
}
```

- [ ] **Step 4: Run tests and typecheck; fix only implementation defects**

Run: `npm test -- tests/unit/spline-product.test.tsx && npm run typecheck`

Expected: PASS and exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/products/SplineProduct.tsx src/components/products/products.module.css tests/unit/spline-product.test.tsx
git commit -m "feat: add lazy Spline product viewer"
```

### Task 5: Add the future-ready one-active-product showcase

**Files:**
- Create: `src/components/products/ProductShowcase.tsx`
- Create: `tests/unit/product-showcase.test.tsx`

- [ ] **Step 1: Write failing selector tests**

Mock only `SplineProduct` to expose its scene URL as text, then exercise the real showcase state:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../src/components/products/SplineProduct", () => ({
  SplineProduct: ({ sceneUrl }: { sceneUrl: string }) => (
    <output data-testid="active-scene">{sceneUrl}</output>
  ),
}));

import { ProductShowcase } from "../../src/components/products/ProductShowcase";

const products = [
  {
    id: "white",
    title: "White tag",
    sceneUrl: "https://example.com/white.splinecode",
    ariaLabel: "White tag in 3D",
  },
  {
    id: "black",
    title: "Black tag",
    sceneUrl: "https://example.com/black.splinecode",
    ariaLabel: "Black tag in 3D",
  },
] as const;

describe("ProductShowcase", () => {
  it("omits controls when there is only one product", () => {
    render(<ProductShowcase products={products.slice(0, 1)} selectorLabel="Choose" />);
    expect(screen.queryByRole("group", { name: "Choose" })).toBeNull();
    expect(screen.getAllByTestId("active-scene")).toHaveLength(1);
  });

  it("replaces the active scene when another product is selected", async () => {
    const user = userEvent.setup();
    render(<ProductShowcase products={products} selectorLabel="Choose" />);

    const black = screen.getByRole("button", { name: "Black tag" });
    expect(screen.getByRole("button", { name: "White tag" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await user.click(black);

    expect(black).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByTestId("active-scene")).toHaveLength(1);
    expect(screen.getByTestId("active-scene")).toHaveTextContent("black.splinecode");
  });
});
```

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- tests/unit/product-showcase.test.tsx`

Expected: FAIL because `ProductShowcase` does not exist.

- [ ] **Step 3: Implement `ProductShowcase`**

```tsx
"use client";

import { useEffect, useState } from "react";

import type { ProductVisualization } from "../../content/types";
import { SplineProduct } from "./SplineProduct";
import styles from "./products.module.css";

interface ProductShowcaseProps {
  readonly products: readonly ProductVisualization[];
  readonly selectorLabel: string;
  readonly priority?: boolean;
  readonly className?: string;
}

export function ProductShowcase({ products, selectorLabel, priority, className }: ProductShowcaseProps) {
  const [activeId, setActiveId] = useState(products[0]?.id);
  const active = products.find(({ id }) => id === activeId) ?? products[0];

  useEffect(() => {
    if (!products.some(({ id }) => id === activeId)) setActiveId(products[0]?.id);
  }, [activeId, products]);

  if (!active) return null;

  return (
    <div className={[styles.showcase, className].filter(Boolean).join(" ")}>
      <SplineProduct
        ariaLabel={active.ariaLabel}
        fallbackImage={active.fallbackImage}
        key={active.id}
        priority={priority}
        sceneUrl={active.sceneUrl}
      />
      {products.length > 1 ? (
        <div aria-label={selectorLabel} className={styles.selector} role="group">
          {products.map((product) => (
            <button
              aria-pressed={product.id === active.id}
              data-touch-target
              key={product.id}
              onClick={() => setActiveId(product.id)}
              type="button"
            >
              {product.title}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 4: Run tests and verify GREEN**

Run: `npm test -- tests/unit/product-showcase.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/products/ProductShowcase.tsx tests/unit/product-showcase.test.tsx
git commit -m "feat: add reusable product showcase"
```

### Task 6: Integrate the approved hero and lower product layout

**Files:**
- Modify: `src/features/pages/ReviewsPage.tsx`
- Modify: `src/styles/pages.module.css`
- Modify: `tests/unit/pages.test.tsx`
- Create: `tests/e2e/reviews-spline.spec.ts`

- [ ] **Step 1: Add failing page-structure assertions**

Extend the `ReviewsPage` unit suite to assert that the CTA precedes the hero visualization in DOM order, the localized visualization label is rendered twice, and only the stand photograph remains as a static product image.

```tsx
it("keeps the CTA before the mobile product and retains only the stand photo", () => {
  render(<ReviewsPage locale="de" />);
  const main = screen.getByRole("main");
  const cta = within(main).getByRole("link", { name: de.reviews.ctaLabel });
  const visualizations = within(main).getAllByRole("img", {
    name: de.reviews.productVisualizations[0].ariaLabel,
  });

  expect(visualizations).toHaveLength(2);
  expect(
    cta.compareDocumentPosition(visualizations[0]) & Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
  expect(within(main).getByAltText(de.reviews.secondaryProductImage.alt)).toBeVisible();
  expect(within(main).queryByAltText(/Scheckkartenformat/)).toBeNull();
});
```

- [ ] **Step 2: Add failing deterministic Playwright coverage**

Create `tests/e2e/reviews-spline.spec.ts`. Intercept the exact CDN runtime with a tiny custom element that emits `load-complete`; this tests the site integration without depending on Spline uptime:

```ts
import { expect, test, type Page } from "@playwright/test";

const RUNTIME =
  "https://cdn.spline.design/@splinetool/viewer@2.0.16/build/spline-viewer.js";

async function stubSpline(page: Page) {
  await page.route(RUNTIME, (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `setTimeout(() => {
        if (!customElements.get("spline-viewer")) {
          customElements.define("spline-viewer", class extends HTMLElement {
            connectedCallback() {
              setTimeout(() => this.dispatchEvent(new CustomEvent("load-complete")), 100);
            }
          });
        }
      }, 100);`,
    }),
  );
}

test.describe("Google Review Spline products", () => {
  test.beforeEach(async ({ page }) => {
    await stubSpline(page);
  });

  for (const width of [320, 375, 390, 430]) {
    test(`fits and scrolls at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/reviews");
      const hero = page.locator('[data-spline-placement="hero"] [data-spline-state]');
      const cta = page.getByRole("link", { name: "Unverbindlich anfragen" });

      await expect(hero).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
      expect(await cta.evaluate((node) =>
        Boolean(node.compareDocumentPosition(document.querySelector('[data-spline-placement="hero"]')) & Node.DOCUMENT_POSITION_FOLLOWING),
      )).toBe(true);

      const before = await hero.boundingBox();
      await expect(hero).toHaveAttribute("data-spline-state", "ready");
      const after = await hero.boundingBox();
      expect(after?.width).toBeCloseTo(before?.width ?? 0, 0);
      expect(after?.height).toBeCloseTo(before?.height ?? 0, 0);
      await expect(hero).toHaveCSS("touch-action", "pan-y");

      const box = await hero.boundingBox();
      if (!box) throw new Error("Hero Spline frame has no box");
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      const startY = await page.evaluate(() => scrollY);
      await page.mouse.wheel(0, 500);
      await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(startY);

      await cta.click();
      await expect(page).toHaveURL(/#inquiry$/);
    });
  }

  test("keeps one active canvas while moving between showcases", async ({ page }) => {
    await page.goto("/reviews");
    await expect(page.locator("spline-viewer")).toHaveCount(1);
    await page.locator('[data-spline-placement="products"]').scrollIntoViewIfNeeded();
    await expect(page.locator("spline-viewer")).toHaveCount(1);
    await expect(
      page.locator('[data-spline-placement="products"] [data-spline-state]'),
    ).toHaveAttribute("data-spline-state", "ready");
  });

  test("uses two hero columns on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/reviews");
    const copy = await page.locator('[data-reviews-hero-copy]').boundingBox();
    const product = await page.locator('[data-spline-placement="hero"]').boundingBox();
    if (!copy || !product) throw new Error("Desktop hero boxes are missing");
    expect(copy.x + copy.width).toBeLessThanOrEqual(product.x);
  });

  test("uses only the static representation with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/reviews");
    await expect(page.locator("spline-viewer")).toHaveCount(0);
    await expect(page.locator('[data-spline-state="reduced-motion"]')).toHaveCount(2);
  });
});
```

Run: `npx playwright test tests/e2e/reviews-spline.spec.ts --project=chromium`

Expected: FAIL because the page is not integrated yet.

- [ ] **Step 3: Implement the page composition**

Import `ProductShowcase` and `SplineSceneProvider`, wrap the existing `.page`, and replace only the hero and product-media fragments with:

```tsx
<SplineSceneProvider>
  <div className={pageStyles.page}>
    <section
      className={`${layoutStyles.container} ${pageStyles.pageHeader} ${pageStyles.reviewsHero}`}
    >
      <div className={pageStyles.reviewsHeroCopy} data-reviews-hero-copy>
        <p className={pageStyles.heroLabel} data-reveal="rise">
          {reviews.eyebrow}
        </p>
        <SplitText
          as="h1"
          className={pageStyles.pageTitle}
          startIndex={sequence.titleStartIndex}
          text={reviews.title}
        />
        <p
          className={pageStyles.editorialTight}
          data-reveal="rise"
          style={{ "--reveal-index": sequence.introIndex } as CSSProperties}
        >
          {reviews.intro}
        </p>
        <div
          className={pageStyles.heroActions}
          data-reveal="rise"
          style={{ "--reveal-index": sequence.actionsIndex } as CSSProperties}
        >
          <ButtonLink href="#inquiry">{reviews.ctaLabel}</ButtonLink>
        </div>
      </div>
      <div className={pageStyles.reviewsHeroProduct} data-spline-placement="hero">
        <ProductShowcase
          priority
          products={reviews.productVisualizations}
          selectorLabel={reviews.productSelectorLabel}
        />
      </div>
    </section>

    {/* In the existing lead section, replace only .productShowcase: */}
    <div className={pageStyles.productShowcase}>
      <div className={pageStyles.productSpline} data-spline-placement="products">
        <ProductShowcase
          products={reviews.productVisualizations}
          selectorLabel={reviews.productSelectorLabel}
        />
      </div>
      <span className={pageStyles.productImage} data-reveal="scale">
        <Image
          alt={reviews.secondaryProductImage.alt}
          height={1080}
          sizes="(min-width: 64rem) 46vw, 50vw"
          src={reviews.secondaryProductImage.src}
          width={1080}
        />
      </span>
    </div>

    {/* Keep every remaining price, process, inquiry, FAQ, and contact section unchanged. */}
  </div>
</SplineSceneProvider>
```

Add mobile-first styles:

```css
.reviewsHero {
  align-items: center;
}

.reviewsHeroCopy {
  display: grid;
  gap: var(--space-sm);
  min-inline-size: 0;
}

.reviewsHeroProduct {
  inline-size: min(100%, 22rem);
  justify-self: center;
  margin-block-start: var(--space-sm);
}

.productSpline {
  min-inline-size: 0;
}

@media (min-width: 64rem) {
  .reviewsHero {
    grid-template-columns: minmax(0, 7fr) minmax(18rem, 5fr);
    gap: var(--space-xl);
  }

  .reviewsHeroProduct {
    inline-size: 100%;
    margin-block-start: 0;
  }
}
```

Keep the existing `.productShowcase` mobile grid and image frame rules. Add only the selectors needed to let the Spline grid child shrink without giving it a card border.

- [ ] **Step 4: Run unit and browser tests and verify GREEN**

Run: `npm test -- tests/unit/pages.test.tsx && npx playwright test tests/e2e/reviews-spline.spec.ts --project=chromium`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/pages/ReviewsPage.tsx src/styles/pages.module.css tests/unit/pages.test.tsx tests/e2e/reviews-spline.spec.ts
git commit -m "feat: integrate Spline product into reviews page"
```

### Task 7: Verify production quality and responsive presentation

**Files:**
- Modify only files already listed if verification exposes a scoped defect.

- [ ] **Step 1: Run the required static checks and unit suite**

Run each command independently and retain its exit code:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Expected: all commands exit 0 with no TypeScript or ESLint suppressions.

- [ ] **Step 2: Run focused browser coverage in all configured engines**

Run: `npx playwright test tests/e2e/reviews-spline.spec.ts`

Expected: Chromium, Firefox, WebKit, and mobile Safari projects pass. If browser-specific custom-element timing differs, fix the deterministic test harness or production event handling; do not skip the requirement.

- [ ] **Step 3: Inspect the real scene at required widths**

Start the production server through the existing Playwright configuration or `npm run start` after the successful build. Capture and inspect `/reviews` and `/en/reviews` at 320, 375, 390, 430, and 1440 px with reduced motion both off and on. Confirm:

- the round tag is fully contained;
- the hero is not excessively tall;
- the CTA remains prominent and clickable;
- no horizontal overflow occurs;
- vertical page scrolling works over the viewer;
- the lower stand image is unchanged;
- no Spline widget border or unrelated redesign appears.

- [ ] **Step 4: Re-run checks after any visual correction**

Run: `npm run typecheck && npm run lint && npm test && npm run build && npx playwright test tests/e2e/reviews-spline.spec.ts`

Expected: exit 0.

- [ ] **Step 5: Commit final scoped corrections, if any**

```bash
git add src tests public/images/products/README.md
git commit -m "fix: refine responsive Spline presentation"
```

Skip this commit if verification required no corrections.
