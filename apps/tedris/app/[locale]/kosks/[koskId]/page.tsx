import { notFound } from 'next/navigation'
import { getKosk, getKoskCourses } from '~/features/courses/actions'
import { KoskPage } from '~/features/courses/components/kosk-page'

export default async function Page({
  params,
}: {
  params: Promise<{ koskId: string }>
}) {
  const { koskId } = await params
  const kosk = await getKosk(koskId)
  if (!kosk) notFound()

  const courses = await getKoskCourses(koskId)
  return <KoskPage kosk={kosk} courses={courses} />
}
