'use server'

import { revalidatePath } from 'next/cache'
import {
  createServerTedrisatAPIs,
  type KoskResponse,
  type PaginatedKoskResponse,
  type CourseSummaryResponse,
  type CourseDetailResponse,
  type EnrolledCourseResponse,
  type EnrollmentResponse,
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

export const getKosk = async (
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

export const getMyCourses = async (): Promise<EnrolledCourseResponse[]> => {
  try {
    const session = await auth()
    const { courses } = await createServerTedrisatAPIs(
      session?.accessToken,
      env.TEDRISAT_API_BASE_URL,
    )
    return await courses.getEnrolledCourses()
  }
  catch (error) {
    console.error('Error fetching enrolled courses:', error)
    return []
  }
}

export const followKosk = async (
  koskId: string,
): Promise<AuthenticatedActionResult<boolean>> => {
  const result = await authenticatedAction(api =>
    api.kosks.followKosk({ id: koskId }),
  )
  if (result.success) revalidatePath('/learning')
  return result
}

export const unfollowKosk = async (
  koskId: string,
): Promise<AuthenticatedActionResult<boolean>> => {
  const result = await authenticatedAction(api =>
    api.kosks.unfollowKosk({ id: koskId }),
  )
  if (result.success) revalidatePath('/learning')
  return result
}

export const enrollInCourse = async (
  courseId: string,
): Promise<AuthenticatedActionResult<EnrollmentResponse>> => {
  const result = await authenticatedAction(api =>
    api.courses.enrollInCourse({ id: courseId }),
  )
  if (result.success) revalidatePath(`/courses/${courseId}`)
  return result
}

export const updateCourseProgress = async (
  courseId: string,
  progress: number,
): Promise<AuthenticatedActionResult<EnrollmentResponse>> => {
  const result = await authenticatedAction(api =>
    api.courses.updateCourseProgress({
      id: courseId,
      updateProgressDto: { progress },
    }),
  )
  if (result.success) revalidatePath(`/courses/${courseId}`)
  return result
}
