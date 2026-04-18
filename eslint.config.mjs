import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier";
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["docs/"],
    plugins: {
      react: reactPlugin,
      "react-hooks": hooksPlugin,
      "unused-imports": unusedImports,
    },
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "react/display-name": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "react-hooks/immutability": "off",
      "react/react-in-jsx-scope": "off", // Not needed in modern React
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  // MUST be last to override stylistic rules
  eslintConfigPrettier,
);
