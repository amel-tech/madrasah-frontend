import { notFound } from 'next/navigation'
import {
  getKoskById,
  getKoskCourses,
  getPendingEnrollments,
} from '~/features/kosks/actions'
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

  const [courses, pendingEnrollments] = await Promise.all([
    getKoskCourses(kosk.id),
    getPendingEnrollments(kosk.id),
  ])

  return (
    <KoskDetailPage
      kosk={kosk}
      courses={courses}
      pendingEnrollments={pendingEnrollments}
    />
  )
}
