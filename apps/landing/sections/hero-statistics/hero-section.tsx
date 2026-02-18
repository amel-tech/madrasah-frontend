/**
 * Hero Section Component
 *
 * This component displays the hero section with title, subtitle, description, and CTA buttons.
 */

'use client'

import Link from 'next/link'
import { cn } from '@madrasah/ui/lib/utils'
import { heroData } from './data'

/**
 * Hero Component
 *
 * Displays the main hero section with background image, title, subtitle, and CTA buttons.
 */
export function HeroSection() {
  return (
    <section
      className={cn(
        'relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] max-w-6xl mx-auto flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat',
        heroData.colors.background,
      )}
      style={{
        backgroundImage: heroData.backgroundImage ? `url(${heroData.backgroundImage})` : undefined,
      }}
    >
      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 text-center flex min-h-[400px] sm:min-h-[500px] md:min-h-[600px] items-center justify-center">
        <div className="w-full">
          {/* Main Title */}
          <h1
            className={cn(
              'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4',
              heroData.colors.title,
            )}
          >
            {heroData.title}
          </h1>

          {/* Subtitle - Golden brown color */}
          <h2
            className={cn(
              'text-2xl sm:text-3xl md:text-4xl lg:text-6xl mb-4 sm:mb-6',
              heroData.colors.subtitle,
            )}
          >
            {heroData.subtitle}
          </h2>

          {/* Description */}
          <p
            className={cn(
              'my-4 sm:my-6 md:my-8 mx-auto max-w-2xl text-sm sm:text-base md:text-lg m-0 p-0',
              heroData.colors.description,
            )}
          >
            {heroData.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-6 sm:mt-8">
            {heroData.ctaButtons.map(button => (
              <Link
                key={button.href}
                href={button.href}
                className={cn(
                  'px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors',
                  button.variant === 'primary'
                    ? [
                        heroData.colors.button.primary.background,
                        heroData.colors.button.primary.text,
                        heroData.colors.button.primary.hoverBackground,
                      ]
                    : [
                        heroData.colors.button.secondary.background,
                        heroData.colors.button.secondary.text,
                        'border-2',
                        heroData.colors.button.secondary.border,
                        heroData.colors.button.secondary.hoverBackground,
                      ],
                )}
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
