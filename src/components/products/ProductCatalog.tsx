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

  return (
    <div className={styles.catalog}>
      <div aria-label={labels.category} className={styles.categoryTabs} role="group">
        {categories.map((category) => (
          <button
            aria-pressed={category.id === activeCategory}
            data-touch-target
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            type="button"
          >
            {category.label}
          </button>
        ))}
      </div>

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
