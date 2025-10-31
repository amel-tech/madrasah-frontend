/// <reference types="./@types/i18next" />
import * as i18next from 'i18next'

import { resources } from './locales'

export const defaultLanguage = 'en'

export const initI18n = ({ plugin, debug }: { plugin: i18next.Module, debug?: boolean }) =>
  i18next.use(plugin).init({
    resources,
    debug,
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
  })

export const i18n = i18next
