type Translate = (key: string, values?: Record<string, string | number>) => string

export const levelLabel = (level: string, t: Translate): string =>
  t(`Levels.${level}`)

export const lessonTypeLabel = (type: string, t: Translate): string =>
  t(`LessonTypes.${type}`)
