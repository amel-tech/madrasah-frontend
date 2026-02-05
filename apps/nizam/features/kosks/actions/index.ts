'use server'

import type { Kosk, Course, CreateCourseDto } from '../types'

// Mock Data
const MOCK_KOSKS: Kosk[] = [
  {
    id: '1',
    name: 'Fıkıh Köşkü',
    ownerId: 'user-1',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Hadis Köşkü',
    ownerId: 'user-1',
    createdAt: new Date('2024-02-01'),
  },
]

const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    koskId: '1',
    title: 'Temel Fıkıh Dersleri',
    description: 'İslam hukukunun temel konuları ve günlük yaşam uygulamaları',
    image: 'https://images.unsplash.com/photo-1600383963284-91ef78fc9b6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYXJjaGl0ZWN0dXJlJTIwbW9zcXVlfGVufDF8fHx8MTc2NDgwNDM2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    students: 145,
    duration: '12 hafta',
    startDate: '2024-03-01',
    teaserWeeks: 3,
    syllabus: [],
  },
  {
    id: 'c2',
    koskId: '1',
    title: 'İbadet Ahkamı',
    description: 'Namaz, oruç, zekat ve hac ile ilgili detaylı bilgiler',
    image: 'https://images.unsplash.com/photo-1652087795147-ef3d50bcb52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdXJhbiUyMHN0dWR5JTIwbGVhcm5pbmd8ZW58MXx8fHwxNzY0ODQ4NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    students: 98,
    duration: '8 hafta',
    startDate: '2024-04-01',
    teaserWeeks: 3,
    syllabus: [],
  },
]

export async function getKosks(): Promise<Kosk[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return MOCK_KOSKS
}

export async function getKoskById(id: string): Promise<Kosk | undefined> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return MOCK_KOSKS.find(k => k.id === id)
}

export async function getCoursesByKoskId(koskId: string): Promise<Course[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return MOCK_COURSES.filter(c => c.koskId === koskId)
}

export async function createCourse(data: CreateCourseDto): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Creating course:', data)
  return true
}
