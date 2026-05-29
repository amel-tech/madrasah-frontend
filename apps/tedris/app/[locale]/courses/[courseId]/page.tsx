import { notFound } from 'next/navigation'
import { getCourse, getKosk } from '~/features/courses/actions'
import { CoursePage } from '~/features/courses/components/course-page'

export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  const course = await getCourse(courseId)
  if (!course) notFound()

  // Köşk name for the breadcrumb (CourseDetailResponse only carries koskId).
  const kosk = await getKosk(course.koskId)

  return <CoursePage course={course} koskName={kosk?.name ?? null} />
}
