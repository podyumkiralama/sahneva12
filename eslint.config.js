import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
]);

/** Extra React/a11y linting (kept minimal to avoid false positives during refactors) */
// You can uncomment and tune these if you want stricter rules later.
// export default defineConfig([
//   ...,
//   {
//     settings: { react: { version: "detect" } },
//     rules: {
//       "react-hooks/rules-of-hooks": "error",
//       "react-hooks/exhaustive-deps": "warn",
//     },
//   },
// ]);
