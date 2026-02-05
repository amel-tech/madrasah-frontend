/**
 * Statistics Section Component
 * 
 * This component displays statistics with numbers and labels.
 */

'use client'

import { cn } from '@madrasah/ui/lib/utils'
import { statisticsData } from './data'

/**
 * Statistics Component
 * 
 * Displays statistics in a grid layout with values and labels.
 */
export function StatisticsSection() {
  return (
    <section className={cn(statisticsData.colors.background)}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statisticsData.items.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="rounded-lg p-8 flex flex-col items-center text-center flex-1">
                <div
                  className={cn(
                    'text-4xl md:text-5xl font-bold mb-2',
                    statisticsData.colors.value
                  )}
                >
                  {item.value}
                </div>
                <div className={cn('text-lg', statisticsData.colors.label)}>
                  {item.label}
                </div>
              </div>
              {index < statisticsData.items.length - 1 && (
                <div
                  className={cn(
                    'w-1 h-[60px] mx-3 hidden md:block',
                    statisticsData.colors.divider
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
