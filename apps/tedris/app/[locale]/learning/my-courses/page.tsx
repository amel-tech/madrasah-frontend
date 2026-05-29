import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Breadcrumbs } from '@madrasah/ui/components/breadcrumb'
import { getMyCourses } from '~/features/courses/actions'
import { ContinueCard } from '~/features/courses/components/continue-card'

export default async function MyCourses() {
  const t = await getTranslations('tedris')
  const enrolled = await getMyCourses()
  const continuing = enrolled.filter(c => c.enrollment.progress < 100)

  return (
    <div className="pb-16">
      <Breadcrumbs
        className="mb-4"
        linkComponent={Link}
        items={[
          { label: t('TabView.learning'), href: '/learning' },
          { label: t('KoskListPage.breadcrumbKosks'), href: '/learning' },
          { label: t('MyCoursesPage.breadcrumb') },
        ]}
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          {t('MyCoursesPage.title')}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {t('MyCoursesPage.subtitle')}
        </p>
      </div>

      {continuing.length === 0
        ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              {t('MyCoursesPage.empty')}
            </p>
          )
        : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {continuing.map(c => (
                <ContinueCard
                  key={c.id}
                  course={c}
                  labels={{
                    continue: t('KoskListPage.continue'),
                    completed: t('KoskListPage.completed'),
                  }}
                />
              ))}
            </div>
          )}
    </div>
  )
}
