import Image from "next/image";

import type { NfcProduct } from "../../content/types";
import styles from "./products.module.css";

interface ProductCardProps {
  readonly product: NfcProduct;
  readonly index: number;
  readonly view3dLabel: string;
  readonly comingSoonLabel: string;
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
        {product.scene ? (
          <button
            className={styles.view3dButton}
            data-touch-target
            onClick={(event) => onView3D(product, event.currentTarget)}
            type="button"
          >
            {view3dLabel}
            <span aria-hidden="true"> ↗</span>
          </button>
        ) : (
          <p className={styles.comingSoon}>{comingSoonLabel}</p>
        )}
      </div>
    </article>
  );
}
