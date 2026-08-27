import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import postcss, { type Declaration, type Root } from "postcss";
import { describe, expect, it } from "vitest";

const stylesheetPaths = [
  "src/app/globals.css",
  "src/styles/layout.module.css",
  "src/styles/pages.module.css",
  "src/styles/motion.css",
] as const;

const stylesheets = stylesheetPaths.map((path) => {
  const absolutePath = resolve(process.cwd(), path);
  const source = readFileSync(absolutePath, "utf8");

  return {
    path,
    source,
    root: postcss.parse(source, { from: absolutePath }),
  };
});

const stylesheetSource = stylesheets
  .map(({ source }) => source)
  .join("\n")
  .toLowerCase();

const stylesheetByPath = new Map(
  stylesheets.map((stylesheet) => [stylesheet.path, stylesheet]),
);
const globals = stylesheetByPath.get("src/app/globals.css")!;
const layout = stylesheetByPath.get("src/styles/layout.module.css")!;
const pages = stylesheetByPath.get("src/styles/pages.module.css")!;

const importerSource = readFileSync(
  resolve(process.cwd(), "scripts/import-mockup-assets.ps1"),
  "utf8",
);
const portraitReadme = readFileSync(
  resolve(process.cwd(), "public/images/portrait/README.md"),
  "utf8",
);
const projectReadmePath = resolve(
  process.cwd(),
  "public/images/projects/README.md",
);
const projectReadme = existsSync(projectReadmePath)
  ? readFileSync(projectReadmePath, "utf8")
  : "";
const packageJson = JSON.parse(
  readFileSync(resolve(process.cwd(), "package.json"), "utf8"),
) as { devDependencies?: Record<string, string> };

const assets = [
  {
    fileName: "products/review-cards.png",
    bytes: 374_204,
    width: 1_000,
    height: 1_000,
    mime: "image/png",
    sha256: "D29E0ED19F4520DC6EB9D51AB9468EDF4B463441FA5705C99C4E0E799B3F7622",
  },
  {
    fileName: "products/review-stands.png",
    bytes: 540_492,
    width: 1_080,
    height: 1_080,
    mime: "image/png",
    sha256: "AA1BBCAA30D76A3D516BAEF948B745F4DF097F3FD8F47607E5A58C75F79E56DE",
  },
  {
    fileName: "projects/archa.jpg",
    bytes: 40_918,
    width: 512,
    height: 279,
    mime: "image/jpeg",
    sha256: "7B2D8F8F7C11A00BB0B2A6BAB40A12614D9A217EDEA2922ABC7FC174ED86CE3F",
  },
  {
    fileName: "projects/lumen.jpg",
    bytes: 15_505,
    width: 512,
    height: 279,
    mime: "image/jpeg",
    sha256: "C6CC75CD14762FC45BA9A9444256F43F883547321A81AD9439CC950E519B4EAE",
  },
  {
    fileName: "projects/architech-studio.jpg",
    bytes: 32_765,
    width: 512,
    height: 279,
    mime: "image/jpeg",
    sha256: "0F8F449BC10FF69160528AF13DABCBA8BD0D41D44EAC0392E3E18BF2AE016953",
  },
  {
    fileName: "projects/vanguard-apparel.jpg",
    bytes: 30_523,
    width: 512,
    height: 279,
    mime: "image/jpeg",
    sha256: "F9C235D52848F63C585FA95FDB11A0C5385F05174C80C2A0383E4C13F3AD2D87",
  },
] as const;

function declarationValues(
  root: Root,
  selectorFragment: string,
  property: string,
) {
  const values: string[] = [];

  root.walkRules((rule) => {
    if (!rule.selector.includes(selectorFragment)) return;

    rule.walkDecls(property, (declaration) => {
      values.push(declaration.value);
    });
  });

  return values;
}

function customProperty(root: Root, selector: string, property: string) {
  let value: string | undefined;

  root.walkRules((rule) => {
    if (rule.selector !== selector) return;
    rule.walkDecls(property, (declaration) => {
      value = declaration.value.toLowerCase();
    });
  });

  return value;
}

