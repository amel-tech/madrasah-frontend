/**
 * Header Section Data
 *
 * Contains all data for the header section
 */

export const headerData = {
  logo: {
    alt: 'Medrese Online Logo',
  },
  navigationLinks: [
    { label: 'courses', href: '#courses' },
    { label: 'mentors', href: '#smart-decks' },
    { label: 'features', href: '#features' },
  ],
  ctaButtons: {
    signIn: {
      label: 'signin',
    },
    joinFree: {
      label: 'join for free',
    },
  },
  colors: {
    background: 'bg-white',
    text: {
      default: 'text-gray-700',
      hover: 'hover:text-brand-700',
    },
    button: {
      signIn: {
        border: 'border-brand-50',
        text: 'text-brand-700',
        background: 'bg-white',
        hoverBackground: 'hover:bg-brand-50',
      },
      joinFree: {
        background: 'bg-brand-700',
        text: 'text-white',
        hoverBackground: 'hover:bg-brand-600',
      },
    },
    hamburger: {
      icon: 'bg-brand-600',
    },
    menu: {
      border: 'border-gray-200',
    },
  },
} as const
