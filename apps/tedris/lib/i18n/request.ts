import { getRequestConfig } from 'next-intl/server'
import { resources } from '@madrasah/i18n'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

const resolveMessagesForLang = async (locale: keyof typeof resources, ns: string[] = ['common']) => {
  const messages = resources[locale]

  if (ns) {
    return Object.fromEntries(
      Object.entries(messages).filter(([key]) => ns.includes(key)),
    )
  }

  return messages
}

export default getRequestConfig(async ({
  requestLocale,
}) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  const messages = await resolveMessagesForLang(locale,
    // Load only app-specific namespaces. This prevents using cross-app locale strings.
    ['common', 'tedris'],
  )

  return {
    locale,
    messages,
  }
})
