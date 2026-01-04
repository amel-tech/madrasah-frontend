/**
 * Presentation Layer - Container Component
 * 
 * This is a "smart" component that handles data fetching and business logic.
 * It uses use cases to get data and passes it to presentational components.
 * Following Presentation-Container Pattern.
 */

'use client'

import { useEffect, useState } from 'react'
import { HeaderSection } from './header-section'
import type { HeaderConfig } from '../../../domain/entities/landing.types'
import { GetHeaderConfigUseCase } from '../../../application/use-cases/get-header-config.use-case'
import { LandingMockRepository } from '../../../infrastructure/repositories/landing-mock.repository'

/**
 * Container Component for Header
 * 
 * This component follows:
 * - Single Responsibility Principle (SRP): Responsible for data fetching
 * - Separation of Concerns: Separates data logic from presentation
 * 
 * !-Veriler container da yönetiliyor, arayüz de section kısmında
 */
export function HeaderSectionContainer() {
  const [config, setConfig] = useState<HeaderConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Dependency Injection: Repository is injected into use case
    const repository = new LandingMockRepository()
    const useCase = new GetHeaderConfigUseCase(repository)

    useCase
      .execute()
      .then((headerConfig) => {
        setConfig(headerConfig)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load header config:', error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <header className="flex justify-between items-center container mx-auto py-6 px-4">
        <div className="animate-pulse bg-gray-200 h-10 w-48 rounded"></div>
      </header>
    )
  }

  if (!config) {
    return null
  }

  return <HeaderSection config={config} />
}


