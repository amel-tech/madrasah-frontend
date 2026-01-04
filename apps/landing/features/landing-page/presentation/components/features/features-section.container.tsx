/**
 * Presentation Layer - Container Component
 * 
 * This is a "smart" component that handles data fetching and business logic.
 * It uses use cases to get data and passes it to presentational components.
 * Following Presentation-Container Pattern.
 */

'use client'

import { useEffect, useState } from 'react'
import { FeaturesSection } from './features-section'
import type { FeaturesConfig } from '../../../domain/entities/landing.types'
import { GetFeaturesConfigUseCase } from '../../../application/use-cases/get-features-config.use-case'
import { LandingMockRepository } from '../../../infrastructure/repositories/landing-mock.repository'

/**
 * Container Component for Features Section
 * 
 * This component follows:
 * - Single Responsibility Principle (SRP): Responsible for data fetching
 * - Separation of Concerns: Separates data logic from presentation
 */
export function FeaturesSectionContainer() {
  const [config, setConfig] = useState<FeaturesConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Dependency Injection: Repository is injected into use case
    const repository = new LandingMockRepository()
    const useCase = new GetFeaturesConfigUseCase(repository)

    useCase
      .execute()
      .then((featuresConfig) => {
        setConfig(featuresConfig)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load features config:', error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="animate-pulse h-10 bg-gray-200 w-96 rounded mx-auto mb-4"></div>
            <div className="animate-pulse h-6 bg-gray-200 w-64 rounded mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gray-100 rounded-lg p-6">
                <div className="h-14 w-14 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
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

  return <FeaturesSection config={config} />
}


