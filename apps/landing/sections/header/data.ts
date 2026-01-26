/**
 * Header Section Data
 * 
 * Contains all data for the header section
 */

export interface NavigationLink {
  readonly label: string
  readonly href: string
}

export interface HeaderColors {
  readonly background: string
  readonly text: {
    readonly default: string
    readonly hover: string
  }
  readonly button: {
    readonly signIn: {
      readonly border: string
      readonly text: string
      readonly background: string
      readonly hoverBackground: string
    }
    readonly joinFree: {
      readonly background: string
      readonly text: string
      readonly hoverBackground: string
    }
  }
  readonly hamburger: {
    readonly icon: string
  }
  readonly menu: {
    readonly border: string
  }
}

export interface HeaderData {
  readonly logo: {
    readonly alt: string
  }
  readonly navigationLinks: readonly NavigationLink[]
  readonly ctaButtons: {
    readonly signIn: {
      readonly label: string
      readonly href: string
    }
    readonly joinFree: {
      readonly label: string
      readonly href: string
    }
  }
  readonly colors: HeaderColors
}

export const headerData: HeaderData = {
  logo: {
    alt: 'Medrese Online Logo'
  },
  navigationLinks: [
    { label: 'courses', href: '#courses' },
    { label: 'mentors', href: '#smart-decks' },
    { label: 'features', href: '#features' },
  ],
  ctaButtons: {
    signIn: {
      label: 'signin',
      href: '/signin',
    },
    joinFree: {
      label: 'join for free',
      href: '#hero',
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
}
