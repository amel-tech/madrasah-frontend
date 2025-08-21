export interface User {
  id: string
  email: string
  name: string
  role: 'student' | 'teacher' | 'admin'
  createdAt: Date
  updatedAt: Date
}

export interface Course {
  id: string
  title: string
  description: string
  teacherId: string
  students: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Lesson {
  id: string
  courseId: string
  title: string
  content: string
  videoUrl?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}

export enum FlashCardType {
  Hadith = 'hadith',
  Vocab = 'vocab',
  Any = 'any',
}

export interface BaseFlashCard {
  id: string | number
  type: FlashCardType
}

export interface HadithCard extends BaseFlashCard {
  type: FlashCardType.Hadith
  partialText: string
  fullText: string
}

export interface VocabCard extends BaseFlashCard {
  type: FlashCardType.Vocab
  arabic: string
  translation: string
}

export interface FlashCardUIModel extends BaseFlashCard {
  question: string
  value: string
  title: string
}

export type FlashCard = HadithCard | VocabCard
