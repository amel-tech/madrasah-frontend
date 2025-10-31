import { getRequestConfig } from 'next-intl/server'
import { resources } from '@madrasah/i18n'

const resolveMessagesForLang = async (locale: string = 'en', ns: string[] = ['common']) => {
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

  const messages = await resolveMessagesForLang(locale, ['common', 'tedris'])

  return {
    locale,
    messages,
  }
})
