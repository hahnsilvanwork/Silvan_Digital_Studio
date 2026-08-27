import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import RootLayout, { metadata, viewport } from "./layout";

vi.mock("./fonts", () => ({
  rootFontVariables: "font-variables",
}));

describe("layout contract", () => {
  it("defines the German document and required metadata", () => {
    const markup = renderToStaticMarkup(
      <RootLayout>
        <main />
      </RootLayout>,
    );

    expect(markup).toContain('<html lang="de">');
    expect(markup).toContain('<body class="font-variables">');
    expect(metadata.title).toBe("SILVAN Digital Studio");
    expect(metadata.description).toBe(
      "Digitale Lösungen für mehr Sichtbarkeit und weniger wiederkehrende Arbeit.",
    );
    expect(viewport.width).toBe("device-width");
    expect(viewport.initialScale).toBe(1);
    expect(viewport.viewportFit).toBe("cover");
  });
});
