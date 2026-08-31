export const SPLINE_VIEWER_SCRIPT_ID = "spline-viewer-runtime";
export const SPLINE_VIEWER_SCRIPT_URL =
  "https://cdn.spline.design/@splinetool/viewer@2.0.16/build/spline-viewer.js";

let runtimePromise: Promise<void> | undefined;

export function loadSplineViewer(): Promise<void> {
  if (customElements.get("spline-viewer")) return Promise.resolve();
  if (runtimePromise) return runtimePromise;

  runtimePromise = new Promise<void>((resolve, reject) => {
    let script = document.getElementById(
      SPLINE_VIEWER_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (script?.dataset.status === "error") {
      script.remove();
      script = null;
    }

    script ??= document.createElement("script");

    const cleanup = () => {
      script.removeEventListener("load", loaded);
      script.removeEventListener("error", failed);
    };
    const loaded = () => {
      cleanup();
      script.dataset.status = "loaded";
      customElements.whenDefined("spline-viewer").then(() => resolve());
    };
    const failed = () => {
      cleanup();
      script.dataset.status = "error";
      script.remove();
      reject(new Error("Spline Viewer runtime failed to load"));
    };

    script.addEventListener("load", loaded, { once: true });
    script.addEventListener("error", failed, { once: true });

    if (script.dataset.status === "loaded") {
      loaded();
      return;
    }

    if (!script.isConnected) {
      script.id = SPLINE_VIEWER_SCRIPT_ID;
      script.type = "module";
      script.src = SPLINE_VIEWER_SCRIPT_URL;
      script.async = true;
      document.head.append(script);
    }
  }).catch((error: unknown) => {
    runtimePromise = undefined;
    throw error;
  });

  return runtimePromise;
}
