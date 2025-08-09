import { config } from '@madrasah/eslint-config/base';
import { rules } from 'eslint-config-prettier';

export default [
  ...config,
  {
    rules: {
      'no-restricted-imports': 'off',
    },
  },
];
