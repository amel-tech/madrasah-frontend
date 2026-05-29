'use server'

import { revalidatePath } from 'next/cache'
import {
  createServerTedrisatAPIs,
  type KoskResponse,
  type CourseSummaryResponse,
  type CourseDetailResponse,
  type CreateKoskDto,
} from '@madrasah/services/tedrisat'
import {
  authenticatedAction,
  type AuthenticatedActionResult,
} from '~/lib/authenticated-action'
import { auth } from '~/lib/auth_options'
import { env } from '~/env'

export const getKosks = async (): Promise<KoskResponse[]> => {
  try {
    const session = await auth()
    const { kosks } = await createServerTedrisatAPIs(
      session?.accessToken,
      env.TEDRISAT_API_BASE_URL,
    )
    return await kosks.getAllKosks()
  }
  catch (error) {
    console.error('Error fetching köşks:', error)
    return []
  }
}

export const getKoskById = async (
  koskId: string,
): Promise<KoskResponse | null> => {
  try {
    const session = await auth()
    const { kosks } = await createServerTedrisatAPIs(
      session?.accessToken,
      env.TEDRISAT_API_BASE_URL,
    )
    return await kosks.getKoskById({ id: koskId })
  }
  catch (error) {
    console.error('Error fetching köşk:', error)
    return null
  }
}

export const getCourse = async (
  courseId: string,
): Promise<CourseDetailResponse | null> => {
  try {
    const session = await auth()
    const { courses } = await createServerTedrisatAPIs(
      session?.accessToken,
      env.TEDRISAT_API_BASE_URL,
    )
    return await courses.getCourseById({ id: courseId })
  }
  catch (error) {
    console.error('Error fetching course:', error)
    return null
  }
}

export const createKosk = async (
  kosk: CreateKoskDto,
): Promise<AuthenticatedActionResult<KoskResponse>> => {
  const result = await authenticatedAction(api =>
    api.kosks.createKosk({ createKoskDto: kosk }),
  )
  if (result.success) revalidatePath('/kosks')
  return result
}

export const getKoskCourses = async (
  koskId: string,
): Promise<CourseSummaryResponse[]> => {
  try {
    const session = await auth()
    const { courses } = await createServerTedrisatAPIs(
      session?.accessToken,
      env.TEDRISAT_API_BASE_URL,
    )
    return await courses.getCoursesByKosk({ koskId })
  }
  catch (error) {
    console.error('Error fetching köşk courses:', error)
    return []
  }
}
