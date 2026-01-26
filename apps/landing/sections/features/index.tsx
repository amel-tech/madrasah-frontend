/**
 * Features Section Component
 * 
 * This component displays feature cards with icons, titles, and descriptions.
 */

'use client'

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
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${featuresData.colors.title} mb-3 sm:mb-4 md:mb-6`}>
              {featuresData.title}
            </h2>
          </div>
          <p className={`text-sm sm:text-base md:text-lg lg:text-xl ${featuresData.colors.subtitle} max-w-3xl mx-auto px-2`}>
            {featuresData.subtitle}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
          {featuresData.cards.map((card, index) => (
            <div
              key={index}
              className={`w-full max-w-[290px] min-h-[300px] sm:h-[350px] md:h-[381px] ${featuresData.colors.card.background} rounded-lg p-6 sm:p-7 md:p-8 ${featuresData.colors.card.shadow} ${featuresData.colors.card.hoverShadow} transition-shadow flex flex-col`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${featuresData.colors.card.iconBackground} rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6 mx-auto border ${featuresData.colors.card.iconBorder} flex-shrink-0`}>
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
              <h3 className={`text-lg sm:text-xl font-bold ${featuresData.colors.card.title} mb-3 sm:mb-4 text-center flex-shrink-0`}>
                {card.title}
              </h3>

              {/* Description */}
              <p className={`${featuresData.colors.card.description} text-sm sm:text-base leading-relaxed text-center flex-1`}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
