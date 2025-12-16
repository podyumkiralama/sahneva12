// eslint.config.mjs veya eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import nextConfig from "eslint-config-next";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1) Ignore klasörleri
  {
    ignores: ["**/.next/**", "node_modules/**"],
  },

  // 2) Temel JS ayarları
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    extends: [js.configs.recommended],
  },

  // 3) Next + React önerilen kurallar
  // eslint-config-next flat yapı, şu şekilde ekleniyor:
  ...nextConfig, // (core + core-web-vitals setini getirir)

  // 4) React plugin (extra)
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],

  // 5) Proje özel kurallar
  {
    settings: { react: { version: "detect" } },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/refs": "off",
      "@next/next/no-img-element": "off",
      "react-hooks/static-components": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/jsx-no-target-blank": "off",
      // İstersen erişilebilirlik için bunları açarsın:
      // "react-hooks/rules-of-hooks": "error",
      // "react-hooks/exhaustive-deps": "warn",
    },
  },
]);
