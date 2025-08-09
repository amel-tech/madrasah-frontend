import { FlatCompat } from '@eslint/eslintrc';
import { config as reactConfig } from './react-internal.js';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  ...reactConfig,
  ...compat.config({
    extends: ['next', 'next/core-web-vitals'],
    settings: {
      next: {
        rootDir: 'apps/tedris',
      },
    },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
    },
  }),
  {
    // Override Next.js default no-unused-vars config - let TypeScript handle this instead
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    ignores: ['**/.next/*'],
  },
];
