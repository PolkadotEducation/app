import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettier from "eslint-plugin-prettier";
import pluginCypress from "eslint-plugin-cypress/flat";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
      },
      parser: parser,
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "writable",
        process: "readonly",
        require: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      cypress: pluginCypress,
      react: pluginReact,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": [2, { extensions: [".jsx", ".tsx"] }],
      "no-console": [
        "error",
        {
          allow: ["error"],
        },
      ],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "prettier/prettier": "error",
      "@typescript-eslint/no-explicit-any": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    ignores: [
      ".pnp.cjs",
      "node_modules/**",
      "dist/**",
      "build/**",
      ".next/**",
      ".github/**",
      ".storybook/**",
      ".yarn/**",
      "**/vendor/**",
    ],
  },
  pluginCypress.configs.recommended,
  pluginJs.configs.recommended,
  {
    files: ["prettier.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
];
