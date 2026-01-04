/**
 * Presentation Layer - Container Component
 * 
 * This is a "smart" component that handles data fetching and business logic.
 * It uses use cases to get data and passes it to presentational components.
 * Following Presentation-Container Pattern.
 */

'use client'

import { useEffect, useState } from 'react'
import { StatisticsSection } from './statistics-section'
import type { StatisticsConfig } from '../../../domain/entities/landing.types'
import { GetStatisticsConfigUseCase } from '../../../application/use-cases/get-statistics-config.use-case'
import { LandingMockRepository } from '../../../infrastructure/repositories/landing-mock.repository'

/**
 * Container Component for Statistics Section
 * 
 * This component follows:
 * - Single Responsibility Principle (SRP): Responsible for data fetching
 * - Separation of Concerns: Separates data logic from presentation
 */
export function StatisticsSectionContainer() {
  const [config, setConfig] = useState<StatisticsConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Dependency Injection: Repository is injected into use case
    const repository = new LandingMockRepository()
    const useCase = new GetStatisticsConfigUseCase(repository)

    useCase
      .execute()
      .then((statisticsConfig) => {
        setConfig(statisticsConfig)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load statistics config:', error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-12 bg-gray-200 w-24 rounded mx-auto mb-2"></div>
                <div className="h-6 bg-gray-200 w-32 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!config) {
    return null
  }

  return <StatisticsSection config={config} />
}


