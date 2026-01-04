/**
 * Presentation Layer - Presentational Component
 * 
 * This is a "dumb" component that only handles presentation.
 * It receives all data via props and has no business logic.
 * Following Presentation-Container Pattern.
 */

'use client'

import type { FeaturesConfig } from '../../../domain/entities/landing.types'

interface FeaturesSectionProps {
  readonly config: FeaturesConfig
}

/**
 * Icon component factory
 * Following Open/Closed Principle - can be extended with new icons
 */
function FeatureIcon({ iconName }: { iconName: string }) {
  const iconClasses = 'w-6 h-6 text-gray-700'

  switch (iconName) {
    case 'play':
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'document':
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    case 'community':
      return (
        <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    default:
      return null
  }
}

/**
 * Presentational Features Component
 * 
 * This component follows:
 * - Single Responsibility Principle (SRP): Only responsible for rendering
 * - Component-Based Architecture: Reusable, isolated component
 */
export function FeaturesSection({ config }: FeaturesSectionProps) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {config.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {config.subtitle}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {config.cards.map((card, index) => (
            <div
              key={index}
              className="bg-[#F5F5DC] rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-4">
                <FeatureIcon iconName={card.icon} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


