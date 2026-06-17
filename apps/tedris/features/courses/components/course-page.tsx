'use client'

import { useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from '@madrasah/ui/components/sonner'
import {
  ArrowRightIcon as ArrowRight,
  PlayIcon as Play,
  ClockIcon as Clock,
  BookmarkSimpleIcon as BookmarkSimple,
  ShareNetworkIcon as ShareNetwork,
  CertificateIcon as Certificate,
  FilePdfIcon as FilePdf,
  FileTextIcon as FileText,
  BookOpenIcon as BookOpen,
} from '@madrasah/icons'
import { cn } from '@madrasah/ui/lib/utils'
import { Breadcrumbs } from '@madrasah/ui/components/breadcrumb'
import type {
  CourseDetailResponse,
  ResourceResponse,
} from '@madrasah/services/tedrisat'
import { CoverPlaceholder, HueAvatar } from './cover'
import { WeekModule, SyllabusModal } from './syllabus'
import { nextLiveLesson } from './lesson-page'
import { levelLabel } from './labels'
import { enrollInCourse } from '../actions'

const initials = (name: string) =>
  name.split(' ').filter(Boolean).slice(-2).map(w => w[0]).join('').toUpperCase()

const ResourceIcon = ({ type }: { type: string | null }) => {
  if (type === 'pdf') return <FilePdf size={16} />
  if (type === 'deck') return <BookOpen size={16} />
  return <FileText size={16} />
}

export const CoursePage = ({
  course,
  koskName,
}: {
  course: CourseDetailResponse
  koskName?: string | null
}) => {
  const t = useTranslations('tedris')
  const router = useRouter()
  const [tab, setTab] = useState('mufredat')
  const [openWeek, setOpenWeek] = useState<string | null>(course.weeks[0]?.id ?? null)
  const [showSyllabus, setShowSyllabus] = useState(false)
  const [pending, startTransition] = useTransition()

  const isPending = course.enrollment?.status === 'PENDING'
  const enrolled = Boolean(course.enrollment) && !isPending
  const progress = course.enrollment?.progress ?? 0
  const lessonCount = course.weeks.reduce((s, w) => s + w.lessons.length, 0)
  const previewWeeks = course.weeks.slice(0, 5)
  const remaining = course.weeks.length - previewWeeks.length
  const continueLesson = nextLiveLesson(course)

  const handleEnroll = () =>
    startTransition(async () => {
      const res = await enrollInCourse(course.id)
      if (res.success === false) {
        toast.error(res.error)
        return
      }
      toast.success(
        course.requiresApproval
          ? t('CoursePage.requestSent')
          : t('CoursePage.enrolled'),
      )
      router.refresh()
    })

  const tabs = [
    { id: 'genel', label: t('CoursePage.tabOverview') },
    { id: 'mufredat', label: t('CoursePage.tabCurriculum'), badge: lessonCount },
    { id: 'muderris', label: t('CoursePage.tabTeachers') },
    { id: 'kaynak', label: t('CoursePage.tabResources'), badge: course.resources.length },
  ]

  return (
    <div className="pb-16">
      {/* Breadcrumb */}
      <Breadcrumbs
        className="mb-4"
        linkComponent={Link}
        items={[
          { label: t('TabView.learning'), href: '/learning' },
          { label: t('KoskPage.kosks'), href: '/learning' },
          ...(koskName
            ? [{ label: koskName, href: `/kosks/${course.koskId}` }]
            : []),
          { label: course.title },
        ]}
      />

      {/* Hero */}
      <div className="grid grid-cols-1 gap-9 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-2.5 flex items-center gap-2 text-[11px] uppercase tracking-wide text-muted-foreground">
            {course.category && <span className="font-semibold">{course.category}</span>}
            {course.category && <span className="size-[3px] rounded-full bg-slate-300" />}
            <span>{levelLabel(course.level, t)}</span>
            {course.language && <span className="size-[3px] rounded-full bg-slate-300" />}
            {course.language && <span>{course.language}</span>}
          </div>

          <h1 className="text-[34px] font-bold leading-tight tracking-tight">{course.title}</h1>
          {course.subtitle && (
            <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              {course.subtitle}
            </p>
          )}

          <div className="mb-4 mt-4 flex flex-wrap items-center gap-4 text-[13px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} />
              {' '}
              {t('CoursePage.weeksLessons', { weeks: course.weeks.length, lessons: lessonCount })}
            </span>
          </div>

          {course.muderris.length > 0 && (
            <div className="flex items-center gap-2.5">
              <div className="flex">
                {course.muderris.map((m, i) => (
                  <div key={m.id} style={{ marginLeft: i ? -8 : 0 }}>
                    <HueAvatar name={initials(m.name)} hue={m.avatarHue} size={32} />
                  </div>
                ))}
              </div>
              <div className="text-[13px]">
                <span className="text-muted-foreground">{t('CoursePage.teacher')}</span>
                {' '}
                <span className="font-medium">{course.muderris.map(m => m.name).join(', ')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Enroll card */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="overflow-hidden rounded-2xl border bg-white shadow-[0_20px_40px_-28px_rgba(15,23,42,0.18)]">
            <div className="p-4 pb-0">
              <CoverPlaceholder hue={course.coverHue} label={course.category ?? undefined} className="h-40" />
            </div>
            <div className="p-4">
              {enrolled && (
                <>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      {t('CoursePage.inProgress')}
                    </span>
                    <span className="text-xs font-semibold">
                      %
                      {progress}
                    </span>
                  </div>
                  <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full bg-blue-700" style={{ width: `${progress}%` }} />
                  </div>
                </>
              )}

              {isPending
                ? (
                    <button
                      type="button"
                      disabled
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-700"
                    >
                      <Clock size={14} />
                      {' '}
                      {t('CoursePage.pendingApproval')}
                    </button>
                  )
                : enrolled
                  ? (
                      continueLesson
                        ? (
                            <Link
                              href={`/courses/${course.id}/lessons/${continueLesson.id}`}
                              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white no-underline"
                            >
                              <Play size={14} weight="fill" />
                              {' '}
                              {t('CoursePage.continue')}
                            </Link>
                          )
                        : (
                            <button
                              type="button"
                              disabled
                              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white opacity-60"
                            >
                              <Play size={14} weight="fill" />
                              {' '}
                              {t('CoursePage.continue')}
                            </button>
                          )
                    )
                  : (
                      <button
                        type="button"
                        onClick={handleEnroll}
                        disabled={pending}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
                      >
                        {pending
                          ? t('CoursePage.enrolling')
                          : course.requiresApproval
                            ? t('CoursePage.requestEnroll')
                            : t('CoursePage.enroll')}
                      </button>
                    )}

              <div className="mt-2.5 flex gap-2">
                <button type="button" className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border bg-white px-3.5 py-2 text-[13px] font-medium">
                  <BookmarkSimple size={14} />
                  {' '}
                  {t('CoursePage.save')}
                </button>
                <button type="button" className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border bg-white px-3.5 py-2 text-[13px] font-medium">
                  <ShareNetwork size={14} />
                  {' '}
                  {t('CoursePage.share')}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t px-4 py-3.5 text-xs">
              <div>
                <div className="mb-0.5 text-muted-foreground">{t('CoursePage.duration')}</div>
                <div className="font-medium">
                  {t('CoursePage.weeksLessonsShort', { weeks: course.weeks.length, lessons: lessonCount })}
                </div>
              </div>
              <div>
                <div className="mb-0.5 text-muted-foreground">{t('CoursePage.certificate')}</div>
                <div className="inline-flex items-center gap-1 font-medium">
                  <Certificate size={14} />
                  {course.grantsCertificate ? t('CoursePage.granted') : t('CoursePage.notGranted')}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Tabs */}
      <div className="mt-7 flex gap-7 border-b">
        {tabs.map((tabItem) => {
          const active = tab === tabItem.id
          return (
            <button
              key={tabItem.id}
              type="button"
              onClick={() => setTab(tabItem.id)}
              className={cn(
                'inline-flex items-center gap-2 border-b-2 px-1 pb-3 text-sm',
                active
                  ? 'border-blue-700 font-semibold text-foreground'
                  : 'border-transparent font-medium text-muted-foreground',
              )}
            >
              {tabItem.label}
              {tabItem.badge !== undefined && (
                <span
                  className={cn(
                    'rounded-full px-1.5 py-px text-[11px] font-semibold',
                    active ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-muted-foreground',
                  )}
                >
                  {tabItem.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Body */}
      <div className="mt-7 grid grid-cols-1 gap-9 lg:grid-cols-[1fr_360px]">
        <div>
          {tab === 'genel' && (
            <section>
              <h2 className="mb-3 text-lg font-semibold tracking-tight">{t('CoursePage.description')}</h2>
              <p className="max-w-2xl text-sm leading-relaxed">
                {course.description ?? t('CoursePage.noDescription')}
              </p>
            </section>
          )}

          {tab === 'mufredat' && (
            <section>
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="text-lg font-semibold tracking-tight">{t('CoursePage.curriculum')}</h2>
                <button
                  type="button"
                  onClick={() => setShowSyllabus(true)}
                  className="inline-flex items-center gap-1 text-[13px] font-medium text-blue-700"
                >
                  {t('CoursePage.viewFullSyllabus')}
                  {' '}
                  <ArrowRight size={13} />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {previewWeeks.map(week => (
                  <WeekModule
                    key={week.id}
                    week={week}
                    open={openWeek === week.id}
                    onToggle={() => setOpenWeek(openWeek === week.id ? null : week.id)}
                    courseId={enrolled ? course.id : undefined}
                  />
                ))}
              </div>
              {remaining > 0 && (
                <button
                  type="button"
                  onClick={() => setShowSyllabus(true)}
                  className="mt-3.5 w-full rounded-lg border px-4 py-2.5 text-[13px] font-medium"
                >
                  {t('CoursePage.viewRemaining', { count: remaining })}
                </button>
              )}
            </section>
          )}

          {tab === 'muderris' && (
            <section className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {course.muderris.map(m => (
                <div key={m.id} className="flex gap-3.5 rounded-xl border p-4">
                  <HueAvatar name={initials(m.name)} hue={m.avatarHue} size={48} />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{m.name}</div>
                    {m.title && <div className="mb-1.5 text-xs text-muted-foreground">{m.title}</div>}
                    {m.bio && <p className="text-xs leading-relaxed">{m.bio}</p>}
                  </div>
                </div>
              ))}
            </section>
          )}

          {tab === 'kaynak' && (
            <section className="flex flex-col gap-2">
              {course.resources.map(r => (
                <ResourceRow key={r.id} resource={r} />
              ))}
              {course.resources.length === 0 && (
                <p className="text-sm text-muted-foreground">{t('CoursePage.noResources')}</p>
              )}
            </section>
          )}
        </div>

        {/* Right sidebar */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">{t('CoursePage.courseResources')}</h3>
              <span className="text-[11px] text-muted-foreground">{course.resources.length}</span>
            </div>
            <div className="flex flex-col gap-2">
              {course.resources.map(r => (
                <ResourceRow key={r.id} resource={r} compact />
              ))}
              {course.resources.length === 0 && (
                <p className="text-xs text-muted-foreground">{t('CoursePage.noResources')}</p>
              )}
            </div>
          </div>

          {course.grantsCertificate && (
            <div className="rounded-2xl border bg-slate-50 p-5">
              <div className="mb-1.5 flex items-center gap-2.5">
                <Certificate size={18} />
                <span className="text-sm font-semibold">{t('CoursePage.icazetTitle')}</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {t('CoursePage.icazetDescription')}
              </p>
            </div>
          )}
        </aside>
      </div>

      <SyllabusModal course={course} open={showSyllabus} onOpenChange={setShowSyllabus} />
    </div>
  )
}

const ResourceRow = ({
  resource,
  compact,
}: {
  resource: ResourceResponse
  compact?: boolean
}) => (
  <a
    href={resource.url ?? '#'}
    className="flex items-center gap-3 rounded-lg border border-slate-100 p-2.5 text-inherit no-underline"
  >
    <div className="grid size-8 place-items-center rounded-md bg-slate-50 text-muted-foreground">
      <ResourceIcon type={resource.type} />
    </div>
    <div className="min-w-0 flex-1">
      <div className="truncate text-[13px] font-medium">{resource.name}</div>
      {resource.meta && <div className="text-[11px] text-muted-foreground">{resource.meta}</div>}
    </div>
    {!compact && <ArrowRight size={14} className="text-muted-foreground" />}
  </a>
)
