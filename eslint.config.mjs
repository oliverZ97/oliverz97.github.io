import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{ts,tsx}"],
        plugins: {
            react: reactPlugin,
            "react-hooks": hooksPlugin,
        },
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.json"],
            },
        },
        rules: {
            ...hooksPlugin.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            "react/react-in-jsx-scope": "off", // Not needed in modern React
        },
    },
    // MUST be last to override stylistic rules
    eslintConfigPrettier,
);