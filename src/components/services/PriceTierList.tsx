import type { CSSProperties } from "react";

import type { PriceTier } from "../../content/types";
import { PriceDisplay } from "../ui/PriceDisplay";
import styles from "./services.module.css";

interface PriceTierListProps {
  readonly tiers: readonly PriceTier[];
  readonly priceLabel?: string;
}

export function PriceTierList({ tiers, priceLabel }: PriceTierListProps) {
  return (
    <ul className={styles.tiers}>
      {tiers.map((tier, index) => (
        <li
          className={styles.tier}
          data-reveal="rise"
          key={tier.id}
          style={{ "--reveal-index": index } as CSSProperties}
        >
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
