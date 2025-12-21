import { resources } from '@madrasah/i18n'

declare module 'next-intl' {
  interface AppConfig {
    Messages: {
      /* Loading only common and tedris namespaces
       to ensure type safety in `getTranslations` */
      common: typeof resources.en.common
      tedris: typeof resources.en.tedris
    }
  }
}
