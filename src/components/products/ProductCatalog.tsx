"use client";

import { useEffect, useRef, useState } from "react";

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
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
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
              onClick={() => setActiveCategory(category.id)}
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

      <div className={styles.catalogGrid}>
        {visibleProducts.map((product) => (
          <ProductCard
            comingSoonLabel={labels.comingSoon}
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
