import type { CSSProperties } from "react";

import type { ProcessStep } from "../../content/types";
import styles from "./services.module.css";

interface ProcessStepsProps {
  readonly steps: readonly ProcessStep[];
}

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <ol className={styles.process}>
      {steps.map((step, index) => (
        <li
          className={styles.processStep}
          data-reveal="rise"
          key={step.id}
          style={{ "--reveal-index": index } as CSSProperties}
        >
          <span className={styles.processLabel}>{step.label}</span>
          <h3 className={styles.processTitle}>{step.title}</h3>
          <p className={styles.processDescription}>{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
