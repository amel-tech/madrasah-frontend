'use client'

import { useMemo, useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from '@madrasah/ui/components/sonner'
import {
  MagnifyingGlassIcon as Search,
  StarIcon as Star,
  SealCheckIcon as SealCheck,
  CaretDownIcon as CaretDown,
  MadrasahLogoIcon,
} from '@madrasah/icons'
import { cn } from '@madrasah/ui/lib/utils'
import type { KoskResponse } from '@madrasah/services/tedrisat'
import { CoverPlaceholder, HueAvatar } from './cover'
import { followKosk, unfollowKosk } from '../actions'

type Muderris = { name: string, avatarHue: number }
type Filter = 'all' | 'following' | 'recommended' | 'new'

const initials = (name: string) =>
  name.split(' ').filter(Boolean).slice(-2).map(w => w[0]).join('').toUpperCase()

export const KoskListPage = ({
  kosks,
  featured,
  featuredMuderris,
}: {
  kosks: KoskResponse[]
  featured: KoskResponse | null
  featuredMuderris: Muderris[]
}) => {
  const t = useTranslations('tedris')
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [filter, setFilter] = useState<Filter>('all')
  const [field, setField] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const levelLabel = (level: string | null) => {
    switch (level) {
      case 'ALL': return t('KoskListPage.allLevels')
      case 'BEGINNER': return t('Levels.BEGINNER')
      case 'INTERMEDIATE': return t('Levels.INTERMEDIATE')
      case 'ADVANCED': return t('Levels.ADVANCED')
      default: return null
    }
  }

  const onToggleFollow = (kosk: KoskResponse) =>
    startTransition(async () => {
      const res = kosk.isFollowing
        ? await unfollowKosk(kosk.id)
        : await followKosk(kosk.id)
      if (res.success === false) {
        toast.error(res.error)
        return
      }
      router.refresh()
    })

  const fields = useMemo(() => {
    const map = new Map<string, number>()
    for (const k of kosks) {
      const key = k.field ?? t('KoskListPage.uncategorized')
      map.set(key, (map.get(key) ?? 0) + 1)
    }
    return Array.from(map)
  }, [kosks, t])

  const featuredVisible
    = filter === 'all' && !field && !search.trim() && Boolean(featured)

  const visible = useMemo(() => {
    const q = search.trim().toLocaleLowerCase('tr')
    let list = kosks.filter((k) => {
      if (filter === 'following' && !k.isFollowing) return false
      if (filter === 'recommended' && !(k.featured || k.verified)) return false
      if (field && (k.field ?? t('KoskListPage.uncategorized')) !== field) return false
      if (q && !`${k.name} ${k.handle ?? ''} ${k.description ?? ''}`.toLocaleLowerCase('tr').includes(q))
        return false
      return true
    })
    list = [...list].sort((a, b) =>
      filter === 'new'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : b.studentCount - a.studentCount,
    )
    if (featuredVisible && featured) list = list.filter(k => k.id !== featured.id)
    return list
  }, [kosks, filter, field, search, featured, featuredVisible, t])

  const filters: { id: Filter, label: string }[] = [
    { id: 'all', label: t('KoskListPage.filterAll') },
    { id: 'following', label: t('KoskListPage.filterFollowing') },
    { id: 'recommended', label: t('KoskListPage.filterRecommended') },
    { id: 'new', label: t('KoskListPage.filterNew') },
  ]

  return (
    <div className="pb-16">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <span>{t('TabView.learning')}</span>
        <span>›</span>
        <span className="font-medium text-foreground">{t('KoskListPage.breadcrumbKosks')}</span>
      </nav>

      {/* Title + search */}
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight">{t('KoskListPage.title')}</h1>
          <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">{t('KoskListPage.subtitle')}</p>
        </div>
        <div className="flex w-60 items-center gap-2 rounded-lg border bg-white px-3.5 py-2 text-muted-foreground">
          <Search size={16} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('KoskListPage.searchPlaceholder')}
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Featured banner */}
      {featuredVisible && featured && (
        <FeaturedBanner
          kosk={featured}
          muderris={featuredMuderris}
          t={t}
          pending={pending}
          onToggleFollow={onToggleFollow}
        />
      )}

      {/* Filter pills */}
      <div className="mb-5 flex items-center gap-2">
        {filters.map(f => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-[13px] font-medium',
              filter === f.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-foreground',
            )}
          >
            {f.label}
          </button>
        ))}
        <span className="flex-1" />
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg border bg-white px-3.5 py-2 text-[13px] font-medium"
        >
          {t('KoskListPage.sortPopular')}
          {' '}
          <CaretDown size={13} />
        </button>
      </div>

      {/* Sidebar + grid */}
      <div className="grid grid-cols-[200px_1fr] gap-7">
        <aside>
          <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            {t('KoskListPage.fields')}
          </div>
          <ul className="flex flex-col gap-0.5">
            <FieldItem label={t('KoskListPage.allFields')} count={kosks.length} active={!field} onClick={() => setField(null)} />
            {fields.map(([f, count]) => (
              <FieldItem key={f} label={f} count={count} active={field === f} onClick={() => setField(f)} />
            ))}
          </ul>

          <div className="my-4 h-px bg-slate-100" />

          <div className="rounded-xl bg-slate-50 p-3.5">
            <div className="text-[13px] font-semibold">{t('KoskListPage.openKoskTitle')}</div>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {t('KoskListPage.openKoskHint')}
            </p>
            <button
              type="button"
              className="mt-2.5 w-full rounded-lg border bg-white py-2 text-[13px] font-medium"
            >
              {t('KoskListPage.apply')}
            </button>
          </div>
        </aside>

        <main className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map(k => (
            <KoskCard
              key={k.id}
              kosk={k}
              t={t}
              levelLabel={levelLabel}
              pending={pending}
              onToggleFollow={onToggleFollow}
            />
          ))}
          {visible.length === 0 && (
            <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
              {t('KoskListPage.empty')}
            </p>
          )}
        </main>
      </div>
    </div>
  )
}

