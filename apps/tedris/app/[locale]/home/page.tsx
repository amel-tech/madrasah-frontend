import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('tedris')
  return <div>{t('TabView.home')}</div>
}
