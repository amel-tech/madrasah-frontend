/**
 * Courses-Institute Section Component
 * 
 * This component displays Popular Courses and Digitize Your Institute sections.
 */

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { coursesInstituteData } from './data'

/**
 * Courses-Institute Component
 * 
 * Displays popular courses grid and institute partnership section.
 */
export function CoursesInstituteSection() {
  return (
    <section 
      className={`relative min-h-screen ${coursesInstituteData.colors.section.background} py-8 sm:py-12 md:py-16 overflow-visible`}
      style={{
        backgroundImage: 'url(/images/background/courses-institute/courses-institute-bg.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center calc(50% + 120px)',
        backgroundSize: 'cover',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Digitize Your Institute Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Left Side - Image */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-md">
              <Image
                src={coursesInstituteData.institute.image.src}
                alt={coursesInstituteData.institute.image.alt}
                width={500}
                height={600}
                className="w-full h-auto"
                unoptimized
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${coursesInstituteData.colors.institute.title} mb-4 sm:mb-5 md:mb-6`}>
              {coursesInstituteData.institute.title}
            </h2>
            <p className={`text-sm sm:text-base md:text-lg ${coursesInstituteData.colors.institute.description} mb-6 sm:mb-7 md:mb-8`}>
              {coursesInstituteData.institute.description}
            </p>
            <Link
              href={coursesInstituteData.institute.ctaButton.href}
              className={`inline-block px-6 py-2.5 sm:px-7 sm:py-2.5 md:px-8 md:py-3 ${coursesInstituteData.colors.institute.button.background} ${coursesInstituteData.colors.institute.button.text} rounded-lg font-medium text-sm sm:text-base ${coursesInstituteData.colors.institute.button.hoverBackground} transition-colors`}
            >
              {coursesInstituteData.institute.ctaButton.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
