/**
 * Presentation Layer - Container Component
 * 
 * This is a "smart" component that handles data fetching and business logic.
 * It uses use cases to get data and passes it to presentational components.
 * Following Presentation-Container Pattern.
 */

'use client'

import { useEffect, useState } from 'react'
import { HeroSection } from './hero-section'
import type { HeroConfig } from '../../../domain/entities/landing.types'
import { GetHeroConfigUseCase } from '../../../application/use-cases/get-hero-config.use-case'
import { LandingMockRepository } from '../../../infrastructure/repositories/landing-mock.repository'

/**
 * Container Component for Hero Section
 * 
 * This component follows:
 * - Single Responsibility Principle (SRP): Responsible for data fetching
 * - Separation of Concerns: Separates data logic from presentation
 */
export function HeroSectionContainer() {
  const [config, setConfig] = useState<HeroConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Dependency Injection: Repository is injected into use case
    const repository = new LandingMockRepository()
    const useCase = new GetHeroConfigUseCase(repository)

    useCase
      .execute()
      .then((heroConfig) => {
        setConfig(heroConfig)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load hero config:', error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <section className="min-h-[600px] flex items-center justify-center bg-white">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 w-96 rounded"></div>
          <div className="h-10 bg-gray-200 w-80 rounded mx-auto"></div>
        </div>
      </section>
    )
  }

  if (!config) {
    return null
  }

  return <HeroSection config={config} />
}


