import { i18nBuilder } from 'keycloakify/login/i18n'
// We cannot import translations from external file, as keycloak requires it to be inline!
import type { ThemeName } from '../kc.gen'

/** @see: https://docs.keycloakify.dev/features/i18n */
const i18n = i18nBuilder.withThemeName<ThemeName>().build()
const { useI18n } = i18n
type I18n = typeof i18n.ofTypeI18n

export { useI18n, type I18n }
