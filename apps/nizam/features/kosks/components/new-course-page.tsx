'use client'

import { useMemo, useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  PlusIcon as Plus,
  TrashIcon as Trash,
  XIcon as X,
  CertificateIcon as Certificate,
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

type LessonDraft = { id?: string, title: string, type: CreateLessonDtoTypeEnum, duration: string, kaynak: string }
type WeekDraft = { id?: string, title: string, summary: string, lessons: LessonDraft[] }
type MuderrisDraft = { id?: string, name: string, title: string }
type ResourceDraft = { id?: string, name: string, meta: string }

const newLesson = (): LessonDraft => ({ title: '', type: CreateLessonDtoTypeEnum.Video, duration: '', kaynak: '' })
const newWeek = (): WeekDraft => ({ title: '', summary: '', lessons: [newLesson()] })

export const NewCoursePage = ({
  kosk,
  course,
}: {
  kosk: KoskResponse
  course?: CourseDetailResponse
}) => {
  const t = useTranslations('nizam')
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const isEdit = Boolean(course)

  const [title, setTitle] = useState(course?.title ?? '')
  const [description, setDescription] = useState(course?.description ?? '')
  const [category, setCategory] = useState(course?.category ?? '')
  const [level, setLevel] = useState<CreateCourseDtoLevelEnum>(
    (course?.level as CreateCourseDtoLevelEnum) ?? CreateCourseDtoLevelEnum.Beginner,
  )
  const [durationWeeks, setDurationWeeks] = useState(
    course?.durationWeeks ? String(course.durationWeeks) : '',
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
          })),
        }))
      : [newWeek()],
  )

  const lessonCount = useMemo(
    () => weeks.reduce((s, w) => s + w.lessons.filter(l => l.title.trim()).length, 0),
    [weeks],
  )

  const buildDto = (status: CreateCourseDtoStatusEnum): CreateCourseDto => ({
    title: title.trim(),
    description: description.trim() || undefined,
    category: category.trim() || undefined,
    level,
    durationWeeks: durationWeeks ? Number(durationWeeks) : undefined,
    status,
    grantsCertificate,
    requiresApproval,
    muderris: muderris
      .filter(m => m.name.trim())
      .map(m => ({ id: m.id, name: m.name.trim(), title: m.title.trim() || undefined })),
    resources: resources
      .filter(r => r.name.trim())
      .map(r => ({ id: r.id, name: r.name.trim(), meta: r.meta.trim() || undefined })),
    weeks: weeks
      .filter(w => w.title.trim())
      .map((w, i) => ({
        id: w.id,
        weekNumber: i + 1,
        title: w.title.trim(),
        summary: w.summary.trim() || undefined,
        lessons: w.lessons
          .filter(l => l.title.trim())
          .map(l => ({
            id: l.id,
            title: l.title.trim(),
            type: l.type,
            duration: l.duration.trim() || undefined,
            kaynak: l.kaynak.trim() || undefined,
          })),
      })),
  })

  const submit = (status: CreateCourseDtoStatusEnum) => {
    if (!title.trim()) {
      toast.error(t('NewCoursePage.validationTitle'))
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
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
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
              <Field label={t('NewCoursePage.fieldDuration')}>
                <Input
                  type="number"
                  min={0}
                  value={durationWeeks}
                  onChange={e => setDurationWeeks(e.target.value)}
                />
              </Field>
            </div>
          </Section>

          {/* Teachers & resources */}
          <Section title={t('NewCoursePage.sectionTeachers')} hint={t('NewCoursePage.sectionTeachersHint')}>
            <Field label={t('NewCoursePage.muderris')}>
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
          <Section title={t('NewCoursePage.sectionCurriculum')} hint={t('NewCoursePage.sectionCurriculumHint')}>
            <div className="flex flex-col gap-3">
              {weeks.map((w, wi) => (
                <div key={wi} className="rounded-xl border">
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
                      onClick={() => setWeeks(weeks.filter((_, idx) => idx !== wi))}
                      className="grid size-8 place-items-center rounded-md text-muted-foreground"
                      aria-label={t('NewCoursePage.remove')}
                    >
                      <Trash size={15} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 p-2.5">
                    {w.lessons.map((l, li) => (
                      <div key={li} className="flex items-center gap-2">
                        <Input
                          className="flex-1"
                          placeholder={t('NewCoursePage.lessonTitlePlaceholder')}
                          value={l.title}
                          onChange={e => setWeeks(updLesson(weeks, wi, li, { title: e.target.value }))}
                        />
                        <Select
                          value={l.type}
                          onValueChange={v => setWeeks(updLesson(weeks, wi, li, { type: v as CreateLessonDtoTypeEnum }))}
                        >
                          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {Object.values(CreateLessonDtoTypeEnum).map(v => (
                              <SelectItem key={v} value={v}>{t(`LessonTypes.${v}`)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          className="w-24"
                          placeholder={t('NewCoursePage.lessonDurationPlaceholder')}
                          value={l.duration}
                          onChange={e => setWeeks(updLesson(weeks, wi, li, { duration: e.target.value }))}
                        />
                        <button
                          type="button"
                          onClick={() => setWeeks(updWeek(weeks, wi, { lessons: w.lessons.filter((_, idx) => idx !== li) }))}
                          className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground"
                          aria-label={t('NewCoursePage.remove')}
                        >
                          <X size={15} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setWeeks(updWeek(weeks, wi, { lessons: [...w.lessons, newLesson()] }))}
                      className="inline-flex items-center gap-1.5 self-start px-2 py-1.5 text-xs font-medium text-blue-700"
                    >
                      <Plus size={12} />
                      {' '}
                      {t('NewCoursePage.addLesson')}
                    </button>
                  </div>
                </div>
              ))}
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
                <span>{t('NewCoursePage.previewWeeks', { count: weeks.filter(w => w.title.trim()).length })}</span>
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

const updLesson = (
  weeks: WeekDraft[],
  wi: number,
  li: number,
  patch: Partial<LessonDraft>,
): WeekDraft[] =>
  weeks.map((w, idx) =>
    idx === wi
      ? { ...w, lessons: w.lessons.map((l, j) => (j === li ? { ...l, ...patch } : l)) }
      : w,
  )

const Section = ({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: React.ReactNode
}) => (
  <section className="rounded-2xl border bg-white p-5">
    <div className="mb-4">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
    <div className="flex flex-col gap-3.5">{children}</div>
  </section>
)

const Field = ({
  label,
  hint,
  required,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) => (
  <div className="block">
    <Label className="mb-1.5 text-xs font-medium">
      {label}
      {required && <span className="text-destructive"> *</span>}
    </Label>
    {children}
    {hint && <p className="mt-1.5 text-[11px] text-muted-foreground">{hint}</p>}
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
