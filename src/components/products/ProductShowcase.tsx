"use client";

import { useEffect, useState } from "react";

const VISIT_COUNTER_KEY = "silvan.product-showcase.visit";

/**
 * Advances one product per visit so returning visitors meet the range, using
 * a counter that survives reloads. Any storage failure just means a random
 * product, which is still variety.
 */
function nextVisitIndex(count: number): number {
  try {
    const seen = Number.parseInt(
      window.localStorage.getItem(VISIT_COUNTER_KEY) ?? "",
      10,
    );
    const visit = Number.isFinite(seen) ? seen + 1 : 0;

    window.localStorage.setItem(VISIT_COUNTER_KEY, String(visit));

    return visit % count;
  } catch {
    return Math.floor(Math.random() * count);
  }
}

import type { ProductVisualization } from "../../content/types";
import { SplineProduct } from "./SplineProduct";
import type { ScenePresentation } from "./spline-scene-controls";
import styles from "./products.module.css";

export interface ProductShowcaseProps extends ScenePresentation {
  readonly products: readonly ProductVisualization[];
  readonly selectorLabel: string;
  readonly priority?: boolean;
  /**
   * Opens on a different product each visit. Swapping during a visit is not
   * an option: loading another scene blocks the main thread for up to nine
   * hundred milliseconds, measured on the reviews page.
   */
  readonly rotatePerVisit?: boolean;
  /** The hero presents on its own; the buttons belong to the product section. */
  readonly selectable?: boolean;
  readonly className?: string;
}

export function ProductShowcase({
  products,
  selectorLabel,
  priority = false,
  rotatePerVisit = false,
  selectable = true,
  secondsPerRevolution,
  sweepDegrees,
  className,
}: ProductShowcaseProps) {
  // Starts at the first product so the server and the first client render
  // agree, then settles on this visit's product before anything loads.
  const [index, setIndex] = useState(0);
  const [showing3d, setShowing3d] = useState(false);

  const count = products.length;

  useEffect(() => {
    if (!rotatePerVisit || count < 2) return;

    const openOnThisVisitsProduct = () => setIndex(nextVisitIndex(count));

    openOnThisVisitsProduct();
  }, [count, rotatePerVisit]);

  useEffect(() => {
    if (!showing3d || count < 2) return;

    // Warms the HTTP cache so switching product costs only the scene build,
    // not a round trip. The files are a few dozen kilobytes each.
    const aborter = new AbortController();
    for (const { sceneUrl } of products) {
      void fetch(sceneUrl, { signal: aborter.signal }).catch(() => {
        // A cold cache on the next switch is the worst case, not an error.
      });
    }

    return () => aborter.abort();
  }, [count, products, showing3d]);

  const active = count > 0 ? products[index % count] : undefined;

  if (!active) return null;

  return (
    <div className={[styles.showcase, className].filter(Boolean).join(" ")}>
      <SplineProduct
        ariaLabel={active.ariaLabel}
        fallbackImage={active.fallbackImage}
        onReady={() => setShowing3d(true)}
        priority={priority}
        secondsPerRevolution={secondsPerRevolution}
        sweepDegrees={sweepDegrees}
        sceneUrl={active.sceneUrl}
      />

      {selectable && count > 1 ? (
        <div aria-label={selectorLabel} className={styles.selector} role="group">
          {products.map((product, position) => (
            <button
              aria-pressed={product.id === active.id}
              data-touch-target
              key={product.id}
              onClick={() => setIndex(position)}
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
