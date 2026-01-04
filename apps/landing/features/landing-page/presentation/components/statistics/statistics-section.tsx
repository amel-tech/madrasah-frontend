/**
 * Presentation Layer - Presentational Component
 * 
 * This is a "dumb" component that only handles presentation.
 * It receives all data via props and has no business logic.
 * Following Presentation-Container Pattern.
 */

'use client'

import type { StatisticsConfig } from '../../../domain/entities/landing.types'

interface StatisticsSectionProps {
  readonly config: StatisticsConfig
}

/**
 * Presentational Statistics Component
 * 
 * This component follows:
 * - Single Responsibility Principle (SRP): Only responsible for rendering
 * - Component-Based Architecture: Reusable, isolated component
 */
export function StatisticsSection({ config }: StatisticsSectionProps) {
  return (
    <section className="bg-white py-12 border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {config.items.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {item.value}
              </div>
              <div className="text-lg text-gray-600">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


