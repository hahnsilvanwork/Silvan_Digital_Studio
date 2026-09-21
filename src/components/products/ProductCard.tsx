import Image from "next/image";

import type { NfcProduct } from "../../content/types";
import styles from "./products.module.css";
import { requestCatalogueModel } from "../reviews/use-catalogue-selection";
import type { MouseEvent } from "react";

interface ProductCardProps {
  readonly product: NfcProduct;
  readonly index: number;
  readonly view3dLabel: string;
  readonly comingSoonLabel: string;
  readonly requestModelLabel?: string;
  readonly detailsLabel?: string;
  readonly actionLabel?: string;
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
  detailsLabel = "Details",
  actionLabel,
}: ProductCardProps) {
  const [name, ...variant] = product.title.split(" · ");
  const requestHref = `?category=${encodeURIComponent(product.category)}&model=${encodeURIComponent(product.id)}#inquiry`;
  const request = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    requestCatalogueModel(product.category, product.id);
  };
  return (
    <article
      className={styles.catalogCard}
      data-product-card
      data-product-index={index}
    >
      <div className={styles.catalogMedia}>
        {requestModelLabel ? <a className={styles.catalogImageLink} href={requestHref} onClick={request} aria-label={`${requestModelLabel}: ${product.title}`}>
          <Image alt={product.image.alt} className={styles.catalogImage} fill loading="lazy" sizes="(min-width: 72rem) 29vw, (min-width: 44rem) 45vw, 82vw" src={product.image.src} />
        </a> :
        <Image
          alt={product.image.alt}
          className={styles.catalogImage}
          fill
          loading="lazy"
          sizes="(min-width: 72rem) 29vw, (min-width: 44rem) 45vw, 82vw"
          src={product.image.src}
        />}
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
      <div className={styles.catalogCardBody}>
        <div className={styles.catalogCardHeading} data-card-heading>
          <h3 aria-label={product.title}>{name}{variant.length ? <span>{variant.join(" · ")}</span> : null}</h3>
        </div>
        <p className={styles.catalogDescription} data-card-description>{product.description}</p>
        <details className={styles.productSpecs}>
          <summary>{detailsLabel}<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6 9 6 6 6-6" /></svg></summary>
        <ul className={styles.catalogDetails}>
          {product.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        </details>
        <div className={styles.cardPurchase}>
          <p className={styles.catalogPrice}>{product.price}</p>
        {requestModelLabel ? <a
          className={styles.requestModel}
          aria-label={requestModelLabel}
          data-touch-target
          href={requestHref}
          onClick={request}
        ><span>{actionLabel ?? requestModelLabel}</span><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h15m-6-6 6 6-6 6" /></svg></a> : null}
        </div>
      </div>
    </article>
  );
}
