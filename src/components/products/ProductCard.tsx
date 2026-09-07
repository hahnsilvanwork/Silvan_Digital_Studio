import Image from "next/image";

import type { NfcProduct } from "../../content/types";
import styles from "./products.module.css";
import { setCatalogueSelection } from "../reviews/use-catalogue-selection";

interface ProductCardProps {
  readonly product: NfcProduct;
  readonly index: number;
  readonly view3dLabel: string;
  readonly comingSoonLabel: string;
  readonly requestModelLabel?: string;
  readonly onView3D: (
    product: NfcProduct,
    trigger: HTMLButtonElement,
  ) => void;
}

export function ProductCard({
  product,
  index,
  view3dLabel,
  comingSoonLabel,
  onView3D,
  requestModelLabel,
}: ProductCardProps) {
  return (
    <article
      className={styles.catalogCard}
      data-product-card
      data-product-index={index}
    >
      <div className={styles.catalogMedia}>
        <Image
          alt={product.image.alt}
          className={styles.catalogImage}
          fill
          loading="lazy"
          sizes="(min-width: 72rem) 29vw, (min-width: 44rem) 45vw, 82vw"
          src={product.image.src}
        />
      </div>
      <div className={styles.catalogCardBody}>
        <div className={styles.catalogCardHeading}>
          <h3>{product.title}</h3>
          <p className={styles.catalogPrice}>{product.price}</p>
        </div>
        <p className={styles.catalogDescription}>{product.description}</p>
        <ul className={styles.catalogDetails}>
          {product.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        {requestModelLabel ? <a
          className={styles.requestModel}
          data-touch-target
          href={`?category=${encodeURIComponent(product.category)}&model=${encodeURIComponent(product.id)}#inquiry`}
          onClick={(event) => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
            event.preventDefault();
            setCatalogueSelection(product.category, product.id);
            window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#inquiry`);
            document.getElementById("inquiry")?.scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"});
          }}
        >{requestModelLabel}</a> : null}
        {product.scene ? (
          <button
            className={styles.view3dButton}
            data-touch-target
            onClick={(event) => onView3D(product, event.currentTarget)}
            type="button"
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" focusable="false">
              <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
              <path d="m4 7.5 8 4.5 8-4.5M12 12v9M8 5.25l8 4.5" />
            </svg>
            <span>{view3dLabel}</span>
          </button>
        ) : (
          <p className={styles.comingSoon}>{comingSoonLabel}</p>
        )}
      </div>
    </article>
  );
}
