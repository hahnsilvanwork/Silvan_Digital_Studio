"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { NfcProduct } from "../../content/types";
import { SplineProduct } from "./SplineProduct";
import { SplineSceneProvider } from "./SplineSceneProvider";
import styles from "./products.module.css";

export interface Product3DLabels {
  readonly close: string;
  readonly loading: string;
  readonly error: string;
  readonly retry: string;
  readonly interact: string;
}

interface Product3DDialogProps {
  readonly product: NfcProduct;
  readonly labels: Product3DLabels;
  readonly onClose: () => void;
}

export function Product3DDialog({
  product,
  labels,
  onClose,
}: Product3DDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeFrameRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [stageReady, setStageReady] = useState(false);
  const [closing, setClosing] = useState(false);
  const scene = product.scene;

  const requestClose = useCallback(() => {
    if (closing) return;

    // Keep the dialog measurable for one committed render after deactivating
    // Spline. This lets its application stop before the custom element leaves
    // the document and can never expose WebGPU to a 0 × 0 canvas.
    setClosing(true);
    closeFrameRef.current = window.requestAnimationFrame(onClose);
  }, [closing, onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");

    const stage = stageRef.current;
    let observer: ResizeObserver | undefined;
    let measureFrame = 0;

    const measure = () => {
      const bounds = stage?.getBoundingClientRect();
      setStageReady(Boolean(bounds && bounds.width > 0 && bounds.height > 0));
    };

    if (stage && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(([entry]) => {
        const bounds = entry?.contentRect;
        setStageReady(Boolean(bounds && bounds.width > 0 && bounds.height > 0));
      });
      observer.observe(stage);
    } else {
      measureFrame = window.requestAnimationFrame(measure);
    }

    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(measureFrame);
      window.cancelAnimationFrame(closeFrameRef.current);
      if (dialog.open && typeof dialog.close === "function") dialog.close();
    };
  }, []);

  if (!scene) return null;

  return (
    <dialog
      aria-labelledby={`product-3d-title-${product.id}`}
      className={styles.productDialog}
      data-closing={closing ? "true" : "false"}
      data-product-3d-dialog
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
      ref={dialogRef}
    >
      <div className={styles.dialogHeader}>
        <div>
          <p className={styles.dialogEyebrow}>3D</p>
          <h2 id={`product-3d-title-${product.id}`}>{product.title}</h2>
        </div>
        <button
          aria-label={labels.close}
          className={styles.dialogClose}
          data-touch-target
          onClick={requestClose}
          type="button"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className={styles.dialogStage} data-product-3d-stage ref={stageRef}>
        <Image
          alt=""
          aria-hidden="true"
          className={styles.dialogStill}
          data-hidden={ready ? "true" : "false"}
          fill
          sizes="(min-width: 48rem) 60rem, 100vw"
          src={scene.fallbackImage}
        />
        {stageReady && !failed ? (
          <div className={styles.dialogViewer} key={attempt}>
            <SplineSceneProvider>
              <SplineProduct
                active={!closing}
                allowReducedMotion
                ariaLabel={scene.ariaLabel}
                onError={() => setFailed(true)}
                onReady={() => setReady(true)}
                sceneUrl={scene.url}
              />
            </SplineSceneProvider>
          </div>
        ) : null}
        {!ready && !failed ? (
          <p aria-live="polite" className={styles.dialogStatus}>
            {labels.loading}
          </p>
        ) : null}
        {failed ? (
          <div className={styles.dialogError} role="alert">
            <p>{labels.error}</p>
            <button
              data-touch-target
              onClick={() => {
                setFailed(false);
                setReady(false);
                setAttempt((current) => current + 1);
              }}
              type="button"
            >
              {labels.retry}
            </button>
          </div>
        ) : null}
      </div>
      <p className={styles.dialogHint}>{labels.interact}</p>
    </dialog>
  );
}
