'use client'

import { useEffect, useState } from 'react'
import { useFormatter, useTranslations } from 'next-intl'

/** Tolerant "60 dk" → 60; falls back to 60 when the text has no number. */
export const parseDurationMinutes = (duration: string | null | undefined): number =>
  Number(/(\d+)/.exec(duration ?? '')?.[1] ?? 60)

export type LiveStatus = 'upcoming' | 'soon' | 'live' | 'ended'

export const liveStatusOf = (
  scheduledAt: Date,
  durationMinutes: number,
  now: Date,
): LiveStatus => {
  const start = scheduledAt.getTime()
  const end = start + durationMinutes * 60_000
  if (now.getTime() >= end) return 'ended'
  if (now.getTime() >= start) return 'live'
  if (start - now.getTime() < 60 * 60_000) return 'soon'
  return 'upcoming'
}

/**
 * Red live badge for the join card. `now` starts as null so the server
 * and the first client paint agree (absolute date); the countdown
 * upgrades after mount and refreshes every 30s.
 */
export const LiveStatusBadge = ({
  scheduledAt,
  duration,
}: {
  scheduledAt: Date | null | undefined
  duration: string | null | undefined
}) => {
  const t = useTranslations('tedris')
  const format = useFormatter()
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  if (!scheduledAt) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-muted-foreground">
        {t('LessonPage.statusUnscheduled')}
      </span>
    )
  }

  const status = now ? liveStatusOf(scheduledAt, parseDurationMinutes(duration), now) : 'upcoming'

  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
        <span className="size-2 animate-pulse rounded-full bg-white" />
        {t('LessonPage.statusLive')}
      </span>
    )
  }

  if (status === 'ended') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-muted-foreground">
        {t('LessonPage.statusEnded')}
      </span>
    )
  }

  const label
    = status === 'soon' && now
      ? t('LessonPage.statusSoon', {
          minutes: Math.max(1, Math.round((scheduledAt.getTime() - now.getTime()) / 60_000)),
        })
      : format.dateTime(scheduledAt, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
      <span className="size-2 rounded-full bg-red-500" />
      {label}
    </span>
  )
}
