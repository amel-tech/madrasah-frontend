/**
 * Hero-Statistics Section Data
 *
 * Contains all data for both Hero and Statistics components
 */

export const heroData = {
  title: 'The Digital Age Madrasa:',
  subtitle: 'Beyond Borders, Bound to Knowledge',
  description:
    'Fiqh, Kalam, Arabic, and Hifz education; featuring live classes, interactive flashcards, and expert scholars on a single platform.',
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
} as const

export const statisticsData = {
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
} as const
