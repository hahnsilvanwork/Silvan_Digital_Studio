"use client";

import { useEffect, useId, useRef, useState } from "react";

import type {
  NfcProduct,
  Locale,
  ProductCategory,
} from "../../content/types";
import { Product3DDialog, type Product3DLabels } from "./Product3DDialog";
import { ProductCard } from "./ProductCard";
import styles from "./products.module.css";
import { useCatalogueSelection, setCatalogueSelection } from "../reviews/use-catalogue-selection";

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
  readonly requestModel?: string;
  readonly external3d?: string;
}

interface ProductCatalogProps {
  readonly locale?: Locale;
  readonly products: readonly NfcProduct[];
  readonly categories: readonly {
    readonly id: ProductCategory;
    readonly label: string;
  }[];
  readonly labels: ProductCatalogLabels;
}

export function ProductCatalog({
  products,
  locale = "de",
  categories,
  labels,
}: ProductCatalogProps) {
  const selection = useCatalogueSelection();
  const activeCategory = categories.find((category) => category.id === selection.category)?.id ?? categories[0]?.id ?? "reviews";
  const de = locale === "de";
  const railKey = activeCategory;
  const [selectedProduct, setSelectedProduct] = useState<NfcProduct | null>(
    null,
  );
  const [railPosition, setRailPosition] = useState({ category: railKey, index: 0 });
  const activeProductIndex = railPosition.category === railKey ? railPosition.index : 0;
  const setActiveProductIndex = (index: number) => setRailPosition({ category: railKey, index });
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const railId = useId();

  useEffect(() => {
    if (selectedProduct === null && returnFocusRef.current) {
      returnFocusRef.current.focus();
      returnFocusRef.current = null;
    }
  }, [selectedProduct]);

  const visibleProducts = products.filter(
    product => product.category === activeCategory,
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
      <div className={styles.mobileCategory}>
        <label className={styles.categoryPrompt} htmlFor={`${railId}-category`}>{labels.categoryPrompt}</label>
        <select id={`${railId}-category`} value={activeCategory} onChange={(event) => {
          setActiveProductIndex(0);
          setCatalogueSelection(event.target.value as ProductCategory);
        }}>
          {categories.map(category => <option key={category.id} value={category.id}>{category.label}</option>)}
        </select>
      </div>
      <p className={styles.desktopCategoryPrompt}>{labels.categoryPrompt}</p>
      <div aria-label={labels.category} className={styles.categoryTabs} role="group">
        {categories.map((category) => {
          const productCount = products.filter(
            (product) => product.category === category.id,
          ).length;

          return (
            <button
              aria-label={`${category.label} ${countLabel(productCount)}`}
              aria-pressed={category.id === activeCategory}
              data-touch-target
              key={category.id}
              onClick={() => {
                setActiveProductIndex(0);
                setCatalogueSelection(category.id);
              }}
              type="button"
            >
              <span className={styles.categoryName}>{category.label}</span>
              <span aria-hidden="true" className={styles.categoryCount}>{productCount}</span>
            </button>
          );
        })}
      </div>

<details className={styles.deliveryFacts}>
        <summary>{de ? "Verfügbarkeit, Lieferung und Betreuung" : "Availability, delivery and support"}</summary>
        <p>{de ? "Standardprodukte ohne Personalisierung sind bei mir vor Ort an Lager. Logo-, personalisierte und individuelle Produkte erhalten Sie nach Absprache innerhalb von 3–5 Wochen fertig konfiguriert und einsatzbereit." : "Standard products without personalisation are stocked at my location. Logo, personalised and custom products arrive configured and ready to use within 3–5 weeks after agreement."}</p>
        <p>{de ? "Google-Bewertungskarten benötigen keine laufende Betreuung durch mich. Besondere Wünsche oder spätere Anpassungen vereinbaren wir separat." : "Google review cards require no ongoing support from me. Special requests or later changes are agreed separately."}</p>
      </details>

      <h3 aria-live="polite" className={styles.catalogResult}>
        {activeCategoryLabel} · {countLabel(visibleProducts.length)}
      </h3>

      <div
        aria-label={`${activeCategoryLabel}: ${countLabel(visibleProducts.length)}`}
        className={styles.catalogGrid}
        data-product-rail
        id={railId}
        key={railKey}
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
            requestModelLabel={labels.requestModel}
          />
        ))}
      </div>

      {labels.external3d && visibleProducts.some(product => product.scene && product.scene.format !== 'glb') ? <p className={styles.catalogDescription}>{labels.external3d}</p> : null}

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
