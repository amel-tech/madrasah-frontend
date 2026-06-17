import { notFound } from 'next/navigation'
import { getCourse, getKoskById } from '~/features/kosks/actions'
import { NewCoursePage } from '~/features/kosks/components/new-course-page'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string, courseId: string }>
}) {
  const { id, courseId } = await params
  const [kosk, course] = await Promise.all([getKoskById(id), getCourse(courseId)])
  if (!kosk || !course) notFound()

  return <NewCoursePage kosk={kosk} course={course} />
}
