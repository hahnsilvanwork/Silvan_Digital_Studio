import styles from "./ui.module.css";

interface PriceDisplayProps {
  readonly price: string;
  readonly label?: string;
}

/**
 * Prices are plain, always-rendered text. Nothing about them depends on hover,
 * expansion or client behaviour.
 */
export function PriceDisplay({ price, label }: PriceDisplayProps) {
  return (
    <p className={styles.price}>
      {label ? <span className={styles.priceLabel}>{label}</span> : null}
      <span className={styles.priceValue}>{price}</span>
    </p>
  );
}
