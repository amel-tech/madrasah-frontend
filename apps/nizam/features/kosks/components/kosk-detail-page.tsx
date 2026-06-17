import Link from 'next/link'
import { Button } from '@madrasah/ui/components/button'
import { Badge } from '@madrasah/ui/components/badge'
import {
  PlusIcon,
  PencilSimpleIcon,
  CalendarBlankIcon,
  PlayCircleIcon,
  BookOpenIcon,
} from '@madrasah/icons/ssr'
import { KoskFormDialog } from '~/features/kosks/components/kosk-form-dialog'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@madrasah/ui/components/card'
import type {
  KoskResponse,
  CourseSummaryResponse,
  PendingEnrollmentResponse,
} from '@madrasah/services/tedrisat'
import { PendingRequests } from '~/features/kosks/components/pending-requests'

const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: 'Başlangıç',
  INTERMEDIATE: 'Orta',
  ADVANCED: 'İleri',
}

export function KoskDetailPage({
  kosk,
  courses,
  pendingEnrollments = [],
}: {
  kosk: KoskResponse
  courses: CourseSummaryResponse[]
  pendingEnrollments?: PendingEnrollmentResponse[]
}) {
  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{kosk.name}</h1>
          <p className="text-muted-foreground mt-2">
            Bu köşkte yer alan dersler ve müfredat yönetimi.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <PendingRequests koskId={kosk.id} requests={pendingEnrollments} />
          <KoskFormDialog
            kosk={kosk}
            trigger={(
              <Button variant="outline" size="lg" className="gap-2">
                <PencilSimpleIcon className="w-5 h-5" />
                Köşkü Düzenle
              </Button>
            )}
          />
          <Button
            asChild
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
          >
            <Link href={`/kosks/${kosk.id}/courses/new`}>
              <PlusIcon className="w-5 h-5" />
              Yeni Ders Aç
            </Link>
          </Button>
        </div>
      </div>

      {courses.length > 0
        ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <Link
                  key={course.id}
                  href={`/kosks/${kosk.id}/courses/${course.id}/edit`}
                  className="block"
                >
                  <Card className="overflow-hidden group pt-0 h-full transition-all hover:shadow-lg">
                    <div
                      className="relative h-40 w-full"
                      style={{
                        background: `linear-gradient(135deg, oklch(0.94 0.04 ${course.coverHue}) 0%, oklch(0.88 0.07 ${course.coverHue}) 100%)`,
                      }}
                    >
                      <div className="absolute right-3 top-3">
                        <Badge variant={course.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                          {course.status === 'PUBLISHED' ? 'Yayında' : 'Taslak'}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="mb-1 flex items-center gap-2 text-[11px] uppercase tracking-wide text-muted-foreground">
                        {course.category && <span className="font-semibold">{course.category}</span>}
                        {course.category && <span className="size-[3px] rounded-full bg-muted-foreground/50" />}
                        <span>{LEVEL_LABELS[course.level] ?? course.level}</span>
                      </div>
                      <CardTitle className="line-clamp-1 text-lg">{course.title}</CardTitle>
                      {course.subtitle && (
                        <CardDescription className="line-clamp-2">{course.subtitle}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <CalendarBlankIcon className="w-4 h-4" />
                          <span>
                            {course.weekCount}
                            {' '}
                            hafta
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <PlayCircleIcon className="w-4 h-4" />
                          <span>
                            {course.lessonCount}
                            {' '}
                            ders
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <BookOpenIcon className="w-4 h-4" />
                          <span>
                            {course.resourceCount}
                            {' '}
                            kaynak
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )
        : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/30">
              <h3 className="text-lg font-medium text-muted-foreground">
                Henüz ders oluşturulmamış
              </h3>
              <p className="text-sm text-muted-foreground/80 mt-1">
                Yeni bir ders oluşturarak başlayın.
              </p>
            </div>
          )}
    </div>
  )
}
