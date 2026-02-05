import { getKoskById, getCoursesByKoskId } from '~/features/kosks/actions'
import { notFound } from 'next/navigation'
import { KoskDetailPage } from '~/features/kosks/components/kosk-detail-page'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const kosk = await getKoskById(id)

  if (!kosk) {
    notFound()
  }

  const courses = await getCoursesByKoskId(kosk.id)

  return <KoskDetailPage kosk={kosk} courses={courses} />
}
