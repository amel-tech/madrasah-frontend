/**
 * Statistics Section Component
 * 
 * This component displays statistics with numbers and labels.
 */

'use client'

import { statisticsData } from './data'

/**
 * Statistics Component
 * 
 * Displays statistics in a grid layout with values and labels.
 */
export function StatisticsSection() {
  return (
    <section className={statisticsData.colors.background}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statisticsData.items.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="rounded-lg p-8 flex flex-col items-center text-center flex-1">
                <div className={`text-4xl md:text-5xl font-bold ${statisticsData.colors.value} mb-2`}>
                  {item.value}
                </div>
                <div className={`text-lg ${statisticsData.colors.label}`}>
                  {item.label}
                </div>
              </div>
              {index < statisticsData.items.length - 1 && (
                <div className={`w-1 h-[60px] ${statisticsData.colors.divider} mx-3 hidden md:block`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
