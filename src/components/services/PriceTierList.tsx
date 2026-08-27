import type { CSSProperties } from "react";

import type { PriceTier } from "../../content/types";
import { PriceDisplay } from "../ui/PriceDisplay";
import styles from "./services.module.css";

interface PriceTierListProps {
  readonly tiers: readonly PriceTier[];
  readonly priceLabel?: string;
  /** Wording for the single called-out tier, when the page offers a choice. */
  readonly recommendedLabel?: string;
}

export function PriceTierList({
  tiers,
  priceLabel,
  recommendedLabel,
}: PriceTierListProps) {
  // The badge occupies a line, so a tier that carries one would sit lower than
  // the tiers beside it and the prices a visitor compares across would stop
  // lining up. The row is therefore reserved on every tier -- but only on a
  // list that actually calls one out, so the review products keep their tight
  // spacing.
  const reservesBadgeRow =
    recommendedLabel !== undefined && tiers.some((tier) => tier.recommended);

  return (
    <ul className={styles.tiers}>
      {tiers.map((tier, index) => (
        <li
          className={`${styles.tier} ${
            tier.recommended ? styles.tierRecommended : ""
          }`}
          data-reveal="rise"
          key={tier.id}
          style={{ "--reveal-index": index } as CSSProperties}
        >
          {reservesBadgeRow ? (
            <p className={styles.tierBadge}>
              {tier.recommended ? recommendedLabel : null}
            </p>
          ) : null}
          <h3 className={styles.tierName}>{tier.name}</h3>
          <PriceDisplay label={priceLabel} price={tier.price} />
          <p className={styles.tierDescription}>{tier.description}</p>
          <ul className={styles.tierFeatures}>
            {tier.features.map((feature) => (
              <li className={styles.tierFeature} key={feature}>
                {feature}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
