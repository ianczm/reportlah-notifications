import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    parser: "@typescript-eslint/parser",
    extends: [
      "prettier",
      "plugin:tailwindcss/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "next/core-web-vitals",
      "next/typescript",
    ],
    plugins: ["import", "@typescript-eslint"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "@app/**",
              group: "external",
              position: "after",
            },
          ],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          named: {
            enabled: true,
            types: "types-first",
          },
        },
      ],
    },
    overrides: [
      {
        files: ["*.ts", "*.tsx"],
        rules: {
          "no-undef": "off",
        },
      },
    ],
    ignorePatterns: ["src/app/(payload)/*"],
  }),
];

export default eslintConfig;
