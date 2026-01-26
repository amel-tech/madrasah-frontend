/**
 * Hero-Statistics Section Component
 * 
 * This section combines the Hero and Statistics components
 * in a single viewport-height section.
 */

'use client'

import { HeroSection } from './hero-section'
import { StatisticsSection } from './statistics-section'

/**
 * Hero-Statistics Component
 * 
 * Combines Hero and Statistics sections in one full-viewport section.
 */
export function HeroStatisticsSection() {
  return (
    <div className="min-h-[calc(100vh-80px)] sm:h-[calc(100vh-80px)] flex flex-col">
      {/* Hero Section - Takes remaining space and centers content */}
      <div className="flex-1 flex items-center justify-center py-4 sm:py-0">
        <HeroSection />
      </div>

      {/* Statistics Section - At the bottom of viewport */}
      <StatisticsSection />
    </div>
  )
}
