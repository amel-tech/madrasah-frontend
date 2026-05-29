import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import {
  CalendarBlankIcon as CalendarBlank,
  LockIcon as Lock,
  PlayCircleIcon as PlayCircle,
  BookOpenIcon as BookOpen,
  PlusIcon as Plus,
  MadrasahLogoIcon,
} from '@madrasah/icons/ssr'
import type {
  CourseSummaryResponse,
  KoskResponse,
} from '@madrasah/services/tedrisat'
import { cn } from '@madrasah/ui/lib/utils'
import { Breadcrumbs } from '@madrasah/ui/components/breadcrumb'
import { CoverPlaceholder, HueAvatar } from './cover'
import { levelLabel } from './labels'

export const KoskPage = async ({
  kosk,
  courses,
}: {
  kosk: KoskResponse
  courses: CourseSummaryResponse[]
}) => {
  const t = await getTranslations('tedris')

  const categories = Array.from(
    courses.reduce((map, c) => {
      const key = c.category ?? t('KoskPage.uncategorized')
      map.set(key, (map.get(key) ?? 0) + 1)
      return map
    }, new Map<string, number>()),
  )

  return (
    <div className="pb-16">
      {/* Breadcrumb */}
      <Breadcrumbs
        className="mb-5"
        linkComponent={Link}
        items={[
          { label: t('TabView.learning'), href: '/learning' },
          { label: t('KoskPage.kosks'), href: '/learning' },
          { label: kosk.name },
        ]}
      />

      {/* Köşk header card */}
      <div className="mb-7 grid grid-cols-[auto_1fr_auto] items-center gap-6 rounded-2xl border bg-gradient-to-b from-slate-50 to-white p-6">
        <div className="relative">
          <div
            className="grid size-24 place-items-center rounded-2xl border"
            style={{ background: `oklch(0.95 0.05 ${kosk.coverHue})` }}
          >
            <MadrasahLogoIcon size={56} />
          </div>
          {kosk.isPrivate && (
            <span className="absolute -bottom-1.5 -right-1.5 inline-flex items-center gap-1 rounded-full border bg-white px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
              <Lock size={11} />
              {' '}
              {t('KoskPage.private')}
            </span>
          )}
        </div>

        <div>
          <div className="mb-1.5 flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight">{kosk.name}</h1>
            {kosk.handle && (
              <span className="text-sm text-muted-foreground">{kosk.handle}</span>
            )}
          </div>
          {kosk.description && (
            <p className="mb-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {kosk.description}
            </p>
          )}
        </div>

        <div className="flex gap-7 border-l pl-6">
          {[
            { label: t('KoskPage.courses'), value: kosk.courseCount ?? courses.length },
            { label: t('KoskPage.students'), value: '—' },
          ].map(s => (
            <div key={s.label} className="min-w-14 text-center">
              <div className="text-2xl font-bold tracking-tight">{s.value}</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar + grid */}
      <div className="grid grid-cols-[200px_1fr] gap-7">
        <aside>
          <div className="mb-2.5 pl-2.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            {t('KoskPage.categories')}
          </div>
          <ul className="flex flex-col gap-0.5">
            <li className="flex items-center justify-between rounded-lg bg-slate-100 px-2.5 py-2 text-sm font-semibold">
              <span>{t('KoskPage.allCourses')}</span>
              <span className="text-[11px] text-slate-400">{courses.length}</span>
            </li>
            {categories.map(([cat, count]) => (
              <li
                key={cat}
                className="flex items-center justify-between rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground"
              >
                <span>{cat}</span>
                <span className="text-[11px] text-slate-400">{count}</span>
              </li>
            ))}
          </ul>
        </aside>

        <main className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} t={t} />
          ))}
          {courses.length === 0 && (
            <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
              {t('KoskPage.noCourses')}
            </p>
          )}
        </main>
      </div>
    </div>
  )
}

const CourseCard = ({
  course,
  t,
}: {
  course: CourseSummaryResponse
  t: Awaited<ReturnType<typeof getTranslations>>
}) => {
  const muderris = course.muderris?.[0]
  const progress = course.enrollment?.progress ?? 0
  const enrolled = Boolean(course.enrollment)
  const completed = course.enrollment?.status === 'COMPLETED'

  return (
    <Link
      href={`/courses/${course.id}`}
      className="flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-colors hover:border-slate-300"
    >
      <div className="p-2.5">
        <CoverPlaceholder hue={course.coverHue} label={course.category ?? undefined} className="h-32" />
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4">
        <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-wide text-muted-foreground">
          <span className="font-semibold">{course.category}</span>
          {course.category && <span className="size-[3px] rounded-full bg-slate-300" />}
          <span>{levelLabel(course.level, t)}</span>
        </div>

        <h3 className="text-base font-semibold leading-snug tracking-tight">{course.title}</h3>
        {course.subtitle && (
          <p className="mt-1 text-xs text-muted-foreground">{course.subtitle}</p>
        )}

        {muderris && (
          <div className="mt-3 flex items-center gap-2">
            <HueAvatar name={initials(muderris.name)} hue={muderris.avatarHue} size={22} />
            <span className="text-xs">{muderris.name}</span>
          </div>
        )}

        <div className="mt-3 flex gap-3.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CalendarBlank size={13} />
            {' '}
            {t('KoskPage.weeksCount', { count: course.weekCount })}
          </span>
          <span className="inline-flex items-center gap-1">
            <PlayCircle size={13} />
            {' '}
            {t('KoskPage.lessonsCount', { count: course.lessonCount })}
          </span>
          <span className="inline-flex items-center gap-1">
            <BookOpen size={13} />
            {' '}
            {t('KoskPage.resourcesCount', { count: course.resourceCount })}
          </span>
        </div>

        <div className="mt-auto pt-3.5">
          {enrolled
            ? (
                <>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={cn('h-full rounded-full', completed ? 'bg-green-600' : 'bg-blue-700')}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="mt-1.5 flex justify-between text-[11px]">
                    <span className={completed ? 'font-medium text-green-600' : 'font-medium text-muted-foreground'}>
                      {completed
                        ? t('KoskPage.completed')
                        : t('KoskPage.percentComplete', { percent: progress })}
                    </span>
                  </div>
                </>
              )
            : (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700">
                  <Plus size={13} />
                  {' '}
                  {t('KoskPage.enroll')}
                </span>
              )}
        </div>
      </div>
    </Link>
  )
}

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(-2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
