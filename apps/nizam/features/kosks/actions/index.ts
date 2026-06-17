'use server'

import { revalidatePath } from 'next/cache'
import {
  createServerTedrisatAPIs,
  type KoskResponse,
  type PaginatedKoskResponse,
  type CourseSummaryResponse,
  type CourseDetailResponse,
  type PendingEnrollmentResponse,
  type CreateKoskDto,
  type UpdateKoskDto,
} from '@madrasah/services/tedrisat'
import {
  authenticatedAction,
  type AuthenticatedActionResult,
} from '~/lib/authenticated-action'
import { auth } from '~/lib/auth_options'
import { env } from '~/env'

export const getKosks = async (
  page = 1,
  limit = 12,
): Promise<PaginatedKoskResponse> => {
  try {
    const session = await auth()
    const { kosks } = await createServerTedrisatAPIs(
      session?.accessToken,
      env.TEDRISAT_API_BASE_URL,
    )
    return await kosks.getAllKosks({ page, limit })
  }
  catch (error) {
    console.error('Error fetching köşks:', error)
    return { items: [], total: 0, page, limit }
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

export const updateKosk = async (
  koskId: string,
  kosk: UpdateKoskDto,
): Promise<AuthenticatedActionResult<KoskResponse>> => {
  const result = await authenticatedAction(api =>
    api.kosks.updateKosk({ id: koskId, updateKoskDto: kosk }),
  )
  if (result.success) {
    revalidatePath('/kosks')
    revalidatePath(`/kosks/${koskId}`)
  }
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

export const getPendingEnrollments = async (
  koskId: string,
): Promise<PendingEnrollmentResponse[]> => {
  try {
    const session = await auth()
    const { courses } = await createServerTedrisatAPIs(
      session?.accessToken,
      env.TEDRISAT_API_BASE_URL,
    )
    return await courses.getPendingEnrollments({ koskId })
  }
  catch (error) {
    console.error('Error fetching pending enrollments:', error)
    return []
  }
}