function contrastRatio(foreground: string, background: string) {
  const luminance = (hex: string) => {
    const channels = hex
      .slice(1)
      .match(/.{2}/g)!
      .map((channel) => Number.parseInt(channel, 16) / 255)
      .map((channel) =>
        channel <= 0.04045
          ? channel / 12.92
          : ((channel + 0.055) / 1.055) ** 2.4,
      );

    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));

  return (lighter + 0.05) / (darker + 0.05);
}

function decodeImage(buffer: Buffer) {
  const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buffer.subarray(0, 8).equals(pngSignature)) {
    return {
      mime: "image/png",
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    const startOfFrameMarkers = new Set([
      0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd,
      0xce, 0xcf,
    ]);
    let offset = 2;

    while (offset < buffer.length) {
      while (buffer[offset] === 0xff) offset += 1;
      const marker = buffer[offset];
      offset += 1;

      if (marker === 0xd9 || marker === 0xda) break;
      const segmentLength = buffer.readUInt16BE(offset);

      if (startOfFrameMarkers.has(marker)) {
        return {
          mime: "image/jpeg",
          width: buffer.readUInt16BE(offset + 5),
          height: buffer.readUInt16BE(offset + 3),
        };
      }

      offset += segmentLength;
    }
  }

  throw new TypeError("Unsupported or malformed design asset");
}

function transitionedProperty(declaration: Declaration) {
  if (declaration.prop === "transition-property") {
    return declaration.value.split(",").map((property) => property.trim());
  }

  if (declaration.prop === "transition") {
    return declaration.value
      .split(",")
      .map((transition) => transition.trim().split(/\s+/)[0]);
  }

  return [];
}

