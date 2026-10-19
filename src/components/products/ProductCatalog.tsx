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
import { catalogueGroup, isInCatalogueGroup, customExamplesFirst } from '../../lib/catalogue-groups';

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
  readonly starterProductIds?: readonly string[];
}

export function ProductCatalog({
  products,
  locale = "de",
  categories,
  labels,
  starterProductIds,
}: ProductCatalogProps) {
  const selection = useCatalogueSelection();
  const selectedModel = products.find(product => product.id === selection.modelId);
  const requestedCategory = starterProductIds && selectedModel ? catalogueGroup(selectedModel)
    : starterProductIds && ['tripadvisor', 'contact'].includes(selection.category ?? '') ? 'custom' : selection.category;
  const activeCategory = categories.find((category) => category.id === requestedCategory)?.id ?? (starterProductIds ? 'selection' : categories[0]?.id ?? 'reviews');
  const de = locale === "de";
  const [showAllStarters, setShowAllStarters] = useState(false);
  const choices = starterProductIds ? [{ id: 'selection' as const, label: de ? 'Ausgewählte Modelle' : 'Selected models' }, ...categories] : categories;
  const productsFor = (category: string) => category === 'selection'
    ? (starterProductIds ?? []).flatMap(id => products.find(product => product.id === id) ?? [])
    : products.filter(product => starterProductIds ? isInCatalogueGroup(product, category) : product.category === category).sort(category === 'custom' ? customExamplesFirst : () => 0);
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

  // Share only the natural title/description heights. Disclosure rows stay local
  // to each card, so expanding one never stretches the neighbouring cards.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || typeof ResizeObserver === "undefined") return;
    const headings = Array.from(rail.querySelectorAll<HTMLElement>("[data-card-heading]"));
    const descriptions = Array.from(rail.querySelectorAll<HTMLElement>("[data-card-description]"));
    const measure = () => {
      for (const [property, elements] of [
        ["--card-heading-height", headings],
        ["--card-description-height", descriptions],
      ] as const) {
        const height = Math.ceil(Math.max(0, ...elements.map(element => element.getBoundingClientRect().height)));
        rail.style.setProperty(property, `${height}px`);
      }
    };
    const observer = new ResizeObserver(measure);
    [...headings, ...descriptions].forEach(element => observer.observe(element));
    measure();
    return () => observer.disconnect();
  }, [railKey, locale, products, showAllStarters]);

  useEffect(() => {
    if (selectedProduct === null && returnFocusRef.current) {
      returnFocusRef.current.focus();
      returnFocusRef.current = null;
    }
  }, [selectedProduct]);

  const categoryProducts = productsFor(activeCategory);
  const canExpandStarters = activeCategory === 'selection' && !showAllStarters && categoryProducts.length > 3;
  const visibleProducts = canExpandStarters ? categoryProducts.slice(0, 3) : categoryProducts;
  const activeCategoryLabel =
    choices.find(({ id }) => id === activeCategory)?.label ?? "";
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
      <div className={styles.catalogFilters}>
      <div className={styles.mobileCategory}>
        <label className={styles.categoryPrompt} htmlFor={`${railId}-category`}>{labels.categoryPrompt}</label>
        <select id={`${railId}-category`} value={activeCategory} onChange={(event) => {
          setActiveProductIndex(0);
          setCatalogueSelection(event.target.value as ProductCategory | 'selection');
        }}>
          {choices.map(category => <option key={category.id} value={category.id}>{category.label}</option>)}
        </select>
      </div>
      <p className={styles.desktopCategoryPrompt}>{labels.categoryPrompt}</p>
      <div aria-label={labels.category} className={styles.categoryTabs} role="group">
        {choices.map((category) => {
          const productCount = productsFor(category.id).length;

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

      </div>



      {activeCategory === 'custom' ? <p className={styles.catalogDescription}>{de ? 'Die Karten mit individuellem Design ab CHF 99 sind Beispiele. Sie bestimmen die Gestaltung selbst oder lassen sie von mir entwerfen. Darunter finden Sie Modelle für weitere Anwendungen.' : 'The custom cards from CHF 99 show example designs. Choose your own design or let me create it for you. You will also find models for other uses below.'}</p> : null}
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
            detailsLabel={de ? "Ausführung und Masse" : "Design and dimensions"}
            actionLabel={de ? "Anfragen" : "Enquire"}
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

      {canExpandStarters ? <button className={styles.showMoreModels} type="button" onClick={() => setShowAllStarters(true)}>
        {de ? `Alle ${categoryProducts.length} ausgewählten Modelle anzeigen` : `Show all ${categoryProducts.length} selected models`}
      </button> : null}

      <details className={styles.deliveryFacts}>
        <summary>{de ? "Verfügbarkeit, Lieferung und Betreuung" : "Availability, delivery and support"}</summary>
        <p>{de ? "Standardprodukte ohne Ihr Logo oder Ihren Firmennamen sind bei mir an Lager. Modell, Menge und Versandtermin bestätige ich vor Ihrer Bestellung. Produkte mit Ihrem Logo oder individuellem Design erhalten Sie nach Absprache in der Regel innerhalb von 3–5 Wochen fertig eingerichtet." : "Standard products without your logo or business name are held in stock. I confirm the model, quantity and dispatch date before you order. Products with your logo or a custom design are normally delivered ready to use within 3–5 weeks, as agreed."}</p>
        <p>{de ? "Google-Bewertungskarten brauchen keine laufende Betreuung. Spätere Änderungen oder zusätzliche Hilfe vereinbaren wir bei Bedarf separat." : "Google review cards need no ongoing support. Later changes or extra help can be agreed separately if needed."}</p>
      </details>

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
