"use client";

import { useState } from "react";

import type { ProductVisualization } from "../../content/types";
import { SplineProduct } from "./SplineProduct";
import styles from "./products.module.css";

export interface ProductShowcaseProps {
  readonly products: readonly ProductVisualization[];
  readonly selectorLabel: string;
  readonly priority?: boolean;
  readonly className?: string;
}

export function ProductShowcase({
  products,
  selectorLabel,
  priority = false,
  className,
}: ProductShowcaseProps) {
  const [selectedId, setSelectedId] = useState(products[0]?.id);
  const active =
    products.find(({ id }) => id === selectedId) ?? products[0];

  if (!active) return null;

  return (
    <div
      className={[styles.showcase, className].filter(Boolean).join(" ")}
    >
      <SplineProduct
        ariaLabel={active.ariaLabel}
        fallbackImage={active.fallbackImage}
        key={active.id}
        priority={priority}
        sceneUrl={active.sceneUrl}
      />

      {products.length > 1 ? (
        <div
          aria-label={selectorLabel}
          className={styles.selector}
          role="group"
        >
          {products.map((product) => (
            <button
              aria-pressed={product.id === active.id}
              data-touch-target
              key={product.id}
              onClick={() => setSelectedId(product.id)}
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
