import { z } from 'zod'

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
