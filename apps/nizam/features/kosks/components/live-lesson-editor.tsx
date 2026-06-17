'use client'

import { useTranslations } from 'next-intl'
import {
  HeadsetIcon as Headset,
  PlusIcon as Plus,
  TrashIcon as Trash,
  XIcon as X,
  CheckIcon as Check,
} from '@madrasah/icons'
import { Input } from '@madrasah/ui/components/input'
import { Label } from '@madrasah/ui/components/label'
import { resolveMeetingPlatform } from '@madrasah/utils'

export type AgendaStepDraft = { time: string, title: string }

export type LiveLessonDraft = {
  id?: string
  title: string
  /** datetime-local input value; '' = unset */
  scheduledAt: string
  /** minutes as string; '' = unset */
  durationMinutes: string
  meetingUrl: string
  agenda: AgendaStepDraft[]
}

export const emptyLiveLesson = (): LiveLessonDraft => ({
  title: '',
  scheduledAt: '',
  durationMinutes: '60',
  meetingUrl: '',
  agenda: [],
})

/**
 * Inline editor opened by "Canlı ders ekle" (or by editing an existing
 * live lesson). The meeting platform is never picked manually — it is
 * resolved from the URL and shown as a confirmation chip.
 */
export const LiveLessonEditor = ({
  draft,
  onChange,
  onSave,
  onCancel,
}: {
  draft: LiveLessonDraft
  onChange: (draft: LiveLessonDraft) => void
  onSave: () => void
  onCancel: () => void
}) => {
  const t = useTranslations('nizam')
  const platform = resolveMeetingPlatform(draft.meetingUrl)
  const canSave = Boolean(draft.title.trim() && draft.meetingUrl.trim())

  const patch = (p: Partial<LiveLessonDraft>) => onChange({ ...draft, ...p })
  const patchStep = (i: number, p: Partial<AgendaStepDraft>) =>
    patch({ agenda: draft.agenda.map((s, idx) => (idx === i ? { ...s, ...p } : s)) })

  return (
    <div className="m-1 rounded-xl border bg-white p-4 shadow-lg">
      {/* header */}
      <div className="mb-4 flex items-center gap-2.5">
        <span className="grid size-7 place-items-center rounded-lg bg-red-50 text-red-600">
          <Headset size={15} />
        </span>
        <span className="text-sm font-bold">
          {draft.id ? t('NewCoursePage.editLiveLesson') : t('NewCoursePage.newLiveLesson')}
        </span>
        <button
          type="button"
          onClick={onCancel}
          className="ml-auto grid size-7 place-items-center rounded-md text-muted-foreground"
          aria-label={t('NewCoursePage.cancelLiveLesson')}
        >
          <X size={16} />
        </button>
      </div>

      {/* title */}
      <div>
        <Label className="mb-1.5 text-xs font-medium">
          {t('NewCoursePage.liveLessonTitle')}
          <span className="text-destructive"> *</span>
        </Label>
        <Input
          placeholder={t('NewCoursePage.liveLessonTitlePlaceholder')}
          value={draft.title}
          onChange={e => patch({ title: e.target.value })}
        />
      </div>

      {/* schedule */}
      <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_140px]">
        <div>
          <Label className="mb-1.5 text-xs font-medium">{t('NewCoursePage.liveLessonWhen')}</Label>
          <Input
            type="datetime-local"
            value={draft.scheduledAt}
            onChange={e => patch({ scheduledAt: e.target.value })}
          />
        </div>
        <div>
          <Label className="mb-1.5 text-xs font-medium">{t('NewCoursePage.liveLessonDuration')}</Label>
          <Input
            type="number"
            min={5}
            step={5}
            value={draft.durationMinutes}
            onChange={e => patch({ durationMinutes: e.target.value })}
          />
        </div>
      </div>

      {/* meeting URL — platform auto-resolved from the link */}
      <div className="mt-3.5">
        <Label className="mb-1.5 text-xs font-medium">
          {t('NewCoursePage.meetingUrl')}
          <span className="text-destructive"> *</span>
        </Label>
        <Input
          className="font-mono text-[13px]"
          placeholder="https://meet.google.com/…"
          value={draft.meetingUrl}
          onChange={e => patch({ meetingUrl: e.target.value })}
        />
        {draft.meetingUrl.trim() && (
          <div className="mt-2 flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{ color: platform.color, background: platform.soft }}
            >
              <span className="size-2 rounded-full" style={{ background: platform.color }} />
              {platform.id === 'unknown' ? t('NewCoursePage.platformUnknown') : platform.label}
            </span>
            <span className="text-xs text-muted-foreground">{t('NewCoursePage.platformDetected')}</span>
          </div>
        )}
      </div>

      {/* müzakere akışı (agenda) */}
      <div className="mt-4">
        <div className="mb-2 flex items-baseline gap-2">
          <span className="text-xs font-medium">{t('NewCoursePage.agendaTitle')}</span>
          <span className="text-xs text-muted-foreground">{t('NewCoursePage.agendaHint')}</span>
        </div>
        <div className="flex flex-col gap-2">
          {draft.agenda.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                className="w-24 shrink-0 text-center tabular-nums"
                placeholder={t('NewCoursePage.agendaTimePlaceholder')}
                value={step.time}
                onChange={e => patchStep(i, { time: e.target.value })}
              />
              <Input
                placeholder={t('NewCoursePage.agendaStepPlaceholder')}
                value={step.title}
                onChange={e => patchStep(i, { title: e.target.value })}
              />
              <button
                type="button"
                onClick={() => patch({ agenda: draft.agenda.filter((_, idx) => idx !== i) })}
                className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground"
                aria-label={t('NewCoursePage.remove')}
              >
                <Trash size={14} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => patch({ agenda: [...draft.agenda, { time: '', title: '' }] })}
            className="inline-flex items-center gap-1.5 self-start py-1 text-xs font-medium text-emerald-700"
          >
            <Plus size={13} />
            {' '}
            {t('NewCoursePage.agendaAddStep')}
          </button>
        </div>
      </div>

      {/* footer */}
      <div className="mt-4 flex justify-end gap-2 border-t pt-3.5">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border bg-white px-3.5 py-2 text-sm font-medium"
        >
          {t('NewCoursePage.cancelLiveLesson')}
        </button>
        <button
          type="button"
          disabled={!canSave}
          onClick={onSave}
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          <Check size={15} />
          {' '}
          {t('NewCoursePage.saveLiveLesson')}
        </button>
      </div>
    </div>
  )
}
