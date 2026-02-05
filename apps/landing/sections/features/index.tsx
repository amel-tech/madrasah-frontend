/**
 * Features Section Component
 * 
 * This component displays feature cards with icons, titles, and descriptions.
 */

'use client'

import { cn } from '@madrasah/ui/lib/utils'
import { featuresData } from './data'
import { YoutubeIcon } from '~/components/icons/features/youtube-icon'
import { AssignmentsIcon } from '~/components/icons/features/assignments-icon'
import { CommunityIcon } from '@/components/icons/features/community-icon'

/**
 * Features Component
 * 
 * Displays feature cards in a grid layout with icons, titles, and descriptions.
 */
export function FeaturesSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat py-8 sm:py-12 md:py-16"
      style={{
        backgroundImage: 'url(/images/background/features/choose-online-madrasah-bg.png)',
      }}
    >
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl w-full">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="p-2">
            <h2
              className={cn(
                'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold',
                featuresData.colors.title,
                'mb-3 sm:mb-4 md:mb-6'
              )}
            >
              {featuresData.title}
            </h2>
          </div>
          <p
            className={cn(
              'text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-2',
              featuresData.colors.subtitle
            )}
          >
            {featuresData.subtitle}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
          {featuresData.cards.map((card, index) => (
            <div
              key={index}
              className={cn(
                'w-full max-w-[290px] min-h-[300px] sm:h-[350px] md:h-[381px] rounded-lg p-6 sm:p-7 md:p-8 transition-shadow flex flex-col',
                featuresData.colors.card.background,
                featuresData.colors.card.shadow,
                featuresData.colors.card.hoverShadow
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6 mx-auto border flex-shrink-0',
                  featuresData.colors.card.iconBackground,
                  featuresData.colors.card.iconBorder
                )}
              >
                {card.icon === 'youtube' && (
                  <YoutubeIcon 
                    width={48} 
                    height={48} 
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" 
                  />
                )}
                {card.icon === 'assignments' && (
                  <AssignmentsIcon 
                    width={48} 
                    height={48} 
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" 
                  />
                )}
                {card.icon === 'community' && (
                  <CommunityIcon 
                    width={48} 
                    height={48} 
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" 
                  />
                )}
              </div>

              {/* Title */}
              <h3
                className={cn(
                  'text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center flex-shrink-0',
                  featuresData.colors.card.title
                )}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                className={cn(
                  'text-sm sm:text-base leading-relaxed text-center flex-1',
                  featuresData.colors.card.description
                )}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
