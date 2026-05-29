import { getKosks } from '~/features/kosks/actions'
import { KosksPage } from '~/features/kosks/components/kosks-page'

const PAGE_SIZE = 12

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)

  const { items, total, limit } = await getKosks(page, PAGE_SIZE)
  const totalPages = Math.max(1, Math.ceil(total / limit))

  return <KosksPage kosks={items} page={page} totalPages={totalPages} />
}
