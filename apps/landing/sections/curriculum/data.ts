export const curriculumFilters = ['all', 'arabic', 'theology', 'history', 'spirituality'] as const

export const curriculumCourses = [
  { key: 'classicalArabic' as const, image: '/images/curriculum/classical-arabic.jpg' },
  { key: 'foundationsAqidah' as const, image: '/images/curriculum/foundations-aqidah.jpg' },
  { key: 'goldenAge' as const, image: '/images/curriculum/golden-age.jpg' },
  { key: 'purificationHeart' as const, image: '/images/curriculum/purification-heart.jpg' },
] as const
