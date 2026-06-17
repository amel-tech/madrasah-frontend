import {
  Configuration,
  FlashcardDecksApi,
  FlashcardCardsApi,
  TedrisatServiceApi,
  KosksApi,
  CoursesApi,
} from './generated/src'

// Re-export types that are used in other apps
export type {
  FlashcardDeckResponse,
  FlashcardResponse,
  CreateFlashcardDeckDto,
  CreateFlashcardDto,
  UpdateFlashcardDeckDto,
  UpdateFlashcardDto,
  KoskResponse,
  PaginatedKoskResponse,
  CreateKoskDto,
  UpdateKoskDto,
  CourseSummaryResponse,
  EnrolledCourseResponse,
  CourseDetailResponse,
  WeekResponse,
  LessonResponse,
  MuderrisResponse,
  ResourceResponse,
  EnrollmentResponse,
  PendingEnrollmentResponse,
  CreateCourseDto,
  CreateWeekDto,
  CreateLessonDto,
  CreateMuderrisDto,
  CreateResourceDto,
  UpdateCourseDto,
  UpdateProgressDto,
} from './generated/src'

// Re-export enum constants (they are used at runtime as values)
import { FlashcardResponseTypeEnum } from './generated/src/models/FlashcardResponse'
import { CreateFlashcardDtoTypeEnum } from './generated/src/models/CreateFlashcardDto'
import { CreateLessonDtoTypeEnum } from './generated/src/models/CreateLessonDto'
import {
  CreateCourseDtoLevelEnum,
  CreateCourseDtoStatusEnum,
} from './generated/src/models/CreateCourseDto'
import { EnrollmentResponseStatusEnum } from './generated/src/models/EnrollmentResponse'

export {
  FlashcardResponseTypeEnum,
  CreateFlashcardDtoTypeEnum,
  CreateLessonDtoTypeEnum,
  CreateCourseDtoLevelEnum,
  CreateCourseDtoStatusEnum,
  EnrollmentResponseStatusEnum,
}

export interface TedrisatAPIConfig {
  baseUrl: string
  token?: string
}

/**
 * Factory to create authenticated Tedrisat API clients
 * Direct usage of generated OpenAPI clients
 */
export function createTedrisatAPIs(config: TedrisatAPIConfig) {
  const configuration = new Configuration({
    basePath: config.baseUrl,
    headers: config.token
      ? {
          Authorization: `Bearer ${config.token}`,
        }
      : undefined,
  })

  return {
    decks: new FlashcardDecksApi(configuration),
    cards: new FlashcardCardsApi(configuration),
    service: new TedrisatServiceApi(configuration),
    kosks: new KosksApi(configuration),
    courses: new CoursesApi(configuration),
  }
}

/**
 * Convenience function for server-side usage with token
 */
export async function createServerTedrisatAPIs(
  token: string | undefined,
  baseUrl: string,
) {
  return createTedrisatAPIs({ baseUrl, token })
}
