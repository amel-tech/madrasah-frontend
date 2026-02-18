/**
 * Smart Decks Section Component
 *
 * This component displays the Smart Decks feature section
 * with background image, title, description, CTA button, image, and popular courses.
 */

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@madrasah/ui/lib/utils'
import { smartDecksData } from './data'
import { StarIcon } from '~/components/icons/smart-decks/star-icon'
import { StudentIcon } from '~/components/icons/smart-decks/student-icon'
import { YoutubeIcon } from '~/components/icons/smart-decks/youtube-icon'

/**
 * Smart Decks Component
 *
 * Displays the Smart Decks section with background image,
 * promotional content, call-to-action, and popular courses.
 */
export function SmartDecksSection() {
  return (
    <section
      className={cn(
        'relative min-h-screen overflow-visible',
        smartDecksData.colors.section.background,
      )}
    >
      {/* Smart Decks Content with Background Image - Container with white margins */}
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-8 sm:py-12 md:py-16">
        <div
          className="relative rounded-2xl py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 shadow-lg overflow-hidden flex items-center justify-center"
          style={{
            backgroundImage: 'url(/images/background/smart-decks/smart-decks.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            minHeight: '400px',
          }}
        >
          <div className="relative z-10 flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12 items-center justify-between px-4 sm:px-8 md:px-16 lg:px-32 w-full">
            {/* Left Side - Content */}
            <div className="max-w-md text-center lg:text-left">
              <h2
                className={cn(
                  'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6',
                  smartDecksData.colors.mainContent.title,
                )}
              >
                {smartDecksData.title}
              </h2>
              <p
                className={cn(
                  'text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-7 md:mb-8 leading-relaxed',
                  smartDecksData.colors.mainContent.description,
                )}
              >
                {smartDecksData.description}
              </p>
              <Link
                href={smartDecksData.ctaButton.href}
                className={cn(
                  'inline-block px-6 py-2.5 sm:px-7 sm:py-2.5 md:px-8 md:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors',
                  smartDecksData.colors.mainContent.button.background,
                  smartDecksData.colors.mainContent.button.text,
                  smartDecksData.colors.mainContent.button.hoverBackground,
                  smartDecksData.colors.mainContent.button.shadow,
                )}
              >
                {smartDecksData.ctaButton.label}
              </Link>
            </div>

            {/* Right Side - Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-md">
                <Image
                  src={smartDecksData.image.src}
                  alt={smartDecksData.image.alt}
                  width={500}
                  height={800}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Courses Section - White Background */}
      <div
        id="courses"
        className={cn(
          'py-8 sm:py-10 md:py-12 overflow-visible',
          smartDecksData.colors.popularCourses.sectionBackground,
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative" style={{ paddingBottom: '150px' }}>
          {/* Background Image - Foreground */}
          <div className="absolute left-0 right-0 z-30 pointer-events-none" style={{ top: '-100px', bottom: '-80px' }}>
            <Image
              src="/images/background/smart-decks/smart-decks-bg.png"
              alt=""
              width={1200}
              height={400}
              className="w-full h-auto"
              style={{
                objectFit: 'contain',
              }}
              unoptimized
            />
          </div>

          {/* Content - Above background */}
          <div className="relative z-10">
            <h2
              className={cn(
                'text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8 md:mb-12',
                smartDecksData.colors.popularCourses.title,
              )}
            >
              {smartDecksData.popularCourses.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {smartDecksData.popularCourses.items.map(course => (
                <div
                  key={course.id}
                  className={cn(
                    'rounded-lg overflow-hidden transition-shadow p-5 sm:p-6 md:p-7 gap-6 flex flex-col',
                    smartDecksData.colors.popularCourses.card.background,
                    smartDecksData.colors.popularCourses.card.shadow,
                    smartDecksData.colors.popularCourses.card.hoverShadow,
                  )}
                >
                  {/* Image Placeholder */}
                  <div className="aspect-video relative">
                    <Image
                      src={course.image.src}
                      alt={course.image.alt}
                      fill
                      className="object-cover rounded-lg"
                      unoptimized
                    />
                  </div>
                  {/* Content */}
                  <div>
                    <h3
                      className={cn(
                        'text-base sm:text-lg font-bold',
                        smartDecksData.colors.popularCourses.card.title,
                      )}
                    >
                      {course.title}
                    </h3>
                    <p
                      className={cn(
                        'text-xs sm:text-sm mb-1',
                        smartDecksData.colors.popularCourses.card.author,
                      )}
                    >
                      {course.author}
                    </p>

                    {/* Stats */}
                    <div
                      className={cn(
                        'flex items-center gap-3 sm:gap-4 text-xs mb-2 sm:mb-3',
                        smartDecksData.colors.popularCourses.card.stats,
                      )}
                    >
                      <div className="flex items-center gap-1">
                        <YoutubeIcon width={12} height={12} />
                        <span>{course.stats.lessons}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <StarIcon width={12} height={12} />
                        <span>{course.stats.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <StudentIcon width={12} height={12} />
                        <span>{course.stats.students}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className={cn(
                        'text-xs line-clamp-2',
                        smartDecksData.colors.popularCourses.card.description,
                      )}
                    >
                      {course.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
