import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

import "@testing-library/jest-dom/vitest";

// Testing Library only registers its own cleanup when Vitest globals are on.
// Without this, rendered trees from one test stay in the document and the next
// query in the same file matches duplicated elements.
afterEach(cleanup);
