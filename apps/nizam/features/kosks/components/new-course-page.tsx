'use client'

import { useMemo, useState, useTransition } from 'react'
import { useFormatter, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  PlusIcon as Plus,
  TrashIcon as Trash,
  CopyIcon as Copy,
  XIcon as X,
  CalendarBlankIcon as CalendarBlank,
  CertificateIcon as Certificate,
  HeadsetIcon as Headset,
  PencilSimpleIcon as PencilSimple,
  ShieldCheckIcon as ShieldCheck,
} from '@madrasah/icons'
import { Input } from '@madrasah/ui/components/input'
import { Textarea } from '@madrasah/ui/components/textarea'
import { Label } from '@madrasah/ui/components/label'
import { toast } from '@madrasah/ui/components/sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@madrasah/ui/components/select'
import {
  CreateCourseDtoLevelEnum,
  CreateCourseDtoStatusEnum,
  CreateLessonDtoTypeEnum,
  type CreateCourseDto,
  type CourseDetailResponse,
  type KoskResponse,
} from '@madrasah/services/tedrisat'
import {
  createKoskCourse,
  updateKoskCourse,
} from '~/features/kosks/actions/courses'
import {
  LiveLessonEditor,
  emptyLiveLesson,
  type AgendaStepDraft,
  type LiveLessonDraft,
} from './live-lesson-editor'

type LessonDraft = {
  id?: string
  title: string
  type: CreateLessonDtoTypeEnum
  duration: string
  kaynak: string
  /** datetime-local value; '' = unset */
  scheduledAt: string
  meetingUrl: string
  agenda: AgendaStepDraft[]
}
type WeekDraft = { id?: string, title: string, summary: string, lessons: LessonDraft[] }
type MuderrisDraft = { id?: string, name: string, title: string }
type ResourceDraft = { id?: string, name: string, meta: string }

const newWeek = (): WeekDraft => ({ title: '', summary: '', lessons: [] })

/** Convert an API Date to the value of an <input type="datetime-local">
 *  in the editor's local zone. */
const toDatetimeLocal = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const parseMinutes = (duration: string): string => /(\d+)/.exec(duration)?.[1] ?? ''

const toLiveDraft = (l: LessonDraft): LiveLessonDraft => ({
  id: l.id,
  title: l.title,
  scheduledAt: l.scheduledAt,
  durationMinutes: parseMinutes(l.duration) || '60',
  meetingUrl: l.meetingUrl,
  agenda: l.agenda,
})

const fromLiveDraft = (d: LiveLessonDraft, prev?: LessonDraft): LessonDraft => ({
  id: d.id,
  title: d.title,
  type: CreateLessonDtoTypeEnum.Live,
  duration: d.durationMinutes ? `${d.durationMinutes} dk` : '',
  kaynak: prev?.kaynak ?? '',
  scheduledAt: d.scheduledAt,
  meetingUrl: d.meetingUrl,
  agenda: d.agenda,
})

