'use client'

import { useFormatter, useTranslations } from 'next-intl'
import Link from 'next/link'
import {
  CaretDownIcon as CaretDown,
  PlayIcon as Play,
  FileTextIcon as FileText,
  HeadsetIcon as Headset,
  ExamIcon as Exam,
  DownloadSimpleIcon as DownloadSimple,
  XIcon as X,
  CalendarBlankIcon as CalendarBlank,
} from '@madrasah/icons'
import {
  Dialog,
  DialogContent,
} from '@madrasah/ui/components/dialog'
import { cn } from '@madrasah/ui/lib/utils'
import type {
  CourseDetailResponse,
  LessonResponse,
  WeekResponse,
} from '@madrasah/services/tedrisat'
import { lessonTypeLabel } from './labels'

export const LessonTypeIcon = ({ type, size = 14 }: { type: string, size?: number }) => {
  switch (type) {
    case 'VIDEO':
      return <Play size={size} />
    case 'DOCUMENT':
      return <FileText size={size} />
    case 'LIVE':
      return <Headset size={size} />
    case 'QUIZ':
      return <Exam size={size} />
    default:
      return <FileText size={size} />
  }
}

export const LessonRow = ({
  lesson,
  courseId,
}: {
  lesson: LessonResponse
  courseId?: string
}) => {
  const t = useTranslations('tedris')
  const format = useFormatter()
  const inner = (
    <>
      <div className="grid size-6 place-items-center rounded-full bg-slate-100 text-muted-foreground">
        <LessonTypeIcon type={lesson.type} size={13} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium">{lesson.title}</div>
        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>{lessonTypeLabel(lesson.type, t)}</span>
          {lesson.scheduledAt && (
            <>
              <span className="size-[2px] rounded-full bg-slate-300" />
              <span className="tabular-nums">
                {format.dateTime(new Date(lesson.scheduledAt), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </span>
            </>
          )}
          {lesson.kaynak && (
            <>
              <span className="size-[2px] rounded-full bg-slate-300" />
              <span className="text-blue-700">{lesson.kaynak}</span>
            </>
          )}
          {lesson.isPreview && (
            <>
              <span className="size-[2px] rounded-full bg-slate-300" />
              <span className="font-medium text-green-600">{t('CoursePage.preview')}</span>
            </>
          )}
        </div>
      </div>
      {lesson.duration && (
        <span className="min-w-14 text-right text-xs text-muted-foreground">
          {lesson.duration}
        </span>
      )}
    </>
  )

  if (courseId) {
    return (
      <Link
        href={`/courses/${courseId}/lessons/${lesson.id}`}
        className="flex items-center gap-3.5 py-2 pl-6 pr-4 text-inherit no-underline hover:bg-slate-50"
      >
        {inner}
      </Link>
    )
  }
  return <div className="flex items-center gap-3.5 py-2 pl-6 pr-4">{inner}</div>
}

export const WeekModule = ({
  week,
  open,
  onToggle,
  collapsible = true,
  courseId,
}: {
  week: WeekResponse
  open?: boolean
  onToggle?: () => void
  collapsible?: boolean
  courseId?: string
}) => {
  const t = useTranslations('tedris')
  const expanded = collapsible ? Boolean(open) : true

  const headerInner = (
    <>
      <div className="grid size-7 shrink-0 place-items-center rounded-full bg-slate-900 text-[11px] font-semibold text-white">
        {week.weekNumber}
      </div>
      <div className="flex-1">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {t('CoursePage.week', { number: week.weekNumber })}
        </div>
        <div className="text-sm font-semibold">{week.title}</div>
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>{t('CoursePage.lessonsCount', { count: week.lessons.length })}</span>
        {collapsible && (
          <CaretDown
            size={14}
            className={cn('transition-transform', expanded ? '' : '-rotate-90')}
          />
        )}
      </div>
    </>
  )

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      {collapsible
        ? (
            <button
              type="button"
              onClick={onToggle}
              className="flex w-full items-center gap-3.5 px-4 py-3.5 text-left"
            >
              {headerInner}
            </button>
          )
        : (
            <div className="flex w-full items-center gap-3.5 px-4 py-3.5">
              {headerInner}
            </div>
          )}
      {expanded && (
        <div className="border-t py-1.5">
          {week.summary && (
            <div className="px-4 pb-1 pl-6 pt-2 text-xs leading-relaxed text-muted-foreground">
              {week.summary}
            </div>
          )}
          {week.lessons.map(lesson => (
            <LessonRow key={lesson.id} lesson={lesson} courseId={courseId} />
          ))}
        </div>
      )}
    </div>
  )
}

export const SyllabusModal = ({
  course,
  open,
  onOpenChange,
}: {
  course: CourseDetailResponse
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  const t = useTranslations('tedris')

  const lessonCount = course.weeks.reduce((sum, w) => sum + w.lessons.length, 0)
  const progress = course.enrollment?.progress ?? 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[92vh] w-[min(960px,100%)] max-w-[960px] flex-col gap-0 overflow-hidden p-0 sm:max-w-[960px]"
      >
        <div className="border-b px-6 py-5">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {t('SyllabusModal.fullSyllabus')}
              </div>
              <h2 className="text-xl font-bold tracking-tight">{course.title}</h2>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border bg-white px-3 py-2 text-[13px] font-medium"
              >
                <DownloadSimple size={14} />
                {' '}
                {t('SyllabusModal.downloadPdf')}
              </button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="grid place-items-center rounded-lg bg-slate-100 p-2 text-foreground"
                aria-label={t('SyllabusModal.close')}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-7">
            {[
              { label: t('CoursePage.weeks'), value: `${course.weeks.length}` },
              { label: t('CoursePage.lessons'), value: `${lessonCount}` },
              { label: t('CoursePage.level'), value: t(`Levels.${course.level}`) },
            ].map(s => (
              <div key={s.label}>
                <div className="mb-0.5 text-[11px] text-muted-foreground">{s.label}</div>
                <div className="text-sm font-semibold">{s.value}</div>
              </div>
            ))}
            <div className="flex-1">
              <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                <span>{t('CoursePage.overallProgress')}</span>
                <span>
                  %
                  {progress}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-blue-700" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto p-6">
          {course.weeks.map(week => (
            <WeekModule
              key={week.id}
              week={week}
              collapsible={false}
              // Lesson deep-links only for enrolled students (PENDING not enough).
              courseId={course.enrollment && course.enrollment.status !== 'PENDING' ? course.id : undefined}
            />
          ))}
        </div>

        <div className="flex items-center justify-between border-t px-6 py-3.5">
          <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarBlank size={14} />
            {' '}
            {t('SyllabusModal.weeksTotal', { count: course.weeks.length })}
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-lg border bg-white px-3.5 py-2 text-[13px] font-medium"
          >
            {t('SyllabusModal.close')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
