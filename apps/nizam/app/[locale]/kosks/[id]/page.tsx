import { notFound } from 'next/navigation'
import { getKoskById, getKoskCourses } from '~/features/kosks/actions'
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

  const courses = await getKoskCourses(kosk.id)

  return <KoskDetailPage kosk={kosk} courses={courses} />
}