export const NewCoursePage = ({
  kosk,
  course,
}: {
  kosk: KoskResponse
  course?: CourseDetailResponse
}) => {
  const t = useTranslations('nizam')
  const format = useFormatter()
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const isEdit = Boolean(course)

  const [title, setTitle] = useState(course?.title ?? '')
  const [description, setDescription] = useState(course?.description ?? '')
  const [category, setCategory] = useState(course?.category ?? '')
  const [level, setLevel] = useState<CreateCourseDtoLevelEnum>(
    (course?.level as CreateCourseDtoLevelEnum) ?? CreateCourseDtoLevelEnum.Beginner,
  )
  const [grantsCertificate, setGrantsCertificate] = useState(course?.grantsCertificate ?? false)
  const [requiresApproval, setRequiresApproval] = useState(course?.requiresApproval ?? false)
  const [muderris, setMuderris] = useState<MuderrisDraft[]>(
    course?.muderris.length
      ? course.muderris.map(m => ({ id: m.id, name: m.name, title: m.title ?? '' }))
      : [{ name: '', title: '' }],
  )
  const [resources, setResources] = useState<ResourceDraft[]>(
    course?.resources.map(r => ({ id: r.id, name: r.name, meta: r.meta ?? '' })) ?? [],
  )
  // Hydrating every lesson field matters: PUT /courses/:id is a full
  // replace, so anything missing here gets nulled on the next save.
  const [weeks, setWeeks] = useState<WeekDraft[]>(
    course?.weeks.length
      ? course.weeks.map(w => ({
          id: w.id,
          title: w.title,
          summary: w.summary ?? '',
          lessons: w.lessons.map(l => ({
            id: l.id,
            title: l.title,
            type: l.type as CreateLessonDtoTypeEnum,
            duration: l.duration ?? '',
            kaynak: l.kaynak ?? '',
            scheduledAt: l.scheduledAt ? toDatetimeLocal(new Date(l.scheduledAt)) : '',
            meetingUrl: l.meetingUrl ?? '',
            agenda: l.agenda?.map(s => ({ time: s.time, title: s.title })) ?? [],
          })),
        }))
      : [newWeek()],
  )

  // One inline live-lesson editor at a time: `li === null` means a new
  // lesson is being added to week `wi`; a number means lesson `li` of
  // week `wi` is being edited.
  const [editor, setEditor] = useState<{ wi: number, li: number | null, draft: LiveLessonDraft } | null>(null)

  // Errors only surface after a submit attempt, so the form doesn't shout
  // at the user while they're still filling it in.
  const [attempted, setAttempted] = useState(false)
  const muderrisInvalid = !muderris.some(m => m.name.trim())
  const isWeekEmpty = (w: WeekDraft) => !w.lessons.some(l => l.title.trim())

  const saveEditor = () => {
    if (!editor) return
    setWeeks(weeks.map((w, idx) => {
      if (idx !== editor.wi) return w
      const lessons = editor.li === null
        ? [...w.lessons, fromLiveDraft(editor.draft)]
        : w.lessons.map((l, j) => (j === editor.li ? fromLiveDraft(editor.draft, l) : l))
      return { ...w, lessons }
    }))
    setEditor(null)
  }

  // Duplicate a week (with its lessons) right below the original. The clone
  // drops every id so the backend creates fresh records instead of moving
  // the originals on the next PUT replace.
  const copyWeek = (wi: number) => {
    const src = weeks[wi]
    if (!src) return
    const clone: WeekDraft = {
      title: src.title.trim() ? `${src.title} ${t('NewCoursePage.weekCopySuffix')}` : '',
      summary: src.summary,
      lessons: src.lessons.map(l => ({
        ...l,
        id: undefined,
        agenda: l.agenda.map(s => ({ ...s })),
      })),
    }
    setWeeks([...weeks.slice(0, wi + 1), clone, ...weeks.slice(wi + 1)])
  }

  const lessonCount = useMemo(
    () => weeks.reduce((s, w) => s + w.lessons.filter(l => l.title.trim()).length, 0),
    [weeks],
  )

  const buildDto = (status: CreateCourseDtoStatusEnum): CreateCourseDto => {
    const builtWeeks = weeks
      .filter(w => w.lessons.some(l => l.title.trim()))
      .map((w, i) => ({
        id: w.id,
        weekNumber: i + 1,
        // Week title is optional in the UI but required by the backend, so
        // fall back to "Hafta N" when the muderris left it blank.
        title: w.title.trim() || t('NewCoursePage.week', { number: i + 1 }),
        summary: w.summary.trim() || undefined,
        lessons: w.lessons
          .filter(l => l.title.trim())
          .map((l) => {
            const agenda = l.agenda
              .filter(s => s.title.trim())
              .map(s => ({ time: s.time.trim(), title: s.title.trim() }))
            return {
              id: l.id,
              title: l.title.trim(),
              type: l.type,
              duration: l.duration.trim() || undefined,
              kaynak: l.kaynak.trim() || undefined,
              scheduledAt: l.scheduledAt ? new Date(l.scheduledAt) : undefined,
              meetingUrl: l.meetingUrl.trim() || undefined,
              agenda: agenda.length ? agenda : undefined,
            }
          }),
      }))
    return {
      title: title.trim(),
      description: description.trim() || undefined,
      category: category.trim() || undefined,
      level,
      // Duration is derived from the curriculum — one week per added week.
      durationWeeks: builtWeeks.length || undefined,
      status,
      grantsCertificate,
      requiresApproval,
      muderris: muderris
        .filter(m => m.name.trim())
        .map(m => ({ id: m.id, name: m.name.trim(), title: m.title.trim() || undefined })),
      resources: resources
        .filter(r => r.name.trim())
        .map(r => ({ id: r.id, name: r.name.trim(), meta: r.meta.trim() || undefined })),
      weeks: builtWeeks,
    }
  }

  const submit = (status: CreateCourseDtoStatusEnum) => {
    setAttempted(true)
    if (!title.trim()) {
      toast.error(t('NewCoursePage.validationTitle'))
      return
    }
    if (muderrisInvalid) {
      toast.error(t('NewCoursePage.validationMuderris'))
      return
    }
    // Duration is derived from the weeks, so at least one week is required.
    if (weeks.length === 0) {
      toast.error(t('NewCoursePage.validationNoWeeks'))
      return
    }
    // Every week must carry at least one lesson, otherwise the empty week
    // would be dropped on save and the duration would silently shrink.
    if (weeks.some(isWeekEmpty)) {
      toast.error(t('NewCoursePage.validationEmptyWeek'))
      return
    }
    startTransition(async () => {
      const dto = buildDto(status)
      const res = course
        ? await updateKoskCourse(kosk.id, course.id, dto)
        : await createKoskCourse(kosk.id, dto)
      if (res.success === false) {
        toast.error(res.error)
        return
      }
      toast.success(t(isEdit ? 'NewCoursePage.updated' : 'NewCoursePage.created'))
      router.push(`/kosks/${kosk.id}`)
    })
  }

  return (
    <div className="mx-auto max-w-6xl pb-16">
      {/* Heading */}
      <div className="mb-6 flex items-end justify-between border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isEdit ? t('NewCoursePage.editTitle') : t('NewCoursePage.title')}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{t('NewCoursePage.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/kosks/${kosk.id}`}
            className="rounded-lg border bg-white px-3.5 py-2 text-sm font-medium"
          >
            {t('NewCoursePage.cancel')}
          </Link>
          <button
            type="button"
            disabled={pending}
            onClick={() => submit(CreateCourseDtoStatusEnum.Draft)}
            className="rounded-lg border bg-white px-3.5 py-2 text-sm font-medium disabled:opacity-60"
          >
            {t('NewCoursePage.saveDraft')}
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => submit(CreateCourseDtoStatusEnum.Published)}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {pending ? t('NewCoursePage.publishing') : t('NewCoursePage.publish')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_340px]">
        {/* LEFT: form */}
        <div className="flex flex-col gap-6">
          {/* Basic info */}
          <Section title={t('NewCoursePage.sectionBasic')} hint={t('NewCoursePage.sectionBasicHint')}>
            <Field label={t('NewCoursePage.fieldTitle')} required>
              <Input value={title} onChange={e => setTitle(e.target.value)} />
            </Field>
            <Field label={t('NewCoursePage.fieldDescription')} hint={t('NewCoursePage.fieldDescriptionHint')}>
              <Textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} />
            </Field>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <Field label={t('NewCoursePage.fieldCategory')}>
                <Input
                  placeholder={t('NewCoursePage.categoryPlaceholder')}
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                />
              </Field>
              <Field label={t('NewCoursePage.fieldLevel')}>
                <Select value={level} onValueChange={v => setLevel(v as CreateCourseDtoLevelEnum)}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.values(CreateCourseDtoLevelEnum).map(v => (
                      <SelectItem key={v} value={v}>{t(`Levels.${v}`)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </Section>

          {/* Teachers & resources */}
          <Section title={t('NewCoursePage.sectionTeachers')} hint={t('NewCoursePage.sectionTeachersHint')}>
            <Field
              label={t('NewCoursePage.muderris')}
              required
              error={attempted && muderrisInvalid ? t('NewCoursePage.validationMuderris') : undefined}
            >
              <div className="flex flex-col gap-2">
                {muderris.map((m, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      placeholder={t('NewCoursePage.muderrisNamePlaceholder')}
                      value={m.name}
                      onChange={e => setMuderris(upd(muderris, i, { name: e.target.value }))}
                    />
                    <button
                      type="button"
                      onClick={() => setMuderris(muderris.filter((_, idx) => idx !== i))}
                      className="grid size-9 shrink-0 place-items-center rounded-lg border text-muted-foreground"
                      aria-label={t('NewCoursePage.remove')}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <AddButton onClick={() => setMuderris([...muderris, { name: '', title: '' }])}>
                  {t('NewCoursePage.addMuderris')}
                </AddButton>
              </div>
            </Field>

            <Field label={t('NewCoursePage.resources')}>
              <div className="flex flex-col gap-2">
                {resources.map((r, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      placeholder={t('NewCoursePage.resourceNamePlaceholder')}
                      value={r.name}
                      onChange={e => setResources(upd(resources, i, { name: e.target.value }))}
                    />
                    <Input
                      placeholder={t('NewCoursePage.resourceMetaPlaceholder')}
                      value={r.meta}
                      onChange={e => setResources(upd(resources, i, { meta: e.target.value }))}
                    />
                    <button
                      type="button"
                      onClick={() => setResources(resources.filter((_, idx) => idx !== i))}
                      className="grid size-9 shrink-0 place-items-center rounded-lg border text-muted-foreground"
                      aria-label={t('NewCoursePage.remove')}
                    >
                      <Trash size={15} />
                    </button>
                  </div>
                ))}
                <AddButton onClick={() => setResources([...resources, { name: '', meta: '' }])}>
                  {t('NewCoursePage.addResource')}
                </AddButton>
              </div>
            </Field>
          </Section>

          {/* Curriculum */}
          <Section title={t('NewCoursePage.sectionCurriculum')} hint={t('NewCoursePage.sectionCurriculumHint')} required>
            <div className="flex flex-col gap-3">
              {weeks.map((w, wi) => {
                const weekInvalid = attempted && isWeekEmpty(w)
                return (
                  <div key={wi} className={`rounded-xl border ${weekInvalid ? 'border-destructive' : ''}`}>
                    <div className="flex items-center gap-2.5 border-b bg-slate-50 px-3.5 py-2.5">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {t('NewCoursePage.week', { number: wi + 1 })}
                      </span>
                      <Input
                        className="h-8 flex-1 border-none bg-transparent px-0 font-semibold shadow-none focus-visible:ring-0"
                        placeholder={t('NewCoursePage.weekTitlePlaceholder')}
                        value={w.title}
                        onChange={e => setWeeks(upd(weeks, wi, { title: e.target.value }))}
                      />
                      <button
                        type="button"
                        onClick={() => copyWeek(wi)}
                        className="grid size-8 place-items-center rounded-md text-muted-foreground"
                        aria-label={t('NewCoursePage.copyWeek')}
                        title={t('NewCoursePage.copyWeek')}
                      >
                        <Copy size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setWeeks(weeks.filter((_, idx) => idx !== wi))}
                        className="grid size-8 place-items-center rounded-md text-muted-foreground"
                        aria-label={t('NewCoursePage.remove')}
                      >
                        <Trash size={15} />
                      </button>
                    </div>
                    <div className="flex flex-col gap-1.5 p-2.5">
                      {w.lessons.map((l, li) => {
                        const isLive = l.type === CreateLessonDtoTypeEnum.Live
                        if (editor && editor.wi === wi && editor.li === li) {
                          return (
                            <LiveLessonEditor
                              key={li}
                              draft={editor.draft}
                              onChange={draft => setEditor({ ...editor, draft })}
                              onSave={saveEditor}
                              onCancel={() => setEditor(null)}
                            />
                          )
                        }
                        return (
                          <div key={li} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
                            <span className={`grid size-7 shrink-0 place-items-center rounded-lg ${isLive ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                              <Headset size={14} />
                            </span>
                            <span className="min-w-0 flex-1 truncate text-sm">{l.title}</span>
                            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${isLive ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                              {t(`LessonTypes.${l.type}`)}
                            </span>
                            {l.scheduledAt && (
                              <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                                <CalendarBlank size={13} />
                                {format.dateTime(new Date(l.scheduledAt), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                              </span>
                            )}
                            {l.duration && (
                              <span className="w-12 shrink-0 text-right text-xs text-muted-foreground">{l.duration}</span>
                            )}
                            {isLive && (
                              <button
                                type="button"
                                onClick={() => setEditor({ wi, li, draft: toLiveDraft(l) })}
                                className="grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground"
                                aria-label={t('NewCoursePage.editLiveLesson')}
                              >
                                <PencilSimple size={14} />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setWeeks(updWeek(weeks, wi, { lessons: w.lessons.filter((_, idx) => idx !== li) }))}
                              className="grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground"
                              aria-label={t('NewCoursePage.remove')}
                            >
                              <X size={15} />
                            </button>
                          </div>
                        )
                      })}
                      {editor && editor.wi === wi && editor.li === null
                        ? (
                            <LiveLessonEditor
                              draft={editor.draft}
                              onChange={draft => setEditor({ ...editor, draft })}
                              onSave={saveEditor}
                              onCancel={() => setEditor(null)}
                            />
                          )
                        : (
                            <button
                              type="button"
                              onClick={() => setEditor({ wi, li: null, draft: emptyLiveLesson() })}
                              className="inline-flex items-center gap-1.5 self-start px-2 py-1.5 text-xs font-medium text-red-600"
                            >
                              <Plus size={12} />
                              {' '}
                              {t('NewCoursePage.addLiveLesson')}
                            </button>
                          )}
                      {weekInvalid && (
                        <p className="px-2 pt-0.5 text-[11px] text-destructive">
                          {t('NewCoursePage.validationEmptyWeek')}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
              {attempted && weeks.length === 0 && (
                <p className="text-[11px] text-destructive">{t('NewCoursePage.validationNoWeeks')}</p>
              )}
              <AddButton onClick={() => setWeeks([...weeks, newWeek()])}>
                {t('NewCoursePage.addWeek')}
              </AddButton>
            </div>
          </Section>
        </div>

        {/* RIGHT: preview + settings */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border bg-white p-3.5">
            <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              {t('NewCoursePage.preview')}
            </div>
            <div
              className="h-28 rounded-lg"
              style={{ background: `linear-gradient(135deg, oklch(0.94 0.04 145) 0%, oklch(0.88 0.07 145) 100%)` }}
            />
            <div className="mt-3">
              {category && (
                <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {category}
                </div>
              )}
              <h3 className="text-[15px] font-semibold tracking-tight">
                {title || t('NewCoursePage.untitledCourse')}
              </h3>
              {description && (
                <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{description}</p>
              )}
              <div className="mt-3 flex gap-3.5 text-xs text-muted-foreground">
                <span>{t('NewCoursePage.previewWeeks', { count: weeks.filter(w => w.title.trim() || w.lessons.some(l => l.title.trim())).length })}</span>
                <span>{t('NewCoursePage.previewLessons', { count: lessonCount })}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-slate-50 p-3.5">
            <label className="flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                checked={grantsCertificate}
                onChange={e => setGrantsCertificate(e.target.checked)}
                className="mt-0.5"
              />
              <span>
                <span className="flex items-center gap-1.5 text-sm font-semibold">
                  <Certificate size={16} />
                  {' '}
                  {t('NewCoursePage.grantsCertificate')}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                  {t('NewCoursePage.grantsCertificateHint')}
                </span>
              </span>
            </label>
          </div>

          <div className="rounded-2xl border bg-slate-50 p-3.5">
            <label className="flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                checked={requiresApproval}
                onChange={e => setRequiresApproval(e.target.checked)}
                className="mt-0.5"
              />
              <span>
                <span className="flex items-center gap-1.5 text-sm font-semibold">
                  <ShieldCheck size={16} />
                  {' '}
                  {t('NewCoursePage.requiresApproval')}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                  {t('NewCoursePage.requiresApprovalHint')}
                </span>
              </span>
            </label>
          </div>
        </aside>
      </div>
    </div>
  )
}

// helpers
const upd = <T,>(arr: T[], i: number, patch: Partial<T>): T[] =>
  arr.map((item, idx) => (idx === i ? { ...item, ...patch } : item))

const updWeek = (weeks: WeekDraft[], wi: number, patch: Partial<WeekDraft>): WeekDraft[] =>
  weeks.map((w, idx) => (idx === wi ? { ...w, ...patch } : w))

const Section = ({
  title,
  hint,
  required,
  children,
}: {
  title: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) => (
  <section className="rounded-2xl border bg-white p-5">
    <div className="mb-4">
      <h2 className="text-base font-semibold tracking-tight">
        {title}
        {required && <span className="text-destructive"> *</span>}
      </h2>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
    <div className="flex flex-col gap-3.5">{children}</div>
  </section>
)

const Field = ({
  label,
  hint,
  required,
  error,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) => (
  <div className="block">
    <Label className="mb-1.5 text-xs font-medium">
      {label}
      {required && <span className="text-destructive"> *</span>}
    </Label>
    {children}
    {error
      ? <p className="mt-1.5 text-[11px] text-destructive">{error}</p>
      : hint && <p className="mt-1.5 text-[11px] text-muted-foreground">{hint}</p>}
  </div>
)

const AddButton = ({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-dashed px-3 py-2.5 text-[13px] font-medium text-muted-foreground"
  >
    <PlusIconInline />
    {' '}
    {children}
  </button>
)

const PlusIconInline = () => <Plus size={14} />
