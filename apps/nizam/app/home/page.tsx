import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('nizam')

  return (
    <div className="container">
      {t('HomePage.greeting')}
    </div>
  )
}
