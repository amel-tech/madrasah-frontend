import { getTranslations } from 'next-intl/server'

export default async function Learning() {
  const t = await getTranslations('common')
  return <div>{t('welcome')}</div>
}
