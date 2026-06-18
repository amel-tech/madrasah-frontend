'use client'

import { useMemo } from 'react'
import { useFormatter, useTranslations } from 'next-intl'
import Link from 'next/link'
import { toast } from '@madrasah/ui/components/sonner'
import {
  ArrowLeftIcon as ArrowLeft,
  ArrowRightIcon as ArrowRight,
  ArrowSquareOutIcon as ArrowSquareOut,
  CaretRightIcon as CaretRight,
  CopyIcon as Copy,
  HeadsetIcon as Headset,
  LinkIcon as LinkGlyph,
} from '@madrasah/icons'
import { cn } from '@madrasah/ui/lib/utils'
import { resolveMeetingPlatform } from '@madrasah/utils'
import type {
  CourseDetailResponse,
  LessonResponse,
  WeekResponse,
} from '@madrasah/services/tedrisat'
import { HueAvatar } from './cover'
import { LessonTypeIcon } from './syllabus'
import { LiveStatusBadge } from './live-status-badge'

const initials = (name: string) =>
  name.split(' ').filter(Boolean).slice(-2).map(w => w[0]).join('').toUpperCase()

type FlatLesson = { lesson: LessonResponse, week: WeekResponse }

export const LessonPage = ({
  course,
  lessonId,
}: {
  course: CourseDetailResponse
  lessonId: string
}) => {
  const t = useTranslations('tedris')
  const format = useFormatter()

  const flat: FlatLesson[] = useMemo(
    () => course.weeks.flatMap(week => week.lessons.map(lesson => ({ lesson, week }))),
    [course],
  )
  const index = flat.findIndex(f => f.lesson.id === lessonId)
  const { lesson, week } = flat[index]
  const prev = index > 0 ? flat[index - 1] : null
  const next = index < flat.length - 1 ? flat[index + 1] : null

  const platform = resolveMeetingPlatform(lesson.meetingUrl)
  const platformName = platform.id === 'unknown' ? t('LessonPage.platformUnknown') : platform.label
  const scheduledAt = lesson.scheduledAt ? new Date(lesson.scheduledAt) : null
  const muderris = course.muderris[0]

  const lessonHref = (l: LessonResponse) => `/courses/${course.id}/lessons/${l.id}`

  const copyLink = async () => {
    if (!lesson.meetingUrl) return
    await navigator.clipboard.writeText(lesson.meetingUrl)
    toast.success(t('LessonPage.copied'))
  }

  return (
    <div className="pb-16">
      {/* top bar */}
      <div className="mb-5 flex items-center gap-4 border-b pb-4">
        <Link
          href={`/courses/${course.id}`}
          className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-foreground"
        >
          <ArrowLeft size={15} />
          {' '}
          {t('LessonPage.backToCourse')}
        </Link>
        <div className="h-5 w-px bg-border" />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="truncate">{course.title}</span>
            <CaretRight size={10} />
            <span className="shrink-0">{t('CoursePage.week', { number: week.weekNumber })}</span>
          </div>
          <div className="truncate text-sm font-semibold">{lesson.title}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr_300px]">
        {/* curriculum rail */}
        <aside className="hidden lg:block">
          <div className="mb-3 text-xs font-semibold">{t('CoursePage.curriculum')}</div>
          <div className="flex flex-col gap-3">
            {course.weeks.map(w => (
              <div key={w.id}>
                <div className="mb-1 flex items-baseline gap-1.5 px-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {t('CoursePage.week', { number: w.weekNumber })}
                  </span>
                  <span className="truncate text-xs font-semibold">{w.title}</span>
                </div>
                {w.lessons.map((l) => {
                  const current = l.id === lesson.id
                  return (
                    <Link
                      key={l.id}
                      href={lessonHref(l)}
                      className={cn(
                        'flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] no-underline',
                        current ? 'bg-blue-50 font-semibold text-blue-800' : 'text-foreground',
                      )}
                    >
                      <span className={cn(
                        'grid size-6 shrink-0 place-items-center rounded-full',
                        current ? 'bg-blue-700 text-white' : 'bg-slate-100 text-muted-foreground',
                      )}
                      >
                        <LessonTypeIcon type={l.type} size={12} />
                      </span>
                      <span className="min-w-0 flex-1 truncate">{l.title}</span>
                      {l.scheduledAt && (
                        <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                          {format.dateTime(new Date(l.scheduledAt), { day: 'numeric', month: 'short' })}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            ))}
          </div>
        </aside>

        {/* stage */}
        <main className="min-w-0">
          <div className="overflow-hidden rounded-2xl border bg-white">
            {/* platform-branded header */}
            <div
              className="flex items-center gap-3.5 border-b px-5 py-4"
              style={{ background: platform.soft }}
            >
              <span
                className="grid size-10 shrink-0 place-items-center rounded-xl text-white"
                style={{ background: platform.color }}
              >
                <Headset size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-xs text-muted-foreground">{t('LessonPage.platformNotice')}</div>
                <div className="truncate text-base font-bold">{platformName}</div>
              </div>
              <LiveStatusBadge scheduledAt={scheduledAt} duration={lesson.duration} />
            </div>

            <div className="p-5">
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-semibold text-red-600">
                  <Headset size={12} />
                  {' '}
                  {t('LessonTypes.LIVE')}
                </span>
                {scheduledAt && (
                  <span className="text-xs text-muted-foreground">
                    {format.dateTime(scheduledAt, { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                    {lesson.duration ? ` · ${lesson.duration}` : ''}
                  </span>
                )}
              </div>
              <h1 className="mb-4 text-[22px] font-bold tracking-tight">{lesson.title}</h1>

              {lesson.meetingUrl
                ? (
                    <>
                      {/* meeting link row */}
                      <div className="mb-4 flex items-center gap-3 rounded-xl border bg-slate-50 px-3.5 py-3">
                        <LinkGlyph size={16} className="shrink-0 text-muted-foreground" />
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                            {t('LessonPage.meetingLink')}
                          </div>
                          <div className="truncate font-mono text-[13px] font-medium">{lesson.meetingUrl}</div>
                        </div>
                        <button
                          type="button"
                          onClick={copyLink}
                          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border bg-white px-3 py-1.5 text-xs font-medium"
                        >
                          <Copy size={13} />
                          {' '}
                          {t('LessonPage.copyLink')}
                        </button>
                      </div>

                      {/* join */}
                      <a
                        href={lesson.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white no-underline"
                        style={{ background: platform.color }}
                      >
                        {t('LessonPage.joinOn', { platform: platformName })}
                        <ArrowSquareOut size={16} />
                      </a>
                      <div className="mt-2.5 text-xs text-muted-foreground">
                        {t('LessonPage.opensNewTab')}
                      </div>
                    </>
                  )
                : (
                    <p className="rounded-xl border bg-slate-50 px-4 py-3 text-sm text-muted-foreground">
                      {t('LessonPage.noMeetingLink')}
                    </p>
                  )}
            </div>
          </div>

          {/* müzakere akışı */}
          {(lesson.agenda?.length ?? 0) > 0 && (
            <div className="mt-4 rounded-2xl border bg-white p-5">
              <div className="mb-4 text-sm font-semibold">{t('LessonPage.agendaTitle')}</div>
              <div className="flex flex-col">
                {lesson.agenda!.map((step, i) => (
                  <div key={i} className="flex gap-3.5">
                    <div className="flex flex-col items-center">
                      <span
                        className="mt-1 size-2.5 shrink-0 rounded-full"
                        style={{ background: i === 0 ? platform.color : 'var(--border)' }}
                      />
                      {i < lesson.agenda!.length - 1 && <span className="my-1 w-px flex-1 bg-border" />}
                    </div>
                    <div className={cn(i < lesson.agenda!.length - 1 && 'pb-4')}>
                      <div className="text-xs font-semibold tabular-nums" style={{ color: platform.color }}>
                        {step.time}
                      </div>
                      <div className="mt-0.5 text-[13px]">{step.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* prev / next */}
          <div className="mt-5 flex items-center justify-between gap-3">
            {prev
              ? (
                  <Link
                    href={lessonHref(prev.lesson)}
                    className="inline-flex min-w-0 items-center gap-2 rounded-lg border bg-white px-3.5 py-2.5 text-[13px] font-medium no-underline"
                  >
                    <ArrowLeft size={14} className="shrink-0" />
                    <span className="truncate">{prev.lesson.title}</span>
                  </Link>
                )
              : <span />}
            {next && (
              <Link
                href={lessonHref(next.lesson)}
                className="inline-flex min-w-0 items-center gap-2 rounded-lg border bg-white px-3.5 py-2.5 text-[13px] font-medium no-underline"
              >
                <span className="truncate">{next.lesson.title}</span>
                <ArrowRight size={14} className="shrink-0" />
              </Link>
            )}
          </div>
        </main>

        {/* sidebar */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
          {muderris && (
            <div className="rounded-2xl border bg-slate-50 p-4">
              <div className="flex items-center gap-2.5">
                <HueAvatar name={initials(muderris.name)} hue={muderris.avatarHue} size={32} />
                <div>
                  <div className="text-[13px] font-semibold">{muderris.name}</div>
                  <div className="text-[11px] text-muted-foreground">{t('LessonPage.managesCircle')}</div>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

/** Next upcoming LIVE lesson of a course (soonest scheduledAt in the
 *  future), used by the course page's continue button. */
export const nextLiveLesson = (course: CourseDetailResponse): LessonResponse | null => {
  const now = Date.now()
  const live = course.weeks
    .flatMap(w => w.lessons)
    .filter(l => l.type === 'LIVE' && l.scheduledAt && new Date(l.scheduledAt).getTime() > now)
    .sort((a, b) => new Date(a.scheduledAt!).getTime() - new Date(b.scheduledAt!).getTime())
  return live[0] ?? course.weeks[0]?.lessons[0] ?? null
}
