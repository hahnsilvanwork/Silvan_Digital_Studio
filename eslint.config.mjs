import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([
    ".next/**",
    // Git worktrees carry their own full checkout, including an installed
    // .next and any scratch files. Linting from the repository root walked
    // into them and reported ~15,000 problems that belong to a build output,
    // not to this source tree.
    ".worktrees/**",
    ".scratch/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
  ]),
]);
