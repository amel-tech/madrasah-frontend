import { config } from "@madrasah/eslint-config/react-internal";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    rules: {
      "max-len": "off",
      "@typescript-eslint/no-use-before-define": "off",
      quotes: ["error", "double"],
    },
  },
];
