import { baseConfig } from '@madrasah/eslint-config/base'

const iconsConfig = [
  ...baseConfig,
  {
    rules: {
      'no-restricted-imports': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
]

export default iconsConfig
