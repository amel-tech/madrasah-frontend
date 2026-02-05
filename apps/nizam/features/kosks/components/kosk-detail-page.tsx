import { Button } from '@madrasah/ui/components/button'
import { PlusIcon, UsersIcon, ClockIcon } from '@madrasah/icons/ssr'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@madrasah/ui/components/card'
import Image from 'next/image'
import { CourseWizard } from '~/features/kosks/components/wizard/course-wizard'
import type { Kosk, Course } from '~/features/kosks/types'

export function KoskDetailPage({ kosk, courses }: { kosk: Kosk; courses: Course[] }) {
  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{kosk.name}</h1>
          <p className="text-muted-foreground mt-2">Bu köşkte yer alan dersler ve müfredat yönetimi.</p>
        </div>
        <CourseWizard>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
            <PlusIcon className="w-5 h-5" />
            Yeni Ders Aç
          </Button>
        </CourseWizard>
      </div>

      {courses.length > 0
        ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="relative h-48 w-full">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1 text-lg">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <UsersIcon className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ClockIcon className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/30">
              <h3 className="text-lg font-medium text-muted-foreground">Henüz ders oluşturulmamış</h3>
              <p className="text-sm text-muted-foreground/80 mt-1">Yeni bir ders oluşturarak başlayın.</p>
            </div>
          )}
    </div>
  )
}