const FieldItem = ({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) => (
  <li>
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-sm',
        active ? 'bg-slate-100 font-semibold text-foreground' : 'font-medium text-muted-foreground',
      )}
    >
      <span>{label}</span>
      <span className="text-[11px] text-slate-400">{count}</span>
    </button>
  </li>
)

const FollowButton = ({
  kosk,
  t,
  pending,
  onToggleFollow,
  className,
}: {
  kosk: KoskResponse
  t: ReturnType<typeof useTranslations>
  pending: boolean
  onToggleFollow: (k: KoskResponse) => void
  className?: string
}) => (
  <button
    type="button"
    disabled={pending}
    onClick={(e) => {
      e.preventDefault()
      onToggleFollow(kosk)
    }}
    className={cn(
      'rounded-lg px-3 py-1.5 text-xs font-semibold disabled:opacity-60',
      kosk.isFollowing ? 'bg-slate-100 text-muted-foreground' : 'border bg-white text-foreground',
      className,
    )}
  >
    {kosk.isFollowing ? t('KoskListPage.following') : t('KoskListPage.follow')}
  </button>
)

const KoskCard = ({
  kosk,
  t,
  levelLabel,
  pending,
  onToggleFollow,
}: {
  kosk: KoskResponse
  t: ReturnType<typeof useTranslations>
  levelLabel: (l: string | null) => string | null
  pending: boolean
  onToggleFollow: (k: KoskResponse) => void
}) => (
  <Link
    href={`/kosks/${kosk.id}`}
    className="flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-colors hover:border-slate-300"
  >
    <div className="relative">
      <CoverPlaceholder hue={kosk.coverHue} className="h-20 rounded-none" />
      <div className="absolute -bottom-6 left-4 grid size-12 place-items-center rounded-xl border bg-white">
        <MadrasahLogoIcon size={34} />
      </div>
    </div>
    <div className="flex flex-1 flex-col px-4 pb-4 pt-8">
      <div className="flex items-center gap-2">
        <h3 className="text-[15px] font-semibold tracking-tight">{kosk.name}</h3>
        {kosk.verified && <SealCheck size={15} weight="fill" className="text-blue-700" />}
        <span className="flex-1" />
        <span className="inline-flex items-center gap-1 text-xs font-semibold">
          <Star size={12} weight="fill" className="text-amber-500" />
          {' '}
          {kosk.rating.toFixed(1)}
        </span>
      </div>
      <div className="mt-0.5 text-xs text-muted-foreground">
        {kosk.handle}
        {levelLabel(kosk.level) && (
          <>
            {' · '}
            {levelLabel(kosk.level)}
          </>
        )}
      </div>
      {kosk.description && (
        <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-muted-foreground">
          {kosk.description}
        </p>
      )}
      {kosk.tags.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {kosk.tags.slice(0, 3).map(tag => (
            <span key={tag} className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium">{tag}</span>
          ))}
        </div>
      )}
      <div className="mt-auto flex items-center justify-between pt-3.5">
        <div className="flex gap-3.5 text-xs text-muted-foreground">
          <span>
            {kosk.courseCount}
            {' '}
            {t('KoskListPage.coursesShort')}
          </span>
          <span>
            {kosk.studentCount}
            {' '}
            {t('KoskListPage.studentsShort')}
          </span>
        </div>
        <FollowButton kosk={kosk} t={t} pending={pending} onToggleFollow={onToggleFollow} />
      </div>
    </div>
  </Link>
)

