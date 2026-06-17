'use server'

import { revalidatePath } from 'next/cache'
import {
  type CreateCourseDto,
  type CourseDetailResponse,
  type EnrollmentResponse,
} from '@madrasah/services/tedrisat'
import {
  authenticatedAction,
  type AuthenticatedActionResult,
} from '~/lib/authenticated-action'

export const createKoskCourse = async (
  koskId: string,
  course: CreateCourseDto,
): Promise<AuthenticatedActionResult<CourseDetailResponse>> => {
  const result = await authenticatedAction(api =>
    api.courses.createCourse({ koskId, createCourseDto: course }),
  )
  if (result.success) revalidatePath(`/kosks/${koskId}`)
  return result
}

export const updateKoskCourse = async (
  koskId: string,
  courseId: string,
  course: CreateCourseDto,
): Promise<AuthenticatedActionResult<CourseDetailResponse>> => {
  const result = await authenticatedAction(api =>
    api.courses.replaceCourse({ id: courseId, createCourseDto: course }),
  )
  if (result.success) {
    revalidatePath(`/kosks/${koskId}`)
    revalidatePath(`/kosks/${koskId}/courses/${courseId}/edit`)
  }
  return result
}

export const approveEnrollment = async (
  koskId: string,
  courseId: string,
  userId: string,
): Promise<AuthenticatedActionResult<EnrollmentResponse>> => {
  const result = await authenticatedAction(api =>
    api.courses.approveEnrollment({ id: courseId, userId }),
  )
  if (result.success) revalidatePath(`/kosks/${koskId}`)
  return result
}

export const rejectEnrollment = async (
  koskId: string,
  courseId: string,
  userId: string,
): Promise<AuthenticatedActionResult<boolean>> => {
  const result = await authenticatedAction(api =>
    api.courses.rejectEnrollment({ id: courseId, userId }),
  )
  if (result.success) revalidatePath(`/kosks/${koskId}`)
  return result
}
