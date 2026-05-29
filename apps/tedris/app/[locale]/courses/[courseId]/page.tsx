import { notFound } from 'next/navigation'
import { getCourse } from '~/features/courses/actions'
import { CoursePage } from '~/features/courses/components/course-page'

export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  const course = await getCourse(courseId)
  if (!course) notFound()

  return <CoursePage course={course} />
}
