import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: parser,
      globals: {
        ...globals.browser,
        process: "readonly",
        React: "writable",
        require: "readonly",
      },
    },
    plugins: {
      react: pluginReact,
      "@typescript-eslint": tseslint,
    },
    rules: {
      "max-len": ["warn", { code: 120 }],
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": [2, { extensions: [".jsx", ".tsx"] }],
      "no-console": [
        "error",
        {
          allow: ["error"],
        },
      ],
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
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    files: ["prettier.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
];
