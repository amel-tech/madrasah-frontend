import { getRequestConfig } from 'next-intl/server'
import { resources } from '@madrasah/i18n'

const resolveMessagesForLang = async (locale: keyof typeof resources = 'en', ns: string[] = ['common']) => {
  const messages = resources[locale]

  if (ns) {
    return Object.fromEntries(
      Object.entries(messages).filter(([key]) => ns.includes(key)),
    )
  }

  return messages
}

export default getRequestConfig(async () => {
  const locale = 'en'

  const messages = await resolveMessagesForLang(locale, ['common', 'nizam'])

  return {
    locale,
    messages,
  }
})
