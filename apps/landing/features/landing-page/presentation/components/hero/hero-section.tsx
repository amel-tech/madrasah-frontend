/**
 * Presentation Layer - Presentational Component
 * 
 * This is a "dumb" component that only handles presentation.
 * It receives all data via props and has no business logic.
 * Following Presentation-Container Pattern.
 */

'use client'

import type { HeroConfig } from '../../../domain/entities/landing.types'
import Link from 'next/link'

interface HeroSectionProps {
  readonly config: HeroConfig
}

/**
 * Presentational Hero Component
 * 
 * This component follows:
 * - Single Responsibility Principle (SRP): Only responsible for rendering
 * - Component-Based Architecture: Reusable, isolated component
 */
export function HeroSection({ config }: HeroSectionProps) {
  return (
    <section 
      className="relative min-h-[600px] max-w-6xl mx-auto flex items-center justify-center bg-white overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/hero/sher-dor.png)',
      }}
    >
      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center flex min-h-[600px] items-center justify-center">
        <div className="w-full">
          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            {config.title}
          </h1>

          {/* Subtitle - Golden brown color */}
          <h2 className="text-4xl md:text-6xl text-accent-500 mb-6 ">
            {config.subtitle}
          </h2>

          {/* Description */} {/* Figma'da width: 686 px yerine standart max-w-2xl kullanıldı. */}
          <p className="text-gray-400 my-8 mx-auto max-w-2xl text-lg m-0 p-0 md:text-lg">
            {config.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {config.ctaButtons.map((button) => (
              <Link
                key={button.href}
                href={button.href}
                className={`
                  px-8 py-3 rounded-lg font-medium text-base transition-colors
                  ${
                    button.variant === 'primary'
                      ? 'bg-brand-700 text-white hover:bg-brand-600'
                      : 'bg-transparent text-gray-500 border-2 border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                {button.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


