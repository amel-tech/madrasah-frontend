import { getTranslations } from 'next-intl/server'

export default async function Home() {
  const t = await getTranslations('tedris')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{t('HomePage.title')}</p>
    </main>
  )
}
