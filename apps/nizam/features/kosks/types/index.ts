import { z } from 'zod'

// Domain types (from kosks API/actions)
export interface Kosk {
  id: string
  name: string
  ownerId: string
  createdAt: Date
}

export interface SyllabusItem {
  week: number
  topic: string
  resources: string[]
}

export interface CreateCourseDto {
  title: string
  description: string
  startDate: string
  endDate: string
  syllabus?: SyllabusItem[]
}

export interface Course {
  id: string
  koskId: string
  title: string
  description: string
  startDate: string
  teaserWeeks: number
  syllabus: SyllabusItem[]
  students: number
  image: string
  duration: string
}

// Wizard constants
export const WIZARD_STEPS = {
  BASIC_INFO: 'basic-info',
  CURRICULUM: 'curriculum',
  PREVIEW: 'preview',
} as const

export type WizardStep = (typeof WIZARD_STEPS)[keyof typeof WIZARD_STEPS]

export const WIZARD_STEP_ORDER = [
  WIZARD_STEPS.BASIC_INFO,
  WIZARD_STEPS.CURRICULUM,
  WIZARD_STEPS.PREVIEW,
]

export const WIZARD_STEP_LABELS = {
  [WIZARD_STEPS.BASIC_INFO]: 'Temel Bilgiler',
  [WIZARD_STEPS.CURRICULUM]: 'Müfredat',
  [WIZARD_STEPS.PREVIEW]: 'Önizleme',
}

// Validation schemas (wizard)
export const basicInfoSchema = z.object({
  title: z.string().min(1, 'Ders başlığı zorunludur'),
  description: z.string().min(1, 'Ders açıklaması zorunludur'),
  startDate: z.string().min(1, 'Başlangıç tarihi zorunludur'),
  endDate: z.string().min(1, 'Bitiş tarihi zorunludur'),
}).refine((data) => {
  if (data.startDate && data.endDate) {
    return new Date(data.endDate) >= new Date(data.startDate)
  }
  return true
}, {
  message: 'Bitiş tarihi başlangıç tarihinden önce olamaz',
  path: ['endDate'],
})

export type BasicInfoSchema = z.infer<typeof basicInfoSchema>

export const syllabusItemSchema = z.object({
  week: z.coerce.number().min(1, 'Hafta sayısı 1\'den küçük olamaz'),
  topic: z.string().min(3, 'Konu başlığı en az 3 karakter olmalıdır'),
  resources: z.string().optional(),
})

export const curriculumSchema = z.object({
  syllabus: z.array(syllabusItemSchema).min(1, 'En az 1 hafta eklemelisiniz'),
})

export type SyllabusItemSchema = z.infer<typeof syllabusItemSchema>
export type CurriculumSchema = z.infer<typeof curriculumSchema>
