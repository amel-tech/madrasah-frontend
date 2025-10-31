import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('common')

  return (
    <div>
      {t('welcome')}
    </div>
  )
}
