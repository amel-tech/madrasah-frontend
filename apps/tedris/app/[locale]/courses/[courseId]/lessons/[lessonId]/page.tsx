import { notFound } from 'next/navigation'
import { getCourse } from '~/features/courses/actions'
import { LessonPage } from '~/features/courses/components/lesson-page'

export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string, lessonId: string }>
}) {
  const { courseId, lessonId } = await params
  const course = await getCourse(courseId)
  if (!course) notFound()

  const lessonExists = course.weeks.some(w => w.lessons.some(l => l.id === lessonId))
  if (!lessonExists) notFound()

  return <LessonPage course={course} lessonId={lessonId} />
}
