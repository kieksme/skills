// kieksme MCP server lint config (ESLint 9 flat config).
// Copy to the server repo root as `eslint.config.mjs`.
//
// Install: pnpm add -D eslint typescript-eslint
// Scripts: "lint": "eslint .", "lint:fix": "eslint . --fix"

import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", "build/**", "node_modules/**", "coverage/**"],
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      // Tool handlers legitimately return `unknown`-shaped API payloads;
      // require call sites to narrow before use instead of banning `any` outright.
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // console.log writes to stdout, which the stdio transport uses for JSON-RPC framing —
      // a stray log line corrupts the protocol stream. console.warn/error go to stderr and are safe.
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
);
