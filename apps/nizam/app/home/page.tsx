import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('nizam')
  return (
    <div className="container">
      {t('HomePage.greeting')}
    </div>
  )
}
