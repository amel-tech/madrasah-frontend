import { baseConfig } from '@madrasah/eslint-config/base'

const config = [
  ...baseConfig,
  {
    rules: {
      'no-restricted-imports': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
  {
    files: ['*.js', '*.ts'],
    rules: {
      'no-undef': 'off',
    },
  },
]

export default config
