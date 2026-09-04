"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";

import type {
  NfcProduct,
  ProductCategory,
} from "../../content/types";
import { Product3DDialog, type Product3DLabels } from "./Product3DDialog";
import { ProductCard } from "./ProductCard";
import styles from "./products.module.css";

interface ProductCatalogLabels extends Product3DLabels {
  readonly category: string;
  readonly categoryPrompt: string;
  readonly productSingular: string;
  readonly productPlural: string;
  readonly view3d: string;
  readonly comingSoon: string;
  readonly previousProduct: string;
  readonly nextProduct: string;
  readonly productPosition: string;
  readonly productPositionOf: string;
}

interface ProductCatalogProps {
  readonly products: readonly NfcProduct[];
  readonly categories: readonly {
    readonly id: ProductCategory;
    readonly label: string;
  }[];
  readonly labels: ProductCatalogLabels;
}

export function ProductCatalog({
  products,
  categories,
  labels,
}: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(
    categories[0]?.id ?? "reviews",
  );
  const [selectedProduct, setSelectedProduct] = useState<NfcProduct | null>(
    null,
  );
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const railId = useId();

  useLayoutEffect(() => {
    if (selectedProduct === null && returnFocusRef.current) {
      returnFocusRef.current.focus();
      returnFocusRef.current = null;
    }
  }, [selectedProduct]);

  const visibleProducts = products.filter(
    ({ category }) => category === activeCategory,
  );
  const activeCategoryLabel =
    categories.find(({ id }) => id === activeCategory)?.label ?? "";
  const countLabel = (count: number) =>
    `${count} ${count === 1 ? labels.productSingular : labels.productPlural}`;

  const selectProduct = (requestedIndex: number) => {
    const nextIndex = Math.max(
      0,
      Math.min(requestedIndex, visibleProducts.length - 1),
    );
    setActiveProductIndex(nextIndex);

    const card = railRef.current?.querySelector<HTMLElement>(
      `[data-product-index="${nextIndex}"]`,
    );
    railRef.current?.scrollTo({
      behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      left: card?.offsetLeft ?? 0,
    });
  };

  return (
    <div className={styles.catalog}>
      <p className={styles.categoryPrompt}>{labels.categoryPrompt}</p>
      <div aria-label={labels.category} className={styles.categoryTabs} role="group">
        {categories.map((category) => {
          const productCount = products.filter(
            (product) => product.category === category.id,
          ).length;

          return (
            <button
              aria-pressed={category.id === activeCategory}
              data-touch-target
              key={category.id}
              onClick={() => {
                setActiveProductIndex(0);
                setActiveCategory(category.id);
              }}
              type="button"
            >
              <span className={styles.categoryName}>{category.label}</span>
              <span className={styles.categoryCount}>{countLabel(productCount)}</span>
            </button>
          );
        })}
      </div>

      <h3 aria-live="polite" className={styles.catalogResult}>
        {activeCategoryLabel} · {countLabel(visibleProducts.length)}
      </h3>

      <div
        aria-label={`${activeCategoryLabel}: ${countLabel(visibleProducts.length)}`}
        className={styles.catalogGrid}
        data-product-rail
        id={railId}
        key={activeCategory}
        onScroll={(event) => {
          const rail = event.currentTarget;
          const cards = Array.from(
            rail.querySelectorAll<HTMLElement>("[data-product-index]"),
          );
          let nearestIndex = 0;
          let nearestDistance = Number.POSITIVE_INFINITY;

          for (const [index, card] of cards.entries()) {
            const distance = Math.abs(card.offsetLeft - rail.scrollLeft);
            if (distance < nearestDistance) {
              nearestDistance = distance;
              nearestIndex = index;
            }
          }
          setActiveProductIndex(nearestIndex);
        }}
        ref={railRef}
        role="region"
        tabIndex={0}
      >
        {visibleProducts.map((product, index) => (
          <ProductCard
            comingSoonLabel={labels.comingSoon}
            index={index}
            key={product.id}
            onView3D={(selected, trigger) => {
              returnFocusRef.current = trigger;
              setSelectedProduct(selected);
            }}
            product={product}
            view3dLabel={labels.view3d}
          />
        ))}
      </div>

      <div className={styles.catalogRailControls} data-product-rail-controls>
        <p aria-live="polite" className={styles.catalogPosition}>
          {labels.productPosition} {activeProductIndex + 1}{" "}
          {labels.productPositionOf} {visibleProducts.length}
        </p>
        {visibleProducts.length > 1 ? (
          <div className={styles.catalogRailButtons}>
            <button
              aria-controls={railId}
              aria-label={labels.previousProduct}
              data-touch-target
              disabled={activeProductIndex === 0}
              onClick={() => selectProduct(activeProductIndex - 1)}
              type="button"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              aria-controls={railId}
              aria-label={labels.nextProduct}
              data-touch-target
              disabled={activeProductIndex === visibleProducts.length - 1}
              onClick={() => selectProduct(activeProductIndex + 1)}
              type="button"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        ) : null}
      </div>

      {selectedProduct ? (
        <Product3DDialog
          labels={labels}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      ) : null}
    </div>
  );
}
