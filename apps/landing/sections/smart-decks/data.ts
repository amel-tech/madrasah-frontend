/**
 * Smart Decks Section Data
 * 
 * Contains all data for the smart decks section
 */

export interface PopularCourse {
  readonly id: string
  readonly title: string
  readonly author: string
  readonly stats: {
    readonly lessons: number
    readonly rating: number
    readonly students: number
  }
  readonly description: string
  readonly image: {
    readonly src: string
    readonly alt: string
  }
}

export interface SmartDecksColors {
  readonly section: {
    readonly background: string
  }
  readonly mainContent: {
    readonly title: string
    readonly description: string
    readonly button: {
      readonly background: string
      readonly text: string
      readonly hoverBackground: string
      readonly shadow: string
    }
  }
  readonly popularCourses: {
    readonly sectionBackground: string
    readonly title: string
    readonly card: {
      readonly background: string
      readonly title: string
      readonly author: string
      readonly stats: string
      readonly description: string
      readonly shadow: string
      readonly hoverShadow: string
    }
  }
}

export interface SmartDecksData {
  readonly title: string
  readonly description: string
  readonly ctaButton: {
    readonly label: string
    readonly href: string
  }
  readonly image: {
    readonly src: string
    readonly alt: string
  }
  readonly popularCourses: {
    readonly title: string
    readonly items: readonly PopularCourse[]
  }
  readonly colors: SmartDecksColors
}

export const smartDecksData: SmartDecksData = {
  title: 'Memorize Faster with Smart Decks',
  description: 'Whether it\'s vocabulary or Quranic verses, create your own flashcards or use community decks powered by spaced repetition.',
  ctaButton: {
    label: 'Try Flashcards Demo',
    href: '/flashcards-demo',
  },
  image: {
    src: '/images/background/smart-decks/phone.png',
    alt: 'Smart Decks Flashcard Application',
  },
  popularCourses: {
    title: 'Popular Courses',
    items: [
      {
        id: '1',
        title: 'Advanced Arabic Couse',
        author: 'by Imam Yousef',
        stats: {
          lessons: 730,
          rating: 4.8,
          students: 317,
        },
        description: 'Master advanced Arabic with this essential deck. Features high-frequency words, complex grammar and...',
        image: {
          src: 'https://picsum.photos/200/300',
          alt: 'Advanced Arabic Course',
        },
      },
      {
        id: '2',
        title: 'Advanced Arabic Couse',
        author: 'by Imam Yousef',
        stats: {
          lessons: 730,
          rating: 4.8,
          students: 317,
        },
        description: 'Master advanced Arabic with this essential deck. Features high-frequency words, complex grammar and...',
        image: {
          src: 'https://picsum.photos/200/300',
          alt: 'Advanced Arabic Course',
        },
      },
      {
        id: '3',
        title: 'Advanced Arabic Couse',
        author: 'by Imam Yousef',
        stats: {
          lessons: 730,
          rating: 4.8,
          students: 317,
        },
        description: 'Master advanced Arabic with this essential deck. Features high-frequency words, complex grammar and...',
        image: {
          src: 'https://picsum.photos/200/300',
          alt: 'Advanced Arabic Course',
        },
      },
      {
        id: '4',
        title: 'Advanced Arabic Couse',
        author: 'by Imam Yousef',
        stats: {
          lessons: 730,
          rating: 4.8,
          students: 317,
        },
        description: 'Master advanced Arabic with this essential deck. Features high-frequency words, complex grammar and...',
        image: {
          src: 'https://picsum.photos/200/300',
          alt: 'Advanced Arabic Course',
        },
      },
    ],
  },
  colors: {
    section: {
      background: 'bg-white',
    },
    mainContent: {
      title: 'text-white',
      description: 'text-white',
      button: {
        background: 'bg-white',
        text: 'text-gray-900',
        hoverBackground: 'hover:bg-gray-100',
        shadow: 'shadow-md',
      },
    },
    popularCourses: {
      sectionBackground: 'bg-white',
      title: 'text-gray-900',
      card: {
        background: 'bg-gray-100',
        title: 'text-gray-900',
        author: 'text-gray-600',
        stats: 'text-gray-600',
        description: 'text-gray-500',
        shadow: 'shadow-sm',
        hoverShadow: 'hover:shadow-md',
      },
    },
  },
}
