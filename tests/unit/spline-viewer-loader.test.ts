import { describe, expect, it } from "vitest";

import {
  SPLINE_VIEWER_SCRIPT_ID,
  SPLINE_VIEWER_SCRIPT_URL,
  loadSplineViewer,
} from "../../src/components/products/spline-viewer-loader";

describe("loadSplineViewer", () => {
  it("shares one version-pinned module script between callers", async () => {
    const first = loadSplineViewer();
    const second = loadSplineViewer();
    const scripts = document.querySelectorAll(`#${SPLINE_VIEWER_SCRIPT_ID}`);
    const script = scripts[0] as HTMLScriptElement;

    expect(scripts).toHaveLength(1);
    expect(script.type).toBe("module");
    expect(script.src).toBe(SPLINE_VIEWER_SCRIPT_URL);
    expect(first).toBe(second);

    if (!customElements.get("spline-viewer")) {
      customElements.define("spline-viewer", class extends HTMLElement {});
    }
    script.dispatchEvent(new Event("load"));

    await expect(first).resolves.toBeUndefined();
  });
});
