import { getRequestConfig } from 'next-intl/server'
import { resources } from '@madrasah/i18n'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

const resolveMessagesForLang = async (locale: keyof typeof resources) => {
  const messages = resources[locale]
  return Object.fromEntries(
    Object.entries(messages).filter(([key]) => ['common', 'landing'].includes(key)),
  )
}

export default getRequestConfig(async ({
  requestLocale,
}) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  const messages = await resolveMessagesForLang(locale)

  return {
    locale,
    messages,
  }
})
