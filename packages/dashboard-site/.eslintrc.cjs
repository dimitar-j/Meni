/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const prettierConfig = require("./prettier.config.cjs");

const project = path.join(__dirname, "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:promise/recommended",
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project,
      },
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project,
  },
  plugins: ["@typescript-eslint", "prettier", "promise"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    eqeqeq: ["error", "smart"],
    "prettier/prettier": ["error", prettierConfig],
    "no-eval": "error",
    "no-var": "error",
    // "prettier/prettier": "error",
    "no-restricted-imports": ["error", { patterns: [".*"] }],
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "off", // tcss prettier plugin handles this
  },
};

module.exports = config;
