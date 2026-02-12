/**
 * Contains all data for the courses and institute section
 */

export const coursesInstituteData = {
  institute: {
    title: 'Digitize Your Institute',
    description:
      'Partner with us to bring your educational institution into the digital age. Offer your courses online and reach students worldwide.',
    ctaButton: {
      label: 'Become a Partner',
      href: '/partner',
    },
    image: {
      src: '/images/background/courses-institute/courses-institute.png',
      alt: 'Digitize Your Institute',
    },
  },
  colors: {
    section: {
      background: 'bg-white',
    },
    institute: {
      title: 'text-gray-900',
      description: 'text-gray-600',
      button: {
        background: 'bg-brand-700',
        text: 'text-white',
        hoverBackground: 'hover:bg-brand-600',
      },
    },
  },
} as const
