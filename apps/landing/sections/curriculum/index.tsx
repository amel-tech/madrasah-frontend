import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { curriculumFilters, curriculumCourses } from './data'

export async function CurriculumSection() {
  const t = await getTranslations('landing.curriculum')

  return (
    <div className="py-24 bg-background-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-primary mb-4">{t('title')}</h2>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {curriculumFilters.map((filter, index) => (
              <button
                key={filter}
                className={
                  index === 0
                    ? 'px-8 py-2.5 rounded-full bg-primary text-white font-medium text-xs tracking-widest uppercase'
                    : 'px-8 py-2.5 rounded-full bg-white border border-gray-200 text-gray-500 hover:border-secondary hover:text-secondary transition-all text-xs tracking-widest uppercase'
                }
              >
                {t(`filters.${filter}`)}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {curriculumCourses.map(course => (
            <div
              key={course.key}
              className="group relative overflow-hidden rounded-3xl aspect-[3/4] shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              <Image
                alt={t(`courses.${course.key}.title`)}
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                src={course.image}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 course-card-overlay" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h4 className="font-display text-2xl font-bold mb-2">{t(`courses.${course.key}.title`)}</h4>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">
                  {t(`courses.${course.key}.level`)} &bull; {t(`courses.${course.key}.lessons`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
