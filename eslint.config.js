import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import tailwindcss from "eslint-plugin-tailwindcss";
import typescriptSortKeys from "eslint-plugin-typescript-sort-keys";
import tseslint from "typescript-eslint";

import js from "@eslint/js";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["node_modules", "dist", "build", ".next"],
  },
  {
    plugins: {
      tailwindcss,
      prettier,
      "typescript-sort-keys": typescriptSortKeys,
      "sort-destructure-keys": sortDestructureKeys,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "prettier/prettier": "error",
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^react", "^next"],

            ["^[a-z]"],

            ["^@components", "^@constants", "^@hooks", "^@types", "^@utils"],

            ["^.+\\.s?css$"],

            ["^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
      "sort-destructure-keys/sort-destructure-keys": ["warn", { caseSensitive: false }],
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off",
      "typescript-sort-keys/interface": [
        "warn",
        "asc",
        {
          caseSensitive: true,
          natural: true,
          requiredFirst: false,
        },
      ],
      "typescript-sort-keys/string-enum": [
        "warn",
        "asc",
        {
          caseSensitive: true,
          natural: true,
        },
      ],
    },
  },
];
