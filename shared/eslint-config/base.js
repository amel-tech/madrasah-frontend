import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import turboPlugin from 'eslint-plugin-turbo'
import { configs } from 'typescript-eslint'
import onlyWarn from 'eslint-plugin-only-warn'
import stylistic from '@stylistic/eslint-plugin'

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const baseConfig = [
  js.configs.recommended,
  eslintConfigPrettier,
  stylistic.configs.recommended,
  ...configs.recommended,
  {
    plugins: {
      'turbo': turboPlugin,
      '@stylistic': stylistic,
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
  { ignores: ['archived/*', '**/build/', '**/dist/', 'node_modules/', 'public/build/', '.env', '.next/**'] },
]
