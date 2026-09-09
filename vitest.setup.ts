import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import nextConfig from "./next.config";

// Next's CommonJS image runtime reads this fallback directly in component tests.
// Keep it aligned with production without putting an object into process.env.
Object.assign(imageConfigDefault, nextConfig.images);

import "@testing-library/jest-dom/vitest";

// Testing Library only registers its own cleanup when Vitest globals are on.
// Without this, rendered trees from one test stay in the document and the next
// query in the same file matches duplicated elements.
afterEach(cleanup);