describe("SILVAN responsive design contract", () => {
  it("loads every required stylesheet and parses it with PostCSS", () => {
    expect(stylesheets.map(({ path }) => path)).toEqual(stylesheetPaths);
    expect(stylesheets.every(({ root }) => root.type === "root")).toBe(true);
    expect(packageJson.devDependencies?.postcss).toEqual(expect.any(String));
  });

  it("defines the approved palette and fluid responsive foundations", () => {
    expect(stylesheetSource).toContain("#f9f8f6");
    expect(stylesheetSource).toContain("#1a1a1a");
    expect(stylesheetSource).toContain("#0047ff");
    expect(stylesheetSource).toContain("clamp(");
    expect(stylesheetSource).toMatch(/100(?:dvh|svh)/);
    expect(stylesheetSource).toMatch(/env\(safe-area-inset-(?:top|right|bottom|left)\)/);
    expect(stylesheetSource).toContain("prefers-reduced-motion");
  });

  it("provides surface-aware two-layer focus rings with 3:1 contrast", () => {
    const paper = customProperty(globals.root, ":root", "--color-paper") as string;
    const ink = customProperty(globals.root, ":root", "--color-ink") as string;
    const paperFocus = customProperty(
      globals.root,
      ":root",
      "--focus-ring-outer",
    ) as string;
    const darkFocus = customProperty(
      pages.root,
      ".darkBand",
      "--focus-ring-outer",
    ) as string;
    const focusOutline = declarationValues(
      globals.root,
      ":focus-visible",
      "outline",
    );
    const focusShadow = declarationValues(
      globals.root,
      ":focus-visible",
      "box-shadow",
    );

    expect([paper, ink, paperFocus, darkFocus]).toEqual([
      "#f9f8f6",
      "#1a1a1a",
      "#0047ff",
      "#f9f8f6",
    ]);
    expect(contrastRatio(paperFocus, paper)).toBeGreaterThanOrEqual(3);
    expect(contrastRatio(darkFocus, ink)).toBeGreaterThanOrEqual(3);
    expect(focusOutline.some((value) => value.includes("--focus-ring-outer"))).toBe(
      true,
    );
    expect(focusShadow.some((value) => value.includes("--focus-ring-inner"))).toBe(
      true,
    );
  });

  it.each(["48rem", "64rem", "80rem", "96rem"])(
    "progressively enhances from the %s breakpoint",
    (breakpoint) => {
      const queries: string[] = [];
      for (const { root } of stylesheets) {
        root.walkAtRules("media", (rule) => {
          queries.push(rule.params);
        });
      }

      expect(queries).toContain(`(min-width: ${breakpoint})`);
    },
  );

  it("keeps touch targets explicit, semantic, and at least 44 by 44", () => {
    expect(
      customProperty(globals.root, ":root", "--control-target-min"),
    ).toBe("2.75rem");
    expect(
      declarationValues(
        globals.root,
        "[data-touch-target]",
        "min-block-size",
      ),
    ).toContain("var(--control-target-min)");
    expect(
      declarationValues(
        globals.root,
        "[data-touch-target]",
        "min-inline-size",
      ),
    ).toContain("var(--control-target-min)");
    expect(
      declarationValues(globals.root, "[data-touch-target]", "touch-action"),
    ).toContain("manipulation");
  });

  it("prevents intrinsic overflow without masking layout defects", () => {
    for (const [root, selector] of [
      [globals.root, "body"],
      [layout.root, ".shell"],
      [layout.root, ".container"],
    ] as const) {
      const overflow = [
        ...declarationValues(root, selector, "overflow"),
        ...declarationValues(root, selector, "overflow-x"),
        ...declarationValues(root, selector, "overflow-inline"),
      ];

      expect(overflow).not.toContain("clip");
      expect(overflow).not.toContain("hidden");
    }

    for (const selector of [".grid12 > *", ".asymmetric > *"]) {
      expect(declarationValues(layout.root, selector, "min-inline-size")).toContain(
        "0",
      );
    }

    expect(declarationValues(pages.root, ".hero > *", "min-inline-size")).toContain(
      "0",
    );
    expect(declarationValues(globals.root, "h1", "overflow-wrap")).toContain(
      "anywhere",
    );
    expect(
      declarationValues(globals.root, "[data-touch-target]", "overflow-wrap"),
    ).toContain("anywhere");
    expect(declarationValues(pages.root, ".projectMedia", "overflow")).toContain(
      "clip",
    );
  });

  it("keeps universal shrink guards below every control minimum", () => {
    // `min-inline-size: 0` lets a grid child shrink below its content width, but a
    // control that happens to be a direct grid child must keep its 44px minimum.
    // Wrapping the guard in :where() drops it to zero specificity so it can never
    // outrank the control rule, whatever the stylesheet order ends up being.
    const guards: string[] = [];

    for (const { root } of [layout, pages]) {
      root.walkRules((rule) => {
        rule.walkDecls("min-inline-size", (declaration) => {
          if (declaration.value !== "0") return;
          if (!rule.selector.includes("> *")) return;

          guards.push(rule.selector);
        });
      });
    }

    expect(guards.length).toBeGreaterThan(0);
    expect(guards.filter((selector) => !selector.startsWith(":where("))).toEqual([]);
  });

  it("presents low-resolution project concepts without cropping or upscaling", () => {
    const directMediaSelector = ".projectMedia >";

    expect(declarationValues(pages.root, ".projectMedia", "aspect-ratio")).not.toContain(
      "4 / 5",
    );
    expect(
      declarationValues(pages.root, directMediaSelector, "max-inline-size"),
    ).toContain("min(100%, 32rem)");
    expect(declarationValues(pages.root, directMediaSelector, "object-fit")).toContain(
      "contain",
    );
    expect(
      declarationValues(pages.root, directMediaSelector, "object-position"),
    ).toContain("var(--project-media-object-position)");

    for (const project of [
      "archa",
      "lumen",
      "architech-studio",
      "vanguard-apparel",
    ]) {
      expect(
        declarationValues(
          pages.root,
          `.projectMedia[data-project="${project}"]`,
          "--project-media-object-position",
        ),
      ).toHaveLength(1);
    }

    expect(projectReadme).toContain("512×279");
    expect(projectReadme).toContain("32rem");
    expect(projectReadme).toContain("object-position");
  });

  it("keeps the dvh hero enhancement after wider svh overrides", () => {
    const source = pages.source.toLowerCase();

    expect(source).toContain("92svh");
    expect(source).toContain("92dvh");
    expect(source.lastIndexOf("92dvh")).toBeGreaterThan(source.lastIndexOf("92svh"));
  });

  it("uses only transform and opacity for reusable motion", () => {
    const allowedProperties = new Set(["opacity", "transform"]);
    const transitionedProperties: string[] = [];
    const keyframeProperties: string[] = [];
    const willChangeDeclarations: string[] = [];

    for (const { root } of stylesheets) {
      root.walkDecls((declaration) => {
        transitionedProperties.push(...transitionedProperty(declaration));
        if (declaration.prop === "will-change") {
          willChangeDeclarations.push(declaration.value);
        }
      });
      root.walkAtRules((atRule) => {
        if (!atRule.name.endsWith("keyframes")) return;
        atRule.walkDecls((declaration) => {
          keyframeProperties.push(declaration.prop);
        });
      });
    }

    expect(transitionedProperties.length).toBeGreaterThan(0);
    expect(keyframeProperties.length).toBeGreaterThan(0);
    expect(
      [...transitionedProperties, ...keyframeProperties].filter(
        (property) => !allowedProperties.has(property),
      ),
    ).toEqual([]);
    expect(transitionedProperties).not.toContain("all");
    expect(willChangeDeclarations).toEqual([]);
    expect(stylesheetSource).not.toMatch(/animation(?:-[^:]+)?:[^;]*\binfinite\b/);
  });

  it.each(assets)(
    "pins and decodes $fileName",
    ({ fileName, bytes, width, height, mime, sha256 }) => {
      const asset = readFileSync(
        resolve(process.cwd(), "public/images", fileName),
      );

      expect(asset.length).toBe(bytes);
      expect(createHash("sha256").update(asset).digest("hex").toUpperCase()).toBe(
        sha256,
      );
      expect(decodeImage(asset)).toEqual({ mime, width, height });

      if (fileName.startsWith("projects/")) {
        expect(importerSource).toContain(`ExpectedBytes = ${bytes}`);
        expect(importerSource).toContain(`ExpectedSha256 = "${sha256}"`);
      }
    },
  );

  it("validates response origin and body before replacing an imported target", () => {
    const responseUriCheck = importerSource.indexOf(
      "Assert-ApprovedAssetUri -Uri $response.RequestMessage.RequestUri",
    );
    const boundedCopy = importerSource.indexOf("Install-ApprovedAssetStream");
    const replacement = importerSource.lastIndexOf("Move-Item");

    expect(responseUriCheck).toBeGreaterThanOrEqual(0);
    expect(boundedCopy).toBeGreaterThan(responseUriCheck);
    expect(replacement).toBeGreaterThan(boundedCopy);
    expect(importerSource).toContain("$asset.ExpectedBytes + 1");
    // The token has to reach the request itself, otherwise cancelling on an
    // oversized body would abandon a download that keeps streaming.
    expect(importerSource).toMatch(
      /GetAsync\([\s\S]*?\$CancellationTokenSource\.Token/,
    );
    expect(importerSource).toContain("$CancellationTokenSource.Cancel()");
  });

  it("keeps mobile-first queries, safe areas, and the portrait placeholder label", () => {
    expect(stylesheetSource).not.toMatch(/@media\s*\([^)]*max-width\s*:/);
    for (const edge of ["top", "right", "bottom", "left"]) {
      expect(stylesheetSource).toContain(`env(safe-area-inset-${edge})`);
    }
    expect(portraitReadme).toContain("PORTRÄT FOLGT / PORTRAIT TO FOLLOW");
  });
});
