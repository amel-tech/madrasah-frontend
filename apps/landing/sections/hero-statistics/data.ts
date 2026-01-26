/**
 * Hero-Statistics Section Data
 * 
 * Contains all data for both Hero and Statistics components
 */

// Hero Data
export interface HeroCtaButton {
  readonly label: string
  readonly href: string
  readonly variant: 'primary' | 'secondary'
}

export interface HeroColors {
  readonly background: string
  readonly title: string
  readonly subtitle: string
  readonly description: string
  readonly button: {
    readonly primary: {
      readonly background: string
      readonly text: string
      readonly hoverBackground: string
    }
    readonly secondary: {
      readonly background: string
      readonly text: string
      readonly border: string
      readonly hoverBackground: string
    }
  }
}

export interface HeroData {
  readonly title: string
  readonly subtitle: string
  readonly description: string
  readonly ctaButtons: readonly HeroCtaButton[]
  readonly backgroundImage?: string
  readonly colors: HeroColors
}

export const heroData: HeroData = {
  title: 'The Digital Age Madrasa:',
  subtitle: 'Beyond Borders, Bound to Knowledge',
  description: 'Fiqh, Kalam, Arabic, and Hifz education; featuring live classes, interactive flashcards, and expert scholars on a single platform.',
  ctaButtons: [
    {
      label: 'Start Learning Now',
      href: '/signup',
      variant: 'primary',
    },
    {
      label: 'Explore courses',
      href: '/courses',
      variant: 'secondary',
    },
  ],
  backgroundImage: '/images/background/hero/sher-dor.png',
  colors: {
    background: 'bg-white',
    title: 'text-gray-900',
    subtitle: 'text-accent-500',
    description: 'text-gray-400',
    button: {
      primary: {
        background: 'bg-brand-700',
        text: 'text-white',
        hoverBackground: 'hover:bg-brand-600',
      },
      secondary: {
        background: 'bg-transparent',
        text: 'text-gray-500',
        border: 'border-gray-300',
        hoverBackground: 'hover:bg-gray-50',
      },
    },
  },
}

// Statistics Data
export interface StatisticsItem {
  readonly value: string
  readonly label: string
}

export interface StatisticsColors {
  readonly background: string
  readonly value: string
  readonly label: string
  readonly divider: string
}

export interface StatisticsData {
  readonly items: readonly StatisticsItem[]
  readonly colors: StatisticsColors
}

export const statisticsData: StatisticsData = {
  items: [
    {
      value: '10k+',
      label: 'Talaba',
    },
    {
      value: '30+',
      label: 'Scholars',
    },
    {
      value: '1.2k+',
      label: 'Hours of Content',
    },
  ],
  colors: {
    background: 'bg-gray-100',
    value: 'text-gray-900',
    label: 'text-gray-600',
    divider: 'bg-white',
  },
}
