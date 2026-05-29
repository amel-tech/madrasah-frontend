import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getKosks, getMyCourses } from '~/features/courses/actions'
import { KoskListPage } from '~/features/courses/components/kosk-list-page'

const PAGE_SIZE = 12

export default async function Learning({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)

  const [{ items: kosks, total, limit }, enrolled] = await Promise.all([
    getKosks(page, PAGE_SIZE),
    getMyCourses(),
  ])
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const continuing = enrolled.filter(c => c.enrollment.progress < 100)

  return (
    <>
      <KoskListPage kosks={kosks} continuing={continuing} />
      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </>
  )
}

async function Pagination({ page, totalPages }: { page: number, totalPages: number }) {
  const t = await getTranslations('tedris')
  return (
    <div className="mt-8 flex items-center justify-center gap-3 text-sm">
      {page > 1
        ? (
            <Link
              href={`/learning?page=${page - 1}`}
              className="rounded-lg border bg-white px-3.5 py-2 font-medium"
            >
              {t('KoskListPage.prev')}
            </Link>
          )
        : (
            <span className="rounded-lg border px-3.5 py-2 font-medium text-muted-foreground opacity-50">
              {t('KoskListPage.prev')}
            </span>
          )}
      <span className="text-muted-foreground">
        {t('KoskListPage.pageOf', { page, total: totalPages })}
      </span>
      {page < totalPages
        ? (
            <Link
              href={`/learning?page=${page + 1}`}
              className="rounded-lg border bg-white px-3.5 py-2 font-medium"
            >
              {t('KoskListPage.next')}
            </Link>
          )
        : (
            <span className="rounded-lg border px-3.5 py-2 font-medium text-muted-foreground opacity-50">
              {t('KoskListPage.next')}
            </span>
          )}
    </div>
  )
}
