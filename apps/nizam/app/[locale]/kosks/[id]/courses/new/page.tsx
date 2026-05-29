import { notFound } from 'next/navigation'
import { getKoskById } from '~/features/kosks/actions'
import { NewCoursePage } from '~/features/kosks/components/new-course-page'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const kosk = await getKoskById(id)
  if (!kosk) notFound()

  return <NewCoursePage kosk={kosk} />
}
