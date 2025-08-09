import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import onlyWarn from 'eslint-plugin-only-warn';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginPrettier.configs.recommended.rules,
    },
  },
  {
    // Custom project rules migrated from legacy .eslintrc.js (non-React specific)
    rules: {
      // TypeScript rules - Let TypeScript handle unused vars detection
      'no-unused-vars': 'off', // Disable base rule as it can report incorrect errors
      '@typescript-eslint/no-unused-vars': 'off', // Let TypeScript's noUnusedLocals handle this
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-empty-function': 'off',

      // Code style rules
      quotes: ['error', 'single'],
      'func-names': ['error'],
      'max-len': [2, 200, 2],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],

      // General JavaScript rules
      'no-plusplus': 'off',
      radix: 'off',
      'no-empty': 'off',
      'no-console': 'off',
      'consistent-return': 'off',
      'no-restricted-globals': 'off',
      'no-use-before-define': 'off',
      'comma-dangle': 'off',
      'consistent-this': [0, 'component'],
      'no-self-compare': 'off',
      'no-return-assign': 'off',
      camelcase: 'off',
      'prefer-destructuring': 'off',
      'no-throw-literal': 'off',
      'no-mixed-spaces-and-tabs': 'off',
      'no-tabs': 'off',
      'no-underscore-dangle': 'off',

      // Import rules
      'import/no-cycle': 'off',

      // Project-specific restrictions
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@phosphor-icons/*'],
              message: 'Please use @madrasah/icons instead of direct Phosphor Icons imports.',
            },
          ],
        },
      ],
    },
  },
  {
    ignores: ['dist/**'],
  },
];
