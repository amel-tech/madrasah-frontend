/**
 * Footer Section Data
 * 
 * Contains all data for the footer section
 */

export interface FooterLink {
  readonly label: string
  readonly href: string
}

export interface FooterColors {
  readonly background: string
  readonly contentBox: {
    readonly background: string
    readonly border: string
  }
  readonly logo: {
    readonly title: string
  }
  readonly tagline: string
  readonly socialIcons: {
    readonly background: string
    readonly hoverBackground: string
    readonly border: string
    readonly icon: string
  }
  readonly headings: string
  readonly links: {
    readonly default: string
    readonly hover: string
  }
  readonly newsletter: {
    readonly title: string
    readonly description: string
    readonly input: {
      readonly border: string
      readonly focusRing: string
    }
    readonly button: {
      readonly background: string
      readonly text: string
      readonly hoverBackground: string
    }
  }
  readonly copyright: {
    readonly border: string
    readonly text: string
    readonly links: {
      readonly default: string
      readonly hover: string
    }
  }
}

export interface FooterData {
  readonly logo: {
    readonly alt: string
  }
  readonly tagline: string
  readonly socialMedia: {
    readonly facebook: string
    readonly twitter: string
  }
  readonly learnLinks: readonly FooterLink[]
  readonly companyLinks: readonly FooterLink[]
  readonly newsletter: {
    readonly title: string
    readonly placeholder: string
    readonly buttonLabel: string
    readonly description: string
  }
  readonly copyright: {
    readonly text: string
    readonly privacyPolicy: {
      readonly label: string
      readonly href: string
    }
    readonly termsOfService: {
      readonly label: string
      readonly href: string
    }
  }
  readonly colors: FooterColors
}

export const footerData: FooterData = {
  logo: {
    alt: 'Medrese Online Logo',
  },
  tagline: 'Empowering the Ummah through accessible, authentic, and modern Islamic education.',
  socialMedia: {
    facebook: 'https://facebook.com/medresonline',
    twitter: 'https://twitter.com/medresonline',
  },
  learnLinks: [
    { label: 'Courses', href: '/courses' },
    { label: 'Instructors', href: '/instructors' },
    { label: 'Free Resources', href: '/resources' },
    { label: 'Scholarships', href: '/scholarships' },
  ],
  companyLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  newsletter: {
    title: 'Stay Updated',
    placeholder: 'Enter your email',
    buttonLabel: 'Subscribe',
    description: 'Get the latest course updates and spiritual reminders.',
  },
  copyright: {
    text: '© 2023 Medrese Online. All rights reserved.',
    privacyPolicy: {
      label: 'Privacy Policy',
      href: '/privacy',
    },
    termsOfService: {
      label: 'Terms of Service',
      href: '/terms',
    },
  },
  colors: {
    background: 'bg-gray-100',
    contentBox: {
      background: 'bg-white',
      border: 'border-blue-200',
    },
    logo: {
      title: 'text-gray-900',
    },
    tagline: 'text-gray-600',
    socialIcons: {
      background: 'bg-gray-200',
      hoverBackground: 'hover:bg-gray-300',
      border: 'border-gray-300',
      icon: 'text-gray-600',
    },
    headings: 'text-gray-900',
    links: {
      default: 'text-gray-600',
      hover: 'hover:text-brand-700',
    },
    newsletter: {
      title: 'text-gray-900',
      description: 'text-gray-600',
      input: {
        border: 'border-gray-300',
        focusRing: 'focus:ring-brand-700',
      },
      button: {
        background: 'bg-gray-500',
        text: 'text-white',
        hoverBackground: 'hover:bg-gray-700',
      },
    },
    copyright: {
      border: 'border-gray-300',
      text: 'text-gray-600',
      links: {
        default: 'text-gray-600',
        hover: 'hover:text-brand-700',
      },
    },
  },
}
