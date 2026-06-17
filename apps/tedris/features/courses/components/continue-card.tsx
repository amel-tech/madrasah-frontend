import Link from 'next/link'
import {
  ArrowRightIcon,
  CaretRightIcon,
  MadrasahLogoIcon,
} from '@madrasah/icons/ssr'
import type { EnrolledCourseResponse } from '@madrasah/services/tedrisat'
import { CoverPlaceholder } from './cover'

export type ContinueCardLabels = {
  continue: string
  completed: string
}

export const ContinueCard = ({
  course,
  labels,
}: {
  course: EnrolledCourseResponse
  labels: ContinueCardLabels
}) => {
  const progress = Math.min(100, Math.max(0, course.enrollment.progress))

  return (
    <Link
      href={`/courses/${course.id}`}
      className="flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-colors hover:border-slate-300"
    >
      <div className="relative p-2.5">
        <CoverPlaceholder
          hue={course.coverHue}
          label={course.category ?? undefined}
          className="h-28"
        />
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 py-1 pl-1 pr-2.5 text-[11px] font-semibold">
          <span
            className="grid size-[18px] place-items-center rounded"
            style={{ background: `oklch(0.92 0.05 ${course.coverHue})` }}
          >
            <MadrasahLogoIcon size={13} />
          </span>
          {course.koskName}
        </div>
        <div className="absolute bottom-5 right-5 grid size-10 place-items-center rounded-full bg-white shadow-md">
          <CaretRightIcon size={18} weight="bold" />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-1">
        <h3 className="text-[15px] font-semibold leading-snug tracking-tight">
          {course.title}
        </h3>
        {course.subtitle && (
          <div className="mt-0.5 text-xs text-muted-foreground">
            {course.subtitle}
          </div>
        )}

        <div className="mt-auto pt-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-900"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">
              %
              {progress}
              {' '}
              {labels.completed}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold">
              {labels.continue}
              {' '}
              <ArrowRightIcon size={13} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