const FeaturedBanner = ({
  kosk,
  muderris,
  t,
  pending,
  onToggleFollow,
}: {
  kosk: KoskResponse
  muderris: Muderris[]
  t: ReturnType<typeof useTranslations>
  pending: boolean
  onToggleFollow: (k: KoskResponse) => void
}) => (
  <div className="mb-6 grid grid-cols-[300px_1fr] overflow-hidden rounded-2xl border bg-white">
    <div className="relative">
      <CoverPlaceholder hue={kosk.coverHue} className="h-full rounded-none" />
      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold">
        {t('KoskListPage.featured')}
      </span>
      <div className="absolute bottom-4 left-4 grid size-16 place-items-center rounded-xl border bg-white">
        <MadrasahLogoIcon size={40} />
      </div>
    </div>
    <div className="flex flex-col justify-center gap-3 p-6">
      <div className="flex items-center gap-2.5">
        <h2 className="text-[22px] font-bold tracking-tight">{kosk.name}</h2>
        <span className="text-sm text-muted-foreground">{kosk.handle}</span>
        {kosk.verified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
            <SealCheck size={12} weight="fill" />
            {' '}
            {t('KoskListPage.verified')}
          </span>
        )}
      </div>
      {kosk.description && (
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{kosk.description}</p>
      )}
      <div className="flex items-center gap-7">
        <Stat value={kosk.courseCount} label={t('KoskListPage.statCourses')} />
        <Stat value={kosk.studentCount} label={t('KoskListPage.statStudents')} />
        <Stat value={kosk.muderrisCount} label={t('KoskListPage.statMuderris')} />
        <span className="inline-flex items-center gap-1 text-sm font-semibold">
          <Star size={14} weight="fill" className="text-amber-500" />
          {' '}
          {kosk.rating.toFixed(1)}
        </span>
      </div>
      <div className="flex items-center gap-4">
        {muderris.length > 0 && (
          <div className="flex">
            {muderris.slice(0, 4).map((m, i) => (
              <div key={m.name} style={{ marginLeft: i ? -8 : 0 }}>
                <HueAvatar name={initials(m.name)} hue={m.avatarHue} size={30} />
              </div>
            ))}
          </div>
        )}
        <span className="flex-1" />
        <FollowButton kosk={kosk} t={t} pending={pending} onToggleFollow={onToggleFollow} className="px-4 py-2 text-[13px]" />
        <Link
          href={`/kosks/${kosk.id}`}
          className="rounded-lg bg-slate-900 px-4 py-2 text-[13px] font-medium text-white"
        >
          {t('KoskListPage.enterKosk')}
        </Link>
      </div>
    </div>
  </div>
)

const Stat = ({ value, label }: { value: number, label: string }) => (
  <div className="flex items-baseline gap-1">
    <span className="text-lg font-bold tracking-tight">{value}</span>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
)
