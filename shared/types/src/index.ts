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

export interface MemoryCard {
  id: string
  front: string
  back: string
  note: string
  type: 'hadith' | 'verse'
}
